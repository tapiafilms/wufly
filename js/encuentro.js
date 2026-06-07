/* ══════════════════════════════════════
   ENCUENTRO CANINO — Wufly
   Detecta perritos cercanos y propone
   un encuentro social gamificado.
   Premio: badge ✨ Premium para ambos.
   ══════════════════════════════════════ */

const _EC_WORKER = 'https://wufly-push.pablo77tapia.workers.dev';
const _EC_REF    = 'ybnacudfqerbzpvqcjzc';
const _EC_ANON   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';

/* ── Estado ── */
let _ecProxInterval  = null;  // chequeo de proximidad cada 30s
let _ecPollInterval  = null;  // polling de estado cada 15s
let _ecEncuentro     = null;  // encuentro actual { ...data, miRol }
let _ecBannerMostrado = false;

/* ── Inyectar estilos una vez ── */
(function _ecInjectStyles() {
  if (document.getElementById('ec-styles')) return;
  const s = document.createElement('style');
  s.id = 'ec-styles';
  s.textContent = `
    @keyframes ecSlideDown  { from{opacity:0;transform:translateX(-50%) translateY(-20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    @keyframes ecPulse      { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
    @keyframes ecSpin       { to{transform:rotate(360deg)} }
    @keyframes ecFadeIn     { from{opacity:0} to{opacity:1} }
    @keyframes ecShimmer    { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  `;
  document.head.appendChild(s);
})();

/* ── Haversine — distancia en metros ── */
function _ecDist(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/* ── Token JWT ── */
function _ecToken() {
  try {
    const v2 = JSON.parse(localStorage.getItem(`sb-${_EC_REF}-auth-token`) || 'null');
    if (v2?.access_token) return v2.access_token;
    const v1 = JSON.parse(localStorage.getItem('supabase.auth.token') || 'null');
    if (v1?.currentSession?.access_token) return v1.currentSession.access_token;
  } catch {}
  return _EC_ANON;
}

function _ecH(extra = {}) {
  return { 'apikey': _EC_ANON, 'Authorization': `Bearer ${_ecToken()}`, ...extra };
}

/* ── Perfil del usuario ── */
function _ecPerfil() {
  try { return JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); } catch { return {}; }
}

/* ── ID del usuario ── */
function _ecUserId() {
  return (typeof currentUser !== 'undefined' && currentUser?.id) ? currentUser.id : null;
}

/* ══════════════════════════════════════
   INICIAR / DETENER
   ══════════════════════════════════════ */
function _ecIniciar() {
  if (_ecProxInterval) return; // ya corriendo

  // Chequeo de proximidad cada 30s
  _ecProxInterval = setInterval(_ecChequearCercanos, 30000);
  setTimeout(_ecChequearCercanos, 2000); // primer chequeo tras 2s (esperar GPS)

  // Polling de estado cada 15s (para ver encuentros entrantes y cambios)
  _ecPollInterval = setInterval(_ecPollEstados, 15000);

  // Verificar premium al arrancar
  _ecVerificarPremium();
}

function _ecDetener() {
  // Solo detenemos el chequeo de proximidad, el poll sigue si hay encuentro activo
  if (_ecProxInterval) { clearInterval(_ecProxInterval); _ecProxInterval = null; }
  if (!_ecEncuentro && _ecPollInterval) { clearInterval(_ecPollInterval); _ecPollInterval = null; }
}

/* ══════════════════════════════════════
   DETECCIÓN DE PROXIMIDAD
   ══════════════════════════════════════ */
