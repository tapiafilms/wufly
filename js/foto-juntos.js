/* ══════════════════════════════════════
   FOTO JUNTOS — Wufly
   IA une foto de mascota + selfie en
   una imagen mágica compartible
   ══════════════════════════════════════ */

const JUNTOS_WORKER_URL = 'https://wufly-push.pablo77tapia.workers.dev/api/juntar-fotos';
const SUPABASE_REF_J    = 'ybnacudfqerbzpvqcjzc';
const SUPABASE_ANON_J   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';

/* ── Estado interno ── */
let _jFotoMascota = null;
let _jSelfie      = null;
let _jLugar       = 'beautiful beach in Patagonia';

const JUNTOS_LUGARES = [
  { label: '🏖️ Playa',     prompt: 'beautiful beach in Patagonia' },
  { label: '🏔️ Andes',     prompt: 'snowy Andes mountains at sunset' },
  { label: '🌌 Espacio',    prompt: 'outer space surrounded by stars and galaxies' },
  { label: '🌿 Bosque',     prompt: 'magical enchanted forest with glowing lights' },
  { label: '🏙️ Ciudad',    prompt: 'futuristic neon city skyline at night' },
];

/* ── Leer tipo de mascota del perfil ── */
function _juntosGetTipoPet() {
  try {
    const perfil = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
    const tipo = perfil.tipomascota || '';
    const map = { perro: 'dog', gato: 'cat', conejo: 'rabbit', ave: 'bird', pez: 'fish' };
    return map[tipo] || 'pet';
  } catch { return 'pet'; }
}

