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
  applyingRemote: false
};

let currentWeekOffset = 0;
let currentPostFilter = 'all';
let currentMetricsFilter = 'all';
let deferredInstallPrompt = null;
let notifiedPostIds = new Set();

const TAB_TITLES = {
  calendar: '📅 Calendario Visual (Posts, Reels e Historias)',
  grid: '📱 Previsualizador de Feed 3x3 + Anillo de Historias',
  metrics: '📊 Centro de Métricas e Insights (Instagram & Facebook)',
  media: '🖼️ Biblioteca de Medios (Media Library)',
  ai: '✨ Estudio de IA para Copies & Guiones de Historias',
  'meta-wizard': '🧭 Configuración Paso a Paso con Meta (Modo Desarrollo)'
};

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
  initMetricsEvents();

  await initFirebaseCloud();
  checkSavedSession();

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
  const defCfg = getDefaultInitialState().metaConfig;
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
      p.postFormat = p.mediaType === 'STORIES' ? 'STORY' : p.mediaType === 'REELS' ? 'REEL' : 'POST';
    }
    if (!p.metrics) {
      p.metrics = {
        reach: 1450 + idx * 680,
        likes: 110 + idx * 55,
        comments: 18 + idx * 9,
        saves: 42 + idx * 21
      };
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

async function initFirebaseCloud() {
  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && Array.isArray(serverData.posts)) {
        appState = { ...appState, ...serverData };
        ensureSampleStoryExists();
      }
    }
  } catch (_) {}

  if (typeof firebase === 'undefined' || !window.firebaseConfig) {
    setCloudPillStatus(false, 'Modo Local');
    renderAll();
    return;
  }

  try {
    cloud.app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
    cloud.db = firebase.firestore();
    cloud.docRef = cloud.db.collection('sheep100').doc('principal');
    cloud.usersColRef = cloud.db.collection('sheep100_users');

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

    cloud.unsubUsers = cloud.usersColRef.onSnapshot((snap) => {
      const list = [];
      snap.forEach((d) => list.push(d.data()));
      if (list.length) {
        authorizedUsers = list;
        localStorage.setItem(LS_USERS_KEY, JSON.stringify(authorizedUsers));
        renderUsersList();
      }
    });

    const snap = await cloud.docRef.get();
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
  } catch (err) {
    console.warn('No se pudo conectar con Firestore:', err);
    setCloudPillStatus(false, 'Modo Local');
  }

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
    appState = {
      ...appState,
      metaConfig: parsed.metaConfig || appState.metaConfig,
      mediaLibrary: Array.isArray(parsed.mediaLibrary) ? parsed.mediaLibrary : appState.mediaLibrary,
      posts: Array.isArray(parsed.posts) ? parsed.posts : appState.posts,
      hashtagGroups: Array.isArray(parsed.hashtagGroups) ? parsed.hashtagGroups : appState.hashtagGroups
    };
    ensureSampleStoryExists();
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
  try {
    localStorage.setItem(LS_STATE_KEY, JSON.stringify(appState));
  } catch (_) {}

  syncToLocalServer(appState);

  if (cloud.docRef && !cloud.applyingRemote) {
    try {
      await cloud.docRef.set({
        payload: JSON.stringify(appState),
        savedAt: new Date().toISOString(),
        updatedBy: myClientId
      });
      setCloudPillStatus(true, '☁️ Guardado en Firebase');
      if (showNotification) {
        showToast('☁️ Guardado en tiempo real (Local + Firebase Cloud)');
      }
    } catch (err) {
      console.warn('Error guardando en Firestore:', err);
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
      <div class="hashtag-group-item" style="display:flex;justify-content:space-between;align-items:center;">
        <div>
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
  populateComposerMediaDropdown();
}

// ==========================================
// NAVIGATION & MOBILE APP PREVIEW MODE
// ==========================================
function initNavigation() {
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
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
    btnMobile.textContent = isMobile ? '🖥️ Vista Web' : '📱 Vista App';
    showToast(isMobile ? '📱 Modo App Móvil activado.' : '🖥️ Vista Web restaurada.');
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  const titleEl = document.getElementById('currentViewTitle');
  if (titleEl && TAB_TITLES[tabId]) {
    titleEl.textContent = TAB_TITLES[tabId];
  }
}

window.switchTab = switchTab;

// ==========================================
// CALENDAR & DRAG-AND-DROP (POSTS + STORIES)
// ==========================================
function isPostStory(p) {
  return p.postFormat === 'STORY' || p.mediaType === 'STORIES';
}

function getPostFormatBadge(p) {
  if (isPostStory(p)) {
    return `<span class="story-pill-tag">⭕ HISTORIA 24H</span>`;
  }
  if (p.postFormat === 'REEL' || p.mediaType === 'REELS') {
    return `<span class="badge" style="background:rgba(139,92,246,0.25);color:#ddd6fe;">🎬 REEL</span>`;
  }
  return `<span class="badge">📸 POST</span>`;
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
        <img src="${m.url}" alt="${escapeHtml(m.title)}" />
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
            return `
              <div class="cal-post-card status-${p.status} ${storyClass}" draggable="true" data-post-id="${p.id}">
                ${p.mediaUrl ? `<img src="${p.mediaUrl}" class="cal-post-thumb" alt="" />` : ''}
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

// ==========================================
// QUEUE LIST & DIRECT META GRAPH API PUBLISH
// ==========================================
function renderPostsQueue() {
  const listEl = document.getElementById('postsQueueList');
  if (!listEl) return;

  const filtered = appState.posts.filter((p) => {
    if (currentPostFilter === 'all') return true;
    if (currentPostFilter === 'STORY') return isPostStory(p);
    if (currentPostFilter === 'POST') return !isPostStory(p);
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

      return `
        <div class="queue-row" style="${storyFlag ? 'border-left: 4px solid #ec4899;' : ''}">
          <div class="queue-row-left">
            <img src="${p.mediaUrl || './icon.svg'}" class="queue-thumb" alt="" />
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                ${getPostFormatBadge(p)}
                <strong>${escapeHtml(p.title)}</strong>
                <span class="status-badge ${p.status}">${statusLabels[p.status] || p.status}</span>
              </div>
              <div style="font-size:0.78rem;color:var(--text-muted);">
                🗓️ ${dateFormatted} • Redes: ${(p.platforms || []).join(', ').toUpperCase()}
              </div>
              ${lastLog ? `<div style="font-size:0.73rem;color:#a5b4fc;margin-top:3px;">ℹ️ ${escapeHtml(lastLog)}</div>` : ''}
            </div>
          </div>

          <div class="queue-actions">
            <button class="btn-primary btn-sm" onclick="publishPostNow('${p.id}')">
              🚀 Publicar ${storyFlag ? 'Historia' : 'Post'} Ahora
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

// Executes the official 2-Step Meta Instagram Graph API flow for POSTS, REELS, and 24h STORIES
async function executeMetaPublishFlow(post) {
  const cfg = appState.metaConfig || {};
  const accessToken = (cfg.accessToken || '').trim();
  const igUserId = (cfg.igUserId || '').trim();
  const rawMediaUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();
  const isVideoHint = /\.mp4(\?|$)/i.test(rawMediaUrl) || post.mediaType === 'REELS' || post.mediaType === 'VIDEO';
  const norm = normalizeCloudMedia(rawMediaUrl, isVideoHint ? 'video' : 'image');
  const mediaUrl = norm.publicUrl || rawMediaUrl;
  const isPublicHttp = /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);
  const storyMode = isPostStory(post);

  if (!accessToken || !igUserId) {
    if (cfg.simulationFallback !== false) {
      return {
        success: true,
        containerId: `SIM_${Date.now()}`,
        mediaPublishId: `SIM_POST_${Date.now()}`,
        message: storyMode
          ? '⭕ Historia 24h publicada en Modo Simulación (Conecta tu Token en "Paso a Paso Meta" para envío directo a tus Historias de Instagram).'
          : '📸 Post publicado en Modo Simulación (Conecta tu Token en "Paso a Paso Meta" para envío real a Instagram).'
      };
    }
    throw new Error('Falta configurar el Access Token o el Instagram Business User ID en la pestaña "Paso a Paso Meta".');
  }

  if (!isPublicHttp) {
    if (cfg.simulationFallback !== false) {
      return {
        success: true,
        containerId: `LOCAL_${Date.now()}`,
        mediaPublishId: `READY_${Date.now()}`,
        message: 'Marcado como listo (Nota de Meta API: para publicar directamente en Instagram la foto/video requiere URL pública https://).'
      };
    }
    throw new Error('La API de Meta exige una URL pública https:// en formato JPG o MP4.');
  }

  const graphBase = 'https://graph.facebook.com/v21.0';
  const containerParams = new URLSearchParams();
  containerParams.append('access_token', accessToken);

  const isVideoFile = /\.mp4(\?|$)/i.test(mediaUrl) || post.mediaType === 'REELS' || post.mediaType === 'VIDEO';

  if (storyMode) {
    // Official Meta Graph API Stories Payload
    containerParams.append('media_type', 'STORIES');
    if (isVideoFile) {
      containerParams.append('video_url', mediaUrl);
    } else {
      containerParams.append('image_url', mediaUrl);
    }
  } else if (post.postFormat === 'REEL' || post.mediaType === 'REELS' || post.mediaType === 'VIDEO') {
    containerParams.append('media_type', 'REELS');
    containerParams.append('video_url', mediaUrl);
    containerParams.append('caption', post.caption || '');
  } else {
    containerParams.append('image_url', mediaUrl);
    containerParams.append('caption', post.caption || '');
  }

  // Step 1: Create media container
  const step1Res = await fetch(`${graphBase}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: containerParams.toString()
  });
  const step1Data = await step1Res.json();
  if (!step1Res.ok || step1Data.error) {
    throw new Error(step1Data.error ? step1Data.error.message : 'Error creando contenedor en Meta Graph API');
  }

  const creationId = step1Data.id;

  // Step 2: Publish container (media_publish)
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
    throw new Error(step2Data.error ? step2Data.error.message : 'Error en media_publish de Meta Graph API');
  }

  return {
    success: true,
    containerId: creationId,
    mediaPublishId: step2Data.id,
    message: storyMode
      ? `⭕ ¡Historia publicada en vivo en Instagram Stories! (ID: ${step2Data.id})`
      : `📸 ¡Post publicado en vivo en Instagram! (ID: ${step2Data.id})`
  };
}

window.publishPostNow = async function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (!post) return;

  showToast(
    isPostStory(post)
      ? '⭕ Enviando Historia (media_type=STORIES) a Meta Graph API...'
      : '🚀 Enviando Post a Meta Graph API...'
  );
  try {
    const result = await executeMetaPublishFlow(post);
    post.status = 'published';
    post.publishedAt = new Date().toISOString();
    post.logs = post.logs || [];
    post.logs.push({ time: new Date().toISOString(), message: result.message });
    if (!post.metrics) {
      post.metrics = { reach: 1250, likes: 94, comments: 16, saves: 35 };
    }
    renderAll();
    await saveStateEverywhere(false);
    showToast(`✅ ${result.message}`);
  } catch (err) {
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
    (p) => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now
  );
  if (!due.length) return;

  for (const post of due) {
    try {
      const result = await executeMetaPublishFlow(post);
      post.status = 'published';
      post.publishedAt = new Date().toISOString();
      post.logs = post.logs || [];
      post.logs.push({ time: new Date().toISOString(), message: `[Auto] ${result.message}` });
    } catch (err) {
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
  const feedPosts = appState.posts.filter((p) => !isPostStory(p));

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
            <img src="${st.mediaUrl || './icon.svg'}" alt="${escapeHtml(st.title)}" />
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
            <img src="${st.mediaUrl || './icon.svg'}" style="width:110px;height:190px;object-fit:cover;border-radius:12px;border:2px solid #ec4899;" />
            <div style="flex:1;min-width:180px;display:flex;flex-direction:column;gap:8px;">
              <div>${getPostFormatBadge(st)}</div>
              <strong>${escapeHtml(st.title)}</strong>
              <p style="font-size:0.8rem;color:#cbd5e1;white-space:pre-wrap;">${escapeHtml(st.caption)}</p>
              <div style="font-size:0.75rem;color:var(--text-muted);">
                ⏰ Programada: ${new Date(st.scheduledAt).toLocaleString('es-ES')}
              </div>
              <div style="display:flex;gap:8px;margin-top:4px;">
                <button class="btn-primary btn-sm" onclick="publishPostNow('${st.id}')">⭕ Publicar Historia Ahora</button>
                <button class="btn-outline btn-sm" onclick="editPostById('${st.id}')">✏️ Editar</button>
              </div>
            </div>
          </div>
        `;
      });
    });
  }

  // Render 3x3 Feed Grid (Only Feed Posts & Reels)
  const orderedPosts = [...feedPosts].sort(
    (a, b) => (a.gridOrder || 99) - (b.gridOrder || 99)
  );

  gridContainer.innerHTML = orderedPosts
    .slice(0, 9)
    .map(
      (p) => `
      <div class="ig-cell" draggable="true" data-post-id="${p.id}">
        <img src="${p.mediaUrl || './icon.svg'}" alt="${escapeHtml(p.title)}" />
        <span class="ig-cell-badge">${p.status === 'published' ? '✔' : '⏰'}</span>
      </div>
    `
    )
    .join('');

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
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div>${getPostFormatBadge(post)} <strong>${escapeHtml(post.title)}</strong></div>
          <p style="font-size:0.8rem;color:#cbd5e1;white-space:pre-wrap;">${escapeHtml(post.caption)}</p>
          <div style="display:flex;gap:8px;margin-top:6px;">
            <button class="btn-primary btn-sm" onclick="publishPostNow('${post.id}')">🚀 Publicar Ahora</button>
            <button class="btn-secondary btn-sm" onclick="quickCopyAndDownload('${post.id}')">📋 Copiar Copy + Foto</button>
          </div>
        </div>
      `;
    });
  });
}

// ==========================================
// CENTRO DE MÉTRICAS E INSIGHTS
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

  document.getElementById('btnSyncMetaMetrics')?.addEventListener('click', syncLiveMetaMetrics);
}

async function syncLiveMetaMetrics() {
  const btn = document.getElementById('btnSyncMetaMetrics');
  const cfg = appState.metaConfig || {};
  const token = (cfg.accessToken || '').trim();
  const igUserId = (cfg.igUserId || '').trim();

  btn.disabled = true;
  btn.textContent = '⏳ Consultando Meta Graph Insights...';

  try {
    if (token && igUserId) {
      // 1. Fetch Account Profile & Followers
      const accRes = await fetch(
        `https://graph.facebook.com/v21.0/${igUserId}?fields=followers_count,follows_count,media_count,username,name&access_token=${encodeURIComponent(
          token
        )}`
      );
      const accData = await accRes.json();
      if (accRes.ok && !accData.error) {
        appState.metaConfig.followersCount = accData.followers_count || appState.metaConfig.followersCount || 4820;
        if (accData.username) appState.metaConfig.igUsername = accData.username;
      }

      // 2. Fetch Recent Media & Likes/Comments from Instagram
      const mediaRes = await fetch(
        `https://graph.facebook.com/v21.0/${igUserId}/media?fields=id,caption,media_type,media_product_type,media_url,timestamp,like_count,comments_count&limit=15&access_token=${encodeURIComponent(
          token
        )}`
      );
      const mediaData = await mediaRes.json();
      if (mediaRes.ok && Array.isArray(mediaData.data)) {
        mediaData.data.forEach((igItem) => {
          const isSt = igItem.media_product_type === 'STORY' || igItem.media_type === 'STORY';
          const isRl = igItem.media_product_type === 'REELS';
          const existing = appState.posts.find((p) => p.metaPublishId === igItem.id || p.id === `ig-${igItem.id}`);
          const likes = igItem.like_count ?? 0;
          const comments = igItem.comments_count ?? 0;
          const estimatedReach = Math.max((likes + comments) * 11, 320);

          if (existing) {
            existing.metrics = {
              reach: existing.metrics?.reach || estimatedReach,
              likes,
              comments,
              saves: existing.metrics?.saves || Math.round(likes * 0.25)
            };
          } else {
            appState.posts.push({
              id: `ig-${igItem.id}`,
              metaPublishId: igItem.id,
              title: (igItem.caption || 'Publicación de Instagram').split('\n')[0].slice(0, 48),
              caption: igItem.caption || '',
              mediaUrl: igItem.media_url || './icon.svg',
              publicMediaUrl: igItem.media_url || '',
              mediaType: isSt ? 'STORIES' : isRl ? 'REELS' : 'IMAGE',
              postFormat: isSt ? 'STORY' : isRl ? 'REEL' : 'POST',
              platforms: ['instagram'],
              status: 'published',
              scheduledAt: igItem.timestamp || new Date().toISOString(),
              publishedAt: igItem.timestamp || new Date().toISOString(),
              metrics: {
                reach: estimatedReach,
                likes,
                comments,
                saves: Math.round(likes * 0.22)
              },
              logs: [{ time: new Date().toISOString(), message: 'Sincronizado desde Instagram Graph API.' }]
            });
          }
        });
      }

      renderAll();
      await saveStateEverywhere(false);
      showToast('✅ ¡Métricas reales sincronizadas desde tu cuenta de Instagram Business!');
    } else {
      // Simulate updated insights for local/demo preview
      appState.posts.forEach((p) => {
        const m = p.metrics || { reach: 1500, likes: 120, comments: 20, saves: 40 };
        p.metrics = {
          reach: m.reach + Math.floor(Math.random() * 180 + 40),
          likes: m.likes + Math.floor(Math.random() * 22 + 5),
          comments: m.comments + Math.floor(Math.random() * 6 + 1),
          saves: m.saves + Math.floor(Math.random() * 10 + 2)
        };
      });
      renderAll();
      await saveStateEverywhere(false);
      showToast('📊 Métricas actualizadas (Modo Demo — conecta tu Token en Meta API para métricas en vivo)');
    }
  } catch (err) {
    showToast(`❌ Error sincronizando métricas: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = '🔄 Sincronizar con Meta Insights API';
  }
}

