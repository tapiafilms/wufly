/* ══════════════════════════════════════
   PERFIL WUFLY — Card deslizable
   Modo lectura / modo edición
   ══════════════════════════════════════ */

const PERFIL_KEY = 'wufly_profile_v1';
let perfilModoEdicion = false;

const saludOpciones = [
  { val: 'Alergia alimentaria',   emoji: '🥣' },
  { val: 'Problemas digestivos',  emoji: '🫁' },
  { val: 'Diabetes',              emoji: '💉' },
  { val: 'Enfermedad renal',      emoji: '🫘' },
  { val: 'Problemas articulares', emoji: '🦴' },
  { val: 'Problemas de piel',     emoji: '🐾' },
  { val: 'Sobrepeso',             emoji: '⚖️' },
  { val: 'Saludable',             emoji: '✅' },
];

const especieEmoji = { perro: '🐕', gato: '🐈', otro: '🐾' };
const edadLabel = { cachorro:'Cachorro', joven:'Joven', adulto:'Adulto', senior:'Senior' };

/* ── Storage ── */
function cargarPerfilLocal() {
  try { const r = localStorage.getItem(PERFIL_KEY); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
}

/* ── Activar modo edición ── */
function activarEdicion() {
  perfilModoEdicion = true;
  const p = cargarPerfilLocal();
  renderCardContenido(p, true);
}

/* ── Guardar y volver a modo lectura ── */
function guardarPerfilEdits() {
  const p = cargarPerfilLocal();
  p.nombre        = document.getElementById('editNombreDueno')?.value.trim()  || p.nombre  || '';
  p.nombreMascota = document.getElementById('editNombreMascota')?.value.trim() || p.nombreMascota || '';
  p.tipomascota   = document.getElementById('editEspecie')?.value  || p.tipomascota || 'perro';
  p.edadmascota   = document.getElementById('editEdad')?.value     || p.edadmascota || 'adulto';
  p.salud = [...document.querySelectorAll('#saludChipsEdit .salud-chip.selected')].map(c => c.dataset.val);
  localStorage.setItem(PERFIL_KEY, JSON.stringify(p));
  if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);

  perfilModoEdicion = false;
  renderPerfilUI(p);

  // Feedback en botón
  const btn = document.getElementById('btnGuardarPerfil');
  if (btn) {
    btn.textContent = '✓ Guardado';
    btn.style.background = 'var(--mint)';
    setTimeout(() => { btn.textContent = 'Guardar cambios'; btn.style.background = ''; }, 1800);
  }
}

/* ── Cancelar edición ── */
function cancelarEdicion() {
  perfilModoEdicion = false;
  renderPerfilUI(cargarPerfilLocal());
}

/* ── Render principal ── */
function renderPerfilUI(p) {
  if (!p) return;

  // Pill nombre mascota
  const pillNombre = document.getElementById('perfilMascotaNombre');
  if (pillNombre) pillNombre.textContent = p.nombreMascota || 'Mi mascota';

  // Nombre dueño
  const nombreDueno = document.getElementById('perfilNombreDueno');
  if (nombreDueno) nombreDueno.textContent = p.nombre ? `Hola, ${p.nombre} 👋` : 'Hola 👋';

  // Subtítulo
  const subtitulo = document.getElementById('perfilSubtitulo');
  if (subtitulo) {
    const nombre = p.nombreMascota || 'tu mascota';
    const especie = especieEmoji[p.tipomascota] || '🐾';
    const edad = edadLabel[p.edadmascota] || '';
    subtitulo.textContent = `${especie} ${nombre}${edad ? ' · ' + edad : ''}`;
  }

  // Badge especie
  const badge = document.getElementById('perfilEspecieBadge');
  if (badge) badge.textContent = especieEmoji[p.tipomascota] || '🐾';

  // Avatar inicial
  const initial = document.getElementById('perfilOwnerInitial');
  if (initial) initial.textContent = p.nombre ? p.nombre.charAt(0).toUpperCase() : '😊';

  // Fotos
  if (p.fotoMascota) {
    const img = document.getElementById('perfilMascotaImg');
    const ph  = document.getElementById('perfilMascotaPlaceholder');
    if (img) { img.src = p.fotoMascota; img.style.display = 'block'; }
    if (ph)  ph.style.display = 'none';
  }
  if (p.fotoDueno) {
    const img  = document.getElementById('perfilOwnerImg');
    const init = document.getElementById('perfilOwnerInitial');
    if (img)  { img.src = p.fotoDueno; img.style.display = 'block'; }
    if (init) init.style.display = 'none';
  }

  // Contenido card según modo
  renderCardContenido(p, perfilModoEdicion);
}