async function _ecChequearCercanos() {
  const miId = _ecUserId();
  if (!miId) return;

  // Solo si hay ubicación disponible (de mapa-paseos.js)
  if (typeof _mpUserCoords === 'undefined' || !_mpUserCoords) return;

  const perfil = _ecPerfil();
  const miNombre = perfil.nombreMascota || '';
  if (perfil.tipomascota !== 'perro' || !miNombre) return;

  // Si ya hay un encuentro activo no buscar otro
  if (_ecEncuentro && _ecEncuentro.estado !== 'expirado' && _ecEncuentro.estado !== 'rechazado') return;

  try {
    const cutoff = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/paseos_activos?select=user_id,nombre_perro,lat,lng&updated_at=gte.${cutoff}`,
      { headers: _ecH() }
    );
    if (!res.ok) return;
    const perritos = await res.json();

    for (const p of perritos) {
      if (p.user_id === miId) continue;

      const dist = _ecDist(_mpUserCoords.lat, _mpUserCoords.lng, p.lat, p.lng);
      if (dist > 300) continue; // fuera del radio (~300m para compensar aproximación)

      // Evitar duplicar encuentros recientes con el mismo par
      if (await _ecTieneEncuentroReciente(miId, p.user_id)) continue;

      // Solo el usuario con ID "menor" crea el encuentro (evita condición de carrera)
      if (miId < p.user_id) {
        await _ecCrearEncuentro(miId, p.user_id, miNombre, p.nombre_perro);
      }
      break; // un encuentro a la vez
    }
  } catch (e) { console.warn('[ec] chequear cercanos:', e); }
}

/* ── ¿Ya existe un encuentro reciente entre estos dos? ── */
async function _ecTieneEncuentroReciente(uid1, uid2) {
  try {
    const hace2h = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/encuentros?or=(and(user1_id.eq.${uid1},user2_id.eq.${uid2}),and(user1_id.eq.${uid2},user2_id.eq.${uid1}))&created_at=gte.${hace2h}&select=id&limit=1`,
      { headers: _ecH() }
    );
    const data = await res.json();
    return Array.isArray(data) && data.length > 0;
  } catch { return false; }
}

/* ── Crear encuentro en Supabase ── */
async function _ecCrearEncuentro(uid1, uid2, nombre1, nombre2) {
  try {
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/encuentros`,
      {
        method: 'POST',
        headers: { ..._ecH({ 'Content-Type': 'application/json', 'Prefer': 'return=representation' }) },
        body: JSON.stringify({ user1_id: uid1, user2_id: uid2, nombre1, nombre2 }),
      }
    );
    if (!res.ok) return;
    const data = await res.json();
    const enc  = Array.isArray(data) ? data[0] : data;

    _ecEncuentro = { ...enc, miRol: 'user1' };

    // Notificar al otro usuario por push
    await _ecPush(uid2, '🐾 ¡Hay un perrito Wufly cerca!',
      `${nombre1} quiere hacer un Encuentro Canino con ${nombre2}. ¡Acepta y gana el badge Premium!`);

    // Mostrar banner al creador también
    _ecMostrarBanner(enc, nombre2);
  } catch (e) { console.warn('[ec] crear:', e); }
}

/* ── Push a usuario específico ── */
async function _ecPush(userId, title, body) {
  try {
    await fetch(`${_EC_WORKER}/push-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, payload: { title, body, icon: '/img/icono.png', url: '/' } }),
    });
  } catch (e) { console.warn('[ec] push:', e); }
}

/* ══════════════════════════════════════
   POLLING DE ESTADOS
   ══════════════════════════════════════ */
