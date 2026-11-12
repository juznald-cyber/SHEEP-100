/**
 * SHEEP 100 — 24/7 Cloud Autonomous Scheduler (GitHub Actions + Firebase Firestore)
 * Ejecuta las publicaciones programadas (Solo Post, Solo Historia 24h, Solo Reel y Ambos)
 * directamente desde la nube (Firebase Firestore -> Meta Graph API) con el PC apagado.
 */

const FIRESTORE_PRINCIPAL_URL =
  'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/principal';
const FIRESTORE_RELAY_URL =
  'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/fb_rupload_relay';

function extractGoogleDriveId(url) {
  if (!url || typeof url !== 'string') return null;
  const m1 = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (m1) return m1[1];
  const m2 =
    url.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?[^#]*?[?&]id=([a-zA-Z0-9_-]+)/i) ||
    url.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?id=([a-zA-Z0-9_-]+)/i);
  if (m2) return m2[1];
  const m3 = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
  if (m3) return m3[1];
  const m4 = url.match(/drive\.usercontent\.google\.com\/download\?[^#]*?id=([a-zA-Z0-9_-]+)/i);
  if (m4) return m4[1];
  return null;
}

function normalizeCloudMedia(rawUrl, type = 'image') {
  const clean = (rawUrl || '').trim();
  const driveId = extractGoogleDriveId(clean);
  if (driveId) {
    const thumbUrl = `https://lh3.googleusercontent.com/d/${driveId}=w1080`;
    const publicUrl =
      type === 'video'
        ? `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`
        : thumbUrl;
    return { isDrive: true, driveId, thumbUrl, publicUrl };
  }
  return { isDrive: false, driveId: null, thumbUrl: clean, publicUrl: clean };
}

async function publishFacebookThreePhaseVideo({ fbPageId, pageToken, pageName, mediaUrl, caption, mode }) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const endpointName = mode === 'STORY' ? 'video_stories' : 'video_reels';

  const startParams = new URLSearchParams({
    upload_phase: 'start',
    access_token: pageToken
  });
  const startRes = await fetch(`${graphBase}/${fbPageId}/${endpointName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: startParams.toString()
  });
  const startData = await startRes.json();
  if (!startRes.ok || startData.error) {
    throw new Error(startData.error ? startData.error.message : `Error iniciando sesión ${endpointName} en Facebook`);
  }

  const videoId = startData.video_id;
  const uploadUrl = startData.upload_url || `https://rupload.facebook.com/video-upload/v22.0/${videoId}`;

  const upRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `OAuth ${pageToken}`,
      file_url: mediaUrl
    }
  });
  const upData = await upRes.json();
  if (!upRes.ok || upData.error || upData.success === false) {
    throw new Error(upData.error?.message || `Error transfiriendo video a rupload.facebook.com (${endpointName})`);
  }

  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    try {
      const stRes = await fetch(
        `${graphBase}/${videoId}?fields=status&access_token=${encodeURIComponent(pageToken)}`
      );
      const stData = await stRes.json();
      const vStatus = stData?.status?.video_status;
      if (vStatus === 'upload_complete' || vStatus === 'ready') break;
    } catch (_) {}
  }

  const finishParams = new URLSearchParams({
    upload_phase: 'finish',
    video_id: videoId,
    access_token: pageToken
  });
  if (mode === 'REEL') {
    finishParams.append('video_state', 'PUBLISHED');
    if (caption) finishParams.append('description', caption);
  }

  const finRes = await fetch(`${graphBase}/${fbPageId}/${endpointName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: finishParams.toString()
  });
  const finData = await finRes.json();
  if (!finRes.ok || finData.error) {
    throw new Error(finData.error ? finData.error.message : `Error finalizando ${endpointName} en Facebook`);
  }

  const finalId = finData.post_id || videoId;
  const label =
    mode === 'STORY'
      ? `⭕ Historia 24h en Video publicada en Facebook (${pageName} • ID: ${finalId})`
      : `🎬 Reel publicado en Facebook (${pageName} • ID: ${finalId})`;

  return { publishId: finalId, videoId, label };
}

async function publishSingleInstagramItem({ igUserId, accessToken, mediaUrl, isVideoFile, caption, targetMode }) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const containerParams = new URLSearchParams();
  containerParams.append('access_token', accessToken);

  if (targetMode === 'STORY') {
    containerParams.append('media_type', 'STORIES');
    if (isVideoFile) {
      containerParams.append('video_url', mediaUrl);
    } else {
      containerParams.append('image_url', mediaUrl);
    }
  } else if (targetMode === 'REEL' || isVideoFile) {
    containerParams.append('media_type', 'REELS');
    containerParams.append('video_url', mediaUrl);
    containerParams.append('caption', caption || '');
  } else {
    containerParams.append('image_url', mediaUrl);
    containerParams.append('caption', caption || '');
  }

  const step1Res = await fetch(`${graphBase}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: containerParams.toString()
  });

  const step1Data = await step1Res.json();
  if (!step1Res.ok || step1Data.error) {
    throw new Error(step1Data.error ? step1Data.error.message : 'Error creando contenedor en Instagram');
  }

  const creationId = step1Data.id;
  const maxPolls = targetMode === 'STORY' || isVideoFile ? 30 : 10;
  for (let attempt = 0; attempt < maxPolls; attempt++) {
    await new Promise((r) => setTimeout(r, 3000));
    const statusRes = await fetch(
      `${graphBase}/${creationId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
    );
    const statusData = await statusRes.json();
    if (statusData.status_code === 'FINISHED') break;
    if (statusData.status_code === 'ERROR' || statusData.status_code === 'EXPIRED') {
      throw new Error(`Instagram rechazó el procesamiento: ${statusData.status || statusData.status_code}`);
    }
  }

  const publishParams = new URLSearchParams({
    creation_id: creationId,
    access_token: accessToken
  });

  const step2Res = await fetch(`${graphBase}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });
  const step2Data = await step2Res.json();
  if (!step2Res.ok || step2Data.error) {
    throw new Error(step2Data.error ? step2Data.error.message : 'Error en media_publish de Instagram');
  }

  const label =
    targetMode === 'STORY'
      ? `⭕ Historia 24h publicada en Instagram Stories (ID: ${step2Data.id})`
      : targetMode === 'REEL' || isVideoFile
      ? `🎬 Reel publicado en Instagram (ID: ${step2Data.id})`
      : `📸 Post publicado en Instagram (ID: ${step2Data.id})`;

  return { containerId: creationId, publishId: step2Data.id, label };
}

