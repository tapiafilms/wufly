/* ══════════════════════════════════════
   CLÍNICAS VETERINARIAS — WUFLY
   Verificadas en fuentes públicas (2025)
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const clinicas = [
  {
    id: 'mevetlab',
    name: 'MEVETLAB Clínica Veterinaria y Laboratorio',
    type: 'CLÍNICA · LABORATORIO · URGENCIAS 24H',
    icon: '🏥',
    city: 'viña',
    urgencia: true,
    rating: 4.8,
    reviews: 312,
    desc: 'Clínica integral especializada en pequeños animales con laboratorio propio. Quirófano equipado, hospitalización 24h y atención Fear Free. Una de las más completas de Viña del Mar.',
    tags: ['Urgencias 24h', 'Laboratorio propio', 'Hospitalización', 'Cirugía'],
    address: 'Álvarez 2172, Chorrillos, Viña del Mar',
    tel: '',
    web: 'mevetlab.cl',
    horario: 'Abierto 24 horas, todos los días'
  },
  {
    id: 'artemisa',
    name: 'Clínica Artemisa',
    type: 'CLÍNICA · URGENCIAS 24H · PELUQUERÍA CANINA',
    icon: '🐾',
    city: 'viña',
    urgencia: true,
    rating: 4.0,
    reviews: 364,
    desc: 'Clínica veterinaria 24 horas comprometida con la salud animal. Atiende mascotas convencionales y animales exóticos. Servicio de urgencias permanente y peluquería canina.',
    tags: ['Urgencias 24h', 'Animales exóticos', 'Peluquería canina', 'Farmacia'],
    address: '2 Oriente 526, Viña del Mar',
    tel: '+56 9 9109 2675',
    web: '',
    horario: 'Abierto 24 horas, todos los días'
  },
  {
    id: 'meneses',
    name: 'Clínica Veterinaria Drs. Meneses',
    type: 'CLÍNICA · CIRUGÍA · MEDICINA GENERAL',
    icon: '⚕️',
    city: 'viña',
    urgencia: false,
    rating: 4.5,
    reviews: 189,
    desc: 'Clínica de trayectoria en Viña del Mar. Consultas, cirugías especializadas, vacunaciones y cuidados preventivos. Personal reconocido por su trato cálido y profesionalismo.',
    tags: ['Cirugía', 'Vacunación', 'Medicina preventiva', 'Consultas'],
    address: '2 Norte 1102, Viña del Mar',
    tel: '+56 32 268 62...',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–14h'
  },
  {
    id: 'quirurgico',
    name: 'Centro Quirúrgico Veterinario',
    type: 'CIRUGÍA · CONSULTAS · MEDICINA PREVENTIVA',
    icon: '🔬',
    city: 'viña',
    urgencia: false,
    rating: 4.6,
    reviews: 229,
    desc: 'Centro especializado en cirugías veterinarias complejas. Además ofrece consultas generales, vacunaciones y cuidados preventivos. Equipo altamente calificado.',
    tags: ['Cirugía especializada', 'Vacunación', 'Radiografías', 'Ecografías'],
    address: '3 Norte 1230, Viña del Mar',
    tel: '+56 9 3082 9186',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–14h'
  },
  {
    id: 'vetclin',
    name: 'Vetclin Centro Veterinario',
    type: 'CLÍNICA · LABORATORIO · FISIOTERAPIA',
    icon: '🏨',
    city: 'viña',
    urgencia: false,
    rating: 4.4,
    reviews: 156,
    desc: 'Centro veterinario integral con laboratorio clínico, radiografías, fisioterapia y rehabilitación. Especialistas en vacunas, desparasitación y ecografías.',
    tags: ['Laboratorio', 'Fisioterapia', 'Ecografías', 'Vacunación'],
    address: 'Calle Pastor Willis Hoover 512, Viña del Mar',
    tel: '+56 32 221 142...',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–14h'
  },
  {
    id: 'benidorm',
    name: 'Clínica Veterinaria Benidorm',
    type: 'CLÍNICA · EMERGENCIAS · MEDICINA GENERAL',
    icon: '🐕',
    city: 'viña',
    urgencia: true,
    rating: 4.3,
    reviews: 142,
    desc: 'Clínica completa en Viña del Mar con servicio de emergencias, medicina preventiva, cirugías y radiografías. Atención a domicilio disponible.',
    tags: ['Emergencias', 'Cirugía', 'Radiografías', 'Domicilio'],
    address: 'Av. Benidorm 1314, Viña del Mar',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–21h · Sáb–Dom 10–14h'
  },
  {
    id: 'valparaiso1',
    name: 'Clínica Veterinaria Valparaíso Centro',
    type: 'CLÍNICA · MEDICINA GENERAL · CIRUGÍA',
    icon: '🏥',
    city: 'valpo',
    urgencia: false,
    rating: 4.4,
    reviews: 203,
    desc: 'Clínica veterinaria en el corazón de Valparaíso. Consultas, vacunaciones, cirugías y control de peso. Personal capacitado y equipamiento moderno.',
    tags: ['Cirugía', 'Vacunación', 'Control de peso', 'Consultas'],
    address: 'Doce de Febrero 73, Valparaíso',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–19h · Sáb 10–14h'
  },
  {
    id: 'valparaiso2',
    name: 'Centro Veterinario Almirante Barroso',
    type: 'CLÍNICA · URGENCIAS · FARMACIA',
    icon: '⚕️',
    city: 'valpo',
    urgencia: true,
    rating: 4.2,
    reviews: 118,
    desc: 'Centro veterinario con urgencias, farmacia y laboratorio en Valparaíso. Atención de pequeños animales con especialistas en medicina interna.',
    tags: ['Urgencias', 'Farmacia', 'Laboratorio', 'Medicina interna'],
    address: 'Almirante Barroso 557, local 1, Valparaíso',
    tel: '',
    web: '',
    horario: 'Lun–Dom 9–22h'
  },
  {
    id: 'recreo',
    name: 'Centro Veterinario Recreo',
    type: 'CLÍNICA · EMERGENCIAS · CIRUGÍA',
    icon: '🐾',
    city: 'valpo',
    urgencia: true,
    rating: 4.5,
    reviews: 276,
    desc: 'Centro veterinario con especialización en emergencias. Cirugías, vacunaciones y medicina preventiva. Reconocido por su dedicación y trato cercano con los pacientes.',
    tags: ['Emergencias', 'Cirugía', 'Vacunación', 'Medicina preventiva'],
    address: 'Olga 117, Recreo, Valparaíso',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb–Dom 10–18h'
  },
  {
    id: 'concon1',
    name: 'Veterinaria Concón Reñaca',
    type: 'CLÍNICA · MEDICINA GENERAL · PET SHOP',
    icon: '🐕',
    city: 'concon',
    urgencia: false,
    rating: 4.5,
    reviews: 134,
    desc: 'Clínica veterinaria en Concón con pet shop integrado. Consultas, vacunas, desparasitación y venta de alimentos premium para mascotas.',
    tags: ['Vacunación', 'Pet Shop', 'Alimentos premium', 'Desparasitación'],
    address: 'Av. Concón Reñaca 4000, Local 8B, Concón',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–15h'
  },
  {
    id: 'concon2',
    name: 'Clínica Veterinaria Manantiales',
    type: 'CLÍNICA · CIRUGÍA · DOMICILIO',
    icon: '🏥',
    city: 'concon',
    urgencia: false,
    rating: 4.6,
    reviews: 98,
    desc: 'Clínica veterinaria en Concón con atención a domicilio, cirugías y medicina preventiva. Equipo joven y comprometido con el bienestar animal.',
    tags: ['Atención domicilio', 'Cirugía', 'Vacunación', 'Microchip'],
    address: 'Av. Manantiales 955, Concón',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–19h · Sáb 10–14h'
  },
];

/* ══ FILTROS ACTIVOS ══ */
let clinicaFilter = 'todos';
let searchQuery = '';

