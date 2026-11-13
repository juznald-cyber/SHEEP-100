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

function resolveCarouselItemsCloud(post, mediaLibrary = []) {
  const rawList = Array.isArray(post?.carouselItems) ? post.carouselItems : [];
  const resolved = [];
  for (const item of rawList) {
    if (!item) continue;
    let rawUrl = (typeof item === 'string' ? item : item.publicUrl || item.url || '').trim();
    let linkedType = item.type || '';
    if (item.mediaId && Array.isArray(mediaLibrary)) {
      const m = mediaLibrary.find((x) => x.id === item.mediaId);
      if (m) {
        if (!rawUrl) rawUrl = (m.publicUrl || m.url || '').trim();
        if (!linkedType) linkedType = m.type === 'video' || m.format === 'MP4' ? 'video' : 'image';
      }
    }
    if (!rawUrl) continue;
    const isVideo =
      linkedType === 'video' ||
      item.format === 'MP4' ||
      /\.mp4(\?|$)/i.test(rawUrl) ||
      /drive\.usercontent\.google\.com\/download/i.test(rawUrl);
    const norm = normalizeCloudMedia(rawUrl, isVideo ? 'video' : 'image');
    const finalUrl = norm.publicUrl || rawUrl;
    if (finalUrl) resolved.push({ mediaUrl: finalUrl, isVideo });
  }
  return resolved;
}

async function publishInstagramCarousel({ igUserId, accessToken, items, caption }) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  if (!Array.isArray(items) || items.length < 2 || items.length > 10) {
    throw new Error('Un Carrusel de Instagram requiere entre 2 y 10 diapositivas (fotos o videos).');
  }

  const childIds = [];
  for (let i = 0; i < items.length; i++) {
    const slide = items[i];
    const cp = new URLSearchParams();
    cp.append('access_token', accessToken);
    cp.append('is_carousel_item', 'true');
    if (slide.isVideo) {
      cp.append('media_type', 'VIDEO');
      cp.append('video_url', slide.mediaUrl);
    } else {
      cp.append('image_url', slide.mediaUrl);
    }

    const cRes = await fetch(`${graphBase}/${igUserId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: cp.toString()
    });
    const cData = await cRes.json();
    if (!cRes.ok || cData.error) {
      throw new Error(`Slide ${i + 1} del carrusel falló: ${cData.error ? cData.error.message : 'Error creando slide'}`);
    }

    const childId = cData.id;
    const maxPolls = slide.isVideo ? 30 : 10;
    for (let attempt = 0; attempt < maxPolls; attempt++) {
      await new Promise((r) => setTimeout(r, 2500));
      const stRes = await fetch(
        `${graphBase}/${childId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
      );
      const stData = await stRes.json();
      if (stData.status_code === 'FINISHED') break;
      if (stData.status_code === 'ERROR' || stData.status_code === 'EXPIRED') {
        throw new Error(`Slide ${i + 1} rechazado por Instagram: ${stData.status || stData.status_code}`);
      }
    }
    childIds.push(childId);
  }

  const parentParams = new URLSearchParams();
  parentParams.append('access_token', accessToken);
  parentParams.append('media_type', 'CAROUSEL');
  parentParams.append('children', childIds.join(','));
  parentParams.append('caption', caption || '');

  const pRes = await fetch(`${graphBase}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: parentParams.toString()
  });
  const pData = await pRes.json();
  if (!pRes.ok || pData.error) {
    throw new Error(pData.error ? pData.error.message : 'Error creando contenedor padre de Carrusel');
  }

  const parentId = pData.id;
  for (let attempt = 0; attempt < 15; attempt++) {
    await new Promise((r) => setTimeout(r, 2500));
    const stRes = await fetch(
      `${graphBase}/${parentId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
    );
    const stData = await stRes.json();
    if (stData.status_code === 'FINISHED') break;
    if (stData.status_code === 'ERROR' || stData.status_code === 'EXPIRED') {
      throw new Error(`Instagram rechazó el carrusel: ${stData.status || stData.status_code}`);
    }
  }

  const pubParams = new URLSearchParams({ creation_id: parentId, access_token: accessToken });
  const pubRes = await fetch(`${graphBase}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: pubParams.toString()
  });
  const pubData = await pubRes.json();
  if (!pubRes.ok || pubData.error) {
    throw new Error(pubData.error ? pubData.error.message : 'Error en media_publish del carrusel');
  }

  return {
    containerId: parentId,
    publishId: pubData.id,
    label: `🎠 Carrusel (${items.length} slides) publicado en Instagram (ID: ${pubData.id})`
  };
}

async function publishFacebookCarousel({ fbPageId, pageToken, pageName, items, caption }) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const photoSlides = items.filter((it) => !it.isVideo);
  if (photoSlides.length < 2) {
    return await publishSingleFacebookPageItem({
      fbPageId,
      pageToken,
      pageName,
      mediaUrl: items[0].mediaUrl,
      isVideoFile: items[0].isVideo,
      caption,
      targetMode: 'POST'
    });
  }

  const attachedMedia = [];
  for (const slide of photoSlides) {
    const pp = new URLSearchParams({ url: slide.mediaUrl, published: 'false', access_token: pageToken });
    const pr = await fetch(`${graphBase}/${fbPageId}/photos`, { method: 'POST', body: pp }).then((r) => r.json());
    if (pr.error) throw new Error(pr.error.message);
    attachedMedia.push({ media_fbid: pr.id });
  }

  const feedRes = await fetch(`${graphBase}/${fbPageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: caption || '', attached_media: attachedMedia, access_token: pageToken })
  });
  const feedData = await feedRes.json();
  if (!feedRes.ok || feedData.error) {
    throw new Error(feedData.error ? feedData.error.message : 'Error publicando carrusel en Facebook');
  }
  return {
    publishId: feedData.id,
    label: `🎠 Carrusel (${photoSlides.length} fotos) publicado en Facebook (${pageName} • ID: ${feedData.id})`
  };
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