async function publishSingleFacebookPageItem({ fbPageId, pageToken, pageName, mediaUrl, isVideoFile, caption, targetMode }) {
  const graphBase = 'https://graph.facebook.com/v22.0';

  if (targetMode === 'STORY') {
    if (!isVideoFile) {
      const p1 = new URLSearchParams({ url: mediaUrl, published: 'false', access_token: pageToken });
      const r1 = await fetch(`${graphBase}/${fbPageId}/photos`, { method: 'POST', body: p1 }).then((r) => r.json());
      if (r1.error) throw new Error(r1.error.message);
      const p2 = new URLSearchParams({ photo_id: r1.id, access_token: pageToken });
      const r2 = await fetch(`${graphBase}/${fbPageId}/photo_stories`, { method: 'POST', body: p2 }).then((r) => r.json());
      if (r2.error) throw new Error(r2.error.message);
      const finalId = r2.post_id || r1.id;
      return {
        publishId: finalId,
        label: `⭕ Historia 24h publicada en Facebook (${pageName} • ID: ${finalId})`
      };
    } else {
      return await publishFacebookThreePhaseVideo({
        fbPageId,
        pageToken,
        pageName,
        mediaUrl,
        caption,
        mode: 'STORY'
      });
    }
  }

  if (targetMode === 'REEL') {
    if (!isVideoFile) {
      throw new Error('Para publicar un Reel el archivo debe ser un video MP4.');
    }
    try {
      return await publishFacebookThreePhaseVideo({
        fbPageId,
        pageToken,
        pageName,
        mediaUrl,
        caption,
        mode: 'REEL'
      });
    } catch (_) {
      const vp = new URLSearchParams({
        file_url: mediaUrl,
        description: caption || '',
        published: 'true',
        access_token: pageToken
      });
      const vr = await fetch(`https://graph-video.facebook.com/v22.0/${fbPageId}/videos`, {
        method: 'POST',
        body: vp
      }).then((r) => r.json());
      if (vr.error) throw new Error(vr.error.message);
      return {
        publishId: vr.id,
        label: `🎬 Reel publicado en Facebook (${pageName} • ID: ${vr.id})`
      };
    }
  }

  if (isVideoFile) {
    const vp = new URLSearchParams({
      file_url: mediaUrl,
      description: caption || '',
      published: 'true',
      access_token: pageToken
    });
    const vr = await fetch(`https://graph-video.facebook.com/v22.0/${fbPageId}/videos`, {
      method: 'POST',
      body: vp
    }).then((r) => r.json());
    if (vr.error) throw new Error(vr.error.message);
    return {
      publishId: vr.id,
      label: `📘 Video publicado en el Feed de Facebook (${pageName} • ID: ${vr.id})`
    };
  } else {
    const pp = new URLSearchParams({
      url: mediaUrl,
      caption: caption || '',
      published: 'true',
      access_token: pageToken
    });
    const pr = await fetch(`${graphBase}/${fbPageId}/photos`, { method: 'POST', body: pp }).then((r) => r.json());
    if (pr.error) throw new Error(pr.error.message);
    const finalId = pr.post_id || pr.id;
    return {
      publishId: finalId,
      label: `📘 Post publicado en el Feed de Facebook (${pageName} • ID: ${finalId})`
    };
  }
}

