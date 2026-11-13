const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure directories exist
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');

[DATA_DIR, UPLOADS_DIR, PUBLIC_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(PUBLIC_DIR));

// Resolves cloud URLs (OneDrive, Google Drive, Dropbox) to direct download links
async function resolveDirectMediaUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let target = raw.trim();

  if (target.includes('1drv.ms/')) {
    try {
      const headRes = await fetch(target, { method: 'HEAD', redirect: 'follow' });
      target = headRes.url || target;
    } catch (_) {}
  }

  if (target.includes('onedrive.live.com')) {
    if (target.includes('/view.aspx')) {
      target = target.replace('/view.aspx', '/download');
    } else if (!target.includes('download=1')) {
      target += (target.includes('?') ? '&' : '?') + 'download=1';
    }
  } else if (target.includes('sharepoint.com') && !target.includes('download=1')) {
    target += (target.includes('?') ? '&' : '?') + 'download=1';
  } else if (target.includes('drive.google.com/file/d/')) {
    const m = target.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m && m[1]) {
      target = `https://drive.google.com/uc?export=download&id=${m[1]}`;
    }
  } else if (target.includes('dropbox.com')) {
    target = target.replace(/[?&]dl=0/i, '').replace(/[?&]dl=1/i, '');
    target += (target.includes('?') ? '&' : '?') + 'raw=1';
  }

  return target;
}

app.get('/api/resolve-media-url', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).json({ error: 'Missing url' });
  try {
    const directUrl = await resolveDirectMediaUrl(target);
    res.json({ directUrl });
  } catch (err) {
    res.json({ directUrl: target });
  }
});

// Helper: Refresh TikTok access_token using 365-day refresh_token
async function refreshTikTokAccessToken(tiktokConfig = {}) {
  const { clientKey, clientSecret, refreshToken } = tiktokConfig;
  if (!clientKey || !clientSecret || !refreshToken) {
    return tiktokConfig.accessToken || '';
  }
  try {
    const bodyParams = new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyParams.toString()
    });
    const data = await res.json();
    const tokenObj = data.data || data;
    if (res.ok && tokenObj.access_token) {
      tiktokConfig.accessToken = tokenObj.access_token;
      if (tokenObj.refresh_token) tiktokConfig.refreshToken = tokenObj.refresh_token;
      if (tokenObj.open_id) tiktokConfig.openId = tokenObj.open_id;
      tiktokConfig.expiresAt = Date.now() + (tokenObj.expires_in || 86400) * 1000;
      return tokenObj.access_token;
    }
  } catch (_) {}
  return tiktokConfig.accessToken || '';
}

// Helper: Download video from Google Drive / Cloud URL and upload binary via FILE_UPLOAD to TikTok
async function publishVideoToTikTokViaFileUpload({ accessToken, mediaUrl, title, deliveryMode = 'DIRECT', tiktokConfig = null }) {
  let activeToken = (accessToken || tiktokConfig?.accessToken || '').trim();
  if (tiktokConfig && tiktokConfig.refreshToken && (!activeToken || (tiktokConfig.expiresAt && Date.now() > tiktokConfig.expiresAt - 300000))) {
    activeToken = await refreshTikTokAccessToken(tiktokConfig);
  }
  if (!activeToken) {
    throw new Error('Falta conectar o autorizar tu Access Token de TikTok en la pestaña "Paso a Paso TikTok".');
  }

  const norm = normalizeCloudMediaServer(mediaUrl, 'video');
  const directDownloadUrl = norm.publicUrl || (await resolveDirectMediaUrl(mediaUrl));

  // 1. Descargar el binario MP4 desde Google Drive / Nube en memoria del servidor
  const fileRes = await fetch(directDownloadUrl, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36'
    }
  });
  if (!fileRes.ok) {
    throw new Error(`No se pudo descargar el video desde Google Drive/Nube (HTTP ${fileRes.status}). Verifica que el archivo tenga acceso "Cualquier persona con el enlace".`);
  }

  const dlContentType = (fileRes.headers.get('content-type') || '').toLowerCase();
  if (dlContentType.includes('text/html')) {
    throw new Error(
      'Google Drive devolvió una página HTML en vez del video MP4. Verifica que el archivo en Google Drive tenga acceso "Cualquier persona con el enlace".'
    );
  }

  const arrayBuf = await fileRes.arrayBuffer();
  const videoBuffer = Buffer.from(arrayBuf);
  const videoSize = videoBuffer.length;

  if (videoSize < 1000) {
    throw new Error('El archivo descargado desde el enlace no parece ser un video MP4 válido (tamaño demasiado pequeño).');
  }

  // 2. Consultar creator_info (y auto-renovar con refresh_token si expiró a las 24h)
  let privacyOptions = ['SELF_ONLY'];
  const queryCreator = async (tok) => {
    const cRes = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({})
    });
    return { status: cRes.status, data: await cRes.json().catch(() => ({})) };
  };

  let ci = await queryCreator(activeToken);
  if ((ci.status === 401 || ci.data?.error?.code === 'access_token_invalid') && tiktokConfig?.refreshToken) {
    activeToken = await refreshTikTokAccessToken(tiktokConfig);
    ci = await queryCreator(activeToken);
  }
  if (Array.isArray(ci.data?.data?.privacy_level_options) && ci.data.data.privacy_level_options.length > 0) {
    privacyOptions = ci.data.data.privacy_level_options;
  }

  // 3. Inicializar subida FILE_UPLOAD en TikTok (Waterfall inteligente: Público -> Sandbox Privado SELF_ONLY -> Bandeja Inbox)
  const useInbox = deliveryMode === 'INBOX';
  const safeTitle = (title || 'Publicación SHEEP 100').slice(0, 2200);

  const callTikTokInit = async (modeType, privacyLvl = 'SELF_ONLY') => {
    const endpoint =
      modeType === 'INBOX'
        ? 'https://open.tiktokapis.com/v2/post/publish/inbox/video/init/'
        : 'https://open.tiktokapis.com/v2/post/publish/video/init/';

    const payload =
      modeType === 'INBOX'
        ? {
            source_info: {
              source: 'FILE_UPLOAD',
              video_size: videoSize,
              chunk_size: videoSize,
              total_chunk_count: 1
            }
          }
        : {
            post_info: {
              title: safeTitle,
              privacy_level: privacyLvl,
              disable_duet: false,
              disable_comment: false,
              disable_stitch: false
            },
            source_info: {
              source: 'FILE_UPLOAD',
              video_size: videoSize,
              chunk_size: videoSize,
              total_chunk_count: 1
            }
          };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${activeToken}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(payload)
    });
    const d = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, data: d, modeType, privacyLvl };
  };

  let initAttempt = null;
  if (useInbox) {
    initAttempt = await callTikTokInit('INBOX');
  } else {
    const preferredOrder = privacyOptions.includes('PUBLIC_TO_EVERYONE')
      ? ['PUBLIC_TO_EVERYONE', 'SELF_ONLY']
      : ['SELF_ONLY'];

    for (const priv of preferredOrder) {
      const attempt = await callTikTokInit('DIRECT', priv);
      initAttempt = attempt;
      if (attempt.ok && attempt.data?.data?.upload_url) break;
    }

    if (!initAttempt?.ok || !initAttempt?.data?.data?.upload_url) {
      const inboxFallback = await callTikTokInit('INBOX');
      if (inboxFallback.ok && inboxFallback.data?.data?.upload_url) {
        initAttempt = inboxFallback;
      }
    }
  }

  const uploadUrl = initAttempt?.data?.data?.upload_url;
  const publishId = initAttempt?.data?.data?.publish_id;
  if (!uploadUrl) {
    const errCode = initAttempt?.data?.error?.code || initAttempt?.status || 'unknown_error';
    const errMsg = initAttempt?.data?.error?.message || JSON.stringify(initAttempt?.data || {});
    throw new Error(`TikTok rechazó inicializar el video (${errCode}): ${errMsg}`);
  }

  // 4. Transferir los bytes del MP4 vía PUT al upload_url de TikTok
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
    const putErrText = await putRes.text().catch(() => '');
    throw new Error(`Error subiendo binario MP4 a TikTok (HTTP ${putRes.status}): ${putErrText.slice(0, 180)}`);
  }

  const finalMode = initAttempt.modeType;
  const privacyLevel = initAttempt.privacyLvl || 'SELF_ONLY';
  const label =
    finalMode === 'INBOX'
      ? `🎵 Video enviado a tu Bandeja de Entrada de TikTok (ID: ${publishId} • Ábrelo en tu app de TikTok para publicar público)`
      : `🎵 Video publicado en TikTok (${privacyLevel === 'SELF_ONLY' ? 'Modo Sandbox Privado — cámbialo a Público en TikTok' : 'Público'} • ID: ${publishId})`;

  return {
    success: true,
    publishId,
    privacyLevel,
    deliveryMode: finalMode,
    refreshedAccessToken: activeToken,
    label
  };
}

