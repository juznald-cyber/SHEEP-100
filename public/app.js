// =========================================================
// SHEEP 100 — MOTOR WEB + APP PWA + FIREBASE + STORIES & MÉTRICAS
// =========================================================

const LS_STATE_KEY = 'SHEEP100_STATE_V1';
const LS_SESSION_KEY = 'SHEEP100_ACTIVE_USER';
const LS_USERS_KEY = 'SHEEP100_USERS_V1';
const myClientId = 'client_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);

function getDefaultInitialState() {
  const now = new Date();
  const todayEvening = new Date(now.getTime() + 4 * 3600 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
  tomorrow.setHours(18, 0, 0, 0);
  const inTwoDays = new Date(now.getTime() + 48 * 3600 * 1000);
  inTwoDays.setHours(12, 30, 0, 0);
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
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
    tiktokConfig: {
      clientKey: 'sbawbyxlo8yktgrxxv',
      clientSecret: '',
      accessToken: '',
      refreshToken: '',
      openId: '',
      username: 'cocuyo.grafic',
      deliveryMode: 'DIRECT',
      redirectUri: 'https://juznald-cyber.github.io/SHEEP-100/'
    },
    hashtagGroups: [
      {
        id: 'hg-1',
        name: 'Emprendimiento & Negocios',
        tags: '#sheep100 #emprendedores #negociosdigitales #marketingdigital #marcaPersonal #exito #productividad'
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
        title: 'Historia Detrás de Cámaras 9x16.jpg',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        publicUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        type: 'image',
        format: 'JPG',
        tags: ['historia', 'equipo', 'story'],
        createdAt: new Date().toISOString()
      }
    ],
    posts: [
      {
        id: 'post-story-1',
        title: 'Historia: Encuesta & Oferta Flash 24h',
        caption: '🔥 ¡Solo por las próximas 24 horas! Responde "QUIERO" a esta historia para recibir acceso anticipado.',
        mediaId: 'media-4',
        mediaUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'STORIES',
        postFormat: 'STORY',
        platforms: ['instagram', 'facebook'],
        status: 'scheduled',
        scheduledAt: todayEvening.toISOString(),
        firstComment: 'Sticker de enlace: https://sheep-100-b8a90.web.app',
        gridOrder: 0,
        metrics: { reach: 1840, likes: 142, comments: 38, saves: 64 },
        createdAt: now.toISOString(),
        logs: [{ time: now.toISOString(), message: 'Historia (24h) programada para publicación automática.' }]
      },
      {
        id: 'post-1',
        title: '5 Secretos para automatizar tus redes con SHEEP 100',
        caption: '¿Pasas horas pensando qué publicar cada día? 🚀\n\nCon SHEEP 100 puedes dejar lista toda tu semana de Posts e Historias en 15 minutos.\n\n✅ Organiza tu cuadrícula visual\n✅ Programa Historias 24h automáticamente\n✅ Revisa tus métricas en tiempo real\n\n#sheep100 #marketingdigital #automatizacion #emprendedores',
        mediaId: 'media-2',
        mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        postFormat: 'POST',
        platforms: ['instagram', 'facebook'],
        status: 'scheduled',
        scheduledAt: tomorrow.toISOString(),
        firstComment: '¿Cuál es la red social que más tiempo te consume? ¡Te leemos!',
        gridOrder: 1,
        metrics: { reach: 3420, likes: 285, comments: 47, saves: 112 },
        createdAt: now.toISOString(),
        logs: [{ time: now.toISOString(), message: 'Publicación programada en cola automática.' }]
      },
      {
        id: 'post-2',
        title: 'Detrás de cámaras de nuestra marca',
        caption: 'La constancia supera al talento cuando el talento no es constante ☕✨\n\nAsí empezamos la semana preparando todas las novedades que se vienen este mes.\n\n#detrasdecamaras #branding #emprendimiento #productividad',
        mediaId: 'media-1',
        mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        postFormat: 'POST',
        platforms: ['instagram'],
        status: 'scheduled',
        scheduledAt: inTwoDays.toISOString(),
        firstComment: '',
        gridOrder: 2,
        metrics: { reach: 2890, likes: 219, comments: 31, saves: 78 },
        createdAt: now.toISOString(),
        logs: [{ time: now.toISOString(), message: 'Publicación programada para Instagram Feed.' }]
      },
      {
        id: 'post-3',
        title: 'Bienvenidos a SHEEP 100',
        caption: 'Construyendo el futuro de nuestra marca paso a paso. Gracias por acompañarnos en este viaje 🙌🔥\n\n#sheep100 #marcaPersonal #negocios #exito',
        mediaId: 'media-3',
        mediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        publicMediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=85',
        mediaType: 'IMAGE',
        postFormat: 'POST',
        platforms: ['instagram', 'facebook'],
        status: 'published',
        scheduledAt: yesterday.toISOString(),
        publishedAt: yesterday.toISOString(),
        firstComment: '',
        gridOrder: 3,
        metrics: { reach: 4680, likes: 412, comments: 64, saves: 155 },
        createdAt: yesterday.toISOString(),
        logs: [{ time: yesterday.toISOString(), message: 'Publicado exitosamente.' }]
      }
    ],
    activityLogs: []
  };
}

const DEFAULT_USERS = [
  { username: 'admin', name: 'Administrador SHEEP 100', passHash: 'sheep100', role: 'admin' },
  { username: 'junior.torrez@sseguridad.cl', name: 'Junior Torrez', passHash: 'sheep100', role: 'admin' },
  { username: 'juznald@gmail.com', name: 'Junior (Personal)', passHash: 'sheep100', role: 'admin' }
];

let appState = getDefaultInitialState();
let authorizedUsers = [...DEFAULT_USERS];
let currentUser = null;

// Firebase Cloud References
let cloud = {
  app: null,
  db: null,
  docRef: null,
  usersColRef: null,
  unsubWorkspace: null,
  unsubUsers: null,
  connected: false,
  hydrated: false,
  restFallback: false,
  applyingRemote: false,
  lastKnownTokens: { meta: {}, tiktok: {} }
};

let currentWeekOffset = 0;
let currentPostFilter = 'all';
let currentMetricsFilter = 'all';
let deferredInstallPrompt = null;
let notifiedPostIds = new Set();
let isSyncingMetrics = false;
let lastMetricsSyncAttemptAt = 0;
let composerCarouselSlides = [];
let composerCarouselPreviewIdx = 0;

const TAB_TITLES = {
  calendar: '📅 Calendario Visual (Posts, Reels e Historias)',
  grid: '📱 Previsualizador de Feed 3x3 + Anillo de Historias',
  metrics: '📊 Centro de Métricas e Insights (Instagram & Facebook)',
  media: '🖼️ Biblioteca de Medios (Media Library)',
  ai: '✨ Estudio de IA para Copies & Guiones de Historias',
  'meta-wizard': '🧭 Configuración Paso a Paso con Meta (Modo Desarrollo)',
  'tiktok-wizard': '🎵 Configuración Paso a Paso con TikTok (Sandbox & Subida desde Drive)'
};

const MOBILE_TAB_TITLES = {
  calendar: '📅 Calendario',
  grid: '📱 Feed & Stories',
  metrics: '📊 Métricas',
  media: '🖼️ Medios',
  ai: '✨ Estudio IA',
  'meta-wizard': '🧭 Meta API',
  'tiktok-wizard': '🎵 TikTok API'
};

let activeTabId = 'calendar';

function updateCurrentViewTitle(tabId = activeTabId) {
  const titleEl = document.getElementById('currentViewTitle');
  if (!titleEl) return;
  const isCompact = window.innerWidth <= 960 || document.body.classList.contains('mobile-app-mode');
  const map = isCompact ? MOBILE_TAB_TITLES : TAB_TITLES;
  if (map[tabId]) titleEl.textContent = map[tabId];
}

document.addEventListener('DOMContentLoaded', async () => {
  loadLocalCache();
  ensureSampleStoryExists();
  initAuthAndUsersEvents();
  initNavigation();
  initPwaAndNotifications();
  initComposerEvents();
  initMediaUploadEvents();
  initAiStudioEvents();
  initMetaWizardEvents();
  initTikTokWizardEvents();
  initMetricsEvents();

  await initFirebaseCloud();
  checkSavedSession();
  checkTikTokOAuthCallback();

  if (appState.metaConfig?.accessToken && appState.metaConfig?.igUserId) {
    setTimeout(() => syncLiveMetaMetrics({ silent: true }), 1200);
  }
  setInterval(() => {
    if (!document.hidden && appState.metaConfig?.accessToken && appState.metaConfig?.igUserId) {
      syncLiveMetaMetrics({ silent: true });
    }
  }, 5 * 60 * 1000);

  setTimeout(runBrowserAutoScheduler, 1500);
  setInterval(runBrowserAutoScheduler, 25000);
});

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
    // Google CDN direct thumbnail/image stream (works in <img> and Meta Graph API image_url)
    const thumbUrl = `https://lh3.googleusercontent.com/d/${driveId}=w1080`;
    const directPublicUrl =
      type === 'video'
        ? `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`
        : thumbUrl;
    return {
      isDrive: true,
      driveId,
      thumbUrl,
      publicUrl: directPublicUrl
    };
  }
  if (/dropbox\.com\//i.test(clean)) {
    const directDropbox = clean.replace(/\?dl=0$/i, '?raw=1').replace(/&dl=0/i, '&raw=1');
    return {
      isDrive: false,
      driveId: null,
      thumbUrl: directDropbox,
      publicUrl: directDropbox
    };
  }
  return {
    isDrive: false,
    driveId: null,
    thumbUrl: clean,
    publicUrl: clean
  };
}

function ensureSampleStoryExists() {
  const defState = getDefaultInitialState();
  const defCfg = defState.metaConfig;
  appState.metaConfig = appState.metaConfig || {};
  if (!appState.metaConfig.igUserId) {
    appState.metaConfig.igUserId = defCfg.igUserId;
    appState.metaConfig.igUsername = defCfg.igUsername;
    appState.metaConfig.fbPageId = defCfg.fbPageId;
    appState.metaConfig.fbPageName = defCfg.fbPageName;
    appState.metaConfig.followersCount = defCfg.followersCount;
    appState.metaConfig.wizardSteps = { ...defCfg.wizardSteps };
  }
  if (!appState.metaConfig.appId) {
    appState.metaConfig.appId = defCfg.appId;
  }
  if (!appState.metaConfig.accessToken) {
    appState.metaConfig.accessToken = defCfg.accessToken;
  }

  const defTk = defState.tiktokConfig;
  appState.tiktokConfig = appState.tiktokConfig || {};
  if (!appState.tiktokConfig.clientKey) {
    appState.tiktokConfig.clientKey = defTk.clientKey;
  }
  if (!appState.tiktokConfig.username) {
    appState.tiktokConfig.username = defTk.username;
  }
  if (!appState.tiktokConfig.deliveryMode) {
    appState.tiktokConfig.deliveryMode = defTk.deliveryMode;
  }
  if (!appState.tiktokConfig.redirectUri) {
    appState.tiktokConfig.redirectUri = defTk.redirectUri;
  }

  // Normalizar automáticamente enlaces de Google Drive / Dropbox en Media Library
  if (Array.isArray(appState.mediaLibrary)) {
    appState.mediaLibrary.forEach((m) => {
      const sourceUrl = m.originalUrl || m.publicUrl || m.url || '';
      const norm = normalizeCloudMedia(sourceUrl, m.type);
      if (norm.isDrive) {
        m.driveId = norm.driveId;
        m.url = norm.thumbUrl;
        // El archivo 1_cIMm9K9ICM3LJvws_ypuWCoSF0lJqn6 (PRUEBA MILAN) en Drive es un JPG real
        if (norm.driveId === '1_cIMm9K9ICM3LJvws_ypuWCoSF0lJqn6') {
          m.type = 'image';
          m.format = 'JPG';
          m.publicUrl = norm.thumbUrl;
        } else {
          m.publicUrl = norm.publicUrl;
        }
      }
    });
  }

  if (!Array.isArray(appState.posts)) return;
  appState.posts.forEach((p, idx) => {
    const norm = normalizeCloudMedia(p.publicMediaUrl || p.mediaUrl || '', p.mediaType === 'REELS' || p.mediaType === 'VIDEO' ? 'video' : 'image');
    if (norm.isDrive) {
      p.mediaUrl = norm.thumbUrl;
      p.publicMediaUrl = norm.driveId === '1_cIMm9K9ICM3LJvws_ypuWCoSF0lJqn6' ? norm.thumbUrl : norm.publicUrl;
    }
    if (!p.postFormat) {
      p.postFormat =
        p.mediaType === 'CAROUSEL'
          ? 'CAROUSEL'
          : p.mediaType === 'STORIES'
          ? 'STORY'
          : p.mediaType === 'REELS'
          ? 'REEL'
          : 'POST';
    }
    if (Array.isArray(p.carouselItems)) {
      p.carouselItems = p.carouselItems.map((slide) => {
        const sNorm = normalizeCloudMedia(
          slide.publicUrl || slide.url || '',
          slide.type === 'video' || slide.format === 'MP4' ? 'video' : 'image'
        );
        return {
          ...slide,
          url: sNorm.thumbUrl || slide.url,
          publicUrl: sNorm.publicUrl || slide.publicUrl || slide.url
        };
      });
    }
    if (!p.metrics) {
      p.metrics = { reach: 0, likes: 0, comments: 0, saves: 0 };
    }
  });
  const hasStory = appState.posts.some((p) => p.postFormat === 'STORY' || p.mediaType === 'STORIES');
  if (!hasStory) {
    const sampleStory = getDefaultInitialState().posts[0];
    appState.posts.unshift(sampleStory);
  }
}

// ==========================================
// FIREBASE CLOUD FIRESTORE (sheep-100-b8a90)
// ==========================================
function loadLocalCache() {
  try {
    const rawState = localStorage.getItem(LS_STATE_KEY);
    if (rawState) {
      const parsed = JSON.parse(rawState);
      if (parsed && Array.isArray(parsed.posts)) {
        appState = { ...appState, ...parsed };
      }
    }
    const rawUsers = localStorage.getItem(LS_USERS_KEY);
    if (rawUsers) {
      const parsedUsers = JSON.parse(rawUsers);
      if (Array.isArray(parsedUsers) && parsedUsers.length) {
        authorizedUsers = parsedUsers;
      }
    }
  } catch (e) {
    console.warn('Error leyendo caché local:', e);
  }
}

const FIRESTORE_PRINCIPAL_REST_URL =
  'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/principal';

function pickNonEmpty(preferred, fallback = '') {
  return preferred && String(preferred).trim() !== '' ? preferred : fallback || '';
}

function mergeProtectedState(baseState, incomingState) {
  const base = baseState || {};
  const inc = incomingState || {};
  const prevMeta = base.metaConfig || {};
  const incMeta = inc.metaConfig || {};
  const prevTk = base.tiktokConfig || {};
  const incTk = inc.tiktokConfig || {};

  return {
    ...base,
    metaConfig: {
      ...prevMeta,
      ...incMeta,
      accessToken: pickNonEmpty(incMeta.accessToken, prevMeta.accessToken),
      appSecret: pickNonEmpty(incMeta.appSecret, prevMeta.appSecret),
      fbPageAccessToken: pickNonEmpty(incMeta.fbPageAccessToken, prevMeta.fbPageAccessToken)
    },
    tiktokConfig: {
      ...prevTk,
      ...incTk,
      clientKey: pickNonEmpty(incTk.clientKey, prevTk.clientKey),
      clientSecret: pickNonEmpty(incTk.clientSecret, prevTk.clientSecret),
      accessToken: pickNonEmpty(incTk.accessToken, prevTk.accessToken),
      refreshToken: pickNonEmpty(incTk.refreshToken, prevTk.refreshToken),
      openId: pickNonEmpty(incTk.openId, prevTk.openId),
      codeVerifier: pickNonEmpty(incTk.codeVerifier, prevTk.codeVerifier)
    },
    mediaLibrary: Array.isArray(inc.mediaLibrary) ? inc.mediaLibrary : base.mediaLibrary,
    posts: Array.isArray(inc.posts) ? inc.posts : base.posts,
    hashtagGroups: Array.isArray(inc.hashtagGroups) ? inc.hashtagGroups : base.hashtagGroups,
    metricsMeta: inc.metricsMeta || base.metricsMeta || null
  };
}

function rememberActiveTokens(state) {
  const m = state?.metaConfig || {};
  const t = state?.tiktokConfig || {};
  cloud.lastKnownTokens = {
    meta: {
      accessToken: pickNonEmpty(m.accessToken, cloud.lastKnownTokens?.meta?.accessToken),
      appSecret: pickNonEmpty(m.appSecret, cloud.lastKnownTokens?.meta?.appSecret),
      fbPageAccessToken: pickNonEmpty(m.fbPageAccessToken, cloud.lastKnownTokens?.meta?.fbPageAccessToken)
    },
    tiktok: {
      clientKey: pickNonEmpty(t.clientKey, cloud.lastKnownTokens?.tiktok?.clientKey),
      clientSecret: pickNonEmpty(t.clientSecret, cloud.lastKnownTokens?.tiktok?.clientSecret),
      accessToken: pickNonEmpty(t.accessToken, cloud.lastKnownTokens?.tiktok?.accessToken),
      refreshToken: pickNonEmpty(t.refreshToken, cloud.lastKnownTokens?.tiktok?.refreshToken),
      openId: pickNonEmpty(t.openId, cloud.lastKnownTokens?.tiktok?.openId)
    }
  };
}

async function fetchPrincipalViaRest() {
  const res = await fetch(FIRESTORE_PRINCIPAL_REST_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Firestore REST HTTP ${res.status}`);
  const doc = await res.json();
  const payload = doc?.fields?.payload?.stringValue;
  if (!payload) return null;
  return { payload };
}

async function initFirebaseCloud() {
  rememberActiveTokens(appState);

  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && Array.isArray(serverData.posts)) {
        appState = mergeProtectedState(appState, serverData);
        ensureSampleStoryExists();
        rememberActiveTokens(appState);
      }
    }
  } catch (_) {}

  cloud.hydrated = false;
  cloud.connected = false;
  cloud.restFallback = false;

  if (typeof firebase !== 'undefined' && window.firebaseConfig) {
    try {
      cloud.app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
      cloud.db = firebase.firestore();
      cloud.docRef = cloud.db.collection('sheep100').doc('principal');
      cloud.usersColRef = cloud.db.collection('sheep100_users');

      // Cargar workspace principal primero para que nunca lo bloquee sheep100_users
      const snap = await cloud.docRef.get();
      cloud.hydrated = true;
      if (snap.exists && snap.data()?.payload) {
        applyCloudPayload(snap.data());
      } else {
        await saveStateEverywhere(false);
      }

      cloud.connected = true;
      setCloudPillStatus(true, '☁️ Firebase en Tiempo Real');

      cloud.unsubWorkspace = cloud.docRef.onSnapshot(
        (docSnap) => {
          if (!docSnap.exists) return;
          const data = docSnap.data();
          if (!data || data.updatedBy === myClientId) return;
          if (applyCloudPayload(data)) {
            showToast('☁️ Sincronizado en tiempo real desde la nube');
          }
        },
        (err) => {
          console.warn('Firestore listener warning:', err);
          setCloudPillStatus(false, 'Modo Local + Caché');
        }
      );

      // Sincronizar usuarios de forma aislada (si falla por reglas o red, no tumba el estado principal)
      try {
        const usersSnap = await cloud.usersColRef.get();
        if (usersSnap.empty) {
          for (const u of DEFAULT_USERS) {
            const docId = sanitizeDocId(u.username);
            await cloud.usersColRef.doc(docId).set({
              username: u.username.toLowerCase(),
              name: u.name,
              passHash: u.passHash,
              role: u.role || 'admin',
              updatedAt: new Date().toISOString()
            });
          }
        } else {
          const loadedUsers = [];
          usersSnap.forEach((doc) => loadedUsers.push(doc.data()));
          if (loadedUsers.length) {
            authorizedUsers = loadedUsers;
            localStorage.setItem(LS_USERS_KEY, JSON.stringify(authorizedUsers));
          }
        }

        cloud.unsubUsers = cloud.usersColRef.onSnapshot(
          (uSnap) => {
            const list = [];
            uSnap.forEach((d) => list.push(d.data()));
            if (list.length) {
              authorizedUsers = list;
              localStorage.setItem(LS_USERS_KEY, JSON.stringify(authorizedUsers));
              renderUsersList();
            }
          },
          (uErr) => console.warn('Users snapshot warning:', uErr)
        );
      } catch (usersErr) {
        console.warn('Aviso cargando sheep100_users (usando caché local):', usersErr);
      }

      renderAll();
      return;
    } catch (err) {
      console.warn('Firestore SDK falló, intentando REST fallback:', err);
      cloud.docRef = null;
      cloud.connected = false;
    }
  }

  // Fallback directo via Firestore REST API (funciona incluso si extensiones/WebChannel bloquean SDK)
  try {
    const restDoc = await fetchPrincipalViaRest();
    if (restDoc && restDoc.payload) {
      cloud.hydrated = true;
      cloud.connected = true;
      cloud.restFallback = true;
      applyCloudPayload(restDoc);
      setCloudPillStatus(true, '☁️ Firebase Conectado');
      renderAll();
      return;
    }
  } catch (restErr) {
    console.warn('No se pudo conectar con Firestore REST:', restErr);
  }

  setCloudPillStatus(false, 'Modo Local');
  renderAll();
}

function applyCloudPayload(data) {
  if (!data || !data.payload) return false;
  try {
    cloud.applyingRemote = true;
    const parsed = typeof data.payload === 'string' ? JSON.parse(data.payload) : data.payload;
    if (!parsed || typeof parsed !== 'object') {
      cloud.applyingRemote = false;
      return false;
    }
    appState = mergeProtectedState(appState, parsed);
    ensureSampleStoryExists();
    rememberActiveTokens(appState);
    localStorage.setItem(LS_STATE_KEY, JSON.stringify(appState));
    syncToLocalServer(appState);
    renderAll();
    cloud.applyingRemote = false;
    return true;
  } catch (e) {
    cloud.applyingRemote = false;
    return false;
  }
}

async function saveStateEverywhere(showNotification = false) {
  // Nunca sobrescribir tokens activos conocidos con cadenas vacías accidentales
  appState = mergeProtectedState(
    { metaConfig: cloud.lastKnownTokens?.meta || {}, tiktokConfig: cloud.lastKnownTokens?.tiktok || {} },
    appState
  );
  rememberActiveTokens(appState);

  try {
    localStorage.setItem(LS_STATE_KEY, JSON.stringify(appState));
  } catch (_) {}

  syncToLocalServer(appState);

  if (!cloud.hydrated || cloud.applyingRemote) {
    return;
  }

  const savedAt = new Date().toISOString();
  const payloadStr = JSON.stringify(appState);

  if (cloud.docRef) {
    try {
      await cloud.docRef.set({
        payload: payloadStr,
        savedAt,
        updatedBy: myClientId
      });
      setCloudPillStatus(true, '☁️ Guardado en Firebase');
      if (showNotification) {
        showToast('☁️ Guardado en tiempo real (Local + Firebase Cloud)');
      }
      return;
    } catch (err) {
      console.warn('Error guardando en Firestore SDK, intentando REST:', err);
    }
  }

  if (cloud.restFallback || cloud.connected) {
    try {
      const restRes = await fetch(FIRESTORE_PRINCIPAL_REST_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            payload: { stringValue: payloadStr },
            savedAt: { stringValue: savedAt },
            updatedBy: { stringValue: myClientId }
          }
        })
      });
      if (restRes.ok) {
        setCloudPillStatus(true, '☁️ Guardado en Firebase');
        if (showNotification) {
          showToast('☁️ Guardado en Firebase Cloud');
        }
      }
    } catch (restErr) {
      console.warn('Error guardando en Firestore REST:', restErr);
    }
  }
}

async function syncToLocalServer(stateObj) {
  try {
    await fetch('/api/state/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stateObj)
    });
  } catch (_) {}
}

function setCloudPillStatus(isOnline, text) {
  const txtEl = document.getElementById('cloudStatusText');
  if (txtEl) txtEl.textContent = text;
}

// ==========================================
// LOGIN & USER MANAGEMENT (SHEEP 100)
// ==========================================
function checkSavedSession() {
  try {
    const saved = localStorage.getItem(LS_SESSION_KEY);
    if (saved) {
      const userObj = JSON.parse(saved);
      if (userObj && userObj.username) {
        currentUser = userObj;
        onUserAuthenticated(userObj);
        return;
      }
    }
  } catch (_) {}
  showLoginScreen();
}

function showLoginScreen(errorMsg = '') {
  const screen = document.getElementById('loginScreen');
  if (screen) screen.classList.add('show');
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.textContent = errorMsg;
}

function hideLoginScreen() {
  const screen = document.getElementById('loginScreen');
  if (screen) screen.classList.remove('show');
}

function onUserAuthenticated(userObj) {
  currentUser = userObj;
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify(userObj));
  const pill = document.getElementById('userBadgePill');
  if (pill) pill.textContent = `👤 ${userObj.name || userObj.username}`;
  const drawerUser = document.getElementById('sidebarUserChip');
  if (drawerUser) drawerUser.textContent = `👤 ${userObj.name || userObj.username}`;
  hideLoginScreen();
  renderAll();
}

function initAuthAndUsersEvents() {
  const loginForm = document.getElementById('loginForm');
  const pwToggle = document.getElementById('loginPwToggle');

  if (pwToggle) {
    pwToggle.addEventListener('click', () => togglePasswordInput('loginPass', pwToggle));
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const rawUser = (document.getElementById('loginUser').value || '').trim().toLowerCase();
      const rawPass = document.getElementById('loginPass').value || '';
      const errEl = document.getElementById('loginError');
      errEl.textContent = '';

      const matched = authorizedUsers.find(
        (u) => u.username.toLowerCase() === rawUser && u.passHash === rawPass
      );

      if (matched) {
        onUserAuthenticated(matched);
        showToast(`👋 ¡Bienvenido a SHEEP 100, ${matched.name || matched.username}!`);
        return;
      }

      if (cloud.usersColRef) {
        try {
          const docSnap = await cloud.usersColRef.doc(sanitizeDocId(rawUser)).get();
          if (docSnap.exists) {
            const data = docSnap.data();
            if (data.passHash === rawPass) {
              onUserAuthenticated(data);
              showToast(`👋 ¡Bienvenido a SHEEP 100, ${data.name || data.username}!`);
              return;
            }
          }
        } catch (_) {}
      }

      errEl.textContent = 'Usuario o contraseña incorrectos.';
    });
  }

  document.getElementById('btnLogout')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem(LS_SESSION_KEY);
    document.getElementById('loginPass').value = '';
    showLoginScreen();
    showToast('🔒 Sesión cerrada correctamente');
  });

  const usersModal = document.getElementById('usersModal');
  document.getElementById('btnManageUsers')?.addEventListener('click', () => {
    renderUsersList();
    usersModal.classList.remove('hidden');
  });
  document.getElementById('btnCloseUsersModal')?.addEventListener('click', () => {
    usersModal.classList.add('hidden');
  });

  const newUserPwToggle = document.getElementById('newUserPwToggle');
  newUserPwToggle?.addEventListener('click', () =>
    togglePasswordInput('newUserPass', newUserPwToggle)
  );

  document.getElementById('formCreateUser')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = (document.getElementById('newUsername').value || '').trim().toLowerCase();
    const name = (document.getElementById('newUserDisplayName').value || '').trim() || username;
    const passHash = document.getElementById('newUserPass').value || '';
    const msgEl = document.getElementById('userModalMsg');

    if (!username || passHash.length < 4) {
      msgEl.textContent = 'Ingresa un usuario válido y una contraseña de al menos 4 caracteres.';
      return;
    }

    const newUserObj = {
      username,
      name,
      passHash,
      role: 'admin',
      updatedAt: new Date().toISOString()
    };

    const existingIdx = authorizedUsers.findIndex((u) => u.username.toLowerCase() === username);
    if (existingIdx >= 0) {
      authorizedUsers[existingIdx] = newUserObj;
    } else {
      authorizedUsers.push(newUserObj);
    }

    localStorage.setItem(LS_USERS_KEY, JSON.stringify(authorizedUsers));

    if (cloud.usersColRef) {
      try {
        await cloud.usersColRef.doc(sanitizeDocId(username)).set(newUserObj);
      } catch (err) {
        console.warn('Error guardando usuario en Firestore:', err);
      }
    }

    document.getElementById('formCreateUser').reset();
    msgEl.style.color = '#6ee7b7';
    msgEl.textContent = `✔ Usuario "${username}" guardado y sincronizado en Firebase.`;
    renderUsersList();
    showToast(`👥 Usuario ${username} actualizado en la nube`);
  });
}

function renderUsersList() {
  const container = document.getElementById('usersListContainer');
  if (!container) return;
  container.innerHTML = authorizedUsers
    .map(
      (u) => `
      <div class="hashtag-group-item" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <div style="min-width:0;flex:1;overflow-wrap:anywhere;">
          <strong>👤 ${escapeHtml(u.name || u.username)}</strong>
          <div style="font-size:0.75rem;color:var(--text-muted);">Usuario: <code>${escapeHtml(u.username)}</code></div>
        </div>
        <span class="status-badge published">Activo</span>
      </div>
    `
    )
    .join('');
}

function togglePasswordInput(inputId, btn) {
  const el = document.getElementById(inputId);
  if (!el) return;
  if (el.type === 'password') {
    el.type = 'text';
    btn.textContent = 'Ocultar';
  } else {
    el.type = 'password';
    btn.textContent = 'Ver';
  }
}

function sanitizeDocId(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9_-]/g, '_');
}

// ==========================================
// RENDER ALL UI SECTIONS
// ==========================================
function renderAll() {
  renderMetaStatusSidebar();
  renderCalendarMediaDrawer();
  renderWeekCalendar();
  renderPostsQueue();
  renderInstagramGrid();
  renderMetricsDashboard();
  renderMediaGallery();
  renderHashtagGroups();
  renderMetaWizardState();
  renderTikTokWizardState();
  populateComposerMediaDropdown();
}

// ==========================================
// NAVIGATION & MOBILE APP PREVIEW MODE
// ==========================================
function closeMobileDrawer() {
  document.body.classList.remove('mobile-drawer-open');
}

function initNavigation() {
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('btnMobileMenu')?.addEventListener('click', () => {
    document.body.classList.toggle('mobile-drawer-open');
  });
  document.getElementById('btnCloseSidebar')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('sidebarBackdrop')?.addEventListener('click', closeMobileDrawer);

  document.getElementById('btnDrawerUsers')?.addEventListener('click', () => {
    closeMobileDrawer();
    document.getElementById('btnManageUsers')?.click();
  });
  document.getElementById('btnDrawerNotifications')?.addEventListener('click', () => {
    closeMobileDrawer();
    document.getElementById('btnEnableNotifications')?.click();
  });
  document.getElementById('btnDrawerInstallPwa')?.addEventListener('click', () => {
    closeMobileDrawer();
    document.getElementById('btnInstallPwa')?.click();
  });
  document.getElementById('btnDrawerLogout')?.addEventListener('click', () => {
    closeMobileDrawer();
    document.getElementById('btnLogout')?.click();
  });

  document.getElementById('btnPrevWeek').addEventListener('click', () => {
    currentWeekOffset--;
    renderWeekCalendar();
  });
  document.getElementById('btnNextWeek').addEventListener('click', () => {
    currentWeekOffset++;
    renderWeekCalendar();
  });
  document.getElementById('btnTodayWeek').addEventListener('click', () => {
    currentWeekOffset = 0;
    renderWeekCalendar();
  });

  document.querySelectorAll('#postFilterPills .pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#postFilterPills .pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentPostFilter = pill.dataset.filter;
      renderPostsQueue();
    });
  });

  const btnMobile = document.getElementById('btnToggleMobilePreview');
  btnMobile.addEventListener('click', () => {
    document.body.classList.toggle('mobile-app-mode');
    const isMobile = document.body.classList.contains('mobile-app-mode');
    btnMobile.classList.toggle('active-mode', isMobile);
    btnMobile.textContent = isMobile ? '🖥️ Web' : '📱 Vista App';
    if (!isMobile) closeMobileDrawer();
    updateCurrentViewTitle();
    showToast(isMobile ? '📱 Modo App Móvil activado.' : '🖥️ Vista Web restaurada.');
  });

  window.addEventListener('resize', () => updateCurrentViewTitle());
  updateCurrentViewTitle();
}

function switchTab(tabId) {
  activeTabId = tabId;
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  updateCurrentViewTitle(tabId);
  closeMobileDrawer();
  const contentArea = document.getElementById('contentArea');
  if (contentArea && (window.innerWidth <= 960 || document.body.classList.contains('mobile-app-mode'))) {
    contentArea.scrollTop = 0;
  }
  if (tabId === 'metrics') {
    const stale = Date.now() - lastMetricsSyncAttemptAt > 60 * 1000;
    if (stale && appState.metaConfig?.accessToken && appState.metaConfig?.igUserId) {
      syncLiveMetaMetrics({ silent: true });
    } else {
      renderMetricsDashboard();
    }
  }
}

window.switchTab = switchTab;

// ==========================================
// CALENDAR & DRAG-AND-DROP (POSTS + STORIES)
// ==========================================
function isPostStory(p) {
  return p.postFormat === 'STORY' || p.postFormat === 'BOTH' || p.mediaType === 'STORIES';
}

function isPostCarousel(p) {
  return Boolean(
    p &&
      (p.postFormat === 'CAROUSEL' ||
        p.mediaType === 'CAROUSEL' ||
        p.mediaType === 'CAROUSEL_ALBUM' ||
        (Array.isArray(p.carouselItems) && p.carouselItems.length >= 2))
  );
}

function getPostFormatBadge(p) {
  if (isPostCarousel(p)) {
    const count = Array.isArray(p.carouselItems) && p.carouselItems.length ? p.carouselItems.length : 2;
    return `<span class="carousel-pill-tag">🎠 CARRUSEL (${count})</span>`;
  }
  if (p.postFormat === 'BOTH') {
    return `<span class="story-pill-tag" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;">🔥 HISTORIA + REEL/POST</span>`;
  }
  if (p.postFormat === 'STORY' || p.mediaType === 'STORIES') {
    return `<span class="story-pill-tag">⭕ SOLO HISTORIA 24H</span>`;
  }
  if (p.postFormat === 'REEL' || p.mediaType === 'REELS') {
    return `<span class="badge" style="background:rgba(139,92,246,0.25);color:#ddd6fe;">🎬 SOLO REEL</span>`;
  }
  return `<span class="badge">📸 SOLO POST</span>`;
}

