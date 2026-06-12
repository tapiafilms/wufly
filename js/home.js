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
        margin-bottom:40px;
        position:relative;
        overflow:hidden;
        background:#4C1D95;
      ">
        <!-- Video de fondo -->
        <video id="hero-video" autoplay muted loop playsinline
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0;transition:opacity 1s ease;"
          poster="">
          <source src="/img/wufly-home.mp4" type="video/mp4">
        </video>

        <!-- Spinner de carga del video -->
        <div id="hero-video-spinner" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);z-index:4;display:flex;align-items:center;gap:6px;transition:opacity 0.5s ease;">
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out infinite;"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out 0.2s infinite;"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out 0.4s infinite;"></div>
        </div>

        <!-- Overlay de color -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(30,10,70,0.25) 0%, rgba(76,29,149,0.65) 60%, rgba(50,10,100,0.85) 100%);z-index:2;border-radius:0 0 28px 28px;"></div>

        <!-- URGENTE — deslizable desde la izquierda como una sola unidad -->
        <div id="urgente-widget" style="position:absolute;left:0;top:60%;z-index:10;display:none;transform:translateY(-50%) translateX(calc(-100% + 26px));transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);">
          <div style="display:flex;align-items:stretch;background:rgba(255,255,255,0.97);border-radius:0 20px 20px 0;box-shadow:4px 4px 28px rgba(0,0,0,0.25);overflow:hidden;">
            <!-- Contenido — toca para abrir link -->
            <div onclick="abrirUrgenteLink()" style="padding:16px 12px 16px 18px;width:400px;cursor:pointer;text-align: left;">
              <div id="urgente-fecha" style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;color:#4C1D95;margin-bottom:8px;line-height:1.2;"></div>
              <div id="urgente-desc" style="font-size:13px;color:#1F2937;line-height:16px;"></div>
            </div>
            <!-- URGENTE label — toca para abrir/cerrar -->
            <div onclick="toggleUrgente()" style="width:26px;display:flex;align-items:center;justify-content:center;padding:10px 0;border-left:1px solid rgba(0,0,0,0.07);cursor:pointer;flex-shrink:0;">
              <span style="writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:16px;font-weight:800;color:#3b1465;letter-spacing:0em;font-family:'Funnel Display',sans-serif;white-space:nowrap;">URGENTE</span>
            </div>
          </div>
        </div>

        <!-- Contenido centrado verticalmente -->
        <div style="position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:482px;padding:0 20px 28px;">
          ${_avatarHome}
          ${heroFoto
            ? `<div style="width:82px;display:none;height:82px;border-radius:50%;overflow:hidden;border:3px solid rgba(255,255,255,0.85);box-shadow:0 4px 16px rgba(0,0,0,0.35);margin-bottom:10px;"><img src="${heroFoto}" style="width:100%;height:100%;object-fit:cover;" alt="mascota"></div>`
            : heroMediaEmoji}
          <div style="margin-top:14px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:24px;color:white;line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,0.35);">${saludo}${nombre}!</div>
            ${subtitulo}
          </div>
        </div>
      </div>

      <!-- ACCESO RÁPIDO — Stack drag interactivo -->
      <div style="padding:0 16px;margin-top:10px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:12px;"></div>
        <div id="card-stack" style="position:relative;height:215px;touch-action:none;"></div>
      </div>

      


      <!-- GALERÍA DE MASCOTAS DE LA COMUNIDAD -->
      <div id="pet-gallery-section" style="margin-bottom:24px;margin-top:-7px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ ÚLTIMOS REGISTRADOS</div>
          <div style="font-size:11px;font-weight:600;color:var(--purple);">Comunidad Wufly</div>
        </div>
        <div
          id="pet-gallery-grid"
          style="
            display:grid;
            grid-template-columns:repeat(4, 1fr);
            gap:8px;
            padding:0 16px;
          "
        >
          <!-- Skeletons iniciales -->
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.1s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.2s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.3s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.4s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.5s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.6s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.7s infinite;"></div>
        </div>
      </div>

      <!-- SECCIÓN JUNTOS IA -->
      <div style="margin:0 16px 24px;">
        <!-- Card principal -->
        <div style="
          border-radius:22px;
          overflow:hidden;
          background:linear-gradient(135deg,#3B0764,#6D28D9,#9333EA);
          box-shadow:0 8px 28px rgba(109,40,217,0.38);
          padding:22px 18px 20px;
          position:relative;
          min-height:180px;
        ">
          <!-- Imagen de fondo con blend mode screen -->
          <div style="position:absolute;inset:0;background-image:url('img/bg-juntos.png');background-size:contain;background-repeat:no-repeat;background-position:right center;mix-blend-mode:screen;opacity:0.9;pointer-events:none;"></div>

          <div style="position:relative;z-index:1;max-width:55%;">
            <div style="font-size:28px;margin-bottom:8px;">✨</div>
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:white;line-height:1.2;margin-bottom:6px;">
              Juntos — IA
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1.5;margin-bottom:18px;">
              Toma una foto de tu mascota y una selfie.<br>La IA los une en un lugar mágico.
            </div>
            <button onclick="abrirJuntos()"
              style="padding:13px 20px;border:none;border-radius:14px;background:white;color:#6D28D9;font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.25);display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.15s;white-space:nowrap;"
              onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform='scale(1)'"
              ontouchstart="this.style.transform='scale(0.97)'" ontouchend="this.style.transform='scale(1)'">
              <span style="font-size:20px;"></span>Crear mi foto con IA
            </button>
          </div>
        </div>

      </div>

      <!-- CARRUSEL FOTOS JUNTOS -->
      <div id="juntos-carousel-section" style="display:none;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:10px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ MOMENTOS DE LA COMUNIDAD</div>
        </div>
        <div style="overflow:hidden;padding:4px 0 10px;">
          <div id="juntos-track"
            style="display:flex;gap:12px;padding:0 16px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;">
          </div>
        </div>
      </div>



<!-- PERRITOS PASEANDO -->
      <div style="margin:0 16px 24px;">
        <div onclick="abrirMapaPaseos()" style="
          border-radius:22px;
          background:#1D4ED8;
          box-shadow:0 8px 28px rgba(29,78,216,0.35);
          padding:20px 18px;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:16px;
          position:relative;
          overflow:hidden;
          min-height:90px;
        ">
          <video autoplay muted loop playsinline
            style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0;transition:opacity 1s ease;"
            oncanplay="this.style.opacity='0.45'">
            <source src="img/paseo.mp4" type="video/mp4">
          </video>
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgb(18 42 100/85%) 40%,rgb(34 91 250/55%) 100%);z-index:1;"></div>
          <div style="flex-shrink:0;position:relative;z-index:2;">
            <img src="img/icono.png" alt="Wufly" style="width:52px;height:52px;object-fit:contain;border-radius:10px;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.3));">
          </div>
          <div style="flex:1;position:relative;z-index:2;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:18px;color:white;line-height:1.2;margin-bottom:5px;">Perritos paseando cerca</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.75);line-height:1.5;">Mira en tiempo real qué perritos de la comunidad están paseando ahora mismo cerca tuyo.</div>
          </div>
          <div style="flex-shrink:0;background:rgba(255,255,255,0.18);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </div>
        </div>
      </div>