/* ── Abrir modal ── */
function abrirJuntos() {
  const existing = document.getElementById('juntos-modal');
  if (existing) existing.remove();
  _jFotoMascota = null;
  _jSelfie      = null;
  _jLugar       = JUNTOS_LUGARES[0].prompt;

  // Bloquear scroll del home mientras el modal está abierto
  document.body.style.overflow = 'hidden';

  const modal = document.createElement('div');
  modal.id = 'juntos-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.6);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease;';

  modal.innerHTML = `
    <div style="background:white;border-radius:28px 28px 0 0;width:100%;max-width:480px;padding:20px 20px 36px;max-height:90vh;overflow-y:auto;">

      <!-- Handle -->
      <div style="width:40px;height:4px;border-radius:100px;background:#E5E7EB;margin:0 auto 16px;"></div>

      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:#1F0A4A;">✨ Juntos</div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:1px;">Tu y tu mascota en un lugar mágico</div>
        </div>
        <button onclick="cerrarJuntos()" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #E5E7EB;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#6B7280;fill:none;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Fotos: lado a lado -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">

        <!-- Mascota -->
        <div>
          <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:6px;">TU MASCOTA</div>
          <div id="juntos-z-mascota" onclick="document.getElementById('juntos-input-mascota').click()"
            style="aspect-ratio:1/1;border:2px dashed #DDD6FE;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#FAFAFA;transition:all 0.2s;overflow:hidden;position:relative;">
            <input type="file" id="juntos-input-mascota" accept="image/*" style="display:none;" onchange="juntosCargarFoto(this,'mascota')">
            <div id="juntos-ph-mascota" style="text-align:center;">
              <div style="font-size:28px;margin-bottom:4px;">🐾</div>
              <div style="font-size:11px;font-weight:600;color:#7C4DCC;">Subir foto</div>
            </div>
            <div id="juntos-prev-mascota" style="display:none;position:absolute;inset:0;"></div>
          </div>
        </div>

        <!-- Selfie -->
        <div>
          <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:6px;">TU SELFIE</div>
          <div id="juntos-z-selfie" onclick="document.getElementById('juntos-input-selfie').click()"
            style="aspect-ratio:1/1;border:2px dashed #DDD6FE;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#FAFAFA;transition:all 0.2s;overflow:hidden;position:relative;">
            <input type="file" id="juntos-input-selfie" accept="image/*" style="display:none;" onchange="juntosCargarFoto(this,'selfie')">
            <div id="juntos-ph-selfie" style="text-align:center;">
              <div style="font-size:28px;margin-bottom:4px;">🤳</div>
              <div style="font-size:11px;font-weight:600;color:#7C4DCC;">Subir selfie</div>
            </div>
            <div id="juntos-prev-selfie" style="display:none;position:absolute;inset:0;"></div>
          </div>
        </div>
      </div>

      <!-- Lugar -->
      <div style="margin-bottom:16px;">
        <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:8px;">LUGAR</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;" id="juntos-lugares">
          ${JUNTOS_LUGARES.map((l, i) => `
            <button onclick="juntosElegirLugar(this,'${l.prompt}')"
              style="padding:6px 12px;border-radius:100px;border:1.5px solid ${i===0?'#7C4DCC':'#E5E7EB'};background:${i===0?'#EDE9FE':'white'};font-size:12px;font-weight:600;color:${i===0?'#7C4DCC':'#6B7280'};cursor:pointer;transition:all 0.15s;white-space:nowrap;">
              ${l.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Botón Juntar -->
      <button id="juntos-btn" onclick="juntosGenerar()"
        style="width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 6px 20px rgba(92,47,168,0.4);display:flex;align-items:center;justify-content:center;gap:10px;opacity:0.45;pointer-events:none;transition:opacity 0.2s;">
        <span style="font-size:18px;">✨</span> Juntar con IA
      </button>

      <!-- Resultado -->
      <div id="juntos-resultado" style="display:none;margin-top:16px;"></div>

    </div>
  `;
  document.body.appendChild(modal);
}

/* ── Cerrar modal con animación slide-down + reload ── */
function cerrarJuntos(recargar = false) {
  const m = document.getElementById('juntos-modal');
  if (!m) return;
  const sheet = m.firstElementChild;
  if (sheet) {
    sheet.style.transition = 'transform 0.35s cubic-bezier(0.4,0,1,1)';
    sheet.style.transform  = 'translateY(110%)';
  }
  m.style.transition  = 'background 0.3s ease';
  m.style.background  = 'rgba(0,0,0,0)';
  setTimeout(() => {
    m.remove();
    document.body.style.overflow = '';
    if (recargar) window.location.reload();
  }, 350);
}

/* ── Inyectar keyframes una sola vez ── */
(function _juntosInjectStyles() {
  if (document.getElementById('juntos-keyframes')) return;
  const s = document.createElement('style');
  s.id = 'juntos-keyframes';
  s.textContent = `
    @keyframes juntosFadeIn  { from { opacity:0 } to { opacity:1 } }
    @keyframes juntosFadeOut { from { opacity:1 } to { opacity:0 } }
    @keyframes juntosSpin    { to { transform:rotate(360deg) } }
  `;
  document.head.appendChild(s);
})();

/* ── Overlay negro de procesamiento ── */
function _juntosShowOverlay(texto) {
  let ov = document.getElementById('juntos-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'juntos-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,0.75);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;animation:juntosFadeIn 0.2s ease;';
    document.body.appendChild(ov);
    // Loop sin parpadeo: reiniciar manualmente al terminar
    ov.addEventListener('click', () => {}, { once: true }); // dummy para activar listener scope
  }
  // Loop sin parpadeo: reiniciar 0.1s antes del final para evitar frame negro
  requestAnimationFrame(() => {
    const vid = document.getElementById('juntos-video-gen');
    if (vid) vid.addEventListener('timeupdate', function() {
      if (this.duration && this.currentTime >= this.duration - 0.1) {
        this.currentTime = 0;
      }
    });
  });
  ov.innerHTML = `
    <div style="width:110px;height:110px;border-radius:50%;overflow:hidden;flex-shrink:0;">
      <video id="juntos-video-gen" src="img/generando.mp4" autoplay muted playsinline
        style="width:100%;height:100%;object-fit:cover;display:block;"></video>
    </div>
    <div style="color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;letter-spacing:0.02em;">${texto}</div>
  `;
}

function _juntosHideOverlay() {
  const ov = document.getElementById('juntos-overlay');
  if (ov) { ov.style.animation = 'juntosFadeOut 0.2s ease forwards'; setTimeout(() => ov.remove(), 200); }
}

/* ── Elegir lugar ── */
function juntosElegirLugar(btn, prompt) {
  _jLugar = prompt;
  document.querySelectorAll('#juntos-lugares button').forEach(b => {
    b.style.borderColor = '#E5E7EB';
    b.style.background  = 'white';
    b.style.color       = '#6B7280';
  });
  btn.style.borderColor = '#7C4DCC';
  btn.style.background  = '#EDE9FE';
  btn.style.color       = '#7C4DCC';
}

/* ── Cargar y comprimir foto ── */
function juntosCargarFoto(input, tipo) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else       { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const b64 = canvas.toDataURL('image/jpeg', 0.82);

      if (tipo === 'mascota') {
        _jFotoMascota = b64;
        _juntosSetPreview('juntos-prev-mascota', 'juntos-ph-mascota', 'juntos-z-mascota', b64);
      } else {
        _jSelfie = b64;
        _juntosSetPreview('juntos-prev-selfie', 'juntos-ph-selfie', 'juntos-z-selfie', b64);
      }
      _juntosCheckBtn();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function _juntosSetPreview(prevId, phId, zoneId, src) {
  const prev = document.getElementById(prevId);
  const ph   = document.getElementById(phId);
  const zone = document.getElementById(zoneId);
  if (!prev) return;
  prev.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  prev.style.display    = 'block';
  ph.style.display      = 'none';
  zone.style.borderColor = '#A78BFA';
  zone.style.borderStyle = 'solid';
}

function _juntosCheckBtn() {
  const btn = document.getElementById('juntos-btn');
  if (!btn) return;
  const listo = _jFotoMascota && _jSelfie;
  btn.style.opacity       = listo ? '1'    : '0.45';
  btn.style.pointerEvents = listo ? 'auto' : 'none';
}

/* ── Fusionar selfie + mascota en un solo canvas ── */
function _juntosCrearCanvasCombinado(selfieB64, mascotaB64) {
  return new Promise((resolve) => {
    const imgA = new Image();
    const imgB = new Image();
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded < 2) return;
      const H  = 512;
      const wA = Math.round(imgA.width  * H / imgA.height);
      const wB = Math.round(imgB.width  * H / imgB.height);
      const canvas = document.createElement('canvas');
      canvas.width  = wA + wB;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgA, 0,  0, wA, H);
      ctx.drawImage(imgB, wA, 0, wB, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth   = 3;
      ctx.beginPath(); ctx.moveTo(wA, 0); ctx.lineTo(wA, H); ctx.stroke();
      resolve(canvas.toDataURL('image/jpeg', 0.88));
    };
    imgA.onload = onLoad; imgB.onload = onLoad;
    imgA.src = selfieB64; imgB.src = mascotaB64;
  });
}

/* ── Llamar al Worker y mostrar resultado ── */
async function juntosGenerar() {
  const btn       = document.getElementById('juntos-btn');
  const resultado = document.getElementById('juntos-resultado');
  if (!_jFotoMascota || !_jSelfie) return;

  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.5';
  resultado.style.display = 'none';
  _juntosShowOverlay('Creando tu foto mágica…');

  try {
    // Paso 1 — enviar fotos y obtener request_id
    const res = await fetch(JUNTOS_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selfie:      _jSelfie,
        fotoMascota: _jFotoMascota,
        lugar:       _jLugar,
        tipoPet:     _juntosGetTipoPet(),
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { requestId, statusUrl, responseUrl } = await res.json();
    if (!requestId || !statusUrl || !responseUrl) throw new Error('Respuesta incompleta del Worker');

    // Paso 2 — polling usando las URLs exactas de fal.ai
    let imagenUrl = null;
    const JUNTOS_STATUS_URL = JUNTOS_WORKER_URL.replace('/api/juntar-fotos', '/api/juntar-status');
    const tiempoInicio = Date.now();
    let intento = 0;

    while (!imagenUrl && Date.now() - tiempoInicio < 90000) {
      await new Promise(r => setTimeout(r, intento < 3 ? 4000 : 5000));
      intento++;

      const puntos = '.'.repeat((intento % 3) + 1);
      _juntosShowOverlay(`Creando tu foto mágica${puntos}`);

      const poll = await fetch(
        `${JUNTOS_STATUS_URL}?id=${requestId}&statusUrl=${encodeURIComponent(statusUrl)}&responseUrl=${encodeURIComponent(responseUrl)}`
      );
      if (!poll.ok) continue;
      const pollData = await poll.json();

      if (pollData.status === 'COMPLETED' && pollData.imagenUrl) {
        imagenUrl = pollData.imagenUrl;
      } else if (pollData.status === 'FAILED') {
        throw new Error('Job fallido en fal.ai');
      }
    }

    if (!imagenUrl) throw new Error('Timeout esperando imagen');

    _juntosHideOverlay();
    btn.style.display = 'none'; // ocultar botón "Juntar"

    resultado.style.display = 'block';
    resultado.innerHTML = `
      <!-- Imagen generada -->
      <div style="border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(92,47,168,0.2);">
        <img src="${imagenUrl}" alt="Foto Juntos IA" style="width:100%;display:block;">
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button id="juntos-btn-publicar" data-url="${imagenUrl.replace(/"/g,'&quot;')}"
          onclick="juntosPublicarEnWufly(this.dataset.url, this)"
          style="flex:1;padding:13px;border:none;border-radius:13px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          🐾 Publicar en Wufly
        </button>
        <button data-url="${imagenUrl.replace(/"/g,'&quot;')}"
          onclick="juntosCompartirexterno(this.dataset.url)" title="Compartir en redes"
          style="padding:13px 15px;border:1.5px solid #E5E7EB;border-radius:13px;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" style="width:17px;height:17px;stroke:#6B7280;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    `;

  } catch (err) {
    console.error('juntosGenerar:', err);
    _juntosHideOverlay();
    btn.innerHTML       = '<span style="font-size:18px;">✨</span> Juntar con IA';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity       = '1';
    btn.style.display       = '';
    resultado.style.display = 'block';
    resultado.innerHTML = `
      <div style="background:#FEF2F2;border:1.5px solid #FCA5A5;border-radius:12px;padding:12px;font-size:13px;color:#DC2626;">
        No se pudo generar la imagen. Intenta de nuevo.
      </div>`;
  }
}