function renderCalendarMediaDrawer() {
  const container = document.getElementById('calendarMediaDrawer');
  if (!container) return;

  if (!appState.mediaLibrary.length) {
    container.innerHTML = `<p class="muted-text">Sube fotos o videos en Media Library.</p>`;
    return;
  }

  container.innerHTML = appState.mediaLibrary
    .map(
      (m) => `
      <div class="drawer-media-item" draggable="true" data-drag-type="media" data-media-id="${m.id}" title="Arrastra al calendario para crear Post o Historia: ${escapeHtml(m.title)}">
        <img src="${m.url}" referrerpolicy="no-referrer" alt="${escapeHtml(m.title)}" onerror="this.src='./logo.png'" />
        <div class="media-tag-overlay">${m.format} • ${escapeHtml(m.title)}</div>
      </div>
    `
    )
    .join('');

  container.querySelectorAll('.drawer-media-item').forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({ type: 'media', mediaId: item.dataset.mediaId })
      );
    });
    item.addEventListener('click', () => {
      openComposerModal({ mediaId: item.dataset.mediaId });
    });
  });
}

function getStartOfWeek(offsetWeeks = 0) {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday + offsetWeeks * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function renderWeekCalendar() {
  const grid = document.getElementById('weekGrid');
  const label = document.getElementById('calendarWeekLabel');
  if (!grid) return;

  const startMonday = getStartOfWeek(currentWeekOffset);
  const endSunday = new Date(startMonday);
  endSunday.setDate(startMonday.getDate() + 6);

  const fmtMonth = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });
  label.textContent = `${fmtMonth.format(startMonday)} — ${fmtMonth.format(endSunday)}`;

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const todayStr = new Date().toDateString();

  grid.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startMonday);
    dayDate.setDate(startMonday.getDate() + i);
    const isToday = dayDate.toDateString() === todayStr;
    const isoDatePrefix = toLocalDateInputValue(dayDate);

    const dayPosts = appState.posts
      .filter((p) => {
        if (!p.scheduledAt) return false;
        const pDate = new Date(p.scheduledAt);
        return pDate.toDateString() === dayDate.toDateString();
      })
      .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

    const col = document.createElement('div');
    col.className = `day-column ${isToday ? 'today' : ''}`;
    col.dataset.dateIso = isoDatePrefix;

    col.innerHTML = `
      <div class="day-header">
        <span class="day-name">${dayNames[i]}</span>
        <span class="day-num">${dayDate.getDate()}</span>
      </div>
      <div class="day-posts-slot">
        ${dayPosts
          .map((p) => {
            const t = new Date(p.scheduledAt).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            });
            const storyClass = isPostStory(p) ? 'is-story-card' : '';
            const thumbSrc = getPostThumbnailUrl(p);
            return `
              <div class="cal-post-card status-${p.status} ${storyClass}" draggable="true" data-post-id="${p.id}">
                ${thumbSrc ? `<img src="${escapeHtml(thumbSrc)}" class="cal-post-thumb" referrerpolicy="no-referrer" alt="" onerror="this.src='./logo.png'" />` : ''}
                <div class="cal-post-time">
                  <span>⏰ ${t}</span>
                  ${getPostFormatBadge(p)}
                </div>
                <div class="cal-post-title">${escapeHtml(p.title)}</div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;

    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', async (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      try {
        const payload = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (payload.type === 'media') {
          const defaultSchedule = `${isoDatePrefix}T18:00`;
          openComposerModal({ mediaId: payload.mediaId, scheduledAtLocal: defaultSchedule });
        } else if (payload.type === 'post') {
          const existingPost = appState.posts.find((p) => p.id === payload.postId);
          if (existingPost) {
            const oldDate = new Date(existingPost.scheduledAt);
            const newDate = new Date(dayDate);
            newDate.setHours(oldDate.getHours() || 18, oldDate.getMinutes() || 0, 0, 0);
            existingPost.scheduledAt = newDate.toISOString();
            existingPost.logs = existingPost.logs || [];
            existingPost.logs.push({
              time: new Date().toISOString(),
              message: `Reprogramada para ${newDate.toLocaleString('es-ES')}`
            });
            renderAll();
            await saveStateEverywhere(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    });

    col.querySelectorAll('.cal-post-card').forEach((card) => {
      card.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify({ type: 'post', postId: card.dataset.postId })
        );
      });
      card.addEventListener('click', () => {
        const post = appState.posts.find((p) => p.id === card.dataset.postId);
        if (post) openComposerModal({ post });
      });
    });

    grid.appendChild(col);
  }
}

function isPostVideo(post) {
  if (!post) return false;
  if (post.postFormat === 'REEL' || post.mediaType === 'REELS' || post.mediaType === 'VIDEO') return true;
  if (post.mediaId && Array.isArray(appState.mediaLibrary)) {
    const linked = appState.mediaLibrary.find((m) => m.id === post.mediaId);
    if (linked && (linked.type === 'video' || linked.format === 'MP4')) return true;
  }
  const u = (post.publicMediaUrl || post.mediaUrl || '').trim();
  if (/\.mp4(\?|$)/i.test(u) || /drive\.usercontent\.google\.com\/download/i.test(u)) return true;
  return false;
}

function getPostThumbnailUrl(post) {
  if (!post) return './logo.png';
  if (Array.isArray(post.carouselItems) && post.carouselItems.length > 0) {
    const first = post.carouselItems[0];
    const firstNorm = normalizeCloudMedia(first.url || first.publicUrl || '', first.type || 'image');
    if (firstNorm.thumbUrl || first.url) return firstNorm.thumbUrl || first.url;
  }
  if (post.mediaId && Array.isArray(appState.mediaLibrary)) {
    const linked = appState.mediaLibrary.find((m) => m.id === post.mediaId);
    if (linked && linked.url) {
      const n = normalizeCloudMedia(linked.url, 'image');
      if (n.thumbUrl) return n.thumbUrl;
    }
  }
  const norm = normalizeCloudMedia(post.mediaUrl || post.publicMediaUrl || '', 'image');
  return norm.thumbUrl || post.mediaUrl || './logo.png';
}

// ==========================================
// QUEUE LIST & DIRECT META GRAPH API PUBLISH
// ==========================================
function renderPostsQueue() {
  const listEl = document.getElementById('postsQueueList');
  if (!listEl) return;

  const filtered = appState.posts.filter((p) => {
    if (currentPostFilter === 'all') return true;
    if (currentPostFilter === 'CAROUSEL') return isPostCarousel(p);
    if (currentPostFilter === 'STORY') return isPostStory(p);
    if (currentPostFilter === 'POST') return p.postFormat !== 'STORY' && p.mediaType !== 'STORIES';
    return p.status === currentPostFilter;
  });

  if (!filtered.length) {
    listEl.innerHTML = `<p class="muted-text">No hay elementos en este filtro.</p>`;
    return;
  }

  const statusLabels = {
    scheduled: 'Programado',
    published: 'Publicado',
    draft: 'Borrador',
    failed: 'Con Error'
  };

  listEl.innerHTML = filtered
    .map((p) => {
      const dateFormatted = p.scheduledAt
        ? new Date(p.scheduledAt).toLocaleString('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        : 'Sin fecha';
      const lastLog = p.logs && p.logs.length ? p.logs[p.logs.length - 1].message : '';
      const storyFlag = isPostStory(p);
      const carouselFlag = isPostCarousel(p);
      const thumbUrl = getPostThumbnailUrl(p);
      const btnActionLabel = carouselFlag
        ? '🎠 Publicar Carrusel Ahora'
        : p.postFormat === 'BOTH'
        ? '🚀 Publicar Historia + Reel Ahora'
        : p.postFormat === 'STORY' || p.mediaType === 'STORIES'
        ? '⭕ Publicar Solo Historia Ahora'
        : p.postFormat === 'REEL' || p.mediaType === 'REELS'
        ? '🎬 Publicar Solo Reel Ahora'
        : '📸 Publicar Solo Post Ahora';

      return `
        <div class="queue-row" style="${storyFlag ? 'border-left: 4px solid #ec4899;' : carouselFlag ? 'border-left: 4px solid #06b6d4;' : ''}">
          <div class="queue-row-left">
            <img src="${escapeHtml(thumbUrl)}" class="queue-thumb" referrerpolicy="no-referrer" alt="" onerror="this.src='./logo.png'" />
            <div class="queue-row-info">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                ${getPostFormatBadge(p)}
                <strong>${escapeHtml(p.title)}</strong>
                <span class="status-badge ${p.status}">${statusLabels[p.status] || p.status}</span>
              </div>
              <div style="font-size:0.78rem;color:var(--text-muted);">
                🗓️ ${dateFormatted} • Redes: ${(p.platforms || []).join(', ').toUpperCase()}
              </div>
              ${lastLog ? `<div style="font-size:0.73rem;color:#a5b4fc;margin-top:3px;overflow-wrap:anywhere;">ℹ️ ${escapeHtml(lastLog)}</div>` : ''}
            </div>
          </div>

          <div class="queue-actions">
            <button class="btn-primary btn-sm" onclick="publishPostNow('${p.id}')">
              ${btnActionLabel}
            </button>
            <button class="btn-secondary btn-sm" onclick="quickCopyAndDownload('${p.id}')">
              📋 Copiar + Descargar
            </button>
            <button class="btn-outline btn-sm" onclick="editPostById('${p.id}')">
              ✏️ Editar
            </button>
            <button class="btn-outline btn-sm" onclick="deletePostById('${p.id}')">
              🗑️
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

// Helper: Call local server /api/meta/fb-rupload or Cloud Relay to execute 3-phase rupload.facebook.com without browser CORS 403
async function callServerFacebookRupload(payload) {
  const endpoints = ['/api/meta/fb-rupload', 'http://localhost:3000/api/meta/fb-rupload'];
  let lastError = null;
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) continue;
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error en servidor fb-rupload');
      }
      return data;
    } catch (err) {
      lastError = err;
      if (err.message && !/Failed to fetch|NetworkError/i.test(err.message)) {
        throw err;
      }
    }
  }

  // Fallback Cloud Relay via Firestore for mobile / remote browsers
  const relayUrl =
    'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/fb_rupload_relay';
  const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const jobPayload = {
    jobId,
    status: 'pending',
    ...payload
  };

  await fetch(relayUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        payload: { stringValue: JSON.stringify(jobPayload) },
        savedAt: { stringValue: new Date().toISOString() }
      }
    })
  });

  for (let i = 0; i < 16; i++) {
    await new Promise((r) => setTimeout(r, 2500));
    const checkRes = await fetch(relayUrl);
    if (!checkRes.ok) continue;
    const checkDoc = await checkRes.json();
    const rawStr = checkDoc?.fields?.payload?.stringValue;
    if (!rawStr) continue;
    const state = JSON.parse(rawStr);
    if (state.jobId === jobId) {
      if (state.status === 'done') {
        return state;
      }
      if (state.status === 'error') {
        throw new Error(state.error || 'Error en publicación de Historia en Video de Facebook');
      }
    }
  }

  throw lastError || new Error('Tiempo de espera agotado al transferir video a Facebook Stories');
}

// Publish a single targetMode ('STORY', 'REEL', or 'POST') to Facebook Page (Cocuyo Grafic)
async function executeFacebookPagePublish(post, cfg, mediaUrl, isVideoFile, targetMode) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const userToken = (cfg.accessToken || '').trim();
  const fbPageId = (cfg.fbPageId || '102786358439057').trim();

  if (!fbPageId) {
    throw new Error('No se encontró el ID de tu Página de Facebook. Verifica tu Token en "Paso a Paso Meta".');
  }

  // 1. Obtener el Page Access Token oficial de la Página
  const pageRes = await fetch(
    `${graphBase}/${fbPageId}?fields=id,name,access_token&access_token=${encodeURIComponent(userToken)}`
  );
  const pageData = await pageRes.json();
  if (!pageRes.ok || pageData.error) {
    const msg = pageData.error ? pageData.error.message : 'No se pudo obtener el Page Access Token';
    if (/expired/i.test(msg)) {
      throw new Error(
        'Tu Access Token temporal de 1 hora expiró. En Graph API Explorer haz clic en "Generate Access Token" (asegúrate de incluir el permiso pages_manage_posts) y pégalo en Paso a Paso Meta.'
      );
    }
    throw new Error(`Facebook Page API: ${msg}`);
  }

  const pageToken = pageData.access_token || userToken;
  const pageName = pageData.name || cfg.fbPageName || 'Facebook Page';

  const formatFbError = (errObj) => {
    const raw = errObj?.message || 'Error publicando en Facebook Page';
    if (/pages_manage_posts/i.test(raw) || errObj?.code === 200) {
      return `Para publicar en Facebook (${pageName}) necesitas añadir el permiso "pages_manage_posts" en Graph API Explorer y generar un nuevo Token.`;
    }
    return raw;
  };

  // MODO 1: SOLO HISTORIA 24H EN PÁGINA DE FACEBOOK (photo_stories / video_stories — NUNCA publica como Reel)
  if (targetMode === 'STORY') {
    if (!isVideoFile) {
      const p1 = new URLSearchParams();
      p1.append('url', mediaUrl);
      p1.append('published', 'false');
      p1.append('access_token', pageToken);

      const r1 = await fetch(`${graphBase}/${fbPageId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: p1.toString()
      });
      const d1 = await r1.json();
      if (!r1.ok || d1.error) {
        throw new Error(formatFbError(d1.error));
      }

      const p2 = new URLSearchParams();
      p2.append('photo_id', d1.id);
      p2.append('access_token', pageToken);

      const r2 = await fetch(`${graphBase}/${fbPageId}/photo_stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: p2.toString()
      });
      const d2 = await r2.json();
      if (!r2.ok || d2.error) {
        throw new Error(formatFbError(d2.error));
      }

      return {
        fbPublishId: d2.post_id || d1.id,
        label: `⭕ Historia 24h publicada en Facebook (${pageName} • ID: ${d2.post_id || d1.id})`
      };
    } else {
      // Video Story 24h exclusivo vía /video_stories (sin caer nunca en /videos Reels)
      const srvData = await callServerFacebookRupload({
        fbPageId,
        pageToken,
        userToken,
        pageName,
        mediaUrl,
        caption: post.caption || '',
        mode: 'STORY'
      });
      return {
        fbPublishId: srvData.fbPublishId,
        label: srvData.label || `⭕ Historia 24h en Video publicada en Facebook (${pageName} • ID: ${srvData.fbPublishId})`
      };
    }
  }

  // MODO 2: SOLO REEL EN PÁGINA DE FACEBOOK (/video_reels o /videos)
  if (targetMode === 'REEL') {
    if (!isVideoFile) {
      throw new Error('Para publicar en formato Reel debes seleccionar un archivo de video MP4.');
    }
    try {
      const srvData = await callServerFacebookRupload({
        fbPageId,
        pageToken,
        userToken,
        pageName,
        mediaUrl,
        caption: post.caption || '',
        mode: 'REEL'
      });
      return {
        fbPublishId: srvData.fbPublishId,
        label: srvData.label || `🎬 Reel publicado en Facebook (${pageName} • ID: ${srvData.fbPublishId})`
      };
    } catch (_) {
      const vidParams = new URLSearchParams();
      vidParams.append('file_url', mediaUrl);
      vidParams.append('description', post.caption || '');
      vidParams.append('published', 'true');
      vidParams.append('access_token', pageToken);

      const vidRes = await fetch(`https://graph-video.facebook.com/v22.0/${fbPageId}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: vidParams.toString()
      });
      const vidData = await vidRes.json();
      if (!vidRes.ok || vidData.error) {
        throw new Error(formatFbError(vidData.error));
      }
      return {
        fbPublishId: vidData.id,
        label: `🎬 Reel publicado en Facebook (${pageName} • ID: ${vidData.id})`
      };
    }
  }

  // MODO 3: SOLO POST EN EL FEED DE LA PÁGINA DE FACEBOOK
  if (isVideoFile) {
    const vidParams = new URLSearchParams();
    vidParams.append('file_url', mediaUrl);
    vidParams.append('description', post.caption || '');
    vidParams.append('published', 'true');
    vidParams.append('access_token', pageToken);

    const vidRes = await fetch(`https://graph-video.facebook.com/v22.0/${fbPageId}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: vidParams.toString()
    });
    const vidData = await vidRes.json();
    if (!vidRes.ok || vidData.error) {
      throw new Error(formatFbError(vidData.error));
    }
    return {
      fbPublishId: vidData.id,
      label: `📘 Video publicado en el Feed de Facebook (${pageName} • ID: ${vidData.id})`
    };
  } else {
    const phParams = new URLSearchParams();
    phParams.append('url', mediaUrl);
    phParams.append('caption', post.caption || '');
    phParams.append('published', 'true');
    phParams.append('access_token', pageToken);

    const phRes = await fetch(`${graphBase}/${fbPageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: phParams.toString()
    });
    const phData = await phRes.json();
    if (!phRes.ok || phData.error) {
      throw new Error(formatFbError(phData.error));
    }
    return {
      fbPublishId: phData.post_id || phData.id,
      label: `📘 Post publicado en el Feed de Facebook (${pageName} • ID: ${phData.post_id || phData.id})`
    };
  }
}

