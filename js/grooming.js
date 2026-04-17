/* ══════════════════════════════════════
   GROOMING / PELUQUERÍAS CANINAS — WUFLY
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const grooming = [
  {
    id: 'distrito-mascotas',
    name: 'Distrito Mascotas',
    type: 'PELUQUERÍA · BAÑO · TIENDA',
    icon: '✂️',
    city: 'viña',
    destacado: true,
    rating: 4.5,
    reviews: 120,
    desc: 'Peluquería canina y felina con tienda de accesorios en Reñaca. Baño, corte de raza, secado y arreglo de uñas. Atención personalizada con agenda previa.',
    tags: ['Corte de raza', 'Uñas', 'Tienda', 'Reñaca'],
    address: 'Av. José Manuel Balmaceda 287, Reñaca, Viña del Mar',
    wsp: '+56950329091',
    horario: 'Lun–Sáb 9–17h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'petslife-groom',
    name: 'PetsLife',
    type: 'PELUQUERÍA · BAÑO · TIENDA PET',
    icon: '🐩',
    city: 'viña',
    destacado: false,
    rating: 4.6,
    reviews: 95,
    desc: 'Centro de cuidado integral para mascotas con peluquería, baño y tienda de accesorios. Múltiples sucursales en Viña del Mar. Atención para perros y gatos de todas las razas.',
    tags: ['Múltiples sucursales', 'Baño profundo', 'Corte de raza', 'Accesorios'],
    address: 'Av. Libertad 1198, Viña del Mar',
    wsp: '+56966317573',
    horario: 'Lun–Sáb 10–19h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'infopet-groom',
    name: 'InfoPet Reñaca',
    type: 'GROOMING · BAÑO · TIENDA',
    icon: '🛁',
    city: 'viña',
    destacado: false,
    rating: 4.7,
    reviews: 148,
    desc: 'Peluquería canina y felina en Reñaca con tienda completa. Baños, cortes de raza, deslanado, hidratación y arreglo completo. Atención con hora para mayor comodidad.',
    tags: ['Deslanado', 'Hidratación', 'Corte de raza', 'Con hora'],
    address: 'Eluchans 1737 Local 6, Reñaca, Viña del Mar',
    wsp: '+56997600367',
    horario: 'Lun–Sáb 11–20h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'antonia-canina',
    name: 'Antonia Peluquería Canina',
    type: 'PELUQUERÍA · BAÑO · CORTE',
    icon: '✂️',
    city: 'viña',
    destacado: false,
    rating: 4.5,
    reviews: 83,
    desc: 'Peluquería canina especializada con años de experiencia en Viña del Mar. Cortes de raza, baños, arreglo de orejas, patas y uñas. Trato cálido y profesional.',
    tags: ['Corte de raza', 'Orejas', 'Uñas', 'Experiencia'],
    address: 'Azucenas 54, Viña del Mar',
    wsp: null,
    horario: 'Lun–Sáb 9–18h',
    especies: ['perro'],
  },
  {
    id: 'sofi-huellitas',
    name: 'Sofi Huellitas',
    type: 'GROOMING · BAÑO · CORTE CREATIVO',
    icon: '💅',
    city: 'viña',
    destacado: false,
    rating: 4.8,
    reviews: 67,
    desc: 'Peluquería canina con servicios de grooming creativo, baños especiales y cortes de raza. Ambiente tranquilo y personalizado para que tu mascota se sienta en casa.',
    tags: ['Grooming creativo', 'Baño especial', 'Ambiente tranquilo', 'Personalizado'],
    address: 'Av. Libertad 17 Local 15, Viña del Mar',
    wsp: null,
    horario: 'Mar–Sáb 10–18h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'pelos-patas',
    name: 'Pelos y Patas',
    type: 'PELUQUERÍA · BAÑO · CORTE',
    icon: '🐾',
    city: 'valpo',
    destacado: false,
    rating: 4.6,
    reviews: 102,
    desc: 'Peluquería canina en Valparaíso. Baños, cortes de raza, deslanado y arreglo completo. Atención personalizada con cita previa. Precios accesibles.',
    tags: ['Corte de raza', 'Deslanado', 'Cita previa', 'Valparaíso'],
    address: 'San Ignacio 547, Valparaíso',
    wsp: '+56984687235',
    horario: 'Lun–Vie 10–18h · Sáb 10–15h',
    especies: ['perro'],
  },
  {
    id: 'petzonas-groom',
    name: 'Petzonas',
    type: 'GROOMING · TIENDA · BAÑO PROFUNDO',
    icon: '🛁',
    city: 'concon',
    destacado: false,
    rating: 4.7,
    reviews: 134,
    desc: 'Centro de cuidado y grooming para mascotas en Concón. Baños, cortes de raza, hidratación y tienda de accesorios. Amplio horario para mayor comodidad.',
    tags: ['Baño profundo', 'Corte de raza', 'Hidratación', 'Tienda'],
    address: 'Av. Concón-Reñaca 44, Concón',
    wsp: '+56930788923',
    horario: 'Lun–Vie 9:30–20h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'pet-happy',
    name: 'Pet Happy',
    type: 'GROOMING · BAÑO · CORTE DE RAZA',
    icon: '✂️',
    city: 'concon',
    destacado: false,
    rating: 4.6,
    reviews: 89,
    desc: 'Peluquería y spa para mascotas en Concón. Cortes de raza, baños aromáticos, arreglo de uñas y orejas. Abierto todos los días para mayor comodidad.',
    tags: ['Spa', 'Aromaterapia', 'Uñas', 'Todos los días'],
    address: 'Los Manantiales 1121, Concón',
    wsp: '+56998692839',
    horario: 'Todos los días 10–20h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'mundo-chic',
    name: 'Mundo Chic Mascotas',
    type: 'GROOMING · TIENDA · ACCESORIOS',
    icon: '🐩',
    city: 'concon',
    destacado: false,
    rating: 4.5,
    reviews: 61,
    desc: 'Peluquería canina y tienda de accesorios premium en Concón. Grooming completo, baños, cortes creativos y gran variedad de productos para el cuidado de tu mascota.',
    tags: ['Cortes creativos', 'Accesorios premium', 'Tienda', 'Concón'],
    address: 'Los Peumos 1390 Local 10, Concón',
    wsp: '+56964079577',
    horario: 'Lun–Sáb 10–19h',
    especies: ['perro', 'gato'],
  },
];

/* ══ ESTADO ══ */
let groomingFilter = 'todos';

