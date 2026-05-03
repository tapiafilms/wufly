/* ══════════════════════════════════════════════════
   PASEADOR MODE — Wufly
   Solicitud de rol, pantalla de paseo activo,
   Wake Lock API y tracking de ubicación
   ══════════════════════════════════════════════════ */

let wakeLock = null;
let paseoActivo = false;
let paseoTimer = null;
let paseoSegundos = 0;
let watchId = null;
let rutaPuntos = [];

/* ══ DETECCIÓN DE ROL ══════════════════════════════ */

function esPaseador() {
  try {
    const p = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
    return p.rol === 'paseador' || p.rol === 'ambos';
  } catch { return false; }
}

function esPaseadorVerificado() {
  try {
    const p = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
    return p.verificado === true;
  } catch { return false; }
}

/* ══ RENDER SECCIÓN PASEADOR EN PERFIL ════════════ */

function renderSeccionPaseador() {
  const wrap = document.getElementById('paseadorSection');
  if (!wrap) return;

  // Sincronizar estado desde Supabase si hay sesión
  if (typeof currentUser !== 'undefined' && currentUser) {
    _cargarEstadoPaseadorDB();
  }

  const p = (() => { try { return JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); } catch { return {}; } })();
  const rol = p.rol || 'dueño';
  const verificado = p.verificado || false;
  const solicitudPendiente = p.solicitudPaseador === 'pendiente';

  if (rol === 'paseador' || rol === 'ambos') {
    if (verificado) {
      wrap.innerHTML = _htmlPaseadorVerificado(p);
    } else {
      wrap.innerHTML = _htmlSolicitudPendiente();
    }
  } else if (solicitudPendiente) {
    wrap.innerHTML = _htmlSolicitudPendiente();
  } else {
    wrap.innerHTML = _htmlBtnConvertirse();
  }
}

function _htmlBtnConvertirse() {
  return `
    <div style="background:var(--bg);border-radius:14px;padding:16px;margin:0 20px 16px;border:1.5px solid var(--border-md);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <span style="font-size:28px;">🐕</span>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:var(--text);">¿Eres paseador de perros?</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Únete al directorio verificado de Wufly</div>
        </div>
      </div>
      <button onclick="abrirFormPaseador()"
        style="width:100%;padding:11px;border-radius:var(--r-xs);border:none;background:var(--purple);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:14px;cursor:pointer;">
        Quiero ser paseador →
      </button>
    </div>`;
}

function _htmlSolicitudPendiente() {
  return `
    <div style="background:#FFF9E6;border-radius:14px;padding:16px;margin:0 20px 16px;border:1.5px solid rgba(234,179,8,0.3);">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:24px;">⏳</span>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:14px;color:#92400E;">Solicitud en revisión</div>
          <div style="font-size:11px;color:#B45309;margin-top:3px;line-height:1.5;">El equipo Wufly está revisando tu solicitud. Te avisaremos por correo cuando estés verificado.</div>
        </div>
      </div>
    </div>`;
}

function _htmlPaseadorVerificado(p) {
  return `
    <div style="background:var(--mint-light);border-radius:14px;padding:16px;margin:0 20px 16px;border:1.5px solid rgba(93,214,168,0.3);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:20px;">✅</span>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:var(--mint-dark);">Paseador verificado</div>
        </div>
        <span style="font-size:11px;font-weight:700;color:var(--mint-dark);background:rgba(93,214,168,0.3);padding:4px 10px;border-radius:100px;">${p.zonaPaseador || 'Viña del Mar'}</span>
      </div>
      <button onclick="iniciarModoPasseador()"
        style="width:100%;padding:13px;border-radius:var(--r-xs);border:none;background:var(--purple);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
        <span style="font-size:18px;">🐕</span> Iniciar modo paseador
      </button>
    </div>`;
}

/* ══ FORMULARIO DE SOLICITUD ══════════════════════ */

