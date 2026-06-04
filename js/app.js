/* ══════════════════════════════════════
   CONFIG — URL del Cloudflare Worker
   ══════════════════════════════════════ */
const WORKER_URL = "https://divine-waterfall-d1dfsin-gluten-life.pablo77tapia.workers.dev";

/* ── Debounce: evita renders en cada tecla (búsquedas) ── */
function _debounce(fn, ms = 280) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
const onSearchClinica   = _debounce(() => typeof renderClinicas   === 'function' && renderClinicas());
const onSearchTienda    = _debounce(() => typeof renderTiendas    === 'function' && renderTiendas());
const onSearchGrooming  = _debounce(() => typeof renderGrooming   === 'function' && renderGrooming());
const onSearchPaseador  = _debounce(() => typeof renderPaseadores === 'function' && renderPaseadores());

/* ══ ALERGIAS PRESET (para el editor en MI PERFIL) ══ */
const PRESET_ALLERGIES = [
  { id:'gluten',       emoji:'🌾', name:'Gluten',             sub:'Trigo, cebada, centeno' },
  { id:'leche',        emoji:'🥛', name:'Leche de vaca',      sub:'Lácteos, caseína, suero' },
  { id:'huevo',        emoji:'🥚', name:'Huevo',              sub:'Clara y yema' },
  { id:'frutos_secos', emoji:'🥜', name:'Frutos secos',       sub:'Maní, nueces, almendras' },
  { id:'mariscos',     emoji:'🦐', name:'Mariscos y pescado', sub:'Crustáceos, moluscos' },
  { id:'soja',         emoji:'🫘', name:'Soja',               sub:'Lecitina, proteína de soja' },
  { id:'preservantes', emoji:'🧪', name:'Preservantes',       sub:'BHA, BHT, nitratos, sulfitos' },
  { id:'mostaza',      emoji:'🌿', name:'Mostaza',            sub:'Semilla y derivados' },
];

let selectedAllergies = new Set();
let customAllergies   = [];