<!-- CAROUSEL VIDEOS -->
      <div style="margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:10px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ SHORTS MASCOTAS</div>
          <a href="" target="_blank" rel="noopener" style="background:none;border:none;font-size:12px;font-weight:700;color:var(--purple);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;text-decoration:none;">Canales Destacados</a>
        </div>
        <div id="clinicas-clip" style="overflow:hidden;">
          <div id="clinicas-track"
            style="display:flex;gap:12px;padding:4px 0 12px 16px;will-change:transform;transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);">
            <!-- Shorts se cargan dinámicamente -->
          </div>
        </div>
        <div id="carousel-dots" style="display:flex;justify-content:center;gap:5px;margin-top:6px;">
          ${[0,1,2].map((i) => `<div class="cdot cdot-page" data-page="${i}" style="width:${i===0?'20px':'6px'};height:6px;border-radius:100px;background:${i===0?'var(--purple)':'#D1D5DB'};transition:all 0.3s;"></div>`).join('')}
        </div>
      </div>


      <!-- BANNER ARTE — imagen: img/banner-arte.jpg | link: onclick abajo -->
      <div style="margin:0 16px 20px;border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(124,58,237,0.15);cursor:pointer;"
        onclick="switchServiciosTab('arte'); switchTab('servicios')">
        <img src="img/banner-arte.jpg" alt="Arte · Retratos de mascotas"
          style="width:100%;display:block;object-fit:cover;">
      </div>

      <!-- BANNER TIP DEL DÍA — imagen: img/banner-tip.jpg | link: onclick abajo -->
      <div style="margin:0 16px 24px;border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(59,130,246,0.15);cursor:pointer;"
        onclick="window.open('https://www.superzoo.cl/tiendas?showMap=true&horizontalView=true&isForm=true', '_blank')">
        <img src="img/banner-tip.jpg" alt="Tip del día · Dra. Wufly"
          style="width:100%;display:block;object-fit:cover;">
      </div>

    </div>
  `;

  // Cargar Shorts dinámicos y luego inicializar dots
  _cargarShorts().then(() => setTimeout(_initCarouselDots, 50));
  setTimeout(_initCarouselDots, 50);
  setTimeout(_initCardStack, 80);

  // Forzar play del video hero (iOS ignora autoplay en elementos creados con innerHTML)
  setTimeout(() => {
    const v = el.querySelector('#hero-video');
    const spinner = el.querySelector('#hero-video-spinner');
    if (!v) return;
    const fadeIn = () => {
      v.style.opacity = '1';
      if (spinner) { spinner.style.opacity = '0'; setTimeout(() => { spinner.style.display = 'none'; }, 500); }
    };
    if (v.readyState >= 3) {
      fadeIn();
    } else {
      v.addEventListener('canplay', fadeIn, { once: true });
    }
    v.play().catch(() => {});
  }, 100);

// Cargar galería — usa la sesión ya almacenada en localStorage
  if (typeof cargarFotosMascotas === 'function') {
    setTimeout(() => {
      cargarFotosMascotas();
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
    }, 800);
  }

  // Viñeta URGENTE
  setTimeout(cargarUrgentePanel, 500);

  // Detectar región y recargar clínicas/tiendas si corresponde
  Promise.all([
    typeof _detectarRegionYCargarClinicas === 'function' ? _detectarRegionYCargarClinicas() : Promise.resolve(null),
    typeof _detectarRegionYCargarTiendas  === 'function' ? _detectarRegionYCargarTiendas()  : Promise.resolve(null),
  ]).then(([clinicas, tiendas]) => {
    // Solo renderizar si hay datos (null = permiso negado, el banner ya se mostró)
    if (clinicas !== null && typeof renderClinicas === 'function') renderClinicas();
    if (tiendas  !== null && typeof renderTiendas  === 'function') renderTiendas();
  });
}

/* ── Shorts dinámicos desde 3 canales YouTube ── */
let _shortsData = [];

async function _cargarShorts() {
  const track = document.getElementById('clinicas-track');
  if (!track) return;

  try {
    const res = await fetch('https://wufly-push.pablo77tapia.workers.dev/api/shorts');
    if (!res.ok) throw new Error();
    _shortsData = await res.json();
  } catch {
    // Fallback silencioso — el track queda vacío o con skeleton
    return;
  }

  if (!_shortsData.length) return;

  track.innerHTML = _shortsData.map(v => {
    const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
    return `
    <div onclick="abrirShort('${v.videoId}')"
      style="flex:0 0 30%;min-width:110px;border-radius:14px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.22);position:relative;aspect-ratio:9/16;background:#1a0a3c;">
      <img src="${thumb}" alt="${v.titulo.replace(/"/g,'')}"
        onerror="this.src='https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg'"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;">
      <!-- Overlay -->
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.78) 100%);pointer-events:none;"></div>
      <!-- Badge Shorts -->
      <div style="position:absolute;top:10px;left:10px;background:#FF0000;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:800;color:white;letter-spacing:0.05em;">▶ SHORT</div>
      <!-- Play -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;background:rgba(255,255,255,0.90);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
        <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#5C2FA8;margin-left:3px;"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <!-- Info pie -->
      <div style="position:absolute;bottom:10px;left:10px;right:10px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:13px;color:white;line-height:1.3;text-shadow:0 1px 4px rgba(0,0,0,0.5);margin-bottom:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${v.titulo}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.7);">📺 ${v.canal}</div>
      </div>
    </div>
  `;}).join('');

  // Reiniciar dots con nuevo total
  _initCarouselDots();
}

let _shortIdx = 0;

function abrirShort(id) {
  _shortIdx = _shortsData.findIndex(v => v.videoId === id);
  if (_shortIdx < 0) _shortIdx = 0;
  _renderShortModal();
}

function _renderShortModal() {
  const v = _shortsData[_shortIdx];
  if (!v) return;

  const prev = document.getElementById('yt-modal-overlay');
  if (prev) prev.remove();

  const total = _shortsData.length;
  const overlay = document.createElement('div');
  overlay.id = 'yt-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.95);
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Botón cerrar — bajado para evitar notch/batería iPhone -->
    <button onclick="document.getElementById('yt-modal-overlay').remove()"
      style="position:absolute;top:56px;right:16px;width:44px;height:44px;border-radius:50%;border:none;background:rgba(255,255,255,0.15);color:white;font-size:18px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;">✕</button>

    <!-- Contador -->
    <div style="position:absolute;top:62px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.4);font-size:12px;font-weight:600;z-index:10;">${_shortIdx + 1} / ${total}</div>

    <!-- Contenedor deslizable -->
    <div id="short-slider" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;will-change:transform;">
      <div style="width:min(308px, 79vw);position:relative;">
        <div style="position:relative;aspect-ratio:9/16;border-radius:20px;overflow:hidden;background:#111;box-shadow:0 20px 60px rgba(0,0,0,0.8);">
          <!-- Skeleton loading -->
          <div id="short-skeleton" style="position:absolute;inset:0;z-index:3;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
            <div style="width:52px;height:52px;border:3px solid rgba(255,255,255,0.1);border-top-color:rgba(255,255,255,0.6);border-radius:50%;animation:adminSpin 0.8s linear infinite;"></div>
            <div style="width:60%;height:8px;border-radius:99px;background:rgba(255,255,255,0.08);"></div>
            <div style="width:40%;height:8px;border-radius:99px;background:rgba(255,255,255,0.05);"></div>
          </div>
          <iframe id="short-iframe"
            src="https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=1&playsinline=1&rel=0"
            frameborder="0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            onload="document.getElementById('short-skeleton')?.remove()"
            style="position:absolute;inset:0;width:100%;height:100%;z-index:2;"></iframe>
          <!-- Franjas laterales para swipe (no bloquean el centro del video) -->
          <div id="short-swipe-layer" style="position:absolute;inset:0;z-index:5;pointer-events:none;">
            <div style="position:absolute;left:0;top:0;width:18%;height:100%;pointer-events:auto;"></div>
            <div style="position:absolute;right:0;top:0;width:18%;height:100%;pointer-events:auto;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  // Swipe con animación fluida — funciona sobre el iframe y el overlay
  let _tx = 0, _startX = 0, _startY = 0, _dragging = false, _isSwiping = false;
  const slider = () => overlay.querySelector('#short-slider');

  const onStart = e => {
    _startX = e.touches[0].clientX;
    _startY = e.touches[0].clientY;
    _tx = 0; _dragging = true; _isSwiping = false;
    const s = slider(); if (s) s.style.transition = 'none';
  };
  const onMove = e => {
    if (!_dragging) return;
    const dx = e.touches[0].clientX - _startX;
    const dy = e.touches[0].clientY - _startY;
    if (!_isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) _isSwiping = true;
    if (!_isSwiping) return;
    _tx = dx;
    const s = slider(); if (s) s.style.transform = `translateX(${_tx * 0.4}px)`;
  };
  const onEnd = () => {
    _dragging = false;
    const s = slider(); if (!s) return;
    if (_isSwiping && Math.abs(_tx) > 60) {
      const dir = _tx < 0 ? 1 : -1;
      const next = _shortIdx + dir;
      if (next >= 0 && next < total) {
        s.style.transition = 'transform 0.22s ease';
        s.style.transform = `translateX(${dir < 0 ? '100%' : '-100%'})`;
        setTimeout(() => { _shortIdx = next; _renderShortModal(); }, 200);
        return;
      }
    }
    s.style.transition = 'transform 0.3s ease';
    s.style.transform = 'translateX(0)';
  };

  // Escuchar en overlay y en la capa sobre el iframe
  [overlay, overlay.querySelector('#short-swipe-layer')].forEach(el => {
    if (!el) return;
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
  });

  document.body.appendChild(overlay);
}

function _navShort(dir) {
  const next = _shortIdx + dir;
  if (next < 0 || next >= _shortsData.length) return;
  _shortIdx = next;
  _renderShortModal();
}

// Mantener función por compatibilidad
function abrirVideoYoutube(id) { abrirShort(id); }

/* ── Carousel: CSS transform + swipe táctil ── */
let _carouselIdx = 0;
let _touchStartX = 0;
let _touchStartY = 0;
let _swipeLocked  = false; // true cuando el gesto es claramente horizontal

/* Mueve el track al slide idx usando CSS transition */
const SHORTS_PER_PAGE = 3;

function _goToSlide(pageIdx) {
  const track = document.getElementById('clinicas-track');
  if (!track) return;
  const card = track.querySelector('div');
  if (!card) return;
  const step = card.offsetWidth + 12;
  track.style.transform = `translateX(-${pageIdx * SHORTS_PER_PAGE * step}px)`;
  _carouselIdx = pageIdx;
  _updateDots(pageIdx);
}

function _updateDots(pageIdx) {
  document.querySelectorAll('.cdot').forEach((d, i) => {
    const active = i === pageIdx;
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
  const totalPages = Math.ceil((_shortsData.length || 9) / SHORTS_PER_PAGE);
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
      if (dx < 0) _carouselIdx = Math.min(_carouselIdx + 1, totalPages - 1);
      else        _carouselIdx = Math.max(_carouselIdx - 1, 0);
      _goToSlide(_carouselIdx);
    }
    _swipeLocked = false;
  }, { passive: true });
}


/* ══════════════════════════════════════
   ACCESO RÁPIDO — Stack drag interactivo
   ══════════════════════════════════════ */

const STACK_CARDS = [
  { label:'Vets Cercanas',  sub:'Clínicas y veterinarias',         img:'img/card-vets.jpg',       nav: () => switchTab('restaurantes'),                                              grad:'#3b1465' },
  { label:'Dra. Wufly',     sub:'Asistente veterinario IA',        img:'img/card-dra.jpg',        nav: () => switchTab('drwufly'),                                                   grad:'#2d0f6b' },
  { label:'Adoptar',        sub:'Mascotas que buscan hogar',       img:'img/card-adoptar.jpg',    nav: () => { switchComunidadTab('adoptar'); switchTab('comunidad'); },              grad:'#1a0a3c' },
  { label:'Arte',           sub:'Retratos de tu mascota',          img:'img/card-arte.jpg',       nav: () => { switchServiciosTab('arte'); switchTab('servicios'); },                 grad:'#2a0545' },
  { label:'Grooming',       sub:'Estética y peluquería',           img:'img/card-grooming.jpg',   nav: () => { switchServiciosTab('grooming'); switchTab('servicios'); },             grad:'#3d1278' },
  { label:'Paseadores',     sub:'Paseos para tu mascota',          img:'img/card-paseadores.jpg', nav: () => { switchServiciosTab('paseadores'); switchTab('servicios'); },           grad:'#1e0550' },
];

function _navFrontCard() {
  const card = STACK_CARDS[_stackOrder[0]];
  if (card) card.nav();
}

let _stackOrder  = []; // índices de cards, [0] = frente
let _stackEls    = [];
let _dragActive  = false;
let _dragStartY  = 0;
let _dragCurrY   = 0;
let _dragVel     = 0;
let _dragPrevY   = 0;

function _initCardStack() {
  const container = document.getElementById('card-stack');
  if (!container) return;
  container.innerHTML = '';
  _stackEls = [];
  _stackOrder = STACK_CARDS.map((_, i) => i);

  STACK_CARDS.forEach((c, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;left:0;right:0;
      height:185px;border-radius:22px;
      background:${c.grad};
      box-shadow:0 8px 32px rgba(0,0,0,0.35);
      overflow:hidden;
      will-change:transform,opacity;
      cursor:grab;
      user-select:none;
      -webkit-user-select:none;
      touch-action:none;
    `;
    el.innerHTML = `
      <!-- Imagen de fondo (derecha) -->
      <img src="${c.img}" alt="${c.label}"
        style="position:absolute;top:0;right:0;width:68%;height:100%;object-fit:cover;object-position:center;"
        onerror="this.style.display='none'">

      <!-- Degradado lateral: color sólido izquierda → transparente derecha -->
      <div style="position:absolute;inset:0;background:linear-gradient(to right, ${c.grad} 32%, ${c.grad}cc 50%, transparent 75%);"></div>

      <!-- Degradado inferior: oscurece para legibilidad del texto -->
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);"></div>

      <!-- Flecha (esquina superior izquierda) -->
      <div class="stack-arrow-btn" style="position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </div>

      <!-- Texto (parte inferior) -->
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 18px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:21px;color:white;line-height:1.15;text-shadow:0 1px 6px rgba(0,0,0,0.3);">${c.label}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px;">${c.sub}</div>
      </div>
    `;

    // Flecha: navega directamente (solo la card del frente)
    const arrowBtn = el.querySelector('.stack-arrow-btn');
    const _arrowNav = (e) => { e.stopPropagation(); if (_stackOrder[0] === i) c.nav(); };
    arrowBtn.addEventListener('touchend', _arrowNav, { passive: true });
    arrowBtn.addEventListener('click',    _arrowNav);

    container.appendChild(el);
    _stackEls.push(el);
  });

  _renderStack(false);
  _attachDrag();
}

