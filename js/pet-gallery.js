/* ══════════════════════════════════════
   PET GALLERY — Wufly
   Galería de mascotas de la comunidad
   Muestra las últimas 16 fotos subidas
   ══════════════════════════════════════ */

const PET_GALLERY_LIMIT = 16;

/* ── Cargar últimas 16 fotos de mascotas desde Supabase ── */
async function cargarFotosMascotas() {
  const container = document.getElementById('pet-gallery-grid');
  if (!container) return;

  try {
    // Token de sesión si existe, si no usar clave anónima (galería pública para todos)
    const SUPABASE_REF = 'ybnacudfqerbzpvqcjzc';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';
    const stored = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF}-auth-token`) || 'null');
    const token = stored?.access_token || SUPABASE_ANON;

    // Llamada REST directa — funciona con y sin sesión
    const url = `https://${SUPABASE_REF}.supabase.co/rest/v1/profiles?select=id,nombre_mascota,tipo_mascota,foto_mascota_url,updated_at&foto_mascota_url=not.is.null&order=updated_at.desc&limit=${PET_GALLERY_LIMIT}`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    console.log('PetGallery: fotos cargadas:', data?.length);

    if (!data || data.length === 0) {
      _ocultarGaleriaSection();
      return;
    }

    _renderGalleryGrid(container, data);
  } catch (err) {
    console.warn('PetGallery: no se pudo cargar:', err.message);
    _ocultarGaleriaSection();
  }
}

/* ── Ocultar la sección si no hay fotos ── */
function _ocultarGaleriaSection() {
  const section = document.getElementById('pet-gallery-section');
  if (section) section.style.display = 'none';
}

/* ── Render del carrusel ── */
function _renderGalleryGrid(container, mascotas) {
  const especieEmoji = { perro: '🐕', gato: '🐈' };
  container.innerHTML = mascotas.map((m, i) => {
    const emoji = especieEmoji[m.tipo_mascota] || '🐾';
    const nombre = m.nombre_mascota || 'Mascota';
    return `
      <div
        class="pet-thumb"
        onclick="_abrirFotoMascota('${_escapar(m.foto_mascota_url)}', '${_escapar(nombre)}', '${emoji}')"
        style="
          position:relative;
          border-radius:14px;
          overflow:hidden;
          aspect-ratio:1/1;
          cursor:pointer;
          background:#EDE9FE;
          box-shadow:0 4px 16px rgba(92,47,168,0.18);
          transition:transform 0.15s, box-shadow 0.15s;
          animation:petThumbIn 0.35s ease both;
          animation-delay:${i * 30}ms;
          flex-shrink:0;
        "
        onmousedown="this.style.transform='scale(0.93)'"
        onmouseup="this.style.transform='scale(1)'"
        ontouchstart="this.style.transform='scale(0.93)'"
        ontouchend="this.style.transform='scale(1)'"
      >
        <img
          src="${_escapar(m.foto_mascota_url)}"
          alt="${_escapar(nombre)}"
          loading="lazy"
          style="
            width:100%;height:100%;
            object-fit:cover;
            display:block;
            transition:opacity 0.3s;
          "
          onerror="this.parentElement.querySelector('.pet-thumb-fallback').style.display='flex';this.style.display='none';"
        >
        <!-- Fallback emoji si la imagen falla -->
        <div class="pet-thumb-fallback" style="
          display:none;
          position:absolute;inset:0;
          align-items:center;justify-content:center;
          font-size:32px;
          background:linear-gradient(135deg,#EDE9FE,#DDD6FE);
        ">${emoji}</div>
        <!-- Badge nombre en hover/tap -->
        <div style="
          position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(transparent, rgba(30,10,70,0.72));
          padding:18px 6px 5px;
          pointer-events:none;
        ">
          <div style="
            font-size:9px;font-weight:700;
            color:rgba(255,255,255,0.92);
            text-align:center;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            text-shadow:0 1px 4px rgba(0,0,0,0.4);
          ">${emoji} ${_escapar(nombre)}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ── Escapa comillas para evitar XSS en atributos onclick ── */
function _escapar(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── Modal lightbox para ver la foto ampliada ── */
function _abrirFotoMascota(url, nombre, emoji) {
  // Eliminar modal anterior si existe
  const prev = document.getElementById('pet-modal-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pet-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.82);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:petModalIn 0.22s ease;
    backdrop-filter:blur(6px);
    -webkit-backdrop-filter:blur(6px);
  `;
  overlay.onclick = (e) => { if (e.target === overlay) _cerrarFotoMascota(); };

  overlay.innerHTML = `
    <div style="
      position:relative;
      max-width:380px;width:100%;
      border-radius:24px;
      overflow:hidden;
      background:#1a0a3c;
      box-shadow:0 24px 64px rgba(0,0,0,0.6);
      animation:petModalCardIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <!-- Foto principal -->
      <div style="position:relative;aspect-ratio:1/1;background:#2d1460;">
        <img
          src="${url}"
          alt="${nombre}"
          style="width:100%;height:100%;object-fit:cover;display:block;"
          onerror="this.style.display='none';document.getElementById('pet-modal-emoji').style.display='flex';"
        >
        <div id="pet-modal-emoji" style="
          display:none;position:absolute;inset:0;
          align-items:center;justify-content:center;
          font-size:72px;background:linear-gradient(135deg,#3b1680,#7C4DCC);
        ">${emoji}</div>
      </div>
      <!-- Pie con nombre -->
      <div style="
        padding:16px 20px 20px;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <div>
          <div style="font-size:18px;font-weight:800;color:white;font-family:'Funnel Display',sans-serif;">
            ${emoji} ${nombre}
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;">Comunidad Wufly 🐾</div>
        </div>
        <button
          onclick="_cerrarFotoMascota()"
          style="
            width:40px;height:40px;border-radius:50%;
            border:none;cursor:pointer;
            background:rgba(255,255,255,0.1);
            color:white;font-size:18px;
            display:flex;align-items:center;justify-content:center;
            transition:background 0.15s;
          "
          onmouseenter="this.style.background='rgba(255,255,255,0.2)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.1)'"
        >✕</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Cerrar con tecla Escape
  const escHandler = (e) => { if (e.key === 'Escape') { _cerrarFotoMascota(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

function _cerrarFotoMascota() {
  const overlay = document.getElementById('pet-modal-overlay');
  if (!overlay) return;
  overlay.style.animation = 'petModalOut 0.18s ease forwards';
  setTimeout(() => overlay.remove(), 180);
}

/* ── CSS de animaciones (inyectado una sola vez) ── */
(function _inyectarCSSGaleria() {
  if (document.getElementById('pet-gallery-css')) return;
  const style = document.createElement('style');
  style.id = 'pet-gallery-css';
  style.textContent = `
    @keyframes petThumbIn {
      from { opacity:0; transform:scale(0.85); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes petModalIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes petModalCardIn {
      from { opacity:0; transform:scale(0.88) translateY(20px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }
    @keyframes petModalOut {
      from { opacity:1; }
      to   { opacity:0; }
    }
    .pet-thumb:hover {
      transform: scale(1.04) !important;
      box-shadow: 0 6px 20px rgba(92,47,168,0.28) !important;
    }
  `;
  document.head.appendChild(style);
})();