async function _ecPollEstados() {
  const miId = _ecUserId();
  if (!miId) return;

  try {
    const hace2h = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/encuentros?or=(user1_id.eq.${miId},user2_id.eq.${miId})&created_at=gte.${hace2h}&estado=not.in.(expirado,rechazado)&order=created_at.desc&limit=1`,
      { headers: _ecH() }
    );
    if (!res.ok) return;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return;

    const enc    = data[0];
    const miRol  = enc.user1_id === miId ? 'user1' : 'user2';
    const yaAcepté = miRol === 'user1' ? enc.user1_acepto : enc.user2_acepto;
    const nombreOtro = miRol === 'user1' ? enc.nombre2 : enc.nombre1;

    // Encuentro nuevo que no había visto → mostrar banner
    if (!_ecEncuentro || _ecEncuentro.id !== enc.id) {
      if (enc.estado === 'pendiente' && !yaAcepté && !_ecBannerMostrado) {
        _ecEncuentro = { ...enc, miRol };
        _ecMostrarBanner(enc, nombreOtro);
      }
    }

    // Actualizar estado local
    if (_ecEncuentro && _ecEncuentro.id === enc.id) {
      _ecEncuentro = { ...enc, miRol };

      // Si ambos aceptaron → marcar activo (si aún no lo está)
      if (enc.user1_acepto && enc.user2_acepto && enc.estado === 'pendiente') {
        await _ecSetEstado(enc.id, 'activo');
        _ecEncuentro.estado = 'activo';
      }

      // Ambos aceptaron → mostrar pantalla de foto
      if (_ecEncuentro.estado === 'activo' && !document.getElementById('ec-foto-modal')) {
        _ecMostrarPantallaFoto(enc);
      }

      // Completado → otorgar premium local y mostrar celebración
      if (_ecEncuentro.estado === 'completado' && !document.getElementById('ec-celebracion')) {
        // Marcar premium en este dispositivo (independiente de quién tomó la foto)
        localStorage.setItem('wufly_premium', '1');
        _ecActualizarBadgePremium();
        _ecMostrarCelebracion(enc);
      }

      // Expirar si lleva más de 10 min sin actividad en estado pendiente
      if (enc.estado === 'pendiente') {
        const mins = (Date.now() - new Date(enc.created_at).getTime()) / 60000;
        if (mins > 10) await _ecSetEstado(enc.id, 'expirado');
      }
    }
  } catch (e) { console.warn('[ec] poll:', e); }
}

async function _ecSetEstado(id, estado) {
  try {
    await fetch(`https://${_EC_REF}.supabase.co/rest/v1/encuentros?id=eq.${id}`, {
      method: 'PATCH',
      headers: _ecH({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ estado, updated_at: new Date().toISOString() }),
    });
  } catch (e) { console.warn('[ec] setEstado:', e); }
}

/* ══════════════════════════════════════
   BANNER DE ENCUENTRO
   ══════════════════════════════════════ */
function _ecMostrarBanner(enc, nombreOtro) {
  if (document.getElementById('ec-banner')) return;
  _ecBannerMostrado = true;

  const banner = document.createElement('div');
  banner.id = 'ec-banner';
  banner.style.cssText = `
    position:fixed;top:108px;left:50%;transform:translateX(-50%);
    z-index:5000;width:calc(100% - 32px);max-width:400px;
    background:white;border-radius:20px;
    box-shadow:0 8px 32px rgba(0,0,0,0.22);
    padding:16px;
    animation:ecSlideDown 0.4s cubic-bezier(0.34,1.56,0.64,1);
  `;

  banner.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
      <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#5C2FA8,#9333EA);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:ecPulse 1.8s ease-in-out infinite;">
        <span style="font-size:26px;">🐾</span>
      </div>
      <div style="flex:1;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;color:#1F0A4A;">¡Encuentro Canino!</div>
        <div style="font-size:12px;color:#6B7280;margin-top:2px;"><strong style="color:#7C4DCC;">${nombreOtro}</strong> está paseando muy cerca 🐕</div>
      </div>
      <button onclick="_ecCerrarBanner()" style="width:28px;height:28px;border-radius:50%;border:1.5px solid #E5E7EB;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:#9CA3AF;fill:none;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="font-size:12px;color:#6B7280;margin-bottom:12px;line-height:1.5;">
      Saludémonos, tómense una foto juntos y ganen el badge <strong style="color:#D97706;">✨ Premium</strong>.
    </div>
    <div style="display:flex;gap:8px;">
      <button onclick="ecAceptar('${enc.id}')"
        style="flex:1;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:13px;cursor:pointer;">
        🐕 ¡Saludar!
      </button>
      <button onclick="ecRechazar('${enc.id}')"
        style="padding:11px 16px;border:1.5px solid #E5E7EB;border-radius:12px;background:white;color:#9CA3AF;font-size:12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
        Ignorar
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Auto-cerrar a los 60s si no se interactúa
  setTimeout(() => { if (document.getElementById('ec-banner')) _ecCerrarBanner(); }, 60000);
}

