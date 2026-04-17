/* ══════════════════════════════════════
   GROOMING / PELUQUERÍAS CANINAS — WUFLY
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const grooming = [
  {
    id: 'bichoclean',
    name: 'Bicho Clean',
    type: 'PELUQUERÍA · BAÑO · CORTE',
    icon: '✂️',
    city: 'viña',
    destacado: true,
    rating: 4.9,
    reviews: 214,
    desc: 'Peluquería canina especializada con años de experiencia. Servicio de baño, corte de raza, secado, aromaterapia y arreglo de uñas. Trato amoroso y profesional.',
    tags: ['Corte de raza', 'Aromaterapia', 'Uñas', 'Baño profundo'],
    address: 'Av. Libertad 1023, Viña del Mar',
    wsp: '+56912345678',
    horario: 'Lun–Sáb 9–18h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'pawspa',
    name: 'Paw Spa',
    type: 'SPA · GROOMING · CORTE DE RAZA',
    icon: '🛁',
    city: 'viña',
    destacado: false,
    rating: 4.7,
    reviews: 178,
    desc: 'Spa especializado para perros y gatos. Baño con productos hipoalergénicos, masajes relajantes, arreglo de orejas y tratamientos de pelaje para todas las razas.',
    tags: ['Hipoalergénico', 'Masajes', 'Orejas', 'Pelaje'],
    address: '5 Poniente 832, Viña del Mar',
    wsp: '+56987654321',
    horario: 'Lun–Vie 9–19h · Sáb 10–16h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'cortepeludo',
    name: 'Corte Peludo',
    type: 'PELUQUERÍA · BAÑO · DOMICILIO',
    icon: '🐩',
    city: 'viña',
    destacado: false,
    rating: 4.6,
    reviews: 143,
    desc: 'Peluquería canina con servicio a domicilio disponible. Cortes de raza, baños, deslanado, arreglo de patas y cola. Ideal para mascotas que se estresan fuera de casa.',
    tags: ['Domicilio', 'Deslanado', 'Corte de raza', 'Antiestrés'],
    address: 'Av. Alvarez 560, Viña del Mar',
    wsp: '+56911223344',
    horario: 'Lun–Sáb 9–19h',
    especies: ['perro'],
  },
  {
    id: 'glamourpets',
    name: 'Glamour Pets',
    type: 'GROOMING PREMIUM · SPA · COLORES',
    icon: '💅',
    city: 'viña',
    destacado: false,
    rating: 4.8,
    reviews: 267,
    desc: 'Grooming premium para mascotas. Especialistas en tintes y coloración pet-safe, cortes creativos, baños terapéuticos y tratamientos de hidratación intensiva.',
    tags: ['Tintes pet-safe', 'Cortes creativos', 'Hidratación', 'Premium'],
    address: '8 Norte 1502, Viña del Mar',
    wsp: '+56922334455',
    horario: 'Lun–Sáb 9–19h · Dom 11–16h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'valpospa',
    name: 'Valpo Pet Grooming',
    type: 'PELUQUERÍA · BAÑO · CORTE',
    icon: '✂️',
    city: 'valpo',
    destacado: false,
    rating: 4.5,
    reviews: 98,
    desc: 'Peluquería canina en el corazón de Valparaíso. Baños, cortes de todas las razas, tratamientos antiparasitarios tópicos y aromaterapia. Precios accesibles.',
    tags: ['Todas las razas', 'Antiparasitario', 'Aromaterapia', 'Económico'],
    address: 'Condell 1240, Valparaíso',
    wsp: '+56933445566',
    horario: 'Lun–Vie 9–18h · Sáb 10–14h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'cerrogroom',
    name: 'Cerro Grooming',
    type: 'PELUQUERÍA · CORTE · BAÑO PROFUNDO',
    icon: '🐾',
    city: 'valpo',
    destacado: false,
    rating: 4.4,
    reviews: 76,
    desc: 'Peluquería para mascotas en los cerros de Valparaíso. Servicio personalizado, sin estrés, con citas programadas para que tu mascota se sienta tranquila.',
    tags: ['Sin estrés', 'Cita previa', 'Personalizado', 'Baño profundo'],
    address: 'Av. Alemania 840, Valparaíso',
    wsp: '+56944556677',
    horario: 'Mar–Sáb 10–18h',
    especies: ['perro', 'gato'],
  },
  {
    id: 'concongroom',
    name: 'Glamour Pet Concón',
    type: 'GROOMING · SPA · CORTE DE RAZA',
    icon: '🛁',
    city: 'concon',
    destacado: false,
    rating: 4.7,
    reviews: 112,
    desc: 'Peluquería y spa canino en Concón. Cortes de raza, baños aromáticos, hidratación profunda y arreglo completo de uñas, orejas y glándulas anales.',
    tags: ['Spa', 'Corte de raza', 'Uñas', 'Hidratación'],
    address: 'Av. Concón Reñaca 3200, Concón',
    wsp: '+56955667788',
    horario: 'Lun–Sáb 9–18h',
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

  const filtered = grooming.filter(g => {
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

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><div style="font-size:36px">✂️</div><p>No hay resultados para ese filtro.</p></div>`;
    return;
  }

  list.innerHTML = filtered.map(g => {
    const stars = '★'.repeat(Math.round(g.rating)) + '☆'.repeat(5 - Math.round(g.rating));
    const wspNum = g.wsp.replace(/\D/g, '');
    return `
    <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:44px;height:44px;min-width:44px;background:var(--mint-light);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">${g.icon}</div>
        <div style="flex:1;min-width:0;">
          ${g.destacado ? `<div style="font-size:10px;font-weight:700;color:var(--mint-dark);letter-spacing:0.05em;margin-bottom:3px;">⭐ DESTACADO</div>` : ''}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:2px;">${g.name}</div>
          <div style="font-size:10px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:5px;">${g.type}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:3px;">
            <span style="color:var(--mint);">${stars}</span>
            <span style="margin-left:3px;font-weight:600;">${g.rating}</span>
            <span style="color:var(--text-hint);">(${g.reviews})</span>
          </div>
          <div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">${g.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            ${g.tags.slice(0, 3).map(t => `<span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${t}</span>`).join('')}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding-top:10px;">
            <span style="font-size:12px;color:var(--text-muted);">📍 ${g.address}</span>
          </div>
          <div style="font-size:11px;color:var(--text-hint);margin:4px 0 10px;">🕐 ${g.horario}</div>
          <a href="https://wa.me/${wspNum}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </div>`;
  }).join('');
}

function setFilterGrooming(el, val) {
  groomingFilter = val;
  document.querySelectorAll('#page-servicios .sub-filter-grooming .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderGrooming();
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderGrooming);