/* ══ CONTENIDO PANEL DERECHO (desktop) ══ */
const INFO_COLUMN_CONTENT = {
  home: `
    <div class="info-card">
      <div class="info-card-tag">🐾 Bienvenido a Wufly</div>
      <h2>Todo para el cuidado de tu mascota</h2>
      <p>La plataforma de mascotas más completa de Viña del Mar, Valparaíso y Concón.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">11</div><div class="info-stat-label">Veterinarias</div></div>
        <div class="info-stat"><div class="info-stat-num">10</div><div class="info-stat-label">Tiendas</div></div>
        <div class="info-stat"><div class="info-stat-num">3</div><div class="info-stat-label">Ciudades</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">💡 ¿Sabías que?</div>
      <h2>El 40% de los perros tiene sobrepeso en Chile</h2>
      <p>La obesidad es la enfermedad nutricional más común en mascotas. Puede reducir hasta 2 años de vida y aumentar el riesgo de diabetes, artritis y problemas cardíacos.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">40%</div><div class="info-stat-label">con sobrepeso</div></div>
        <div class="info-stat"><div class="info-stat-num">-2</div><div class="info-stat-label">años de vida</div></div>
        <div class="info-stat"><div class="info-stat-num">80%</div><div class="info-stat-label">prevenible</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">⚠️ Alimentos tóxicos para mascotas</div>
      <h2>Nunca darle estos alimentos a tu perro o gato</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🍫 Chocolate</span>
        <span class="info-tag-pill">🧅 Cebolla y ajo</span>
        <span class="info-tag-pill">🍇 Uvas y pasas</span>
        <span class="info-tag-pill">🥑 Palta</span>
        <span class="info-tag-pill">☕ Cafeína</span>
        <span class="info-tag-pill">🍬 Xilitol</span>
        <span class="info-tag-pill">🦴 Huesos cocidos</span>
        <span class="info-tag-pill">🧂 Sal en exceso</span>
      </div>
    </div>`,

  restaurantes: `
    <div class="info-card">
      <div class="info-card-tag">🏥 Clínicas veterinarias</div>
      <h2>Encuentra la clínica más cercana</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">📍</div><div class="info-tip-text"><strong>Activa tu ubicación</strong>Wufly ordena las clínicas por distancia para que encuentres la más cercana al instante.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🚨</div><div class="info-tip-text"><strong>Urgencias 24h</strong>Algunas clínicas tienen servicio de urgencias disponible toda la noche.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📋</div><div class="info-tip-text"><strong>Qué llevar a la consulta</strong>Carnet de vacunas, historial médico y, si es posible, una muestra de heces reciente.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">📊 Directorio</div>
      <h2>Clínicas disponibles en la región</h2>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">11</div><div class="info-stat-label">Clínicas</div></div>
        <div class="info-stat"><div class="info-stat-num">3</div><div class="info-stat-label">Con 24h</div></div>
        <div class="info-stat"><div class="info-stat-num">3</div><div class="info-stat-label">Ciudades</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🚨 Señales de urgencia</div>
      <h2>Ve a urgencias de inmediato si tu mascota…</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">No respira bien</span>
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">Convulsiona</span>
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">No puede orinar</span>
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">Vómitos repetidos</span>
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">Sangrado</span>
        <span class="info-tag-pill" style="background:rgba(220,38,38,0.2);color:#fca5a5;border-color:rgba(220,38,38,0.3);">Pérdida de equilibrio</span>
      </div>
    </div>`,

  drwufly: `
    <div class="info-card">
      <div class="info-card-tag">🩺 Dra. Wufly IA</div>
      <h2>Tu asistente veterinaria disponible 24/7</h2>
      <p>Cuéntale los síntomas de tu mascota y recibirás orientación inmediata. No reemplaza una consulta presencial.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">24/7</div><div class="info-stat-label">Disponible</div></div>
        <div class="info-stat"><div class="info-stat-num">IA</div><div class="info-stat-label">Claude AI</div></div>
        <div class="info-stat"><div class="info-stat-num">🆓</div><div class="info-stat-label">Gratis</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">💬 Cómo usarla mejor</div>
      <h2>Consejos para una mejor consulta</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">📝</div><div class="info-tip-text"><strong>Sé específico</strong>Indica especie, edad, peso y hace cuánto comenzaron los síntomas.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📸</div><div class="info-tip-text"><strong>Adjunta fotos</strong>Si hay herida o lesión visible, adjunta una foto para un mejor diagnóstico.</div></div>
        <div class="info-tip"><div class="info-tip-icon">⚠️</div><div class="info-tip-text"><strong>En emergencias, ve al vet</strong>Si no puede respirar, convulsiona o sangra, ve directamente a una clínica.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🔬 Síntomas frecuentes</div>
      <h2>Consultas más comunes en mascotas</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🤢 Vómitos</span>
        <span class="info-tag-pill">😴 Letargia</span>
        <span class="info-tag-pill">🍽️ Sin apetito</span>
        <span class="info-tag-pill">💧 Diarrea</span>
        <span class="info-tag-pill">😮‍💨 Tos seca</span>
        <span class="info-tag-pill">🦷 Problemas dentales</span>
        <span class="info-tag-pill">🐾 Cojea</span>
        <span class="info-tag-pill">🫧 Picazón</span>
      </div>
    </div>`,

  comunidad: `
    <div class="info-card">
      <div class="info-card-tag">🐾 Comunidad Wufly</div>
      <h2>Juntos por el bienestar animal</h2>
      <p>Publica mascotas en adopción, reporta perdidos o animales en situación de calle. Cada publicación puede cambiar una vida.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">🏠</div><div class="info-stat-label">Adopción</div></div>
        <div class="info-stat"><div class="info-stat-num">🔍</div><div class="info-stat-label">Perdidos</div></div>
        <div class="info-stat"><div class="info-stat-num">🆘</div><div class="info-stat-label">Rescate</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">📋 Cómo publicar</div>
      <h2>Pasos para publicar una mascota</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">📸</div><div class="info-tip-text"><strong>Foto clara</strong>Una buena foto aumenta las posibilidades de adopción o de encontrar al dueño.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📝</div><div class="info-tip-text"><strong>Descripción completa</strong>Incluye personalidad, señas particulares, si está vacunado o castrado.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📱</div><div class="info-tip-text"><strong>Contacto directo</strong>Agrega tu WhatsApp para que quienes quieran ayudar puedan contactarte fácilmente.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🍲 Recetas caseras</div>
      <h2>Comida natural para tu mascota</h2>
      <p>Descubre recetas sin conservantes ni aditivos. Prepara en casa snacks y comidas balanceadas para perros y gatos.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🐕 Perros</span>
        <span class="info-tag-pill">🐈 Gatos</span>
        <span class="info-tag-pill">🥩 Carnes</span>
        <span class="info-tag-pill">🥦 Verduras</span>
        <span class="info-tag-pill">🍚 Arroz</span>
      </div>
    </div>`,

  servicios: `
    <div class="info-card">
      <div class="info-card-tag">🛍️ Servicios para mascotas</div>
      <h2>Todo lo que tu mascota necesita</h2>
      <p>Tiendas, peluquerías, paseadores y artistas. Encuentra los mejores servicios en la región.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">10</div><div class="info-stat-label">Tiendas</div></div>
        <div class="info-stat"><div class="info-stat-num">9</div><div class="info-stat-label">Grooming</div></div>
        <div class="info-stat"><div class="info-stat-num">5</div><div class="info-stat-label">Artistas</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">✂️ Grooming profesional</div>
      <h2>¿Cuándo llevar a tu mascota a la peluquería?</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">🐕</div><div class="info-tip-text"><strong>Pelo largo: cada 6-8 semanas</strong>Razas como Shih Tzu, Poodle o Maltés requieren corte frecuente para evitar enredos.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🐩</div><div class="info-tip-text"><strong>Pelo corto: cada 3-4 meses</strong>Un baño y cepillado profesional mantiene el pelaje sano y sin parásitos.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🐈</div><div class="info-tip-text"><strong>Gatos: según necesidad</strong>La mayoría se autolimpia, pero los de pelo largo se benefician de un grooming ocasional.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🎨 Arte de mascotas</div>
      <h2>Inmortaliza a tu compañero</h2>
      <p>Artistas verificados en Viña del Mar ofrecen retratos en óleo, acuarela, lápiz y arte digital.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🖼️ Óleo</span>
        <span class="info-tag-pill">🎨 Acuarela</span>
        <span class="info-tag-pill">✏️ Lápiz</span>
        <span class="info-tag-pill">💻 Digital</span>
        <span class="info-tag-pill">📦 Envío incluido</span>
      </div>
    </div>`,

  alergias: `
    <div class="info-card">
      <div class="info-card-tag">👤 Mi perfil</div>
      <h2>Tu mascota y tú en un solo lugar</h2>
      <p>Guarda la información de tu mascota, accede a sus recordatorios de vacunas y controles, y gestiona tu cuenta Wufly.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">📅</div><div class="info-stat-label">Recordatorios</div></div>
        <div class="info-stat"><div class="info-stat-num">🍲</div><div class="info-stat-label">Recetas</div></div>
        <div class="info-stat"><div class="info-stat-num">🐾</div><div class="info-stat-label">Perfil</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">💉 Vacunación anual</div>
      <h2>Vacunas esenciales para tu mascota</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">🐕</div><div class="info-tip-text"><strong>Perros: polivalente + rabia</strong>Moquillo, hepatitis, parvovirus, parainfluenza y rabia. Refuerzo anual obligatorio.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🐈</div><div class="info-tip-text"><strong>Gatos: trivalente felina</strong>Panleucopenia, rinotraqueítis y calicivirus. Refuerzo anual o cada 3 años según el producto.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📅</div><div class="info-tip-text"><strong>Usa los recordatorios</strong>Wufly te avisa cuándo toca la próxima vacuna para que nunca se te olvide.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🔬 Chequeo preventivo</div>
      <h2>La salud de tu mascota en tus manos</h2>
      <p>Un chequeo anual detecta problemas a tiempo. Para mascotas senior (7+ años), se recomienda cada 6 meses.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🦷 Salud dental</span>
        <span class="info-tag-pill">⚖️ Peso ideal</span>
        <span class="info-tag-pill">🩸 Examen de sangre</span>
        <span class="info-tag-pill">🫀 Corazón</span>
        <span class="info-tag-pill">👁️ Ojos y oídos</span>
      </div>
    </div>`
};