// Helper: Publish a single targetMode ('STORY', 'REEL', or 'POST') to Instagram Business
async function executeInstagramSinglePublish(post, accessToken, igUserId, mediaUrl, isVideoFile, targetMode) {
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
    const msg = step1Data.error ? step1Data.error.message : 'Error creando contenedor en Instagram Graph API';
    if (/expired/i.test(msg)) {
      throw new Error(
        'Tu Access Token de 1 hora expiró. En Graph API Explorer haz clic en "Generate Access Token" y pégalo en Paso a Paso Meta.'
      );
    }
    throw new Error(msg);
  }

  const creationId = step1Data.id;
  const maxAttempts = isVideoFile || targetMode === 'STORY' ? 30 : 10;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, 3000));
    try {
      const stRes = await fetch(
        `${graphBase}/${creationId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
      );
      const stData = await stRes.json();
      if (stData.status_code === 'FINISHED') break;
      if (stData.status_code === 'ERROR' || stData.status_code === 'EXPIRED') {
        throw new Error(`Instagram rechazó el procesamiento del archivo: ${stData.status || stData.status_code}`);
      }
      if (attempt === 2 || attempt === 6) {
        showToast(`⏳ Instagram está procesando tu ${isVideoFile ? 'video MP4' : 'archivo'} (${attempt * 3}s)...`);
      }
    } catch (pollErr) {
      if (pollErr.message && pollErr.message.startsWith('Instagram rechazó')) throw pollErr;
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
    throw new Error(step2Data.error ? step2Data.error.message : 'Error en media_publish de Instagram Graph API');
  }

  const label =
    targetMode === 'STORY'
      ? `⭕ Historia 24h publicada en Instagram Stories (ID: ${step2Data.id})`
      : targetMode === 'REEL' || isVideoFile
      ? `🎬 Reel publicado en Instagram (ID: ${step2Data.id})`
      : `📸 Post publicado en Instagram (ID: ${step2Data.id})`;

  return {
    containerId: creationId,
    publishId: step2Data.id,
    label
  };
}

// Helper: Publish video MP4 from Google Drive or URL to TikTok via FILE_UPLOAD binary chunk transfer
async function executeTikTokPublish(post, mediaUrl, isVideoFile) {
  if (!isVideoFile) {
    throw new Error('La API de TikTok Content Posting solo permite videos en formato MP4. Selecciona un video MP4.');
  }
  const tkCfg = appState.tiktokConfig || {};
  const payload = {
    accessToken: (tkCfg.accessToken || '').trim(),
    mediaUrl,
    title: post.caption || post.title || 'Publicado desde SHEEP 100 #sheep100',
    deliveryMode: tkCfg.deliveryMode || 'DIRECT',
    tiktokConfig: tkCfg
  };

  if (!payload.accessToken && !tkCfg.refreshToken) {
    throw new Error(
      'Falta tu Access Token de TikTok. Ve a la pestaña "🎵 Paso a Paso TikTok" y pulsa "🔗 1. Autorizar y Conectar con TikTok".'
    );
  }

  const endpoints = ['/api/tiktok/publish-video', 'http://localhost:3000/api/tiktok/publish-video'];
  let lastError = null;
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) continue;
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error publicando en TikTok');
      }
      if (data.refreshedAccessToken && data.refreshedAccessToken !== tkCfg.accessToken) {
        appState.tiktokConfig.accessToken = data.refreshedAccessToken;
      }
      return data;
    } catch (err) {
      lastError = err;
      if (err.message && !/Failed to fetch|NetworkError/i.test(err.message)) {
        throw err;
      }
    }
  }

  // Fallback Cloud Relay via Firestore (when publishing from mobile or when localhost is not reachable)
  const relayUrl =
    'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/fb_rupload_relay';
  const jobId = `tk_pub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const jobPayload = {
    jobId,
    status: 'pending',
    provider: 'TIKTOK_PUBLISH',
    ...payload
  };

  await fetch(relayUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        payload: { stringValue: JSON.stringify(jobPayload) },
        savedAt: { stringValue: new Date().toISOString() }
      }
    })
  });

  for (let i = 0; i < 18; i++) {
    await new Promise((r) => setTimeout(r, 2500));
    const checkRes = await fetch(relayUrl);
    if (!checkRes.ok) continue;
    const checkDoc = await checkRes.json();
    const rawStr = checkDoc?.fields?.payload?.stringValue;
    if (!rawStr) continue;
    const state = JSON.parse(rawStr);
    if (state.jobId === jobId) {
      if (state.status === 'done') {
        if (state.refreshedAccessToken) {
          appState.tiktokConfig.accessToken = state.refreshedAccessToken;
        }
        return state;
      }
      if (state.status === 'error') {
        throw new Error(state.error || 'Error subiendo video MP4 a TikTok');
      }
    }
  }

  throw lastError || new Error('Tiempo de espera agotado al transferir video MP4 a TikTok');
}

// Resolve ordered Carousel slides into verified public image/video URLs
function resolveCarouselItemsClient(post) {
  const rawList = Array.isArray(post?.carouselItems) ? post.carouselItems : [];
  const resolved = [];
  for (const item of rawList) {
    if (!item) continue;
    let rawUrl = (typeof item === 'string' ? item : item.publicUrl || item.url || '').trim();
    let linkedType = item.type || '';
    if (item.mediaId && Array.isArray(appState.mediaLibrary)) {
      const m = appState.mediaLibrary.find((x) => x.id === item.mediaId);
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
    if (finalUrl) {
      resolved.push({
        mediaUrl: finalUrl,
        thumbUrl: norm.thumbUrl || finalUrl,
        isVideo
      });
    }
  }
  return resolved;
}

// Publish Carousel (2-10 mixed photos/videos) to Instagram Business via Meta Graph API
async function executeInstagramCarouselPublish(post, accessToken, igUserId, items) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  if (!Array.isArray(items) || items.length < 2 || items.length > 10) {
    throw new Error('Un Carrusel de Instagram requiere entre 2 y 10 diapositivas.');
  }

  const childIds = [];
  for (let i = 0; i < items.length; i++) {
    const slide = items[i];
    showToast(`🎠 Preparando diapositiva ${i + 1} de ${items.length} en Instagram...`);
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
      const msg = cData.error ? cData.error.message : 'Error creando slide del carrusel';
      if (/expired/i.test(msg)) {
        throw new Error(
          'Tu Access Token de Meta expiró. Genera uno nuevo en Graph API Explorer y pégalo en Paso a Paso Meta.'
        );
      }
      throw new Error(`Slide ${i + 1}: ${msg}`);
    }

    const childId = cData.id;
    const maxAttempts = slide.isVideo ? 30 : 10;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await new Promise((r) => setTimeout(r, 2500));
      try {
        const stRes = await fetch(
          `${graphBase}/${childId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
        );
        const stData = await stRes.json();
        if (stData.status_code === 'FINISHED') break;
        if (stData.status_code === 'ERROR' || stData.status_code === 'EXPIRED') {
          throw new Error(`Instagram rechazó la diapositiva ${i + 1}: ${stData.status || stData.status_code}`);
        }
      } catch (pollErr) {
        if (pollErr.message && pollErr.message.startsWith('Instagram rechazó')) throw pollErr;
      }
    }
    childIds.push(childId);
  }

  const parentParams = new URLSearchParams();
  parentParams.append('access_token', accessToken);
  parentParams.append('media_type', 'CAROUSEL');
  parentParams.append('children', childIds.join(','));
  parentParams.append('caption', post.caption || '');

  const pRes = await fetch(`${graphBase}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: parentParams.toString()
  });
  const pData = await pRes.json();
  if (!pRes.ok || pData.error) {
    throw new Error(pData.error ? pData.error.message : 'Error creando el contenedor padre del Carrusel');
  }

  const parentId = pData.id;
  for (let attempt = 1; attempt <= 15; attempt++) {
    await new Promise((r) => setTimeout(r, 2500));
    try {
      const stRes = await fetch(
        `${graphBase}/${parentId}?fields=status_code,status&access_token=${encodeURIComponent(accessToken)}`
      );
      const stData = await stRes.json();
      if (stData.status_code === 'FINISHED') break;
      if (stData.status_code === 'ERROR' || stData.status_code === 'EXPIRED') {
        throw new Error(`Instagram rechazó el carrusel: ${stData.status || stData.status_code}`);
      }
    } catch (pollErr) {
      if (pollErr.message && pollErr.message.startsWith('Instagram rechazó')) throw pollErr;
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
    throw new Error(pubData.error ? pubData.error.message : 'Error publicando Carrusel en Instagram');
  }

  return {
    containerId: parentId,
    publishId: pubData.id,
    label: `🎠 Carrusel (${items.length} slides) publicado en Instagram (ID: ${pubData.id})`
  };
}

// Publish Multi-Photo Carousel to Facebook Page using /photos (published=false) + /feed attached_media
async function executeFacebookCarouselPublish(post, cfg, items) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const userToken = (cfg.accessToken || '').trim();
  const fbPageId = (cfg.fbPageId || '102786358439057').trim();

  const pageRes = await fetch(
    `${graphBase}/${fbPageId}?fields=id,name,access_token&access_token=${encodeURIComponent(userToken)}`
  );
  const pageData = await pageRes.json();
  if (!pageRes.ok || pageData.error) {
    throw new Error(pageData.error ? pageData.error.message : 'No se pudo obtener el Page Access Token de Facebook');
  }
  const pageToken = pageData.access_token || userToken;
  const pageName = pageData.name || cfg.fbPageName || 'Facebook Page';

  const photoSlides = items.filter((it) => !it.isVideo);
  if (photoSlides.length < 2) {
    return await executeFacebookPagePublish(post, cfg, items[0].mediaUrl, items[0].isVideo, 'POST');
  }

  const attachedMedia = [];
  for (const slide of photoSlides) {
    const p1 = new URLSearchParams();
    p1.append('url', slide.mediaUrl);
    p1.append('published', 'false');
    p1.append('access_token', pageToken);
    const r1 = await fetch(`${graphBase}/${fbPageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: p1.toString()
    });
    const d1 = await r1.json();
    if (!r1.ok || d1.error) {
      throw new Error(d1.error ? d1.error.message : 'Error subiendo foto de carrusel a Facebook Page');
    }
    attachedMedia.push({ media_fbid: d1.id });
  }

  const feedRes = await fetch(`${graphBase}/${fbPageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: post.caption || '',
      attached_media: attachedMedia,
      access_token: pageToken
    })
  });
  const feedData = await feedRes.json();
  if (!feedRes.ok || feedData.error) {
    throw new Error(feedData.error ? feedData.error.message : 'Error publicando carrusel en Facebook Page');
  }

  return {
    fbPublishId: feedData.id,
    label: `🎠 Carrusel (${photoSlides.length} fotos) publicado en Facebook (${pageName} • ID: ${feedData.id})`
  };
}

// Executes the official Meta Graph API + TikTok Content Posting API v2 flow
// Supports 5 formats: 'POST', 'CAROUSEL', 'STORY', 'REEL', and 'BOTH'
async function executeMetaPublishFlow(post) {
  const cfg = appState.metaConfig || {};
  const accessToken = (cfg.accessToken || '').trim();
  const igUserId = (cfg.igUserId || '').trim();

  const rawFormat =
    post.postFormat ||
    (post.mediaType === 'CAROUSEL' || post.mediaType === 'CAROUSEL_ALBUM'
      ? 'CAROUSEL'
      : post.mediaType === 'STORIES'
      ? 'STORY'
      : post.mediaType === 'REELS'
      ? 'REEL'
      : 'POST');
  const isCarousel = rawFormat === 'CAROUSEL' || isPostCarousel(post);
  const carouselItems = isCarousel ? resolveCarouselItemsClient(post) : [];

  const rawMediaUrl = (post.publicMediaUrl || post.mediaUrl || carouselItems[0]?.mediaUrl || '').trim();
  const isVideoFile = isPostVideo(post);
  const norm = normalizeCloudMedia(rawMediaUrl, isVideoFile ? 'video' : 'image');
  const mediaUrl = norm.publicUrl || rawMediaUrl;
  const isPublicHttp = isCarousel
    ? carouselItems.length >= 2 && carouselItems.every((it) => /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(it.mediaUrl))
    : /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);

  const targetModes =
    rawFormat === 'BOTH'
      ? ['STORY', isVideoFile ? 'REEL' : 'POST']
      : [rawFormat];

  const platforms = Array.isArray(post.platforms) && post.platforms.length ? post.platforms : ['instagram'];
  const wantInstagram = platforms.includes('instagram');
  const wantFacebook = platforms.includes('facebook');
  const wantTikTok = platforms.includes('tiktok');

  if ((wantInstagram || wantFacebook) && (!accessToken || (!igUserId && !cfg.fbPageId))) {
    if (cfg.simulationFallback !== false) {
      return {
        success: true,
        containerId: `SIM_${Date.now()}`,
        mediaPublishId: `SIM_POST_${Date.now()}`,
        message: 'Publicado en Modo Simulación (Conecta tu Token en "Paso a Paso Meta" para envío directo).'
      };
    }
    throw new Error('Falta configurar el Access Token en la pestaña "Paso a Paso Meta".');
  }

  if (isCarousel && carouselItems.length < 2) {
    throw new Error('Un Carrusel requiere mínimo 2 y máximo 10 fotos/videos con URL pública https://.');
  }

  if (!isPublicHttp) {
    if (cfg.simulationFallback !== false) {
      return {
        success: true,
        containerId: `LOCAL_${Date.now()}`,
        mediaPublishId: `READY_${Date.now()}`,
        message: 'Marcado como listo (Nota de API: para publicar directamente la foto/video requiere URL pública https:// o Google Drive).'
      };
    }
    throw new Error('Se requiere una URL pública https:// o enlace de Google Drive en formato JPG o MP4.');
  }

  const resultsMessages = [];
  let lastContainerId = '';
  let lastPublishId = '';
  let igPublishId = '';
  let fbPublishId = '';
  let tiktokPublishId = '';

  // 1. PUBLICAR EN INSTAGRAM
  if (wantInstagram) {
    if (isCarousel) {
      const igRes = await executeInstagramCarouselPublish(post, accessToken, igUserId, carouselItems);
      lastContainerId = igRes.containerId || lastContainerId;
      lastPublishId = igRes.publishId || lastPublishId;
      igPublishId = igRes.publishId || igPublishId;
      resultsMessages.push(igRes.label);
    } else {
      for (const mode of targetModes) {
        const igRes = await executeInstagramSinglePublish(
          post,
          accessToken,
          igUserId,
          mediaUrl,
          isVideoFile,
          mode
        );
        lastContainerId = igRes.containerId || lastContainerId;
        lastPublishId = igRes.publishId || lastPublishId;
        if (mode !== 'STORY' || !igPublishId) {
          igPublishId = igRes.publishId || igPublishId;
        }
        resultsMessages.push(igRes.label);
      }
    }
  }

  // 2. PUBLICAR EN PÁGINA DE FACEBOOK
  if (wantFacebook) {
    if (isCarousel) {
      const fbRes = await executeFacebookCarouselPublish(post, cfg, carouselItems);
      lastPublishId = fbRes.fbPublishId || lastPublishId;
      fbPublishId = fbRes.fbPublishId || fbPublishId;
      resultsMessages.push(fbRes.label);
    } else {
      for (const mode of targetModes) {
        const fbRes = await executeFacebookPagePublish(post, cfg, mediaUrl, isVideoFile, mode);
        lastPublishId = fbRes.fbPublishId || lastPublishId;
        fbPublishId = fbRes.fbPublishId || fbPublishId;
        resultsMessages.push(fbRes.label);
      }
    }
  }

  // 3. PUBLICAR EN TIKTOK VÍA FILE_UPLOAD BINARIO DESDE GOOGLE DRIVE
  if (wantTikTok) {
    const firstVideoSlide = isCarousel ? carouselItems.find((it) => it.isVideo) : null;
    if (isCarousel && !firstVideoSlide) {
      throw new Error('TikTok requiere un video MP4; para carruseles de solo fotos desmarca TikTok.');
    }
    const ttRes = await executeTikTokPublish(
      post,
      firstVideoSlide ? firstVideoSlide.mediaUrl : mediaUrl,
      isCarousel ? Boolean(firstVideoSlide) : isVideoFile
    );
    lastPublishId = ttRes.publishId || lastPublishId;
    tiktokPublishId = ttRes.publishId || tiktokPublishId;
    resultsMessages.push(ttRes.label);
  }

  return {
    success: true,
    containerId: lastContainerId,
    mediaPublishId: igPublishId || fbPublishId || tiktokPublishId || lastPublishId,
    igPublishId,
    fbPublishId,
    tiktokPublishId,
    message: resultsMessages.join(' + ')
  };
}

window.publishPostNow = async function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (!post || post._isPublishing) return;

  post._isPublishing = true;
  const fmt = post.postFormat || (post.mediaType === 'CAROUSEL' ? 'CAROUSEL' : post.mediaType === 'STORIES' ? 'STORY' : 'POST');
  showToast(
    fmt === 'CAROUSEL'
      ? '🎠 Publicando Carrusel en tus redes (puede tardar 15-40s según la cantidad de slides)...'
      : fmt === 'BOTH'
      ? '🔥 Publicando simultáneamente en Historia 24h y en Reel/Post (puede tardar 15-35s)...'
      : fmt === 'STORY'
      ? '⭕ Publicando exclusivamente en Historia 24h (puede tardar 10-25s si es video)...'
      : fmt === 'REEL'
      ? '🎬 Publicando exclusivamente en Reels...'
      : '📸 Publicando en el Feed...'
  );
  try {
    const result = await executeMetaPublishFlow(post);
    post.status = 'published';
    post.publishedAt = new Date().toISOString();
    post.metaPublishId = result.mediaPublishId;
    if (result.igPublishId) post.igPublishId = result.igPublishId;
    if (result.fbPublishId) post.fbPublishId = result.fbPublishId;
    if (result.tiktokPublishId) post.tiktokPublishId = result.tiktokPublishId;
    post.logs = post.logs || [];
    post.logs.push({ time: new Date().toISOString(), message: result.message });
    if (!post.metrics) {
      post.metrics = { reach: 0, likes: 0, comments: 0, saves: 0 };
    }
    delete post._isPublishing;
    renderAll();
    await saveStateEverywhere(false);
    showToast(`✅ ${result.message}`);
    if (appState.metaConfig?.accessToken && appState.metaConfig?.igUserId) {
      setTimeout(() => syncLiveMetaMetrics({ silent: true, force: true }), 4000);
    }
  } catch (err) {
    delete post._isPublishing;
    post.status = 'failed';
    post.logs = post.logs || [];
    post.logs.push({ time: new Date().toISOString(), message: `Error: ${err.message}` });
    renderAll();
    await saveStateEverywhere(false);
    showToast(`❌ ${err.message}`);
  }
};

async function runBrowserAutoScheduler() {
  if (appState.metaConfig?.autoPublishEnabled === false) return;
  const now = new Date();
  const due = appState.posts.filter(
    (p) => !p._isPublishing && p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now
  );
  if (!due.length) return;

  for (const post of due) {
    post._isPublishing = true;
    try {
      const result = await executeMetaPublishFlow(post);
      post.status = 'published';
      post.publishedAt = new Date().toISOString();
      post.metaPublishId = result.mediaPublishId;
      if (result.igPublishId) post.igPublishId = result.igPublishId;
      if (result.fbPublishId) post.fbPublishId = result.fbPublishId;
      if (result.tiktokPublishId) post.tiktokPublishId = result.tiktokPublishId;
      post.logs = post.logs || [];
      post.logs.push({ time: new Date().toISOString(), message: `[Auto] ${result.message}` });
      delete post._isPublishing;
    } catch (err) {
      delete post._isPublishing;
      post.status = 'failed';
      post.logs = post.logs || [];
      post.logs.push({ time: new Date().toISOString(), message: `[Auto Error] ${err.message}` });
    }
  }
  renderAll();
  await saveStateEverywhere(false);
  checkDueNotifications();
}

window.quickCopyAndDownload = async function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (!post) return;

  try {
    await navigator.clipboard.writeText(post.caption || '');
  } catch (_) {}

  if (post.mediaUrl) {
    const a = document.createElement('a');
    a.href = post.mediaUrl;
    a.target = '_blank';
    a.download = `${(post.title || 'sheep100').replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  showToast('📋 ¡Texto copiado y archivo abierto para descargar!');
};

window.editPostById = function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (post) openComposerModal({ post });
};

window.deletePostById = async function (postId) {
  appState.posts = appState.posts.filter((p) => p.id !== postId);
  renderAll();
  await saveStateEverywhere(true);
  showToast('🗑️ Elemento eliminado');
};

// ==========================================
// INSTAGRAM 3x3 VISUAL GRID + STORIES TRAY
// ==========================================
function renderInstagramGrid() {
  const gridContainer = document.getElementById('igGridContainer');
  const storiesTray = document.getElementById('igStoriesTray');
  if (!gridContainer) return;

  const storiesList = appState.posts.filter((p) => isPostStory(p));
  const feedPosts = appState.posts.filter((p) => p.postFormat !== 'STORY' && p.mediaType !== 'STORIES');

  document.getElementById('statScheduledCount').textContent = feedPosts.filter(
    (p) => p.status === 'scheduled'
  ).length;
  const stEl = document.getElementById('statStoriesCount');
  if (stEl) stEl.textContent = storiesList.length;
  document.getElementById('statPublishedCount').textContent = appState.posts.filter(
    (p) => p.status === 'published'
  ).length;

  const handleEl = document.getElementById('igPreviewHandle');
  if (appState.metaConfig?.igUsername) {
    handleEl.textContent = `@${appState.metaConfig.igUsername.replace(/^@/, '')}`;
  }

  // Render Stories Tray (24h Ring)
  if (storiesTray) {
    storiesTray.innerHTML =
      `
      <div class="ig-story-bubble" onclick="openComposerModal({ defaultFormat: 'STORY' })" title="Programar nueva Historia 24h">
        <div class="ig-story-ring add-new">
          <span style="font-size:1.3rem;color:#fff;">＋</span>
        </div>
        <small>Tu historia</small>
      </div>
    ` +
      storiesList
        .map(
          (st) => `
        <div class="ig-story-bubble" data-story-id="${st.id}">
          <div class="ig-story-ring">
            <img src="${st.mediaUrl || './logo.png'}" referrerpolicy="no-referrer" alt="${escapeHtml(st.title)}" onerror="this.src='./logo.png'" />
          </div>
          <small>${escapeHtml(st.title)}</small>
        </div>
      `
        )
        .join('');

    storiesTray.querySelectorAll('[data-story-id]').forEach((bub) => {
      bub.addEventListener('click', () => {
        const st = appState.posts.find((p) => p.id === bub.dataset.storyId);
        if (!st) return;
        const detailBox = document.getElementById('selectedGridPostDetail');
        detailBox.innerHTML = `
          <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
            <img src="${st.mediaUrl || './logo.png'}" style="width:110px;height:190px;object-fit:cover;border-radius:12px;border:2px solid #ec4899;flex-shrink:0;" />
            <div style="flex:1;min-width:0;overflow-wrap:anywhere;display:flex;flex-direction:column;gap:8px;">
              <div>${getPostFormatBadge(st)}</div>
              <strong>${escapeHtml(st.title)}</strong>
              <p style="font-size:0.8rem;color:#cbd5e1;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(st.caption)}</p>
              <div style="font-size:0.75rem;color:var(--text-muted);">
                ⏰ Programada: ${new Date(st.scheduledAt).toLocaleString('es-ES')}
              </div>
              <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">
                <button class="btn-primary btn-sm" onclick="publishPostNow('${st.id}')">⭕ Publicar Historia Ahora</button>
                <button class="btn-outline btn-sm" onclick="editPostById('${st.id}')">✏️ Editar</button>
              </div>
            </div>
          </div>
        `;
      });
    });
  }

  // Render 3x3 Feed Grid (Posts, Carousels & Reels)
  const orderedPosts = [...feedPosts].sort(
    (a, b) => (a.gridOrder || 99) - (b.gridOrder || 99)
  );

  gridContainer.innerHTML = orderedPosts
    .slice(0, 9)
    .map(
      (p) => `
      <div class="ig-cell" draggable="true" data-post-id="${p.id}">
        <img src="${escapeHtml(getPostThumbnailUrl(p))}" referrerpolicy="no-referrer" alt="${escapeHtml(p.title)}" onerror="this.src='./logo.png'" />
        <span class="ig-cell-badge">${isPostCarousel(p) ? `🎠${p.carouselItems?.length || ''} ` : ''}${p.status === 'published' ? '✔' : '⏰'}</span>
      </div>
    `
    )
    .join('');

  const postsCountEl = document.getElementById('igMockPostsCount');
  if (postsCountEl && appState.metaConfig?.mediaCount !== undefined) {
    postsCountEl.textContent = String(appState.metaConfig.mediaCount);
  }

  let draggedPostId = null;

  gridContainer.querySelectorAll('.ig-cell').forEach((cell) => {
    cell.addEventListener('dragstart', () => {
      draggedPostId = cell.dataset.postId;
    });
    cell.addEventListener('dragover', (e) => e.preventDefault());
    cell.addEventListener('drop', async (e) => {
      e.preventDefault();
      const targetId = cell.dataset.postId;
      if (!draggedPostId || draggedPostId === targetId) return;

      const ids = orderedPosts.map((p) => p.id);
      const fromIdx = ids.indexOf(draggedPostId);
      const toIdx = ids.indexOf(targetId);
      if (fromIdx > -1 && toIdx > -1) {
        ids.splice(fromIdx, 1);
        ids.splice(toIdx, 0, draggedPostId);
        ids.forEach((id, index) => {
          const item = appState.posts.find((p) => p.id === id);
          if (item) item.gridOrder = index + 1;
        });
        renderAll();
        await saveStateEverywhere(true);
      }
    });

    cell.addEventListener('click', () => {
      const post = appState.posts.find((p) => p.id === cell.dataset.postId);
      if (!post) return;
      const detailBox = document.getElementById('selectedGridPostDetail');
      detailBox.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:8px;min-width:0;overflow-wrap:anywhere;">
          <div>${getPostFormatBadge(post)} <strong>${escapeHtml(post.title)}</strong></div>
          <p style="font-size:0.8rem;color:#cbd5e1;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(post.caption)}</p>
          <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">
            <button class="btn-primary btn-sm" onclick="publishPostNow('${post.id}')">🚀 Publicar Ahora</button>
            <button class="btn-secondary btn-sm" onclick="quickCopyAndDownload('${post.id}')">📋 Copiar Copy + Foto</button>
          </div>
        </div>
      `;
    });
  });
}

