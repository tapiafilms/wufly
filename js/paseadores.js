/* ══════════════════════════════════════
   PASEADORES DE PERROS — WUFLY
   Viña del Mar · Valparaíso · Concón
   Fuente: Supabase → solicitudes_paseador
   ══════════════════════════════════════ */

let paseadoresData   = [];
let paseadoresFilter = 'todos';
let paseadoresLoaded = false;

/* ══ CARGA DESDE SUPABASE ══ */

async function cargarPaseadoresDB() {
  const list = document.getElementById('paseadoresList');
  if (!list) return;

  list.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:12px;color:var(--text-muted);">
      <div style="width:28px;height:28px;border:3px solid var(--purple-light);border-top-color:var(--purple);border-radius:50%;animation:spin 0.7s linear infinite;"></div>
      <span style="font-size:13px;">Cargando paseadores...</span>
    </div>`;

  try {
    const { data, error } = await db
      .from('solicitudes_paseador')
      .select('user_id, nombre, zona, descripcion, tarifa, whatsapp')
      .eq('estado', 'aprobado')
      .order('created_at', { ascending: false });

    if (error) throw error;

    paseadoresData   = data || [];
    paseadoresLoaded = true;
    renderPaseadores();
  } catch (e) {
    console.error('Error cargando paseadores:', e);
    list.innerHTML = `
      <div class="empty-state">
        <div style="font-size:36px">😕</div>
        <p>No se pudo cargar el directorio. Intenta de nuevo.</p>
        <button onclick="cargarPaseadoresDB()" style="margin-top:10px;padding:10px 20px;border-radius:var(--r-xs);border:1.5px solid var(--purple);background:transparent;color:var(--purple);font-weight:700;cursor:pointer;">Reintentar</button>
      </div>`;
  }
}

/* ══ RENDER ══ */

function renderPaseadores() {
  const list = document.getElementById('paseadoresList');
  if (!list) return;

  const q = (document.getElementById('searchPaseadores')?.value || '').toLowerCase().trim();

  const zonaMap = {
    'viña':   ['viña del mar', 'vina del mar', 'viña', 'vina'],
    'valpo':  ['valparaíso', 'valparaiso', 'valpo'],
    'concon': ['concón', 'concon'],
  };

  const filtered = paseadoresData.filter(p => {
    const zona = (p.zona || '').toLowerCase();
    if (paseadoresFilter !== 'todos') {
      const palabras = zonaMap[paseadoresFilter] || [];
      if (!palabras.some(w => zona.includes(w))) return false;
    }
    if (q) {
      const haystack = (p.nombre + ' ' + p.descripcion + ' ' + p.zona).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div style="font-size:36px">🐕</div>
        <p>No hay paseadores en esa zona aún.</p>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(p => _cardPaseador(p)).join('');
}

/* ══ CARD ══ */

function _cardPaseador(p) {
  const wspNum = (p.whatsapp || '').replace(/\D/g, '');
  const wspMsg = encodeURIComponent('Hola ' + (p.nombre || '') + '! Vi tu perfil en Wufly y me gustaría coordinar un paseo para mi perro 🐾');

  const ctaBtn = wspNum
    ? '<a href="https://wa.me/' + wspNum + '?text=' + wspMsg + '" target="_blank" rel="noopener noreferrer"' +
      ' onclick="registrarClick(\'paseador-' + (p.user_id||'') + '\',\'' + _esc(p.nombre) + '\',\'paseadores\')"' +
      ' style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:12px;font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;">' +
      '<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
      'Contactar por WhatsApp</a>'
    : '<div style="margin-top:10px;padding:10px 14px;border-radius:var(--r-xs);background:var(--bg);border:1.5px solid var(--border);font-size:12px;color:var(--text-muted);text-align:center;">Sin contacto disponible</div>';

  const tarifa = p.tarifa
    ? '<div>💰 <strong style="color:var(--text);">Precio:</strong> ' + _esc(p.tarifa) + '</div>'
    : '';

  const desc = p.descripcion
    ? '<div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">' + _esc(p.descripcion) + '</div>'
    : '';

  return '<div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);">' +
    '<div style="display:flex;gap:12px;align-items:flex-start;">' +
    '<div style="width:52px;height:52px;min-width:52px;background:linear-gradient(135deg,var(--purple-light),var(--mint-light));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;border:2px solid var(--border);">🐕</div>' +
    '<div style="flex:1;min-width:0;">' +
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">' +
    '<div style="font-family:\'Funnel Display\',sans-serif;font-weight:700;font-size:17px;color:var(--text);">' + _esc(p.nombre) + '</div>' +
    '<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">✓ Verificado</span>' +
    '</div>' +
    '<div style="font-size:11px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:8px;">PASEADOR · ' + (p.zona || '').toUpperCase() + '</div>' +
    desc +
    '<div style="display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:8px;">' +
    '<div>📍 <strong style="color:var(--text);">Zona:</strong> ' + _esc(p.zona || 'No especificada') + '</div>' +
    tarifa +
    '</div>' +
    ctaBtn +
    '</div></div></div>';
}

function _esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ══ FILTROS ══ */

function setFilterPaseadores(el, val) {
  paseadoresFilter = val;
  document.querySelectorAll('#page-servicios .sub-filter-paseadores .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderPaseadores();
}

function onSearchPaseador() {
  renderPaseadores();
}

/* ══ INIT ══ */

function initPaseadores() {
  if (!paseadoresLoaded) {
    cargarPaseadoresDB();
  } else {
    renderPaseadores();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tab = document.getElementById('ssub-paseadores');
  if (tab && tab.style.display !== 'none') initPaseadores();
});