// TikTok OAuth token exchange helper (no CORS restrictions on server)
app.post('/api/tiktok/exchange-code', async (req, res) => {
  const { client_key, client_secret, code, redirect_uri, code_verifier } = req.body || {};
  if (!client_key || !client_secret || !code) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (client_key, client_secret, code)' });
  }
  try {
    const bodyParams = new URLSearchParams();
    bodyParams.append('client_key', client_key);
    bodyParams.append('client_secret', client_secret);
    bodyParams.append('code', code);
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('redirect_uri', redirect_uri);
    if (code_verifier) {
      bodyParams.append('code_verifier', code_verifier);
    }

    const ttRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyParams.toString()
    });
    const data = await ttRes.json();
    const tokenObj = data.data || data;

    if (!ttRes.ok || data.error || !tokenObj?.access_token) {
      return res.status(400).json({
        error: data.error_description || data.error?.message || data.error || 'Error canjeando código OAuth en TikTok',
        raw: data
      });
    }

    try {
      const db = readDb();
      db.tiktokConfig = {
        ...(db.tiktokConfig || {}),
        clientKey: client_key,
        clientSecret: client_secret,
        accessToken: tokenObj.access_token,
        refreshToken: tokenObj.refresh_token || '',
        openId: tokenObj.open_id || '',
        expiresAt: Date.now() + (tokenObj.expires_in || 86400) * 1000,
        connected: true
      };
      writeDb(db);
    } catch (saveErr) {
      console.warn('Error guardando token de TikTok en db.json:', saveErr);
    }

    return res.json({
      ...data,
      accessToken: tokenObj.access_token,
      refreshToken: tokenObj.refresh_token || '',
      openId: tokenObj.open_id || '',
      expiresIn: tokenObj.expires_in || 86400
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error comunicando con TikTok API' });
  }
});

// TikTok direct video publisher via server (downloads from Google Drive & uploads via FILE_UPLOAD)
app.post('/api/tiktok/publish-video', async (req, res) => {
  const db = readDb();
  const {
    accessToken = db.tiktokConfig?.accessToken,
    mediaUrl,
    title,
    deliveryMode = db.tiktokConfig?.deliveryMode || 'DIRECT'
  } = req.body || {};

  if (!mediaUrl) {
    return res.status(400).json({ error: 'Falta mediaUrl del video para publicar en TikTok.' });
  }
  try {
    const result = await publishVideoToTikTokViaFileUpload({
      accessToken,
      mediaUrl,
      title,
      deliveryMode,
      tiktokConfig: db.tiktokConfig
    });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Error publicando en TikTok API' });
  }
});

// Configure Multer for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 40);
    cb(null, `${Date.now()}-${safeName}${ext}`);
  }
});
const upload = multer({ storage });

const DB_FILE = path.join(DATA_DIR, 'db.json');