// ==========================================
// CENTRO DE MÉTRICAS E INSIGHTS (META API v22.0)
// ==========================================
function initMetricsEvents() {
  document.querySelectorAll('#metricsFilterPills .pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#metricsFilterPills .pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentMetricsFilter = pill.dataset.mfilter;
      renderMetricsDashboard();
    });
  });

  document.getElementById('btnSyncMetaMetrics')?.addEventListener('click', () => {
    syncLiveMetaMetrics({ silent: false, force: true });
  });
}

function parseInsightsMetricMap(insightsJson) {
  const map = {};
  const list = Array.isArray(insightsJson?.data) ? insightsJson.data : [];
  for (const row of list) {
    if (!row?.name) continue;
    if (row.total_value && typeof row.total_value.value === 'number') {
      map[row.name] = row.total_value.value;
    } else if (Array.isArray(row.values) && row.values.length > 0) {
      const last = row.values[row.values.length - 1];
      if (typeof last?.value === 'number') {
        map[row.name] = last.value;
      }
    }
  }
  return map;
}

async function fetchIgMediaInsightsSafe(igItem, token, isStory) {
  const graphBase = 'https://graph.facebook.com/v22.0';
  const candidateMetrics = isStory
    ? ['reach,views,replies', 'reach']
    : ['reach,views,saved,shares,total_interactions', 'reach,saved,shares', 'reach,saved', 'reach'];

  let lastError = null;
  for (const metricList of candidateMetrics) {
    try {
      const res = await fetch(
        `${graphBase}/${igItem.id}/insights?metric=${encodeURIComponent(metricList)}&access_token=${encodeURIComponent(
          token
        )}`
      );
      const data = await res.json();
      if (res.ok && !data.error) {
        return { ok: true, map: parseInsightsMetricMap(data), error: null };
      }
      const errCode = data?.error?.code;
      const errMsg = data?.error?.message || '';
      // Error code 10 on brand new Stories (< 5 viewers) -> not an app permission issue
      if (isStory && errCode === 10 && /viewer|enough/i.test(errMsg)) {
        return { ok: true, map: { reach: 0, views: 0, replies: 0 }, error: null };
      }
      lastError = data?.error || { message: errMsg || `HTTP ${res.status}` };
      // If OAuth token invalid/expired or permission missing, don't loop fallbacks unnecessarily
      if (errCode === 190 || errCode === 200 || (errCode === 10 && /permission/i.test(errMsg))) {
        break;
      }
    } catch (e) {
      lastError = { message: e.message };
      break;
    }
  }
  return { ok: false, map: {}, error: lastError };
}

async function fetchFacebookPostMetricsSafe(fbPostId, token) {
  if (!fbPostId || !token) return null;
  const graphBase = 'https://graph.facebook.com/v22.0';
  try {
    const res = await fetch(
      `${graphBase}/${fbPostId}?fields=likes.summary(true),comments.summary(true),shares&access_token=${encodeURIComponent(
        token
      )}`
    );
    const data = await res.json();
    if (!res.ok || data.error) return null;
    const likes = data.likes?.summary?.total_count ?? 0;
    const comments = data.comments?.summary?.total_count ?? 0;
    const shares = data.shares?.count ?? 0;

    let reach = 0;
    try {
      const insRes = await fetch(
        `${graphBase}/${fbPostId}/insights?metric=post_impressions_unique&access_token=${encodeURIComponent(token)}`
      );
      const insData = await insRes.json();
      const map = parseInsightsMetricMap(insData);
      if (typeof map.post_impressions_unique === 'number') {
        reach = map.post_impressions_unique;
      }
    } catch (_) {}

    return { likes, comments, shares, reach };
  } catch (_) {
    return null;
  }
}

async function syncLiveMetaMetrics(opts = {}) {
  const { silent = false, force = false } = typeof opts === 'boolean' ? { silent: opts } : opts || {};
  if (isSyncingMetrics) return;

  const nowMs = Date.now();
  if (!force && nowMs - lastMetricsSyncAttemptAt < 15000) return;

  const btn = document.getElementById('btnSyncMetaMetrics');
  const cfg = appState.metaConfig || {};
  const token = (cfg.accessToken || '').trim();
  const igUserId = (cfg.igUserId || '').trim();

  isSyncingMetrics = true;
  lastMetricsSyncAttemptAt = nowMs;

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Actualizando desde Meta API...';
  }

  try {
    const graphBase = 'https://graph.facebook.com/v22.0';
    const nowIso = new Date().toISOString();

    if (token && igUserId) {
      // 1. Fetch Account Profile & Followers
      const accRes = await fetch(
        `${graphBase}/${igUserId}?fields=followers_count,follows_count,media_count,username,name&access_token=${encodeURIComponent(
          token
        )}`
      );
      const accData = await accRes.json();
      if (!accRes.ok || accData.error) {
        const errCode = accData?.error?.code;
        const rawErr = accData?.error?.message || `Meta API HTTP ${accRes.status}`;
        const isExpired = errCode === 190 || /expired|session|OAuth/i.test(rawErr);
        const friendlyErr = isExpired
          ? 'Tu Access Token de Meta expiró. Genera un nuevo token (o canjéalo por Token de 60 días) en "Paso a Paso Meta".'
          : `Error de Meta Graph API: ${rawErr}`;

        appState.metricsMeta = {
          ...(appState.metricsMeta || {}),
          source: 'error',
          error: friendlyErr,
          errorCode: errCode || null,
          lastAttemptAt: nowIso
        };
        renderMetricsDashboard();
        if (!silent) showToast(`❌ ${friendlyErr}`);
        return;
      }

      if (typeof accData.followers_count === 'number') {
        appState.metaConfig.followersCount = accData.followers_count;
      }
      if (typeof accData.follows_count === 'number') {
        appState.metaConfig.followsCount = accData.follows_count;
      }
      if (typeof accData.media_count === 'number') {
        appState.metaConfig.mediaCount = accData.media_count;
      }
      if (accData.username) {
        appState.metaConfig.igUsername = accData.username;
      }

      // 2. Fetch Account-Level 7-Day Daily Reach & Views (IG User Insights v22.0)
      let dailyReachSeries = null;
      let accountViews7d = null;
      let insightsWarning = '';

      try {
        const untilSec = Math.floor(Date.now() / 1000);
        const sinceSec = untilSec - 7 * 86400;
        const accInsRes = await fetch(
          `${graphBase}/${igUserId}/insights?metric=reach&metric_type=time_series&period=day&since=${sinceSec}&until=${untilSec}&access_token=${encodeURIComponent(
            token
          )}`
        );
        const accInsData = await accInsRes.json();
        if (accInsRes.ok && Array.isArray(accInsData.data)) {
          const reachRow = accInsData.data.find((d) => d.name === 'reach');
          if (reachRow && Array.isArray(reachRow.values) && reachRow.values.length) {
            const weekdayFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
            dailyReachSeries = reachRow.values.slice(-7).map((pt) => {
              const dt = new Date(pt.end_time || pt.start_time || Date.now());
              const rawDay = weekdayFmt.format(dt).replace('.', '');
              const label = rawDay.charAt(0).toUpperCase() + rawDay.slice(1, 3);
              return {
                date: pt.end_time || pt.start_time,
                label,
                reach: typeof pt.value === 'number' ? pt.value : 0
              };
            });
          }
        } else if (accInsData?.error) {
          insightsWarning = accInsData.error.message || '';
        }

        const viewsRes = await fetch(
          `${graphBase}/${igUserId}/insights?metric=views&metric_type=total_value&period=day&since=${sinceSec}&until=${untilSec}&access_token=${encodeURIComponent(
            token
          )}`
        );
        const viewsData = await viewsRes.json();
        const vMap = parseInsightsMetricMap(viewsData);
        if (typeof vMap.views === 'number') {
          accountViews7d = vMap.views;
        }
      } catch (_) {}

      // 3. Fetch Recent Media (Feed, Reels, Carousels) + Active 24h Stories
      const mediaUrl = `${graphBase}/${igUserId}/media?fields=id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,children{id,media_type,media_url,thumbnail_url}&limit=25&access_token=${encodeURIComponent(
        token
      )}`;
      const mediaRes = await fetch(mediaUrl);
      const mediaData = await mediaRes.json();
      if (!mediaRes.ok || mediaData.error) {
        const msg = mediaData?.error?.message || `Error leyendo publicaciones (${mediaRes.status})`;
        appState.metricsMeta = {
          ...(appState.metricsMeta || {}),
          source: 'error',
          error: msg,
          lastAttemptAt: nowIso
        };
        renderMetricsDashboard();
        if (!silent) showToast(`❌ ${msg}`);
        return;
      }

      const feedAndReelItems = Array.isArray(mediaData.data) ? mediaData.data : [];
      let activeStoryItems = [];
      try {
        const stRes = await fetch(
          `${graphBase}/${igUserId}/stories?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&limit=15&access_token=${encodeURIComponent(
            token
          )}`
        );
        const stData = await stRes.json();
        if (stRes.ok && Array.isArray(stData.data)) {
          activeStoryItems = stData.data.map((s) => ({ ...s, media_product_type: 'STORY' }));
        }
      } catch (_) {}

      const allIgItems = [...activeStoryItems, ...feedAndReelItems];
      const topForInsights = allIgItems.slice(0, 20);
      const insightsResults = new Map();
      let insightsPermissionDenied = false;

      // Batch per-media insights fetches (concurrency = 5)
      for (let i = 0; i < topForInsights.length; i += 5) {
        const chunk = topForInsights.slice(i, i + 5);
        const batchOut = await Promise.all(
          chunk.map(async (igItem) => {
            const isSt = igItem.media_product_type === 'STORY' || igItem.media_type === 'STORY';
            const res = await fetchIgMediaInsightsSafe(igItem, token, isSt);
            if (!res.ok && res.error && (res.error.code === 200 || res.error.code === 10)) {
              insightsPermissionDenied = true;
              if (!insightsWarning) insightsWarning = res.error.message;
            }
            return [igItem.id, res];
          })
        );
        batchOut.forEach(([id, res]) => insightsResults.set(id, res));
      }

      let syncedCount = 0;
      const normalizeSnippet = (txt) =>
        String(txt || '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 48)
          .toLowerCase();

      allIgItems.forEach((igItem) => {
        const isSt = igItem.media_product_type === 'STORY' || igItem.media_type === 'STORY';
        const isRl = igItem.media_product_type === 'REELS';
        const isCar = igItem.media_type === 'CAROUSEL_ALBUM';
        const likes = igItem.like_count ?? 0;
        const commentsFromField = igItem.comments_count ?? 0;

        const insRes = insightsResults.get(igItem.id);
        const mMap = insRes?.ok ? insRes.map : {};
        const reach = typeof mMap.reach === 'number' ? mMap.reach : 0;
        const views = typeof mMap.views === 'number' ? mMap.views : reach;
        const saves = typeof mMap.saved === 'number' ? mMap.saved : 0;
        const shares = typeof mMap.shares === 'number' ? mMap.shares : 0;
        const replies = typeof mMap.replies === 'number' ? mMap.replies : null;
        const comments = replies !== null ? replies : commentsFromField;

        const igSnippet = normalizeSnippet(igItem.caption);
        const igTimeMs = igItem.timestamp ? new Date(igItem.timestamp).getTime() : 0;

        const existing = appState.posts.find((p) => {
          if (p.igPublishId === igItem.id || p.metaPublishId === igItem.id || p.id === `ig-${igItem.id}`) {
            return true;
          }
          if (
            p.status === 'published' &&
            !p.igPublishId &&
            igSnippet &&
            normalizeSnippet(p.caption) === igSnippet &&
            igTimeMs &&
            p.publishedAt &&
            Math.abs(new Date(p.publishedAt).getTime() - igTimeMs) < 15 * 60 * 1000
          ) {
            return true;
          }
          return false;
        });

        const carouselChildren =
          isCar && Array.isArray(igItem.children?.data)
            ? igItem.children.data.map((ch, idx) => ({
                id: ch.id || `slide-${idx}`,
                title: `Slide ${idx + 1}`,
                url: ch.thumbnail_url || ch.media_url || './logo.png',
                publicUrl: ch.media_url || ch.thumbnail_url || '',
                type: ch.media_type === 'VIDEO' ? 'video' : 'image'
              }))
            : null;

        const thumbOrMedia =
          igItem.thumbnail_url ||
          igItem.media_url ||
          carouselChildren?.[0]?.url ||
          './logo.png';

        const nextMetrics = {
          reach,
          views,
          likes,
          comments,
          saves,
          shares,
          source: 'meta_live',
          syncedAt: nowIso
        };

        if (existing) {
          existing.igPublishId = igItem.id;
          if (!existing.metaPublishId || String(existing.metaPublishId).startsWith('SIM_')) {
            existing.metaPublishId = igItem.id;
          }
          existing.status = 'published';
          if (igItem.permalink) existing.permalink = igItem.permalink;
          if (carouselChildren && !Array.isArray(existing.carouselItems)) {
            existing.carouselItems = carouselChildren;
            existing.postFormat = 'CAROUSEL';
            existing.mediaType = 'CAROUSEL';
          }
          existing.metrics = nextMetrics;
        } else {
          appState.posts.push({
            id: `ig-${igItem.id}`,
            igPublishId: igItem.id,
            metaPublishId: igItem.id,
            title:
              (igItem.caption || (isSt ? 'Historia de Instagram' : isCar ? 'Carrusel de Instagram' : 'Publicación de Instagram'))
                .split('\n')[0]
                .slice(0, 52),
            caption: igItem.caption || '',
            mediaUrl: thumbOrMedia,
            publicMediaUrl: igItem.media_url || thumbOrMedia,
            mediaType: isCar ? 'CAROUSEL' : isSt ? 'STORIES' : isRl ? 'REELS' : 'IMAGE',
            postFormat: isCar ? 'CAROUSEL' : isSt ? 'STORY' : isRl ? 'REEL' : 'POST',
            carouselItems: carouselChildren || undefined,
            permalink: igItem.permalink || '',
            platforms: ['instagram'],
            status: 'published',
            scheduledAt: igItem.timestamp || nowIso,
            publishedAt: igItem.timestamp || nowIso,
            metrics: nextMetrics,
            logs: [{ time: nowIso, message: 'Sincronizado en vivo desde Instagram Graph API.' }]
          });
        }
        syncedCount++;
      });

      // 4. Optional enrichment for Facebook-only published posts
      const fbToken = cfg.fbPageAccessToken || token;
      const fbOnlyPosts = appState.posts
        .filter((p) => p.status === 'published' && p.fbPublishId && !p.igPublishId)
        .slice(0, 8);
      if (fbToken && fbOnlyPosts.length) {
        await Promise.all(
          fbOnlyPosts.map(async (fp) => {
            const fbM = await fetchFacebookPostMetricsSafe(fp.fbPublishId, fbToken);
            if (fbM) {
              fp.metrics = {
                ...(fp.metrics || {}),
                reach: fbM.reach || fp.metrics?.reach || 0,
                likes: fbM.likes,
                comments: fbM.comments,
                shares: fbM.shares,
                saves: fp.metrics?.saves || 0,
                source: 'meta_live',
                syncedAt: nowIso
              };
            }
          })
        );
      }

      appState.metricsMeta = {
        source: 'meta_live',
        updatedAt: nowIso,
        syncedMediaCount: syncedCount,
        dailyReach: dailyReachSeries,
        accountViews7d,
        insightsPermissionDenied,
        insightsWarning: insightsWarning || '',
        error: ''
      };

      renderAll();
      await saveStateEverywhere(false);
      if (!silent) {
        if (insightsPermissionDenied) {
          showToast(
            `✅ ${syncedCount} publicaciones y likes/comentarios sincronizados. Nota: falta permiso "instagram_manage_insights" para alcance/guardados.`
          );
        } else {
          showToast(
            `✅ Métricas reales actualizadas (${syncedCount} publicaciones • ${(appState.metaConfig.followersCount ?? 0).toLocaleString('es-ES')} seguidores).`
          );
        }
      }
    } else {
      // Simulate updated insights for local/demo preview when no Meta credentials configured
      appState.posts
        .filter((p) => p.status === 'published')
        .forEach((p) => {
          const m = p.metrics || { reach: 800, likes: 60, comments: 8, saves: 15 };
          p.metrics = {
            ...m,
            reach: (m.reach || 0) + Math.floor(Math.random() * 140 + 30),
            likes: (m.likes || 0) + Math.floor(Math.random() * 18 + 3),
            comments: (m.comments || 0) + Math.floor(Math.random() * 5 + 1),
            saves: (m.saves || 0) + Math.floor(Math.random() * 8 + 1),
            source: 'demo',
            syncedAt: nowIso
          };
        });
      appState.metricsMeta = {
        source: 'demo',
        updatedAt: nowIso,
        error: ''
      };
      renderAll();
      await saveStateEverywhere(false);
      if (!silent) {
        showToast('📊 Métricas demo actualizadas (conecta tu Token en Paso a Paso Meta para datos reales)');
      }
    }
  } catch (err) {
    appState.metricsMeta = {
      ...(appState.metricsMeta || {}),
      source: 'error',
      error: err.message,
      lastAttemptAt: new Date().toISOString()
    };
    renderMetricsDashboard();
    if (!silent) showToast(`❌ Error sincronizando métricas: ${err.message}`);
  } finally {
    isSyncingMetrics = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = '🔄 Actualizar Métricas en Vivo';
    }
  }
}

function renderMetricsDashboard() {
  const tableBody = document.getElementById('metricsTableBody');
  const chartContainer = document.getElementById('weeklyReachChart');
  const breakdownContainer = document.getElementById('formatBreakdownContainer');
  const syncMetaEl = document.getElementById('metricsSyncMeta');
  const alertBannerEl = document.getElementById('metricsAlertBanner');
  if (!tableBody) return;

  const metaInfo = appState.metricsMeta || {};
  const hasToken = Boolean((appState.metaConfig?.accessToken || '').trim() && (appState.metaConfig?.igUserId || '').trim());

  if (syncMetaEl) {
    if (metaInfo.source === 'error' && metaInfo.error) {
      syncMetaEl.innerHTML = `🔴 <strong>Error de sincronización:</strong> ${escapeHtml(metaInfo.error)}`;
    } else if (metaInfo.source === 'meta_live' && metaInfo.updatedAt) {
      const updatedLabel = new Date(metaInfo.updatedAt).toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'medium'
      });
      syncMetaEl.innerHTML = `🟢 <strong>En vivo desde Meta API v22.0</strong> • Última actualización: <b>${updatedLabel}</b> (${metaInfo.syncedMediaCount || 0} medios)`;
    } else if (hasToken) {
      syncMetaEl.innerHTML = `🟡 Listo para sincronizar con <b>@${escapeHtml((appState.metaConfig?.igUsername || 'Instagram').replace(/^@/, ''))}</b>`;
    } else {
      syncMetaEl.innerHTML = `⚪ Modo Demo (sin Token de Meta conectado en "Paso a Paso Meta")`;
    }
  }

  if (alertBannerEl) {
    if (metaInfo.source === 'error' && metaInfo.error) {
      alertBannerEl.className = 'metrics-alert-banner error';
      alertBannerEl.innerHTML = `⚠️ <strong>No se pudieron actualizar las métricas en vivo:</strong> ${escapeHtml(
        metaInfo.error
      )} <button type="button" class="btn-outline btn-sm" style="margin-left:8px;" onclick="switchTab('meta-wizard')">Ir a Paso a Paso Meta →</button>`;
    } else if (metaInfo.insightsPermissionDenied || metaInfo.insightsWarning) {
      alertBannerEl.className = 'metrics-alert-banner';
      alertBannerEl.innerHTML = `ℹ️ <strong>Seguidores, Likes y Comentarios actualizados en vivo.</strong> Para que Meta también entregue <em>Alcance diario</em> y <em>Guardados</em>, asegúrate de marcar el permiso <code>instagram_manage_insights</code> al generar tu Token en Graph API Explorer. <span style="opacity:0.8;">(${escapeHtml(
        metaInfo.insightsWarning || ''
      )})</span>`;
    } else {
      alertBannerEl.className = 'metrics-alert-banner hidden';
      alertBannerEl.innerHTML = '';
    }
  }

  const followers = appState.metaConfig?.followersCount ?? 0;

  // Aggregate real KPI metrics from published or meta_live-synced posts
  const metricEligiblePosts = appState.posts.filter(
    (p) => p.status === 'published' || p.metrics?.source === 'meta_live'
  );

  let totalPostReach = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalSaves = 0;
  let totalShares = 0;

  let postReach = 0, postCount = 0;
  let carouselReach = 0, carouselCount = 0;
  let storyReach = 0, storyCount = 0;
  let reelReach = 0, reelCount = 0;

  metricEligiblePosts.forEach((p) => {
    const m = p.metrics || {};
    const r = Number(m.reach) || 0;
    const v = Number(m.views) || r;
    totalPostReach += r;
    totalLikes += Number(m.likes) || 0;
    totalComments += Number(m.comments) || 0;
    totalSaves += Number(m.saves) || 0;
    totalShares += Number(m.shares) || 0;

    if (isPostCarousel(p)) {
      carouselReach += r || v;
      carouselCount++;
    } else if (isPostStory(p)) {
      storyReach += r || v;
      storyCount++;
    } else if (p.postFormat === 'REEL' || p.mediaType === 'REELS') {
      reelReach += r || v;
      reelCount++;
    } else {
      postReach += r || v;
      postCount++;
    }
  });

  // If account-level 7-day reach exists and exceeds per-post reach sum (e.g. missing older posts or story decay), reflect truthfully
  const dailySeries = Array.isArray(metaInfo.dailyReach) ? metaInfo.dailyReach : null;
  const dailyReachSum = dailySeries ? dailySeries.reduce((acc, d) => acc + (d.reach || 0), 0) : 0;
  const displayTotalReach = totalPostReach > 0 ? totalPostReach : dailyReachSum;

  const totalInteractions = totalLikes + totalComments + totalSaves + totalShares;
  const erNum = displayTotalReach > 0 ? (totalInteractions / displayTotalReach) * 100 : 0;
  const erPct = erNum.toFixed(1);

  document.getElementById('kpiFollowersVal').textContent = Number(followers).toLocaleString('es-ES');
  document.getElementById('kpiReachVal').textContent = displayTotalReach.toLocaleString('es-ES');
  document.getElementById('kpiInteractionsVal').textContent = totalInteractions.toLocaleString('es-ES');
  document.getElementById('kpiErVal').textContent = `${erPct}%`;

  const setTrendBadge = (id, text, cls = 'neutral') => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = `kpi-trend ${cls}`;
  };

  setTrendBadge(
    'kpiFollowersTrend',
    appState.metaConfig?.igUsername ? `@${appState.metaConfig.igUsername.replace(/^@/, '')}` : 'Meta IG',
    metaInfo.source === 'meta_live' ? 'up' : 'neutral'
  );

  if (dailySeries && dailySeries.length >= 4) {
    const mid = Math.floor(dailySeries.length / 2);
    const prevHalf = dailySeries.slice(0, mid).reduce((s, d) => s + (d.reach || 0), 0);
    const recentHalf = dailySeries.slice(mid).reduce((s, d) => s + (d.reach || 0), 0);
    if (prevHalf > 0) {
      const pctDiff = Math.round(((recentHalf - prevHalf) / prevHalf) * 100);
      setTrendBadge('kpiReachTrend', `${pctDiff >= 0 ? '+' : ''}${pctDiff}% 7d`, pctDiff >= 0 ? 'up' : 'down');
    } else {
      setTrendBadge('kpiReachTrend', `${dailyReachSum.toLocaleString('es-ES')} (7d)`, 'up');
    }
  } else {
    setTrendBadge(
      'kpiReachTrend',
      `${metricEligiblePosts.length} pub.`,
      displayTotalReach > 0 ? 'up' : 'neutral'
    );
  }

  setTrendBadge(
    'kpiEngagementTrend',
    `${totalLikes}❤️ ${totalComments}💬`,
    totalInteractions > 0 ? 'up' : 'neutral'
  );
  setTrendBadge(
    'kpiErTrend',
    erNum >= 5 ? 'Excelente' : erNum >= 2 ? 'Saludable' : displayTotalReach > 0 ? 'En crecimiento' : 'Sin alcance',
    erNum >= 2 ? 'up' : 'neutral'
  );

  const mockFollowers = document.getElementById('igMockFollowersCount');
  if (mockFollowers) {
    mockFollowers.textContent = followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : String(followers);
  }

  // Render Dynamic 7-Day Bar Chart (Real Instagram Insights time_series OR bucketed last 7 days from published posts)
  const chartSourceBadge = document.getElementById('weeklyChartSourceBadge');
  if (chartContainer) {
    let chartDays = [];
    if (dailySeries && dailySeries.length > 0) {
      chartDays = dailySeries.map((d) => ({
        label: d.label,
        primary: d.reach || 0,
        secondary: 0
      }));
      if (chartSourceBadge) chartSourceBadge.textContent = 'Instagram Insights Real (7d)';
    } else {
      const weekdayFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
      for (let offset = 6; offset >= 0; offset--) {
        const dt = new Date(Date.now() - offset * 86400 * 1000);
        const dayStr = dt.toDateString();
        const rawLabel = weekdayFmt.format(dt).replace('.', '');
        const label = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1, 3);
        let primary = 0;
        let secondary = 0;
        metricEligiblePosts.forEach((p) => {
          const pDate = new Date(p.publishedAt || p.scheduledAt || p.createdAt);
          if (pDate.toDateString() === dayStr) {
            const val = p.metrics?.reach || (p.metrics?.likes || 0) * 10;
            if (isPostStory(p)) secondary += val;
            else primary += val;
          }
        });
        chartDays.push({ label, primary, secondary });
      }
      if (chartSourceBadge) {
        chartSourceBadge.textContent = metaInfo.source === 'meta_live' ? 'Posts Publicados (7d)' : 'Actividad 7 días';
      }
    }

    const maxDay = Math.max(...chartDays.map((d) => d.primary + d.secondary), 1);
    chartContainer.innerHTML = chartDays
      .map((d) => {
        const total = d.primary + d.secondary;
        const pH = total > 0 ? Math.max(Math.round((d.primary / maxDay) * 135), d.primary > 0 ? 8 : 0) : 0;
        const sH = total > 0 ? Math.max(Math.round((d.secondary / maxDay) * 135), d.secondary > 0 ? 8 : 0) : 0;
        const fmtVal = total >= 1000 ? `${(total / 1000).toFixed(1)}k` : String(total);
        return `
          <div class="chart-col">
            <span class="chart-val">${fmtVal}</span>
            <div class="chart-bar-wrap" title="Feed/Reels/Carrusel: ${d.primary} • Historias: ${d.secondary}">
              <div class="chart-bar-story" style="height:${sH}px;"></div>
              <div class="chart-bar-post" style="height:${pH}px;"></div>
            </div>
            <span class="chart-day">${d.label}</span>
          </div>
        `;
      })
      .join('');
  }

  // Render Real Format Breakdown (Post vs Carousel vs Story vs Reel)
  if (breakdownContainer) {
    const combinedFormatReach = postReach + carouselReach + storyReach + reelReach;
    const safeTotal = Math.max(combinedFormatReach, 1);
    const pct = (val) => (combinedFormatReach > 0 ? Math.round((val / safeTotal) * 100) : 0);

    breakdownContainer.innerHTML = `
      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>📸 <strong>Posts de Feed</strong> (${postCount} publicados)</span>
          <strong>${postReach.toLocaleString('es-ES')} alcance (${pct(postReach)}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct(postReach)}%;background:linear-gradient(90deg,#6366f1,#818cf8);"></div>
        </div>
      </div>

      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>🎠 <strong>Carruseles</strong> (${carouselCount} publicados)</span>
          <strong>${carouselReach.toLocaleString('es-ES')} alcance (${pct(carouselReach)}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct(carouselReach)}%;background:linear-gradient(90deg,#06b6d4,#38bdf8);"></div>
        </div>
      </div>

      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>⭕ <strong>Historias 24h (Stories)</strong> (${storyCount} activas)</span>
          <strong>${storyReach.toLocaleString('es-ES')} vistas (${pct(storyReach)}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct(storyReach)}%;background:linear-gradient(90deg,#f59e0b,#ec4899);"></div>
        </div>
      </div>

      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>🎬 <strong>Reels Verticales</strong> (${reelCount} videos)</span>
          <strong>${reelReach.toLocaleString('es-ES')} alcance (${pct(reelReach)}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct(reelReach)}%;background:linear-gradient(90deg,#10b981,#34d399);"></div>
        </div>
      </div>
    `;
  }

  // Compute Best Performing Hours / Days from Published Posts
  const bestTimesEl = document.getElementById('bestTimesChips');
  if (bestTimesEl) {
    const scored = metricEligiblePosts
      .map((p) => {
        const dt = new Date(p.publishedAt || p.scheduledAt || p.createdAt);
        const m = p.metrics || {};
        const score = (m.reach || 0) + ((m.likes || 0) + (m.comments || 0) + (m.saves || 0)) * 12;
        return { p, dt, score };
      })
      .filter((x) => !Number.isNaN(x.dt.getTime()) && x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const seenSlots = new Set();
      const chips = [];
      const dayFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
      for (const item of scored) {
        const dStr = dayFmt.format(item.dt).replace('.', '');
        const hStr = item.dt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const slotKey = `${dStr}-${item.dt.getHours()}`;
        if (seenSlots.has(slotKey)) continue;
        seenSlots.add(slotKey);
        const icon = isPostCarousel(item.p) ? '🎠' : isPostStory(item.p) ? '⭕' : item.p.postFormat === 'REEL' ? '🎬' : '🔥';
        chips.push(`<span class="time-chip">${icon} ${dStr} • ${hStr} hrs (${item.p.metrics?.likes || 0}❤️)</span>`);
        if (chips.length >= 3) break;
      }
      bestTimesEl.innerHTML = chips.join('');
    } else {
      bestTimesEl.innerHTML = `<span class="time-chip">📊 Publica o sincroniza más posts para detectar tus mejores horas automáticamente</span>`;
    }
  }

  // Render Metrics Table (Published first, ordered newest -> oldest)
  const filteredPosts = [...appState.posts]
    .filter((p) => {
      if (currentMetricsFilter === 'all') return true;
      if (currentMetricsFilter === 'CAROUSEL') return isPostCarousel(p);
      if (currentMetricsFilter === 'STORY') return isPostStory(p);
      return !isPostStory(p) && !isPostCarousel(p);
    })
    .sort((a, b) => {
      const aPub = a.status === 'published' ? 1 : 0;
      const bPub = b.status === 'published' ? 1 : 0;
      if (aPub !== bPub) return bPub - aPub;
      return new Date(b.publishedAt || b.scheduledAt || b.createdAt || 0) - new Date(a.publishedAt || a.scheduledAt || a.createdAt || 0);
    });

  if (!filteredPosts.length) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:18px;">No hay publicaciones en este filtro.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filteredPosts
    .map((p) => {
      const m = p.metrics || {};
      const isPub = p.status === 'published' || m.source === 'meta_live';
      const reachVal = isPub ? Number(m.reach) || 0 : 0;
      const likesVal = isPub ? Number(m.likes) || 0 : 0;
      const commentsVal = isPub ? Number(m.comments) || 0 : 0;
      const savesVal = isPub ? Number(m.saves) || 0 : 0;
      const sharesVal = isPub ? Number(m.shares) || 0 : 0;
      const interactions = likesVal + commentsVal + savesVal + sharesVal;
      const itemEr = reachVal > 0 ? ((interactions / reachVal) * 100).toFixed(1) : '0.0';
      const statusText = p.status === 'published' ? 'Publicado' : p.status === 'draft' ? 'Borrador' : 'Programado';
      const liveBadge = m.source === 'meta_live' ? ' • Live' : '';
      const thumbUrl = getPostThumbnailUrl(p);

      return `
        <tr>
          <td data-label="Publicación">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;">
              <img src="${escapeHtml(thumbUrl)}" referrerpolicy="no-referrer" onerror="this.src='./logo.png'" style="width:38px;height:38px;border-radius:6px;object-fit:cover;flex-shrink:0;" />
              <div style="min-width:0;flex:1;overflow-wrap:anywhere;">
                <strong>${escapeHtml(p.title)}</strong>
                <div style="font-size:0.72rem;color:var(--text-muted);">${new Date(p.publishedAt || p.scheduledAt || p.createdAt).toLocaleDateString('es-ES')}${liveBadge}</div>
              </div>
            </div>
          </td>
          <td data-label="Formato">${getPostFormatBadge(p)}</td>
          <td data-label="Estado"><span class="status-badge ${p.status}">${statusText}</span></td>
          <td data-label="👁️ Alcance"><strong>${isPub ? reachVal.toLocaleString('es-ES') : '—'}</strong></td>
          <td data-label="❤️ Likes">❤️ ${isPub ? likesVal.toLocaleString('es-ES') : '—'}</td>
          <td data-label="💬 Comentarios">💬 ${isPub ? commentsVal.toLocaleString('es-ES') : '—'}</td>
          <td data-label="🔖 Guardados">🔖 ${isPub ? savesVal.toLocaleString('es-ES') : '—'}${sharesVal > 0 ? ` <small style="color:var(--text-muted);">(+${sharesVal} comp.)</small>` : ''}</td>
          <td data-label="🔥 Engagement"><span class="kpi-trend ${interactions > 0 ? 'up' : 'neutral'}">${isPub ? `${itemEr}%` : '—'}</span></td>
        </tr>
      `;
    })
    .join('');
}

