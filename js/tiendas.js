/* ══════════════════════════════════════
   TIENDAS — Wufly
   Pet shops y tiendas online verificadas
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const tiendas = [
  {
    id: 'miwau',
    nombre: 'Mi Wau',
    tipo: 'fisica',
    city: 'viña',
    icon: '🐕',
    desc: 'Pet shop especializado en alimentos premium, accesorios y productos de higiene para perros y gatos. Atención personalizada y asesoría en nutrición.',
    categorias: ['Alimentos premium', 'Accesorios', 'Higiene', 'Juguetes'],
    address: 'Av. Libertad 1205, Viña del Mar',
    horario: 'Lun–Vie 10–20h · Sáb 10–15h',
    rating: 4.6,
  },
  {
    id: 'petshop-vina',
    nombre: 'PetShop Viña',
    tipo: 'fisica',
    city: 'viña',
    icon: '🐾',
    desc: 'Tienda completa para mascotas con amplio stock de alimentos, medicamentos de venta libre, accesorios y servicios de peluquería canina.',
    categorias: ['Alimentos', 'Medicamentos', 'Peluquería', 'Accesorios'],
    address: '5 Norte 680, Viña del Mar',
    horario: 'Lun–Sáb 9–20h · Dom 10–14h',
    rating: 4.3,
  },
  {
    id: 'zoomarcas',
    nombre: 'Zoo Marcas',
    tipo: 'fisica',
    city: 'viña',
    icon: '🦜',
    desc: 'Tienda especializada en animales exóticos, aves y acuarios. También cuenta con sección completa para perros y gatos con marcas premium.',
    categorias: ['Exóticos', 'Acuarios', 'Aves', 'Alimentos premium'],
    address: 'Av. Valparaíso 456, Viña del Mar',
    horario: 'Lun–Vie 10–19h · Sáb 10–14h',
    rating: 4.4,
  },
  {
    id: 'petworld',
    nombre: 'Pet World Reñaca',
    tipo: 'fisica',
    city: 'viña',
    icon: '🌊',
    desc: 'Pet shop en Reñaca con todo para perros y gatos. Especialistas en nutrición con dietas específicas por raza y edad. Servicio de entrega a domicilio.',
    categorias: ['Nutrición', 'Dietas especiales', 'Accesorios', 'Delivery'],
    address: 'Av. Borgoño 13500, Reñaca, Viña del Mar',
    horario: 'Lun–Dom 10–20h',
    rating: 4.5,
  },
  {
    id: 'maskota-valpo',
    nombre: 'Maskota Valparaíso',
    tipo: 'fisica',
    city: 'valpo',
    icon: '🐈',
    desc: 'Cadena de tiendas con sucursal en Valparaíso. Alimentos, accesorios, medicamentos y grooming. Precios accesibles con tarjeta de fidelización.',
    categorias: ['Alimentos', 'Grooming', 'Medicamentos', 'Fidelización'],
    address: 'Av. Argentina 110, Valparaíso',
    horario: 'Lun–Sáb 9:30–20h · Dom 11–18h',
    rating: 4.2,
  },
  {
    id: 'animalscenter',
    nombre: 'Animals Center',
    tipo: 'fisica',
    city: 'valpo',
    icon: '🏬',
    desc: 'Centro especializado en mascotas ubicado en el centro de Valparaíso. Venta de animales, accesorios completos y productos naturales para mascotas.',
    categorias: ['Productos naturales', 'Accesorios', 'Alimentos', 'Animales'],
    address: 'Condell 1456, Valparaíso',
    horario: 'Lun–Vie 9–19h · Sáb 10–14h',
    rating: 4.1,
  },
  {
    id: 'petshop-concon',
    nombre: 'PetShop Concón',
    tipo: 'fisica',
    city: 'concon',
    icon: '🐕',
    desc: 'Pet shop familiar en Concón con todo lo necesario para el cuidado de mascotas. Atención personalizada y productos de alta calidad a precio justo.',
    categorias: ['Alimentos', 'Accesorios', 'Higiene', 'Snacks'],
    address: 'Av. Concón Reñaca 3200, Concón',
    horario: 'Lun–Vie 10–19h · Sáb 10–14h',
    rating: 4.4,
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

  const filtered = tiendas.filter(t => {
    const matchFilter =
      tiendaFilter === 'todos' ||
      tiendaFilter === t.tipo ||
      tiendaFilter === t.city;

    const matchSearch = !q ||
      t.nombre.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.categorias.some(c => c.toLowerCase().includes(q));

    return matchFilter && matchSearch;
  });

  if (!filtered.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
      <div style="font-size:36px;margin-bottom:8px;">🛒</div>
      <div style="font-size:14px;">No se encontraron tiendas</div>
    </div>`;
    return;
  }

  list.innerHTML = filtered.map(t => {
    const isOnline = t.tipo === 'online';
    const tipoBadgeBg  = isOnline ? '#E6F9F3' : '#F0EAFB';
    const tipoBadgeColor = isOnline ? '#3DAF87' : '#7C4DCC';
    const tipoBadgeText  = isOnline ? '🌐 Online' : '📍 Física';

    const stars = '★'.repeat(Math.round(t.rating)) + '☆'.repeat(5 - Math.round(t.rating));

    return `
      <div class="place-card" onclick="openTienda('${t.id}')" style="cursor:pointer;">
        <div class="place-card-inner">
          <div class="place-icon" style="background:var(--purple-light);">${t.icon}</div>
          <div class="place-info">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
              <div class="place-name">${t.nombre}</div>
              <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:${tipoBadgeBg};color:${tipoBadgeColor};flex-shrink:0;">${tipoBadgeText}</span>
            </div>
            <div style="font-size:11px;color:var(--text-hint);margin-bottom:4px;">${stars} ${t.rating}</div>
            <div class="place-desc">${t.desc}</div>
            <div class="place-tags" style="margin-top:6px;">
              ${t.categorias.slice(0,3).map(c => `<span class="place-tag">${c}</span>`).join('')}
            </div>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;">
              ${t.address ? `<div style="font-size:11px;color:var(--text-muted);">📍 ${t.address}</div>` : ''}
              <div style="font-size:11px;color:var(--text-muted);">🕐 ${t.horario}</div>
              ${t.web ? `<div style="font-size:11px;color:var(--purple);">🌐 ${t.web}</div>` : ''}
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

  // TODO: abrir página de detalle con productos, chat IA de la tienda, etc.
  // Por ahora si tiene web, abrimos el sitio
  if (t.web) {
    window.open('https://' + t.web, '_blank');
  } else {
    alert(`${t.icon} ${t.nombre}\n\n${t.desc}\n\n📍 ${t.address || 'Online'}\n🕐 ${t.horario}`);
  }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderTiendas();
});
