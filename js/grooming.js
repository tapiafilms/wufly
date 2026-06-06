/* ══════════════════════════════════════
   GROOMING / PELUQUERÍAS CANINAS — WUFLY
   Muestra solo resultados cercanos al usuario (OpenStreetMap/geo).
   Si no hay resultados, muestra un aviso amigable.
   ══════════════════════════════════════ */

/* ══ ESTADO ══ */
let groomingFilter = 'todos';

/* ══ RENDER ══ */
function renderGrooming() {
  const list = document.getElementById('groomingList');
  if (!list) return;

  const q = (document.getElementById('searchGrooming')?.value || '').toLowerCase();

  // Solo usar resultados de geolocalización (OSM)
  const geoDisponibleG = typeof geoResults !== 'undefined' && geoResults.grooming.length > 0;

  let fuente = [];

  if (geoDisponibleG) {
    fuente = geoResults.grooming.filter(g =>
      !q || g.name.toLowerCase().includes(q) || (g.address || '').toLowerCase().includes(q)
    );
  }

  // Sin resultados
  if (fuente.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:48px 24px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:14px;">✂️</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;color:var(--text);margin-bottom:8px;">
          Wufly no encontró ningún lugar cercano a ti
        </div>
        <div style="font-size:13px;line-height:1.6;color:var(--text-muted);max-width:260px;margin:0 auto 20px;">
          Activa tu ubicación o amplía la zona de búsqueda para ver peluquerías caninas cerca tuyo.
        </div>
        <button onclick="activarBusquedaGrooming()" style="display:inline-flex;align-items:center;gap:8px;background:var(--purple);color:white;border:none;border-radius:100px;padding:12px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          📍 Actualizar ubicación
        </button>
      </div>`;
    return;
  }

  list.innerHTML = fuente.map(g => {
    const stars     = g.rating ? '★'.repeat(Math.round(g.rating)) + '☆'.repeat(5 - Math.round(g.rating)) : '';
    const wspNum    = (g.wsp || '').replace(/\D/g, '');
    const distBadge = g.distKm != null && g.distKm < 100
      ? `<span style="display:inline-block;background:var(--purple-light);color:var(--purple);font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:4px;">📍 ${fmtDist(g.distKm)}</span><br>`
      : '';

    const mapLink = g.lat && g.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}" target="_blank" rel="noopener"
           style="display:flex;align-items:center;justify-content:center;gap:6px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;">
           🗺 Cómo llegar
         </a>`
      : wspNum
      ? `<a href="https://wa.me/${wspNum}" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;">
           <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
           Reservar por WhatsApp
         </a>`
      : '';

    return `
    <div class="place-card">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:44px;height:44px;min-width:44px;background:var(--bg);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">${g.icon || '✂️'}</div>
        <div style="flex:1;min-width:0;">
          ${distBadge}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:2px;">${g.name}</div>
          <div style="font-size:10px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:5px;">${g.type || 'PELUQUERÍA'}</div>
          ${stars ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:3px;"><span style="color:var(--mint);">${stars}</span> <span style="font-weight:600;">${g.rating}</span> <span style="color:var(--text-hint);">(${g.reviews})</span></div>` : ''}
          ${g.desc ? `<div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">${g.desc}</div>` : ''}
          ${g.tags?.length ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            ${g.tags.slice(0, 3).map(t => `<span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${t}</span>`).join('')}
          </div>` : ''}
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

/* ══ ACTUALIZAR UBICACIÓN ══ */
function activarBusquedaGrooming() {
  const list = document.getElementById('groomingList');
  if (list) list.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:12px;color:var(--text-muted);"><div style="width:28px;height:28px;border:3px solid var(--purple-light);border-top-color:var(--purple);border-radius:50%;animation:spin 0.7s linear infinite;"></div><span style="font-size:13px;">Buscando cerca de ti...</span></div>';
  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda(true).then(() => renderGrooming());
  } else {
    renderGrooming();
  }
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderGrooming);