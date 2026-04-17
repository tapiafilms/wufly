/* ══════════════════════════════════════
   PASEADORES DE PERROS — WUFLY
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const paseadores = [
  {
    id: 'cami',
    nombre: 'Camila Rodríguez',
    titulo: 'PASEADORA CERTIFICADA · CUIDADORA',
    avatar: '👩',
    city: 'viña',
    rating: 5.0,
    reviews: 89,
    desc: 'Amante de los animales con 4 años de experiencia. Grupos reducidos de máximo 3 perros. Servicio de paseo, guardería en casa y cuidado nocturno. Actualizaciones con fotos en cada paseo.',
    servicios: ['Paseo grupal', 'Guardería en casa', 'Cuidado nocturno', 'Fotos del paseo'],
    precio: '$6.000 / paseo',
    zonas: 'Viña Centro, Agua Santa, Chorrillos',
    wsp: '+56912345678',
    disponibilidad: 'Lun–Vie 8–18h · Sáb 9–14h',
    razas: 'Todas las razas',
    certificada: true,
  },
  {
    id: 'pedro',
    nombre: 'Pedro Soto',
    titulo: 'PASEADOR · ENTRENADOR BÁSICO',
    avatar: '👨',
    city: 'viña',
    rating: 4.8,
    reviews: 124,
    desc: 'Paseador y entrenador de perros. Incluye refuerzo de obediencia básica durante los paseos. Ideal para perros con exceso de energía o en proceso de socialización.',
    servicios: ['Paseo individual', 'Entrenamiento básico', 'Socialización', 'Paseo grupal'],
    precio: '$7.000 / paseo',
    zonas: 'Viña del Mar completo',
    wsp: '+56987654321',
    disponibilidad: 'Lun–Sáb 7–19h',
    razas: 'Todas las razas',
    certificada: false,
  },
  {
    id: 'sofia',
    nombre: 'Sofía Muñoz',
    titulo: 'PASEADORA · CUIDADORA · HOSPEDAJE',
    avatar: '👩',
    city: 'viña',
    rating: 4.9,
    reviews: 201,
    desc: 'Cuidadora con veterinaria en contacto permanente. Servicio premium con seguimiento GPS, fotos y videos. Especialista en perros de razas grandes y razas especiales.',
    servicios: ['GPS en tiempo real', 'Fotos y videos', 'Hospedaje', 'Razas grandes'],
    precio: '$8.000 / paseo',
    zonas: 'Viña Norte, Reñaca, Concón',
    wsp: '+56911223344',
    disponibilidad: 'Todos los días 7–20h',
    razas: 'Especialidad en razas grandes',
    certificada: true,
  },
  {
    id: 'matias',
    nombre: 'Matías Fuentes',
    titulo: 'PASEADOR · GRUPOS REDUCIDOS',
    avatar: '👨',
    city: 'valpo',
    rating: 4.7,
    reviews: 67,
    desc: 'Paseador en los cerros y plan de Valparaíso. Grupos de máximo 4 perros. Rutas pensadas para estimulación mental y física. Actualización por WhatsApp al dueño.',
    servicios: ['Grupos reducidos', 'Rutas estimulantes', 'Reportes WhatsApp', 'Fotos'],
    precio: '$5.500 / paseo',
    zonas: 'Plan y cerros de Valparaíso',
    wsp: '+56922334455',
    disponibilidad: 'Lun–Vie 8–17h',
    razas: 'Perros medianos y pequeños',
    certificada: false,
  },
  {
    id: 'valentina',
    nombre: 'Valentina Herrera',
    titulo: 'PASEADORA · CUIDADORA A DOMICILIO',
    avatar: '👩',
    city: 'valpo',
    rating: 4.8,
    reviews: 93,
    desc: 'Paseadora con servicio de visitas a domicilio. Va a tu casa a buscar y dejar a tu perro. Ideal si trabajas todo el día. También hace visitas de compañía para gatos.',
    servicios: ['Retiro en casa', 'Visitas a domicilio', 'Compañía a gatos', 'Paseo individual'],
    precio: '$6.500 / paseo',
    zonas: 'Valparaíso y alrededores',
    wsp: '+56933445566',
    disponibilidad: 'Lun–Sáb 8–18h',
    razas: 'Perros y gatos',
    certificada: true,
  },
  {
    id: 'roberto',
    nombre: 'Roberto Carrasco',
    titulo: 'PASEADOR · ENTRENADOR · CONCÓN',
    avatar: '👨',
    city: 'concon',
    rating: 4.9,
    reviews: 145,
    desc: 'Paseador profesional en Concón con acceso directo a playas y parques. Paseos en la naturaleza de 60–90 minutos. Incluye sesión de socialización con otros perros.',
    servicios: ['Paseos en playa', 'Socialización', 'Parques naturales', '60–90 min'],
    precio: '$7.500 / paseo',
    zonas: 'Concón, Reñaca, Viña Norte',
    wsp: '+56944556677',
    disponibilidad: 'Todos los días 7–18h',
    razas: 'Todas las razas',
    certificada: true,
  },
];

/* ══ ESTADO ══ */
let paseadoresFilter = 'todos';

/* ══ RENDER ══ */
function renderPaseadores() {
  const list = document.getElementById('paseadoresList');
  if (!list) return;

  const q = (document.getElementById('searchPaseadores')?.value || '').toLowerCase();

  const filtered = paseadores.filter(p => {
    const matchFilter =
      paseadoresFilter === 'todos' ||
      (paseadoresFilter === 'viña'   && p.city === 'viña')  ||
      (paseadoresFilter === 'valpo'  && p.city === 'valpo') ||
      (paseadoresFilter === 'concon' && p.city === 'concon');

    const matchSearch = !q ||
      p.nombre.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.servicios.some(s => s.toLowerCase().includes(q)) ||
      p.zonas.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><div style="font-size:36px">🐕</div><p>No hay paseadores en esa zona.</p></div>`;
    return;
  }

  list.innerHTML = filtered.map(p => {
    const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
    const wspNum = p.wsp.replace(/\D/g, '');
    return `
    <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:52px;height:52px;min-width:52px;background:linear-gradient(135deg,var(--purple-light),var(--mint-light));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;border:2px solid var(--border);">${p.avatar}</div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:1px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;color:var(--text);">${p.nombre}</div>
            ${p.certificada ? `<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">✓ Verificada</span>` : ''}
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:5px;">${p.titulo}</div>
          <div style="font-size:12px;margin-bottom:6px;">
            <span style="color:var(--mint);">${stars}</span>
            <span style="margin-left:3px;font-weight:600;color:var(--text-muted);">${p.rating} (${p.reviews} reseñas)</span>
          </div>
          <div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">${p.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;">
            ${p.servicios.slice(0,3).map(s => `<span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${s}</span>`).join('')}
          </div>
          <div style="display:flex;flex-direction:column;gap:3px;margin-bottom:10px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:8px;">
            <div>📍 <strong style="color:var(--text);">Zonas:</strong> ${p.zonas}</div>
            <div>🕐 <strong style="color:var(--text);">Disponibilidad:</strong> ${p.disponibilidad}</div>
            <div>💰 <strong style="color:var(--text);">Precio:</strong> ${p.precio}</div>
          </div>
          <a href="https://wa.me/${wspNum}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>`;
  }).join('');
}

function setFilterPaseadores(el, val) {
  paseadoresFilter = val;
  document.querySelectorAll('#page-servicios .sub-filter-paseadores .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderPaseadores();
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderPaseadores);
