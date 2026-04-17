/* ══════════════════════════════════════
   ANALYTICS — Wufly
   Tracking de clics en listings verificados
   Panel de admin en ?admin=1
   ══════════════════════════════════════ */

/* ── Registrar clic en Supabase ── */
async function registrarClick(negocioId, negocioNombre, seccion) {
  try {
    // db viene de auth.js (mismo cliente Supabase)
    if (typeof db === 'undefined') return;
    await db.from('clicks').insert({
      negocio_id:     negocioId,
      negocio_nombre: negocioNombre,
      seccion:        seccion,
    });
  } catch (_) {
    // silencioso — nunca interrumpir la UX por analytics
  }
}

/* ══ PANEL DE ADMIN ══ */
async function mostrarAdmin() {
  // Quitar si ya está abierto
  const existing = document.getElementById('admin-overlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.85);
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
  `;
  overlay.innerHTML = `
    <div style="background:#1a0a3c;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.1em;">WUFLY ADMIN</div>
        <div style="font-size:18px;font-weight:700;color:white;margin-top:2px;">📊 Panel de Analytics</div>
      </div>
      <button onclick="document.getElementById('admin-overlay').remove()"
        style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);color:white;font-size:16px;cursor:pointer;">✕</button>
    </div>
    <div id="admin-content" style="flex:1;overflow-y:auto;padding:20px;">
      <div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5);">Cargando datos...</div>
    </div>
  `;
  document.body.appendChild(overlay);

  await _cargarAdminData();
}

async function _cargarAdminData() {
  const content = document.getElementById('admin-content');
  if (!content) return;

  try {
    // Usuarios totales (auth.users no es accesible desde anon, usamos profiles)
    const { count: totalProfiles } = await db
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Total clics
    const { count: totalClicks } = await db
      .from('clicks')
      .select('*', { count: 'exact', head: true });

    // Clics últimos 7 días
    const hace7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: clicks7d } = await db
      .from('clicks')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', hace7);

    // Clics últimos 30 días
    const hace30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { count: clicks30d } = await db
      .from('clicks')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', hace30);

    // Top negocios (todos los clics agrupados manualmente)
    const { data: todosClicks } = await db
      .from('clicks')
      .select('negocio_id, negocio_nombre, seccion')
      .order('created_at', { ascending: false })
      .limit(1000);

    // Agrupar por negocio
    const porNegocio = {};
    (todosClicks || []).forEach(c => {
      const key = c.negocio_id;
      if (!porNegocio[key]) porNegocio[key] = { nombre: c.negocio_nombre, seccion: c.seccion, total: 0 };
      porNegocio[key].total++;
    });
    const ranking = Object.values(porNegocio).sort((a, b) => b.total - a.total);

    // Agrupar por sección
    const porSeccion = {};
    (todosClicks || []).forEach(c => {
      porSeccion[c.seccion] = (porSeccion[c.seccion] || 0) + 1;
    });

    const seccionIcon = { clinicas: '🏥', tiendas: '🛒', grooming: '✂️', paseadores: '🐕' };

    content.innerHTML = `
      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
        ${_kpi('👥', 'Perfiles creados', totalProfiles ?? 0, '#7C4DCC')}
        ${_kpi('👆', 'Clics totales', totalClicks ?? 0, '#5DD6A8')}
        ${_kpi('📅', 'Clics (7 días)', clicks7d ?? 0, '#F59E0B')}
        ${_kpi('📆', 'Clics (30 días)', clicks30d ?? 0, '#3B82F6')}
      </div>

      <!-- Por sección -->
      <div style="margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.1em;margin-bottom:12px;">POR SECCIÓN</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${Object.entries(porSeccion).sort((a,b)=>b[1]-a[1]).map(([sec, total]) => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.06);border-radius:10px;padding:10px 14px;">
              <div style="color:white;font-size:13px;font-weight:600;">${seccionIcon[sec] || '📌'} ${sec}</div>
              <div style="color:#5DD6A8;font-weight:700;font-size:14px;">${total}</div>
            </div>
          `).join('') || '<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin datos aún</div>'}
        </div>
      </div>

      <!-- Ranking negocios -->
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.1em;margin-bottom:12px;">TOP NEGOCIOS POR CLICS</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${ranking.length === 0
            ? '<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin clics registrados aún</div>'
            : ranking.slice(0, 20).map((n, i) => `
              <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.06);border-radius:10px;padding:10px 14px;">
                <div style="width:24px;height:24px;border-radius:50%;background:${i < 3 ? '#7C4DCC' : 'rgba(255,255,255,0.1)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0;">${i+1}</div>
                <div style="flex:1;min-width:0;">
                  <div style="color:white;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n.nombre || n.negocio_id}</div>
                  <div style="color:rgba(255,255,255,0.4);font-size:11px;">${seccionIcon[n.seccion] || ''} ${n.seccion}</div>
                </div>
                <div style="color:#5DD6A8;font-weight:700;font-size:15px;flex-shrink:0;">${n.total}</div>
              </div>
            `).join('')
          }
        </div>
      </div>

      <div style="margin-top:24px;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;font-size:11px;color:rgba(255,255,255,0.3);text-align:center;">
        Datos en tiempo real · Supabase
      </div>
    `;
  } catch (e) {
    content.innerHTML = `<div style="color:#F87171;padding:20px;text-align:center;">Error cargando datos: ${e.message}</div>`;
  }
}

function _kpi(icon, label, value, color) {
  return `
    <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:22px;margin-bottom:6px;">${icon}</div>
      <div style="font-size:26px;font-weight:800;color:${color};">${value.toLocaleString('es-CL')}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px;">${label}</div>
    </div>`;
}

/* ── Activar admin: URL ?admin=1 o triple-tap en el logo ── */
(function initAdmin() {
  // Por URL
  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mostrarAdmin, 500));
  }

  // Triple-tap en logo
  let tapCount = 0, tapTimer = null;
  document.addEventListener('click', e => {
    const logo = e.target.closest('.app-topbar img');
    if (!logo) return;
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 600);
    if (tapCount >= 3) {
      tapCount = 0;
      mostrarAdmin();
    }
  });
})();
