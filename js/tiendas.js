/* ══════════════════════════════════════
   TIENDAS — Wufly
   Pet shops y tiendas online verificadas
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const tiendas = [
  {
    id: 'petslife-tienda',
    nombre: 'PetsLife',
    tipo: 'fisica',
    city: 'viña',
    icon: '🐾',
    desc: 'Pet shop con múltiples sucursales en Viña del Mar. Alimentos premium, accesorios, higiene y peluquería canina. Atención personalizada y asesoría en nutrición para todas las especies.',
    categorias: ['Alimentos premium', 'Accesorios', 'Peluquería', 'Higiene'],
    address: 'Av. Libertad 1198, Viña del Mar',
    horario: 'Lun–Sáb 10–19h',
    rating: 4.6,
    wsp: '+56966317573',
  },
  {
    id: 'infopet-tienda',
    nombre: 'InfoPet Reñaca',
    tipo: 'fisica',
    city: 'viña',
    icon: '🐕',
    desc: 'Tienda especializada en nutrición y accesorios para mascotas en Reñaca. Amplio stock de alimentos de marcas premium, productos de higiene, juguetes y servicio de grooming.',
    categorias: ['Alimentos premium', 'Grooming', 'Juguetes', 'Higiene'],
    address: 'Eluchans 1737 Local 6, Reñaca, Viña del Mar',
    horario: 'Lun–Sáb 11–20h',
    rating: 4.7,
    wsp: '+56997600367',
  },
  {
    id: 'petlandia',
    nombre: 'Petlandia Chile',
    tipo: 'fisica',
    city: 'viña',
    icon: '🦴',
    desc: 'Pet shop completo en el centro de Viña del Mar. Alimentos de todas las marcas, accesorios, productos veterinarios de venta libre, ropa para mascotas y artículos de higiene.',
    categorias: ['Alimentos', 'Accesorios', 'Veterinarios', 'Ropa mascotas'],
    address: 'Av. Libertad 1002, Viña del Mar',
    horario: 'Lun–Sáb 10–19:30h · Dom 10–17h',
    rating: 4.5,
    wsp: '+56934471222',
  },
  {
    id: 'mypets-vina',
    nombre: 'My Pets Oquiz Viña',
    tipo: 'fisica',
    city: 'viña',
    icon: '🐈',
    desc: 'Tienda de mascotas con amplio surtido de alimentos, accesorios y productos de cuidado para perros y gatos. Asesoría personalizada en nutrición y bienestar animal.',
    categorias: ['Alimentos', 'Accesorios', 'Cuidado', 'Nutrición'],
    address: 'Álvarez 646 Local 101, Viña del Mar',
    horario: 'Lun–Sáb 10–19h',
    rating: 4.4,
    wsp: '+56993496270',
  },
  {
    id: 'mypets-valpo',
    nombre: 'My Pets Oquiz Valpo',
    tipo: 'fisica',
    city: 'valpo',
    icon: '🐾',
    desc: 'Sucursal de My Pets en Valparaíso. Completo stock de alimentos premium, accesorios, productos de higiene y artículos para el bienestar de tu mascota.',
    categorias: ['Alimentos premium', 'Accesorios', 'Higiene', 'Bienestar'],
    address: 'Francia 370 Local 8, Valparaíso',
    horario: 'Lun–Sáb 10–19h',
    rating: 4.3,
    wsp: '+56974389737',
  },
  {
    id: 'petzonas-tienda',
    nombre: 'Petzonas',
    tipo: 'fisica',
    city: 'concon',
    icon: '🏬',
    desc: 'Centro de productos y cuidado para mascotas en Concón. Alimentos de primeras marcas, accesorios, productos de higiene y servicio de grooming. Amplio horario de atención.',
    categorias: ['Alimentos', 'Grooming', 'Accesorios', 'Higiene'],
    address: 'Av. Concón-Reñaca 44, Concón',
    horario: 'Lun–Vie 9:30–20h',
    rating: 4.7,
    wsp: '+56930788923',
  },
  {
    id: 'mypets-concon',
    nombre: 'My Pets Oquiz Concón',
    tipo: 'fisica',
    city: 'concon',
    icon: '🐕',
    desc: 'Sucursal My Pets en Concón. Alimentos, accesorios y productos especializados para el cuidado de perros y gatos. Atención personalizada por expertos en bienestar animal.',
    categorias: ['Alimentos', 'Accesorios', 'Especializado', 'Expertos'],
    address: 'Av. Concón-Reñaca 3400 Local 10, Concón',
    horario: 'Lun–Sáb 10–19h',
    rating: 4.5,
    wsp: '+56987545004',
  },
  {
    id: 'camada',
    nombre: 'Camada Pet Shop',
    tipo: 'fisica',
    city: 'concon',
    icon: '🌿',
    desc: 'Pet shop familiar en Concón con productos naturales y orgánicos para mascotas. Alimentos sin conservantes, snacks saludables, accesorios eco-friendly y asesoría en nutrición natural.',
    categorias: ['Natural', 'Orgánico', 'Snacks saludables', 'Eco-friendly'],
    address: 'Las Pelargonias 842, Concón',
    horario: 'Lun–Sáb 10–18h',
    rating: 4.4,
    wsp: null,
  },
  {
    id: 'puppis-online',
    nombre: 'Puppis',
    tipo: 'online',
    city: null,
    icon: '🛒',
    desc: 'Tienda online líder en Chile con despacho a todo el país. Más de 5.000 productos para perros, gatos y otras mascotas. Precios competitivos y envío rápido.',
    categorias: ['Todo tipo de mascotas', 'Envío a domicilio', 'App móvil', '+5000 productos'],
    address: null,
    horario: 'Online 24/7',
    rating: 4.5,
    web: 'puppis.cl',
  },
  {
    id: 'petco-online',
    nombre: 'Petco Chile',
    tipo: 'online',
    city: null,
    icon: '🌐',
    desc: 'Tienda online con amplia variedad de productos premium. Alimentos veterinarios, accesorios de lujo, productos naturales y orgánicos para mascotas.',
    categorias: ['Premium', 'Veterinario', 'Natural', 'Orgánico'],
    address: null,
    horario: 'Online 24/7',
    rating: 4.3,
    web: 'petco.cl',
  },
  {
    id: 'laika-online',
    nombre: 'Laika',
    tipo: 'online',
    city: null,
    icon: '🚀',
    desc: 'Startup chilena de productos para mascotas con entrega express en Santiago y regiones. Alimentos por suscripción mensual con descuento y nutrición personalizada.',
    categorias: ['Suscripción mensual', 'Entrega express', 'Nutrición personalizada', 'Descuentos'],
    address: null,
    horario: 'Online 24/7',
    rating: 4.6,
    web: 'laika.cl',
  },
];

/* ── Filtro activo ── */
let tiendaFilter = 'todos';