function getInitialData() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(18, 0, 0, 0);

  const inTwoDays = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  inTwoDays.setHours(12, 30, 0, 0);

  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  yesterday.setHours(15, 0, 0, 0);

  return {
    metaConfig: {
      appId: '1728381135376111',
      appSecret: '',
      accessToken: 'EAAYj9BecTu8BSymPWwLLxxqZCAsWfcEmMeZCvgj9Swj5eEWRywnqCYe0rlrTusY9Wmc38c8Iu0Vsjwl3mbVPZCcbFAAd1Xn5jhaEYUVOtAi62M3lXw2ZAHjQ7Esfw4k54jB93ZA2bUZC9jWR8oNi21sz4JgFykUPz8zKEKwPDKii7bljWggBXe29MwHVVrGqyQpRphG2ZAjSj02ayoNVESYXN2LBxMV80Bnh3hEWn0fwGFVX0qXTeCrUyu7TIMZBztHQD0nEoCfvTZB61gX60eXTmx84ZD',
      igUserId: '17841444552571242',
      igUsername: 'cocuyografic',
      fbPageId: '102786358439057',
      fbPageName: 'Cocuyo Grafic',
      followersCount: 199,
      autoPublishEnabled: true,
      simulationFallback: true,
      geminiApiKey: '',
      wizardSteps: {
        step1_devAccount: true,
        step2_igGraphApi: true,
        step3_testerRole: true,
        step4_linkFbPage: true,
        step5_accessToken: true
      }
    },
    hashtagGroups: [
      {
        id: 'hg-1',
        name: 'Emprendimiento & Negocios',
        tags: '#emprendedores #negociosdigitales #marketingdigital #marcaPersonal #exito #productividad #estrategiadigital'
      },
      {
        id: 'hg-2',
        name: 'Reels Virales & Alcance',
        tags: '#reelsinstagram #viralreels #tendencia #parati #fyp #creadoresdecontenido #inspiraciondiaria'
      },
      {
        id: 'hg-3',
        name: 'E-commerce & Lanzamientos',
        tags: '#tiendavirtual #nuevacoleccion #comprasonline #enviosatodoelpais #calidadpremium #ofertaespecial'
      }
    ],
    mediaLibrary: [
      {
        id: 'media-1',
        title: 'Lanzamiento Café Especialidad.jpg',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        publicUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        format: 'JPG',
        tags: ['producto', 'lanzamiento', 'destacado'],
        createdAt: new Date(now.getTime() - 72 * 3600 * 1000).toISOString()
      },
      {
        id: 'media-2',
        title: 'Workspace & Productividad.jpg',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        publicUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        format: 'JPG',
        tags: ['detrasdecamaras', 'oficina'],
        createdAt: new Date(now.getTime() - 48 * 3600 * 1000).toISOString()
      },
      {
        id: 'media-3',
        title: 'Estética Minimalista Brand.jpg',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        publicUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        format: 'JPG',
        tags: ['branding', 'lifestyle'],
        createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'media-4',
        title: 'Diseño Creativo Studio.jpg',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        publicUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        format: 'JPG',
        tags: ['equipo', 'comunidad'],
        createdAt: new Date().toISOString()
      }
    ],
    posts: [
      {
        id: 'post-1',
        title: '5 Secretos para automatizar tus redes',
        caption: '¿Pasas horas pensando qué publicar cada día? 🚀\n\nCon nuestro nuevo flujo de planificación visual puedes dejar lista toda tu semana en 15 minutos.\n\n✅ Organiza tu cuadrícula visual\n✅ Genera copies magnéticos con IA\n✅ Publica automáticamente con Meta Graph API\n\nGuarda este post para aplicarlo hoy mismo 👇\n\n#marketingdigital #automatizacion #emprendedores #redesSociales',
        mediaId: 'media-2',
        mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        platforms: ['instagram', 'facebook'],
        status: 'scheduled',
        scheduledAt: tomorrow.toISOString(),
        firstComment: '¿Cuál es la red social que más tiempo te consume? ¡Te leemos!',
        gridOrder: 1,
        createdAt: now.toISOString(),
        logs: [
          {
            time: now.toISOString(),
            message: 'Publicación programada en cola automática.'
          }
        ]
      },
      {
        id: 'post-2',
        title: 'Detrás de cámaras de nuestra marca',
        caption: 'La constancia supera al talento cuando el talento no es constante ☕✨\n\nAsí empezamos la semana preparando todas las novedades que se vienen este mes.\n\n#detrasdecamaras #branding #emprendimiento #productividad',
        mediaId: 'media-1',
        mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        platforms: ['instagram'],
        status: 'scheduled',
        scheduledAt: inTwoDays.toISOString(),
        firstComment: '',
        gridOrder: 2,
        createdAt: now.toISOString(),
        logs: [
          {
            time: now.toISOString(),
            message: 'Publicación programada para Instagram Feed.'
          }
        ]
      },
      {
        id: 'post-3',
        title: 'Bienvenidos a nuestra nueva etapa',
        caption: 'Construyendo el futuro de nuestra marca paso a paso. Gracias por acompañarnos en este viaje 🙌🔥\n\n#marcaPersonal #negocios #exito',
        mediaId: 'media-3',
        mediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        platforms: ['instagram', 'tiktok'],
        status: 'published',
        scheduledAt: yesterday.toISOString(),
        publishedAt: yesterday.toISOString(),
        firstComment: '',
        gridOrder: 3,
        createdAt: yesterday.toISOString(),
        logs: [
          {
            time: yesterday.toISOString(),
            message: 'Publicado exitosamente (Contenedor Meta ID: 17895695668004550).'
          }
        ]
      }
    ],
    activityLogs: [
      {
        id: 'log-init',
        timestamp: now.toISOString(),
        type: 'info',
        title: 'Sistema de Automatización Activo',
        detail: 'El motor de programación revisa tus posts cada 30 segundos.'
      }
    ]
  };
}

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading DB, resetting:', err);
    return getInitialData();
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function addActivityLog(db, type, title, detail) {
  db.activityLogs = db.activityLogs || [];
  db.activityLogs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    type,
    title,
    detail
  });
  if (db.activityLogs.length > 60) {
    db.activityLogs = db.activityLogs.slice(0, 60);
  }
}