/* ── Publicar en la comunidad Wufly ── */
async function juntosPublicarEnWufly(imagenUrl, btn) {
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.6';
  _juntosShowOverlay('Publicando en Wufly…');

  const _restaurar = () => {
    _juntosHideOverlay();
    btn.innerHTML       = '🐾 Publicar en Wufly';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity   = '1';
  };

  try {
    const guardado = await _juntosGuardarComunidad(imagenUrl);

    if (guardado) {
      _juntosHideOverlay();
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
      // Botón queda en verde — usuario cierra manualmente
      btn.innerHTML        = '✓ Publicado';
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      btn.style.opacity    = '1';
      btn.style.pointerEvents = 'none';
      // Botón cerrar ahora recarga la app
      const closeBtn = document.querySelector('#juntos-modal button[onclick="cerrarJuntos()"]');
      if (closeBtn) closeBtn.setAttribute('onclick', 'cerrarJuntos(true)');
    } else {
      _restaurar();
      _juntosToast('No se pudo publicar. ¿Estás con sesión iniciada?');
    }
  } catch (err) {
    console.error('juntosPublicarEnWufly error:', err);
    _restaurar();
    _juntosToast(`Error: ${err.message || 'Intenta de nuevo.'}`);
  }
}

/* ── Compartir en redes sociales (menú nativo) ── */
async function juntosCompartirexterno(imagenUrl) {
  if (navigator.share) {
    try {
      await navigator.share({ title: '¡Mira esto! 🐾✨', text: '¡Mira la foto que generé con Wufly!', url: imagenUrl });
      return;
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(imagenUrl);
    _juntosToast('¡Enlace copiado!');
  } catch {}
}

/* ── Descargar imagen ── */
function juntosDescargar(imagenUrl) {
  const a = document.createElement('a');
  a.href = imagenUrl; a.download = 'wufly-juntos.jpg';
  a.target = '_blank'; a.rel = 'noopener'; a.click();
}

/* ── Comprimir imagen desde URL externa → Blob JPEG ── */
async function _juntosComprimirImagen(url, maxPx = 1080, calidad = 0.78) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxPx || h > maxPx) {
        if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
        else       { w = Math.round(w * maxPx / h); h = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('canvas.toBlob falló')), 'image/jpeg', calidad);
    };
    img.onerror = () => {
      // CORS bloqueado — usar proxy del Worker como fallback
      _juntosComprimirViaProxy(url, maxPx, calidad).then(resolve).catch(reject);
    };
    img.src = url;
  });
}

