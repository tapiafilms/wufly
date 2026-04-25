/* ══════════════════════════════════════
   HOME — Wufly
   Página de inicio personalizada
   ══════════════════════════════════════ */

function renderHome() {
  const el = document.getElementById('page-home');
  if (!el) return;

  /* ── Leer perfil ── */
  let perfil = {};
  try {
    const raw = localStorage.getItem('wufly_profile_v1');
    if (raw) perfil = JSON.parse(raw);
  } catch {}

  /* ── Saludo según hora ── */
  const hora = new Date().getHours();
  let saludo = 'Buenos días';
  if (hora >= 12 && hora < 20) saludo = 'Buenas tardes';
  else if (hora >= 20) saludo = 'Buenas noches';

  /* ── Nombre del dueño ── */
  const _emailGuardado = localStorage.getItem('wufly_session_email') || '';
  const _nombreFallback = perfil.nombre || perfil.name || (_emailGuardado ? _emailGuardado.split('@')[0] : '');
  const nombre = _nombreFallback ? `, ${_nombreFallback}` : '';

  /* ── Nombre y emoji de la mascota ── */
  const nombreMascota = perfil.nombreMascota || '';
  const tipoEmoji = { perro: '🐕', gato: '🐈' }[perfil.tipomascota] || '🐾';

  /* ── Hero: foto de fondo o emoji según perfil ── */
  const heroFoto = perfil.fotoMascota || '';
  const heroMediaEmoji = `<div style="font-size:80px;line-height:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3));">${tipoEmoji}</div>`;

  /* ── Subtítulo hero ── */
  const subtitulo = nombreMascota
    ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);margin-top:5px;font-weight:600;text-shadow:0 1px 6px rgba(0,0,0,0.35);">${tipoEmoji} ${nombreMascota}</div>`
    : `<div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:5px;text-shadow:0 1px 6px rgba(0,0,0,0.3);">Tu app de bienestar animal</div>`;

  /* ── Tips rotativos del Dr. Wufly ── */
  const tips = [
    'Asegúrate de que tu mascota siempre tenga agua fresca disponible. La hidratación es clave para su salud.',
    'Los perros necesitan al menos 30 minutos de ejercicio diario. Incluso un paseo corto mejora su bienestar.',
    'Cepilla los dientes de tu mascota 2-3 veces por semana para prevenir enfermedades periodontales.',
    'Las revisiones veterinarias anuales detectan problemas de salud antes de que se agraven.',
    'Nunca des chocolate, uvas, cebolla ni ajo a tu perro o gato — son tóxicos para ellos.',
    'Desparasita a tu mascota cada 3 meses para protegerla de parásitos internos y externos.',
    'El juego mental (juguetes de rompecabezas) cansa tanto como el ejercicio físico y reduce la ansiedad.',
  ];
  const tipIndex = new Date().getDay(); // 0-6 según día de semana
  const tipHoy = tips[tipIndex];

  const _avatarHome = '';

  /* ── Render ── */
  el.innerHTML = `
    <div style="padding-bottom:8px;">

      <!-- HERO con saludo -->
      <div style="
        border-radius:0 0 38px 38px;
        min-height:430px;
        padding:0;
        text-align:center;
        margin-bottom:20px;
        position:relative;
        overflow:hidden;
        background:#4C1D95;
      ">
        <!-- Video de fondo -->
        <video id="hero-video" autoplay muted loop playsinline
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0;transition:opacity 0.9s ease;"
          poster="">
          <source src="/img/wufly-home.mp4" type="video/mp4">
        </video>
        <!-- Loader sutil: sólo visible mientras el video no ha cargado -->
        <div id="hero-loader" style="position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,#3b1a7a,#4C1D95);animation:heroPulse 2s ease-in-out infinite;border-radius:0 0 38px 38px;pointer-events:none;"></div>

        <!-- Overlay de color -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(30,10,70,0.25) 0%, rgba(76,29,149,0.65) 60%, rgba(50,10,100,0.85) 100%);z-index:2;border-radius:0 0 28px 28px;"></div>

        <!-- Contenido centrado verticalmente -->
        <div style="position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:482px;padding:0 20px 28px;">
          ${_avatarHome}
          ${heroFoto
            ? `<div style="width:82px;height:82px;border-radius:50%;overflow:hidden;border:3px solid rgba(255,255,255,0.85);box-shadow:0 4px 16px rgba(0,0,0,0.35);margin-bottom:10px;"><img src="${heroFoto}" style="width:100%;height:100%;object-fit:cover;" alt="mascota"></div>`
            : heroMediaEmoji}
          <div style="margin-top:14px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:24px;color:white;line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,0.35);">${saludo}${nombre}!</div>
            ${subtitulo}
          </div>
        </div>
      </div>

      <!-- ACCESO RÁPIDO -->
      <div style="padding:0 16px;margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:12px;">ACCESO RÁPIDO</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">

          <!-- Vets -->
          <button onclick="switchTab('restaurantes')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#5C2FA8,#7C4DCC);box-shadow:0 4px 14px rgba(92,47,168,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🏥</span>
            <span style="font-size:11px;font-weight:700;color:white;">Vets Cercanas</span>
          </button>

          <!-- Dr. Wufly -->
          <button onclick="switchTab('drwufly')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#0891B2,#06B6D4);box-shadow:0 4px 14px rgba(8,145,178,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🩺</span>
            <span style="font-size:11px;font-weight:700;color:white;">Dr. Wufly</span>
          </button>

          <!-- Adoptar -->
          <button onclick="switchComunidadTab('adoptar'); switchTab('comunidad')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#059669,#10B981);box-shadow:0 4px 14px rgba(5,150,105,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🐾</span>
            <span style="font-size:11px;font-weight:700;color:white;">Adoptar</span>
          </button>

          <!-- Arte -->
          <button onclick="switchServiciosTab('arte'); switchTab('servicios')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#7C3AED,#C026D3);box-shadow:0 4px 14px rgba(124,58,237,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🎨</span>
            <span style="font-size:11px;font-weight:700;color:white;">Arte</span>
          </button>

        </div>
      </div>

      <!-- CAROUSEL VIDEOS -->
      <div style="margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:10px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ VIDEOS WUFLY</div>
          <a href="https://www.youtube.com/@wufly" target="_blank" rel="noopener" style="background:none;border:none;font-size:12px;font-weight:700;color:var(--purple);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;text-decoration:none;">Ver canal →</a>
        </div>
        <div id="clinicas-clip" style="overflow:hidden;">
          <div id="clinicas-track"
            style="display:flex;gap:12px;padding:4px 0 12px 16px;will-change:transform;transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);">
            ${_carouselVideos()}
          </div>
        </div>
        <div id="carousel-dots" style="display:flex;justify-content:center;gap:5px;margin-top:6px;">
          ${VIDEOS_WUFLY.map((_, i) => `<div class="cdot${i===0?' cdot-active':''}" style="width:${i===0?'20px':'6px'};height:6px;border-radius:100px;background:${i===0?'var(--purple)':'#D1D5DB'};transition:all 0.3s;"></div>`).join('')}
        </div>
      </div>

      <!-- ARTISTA DESTACADO -->
      <div style="margin:0 16px 20px;background:linear-gradient(150deg,#FAF5FF,#F3E8FF);border-radius:16px;border-left:4px solid #7C3AED;padding:16px 18px;box-shadow:0 2px 10px rgba(124,58,237,0.1);">
        <div style="font-size:10px;font-weight:700;color:#7C3AED;letter-spacing:0.07em;margin-bottom:6px;">🎨 ARTE · RETRATOS DE MASCOTAS</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:#2D1B6B;margin-bottom:4px;">Valeria Muñoz</div>
        <div style="font-size:12px;color:#6B7280;margin-bottom:14px;">¿Quieres inmortalizar a tu mascota? Óleo, acuarela, lápiz y arte digital.</div>
        <button onclick="switchServiciosTab('arte'); switchTab('servicios')"
          style="background:linear-gradient(135deg,#7C3AED,#C026D3);border:none;border-radius:100px;padding:8px 18px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Ver artistas →
        </button>
      </div>

      <!-- TIP DEL DR. WUFLY -->
      <div style="margin:0 16px 24px;background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-radius:16px;border-left:4px solid #3B82F6;padding:16px 18px;box-shadow:0 2px 10px rgba(59,130,246,0.1);">
        <div style="font-size:10px;font-weight:700;color:#3B82F6;letter-spacing:0.07em;margin-bottom:6px;">💡 TIP DEL DÍA</div>
        <div style="font-size:13px;color:#1E3A5F;line-height:1.6;margin-bottom:14px;">${tipHoy}</div>
        <button onclick="switchTab('drwufly')"
          style="background:linear-gradient(135deg,#2563EB,#3B82F6);border:none;border-radius:100px;padding:8px 18px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Preguntar al Dr. Wufly →
        </button>
      </div>

    </div>
  `;

  // Inicializar carousel cada vez que se renderiza el home
  setTimeout(_initCarouselDots, 50);

  // Forzar play del video hero (iOS ignora autoplay en elementos creados con innerHTML)
  // Al cargar, fade-in del video y fade-out del loader
  setTimeout(() => {
    const v = el.querySelector('#hero-video');
    const loader = el.querySelector('#hero-loader');
    if (!v) return;
    const onReady = () => {
      v.style.opacity = '1';
      if (loader) {
        loader.style.transition = 'opacity 0.9s ease';
        loader.style.opacity = '0';
        setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 950);
      }
    };
    if (v.readyState >= 3) {
      onReady();
    } else {
      v.addEventListener('canplay', onReady, { once: true });
    }
    v.play().catch(() => {});
  }, 100);
}

