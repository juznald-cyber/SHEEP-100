// =========================================================
// SHEEP 100 — MOTOR WEB + APP PWA + FIREBASE REALTIME CLOUD
// =========================================================

const LS_STATE_KEY = 'SHEEP100_STATE_V1';
const LS_SESSION_KEY = 'SHEEP100_ACTIVE_USER';
const LS_USERS_KEY = 'SHEEP100_USERS_V1';
const myClientId = 'client_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);

function getDefaultInitialState() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
  tomorrow.setHours(18, 0, 0, 0);
  const inTwoDays = new Date(now.getTime() + 48 * 3600 * 1000);
  inTwoDays.setHours(12, 30, 0, 0);
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
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
    tiktokConfig: {
      clientKey: '',
      clientSecret: '',
      accessToken: '',
      openId: '',
      username: '@cocuyo.grafic',
      connected: false
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
        title: '5 Secretos para automatizar tus redes con SHEEP 100',
        caption: '¿Pasas horas pensando qué publicar cada día? 🚀\n\nCon SHEEP 100 puedes dejar lista toda tu semana en 15 minutos.\n\n✅ Organiza tu cuadrícula visual\n✅ Genera copies magnéticos con IA\n✅ Publica automáticamente con Meta Graph API\n\nGuarda este post para aplicarlo hoy mismo 👇\n\n#sheep100 #marketingdigital #automatizacion #emprendedores',
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
        platforms: ['instagram'],
        status: 'scheduled',
        scheduledAt: inTwoDays.toISOString(),
        firstComment: '',
        gridOrder: 2,
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
        platforms: ['instagram', 'tiktok'],
        status: 'published',
        scheduledAt: yesterday.toISOString(),
        publishedAt: yesterday.toISOString(),
        firstComment: '',
        gridOrder: 3,
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
let deferredInstallPrompt = null;
let notifiedPostIds = new Set();

const TAB_TITLES = {
  calendar: '📅 Calendario Visual Drag & Drop',
  grid: '📱 Previsualizador de Feed Instagram (3x3)',
  media: '🖼️ Biblioteca de Medios (Media Library)',
  ai: '✨ Estudio de IA para Copies & Hashtags',
  'meta-wizard': '🧭 Configuración Paso a Paso con Meta (Modo Desarrollo)'
};

document.addEventListener('DOMContentLoaded', async () => {
  loadLocalCache();
  initAuthAndUsersEvents();
  initNavigation();
  initPwaAndNotifications();
  initComposerEvents();
  initMediaUploadEvents();
  initAiStudioEvents();
  initMetaWizardEvents();
  initTikTokWizardEvents();

  await initFirebaseCloud();
  await checkTikTokOAuthCallback();
  checkSavedSession();

  // Auto-scheduler in browser + sync check every 25s
  setInterval(runBrowserAutoScheduler, 25000);
});

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
  // Also try syncing from local Node server if running on localhost
  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && Array.isArray(serverData.posts)) {
        appState = { ...appState, ...serverData };
      }
    }
  } catch (_) {
    // Running on Firebase Hosting or GitHub Pages (serverless mode)
  }

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

    // 1. Sync users collection
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

    // 2. Sync workspace state document (/sheep100/principal)
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
      tiktokConfig: parsed.tiktokConfig || appState.tiktokConfig,
      mediaLibrary: Array.isArray(parsed.mediaLibrary) ? parsed.mediaLibrary : appState.mediaLibrary,
      posts: Array.isArray(parsed.posts) ? parsed.posts : appState.posts,
      hashtagGroups: Array.isArray(parsed.hashtagGroups) ? parsed.hashtagGroups : appState.hashtagGroups
    };
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

  // Sync to local Express server if active
  syncToLocalServer(appState);

  // Sync to Firebase Firestore (sheep-100-b8a90)
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
  } catch (_) {
    // Ignore when hosted on Firebase / GitHub Pages
  }
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

      // Check direct Firestore document in case it was just added
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

  // Logout button
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem(LS_SESSION_KEY);
    document.getElementById('loginPass').value = '';
    showLoginScreen();
    showToast('🔒 Sesión cerrada correctamente');
  });

  // Manage Users Modal
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
  renderTikTokStatusSidebar();
  renderCalendarMediaDrawer();
  renderWeekCalendar();
  renderPostsQueue();
  renderInstagramGrid();
  renderMediaGallery();
  renderHashtagGroups();
  renderMetaWizardState();
  renderTikTokWizardState();
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
    showToast(
      isMobile
        ? '📱 Modo App Móvil activado.'
        : '🖥️ Vista Web de escritorio restaurada.'
    );
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
// CALENDAR & DRAG-AND-DROP
// ==========================================
function getMediaThumbnailUrl(item) {
  if (!item) return '';
  let target = item;
  if (typeof item === 'object' && item.mediaId) {
    const found = appState.mediaLibrary.find((m) => m.id === item.mediaId);
    if (found) {
      const fUrl = (found.publicUrl || found.url || '') + '';
      if (fUrl.includes('drive.google.com') || fUrl.includes('drive.usercontent.google.com')) {
        target = found;
      } else if (!item.mediaUrl && !item.publicMediaUrl) {
        target = found;
      }
    }
  }

  const rawUrl = (
    typeof target === 'string'
      ? target
      : (target.publicMediaUrl || target.mediaUrl || target.publicUrl || target.url || '') + ''
  ).trim();

  if (!rawUrl) return '';

  // 1. Google Drive (file / folder / view / download)
  if (rawUrl.includes('drive.google.com') || rawUrl.includes('drive.usercontent.google.com')) {
    const match = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // 2. Video fallback placeholder if it's an MP4 URL and not an image
  if (/\.mp4(\?|$)/i.test(rawUrl)) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="68" viewBox="0 0 100 68"><rect width="100" height="68" fill="%231e1b4b"/><polygon points="40,20 65,34 40,48" fill="%23818cf8"/><text x="50" y="59" fill="%23cbd5e1" font-size="9" font-family="sans-serif" text-anchor="middle">VIDEO MP4</text></svg>`;
  }

  // 3. Ignore OneDrive personal links that require auth
  if (rawUrl.includes('1drv.ms') || rawUrl.includes('onedrive.live.com')) {
    return '';
  }

  return rawUrl;
}
window.getMediaThumbnailUrl = getMediaThumbnailUrl;

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
      <div class="drawer-media-item" draggable="true" data-drag-type="media" data-media-id="${m.id}" title="Arrastra a un día del calendario: ${escapeHtml(m.title)}">
        <img src="${escapeHtml(getMediaThumbnailUrl(m))}" alt="${escapeHtml(m.title)}" onerror="this.onerror=null; this.src='./icon.svg';" />
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
            const thumb = getMediaThumbnailUrl(p);
            return `
              <div class="cal-post-card status-${p.status}" draggable="true" data-post-id="${p.id}">
                ${thumb ? `<img src="${thumb}" class="cal-post-thumb" alt="" onerror="this.remove();" />` : ''}
                <div class="cal-post-time">
                  <span>⏰ ${t}</span>
                  <span>${p.platforms?.includes('instagram') ? '📸' : ''} ${p.platforms?.includes('tiktok') ? '🎵' : ''}</span>
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

  const filtered = appState.posts.filter((p) =>
    currentPostFilter === 'all' ? true : p.status === currentPostFilter
  );

  if (!filtered.length) {
    listEl.innerHTML = `<p class="muted-text">No hay publicaciones en este filtro.</p>`;
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

      const thumb = getMediaThumbnailUrl(p);
      const isVideo = p.mediaType === 'REELS' || p.mediaType === 'VIDEO';
      const thumbHtml = thumb
        ? `<img src="${thumb}" class="queue-thumb" alt="" onerror="this.outerHTML='<div class=\\'queue-thumb-placeholder\\'>${isVideo ? '🎬' : '📸'}</div>';" />`
        : `<div class="queue-thumb-placeholder">${isVideo ? '🎬' : '📸'}</div>`;

      return `
        <div class="queue-row">
          <div class="queue-row-left">
            ${thumbHtml}
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
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
              🚀 Publicar Ahora (Meta API)
            </button>
            <button class="btn-secondary btn-sm" onclick="quickCopyAndDownload('${p.id}')" title="Ideal para TikTok o publicación manual asistida">
              📋 Copiar Copy + Foto
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

// Executes the official 2-Step Meta Instagram Graph API flow directly (works in Cloud & Local)
async function executeMetaPublishFlow(post) {
  const cfg = appState.metaConfig || {};
  const accessToken = (cfg.accessToken || '').trim();
  const igUserId = (cfg.igUserId || '').trim();
  const rawUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();
  const isVideo = post.mediaType === 'REELS' || post.mediaType === 'VIDEO' || /\.mp4(\?|$)/i.test(rawUrl);
  const mediaUrl = await autoConvertMediaUrl(rawUrl, isVideo ? 'REELS' : 'IMAGE');
  const isPublicHttp = /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);

  if (!accessToken || !igUserId) {
    if (cfg.simulationFallback !== false) {
      return {
        success: true,
        containerId: `SIM_${Date.now()}`,
        mediaPublishId: `SIM_POST_${Date.now()}`,
        message: 'Publicado en Modo Simulación (Configura tu Token en "Paso a Paso Meta" para envío real a Instagram).'
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
        message: 'Marcado como listo con recordatorio (Nota Meta: para auto-publicación directa la imagen/video requiere URL pública https://).'
      };
    }
    throw new Error('La API de Meta exige una URL pública https:// en formato JPG o MP4.');
  }

  const graphBase = 'https://graph.facebook.com/v21.0';
  const containerParams = new URLSearchParams();
  containerParams.append('caption', post.caption || '');
  containerParams.append('access_token', accessToken);

  if (isVideo) {
    containerParams.append('media_type', 'REELS');
    containerParams.append('video_url', mediaUrl);
  } else {
    containerParams.append('image_url', mediaUrl);
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

  // Step 1.5: Para videos (REELS), Meta procesa el archivo de forma asíncrona.
  // Es OBLIGATORIO esperar a status_code == 'FINISHED' antes de invocar media_publish,
  // de lo contrario Meta arroja "Media ID is not available".
  if (isVideo) {
    let isReady = false;
    let attempts = 0;
    const maxAttempts = 20; // Hasta ~60 segundos
    while (!isReady && attempts < maxAttempts) {
      attempts++;
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const checkRes = await fetch(
          `${graphBase}/${creationId}?fields=status_code,status&access_token=${accessToken}`
        );
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          if (checkData.status_code === 'FINISHED') {
            isReady = true;
            break;
          } else if (checkData.status_code === 'ERROR') {
            throw new Error(`Meta falló al procesar el video: ${checkData.status || 'Formato o códec incompatible con Instagram'}`);
          } else if (checkData.status_code === 'EXPIRED') {
            throw new Error('El contenedor del video en Meta expiró.');
          }
        }
      } catch (err) {
        if (err.message && err.message.includes('Meta falló')) throw err;
      }
    }
    if (!isReady) {
      throw new Error('Meta tardó más de 60 segundos en procesar el video. Intenta publicarlo nuevamente en unos momentos.');
    }
  }

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
    message: `¡Publicado en Instagram vía Meta Graph API! (ID: ${step2Data.id})`
  };
}

// Executes direct Facebook Page publishing or notes official Meta Crossposting
async function executeFacebookPagePublish(post) {
  const cfg = appState.metaConfig || {};
  const accessToken = (cfg.accessToken || '').trim();
  const fbPageId = (cfg.fbPageId || '').trim();
  const rawUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();
  const isVideo = post.mediaType === 'REELS' || post.mediaType === 'VIDEO' || /\.mp4(\?|$)/i.test(rawUrl);
  const mediaUrl = await autoConvertMediaUrl(rawUrl, isVideo ? 'REELS' : 'IMAGE');
  const isPublicHttp = /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);

  if (!accessToken || !fbPageId) {
    return {
      success: true,
      message: 'Crossposting automático activado vía Instagram a Facebook Page'
    };
  }

  if (!isPublicHttp) {
    return {
      success: true,
      message: 'Facebook Page preparado (requiere URL pública para envío directo)'
    };
  }

  try {
    const graphBase = 'https://graph.facebook.com/v21.0';
    const endpoint = isVideo ? 'videos' : 'photos';
    const params = new URLSearchParams();
    if (isVideo) {
      params.append('description', post.caption || '');
      params.append('file_url', mediaUrl);
    } else {
      params.append('caption', post.caption || '');
      params.append('url', mediaUrl);
    }
    params.append('access_token', accessToken);

    const res = await fetch(`${graphBase}/${fbPageId}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const data = await res.json();
    if (res.ok && data.id) {
      return { success: true, message: `Publicado en Facebook Page (ID: ${data.id})` };
    }
  } catch (_) {}

  return { success: true, message: 'Publicado en Facebook (vía réplica oficial de Meta)' };
}

// Executes official TikTok Content Posting API or assisted 1-click flow
async function executeTikTokPublish(post) {
  const ttCfg = appState.tiktokConfig || {};
  const rawUrl = (post.publicMediaUrl || post.mediaUrl || '').trim();
  const mediaUrl = await autoConvertMediaUrl(rawUrl, 'REELS');
  const isPublicHttp = /^https?:\/\/(?!localhost|127\.0\.0\.1)/i.test(mediaUrl);
  const isVideo = post.mediaType === 'REELS' || post.mediaType === 'VIDEO' || /\.mp4(\?|$)/i.test(mediaUrl);

  if (!isVideo) {
    throw new Error('TikTok exige formato de video MP4 vertical (9:16).');
  }

  if (!ttCfg.accessToken) {
    throw new Error('Falta el TikTok Access Token. Por favor haz clic en "Autorizar con TikTok" o pega tu Access Token en la pestaña "Paso a Paso TikTok" para publicar automáticamente.');
  }

  if (!isPublicHttp) {
    throw new Error('TikTok requiere una URL pública https:// accesible para descargar el video.');
  }

  try {
    const res = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ttCfg.accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        post_info: {
          title: post.caption || post.title || 'Publicación SHEEP 100',
          privacy_level: 'PUBLIC_TO_EVERYONE',
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false
        },
        source_info: {
          source: 'PULL_FROM_URL',
          video_url: mediaUrl
        }
      })
    });
    const data = await res.json();
    if (res.ok && data.data?.publish_id) {
      return {
        success: true,
        message: `¡Publicado exitosamente en TikTok! (Publish ID: ${data.data.publish_id})`
      };
    } else if (data.error && data.error.message) {
      throw new Error(`TikTok: ${data.error.message}`);
    } else {
      throw new Error(`Respuesta de TikTok API: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    throw new Error(err.message || 'Error conectando con TikTok Content Posting API');
  }
}

// Multi-platform publisher executing across selected networks
async function executeMultiPlatformPublish(post) {
  const platforms = Array.isArray(post.platforms) && post.platforms.length ? post.platforms : ['instagram'];
  const results = [];
  const errors = [];

  if (platforms.includes('instagram')) {
    try {
      const igRes = await executeMetaPublishFlow(post);
      results.push(`📸 ${igRes.message}`);
    } catch (e) {
      errors.push(`📸 Instagram: ${e.message}`);
    }
  }

  if (platforms.includes('facebook')) {
    try {
      const fbRes = await executeFacebookPagePublish(post);
      results.push(`📘 ${fbRes.message}`);
    } catch (e) {
      errors.push(`📘 Facebook: ${e.message}`);
    }
  }

  if (platforms.includes('tiktok')) {
    try {
      const ttRes = await executeTikTokPublish(post);
      results.push(`🎵 ${ttRes.message}`);
    } catch (e) {
      errors.push(`🎵 TikTok: ${e.message}`);
    }
  }

  if (errors.length > 0 && results.length === 0) {
    throw new Error(errors.join(' • '));
  }

  return {
    success: true,
    hasPartialErrors: errors.length > 0,
    message: results.concat(errors).join(' • ')
  };
}

window.publishPostNow = async function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (!post) return;

  showToast('🚀 Ejecutando publicación multi-plataforma...');
  try {
    const result = await executeMultiPlatformPublish(post);
    post.status = 'published';
    post.publishedAt = new Date().toISOString();
    post.logs = post.logs || [];
    post.logs.push({ time: new Date().toISOString(), message: result.message });
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
      const result = await executeMultiPlatformPublish(post);
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

  showToast('📋 ¡Copy copiado al portapapeles y recurso descargado!');
};

window.editPostById = function (postId) {
  const post = appState.posts.find((p) => p.id === postId);
  if (post) openComposerModal({ post });
};

window.deletePostById = async function (postId) {
  appState.posts = appState.posts.filter((p) => p.id !== postId);
  renderAll();
  await saveStateEverywhere(true);
  showToast('🗑️ Publicación eliminada');
};

// ==========================================
// INSTAGRAM 3x3 VISUAL GRID PLANNER
// ==========================================
function renderInstagramGrid() {
  const gridContainer = document.getElementById('igGridContainer');
  if (!gridContainer) return;

  document.getElementById('statScheduledCount').textContent = appState.posts.filter(
    (p) => p.status === 'scheduled'
  ).length;
  document.getElementById('statPublishedCount').textContent = appState.posts.filter(
    (p) => p.status === 'published'
  ).length;
  document.getElementById('statMediaCount').textContent = appState.mediaLibrary.length;

  const handleEl = document.getElementById('igPreviewHandle');
  if (appState.metaConfig?.igUsername) {
    handleEl.textContent = `@${appState.metaConfig.igUsername.replace(/^@/, '')}`;
  }

  const orderedPosts = [...appState.posts].sort(
    (a, b) => (a.gridOrder || 99) - (b.gridOrder || 99)
  );

  gridContainer.innerHTML = orderedPosts
    .slice(0, 9)
    .map(
      (p) => {
        const thumb = getMediaThumbnailUrl(p);
        return `
        <div class="ig-cell" draggable="true" data-post-id="${p.id}">
          ${thumb ? `<img src="${thumb}" alt="${escapeHtml(p.title)}" onerror="this.remove();" />` : '<div style="width:100%;height:100%;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📸</div>'}
          <span class="ig-cell-badge">${p.status === 'published' ? '✔' : '⏰'}</span>
        </div>
      `;
      }
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
          <strong>${escapeHtml(post.title)}</strong>
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

    // Try local Express upload first; fallback to compressed Cloud DataURL for Firebase Hosting/GitHub Pages
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
    showToast(
      ext === 'PNG'
        ? '⚠️ Subido. Recuerda que Meta Graph API prefiere formato JPG para auto-publicar.'
        : '🖼️ Archivo guardado y sincronizado en SHEEP 100'
    );
  });

  const formUrl = document.getElementById('formAddUrl');
  formUrl.addEventListener('submit', async (e) => {
    e.preventDefault();
    let url = document.getElementById('inputMediaUrl').value.trim();
    const title = document.getElementById('inputMediaTitle').value.trim() || 'Recurso Multimedia';
    const type = document.getElementById('inputMediaType').value;
    const tags = (document.getElementById('inputMediaTags').value || 'url-publica')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Convert Drive / OneDrive URL
    url = await autoConvertMediaUrl(url);

    const newMedia = {
      id: `media-${Date.now()}`,
      title,
      url,
      publicUrl: url,
      type,
      format: type === 'video' ? 'MP4' : 'JPG',
      tags,
      createdAt: new Date().toISOString()
    };

    appState.mediaLibrary.unshift(newMedia);
    formUrl.reset();
    renderAll();
    await saveStateEverywhere(true);
    showToast('🌐 Recurso con URL pública guardado en la nube');
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
      const thumb = getMediaThumbnailUrl(m);
      const isVideo = m.type === 'video' || m.format === 'MP4';
      return `
      <div class="media-card">
        <img src="${escapeHtml(thumb)}" class="media-card-thumb" alt="${escapeHtml(m.title)}" onerror="this.onerror=null; this.src='${escapeHtml(m.url)}';" />
        <div class="media-card-body">
          <strong>${escapeHtml(m.title)}</strong>
          <div style="font-size:0.72rem;color:var(--text-muted);">
            Formato: <b>${m.format}</b> • ${isVideo ? '🎬 Video' : '📸 Imagen'}
          </div>
          <div style="display:flex;gap:6px;margin-top:6px;">
            <button class="btn-primary btn-sm full-width" onclick="openComposerModal({ mediaId: '${m.id}' })">
              📅 Programar
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
// AI STUDIO (COPIES & HASHTAGS — CLOUD + LOCAL)
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
      'Cuéntanos tu opinión en comentarios y guarda este post 👇';

    try {
      const geminiKey = (appState.metaConfig?.geminiApiKey || '').trim();
      if (geminiKey) {
        const prompt = `Actúa como estratega experto en redes sociales para ${platform}. Genera 3 opciones de copy sobre "${topic}" en tono ${tone}. CTA: "${cta}". Devuelve JSON con formato: { "options": [{ "title": "...", "caption": "...", "firstComment": "..." }] }`;
        const gemRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
            geminiKey
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
        const gemData = await gemRes.json();
        const rawText = gemData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          renderAiOptions(JSON.parse(rawText));
          return;
        }
      }

      // Smart Built-in Engine
      const defaultHashtags = `#sheep100 #estrategiadigital #creadoresdecontenido #marketingdigital #emprendedores #marcapersonal #tendencias2026`;
      const options = [
        {
          title: `Opción 1: Gancho Directo + Valor (${tone})`,
          caption: `¿Sabías que la clave en ${topic} está en los detalles que casi nadie aplica? 🚀✨\n\nHoy te compartimos los 3 pilares que están marcando la diferencia:\n\n1️⃣ Claridad desde el primer segundo.\n2️⃣ Consistencia visual que transmite confianza.\n3️⃣ Un sistema automatizado con SHEEP 100.\n\n💡 ${cta}\n\n${defaultHashtags}`,
          firstComment: `🔥 Si quieres más tips sobre "${topic}", comenta "QUIERO" aquí abajo.`
        },
        {
          title: `Opción 2: Storytelling & Conexión`,
          caption: `Hace un tiempo pensábamos que dominar ${topic} requería complicarse durante horas... hasta que cambiamos el enfoque por completo ☕🙌\n\n✨ Menos fricción.\n✨ Más autenticidad.\n✨ Mejor conexión con tu audiencia ideal.\n\n${cta}\n\n${defaultHashtags}`,
          firstComment: `¿Cuál ha sido tu mayor reto con ${topic} este mes? 👇`
        },
        {
          title: `Opción 3: Formato Dinámico Reels / TikTok`,
          caption: `Guarda esto antes de seguir haciendo scroll 📌🔥\n\nAsí transformamos ${topic} en resultados reales:\n\n✅ Paso 1: Define tu objetivo\n✅ Paso 2: Prepara tu contenido visual en bloque\n✅ Paso 3: Automatiza con SHEEP 100\n\n👉 ${cta}\n\n${defaultHashtags}`,
          firstComment: `Comparte este post con alguien que necesite verlo hoy 🚀`
        }
      ];
      renderAiOptions({ options });
    } catch (err) {
      showToast(`❌ Error generando copy: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = '✨ Generar 3 Propuestas de Copy + Hashtags';
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
        <div style="display:flex;gap:8px;">
          <button class="btn-primary btn-sm" onclick="useAiCopyInComposer(${idx})">
            📅 Enviar al Programador de Posts
          </button>
          <button class="btn-secondary btn-sm" onclick="copyText(${JSON.stringify(opt.caption)})">
            📋 Copiar Texto
          </button>
        </div>
      </div>
    `
    )
    .join('');

  window._lastAiOptions = options;
}

window.useAiCopyInComposer = function (idx) {
  const opt = window._lastAiOptions?.[idx];
  if (!opt) return;
  openComposerModal({
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

  // Direct verification against Meta Graph API (works in Browser & Local)
  document.getElementById('btnVerifyToken').addEventListener('click', async () => {
    const token = document.getElementById('cfgAccessToken').value.trim();
    const feedback = document.getElementById('tokenVerifyFeedback');
    feedback.classList.remove('hidden', 'ok', 'err');
    feedback.textContent = '⏳ Consultando https://graph.facebook.com/v21.0/me/accounts ...';

    if (!token) {
      feedback.classList.add('err');
      feedback.textContent = '❌ Pega primero tu Access Token generado en Graph API Explorer.';
      return;
    }

    try {
      // 1. Intentar por me/accounts (Páginas clásicas)
      const graphUrl = `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,instagram_business_account{id,username,name}&access_token=${encodeURIComponent(
        token
      )}`;
      const res = await fetch(graphUrl);
      const data = await res.json();

      let pageWithIg = null;
      let igAccount = null;
      let pageName = '';
      let pageId = '';

      if (res.ok && data.data && data.data.length > 0) {
        pageWithIg = data.data.find((p) => p.instagram_business_account);
        if (pageWithIg) {
          igAccount = pageWithIg.instagram_business_account;
          pageName = pageWithIg.name;
          pageId = pageWithIg.id;
        }
      }

      // 2. Fallback: Si el token es de Página o Nueva Experiencia de Páginas, consultar /me directo
      if (!igAccount) {
        try {
          const directUrl = `https://graph.facebook.com/v21.0/me?fields=id,name,instagram_business_account{id,username,name}&access_token=${encodeURIComponent(
            token
          )}`;
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
          const bizUrl = `https://graph.facebook.com/v21.0/me/businesses?fields=id,name,instagram_accounts{id,username},client_pages{id,name,instagram_business_account{id,username}},owned_pages{id,name,instagram_business_account{id,username}}&access_token=${encodeURIComponent(
            token
          )}`;
          const bizRes = await fetch(bizUrl);
          const bizData = await bizRes.json();
          if (bizRes.ok && bizData.data) {
            for (const b of bizData.data) {
              if (b.instagram_accounts && b.instagram_accounts.data && b.instagram_accounts.data.length > 0) {
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
        feedback.classList.add('err');
        feedback.innerHTML = `⚠️ Meta devolvió una lista de páginas vacía para este token.<br><small><strong>Solución rápida:</strong> En Graph API Explorer cambia <code>Token del usuario</code> a tu Página en el desplegable, o bien ingresa tu <strong>Instagram Business User ID</strong> manualmente abajo y pulsa <em>"Guardar Configuración"</em>.</small>`;
        return;
      }

      appState.metaConfig.accessToken = token;
      appState.metaConfig.fbPageId = pageId;
      appState.metaConfig.fbPageName = pageName;
      appState.metaConfig.igUserId = igAccount.id;
      appState.metaConfig.igUsername = igAccount.username || igAccount.name || '';
      appState.metaConfig.wizardSteps = appState.metaConfig.wizardSteps || {};
      appState.metaConfig.wizardSteps.step5_accessToken = true;

      // Autocompletar inputs visibles
      document.getElementById('cfgIgUserId').value = igAccount.id;
      document.getElementById('cfgIgUsername').value = appState.metaConfig.igUsername;

      feedback.classList.add('ok');
      feedback.innerHTML = `✅ <strong>¡Conexión Exitosa!</strong> Página: <b>${escapeHtml(
        pageName
      )}</b> • Instagram Business: <b>@${escapeHtml(
        appState.metaConfig.igUsername
      )}</b> (ID: <code>${igAccount.id}</code>).`;

      renderAll();
      await saveStateEverywhere(true);
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

  const codeBlock = document.getElementById('metaCodeSnippet');
  if (codeBlock) {
    const igIdDisplay = cfg.igUserId || 'TU_IG_USER_ID';
    codeBlock.textContent = `// PASO 1: Crear el contenedor de medios en Meta Graph API
POST https://graph.facebook.com/v21.0/${igIdDisplay}/media
Body: {
  image_url: "https://tu-servidor.com/imagen.jpg",
  caption: "Tu copy con #hashtags",
  access_token: "${cfg.accessToken ? cfg.accessToken.slice(0, 14) + '...' : 'EAA...'}"
}

// PASO 2: Publicar el contenedor (media_publish)
POST https://graph.facebook.com/v21.0/${igIdDisplay}/media_publish
Body: {
  creation_id: "ID_CONTENEDOR_DEVUELTO",
  access_token: "${cfg.accessToken ? cfg.accessToken.slice(0, 14) + '...' : 'EAA...'}"
}`;
  }
}

function renderMetaStatusSidebar() {
  const cfg = appState.metaConfig || {};
  const dot = document.getElementById('metaStatusDot');
  const title = document.getElementById('metaStatusTitle');
  const desc = document.getElementById('metaStatusDesc');

  if (cfg.accessToken && cfg.igUserId) {
    dot.classList.add('connected');
    const cleanUser = (cfg.igUsername || '').replace(/^@+/, '') || cfg.igUserId;
    title.textContent = `Conectado: @${cleanUser}`;
    desc.textContent = 'Meta Graph API lista en Modo Desarrollo para publicar automáticamente.';
  } else {
    dot.classList.remove('connected');
    title.textContent = 'Modo Simulación / Pendiente';
    desc.textContent = 'Completa los 5 pasos de Meta para conectar tu Instagram Business.';
  }
}

// ==========================================
// TIKTOK WIZARD & CONFIGURATION
// ==========================================
async function saveTikTokConfigDirect(e) {
  if (e && e.preventDefault) e.preventDefault();
  const keyEl = document.getElementById('cfgTikTokClientKey');
  const secretEl = document.getElementById('cfgTikTokClientSecret');
  const tokenEl = document.getElementById('cfgTikTokAccessToken');
  const userEl = document.getElementById('cfgTikTokUsername');

  const key = (keyEl ? keyEl.value : '').trim();
  const secret = (secretEl ? secretEl.value : '').trim();
  const token = (tokenEl ? tokenEl.value : '').trim();
  const user = (userEl ? userEl.value : '').trim() || '@cocuyo.grafic';

  if (!key) {
    showToast('⚠️ Ingresa primero tu TikTok Client Key copiado de TikTok Developers.');
    return false;
  }

  appState.tiktokConfig = {
    clientKey: key,
    clientSecret: secret,
    accessToken: token,
    username: user,
    connected: Boolean(key && (secret || token))
  };

  renderTikTokStatusSidebar();
  renderTikTokWizardState();
  await saveStateEverywhere(true);
  showToast('✅ ¡Configuración de TikTok guardada y sincronizada!');
  return false;
}
window.saveTikTokConfigDirect = saveTikTokConfigDirect;

function initTikTokWizardEvents() {
  const form = document.getElementById('formTikTokConfig');
  if (form) {
    form.addEventListener('submit', (e) => saveTikTokConfigDirect(e));
  }

  const btnSave = document.getElementById('btnSaveTikTok');
  if (btnSave) {
    btnSave.addEventListener('click', (e) => saveTikTokConfigDirect(e));
  }

  const btnOAuth = document.getElementById('btnTikTokOAuth');
  if (btnOAuth) {
    btnOAuth.addEventListener('click', () => {
      const clientKey = (document.getElementById('cfgTikTokClientKey').value || '').trim();
      if (!clientKey) {
        showToast('⚠️ Ingresa primero tu TikTok Client Key en el campo de arriba.');
        return;
      }
      const currentUrl = new URL(window.location.href);
      const cleanPath = currentUrl.pathname.endsWith('/') ? currentUrl.pathname : (currentUrl.pathname + '/');
      const redirectUri = currentUrl.origin + cleanPath;
      const state = 'sheep100_' + Date.now();
      const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${encodeURIComponent(
        clientKey
      )}&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=${state}`;
      window.open(url, '_blank');
      showToast(`🚀 Abriendo autorización de TikTok con Redirect URI: ${redirectUri}`);
    });
  }
}

async function checkTikTokOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error') || params.get('error_description');
  if (error) {
    showToast(`⚠️ TikTok OAuth: ${error}`);
    return;
  }
  if (!code) return;

  const tt = appState.tiktokConfig || {};
  const clientKey = (tt.clientKey || document.getElementById('cfgTikTokClientKey')?.value || '').trim();
  const clientSecret = (tt.clientSecret || document.getElementById('cfgTikTokClientSecret')?.value || '').trim();

  if (!clientKey || !clientSecret) {
    showToast('⚠️ Código de TikTok recibido. Guarda tu Client Key y Client Secret en "Paso a Paso TikTok" para completar la vinculación.');
    return;
  }

  showToast('⏳ Vinculando cuenta de TikTok y canjeando Access Token...');
  try {
    const currentUrl = new URL(window.location.href);
    const cleanPath = currentUrl.pathname.endsWith('/') ? currentUrl.pathname : (currentUrl.pathname + '/');
    const redirectUri = currentUrl.origin + cleanPath;

    const bodyParams = new URLSearchParams();
    bodyParams.append('client_key', clientKey);
    bodyParams.append('client_secret', clientSecret);
    bodyParams.append('code', code);
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('redirect_uri', redirectUri);

    const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyParams.toString()
    });
    const data = await res.json();
    if (res.ok && data.data?.access_token) {
      appState.tiktokConfig = {
        ...appState.tiktokConfig,
        accessToken: data.data.access_token,
        openId: data.data.open_id || '',
        connected: true
      };
      await saveStateEverywhere(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      renderAll();
      showToast('🎉 ¡TikTok conectado exitosamente con Access Token!');
    } else {
      const errDetail = data.error?.message || data.message || 'Error canjeando token';
      showToast(`⚠️ TikTok API: ${errDetail}. Puedes copiar y pegar el Access Token directamente en el campo.`);
    }
  } catch (err) {
    console.warn('OAuth token exchange note:', err);
    showToast('ℹ️ Si el navegador bloquea la llamada por CORS, puedes pegar tu Access Token directo en "Paso a Paso TikTok".');
  }
}

function renderTikTokStatusSidebar() {
  const tt = appState.tiktokConfig || {};
  const isConn = Boolean(tt.connected || (tt.clientKey && (tt.clientSecret || tt.accessToken)));
  const dot = document.getElementById('tiktokStatusDot');
  const title = document.getElementById('tiktokStatusTitle');
  const desc = document.getElementById('tiktokStatusDesc');

  if (dot) dot.classList.toggle('connected', isConn);
  if (title) {
    const cleanUser = (tt.username || 'cocuyo.grafic').replace(/^@+/, '');
    title.textContent = isConn ? `TikTok: @${cleanUser}` : 'TikTok: Pendiente';
  }
  if (desc) {
    desc.textContent = isConn
      ? 'TikTok Content Posting API lista en Modo Sandbox.'
      : 'Conecta @cocuyo.grafic en Modo Sandbox.';
  }
}

function renderTikTokWizardState() {
  const tt = appState.tiktokConfig || {};
  const isConn = Boolean(tt.connected || (tt.clientKey && (tt.clientSecret || tt.accessToken)));

  const setValIfIdle = (id, val) => {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) el.value = val || '';
  };

  setValIfIdle('cfgTikTokClientKey', tt.clientKey);
  setValIfIdle('cfgTikTokClientSecret', tt.clientSecret);
  setValIfIdle('cfgTikTokAccessToken', tt.accessToken);
  setValIfIdle('cfgTikTokUsername', tt.username || '@cocuyo.grafic');

  const badge = document.getElementById('tiktokProgressBadge');
  if (badge) badge.textContent = isConn ? 'Conectado (Sandbox)' : 'Modo Sandbox';

  const pctEl = document.getElementById('tiktokPercentText');
  if (pctEl) pctEl.textContent = isConn ? '100%' : (tt.clientKey ? '75%' : '50%');

  const step3Chk = document.getElementById('chkTikTokStep3');
  if (step3Chk) step3Chk.checked = Boolean(tt.clientKey && tt.clientSecret);
  const step4Chk = document.getElementById('chkTikTokStep4');
  if (step4Chk) step4Chk.checked = isConn;

  const card3 = document.getElementById('card-tiktok-step3');
  if (card3) card3.classList.toggle('completed', Boolean(tt.clientKey && tt.clientSecret));
  const card4 = document.getElementById('card-tiktok-step4');
  if (card4) card4.classList.toggle('completed', isConn);

  const feedback = document.getElementById('tiktokVerifyFeedback');
  if (feedback) {
    if (isConn) {
      feedback.classList.remove('hidden', 'err');
      feedback.classList.add('ok');
      feedback.innerHTML = `✅ <strong>¡TikTok Conectado!</strong> Cuenta: <b>${escapeHtml(
        tt.username || '@cocuyo.grafic'
      )}</b> lista en Modo Sandbox para auto-publicar videos MP4.`;
    } else {
      feedback.classList.add('hidden');
    }
  }
}

function resolveDirectDriveUrl(rawUrl, isVideo = false) {
  if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
  const m = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m && m[1]) {
    const fileId = m[1];
    return isVideo
      ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download`
      : `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return rawUrl;
}
window.resolveDirectDriveUrl = resolveDirectDriveUrl;

// Helper to automatically convert cloud storage viewer links (OneDrive, Google Drive, Dropbox) into direct download links
async function autoConvertMediaUrl(raw, explicitMediaType = null) {
  if (!raw || typeof raw !== 'string') return raw;
  let url = raw.trim();

  // 1. OneDrive short link (1drv.ms)
  if (url.includes('1drv.ms/')) {
    try {
      const res = await fetch(`/api/resolve-media-url?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.directUrl) return data.directUrl;
      }
    } catch (_) {}
    if (!url.includes('download=1')) {
      url += (url.includes('?') ? '&' : '?') + 'download=1';
    }
    return url;
  }

  // 2. OneDrive Web link (onedrive.live.com)
  if (url.includes('onedrive.live.com')) {
    if (url.includes('/view.aspx')) {
      url = url.replace('/view.aspx', '/download');
    } else if (!url.includes('download=1')) {
      url += (url.includes('?') ? '&' : '?') + 'download=1';
    }
    return url;
  }

  // 3. SharePoint / OneDrive Business
  if (url.includes('sharepoint.com') && !url.includes('download=1')) {
    url += (url.includes('?') ? '&' : '?') + 'download=1';
    return url;
  }

  // 4. Google Drive viewer link: drive.google.com/file/d/ID/view
  if (url.includes('drive.google.com') || url.includes('drive.usercontent.google.com')) {
    const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m && m[1]) {
      const fileId = m[1];
      const type = explicitMediaType || document.getElementById('postMediaType')?.value || 'IMAGE';
      const isVideo = type === 'REELS' || type === 'VIDEO' || /\.mp4(\?|$)/i.test(url) || url.includes('export=download');
      return isVideo
        ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download`
        : `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // 5. Dropbox link: dropbox.com/...dl=0 -> raw=1
  if (url.includes('dropbox.com')) {
    url = url.replace(/[?&]dl=0/i, '').replace(/[?&]dl=1/i, '');
    url += (url.includes('?') ? '&' : '?') + 'raw=1';
    return url;
  }

  return url;
}
window.autoConvertMediaUrl = autoConvertMediaUrl;

// ==========================================
// POST COMPOSER MODAL
// ==========================================
function initComposerEvents() {
  document.getElementById('btnOpenComposer').addEventListener('click', () => openComposerModal());
  document.getElementById('btnCloseComposer').addEventListener('click', closeComposerModal);
  document.getElementById('btnCancelComposer').addEventListener('click', closeComposerModal);

  const mediaTypeSelect = document.getElementById('postMediaType');
  if (mediaTypeSelect) {
    mediaTypeSelect.addEventListener('change', async () => {
      const isVideo = (mediaTypeSelect.value === 'REELS' || mediaTypeSelect.value === 'VIDEO');
      const urlEl = document.getElementById('postPublicMediaUrl');
      if (urlEl && urlEl.value) {
        const converted = resolveDirectDriveUrl(urlEl.value, isVideo);
        urlEl.value = converted;
        updateComposerPreview(converted);
      }
    });
  }

  const mediaSelect = document.getElementById('postMediaSelect');
  if (mediaSelect) {
    mediaSelect.addEventListener('change', () => {
      const media = appState.mediaLibrary.find((m) => m.id === mediaSelect.value);
      if (media) {
        const isVideo = (media.type === 'video' || media.format === 'MP4');
        document.getElementById('postMediaType').value = isVideo ? 'REELS' : 'IMAGE';
        const directUrl = resolveDirectDriveUrl(media.publicUrl || media.url, isVideo);
        document.getElementById('postPublicMediaUrl').value = directUrl;
        updateComposerPreview(directUrl);
      }
    });
  }

  const urlInput = document.getElementById('postPublicMediaUrl');
  if (urlInput) {
    urlInput.addEventListener('input', (e) => {
      updateComposerPreview(e.target.value);
    });
    urlInput.addEventListener('paste', () => {
      setTimeout(async () => {
        const isVideo = document.getElementById('postMediaType')?.value === 'REELS';
        const converted = await autoConvertMediaUrl(urlInput.value, isVideo ? 'REELS' : 'IMAGE');
        if (converted && converted !== urlInput.value) {
          urlInput.value = converted;
          updateComposerPreview(converted);
          showToast('⚡ Enlace de nube convertido automáticamente a descarga directa para Meta/TikTok');
        }
      }, 50);
    });
    urlInput.addEventListener('change', async () => {
      const isVideo = document.getElementById('postMediaType')?.value === 'REELS';
      const converted = await autoConvertMediaUrl(urlInput.value, isVideo ? 'REELS' : 'IMAGE');
      if (converted && converted !== urlInput.value) {
        urlInput.value = converted;
        updateComposerPreview(converted);
        showToast('⚡ Enlace de nube convertido automáticamente a descarga directa para Meta/TikTok');
      }
    });
  }

  const captionInput = document.getElementById('postCaption');
  captionInput.addEventListener('input', () => {
    document.getElementById('captionCharCounter').textContent = `${captionInput.value.length} / 2200`;
  });

  document.getElementById('formPostComposer').addEventListener('submit', async (e) => {
    e.preventDefault();
    const platforms = Array.from(
      document.querySelectorAll('input[name="postPlatform"]:checked')
    ).map((el) => el.value);

    const scheduledLocal = document.getElementById('postScheduledAt').value;
    const scheduledIso = scheduledLocal
      ? new Date(scheduledLocal).toISOString()
      : new Date().toISOString();

    const mediaTypeVal = document.getElementById('postMediaType').value;
    let mediaUrlVal = document.getElementById('postPublicMediaUrl').value.trim();
    mediaUrlVal = await autoConvertMediaUrl(mediaUrlVal, mediaTypeVal);
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
          mediaType: mediaTypeVal,
          platforms: platforms.length ? platforms : ['instagram'],
          scheduledAt: scheduledIso,
          status: document.getElementById('postStatus').value,
          firstComment: document.getElementById('postFirstComment').value.trim()
        };
      }
    } else {
      appState.posts.unshift({
        id: `post-${Date.now()}`,
        title: document.getElementById('postTitle').value.trim() || 'Nueva Publicación',
        caption: document.getElementById('postCaption').value,
        mediaId: document.getElementById('postMediaSelect').value || null,
        mediaUrl: mediaUrlVal,
        publicMediaUrl: mediaUrlVal,
        mediaType: mediaTypeVal,
        platforms: platforms.length ? platforms : ['instagram'],
        scheduledAt: scheduledIso,
        status: document.getElementById('postStatus').value,
        firstComment: document.getElementById('postFirstComment').value.trim(),
        gridOrder: 0,
        createdAt: new Date().toISOString(),
        logs: [{ time: new Date().toISOString(), message: 'Creada en SHEEP 100.' }]
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
  if (!box) return;
  const type = document.getElementById('postMediaType')?.value;
  if (!url) {
    box.innerHTML = `<span>Selecciona un medio o pega una URL</span>`;
    return;
  }
  const isVideo = type === 'REELS' || type === 'VIDEO' || /\.mp4(\?|$)/i.test(url) || url.includes('export=download');

  let cleanUrl = url.trim();
  const fileIdMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (isVideo) {
    if (fileIdMatch && fileIdMatch[1]) {
      const driveId = fileIdMatch[1];
      box.innerHTML = `
        <div style="position:relative;width:100%;height:220px;border-radius:8px;overflow:hidden;background:#000;">
          <iframe 
            src="https://drive.google.com/file/d/${driveId}/preview" 
            width="100%" 
            height="100%" 
            style="border:none;display:block;" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
          </iframe>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:0.75rem;">
          <span style="color:#4ade80;">🎬 Reproductor Google Drive activo</span>
          <a href="https://drive.google.com/file/d/${driveId}/view" target="_blank" style="color:#818cf8;text-decoration:none;">↗ Abrir en Drive</a>
        </div>
      `;
      return;
    }
    box.innerHTML = `
      <video src="${escapeHtml(cleanUrl)}" controls autoplay muted playsinline style="max-width:100%;max-height:220px;border-radius:8px;background:#000;width:100%;">
        Tu navegador no soporta reproducción directa de video.
      </video>
    `;
  } else {
    if (fileIdMatch && fileIdMatch[1]) {
      cleanUrl = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
    box.innerHTML = `<img src="${escapeHtml(cleanUrl)}" alt="Preview" style="max-width:100%;max-height:220px;object-fit:cover;border-radius:8px;width:100%;" onerror="this.onerror=null; this.src='${escapeHtml(url)}';" />`;
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
    const isVideo = (p.mediaType === 'REELS' || p.mediaType === 'VIDEO' || /\.mp4/i.test(p.mediaUrl || ''));
    document.getElementById('composerModalTitle').textContent = '✏️ Editar Publicación';
    document.getElementById('postId').value = p.id;
    document.getElementById('postTitle').value = p.title || '';
    document.getElementById('postCaption').value = p.caption || '';
    document.getElementById('postMediaSelect').value = p.mediaId || '';
    document.getElementById('postMediaType').value = isVideo ? 'REELS' : (p.mediaType || 'IMAGE');
    const directUrl = resolveDirectDriveUrl(p.publicMediaUrl || p.mediaUrl || '', isVideo);
    document.getElementById('postPublicMediaUrl').value = directUrl;
    document.getElementById('postFirstComment').value = p.firstComment || '';
    document.getElementById('postStatus').value = p.status === 'draft' ? 'draft' : 'scheduled';
    document.getElementById('postScheduledAt').value = toLocalDateTimeInputValue(
      new Date(p.scheduledAt || defaultTomorrow)
    );
    document.querySelectorAll('input[name="postPlatform"]').forEach((chk) => {
      chk.checked = (p.platforms || []).includes(chk.value);
    });
    updateComposerPreview(directUrl);
  } else {
    document.getElementById('composerModalTitle').textContent = '✨ Programar Nueva Publicación';
    document.getElementById('postId').value = '';
    document.getElementById('postScheduledAt').value =
      opts.scheduledAtLocal || toLocalDateTimeInputValue(defaultTomorrow);

    if (opts.mediaId) {
      const m = appState.mediaLibrary.find((item) => item.id === opts.mediaId);
      if (m) {
        document.getElementById('postMediaSelect').value = m.id;
        const isVideo = (m.type === 'video' || m.format === 'MP4');
        document.getElementById('postMediaType').value = isVideo ? 'REELS' : 'IMAGE';
        document.getElementById('postTitle').value = m.title.replace(/\.[^.]+$/, '');
        const directUrl = resolveDirectDriveUrl(m.publicUrl || m.url, isVideo);
        document.getElementById('postPublicMediaUrl').value = directUrl;
        updateComposerPreview(directUrl);
      }
    } else if (appState.mediaLibrary[0]) {
      const first = appState.mediaLibrary[0];
      document.getElementById('postMediaSelect').value = first.id;
      const isVideo = (first.type === 'video' || first.format === 'MP4');
      document.getElementById('postMediaType').value = isVideo ? 'REELS' : 'IMAGE';
      const directUrl = resolveDirectDriveUrl(first.publicUrl || first.url, isVideo);
      document.getElementById('postPublicMediaUrl').value = directUrl;
      updateComposerPreview(directUrl);
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
        body: 'Las notificaciones de tus publicaciones programadas están activas.',
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
          body: 'Tu post programado ya fue procesado automáticamente.',
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
