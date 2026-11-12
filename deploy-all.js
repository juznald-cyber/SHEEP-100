/**
 * SHEEP 100 — Script de Sincronización Total (Local + GitHub + Firebase Hosting & Firestore)
 * Ejecuta: node deploy-all.js "Mensaje del cambio"
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');
const { execSync } = require('child_process');

const PROJECT_ID = 'sheep-100-b8a90';
const SITE_ID = 'sheep-100-b8a90';
const PUBLIC_DIR = path.join(__dirname, 'public');
const FB_CFG_PATH = 'c:/Users/juniortorrez/.config/configstore/firebase-tools.json';

async function getFirebaseAccessToken() {
  const cfg = JSON.parse(fs.readFileSync(FB_CFG_PATH, 'utf8'));
  const params = new URLSearchParams({
    refresh_token: cfg.tokens.refresh_token,
    client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
    client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
    grant_type: 'refresh_token'
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('No se pudo refrescar el token de Firebase: ' + JSON.stringify(data));
  }
  cfg.tokens.access_token = data.access_token;
  cfg.tokens.expires_at = Date.now() + data.expires_in * 1000;
  fs.writeFileSync(FB_CFG_PATH, JSON.stringify(cfg, null, 2));
  return data.access_token;
}

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      const relPath = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

function mirrorPublicToRoot() {
  for (const entry of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (entry.isFile()) {
      fs.copyFileSync(
        path.join(PUBLIC_DIR, entry.name),
        path.join(__dirname, entry.name)
      );
    }
  }
}

async function deployFirebaseHosting(token) {
  console.log('☁️  [1/3] Desplegando SHEEP 100 en Firebase Hosting (' + SITE_ID + ')...');
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  await fetch(`https://firebasehosting.googleapis.com/v1beta1/projects/${PROJECT_ID}/sites?siteId=${SITE_ID}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({})
  }).catch(() => {});

  const verRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/sites/${SITE_ID}/versions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      config: {
        cleanUrls: true,
        headers: [
          {
            glob: '**',
            headers: { 'Cache-Control': 'no-cache' }
          }
        ]
      }
    })
  });
  const verData = await verRes.json();
  if (!verData.name) {
    throw new Error('Error creando versión en Firebase Hosting: ' + JSON.stringify(verData));
  }
  const versionName = verData.name;

  const files = getAllFiles(PUBLIC_DIR);
  const fileHashes = {};
  const gzippedByHash = {};

  for (const f of files) {
    const raw = fs.readFileSync(f.fullPath);
    const gzipped = zlib.gzipSync(raw, { level: 9 });
    const hash = crypto.createHash('sha256').update(gzipped).digest('hex');
    fileHashes[f.relPath] = hash;
    gzippedByHash[hash] = gzipped;
  }

  const popRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}:populateFiles`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ files: fileHashes })
  });
  const popData = await popRes.json();
  const uploadRequired = popData.uploadRequiredHashes || [];
  const uploadUrl = popData.uploadUrl;

  for (const hash of uploadRequired) {
    const upRes = await fetch(`${uploadUrl}/${hash}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/octet-stream'
      },
      body: gzippedByHash[hash]
    });
    if (!upRes.ok) {
      throw new Error(`Fallo subiendo archivo hash ${hash}: ${await upRes.text()}`);
    }
  }

  const finRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}?update_mask=status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'FINALIZED' })
  });
  const finData = await finRes.json();
  if (finData.status !== 'FINALIZED') {
    throw new Error('No se pudo finalizar la versión de Hosting: ' + JSON.stringify(finData));
  }

  const relRes = await fetch(
    `https://firebasehosting.googleapis.com/v1beta1/sites/${SITE_ID}/releases?versionName=${encodeURIComponent(
      versionName
    )}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: 'Despliegue automático SHEEP 100' })
    }
  );
  const relData = await relRes.json();
  if (!relData.name) {
    throw new Error('Error publicando release en Firebase Hosting: ' + JSON.stringify(relData));
  }
  console.log(`✅ Firebase Hosting actualizado en vivo: https://${SITE_ID}.web.app`);
}

async function deployFirestoreRules(token) {
  console.log('🔒 [2/3] Sincronizando reglas de seguridad en Cloud Firestore...');
  const rulesPath = path.join(__dirname, 'firestore.rules');
  if (!fs.existsSync(rulesPath)) return;

  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  const rsRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      source: {
        files: [{ name: 'firestore.rules', content: fs.readFileSync(rulesPath, 'utf8') }]
      }
    })
  });
  const rsData = await rsRes.json();
  if (rsData.name) {
    const relName = `projects/${PROJECT_ID}/releases/cloud.firestore`;
    await fetch(`https://firebaserules.googleapis.com/v1/${relName}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ release: { name: relName, rulesetName: rsData.name } })
    });
    console.log('✅ Reglas de Cloud Firestore sincronizadas.');
  }
}

function pushToGitHub(commitMsg) {
  console.log('🐙 [3/3] Subiendo cambios al repositorio GitHub (juznald-cyber/SHEEP-100)...');
  mirrorPublicToRoot();
  execSync('git add -A -- ":!.github/workflows"', { stdio: 'inherit' });
  try {
    execSync(`git commit -m "${commitMsg.replace(/"/g, "'")}"`, { stdio: 'inherit' });
  } catch (_) {
    console.log('ℹ️ Sin cambios nuevos que confirmar en Git.');
  }
  execSync('git push -u origin main', { stdio: 'inherit' });
  console.log('✅ Repositorio GitHub actualizado: https://github.com/juznald-cyber/SHEEP-100');
}

(async () => {
  try {
    const commitMsg = process.argv[2] || `Actualización automática SHEEP 100 (${new Date().toISOString()})`;
    const token = await getFirebaseAccessToken();
    await deployFirebaseHosting(token);
    await deployFirestoreRules(token);
    pushToGitHub(commitMsg);
    console.log('\n============================================================');
    console.log('🎉 ¡SINCRONIZACIÓN COMPLETA (LOCAL + GITHUB + FIREBASE)!');
    console.log('🌐 Firebase En Línea: https://sheep-100-b8a90.web.app');
    console.log('🐙 GitHub Repo:       https://github.com/juznald-cyber/SHEEP-100');
    console.log('💻 Servidor Local:    http://localhost:3000');
    console.log('============================================================');
  } catch (err) {
    console.error('❌ Error en deploy-all:', err.message);
    process.exit(1);
  }
})();
