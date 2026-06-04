/* ══════════════════════════════════════
   PASEADORES DE PERROS — WUFLY
   Viña del Mar · Valparaíso · Concón
   ══════════════════════════════════════ */

let paseadoresData   = [];
let paseadoresFilter = 'todos';
let paseadoresLoaded = false;

/* ══ DATOS DEMO ══ */

const PASEADORES_DEMO = [
  {
    _demo: true,
    user_id: 'demo-1',
    nombre: 'Camila Rojas Fuentes',
    rut: '18.432.901-5',
    telefono: '+56 9 8821 4430',
    email: 'camila.rojas@gmail.com',
    foto: 'https://i.pravatar.cc/150?u=camila-rojas-wufly',
    zona: 'Viña del Mar',
    descripcion: 'Amante de los animales desde pequeña. 4 años de experiencia paseando perros de todas las razas. Zona de cobertura: Miraflores, Reñaca y Recreo.',
    tarifa: '$5.000 por 45 min',
    whatsapp: '56988214430',
  },
  {
    _demo: true,
    user_id: 'demo-2',
    nombre: 'Matías Contreras López',
    rut: '17.209.654-K',
    telefono: '+56 9 7743 0091',
    email: 'matias.contreras@outlook.com',
    foto: 'https://i.pravatar.cc/150?u=matias-contreras-wufly',
    zona: 'Valparaíso',
    descripcion: 'Técnico veterinario titulado. Ofrezco paseos individuales y grupales. Experto en razas grandes y activas. Cubro cerros de Valparaíso y plan.',
    tarifa: '$6.000 por 1 hora',
    whatsapp: '56977430091',
  },
  {
    _demo: true,
    user_id: 'demo-3',
    nombre: 'Valentina Soto Araya',
    rut: '19.876.123-2',
    telefono: '+56 9 9012 7756',
    email: 'valen.soto.paseos@gmail.com',
    foto: 'https://i.pravatar.cc/150?u=valentina-soto-wufly',
    zona: 'Concón',
    descripcion: 'Vivo en Concón y conozco todos sus senderos. Paseos en playa y parques. Atiendo hasta 3 perros a la vez. Envío fotos durante el paseo.',
    tarifa: '$4.500 por 45 min',
    whatsapp: '56990127756',
  },
  {
    _demo: true,
    user_id: 'demo-4',
    nombre: 'Ignacio Pérez Molina',
    rut: '16.543.210-7',
    telefono: '+56 9 6654 3322',
    email: 'nachopaseos@gmail.com',
    foto: 'https://i.pravatar.cc/150?u=ignacio-perez-wufly',
    zona: 'Viña del Mar',
    descripcion: 'Estudiante de medicina veterinaria. Paseos matutinos y vespertinos en Villa Independencia, Los Almendros y sector Gómez Carreño.',
    tarifa: '$4.000 por 40 min',
    whatsapp: '56966543322',
  },
  {
    _demo: true,
    user_id: 'demo-5',
    nombre: 'Daniela Herrera Vega',
    rut: '20.112.543-9',
    telefono: '+56 9 8190 6643',
    email: 'dani.herrera.pets@gmail.com',
    foto: 'https://i.pravatar.cc/150?u=daniela-herrera-wufly',
    zona: 'Viña del Mar',
    descripcion: '3 años de experiencia. Me especializo en perros tímidos o con ansiedad. Zona Agua Santa, Forestal y centro de Viña. Siempre con fotos y actualizaciones.',
    tarifa: '$5.500 por 1 hora',
    whatsapp: '56981906643',
  },
];

/* ══ CARGA DESDE SUPABASE ══ */

async function cargarPaseadoresDB() {
  const list = document.getElementById('paseadoresList');
  if (!list) return;

  list.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:12px;color:var(--text-muted);"><div style="width:28px;height:28px;border:3px solid var(--purple-light);border-top-color:var(--purple);border-radius:50%;animation:spin 0.7s linear infinite;"></div><span style="font-size:13px;">Cargando paseadores...</span></div>';

  // Mostrar demos inmediatamente mientras carga la DB
  paseadoresData   = [...PASEADORES_DEMO];
  paseadoresLoaded = true;
  renderPaseadores();

  // Luego intentar cargar desde DB en background
  try {
    const SUPABASE_URL  = 'https://ybnacudfqerbzpvqcjzc.supabase.co';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';
    const ref    = 'ybnacudfqerbzpvqcjzc';
    const stored = (() => { try { return JSON.parse(localStorage.getItem('sb-' + ref + '-auth-token') || 'null'); } catch { return null; } })();
    const token  = stored?.access_token || SUPABASE_ANON;

    const url = SUPABASE_URL + '/rest/v1/solicitudes_paseador?select=user_id,nombre,rut,telefono,email,foto,zona,descripcion,tarifa,whatsapp&estado=eq.aprobado&order=created_at.desc';
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': 'Bearer ' + token,
      }
    });
    if (res.ok) {
      const dbData = await res.json();
      console.log('Paseadores DB:', dbData.length);
      if (dbData.length > 0) {
        paseadoresData = [...dbData, ...PASEADORES_DEMO];
        renderPaseadores();
      }
    }
  } catch (e) {
    console.warn('Paseadores DB no disponible:', e.message);
  }
}