async function publishCloudPost(post, metaConfig, mediaLibrary = []) {
  const accessToken = (metaConfig.accessToken || '').trim();
  const igUserId = (metaConfig.igUserId || '').trim();
  const fbPageId = (metaConfig.fbPageId || '102786358439057').trim();

  if (!accessToken) {
    throw new Error('No hay Access Token configurado en Firebase.');
  }

  let linkedType = 'image';
  if (post.mediaId && Array.isArray(mediaLibrary)) {
    const m = mediaLibrary.find((x) => x.id === post.mediaId);
    if (m && (m.type === 'video' || m.format === 'MP4')) linkedType = 'video';
  }

  const rawMediaUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();
  const isVid =
    linkedType === 'video' ||
    /\.mp4(\?|$)/i.test(rawMediaUrl) ||
    /drive\.usercontent\.google\.com\/download/i.test(rawMediaUrl) ||
    post.mediaType === 'REELS' ||
    post.mediaType === 'VIDEO' ||
    post.postFormat === 'REEL';

  const norm = normalizeCloudMedia(rawMediaUrl, isVid ? 'video' : 'image');
  const mediaUrl = norm.publicUrl || rawMediaUrl;

  const rawFormat =
    post.postFormat ||
    (post.mediaType === 'STORIES' ? 'STORY' : post.mediaType === 'REELS' ? 'REEL' : 'POST');

  const targetModes =
    rawFormat === 'BOTH'
      ? ['STORY', isVid ? 'REEL' : 'POST']
      : [rawFormat];

  const platforms = Array.isArray(post.platforms) && post.platforms.length ? post.platforms : ['instagram'];
  const wantInstagram = platforms.includes('instagram');
  const wantFacebook = platforms.includes('facebook');

  const messages = [];
  let lastContainerId = '';
  let lastPublishId = '';

  if (wantInstagram && igUserId) {
    for (const mode of targetModes) {
      const igRes = await publishSingleInstagramItem({
        igUserId,
        accessToken,
        mediaUrl,
        isVideoFile: isVid,
        caption: post.caption || '',
        targetMode: mode
      });
      lastContainerId = igRes.containerId || lastContainerId;
      lastPublishId = igRes.publishId || lastPublishId;
      messages.push(igRes.label);
    }
  }

  if (wantFacebook && fbPageId) {
    let pageToken = metaConfig.fbPageAccessToken || '';
    let pageName = metaConfig.fbPageName || 'Facebook Page';

    try {
      const pageRes = await fetch(
        `https://graph.facebook.com/v22.0/${fbPageId}?fields=id,name,access_token&access_token=${encodeURIComponent(accessToken)}`
      );
      const pageData = await pageRes.json();
      if (pageRes.ok && !pageData.error && pageData.access_token) {
        pageToken = pageData.access_token;
        pageName = pageData.name || pageName;
      }
    } catch (_) {}

    if (!pageToken) pageToken = accessToken;

    for (const mode of targetModes) {
      const fbRes = await publishSingleFacebookPageItem({
        fbPageId,
        pageToken,
        pageName,
        mediaUrl,
        isVideoFile: isVid,
        caption: post.caption || '',
        targetMode: mode
      });
      lastPublishId = fbRes.publishId || lastPublishId;
      messages.push(fbRes.label);
    }
  }

  return {
    containerId: lastContainerId,
    mediaPublishId: lastPublishId,
    message: messages.join(' + ')
  };
}