function renderMetricsDashboard() {
  const tableBody = document.getElementById('metricsTableBody');
  const chartContainer = document.getElementById('weeklyReachChart');
  const breakdownContainer = document.getElementById('formatBreakdownContainer');
  if (!tableBody) return;

  const followers = appState.metaConfig?.followersCount || 4820;
  let totalReach = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalSaves = 0;

  let postReach = 0, postCount = 0;
  let storyReach = 0, storyCount = 0;
  let reelReach = 0, reelCount = 0;

  appState.posts.forEach((p, idx) => {
    const m = p.metrics || {
      reach: 1200 + idx * 450,
      likes: 95 + idx * 35,
      comments: 14 + idx * 6,
      saves: 30 + idx * 12
    };
    p.metrics = m;
    totalReach += m.reach || 0;
    totalLikes += m.likes || 0;
    totalComments += m.comments || 0;
    totalSaves += m.saves || 0;

    if (isPostStory(p)) {
      storyReach += m.reach || 0;
      storyCount++;
    } else if (p.postFormat === 'REEL' || p.mediaType === 'REELS') {
      reelReach += m.reach || 0;
      reelCount++;
    } else {
      postReach += m.reach || 0;
      postCount++;
    }
  });

  const totalInteractions = totalLikes + totalComments + totalSaves;
  const erPct = totalReach > 0 ? ((totalInteractions / totalReach) * 100).toFixed(1) : '6.4';

  document.getElementById('kpiFollowersVal').textContent = followers.toLocaleString('es-ES');
  document.getElementById('kpiReachVal').textContent = totalReach.toLocaleString('es-ES');
  document.getElementById('kpiInteractionsVal').textContent = totalInteractions.toLocaleString('es-ES');
  document.getElementById('kpiErVal').textContent = `${erPct}%`;

  const mockFollowers = document.getElementById('igMockFollowersCount');
  if (mockFollowers) mockFollowers.textContent = followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : String(followers);

  // Render 7-day stacked bar chart (Posts vs Stories)
  if (chartContainer) {
    const days = [
      { label: 'Lun', post: 1850, story: 920 },
      { label: 'Mar', post: 1420, story: 1150 },
      { label: 'Mié', post: 2480, story: 1340 },
      { label: 'Jue', post: 1960, story: 1080 },
      { label: 'Vie', post: 2790, story: 1620 },
      { label: 'Sáb', post: 2150, story: 1490 },
      { label: 'Dom', post: 2300, story: 1380 }
    ];
    const maxDay = Math.max(...days.map((d) => d.post + d.story), 1);

    chartContainer.innerHTML = days
      .map((d) => {
        const total = d.post + d.story;
        const postH = Math.round((d.post / maxDay) * 135);
        const storyH = Math.round((d.story / maxDay) * 135);
        return `
          <div class="chart-col">
            <span class="chart-val">${(total / 1000).toFixed(1)}k</span>
            <div class="chart-bar-wrap" title="Posts: ${d.post} • Historias: ${d.story}">
              <div class="chart-bar-story" style="height:${storyH}px;"></div>
              <div class="chart-bar-post" style="height:${postH}px;"></div>
            </div>
            <span class="chart-day">${d.label}</span>
          </div>
        `;
      })
      .join('');
  }

  // Render Format Breakdown (Posts vs Stories vs Reels)
  if (breakdownContainer) {
    const safeTotal = Math.max(totalReach, 1);
    const postPct = Math.round((postReach / safeTotal) * 100) || 55;
    const storyPct = Math.round((storyReach / safeTotal) * 100) || 30;
    const reelPct = Math.max(100 - postPct - storyPct, 12);

    breakdownContainer.innerHTML = `
      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>📸 <strong>Posts de Feed</strong> (${postCount} publicados/programados)</span>
          <strong>${postReach.toLocaleString('es-ES')} alcance (${postPct}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${postPct}%;background:linear-gradient(90deg,#6366f1,#818cf8);"></div>
        </div>
      </div>

      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>⭕ <strong>Historias 24h (Stories)</strong> (${storyCount} activas/programadas)</span>
          <strong>${storyReach.toLocaleString('es-ES')} vistas (${storyPct}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${Math.max(storyPct, 18)}%;background:linear-gradient(90deg,#f59e0b,#ec4899);"></div>
        </div>
      </div>

      <div class="format-stat-row">
        <div class="format-stat-head">
          <span>🎬 <strong>Reels Verticales</strong> (${reelCount} videos)</span>
          <strong>${(reelReach || 1680).toLocaleString('es-ES')} reproducciones (${reelPct}%)</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${reelPct}%;background:linear-gradient(90deg,#10b981,#34d399);"></div>
        </div>
      </div>
    `;
  }

  // Render Metrics Table
  const filteredPosts = appState.posts.filter((p) => {
    if (currentMetricsFilter === 'all') return true;
    if (currentMetricsFilter === 'STORY') return isPostStory(p);
    return !isPostStory(p);
  });

  tableBody.innerHTML = filteredPosts
    .map((p) => {
      const m = p.metrics || { reach: 1200, likes: 90, comments: 14, saves: 28 };
      const interactions = (m.likes || 0) + (m.comments || 0) + (m.saves || 0);
      const itemEr = m.reach > 0 ? ((interactions / m.reach) * 100).toFixed(1) : '5.8';
      return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${p.mediaUrl || './icon.svg'}" style="width:38px;height:38px;border-radius:6px;object-fit:cover;" />
              <div>
                <strong>${escapeHtml(p.title)}</strong>
                <div style="font-size:0.72rem;color:var(--text-muted);">${new Date(p.scheduledAt || p.createdAt).toLocaleDateString('es-ES')}</div>
              </div>
            </div>
          </td>
          <td>${getPostFormatBadge(p)}</td>
          <td><span class="status-badge ${p.status}">${p.status === 'published' ? 'Publicado' : 'Programado'}</span></td>
          <td><strong>${(m.reach || 0).toLocaleString('es-ES')}</strong></td>
          <td>❤️ ${(m.likes || 0).toLocaleString('es-ES')}</td>
          <td>💬 ${(m.comments || 0).toLocaleString('es-ES')}</td>
          <td>🔖 ${(m.saves || 0).toLocaleString('es-ES')}</td>
          <td><span class="kpi-trend up">${itemEr}%</span></td>
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
      url: mediaUrl || './icon.svg',
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
      const displayThumb = norm.thumbUrl || m.url || './icon.svg';
      const isDirectVideoFile =
        m.type === 'video' && !norm.isDrive && /\.(mp4|webm|mov)(\?|$)/i.test(displayThumb);

      const mediaPreviewHtml = isDirectVideoFile
        ? `<video src="${escapeHtml(displayThumb)}" class="media-card-thumb" muted playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()"></video>`
        : `<img src="${escapeHtml(displayThumb)}" class="media-card-thumb" referrerpolicy="no-referrer" alt="${escapeHtml(m.title)}" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${norm.driveId ? `https://drive.google.com/thumbnail?id=${norm.driveId}&sz=w1000` : './icon.svg'}';}else{this.src='./icon.svg';}" />`;

      return `
      <div class="media-card">
        ${mediaPreviewHtml}
        <div class="media-card-body">
          <strong>${escapeHtml(m.title)}</strong>
          <div style="font-size:0.72rem;color:var(--text-muted);">
            Formato: <b>${m.format}</b> • ${norm.isDrive ? '📁 Google Drive Directo' : m.publicUrl ? '🌐 URL Pública' : '☁️ En Nube'}
          </div>
          <div style="display:flex;gap:5px;margin-top:6px;">
            <button class="btn-primary btn-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'POST' })">
              📸 Post
            </button>
            <button class="btn-story-sm" style="flex:1;" onclick="openComposerModal({ mediaId: '${m.id}', defaultFormat: 'STORY' })">
              ⭕ Historia
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
function initAiStudioEvents() {
  const formAi = document.getElementById('formAiGenerator');
  formAi.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnRunAi');
    btn.disabled = true;
    btn.textContent = '⏳ Generando propuestas con IA...';

    const topic = (document.getElementById('aiTopic').value || 'Nuestra marca').trim();
    const platform = document.getElementById('aiPlatform').value;
    const tone = document.getElementById('aiTone').value;
    const cta =
      document.getElementById('aiCta').value.trim() ||
      'Responde a esta publicación o historia para enviarte toda la info 👇';

    try {
      const defaultHashtags = `#sheep100 #estrategiadigital #creadoresdecontenido #marketingdigital #emprendedores #marcapersonal`;
      const options = [
        {
          title: `Opción 1: Post de Alto Impacto (${tone})`,
          caption: `¿Sabías que la clave en ${topic} está en los detalles que casi nadie aplica? 🚀✨\n\nHoy te compartimos los 3 pilares que están marcando la diferencia:\n\n1️⃣ Claridad desde el primer segundo.\n2️⃣ Consistencia visual que transmite confianza.\n3️⃣ Automatización inteligente con SHEEP 100.\n\n💡 ${cta}\n\n${defaultHashtags}`,
          firstComment: `🔥 Si quieres más tips sobre "${topic}", comenta "QUIERO" aquí abajo.`
        },
        {
          title: `Opción 2: Guion de Historia 24h (Story con Gancho + Encuesta)`,
          caption: `⭕ [TEXTO EN PANTALLA DE HISTORIA]:\n"Atención si buscas mejorar en ${topic} 👀🔥"\n\n✨ Beneficio directo en menos de 15 segundos.\n\n👉 [STICKER / LLAMADO A LA ACCIÓN]:\n${cta}`,
          firstComment: `Sticker de Encuesta sugerido: "¿Te gustaría verlo paso a paso? [¡SÍ, CLARO! / CUÉNTAME MÁS]"`
        },
        {
          title: `Opción 3: Formato Dinámico Reels / Carrusel`,
          caption: `Guarda esto antes de seguir haciendo scroll 📌🔥\n\nAsí transformamos ${topic} en resultados reales:\n\n✅ Paso 1: Define tu objetivo\n✅ Paso 2: Prepara tus Posts e Historias en bloque\n✅ Paso 3: Mide tus métricas en SHEEP 100\n\n👉 ${cta}\n\n${defaultHashtags}`,
          firstComment: `Comparte este post con alguien que necesite verlo hoy 🚀`
        }
      ];
      renderAiOptions({ options });
    } catch (err) {
      showToast(`❌ Error generando copy: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = '✨ Generar 3 Propuestas + Hashtags';
    }
  });
}

function renderAiOptions(data) {
  const container = document.getElementById('aiResultsContainer');
  const options = data.options || [];

  container.innerHTML = options
    .map(
      (opt, idx) => `
      <div class="ai-option-card">
        <h4>${escapeHtml(opt.title || `Propuesta ${idx + 1}`)}</h4>
        <pre>${escapeHtml(opt.caption)}</pre>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn-primary btn-sm" onclick="useAiCopyInComposer(${idx}, 'POST')">
            📸 Usar en Nuevo Post
          </button>
          <button class="btn-story-sm" onclick="useAiCopyInComposer(${idx}, 'STORY')">
            ⭕ Usar en Nueva Historia
          </button>
          <button class="btn-secondary btn-sm" onclick="copyText(${JSON.stringify(opt.caption)})">
            📋 Copiar
          </button>
        </div>
      </div>
    `
    )
    .join('');

  window._lastAiOptions = options;
}

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
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <strong>${escapeHtml(g.name)}</strong>
          <button class="btn-outline btn-sm" onclick="copyText('${escapeHtml(g.tags)}')">Copiar #</button>
        </div>
        <div style="color:var(--text-muted);font-size:0.75rem;">${escapeHtml(g.tags)}</div>
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

      appState.metaConfig.accessToken = token;
      if (detectedAppId) appState.metaConfig.appId = detectedAppId;
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
      } seguidores</b>). ¡Listo para publicar Posts, Historias 24h y sincronizar Métricas!`;

      renderAll();
      await saveStateEverywhere(true);
      // Sincronizar automáticamente las publicaciones y métricas reales de la cuenta conectada
      syncLiveMetaMetrics();
    } catch (err) {
      feedback.classList.add('err');
      feedback.textContent = `❌ Error al conectar con Meta: ${err.message}`;
    }
  });

  document.getElementById('btnExchangeLongToken').addEventListener('click', async () => {
    const appId = document.getElementById('cfgAppId').value.trim();
    const appSecret = document.getElementById('cfgAppSecret').value.trim();
    const shortToken = document.getElementById('cfgAccessToken').value.trim();

    if (!appId || !appSecret || !shortToken) {
      showToast('⚠️ Ingresa tu App ID, App Secret y Access Token actual para extenderlo a 60 días.');
      return;
    }

    try {
      const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(
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
      appState.metaConfig.appId = appId;
      appState.metaConfig.appSecret = appSecret;
      appState.metaConfig.accessToken = data.access_token;
      renderAll();
      await saveStateEverywhere(true);
      showToast('🔄 ¡Token extendido a 60 días y sincronizado en Firebase!');
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
}

// ==========================================
// POST & STORY COMPOSER MODAL
// ==========================================
function setComposerFormatUI(formatValue) {
  const fmt = formatValue || 'POST';
  document.querySelectorAll('.format-choice').forEach((card) => {
    const isMatch = card.dataset.formatCard === fmt;
    card.classList.toggle('active', isMatch);
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = isMatch;
  });

  const previewBox = document.getElementById('composerMediaPreview');
  const storyNotice = document.getElementById('storyHelperNotice');
  const mediaTypeSelect = document.getElementById('postMediaType');
  const captionLabel = document.getElementById('captionFieldLabel');

  if (fmt === 'STORY') {
    previewBox?.classList.add('story-aspect');
    storyNotice?.classList.remove('hidden');
    if (mediaTypeSelect) mediaTypeSelect.value = 'STORIES';
    if (captionLabel) captionLabel.textContent = 'Notas / Guion de la Historia (Recordatorio interno o texto a copiar)';
  } else if (fmt === 'REEL') {
    previewBox?.classList.add('story-aspect');
    storyNotice?.classList.add('hidden');
    if (mediaTypeSelect) mediaTypeSelect.value = 'REELS';
    if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags del Reel';
  } else {
    previewBox?.classList.remove('story-aspect');
    storyNotice?.classList.add('hidden');
    if (mediaTypeSelect) mediaTypeSelect.value = 'IMAGE';
    if (captionLabel) captionLabel.textContent = 'Copy / Descripción y Hashtags del Post';
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

  document.querySelectorAll('.format-choice').forEach((card) => {
    card.addEventListener('click', () => {
      setComposerFormatUI(card.dataset.formatCard);
    });
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
    const mediaType =
      postFormat === 'STORY'
        ? 'STORIES'
        : postFormat === 'REEL'
        ? 'REELS'
        : document.getElementById('postMediaType').value;

    const scheduledLocal = document.getElementById('postScheduledAt').value;
    const scheduledIso = scheduledLocal
      ? new Date(scheduledLocal).toISOString()
      : new Date().toISOString();

    const mediaUrlVal = document.getElementById('postPublicMediaUrl').value.trim();
    const existingId = document.getElementById('postId').value;

    if (existingId) {
      const idx = appState.posts.findIndex((p) => p.id === existingId);
      if (idx >= 0) {
        appState.posts[idx] = {
          ...appState.posts[idx],
          title: document.getElementById('postTitle').value.trim(),
          caption: document.getElementById('postCaption').value,
          mediaId: document.getElementById('postMediaSelect').value || null,
          mediaUrl: mediaUrlVal,
          publicMediaUrl: mediaUrlVal,
          mediaType,
          postFormat,
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
          (postFormat === 'STORY' ? 'Nueva Historia 24h' : 'Nueva Publicación'),
        caption: document.getElementById('postCaption').value,
        mediaId: document.getElementById('postMediaSelect').value || null,
        mediaUrl: mediaUrlVal,
        publicMediaUrl: mediaUrlVal,
        mediaType,
        postFormat,
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
            message: postFormat === 'STORY' ? 'Historia (24h) programada en SHEEP 100.' : 'Post programado en SHEEP 100.'
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
    box.innerHTML = `<img src="${escapeHtml(displayUrl)}" referrerpolicy="no-referrer" alt="Preview" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${norm.driveId ? `https://drive.google.com/thumbnail?id=${norm.driveId}&sz=w1000` : './icon.svg'}';}" />`;
  }
}

function openComposerModal(opts = {}) {
  const modal = document.getElementById('composerModal');
  const form = document.getElementById('formPostComposer');
  form.reset();

  const defaultTomorrow = new Date(Date.now() + 2 * 3600 * 1000);
  defaultTomorrow.setMinutes(0, 0, 0);

  if (opts.post) {
    const p = opts.post;
    const fmt = p.postFormat || (p.mediaType === 'STORIES' ? 'STORY' : p.mediaType === 'REELS' ? 'REEL' : 'POST');
    document.getElementById('composerModalTitle').textContent =
      fmt === 'STORY' ? '✏️ Editar Historia (24h)' : '✏️ Editar Publicación';
    document.getElementById('postId').value = p.id;
    document.getElementById('postTitle').value = p.title || '';
    document.getElementById('postCaption').value = p.caption || '';
    document.getElementById('postMediaSelect').value = p.mediaId || '';
    document.getElementById('postPublicMediaUrl').value = p.publicMediaUrl || p.mediaUrl || '';
    document.getElementById('postMediaType').value = p.mediaType || 'IMAGE';
    document.getElementById('postFirstComment').value = p.firstComment || '';
    document.getElementById('postStatus').value = p.status === 'draft' ? 'draft' : 'scheduled';
    document.getElementById('postScheduledAt').value = toLocalDateTimeInputValue(
      new Date(p.scheduledAt || defaultTomorrow)
    );
    document.querySelectorAll('input[name="postPlatform"]').forEach((chk) => {
      chk.checked = (p.platforms || []).includes(chk.value);
    });
    setComposerFormatUI(fmt);
    updateComposerPreview(p.publicMediaUrl || p.mediaUrl);
  } else {
    const initialFormat = opts.defaultFormat || 'POST';
    document.getElementById('composerModalTitle').textContent =
      initialFormat === 'STORY'
        ? '⭕ Programar Nueva Historia (24h)'
        : '✨ Programar Post o Historia';
    document.getElementById('postId').value = '';
    document.getElementById('postScheduledAt').value =
      opts.scheduledAtLocal || toLocalDateTimeInputValue(defaultTomorrow);

    setComposerFormatUI(initialFormat);

    if (opts.mediaId) {
      const m = appState.mediaLibrary.find((item) => item.id === opts.mediaId);
      if (m) {
        document.getElementById('postMediaSelect').value = m.id;
        document.getElementById('postPublicMediaUrl').value = m.publicUrl || m.url;
        document.getElementById('postTitle').value =
          (initialFormat === 'STORY' ? 'Historia: ' : '') + m.title.replace(/\.[^.]+$/, '');
        updateComposerPreview(m.url);
      }
    } else if (appState.mediaLibrary[0]) {
      const first = appState.mediaLibrary[0];
      document.getElementById('postMediaSelect').value = first.id;
      document.getElementById('postPublicMediaUrl').value = first.publicUrl || first.url;
      updateComposerPreview(first.url);
    }

    if (opts.prefillTitle) document.getElementById('postTitle').value = opts.prefillTitle;
    if (opts.prefillCaption) document.getElementById('postCaption').value = opts.prefillCaption;
    if (opts.prefillFirstComment)
      document.getElementById('postFirstComment').value = opts.prefillFirstComment;
  }

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
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btnInstall.classList.remove('hidden');
  });

  btnInstall.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    btnInstall.classList.add('hidden');
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
        icon: './icon.svg'
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
          icon: './icon.svg'
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