// ==========================================
// META INSTAGRAM GRAPH API 2-STEP PUBLISHER
// ==========================================
function extractGoogleDriveIdServer(url) {
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

function normalizeCloudMediaServer(rawUrl, type = 'image') {
  const clean = (rawUrl || '').trim();
  const driveId = extractGoogleDriveIdServer(clean);
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

// Helper: 3-phase upload to rupload.facebook.com for Facebook Page Stories (/video_stories) and Reels (/video_reels)
async function publishFacebookThreePhaseVideo({ fbPageId, pageToken, pageName, mediaUrl, caption, mode }) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const endpointName = mode === 'STORY' ? 'video_stories' : 'video_reels';

  // Phase 1: Start session
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

  // Phase 2: Transfer binary from public URL via rupload.facebook.com (Server-side avoids browser CORS 403)
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

  // Wait for Facebook video processing before calling finish
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

  // Phase 3: Finish session
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

// Endpoint for browser clients to execute Facebook 3-phase rupload without CORS blocks
app.post('/api/meta/fb-rupload', async (req, res) => {
  try {
    const db = readDb();
    const {
      fbPageId = db.metaConfig?.fbPageId || '102786358439057',
      pageToken: incomingPageToken,
      userToken = db.metaConfig?.accessToken || '',
      pageName: incomingPageName,
      mediaUrl: rawUrl,
      caption = '',
      mode = 'STORY'
    } = req.body || {};

    if (!rawUrl) {
      return res.status(400).json({ error: 'Falta mediaUrl para publicar en Facebook.' });
    }

    const norm = normalizeCloudMediaServer(rawUrl, 'video');
    const mediaUrl = norm.publicUrl || rawUrl;

    let pageToken = incomingPageToken;
    let pageName = incomingPageName || db.metaConfig?.fbPageName || 'Facebook Page';

    if (!pageToken) {
      if (!userToken) {
        return res.status(400).json({ error: 'Falta Token de acceso de Meta.' });
      }
      const pRes = await fetch(
        `https://graph.facebook.com/v22.0/${fbPageId}?fields=id,name,access_token&access_token=${encodeURIComponent(userToken)}`
      );
      const pData = await pRes.json();
      if (!pRes.ok || pData.error) {
        return res.status(400).json({ error: pData.error?.message || 'No se pudo obtener el Page Token de Facebook.' });
      }
      pageToken = pData.access_token || userToken;
      pageName = pData.name || pageName;
    }

    const result = await publishFacebookThreePhaseVideo({
      fbPageId,
      pageToken,
      pageName,
      mediaUrl,
      caption,
      mode: mode === 'REEL' ? 'REEL' : 'STORY'
    });

    return res.json({
      success: true,
      fbPublishId: result.publishId,
      videoId: result.videoId,
      label: result.label
    });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Error en fb-rupload' });
  }
});

function resolveCarouselItemsServer(post, mediaLibrary = []) {
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
    const norm = normalizeCloudMediaServer(rawUrl, isVideo ? 'video' : 'image');
    const finalUrl = norm.publicUrl || rawUrl;
    if (finalUrl) {
      resolved.push({ mediaUrl: finalUrl, isVideo });
    }
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
      const errMsg = cData.error ? `${cData.error.message} (Code ${cData.error.code})` : 'Error creando slide';
      throw new Error(`Slide ${i + 1} del carrusel falló: ${errMsg}`);
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
    const errMsg = pData.error ? `${pData.error.message} (Code ${pData.error.code})` : 'Error creando carrusel';
    throw new Error(`Contenedor padre Carrusel falló: ${errMsg}`);
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

  const pubParams = new URLSearchParams({
    creation_id: parentId,
    access_token: accessToken
  });
  const pubRes = await fetch(`${graphBase}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: pubParams.toString()
  });
  const pubData = await pubRes.json();
  if (!pubRes.ok || pubData.error) {
    const errMsg = pubData.error ? `${pubData.error.message} (Code ${pubData.error.code})` : 'Error en media_publish';
    throw new Error(`Publicación de carrusel falló: ${errMsg}`);
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
    const pp = new URLSearchParams({
      url: slide.mediaUrl,
      published: 'false',
      access_token: pageToken
    });
    const pr = await fetch(`${graphBase}/${fbPageId}/photos`, { method: 'POST', body: pp }).then((r) => r.json());
    if (pr.error) throw new Error(pr.error.message);
    attachedMedia.push({ media_fbid: pr.id });
  }

  const feedRes = await fetch(`${graphBase}/${fbPageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: caption || '',
      attached_media: attachedMedia,
      access_token: pageToken
    })
  });
  const feedData = await feedRes.json();
  if (!feedRes.ok || feedData.error) {
    throw new Error(feedData.error ? feedData.error.message : 'Error publicando carrusel en Facebook Page');
  }
  const finalId = feedData.id;
  return {
    publishId: finalId,
    label: `🎠 Carrusel (${photoSlides.length} fotos) publicado en Facebook (${pageName} • ID: ${finalId})`
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
    const errMsg = step1Data.error
      ? `${step1Data.error.message} (Code ${step1Data.error.code})`
      : 'Error desconocido al crear el contenedor en Instagram Graph API';
    throw new Error(`Paso 1 (Contenedor Instagram) falló: ${errMsg}`);
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
      throw new Error(`Instagram rechazó el procesamiento del archivo: ${statusData.status || 'Formato no compatible'}`);
    }
  }

  const publishParams = new URLSearchParams();
  publishParams.append('creation_id', creationId);
  publishParams.append('access_token', accessToken);

  const step2Res = await fetch(`${graphBase}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const step2Data = await step2Res.json();
  if (!step2Res.ok || step2Data.error) {
    const errMsg = step2Data.error
      ? `${step2Data.error.message} (Code ${step2Data.error.code})`
      : 'Error desconocido en media_publish';
    throw new Error(`Paso 2 (media_publish) falló: ${errMsg}`);
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
      // Strictly publish to /video_stories (never fall back to /videos!)
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

  // Standard Feed POST
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

async function publishToMetaInstagram(post, metaConfig) {
  const db = readDb();
  const { accessToken, igUserId, simulationFallback } = metaConfig;
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
  const carouselItems = isCarousel ? resolveCarouselItemsServer(post, db.mediaLibrary || []) : [];

  const rawMediaUrl = (post.publicMediaUrl || post.mediaUrl || carouselItems[0]?.mediaUrl || '').trim();
  const isVid =
    /\.mp4(\?|$)/i.test(rawMediaUrl) ||
    /drive\.usercontent\.google\.com\/download/i.test(rawMediaUrl) ||
    post.mediaType === 'REELS' ||
    post.mediaType === 'VIDEO' ||
    post.postFormat === 'REEL';
  const norm = normalizeCloudMediaServer(rawMediaUrl, isVid ? 'video' : 'image');
  const mediaUrl = norm.publicUrl || rawMediaUrl;

  const hasRealCredentials = Boolean(accessToken && (igUserId || metaConfig.fbPageId));
  const isPublicHttpUrl = isCarousel
    ? carouselItems.length >= 2 && carouselItems.every((it) => /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(it.mediaUrl))
    : /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);

  if (!hasRealCredentials) {
    if (simulationFallback) {
      return {
        success: true,
        mode: 'simulation',
        containerId: `SIM_CONTAINER_${Date.now()}`,
        mediaPublishId: `SIM_IG_POST_${Date.now()}`,
        message:
          'Publicado en Modo Simulación Local (Configura tu Token e IG User ID en la pestaña "Paso a Paso Meta" para envío real a Instagram Graph API).'
      };
    }
    throw new Error(
      'Falta configurar el Access Token o el Instagram Business User ID en la sección de Configuración de Meta.'
    );
  }

  if (isCarousel && carouselItems.length < 2) {
    throw new Error('Un Carrusel necesita entre 2 y 10 fotos/videos con URL pública https://.');
  }

  if (!isPublicHttpUrl) {
    if (simulationFallback) {
      return {
        success: true,
        mode: 'reminder_ready',
        containerId: `LOCAL_MEDIA_${Date.now()}`,
        mediaPublishId: `READY_TO_POST_${Date.now()}`,
        message:
          'Archivo local detectado: Marcado como listo con recordatorio. (Nota técnica de Meta: Para que la API de Instagram descargue la foto/video automáticamente, el archivo debe tener una URL pública https:// en formato JPG o MP4).'
      };
    }
    throw new Error(
      'La API de Meta exige que la imagen o video tenga una URL pública accesible en internet (https://...) en formato JPG o MP4.'
    );
  }

  const graphBase = 'https://graph.facebook.com/v22.0';
  const isVideoFile =
    isVid ||
    /\.mp4(\?|$)/i.test(mediaUrl) ||
    /drive\.usercontent\.google\.com\/download/i.test(mediaUrl);

  const targetModes =
    rawFormat === 'BOTH'
      ? ['STORY', isVideoFile ? 'REEL' : 'POST']
      : [rawFormat];

  const platforms = Array.isArray(post.platforms) && post.platforms.length ? post.platforms : ['instagram'];
  const wantInstagram = platforms.includes('instagram');
  const wantFacebook = platforms.includes('facebook');

  const messages = [];
  let lastContainerId = '';
  let lastPublishId = '';
  let igPublishId = '';
  let fbPublishId = '';
  let tiktokPublishId = '';

  // 1. PUBLICAR EN INSTAGRAM (Solo si el usuario seleccionó Instagram)
  if (wantInstagram) {
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
          isVideoFile,
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

  // 2. PUBLICAR EN PÁGINA DE FACEBOOK (Solo si el usuario seleccionó Facebook)
  if (wantFacebook) {
    const fbPageId = (metaConfig.fbPageId || '102786358439057').trim();
    const pageRes = await fetch(
      `${graphBase}/${fbPageId}?fields=id,name,access_token&access_token=${encodeURIComponent(accessToken)}`
    );
    const pageData = await pageRes.json();
    if (!pageRes.ok || pageData.error) {
      throw new Error(pageData.error ? pageData.error.message : 'No se pudo obtener el Page Access Token de Facebook');
    }
    const pageToken = pageData.access_token || accessToken;
    const pageName = pageData.name || metaConfig.fbPageName || 'Facebook Page';

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
          isVideoFile,
          caption: post.caption || '',
          targetMode: mode
        });
        lastPublishId = fbRes.publishId || lastPublishId;
        fbPublishId = fbRes.publishId || fbPublishId;
        messages.push(fbRes.label);
      }
    }
  }

  // 3. PUBLICAR EN TIKTOK (Solo si el usuario seleccionó TikTok)
  const wantTikTok = platforms.includes('tiktok');
  if (wantTikTok) {
    const ttMediaUrl = isCarousel ? carouselItems.find((it) => it.isVideo)?.mediaUrl : mediaUrl;
    if (!ttMediaUrl && isCarousel) {
      throw new Error('TikTok requiere un video MP4; para carruseles de solo fotos desmarca TikTok.');
    }
    const ttCfg = post._tiktokConfig || db.tiktokConfig || {};
    const ttRes = await publishVideoToTikTokViaFileUpload({
      accessToken: ttCfg.accessToken,
      mediaUrl: ttMediaUrl || mediaUrl,
      title: post.caption || post.title || 'Publicación SHEEP 100',
      deliveryMode: ttCfg.deliveryMode || 'DIRECT',
      tiktokConfig: ttCfg
    });
    lastPublishId = ttRes.publishId || lastPublishId;
    tiktokPublishId = ttRes.publishId || tiktokPublishId;
    messages.push(ttRes.label);
  }

  return {
    success: true,
    mode: 'live_meta_api',
    containerId: lastContainerId,
    mediaPublishId: igPublishId || fbPublishId || tiktokPublishId || lastPublishId,
    igPublishId,
    fbPublishId,
    tiktokPublishId,
    message: messages.join(' + ')
  };
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Get entire state
app.get('/api/state', (req, res) => {
  const db = readDb();
  res.json(db);
});

// Sync full state from Firebase Cloud / Client
app.post('/api/state/sync', (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== 'object') {
      return res.status(400).json({ error: 'Payload inválido' });
    }
    const current = readDb();
    const pickNonEmpty = (a, b) => (a && String(a).trim() !== '' ? a : b);
    const mergedTikTok = {
      ...(current.tiktokConfig || {}),
      ...(incoming.tiktokConfig || {}),
      clientKey: pickNonEmpty(incoming.tiktokConfig?.clientKey, current.tiktokConfig?.clientKey || ''),
      clientSecret: pickNonEmpty(incoming.tiktokConfig?.clientSecret, current.tiktokConfig?.clientSecret || ''),
      accessToken: pickNonEmpty(incoming.tiktokConfig?.accessToken, current.tiktokConfig?.accessToken || ''),
      refreshToken: pickNonEmpty(incoming.tiktokConfig?.refreshToken, current.tiktokConfig?.refreshToken || ''),
      openId: pickNonEmpty(incoming.tiktokConfig?.openId, current.tiktokConfig?.openId || '')
    };
    const mergedMeta = {
      ...(current.metaConfig || {}),
      ...(incoming.metaConfig || {}),
      accessToken: pickNonEmpty(incoming.metaConfig?.accessToken, current.metaConfig?.accessToken || ''),
      appSecret: pickNonEmpty(incoming.metaConfig?.appSecret, current.metaConfig?.appSecret || ''),
      fbPageAccessToken: pickNonEmpty(incoming.metaConfig?.fbPageAccessToken, current.metaConfig?.fbPageAccessToken || '')
    };
    const merged = {
      ...current,
      metaConfig: mergedMeta,
      tiktokConfig: mergedTikTok,
      mediaLibrary: Array.isArray(incoming.mediaLibrary) ? incoming.mediaLibrary : current.mediaLibrary,
      posts: Array.isArray(incoming.posts) ? incoming.posts : current.posts,
      hashtagGroups: Array.isArray(incoming.hashtagGroups) ? incoming.hashtagGroups : current.hashtagGroups,
      activityLogs: Array.isArray(incoming.activityLogs) ? incoming.activityLogs : current.activityLogs
    };
    writeDb(merged);
    res.json({ success: true, state: merged });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload file to local Media Library
app.post('/api/media/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo.' });
    }
    const db = readDb();
    const ext = path.extname(req.file.originalname).replace('.', '').toUpperCase() || 'JPG';
    const isVideo = /mp4|mov|webm/i.test(ext);
    const localUrl = `/uploads/${req.file.filename}`;
    const publicUrl = req.body.publicUrl ? req.body.publicUrl.trim() : '';
    const tags = req.body.tags
      ? req.body.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : ['subido'];

    const newMedia = {
      id: `media-${Date.now()}`,
      title: req.body.title || req.file.originalname,
      url: localUrl,
      publicUrl: publicUrl || '',
      type: isVideo ? 'video' : 'image',
      format: ext,
      tags,
      warningPng: ext === 'PNG' ? 'Nota Meta API: Instagram Graph API prefiere archivos JPG para publicación directa.' : null,
      createdAt: new Date().toISOString()
    };

    db.mediaLibrary.unshift(newMedia);
    addActivityLog(db, 'info', 'Archivo subido a Media Library', `${newMedia.title} (${ext})`);
    writeDb(db);
    res.json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add media by Public URL
app.post('/api/media/url', (req, res) => {
  const { title, url, type, tags } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Debes proporcionar una URL.' });
  }
  const db = readDb();
  const isVideo = type === 'video' || /\.mp4(\?|$)/i.test(url);
  const isPng = /\.png(\?|$)/i.test(url);
  const norm = normalizeCloudMediaServer(url, isVideo ? 'video' : 'image');

  const newMedia = {
    id: `media-${Date.now()}`,
    title: title || 'Recurso Multimedia Externo',
    originalUrl: url.trim(),
    driveId: norm.driveId || null,
    url: norm.thumbUrl,
    publicUrl: norm.publicUrl,
    type: isVideo ? 'video' : 'image',
    format: isVideo ? 'MP4' : isPng ? 'PNG' : 'JPG',
    tags: Array.isArray(tags)
      ? tags
      : (tags || 'url-publica')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
    createdAt: new Date().toISOString()
  };

  db.mediaLibrary.unshift(newMedia);
  addActivityLog(db, 'info', 'Multimedia por URL agregada', newMedia.title);
  writeDb(db);
  res.json(newMedia);
});

// Delete media item
app.delete('/api/media/:id', (req, res) => {
  const db = readDb();
  db.mediaLibrary = db.mediaLibrary.filter((m) => m.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Create or update a Post or Story
app.post('/api/posts', (req, res) => {
  const db = readDb();
  const {
    id,
    title,
    caption,
    mediaId,
    mediaUrl,
    publicMediaUrl,
    mediaType,
    postFormat,
    carouselItems,
    platforms,
    status,
    scheduledAt,
    firstComment,
    metrics
  } = req.body;

  if (id) {
    const idx = db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Publicación no encontrada.' });
    const existing = db.posts[idx];
    const updated = {
      ...existing,
      title: title ?? existing.title,
      caption: caption ?? existing.caption,
      mediaId: mediaId ?? existing.mediaId,
      mediaUrl: mediaUrl ?? existing.mediaUrl,
      publicMediaUrl: publicMediaUrl ?? existing.publicMediaUrl,
      mediaType: mediaType ?? existing.mediaType,
      postFormat: postFormat ?? existing.postFormat ?? 'POST',
      carouselItems: carouselItems ?? existing.carouselItems,
      platforms: platforms ?? existing.platforms,
      status: status ?? existing.status,
      scheduledAt: scheduledAt ?? existing.scheduledAt,
      firstComment: firstComment ?? existing.firstComment,
      metrics: metrics ?? existing.metrics,
      logs: [
        ...(existing.logs || []),
        {
          time: new Date().toISOString(),
          message: `Actualizado (${status || existing.status})`
        }
      ]
    };
    db.posts[idx] = updated;
    addActivityLog(db, 'info', 'Publicación actualizada', updated.title || 'Sin título');
    writeDb(db);
    return res.json(updated);
  }

  const newPost = {
    id: `post-${Date.now()}`,
    title: title || 'Nueva Publicación',
    caption: caption || '',
    mediaId: mediaId || null,
    mediaUrl: mediaUrl || '',
    publicMediaUrl: publicMediaUrl || mediaUrl || '',
    mediaType: mediaType || 'IMAGE',
    postFormat:
      postFormat ||
      (mediaType === 'CAROUSEL'
        ? 'CAROUSEL'
        : mediaType === 'STORIES'
        ? 'STORY'
        : mediaType === 'REELS'
        ? 'REEL'
        : 'POST'),
    carouselItems: Array.isArray(carouselItems) ? carouselItems : undefined,
    platforms: Array.isArray(platforms) && platforms.length ? platforms : ['instagram'],
    status: status || 'scheduled',
    scheduledAt: scheduledAt || new Date(Date.now() + 3600 * 1000).toISOString(),
    firstComment: firstComment || '',
    gridOrder: 0,
    createdAt: new Date().toISOString(),
    logs: [
      {
        time: new Date().toISOString(),
        message: `Creada en estado "${status || 'scheduled'}"`
      }
    ]
  };

  db.posts.unshift(newPost);
  addActivityLog(
    db,
    'success',
    newPost.status === 'draft' ? 'Borrador guardado' : 'Publicación programada',
    `${newPost.title} para ${new Date(newPost.scheduledAt).toLocaleString('es-ES')}`
  );
  writeDb(db);
  res.json(newPost);
});

// Reschedule post (Drag & Drop on Calendar)
app.patch('/api/posts/:id/schedule', (req, res) => {
  const { scheduledAt, status } = req.body;
  const db = readDb();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada.' });

  if (scheduledAt) post.scheduledAt = scheduledAt;
  if (status) post.status = status;
  post.logs = post.logs || [];
  post.logs.push({
    time: new Date().toISOString(),
    message: `Reprogramada en calendario para ${new Date(post.scheduledAt).toLocaleString('es-ES')}`
  });

  addActivityLog(db, 'info', 'Calendario actualizado (Drag & Drop)', `${post.title} movido a nueva fecha`);
  writeDb(db);
  res.json(post);
});

// Reorder Instagram Grid Preview
app.post('/api/posts/reorder-grid', (req, res) => {
  const { orderedIds } = req.body;
  const db = readDb();
  if (Array.isArray(orderedIds)) {
    orderedIds.forEach((id, index) => {
      const post = db.posts.find((p) => p.id === id);
      if (post) post.gridOrder = index + 1;
    });
    writeDb(db);
  }
  res.json({ success: true, posts: db.posts });
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
  const db = readDb();
  db.posts = db.posts.filter((p) => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// Publish Now endpoint
app.post('/api/posts/:id/publish', async (req, res) => {
  const db = readDb();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada.' });

  try {
    const result = await publishToMetaInstagram(post, db.metaConfig);
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
      message: result.message
    });

    addActivityLog(db, 'success', 'Publicación Ejecutada', `${post.title}: ${result.message}`);
    writeDb(db);
    res.json({ success: true, post, result });
  } catch (err) {
    post.status = 'failed';
    post.logs = post.logs || [];
    post.logs.push({
      time: new Date().toISOString(),
      message: `Error al publicar: ${err.message}`
    });
    addActivityLog(db, 'error', 'Error de Publicación en Meta', `${post.title}: ${err.message}`);
    writeDb(db);
    res.status(400).json({ error: err.message, post });
  }
});

// Save Meta Configuration & Wizard Steps
app.post('/api/meta/config', (req, res) => {
  const db = readDb();
  db.metaConfig = {
    ...db.metaConfig,
    ...req.body,
    wizardSteps: {
      ...(db.metaConfig.wizardSteps || {}),
      ...(req.body.wizardSteps || {})
    }
  };
  addActivityLog(db, 'info', 'Configuración de Meta guardada', 'Credenciales y progreso actualizados.');
  writeDb(db);
  res.json(db.metaConfig);
});

// Auto-Detect Instagram Business Account & Facebook Page from Access Token
app.post('/api/meta/verify-token', async (req, res) => {
  const db = readDb();
  const token = (req.body.accessToken || db.metaConfig.accessToken || '').trim();
  if (!token) {
    return res.status(400).json({
      error: 'Pega primero tu Access Token generado en Graph API Explorer.'
    });
  }

  try {
    let pageWithIg = null;
    let igAccount = null;
    let pageName = '';
    let pageId = '';
    let detectedAppId = '';

    // 1. Intentar por me/accounts (Páginas clásicas)
    const graphUrl = `https://graph.facebook.com/v22.0/me/accounts?fields=id,name,instagram_business_account{id,username,name,profile_picture_url,followers_count,media_count}&access_token=${encodeURIComponent(token)}`;
    const response = await fetch(graphUrl);
    const data = await response.json();

    if (response.ok && data.data && data.data.length > 0) {
      pageWithIg = data.data.find((p) => p.instagram_business_account);
      if (pageWithIg) {
        igAccount = pageWithIg.instagram_business_account;
        pageName = pageWithIg.name;
        pageId = pageWithIg.id;
      }
    }

    // 2. Fallback Principal: Inspeccionar debug_token y granular_scopes (Resuelve cuando la Página está en Meta Business Suite y /me/accounts viene vacío)
    if (!igAccount) {
      try {
        const dbgUrl = `https://graph.facebook.com/v22.0/debug_token?input_token=${encodeURIComponent(token)}&access_token=${encodeURIComponent(token)}`;
        const dbgRes = await fetch(dbgUrl);
        const dbgData = await dbgRes.json();
        const tokenInfo = dbgData?.data;
        if (tokenInfo) {
          if (tokenInfo.app_id) detectedAppId = String(tokenInfo.app_id);
          const gScopes = Array.isArray(tokenInfo.granular_scopes) ? tokenInfo.granular_scopes : [];
          const pageIds = [];
          const igIds = [];
          for (const gs of gScopes) {
            if ((gs.scope === 'pages_show_list' || gs.scope === 'pages_read_engagement') && Array.isArray(gs.target_ids)) {
              gs.target_ids.forEach((id) => { if (!pageIds.includes(id)) pageIds.push(id); });
            }
            if (gs.scope && gs.scope.startsWith('instagram_') && Array.isArray(gs.target_ids)) {
              gs.target_ids.forEach((id) => { if (!igIds.includes(id)) igIds.push(id); });
            }
          }

          // Consultar cada Page ID autorizado directamente
          for (const pid of pageIds) {
            const pRes = await fetch(
              `https://graph.facebook.com/v22.0/${pid}?fields=id,name,instagram_business_account{id,username,name,profile_picture_url,followers_count,media_count}&access_token=${encodeURIComponent(token)}`
            );
            const pData = await pRes.json();
            if (pRes.ok && !pData.error) {
              pageId = pData.id || pid;
              pageName = pData.name || pageName;
              if (pData.instagram_business_account) {
                igAccount = pData.instagram_business_account;
                break;
              }
            }
          }

          // Si aún no tenemos igAccount o queremos enriquecerlo desde igIds directos
          if (!igAccount && igIds.length > 0) {
            for (const iid of igIds) {
              const iRes = await fetch(
                `https://graph.facebook.com/v22.0/${iid}?fields=id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${encodeURIComponent(token)}`
              );
              const iData = await iRes.json();
              if (iRes.ok && !iData.error && iData.id) {
                igAccount = iData;
                break;
              }
            }
          }
        }
      } catch (_) {}
    }

    // 3. Fallback: Si el token es de Página o NPE, consultar /me directo
    if (!igAccount) {
      try {
        const directUrl = `https://graph.facebook.com/v22.0/me?fields=id,name,instagram_business_account{id,username,name,followers_count}&access_token=${encodeURIComponent(token)}`;
        const directRes = await fetch(directUrl);
        const directData = await directRes.json();
        if (directRes.ok && directData.instagram_business_account) {
          igAccount = directData.instagram_business_account;
          pageName = directData.name || 'Página de Facebook';
          pageId = directData.id;
        }
      } catch (_) {}
    }

    // 4. Fallback: Consultar Portafolios Comerciales (Meta Business Suite / me/businesses)
    if (!igAccount) {
      try {
        const bizUrl = `https://graph.facebook.com/v22.0/me/businesses?fields=id,name,instagram_accounts{id,username},client_pages{id,name,instagram_business_account{id,username}},owned_pages{id,name,instagram_business_account{id,username}}&access_token=${encodeURIComponent(token)}`;
        const bizRes = await fetch(bizUrl);
        const bizData = await bizRes.json();
        if (bizRes.ok && bizData.data) {
          for (const b of bizData.data) {
            if (b.instagram_accounts?.data?.length > 0) {
              igAccount = b.instagram_accounts.data[0];
              pageName = b.name;
              pageId = b.id;
              break;
            }
            const p = (b.owned_pages?.data || []).concat(b.client_pages?.data || []).find((x) => x.instagram_business_account);
            if (p) {
              igAccount = p.instagram_business_account;
              pageName = p.name;
              pageId = p.id;
              break;
            }
          }
        }
      } catch (_) {}
    }

    if (!igAccount) {
      return res.status(200).json({
        validToken: true,
        pagesFound: 0,
        warning:
          'Meta devolvió una lista vacía para este token. Asegúrate de marcar tu Página y tu cuenta de Instagram al generar el token en Graph API Explorer.'
      });
    }

    db.metaConfig.accessToken = token;
    if (detectedAppId) db.metaConfig.appId = detectedAppId;
    db.metaConfig.fbPageId = pageId;
    db.metaConfig.fbPageName = pageName || 'Página Conectada';
    db.metaConfig.igUserId = igAccount.id;
    db.metaConfig.igUsername = igAccount.username || igAccount.name || '';
    if (igAccount.followers_count) db.metaConfig.followersCount = igAccount.followers_count;
    db.metaConfig.wizardSteps = {
      step1_devAccount: true,
      step2_igGraphApi: true,
      step3_testerRole: true,
      step4_linkFbPage: true,
      step5_accessToken: true
    };

    addActivityLog(
      db,
      'success',
      'Cuenta de Instagram Business Conectada',
      `@${db.metaConfig.igUsername} (ID: ${igAccount.id}) vinculada a la página "${pageName}"`
    );
    writeDb(db);

    res.json({
      validToken: true,
      connected: true,
      fbPage: { id: pageId, name: pageName },
      igAccount,
      metaConfig: db.metaConfig
    });
  } catch (err) {
    res.status(500).json({ error: `Error al conectar con Meta Graph API: ${err.message}` });
  }
});