async function refreshTikTokAccessToken(tiktokConfig) {
  if (!tiktokConfig?.clientKey || !tiktokConfig?.clientSecret || !tiktokConfig?.refreshToken) {
    return null;
  }
  const params = new URLSearchParams({
    client_key: tiktokConfig.clientKey.trim(),
    client_secret: tiktokConfig.clientSecret.trim(),
    grant_type: 'refresh_token',
    refresh_token: tiktokConfig.refreshToken.trim()
  });

  const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const data = await res.json();
  if (!res.ok || data.error || !data.access_token) {
    throw new Error(
      data.error_description || data.error || 'No se pudo renovar automáticamente el Access Token de TikTok'
    );
  }
  tiktokConfig.accessToken = data.access_token;
  if (data.refresh_token) tiktokConfig.refreshToken = data.refresh_token;
  if (data.open_id) tiktokConfig.openId = data.open_id;
  tiktokConfig.tokenUpdatedAt = new Date().toISOString();
  return data.access_token;
}

async function publishVideoToTikTokViaFileUpload({ accessToken, mediaUrl, title, deliveryMode, tiktokConfig }) {
  let token = (accessToken || tiktokConfig?.accessToken || '').trim();
  if (!token && tiktokConfig?.refreshToken) {
    token = await refreshTikTokAccessToken(tiktokConfig);
  }
  if (!token) {
    throw new Error('Falta el Access Token de TikTok. Conéctalo en la pestaña "🎵 Paso a Paso TikTok".');
  }

  const norm = normalizeCloudMedia(mediaUrl, 'video');
  const downloadUrl = norm.publicUrl || mediaUrl;

  const videoRes = await fetch(downloadUrl, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36'
    }
  });
  if (!videoRes.ok) {
    throw new Error(`No se pudo descargar el archivo MP4 desde Google Drive/URL (HTTP ${videoRes.status}).`);
  }

  const contentType = (videoRes.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('text/html')) {
    throw new Error(
      'Google Drive devolvió una página HTML en vez del video MP4. Verifica que el archivo en Drive tenga acceso "Cualquier persona con el enlace".'
    );
  }

  const arrayBuf = await videoRes.arrayBuffer();
  const videoBuffer = Buffer.from(arrayBuf);
  const videoSize = videoBuffer.length;

  if (videoSize < 1024) {
    throw new Error('El archivo descargado es demasiado pequeño o no es un video MP4 válido.');
  }

  const queryCreatorInfo = async (tok) => {
    const ciRes = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({})
    });
    return { status: ciRes.status, data: await ciRes.json().catch(() => ({})) };
  };

  let ci = await queryCreatorInfo(token);
  if ((ci.status === 401 || ci.data?.error?.code === 'access_token_invalid') && tiktokConfig?.refreshToken) {
    token = await refreshTikTokAccessToken(tiktokConfig);
    ci = await queryCreatorInfo(token);
  }

  const privacyOptions =
    Array.isArray(ci.data?.data?.privacy_level_options) && ci.data.data.privacy_level_options.length > 0
      ? ci.data.data.privacy_level_options
      : ['SELF_ONLY'];

  const chunkSize = videoSize;
  const totalChunkCount = 1;
  const safeTitle = (title || 'Publicado desde SHEEP 100 #sheep100').slice(0, 2100);
  const wantInbox = deliveryMode === 'INBOX';

  const callInitEndpoint = async (useInbox, privLevel = 'SELF_ONLY') => {
    const endpoint = useInbox
      ? 'https://open.tiktokapis.com/v2/post/publish/inbox/video/init/'
      : 'https://open.tiktokapis.com/v2/post/publish/video/init/';

    const bodyObj = useInbox
      ? {
          source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoSize,
            chunk_size: chunkSize,
            total_chunk_count: totalChunkCount
          }
        }
      : {
          post_info: {
            title: safeTitle,
            privacy_level: privLevel,
            disable_duet: false,
            disable_comment: false,
            disable_stitch: false
          },
          source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoSize,
            chunk_size: chunkSize,
            total_chunk_count: totalChunkCount
          }
        };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(bodyObj)
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data, usedInbox: useInbox, privacyLevel: privLevel };
  };

  let initResult = null;
  if (wantInbox) {
    initResult = await callInitEndpoint(true, 'SELF_ONLY');
  } else {
    const order = privacyOptions.includes('PUBLIC_TO_EVERYONE')
      ? ['PUBLIC_TO_EVERYONE', 'SELF_ONLY']
      : ['SELF_ONLY'];
    for (const priv of order) {
      const attempt = await callInitEndpoint(false, priv);
      initResult = attempt;
      if (attempt.ok && attempt.data?.data?.upload_url) break;
    }
    if (!initResult?.ok || !initResult?.data?.data?.upload_url) {
      const fallbackInbox = await callInitEndpoint(true, 'SELF_ONLY');
      if (fallbackInbox.ok && fallbackInbox.data?.data?.upload_url) {
        initResult = fallbackInbox;
      }
    }
  }

  const errCode = initResult?.data?.error?.code;
  if (!initResult?.ok || (errCode && errCode !== 'ok') || !initResult?.data?.data?.upload_url) {
    const errMsg = initResult?.data?.error?.message || `Error HTTP ${initResult?.status}`;
    throw new Error(`TikTok API (${errCode || initResult?.status}): ${errMsg}`);
  }

  const publishId = initResult.data.data.publish_id;
  const uploadUrl = initResult.data.data.upload_url;
  const privacyLevel = initResult.privacyLevel || 'SELF_ONLY';

  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(videoSize),
      'Content-Range': `bytes 0-${videoSize - 1}/${videoSize}`
    },
    body: videoBuffer
  });

  if (!putRes.ok && putRes.status !== 201 && putRes.status !== 206) {
    const errText = await putRes.text().catch(() => '');
    throw new Error(`Error subiendo bytes MP4 a TikTok (HTTP ${putRes.status}): ${errText.slice(0, 180)}`);
  }

  const label = initResult.usedInbox
    ? `🎵 Video enviado a la Bandeja de TikTok (@${tiktokConfig?.username || 'TikTok'} • ID: ${publishId})`
    : `🎵 Video publicado en TikTok (@${tiktokConfig?.username || 'TikTok'} • Modo: ${privacyLevel === 'SELF_ONLY' ? 'Sandbox Privado' : 'Público'} • ID: ${publishId})`;

  return {
    publishId,
    usedInbox: initResult.usedInbox,
    privacyLevel,
    refreshedAccessToken: token,
    label
  };
}