// ==========================================
// MEDIA LIBRARY (WORKS LOCAL & SERVERLESS CLOUD)
// ==========================================
function compressImageToDataUrl(file, maxWidth = 800, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function initMediaUploadEvents() {
  const formFile = document.getElementById('formUploadFile');
  formFile.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('inputFile');
    if (!fileInput.files.length) return;
    const file = fileInput.files[0];
    const title = document.getElementById('inputFileTitle').value.trim() || file.name;
    const publicUrl = document.getElementById('inputFilePublicUrl').value.trim();
    const tags = (document.getElementById('inputFileTags').value || 'subido')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const ext = (file.name.split('.').pop() || 'JPG').toUpperCase();

    let mediaUrl = publicUrl;
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', title);
      fd.append('publicUrl', publicUrl);
      fd.append('tags', tags.join(','));
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const uploaded = await res.json();
        mediaUrl = uploaded.url;
      } else {
        throw new Error('Serverless mode');
      }
    } catch (_) {
      if (!mediaUrl && file.type.startsWith('image/')) {
        mediaUrl = await compressImageToDataUrl(file);
      }
    }

    const newMedia = {
      id: `media-${Date.now()}`,
      title,
      url: mediaUrl || './logo.png',
      publicUrl: publicUrl || '',
      type: file.type.startsWith('video/') ? 'video' : 'image',
      format: ext,
      tags,
      createdAt: new Date().toISOString()
    };

    appState.mediaLibrary.unshift(newMedia);
    formFile.reset();
    renderAll();
    await saveStateEverywhere(true);
    showToast('🖼️ Archivo guardado y sincronizado en SHEEP 100');
  });

  const formUrl = document.getElementById('formAddUrl');
  formUrl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawUrl = document.getElementById('inputMediaUrl').value.trim();
    const title = document.getElementById('inputMediaTitle').value.trim();
    const type = document.getElementById('inputMediaType').value;
    const tags = (document.getElementById('inputMediaTags').value || 'url-publica')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const norm = normalizeCloudMedia(rawUrl, type);

    const newMedia = {
      id: `media-${Date.now()}`,
      title,
      originalUrl: rawUrl,
      driveId: norm.driveId || null,
      url: norm.thumbUrl,
      publicUrl: norm.publicUrl,
      type,
      format: type === 'video' ? 'MP4' : 'JPG',
      tags: norm.isDrive && !tags.includes('google-drive') ? [...tags, 'google-drive'] : tags,
      createdAt: new Date().toISOString()
    };

    appState.mediaLibrary.unshift(newMedia);
    formUrl.reset();
    renderAll();
    await saveStateEverywhere(true);
    showToast(
      norm.isDrive
        ? '✅ Archivo de Google Drive convertido automáticamente a enlace directo y guardado'
        : '🌐 Recurso con URL pública guardado en la nube'
    );
  });

  document.getElementById('mediaSearchInput').addEventListener('input', renderMediaGallery);
}

function renderMediaGallery() {
  const grid = document.getElementById('mediaGalleryGrid');
  const countLabel = document.getElementById('mediaCountLabel');
  if (!grid) return;

  const query = (document.getElementById('mediaSearchInput')?.value || '').toLowerCase();
  const items = appState.mediaLibrary.filter(
    (m) =>
      m.title.toLowerCase().includes(query) ||
      (m.tags || []).some((t) => t.toLowerCase().includes(query))
  );

  countLabel.textContent = items.length;

  grid.innerHTML = items
    .map((m) => {
      const norm = normalizeCloudMedia(m.originalUrl || m.url || m.publicUrl || '', m.type);
      const displayThumb = norm.thumbUrl || m.url || './logo.png';
      const isDirectVideoFile =
        m.type === 'video' && !norm.isDrive && /\.(mp4|webm|mov)(\?|$)/i.test(displayThumb);

      const mediaPreviewHtml = isDirectVideoFile
        ? `<video src="${escapeHtml(displayThumb)}" class="media-card-thumb" muted playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()"></video>`
        : `<img src="${escapeHtml(displayThumb)}" class="media-card-thumb" referrerpolicy="no-referrer" alt="${escapeHtml(m.title)}" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${norm.driveId ? `https://drive.google.com/thumbnail?id=${norm.driveId}&sz=w1000` : './logo.png'}';}else{this.src='./logo.png';}" />`;

      return `
      <div class="media-card">
        ${mediaPreviewHtml}
        <div class="media-card-body">
          <strong>${escapeHtml(m.title)}</strong>
          <div style="font-size:0.72rem;color:var(--text-muted);">
            Formato: <b>${m.format}</b> • ${norm.isDrive ? '📁 Google Drive Directo' : m.publicUrl ? '🌐 URL Pública' : '☁️ En Nube'}
          </div>
          <div class="media-card-actions" style="display:flex;gap:5px;margin-top:6px;flex-wrap:wrap;">
            <button class="btn-primary btn-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'POST' })" title="Publicar solo en el Feed">
              📸 Post
            </button>
            <button class="btn-secondary btn-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'CAROUSEL' })" title="Iniciar Carrusel de varias fotos/videos">
              🎠 Carrusel
            </button>
            <button class="btn-story-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'STORY' })" title="Publicar exclusivamente en Historia 24h">
              ⭕ Historia
            </button>
            <button class="btn-secondary btn-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'REEL' })" title="Publicar exclusivamente en Reels">
              🎬 Reel
            </button>
            <button class="btn-story-sm" style="flex:1;background:linear-gradient(135deg,#ec4899,#8b5cf6);" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'BOTH' })" title="Publicar en Historia 24h y en Reel/Post">
              🔥 Ambos
            </button>
            <button class="btn-outline btn-sm" onclick="deleteMediaItem('${m.id}')">🗑️</button>
          </div>
        </div>
      </div>
    `;
    })
    .join('');
}

window.deleteMediaItem = async function (id) {
  appState.mediaLibrary = appState.mediaLibrary.filter((m) => m.id !== id);
  renderAll();
  await saveStateEverywhere(true);
  showToast('🗑️ Recurso eliminado');
};

// ==========================================
// AI STUDIO (COPIES & STORIES SCRIPTS)
// ==========================================
let aiGenerationCounter = 0;

function renderAiGeminiStatus() {
  const key = (appState.metaConfig?.geminiApiKey || '').trim();
  const statusEl = document.getElementById('aiGeminiStatusText');
  const pillBtn = document.getElementById('btnToggleAiKeyBox');
  const quickInput = document.getElementById('aiQuickGeminiKey');

  if (statusEl) {
    statusEl.textContent = key ? '🟢 Gemini 2.5 Flash Activo' : '⚡ Motor Local · Conectar Gemini';
  }
  if (pillBtn) {
    pillBtn.classList.toggle('connected', Boolean(key));
  }
  if (quickInput && document.activeElement !== quickInput) {
    quickInput.value = key;
  }
}

function buildDynamicHashtagsForTopic(topic, seed = 0) {
  const stopWords = new Set([
    'para', 'como', 'sobre', 'nuestra', 'nuestro', 'nuestros', 'nuestras', 'todo', 'toda',
    'todos', 'esta', 'este', 'estos', 'estas', 'con', 'por', 'una', 'unos', 'unas', 'desde', 'hasta'
  ]);
  const words = String(topic || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !stopWords.has(w));

  const topicTags = [...new Set(words)].slice(0, 4).map((w) => `#${w}`);
  const pool = [
    '#marketingdigital', '#contenidoquevende', '#redessociales', '#estrategiadigital',
    '#creadoresdecontenido', '#marcapersonal', '#emprendedores', '#negociosonline',
    '#instagrowth', '#ideasdecontenido', '#communitymanager', '#copywriting'
  ];
  const rotatedPool = [];
  for (let i = 0; i < 6; i++) {
    rotatedPool.push(pool[(seed * 3 + i) % pool.length]);
  }
  return [...new Set([...topicTags, ...rotatedPool, '#sheep100'])].join(' ');
}

function buildSmartVariedAiOptions({ topic, platform, tone, cta, emojiStyle = 'rich', seed = 0, previousTitles = [] }) {
  const isCarousel = /carrusel|slide/i.test(platform);
  const isStory = /historia|story|stories/i.test(platform);
  const isVideo = /reel|tiktok/i.test(platform);
  const rich = emojiStyle !== 'minimal';
  const e = (r, m = '') => (rich ? r : m);
  const hashtags = buildDynamicHashtagsForTopic(topic, seed);

  const toneHookMap = {
    'Cercano y Magnético': [
      `Hablemos claro sobre ${topic} ${e('✨💬')}`,
      `Esto te va a ahorrar horas con ${topic} ${e('🙌💡')}`,
      `¿Te pasa esto cuando trabajas en ${topic}? ${e('👀👇')}`
    ],
    'Profesional y Experto': [
      `3 criterios clave para dominar ${topic} ${e('📊✅')}`,
      `Lo que separa un resultado promedio de uno sólido en ${topic} ${e('🎯')}`,
      `Guía práctica sobre ${topic} que conviene guardar ${e('📌')}`
    ],
    'Venta Directa y Urgencia': [
      `Último aviso sobre ${topic} ${e('🔥⏰')}`,
      `No dejes pasar esta oportunidad en ${topic} ${e('🚀💥')}`,
      `Disponible por tiempo limitado: ${topic} ${e('🏷️⚡')}`
    ],
    'Viral y Dinámico': [
      `Nadie te cuenta esta parte de ${topic}… ${e('🤯🔥')}`,
      `Guarda esto antes de seguir deslizando ${e('📌⚡')}`,
      `Probamos un enfoque distinto en ${topic} y mira lo que pasó ${e('👀🚀')}`
    ]
  };
  const hooks = toneHookMap[tone] || toneHookMap['Cercano y Magnético'];
  const pickHook = (offset) => hooks[(seed + offset) % hooks.length];

  const allCandidates = [];

  if (isCarousel) {
    allCandidates.push(
      {
        angleKey: 'carousel_steps',
        title: `Carrusel Paso a Paso (${tone})`,
        caption: `${pickHook(0)}\n\nDesliza para ver el método completo 👉\n\n[SLIDE 1 - PORTADA]: El mapa rápido sobre ${topic}\n[SLIDE 2]: El error más común que frena tus resultados\n[SLIDE 3]: Qué cambiar hoy mismo paso a paso\n[SLIDE 4]: Ejemplo práctico aplicado\n[SLIDE 5 - CIERRE]: ${cta}\n\n${hashtags}`,
        firstComment: `¿En qué slide te quedaste pensando? Cuéntanos abajo 👇`
      },
      {
        angleKey: 'carousel_myths',
        title: `Carrusel Mito vs. Realidad`,
        caption: `Dejemos de repetir mitos sobre ${topic} ${e('🚫✅')}\n\n[SLIDE 1]: Lo que todos creen vs. lo que funciona hoy\n[SLIDE 2]: ❌ Mito: "Necesitas complicarlo todo" → ✅ Realidad: simplicidad + constancia\n[SLIDE 3]: ❌ Mito: "No se puede medir rápido" → ✅ Realidad: datos claros cada semana\n[SLIDE 4]: Tu siguiente paso concreto\n\n💡 ${cta}\n\n${hashtags}`,
        firstComment: `Guarda este carrusel para volver a consultarlo cuando publiques 📌`
      },
      {
        angleKey: 'carousel_checklist',
        title: `Carrusel Checklist Accionable`,
        caption: `Checklist listo para aplicar hoy en ${topic} ${e('📋✨')}\n\n[SLIDE 1]: 4 puntos que revisamos antes de lanzar\n[SLIDE 2]: ✔️ Objetivo y audiencia bien definidos\n[SLIDE 3]: ✔️ Mensaje claro en los primeros 3 segundos\n[SLIDE 4]: ✔️ Llamado a la acción directo: ${cta}\n\n${hashtags}`,
        firstComment: `Comparte esto con alguien del equipo que necesite este checklist 🤝`
      }
    );
  }

  if (isStory) {
    allCandidates.push(
      {
        angleKey: 'story_poll',
        title: `Secuencia 3 Historias (Gancho + Encuesta)`,
        caption: `[HISTORIA 1 - GANCHO]:\n"${pickHook(1)}"\n\n[HISTORIA 2 - VALOR EN 10 SEG]:\nMuestra en foto o video corto cómo resolvemos ${topic} paso a paso ${e('✨')}\n\n[HISTORIA 3 - STICKER + CTA]:\nSticker Encuesta: "¿Lo aplicamos juntos? [¡SÍ, QUIERO! / CUÉNTAME MÁS]"\nTexto: ${cta}`,
        firstComment: `Tip Historia: Agrega sticker de respuesta rápida o enlace en la Historia 3.`
      },
      {
        angleKey: 'story_behind',
        title: `Historias Detrás de Cámaras + Prueba`,
        caption: `[HISTORIA 1 - REALIDAD]:\nFoto natural preparando ${topic} — "Así se ve por dentro hoy ${e('👀')}"\n\n[HISTORIA 2 - BENEFICIO]:\n"Lo mejor: sin vueltas ni perder horas"\n\n[HISTORIA 3 - ACCIÓN]:\nCaja de Preguntas o DM directo: "${cta}"`,
        firstComment: `Usa menciones o sticker de ubicación en Historia 1 para subir el alcance.`
      }
    );
  }

  if (isVideo) {
    allCandidates.push(
      {
        angleKey: 'video_hook',
        title: `Guion Reel/TikTok (Hook 3s + Ritmo Rápido)`,
        caption: `[HOOK 0-3s EN PANTALLA]: "Si todavía haces ${topic} así, mira esto ${e('✋⚡')}"\n[DESARROLLO 3-18s]: Explica 2 ajustes concretos mientras muestras pantalla o producto.\n[CIERRE 18-25s]: "${cta}"\n\n--- COPY DESCRIPCIÓN ---\n${pickHook(2)} ${cta}\n\n${hashtags}`,
        firstComment: `¿Quieres que subamos la parte 2 sobre ${topic}? Comenta "PARTE 2" ${e('🎬')}`
      },
      {
        angleKey: 'video_list',
        title: `Video Corto 3 Claves Express`,
        caption: `[TEXTO EN PORTADA]: 3 cosas que cambiaron todo en ${topic} ${e('🚀')}\n[CLAVE 1]: Empieza por el resultado visual.\n[CLAVE 2]: Simplifica el mensaje.\n[CLAVE 3]: Repite lo que ya te dio alcance.\n\nCopy: ${cta}\n\n${hashtags}`,
        firstComment: `Guarda el video para tener las 3 claves a mano 📌`
      }
    );
  }

  // Angles válidos para cualquier formato (y variar aún más cuando regenere)
  allCandidates.push(
    {
      angleKey: 'aida_direct',
      title: `Fórmula AIDA (${tone})`,
      caption: `${pickHook(0)}\n\nEn lugar de perder tiempo probando al azar con ${topic}, concéntrate en lo que genera respuesta real hoy:\n\n${e('1️⃣ ', '• ')}Una promesa clara que conecte con tu cliente.\n${e('2️⃣ ', '• ')}Prueba o ejemplo visual imposible de ignorar.\n${e('3️⃣ ', '• ')}Un paso siguiente súper fácil.\n\n${e('👉 ')}${cta}\n\n${hashtags}`,
      firstComment: `¿Cuál de estos 3 puntos vas a aplicar primero en tu cuenta? Te leo 👇`
    },
    {
      angleKey: 'pas_problem',
      title: `Problema → Solución en ${topic}`,
      caption: `¿Sientes que le dedicas tiempo a ${topic} pero el alcance no acompaña? ${e('😮‍💨')}\n\nMuchas veces no falta esfuerzo: falta enfoque en los detalles que realmente hacen que la gente se detenga, guarde y responda.\n\nLa solución práctica para esta semana:\n${e('✅ ')}Simplifica la idea principal.\n${e('✅ ')}Cierra con una invitación directa.\n\n${e('💡 ')}${cta}\n\n${hashtags}`,
      firstComment: `Si este cambio te sirvió, envíaselo a alguien que esté trabajando en ${topic} 🔄`
    },
    {
      angleKey: 'storytelling_shift',
      title: `Storytelling & Aprendizaje Real`,
      caption: `Algo importante que aprendimos trabajando con ${topic} ${e('✍️✨')}:\n\nCuando dejábamos todo para última hora, el mensaje salía apurado. En cambio, al planificar con intención y medir qué funciona mejor, cada publicación empieza a sumar de verdad.\n\nMenos improvisación. Más claridad y conexión.\n\n${e('📌 ')}${cta}\n\n${hashtags}`,
      firstComment: `¿Prefieres planificar la semana completa o publicar día a día? Cuéntanos abajo 💬`
    },
    {
      angleKey: 'list_top3',
      title: `Lista Práctica: 3 Movidas Ganadoras`,
      caption: `${pickHook(1)}\n\nToma nota para tu próxima publicación sobre ${topic}:\n\n${e('🔹 ')}Gancho concreto en la primera línea (sin rodeos).\n${e('🔹 ')}Beneficio visible en segundos.\n${e('🔹 ')}Llamado a la acción único: ${cta}\n\nGuárdalo para usarlo hoy ${e('🔖')}\n\n${hashtags}`,
      firstComment: `🔥 Tip extra: responde los primeros comentarios en los primeros 30 minutos.`
    },
    {
      angleKey: 'contrarian',
      title: `Ángulo Disruptivo ("Lo que nadie te dice")`,
      caption: `${pickHook(2)}\n\nNo necesitas publicar todos los días sin rumbo para crecer con ${topic}. Necesitas piezas mejor pensadas, con ritmo, estética cuidada y un mensaje que invite a conversar.\n\nHaz la prueba con tu próximo contenido y mira cómo cambia la interacción ${e('📈')}\n\n${e('👉 ')}${cta}\n\n${hashtags}`,
      firstComment: `¿Estás de acuerdo o prefieres otro enfoque? Abramos debate 👇`
    }
  );

  // Filtrar ángulos que ya se mostraron en la tanda anterior para que al regenerar cambien de verdad
  const prevSet = new Set(previousTitles || []);
  let freshPool = allCandidates.filter((item) => !prevSet.has(item.title));
  if (freshPool.length < 3) {
    freshPool = [...allCandidates];
  }

  // Rotar según variationSeed
  const chosen = [];
  for (let i = 0; i < Math.min(3, freshPool.length); i++) {
    const idx = (seed + i) % freshPool.length;
    if (!chosen.includes(freshPool[idx])) {
      chosen.push(freshPool[idx]);
    }
  }
  while (chosen.length < 3 && chosen.length < allCandidates.length) {
    const extra = allCandidates.find((c) => !chosen.includes(c));
    if (!extra) break;
    chosen.push(extra);
  }

  return chosen.map((item, i) => ({
    title: `Propuesta ${i + 1}: ${item.title}`,
    rawTitle: item.title,
    caption: item.caption,
    firstComment: item.firstComment
  }));
}