function updateInfoColumn(tabName) {
  if (window.innerWidth < 900) return;
  const col = document.getElementById('infoColumn');
  if (!col) return;
  const content = INFO_COLUMN_CONTENT[tabName] || INFO_COLUMN_CONTENT.home;
  col.style.opacity = '0';
  setTimeout(() => {
    const esAdmin = (typeof currentUser !== 'undefined' && currentUser?.email === 'genifychile@gmail.com');
    col.innerHTML = (esAdmin ? _adminPaseadoresWidget() : '') + content;
    col.style.opacity = '1';
    if (esAdmin) _cargarSolicitudesPaseadores();
  }, 180);
}

/* ══ ADMIN WIDGET — Solicitudes de paseadores ══ */
function _adminPaseadoresWidget() {
  return `
  <div id="admin-paseadores-widget" style="background:linear-gradient(135deg,#1a0a3c,#2d1060);border-radius:16px;padding:18px;margin-bottom:16px;border:1.5px solid rgba(124,77,204,0.4);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div>
        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.1em;">WUFLY ADMIN</div>
        <div style="font-size:15px;font-weight:700;color:white;margin-top:2px;">🐾 Solicitudes de Paseadores</div>
      </div>
      <button onclick="_cargarSolicitudesPaseadores()" title="Actualizar"
        style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;font-size:13px;cursor:pointer;">↻</button>
    </div>
    <div id="admin-solicitudes-list" style="display:flex;flex-direction:column;gap:8px;">
      <div style="text-align:center;padding:20px;color:rgba(255,255,255,0.4);font-size:13px;">Cargando…</div>
    </div>
  </div>`;
}