/* ══ RENDER ══ */
function renderGrooming() {
  const list = document.getElementById('groomingList');
  if (!list) return;

  const q = (document.getElementById('searchGrooming')?.value || '').toLowerCase();

  const geoDisponibleG = typeof geoResults !== 'undefined' && geoResults.grooming.length > 0;

  let fuente, geoFuenteG = [], staticFuenteG = [];

  if (groomingFilter === 'geo') {
    fuente = geoResults.grooming
      .filter(g => !q || g.name.toLowerCase().includes(q) || g.address.toLowerCase().includes(q));
  } else {
    staticFuenteG = grooming.filter(g => {
      const matchFilter =
        groomingFilter === 'todos' ||
        (groomingFilter === 'viña'   && g.city === 'viña')  ||
        (groomingFilter === 'valpo'  && g.city === 'valpo') ||
        (groomingFilter === 'concon' && g.city === 'concon');
      const matchSearch = !q ||
        g.name.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
    if (groomingFilter === 'todos' && geoDisponibleG) {
      geoFuenteG = geoResults.grooming
        .filter(g => !q || g.name.toLowerCase().includes(q) || g.address.toLowerCase().includes(q));
    }
    fuente = [...geoFuenteG, ...staticFuenteG];
  }

  if (fuente.length === 0) {
    list.innerHTML = groomingFilter === 'geo'
      ? `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
           <div style="font-size:36px;margin-bottom:10px;">🗺</div>
           <div style="font-weight:700;margin-bottom:6px;">Sin peluquerías en OpenStreetMap</div>
           <div style="font-size:13px;">Prueba los filtros por ciudad para ver locales verificados.</div>
         </div>`
      : `<div class="empty-state"><div style="font-size:36px">✂️</div><p>No hay resultados para ese filtro.</p></div>`;
    return;
  }

  const sepIdxG = geoFuenteG.length;

  list.innerHTML = fuente.map((g, i) => {
    const separador = (groomingFilter === 'todos' && geoFuenteG.length > 0 && i === sepIdxG)
      ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:12px 4px 6px;">VERIFICADAS POR WUFLY</div>`
      : '';
    const stars     = g.rating ? '★'.repeat(Math.round(g.rating)) + '☆'.repeat(5 - Math.round(g.rating)) : '';
    const wspNum    = (g.wsp || '').replace(/\D/g, '');
    const distBadge = g.distKm != null
      ? `<span style="display:inline-block;background:var(--purple-light);color:var(--purple);font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:4px;">📍 ${fmtDist(g.distKm)}</span><br>`
      : '';
    const trackAttr = g.fromOSM ? '' : `onclick="clickGrooming('${g.id}','${g.name.replace(/'/g,"\\'")}')"`
    const mapLink = g.lat && g.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}" target="_blank" rel="noopener" ${trackAttr}
           style="display:flex;align-items:center;justify-content:center;gap:6px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;">
           🗺 Cómo llegar
         </a>`
      : wspNum
      ? `<a href="https://wa.me/${wspNum}" target="_blank" rel="noopener noreferrer" ${trackAttr}
           style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;">
           <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
           Reservar por WhatsApp
         </a>`
      : '';

    const cardClassG = g.fromOSM ? 'place-card' : 'place-card-conectado';
    const tierBadgeG = g.fromOSM
      ? `<span style="display:inline-flex;align-items:center;gap:3px;background:var(--bg);color:var(--text-hint);font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;border:1px solid var(--border);margin-bottom:6px;">📍 Básico</span><br>`
      : `<span class="badge-conectado">⚡ Conectado</span><br>`;
    const iconBgG = g.fromOSM ? 'var(--bg)' : '#DCFCE7';

    return separador + `
    <div class="${cardClassG}">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:44px;height:44px;min-width:44px;background:${iconBgG};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">${g.icon}</div>
        <div style="flex:1;min-width:0;">
          ${tierBadgeG}
          ${distBadge}
          ${g.destacado ? `<div style="font-size:10px;font-weight:700;color:var(--mint-dark);letter-spacing:0.05em;margin-bottom:3px;">⭐ DESTACADO</div>` : ''}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:2px;">${g.name}</div>
          <div style="font-size:10px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:5px;">${g.type}</div>
          ${stars ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:3px;"><span style="color:var(--mint);">${stars}</span> <span style="font-weight:600;">${g.rating}</span> <span style="color:var(--text-hint);">(${g.reviews})</span></div>` : ''}
          <div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">${g.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            ${g.tags.slice(0, 3).map(t => `<span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${t}</span>`).join('')}
          </div>
          <div style="border-top:1px solid var(--border);padding-top:10px;">
            ${g.address ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:3px;">📍 ${g.address}</div>` : ''}
            ${g.horario ? `<div style="font-size:11px;color:var(--text-hint);margin-bottom:8px;">🕐 ${g.horario}</div>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
  }).join('');
}

function clickGrooming(id, nombre) {
  registrarClick(id, nombre, 'grooming');
}

function setFilterGrooming(el, val) {
  groomingFilter = val;
  document.querySelectorAll('#page-servicios .sub-filter-grooming .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderGrooming();
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderGrooming);