async function callGeminiDirectForCopies({ apiKey, topic, platform, tone, cta, emojiStyle, variationSeed, previousProposals = [] }) {
  const avoidBlock =
    previousProposals.length > 0
      ? `\nPROPUESTAS ANTERIORES QUE DEBES EVITAR REPETIR (crea enfoques, estructuras y primeras líneas 100% diferentes):\n${previousProposals
          .map((p, i) => `- ${i + 1}: ${p.title} -> "${String(p.caption || '').slice(0, 90)}"`)
          .join('\n')}`
      : '';

  const emojiInstruction =
    emojiStyle === 'minimal'
      ? 'Usa muy pocos emojis (solo 1 o 2 sutiles en todo el texto).'
      : 'Incluye emojis estratégicos, naturales y bien distribuidos.';

  const prompt = `Eres un director creativo y copywriter experto para redes sociales en español.
Tema del usuario: "${topic}"
Formato destino: "${platform}" (adapta la estructura exactamente a este formato: por ejemplo si es Carrusel divide el copy o notas por [SLIDE 1]..[SLIDE 5]; si es Historias divide en [HISTORIA 1..3] + Sticker; si es Reel/TikTok incluye [HOOK 0-3s] + [GUION] + [COPY]; si es Post/Facebook redacta un copy completo listo para publicar).
Tono: "${tone}".
Llamado a la acción (CTA): "${cta}".
${emojiInstruction}
Semilla de variación creativa: #${variationSeed} (timestamp ${Date.now()}).
${avoidBlock}

Devuelve ÚNICAMENTE un JSON válido con exactamente 3 propuestas MUY distintas entre sí (distintos hooks, ángulos psicológicos y estructura):
{
  "options": [
    { "title": "Título corto descriptivo del enfoque", "caption": "Copy completo listo para usar con saltos de línea y hashtags relevantes al final", "firstComment": "Sugerencia de primer comentario o sticker" }
  ]
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
      apiKey
    )}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 1.05,
          topP: 0.95
        }
      })
    }
  );

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data?.error?.message || `Error Gemini HTTP ${res.status}`);
  }
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Gemini no devolvió texto en la respuesta.');
  }

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (_) {
    const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    parsed = JSON.parse(cleanJson);
  }

  if (!Array.isArray(parsed?.options) || parsed.options.length === 0) {
    throw new Error('La respuesta de Gemini no incluyó propuestas válidas.');
  }
  return parsed.options.slice(0, 3);
}

async function runAiGeneration({ regenerate = false } = {}) {
  const btn = document.getElementById('btnRunAi');
  const regenBtn = document.getElementById('btnRegenerateAi');
  const topicInput = document.getElementById('aiTopic');
  const topic = (topicInput?.value || '').trim();

  if (!topic) {
    showToast('⚠️ Escribe primero de qué trata tu Post o Historia.');
    topicInput?.focus();
    return;
  }

  const platform = document.getElementById('aiPlatform')?.value || 'Post de Instagram Feed';
  const tone = document.getElementById('aiTone')?.value || 'Cercano y Magnético';
  const cta =
    (document.getElementById('aiCta')?.value || '').trim() ||
    'Responde a esta publicación o historia para enviarte toda la info 👇';
  const emojiStyle = document.getElementById('aiEmojiStyle')?.value || 'rich';

  const previousProposals = Array.isArray(window._lastAiOptions) ? window._lastAiOptions : [];
  const previousTitles = previousProposals.map((p) => p.rawTitle || p.title || '');
  aiGenerationCounter += 1;
  const variationSeed = aiGenerationCounter + Math.floor(Math.random() * 100);

  if (btn) {
    btn.disabled = true;
    btn.textContent = regenerate ? '⏳ Regenerando otras 3 ideas...' : '⏳ Generando propuestas con IA...';
  }
  if (regenBtn) regenBtn.disabled = true;

  try {
    const geminiKey = (appState.metaConfig?.geminiApiKey || '').trim();
    let options = null;
    let source = 'local-varied';
    let fallbackReason = '';

    // 1. Llamar directamente a Google Gemini 2.5 Flash si hay API Key configurada
    if (geminiKey) {
      try {
        options = await callGeminiDirectForCopies({
          apiKey: geminiKey,
          topic,
          platform,
          tone,
          cta,
          emojiStyle,
          variationSeed,
          previousProposals
        });
        source = 'gemini';
      } catch (gemErr) {
        fallbackReason = gemErr.message || 'Error conectando con Gemini API';
      }
    }

    // 2. Respaldo en backend local (si corre en localhost:3000 y aún no obtuvimos respuesta de Gemini)
    if (!options && window.location.protocol.startsWith('http') && !window.location.hostname.includes('web.app')) {
      try {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            tone,
            platform,
            includeEmojis: emojiStyle !== 'minimal',
            callToAction: cta,
            variationSeed,
            previousTitles
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.options) && data.options.length > 0) {
            options = data.options;
            source = data.source || 'server-engine';
          }
        }
      } catch (_) {}
    }

    // 3. Motor Creativo Variado (cuando no hay Gemini Key o falló)
    if (!options) {
      options = buildSmartVariedAiOptions({
        topic,
        platform,
        tone,
        cta,
        emojiStyle,
        seed: aiGenerationCounter,
        previousTitles
      });
      source = 'local-varied';
    }

    renderAiOptions({ options, source, fallbackReason, variationNumber: aiGenerationCounter });
    if (window.innerWidth <= 960 || document.body.classList.contains('mobile-app-mode')) {
      document.querySelector('#tab-ai .ai-results-header')?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'start'
      });
    }
  } catch (err) {
    showToast(`❌ Error generando copy: ${err.message}`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✨ Generar 3 Propuestas + Hashtags';
    }
    if (regenBtn) regenBtn.disabled = false;
  }
}

function clearAiResults() {
  window._lastAiOptions = [];
  const container = document.getElementById('aiResultsContainer');
  document.getElementById('btnRegenerateAi')?.classList.add('hidden');
  document.getElementById('btnClearAiResults')?.classList.add('hidden');
  if (container) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Resultados limpiados 🧹. Ajusta tu idea o pulsa <strong>"Generar 3 Propuestas + Hashtags"</strong> para crear nuevas opciones.</p>
      </div>
    `;
  }
}

function initAiStudioEvents() {
  const formAi = document.getElementById('formAiGenerator');
  formAi?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await runAiGeneration({ regenerate: false });
  });

  document.getElementById('btnRegenerateAi')?.addEventListener('click', async () => {
    await runAiGeneration({ regenerate: true });
  });

  document.getElementById('btnClearAiResults')?.addEventListener('click', () => {
    clearAiResults();
    showToast('🧹 Propuestas generadas limpiadas');
  });

  document.getElementById('btnClearAiAll')?.addEventListener('click', () => {
    const topicEl = document.getElementById('aiTopic');
    const ctaEl = document.getElementById('aiCta');
    if (topicEl) topicEl.value = '';
    if (ctaEl) ctaEl.value = '';
    clearAiResults();
    topicEl?.focus();
    showToast('🧹 Estudio IA limpiado por completo');
  });

  document.getElementById('btnToggleAiKeyBox')?.addEventListener('click', () => {
    const box = document.getElementById('aiKeyConfigBox');
    box?.classList.toggle('hidden');
    renderAiGeminiStatus();
  });

  document.getElementById('btnSaveAiGeminiKey')?.addEventListener('click', async () => {
    const keyVal = (document.getElementById('aiQuickGeminiKey')?.value || '').trim();
    appState.metaConfig = {
      ...(appState.metaConfig || {}),
      geminiApiKey: keyVal
    };
    const cfgInput = document.getElementById('cfgGeminiKey');
    if (cfgInput) cfgInput.value = keyVal;
    renderAiGeminiStatus();
    document.getElementById('aiKeyConfigBox')?.classList.add('hidden');
    await saveStateEverywhere(false);
    showToast(keyVal ? '🤖 ¡Gemini API Key guardada! Ya puedes generar con IA real.' : '⚡ Gemini Key borrada (usando motor local variado).');
  });

  renderAiGeminiStatus();
}

function renderAiOptions(data) {
  const container = document.getElementById('aiResultsContainer');
  const options = data.options || [];
  const source = data.source || 'local-varied';
  const fallbackReason = data.fallbackReason || '';
  const variationNumber = data.variationNumber || 1;

  document.getElementById('btnRegenerateAi')?.classList.toggle('hidden', options.length === 0);
  document.getElementById('btnClearAiResults')?.classList.toggle('hidden', options.length === 0);

  let bannerHtml = '';
  if (source === 'gemini') {
    bannerHtml = `
      <div class="ai-source-banner gemini">
        <span>🤖 <strong>Generado en vivo con Gemini 2.5 Flash</strong> • Ronda #${variationNumber}</span>
        <span>Enfoques frescos aplicados</span>
      </div>
    `;
  } else if (fallbackReason) {
    bannerHtml = `
      <div class="ai-source-banner warn">
        <span>⚠️ <strong>Gemini devolvió error:</strong> ${escapeHtml(fallbackReason)} (usando Motor Creativo Variado #${variationNumber})</span>
        <button type="button" class="btn-outline btn-sm" onclick="document.getElementById('aiKeyConfigBox')?.classList.remove('hidden')">🔑 Revisar Key</button>
      </div>
    `;
  } else {
    bannerHtml = `
      <div class="ai-source-banner">
        <span>⚡ <strong>Motor Creativo Variado (sin Gemini API Key)</strong> • Ronda #${variationNumber}</span>
        <button type="button" class="btn-outline btn-sm" onclick="document.getElementById('aiKeyConfigBox')?.classList.remove('hidden')">🔑 Conectar Gemini Real</button>
      </div>
    `;
  }

  container.innerHTML =
    bannerHtml +
    options
      .map(
        (opt, idx) => `
      <div class="ai-option-card">
        <h4>${escapeHtml(opt.title || `Propuesta ${idx + 1}`)}</h4>
        <pre>${escapeHtml(opt.caption)}</pre>
        ${
          opt.firstComment
            ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px;overflow-wrap:anywhere;">💬 <em>Primer comentario / Sticker:</em> ${escapeHtml(opt.firstComment)}</div>`
            : ''
        }
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn-primary btn-sm" onclick="useAiCopyInComposer(${idx}, 'POST')">
            📸 Post
          </button>
          <button type="button" class="btn-secondary btn-sm" onclick="useAiCopyInComposer(${idx}, 'CAROUSEL')">
            🎠 Carrusel
          </button>
          <button type="button" class="btn-secondary btn-sm" onclick="useAiCopyInComposer(${idx}, 'REEL')">
            🎬 Reel
          </button>
          <button type="button" class="btn-story-sm" onclick="useAiCopyInComposer(${idx}, 'STORY')">
            ⭕ Historia
          </button>
          <button type="button" class="btn-outline btn-sm" onclick="copyAiOption(${idx})">
            📋 Copiar
          </button>
        </div>
      </div>
    `
      )
      .join('');

  window._lastAiOptions = options;
}

window.copyAiOption = async function (idx) {
  const opt = window._lastAiOptions?.[idx];
  if (!opt?.caption) return;
  await window.copyText(opt.caption);
};

window.useAiCopyInComposer = function (idx, format = 'POST') {
  const opt = window._lastAiOptions?.[idx];
  if (!opt) return;
  openComposerModal({
    defaultFormat: format,
    prefillTitle: opt.title,
    prefillCaption: opt.caption,
    prefillFirstComment: opt.firstComment || ''
  });
};

function renderHashtagGroups() {
  const container = document.getElementById('hashtagGroupsContainer');
  const composerPills = document.getElementById('composerHashtagPills');
  if (!container) return;

  container.innerHTML = (appState.hashtagGroups || [])
    .map(
      (g) => `
      <div class="hashtag-group-item">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
          <strong>${escapeHtml(g.name)}</strong>
          <button class="btn-outline btn-sm" onclick="copyText('${escapeHtml(g.tags)}')">Copiar #</button>
        </div>
        <div style="color:var(--text-muted);font-size:0.75rem;overflow-wrap:anywhere;">${escapeHtml(g.tags)}</div>
      </div>
    `
    )
    .join('');

  if (composerPills) {
    composerPills.innerHTML = (appState.hashtagGroups || [])
      .map(
        (g) => `
        <button type="button" class="btn-outline btn-sm" onclick="appendHashtagsToComposer('${escapeHtml(g.tags)}')">
          ＋ # ${escapeHtml(g.name)}
        </button>
      `
      )
      .join('');
  }
}

window.appendHashtagsToComposer = function (tags) {
  const area = document.getElementById('postCaption');
  area.value = `${area.value.trim()}\n\n${tags}`;
  area.dispatchEvent(new Event('input'));
};

// ==========================================
// PASO A PASO META WIZARD & LIVE API CONFIG
// ==========================================
function initMetaWizardEvents() {
  document.querySelectorAll('.wizard-checkbox').forEach((chk) => {
    chk.addEventListener('change', async () => {
      const stepKey = chk.dataset.step;
      appState.metaConfig = appState.metaConfig || {};
      appState.metaConfig.wizardSteps = {
        ...(appState.metaConfig.wizardSteps || {}),
        [stepKey]: chk.checked
      };
      renderAll();
      await saveStateEverywhere(false);
    });
  });

  document.getElementById('btnVerifyToken').addEventListener('click', async () => {
    const token = document.getElementById('cfgAccessToken').value.trim();
    const feedback = document.getElementById('tokenVerifyFeedback');
    feedback.classList.remove('hidden', 'ok', 'err');
    feedback.textContent = '⏳ Analizando Token en Meta Graph API (me/accounts + debug_token)...';

    if (!token) {
      feedback.classList.add('err');
      feedback.textContent = '❌ Pega primero tu Access Token generado en Graph API Explorer.';
      return;
    }

    try {
      let pageId = '';
      let pageName = '';
      let igAccount = null;
      let detectedAppId = '';

      // Método 1: Consultar /me/accounts (Páginas clásicas)
      const graphUrl = `https://graph.facebook.com/v22.0/me/accounts?fields=id,name,instagram_business_account{id,username,name,followers_count,media_count,profile_picture_url}&access_token=${encodeURIComponent(
        token
      )}`;
      const res = await fetch(graphUrl);
      const data = await res.json();

      if (!res.ok || data.error) {
        feedback.classList.add('err');
        feedback.textContent = `❌ Meta API respondió: ${
          data.error ? data.error.message : 'Token inválido'
        }`;
        return;
      }

      const pages = data.data || [];
      const pageWithIg = pages.find((p) => p.instagram_business_account);
      if (pageWithIg) {
        pageId = pageWithIg.id;
        pageName = pageWithIg.name;
        igAccount = pageWithIg.instagram_business_account;
      }

      // Método 2 (Clave para Meta Business Suite): Inspeccionar debug_token -> granular_scopes
      // Cuando la Página pertenece a un Portafolio Comercial, /me/accounts devuelve [], pero debug_token entrega los target_ids exactos
      if (!igAccount) {
        feedback.textContent = '🔍 Buscando permisos granulares en Meta Business Portfolio (debug_token)...';
        const dbgUrl = `https://graph.facebook.com/v22.0/debug_token?input_token=${encodeURIComponent(
          token
        )}&access_token=${encodeURIComponent(token)}`;
        const dbgRes = await fetch(dbgUrl);
        const dbgData = await dbgRes.json();
        const tokenInfo = dbgData?.data;

        if (tokenInfo) {
          if (tokenInfo.app_id) detectedAppId = String(tokenInfo.app_id);
          const gScopes = Array.isArray(tokenInfo.granular_scopes) ? tokenInfo.granular_scopes : [];
          const pageIds = [];
          const igIds = [];

          for (const gs of gScopes) {
            if (
              (gs.scope === 'pages_show_list' || gs.scope === 'pages_read_engagement') &&
              Array.isArray(gs.target_ids)
            ) {
              gs.target_ids.forEach((id) => {
                if (!pageIds.includes(id)) pageIds.push(id);
              });
            }
            if (gs.scope && gs.scope.startsWith('instagram_') && Array.isArray(gs.target_ids)) {
              gs.target_ids.forEach((id) => {
                if (!igIds.includes(id)) igIds.push(id);
              });
            }
          }

          // Consultar directamente cada Page ID autorizado en el token
          for (const pid of pageIds) {
            const pRes = await fetch(
              `https://graph.facebook.com/v22.0/${pid}?fields=id,name,instagram_business_account{id,username,name,followers_count,media_count,profile_picture_url}&access_token=${encodeURIComponent(
                token
              )}`
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

          // Consultar directamente cada Instagram Business ID autorizado en el token
          if (!igAccount && igIds.length > 0) {
            for (const iid of igIds) {
              const iRes = await fetch(
                `https://graph.facebook.com/v22.0/${iid}?fields=id,username,name,followers_count,follows_count,media_count,profile_picture_url,biography&access_token=${encodeURIComponent(
                  token
                )}`
              );
              const iData = await iRes.json();
              if (iRes.ok && !iData.error && iData.id) {
                igAccount = iData;
                break;
              }
            }
          }
        }
      }

      // Método 3: Consultar /me directo (si es un Token de Página)
      if (!igAccount) {
        try {
          const directRes = await fetch(
            `https://graph.facebook.com/v22.0/me?fields=id,name,instagram_business_account{id,username,name,followers_count}&access_token=${encodeURIComponent(
              token
            )}`
          );
          const directData = await directRes.json();
          if (directRes.ok && directData.instagram_business_account) {
            pageId = directData.id;
            pageName = directData.name || 'Página de Facebook';
            igAccount = directData.instagram_business_account;
          }
        } catch (_) {}
      }

      if (!igAccount) {
        feedback.classList.add('err');
        feedback.textContent =
          '⚠️ El Token es válido pero no tiene ninguna Página o cuenta de Instagram autorizada. Al hacer clic en "Generate Access Token", asegúrate de marcar tu Página y tu cuenta de Instagram.';
        return;
      }

      let finalUserToken = token;
      let isLongLived = false;
      const inputAppId = (document.getElementById('cfgAppId')?.value || detectedAppId || appState.metaConfig.appId || '').trim();
      const inputAppSecret = (document.getElementById('cfgAppSecret')?.value || appState.metaConfig.appSecret || '').trim();

      // Si el usuario ya colocó su App Secret, convertir automáticamente el token de 1h en Token de 60 Días
      if (inputAppId && inputAppSecret) {
        try {
          const exRes = await fetch(
            `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(
              inputAppId
            )}&client_secret=${encodeURIComponent(inputAppSecret)}&fb_exchange_token=${encodeURIComponent(token)}`
          );
          const exData = await exRes.json();
          if (exRes.ok && exData.access_token) {
            finalUserToken = exData.access_token;
            isLongLived = true;
          }
        } catch (_) {}
      }

      // Obtener y guardar también el Page Access Token de la Página de Facebook (Permanente si viene de token de 60 días)
      let savedPageToken = '';
      if (pageId) {
        try {
          const ptRes = await fetch(
            `https://graph.facebook.com/v22.0/${pageId}?fields=access_token&access_token=${encodeURIComponent(finalUserToken)}`
          );
          const ptData = await ptRes.json();
          if (ptRes.ok && ptData.access_token) {
            savedPageToken = ptData.access_token;
          }
        } catch (_) {}
      }

      appState.metaConfig.accessToken = finalUserToken;
      if (savedPageToken) appState.metaConfig.fbPageAccessToken = savedPageToken;
      if (inputAppId) appState.metaConfig.appId = inputAppId;
      if (inputAppSecret) appState.metaConfig.appSecret = inputAppSecret;
      appState.metaConfig.fbPageId = pageId;
      appState.metaConfig.fbPageName = pageName || 'Página Conectada';
      appState.metaConfig.igUserId = igAccount.id;
      appState.metaConfig.igUsername = igAccount.username || igAccount.name || '';
      if (igAccount.followers_count) appState.metaConfig.followersCount = igAccount.followers_count;
      appState.metaConfig.wizardSteps = {
        step1_devAccount: true,
        step2_igGraphApi: true,
        step3_testerRole: true,
        step4_linkFbPage: true,
        step5_accessToken: true
      };

      feedback.classList.add('ok');
      feedback.innerHTML = `✅ <strong>¡Conexión Exitosa!</strong> Página: <b>${escapeHtml(
        pageName || 'Cocuyo Grafic'
      )}</b> (ID: <code>${escapeHtml(pageId)}</code>) • Instagram Business: <b>@${escapeHtml(
        igAccount.username || igAccount.name
      )}</b> (ID: <code>${igAccount.id}</code> • <b>${
        igAccount.followers_count ?? 199
      } seguidores</b>).<br/>☁️ <b>Motor 24/7 con PC Apagado: ACTIVO</b> ${
        isLongLived
          ? '• 🔒 <b>Token extendido a 60 días + Page Token Permanente</b>.'
          : '• 💡 <i>Tip: Si vas a programar para días futuros con el PC apagado, pega tu App Secret abajo y pulsa "Canjear por Token de 60 Días" para que el token no caduque a la hora.</i>'
      }`;

      renderAll();
      await saveStateEverywhere(true);
      syncLiveMetaMetrics({ silent: true, force: true });
    } catch (err) {
      feedback.classList.add('err');
      feedback.textContent = `❌ Error al conectar con Meta: ${err.message}`;
    }
  });

  document.getElementById('btnExchangeLongToken').addEventListener('click', async () => {
    const appId = document.getElementById('cfgAppId').value.trim();
    const appSecret = document.getElementById('cfgAppSecret').value.trim();
    const shortToken = document.getElementById('cfgAccessToken').value.trim();
    const feedback = document.getElementById('tokenVerifyFeedback');

    if (!appId || !appSecret || !shortToken) {
      showToast('⚠️ Ingresa tu App ID, App Secret y Access Token actual para extenderlo a 60 días.');
      return;
    }

    try {
      const url = `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(
        appId
      )}&client_secret=${encodeURIComponent(appSecret)}&fb_exchange_token=${encodeURIComponent(
        shortToken
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.error) {
        showToast(`❌ ${data.error ? data.error.message : 'No se pudo canjear el token'}`);
        return;
      }

      const longToken = data.access_token;
      let permanentPageToken = '';
      const fbPageId = appState.metaConfig?.fbPageId || '102786358439057';
      try {
        const pRes = await fetch(
          `https://graph.facebook.com/v22.0/${fbPageId}?fields=access_token&access_token=${encodeURIComponent(longToken)}`
        );
        const pData = await pRes.json();
        if (pRes.ok && pData.access_token) {
          permanentPageToken = pData.access_token;
        }
      } catch (_) {}

      appState.metaConfig.appId = appId;
      appState.metaConfig.appSecret = appSecret;
      appState.metaConfig.accessToken = longToken;
      if (permanentPageToken) appState.metaConfig.fbPageAccessToken = permanentPageToken;

      if (feedback) {
        feedback.classList.remove('hidden', 'err');
        feedback.classList.add('ok');
        feedback.innerHTML =
          '🔒 <strong>¡Token de 60 Días + Page Token Permanente activados y guardados en Firebase!</strong> Ya puedes apagar tu computador con total tranquilidad: el Motor en la Nube publicará automáticamente tus Posts, Reels e Historias programadas.';
      }

      renderAll();
      await saveStateEverywhere(true);
      showToast('🔄 ¡Token extendido a 60 días + Page Token Permanente sincronizado en Firebase!');
    } catch (err) {
      showToast(`❌ ${err.message}`);
    }
  });

  document.getElementById('formMetaConfig').addEventListener('submit', async (e) => {
    e.preventDefault();
    appState.metaConfig = {
      ...(appState.metaConfig || {}),
      accessToken: document.getElementById('cfgAccessToken').value.trim(),
      igUserId: document.getElementById('cfgIgUserId').value.trim(),
      igUsername: document.getElementById('cfgIgUsername').value.trim(),
      appId: document.getElementById('cfgAppId').value.trim(),
      appSecret: document.getElementById('cfgAppSecret').value.trim(),
      geminiApiKey: document.getElementById('cfgGeminiKey').value.trim(),
      autoPublishEnabled: document.getElementById('cfgAutoPublish').checked,
      simulationFallback: document.getElementById('cfgSimulationFallback').checked
    };
    renderAll();
    await saveStateEverywhere(true);
  });
}

function renderMetaWizardState() {
  const cfg = appState.metaConfig || {};
  const steps = cfg.wizardSteps || {};

  let completedCount = 0;
  const stepKeys = [
    'step1_devAccount',
    'step2_igGraphApi',
    'step3_testerRole',
    'step4_linkFbPage',
    'step5_accessToken'
  ];

  stepKeys.forEach((k, idx) => {
    const done = Boolean(steps[k]);
    if (done) completedCount++;
    const chk = document.querySelector(`.wizard-checkbox[data-step="${k}"]`);
    if (chk) chk.checked = done;
    const card = document.getElementById(`card-step${idx + 1}`);
    if (card) card.classList.toggle('completed', done);
  });

  const pct = Math.round((completedCount / stepKeys.length) * 100);
  const pctEl = document.getElementById('wizardPercentText');
  if (pctEl) pctEl.textContent = `${pct}%`;

  const badgeEl = document.getElementById('wizardProgressBadge');
  if (badgeEl) badgeEl.textContent = `Progreso: ${completedCount}/5 pasos (${pct}%)`;

  const setValIfIdle = (id, val) => {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) el.value = val || '';
  };
  setValIfIdle('cfgAccessToken', cfg.accessToken);
  setValIfIdle('cfgIgUserId', cfg.igUserId);
  setValIfIdle('cfgIgUsername', cfg.igUsername);
  setValIfIdle('cfgAppId', cfg.appId);
  setValIfIdle('cfgAppSecret', cfg.appSecret);
  setValIfIdle('cfgGeminiKey', cfg.geminiApiKey);
  if (typeof renderAiGeminiStatus === 'function') renderAiGeminiStatus();

  const autoChk = document.getElementById('cfgAutoPublish');
  if (autoChk) autoChk.checked = cfg.autoPublishEnabled !== false;
  const simChk = document.getElementById('cfgSimulationFallback');
  if (simChk) simChk.checked = cfg.simulationFallback !== false;
}