// Exchange Short-Lived Token for 60-Day Long-Lived Token
app.post('/api/meta/exchange-token', async (req, res) => {
  const db = readDb();
  const appId = (req.body.appId || db.metaConfig.appId || '').trim();
  const appSecret = (req.body.appSecret || db.metaConfig.appSecret || '').trim();
  const shortToken = (req.body.accessToken || db.metaConfig.accessToken || '').trim();

  if (!appId || !appSecret || !shortToken) {
    return res.status(400).json({
      error: 'Para canjear un Token de 60 días necesitas ingresar App ID, App Secret y tu Access Token actual.'
    });
  }

  try {
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(
      appId
    )}&client_secret=${encodeURIComponent(appSecret)}&fb_exchange_token=${encodeURIComponent(shortToken)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(400).json({
        error: data.error ? data.error.message : 'No se pudo canjear el token de larga duración.'
      });
    }

    db.metaConfig.appId = appId;
    db.metaConfig.appSecret = appSecret;
    db.metaConfig.accessToken = data.access_token;
    addActivityLog(
      db,
      'success',
      'Token extendido a 60 días',
      'Tu Access Token de Meta fue convertido a larga duración exitosamente.'
    );
    writeDb(db);

    res.json({
      success: true,
      accessToken: data.access_token,
      expiresInSeconds: data.expires_in || 5184000
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Copy & Hashtags Generator (Supports Gemini API + Built-in Smart Copywriter)
app.post('/api/ai/generate', async (req, res) => {
  const { topic, tone, platform, includeEmojis, callToAction } = req.body;
  const db = readDb();
  const cleanTopic = (topic || 'Nuestro producto o servicio estrella').trim();
  const selectedTone = tone || 'profesional';
  const selectedPlatform = platform || 'instagram';

  // If user configured a Gemini API key, call Gemini 2.5 Flash
  if (db.metaConfig.geminiApiKey && db.metaConfig.geminiApiKey.trim()) {
    try {
      const prompt = `Actúa como un estratega experto en redes sociales y copywriter para ${selectedPlatform}.
Genera 3 opciones de copy atractivas sobre el tema: "${cleanTopic}".
Tono: ${selectedTone}.
Objetivo / Llamado a la acción: ${callToAction || 'Generar interacción y guardados'}.
${includeEmojis !== false ? 'Incluye emojis estratégicos y saltos de línea limpios.' : 'Usa pocos emojis.'}
Al final incluye una lista de 12 hashtags altamente relevantes.
Devuelve el resultado en formato JSON con las claves:
{ "options": [{ "title": "...", "caption": "...", "firstComment": "..." }], "hashtags": "#tag1 #tag2 ..." }`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
          db.metaConfig.geminiApiKey.trim()
        )}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );
      const geminiData = await geminiRes.json();
      const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        return res.json({ source: 'gemini', ...parsed });
      }
    } catch (e) {
      console.warn('Fallback a generador local de IA:', e.message);
    }
  }

  // Built-in Smart Copywriting Templates tailored by tone & platform
  const ctaLine =
    callToAction ||
    'Cuéntanos tu opinión en los comentarios y guarda este post para consultarlo después 👇';

  const slugTag = cleanTopic
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñ\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 4)
    .map((w) => `#${w.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`)
    .join(' ');

  const defaultHashtags = `${slugTag || '#contenido'} #estrategiadigital #creadoresdecontenido #marketingdigital #emprendedores #marcapersonal #instagramgrowth #negociosonline #tendencias2026`;

  const options = [
    {
      title: `Opción 1: Gancho Directo + Valor (${selectedTone})`,
      caption: `¿Sabías que la clave en ${cleanTopic} está en los pequeños detalles que casi nadie aplica? 🚀✨\n\nHoy te compartimos los 3 pilares que están marcando la diferencia:\n\n1️⃣ Claridad desde el primer segundo para captar la atención.\n2️⃣ Consistencia visual que transmite confianza inmediata.\n3️⃣ Un sistema paso a paso que trabaja por ti.\n\n💡 ${ctaLine}\n\n${defaultHashtags}`,
      firstComment: `🔥 Si quieres que profundicemos más sobre "${cleanTopic}", deja un "QUIERO" aquí abajo y te respondemos.`
    },
    {
      title: `Opción 2: Storytelling & Conexión Humana`,
      caption: `Hace un tiempo pensábamos que dominar ${cleanTopic} requería complicarse durante horas... hasta que cambiamos el enfoque por completo ☕🙌\n\nCuando simplificas tu proceso y te enfocas en aportar valor real a tu comunidad, los resultados llegan solos.\n\n✨ Menos fricción.\n✨ Más autenticidad.\n✨ Mejor conexión con tu audiencia ideal.\n\n${ctaLine}\n\n${defaultHashtags}`,
      firstComment: `¿Cuál ha sido tu mayor reto con ${cleanTopic} este mes? ¡Te leemos! 👇`
    },
    {
      title: `Opción 3: Formato Corto / Ideal para Reels & TikTok`,
      caption: `Guarda esto antes de seguir haciendo scroll 📌🔥\n\nAsí es como transformamos ${cleanTopic} en resultados reales sin perder horas en el intento:\n\n✅ Paso 1: Define tu objetivo del día\n✅ Paso 2: Prepara tu contenido visual en bloque\n✅ Paso 3: Automatiza y mide qué conecta mejor\n\n👉 ${ctaLine}\n\n${defaultHashtags}`,
      firstComment: `Comparte este post con alguien que necesite ver esto hoy 🚀`
    }
  ];

  res.json({
    source: 'smart-engine',
    options,
    hashtags: defaultHashtags
  });
});