/* ── Render contenido card (lectura o edición) ── */
function renderCardContenido(p, edicion) {
  const wrap = document.getElementById('perfilCardContenido');
  if (!wrap) return;

  if (edicion) {
    // ── MODO EDICIÓN ──
    wrap.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;">

        <div style="background:var(--bg);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;">DUEÑO</div>
          <input type="text" id="editNombreDueno" value="${p.nombre || ''}" placeholder="Tu nombre..."
            style="border:1.5px solid var(--border-md);border-radius:var(--r-xs);padding:10px 12px;font-size:14px;color:var(--text);outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:white;">
        </div>

        <div style="background:var(--bg);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;">MASCOTA</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:11px;font-weight:600;color:var(--text-muted);">NOMBRE</label>
              <input type="text" id="editNombreMascota" value="${p.nombreMascota || ''}" placeholder="Nombre..."
                style="width:100%;margin-top:4px;border:1.5px solid var(--border-md);border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:var(--text);outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:white;">
            </div>
            <div>
              <label style="font-size:11px;font-weight:600;color:var(--text-muted);">ESPECIE</label>
              <select id="editEspecie"
                style="width:100%;margin-top:4px;border:1.5px solid var(--border-md);border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:var(--text);outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:white;">
                <option value="perro" ${p.tipomascota==='perro'?'selected':''}>🐕 Perro</option>
                <option value="gato"  ${p.tipomascota==='gato'?'selected':''}>🐈 Gato</option>
                <option value="otro"  ${p.tipomascota==='otro'?'selected':''}>🐾 Otro</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:11px;font-weight:600;color:var(--text-muted);">EDAD</label>
            <select id="editEdad"
              style="width:100%;margin-top:4px;border:1.5px solid var(--border-md);border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:var(--text);outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:white;">
              <option value="cachorro" ${p.edadmascota==='cachorro'?'selected':''}>🍼 Cachorro — menos de 1 año</option>
              <option value="joven"    ${p.edadmascota==='joven'?'selected':''}>⚡ Joven — 1 a 3 años</option>
              <option value="adulto"   ${p.edadmascota==='adulto'?'selected':''}>🌟 Adulto — 3 a 8 años</option>
              <option value="senior"   ${p.edadmascota==='senior'?'selected':''}>🏅 Senior — más de 8 años</option>
            </select>
          </div>
        </div>

        <div style="background:var(--bg);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;">CONDICIONES DE SALUD</div>
          <div id="saludChipsEdit" style="display:flex;flex-wrap:wrap;gap:8px;">
            ${saludOpciones.map(s => {
              const sel = (p.salud || []).includes(s.val);
              return `<div class="salud-chip ${sel ? 'selected' : ''}" data-val="${s.val}" onclick="toggleSaludChip(this)"
                style="display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;border:1.5px solid;
                ${sel ? 'background:#5DD6A8;color:#1a3a2a;border-color:#5DD6A8;' : 'background:white;color:var(--text-muted);border-color:var(--border-md);'}">
                ${s.emoji} ${s.val}
              </div>`;
            }).join('')}
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:4px;">
          <button class="btn-ghost" onclick="cancelarEdicion()" style="flex:1;">Cancelar</button>
          <button id="btnGuardarPerfil" class="btn-primary" onclick="guardarPerfilEdits()" style="flex:2;">Guardar cambios</button>
        </div>
      </div>`;

  } else {
    // ── MODO LECTURA ──
    const tieneData = p.nombre || p.nombreMascota;
    const salud = (p.salud || []).filter(s => s !== 'Saludable');

    wrap.innerHTML = tieneData ? `
      <div style="display:flex;flex-direction:column;gap:12px;">

        <div style="background:var(--bg);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;">DUEÑO</div>
          </div>
          <div style="font-size:15px;font-weight:600;color:var(--text);">${p.nombre || '—'}</div>
        </div>

        <div style="background:var(--bg);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;">MASCOTA</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:28px;">${especieEmoji[p.tipomascota] || '🐾'}</span>
            <div>
              <div style="font-family:'Funnel Display',sans-serif;font-size:18px;font-weight:700;color:var(--text);">${p.nombreMascota || '—'}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:1px;">${edadLabel[p.edadmascota] || ''}</div>
            </div>
          </div>
        </div>

        ${salud.length > 0 ? `
        <div style="background:var(--bg);border-radius:14px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:8px;">CONDICIONES DE SALUD</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${salud.map(s => {
              const op = saludOpciones.find(x => x.val === s);
              return `<span style="font-size:12px;font-weight:600;padding:5px 12px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${op ? op.emoji : '•'} ${s}</span>`;
            }).join('')}
          </div>
        </div>` : `
        <div style="background:var(--bg);border-radius:14px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:4px;">CONDICIONES DE SALUD</div>
          <div style="font-size:13px;color:var(--text-hint);">✅ Sin condiciones especiales</div>
        </div>`}

      </div>` : `
      <div style="text-align:center;padding:20px;color:var(--text-muted);">
        <div style="font-size:36px;margin-bottom:8px;">🐾</div>
        <div style="font-size:14px;font-weight:600;margin-bottom:4px;">Completa tu perfil</div>
        <div style="font-size:12px;margin-bottom:16px;">La IA usará esta info para personalizar cada consulta</div>
        <button class="btn-primary" onclick="activarEdicion()">Completar perfil</button>
      </div>`;
  }
}