async function _cargarSolicitudesPaseadores() {
  const list = document.getElementById('admin-solicitudes-list');
  if (!list) return;

  try {
    const { data, error } = await db
      .from('solicitudes_paseador')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:16px;color:rgba(255,255,255,0.4);font-size:13px;">Sin solicitudes aún</div>';
      return;
    }

    list.innerHTML = data.map(s => {
      const esPendiente = s.estado === 'pendiente';
      const esAprobado  = s.estado === 'aprobado';
      const fecha = s.created_at ? new Date(s.created_at).toLocaleDateString('es-CL', { day:'2-digit', month:'short' }) : '';

      return `
      <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:12px;border:1px solid rgba(255,255,255,0.1);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:700;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.nombre || 'Sin nombre'}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">${s.email || ''} · ${fecha}</div>
            ${s.zona ? `<div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:1px;">📍 ${s.zona}</div>` : ''}
          </div>
          <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;flex-shrink:0;
            background:${esPendiente ? 'rgba(245,158,11,0.2)' : esAprobado ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};
            color:${esPendiente ? '#FCD34D' : esAprobado ? '#6EE7B7' : '#FCA5A5'};">
            ${esPendiente ? '⏳ Pendiente' : esAprobado ? '✅ Aprobado' : '❌ Rechazado'}
          </span>
        </div>
        ${esPendiente ? `
        <div style="display:flex;gap:6px;margin-top:10px;">
          <button onclick="_aprobarPaseador('${s.id}')"
            style="flex:1;padding:7px;border-radius:8px;border:none;background:#10B981;color:white;font-size:12px;font-weight:700;cursor:pointer;">
            ✓ Aprobar
          </button>
          <button onclick="_rechazarPaseador('${s.id}')"
            style="flex:1;padding:7px;border-radius:8px;border:none;background:rgba(239,68,68,0.3);color:#FCA5A5;font-size:12px;font-weight:700;cursor:pointer;border:1px solid rgba(239,68,68,0.4);">
            ✕ Rechazar
          </button>
        </div>` : ''}
      </div>`;
    }).join('');

  } catch (e) {
    list.innerHTML = `<div style="text-align:center;padding:16px;color:#FCA5A5;font-size:12px;">Error al cargar: ${e.message}</div>`;
  }
}

async function _aprobarPaseador(id) {
  try {
    const { error } = await db
      .from('solicitudes_paseador')
      .update({ estado: 'aprobado' })
      .eq('id', id);
    if (error) throw error;
    await _cargarSolicitudesPaseadores();
  } catch (e) {
    alert('Error al aprobar: ' + e.message);
  }
}

async function _rechazarPaseador(id) {
  if (!confirm('¿Seguro que quieres rechazar esta solicitud?')) return;
  try {
    const { error } = await db
      .from('solicitudes_paseador')
      .update({ estado: 'rechazado' })
      .eq('id', id);
    if (error) throw error;
    await _cargarSolicitudesPaseadores();
  } catch (e) {
    alert('Error al rechazar: ' + e.message);
  }
}

/* ══ NAVEGACIÓN ══ */
function switchTab(name, el, fromNav = false) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Actualizar sidebar desktop
  document.querySelectorAll('.dsb-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === name);
  });

  document.getElementById('page-' + name).classList.add('active');
  if (name === 'restaurantes') {
    renderClinicas?.();
    /* Auto-buscar solo si el usuario ya permitió la ubicación antes */
    const yaHayGeo = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'loading');
    if (!yaHayGeo && localStorage.getItem('wufly_geo_granted')) activarBusquedaGeo?.();
  }
  if (name === 'home') renderHome?.();

  // Panel derecho dinámico (solo desktop)
  updateInfoColumn(name);

  // Franja de color superior: visible en todas las vistas excepto home
  const topBar = document.getElementById('topColorBar');
  if (topBar) topBar.style.display = name === 'home' ? 'none' : 'block';

  // Páginas secundarias no tienen tab activo en nav — solo las 5 principales
  const secondary = ['recetas', 'recordatorios', 'detail'];
  const order = ['home', 'restaurantes', 'drwufly', 'comunidad', 'servicios'];
  const idx = order.indexOf(name);
  if (!secondary.includes(name)) {
    document.querySelectorAll('.tab')[idx]?.classList.add('active');
    document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');
  }

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

/* ══ SUB-TABS DE SERVICIOS ══ */
function switchServiciosTab(tab) {
  const subs = ['tiendas', 'grooming', 'paseadores', 'arte'];
  subs.forEach(s => {
    const el = document.getElementById('ssub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('stab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color      = s === tab ? 'white' : 'var(--text-muted)';
    }
  });
  if (tab === 'tiendas')    renderTiendas?.();
  if (tab === 'grooming')   renderGrooming?.();
  if (tab === 'paseadores') { if (typeof initPaseadores === 'function') initPaseadores(); }
  if (tab === 'arte')       renderArte?.();

  if (tab === 'grooming' || tab === 'paseadores') {
    const sub = document.getElementById('ssub-' + tab);
    const vid = sub?.querySelector('video');
    if (vid) {
      vid.style.transition = 'none';
      vid.style.opacity = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          vid.style.transition = 'opacity 0.8s ease';
          vid.style.opacity = '1';
        });
      });
    }
  }
}

/* ══ SUB-TABS DE COMUNIDAD ══ */
function switchComunidadTab(tab) {
  const subs = ['adoptar', 'perdidos', 'rescate', 'fundaciones'];
  subs.forEach(s => {
    const el = document.getElementById('csub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('ctab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color      = s === tab ? 'white' : 'var(--text-muted)';
    }
  });
  if (tab === 'perdidos')     renderPerdidos?.();
  if (tab === 'rescate')      renderRescate?.();
  if (tab === 'adoptar')      renderAdoptar?.();
  if (tab === 'fundaciones')  renderFundaciones?.();
}

/* ══ CONSULTA RÁPIDA EN DR. WUFLY ══ */
function setConsultaRapida(texto) {
  const input = document.getElementById('chatInput');
  if (!input) return;
  input.value = texto;
  sendChat();
}

/* ══ OBTENER CONTEXTO COMPLETO DEL PERFIL PARA LA IA ══ */
function getUserContext() {
  /* Contexto del onboarding (condición, sensibilidad, preferencias) */
  const aiCtx = typeof buildAIContext === 'function' ? buildAIContext() : '';

  /* Alergias adicionales seleccionadas en MI PERFIL */
  const extraAllergies = getAllergyNames();
  const extraCtx = extraAllergies.length > 0
    ? `Alergias adicionales configuradas: ${extraAllergies.join(', ')}.`
    : '';

  return [aiCtx, extraCtx].filter(Boolean).join(' ');
}

/* ══ ALERGIAS (editor en MI PERFIL) ══ */
function buildAllergyGrid() {
  const grid = document.getElementById('allergyGrid');
  if (!grid) return;
  grid.innerHTML = PRESET_ALLERGIES.map(a => `
    <div class="allergy-toggle ${selectedAllergies.has(a.id) ? 'selected' : ''}"
         id="at-${a.id}" onclick="toggleAllergy('${a.id}')">
      <span class="at-emoji">${a.emoji}</span>
      <div class="at-info">
        <div class="at-name">${a.name}</div>
        <div class="at-sub">${a.sub}</div>
      </div>
      <div class="at-check">${selectedAllergies.has(a.id) ? '✓' : ''}</div>
    </div>
  `).join('');
}

function toggleAllergy(id) {
  if (selectedAllergies.has(id)) selectedAllergies.delete(id);
  else selectedAllergies.add(id);
  buildAllergyGrid();
}

function addCustomAllergy() {
  const inp = document.getElementById('customAllergyInput');
  const val = inp.value.trim();
  if (!val) return;
  if (!customAllergies.includes(val)) {
    customAllergies.push(val);
    renderCustomTags();
  }
  inp.value = '';
}

function removeCustom(val) {
  customAllergies = customAllergies.filter(a => a !== val);
  renderCustomTags();
}

function renderCustomTags() {
  const el = document.getElementById('customTags');
  if (!el) return;
  el.innerHTML = customAllergies.map(a => `
    <span class="custom-tag">${a}
      <button onclick="removeCustom('${a}')">×</button>
    </span>
  `).join('');
}

function getAllergyNames() {
  const presets = PRESET_ALLERGIES
    .filter(a => selectedAllergies.has(a.id))
    .map(a => a.name);
  return [...presets, ...customAllergies];
}

function updateAllergyBanner() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const extraNames = getAllergyNames();
  const banner = document.getElementById('allergyBanner');
  if (!banner) return;

  const allNames = [];
  if (profile?.condicion) {
    const map = { celiaco:'Celíaco', intolerante:'Intolerante', preferencia:'Sin gluten' };
    if (map[profile.condicion]) allNames.push(map[profile.condicion]);
  }
  allNames.push(...extraNames);

  if (allNames.length > 0) {
    banner.classList.add('show');
    document.getElementById('allergyBannerText').textContent =
      `Perfil activo: ${allNames.slice(0, 3).join(', ')}${allNames.length > 3 ? ' y más' : ''}`;
  } else {
    banner.classList.remove('show');
  }
}

/* ══ MI PERFIL — mostrar datos del onboarding ══ */
function renderProfileSummary() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const container = document.getElementById('profileSummaryCard');
  if (!container || !profile) return;

  const condMap = { celiaco:'Celíaco ⚕️', intolerante:'Intolerante al gluten ⚡', preferencia:'Evita el gluten 🌱' };
  const sensMap = { alta:'Sensibilidad alta 🔴', media:'Sensibilidad media 🟡', baja:'Sensibilidad baja 🟢' };

  const nombre   = profile.nombre ? `<div class="ps-name">Hola, <strong>${profile.nombre}</strong></div>` : '';
  const condTag  = profile.condicion  ? `<span class="ps-tag coral">${condMap[profile.condicion] || profile.condicion}</span>` : '';
  const sensTag  = profile.sensibilidad ? `<span class="ps-tag amber">${sensMap[profile.sensibilidad] || profile.sensibilidad}</span>` : '';
  const alerTags = (profile.alergias || []).map(a => `<span class="ps-tag mint">${a}</span>`).join('');
  const prefTags = (profile.preferencias || []).map(p => `<span class="ps-tag violet">${p}</span>`).join('');

  container.innerHTML = `
    <div class="ps-inner">
      ${nombre}
      <div class="ps-tags">${condTag}${sensTag}${alerTags}${prefTags}</div>
      <button class="ps-edit-btn" onclick="resetOnboarding()">Editar perfil</button>
    </div>
  `;
  container.style.display = 'block';
}

function resetOnboarding() {
  localStorage.removeItem('wufly_profile_v1');
  if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
  if (typeof showOnboarding === 'function') showOnboarding();
}

/* ══ GUARDAR PERFIL (alergias del editor) ══ */
function saveProfile() {
  document.getElementById('navDot')?.classList.add('show');
  updateAllergyBanner();

  const btn = document.querySelector('#page-alergias .btn-primary');
  if (!btn) return;
  btn.textContent = '✓ Perfil guardado';
  btn.style.background = 'var(--mint)';
  setTimeout(() => {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg> Guardar cambios`;
    btn.style.background = '';
  }, 2000);
}