// ==========================================
// BACKGROUND SCHEDULER (Runs every 30s)
// ==========================================
let isSchedulerRunning = false;

const FIRESTORE_PRINCIPAL_URL =
  'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/principal';

setInterval(async () => {
  if (isSchedulerRunning) return;
  isSchedulerRunning = true;
  try {
    // 1. Sincronizar y verificar cola directamente en Firebase Cloud Firestore (sheep100/principal)
    try {
      const fsRes = await fetch(FIRESTORE_PRINCIPAL_URL);
      if (fsRes.ok) {
        const fsDoc = await fsRes.json();
        const rawStr = fsDoc?.fields?.payload?.stringValue;
        if (rawStr) {
          const cloudState = JSON.parse(rawStr);
          if (cloudState.metaConfig?.autoPublishEnabled !== false && Array.isArray(cloudState.posts)) {
            const now = new Date();
            const dueCloud = cloudState.posts.filter(
              (p) => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now
            );
            if (dueCloud.length > 0) {
              for (const post of dueCloud) {
                try {
                  const result = await publishToMetaInstagram(post, cloudState.metaConfig);
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
                } catch (err) {
                  post.status = 'failed';
                  post.logs = post.logs || [];
                  post.logs.push({
                    time: new Date().toISOString(),
                    message: `[Auto-Cloud Error ☁️] ${err.message}`
                  });
                }
              }
              await fetch(FIRESTORE_PRINCIPAL_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fields: {
                    payload: { stringValue: JSON.stringify(cloudState) },
                    savedAt: { stringValue: new Date().toISOString() },
                    updatedBy: { stringValue: `server_scheduler_${Date.now()}` }
                  }
                })
              });
              writeDb(cloudState);
              isSchedulerRunning = false;
              return;
            }
          }
        }
      }
    } catch (_) {}

    // 2. Respaldo en db.json local
    const db = readDb();
    if (!db.metaConfig?.autoPublishEnabled) {
      isSchedulerRunning = false;
      return;
    }

    const now = new Date();
    const duePosts = db.posts.filter(
      (p) => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now
    );

    if (duePosts.length > 0) {
      for (const post of duePosts) {
        try {
          const result = await publishToMetaInstagram(post, db.metaConfig);
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
            message: `[Auto-Scheduler] ${result.message}`
          });
          addActivityLog(
            db,
            'success',
            'Publicación Automática Completada',
            `"${post.title}" se publicó a su hora programada.`
          );
        } catch (err) {
          post.status = 'failed';
          post.logs = post.logs || [];
          post.logs.push({
            time: new Date().toISOString(),
            message: `[Auto-Scheduler Error] ${err.message}`
          });
          addActivityLog(
            db,
            'error',
            'Fallo en Publicación Automática',
            `"${post.title}": ${err.message}`
          );
        }
      }
      writeDb(db);
    }
  } catch (err) {
    console.error('Scheduler error:', err);
  } finally {
    isSchedulerRunning = false;
  }
}, 30000);