async function _juntosComprimirViaProxy(url, maxPx, calidad) {
  const proxyUrl = `${JUNTOS_WORKER_URL.replace('/api/juntar-fotos', '/api/proxy-imagen')}?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error('No se pudo descargar la imagen');
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxPx || h > maxPx) {
        if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
        else       { w = Math.round(w * maxPx / h); h = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('canvas.toBlob falló')), 'image/jpeg', calidad);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error('Error al procesar imagen'));
    img.src = URL.createObjectURL(blob);
  });
}

/* ── Subir blob a Supabase Storage y guardar URL en fotos_juntos ── */
async function _juntosGuardarComunidad(imagenUrl) {
  if (typeof currentUser === 'undefined' || !currentUser?.id) {
    console.warn('fotos_juntos: no hay usuario logueado');
    return false;
  }

  // Leer JWT del usuario
  let token = SUPABASE_ANON_J;
  try {
    const v2 = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF_J}-auth-token`) || 'null');
    if (v2?.access_token) token = v2.access_token;
    else {
      const v1 = JSON.parse(localStorage.getItem('supabase.auth.token') || 'null');
      if (v1?.currentSession?.access_token) token = v1.currentSession.access_token;
    }
  } catch {}

  const headers = { 'apikey': SUPABASE_ANON_J, 'Authorization': `Bearer ${token}` };

  // 1 — Comprimir imagen
  _juntosShowOverlay('Optimizando imagen…');
  const blob = await _juntosComprimirImagen(imagenUrl);

  // 2 — Subir a Supabase Storage (bucket: fotos-juntos)
  _juntosShowOverlay('Subiendo a Wufly…');
  const fileName = `${currentUser.id}_${Date.now()}.jpg`;
  const uploadRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/fotos-juntos/${fileName}`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
      body: blob,
    }
  );
  if (!uploadRes.ok) {
    const detail = await uploadRes.text().catch(() => uploadRes.status);
    console.error('Storage upload error:', uploadRes.status, detail);
    throw new Error(`Upload (${uploadRes.status}): ${detail}`);
  }

  // 3 — URL pública permanente
  const urlPermanente = `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/public/fotos-juntos/${fileName}`;

  // 4 — Guardar en tabla fotos_juntos
  const insertRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ imagen_url: urlPermanente, user_id: currentUser.id }),
    }
  );
  if (!insertRes.ok) {
    const detail = await insertRes.text().catch(() => insertRes.status);
    console.error('fotos_juntos insert error:', insertRes.status, detail);
    throw new Error(`Insert (${insertRes.status}): ${detail}`);
  }

  // 5 — Limpiar: mantener solo las 10 más recientes
  _juntosPurgarAntiguos(headers).catch(e => console.warn('purgar:', e));

  return true;
}

/* ── Borrar fotos más allá del límite de 10 (tabla + Storage) ── */
async function _juntosPurgarAntiguos(headers) {
  const MAX = 10;

  // Traer todas ordenadas por fecha desc
  const listRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?select=id,imagen_url&order=created_at.desc`,
    { headers }
  );
  if (!listRes.ok) return;
  const todas = await listRes.json();
  if (!Array.isArray(todas) || todas.length <= MAX) return;

  const sobran = todas.slice(MAX); // todo lo que pase del top 10

  for (const f of sobran) {
    // Borrar de Storage (extraer nombre de archivo de la URL)
    try {
      const fileName = f.imagen_url.split('/fotos-juntos/').pop();
      if (fileName) {
        await fetch(
          `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/fotos-juntos/${fileName}`,
          { method: 'DELETE', headers }
        );
      }
    } catch {}

    // Borrar de la tabla
    await fetch(
      `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?id=eq.${f.id}`,
      { method: 'DELETE', headers }
    );
  }
  console.log(`juntos: ${sobran.length} foto(s) antigua(s) purgada(s)`);
}