function _ecCerrarBanner() {
  const b = document.getElementById('ec-banner');
  if (!b) return;
  b.style.transition = 'opacity 0.2s, transform 0.2s';
  b.style.opacity = '0';
  b.style.transform = 'translateX(-50%) translateY(-10px)';
  setTimeout(() => b.remove(), 200);
}

/* ══════════════════════════════════════
   ACEPTAR / RECHAZAR
   ══════════════════════════════════════ */
async function ecAceptar(encuentroId) {
  _ecCerrarBanner();
  if (!_ecEncuentro) return;

  const miRol  = _ecEncuentro.miRol;
  const campo  = miRol === 'user1' ? 'user1_acepto' : 'user2_acepto';
  const otroId = miRol === 'user1' ? _ecEncuentro.user2_id : _ecEncuentro.user1_id;
  const miNombre    = miRol === 'user1' ? _ecEncuentro.nombre1 : _ecEncuentro.nombre2;
  const nombreOtro  = miRol === 'user1' ? _ecEncuentro.nombre2 : _ecEncuentro.nombre1;

  try {
    await fetch(`https://${_EC_REF}.supabase.co/rest/v1/encuentros?id=eq.${encuentroId}`, {
      method: 'PATCH',
      headers: _ecH({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ [campo]: true, updated_at: new Date().toISOString() }),
    });

    // Notificar al otro que acepté
    await _ecPush(otroId, '🐾 ¡Encuentro Canino!', `${miNombre} aceptó encontrarse con ${nombreOtro}. ¡Acepta tú también!`);

    _ecToast('✅ ¡Genial! Esperando que el otro dueño acepte...');
    // El poll detectará cuando ambos acepten y mostrará la pantalla de foto
  } catch (e) {
    console.warn('[ec] aceptar:', e);
    _ecToast('No se pudo aceptar. Intenta de nuevo.');
  }
}

async function ecRechazar(encuentroId) {
  _ecCerrarBanner();
  try {
    await _ecSetEstado(encuentroId, 'rechazado');
  } catch {}
  _ecEncuentro = null;
  _ecBannerMostrado = false;
}

/* ══════════════════════════════════════
   PANTALLA DE FOTO
   ══════════════════════════════════════ */