/* ── Videos Wufly — reemplaza youtubeId y preview cuando tengas el canal ── */
const VIDEOS_WUFLY = [
  {
    titulo: 'Cómo cuidar a tu perro por primera vez',
    categoria: 'Consejos',
    duracion: '4:32',
    youtubeId: 'jNQXAC9IVRw', // placeholder — reemplazar con ID real
    preview: null,             // URL del mp4 corto (5s) cuando esté disponible
  },
  {
    titulo: '¿Cómo saber si tu gato está enfermo?',
    categoria: 'Salud',
    duracion: '3:18',
    youtubeId: 'jNQXAC9IVRw', // placeholder
    preview: null,
  },
  {
    titulo: 'Recetas caseras para perros — fácil y nutritivo',
    categoria: 'Nutrición',
    duracion: '5:10',
    youtubeId: 'jNQXAC9IVRw', // placeholder
    preview: null,
  },
];

function abrirVideoYoutube(id) {
  window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener');
}

function _carouselVideos() {
  return VIDEOS_WUFLY.map(v => {
    const thumb = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
    const media = v.preview
      ? `<video src="${v.preview}" autoplay muted loop playsinline
           style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;"></video>`
      : `<img src="${thumb}" alt="${v.titulo}"
           style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;"
           onerror="this.style.background='linear-gradient(135deg,#5C2FA8,#7C4DCC)';this.style.display='none'">`;
    return `
    <div onclick="abrirVideoYoutube('${v.youtubeId}')"
      style="flex:0 0 88%;border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,0.22);position:relative;aspect-ratio:16/9;">
      ${media}
      <!-- Overlay degradado -->
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.72) 100%);pointer-events:none;"></div>
      <!-- Botón play -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);width:52px;height:52px;background:rgba(255,255,255,0.92);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
        <svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:#5C2FA8;margin-left:3px;"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <!-- Categoría badge -->
      <div style="position:absolute;top:12px;right:12px;background:rgba(124,77,204,0.85);backdrop-filter:blur(4px);border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;color:white;">${v.categoria}</div>
      <!-- Info pie -->
      <div style="position:absolute;bottom:12px;left:12px;right:12px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:white;line-height:1.3;text-shadow:0 1px 6px rgba(0,0,0,0.4);margin-bottom:4px;">${v.titulo}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.75);">▶ ${v.duracion} · Canal Wufly</div>
      </div>
    </div>`;
  }).join('');
}