function setFilterTienda(el, val) {
  tiendaFilter = val;
  document.querySelectorAll('#page-tiendas .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderTiendas();
}

/* ── Render ── */
function renderTiendas() {
  const list = document.getElementById('tiendaList');
  if (!list) return;

  const q = (document.getElementById('searchTienda')?.value || '').toLowerCase();

  const geoDisponibleT = typeof geoResults !== 'undefined' && geoResults.tiendas.length > 0;

  let fuente, geoFuenteT = [], staticFuenteT = [];

  if (tiendaFilter === 'geo') {
    fuente = geoResults.tiendas
      .filter(t => !q || t.nombre.toLowerCase().includes(q) || t.address.toLowerCase().includes(q));
  } else {
    staticFuenteT = tiendas.filter(t => {
      const matchFilter =
        tiendaFilter === 'todos' ||
        tiendaFilter === t.tipo  ||
        tiendaFilter === t.city;
      const matchSearch = !q ||
        t.nombre.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)   ||
        t.categorias.some(c => c.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
    if (tiendaFilter === 'todos' && geoDisponibleT) {
      geoFuenteT = geoResults.tiendas
        .filter(t => !q || t.nombre.toLowerCase().includes(q) || t.address.toLowerCase().includes(q));
    }
    fuente = [...geoFuenteT, ...staticFuenteT];
  }

  if (!fuente.length) {
    list.innerHTML = tiendaFilter === 'geo'
      ? `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
           <div style="font-size:36px;margin-bottom:10px;">🗺</div>
           <div style="font-weight:700;margin-bottom:6px;">Sin tiendas en OpenStreetMap</div>
           <div style="font-size:13px;">Prueba los filtros por ciudad para ver tiendas verificadas.</div>
         </div>`
      : `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
           <div style="font-size:36px;margin-bottom:8px;">🛒</div>
           <div style="font-size:14px;">No se encontraron tiendas</div>
         </div>`;
    return;
  }

  const sepIdxT = geoFuenteT.length;

  list.innerHTML = fuente.map((t, i) => {
    const separador = (tiendaFilter === 'todos' && geoFuenteT.length > 0 && i === sepIdxT)
      ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:12px 4px 6px;">VERIFICADAS POR WUFLY</div>`
      : '';
    const isOnline      = t.tipo === 'online';
    const tipoBadgeBg   = isOnline ? '#E6F9F3' : '#F0EAFB';
    const tipoBadgeClr  = isOnline ? '#3DAF87' : '#7C4DCC';
    const tipoBadgeTxt  = isOnline ? '🌐 Online' : '📍 Física';
    const stars         = t.rating ? '★'.repeat(Math.round(t.rating)) + '☆'.repeat(5 - Math.round(t.rating)) : '';
    const distBadge     = t.distKm != null
      ? `<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:var(--purple-light);color:var(--purple);margin-right:5px;">📍 ${fmtDist(t.distKm)}</span>`
      : '';
    const mapLink = t.lat && t.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}" target="_blank" rel="noopener"
           style="font-size:11px;color:var(--purple);font-weight:700;text-decoration:none;" onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
      : '';

    const cardClassT       = t.fromOSM ? 'place-card' : 'place-card-verificado';
    const verificadoBadgeT = t.fromOSM ? '' : `<span class="badge-wufly">✓ Verificado Wufly</span><br>`;
    const iconBgT          = t.fromOSM ? 'var(--bg)' : 'var(--purple-light)';

    return separador + `
      <div class="${cardClassT}" onclick="openTienda('${t.id}')">
        <div class="place-card-inner">
          <div class="place-icon" style="background:${iconBgT};">${t.icon}</div>
          <div class="place-info">
            ${verificadoBadgeT}
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;flex-wrap:wrap;">
              ${distBadge}
              <div class="place-name">${t.nombre}</div>
              <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:${tipoBadgeBg};color:${tipoBadgeClr};flex-shrink:0;">${tipoBadgeTxt}</span>
            </div>
            ${stars ? `<div style="font-size:11px;color:var(--text-hint);margin-bottom:4px;">${stars} ${t.rating}</div>` : ''}
            <div class="place-desc">${t.desc}</div>
            <div class="place-tags" style="margin-top:6px;">
              ${t.categorias.slice(0,3).map(c => `<span class="place-tag">${c}</span>`).join('')}
            </div>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;">
              ${t.address ? `<div style="font-size:11px;color:var(--text-muted);">📍 ${t.address}</div>` : ''}
              ${t.horario ? `<div style="font-size:11px;color:var(--text-muted);">🕐 ${t.horario}</div>` : ''}
              ${t.web ? `<div style="font-size:11px;color:var(--purple);">🌐 ${t.web}</div>` : ''}
              ${mapLink}
            </div>
          </div>
          <div style="flex-shrink:0;color:var(--text-hint);font-size:18px;align-self:center;">›</div>
        </div>
      </div>`;
  }).join('');
}

/* ── Detalle tienda (preparado para desarrollar) ── */
function openTienda(id) {
  const t = tiendas.find(x => x.id === id);
  if (!t) return;
  registrarClick(t.id, t.nombre, 'tiendas');
  if (t.web) {
    window.open('https://' + t.web, '_blank');
  } else if (t.wsp) {
    window.open('https://wa.me/' + t.wsp.replace(/\D/g, ''), '_blank');
  }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderTiendas();
});