function _ecMostrarPantallaFoto(enc) {
  if (document.getElementById('ec-foto-modal')) return;

  const miRol      = _ecEncuentro?.miRol || 'user1';
  const miNombre   = miRol === 'user1' ? enc.nombre1 : enc.nombre2;
  const nombreOtro = miRol === 'user1' ? enc.nombre2 : enc.nombre1;

  const modal = document.createElement('div');
  modal.id = 'ec-foto-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:4500;background:rgba(0,0,0,0.72);display:flex;align-items:flex-end;justify-content:center;animation:ecFadeIn 0.2s ease;';

  modal.innerHTML = `
    <div style="background:white;border-radius:28px 28px 0 0;width:100%;max-width:480px;padding:24px 24px 44px;text-align:center;">
      <div style="width:40px;height:4px;border-radius:100px;background:#E5E7EB;margin:0 auto 20px;"></div>
      <div style="font-size:52px;margin-bottom:12px;">📸</div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:22px;color:#1F0A4A;margin-bottom:8px;">
        ¡Foto juntos!
      </div>
      <div style="font-size:13px;color:#6B7280;line-height:1.6;margin-bottom:10px;">
        <strong>${miNombre}</strong> y <strong>${nombreOtro}</strong> deben aparecer juntos.<br>
        Asegúrate que ambos perros se vean claramente.
      </div>
      <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;padding:10px 14px;font-size:12px;color:#92400E;margin-bottom:20px;text-align:left;line-height:1.5;">
        💡 Cualquiera de los dos dueños puede tomar la foto. La IA la convertirá en estilo Pixar y ambos ganarán el badge <strong>✨ Premium</strong>.
      </div>
      <button onclick="document.getElementById('ec-input-foto').click()"
        style="width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 16px rgba(92,47,168,0.4);">
        📷 Tomar foto del encuentro
      </button>
      <input type="file" id="ec-input-foto" accept="image/*" capture="environment" style="display:none;"
        onchange="_ecSubirFoto(this,'${enc.id}')">
      <button onclick="document.getElementById('ec-foto-modal').remove()"
        style="width:100%;padding:12px;border:1.5px solid #E5E7EB;border-radius:14px;background:white;color:#9CA3AF;font-family:'Funnel Display',sans-serif;font-weight:600;font-size:13px;cursor:pointer;">
        Más tarde
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

/* ══════════════════════════════════════
   SUBIR FOTO + GENERAR PIXAR
   ══════════════════════════════════════ */
async function _ecSubirFoto(input, encuentroId) {
  const file = input.files[0];
  if (!file) return;

  // Validación básica
  if (file.size < 30 * 1024) {
    _ecToast('La foto parece muy pequeña o es una captura de pantalla. Intenta de nuevo.');
    return;
  }
  if (!file.type.startsWith('image/')) {
    _ecToast('El archivo no es una imagen válida.');
    return;
  }

  const modal = document.getElementById('ec-foto-modal');
  if (modal) modal.remove();

  _ecOverlay('Subiendo foto...');

  const miId = _ecUserId();
  if (!miId) return;

  try {
    // Comprimir foto
    const blob = await _ecComprimir(file);

    // Subir a Supabase Storage
    const fileName = `${encuentroId}_${Date.now()}.jpg`;
    const uploadRes = await fetch(
      `https://${_EC_REF}.supabase.co/storage/v1/object/fotos-encuentros/${fileName}`,
      {
        method: 'POST',
        headers: { ..._ecH({ 'Content-Type': 'image/jpeg', 'x-upsert': 'true' }) },
        body: blob,
      }
    );
    if (!uploadRes.ok) throw new Error(`Upload ${uploadRes.status}`);

    const fotoUrl = `https://${_EC_REF}.supabase.co/storage/v1/object/public/fotos-encuentros/${fileName}`;

    // Guardar URL en encuentro
    await fetch(`https://${_EC_REF}.supabase.co/rest/v1/encuentros?id=eq.${encuentroId}`, {
      method: 'PATCH',
      headers: _ecH({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ foto_url: fotoUrl, estado: 'foto_subida', updated_at: new Date().toISOString() }),
    });

    // Enviar al worker para generar Pixar
    _ecOverlay('La IA está creando la magia... ✨');

    const pixarRes = await fetch(`${_EC_WORKER}/api/encuentro/pixar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fotoUrl, encuentroId }),
    });
    if (!pixarRes.ok) throw new Error('Pixar queue falló');

    const { requestId, statusUrl, responseUrl } = await pixarRes.json();
    await _ecPollPixar(requestId, statusUrl, responseUrl, encuentroId, fotoUrl);

  } catch (err) {
    console.error('[ec] subir foto:', err);
    _ecOcultarOverlay();
    _ecToast('No se pudo procesar la foto. Intenta de nuevo.');
    if (_ecEncuentro) _ecMostrarPantallaFoto(_ecEncuentro);
  }
}

/* ── Comprimir foto ── */
function _ecComprimir(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1080;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else       { w = Math.round(w * MAX / h); h = MAX; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob falló')), 'image/jpeg', 0.82);
      };
      img.onerror = () => reject(new Error('Error cargando imagen'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error leyendo archivo'));
    reader.readAsDataURL(file);
  });
}

/* ── Polling Pixar ── */
async function _ecPollPixar(requestId, statusUrl, responseUrl, encuentroId, fotoUrl) {
  const inicio = Date.now();
  let intento = 0;

  while (Date.now() - inicio < 120000) {
    await new Promise(r => setTimeout(r, intento < 4 ? 4000 : 6000));
    intento++;
    _ecOverlay(`Creando tu foto Pixar${'...'.slice(0, (intento % 3) + 1)} ✨`);

    try {
      const poll = await fetch(
        `${_EC_WORKER}/api/juntar-status?id=${requestId}&statusUrl=${encodeURIComponent(statusUrl)}&responseUrl=${encodeURIComponent(responseUrl)}`
      );
      if (!poll.ok) continue;
      const { status, imagenUrl } = await poll.json();

      if (status === 'COMPLETED' && imagenUrl) {
        await _ecCompletarEncuentro(encuentroId, imagenUrl);
        return;
      }
      if (status === 'FAILED') throw new Error('fal.ai job failed');

    } catch (err) {
      if (err.message === 'fal.ai job failed') throw err;
      continue; // error de red, reintentar
    }
  }
  throw new Error('Timeout generando Pixar');
}

/* ── Completar encuentro ── */
async function _ecCompletarEncuentro(encuentroId, pixarUrl) {
  try {
    // Llamar al worker para marcar como completado y otorgar premium (usa service role)
    await fetch(`${_EC_WORKER}/api/encuentro/completar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encuentroId, pixarUrl }),
    });

    // Guardar premium en caché local
    localStorage.setItem('wufly_premium', '1');
    _ecActualizarBadgePremium();

    _ecOcultarOverlay();

    // Obtener datos actualizados del encuentro
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/encuentros?id=eq.${encuentroId}&select=*`,
      { headers: _ecH() }
    );
    const data = await res.json();
    const enc  = Array.isArray(data) ? { ...data[0], pixar_url: pixarUrl } : _ecEncuentro;

    _ecMostrarCelebracion(enc);

  } catch (e) {
    console.error('[ec] completar:', e);
    _ecOcultarOverlay();
    _ecToast('¡Encuentro completado! Abre la app en un momento para ver tu foto Pixar.');
  }
}

/* ══════════════════════════════════════
   PANTALLA DE CELEBRACIÓN
   ══════════════════════════════════════ */
function _ecMostrarCelebracion(enc) {
  if (document.getElementById('ec-celebracion')) return;

  const nombre1 = enc?.nombre1 || 'tu perro';
  const nombre2 = enc?.nombre2 || 'el otro perro';

  const modal = document.createElement('div');
  modal.id = 'ec-celebracion';
  modal.style.cssText = 'position:fixed;inset:0;z-index:6000;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:20px;animation:ecFadeIn 0.3s ease;';

  modal.innerHTML = `
    <div style="background:white;border-radius:28px;width:100%;max-width:380px;overflow:hidden;">

      <!-- Foto Pixar -->
      ${enc?.pixar_url ? `
        <div style="position:relative;background:#1a0a3c;">
          <img src="${enc.pixar_url}" alt="Encuentro Pixar" style="width:100%;display:block;">
          <!-- Badge premium sobre la imagen -->
          <div style="position:absolute;top:14px;right:14px;background:linear-gradient(135deg,#F59E0B,#D97706);border-radius:20px;padding:5px 12px;display:flex;align-items:center;gap:5px;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
            <span style="font-size:13px;">✨</span>
            <span style="font-size:11px;font-weight:800;color:white;font-family:'Funnel Display',sans-serif;">PREMIUM</span>
          </div>
        </div>
      ` : ''}

      <!-- Contenido -->
      <div style="padding:22px 22px 30px;text-align:center;">
        <div style="font-size:40px;margin-bottom:10px;">🎉</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:22px;color:#1F0A4A;margin-bottom:8px;">
          ¡Encuentro completado!
        </div>
        <div style="font-size:13px;color:#6B7280;line-height:1.6;margin-bottom:18px;">
          <strong>${nombre1}</strong> y <strong>${nombre2}</strong> ya son amigos en Wufly.<br>
          ¡Ambos obtuvieron el badge <strong style="color:#D97706;">✨ Premium</strong>!
        </div>

        <!-- Badge visual -->
        <div style="background:linear-gradient(135deg,#FEF3C7,#FDE68A);border:2px solid #F59E0B;border-radius:18px;padding:16px;margin-bottom:20px;">
          <div style="font-size:32px;margin-bottom:6px;">✨</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:17px;color:#92400E;">Usuario Premium Wufly</div>
          <div style="font-size:11px;color:#B45309;margin-top:3px;">Tu perfil ahora tiene un badge especial</div>
        </div>

        <div style="display:flex;gap:10px;">
          ${enc?.pixar_url ? `
          <button onclick="_ecCompartir('${enc.pixar_url}')"
            style="flex:1;padding:13px;border:1.5px solid #E5E7EB;border-radius:13px;background:white;color:#1F0A4A;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:13px;cursor:pointer;">
            Compartir
          </button>
          ` : ''}
          <button onclick="_ecCerrarCelebracion()"
            style="flex:1;padding:13px;border:none;border-radius:13px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:13px;cursor:pointer;">
            ¡Genial! 🐾
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Resetear estado
  _ecEncuentro = null;
  _ecBannerMostrado = false;
}