function abrirFormPaseador() {
  if (typeof currentUser === 'undefined' || !currentUser) {
    if (typeof abrirAuthModal === 'function') abrirAuthModal('login');
    return;
  }
  const modal = document.getElementById('formPaseadorModal');
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function cerrarFormPaseador() {
  const modal = document.getElementById('formPaseadorModal');
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

async function enviarSolicitudPaseador() {
  const nombre      = document.getElementById('fpNombre')?.value.trim();
  const zona        = document.getElementById('fpZona')?.value;
  const descripcion = document.getElementById('fpDescripcion')?.value.trim();
  const tarifa      = document.getElementById('fpTarifa')?.value.trim();
  const btn         = document.getElementById('fpBtnEnviar');

  if (!nombre || !zona || !descripcion) {
    _paseadorToast('Completa todos los campos obligatorios.', 'err'); return;
  }

  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    // Guardar solicitud en Supabase (sin .select() para evitar problemas de RLS)
    if (typeof db !== 'undefined' && currentUser) {
      const { error } = await db.from('solicitudes_paseador').insert({
        user_id:     currentUser.id,
        email:       currentUser.email,
        nombre,
        zona,
        descripcion,
        tarifa:      tarifa || null,
        estado:      'pendiente',
        created_at:  new Date().toISOString(),
      });
      if (error) throw error;
    }

    // Guardar estado en localStorage
    const p = (() => { try { return JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); } catch { return {}; } })();
    p.solicitudPaseador = 'pendiente';
    p.nombrePaseador = nombre;
    p.zonaPaseador = zona;
    localStorage.setItem('wufly_profile_v1', JSON.stringify(p));

    cerrarFormPaseador();
    renderSeccionPaseador();
    _paseadorToast('¡Solicitud enviada! Te avisaremos pronto. 🐾', 'ok');
  } catch(e) {
    console.error('Error solicitud paseador:', e);
    _paseadorToast('Error al enviar. Intenta de nuevo.', 'err');
    btn.disabled = false;
    btn.textContent = 'Enviar solicitud →';
  }
}

/* ══ CARGAR ESTADO DESDE SUPABASE ════════════════= */

async function _cargarEstadoPaseadorDB() {
  if (!currentUser || typeof db === 'undefined') return;
  try {
    const { data } = await db
      .from('solicitudes_paseador')
      .select('estado, nombre, zona')
      .eq('user_id', currentUser.id)
      .single();
    if (!data) return;
    const p = (() => { try { return JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); } catch { return {}; } })();
    p.solicitudPaseador = data.estado;
    p.rol = data.estado === 'aprobado' ? 'paseador' : p.rol || 'dueño';
    p.verificado = data.estado === 'aprobado';
    p.nombrePaseador = data.nombre;
    p.zonaPaseador = data.zona;
    localStorage.setItem('wufly_profile_v1', JSON.stringify(p));
    renderSeccionPaseador();
  } catch { /* sin datos */ }
}

/* ══ PANTALLA DE PASEO ACTIVO ════════════════════= */

function iniciarModoPasseador() {
  const overlay = document.getElementById('paseoActivoOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    _iniciarTimer();
    _activarWakeLock();
    _iniciarTracking();
  }
}

function cerrarModoPasseador() {
  const confirmado = confirm('¿Finalizar el paseo?');
  if (!confirmado) return;
  _detenerPaseo();
  const overlay = document.getElementById('paseoActivoOverlay');
  if (overlay) { overlay.style.display = 'none'; document.body.style.overflow = ''; }
}

function _iniciarTimer() {
  paseoSegundos = 0;
  paseoActivo = true;
  clearInterval(paseoTimer);
  _actualizarTimerUI();
  paseoTimer = setInterval(() => {
    if (!paseoActivo) return;
    paseoSegundos++;
    _actualizarTimerUI();
  }, 1000);
}

function _actualizarTimerUI() {
  const m = Math.floor(paseoSegundos / 60);
  const s = paseoSegundos % 60;
  const el = document.getElementById('paseoTimer');
  if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function _detenerPaseo() {
  paseoActivo = false;
  clearInterval(paseoTimer);
  _liberarWakeLock();
  _detenerTracking();
  rutaPuntos = [];
}

/* ══ WAKE LOCK ════════════════════════════════════ */

async function _activarWakeLock() {
  if (!('wakeLock' in navigator)) {
    _actualizarWakeLockUI(false);
    return;
  }
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    _actualizarWakeLockUI(true);
    wakeLock.addEventListener('release', () => {
      wakeLock = null;
      _actualizarWakeLockUI(false);
    });
  } catch { _actualizarWakeLockUI(false); }
}

function _liberarWakeLock() {
  if (wakeLock) { wakeLock.release(); wakeLock = null; }
  _actualizarWakeLockUI(false);
}

async function toggleWakeLock() {
  if (wakeLock) {
    _liberarWakeLock();
  } else {
    await _activarWakeLock();
  }
}

