/* ══════════════════════════════════════
   TIENDAS — Wufly
   3 tiendas destacadas fijas + resultados geo cercanos
   ══════════════════════════════════════ */

/* ══ RENDER PRINCIPAL ══ */
function renderTiendas() {
  const list = document.getElementById('tiendaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.tiendas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';
  const q = (document.getElementById('searchTiendas')?.value || '').toLowerCase();

  /* ── Buscador ── */
  const searchBar = `
    <div class="search-bar oculto" style="margin-bottom:12px;">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" placeholder="Buscar tienda, producto..." id="searchTiendas"
        oninput="onSearchTiendas()" aria-label="Buscar tienda de mascotas">
    </div>`;

  /* ── 3 tiendas destacadas (siempre fijas) ── */
  const destacadasFiltradas = (TIENDAS_DESTACADAS || []).filter(t => {
    if (!q) return true;
    return (t.nombre + t.subtitulo + t.descripcion + (t.tags||[]).join(' ')).toLowerCase().includes(q);
  });

  const vitrinaHtml = destacadasFiltradas.length > 0
    ? `<div style="font-size:11px;font-weight:700;color:var(--purple);letter-spacing:0.07em;padding:0 2px 10px;">TIENDAS DESTACADAS</div>
       ${destacadasFiltradas.map(_renderTiendaDestacada).join('')}`
    : '';

  /* ── Loading spinner geo ── */
  const loadingHtml = geoLoading ? `
    <div style="display:flex;align-items:center;gap:12px;padding:18px;background:var(--purple-light);border-radius:14px;margin-bottom:16px;">
      <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando tiendas cerca de ti…</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
      </div>
    </div>` : '';

  /* ── Resultados geo o estado vacío ── */
  let geoHtml = '';
  if (!geoLoading) {
    if (geoDisponible) {
      const geoFiltradas = geoResults.tiendas.filter(t => {
        if (!q) return true;
        return ((t.nombre || t.name) + (t.desc||'')).toLowerCase().includes(q);
      });
      geoHtml = geoFiltradas.length > 0
        ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:16px 0 10px;">
             📍 TIENDAS CERCANAS
           </div>
           ${geoFiltradas.map(_renderTiendaGeo).join('')}`
        : `<div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
             <div style="font-size:32px;margin-bottom:10px;">🔍</div>
             <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">Sin resultados para tu búsqueda</div>
             <div style="font-size:13px;color:var(--text-muted);">Prueba con otro término</div>
           </div>`;
    } else {
      const yaIntento = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'error' || geoStatus === 'denied');
      geoHtml = `
        <div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
          <div style="font-size:36px;margin-bottom:10px;">${yaIntento ? '😕' : '📍'}</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
            ${yaIntento ? 'No se encontraron tiendas cercanas' : 'Encuentra tiendas cerca de ti'}
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
            ${yaIntento
              ? 'No encontramos pet shops en tu zona. Puedes intentarlo nuevamente.'
              : 'Activa tu ubicación para ver las tiendas más cercanas a donde estás.'}
          </div>
          <button onclick="activarBusquedaTiendas()"
            style="padding:12px 24px;background:var(--purple);border:none;border-radius:12px;
              font-size:14px;font-weight:700;color:white;cursor:pointer;
              font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(92,47,168,0.3);">
            ${yaIntento ? '🔄 Intenta nuevamente' : '📍 Ver tiendas cercanas'}
          </button>
        </div>`;
    }
  }

  list.innerHTML = searchBar + vitrinaHtml + loadingHtml + geoHtml;
}

/* ── Búsqueda por texto ── */
function onSearchTiendas() {
  renderTiendas();
}

/* ── Card tienda destacada (vitrina) ── */
function _renderTiendaDestacada(t) {
  const imgSrc = t.bannerImg || null;
  return `
    <div onclick="openTiendaDetalle('${t.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;">

      ${imgSrc
        ? `<div class="fto-tienda" style="position:relative;overflow:hidden;background:transparent;">
             <img src="${imgSrc}" alt="${t.nombre}"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.display='none'">
           </div>`
        : `<div style="height:130px;background:transparent;display:flex;align-items:center;justify-content:center;">
             <div style="font-size:48px;opacity:0.9;">${t.icon}</div>
           </div>`
      }
      <div style="background:white;padding:14px 16px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;
            color:var(--text);line-height:1.2;">${t.nombre}</div>
          <div style="font-size:11px;font-weight:700;color:white;background:${t.grad};
            padding:4px 10px;border-radius:100px;white-space:nowrap;">Entrar</div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${t.subtitulo}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${t.tags.slice(0,3).map(tag =>
            `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
              font-weight:600;padding:3px 9px;border-radius:100px;">${tag}</span>`
          ).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;">📍 ${t.ciudad}</div>
      </div>
    </div>`;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderTiendaGeo(t) {
  const distBadge = t.distKm != null && t.distKm < 100
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
          ${distBadge}
          <div class="place-name">${t.nombre || t.name}</div>
          <div class="place-desc">${t.desc || ''}</div>
          <div class="place-footer">
            <span class="place-address">📍 ${t.address || '—'}</span>
            ${t.tel ? `<a href="tel:${t.tel}" class="place-tel" onclick="event.stopPropagation()">${t.tel}</a>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
}

/* ── Disparar búsqueda geo ── */
function activarBusquedaTiendas() {
  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda(true).then(() => renderTiendas());
  }
  renderTiendas();
}

/* ══ VISTA DE DETALLE — tiendas vitrina ══ */
function openTiendaDetalle(id) {
  const t = (TIENDAS_DESTACADAS || []).find(x => x.id === id);
  if (!t) return;

  const stars = t.rating
    ? `${'★'.repeat(Math.round(t.rating))}${'☆'.repeat(5 - Math.round(t.rating))}`
    : '';

  const fotosHtml = t.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${t.fotos.map(url =>
          `<img src="${url}" alt="foto tienda" style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  const equipoHtml = t.equipo?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">EQUIPO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${t.equipo.map(m => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${m.foto
              ? `<img src="${m.foto}" alt="${m.nombre}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏪</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${m.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${m.rol}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const ctaHtml = [
    t.whatsapp
      ? `<a href="https://wa.me/${t.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">💬 WhatsApp</a>` : '',
    t.lat && t.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">🗺 Cómo llegar</a>` : '',
    t.web
      ? `<a href="https://${t.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">🌐 Sitio web</a>` : '',
    t.telefono
      ? `<a href="tel:${t.telefono}"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">📞 Llamar</a>` : '',
  ].filter(Boolean).join('');

  const detailEl = document.getElementById('page-detail');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div>
      <div style="background:${t.grad};padding:0 0 24px;position:relative;">
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('servicios');switchServiciosTab('tiendas')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">← Volver a Tiendas</button>
        </div>
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${t.icon}</div>
          <div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">⭐ Vitrina Wufly</div><br>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${t.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${t.subtitulo}</div>
          ${t.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars}${t.reviews ? ` <span style="font-size:13px;">${t.rating} (${t.reviews} reseñas)</span>` : ` <span style="font-size:13px;">${t.rating}</span>`}
          </div>` : ''}
        </div>
      </div>
      <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:14px;background:var(--bg);">
        ${ctaHtml ? `<div style="display:flex;gap:8px;flex-wrap:wrap;">${ctaHtml}</div>` : ''}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:8px;">SOBRE LA TIENDA</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${t.descripcion}</div>
        </div>
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
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
              <a href="tel:${t.telefono}" style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${t.telefono}</a>
            </div>` : ''}
            ${t.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${t.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${t.web}</a>
            </div>` : ''}
          </div>
        </div>
        ${fotosHtml}
        ${equipoHtml}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">PRODUCTOS Y CATEGORÍAS</div>
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

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderTiendas();
});