function _ecCerrarCelebracion() {
  const m = document.getElementById('ec-celebracion');
  if (m) { m.style.opacity = '0'; m.style.transition = 'opacity 0.2s'; setTimeout(() => m.remove(), 200); }
}

async function _ecCompartir(url) {
  if (navigator.share) {
    try { await navigator.share({ title: '¡Encuentro Canino Wufly! 🐾✨', text: '¡Mira la foto Pixar de nuestro encuentro!', url }); return; } catch {}
  }
  try { await navigator.clipboard.writeText(url); _ecToast('¡Enlace copiado!'); } catch {}
}

/* ══════════════════════════════════════
   PREMIUM — BADGE EN UI
   ══════════════════════════════════════ */
function _ecActualizarBadgePremium() {
  // Cambiar logo a versión premium con fade
  const logo = document.getElementById('wufly-logo');
  if (logo && !logo.src.includes('logo-premium')) {
    logo.style.transition = 'opacity 0.4s ease';
    logo.style.opacity = '0';
    setTimeout(() => {
      logo.src = 'img/logo-premium.png';
      logo.style.opacity = '1';
      // Activar estrellas ahora que el usuario es premium
      if (typeof _initLogoStars === 'function') _initLogoStars();
    }, 400);
  } else {
    // Ya tiene logo premium, activar estrellas directamente
    if (typeof _initLogoStars === 'function') _initLogoStars();
  }
}

