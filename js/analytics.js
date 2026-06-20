/* ══════════════════════════════════════
   ANALYTICS — Wufly
   Tracking de clics en listings verificados
   Panel de admin en ?admin=1 o triple-tap logo
   ══════════════════════════════════════ */

/* ── Registrar clic en Supabase ── */
async function registrarClick(negocioId, negocioNombre, seccion) {
  try {
    if (typeof db === 'undefined') return;
    await db.from('clicks').insert({
      negocio_id:     negocioId,
      negocio_nombre: negocioNombre,
      seccion:        seccion,
    });
  } catch (_) {}
}

/* ══════════════════════════════════════
   PANEL DE ADMIN — Dashboard completo
   ══════════════════════════════════════ */

async function mostrarAdmin() {
  const existing = document.getElementById('admin-overlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:#0d0620;
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
    color:white;
  `;
  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:#1a0a3c;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#7C4DCC,#5DD6A8);display:flex;align-items:center;justify-content:center;font-size:18px;">🐾</div>
        <div>
          <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.12em;text-transform:uppercase;">Wufly Admin</div>
          <div style="font-size:16px;font-weight:800;color:white;margin-top:1px;">Dashboard</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div id="admin-last-update" style="font-size:10px;color:rgba(255,255,255,0.3);"></div>
        <button onclick="_recargarAdmin()" id="btn-reload-admin"
          style="padding:7px 14px;border-radius:8px;background:rgba(124,77,204,0.2);border:1px solid rgba(124,77,204,0.4);color:#a78bfa;font-size:12px;font-weight:600;cursor:pointer;">
          ↻ Actualizar
        </button>
        <button onclick="document.getElementById('admin-overlay').remove()"
          style="width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:2px;padding:12px 20px 0;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.06);background:#0f0728;">
      ${['overview','usuarios','contenido','negocios','servicios'].map((t, i) => `
        <button onclick="_adminTab('${t}')" id="atab-${t}"
          style="padding:8px 14px;border-radius:8px 8px 0 0;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;
          ${i===0 ? 'background:#7C4DCC;color:white;' : 'background:transparent;color:rgba(255,255,255,0.4);'}">
          ${{overview:'📊 General', usuarios:'👥 Usuarios', contenido:'📋 Contenido', negocios:'🏢 Negocios', servicios:'🐕 Servicios'}[t]}
        </button>
      `).join('')}
    </div>

    <!-- Content -->
    <div id="admin-content" style="flex:1;overflow-y:auto;padding:20px;background:#0d0620;">
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;gap:12px;">
        <div style="width:36px;height:36px;border:3px solid rgba(124,77,204,0.3);border-top-color:#7C4DCC;border-radius:50%;animation:adminSpin 0.8s linear infinite;"></div>
        <div style="color:rgba(255,255,255,0.4);font-size:13px;">Cargando datos...</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  if (!document.getElementById('admin-styles')) {
    const s = document.createElement('style');
    s.id = 'admin-styles';
    s.textContent = `
      @keyframes adminSpin { to { transform: rotate(360deg); } }
      @keyframes adminFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      #admin-content > div { animation: adminFadeIn 0.25s ease; }
      .admin-kpi { background:#1e1040;border:1px solid rgba(255,255,255,0.10);border-radius:14px;padding:16px;transition:transform 0.15s; }
      .admin-kpi:hover { transform:translateY(-2px); }
      .admin-card { background:#1a0d38;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;margin-bottom:14px; }
      .admin-row { display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:#221250;margin-bottom:6px; }
      .admin-bar-wrap { background:rgba(255,255,255,0.10);border-radius:99px;height:6px;flex:1; }
      .admin-bar { height:6px;border-radius:99px;transition:width 0.6s ease; }
      .admin-section-title { font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;margin-top:4px; }
    `;
    document.head.appendChild(s);
  }

  await _cargarAdminData();
}

let _adminData = null;
let _adminCacheTime = 0;
const _ADMIN_CACHE_MS = 5 * 60 * 1000; // 5 minutos

async function _recargarAdmin() {
  _adminData = null;
  _adminCacheTime = 0;
  const btn = document.getElementById('btn-reload-admin');
  if (btn) btn.style.opacity = '0.5';
  await _cargarAdminData();
  if (btn) btn.style.opacity = '1';
}

async function _cargarAdminData() {
  // Reusar datos si el cache aún es válido
  if (_adminData && Date.now() - _adminCacheTime < _ADMIN_CACHE_MS) {
    _renderAdminData(_adminData);
    return;
  }
  try {
    const hace7  = new Date(Date.now() - 7  * 86400000).toISOString();
    const hace30 = new Date(Date.now() - 30 * 86400000).toISOString();
    const hace1  = new Date(Date.now() - 1  * 86400000).toISOString();

    // Visitas desde el Worker (IP real)
    let visitasStats = { total: 0, hoy: 0, n7d: 0, n30d: 0, porDia: {} };
    try {
      const vRes = await fetch('https://wufly-push.pablo77tapia.workers.dev/api/stats-visitas');
      if (vRes.ok) visitasStats = await vRes.json();
    } catch (_) {}

    const [
      { count: totalProfiles },
      { count: profiles7d },
      { count: profiles30d },
      { count: profiles1d },
      { count: totalClicks },
      { count: clicks7d },
      { count: clicks30d },
      { data: todosClicks },
      { count: totalAdopciones },
      { count: adopciones7d },
      { count: totalPerdidos },
      { count: perdidos7d },
      { count: perdidosActivos },
      { count: totalRescates },
      { count: rescates7d },
      { count: totalFotos },
      { count: fotos7d },
      { count: totalRecordatorios },
      { count: totalPush },
      { count: totalSolicitudes },
      { count: solicitudes7d },
      { count: totalPaseos },
    ] = await Promise.all([
      db.from('profiles').select('*', { count:'exact', head:true }),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace30),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace1),
      db.from('clicks').select('*', { count:'exact', head:true }),
      db.from('clicks').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('clicks').select('*', { count:'exact', head:true }).gte('created_at', hace30),
      db.from('clicks').select('negocio_id,negocio_nombre,seccion,created_at').order('created_at', { ascending:false }).limit(2000),
      db.from('adopciones').select('*', { count:'exact', head:true }),
      db.from('adopciones').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('perdidos').select('*', { count:'exact', head:true }),
      db.from('perdidos').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('perdidos').select('*', { count:'exact', head:true }).eq('activo', true),
      db.from('rescates').select('*', { count:'exact', head:true }),
      db.from('rescates').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('fotos_juntos').select('*', { count:'exact', head:true }),
      db.from('fotos_juntos').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('recordatorios').select('*', { count:'exact', head:true }),
      db.from('push_subscriptions').select('*', { count:'exact', head:true }),
      db.from('solicitudes_paseador').select('*', { count:'exact', head:true }),
      db.from('solicitudes_paseador').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('paseo_ubicaciones').select('*', { count:'exact', head:true }),
    ]);

    const porNegocio = {}, porSeccion = {}, clicksPorDia = {};
    (todosClicks || []).forEach(c => {
      const k = c.negocio_id;
      if (!porNegocio[k]) porNegocio[k] = { nombre: c.negocio_nombre, seccion: c.seccion, total: 0 };
      porNegocio[k].total++;
      porSeccion[c.seccion] = (porSeccion[c.seccion] || 0) + 1;
      const d2 = c.created_at?.slice(0, 10);
      if (d2) clicksPorDia[d2] = (clicksPorDia[d2] || 0) + 1;
    });
    const rankingNegocios = Object.values(porNegocio).sort((a,b) => b.total - a.total);

    _adminData = {
      totalProfiles, profiles7d, profiles30d, profiles1d,
      totalClicks, clicks7d, clicks30d,
      rankingNegocios, porSeccion, clicksPorDia,
      totalAdopciones, adopciones7d,
      totalPerdidos, perdidos7d, perdidosActivos,
      totalRescates, rescates7d,
      totalFotos, fotos7d,
      totalRecordatorios, totalPush,
      totalSolicitudes, solicitudes7d, totalPaseos,
      visitasStats,
    };
    _adminCacheTime = Date.now();

    _renderAdminData(_adminData);
  } catch (e) {
    const content = document.getElementById('admin-content');
    if (content) content.innerHTML = `
      <div style="background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:14px;padding:20px;text-align:center;color:#fca5a5;">
        <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
        <div style="font-weight:700;margin-bottom:4px;">Error al cargar datos</div>
        <div style="font-size:12px;opacity:0.7;">${e.message}</div>
      </div>`;
  }
}

function _renderAdminData(d) {
  const ts = document.getElementById('admin-last-update');
  if (ts) ts.textContent = 'Actualizado ' + new Date(_adminCacheTime).toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' });
  _adminTab('overview');
}

function _adminTab(tab) {
  ['overview','usuarios','contenido','negocios','servicios'].forEach(t => {
    const el = document.getElementById('atab-' + t);
    if (!el) return;
    el.style.background = t === tab ? '#7C4DCC' : 'transparent';
    el.style.color = t === tab ? 'white' : 'rgba(255,255,255,0.4)';
  });

  const content = document.getElementById('admin-content');
  if (!content || !_adminData) return;
  const d = _adminData;
  const seccionIcon = { clinicas:'🏥', tiendas:'🛒', grooming:'✂️', paseadores:'🐕' };

  if (tab === 'overview') {
    const hoy14 = new Date();
    const dias14 = Array.from({ length: 14 }, (_, i) => {
      const dt = new Date(hoy14); dt.setDate(dt.getDate() - (13 - i));
      return dt.toISOString().slice(0, 10);
    });

    // Sparkline visitas
    const vals14v = dias14.map(d2 => (d.visitasStats?.porDia?.[d2] || 0));
    const max14v  = Math.max(...vals14v, 1);

    // Sparkline clics
    const vals14c = dias14.map(d2 => d.clicksPorDia[d2] || 0);
    const max14c  = Math.max(...vals14c, 1);

    content.innerHTML = `
      <!-- Visitas únicas -->
      <div class="admin-section-title">Visitas únicas (IPs distintas)</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
        ${[['HOY', d.visitasStats?.hoy??0,'#5DD6A8'],['7 DÍAS',d.visitasStats?.n7d??0,'#a78bfa'],['30 DÍAS',d.visitasStats?.n30d??0,'#60a5fa'],['TOTAL',d.visitasStats?.total??0,'#fbbf24']].map(([label,val,color])=>`
          <div class="admin-kpi" style="text-align:center;">
            <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:4px;">${label}</div>
            <div style="font-size:26px;font-weight:900;color:${color};">${val}</div>
          </div>`).join('')}
      </div>

      <!-- Sparkline visitas -->
      <div class="admin-card" style="margin-bottom:16px;">
        <div class="admin-section-title" style="margin-bottom:12px;">Visitas únicas — últimos 14 días</div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:50px;margin-bottom:6px;">
          ${vals14v.map((v,i)=>`<div style="flex:1;background:${v===max14v?'#5DD6A8':'rgba(93,214,168,0.3)'};border-radius:3px 3px 0 0;height:${Math.max(3,Math.round(v/max14v*44))}px;" title="${dias14[i]}: ${v}"></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,0.3);">
          <span>${_fmtDate(dias14[0])}</span><span>${_fmtDate(dias14[13])}</span>
        </div>
      </div>

      <!-- KPIs generales -->
      <div class="admin-section-title">Resumen general</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;">
        ${_kpi('👥','Usuarios totales',d.totalProfiles??0,'#a78bfa')}
        ${_kpi('👆','Clics totales',d.totalClicks??0,'#5DD6A8')}
        ${_kpi('📱','Push suscritos',d.totalPush??0,'#60a5fa')}
        ${_kpi('🐾','Adopciones',d.totalAdopciones??0,'#fb923c')}
        ${_kpi('🔍','Perdidos activos',d.perdidosActivos??0,'#f472b6')}
        ${_kpi('🦸','Rescates',d.totalRescates??0,'#34d399')}
      </div>

      <!-- Sparkline clics -->
      <div class="admin-card" style="margin-bottom:16px;">
        <div class="admin-section-title" style="margin-bottom:12px;">Clics en negocios — últimos 14 días</div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:50px;margin-bottom:6px;">
          ${vals14c.map((v,i)=>`<div style="flex:1;background:${v===max14c?'#7C4DCC':'rgba(124,77,204,0.35)'};border-radius:3px 3px 0 0;height:${Math.max(3,Math.round(v/max14c*44))}px;" title="${dias14[i]}: ${v}"></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,0.3);">
          <span>${_fmtDate(dias14[0])}</span><span>${_fmtDate(dias14[13])}</span>
        </div>
      </div>

      <!-- Esta semana -->
      <div class="admin-section-title">Esta semana</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;">
        ${_kpiMini('Usuarios nuevos',d.profiles7d??0,'#a78bfa')}
        ${_kpiMini('Clics',d.clicks7d??0,'#5DD6A8')}
        ${_kpiMini('Adopciones',d.adopciones7d??0,'#fb923c')}
        ${_kpiMini('Perdidos',d.perdidos7d??0,'#f472b6')}
        ${_kpiMini('Rescates',d.rescates7d??0,'#34d399')}
        ${_kpiMini('Fotos juntos',d.fotos7d??0,'#fbbf24')}
      </div>

      <!-- Por sección -->
      <div class="admin-card">
        <div class="admin-section-title">Secciones más activas</div>
        ${Object.entries(d.porSeccion).sort((a,b)=>b[1]-a[1]).map(([sec,total])=>{
          const mx=Math.max(...Object.values(d.porSeccion),1);
          return `<div class="admin-row">
            <div style="width:26px;text-align:center;">${seccionIcon[sec]||'📌'}</div>
            <div style="flex:1;font-size:13px;font-weight:600;color:white;text-transform:capitalize;">${sec}</div>
            <div class="admin-bar-wrap"><div class="admin-bar" style="width:${Math.round(total/mx*100)}%;background:#7C4DCC;"></div></div>
            <div style="color:#5DD6A8;font-weight:700;font-size:13px;min-width:28px;text-align:right;">${total}</div>
          </div>`;
        }).join('')||'<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin datos aún</div>'}
      </div>
    `;
  }

  else if (tab === 'usuarios') {
    content.innerHTML = `
      <div class="admin-section-title">Usuarios</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('👥','Total registrados',d.totalProfiles??0,'#a78bfa')}
        ${_kpi('🆕','Nuevos hoy',d.profiles1d??0,'#5DD6A8')}
        ${_kpi('📅','Nuevos (7d)',d.profiles7d??0,'#fbbf24')}
        ${_kpi('📆','Nuevos (30d)',d.profiles30d??0,'#60a5fa')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Actividad</div>
        ${[['Push suscritos',d.totalPush??0,'#60a5fa'],['Recordatorios',d.totalRecordatorios??0,'#fbbf24'],['Fotos Juntos',d.totalFotos??0,'#f472b6'],['% activos (7d)',d.totalProfiles>0?Math.round((d.profiles7d/d.totalProfiles)*100)+'%':0,'#5DD6A8']].map(([label,val,color])=>`
          <div class="admin-row">
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.6);">${label}</div>
            <div style="font-weight:700;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Alcance push</div>
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="position:relative;width:72px;height:72px;flex-shrink:0;">
            <svg viewBox="0 0 36 36" style="width:72px;height:72px;transform:rotate(-90deg);">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" stroke-width="3"
                stroke-dasharray="${Math.min(88,Math.round((d.totalPush??0)/(d.totalProfiles||1)*88))} 88" stroke-linecap="round"/>
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:white;">
              ${d.totalProfiles>0?Math.round((d.totalPush??0)/d.totalProfiles*100):0}%
            </div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#60a5fa;">${d.totalPush??0}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.5);">de ${d.totalProfiles??0} usuarios</div>
          </div>
        </div>
      </div>
    `;
  }

  else if (tab === 'contenido') {
    const maxPR = Math.max(d.totalPerdidos??0, d.totalRescates??0, 1);
    content.innerHTML = `
      <div class="admin-section-title">Comunidad & Contenido</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('🐾','Adopciones',d.totalAdopciones??0,'#fb923c')}
        ${_kpi('🔍','Perdidos total',d.totalPerdidos??0,'#f472b6')}
        ${_kpi('🔴','Perdidos activos',d.perdidosActivos??0,'#ef4444')}
        ${_kpi('🦸','Rescates',d.totalRescates??0,'#34d399')}
        ${_kpi('📸','Fotos juntos',d.totalFotos??0,'#fbbf24')}
        ${_kpi('⏰','Recordatorios',d.totalRecordatorios??0,'#a78bfa')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Esta semana</div>
        ${[['🐾','Adopciones nuevas',d.adopciones7d,'#fb923c'],['🔍','Mascotas perdidas',d.perdidos7d,'#f472b6'],['🦸','Rescates',d.rescates7d,'#34d399'],['📸','Fotos juntos',d.fotos7d,'#fbbf24']].map(([icon,label,val,color])=>`
          <div class="admin-row">
            <div style="font-size:18px;">${icon}</div>
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.7);">${label}</div>
            <div style="font-weight:800;font-size:16px;color:${color};">${val??0}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Ratio pérdidas vs rescates</div>
        <div style="display:flex;gap:12px;align-items:center;margin-top:4px;">
          <div style="flex:1;">
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Perdidos</div>
            <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:8px;">
              <div style="background:#f472b6;height:8px;border-radius:99px;width:${Math.round((d.totalPerdidos??0)/maxPR*100)}%;"></div>
            </div>
          </div>
          <span style="font-size:12px;color:rgba(255,255,255,0.3);">vs</span>
          <div style="flex:1;">
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Rescates</div>
            <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:8px;">
              <div style="background:#34d399;height:8px;border-radius:99px;width:${Math.round((d.totalRescates??0)/maxPR*100)}%;"></div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;font-weight:700;">
          <span style="color:#f472b6;">🔍 ${d.totalPerdidos??0}</span>
          <span style="color:#34d399;">🦸 ${d.totalRescates??0}</span>
        </div>
      </div>
    `;
  }

  else if (tab === 'negocios') {
    const maxClics = Math.max(...d.rankingNegocios.map(n=>n.total), 1);
    content.innerHTML = `
      <div class="admin-section-title">Negocios & Clics</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('👆','Clics totales',d.totalClicks??0,'#5DD6A8')}
        ${_kpi('📅','Clics (7d)',d.clicks7d??0,'#fbbf24')}
        ${_kpi('📆','Clics (30d)',d.clicks30d??0,'#60a5fa')}
        ${_kpi('🏢','Negocios con clics',d.rankingNegocios.length,'#a78bfa')}
      </div>
      <div class="admin-card" style="margin-bottom:14px;">
        <div class="admin-section-title">Por sección</div>
        ${Object.entries(d.porSeccion).sort((a,b)=>b[1]-a[1]).map(([sec,total])=>{
          const mx=Math.max(...Object.values(d.porSeccion),1);
          const pct=Math.round(total/(d.totalClicks||1)*100);
          return `<div class="admin-row">
            <div style="width:26px;text-align:center;">${seccionIcon[sec]||'📌'}</div>
            <div style="width:80px;font-size:13px;font-weight:600;color:white;text-transform:capitalize;">${sec}</div>
            <div class="admin-bar-wrap"><div class="admin-bar" style="width:${Math.round(total/mx*100)}%;background:linear-gradient(90deg,#7C4DCC,#5DD6A8);"></div></div>
            <div style="min-width:52px;text-align:right;">
              <span style="color:#5DD6A8;font-weight:700;">${total}</span>
              <span style="color:rgba(255,255,255,0.3);font-size:10px;"> (${pct}%)</span>
            </div>
          </div>`;
        }).join('')||'<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin datos</div>'}
      </div>
      <div class="admin-section-title">Top negocios</div>
      ${d.rankingNegocios.slice(0,25).map((n,i)=>`
        <div class="admin-row">
          <div style="width:22px;height:22px;border-radius:6px;background:${i<3?'#7C4DCC':i<10?'rgba(124,77,204,0.3)':'rgba(255,255,255,0.06)'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n.nombre||n.negocio_id}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.35);">${seccionIcon[n.seccion]||''} ${n.seccion}</div>
          </div>
          <div class="admin-bar-wrap" style="max-width:60px;"><div class="admin-bar" style="width:${Math.round(n.total/maxClics*100)}%;background:#5DD6A8;"></div></div>
          <div style="color:#5DD6A8;font-weight:800;font-size:14px;min-width:28px;text-align:right;">${n.total}</div>
        </div>`).join('')||'<div class="admin-card" style="color:rgba(255,255,255,0.3);font-size:13px;">Sin clics aún</div>'}
      ${d.rankingNegocios.length>5?`
        <div class="admin-section-title" style="margin-top:16px;">Menos visitados</div>
        ${d.rankingNegocios.slice(-5).reverse().map(n=>`
          <div class="admin-row" style="opacity:0.7;">
            <div style="font-size:18px;">📉</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:12px;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n.nombre||n.negocio_id}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.3);">${n.seccion}</div>
            </div>
            <div style="color:#f87171;font-weight:700;">${n.total}</div>
          </div>`).join('')}`:''}
    `;
  }

  else if (tab === 'servicios') {
    content.innerHTML = `
      <div class="admin-section-title">Servicios & Paseadores</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('🐕','Solicitudes paseador',d.totalSolicitudes??0,'#34d399')}
        ${_kpi('📍','Paseos registrados',d.totalPaseos??0,'#60a5fa')}
        ${_kpi('🗓️','Solicitudes (7d)',d.solicitudes7d??0,'#fbbf24')}
        ${_kpi('📸','Fotos juntos',d.totalFotos??0,'#f472b6')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Actividad paseadores</div>
        ${[['Solicitudes totales',d.totalSolicitudes??0,'#34d399'],['Esta semana',d.solicitudes7d??0,'#fbbf24'],['Ubicaciones de paseo',d.totalPaseos??0,'#60a5fa']].map(([label,val,color])=>`
          <div class="admin-row">
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.6);">${label}</div>
            <div style="font-weight:700;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Features IA & Creativos</div>
        ${[['📸','Fotos juntos',d.totalFotos??0,'#f472b6'],['⏰','Recordatorios',d.totalRecordatorios??0,'#a78bfa'],['📱','Push suscritos',d.totalPush??0,'#60a5fa']].map(([icon,label,val,color])=>`
          <div class="admin-row">
            <div style="font-size:18px;">${icon}</div>
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.7);">${label}</div>
            <div style="font-weight:800;font-size:16px;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div style="padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">
        Datos en tiempo real · Supabase · ${new Date().toLocaleDateString('es-CL')}
      </div>
    `;
  }
}

function _kpi(icon, label, value, color) {
  return `<div class="admin-kpi">
    <div style="font-size:20px;margin-bottom:6px;">${icon}</div>
    <div style="font-size:24px;font-weight:800;color:${color};">${Number(value).toLocaleString('es-CL')}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">${label}</div>
  </div>`;
}

function _kpiMini(label, value, color) {
  return `<div style="background:#1e1040;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;">
    <div style="font-size:18px;font-weight:800;color:${color};">${Number(value).toLocaleString('es-CL')}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">${label}</div>
  </div>`;
}

function _fmtDate(iso) {
  if (!iso) return '';
  const [,m,d] = iso.split('-');
  return `${d}/${m}`;
}

/* ── Activar admin: URL ?admin=1 o triple-tap en el logo ── */
(function initAdmin() {
  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mostrarAdmin, 500));
  }
  let tapCount = 0, tapTimer = null;
  document.addEventListener('click', e => {
    const logo = e.target.closest('.app-topbar img');
    if (!logo) return;
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 600);
    if (tapCount >= 3) { tapCount = 0; mostrarAdmin(); }
  });
})();
