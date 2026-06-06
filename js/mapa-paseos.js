/* ══════════════════════════════════════
   MAPA DE PASEOS — Wufly
   Muestra perritos paseando cerca tuyo
   en tiempo real usando OpenStreetMap
   ══════════════════════════════════════ */

const _MP_REF  = 'ybnacudfqerbzpvqcjzc';
const _MP_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';

const _MP_EXPIRY_MIN = 5; // minutos visibles tras cerrar el mapa

/* ── Estado ── */
let _mpMap        = null;
let _mpWatchId    = null;
let _mpTimer      = null;  // upsert cada 2 min para no expirar
let _mpRefresh    = null;  // refresco de markers cada 30s
let _mpUserMarker = null;
let _mpDogMarkers = [];
let _mpUserCoords = null;

/* ── Redondear a ~200m (0.002° ≈ 222m) para privacidad ── */
function _mpAprox(v) { return Math.round(v / 0.002) * 0.002; }

/* ── Token JWT del usuario ── */
function _mpToken() {
  try {
    const v2 = JSON.parse(localStorage.getItem(`sb-${_MP_REF}-auth-token`) || 'null');
    if (v2?.access_token) return v2.access_token;
    const v1 = JSON.parse(localStorage.getItem('supabase.auth.token') || 'null');
    if (v1?.currentSession?.access_token) return v1.currentSession.access_token;
  } catch {}
  return _MP_ANON;
}

/* ── Cargar Leaflet CSS + JS si no están cargados ── */
function _mpCargarLeaflet() {
  if (window.L) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src     = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload  = resolve;
    script.onerror = () => reject(new Error('No se pudo cargar Leaflet'));
    document.head.appendChild(script);
  });
}

/* ══════════════════════════════════════
   ABRIR — valida perfil primero
   ══════════════════════════════════════ */
async function abrirMapaPaseos() {
  if (document.getElementById('mp-modal')) return;

  let perfil = {};
  try { perfil = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); } catch {}
  const nombrePerro = perfil.nombreMascota || '';
  const esPerry     = perfil.tipomascota === 'perro';

  // Sin perfil de perro → modal de aviso
  if (!esPerry || !nombrePerro) {
    _mpModalAviso();
    return;
  }

  _mpAbrirMapa(nombrePerro);
}

