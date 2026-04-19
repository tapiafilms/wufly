/* ══════════════════════════════════════
   TIENDAS — Wufly
   Pet shops y tiendas online verificadas
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

const tiendas = [
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

/* ══ RENDER PRINCIPAL ══ */
function renderTiendas() {
  const list = document.getElementById('tiendaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.tiendas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';

  /* ── Cards vitrina ── */
  const vitrinaHtml = (TIENDAS_DESTACADAS || []).map(t => `
    <div onclick="openTiendaDetalle('${t.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;background:${t.grad};">
      <div style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.22);
        border-radius:100px;padding:4px 11px;font-size:10px;font-weight:700;color:white;
        letter-spacing:0.04em;backdrop-filter:blur(4px);">⭐ Vitrina</div>
      <div style="padding:22px 20px 20px;">
        <div style="font-size:34px;margin-bottom:10px;line-height:1;">${t.icon}</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:21px;
          color:white;margin-bottom:4px;line-height:1.2;">${t.nombre}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.78);font-weight:600;
          letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${t.subtitulo}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1.55;
          margin-bottom:16px;">${t.descripcion}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
          ${t.tags.slice(0, 3).map(tag =>
            `<span style="background:rgba(255,255,255,0.18);color:white;font-size:11px;
              font-weight:600;padding:4px 10px;border-radius:100px;">${tag}</span>`
          ).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:11px;color:rgba(255,255,255,0.7);">📍 ${t.ciudad}</div>
          <div style="font-size:12px;font-weight:700;color:white;
            background:rgba(255,255,255,0.22);padding:6px 14px;border-radius:100px;">
            Ver tienda →
          </div>
        </div>
      </div>
    </div>
  `).join('');

  /* ── Botón geo ── */
  const geoStatus_  = typeof geoStatus !== 'undefined' ? geoStatus : 'idle';
  const geoCompletado = geoStatus_ === 'ok';

  let geoBtnHtml;
  if (geoLoading) {
    geoBtnHtml = `
      <div style="display:flex;align-items:center;gap:12px;padding:18px;
        background:var(--purple-light);border-radius:14px;">
        <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);
          border-top-color:var(--purple);border-radius:50%;
          animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando tiendas cerca de ti…</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
        </div>
      </div>`;
  } else if (geoDisponible) {
    geoBtnHtml = `
      <button onclick="activarBusquedaTiendas()"
        style="width:100%;padding:14px;background:var(--purple-light);
          border:2px dashed var(--purple);border-radius:14px;font-size:13px;
          font-weight:700;color:var(--purple);cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;">
        🔄 Actualizar tiendas cercanas
      </button>`;
  } else if (geoCompletado && !geoDisponible) {
    geoBtnHtml = `
      <div style="padding:16px;background:var(--bg);border:1.5px solid var(--border-md);
        border-radius:14px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🗺</div>
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px;">
          Sin tiendas en el mapa cercano
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">
          OpenStreetMap no registra pet shops en tu zona. Puedes buscar de todas formas.
        </div>
        <button onclick="activarBusquedaTiendas()"
          style="padding:10px 20px;background:var(--purple-light);border:1.5px solid var(--purple);
            border-radius:100px;font-size:12px;font-weight:700;color:var(--purple);cursor:pointer;
            font-family:'Plus Jakarta Sans',sans-serif;">
          🔄 Reintentar búsqueda
        </button>
      </div>`;
  } else {
    geoBtnHtml = `
      <button onclick="activarBusquedaTiendas()"
        style="width:100%;padding:16px;
          background:linear-gradient(135deg,#5C2FA8,#7C4DCC);border:none;
          border-radius:14px;font-size:14px;font-weight:700;color:white;cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;
          box-shadow:0 4px 18px rgba(92,47,168,0.35);">
        📍 Ver tiendas cerca de ti
      </button>`;
  }

  /* ── Resultados geo ── */
  let geoHtml = '';
  if (geoDisponible) {
    const cards = geoResults.tiendas.map(_renderTiendaGeo).join('');
    geoHtml = `
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;padding:20px 0 10px;">
        📍 ${geoResults.tiendas.length} TIENDAS ENCONTRADAS CERCA DE TI
      </div>
      ${cards}`;
  }

  list.innerHTML =
    `<div style="font-size:11px;font-weight:700;color:var(--purple);
      letter-spacing:0.07em;padding:0 2px 10px;">⭐ VITRINA</div>` +
    vitrinaHtml +
    `<div style="margin:4px 0 16px;">${geoBtnHtml}</div>` +
    geoHtml;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderTiendaGeo(t) {
  const distBadge = t.distKm != null
    ? `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
        font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:5px;
        display:inline-block;">📍 ${fmtDist(t.distKm)}</span><br>`
    : '';
  const mapLink = t.lat && t.lng
    ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}"
         target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;
           font-size:12px;color:var(--purple);font-weight:700;text-decoration:none;"
         onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
    : '';

  return `
    <div class="place-card">
      <div class="place-card-inner">
        <div class="place-icon" style="background:var(--bg);">${t.icon || '🛒'}</div>
        <div class="place-info">
          <span style="display:inline-flex;align-items:center;gap:3px;background:var(--bg);
            color:var(--text-hint);font-size:10px;font-weight:700;padding:3px 9px;
            border-radius:100px;border:1px solid var(--border);margin-bottom:6px;">
            📍 Básico</span><br>
          ${distBadge}
          <div class="place-name">${t.nombre || t.name}</div>
          <div class="place-desc">${t.desc || ''}</div>
          <div class="place-footer">
            <span class="place-address">📍 ${t.address || '—'}</span>
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
}

/* ── Disparar búsqueda geo para tiendas ── */
function activarBusquedaTiendas() {
  if (typeof iniciarGeoBusqueda !== 'function') return;
  // iniciarGeoBusqueda() setea geoStatus='loading' de forma sincrónica,
  // así que llamar renderTiendas() justo después muestra el spinner.
  iniciarGeoBusqueda(true).then(() => renderTiendas()); // garantiza re-render en error también
  renderTiendas(); // mostrar spinner de inmediato
}

/* ══ VISTA DE DETALLE — tiendas vitrina ══ */
function openTiendaDetalle(id) {
  const t = (TIENDAS_DESTACADAS || []).find(x => x.id === id);
  if (!t) return;

  const stars = t.rating
    ? `${'★'.repeat(Math.round(t.rating))}${'☆'.repeat(5 - Math.round(t.rating))}`
    : '';

  /* ── Galería de fotos ── */
  const fotosHtml = t.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;
      box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${t.fotos.map(url =>
          `<img src="${url}" alt="foto tienda"
            style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  /* ── Equipo / Staff ── */
  const equipoHtml = t.equipo?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;
      box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);
        letter-spacing:0.07em;margin-bottom:12px;">EQUIPO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${t.equipo.map(m => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${m.foto
              ? `<img src="${m.foto}" alt="${m.nombre}"
                  style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);
                  display:flex;align-items:center;justify-content:center;font-size:18px;
                  flex-shrink:0;">🏪</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${m.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${m.rol}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  /* ── Botones CTA ── */
  const ctaHtml = [
    t.whatsapp
      ? `<a href="https://wa.me/${t.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">
           💬 WhatsApp
         </a>` : '',
    t.lat && t.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">
           🗺 Cómo llegar
         </a>` : '',
    t.web
      ? `<a href="https://${t.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">
           🌐 Sitio web
         </a>` : '',
    t.telefono
      ? `<a href="tel:${t.telefono}"
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
      <div style="background:${t.grad};padding:0 0 24px;position:relative;">
        <!-- Back button -->
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('servicios');switchServiciosTab('tiendas')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">
            ← Volver a Tiendas
          </button>
        </div>
        <!-- Info principal -->
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${t.icon}</div>
          <div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">
            ⭐ Vitrina Wufly
          </div><br>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${t.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${t.subtitulo}</div>
          ${t.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars}${t.reviews ? ` <span style="font-size:13px;">${t.rating} (${t.reviews} reseñas)</span>` : ` <span style="font-size:13px;">${t.rating}</span>`}
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
            letter-spacing:0.07em;margin-bottom:8px;">SOBRE LA TIENDA</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${t.descripcion}</div>
        </div>

        <!-- Información -->
        <div style="background:white;border-radius:16px;padding:16px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);
            letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${t.direccion ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📍</span>
              <span style="font-size:13px;color:var(--text);line-height:1.4;">${t.direccion}</span>
            </div>` : ''}
            ${t.horario ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">⏰</span>
              <span style="font-size:13px;color:var(--text);">${t.horario}</span>
            </div>` : ''}
            ${t.telefono ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📞</span>
              <a href="tel:${t.telefono}"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">
                ${t.telefono}</a>
            </div>` : ''}
            ${t.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${t.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">
                ${t.web}</a>
            </div>` : ''}
          </div>
        </div>

        ${fotosHtml}
        ${equipoHtml}

        <!-- Productos / Categorías -->
        <div style="background:white;border-radius:16px;padding:16px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);
            letter-spacing:0.07em;margin-bottom:10px;">PRODUCTOS Y CATEGORÍAS</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;">
            ${t.tags.map(tag =>
              `<span style="font-size:12px;font-weight:600;padding:6px 13px;border-radius:100px;
                background:var(--purple-light);color:var(--purple);">${tag}</span>`
            ).join('')}
          </div>
        </div>

      </div>
    </div>`;

  switchTab('detail');
}

/* ── openTienda para resultados geo (link Maps / WhatsApp) ── */
function openTienda(id) {
  const t = tiendas.find(x => x.id === id)
    || (TIENDAS_DESTACADAS || []).find(x => x.id === id)
    || (typeof geoResults !== 'undefined' && geoResults.tiendas?.find(x => x.id === id));
  if (!t) return;
  if (t.web) {
    window.open('https://' + t.web, '_blank');
  } else if (t.wsp || t.whatsapp) {
    const num = (t.wsp || t.whatsapp).replace(/\D/g, '');
    window.open('https://wa.me/' + num, '_blank');
  }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderTiendas();
});
