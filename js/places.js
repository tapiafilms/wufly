/* ══════════════════════════════════════
   CLÍNICAS VETERINARIAS — WUFLY
   3 clínicas destacadas fijas + resultados geo cercanos
   ══════════════════════════════════════ */

/* ══ RENDER PRINCIPAL ══ */
function renderClinicas() {
  const list = document.getElementById('clinicaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.clinicas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';

  /* ── Hero banner ── */
  const totalUrgencias = (CLINICAS_DESTACADAS || []).filter(c => c.urgencia).length;
  const heroBanner = `
    <div style="margin:-45px -20px 0;height:260px;overflow:hidden;position:relative;background:#c4b5dc;">
      <img src="img/vets-hero.jpg" alt="Clínicas veterinarias"
        style="width:100%;height:100%;object-fit:cover;object-position:center 30%;display:block;"
        onerror="this.style.display='none'">
    </div>
    <div class="hero-rounded-sep" style="margin:-36px -20px 16px;background:var(--bg);border-radius:36px 36px 0 0;height:36px;position:relative;z-index:1;"></div>
    <div class="hero-banner" style="margin-bottom:16px;position:relative;overflow:hidden;">
      <video autoplay muted loop playsinline
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;">
        <source src="img/clinicas.mp4" type="video/mp4">
      </video>
      <div style="position:absolute;inset:0;background:rgba(103,58,183,0.5);z-index:1;pointer-events:none;"></div>
      <div style="position:relative;z-index:2;">
        <h2>Clínicas Veterinarias</h2>
        <p>Veterinarias verificadas en Viña del Mar, Valparaíso y Concón</p>
        <div class="stat-row">
          <div class="stat"><div class="stat-num">${(CLINICAS_DESTACADAS||[]).length}</div><div class="stat-label">Destacadas</div></div>
          <div class="stat"><div class="stat-num">3</div><div class="stat-label">Ciudades</div></div>
          <div class="stat"><div class="stat-num">${totalUrgencias}</div><div class="stat-label">Urgencias 24h</div></div>
        </div>
      </div>
    </div>`;

  /* ── Buscador ── */
  const searchBar = `
    <div class="search-bar oculto" style="margin-bottom:12px;">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" placeholder="Buscar clínica, servicio..." id="searchClinicas"
        oninput="onSearchClinicas()" aria-label="Buscar clínica veterinaria">
    </div>`;

  /* ── 3 clínicas destacadas (siempre fijas) ── */
  const q = (document.getElementById('searchClinicas')?.value || '').toLowerCase();
  const destacadasFiltradas = (CLINICAS_DESTACADAS || []).filter(c => {
    if (!q) return true;
    return (c.nombre + c.subtitulo + c.descripcion + (c.tags||[]).join(' ')).toLowerCase().includes(q);
  });
  const destHtml = destacadasFiltradas.length > 0
    ? `<div style="font-size:11px;font-weight:700;color:var(--purple);letter-spacing:0.07em;padding:0 2px 10px;">CLINICAS DESTACADAS</div>
       ${destacadasFiltradas.map(_renderClinicaDestacada).join('')}`
    : '';

  /* ── Loading spinner geo ── */
  const loadingHtml = geoLoading ? `
    <div style="display:flex;align-items:center;gap:12px;padding:18px;background:var(--purple-light);border-radius:14px;margin-bottom:16px;">
      <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando clínicas cerca de ti…</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
      </div>
    </div>` : '';

  /* ── Resultados geo cercanos ── */
  let geoHtml = '';
  if (!geoLoading) {
    if (geoDisponible) {
      const geoFiltradas = geoResults.clinicas.filter(c => {
        if (!q) return true;
        return (c.name + (c.type||'') + (c.desc||'')).toLowerCase().includes(q);
      });
      geoHtml = geoFiltradas.length > 0
        ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:16px 0 10px;">
             📍 CLÍNICAS CERCANAS
           </div>
           ${geoFiltradas.map(_renderClinicaGeo).join('')}`
        : `<div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
             <div style="font-size:32px;margin-bottom:10px;">🔍</div>
             <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">Sin resultados para tu búsqueda</div>
             <div style="font-size:13px;color:var(--text-muted);">Prueba con otro término</div>
           </div>`;
    } else {
      /* No se ha buscado aún o no encontró nada */
      const yaIntento = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'error' || geoStatus === 'denied');
      geoHtml = `
        <div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
          <div style="font-size:36px;margin-bottom:10px;">${yaIntento ? '😕' : '📍'}</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
            ${yaIntento ? 'No se encontraron clínicas cercanas' : 'Encuentra clínicas cerca de ti'}
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
            ${yaIntento
              ? 'No encontramos veterinarias en tu zona. Puedes intentarlo nuevamente.'
              : 'Activa tu ubicación para ver las clínicas más cercanas a donde estás.'}
          </div>
          <button onclick="activarBusquedaGeo()"
            style="padding:12px 24px;background:var(--purple);border:none;border-radius:12px;
              font-size:14px;font-weight:700;color:white;cursor:pointer;
              font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(92,47,168,0.3);">
            ${yaIntento ? '🔄 Intenta nuevamente' : '📍 Ver clínicas cercanas'}
          </button>
        </div>`;
    }
  }

  list.innerHTML = heroBanner + searchBar + destHtml + loadingHtml + geoHtml;
}

/* ── Búsqueda por texto ── */
let _clinicaBusqueda = '';
function onSearchClinicas() {
  _clinicaBusqueda = (document.getElementById('searchClinicas')?.value || '').toLowerCase();
  renderClinicas();
}

/* ── Card clínica destacada ── */
function _renderClinicaDestacada(c) {
  const imgSrc = c.bannerImg || null;
  return `
    <div onclick="openClinicaDetalle('${c.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;">
      ${c.urgencia ? `
        <div></div>` : ''}
      ${imgSrc
        ? `<div class="fto-tienda" style="position:relative;overflow:hidden;background:transparent;">
             <img src="${imgSrc}" alt="${c.nombre}"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.display='none'">
           </div>`
        : `<div style="height:130px;background:transparent;display:flex;align-items:center;justify-content:center;">
             <div style="font-size:48px;opacity:0.9;">${c.icon}</div>
           </div>`
      }
      <div style="background:white;padding:14px 16px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;
            color:var(--text);line-height:1.2;">${c.nombre}</div>
          <div style="font-size:11px;font-weight:700;color:white;background:${c.grad};
            padding:4px 10px;border-radius:100px;white-space:nowrap;">Entrar</div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${c.subtitulo}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${c.tags.slice(0,3).map(t =>
            `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
              font-weight:600;padding:3px 9px;border-radius:100px;">${t}</span>`
          ).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;">📍 ${c.ciudad}</div>
      </div>
    </div>`;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderClinicaGeo(c) {
  const distBadge = c.distKm != null && c.distKm < 100
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
  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda().then(() => renderClinicas());
  }
  renderClinicas(); // mostrar spinner inmediatamente
}

/* ══ VISTA DE DETALLE — clínicas destacadas ══ */
function openClinicaDetalle(id) {
  const c = (CLINICAS_DESTACADAS || []).find(x => x.id === id);
  if (!c) return;

  const stars = c.rating
    ? `${'★'.repeat(Math.round(c.rating))}${'☆'.repeat(5 - Math.round(c.rating))}`
    : '';

  const fotosHtml = c.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${c.fotos.map(url =>
          `<img src="${url}" alt="foto clínica"
            style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  const vetsHtml = c.veterinarios?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">EQUIPO VETERINARIO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${c.veterinarios.map(v => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${v.foto
              ? `<img src="${v.foto}" alt="${v.nombre}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🩺</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${v.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${v.especialidad}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const ctaHtml = [
    c.whatsapp
      ? `<a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">💬 WhatsApp</a>` : '',
    c.lat && c.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">🗺 Cómo llegar</a>` : '',
    c.web
      ? `<a href="https://${c.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">🌐 Sitio web</a>` : '',
    c.telefono
      ? `<a href="tel:${c.telefono}"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">📞 Llamar</a>` : '',
  ].filter(Boolean).join('');

  const detailEl = document.getElementById('page-detail');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div>
      <div style="background:${c.grad};padding:0 0 24px;position:relative;">
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('restaurantes')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">← Volver a Vets</button>
        </div>
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${c.icon}</div>
          ${c.urgencia ? `<div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">🚨 Urgencias 24h</div><br>` : ''}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${c.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${c.subtitulo}</div>
          ${c.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars} <span style="font-size:13px;">${c.rating} (${c.reviews} reseñas)</span>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:14px;background:var(--bg);">
        ${ctaHtml ? `<div style="display:flex;gap:8px;flex-wrap:wrap;">${ctaHtml}</div>` : ''}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:8px;">SOBRE NOSOTROS</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${c.descripcion}</div>
        </div>
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
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
              <a href="tel:${c.telefono}" style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${c.telefono}</a>
            </div>` : ''}
            ${c.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${c.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${c.web}</a>
            </div>` : ''}
          </div>
        </div>
        ${fotosHtml}
        ${vetsHtml}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">SERVICIOS</div>
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