/* ── Modal de aviso: necesita perfil de perro ── */
function _mpModalAviso() {
  const modal = document.createElement('div');
  modal.id = 'mp-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease;';
  modal.innerHTML = `
    <div style="background:white;border-radius:28px 28px 0 0;width:100%;max-width:480px;padding:24px 24px 40px;text-align:center;">
      <div style="width:40px;height:4px;border-radius:100px;background:#E5E7EB;margin:0 auto 24px;"></div>
      <div style="font-size:52px;margin-bottom:14px;">🐾</div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:#1F0A4A;margin-bottom:10px;">Necesitas un perfil de perro</div>
      <div style="font-size:13px;color:#6B7280;line-height:1.6;margin-bottom:24px;">
        Para ver y aparecer en el mapa de paseos necesitas tener un perro registrado en tu perfil de Wufly.
      </div>
      <button onclick="abrirPerfil(); cerrarMapaPaseos();"
        style="width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;margin-bottom:10px;">
        Ir a mi perfil
      </button>
      <button onclick="cerrarMapaPaseos()"
        style="width:100%;padding:12px;border:1.5px solid #E5E7EB;border-radius:14px;background:white;color:#6B7280;font-family:'Funnel Display',sans-serif;font-weight:600;font-size:14px;cursor:pointer;">
        Cerrar
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

/* ── Abrir mapa completo ── */
async function _mpAbrirMapa(nombrePerro) {
  document.body.style.overflow = 'hidden';

  const modal = document.createElement('div');
  modal.id = 'mp-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease;';

  modal.innerHTML = `
    <div style="background:white;border-radius:28px 28px 0 0;width:100%;max-width:480px;height:88vh;display:flex;flex-direction:column;overflow:hidden;">

      <!-- Handle + header -->
      <div style="padding:14px 20px 10px;flex-shrink:0;">
        <div style="width:40px;height:4px;border-radius:100px;background:#E5E7EB;margin:0 auto 14px;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:#1F0A4A;">🐾 Perritos paseando</div>
            <div id="mp-subtitulo" style="font-size:11px;color:#9CA3AF;margin-top:2px;">Buscando tu ubicación...</div>
          </div>
          <button onclick="cerrarMapaPaseos()" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #E5E7EB;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#6B7280;fill:none;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Mapa -->
      <div id="mp-map" style="flex:1;min-height:0;"></div>

      <!-- Barra inferior: estado -->
      <div style="padding:12px 20px 30px;flex-shrink:0;border-top:1px solid #F3F4F6;display:flex;align-items:center;gap:10px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#10B981;flex-shrink:0;animation:mpPulse 2s ease-in-out infinite;"></div>
        <div style="font-size:12px;color:#6B7280;">Apareces en el mapa como <strong style="color:#1F0A4A;">${nombrePerro}</strong> · visible 5 min tras salir</div>
      </div>
    </div>
  `;

  // Keyframe para el pulso
  if (!document.getElementById('mp-styles')) {
    const s = document.createElement('style');
    s.id = 'mp-styles';
    s.textContent = `@keyframes mpPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`;
    document.head.appendChild(s);
  }

  document.body.appendChild(modal);

  try {
    await _mpCargarLeaflet();
    _mpIniciarMapa(nombrePerro);
  } catch {
    _mpSetSubtitulo('No se pudo cargar el mapa. Revisa tu conexión.');
  }
}

/* ══════════════════════════════════════
   INICIAR MAPA LEAFLET
   ══════════════════════════════════════ */
function _mpIniciarMapa(nombrePerro) {
  const container = document.getElementById('mp-map');
  if (!container || !window.L) return;

  _mpMap = L.map('mp-map', { zoomControl: true, attributionControl: false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(_mpMap);

  if (!navigator.geolocation) {
    _mpMap.setView([-33.45, -70.65], 13);
    _mpSetSubtitulo('Geolocalización no disponible.');
    _mpCargarPerritos();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      _mpUserCoords = { lat, lng };
      _mpMap.setView([lat, lng], 15);

      // Auto-aparecer al entrar al mapa
      _mpUpsertPaseo(nombrePerro).then(() => {
        _mpAgregarMarkerPropio(nombrePerro);
        _mpCargarPerritos();
      });

      // Watch GPS continuo
      _mpWatchId = navigator.geolocation.watchPosition(
        p => { _mpUserCoords = { lat: p.coords.latitude, lng: p.coords.longitude }; },
        null,
        { enableHighAccuracy: true, maximumAge: 30000 }
      );

      // Actualizar updated_at cada 2 min para no expirar mientras se usa
      _mpTimer = setInterval(() => {
        if (_mpUserCoords) _mpUpsertPaseo(nombrePerro);
      }, 2 * 60 * 1000);

      // Refrescar markers de otros perritos cada 30s
      _mpRefresh = setInterval(() => _mpCargarPerritos(), 30 * 1000);

      // Iniciar detección de Encuentro Canino
      if (typeof _ecIniciar === 'function') _ecIniciar();
    },
    () => {
      _mpMap.setView([-33.45, -70.65], 13);
      _mpSetSubtitulo('Permiso de ubicación denegado — no puedes aparecer en el mapa.');
      _mpCargarPerritos();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

/* ══════════════════════════════════════
   CARGAR PERRITOS DESDE SUPABASE
   ══════════════════════════════════════ */
async function _mpCargarPerritos() {
  if (!_mpMap) return;
  try {
    const cutoff = new Date(Date.now() - _MP_EXPIRY_MIN * 60 * 1000).toISOString();
    const res = await fetch(
      `https://${_MP_REF}.supabase.co/rest/v1/paseos_activos?select=nombre_perro,lat,lng,user_id&updated_at=gte.${cutoff}`,
      { headers: { 'apikey': _MP_ANON, 'Authorization': `Bearer ${_mpToken()}` } }
    );
    if (!res.ok) throw new Error();
    const perritos = await res.json();

    // Limpiar markers anteriores (excepto el propio)
    _mpDogMarkers.forEach(m => m.remove());
    _mpDogMarkers = [];

    const miId = (typeof currentUser !== 'undefined' && currentUser?.id) ? currentUser.id : null;
    const otros = perritos.filter(p => p.user_id !== miId);

    otros.forEach(p => {
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div style="background:white;border:2.5px solid #7C4DCC;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.22);">
              <span style="font-size:20px;line-height:1;">🐾</span>
            </div>
            <div style="background:#7C4DCC;color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;margin-top:3px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.18);font-family:'Plus Jakarta Sans',sans-serif;max-width:90px;overflow:hidden;text-overflow:ellipsis;">${p.nombre_perro}</div>
          </div>`,
        iconSize:   [90, 64],
        iconAnchor: [45, 64],
      });
      const marker = L.marker([p.lat, p.lng], { icon }).addTo(_mpMap);
      _mpDogMarkers.push(marker);
    });

    const total = otros.length;
    _mpSetSubtitulo(
      total === 0 ? 'No hay perritos cerca ahora mismo 🐾' :
      total === 1 ? '1 perrito paseando cerca de ti 🐾' :
                   `${total} perritos paseando cerca de ti 🐾`
    );
  } catch {
    _mpSetSubtitulo('No se pudo cargar los perritos.');
  }
}

/* ── Marker propio (borde azul para diferenciarse) ── */
function _mpAgregarMarkerPropio(nombrePerro) {
  if (!_mpMap || !_mpUserCoords) return;
  if (_mpUserMarker) _mpUserMarker.remove();

  const icon = L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="background:white;border:3px solid #2563EB;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.25);">
          <span style="font-size:20px;line-height:1;">🐾</span>
        </div>
        <div style="background:#2563EB;color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;margin-top:3px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.18);font-family:'Plus Jakarta Sans',sans-serif;">${nombrePerro} (tú)</div>
      </div>`,
    iconSize:   [110, 64],
    iconAnchor: [55, 64],
  });

  _mpUserMarker = L.marker(
    [_mpAprox(_mpUserCoords.lat), _mpAprox(_mpUserCoords.lng)],
    { icon }
  ).addTo(_mpMap);
}

