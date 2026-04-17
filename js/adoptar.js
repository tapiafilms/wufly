/* ══════════════════════════════════════
   ADOPTAR — Feed dinámico con localStorage
   ══════════════════════════════════════ */

const ADOPTAR_KEY = 'wufly_adopciones_v1';
let adoptFilter = 'todos';
let adoptImgB64 = null;

/* ── Escapar HTML para prevenir XSS ── */
function escHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ── Datos de ejemplo iniciales ── */
const adoptEjemplos = [
  {
    id: 'demo1',
    nombre: 'Luna',
    especie: 'gato',
    edad: 'Adulto',
    tamano: 'Pequeño',
    desc: 'Luna es una gata super cariñosa y tranquila. Se lleva bien con niños y es perfecta para departamento. Fue rescatada de la calle y ya está vacunada y esterilizada.',
    wsp: '+56912345678',
    ciudad: 'Viña del Mar',
    foto: null,
    fecha: Date.now() - 86400000 * 2,
  },
  {
    id: 'demo2',
    nombre: 'Nico',
    especie: 'perro',
    edad: 'Joven',
    tamano: 'Mediano',
    desc: 'Nico tiene 2 años, es muy activo y le encanta jugar. Ideal para familia con espacio o acceso a parques. Ya está vacunado y desparasitado. Busca hogar con amor.',
    wsp: '+56987654321',
    ciudad: 'Valparaíso',
    foto: null,
    fecha: Date.now() - 86400000 * 5,
  },
  {
    id: 'demo3',
    nombre: 'Coco',
    especie: 'perro',
    edad: 'Senior',
    tamano: 'Grande',
    desc: 'Coco es un labrador de 9 años muy tranquilo y obediente. Su dueño falleció y necesita un nuevo hogar con amor. Es perfecto para familia o persona mayor que quiera compañía.',
    wsp: '+56911223344',
    ciudad: 'Concón',
    foto: null,
    fecha: Date.now() - 86400000 * 1,
  },
];

/* ── Cargar publicaciones ── */
function cargarAdopciones() {
  try {
    const raw = localStorage.getItem(ADOPTAR_KEY);
    return raw ? JSON.parse(raw) : adoptEjemplos;
  } catch { return adoptEjemplos; }
}

function guardarAdopciones(lista) {
  try {
    localStorage.setItem(ADOPTAR_KEY, JSON.stringify(lista));
  } catch (e) { console.error('Error guardando:', e); }
}

/* ── Inicializar con ejemplos si no hay datos ── */
function initAdopciones() {
  const existing = localStorage.getItem(ADOPTAR_KEY);
  if (!existing) {
    guardarAdopciones(adoptEjemplos);
  }
}

/* ── Render del feed ── */
function renderAdopFeed() {
  const feed = document.getElementById('adoptFeed');
  if (!feed) return;

  const lista = cargarAdopciones();
  const filtered = lista.filter(a =>
    adoptFilter === 'todos' || a.especie === adoptFilter
  );

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:36px;margin-bottom:8px;">🐾</div>
        <div style="font-size:14px;font-weight:600;margin-bottom:4px;">No hay publicaciones</div>
        <div style="font-size:12px;">¡Sé el primero en publicar!</div>
      </div>`;
    return;
  }

  const iconMap = { perro: '🐕', gato: '🐈', otro: '🐾' };

  feed.innerHTML = filtered
    .sort((a, b) => b.fecha - a.fecha)
    .map(a => {
      const diasAtras = Math.floor((Date.now() - a.fecha) / 86400000);
      const fechaStr = diasAtras === 0 ? 'Hoy' : diasAtras === 1 ? 'Ayer' : `Hace ${diasAtras} días`;
      const fotoHtml = a.foto
        ? `<img src="${escHTML(a.foto)}" alt="${escHTML(a.nombre)}" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;">`
        : `<div style="width:100%;height:120px;background:var(--purple-light);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:52px;">${iconMap[a.especie] || '🐾'}</div>`;

      const wspClean = a.wsp.replace(/\D/g, '');

      return `
        <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);overflow:hidden;box-shadow:var(--shadow-sm);">
          ${fotoHtml}
          <div style="padding:14px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${escHTML(a.nombre)}</div>
              <span style="font-size:10px;color:var(--text-hint);">${escHTML(fechaStr)}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
              <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${iconMap[a.especie]} ${escHTML(a.especie.charAt(0).toUpperCase() + a.especie.slice(1))}</span>
              <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${escHTML(a.edad)}</span>
              <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${escHTML(a.tamano)}</span>
              <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:rgba(0,0,0,0.05);color:var(--text-muted);">📍 ${escHTML(a.ciudad)}</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);line-height:1.55;margin-bottom:12px;">${escHTML(a.desc)}</p>
            <a href="https://wa.me/${encodeURIComponent(wspClean)}" target="_blank" rel="noopener noreferrer"
               style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>`;
    }).join('');
}

function setFilterAdopcion(el, val) {
  adoptFilter = val;
  document.querySelectorAll('#page-asistente .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderAdopFeed();
}

/* ── Formulario ── */
function mostrarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'block';
  document.getElementById('btnPublicar').style.display = 'none';
  document.getElementById('formAdopcion').scrollIntoView({ behavior: 'smooth' });

  document.getElementById('adoptUploadZone').onclick = () => document.getElementById('adoptFileInput').click();
  document.getElementById('adoptFileInput').addEventListener('change', function(e) {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      adoptImgB64 = ev.target.result;
      const img = document.getElementById('adoptPreviewImg');
      img.src = adoptImgB64;
      img.style.display = 'block';
      document.querySelector('#adoptUploadZone p').textContent = 'Toca para cambiar';
    };
    r.readAsDataURL(f);
  });
}

function ocultarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'none';
  document.getElementById('btnPublicar').style.display = 'flex';
  adoptImgB64 = null;
}

function publicarAdopcion() {
  const nombre = document.getElementById('adoptNombre').value.trim();
  const wsp    = document.getElementById('adoptWsp').value.trim();

  if (!nombre || nombre.length < 2) { alert('Por favor ingresa el nombre de la mascota (mínimo 2 caracteres).'); return; }
  if (!wsp) { alert('Por favor ingresa un número de WhatsApp para contacto.'); return; }
  if (!/^\+?\d{7,15}$/.test(wsp.replace(/[\s\-()]/g, ''))) {
    alert('Ingresa un número de WhatsApp válido, ej: +56912345678'); return;
  }

  const nueva = {
    id:      'pub_' + Date.now(),
    nombre,
    especie: document.getElementById('adoptEspecie').value,
    edad:    document.getElementById('adoptEdad').value,
    tamano:  document.getElementById('adoptTamano').value,
    desc:    document.getElementById('adoptDesc').value.trim() || 'Mascota en busca de un hogar lleno de amor.',
    wsp,
    ciudad:  document.getElementById('adoptCiudad').value,
    foto:    adoptImgB64,
    fecha:   Date.now(),
  };

  const lista = cargarAdopciones();
  lista.unshift(nueva);
  guardarAdopciones(lista);

  ocultarFormAdopcion();
  renderAdopFeed();

  // Limpiar form
  document.getElementById('adoptNombre').value = '';
  document.getElementById('adoptDesc').value = '';
  document.getElementById('adoptWsp').value = '';
  document.getElementById('adoptPreviewImg').style.display = 'none';
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initAdopciones();
  renderAdopFeed();
});