/* ── Carousel: CSS transform + swipe táctil ── */
let _carouselIdx = 0;
let _touchStartX = 0;
let _touchStartY = 0;
let _swipeLocked  = false; // true cuando el gesto es claramente horizontal

/* Mueve el track al slide idx usando CSS transition */
function _goToSlide(idx) {
  const track = document.getElementById('clinicas-track');
  if (!track) return;
  const card = track.querySelector('div');
  if (!card) return;
  const step = card.offsetWidth + 12; // ancho tarjeta + gap
  track.style.transform = `translateX(-${idx * step}px)`;
  _carouselIdx = idx;
  _updateDots(idx);
}

function _updateDots(idx) {
  document.querySelectorAll('.cdot').forEach((d, i) => {
    const active = i === idx;
    d.style.width      = active ? '20px' : '6px';
    d.style.background = active ? 'var(--purple)' : '#D1D5DB';
  });
}

/*
  Listeners en el CLIP (overflow:hidden), no en el track.
  El clip nunca se mueve, así su área de touch siempre está visible.
*/
function _initCarouselDots() {
  const clip  = document.getElementById('clinicas-clip');
  if (!clip) return;
  const total = VIDEOS_WUFLY.length;
  _carouselIdx = 0;

  clip.addEventListener('touchstart', e => {
    _touchStartX = e.touches[0].clientX;
    _touchStartY = e.touches[0].clientY;
    _swipeLocked  = false;
  }, { passive: true });

  clip.addEventListener('touchmove', e => {
    const dx = Math.abs(e.touches[0].clientX - _touchStartX);
    const dy = Math.abs(e.touches[0].clientY - _touchStartY);
    // Bloquear scroll vertical si el gesto es claramente horizontal
    if (!_swipeLocked && dx > dy && dx > 8) _swipeLocked = true;
  }, { passive: true });

  clip.addEventListener('touchend', e => {
    if (!_swipeLocked) return;
    const dx = e.changedTouches[0].clientX - _touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) _carouselIdx = Math.min(_carouselIdx + 1, total - 1);
      else        _carouselIdx = Math.max(_carouselIdx - 1, 0);
      _goToSlide(_carouselIdx);
    }
    _swipeLocked = false;
  }, { passive: true });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHome(); // renderHome() ya llama _initCarouselDots internamente
});