async function publishCloudPost(post, metaConfig, mediaLibrary = [], tiktokConfig = {}) {
  const accessToken = (metaConfig.accessToken || '').trim();
  const igUserId = (metaConfig.igUserId || '').trim();
  const fbPageId = (metaConfig.fbPageId || '102786358439057').trim();

  const rawFormat =
    post.postFormat ||
    (post.mediaType === 'CAROUSEL'
      ? 'CAROUSEL'
      : post.mediaType === 'STORIES'
      ? 'STORY'
      : post.mediaType === 'REELS'
      ? 'REEL'
      : 'POST');
  const isCarousel = rawFormat === 'CAROUSEL' || post.mediaType === 'CAROUSEL';
  const carouselItems = isCarousel ? resolveCarouselItemsCloud(post, mediaLibrary) : [];

  let linkedType = 'image';
  if (post.mediaId && Array.isArray(mediaLibrary)) {
    const m = mediaLibrary.find((x) => x.id === post.mediaId);
    if (m && (m.type === 'video' || m.format === 'MP4')) linkedType = 'video';
  }

  const rawMediaUrl = (post.publicMediaUrl || post.mediaUrl || carouselItems[0]?.mediaUrl || '').trim();
  const isVid =
    linkedType === 'video' ||
    /\.mp4(\?|$)/i.test(rawMediaUrl) ||
    /drive\.usercontent\.google\.com\/download/i.test(rawMediaUrl) ||
    post.mediaType === 'REELS' ||
    post.mediaType === 'VIDEO' ||
    post.postFormat === 'REEL';

  const norm = normalizeCloudMedia(rawMediaUrl, isVid ? 'video' : 'image');
  const mediaUrl = norm.publicUrl || rawMediaUrl;

  const targetModes =
    rawFormat === 'BOTH'
      ? ['STORY', isVid ? 'REEL' : 'POST']
      : [rawFormat];

  const platforms = Array.isArray(post.platforms) && post.platforms.length ? post.platforms : ['instagram'];
  const wantInstagram = platforms.includes('instagram');
  const wantFacebook = platforms.includes('facebook');
  const wantTikTok = platforms.includes('tiktok');

  if ((wantInstagram || wantFacebook) && !accessToken) {
    throw new Error('No hay Access Token de Meta configurado en Firebase.');
  }

  if (isCarousel && carouselItems.length < 2) {
    throw new Error('El Carrusel programado no tiene al menos 2 slides con URL pública.');
  }

  const messages = [];
  let lastContainerId = '';
  let lastPublishId = '';
  let igPublishId = '';
  let fbPublishId = '';
  let tiktokPublishId = '';

  if (wantInstagram && igUserId) {
    if (isCarousel) {
      const igRes = await publishInstagramCarousel({
        igUserId,
        accessToken,
        items: carouselItems,
        caption: post.caption || ''
      });
      lastContainerId = igRes.containerId || lastContainerId;
      lastPublishId = igRes.publishId || lastPublishId;
      igPublishId = igRes.publishId || igPublishId;
      messages.push(igRes.label);
    } else {
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
        if (mode !== 'STORY' || !igPublishId) {
          igPublishId = igRes.publishId || igPublishId;
        }
        messages.push(igRes.label);
      }
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

    if (isCarousel) {
      const fbRes = await publishFacebookCarousel({
        fbPageId,
        pageToken,
        pageName,
        items: carouselItems,
        caption: post.caption || ''
      });
      lastPublishId = fbRes.publishId || lastPublishId;
      fbPublishId = fbRes.publishId || fbPublishId;
      messages.push(fbRes.label);
    } else {
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
        fbPublishId = fbRes.publishId || fbPublishId;
        messages.push(fbRes.label);
      }
    }
  }

  if (wantTikTok) {
    const ttMediaUrl = isCarousel ? carouselItems.find((it) => it.isVideo)?.mediaUrl : mediaUrl;
    if (!isCarousel && !isVid) {
      throw new Error('TikTok Content Posting API requiere un archivo de video MP4.');
    }
    if (isCarousel && !ttMediaUrl) {
      throw new Error('TikTok requiere un archivo de video MP4; desmarca TikTok en carruseles de solo fotos.');
    }
    const ttRes = await publishVideoToTikTokViaFileUpload({
      accessToken: tiktokConfig?.accessToken,
      mediaUrl: ttMediaUrl || mediaUrl,
      title: post.caption || post.title || '',
      deliveryMode: tiktokConfig?.deliveryMode || 'DIRECT',
      tiktokConfig
    });
    lastPublishId = ttRes.publishId || lastPublishId;
    tiktokPublishId = ttRes.publishId || tiktokPublishId;
    messages.push(ttRes.label);
  }

  return {
    containerId: lastContainerId,
    mediaPublishId: igPublishId || fbPublishId || tiktokPublishId || lastPublishId,
    igPublishId,
    fbPublishId,
    tiktokPublishId,
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

    console.log(`☁️ Procesando trabajo de relay en la nube: ${job.jobId} (${job.provider || job.mode})`);
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
      let doneJob = null;

      if (job.provider === 'TIKTOK_EXCHANGE') {
        const params = new URLSearchParams({
          client_key: (job.clientKey || job.client_key || '').trim(),
          client_secret: (job.clientSecret || job.client_secret || '').trim(),
          code: (job.code || '').trim(),
          grant_type: 'authorization_code',
          redirect_uri: (job.redirectUri || job.redirect_uri || '').trim()
        });
        const cv = (job.codeVerifier || job.code_verifier || '').trim();
        if (cv) {
          params.append('code_verifier', cv);
        }
        const tkRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
        const tkData = await tkRes.json();
        const tok = tkData.data || tkData;
        if (!tkRes.ok || tkData.error || !tok?.access_token) {
          throw new Error(tkData.error_description || tkData.error?.message || tkData.error || 'Error canjeando código OAuth de TikTok');
        }
        doneJob = {
          jobId: job.jobId,
          status: 'done',
          accessToken: tok.access_token,
          refreshToken: tok.refresh_token || '',
          openId: tok.open_id || '',
          scope: tok.scope || '',
          expiresIn: tok.expires_in || 86400
        };
      } else if (job.provider === 'TIKTOK_PUBLISH') {
        const ttResult = await publishVideoToTikTokViaFileUpload({
          accessToken: job.accessToken,
          mediaUrl: job.mediaUrl,
          title: job.title || job.caption || '',
          deliveryMode: job.deliveryMode || 'DIRECT',
          tiktokConfig: job.tiktokConfig || {}
        });
        doneJob = {
          jobId: job.jobId,
          status: 'done',
          publishId: ttResult.publishId,
          usedInbox: ttResult.usedInbox,
          privacyLevel: ttResult.privacyLevel,
          refreshedAccessToken: ttResult.refreshedAccessToken,
          label: ttResult.label
        };
      } else {
        const norm = normalizeCloudMedia(job.mediaUrl, 'video');
        const result = await publishFacebookThreePhaseVideo({
          fbPageId: job.fbPageId || '102786358439057',
          pageToken: job.pageToken,
          pageName: job.pageName || 'Facebook Page',
          mediaUrl: norm.publicUrl || job.mediaUrl,
          caption: job.caption || '',
          mode: job.mode === 'REEL' ? 'REEL' : 'STORY'
        });

        doneJob = {
          jobId: job.jobId,
          status: 'done',
          fbPublishId: result.publishId,
          videoId: result.videoId,
          label: result.label
        };
      }

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
      console.log(`✅ Relay completado: ${doneJob.label || doneJob.jobId}`);
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
      const result = await publishCloudPost(
        post,
        state.metaConfig || {},
        state.mediaLibrary || [],
        state.tiktokConfig || {}
      );
      post.status = 'published';
      post.publishedAt = new Date().toISOString();
      post.metaContainerId = result.containerId;
      post.metaPublishId = result.mediaPublishId;
      if (result.igPublishId) post.igPublishId = result.igPublishId;
      if (result.fbPublishId) post.fbPublishId = result.fbPublishId;
      if (result.tiktokPublishId) post.tiktokPublishId = result.tiktokPublishId;
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
