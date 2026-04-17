/* ══════════════════════════════════════
   RECORDATORIOS DE SALUD — WUFLY
   Vacunas, desparasitación, controles
   ══════════════════════════════════════ */

const REC_KEY = 'wufly_recordatorios_v1';

const tipoConfig = {
  vacuna:          { emoji: '💉', color: '#7C4DCC', bg: '#F0EAFB', label: 'Vacuna' },
  desparasitacion: { emoji: '🐛', color: '#3DAF87', bg: '#E6F9F3', label: 'Desparasitación' },
  control:         { emoji: '🩺', color: '#2563EB', bg: '#EFF6FF', label: 'Control veterinario' },
  medicamento:     { emoji: '💊', color: '#D97706', bg: '#FEF3C7', label: 'Medicamento' },
  grooming:        { emoji: '✂️', color: '#EC4899', bg: '#FDF2F8', label: 'Grooming' },
  otro:            { emoji: '📌', color: '#6B7280', bg: '#F3F4F6', label: 'Otro' },
};

/* ── Storage ── */
function cargarRecordatorios() {
  try {
    const raw = localStorage.getItem(REC_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function guardarRecordatoriosStorage(lista) {
  try { localStorage.setItem(REC_KEY, JSON.stringify(lista)); } catch(e) {}
}

/* ── Render ── */
function renderRecordatorios() {
  const list = document.getElementById('recordatoriosList');
  if (!list) return;

  const lista = cargarRecordatorios().sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  if (lista.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:12px;">📅</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;">Sin recordatorios aún</div>
        <div style="font-size:13px;line-height:1.5;">Agrega vacunas, desparasitaciones y controles para no olvidar nada importante.</div>
      </div>`;
    return;
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  list.innerHTML = lista.map(r => {
    const cfg   = tipoConfig[r.tipo] || tipoConfig.otro;
    const fecha = new Date(r.fecha + 'T12:00:00');
    const diff  = Math.round((fecha - hoy) / 86400000);
    const pasado = diff < 0;

    let estadoBadge;
    if (diff < 0)       estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEE2E2;color:#DC2626;">Vencido hace ${Math.abs(diff)}d</span>`;
    else if (diff === 0) estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEF3C7;color:#D97706;">¡Hoy!</span>`;
    else if (diff <= 7)  estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEF3C7;color:#D97706;">En ${diff} días</span>`;
    else                 estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#F0FFF4;color:#16A34A;">En ${diff} días</span>`;

    const fechaStr = fecha.toLocaleDateString('es-CL', { day:'numeric', month:'long', year:'numeric' });

    return `
    <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid ${pasado ? '#FCA5A5' : 'var(--border)'};padding:14px;margin-bottom:10px;box-shadow:var(--shadow-sm);display:flex;gap:12px;align-items:flex-start;${pasado ? 'opacity:0.75;' : ''}">
      <div style="width:44px;height:44px;min-width:44px;background:${cfg.bg};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">${cfg.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:var(--text);">${escHTMLRec(r.descripcion)}</div>
          ${estadoBadge}
        </div>
        <div style="font-size:12px;font-weight:600;color:${cfg.color};margin-bottom:3px;">${cfg.label}</div>
        <div style="font-size:12px;color:var(--text-muted);">📅 ${fechaStr}</div>
        ${r.notas ? `<div style="font-size:12px;color:var(--text-hint);margin-top:4px;font-style:italic;">${escHTMLRec(r.notas)}</div>` : ''}
      </div>
      <button onclick="eliminarRecordatorio('${r.id}')"
        style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-muted);font-size:14px;">×</button>
    </div>`;
  }).join('');
}

function escHTMLRec(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}

/* ── Form ── */
function abrirFormRecordatorio() {
  const form = document.getElementById('formRecordatorio');
  form.style.display = 'block';
  // Fecha por defecto: hoy
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('recFecha').value = hoy;
  form.scrollIntoView({ behavior: 'smooth' });
}

function cerrarFormRecordatorio() {
  document.getElementById('formRecordatorio').style.display = 'none';
  document.getElementById('recDescripcion').value = '';
  document.getElementById('recNotas').value = '';
}

function guardarRecordatorio() {
  const descripcion = document.getElementById('recDescripcion').value.trim();
  const fecha       = document.getElementById('recFecha').value;

  if (!descripcion) { alert('Por favor ingresa una descripción.'); return; }
  if (!fecha)        { alert('Por favor selecciona una fecha.'); return; }

  const nuevo = {
    id:          'rec_' + Date.now(),
    tipo:        document.getElementById('recTipo').value,
    descripcion,
    fecha,
    notas:       document.getElementById('recNotas').value.trim(),
    creado:      Date.now(),
  };

  const lista = cargarRecordatorios();
  lista.push(nuevo);
  guardarRecordatoriosStorage(lista);
  if (typeof guardarRecordatorioDB === 'function') guardarRecordatorioDB(nuevo);

  cerrarFormRecordatorio();
  renderRecordatorios();
  actualizarBadgeRecordatorios();
}

function eliminarRecordatorio(id) {
  const lista = cargarRecordatorios().filter(r => r.id !== id);
  guardarRecordatoriosStorage(lista);
  if (typeof eliminarRecordatorioDB === 'function') eliminarRecordatorioDB(id);
  renderRecordatorios();
  actualizarBadgeRecordatorios();
}

/* ── Badge en nav: si hay recordatorios próximos (≤7 días) mostrar punto ── */
function actualizarBadgeRecordatorios() {
  const hoy  = new Date(); hoy.setHours(0,0,0,0);
  const lista = cargarRecordatorios();
  const proximos = lista.filter(r => {
    const d = new Date(r.fecha + 'T12:00:00');
    const diff = Math.round((d - hoy) / 86400000);
    return diff >= 0 && diff <= 7;
  });
  const dot = document.getElementById('navDot');
  if (dot) dot.classList.toggle('show', proximos.length > 0);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderRecordatorios();
  actualizarBadgeRecordatorios();
});