// ==========================================
// CLOUD RELAY WATCHER FOR REMOTE/MOBILE CLIENTS
// ==========================================
let isRelayBusy = false;
const FIRESTORE_RELAY_URL =
  'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/fb_rupload_relay';

setInterval(async () => {
  if (isRelayBusy) return;
  isRelayBusy = true;
  try {
    const res = await fetch(FIRESTORE_RELAY_URL);
    if (!res.ok) {
      isRelayBusy = false;
      return;
    }
    const docData = await res.json();
    const rawPayload = docData?.fields?.payload?.stringValue;
    if (!rawPayload) {
      isRelayBusy = false;
      return;
    }
    const job = JSON.parse(rawPayload);
    if (job.status !== 'pending' || !job.jobId) {
      isRelayBusy = false;
      return;
    }

    // Mark as processing
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
      let doneJob;
      if (job.provider === 'TIKTOK_EXCHANGE') {
        const bodyParams = new URLSearchParams({
          client_key: (job.clientKey || job.client_key || '').trim(),
          client_secret: (job.clientSecret || job.client_secret || '').trim(),
          code: (job.code || '').trim(),
          grant_type: 'authorization_code',
          redirect_uri: (job.redirectUri || job.redirect_uri || '').trim()
        });
        const cv = (job.codeVerifier || job.code_verifier || '').trim();
        if (cv) bodyParams.append('code_verifier', cv);
        const ttRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: bodyParams.toString()
        });
        const ttData = await ttRes.json();
        const tokenObj = ttData.data || ttData;
        if (!ttRes.ok || !tokenObj?.access_token) {
          throw new Error(ttData.error_description || ttData.error?.message || JSON.stringify(ttData));
        }
        doneJob = {
          jobId: job.jobId,
          status: 'done',
          accessToken: tokenObj.access_token,
          refreshToken: tokenObj.refresh_token || '',
          openId: tokenObj.open_id || '',
          expiresIn: tokenObj.expires_in || 86400
        };
      } else if (job.provider === 'TIKTOK_PUBLISH') {
        const ttResult = await publishVideoToTikTokViaFileUpload({
          accessToken: job.accessToken,
          mediaUrl: job.mediaUrl,
          title: job.title || '',
          deliveryMode: job.deliveryMode || 'DIRECT',
          tiktokConfig: job.tiktokConfig || null
        });
        doneJob = {
          jobId: job.jobId,
          status: 'done',
          publishId: ttResult.publishId,
          refreshedAccessToken: ttResult.refreshedAccessToken,
          label: ttResult.label
        };
      } else {
        const norm = normalizeCloudMediaServer(job.mediaUrl, 'video');
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
  } catch (_) {
  } finally {
    isRelayBusy = false;
  }
}, 3500);

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SHEEP Social Planner (Estilo Later Web + App PWA)`);
  console.log(`🌐 URL Local: http://localhost:${PORT}`);
  console.log(`⏱️  Motor de Automatización Meta Graph API: ACTIVO`);
  console.log(`====================================================`);
});