function toggleSaludChip(el) {
  el.classList.toggle('selected');
  const sel = el.classList.contains('selected');
  el.style.background  = sel ? '#5DD6A8' : 'white';
  el.style.color       = sel ? '#1a3a2a' : 'var(--text-muted)';
  el.style.borderColor = sel ? '#5DD6A8' : 'var(--border-md)';
}

/* ══════════════════════════════════
   FOTOS — comprimir + subir + guardar
   ══════════════════════════════════ */

/* Redimensiona y comprime una imagen a máx 900px, devuelve Blob */
function _comprimirImagen(file, maxW = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ev => {
      const src = ev.target.result;
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        let { width, height } = image;
        if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error('canvas.toBlob falló')); return; }
          resolve(blob);
        }, 'image/jpeg', quality);
      };
      image.src = src;
    };
    reader.readAsDataURL(file);
  });
}

/* Toast simple de feedback */
function _fotoToast(msg, tipo = 'ok') {
  let t = document.getElementById('_fotoToast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_fotoToast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;padding:10px 20px;border-radius:100px;font-size:13px;font-weight:700;font-family:"Plus Jakarta Sans",sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:opacity 0.4s;pointer-events:none;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = tipo === 'ok'  ? '#10B981' :
                        tipo === 'err' ? '#EF4444' : '#6366F1';
  t.style.color = 'white';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

/* Guarda dataURL en localStorage con manejo de cuota */
function _guardarFotoLocal(p) {
  try {
    localStorage.setItem(PERFIL_KEY, JSON.stringify(p));
  } catch (e) {
    // Cuota excedida — quitar fotos base64 y reintentar solo con URL
    const pMin = { ...p };
    if (pMin.fotoMascota?.startsWith('data:')) delete pMin.fotoMascota;
    if (pMin.fotoDueno?.startsWith('data:'))  delete pMin.fotoDueno;
    try { localStorage.setItem(PERFIL_KEY, JSON.stringify(pMin)); } catch {}
  }
}

/* Limpia el estado visual del elemento imagen (quita blur/opacidad) */
function _clearImgState(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.style.removeProperty('filter');
  el.style.removeProperty('opacity');
}

async function cargarFotoMascota(input) {
  const f = input.files[0]; if (!f) return;
  input.value = '';

  const p = cargarPerfilLocal();
  _fotoToast('Procesando foto…', 'info');

  // Ocultar placeholder y mostrar img
  const ph = document.getElementById('perfilMascotaPlaceholder');
  if (ph) ph.style.display = 'none';

  // Comprimir
  let blob;
  try { blob = await _comprimirImagen(f, 900, 0.82); }
  catch { blob = f; }

  // Preview local limpio e inmediato (sin blur)
  const localURL = URL.createObjectURL(blob);
  const imgPrev = document.getElementById('perfilMascotaImg');
  if (imgPrev) { imgPrev.src = localURL; imgPrev.style.display = 'block'; imgPrev.style.removeProperty('filter'); imgPrev.style.removeProperty('opacity'); }

  if (typeof currentUser !== 'undefined' && currentUser && typeof subirFotoStorage === 'function') {
    try {
      const blobFile = new File([blob], 'mascota.jpg', { type: 'image/jpeg' });
      const url = await subirFotoStorage(blobFile, 'mascota');
      // Actualizar con URL de Supabase (re-query por ID por si el DOM cambió)
      const imgFinal = document.getElementById('perfilMascotaImg');
      if (imgFinal) { imgFinal.src = url; imgFinal.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
      p.fotoMascota = url;
      _guardarFotoLocal(p);
      if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);
      if (typeof renderHome === 'function') renderHome();
      _fotoToast('¡Foto guardada en la nube! 🐾', 'ok');
    } catch(e) {
      // Error subiendo a Supabase: mostrar foto con blob URL temporal, no guardar base64 en localStorage
      _fotoToast('No se pudo guardar en la nube. La foto se perderá al cerrar la app. 🔁', 'err');
      const imgFb = document.getElementById('perfilMascotaImg');
      if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
      if (typeof renderHome === 'function') renderHome();
    }
  } else {
    // Sin cuenta: foto visible solo en esta sesión (blob URL), no se guarda base64 en localStorage
    const imgFb = document.getElementById('perfilMascotaImg');
    if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
    if (typeof renderHome === 'function') renderHome();
    _fotoToast('Foto visible en esta sesión. Crea una cuenta para guardarla. 🔑', 'info');
  }
}

async function cargarFotoDueno(input) {
  const f = input.files[0]; if (!f) return;
  input.value = '';

  const p = cargarPerfilLocal();
  _fotoToast('Procesando foto…', 'info');

  const init = document.getElementById('perfilOwnerInitial');
  if (init) init.style.display = 'none';

  let blob;
  try { blob = await _comprimirImagen(f, 600, 0.85); }
  catch { blob = f; }

  const localURL = URL.createObjectURL(blob);
  const imgPrev = document.getElementById('perfilOwnerImg');
  if (imgPrev) { imgPrev.src = localURL; imgPrev.style.display = 'block'; imgPrev.style.removeProperty('filter'); imgPrev.style.removeProperty('opacity'); }

  if (typeof currentUser !== 'undefined' && currentUser && typeof subirFotoStorage === 'function') {
    try {
      const blobFile = new File([blob], 'dueno.jpg', { type: 'image/jpeg' });
      const url = await subirFotoStorage(blobFile, 'dueno');
      const imgFinal = document.getElementById('perfilOwnerImg');
      if (imgFinal) { imgFinal.src = url; imgFinal.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
      p.fotoDueno = url;
      _guardarFotoLocal(p);
      if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);
      if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
      _fotoToast('¡Foto de perfil guardada! 😊', 'ok');
    } catch(e) {
      // Error subiendo a Supabase: mostrar foto con blob URL temporal, no guardar base64 en localStorage
      _fotoToast('No se pudo guardar en la nube. La foto se perderá al cerrar la app. 🔁', 'err');
      const imgFb = document.getElementById('perfilOwnerImg');
      if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
      if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
    }
  } else {
    // Sin cuenta: foto visible solo en esta sesión (blob URL), no se guarda base64 en localStorage
    const imgFb = document.getElementById('perfilOwnerImg');
    if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
    if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
    _fotoToast('Foto visible en esta sesión. Crea una cuenta para guardarla. 🔑', 'info');
  }
}

/* ── Nombre mascota en pill ── */
function editarNombreMascota() {
  if (!perfilModoEdicion) { activarEdicion(); return; }
  const pill = document.getElementById('perfilMascotaNombre');
  if (!pill) return;
  const nuevo = prompt('Nombre de tu mascota:', pill.textContent);
  if (nuevo?.trim()) { pill.textContent = nuevo.trim(); }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  const p = cargarPerfilLocal();
  renderPerfilUI(p);
});