function setFilter(el, type, val) {
  if (type === 'clinica') {
    clinicaFilter = val;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    renderClinicas();
  }
}

/* ══ RENDER CLÍNICAS ══ */
function renderClinicas() {
  const list = document.getElementById('clinicaList');
  if (!list) return;

  const q = (document.getElementById('searchClinica')?.value || '').toLowerCase();

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.clinicas.length > 0;

  let fuente, geoFuente = [], staticFuente = [];

  if (clinicaFilter === 'geo') {
    // Solo resultados geo
    fuente = geoResults.clinicas
      .filter(c => !q || c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q));
  } else {
    // Estáticos filtrados
    staticFuente = clinicas.filter(c => {
      const matchFilter =
        clinicaFilter === 'todos' ||
        (clinicaFilter === 'urgencia' && c.urgencia) ||
        (clinicaFilter === 'viña'    && c.city === 'viña')  ||
        (clinicaFilter === 'valpo'   && c.city === 'valpo') ||
        (clinicaFilter === 'concon'  && c.city === 'concon');
      const matchSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
    // Si es "Todas" y hay resultados geo, preponerlos
    if (clinicaFilter === 'todos' && geoDisponible) {
      geoFuente = geoResults.clinicas
        .filter(c => !q || c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q));
    }
    fuente = [...geoFuente, ...staticFuente];
  }

  if (fuente.length === 0) {
    list.innerHTML = clinicaFilter === 'geo'
      ? `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
           <div style="font-size:36px;margin-bottom:10px;">🗺</div>
           <div style="font-weight:700;margin-bottom:6px;">Sin resultados en OpenStreetMap</div>
           <div style="font-size:13px;">Prueba los filtros por ciudad para ver clínicas verificadas.</div>
         </div>`
      : '<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">No se encontraron clínicas con ese filtro.</div>';
    return;
  }

  const separadorIdx = geoFuente.length; // índice donde terminan geo y empiezan estáticos

  list.innerHTML = fuente.map((c, i) => {
    // Separador visual entre resultados geo y estáticos
    const separador = (clinicaFilter === 'todos' && geoFuente.length > 0 && i === separadorIdx)
      ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:12px 4px 6px;">VERIFICADAS POR WUFLY</div>`
      : '';
    const distBadge = c.distKm != null
      ? `<span style="display:inline-block;background:var(--purple-light);color:var(--purple);font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:5px;">📍 ${fmtDist(c.distKm)}</span><br>`
      : '';
    const ratingHtml = c.rating
      ? `<div class="place-rating">${'★'.repeat(Math.round(c.rating))}${'☆'.repeat(5-Math.round(c.rating))} <span>${c.rating} (${c.reviews})</span></div>`
      : '';
    const mapLink = c.lat && c.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:12px;color:var(--purple);font-weight:700;text-decoration:none;"
           onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
      : '';

    const cardClass       = c.fromOSM ? 'place-card' : 'place-card-verificado';
    const verificadoBadge = c.fromOSM ? '' : `<span class="badge-wufly">✓ Verificado Wufly</span><br>`;

    return separador + `
    <div class="${cardClass}" onclick="openClinica('${c.id}')">
      <div class="place-card-inner">
        <div class="place-icon" style="background:${c.fromOSM ? 'var(--bg)' : 'var(--purple-light)'};">${c.icon}</div>
        <div class="place-info">
          ${verificadoBadge}
          ${distBadge}
          <div class="place-name">${c.name}</div>
          <div class="place-type">${c.type}</div>
          ${ratingHtml}
          <div class="place-desc">${c.desc}</div>
          <div class="place-tags">
            ${c.urgencia ? '<span class="place-tag urgencia">🚨 Urgencias</span>' : ''}
            ${c.tags.slice(0, 3).map(t => `<span class="place-tag">${t}</span>`).join('')}
          </div>
          <div class="place-footer">
            <span class="place-address">📍 ${c.address || '—'}</span>
            ${c.tel ? `<a href="tel:${c.tel}" class="place-tel" onclick="event.stopPropagation()">${c.tel}</a>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
  }).join('');
}

function openClinica(id) {
  // Buscar en estáticos y en geo results
  const c = clinicas.find(x => x.id === id)
         || (typeof geoResults !== 'undefined' && geoResults.clinicas.find(x => x.id === id));
  if (!c) return;
  if (c.lat && c.lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`, '_blank');
  } else if (c.tel) {
    window.open(`https://wa.me/${c.tel.replace(/\D/g, '')}`, '_blank');
  }
}
