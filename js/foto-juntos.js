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

/* ── Cerrar modal ── */
function cerrarJuntos() {
  const m = document.getElementById('juntos-modal');
  if (m) m.remove();
  document.body.style.overflow = '';
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

  btn.innerHTML = `<div style="width:16px;height:16px;border:2.5px solid rgba(255,255,255,0.35);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div> Generando… ~20s`;
  btn.style.pointerEvents = 'none';
  resultado.style.display = 'none';

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
      btn.innerHTML = `<div style="width:16px;height:16px;border:2.5px solid rgba(255,255,255,0.35);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;"></div> Generando${puntos}`;

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

    btn.innerHTML       = '<span style="font-size:18px;">✨</span> Crear otra';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity       = '1';

    resultado.style.display = 'block';
    resultado.innerHTML = `
      <!-- Imagen con skeleton mientras carga -->
      <div style="border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(92,47,168,0.2);background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s infinite;min-height:260px;position:relative;">
        <img src="${imagenUrl}"
          alt=""
          style="width:100%;display:block;opacity:0;transition:opacity 0.4s ease;"
          onload="this.style.opacity='1';this.parentElement.style.animation='none';this.parentElement.style.background='none';"
          onerror="this.style.display='none'">
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
        <button data-url="${imagenUrl.replace(/"/g,'&quot;')}"
          onclick="juntosDescargar(this.dataset.url)" title="Descargar"
          style="padding:13px 15px;border:1.5px solid #E5E7EB;border-radius:13px;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" style="width:17px;height:17px;stroke:#6B7280;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </div>
    `;

  } catch (err) {
    console.error('juntosGenerar:', err);
    btn.innerHTML       = '<span style="font-size:18px;">✨</span> Juntar con IA';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity       = '1';
    resultado.style.display = 'block';
    resultado.innerHTML = `
      <div style="background:#FEF2F2;border:1.5px solid #FCA5A5;border-radius:12px;padding:12px;font-size:13px;color:#DC2626;">
        No se pudo generar la imagen. Intenta de nuevo.
      </div>`;
  }
}

/* ── Publicar en la comunidad Wufly ── */
async function juntosPublicarEnWufly(imagenUrl, btn) {
  btn.innerHTML       = `<div style="width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></div> Publicando…`;
  btn.style.pointerEvents = 'none';

  const _restaurar = () => {
    btn.innerHTML       = '🐾 Publicar en Wufly';
    btn.style.pointerEvents = 'auto';
  };

  try {
    const guardado = await _juntosGuardarComunidad(imagenUrl);

    if (guardado) {
      btn.innerHTML        = '✓ Publicado en Wufly';
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
      _juntosToast('¡Tu foto ya está en la comunidad! 🐾✨');
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

/* ── Guardar URL en fotos_juntos (sin guardar las fotos originales) ── */
async function _juntosGuardarComunidad(imagenUrl) {
  try {
    // currentUser viene de auth.js — ya está seteado, no necesita await
    if (typeof currentUser === 'undefined' || !currentUser?.id) {
      console.warn('fotos_juntos: no hay usuario logueado');
      return false;
    }

    // Usar el cliente db de Supabase directamente (ya autenticado)
    const { error } = await db
      .from('fotos_juntos')
      .insert({ imagen_url: imagenUrl, user_id: currentUser.id });

    if (error) {
      console.error('fotos_juntos insert error:', error.message, error.code, error.details);
      throw new Error(error.message || 'Error al insertar en fotos_juntos');
    }
    return true;
  } catch (err) {
    console.error('_juntosGuardarComunidad catch:', err);
    return false;
  }
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
      <div onclick="window.open('${f.imagen_url}','_blank','noopener')"
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