/* ── Toast liviano ── */
function _juntosToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#1F0A4A;color:white;padding:10px 18px;border-radius:100px;font-size:13px;font-weight:600;z-index:9999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.3);animation:fadeIn 0.2s ease;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ── Cargar carrusel de fotos juntos para el home ── */
async function cargarCarruselJuntos() {
  const track   = document.getElementById('juntos-track');
  const section = document.getElementById('juntos-carousel-section');
  if (!track) return;

  try {
    const stored = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF_J}-auth-token`) || 'null');
    const token  = stored?.access_token || SUPABASE_ANON_J;

    const res = await fetch(
      `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?select=imagen_url,created_at&order=created_at.desc&limit=10`,
      { headers: { 'apikey': SUPABASE_ANON_J, 'Authorization': `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!data || data.length === 0) { section?.style.setProperty('display','none'); return; }

    track.innerHTML = data.map(f => `
      <div onclick="_abrirFotoJuntos('${f.imagen_url.replace(/'/g,"&#39;")}')"
        style="flex:0 0 44%;aspect-ratio:1/1;border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.18);flex-shrink:0;">
        <img src="${f.imagen_url}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
    `).join('');

    if (section) section.style.display = 'block';

  } catch {
    if (section) section.style.display = 'none';
  }
}

/* ── Abrir foto Juntos en modal (idéntico al de mascotas) ── */
function _abrirFotoJuntos(url) {
  const prev = document.getElementById('pet-modal-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pet-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.82);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:petModalIn 0.22s ease;
    backdrop-filter:blur(6px);
    -webkit-backdrop-filter:blur(6px);
  `;
  overlay.onclick = (e) => { if (e.target === overlay) _cerrarFotoJuntos(); };

  overlay.innerHTML = `
    <div style="
      position:relative;
      max-width:380px;width:100%;
      border-radius:24px;
      overflow:hidden;
      background:#1a0a3c;
      box-shadow:0 24px 64px rgba(0,0,0,0.6);
      animation:petModalCardIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <div style="position:relative;aspect-ratio:1/1;background:#2d1460;">
        <img src="${url}" alt="Foto Juntos IA"
          style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
      <div style="padding:16px 20px 20px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:18px;font-weight:800;color:white;font-family:'Funnel Display',sans-serif;">✨ Juntos — IA</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;">Comunidad Wufly 🐾</div>
        </div>
        <button onclick="_cerrarFotoJuntos()"
          style="width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;background:rgba(255,255,255,0.1);color:white;font-size:18px;display:flex;align-items:center;justify-content:center;"
          onmouseenter="this.style.background='rgba(255,255,255,0.2)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.1)'"
        >✕</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  const escHandler = (e) => { if (e.key === 'Escape') { _cerrarFotoJuntos(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

function _cerrarFotoJuntos() {
  const overlay = document.getElementById('pet-modal-overlay');
  if (!overlay) return;
  overlay.style.animation = 'petModalOut 0.18s ease forwards';
  setTimeout(() => overlay.remove(), 180);
}