/* ══ RENDER LISTA ══ */

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
    list.innerHTML = '<div class="empty-state"><div style="font-size:36px">🐕</div><p>No hay paseadores en esa zona aún.</p></div>';
    return;
  }

  list.innerHTML = filtered.map(p => _cardPaseador(p)).join('');
}

/* ══ CARD ══ */

function _cardPaseador(p) {
  const uid = _esc(p.user_id);
  const fotoInner = p.foto
    ? '<img src="' + _esc(p.foto) + '" alt="' + _esc(p.nombre) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<span style=\\\'font-size:26px;\\\'>🐕</span>\'">'
    : '<span style="font-size:26px;">🐕</span>';

  const tarifa = p.tarifa
    ? '<div style="font-size:12px;color:var(--text-muted);margin-top:3px;">💰 ' + _esc(p.tarifa) + '</div>'
    : '';

  const desc = p.descripcion
    ? '<div style="font-size:12px;color:var(--text-muted);line-height:1.45;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + _esc(p.descripcion) + '</div>'
    : '';

  return '<div onclick="abrirDetallePaseador(\'' + uid + '\')" style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);cursor:pointer;transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow=\'0 4px 18px rgba(124,77,204,0.13)\'" onmouseout="this.style.boxShadow=\'var(--shadow-sm)\'">'
    + '<div style="display:flex;gap:12px;align-items:flex-start;">'
    + '<div style="width:54px;height:54px;min-width:54px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,var(--purple-light),var(--mint-light));display:flex;align-items:center;justify-content:center;border:2px solid var(--border);">' + fotoInner + '</div>'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:1px;">'
    + '<div style="font-family:\'Funnel Display\',sans-serif;font-weight:700;font-size:16px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + _esc(p.nombre) + '</div>'
    + '<span style="flex-shrink:0;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">✓ Verificado</span>'
    + '</div>'
    + '<div style="font-size:11px;font-weight:700;color:var(--text-hint);letter-spacing:0.04em;margin-bottom:4px;">📍 ' + _esc(p.zona || 'Sin zona') + '</div>'
    + desc + tarifa
    + '</div>'
    + '<div style="flex-shrink:0;align-self:center;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--text-hint);fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><polyline points="9 18 15 12 9 6"/></svg></div>'
    + '</div></div>';
}

/* ══ MODAL DETALLE ══ */

