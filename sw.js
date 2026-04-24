/* ══════════════════════════════════════════════════
   WUFLY — Service Worker
   Estrategia:
   - Static assets (HTML/CSS/JS/fonts) → Cache First
   - API calls (Cloudflare Worker)      → Network First
   - Imágenes                           → Cache First
   ══════════════════════════════════════════════════ */

const CACHE_NAME = 'wufly-v39';
const API_HOST = 'divine-waterfall-d1dfsin-gluten-life.pablo77tapia.workers.dev';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/onboarding.js',
  '/js/clinicas-destacadas.js',
  '/js/places.js',
  '/js/adoptar.js',
  '/js/tiendas-destacadas.js',
  '/js/tiendas.js',
  '/js/grooming.js',
  '/js/paseadores.js',
  '/js/recetas.js',
  '/js/recordatorios.js',
  '/js/perdidos.js',
  '/js/auth.js',
  '/js/geo.js',
  '/js/perfil.js',
  '/js/chat.js',
  '/img/logo.png',
  '/img/icono.png',
  '/js/analytics.js',
  '/js/vitrina.js',
  '/js/arte.js',
  '/js/home.js',
  '/js/companion.js',
  'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap',
];

/* ── INSTALL: pre-cachear assets estáticos ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url).catch(() => null))
      )
    )
    // No llamamos skipWaiting() aquí — la página decide cuándo activar
  );
});

/* ── MESSAGE: recibir orden de activación desde la página ── */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

/* ── ACTIVATE: limpiar caches viejos ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: estrategias por tipo de request ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que no sean GET
  if (request.method !== 'GET') return;

  // Ignorar extensiones de browser y chrome-extension
  if (!url.protocol.startsWith('http')) return;

  // Videos → pasar directo a la red (necesitan range requests para streaming)
  if (url.pathname.match(/\.(mp4|webm|mov)$/i)) return;

  // API calls → Network First (con fallback a cache)
  if (url.hostname === API_HOST) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Google Fonts CSS → Network First (para recibir actualizaciones)
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Google Fonts archivos → Cache First (son inmutables)
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Todo lo demás (assets locales) → Cache First
  event.respondWith(cacheFirst(request));
});

/* ── Cache First: sirve desde cache, actualiza en background ── */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // Actualizar cache en background (stale-while-revalidate)
    fetchAndCache(request);
    return cached;
  }
  return fetchAndCache(request);
}

/* ── Network First: intenta red, cae en cache si falla ── */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Sin conexión y sin cache: devolver respuesta offline para páginas
    if (request.headers.get('accept')?.includes('text/html')) {
      return offlinePage();
    }
    return new Response('Sin conexión', { status: 503 });
  }
}

/* ── Fetch y cachear ── */
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Sin red: devolver página offline para HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      return offlinePage();
    }
    return new Response('', { status: 503 });
  }
}

/* ── Página offline inline ── */
function offlinePage() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wufly — Sin conexión</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #F5F3FF;
      font-family: system-ui, sans-serif;
      color: #2D1B6B;
      padding: 24px;
      text-align: center;
      gap: 16px;
    }
    .icon { font-size: 72px; }
    h1 { font-size: 24px; font-weight: 700; }
    p { font-size: 15px; color: #6B5FAA; max-width: 280px; line-height: 1.5; }
    button {
      margin-top: 8px;
      padding: 14px 32px;
      background: #7C4DCC;
      color: white;
      border: none;
      border-radius: 100px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="icon">🐾</div>
  <h1>Sin conexión</h1>
  <p>Wufly necesita internet para funcionar. Conéctate y vuelve a intentarlo.</p>
  <button onclick="location.reload()">Reintentar</button>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
