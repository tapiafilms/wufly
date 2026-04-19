/* ══════════════════════════════════════
   CLÍNICAS VETERINARIAS — WUFLY
   Verificadas en fuentes públicas (2025)
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const clinicas = [
  {
    id: 'meneses',
    name: 'Clínica Veterinaria Drs. Meneses',
    type: 'CLÍNICA · CIRUGÍA · MEDICINA GENERAL',
    icon: '⚕️',
    city: 'viña',
    urgencia: false,
    rating: 4.5,
    reviews: 189,
    desc: 'Clínica de trayectoria en Viña del Mar. Consultas, cirugías especializadas, vacunaciones y cuidados preventivos. Personal reconocido por su trato cálido.',
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
    desc: 'Centro especializado en cirugías veterinarias complejas. Consultas generales, vacunaciones y cuidados preventivos. Equipo altamente calificado.',
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
    desc: 'Centro veterinario integral con laboratorio clínico, radiografías, fisioterapia y rehabilitación.',
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
    desc: 'Clínica completa con emergencias, medicina preventiva, cirugías y radiografías. Atención a domicilio disponible.',
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
    desc: 'Clínica veterinaria en el corazón de Valparaíso. Consultas, vacunaciones, cirugías y control de peso.',
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
    desc: 'Centro veterinario con urgencias, farmacia y laboratorio en Valparaíso. Especialistas en medicina interna.',
    tags: ['Urgencias', 'Farmacia', 'Laboratorio', 'Medicina interna'],
    address: 'Almirante Barroso 557, local 1, Valparaíso',
    tel: '',
    web: '',
    horario: 'Lun–Dom 9–22h'
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
    desc: 'Clínica veterinaria en Concón con pet shop integrado. Vacunas, desparasitación y alimentos premium.',
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
    desc: 'Clínica veterinaria en Concón con atención a domicilio, cirugías y medicina preventiva.',
    tags: ['Atención domicilio', 'Cirugía', 'Vacunación', 'Microchip'],
    address: 'Av. Manantiales 955, Concón',
    tel: '',
    web: '',
    horario: 'Lun–Vie 9–19h · Sáb 10–14h'
  },
];

/* ══ RENDER PRINCIPAL ══ */
function renderClinicas() {
  const list = document.getElementById('clinicaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.clinicas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';

  /* ── Cards destacadas ── */
  const destacadasHtml = (CLINICAS_DESTACADAS || []).map(c => `
    <div onclick="openClinicaDetalle('${c.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;background:${c.grad};">
      ${c.urgencia ? `
        <div style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.22);
          border-radius:100px;padding:4px 11px;font-size:10px;font-weight:700;color:white;
          letter-spacing:0.04em;backdrop-filter:blur(4px);">🚨 Urgencias 24h</div>` : ''}
      <div style="padding:22px 20px 20px;">
        <div style="font-size:34px;margin-bottom:10px;line-height:1;">${c.icon}</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:21px;
          color:white;margin-bottom:4px;line-height:1.2;">${c.nombre}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.78);font-weight:600;
          letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${c.subtitulo}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1.55;
          margin-bottom:16px;">${c.descripcion}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
          ${c.tags.slice(0,3).map(t =>
            `<span style="background:rgba(255,255,255,0.18);color:white;font-size:11px;
              font-weight:600;padding:4px 10px;border-radius:100px;">${t}</span>`
          ).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:11px;color:rgba(255,255,255,0.7);">📍 ${c.ciudad}</div>
          <div style="font-size:12px;font-weight:700;color:white;
            background:rgba(255,255,255,0.22);padding:6px 14px;border-radius:100px;">
            Ver clínica →
          </div>
        </div>
      </div>
    </div>
  `).join('');

  /* ── Botón geo ── */
  let geoBtnHtml;
  if (geoLoading) {
    geoBtnHtml = `
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;
        padding:18px;background:var(--purple-light);border-radius:14px;
        font-size:13px;font-weight:700;color:var(--purple);">
        <span style="animation:spin 1s linear infinite;display:inline-block;">⏳</span>
        Buscando clínicas cerca de ti…
      </div>`;
  } else if (geoDisponible) {
    geoBtnHtml = `
      <button onclick="activarBusquedaGeo()"
        style="width:100%;padding:14px;background:var(--purple-light);
          border:2px dashed var(--purple);border-radius:14px;font-size:13px;
          font-weight:700;color:var(--purple);cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;">
        🔄 Actualizar clínicas cercanas
      </button>`;
  } else {
    geoBtnHtml = `
      <button onclick="activarBusquedaGeo()"
        style="width:100%;padding:16px;
          background:linear-gradient(135deg,#5C2FA8,#7C4DCC);border:none;
          border-radius:14px;font-size:14px;font-weight:700;color:white;cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;
          box-shadow:0 4px 18px rgba(92,47,168,0.35);">
        📍 Ver clínicas cerca de ti
      </button>`;
  }

  /* ── Resultados geo ── */
  let geoHtml = '';
  if (geoDisponible) {
    const cards = geoResults.clinicas.map(_renderClinicaGeo).join('');
    geoHtml = `
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;padding:20px 0 10px;">
        📍 ${geoResults.clinicas.length} CLÍNICAS ENCONTRADAS CERCA DE TI
      </div>
      ${cards}`;
  }

  list.innerHTML =
    `<div style="font-size:11px;font-weight:700;color:var(--purple);
      letter-spacing:0.07em;padding:0 2px 10px;">⭐ DESTACADAS</div>` +
    destacadasHtml +
    `<div style="margin:4px 0 16px;">${geoBtnHtml}</div>` +
    geoHtml;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderClinicaGeo(c) {
  const distBadge = c.distKm != null
    ? `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
        font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:5px;
        display:inline-block;">📍 ${fmtDist(c.distKm)}</span><br>`
    : '';
  const mapLink = c.lat && c.lng
    ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}"
         target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;
           font-size:12px;color:var(--purple);font-weight:700;text-decoration:none;"
         onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
    : '';

  return `
    <div class="place-card">
      <div class="place-card-inner">
        <div class="place-icon" style="background:var(--bg);">${c.icon || '🐾'}</div>
        <div class="place-info">
          <span style="display:inline-flex;align-items:center;gap:3px;background:var(--bg);
            color:var(--text-hint);font-size:10px;font-weight:700;padding:3px 9px;
            border-radius:100px;border:1px solid var(--border);margin-bottom:6px;">
            📍 Básico</span><br>
          ${distBadge}
          <div class="place-name">${c.name}</div>
          <div class="place-type">${c.type || ''}</div>
          <div class="place-desc">${c.desc || ''}</div>
          <div class="place-footer">
            <span class="place-address">📍 ${c.address || '—'}</span>
            ${c.tel ? `<a href="tel:${c.tel}" class="place-tel" onclick="event.stopPropagation()">${c.tel}</a>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
}

/* ── Disparar búsqueda geo ── */
function activarBusquedaGeo() {
  // Mostrar estado de carga inmediatamente
  const list = document.getElementById('clinicaList');
  const btn = list?.querySelector('button');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Buscando…'; }

  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda().then(() => renderClinicas());
  }
}

/* ══ VISTA DE DETALLE — clínicas destacadas ══ */
function openClinicaDetalle(id) {
  const c = (CLINICAS_DESTACADAS || []).find(x => x.id === id);
  if (!c) return;

  const stars = c.rating
    ? `${'★'.repeat(Math.round(c.rating))}${'☆'.repeat(5 - Math.round(c.rating))}`
    : '';

  /* ── Galería de fotos ── */
  const fotosHtml = c.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;
      box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${c.fotos.map(url =>
          `<img src="${url}" alt="foto clínica"
            style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  /* ── Equipo veterinario ── */
  const vetsHtml = c.veterinarios?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;
      box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;margin-bottom:12px;">EQUIPO VETERINARIO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${c.veterinarios.map(v => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${v.foto
              ? `<img src="${v.foto}" alt="${v.nombre}"
                  style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);
                  display:flex;align-items:center;justify-content:center;font-size:18px;
                  flex-shrink:0;">🩺</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${v.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${v.especialidad}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  /* ── Botones CTA ── */
  const ctaHtml = [
    c.whatsapp
      ? `<a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">
           💬 WhatsApp
         </a>` : '',
    c.lat && c.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">
           🗺 Cómo llegar
         </a>` : '',
    c.web
      ? `<a href="https://${c.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">
           🌐 Sitio web
         </a>` : '',
    c.telefono
      ? `<a href="tel:${c.telefono}"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">
           📞 Llamar
         </a>` : '',
  ].filter(Boolean).join('');

  const detailEl = document.getElementById('page-detail');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div>
      <!-- Header con gradiente -->
      <div style="background:${c.grad};padding:0 0 24px;position:relative;">
        <!-- Back button -->
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('restaurantes')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">
            ← Volver a Vets
          </button>
        </div>
        <!-- Info principal -->
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${c.icon}</div>
          ${c.urgencia ? `<div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">
            🚨 Urgencias 24h
          </div><br>` : ''}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${c.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${c.subtitulo}</div>
          ${c.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars} <span style="font-size:13px;">${c.rating} (${c.reviews} reseñas)</span>
          </div>` : ''}
        </div>
      </div>

      <!-- Contenido -->
      <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:14px;
        background:var(--bg);">

        <!-- CTA buttons -->
        ${ctaHtml ? `<div style="display:flex;gap:8px;flex-wrap:wrap;">${ctaHtml}</div>` : ''}

        <!-- Descripción -->
        <div style="background:white;border-radius:16px;padding:16px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);
            letter-spacing:0.07em;margin-bottom:8px;">SOBRE NOSOTROS</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${c.descripcion}</div>
        </div>

        <!-- Información -->
        <div style="background:white;border-radius:16px;padding:16px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);
            letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${c.direccion ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📍</span>
              <span style="font-size:13px;color:var(--text);line-height:1.4;">${c.direccion}</span>
            </div>` : ''}
            ${c.horario ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">⏰</span>
              <span style="font-size:13px;color:var(--text);">${c.horario}</span>
            </div>` : ''}
            ${c.telefono ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📞</span>
              <a href="tel:${c.telefono}"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">
                ${c.telefono}</a>
            </div>` : ''}
            ${c.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${c.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">
                ${c.web}</a>
            </div>` : ''}
          </div>
        </div>

        ${fotosHtml}
        ${vetsHtml}

        <!-- Servicios -->
        <div style="background:white;border-radius:16px;padding:16px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);
            letter-spacing:0.07em;margin-bottom:10px;">SERVICIOS</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;">
            ${c.tags.map(t =>
              `<span style="font-size:12px;font-weight:600;padding:6px 13px;border-radius:100px;
                background:var(--purple-light);color:var(--purple);">${t}</span>`
            ).join('')}
          </div>
        </div>

      </div>
    </div>`;

  switchTab('detail');
}

/* ── openClinica para resultados geo (link Maps / WhatsApp) ── */
function openClinica(id) {
  const c = clinicas.find(x => x.id === id)
    || (CLINICAS_DESTACADAS || []).find(x => x.id === id)
    || (typeof geoResults !== 'undefined' && geoResults.clinicas?.find(x => x.id === id));
  if (!c) return;
  if (typeof registrarClick === 'function' && !c.fromOSM) registrarClick(c.id, c.name || c.nombre, 'clinicas');
  if (c.lat && c.lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`, '_blank');
  } else if (c.tel) {
    window.open(`https://wa.me/${c.tel.replace(/\D/g, '')}`, '_blank');
  }
}