function abrirDetallePaseador(userId) {
  const p = paseadoresData.find(x => x.user_id === userId);
  if (!p) return;

  const modal = document.getElementById('detallePaseadorModal');
  const body  = document.getElementById('detallePaseadorBody');
  if (!modal || !body) return;

  const wspNum = (p.whatsapp || '').replace(/\D/g, '');
  const wspMsg = encodeURIComponent('Hola ' + (p.nombre || '') + '! Vi tu perfil en Wufly y me gustaría coordinar un paseo para mi perro 🐾');

  const fotoHtml = p.foto
    ? '<img src="' + _esc(p.foto) + '" alt="' + _esc(p.nombre) + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid white;box-shadow:0 4px 14px rgba(0,0,0,0.2);" onerror="this.style.display=\'none\'">'
    : '<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:36px;border:3px solid white;">🐕</div>';

  const ctaBtn = wspNum
    ? '<a href="https://wa.me/' + wspNum + '?text=' + wspMsg + '" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:14px;font-size:14px;font-weight:700;text-decoration:none;width:100%;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Contactar por WhatsApp</a>'
    : '<div style="padding:12px;border-radius:var(--r-xs);background:var(--bg);border:1.5px solid var(--border);font-size:12px;color:var(--text-muted);text-align:center;">Sin WhatsApp disponible</div>';

  const filaContacto = (icono, label, valor) => valor
    ? '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;border:1.5px solid var(--border);"><span style="font-size:18px;">' + icono + '</span><div><div style="font-size:11px;color:var(--text-muted);font-weight:600;">' + label + '</div><div style="font-size:14px;font-weight:700;color:var(--text);">' + _esc(valor) + '</div></div></div>'
    : '';

  body.innerHTML =
    '<div style="background:linear-gradient(135deg,#5C2FA8,#7C4DCC);padding:28px 20px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;">'
    + fotoHtml
    + '<div style="text-align:center;">'
    + '<div style="font-family:\'Funnel Display\',sans-serif;font-weight:800;font-size:20px;color:white;">' + _esc(p.nombre) + '</div>'
    + '<div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px;">📍 ' + _esc(p.zona || 'Sin zona') + '</div>'
    + '<span style="display:inline-block;margin-top:6px;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">✓ Verificado</span>'
    + '</div></div>'
    + '<div style="padding:20px 20px 0;display:flex;flex-direction:column;gap:10px;">'
    + '<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:2px;">DATOS DE CONTACTO</div>'
    + filaContacto('📞', 'Teléfono', p.telefono)
    + filaContacto('✉️', 'Correo', p.email)
    + filaContacto('🪪', 'RUT', p.rut)
    + filaContacto('💰', 'Tarifa', p.tarifa)
    + (p.descripcion ? '<div style="padding:12px 14px;background:var(--purple-light);border-radius:10px;border:1.5px solid rgba(124,77,204,0.2);margin-top:2px;"><div style="font-size:11px;font-weight:700;color:var(--purple);letter-spacing:0.06em;margin-bottom:6px;">SOBRE MÍ</div><div style="font-size:13px;color:var(--text);line-height:1.6;">' + _esc(p.descripcion) + '</div></div>' : '')
    + '<div style="margin-top:4px;margin-bottom:8px;">' + ctaBtn + '</div>'
    + '</div>';

  // Inyectar CSS de animación una sola vez
  if (!document.getElementById('paseador-modal-css')) {
    const s = document.createElement('style');
    s.id = 'paseador-modal-css';
    s.textContent = `
      @keyframes paseadorSlideUp {
        0%   { transform: translateY(100%); opacity: 0; }
        60%  { transform: translateY(-8px); opacity: 1; }
        80%  { transform: translateY(4px); }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes paseadorSlideDown {
        0%   { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(110%); opacity: 0; }
      }
      @keyframes paseadorFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes paseadorFadeOut {
        from { opacity: 1; }
        to   { opacity: 0; }
      }
      #detallePaseadorModal .modal-sheet.entering {
        animation: paseadorSlideUp 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      }
      #detallePaseadorModal .modal-sheet.closing {
        animation: paseadorSlideDown 0.28s ease-in forwards;
      }
      #detallePaseadorModal.closing {
        animation: paseadorFadeOut 0.28s ease forwards;
      }
    `;
    document.head.appendChild(s);
  }

  modal.style.display = 'flex';
  modal.style.animation = 'paseadorFadeIn 0.25s ease forwards';

  // Reiniciar animación de entrada quitando y volviendo a poner la clase
  const sheet = modal.querySelector('.modal-sheet');
  if (sheet) {
    sheet.classList.remove('entering', 'closing');
    void sheet.offsetWidth; // forzar reflow
    sheet.classList.add('entering');
  }

  document.body.style.overflow = 'hidden';
}

function cerrarDetallePaseador() {
  const modal = document.getElementById('detallePaseadorModal');
  if (!modal) return;

  const sheet = modal.querySelector('.modal-sheet');
  if (sheet) sheet.classList.add('closing');
  modal.classList.add('closing');

  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('closing');
    if (sheet) sheet.classList.remove('closing');
    document.body.style.overflow = '';
  }, 280);
}

/* ══ FILTROS ══ */

function setFilterPaseadores(el, val) {
  paseadoresFilter = val;
  document.querySelectorAll('#page-servicios .sub-filter-paseadores .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderPaseadores();
}

// onSearchPaseador se declara en app.js (con debounce)

/* ══ UTIL ══ */

function _esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ══ INIT ══ */

function initPaseadores() {
  if (!paseadoresLoaded) cargarPaseadoresDB();
  else renderPaseadores();
}

document.addEventListener('DOMContentLoaded', () => {
  const tab = document.getElementById('ssub-paseadores');
  if (tab && tab.style.display !== 'none') initPaseadores();
});