/* ══════════════════════════════════════
   SUPABASE — UPSERT (sin DELETE al cerrar)
   ══════════════════════════════════════ */
async function _mpUpsertPaseo(nombrePerro) {
  if (!_mpUserCoords) return;
  const miId = (typeof currentUser !== 'undefined') ? currentUser?.id : null;
  if (!miId) return;
  try {
    await fetch(
      `https://${_MP_REF}.supabase.co/rest/v1/paseos_activos`,
      {
        method: 'POST',
        headers: {
          'apikey': _MP_ANON,
          'Authorization': `Bearer ${_mpToken()}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify({
          user_id:      miId,
          nombre_perro: nombrePerro,
          lat:          _mpAprox(_mpUserCoords.lat),
          lng:          _mpAprox(_mpUserCoords.lng),
          updated_at:   new Date().toISOString(),
        }),
      }
    );
  } catch (e) { console.warn('mp upsert:', e); }
}

/* ══════════════════════════════════════
   CERRAR MODAL — sin borrar de Supabase
   (expira solo en 5 min)
   ══════════════════════════════════════ */
function cerrarMapaPaseos() {
  if (_mpWatchId !== null) { navigator.geolocation.clearWatch(_mpWatchId); _mpWatchId = null; }
  if (_mpTimer)   { clearInterval(_mpTimer);   _mpTimer   = null; }
  if (_mpRefresh) { clearInterval(_mpRefresh); _mpRefresh = null; }
  if (_mpMap)     { _mpMap.remove();           _mpMap     = null; }

  // Detener detección de encuentros (el poll continúa si hay encuentro activo)
  if (typeof _ecDetener === 'function') _ecDetener();

  _mpUserMarker = null;
  _mpDogMarkers = [];
  _mpUserCoords = null;

  const modal = document.getElementById('mp-modal');
  if (modal) {
    modal.style.transition = 'opacity 0.2s ease';
    modal.style.opacity = '0';
    setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200);
  }
}

/* ── Helpers ── */
function _mpSetSubtitulo(txt) {
  const el = document.getElementById('mp-subtitulo');
  if (el) el.textContent = txt;
}