function _actualizarWakeLockUI(activo) {
  const pill = document.getElementById('wakeLockPill');
  const dot  = document.getElementById('wakeLockDot');
  const txt  = document.getElementById('wakeLockTxt');
  if (!pill) return;
  if (activo) {
    dot.style.background  = '#3DAF87';
    txt.textContent       = 'Pantalla activa';
    txt.style.color       = '#3DAF87';
    pill.style.borderColor = 'rgba(61,175,135,0.4)';
    pill.style.background  = 'rgba(61,175,135,0.12)';
  } else {
    dot.style.background  = '#9CA3AF';
    txt.textContent       = 'Pantalla libre';
    txt.style.color       = '#9CA3AF';
    pill.style.borderColor = 'rgba(156,163,175,0.3)';
    pill.style.background  = 'rgba(156,163,175,0.1)';
  }
}

// Reactivar wake lock al volver a la app
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && paseoActivo && wakeLock === null) {
    await _activarWakeLock();
  }
});

/* ══ TRACKING GPS ════════════════════════════════= */

function _iniciarTracking() {
  if (!navigator.geolocation) return;
  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const punto = { lat: pos.coords.latitude, lng: pos.coords.longitude, t: Date.now() };
      rutaPuntos.push(punto);
      _actualizarDistanciaUI();
      _enviarUbicacionSupabase(punto);
    },
    () => { /* error de GPS, continuar sin tracking */ },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  );
}

function _detenerTracking() {
  if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
}

function _actualizarDistanciaUI() {
  if (rutaPuntos.length < 2) return;
  let total = 0;
  for (let i = 1; i < rutaPuntos.length; i++) {
    total += _haversine(rutaPuntos[i-1], rutaPuntos[i]);
  }
  const el = document.getElementById('paseoDistancia');
  if (el) el.textContent = total < 1 ? `${Math.round(total * 1000)} m` : `${total.toFixed(1)} km`;
}

function _haversine(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(a.lat * Math.PI/180) * Math.cos(b.lat * Math.PI/180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

async function _enviarUbicacionSupabase(punto) {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) return;
  try {
    await db.from('paseo_ubicaciones').upsert({
      paseador_id: currentUser.id,
      lat: punto.lat,
      lng: punto.lng,
      updated_at: new Date().toISOString(),
    });
  } catch { /* error silencioso */ }
}

/* ══ FOTOS DURANTE EL PASEO ══════════════════════ */

function abrirCamaraPaseo() {
  const input = document.getElementById('paseoCamaraInput');
  if (input) input.click();
}

async function enviarFotoPaseo(input) {
  const f = input.files[0]; if (!f) return;
  input.value = '';
  _paseadorToast('Enviando foto al dueño…', 'info');
  try {
    if (typeof subirFotoComunidad === 'function' && typeof currentUser !== 'undefined' && currentUser) {
      const url = await subirFotoComunidad(f, 'paseo');
      _paseadorToast('¡Foto enviada al dueño! 📸', 'ok');
    } else {
      _paseadorToast('Foto lista (conéctate para enviarla).', 'info');
    }
  } catch { _paseadorToast('Error al enviar foto.', 'err'); }
}

/* ══ SOS ══════════════════════════════════════════ */

function activarSOS() {
  const confirmado = confirm('🆘 ¿Activar alerta SOS? El dueño será notificado de inmediato.');
  if (!confirmado) return;
  _paseadorToast('🆘 Alerta SOS enviada al dueño.', 'err');
  if (typeof db !== 'undefined' && typeof currentUser !== 'undefined' && currentUser) {
    db.from('paseo_alertas').insert({
      paseador_id: currentUser.id,
      tipo: 'sos',
      lat: rutaPuntos[rutaPuntos.length - 1]?.lat || null,
      lng: rutaPuntos[rutaPuntos.length - 1]?.lng || null,
      created_at: new Date().toISOString(),
    }).catch(() => {});
  }
}

/* ══ TOAST ════════════════════════════════════════ */

function _paseadorToast(msg, tipo = 'ok') {
  let t = document.getElementById('_paseadorToast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_paseadorToast';
    t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:99999;padding:10px 20px;border-radius:100px;font-size:13px;font-weight:700;font-family:"Plus Jakarta Sans",sans-serif;pointer-events:none;white-space:nowrap;transition:opacity 0.4s;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = tipo === 'ok' ? '#10B981' : tipo === 'err' ? '#EF4444' : '#6366F1';
  t.style.color = 'white';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

/* ══ INIT ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Renderizar cuando el DOM esté listo (cubre el caso sin sesión)
  renderSeccionPaseador();
  // Re-renderizar cuando auth.js confirme el estado de sesión
  if (typeof db !== 'undefined') {
    db.auth.onAuthStateChange(() => renderSeccionPaseador());
  }
});