function _stackTransform(pos, dy) {
  const scale      = 1 - pos * 0.06;
  const translateY = pos * -12 + (pos === 0 ? dy : Math.max(0, dy * 0.15 * (1 - pos * 0.4)));
  const opacity    = pos >= 4 ? 0 : 1 - pos * 0.08;
  // Rotación alternada: pos1 → -2°, pos2 → +2.5°, pos3 → -1.5°
  const rotations  = [0, -2, 2.5, -1.5, 1];
  const rotateZ    = rotations[pos] || 0;
  return { scale, translateY, opacity, rotateZ };
}

function _renderStack(animate, dy = 0) {
  _stackOrder.forEach((cardIdx, pos) => {
    const el = _stackEls[cardIdx];
    const { scale, translateY, opacity, rotateZ } = _stackTransform(pos, dy);
    if (animate) {
      el.style.transition = 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.35s ease';
    } else {
      el.style.transition = pos === 0 ? 'none' : 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.35s ease';
    }
    el.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotateZ}deg)`;
    el.style.opacity   = opacity;
    el.style.zIndex    = 100 - pos;
  });
}

function _attachDrag() {
  const container = document.getElementById('card-stack');
  if (!container) return;

  /* ── Lógica compartida start / move / end ── */
  function _onStart(y) {
    if (_stackOrder.length === 0) return;
    const frontEl = _stackEls[_stackOrder[0]];
    _dragActive = true;
    _dragStartY = y;
    _dragCurrY  = 0;
    _dragPrevY  = y;
    _dragVel    = 0;
    frontEl.style.transition = 'none';
    frontEl.style.cursor = 'grabbing';
  }

  function _onMove(y) {
    if (!_dragActive) return;
    _dragVel   = y - _dragPrevY;
    _dragPrevY = y;
    _dragCurrY = y - _dragStartY;
    if (_dragCurrY < 0) _dragCurrY = _dragCurrY * 0.2;
    _renderStack(false, _dragCurrY);
  }

  function _onEnd() {
    if (!_dragActive) return;
    _dragActive = false;
    const frontEl = _stackEls[_stackOrder[0]];
    frontEl.style.cursor = 'grab';

    const THRESHOLD = 60;
    if (_dragCurrY > THRESHOLD || _dragVel > 8) {
      frontEl.style.transition = 'transform 0.4s cubic-bezier(0.4,0,1,1), opacity 0.3s ease';
      frontEl.style.transform  = `translateY(320px) scale(0.85)`;
      frontEl.style.opacity    = '0';
      setTimeout(() => {
        const dismissed = _stackOrder.shift();
        _stackOrder.push(dismissed);
        _renderStack(true, 0);
      }, 380);
    } else {
      _renderStack(true, 0);
    }
    _dragCurrY = 0;
  }

  /* ── Touch ── */
  let _tStartY = 0;
  container.addEventListener('touchstart', e => {
    if (!e.target.closest('#card-stack')) return;
    _tStartY = e.touches[0].clientY;
    _onStart(_tStartY);
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    _onMove(e.touches[0].clientY);
  }, { passive: true });

  container.addEventListener('touchend', e => {
    if (e.target.closest('.stack-arrow-btn')) { _onEnd(); return; } // flecha ya navega sola
    const wasTap = Math.abs(e.changedTouches[0].clientY - _tStartY) < 10;
    _onEnd();
    if (wasTap) _navFrontCard();
  }, { passive: true });

  /* ── Mouse (desktop) ── */
  container.addEventListener('mousedown', e => {
    if (!e.target.closest('#card-stack')) return;
    if (e.target.closest('.stack-arrow-btn')) return; // flecha ya navega sola
    e.preventDefault();
    const startY = e.clientY;
    _onStart(startY);

    const onMouseMove = e => _onMove(e.clientY);
    const onMouseUp   = e => {
      const wasTap = Math.abs(e.clientY - startY) < 8;
      _onEnd();
      if (wasTap) _navFrontCard();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHome(); // renderHome() ya llama _initCarouselDots internamente
});



/* ══════════════════════════════════════
   URGENTE — viñeta lateral hero
   Último perdido del agente IA
   ══════════════════════════════════════ */

let _urgenteLink = '';
let _urgenteOpen = false;

function toggleUrgente() {
  _urgenteOpen = !_urgenteOpen;
  const widget = document.getElementById('urgente-widget');
  if (!widget) return;
  widget.style.transform = _urgenteOpen
    ? 'translateY(-50%) translateX(0)'
    : 'translateY(-50%) translateX(calc(-100% + 26px))';
}

function abrirUrgenteLink() {
  if (_urgenteLink) window.open(_urgenteLink, '_blank', 'noopener');
}

async function cargarUrgentePanel() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/perdidos?select=id,descripcion,fecha_extravio,created_at,link&user_id=is.null&order=created_at.desc&limit=1`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` } }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    const p = Array.isArray(data) && data.length ? data[0] : null;
    if (!p || !p.descripcion) return;

    _urgenteLink = p.link || '';

    const dias  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const raw   = p.fecha_extravio || p.created_at;
    let fechaStr = '';
    if (raw) {
      const d = new Date(raw);
      fechaStr = `${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`;
    }

    const fechaEl = document.getElementById('urgente-fecha');
    const descEl  = document.getElementById('urgente-desc');
    if (fechaEl) fechaEl.textContent = fechaStr;
    if (descEl)  descEl.textContent  = p.descripcion;

    const widget = document.getElementById('urgente-widget');
    if (widget) widget.style.display = 'flex';

  } catch {
    // Sin datos — widget permanece oculto
  }
}