async function _ecVerificarPremium() {
  // Check local cache first
  if (localStorage.getItem('wufly_premium') === '1') { _ecActualizarBadgePremium(); return; }

  const miId = _ecUserId();
  if (!miId) return;

  try {
    const res = await fetch(
      `https://${_EC_REF}.supabase.co/rest/v1/wufly_premium?user_id=eq.${miId}&select=premium&limit=1`,
      { headers: _ecH() }
    );
    const data = await res.json();
    if (Array.isArray(data) && data[0]?.premium) {
      localStorage.setItem('wufly_premium', '1');
      _ecActualizarBadgePremium();
    }
  } catch {}
}

/* ── Verificar premium al cargar la app (con espera a que auth esté listo) ── */
document.addEventListener('DOMContentLoaded', () => {
  // Si ya está en localStorage, aplicar inmediatamente
  if (localStorage.getItem('wufly_premium') === '1') {
    _ecActualizarBadgePremium();
  }
  // Verificar contra Supabase una vez que el usuario esté autenticado
  setTimeout(_ecVerificarPremium, 2500);
});

/* ══════════════════════════════════════
   HELPERS
   ══════════════════════════════════════ */
function _ecOverlay(texto) {
  let ov = document.getElementById('ec-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'ec-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:5500;background:rgba(0,0,0,0.80);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;animation:ecFadeIn 0.2s ease;';
    document.body.appendChild(ov);
  }
  ov.innerHTML = `
    <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;flex-shrink:0;">
      <video src="img/generando.mp4" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
    </div>
    <div style="color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;letter-spacing:0.02em;">${texto}</div>
  `;
}

function _ecOcultarOverlay() {
  const ov = document.getElementById('ec-overlay');
  if (ov) ov.remove();
}

function _ecToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:#1F0A4A;color:white;padding:10px 18px;border-radius:100px;font-size:13px;font-weight:600;z-index:9999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.3);';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