async function processRelayJobIfAny() {
  try {
    const res = await fetch(FIRESTORE_RELAY_URL);
    if (!res.ok) return;
    const docData = await res.json();
    const rawPayload = docData?.fields?.payload?.stringValue;
    if (!rawPayload) return;
    const job = JSON.parse(rawPayload);
    if (job.status !== 'pending' || !job.jobId) return;

    console.log(`☁️ Procesando trabajo de relay en la nube: ${job.jobId} (${job.mode})`);
    job.status = 'processing';
    await fetch(FIRESTORE_RELAY_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          payload: { stringValue: JSON.stringify(job) },
          savedAt: { stringValue: new Date().toISOString() }
        }
      })
    });

    try {
      const norm = normalizeCloudMedia(job.mediaUrl, 'video');
      const result = await publishFacebookThreePhaseVideo({
        fbPageId: job.fbPageId || '102786358439057',
        pageToken: job.pageToken,
        pageName: job.pageName || 'Facebook Page',
        mediaUrl: norm.publicUrl || job.mediaUrl,
        caption: job.caption || '',
        mode: job.mode === 'REEL' ? 'REEL' : 'STORY'
      });

      const doneJob = {
        jobId: job.jobId,
        status: 'done',
        fbPublishId: result.publishId,
        videoId: result.videoId,
        label: result.label
      };
      await fetch(FIRESTORE_RELAY_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            payload: { stringValue: JSON.stringify(doneJob) },
            savedAt: { stringValue: new Date().toISOString() }
          }
        })
      });
      console.log(`✅ Relay completado: ${result.label}`);
    } catch (jobErr) {
      const errJob = {
        jobId: job.jobId,
        status: 'error',
        error: jobErr.message || 'Error en fb_rupload_relay'
      };
      await fetch(FIRESTORE_RELAY_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            payload: { stringValue: JSON.stringify(errJob) },
            savedAt: { stringValue: new Date().toISOString() }
          }
        })
      });
    }
  } catch (_) {}
}

async function runCloudScheduler() {
  console.log(`☁️ [SHEEP 100 Cloud Scheduler] Verificando cola en Firebase Firestore (${new Date().toISOString()})...`);

  await processRelayJobIfAny();

  const res = await fetch(FIRESTORE_PRINCIPAL_URL);
  if (!res.ok) {
    console.log('⚠️ No se pudo leer el documento principal de Firestore:', res.status);
    return;
  }

  const doc = await res.json();
  const payloadStr = doc?.fields?.payload?.stringValue;
  if (!payloadStr) {
    console.log('ℹ️ El documento principal no contiene payload.');
    return;
  }

  const state = JSON.parse(payloadStr);
  if (state.metaConfig?.autoPublishEnabled === false) {
    console.log('ℹ️ La publicación automática está desactivada en configuración.');
    return;
  }

  const now = new Date();
  const posts = Array.isArray(state.posts) ? state.posts : [];
  const duePosts = posts.filter(
    (p) => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now
  );

  if (duePosts.length === 0) {
    console.log(`✅ Sin publicaciones vencidas por publicar ahora. Total en cola programada: ${posts.filter((p) => p.status === 'scheduled').length}`);
    return;
  }

  console.log(`🚀 Encontradas ${duePosts.length} publicación(es) listas para publicar en la nube...`);
  let modified = false;

  for (const post of duePosts) {
    console.log(`👉 Publicando "${post.title}" (${post.postFormat || 'POST'}) en ${(post.platforms || []).join(', ')}...`);
    try {
      const result = await publishCloudPost(post, state.metaConfig || {}, state.mediaLibrary || []);
      post.status = 'published';
      post.publishedAt = new Date().toISOString();
      post.metaContainerId = result.containerId;
      post.metaPublishId = result.mediaPublishId;
      post.logs = post.logs || [];
      post.logs.push({
        time: new Date().toISOString(),
        message: `[Auto-Cloud ☁️] ${result.message}`
      });
      console.log(`✅ Publicado con éxito: ${result.message}`);
      modified = true;
    } catch (err) {
      post.status = 'failed';
      post.logs = post.logs || [];
      post.logs.push({
        time: new Date().toISOString(),
        message: `[Auto-Cloud Error ☁️] ${err.message}`
      });
      console.error(`❌ Error publicando "${post.title}":`, err.message);
      modified = true;
    }
  }

  if (modified) {
    const saveRes = await fetch(FIRESTORE_PRINCIPAL_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          payload: { stringValue: JSON.stringify(state) },
          savedAt: { stringValue: new Date().toISOString() },
          updatedBy: { stringValue: `cloud_scheduler_${Date.now()}` }
        }
      })
    });
    if (saveRes.ok) {
      console.log('☁️ Estado actualizado y sincronizado en Firebase Cloud Firestore.');
    } else {
      console.error('⚠️ Error al guardar estado en Firestore:', await saveRes.text());
    }
  }
}

runCloudScheduler().catch((err) => {
  console.error('❌ Error fatal en Cloud Scheduler:', err);
  process.exit(1);
});