function renderMetaStatusSidebar() {
  const cfg = appState.metaConfig || {};
  const dot = document.getElementById('metaStatusDot');
  const title = document.getElementById('metaStatusTitle');
  const desc = document.getElementById('metaStatusDesc');

  if (cfg.accessToken && cfg.igUserId) {
    dot.classList.add('connected');
    title.textContent = `Conectado: @${cfg.igUsername || cfg.igUserId}`;
    desc.textContent = 'Meta API activa para Posts, Historias 24h y Métricas.';
  } else {
    dot.classList.remove('connected');
    title.textContent = 'Modo Simulación / Pendiente';
    desc.textContent = 'Completa los 5 pasos de Meta para conectar tu Instagram Business.';
  }

  const tk = appState.tiktokConfig || {};
  const tkDot = document.getElementById('tiktokStatusDot');
  const tkTitle = document.getElementById('tiktokStatusTitle');
  const tkBadge = document.getElementById('tiktokProgressBadge');
  const tkBig = document.getElementById('tiktokStatusBadgeBig');

  if (tk.accessToken) {
    tkDot?.classList.add('connected');
    if (tkTitle) tkTitle.textContent = `TikTok: @${(tk.username || 'cocuyo.grafic').replace(/^@/, '')} (Conectado)`;
    if (tkBadge) tkBadge.textContent = 'Conectado • Drive Activo';
    if (tkBig) tkBig.textContent = 'ACTIVO';
  } else {
    tkDot?.classList.remove('connected');
    if (tkTitle) tkTitle.textContent = 'TikTok: Listo para autorizar';
    if (tkBadge) tkBadge.textContent = 'Sandbox / Direct Post';
    if (tkBig) tkBig.textContent = 'SANDBOX';
  }
}

// ==========================================
// TIKTOK SANDBOX OAUTH (PKCE S256) & CONFIG
// ==========================================
function generateTikTokCodeVerifier() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const randomValues = new Uint8Array(64);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < 64; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return result;
}

async function generateTikTokCodeChallenge(verifier) {
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return verifier;
}

async function exchangeTikTokCodeFlow({ code, clientKey, clientSecret, redirectUri, codeVerifier }) {
  const payload = {
    code: (code || '').trim(),
    client_key: (clientKey || '').trim(),
    client_secret: (clientSecret || '').trim(),
    redirect_uri: (redirectUri || '').trim(),
    code_verifier: (codeVerifier || '').trim()
  };

  const endpoints = ['/api/tiktok/exchange-code', 'http://localhost:3000/api/tiktok/exchange-code'];
  let lastErr = null;
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) continue;
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error_description || data.error?.message || data.error || 'Error canjeando código de TikTok');
      }
      const normAccess = data.accessToken || data.access_token || data.data?.access_token;
      if (normAccess) {
        return {
          accessToken: normAccess,
          refreshToken: data.refreshToken || data.refresh_token || data.data?.refresh_token || '',
          openId: data.openId || data.open_id || data.data?.open_id || '',
          expiresIn: data.expiresIn || data.expires_in || data.data?.expires_in || 86400
        };
      }
    } catch (err) {
      lastErr = err;
      if (err.message && !/Failed to fetch|NetworkError/i.test(err.message)) {
        throw err;
      }
    }
  }

  // Fallback Cloud Relay via Firestore
  const relayUrl =
    'https://firestore.googleapis.com/v1/projects/sheep-100-b8a90/databases/(default)/documents/sheep100/fb_rupload_relay';
  const jobId = `tk_oauth_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const jobPayload = {
    jobId,
    status: 'pending',
    provider: 'TIKTOK_EXCHANGE',
    clientKey: payload.client_key,
    clientSecret: payload.client_secret,
    code: payload.code,
    redirectUri: payload.redirect_uri,
    codeVerifier: payload.code_verifier
  };

  await fetch(relayUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        payload: { stringValue: JSON.stringify(jobPayload) },
        savedAt: { stringValue: new Date().toISOString() }
      }
    })
  });

  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const checkRes = await fetch(relayUrl);
    if (!checkRes.ok) continue;
    const checkDoc = await checkRes.json();
    const rawStr = checkDoc?.fields?.payload?.stringValue;
    if (!rawStr) continue;
    const state = JSON.parse(rawStr);
    if (state.jobId === jobId) {
      if (state.status === 'done' && state.accessToken) {
        return state;
      }
      if (state.status === 'error') {
        throw new Error(state.error || 'Error canjeando código en TikTok');
      }
    }
  }

  throw lastErr || new Error('No se pudo conectar con el servidor para canjear el código de TikTok.');
}

function extractTikTokCodeFromInput(rawInput) {
  const str = (rawInput || '').trim();
  if (!str) return '';
  if (str.includes('code=')) {
    try {
      const u = new URL(str);
      const c = u.searchParams.get('code');
      if (c) return decodeURIComponent(c);
    } catch (_) {
      const m = str.match(/[?&]code=([^&#\s]+)/i);
      if (m) return decodeURIComponent(m[1]);
    }
  }
  return str;
}

function initTikTokWizardEvents() {
  const btnOAuth = document.getElementById('btnTikTokOAuthConnect');
  const btnManualExchange = document.getElementById('btnTikTokExchangeCodeNow');
  const formTikTok = document.getElementById('formTikTokConfig');

  btnOAuth?.addEventListener('click', async () => {
    const clientKey = (document.getElementById('cfgTikTokClientKey')?.value || 'sbawbyxlo8yktgrxxv').trim();
    const clientSecret = (document.getElementById('cfgTikTokClientSecret')?.value || '').trim();
    const username = (document.getElementById('cfgTikTokUsername')?.value || 'cocuyo.grafic').trim();
    const deliveryMode = document.getElementById('cfgTikTokDeliveryMode')?.value || 'DIRECT';
    const redirectUri = (
      document.getElementById('cfgTikTokRedirectUri')?.value || 'https://juznald-cyber.github.io/SHEEP-100/'
    ).trim();

    if (!clientKey) {
      showToast('⚠️ Ingresa tu Client Key de TikTok Sandbox.');
      return;
    }
    if (!clientSecret) {
      showToast('⚠️ Ingresa tu Client Secret de TikTok Sandbox antes de autorizar para que el canje sea automático.');
      document.getElementById('cfgTikTokClientSecret')?.focus();
      return;
    }

    const codeVerifier = generateTikTokCodeVerifier();
    sessionStorage.setItem('tiktok_code_verifier', codeVerifier);
    localStorage.setItem('tiktok_code_verifier', codeVerifier);

    const codeChallenge = await generateTikTokCodeChallenge(codeVerifier);

    appState.tiktokConfig = {
      ...(appState.tiktokConfig || {}),
      clientKey,
      clientSecret,
      username,
      deliveryMode,
      redirectUri,
      codeVerifier
    };
    await saveStateEverywhere(false);

    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${encodeURIComponent(
      clientKey
    )}&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=sheep100&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=S256`;

    showToast('🎵 Redirigiendo a TikTok para autorizar tu cuenta...');
    window.location.assign(authUrl);
  });

  btnManualExchange?.addEventListener('click', async () => {
    const rawCodeInput = document.getElementById('cfgTikTokManualCodeUrl')?.value || '';
    const code = extractTikTokCodeFromInput(rawCodeInput);
    const feedback = document.getElementById('tiktokVerifyFeedback');

    if (!code) {
      showToast('⚠️ Pega la URL con ?code=... o el código de autorización de TikTok.');
      return;
    }

    const tk = appState.tiktokConfig || {};
    const clientKey = (document.getElementById('cfgTikTokClientKey')?.value || tk.clientKey || 'sbawbyxlo8yktgrxxv').trim();
    const clientSecret = (document.getElementById('cfgTikTokClientSecret')?.value || tk.clientSecret || '').trim();
    const redirectUri = (
      document.getElementById('cfgTikTokRedirectUri')?.value ||
      tk.redirectUri ||
      'https://juznald-cyber.github.io/SHEEP-100/'
    ).trim();
    const codeVerifier =
      tk.codeVerifier ||
      sessionStorage.getItem('tiktok_code_verifier') ||
      localStorage.getItem('tiktok_code_verifier') ||
      '';

    if (!clientSecret) {
      showToast('⚠️ Ingresa tu Client Secret de TikTok para poder canjear el código.');
      return;
    }

    if (feedback) {
      feedback.classList.remove('hidden', 'ok', 'err');
      feedback.textContent = '⏳ Canjeando código de autorización con TikTok OAuth v2...';
    }

    try {
      const tokenData = await exchangeTikTokCodeFlow({
        code,
        clientKey,
        clientSecret,
        redirectUri,
        codeVerifier
      });

      appState.tiktokConfig = {
        ...(appState.tiktokConfig || {}),
        clientKey,
        clientSecret,
        redirectUri,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken || appState.tiktokConfig?.refreshToken || '',
        openId: tokenData.openId || appState.tiktokConfig?.openId || '',
        tokenUpdatedAt: new Date().toISOString()
      };

      if (feedback) {
        feedback.classList.add('ok');
        feedback.innerHTML = `✅ <strong>¡TikTok Conectado Exitosamente!</strong> Access Token (<code>${escapeHtml(
          tokenData.accessToken.slice(0, 14)
        )}...</code>) y Refresh Token (365 días) guardados en Firebase Cloud. Ya puedes publicar o programar videos desde Google Drive.`;
      }

      renderAll();
      await saveStateEverywhere(true);
      showToast('🎉 ¡TikTok conectado y sincronizado en la nube!');
    } catch (err) {
      if (feedback) {
        feedback.classList.add('err');
        feedback.textContent = `❌ Error canjeando código de TikTok: ${err.message}`;
      }
      showToast(`❌ ${err.message}`);
    }
  });

  formTikTok?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prevTk = appState.tiktokConfig || {};
    appState.tiktokConfig = {
      ...prevTk,
      clientKey: pickNonEmpty(document.getElementById('cfgTikTokClientKey')?.value?.trim(), prevTk.clientKey || 'sbawbyxlo8yktgrxxv'),
      clientSecret: pickNonEmpty(document.getElementById('cfgTikTokClientSecret')?.value?.trim(), prevTk.clientSecret),
      username: pickNonEmpty(document.getElementById('cfgTikTokUsername')?.value?.trim(), prevTk.username || 'cocuyo.grafic'),
      deliveryMode: document.getElementById('cfgTikTokDeliveryMode')?.value || prevTk.deliveryMode || 'DIRECT',
      redirectUri: pickNonEmpty(document.getElementById('cfgTikTokRedirectUri')?.value?.trim(), prevTk.redirectUri || 'https://juznald-cyber.github.io/SHEEP-100/'),
      accessToken: pickNonEmpty(document.getElementById('cfgTikTokAccessToken')?.value?.trim(), prevTk.accessToken),
      refreshToken: pickNonEmpty(document.getElementById('cfgTikTokRefreshToken')?.value?.trim(), prevTk.refreshToken),
      openId: pickNonEmpty(document.getElementById('cfgTikTokOpenId')?.value?.trim(), prevTk.openId)
    };

    const feedback = document.getElementById('tiktokVerifyFeedback');
    if (feedback && appState.tiktokConfig.accessToken) {
      feedback.classList.remove('hidden', 'err');
      feedback.classList.add('ok');
      feedback.innerHTML = `✅ <strong>Configuración de TikTok guardada y sincronizada en Firebase Cloud.</strong> Modo: <b>${escapeHtml(
        appState.tiktokConfig.deliveryMode
      )}</b> • Cuenta: <b>@${escapeHtml(appState.tiktokConfig.username.replace(/^@/, ''))}</b>.`;
    }

    renderAll();
    await saveStateEverywhere(true);
    showToast('🎵 Configuración de TikTok guardada en Nube y Local');
  });
}

async function checkTikTokOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const errParam = params.get('error');
  if (!code && !errParam) return;

  // Clean query params from address bar
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);

  switchTab('tiktok-wizard');
  const feedback = document.getElementById('tiktokVerifyFeedback');

  if (errParam) {
    const errDesc = params.get('error_description') || errParam;
    if (feedback) {
      feedback.classList.remove('hidden', 'ok');
      feedback.classList.add('err');
      feedback.textContent = `❌ TikTok devolvió un error en la autorización: ${errDesc}`;
    }
    showToast(`❌ TikTok OAuth: ${errDesc}`);
    return;
  }

  const tk = appState.tiktokConfig || {};
  const clientKey = (tk.clientKey || 'sbawbyxlo8yktgrxxv').trim();
  const clientSecret = (tk.clientSecret || '').trim();
  const redirectUri = (tk.redirectUri || cleanUrl).trim();
  const codeVerifier =
    tk.codeVerifier ||
    sessionStorage.getItem('tiktok_code_verifier') ||
    localStorage.getItem('tiktok_code_verifier') ||
    '';

  const manualInput = document.getElementById('cfgTikTokManualCodeUrl');
  if (manualInput) manualInput.value = code;

  if (!clientSecret) {
    if (feedback) {
      feedback.classList.remove('hidden', 'ok');
      feedback.classList.add('err');
      feedback.innerHTML = `⚠️ <strong>Código recibido de TikTok:</strong> Pega tu <b>Client Secret</b> arriba y haz clic en <b>"⚡ Canjear Código"</b>.`;
    }
    showToast('🎵 Código recibido de TikTok. Ingresa tu Client Secret y pulsa "Canjear Código".');
    return;
  }

  if (feedback) {
    feedback.classList.remove('hidden', 'ok', 'err');
    feedback.textContent = '⏳ Código recibido de TikTok. Canjeando automáticamente por tu Access Token...';
  }

  try {
    const tokenData = await exchangeTikTokCodeFlow({
      code,
      clientKey,
      clientSecret,
      redirectUri,
      codeVerifier
    });

    appState.tiktokConfig = {
      ...(appState.tiktokConfig || {}),
      clientKey,
      clientSecret,
      redirectUri,
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken || appState.tiktokConfig?.refreshToken || '',
      openId: tokenData.openId || appState.tiktokConfig?.openId || '',
      tokenUpdatedAt: new Date().toISOString()
    };

    if (feedback) {
      feedback.classList.add('ok');
      feedback.innerHTML = `🎉 <strong>¡TikTok Conectado Automáticamente!</strong> Access Token y Refresh Token (365 días) activos y sincronizados en Firebase Cloud.`;
    }

    renderAll();
    await saveStateEverywhere(true);
    showToast('🎉 ¡TikTok conectado y listo para publicar videos desde Google Drive!');
  } catch (err) {
    if (feedback) {
      feedback.classList.add('err');
      feedback.textContent = `❌ Error canjeando código automáticamente: ${err.message}`;
    }
    showToast(`❌ ${err.message}`);
  }
}

function renderTikTokWizardState() {
  const tk = appState.tiktokConfig || {};
  const setValIfIdle = (id, val) => {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) el.value = val || '';
  };

  setValIfIdle('cfgTikTokClientKey', tk.clientKey || 'sbawbyxlo8yktgrxxv');
  setValIfIdle('cfgTikTokClientSecret', tk.clientSecret || '');
  setValIfIdle('cfgTikTokUsername', tk.username || 'cocuyo.grafic');
  setValIfIdle('cfgTikTokAccessToken', tk.accessToken || '');
  setValIfIdle('cfgTikTokRefreshToken', tk.refreshToken || '');
  setValIfIdle('cfgTikTokOpenId', tk.openId || '');

  const delivEl = document.getElementById('cfgTikTokDeliveryMode');
  if (delivEl && document.activeElement !== delivEl) {
    delivEl.value = tk.deliveryMode || 'DIRECT';
  }
  const redirEl = document.getElementById('cfgTikTokRedirectUri');
  if (redirEl && document.activeElement !== redirEl && tk.redirectUri) {
    redirEl.value = tk.redirectUri;
  }

  const fb = document.getElementById('tiktokVerifyFeedback');
  if (fb) {
    if (tk.accessToken && String(tk.accessToken).trim() !== '') {
      fb.classList.remove('hidden', 'err');
      fb.classList.add('ok');
      fb.innerHTML = `✅ <strong>¡TikTok Conectado y Sincronizado en la Nube!</strong> Cuenta: <b>@${escapeHtml(
        (tk.username || 'cocuyo.grafic').replace(/^@/, '')
      )}</b> • Refresh Token (365 días) activo para publicar videos desde <b>Google Drive</b> incluso con tu PC apagado.`;
    } else if (!fb.classList.contains('err') && !fb.classList.contains('ok')) {
      fb.classList.add('hidden');
    }
  }
}

// ==========================================
// POST, CAROUSEL & STORY COMPOSER MODAL
// ==========================================
function addCarouselSlideToComposer(rawSlide) {
  if (composerCarouselSlides.length >= 10) {
    showToast('⚠️ Instagram permite máximo 10 diapositivas por Carrusel.');
    return;
  }
  const type = rawSlide.type === 'video' || rawSlide.format === 'MP4' ? 'video' : 'image';
  const rawUrl = (rawSlide.publicUrl || rawSlide.url || '').trim();
  if (!rawUrl) return;
  const isVid =
    type === 'video' || /\.mp4(\?|$)/i.test(rawUrl) || /drive\.usercontent\.google\.com\/download/i.test(rawUrl);
  const norm = normalizeCloudMedia(rawUrl, isVid ? 'video' : 'image');
  composerCarouselSlides.push({
    id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    mediaId: rawSlide.mediaId || null,
    title: rawSlide.title || `Diapositiva ${composerCarouselSlides.length + 1}`,
    url: norm.thumbUrl || rawSlide.url || rawUrl,
    publicUrl: norm.publicUrl || rawUrl,
    type: isVid ? 'video' : 'image',
    format: isVid ? 'MP4' : 'JPG'
  });
  composerCarouselPreviewIdx = composerCarouselSlides.length - 1;
  renderCarouselSlidesUI();
}

function renderCarouselLibraryPicker() {
  const picker = document.getElementById('carouselLibraryPicker');
  if (!picker) return;
  if (!Array.isArray(appState.mediaLibrary) || !appState.mediaLibrary.length) {
    picker.innerHTML = `<span class="muted-text" style="font-size:0.72rem;">Sube archivos en Media Library o pega URLs abajo.</span>`;
    return;
  }
  picker.innerHTML = appState.mediaLibrary
    .map((m) => {
      const norm = normalizeCloudMedia(m.originalUrl || m.url || m.publicUrl || '', m.type);
      const thumb = norm.thumbUrl || m.url || './logo.png';
      return `
        <button type="button" class="carousel-pick-chip" data-pick-media-id="${m.id}" title="Añadir ${escapeHtml(m.title)} al carrusel">
          <img src="${escapeHtml(thumb)}" referrerpolicy="no-referrer" alt="${escapeHtml(m.title)}" onerror="this.src='./logo.png'" />
          <span class="carousel-pick-plus">＋</span>
        </button>
      `;
    })
    .join('');

  picker.querySelectorAll('.carousel-pick-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = appState.mediaLibrary.find((item) => item.id === btn.dataset.pickMediaId);
      if (!m) return;
      addCarouselSlideToComposer({
        mediaId: m.id,
        title: m.title,
        url: m.url,
        publicUrl: m.publicUrl || m.url,
        type: m.type,
        format: m.format
      });
    });
  });
}

function renderCarouselSlidesUI() {
  const listEl = document.getElementById('carouselSlidesList');
  const badgeEl = document.getElementById('carouselCountBadge');
  const urlInput = document.getElementById('postPublicMediaUrl');

  if (badgeEl) {
    const n = composerCarouselSlides.length;
    badgeEl.textContent = `${n} / 10 (mín. 2)`;
    badgeEl.style.background = n >= 2 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.22)';
    badgeEl.style.color = n >= 2 ? '#6ee7b7' : '#fde68a';
  }

  if (composerCarouselSlides.length > 0 && urlInput) {
    urlInput.value = composerCarouselSlides[0].publicUrl || composerCarouselSlides[0].url;
  }

  if (composerCarouselPreviewIdx >= composerCarouselSlides.length) {
    composerCarouselPreviewIdx = Math.max(0, composerCarouselSlides.length - 1);
  }

  if (listEl) {
    if (!composerCarouselSlides.length) {
      listEl.innerHTML = `<div class="muted-text" style="font-size:0.74rem;padding:6px;">Aún no hay diapositivas. Toca 2 o más medios arriba o pega URLs.</div>`;
    } else {
      listEl.innerHTML = composerCarouselSlides
        .map(
          (slide, idx) => `
          <div class="carousel-slide-item" data-slide-idx="${idx}">
            <span class="carousel-slide-num">${idx + 1}</span>
            <img src="${escapeHtml(slide.url)}" class="carousel-slide-thumb" referrerpolicy="no-referrer" alt="" onerror="this.src='./logo.png'" />
            <div class="carousel-slide-meta">
              <strong>${escapeHtml(slide.title)}</strong>
              <small>${slide.type === 'video' ? '🎬 Video MP4' : '🖼️ Imagen'} • Diapositiva ${idx + 1}</small>
            </div>
            <div class="carousel-slide-actions">
              <button type="button" class="btn-outline btn-sm" data-cs-act="up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''} title="Subir orden">▲</button>
              <button type="button" class="btn-outline btn-sm" data-cs-act="down" data-idx="${idx}" ${idx === composerCarouselSlides.length - 1 ? 'disabled' : ''} title="Bajar orden">▼</button>
              <button type="button" class="btn-outline btn-sm" data-cs-act="del" data-idx="${idx}" title="Quitar">✕</button>
            </div>
          </div>
        `
        )
        .join('');

      listEl.querySelectorAll('.carousel-slide-item').forEach((row) => {
        row.addEventListener('click', (ev) => {
          if (ev.target.closest('button')) return;
          composerCarouselPreviewIdx = Number(row.dataset.slideIdx) || 0;
          updateComposerCarouselPreview();
        });
      });

      listEl.querySelectorAll('[data-cs-act]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.idx);
          const act = btn.dataset.csAct;
          if (act === 'up' && idx > 0) {
            const tmp = composerCarouselSlides[idx - 1];
            composerCarouselSlides[idx - 1] = composerCarouselSlides[idx];
            composerCarouselSlides[idx] = tmp;
            composerCarouselPreviewIdx = idx - 1;
          } else if (act === 'down' && idx < composerCarouselSlides.length - 1) {
            const tmp = composerCarouselSlides[idx + 1];
            composerCarouselSlides[idx + 1] = composerCarouselSlides[idx];
            composerCarouselSlides[idx] = tmp;
            composerCarouselPreviewIdx = idx + 1;
          } else if (act === 'del') {
            composerCarouselSlides.splice(idx, 1);
            if (composerCarouselPreviewIdx >= composerCarouselSlides.length) {
              composerCarouselPreviewIdx = Math.max(0, composerCarouselSlides.length - 1);
            }
          }
          renderCarouselSlidesUI();
        });
      });
    }
  }

  const selectedRadio = document.querySelector('input[name="postFormatRadio"]:checked');
  if (selectedRadio && selectedRadio.value === 'CAROUSEL') {
    updateComposerCarouselPreview();
  }
}

function updateComposerCarouselPreview() {
  const box = document.getElementById('composerMediaPreview');
  if (!box) return;
  if (!composerCarouselSlides.length) {
    box.innerHTML = `<span>🎠 Agrega entre 2 y 10 fotos/videos abajo</span>`;
    return;
  }
  const idx = Math.max(0, Math.min(composerCarouselPreviewIdx, composerCarouselSlides.length - 1));
  const slide = composerCarouselSlides[idx];
  const norm = normalizeCloudMedia(slide.publicUrl || slide.url, slide.type);
  const displayUrl = norm.thumbUrl || slide.url;
  const mediaHtml =
    slide.type === 'video' && !norm.isDrive
      ? `<video src="${escapeHtml(displayUrl)}" controls muted></video>`
      : `<img src="${escapeHtml(displayUrl)}" referrerpolicy="no-referrer" alt="Slide ${idx + 1}" onerror="this.src='./logo.png'" />`;

  const dotsHtml = composerCarouselSlides
    .map((_, dIdx) => `<span class="carousel-dot ${dIdx === idx ? 'active' : ''}"></span>`)
    .join('');

  box.innerHTML = `
    <div class="carousel-preview-stage">
      ${mediaHtml}
      <span class="carousel-preview-counter">🎠 ${idx + 1} / ${composerCarouselSlides.length}</span>
      ${composerCarouselSlides.length > 1 ? `<button type="button" class="carousel-preview-nav prev" id="btnCarouselPrev">‹</button><button type="button" class="carousel-preview-nav next" id="btnCarouselNext">›</button>` : ''}
      <div class="carousel-preview-dots">${dotsHtml}</div>
    </div>
  `;

  document.getElementById('btnCarouselPrev')?.addEventListener('click', () => {
    composerCarouselPreviewIdx = (idx - 1 + composerCarouselSlides.length) % composerCarouselSlides.length;
    updateComposerCarouselPreview();
  });
  document.getElementById('btnCarouselNext')?.addEventListener('click', () => {
    composerCarouselPreviewIdx = (idx + 1) % composerCarouselSlides.length;
    updateComposerCarouselPreview();
  });
}

