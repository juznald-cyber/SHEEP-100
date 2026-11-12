const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

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

    // If exchange succeeded, save to db.json immediately
    if (ttRes.ok && data.data?.access_token) {
      try {
        const db = readDb();
        db.tiktokConfig = db.tiktokConfig || {};
        db.tiktokConfig.clientKey = client_key;
        db.tiktokConfig.clientSecret = client_secret;
        db.tiktokConfig.accessToken = data.data.access_token;
        db.tiktokConfig.connected = true;
        writeDb(db);
      } catch (saveErr) {
        console.warn('Error guardando token en db.json:', saveErr);
      }
    }

    return res.status(ttRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error comunicando con TikTok API' });
  }
});

// TikTok direct video publisher via server
app.post('/api/tiktok/publish-video', async (req, res) => {
  const { accessToken, mediaUrl, title } = req.body || {};
  if (!accessToken || !mediaUrl) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (accessToken, mediaUrl)' });
  }
  try {
    const directUrl = await resolveDirectMediaUrl(mediaUrl);

    // 1. Query creator info to determine allowed privacy levels (Sandbox requires SELF_ONLY)
    let privacyLevel = 'SELF_ONLY';
    try {
      const creatorRes = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
      const creatorData = await creatorRes.json();
      const options = creatorData.data?.privacy_level_options;
      if (Array.isArray(options) && options.length > 0) {
        if (options.includes('PUBLIC_TO_EVERYONE')) {
          privacyLevel = 'PUBLIC_TO_EVERYONE';
        } else {
          privacyLevel = options[0];
        }
      }
    } catch (_) {}

    const publishPayload = {
      post_info: {
        title: title || 'Publicación SHEEP 100',
        privacy_level: privacyLevel,
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false
      },
      source_info: {
        source: 'PULL_FROM_URL',
        video_url: directUrl
      }
    };

    const ttRes = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(publishPayload)
    });
    const data = await ttRes.json();
    return res.status(ttRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error publicando en TikTok API' });
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
      appId: '',
      appSecret: '',
      accessToken: '',
      igUserId: '',
      igUsername: '',
      fbPageId: '',
      fbPageName: '',
      autoPublishEnabled: true,
      simulationFallback: true,
      geminiApiKey: '',
      wizardSteps: {
        step1_devAccount: false,
        step2_igGraphApi: false,
        step3_testerRole: false,
        step4_linkFbPage: false,
        step5_accessToken: false
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
async function publishToMetaInstagram(post, metaConfig) {
  const { accessToken, igUserId, simulationFallback } = metaConfig;
  const mediaUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();

  // Check if user has real credentials configured
  const hasRealCredentials = Boolean(accessToken && igUserId);
  const isPublicHttpUrl = /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);

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
      'La API de Instagram Graph exige que la imagen o video tenga una URL pública accesible en internet (https://...) en formato JPG o MP4.'
    );
  }

  // Real 2-Step Meta Graph API Call
  const graphBase = 'https://graph.facebook.com/v21.0';

  // STEP 1: Create Media Container (Supports Feed IMAGE, REELS, and 24h STORIES)
  const containerParams = new URLSearchParams();
  containerParams.append('access_token', accessToken);

  const isStory = post.postFormat === 'STORY' || post.mediaType === 'STORIES';
  const isVideoFile = /\.mp4(\?|$)/i.test(mediaUrl) || post.mediaType === 'REELS' || post.mediaType === 'VIDEO';

  if (isStory) {
    containerParams.append('media_type', 'STORIES');
    if (isVideoFile) {
      containerParams.append('video_url', mediaUrl);
    } else {
      containerParams.append('image_url', mediaUrl);
    }
  } else if (post.mediaType === 'REELS' || post.mediaType === 'VIDEO') {
    containerParams.append('media_type', 'REELS');
    containerParams.append('video_url', mediaUrl);
    containerParams.append('caption', post.caption || '');
  } else {
    containerParams.append('image_url', mediaUrl);
    containerParams.append('caption', post.caption || '');
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
      : 'Error desconocido al crear el contenedor en Meta Graph API';
    throw new Error(`Paso 1 (Contenedor Meta) falló: ${errMsg}`);
  }

  const creationId = step1Data.id;

  // If video/Reels or Story, wait briefly or poll status_code
  if (isStory || isVideoFile) {
    for (let attempt = 0; attempt < 5; attempt++) {
      await new Promise((r) => setTimeout(r, 2500));
      const statusRes = await fetch(
        `${graphBase}/${creationId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
      );
      const statusData = await statusRes.json();
      if (statusData.status_code === 'FINISHED') break;
      if (statusData.status_code === 'ERROR') {
        throw new Error(`Meta rechazó el procesamiento del archivo: ${statusData.status || 'Formato no compatible'}`);
      }
    }
  }

  // STEP 2: Publish Media Container (media_publish)
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

  // Optional: Post first comment if provided
  if (post.firstComment && post.firstComment.trim() && step2Data.id) {
    try {
      const commentParams = new URLSearchParams();
      commentParams.append('message', post.firstComment.trim());
      commentParams.append('access_token', accessToken);
      await fetch(`${graphBase}/${step2Data.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: commentParams.toString()
      });
    } catch (commentErr) {
      console.warn('No se pudo publicar el primer comentario:', commentErr.message);
    }
  }

  return {
    success: true,
    mode: 'live_meta_api',
    containerId: creationId,
    mediaPublishId: step2Data.id,
    message: `¡Publicado directamente en Instagram vía Meta Graph API! (Media ID: ${step2Data.id})`
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
    const merged = {
      ...current,
      metaConfig: {
        ...(current.metaConfig || {}),
        ...(incoming.metaConfig || {})
      },
      tiktokConfig: {
        ...(current.tiktokConfig || {}),
        ...(incoming.tiktokConfig || {})
      },
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

  const newMedia = {
    id: `media-${Date.now()}`,
    title: title || 'Recurso Multimedia Externo',
    url: url.trim(),
    publicUrl: url.trim(),
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
    postFormat: postFormat || (mediaType === 'STORIES' ? 'STORY' : mediaType === 'REELS' ? 'REEL' : 'POST'),
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

    // 1. Intentar por me/accounts (Páginas clásicas)
    const graphUrl = `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,instagram_business_account{id,username,name,profile_picture_url,followers_count,media_count}&access_token=${encodeURIComponent(token)}`;
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

    // 2. Fallback: Si el token es de Página o NPE, consultar /me directo
    if (!igAccount) {
      try {
        const directUrl = `https://graph.facebook.com/v21.0/me?fields=id,name,instagram_business_account{id,username,name}&access_token=${encodeURIComponent(token)}`;
        const directRes = await fetch(directUrl);
        const directData = await directRes.json();
        if (directRes.ok && directData.instagram_business_account) {
          igAccount = directData.instagram_business_account;
          pageName = directData.name || 'Página de Facebook';
          pageId = directData.id;
        }
      } catch (_) {}
    }

    // 3. Fallback: Consultar Portafolios Comerciales (Meta Business Suite / me/businesses)
    if (!igAccount) {
      try {
        const bizUrl = `https://graph.facebook.com/v21.0/me/businesses?fields=id,name,instagram_accounts{id,username},client_pages{id,name,instagram_business_account{id,username}},owned_pages{id,name,instagram_business_account{id,username}}&access_token=${encodeURIComponent(token)}`;
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
          'Meta devolvió una lista de páginas vacía para este token. En Graph API Explorer cambia "Token del usuario" a tu Página en el desplegable, o escribe tu Instagram Business User ID manualmente.'
      });
    }

    db.metaConfig.accessToken = token;
    db.metaConfig.fbPageId = pageId;
    db.metaConfig.fbPageName = pageName;
    db.metaConfig.igUserId = igAccount.id;
    db.metaConfig.igUsername = igAccount.username || igAccount.name || '';
    db.metaConfig.wizardSteps.step5_accessToken = true;

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

setInterval(async () => {
  if (isSchedulerRunning) return;
  isSchedulerRunning = true;
  try {
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

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SHEEP Social Planner (Estilo Later Web + App PWA)`);
  console.log(`🌐 URL Local: http://localhost:${PORT}`);
  console.log(`⏱️  Motor de Automatización Meta Graph API: ACTIVO`);
  console.log(`====================================================`);
});