/* ══ ESTILOS EXTRA PARA MI PERFIL ══ */
function injectProfileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #profileSummaryCard {
      background:linear-gradient(135deg, var(--coral-pale), var(--mint-pale));
      border:1.5px solid rgba(255,107,107,0.2);
      border-radius:var(--r);
      padding:18px;
      margin-bottom:14px;
      display:none;
    }
    .ps-inner { display:flex; flex-direction:column; gap:10px; }
    .ps-name { font-size:15px; color:var(--text); }
    .ps-name strong { font-family:'Funnel Display', sans-serif; font-size:18px; }
    .ps-tags { display:flex; flex-wrap:wrap; gap:6px; }
    .ps-tag { font-size:11px; font-weight:600; padding:4px 11px; border-radius:var(--r-pill); }
    .ps-tag.coral  { background:var(--coral-light); color:var(--coral-dark); }
    .ps-tag.amber  { background:var(--amber-light); color:#B8860B; }
    .ps-tag.mint   { background:var(--mint-light); color:var(--mint-dark); }
    .ps-tag.violet { background:var(--violet-light); color:var(--violet); }
    .ps-edit-btn {
      background:none; border:1.5px solid var(--border-md);
      border-radius:var(--r-xs); padding:8px 14px;
      font-size:12px; font-weight:600; color:var(--text-muted);
      cursor:pointer; font-family:'Plus Jakarta Sans', sans-serif;
      align-self:flex-start; transition:all 0.15s;
    }
    .ps-edit-btn:hover { border-color:var(--coral); color:var(--coral); }
  `;
  document.head.appendChild(style);
}

/* ══ INIT ══ */
/* ══ MODAL PERMISO UBICACIÓN ══ */
function showGeoModal() {
  if (localStorage.getItem('wufly_geo_granted')) return;
  if (sessionStorage.getItem('wufly_geo_declined')) return;
  const modal = document.getElementById('geoModal');
  if (modal) modal.style.display = 'flex';
}

function geoModalPermitir() {
  document.getElementById('geoModal').style.display = 'none';
  localStorage.setItem('wufly_geo_granted', '1');
  activarBusquedaGeo?.();
}

function geoModalRechazar() {
  document.getElementById('geoModal').style.display = 'none';
  sessionStorage.setItem('wufly_geo_declined', '1');
}

/* ── Registrar visita única por IP ── */
(function registrarVisita() {
  try {
    fetch('https://wufly-push.pablo77tapia.workers.dev/api/registrar-visita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {});
  } catch (_) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  injectProfileStyles();
  buildAllergyGrid();
  renderClinicas();
  // renderStore(); // TODO: tiendas mascotas
  updateAllergyBanner();
  renderProfileSummary();
  updateInfoColumn('home');
  /* Mostrar modal de ubicación tras 1.5s si aún no se ha respondido */
  setTimeout(showGeoModal, 1500);
  /* Pull to refresh */
  _initPullToRefresh();
  /* Botón instalar PWA */
  _initInstallBtn();
});

/* ══════════════════════════════════════
   PULL TO REFRESH
   Solo móvil. Arrastra desde el tope de
   cualquier sección para actualizar.
   ══════════════════════════════════════ */
function _initPullToRefresh() {
  if (window.innerWidth >= 900) return; // solo móvil

  /* ── Indicador visual ── */
  const ptr = document.createElement('div');
  ptr.id = 'ptr-indicator';
  ptr.innerHTML = `
    <style>
      #ptr-indicator {
        position:fixed;top:0;left:50%;
        transform:translateX(-50%) translateY(-70px);
        z-index:9998;pointer-events:none;
        transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
      }
      #ptr-disk {
        width:42px;height:42px;border-radius:50%;
        background:white;
        box-shadow:0 3px 14px rgba(124,77,204,0.28);
        display:flex;align-items:center;justify-content:center;
      }
      #ptr-spinner {
        width:20px;height:20px;border-radius:50%;
        border:2.5px solid #e0d8f5;
        border-top-color:var(--purple,#7C4DCC);
      }
      @keyframes ptr-spin { to { transform:rotate(360deg); } }
      #ptr-spinner.spinning { animation:ptr-spin 0.65s linear infinite; }
    </style>
    <div id="ptr-disk"><div id="ptr-spinner"></div></div>
  `;
  document.body.appendChild(ptr);

  const spinner  = ptr.querySelector('#ptr-spinner');
  const THRESHOLD = 65;
  const RESIST    = 0.38;
  let startY = 0, pulling = false, busy = false;

  /* ── Qué tab está activo ── */
  function _activeTab() {
    return document.querySelector('.page.active')?.id?.replace('page-', '') || 'home';
  }
  function _activeServiciosSub() {
    return ['tiendas','grooming','paseadores','arte'].find(s => {
      const el = document.getElementById('ssub-' + s);
      return el && el.style.display !== 'none';
    }) || 'tiendas';
  }
  function _activeComunidadSub() {
    return ['adoptar','perdidos','rescate','fundaciones'].find(s => {
      const el = document.getElementById('csub-' + s);
      return el && el.style.display !== 'none';
    }) || 'adoptar';
  }

  /* ── Acción de refresco por sección ── */
  function _doRefresh() {
    spinner.classList.add('spinning');
    const tab = _activeTab();
    const done = () => {
      busy = false;
      spinner.classList.remove('spinning');
      ptr.style.transform = 'translateX(-50%) translateY(-70px)';
    };

    if (tab === 'home') {
      renderHome?.();
      setTimeout(done, 700);
    } else if (tab === 'restaurantes') {
      Promise.resolve(typeof iniciarGeoBusqueda === 'function' ? iniciarGeoBusqueda(true) : null)
        .then(() => { renderClinicas?.(); done(); });
    } else if (tab === 'servicios') {
      const sub = _activeServiciosSub();
      if (sub === 'grooming')   { activarBusquedaGrooming?.(); setTimeout(done, 900); }
      else if (sub === 'tiendas')   { activarBusquedaTiendas?.(); setTimeout(done, 900); }
      else if (sub === 'paseadores'){ cargarPaseadoresDB?.();     setTimeout(done, 900); }
      else { renderArte?.(); setTimeout(done, 400); }
    } else if (tab === 'comunidad') {
      const sub = _activeComunidadSub();
      if (sub === 'adoptar')  renderAdopcion?.();
      if (sub === 'perdidos') renderPerdidos?.();
      setTimeout(done, 700);
    } else if (tab === 'alergias') {
      Promise.resolve(typeof sincronizarPerfil === 'function' ? sincronizarPerfil() : null)
        .then(() => done());
    } else {
      setTimeout(done, 400);
    }
  }

  /* ── Listeners ── */
  window.addEventListener('touchstart', e => {
    if (busy || window.scrollY > 4) return;
    startY  = e.touches[0].clientY;
    pulling = true;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!pulling || busy) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) { pulling = false; return; }
    const pull = Math.min(dy * RESIST, THRESHOLD + 18);
    ptr.style.transition = 'none';
    ptr.style.transform  = `translateX(-50%) translateY(${pull - 36}px)`;
    // Girar el spinner según el progreso del arrastre
    const pct = Math.min(pull / THRESHOLD, 1);
    spinner.style.transform = `rotate(${pct * 270}deg)`;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (!pulling || busy) return;
    pulling = false;
    const dy = e.changedTouches[0].clientY - startY;
    spinner.style.transform = '';
    if (dy * RESIST >= THRESHOLD) {
      busy = true;
      ptr.style.transition = 'transform 0.25s ease';
      ptr.style.transform  = 'translateX(-50%) translateY(14px)';
      _doRefresh();
    } else {
      ptr.style.transition = 'transform 0.3s ease';
      ptr.style.transform  = 'translateX(-50%) translateY(-70px)';
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   INSTALAR PWA
   Detecta Chrome (beforeinstallprompt)
   e iOS Safari (navigator.standalone).
   No aparece si ya está instalada.
   ══════════════════════════════════════ */
function _initInstallBtn() {
  /* ── Ya está instalada como standalone → no mostrar ── */
  const yaInstalada =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (yaInstalada) return;

  const esIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const esSafari  = /safari/i.test(navigator.userAgent) && !/chrome|crios|fxios/i.test(navigator.userAgent);
  const esChrome  = /chrome|crios/i.test(navigator.userAgent);

  let deferredPrompt = null;

  /* ── Chrome/Android: capturar evento nativo ── */
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    _mostrarBtnInstalar();
  });

  /* ── iOS Safari: mostrar siempre (no hay evento nativo) ── */
  if (esIOS && esSafari) {
    setTimeout(_mostrarBtnInstalar, 1800); // pequeño delay para no abrumar al entrar
  }

  /* ── Ocultar si se instala ── */
  window.addEventListener('appinstalled', () => {
    document.getElementById('wufly-install-btn')?.remove();
  });

  function _mostrarBtnInstalar() {
    if (document.getElementById('wufly-install-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'wufly-install-btn';
    btn.title = 'Instalar Wufly en tu dispositivo';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>Instalar</span>
    `;
    btn.style.cssText = `
      position:fixed;top:55px;right:70px;z-index:200;
      display:inline-flex;align-items:center;gap:6px;
      background:linear-gradient(135deg,#5C2FA8,#7C4DCC);
      color:white;border:none;border-radius:100px;
      padding:8px 14px;font-size:12px;font-weight:700;
      font-family:'Plus Jakarta Sans',sans-serif;
      cursor:pointer;
      box-shadow:0 4px 14px rgba(92,47,168,0.45);
      animation:installPulse 2.5s ease-in-out infinite;
    `;

    /* Animación de pulso */
    if (!document.getElementById('install-btn-style')) {
      const s = document.createElement('style');
      s.id = 'install-btn-style';
      s.textContent = `
        @keyframes installPulse {
          0%,100% { box-shadow:0 4px 14px rgba(92,47,168,0.45); transform:scale(1); }
          50%      { box-shadow:0 4px 22px rgba(92,47,168,0.7);  transform:scale(1.04); }
        }
        #wufly-install-btn:active { transform:scale(0.95)!important; animation:none!important; }
      `;
      document.head.appendChild(s);
    }

    btn.addEventListener('click', async () => {
      if (deferredPrompt) {
        /* Chrome/Android: prompt nativo */
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (outcome === 'accepted') btn.remove();
      } else {
        /* iOS Safari: instrucciones en modal */
        _mostrarInstruccionesIOS();
      }
    });

    document.body.appendChild(btn);
  }

  function _mostrarInstruccionesIOS() {
    if (document.getElementById('ios-install-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ios-install-modal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(30,10,60,0.6);backdrop-filter:blur(4px);
      display:flex;align-items:flex-end;justify-content:center;
      animation:fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <div style="
        background:white;border-radius:28px 28px 0 0;
        padding:28px 24px 40px;width:100%;max-width:480px;
        animation:slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1);
      ">
        <div style="width:40px;height:4px;background:#e0d8f5;border-radius:4px;margin:0 auto 24px;"></div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <img src="img/icono.png" style="width:48px;height:48px;border-radius:14px;box-shadow:0 2px 10px rgba(0,0,0,0.15);">
          <div>
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:18px;color:#2D1B6B;">Instalar Wufly</div>
            <div style="font-size:12px;color:#9CA3AF;margin-top:2px;">Agrégala a tu pantalla de inicio</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#E3F2FD;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">1</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Toca el botón <strong>Compartir</strong> <span style="font-size:16px;">⬆️</span> en la barra inferior de Safari</div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#E8F5E9;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">2</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Desliza y toca <strong>"Agregar a pantalla de inicio"</strong> <span style="font-size:16px;">➕</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#F3E5F5;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">3</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Toca <strong>"Agregar"</strong> en la esquina superior derecha</div>
          </div>
        </div>
        <button onclick="document.getElementById('ios-install-modal').remove()"
          style="width:100%;padding:14px;border-radius:14px;border:none;
          background:linear-gradient(135deg,#5C2FA8,#7C4DCC);color:white;
          font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;">
          Entendido 👍
        </button>
      </div>
      <style>
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      </style>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }
}