function setComposerFormatUI(formatValue) {
  const fmt = formatValue || 'POST';
  document.querySelectorAll('.format-choice').forEach((card) => {
    const isMatch = card.dataset.formatCard === fmt;
    card.classList.toggle('active', isMatch);
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = isMatch;
  });

  const modalTitleEl = document.getElementById('composerModalTitle');
  const isEditing = Boolean(document.getElementById('postId')?.value);
  if (modalTitleEl) {
    if (isEditing) {
      modalTitleEl.textContent =
        fmt === 'CAROUSEL'
          ? '🎠 Editar Carrusel'
          : fmt === 'STORY'
          ? '⭕ Editar Historia (24h)'
          : fmt === 'REEL'
          ? '🎬 Editar Reel'
          : fmt === 'BOTH'
          ? '🔥 Editar Historia + Feed'
          : '✏️ Editar Publicación';
    } else {
      modalTitleEl.textContent =
        fmt === 'CAROUSEL'
          ? '🎠 Programar Nuevo Carrusel (2–10)'
          : fmt === 'STORY'
          ? '⭕ Programar Nueva Historia (24h)'
          : fmt === 'REEL'
          ? '🎬 Programar Nuevo Reel'
          : fmt === 'BOTH'
          ? '🔥 Programar Ambos (Historia + Feed)'
          : '✨ Programar Publicación (Post)';
    }
  }

  const previewBox = document.getElementById('composerMediaPreview');
  const storyNotice = document.getElementById('storyHelperNotice');
  const mediaTypeSelect = document.getElementById('postMediaType');
  const captionLabel = document.getElementById('captionFieldLabel');
  const singleFields = document.getElementById('singleMediaFields');
  const carouselPanel = document.getElementById('carouselBuilderPanel');
  const publicUrlInput = document.getElementById('postPublicMediaUrl');

  if (fmt === 'CAROUSEL') {
    previewBox?.classList.remove('story-aspect');
    singleFields?.classList.add('hidden');
    carouselPanel?.classList.remove('hidden');
    if (publicUrlInput) publicUrlInput.required = false;
    storyNotice?.classList.remove('hidden');
    if (storyNotice) {
      storyNotice.innerHTML =
        '🎠 <strong>Modo Carrusel (2 a 10 slides):</strong> Se publicará como álbum deslizable en tu Feed de Instagram (fotos y/o videos MP4) y como álbum multi-foto en Facebook Page.';
    }
    if (mediaTypeSelect) mediaTypeSelect.value = 'CAROUSEL';
    if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags del Carrusel';

    if (composerCarouselSlides.length === 0) {
      const existingUrl = (publicUrlInput?.value || '').trim();
      const selMediaId = document.getElementById('postMediaSelect')?.value || null;
      const linked = selMediaId ? appState.mediaLibrary.find((m) => m.id === selMediaId) : null;
      if (linked) {
        addCarouselSlideToComposer({
          mediaId: linked.id,
          title: linked.title,
          url: linked.url,
          publicUrl: linked.publicUrl || linked.url,
          type: linked.type,
          format: linked.format
        });
      } else if (existingUrl) {
        addCarouselSlideToComposer({
          title: 'Diapositiva 1',
          url: existingUrl,
          publicUrl: existingUrl,
          type: /\.mp4(\?|$)/i.test(existingUrl) ? 'video' : 'image'
        });
      }
    }
    renderCarouselLibraryPicker();
    renderCarouselSlidesUI();
  } else {
    singleFields?.classList.remove('hidden');
    carouselPanel?.classList.add('hidden');
    if (publicUrlInput) publicUrlInput.required = true;

    if (fmt === 'STORY') {
      previewBox?.classList.add('story-aspect');
      storyNotice?.classList.remove('hidden');
      if (storyNotice) {
        storyNotice.innerHTML =
          '⭕ <strong>Modo Solo Historia (24h):</strong> Se publicará <b>exclusivamente en Historias 24h</b> (no irá a Reels ni al Feed). Desaparece a las 24 horas.';
      }
      if (mediaTypeSelect) mediaTypeSelect.value = 'STORIES';
      if (captionLabel) captionLabel.textContent = 'Notas / Guion de la Historia (Recordatorio interno o texto a copiar)';
    } else if (fmt === 'REEL') {
      previewBox?.classList.add('story-aspect');
      storyNotice?.classList.remove('hidden');
      if (storyNotice) {
        storyNotice.innerHTML =
          '🎬 <strong>Modo Solo Reel:</strong> Se publicará <b>exclusivamente como Reel de video</b> en tu cuenta (no irá a la Historia 24h).';
      }
      if (mediaTypeSelect) mediaTypeSelect.value = 'REELS';
      if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags del Reel';
    } else if (fmt === 'BOTH') {
      previewBox?.classList.add('story-aspect');
      storyNotice?.classList.remove('hidden');
      if (storyNotice) {
        storyNotice.innerHTML =
          '🔥 <strong>Modo Ambos (Historia 24h + Reel/Post):</strong> SHEEP 100 publicará tu archivo en tu <b>Historia 24h</b> Y también como <b>Reel / Post</b> en el Feed en un solo paso.';
      }
      if (mediaTypeSelect) mediaTypeSelect.value = 'BOTH';
      if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags para el Reel/Post';
    } else {
      previewBox?.classList.remove('story-aspect');
      storyNotice?.classList.add('hidden');
      if (mediaTypeSelect) mediaTypeSelect.value = 'IMAGE';
      if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags del Post';
    }

    if (publicUrlInput?.value) {
      updateComposerPreview(publicUrlInput.value);
    }
  }
}

const EMOJI_RECENT_KEY = 'SHEEP100_RECENT_EMOJIS';
const DEFAULT_QUICK_EMOJIS = ['🔥', '✨', '🚀', '❤️', '😍', '👉', '👇', '✅', '📸', '🎥', '💥', '🐑'];
const EMOJI_CATEGORIES = [
  {
    id: 'recent',
    label: '🕒 Top',
    emojis: DEFAULT_QUICK_EMOJIS
  },
  {
    id: 'faces',
    label: '😀 Caras',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
      '😊', '🥰', '😍', '🤩', '😘', '😋', '😎', '🤓',
      '🥳', '🤯', '😱', '🥺', '😭', '🤔', '🫡', '🫶',
      '🙌', '👏', '👍', '💪', '🙏', '🤝', '✌️', '👌'
    ]
  },
  {
    id: 'promo',
    label: '🔥 Marketing',
    emojis: [
      '🔥', '✨', '⚡', '💥', '🚀', '🎯', '📌', '📍',
      '👉', '👇', '👆', '🔗', '🛒', '🛍️', '🎁', '🏷️',
      '💸', '💰', '💎', '⭐', '🌟', '💯', '✅', '🆕',
      '⏰', '⏳', '📢', '📣', '🏆', '🎉', '🎊', '🔔'
    ]
  },
  {
    id: 'social',
    label: '📸 Redes',
    emojis: [
      '📸', '🎥', '🎬', '🎞️', '🎠', '⭕', '🎵', '🎶',
      '🎙️', '📱', '💻', '✍️', '📝', '💡', '📊', '📈',
      '💬', '🔖', '🔄', '👀', '❤️', '🧡', '💛', '💚',
      '💙', '💜', '🖤', '🤍', '🩷', '👑', '📲', '🔴'
    ]
  },
  {
    id: 'lifestyle',
    label: '☕ Estilo',
    emojis: [
      '🐑', '☕', '🥐', '🍔', '🍕', '🍰', '🥂', '🎨',
      '📦', '🚚', '🏪', '🏠', '🗓️', '✈️', '🏖️', '🌿',
      '🌸', '🌻', '☀️', '🌙', '🌈', '🌊', '🦋', '🧘'
    ]
  }
];
let activeEmojiCategoryId = 'recent';

function getRecentEmojisList() {
  try {
    const raw = localStorage.getItem(EMOJI_RECENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return [...DEFAULT_QUICK_EMOJIS];
}

function recordRecentEmoji(emoji) {
  const current = getRecentEmojisList().filter((e) => e !== emoji);
  const next = [emoji, ...current].slice(0, 18);
  try {
    localStorage.setItem(EMOJI_RECENT_KEY, JSON.stringify(next));
  } catch (_) {}
}

function insertEmojiIntoCaption(emoji) {
  const area = document.getElementById('postCaption');
  if (!area || !emoji) return;

  const val = area.value || '';
  const start = typeof area.selectionStart === 'number' ? area.selectionStart : val.length;
  const end = typeof area.selectionEnd === 'number' ? area.selectionEnd : val.length;

  area.value = val.slice(0, start) + emoji + val.slice(end);
  const nextPos = start + emoji.length;
  try {
    area.focus();
    area.setSelectionRange(nextPos, nextPos);
  } catch (_) {}

  area.dispatchEvent(new Event('input'));
  recordRecentEmoji(emoji);
  renderComposerEmojiUI();
}

function toggleComposerEmojiPanel(forceOpen = null) {
  const panel = document.getElementById('composerEmojiPanel');
  const toggleBtn = document.getElementById('btnToggleEmojiPicker');
  if (!panel) return;
  const shouldOpen = forceOpen !== null ? Boolean(forceOpen) : panel.classList.contains('hidden');
  panel.classList.toggle('hidden', !shouldOpen);
  toggleBtn?.classList.toggle('active', shouldOpen);
  toggleBtn?.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  if (shouldOpen) {
    setTimeout(() => panel.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

function renderComposerEmojiUI() {
  const quickStrip = document.getElementById('quickEmojiStrip');
  const tabsEl = document.getElementById('emojiCategoryTabs');
  const gridEl = document.getElementById('emojiPickerGrid');
  const recents = getRecentEmojisList();

  if (quickStrip) {
    const stripItems = recents.slice(0, 8);
    quickStrip.innerHTML =
      stripItems
        .map(
          (em) =>
            `<button type="button" class="emoji-quick-btn" data-emoji="${em}" title="Insertar ${em}">${em}</button>`
        )
        .join('') +
      `<button type="button" class="emoji-quick-more" id="btnQuickMoreEmojis">➕ Más</button>`;

    quickStrip.querySelectorAll('.emoji-quick-btn').forEach((btn) => {
      btn.addEventListener('click', () => insertEmojiIntoCaption(btn.dataset.emoji));
    });
    document.getElementById('btnQuickMoreEmojis')?.addEventListener('click', () => {
      toggleComposerEmojiPanel();
    });
  }

  if (tabsEl) {
    tabsEl.innerHTML = EMOJI_CATEGORIES.map(
      (cat) =>
        `<button type="button" class="emoji-tab-btn ${
          cat.id === activeEmojiCategoryId ? 'active' : ''
        }" data-ecat="${cat.id}">${cat.label}</button>`
    ).join('');

    tabsEl.querySelectorAll('.emoji-tab-btn').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        activeEmojiCategoryId = tabBtn.dataset.ecat;
        renderComposerEmojiUI();
      });
    });
  }

  if (gridEl) {
    const cat = EMOJI_CATEGORIES.find((c) => c.id === activeEmojiCategoryId) || EMOJI_CATEGORIES[0];
    const items = cat.id === 'recent' ? recents : cat.emojis;
    gridEl.innerHTML = items
      .map(
        (em) =>
          `<button type="button" class="emoji-item-btn" data-emoji="${em}" title="Insertar ${em}">${em}</button>`
      )
      .join('');

    gridEl.querySelectorAll('.emoji-item-btn').forEach((btn) => {
      btn.addEventListener('click', () => insertEmojiIntoCaption(btn.dataset.emoji));
    });
  }
}

function initComposerEvents() {
  document.getElementById('btnOpenComposer')?.addEventListener('click', () =>
    openComposerModal({ defaultFormat: 'POST' })
  );
  document.getElementById('btnOpenStoryComposer')?.addEventListener('click', () =>
    openComposerModal({ defaultFormat: 'STORY' })
  );
  document.getElementById('btnCloseComposer').addEventListener('click', closeComposerModal);
  document.getElementById('btnCancelComposer').addEventListener('click', closeComposerModal);
  document.getElementById('btnToggleEmojiPicker')?.addEventListener('click', () => {
    toggleComposerEmojiPanel();
  });
  document.getElementById('btnCloseEmojiPicker')?.addEventListener('click', () => {
    toggleComposerEmojiPanel(false);
  });
  renderComposerEmojiUI();

  document.querySelectorAll('.format-choice').forEach((card) => {
    card.addEventListener('click', () => {
      setComposerFormatUI(card.dataset.formatCard);
    });
  });

  document.getElementById('postMediaType')?.addEventListener('change', (e) => {
    const val = e.target.value;
    const map = { CAROUSEL: 'CAROUSEL', STORIES: 'STORY', REELS: 'REEL', BOTH: 'BOTH', IMAGE: 'POST' };
    if (map[val]) setComposerFormatUI(map[val]);
  });

  document.getElementById('btnAddCarouselUrl')?.addEventListener('click', () => {
    const urlInput = document.getElementById('carouselAddUrlInput');
    const typeSel = document.getElementById('carouselAddUrlType');
    const url = (urlInput?.value || '').trim();
    if (!url) {
      showToast('⚠️ Pega primero una URL pública o enlace de Google Drive.');
      return;
    }
    const type = /\.mp4(\?|$)/i.test(url) ? 'video' : (typeSel?.value || 'image');
    addCarouselSlideToComposer({
      title: `Slide ${composerCarouselSlides.length + 1}`,
      url,
      publicUrl: url,
      type
    });
    urlInput.value = '';
  });

  const mediaSelect = document.getElementById('postMediaSelect');
  mediaSelect.addEventListener('change', () => {
    const media = appState.mediaLibrary.find((m) => m.id === mediaSelect.value);
    if (media) {
      document.getElementById('postPublicMediaUrl').value = media.publicUrl || media.url;
      updateComposerPreview(media.url);
    }
  });

  document.getElementById('postPublicMediaUrl').addEventListener('input', (e) => {
    updateComposerPreview(e.target.value);
  });

  const captionInput = document.getElementById('postCaption');
  captionInput.addEventListener('input', () => {
    document.getElementById('captionCharCounter').textContent = `${captionInput.value.length} / 2200`;
  });

  document.getElementById('formPostComposer').addEventListener('submit', async (e) => {
    e.preventDefault();
    const platforms = Array.from(
      document.querySelectorAll('input[name="postPlatform"]:checked')
    ).map((el) => el.value);

    const selectedRadio = document.querySelector('input[name="postFormatRadio"]:checked');
    const postFormat = selectedRadio ? selectedRadio.value : 'POST';
    const isCarousel = postFormat === 'CAROUSEL';

    if (isCarousel) {
      if (composerCarouselSlides.length < 2) {
        showToast('⚠️ Un Carrusel necesita mínimo 2 diapositivas. Agrega al menos 2 fotos o videos.');
        return;
      }
      if (composerCarouselSlides.length > 10) {
        showToast('⚠️ Meta permite máximo 10 diapositivas en un Carrusel.');
        return;
      }
    }

    const mediaType =
      isCarousel
        ? 'CAROUSEL'
        : postFormat === 'STORY'
        ? 'STORIES'
        : postFormat === 'REEL'
        ? 'REELS'
        : postFormat === 'BOTH'
        ? 'BOTH'
        : document.getElementById('postMediaType').value;

    const scheduledLocal = document.getElementById('postScheduledAt').value;
    const scheduledIso = scheduledLocal
      ? new Date(scheduledLocal).toISOString()
      : new Date().toISOString();

    const firstSlide = isCarousel ? composerCarouselSlides[0] : null;
    const mediaUrlVal = isCarousel
      ? (firstSlide.publicUrl || firstSlide.url || '').trim()
      : document.getElementById('postPublicMediaUrl').value.trim();
    const selectedMediaId = isCarousel
      ? firstSlide.mediaId || null
      : document.getElementById('postMediaSelect').value || null;
    const linkedMedia = selectedMediaId
      ? appState.mediaLibrary.find((m) => m.id === selectedMediaId)
      : null;
    const isVid =
      !isCarousel &&
      (linkedMedia?.type === 'video' ||
        linkedMedia?.format === 'MP4' ||
        postFormat === 'REEL' ||
        mediaType === 'REELS' ||
        mediaType === 'VIDEO' ||
        /\.mp4(\?|$)/i.test(mediaUrlVal) ||
        /drive\.usercontent\.google\.com\/download/i.test(mediaUrlVal));
    const norm = normalizeCloudMedia(mediaUrlVal, isVid ? 'video' : 'image');
    const visualThumbUrl = isCarousel ? firstSlide.url || norm.thumbUrl || mediaUrlVal : norm.thumbUrl || linkedMedia?.url || mediaUrlVal;
    const binaryPublicUrl = isCarousel ? firstSlide.publicUrl || norm.publicUrl || mediaUrlVal : norm.publicUrl || mediaUrlVal;
    const existingId = document.getElementById('postId').value;

    const carouselItemsPayload = isCarousel
      ? composerCarouselSlides.map((s) => ({
          mediaId: s.mediaId || null,
          title: s.title || '',
          url: s.url,
          publicUrl: s.publicUrl || s.url,
          type: s.type || 'image',
          format: s.format || (s.type === 'video' ? 'MP4' : 'JPG')
        }))
      : undefined;

    if (existingId) {
      const idx = appState.posts.findIndex((p) => p.id === existingId);
      if (idx >= 0) {
        appState.posts[idx] = {
          ...appState.posts[idx],
          title: document.getElementById('postTitle').value.trim(),
          caption: document.getElementById('postCaption').value,
          mediaId: selectedMediaId,
          mediaUrl: visualThumbUrl,
          publicMediaUrl: binaryPublicUrl,
          mediaType,
          postFormat,
          carouselItems: carouselItemsPayload,
          platforms: platforms.length ? platforms : ['instagram'],
          scheduledAt: scheduledIso,
          status: document.getElementById('postStatus').value,
          firstComment: document.getElementById('postFirstComment').value.trim()
        };
      }
    } else {
      appState.posts.unshift({
        id: `post-${Date.now()}`,
        title:
          document.getElementById('postTitle').value.trim() ||
          (isCarousel
            ? `Carrusel (${composerCarouselSlides.length} slides)`
            : postFormat === 'STORY'
            ? 'Nueva Historia 24h'
            : postFormat === 'REEL'
            ? 'Nuevo Reel'
            : postFormat === 'BOTH'
            ? 'Historia + Reel'
            : 'Nueva Publicación'),
        caption: document.getElementById('postCaption').value,
        mediaId: selectedMediaId,
        mediaUrl: visualThumbUrl,
        publicMediaUrl: binaryPublicUrl,
        mediaType,
        postFormat,
        carouselItems: carouselItemsPayload,
        platforms: platforms.length ? platforms : ['instagram'],
        scheduledAt: scheduledIso,
        status: document.getElementById('postStatus').value,
        firstComment: document.getElementById('postFirstComment').value.trim(),
        gridOrder: 0,
        metrics: { reach: 0, likes: 0, comments: 0, saves: 0 },
        createdAt: new Date().toISOString(),
        logs: [
          {
            time: new Date().toISOString(),
            message: isCarousel
              ? `Carrusel programado (${composerCarouselSlides.length} diapositivas).`
              : postFormat === 'BOTH'
              ? 'Programado para Historia 24h + Reel/Post simultáneamente.'
              : postFormat === 'STORY'
              ? 'Programado exclusivamente para Historia 24h.'
              : postFormat === 'REEL'
              ? 'Programado exclusivamente para Reel.'
              : 'Post programado en SHEEP 100.'
          }
        ]
      });
    }

    closeComposerModal();
    renderAll();
    await saveStateEverywhere(true);
  });
}

function populateComposerMediaDropdown() {
  const sel = document.getElementById('postMediaSelect');
  if (!sel) return;
  const currentVal = sel.value;
  sel.innerHTML =
    `<option value="">-- Seleccionar de Media Library --</option>` +
    appState.mediaLibrary
      .map((m) => `<option value="${m.id}">${escapeHtml(m.title)} (${m.format})</option>`)
      .join('');
  sel.value = currentVal;
}

function updateComposerPreview(url) {
  const selectedRadio = document.querySelector('input[name="postFormatRadio"]:checked');
  if (selectedRadio && selectedRadio.value === 'CAROUSEL') {
    updateComposerCarouselPreview();
    return;
  }
  const box = document.getElementById('composerMediaPreview');
  if (!url) {
    box.innerHTML = `<span>Selecciona un medio o pega una URL</span>`;
    return;
  }
  const norm = normalizeCloudMedia(url, 'image');
  const displayUrl = norm.thumbUrl || url;
  if (!norm.isDrive && /\.mp4(\?|$)/i.test(displayUrl)) {
    box.innerHTML = `<video src="${escapeHtml(displayUrl)}" controls muted></video>`;
  } else {
    box.innerHTML = `<img src="${escapeHtml(displayUrl)}" referrerpolicy="no-referrer" alt="Preview" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${norm.driveId ? `https://drive.google.com/thumbnail?id=${norm.driveId}&sz=w1000` : './logo.png'}';}" />`;
  }
}

function openComposerModal(opts = {}) {
  closeMobileDrawer();
  const modal = document.getElementById('composerModal');
  const form = document.getElementById('formPostComposer');
  form.reset();
  composerCarouselSlides = [];
  composerCarouselPreviewIdx = 0;

  const defaultTomorrow = new Date(Date.now() + 2 * 3600 * 1000);
  defaultTomorrow.setMinutes(0, 0, 0);

  if (opts.post) {
    const p = opts.post;
    const fmt =
      p.postFormat ||
      (isPostCarousel(p)
        ? 'CAROUSEL'
        : p.mediaType === 'STORIES'
        ? 'STORY'
        : p.mediaType === 'REELS'
        ? 'REEL'
        : 'POST');
    document.getElementById('composerModalTitle').textContent =
      fmt === 'CAROUSEL'
        ? '🎠 Editar Carrusel'
        : fmt === 'STORY'
        ? '✏️ Editar Historia (24h)'
        : '✏️ Editar Publicación';
    document.getElementById('postId').value = p.id;
    document.getElementById('postTitle').value = p.title || '';
    document.getElementById('postCaption').value = p.caption || '';
    document.getElementById('postMediaSelect').value = p.mediaId || '';
    document.getElementById('postPublicMediaUrl').value = p.publicMediaUrl || p.mediaUrl || '';
    document.getElementById('postMediaType').value = fmt === 'CAROUSEL' ? 'CAROUSEL' : p.mediaType || 'IMAGE';
    document.getElementById('postFirstComment').value = p.firstComment || '';
    document.getElementById('postStatus').value = p.status === 'draft' ? 'draft' : 'scheduled';
    document.getElementById('postScheduledAt').value = toLocalDateTimeInputValue(
      new Date(p.scheduledAt || defaultTomorrow)
    );
    document.querySelectorAll('input[name="postPlatform"]').forEach((chk) => {
      chk.checked = (p.platforms || []).includes(chk.value);
    });
    if (Array.isArray(p.carouselItems) && p.carouselItems.length) {
      p.carouselItems.forEach((sl) => addCarouselSlideToComposer(sl));
      composerCarouselPreviewIdx = 0;
    }
    setComposerFormatUI(fmt);
    updateComposerPreview(p.publicMediaUrl || p.mediaUrl);
  } else {
    const initialFormat = opts.defaultFormat || 'POST';
    document.getElementById('composerModalTitle').textContent =
      initialFormat === 'CAROUSEL'
        ? '🎠 Programar Nuevo Carrusel'
        : initialFormat === 'STORY'
        ? '⭕ Programar Nueva Historia (24h)'
        : '✨ Programar Post o Historia';
    document.getElementById('postId').value = '';
    document.getElementById('postScheduledAt').value =
      opts.scheduledAtLocal || toLocalDateTimeInputValue(defaultTomorrow);

    if (opts.mediaId) {
      const m = appState.mediaLibrary.find((item) => item.id === opts.mediaId);
      if (m) {
        document.getElementById('postMediaSelect').value = m.id;
        document.getElementById('postPublicMediaUrl').value = m.publicUrl || m.url;
        document.getElementById('postTitle').value =
          (initialFormat === 'STORY' ? 'Historia: ' : initialFormat === 'CAROUSEL' ? 'Carrusel: ' : '') +
          m.title.replace(/\.[^.]+$/, '');
        if (initialFormat === 'CAROUSEL') {
          addCarouselSlideToComposer({
            mediaId: m.id,
            title: m.title,
            url: m.url,
            publicUrl: m.publicUrl || m.url,
            type: m.type,
            format: m.format
          });
        }
        updateComposerPreview(m.url);
      }
    } else if (appState.mediaLibrary[0] && initialFormat !== 'CAROUSEL') {
      const first = appState.mediaLibrary[0];
      document.getElementById('postMediaSelect').value = first.id;
      document.getElementById('postPublicMediaUrl').value = first.publicUrl || first.url;
      updateComposerPreview(first.url);
    }

    setComposerFormatUI(initialFormat);

    if (opts.prefillTitle) document.getElementById('postTitle').value = opts.prefillTitle;
    if (opts.prefillCaption) document.getElementById('postCaption').value = opts.prefillCaption;
    if (opts.prefillFirstComment)
      document.getElementById('postFirstComment').value = opts.prefillFirstComment;
  }

  toggleComposerEmojiPanel(false);
  renderComposerEmojiUI();
  document.getElementById('postCaption').dispatchEvent(new Event('input'));
  modal.classList.remove('hidden');
}

window.openComposerModal = openComposerModal;

function closeComposerModal() {
  document.getElementById('composerModal').classList.add('hidden');
}

// ==========================================
// PWA INSTALL & BROWSER PUSH NOTIFICATIONS
// ==========================================
function initPwaAndNotifications() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  const btnInstall = document.getElementById('btnInstallPwa');
  const btnInstallDrawer = document.getElementById('btnDrawerInstallPwa');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btnInstall.classList.remove('hidden');
    btnInstallDrawer?.classList.remove('hidden');
  });

  btnInstall.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    btnInstall.classList.add('hidden');
    btnInstallDrawer?.classList.add('hidden');
  });

  document.getElementById('btnEnableNotifications').addEventListener('click', async () => {
    if (!('Notification' in window)) {
      showToast('Tu navegador no soporta notificaciones nativas.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      showToast('🔔 ¡Alertas Push activadas en SHEEP 100!');
      new Notification('SHEEP 100', {
        body: 'Las notificaciones de tus Posts e Historias programadas están activas.',
        icon: './logo.png'
      });
    } else {
      showToast('Permiso de notificaciones denegado en el navegador.');
    }
  });
}

function checkDueNotifications() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  appState.posts.forEach((p) => {
    if (p.status === 'published' && p.publishedAt && !notifiedPostIds.has(p.id)) {
      const ageMs = Date.now() - new Date(p.publishedAt).getTime();
      if (ageMs < 60000) {
        notifiedPostIds.add(p.id);
        new Notification(`✅ Publicado en SHEEP 100: ${p.title}`, {
          body: isPostStory(p)
            ? 'Tu Historia 24h ya fue publicada automáticamente.'
            : 'Tu Post programado ya fue publicado automáticamente.',
          icon: './logo.png'
        });
      }
    }
  });
}

// ==========================================
// UTILITIES
// ==========================================
window.copyText = async function (text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`📋 Copiado: "${text.slice(0, 35)}${text.length > 35 ? '...' : ''}"`);
  } catch (_) {
    showToast('No se pudo copiar automáticamente.');
  }
};

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

function toLocalDateInputValue(d) {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
}

function toLocalDateTimeInputValue(d) {
  const datePart = toLocalDateInputValue(d);
  const hr = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${datePart}T${hr}:${mi}`;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
