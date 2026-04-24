let adoptFilter = 'todos';
let adoptFile = null;

function escHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

async function renderAdopFeed() {
  const feed = document.getElementById('adoptFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let query = db.from('adopciones').select('*').order('created_at', { ascending: false });
  if (adoptFilter !== 'todos') query = query.eq('especie', adoptFilter);

  const { data, error } = await query;

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar publicaciones. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:36px;margin-bottom:8px;">🐾</div>
        <div style="font-size:14px;font-weight:600;margin-bottom:4px;">No hay publicaciones</div>
        <div style="font-size:12px;">¡Sé el primero en publicar!</div>
      </div>`;
    return;
  }

  const iconMap = { perro: '🐕', gato: '🐈', otro: '🐾' };

  feed.innerHTML = data.map(a => {
    const ts = new Date(a.created_at);
    const diasAtras = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const fechaStr = diasAtras === 0 ? 'Hoy' : diasAtras === 1 ? 'Ayer' : `Hace ${diasAtras} días`;
    const fotoHtml = a.foto_url
      ? `<img src="${escHTML(a.foto_url)}" alt="${escHTML(a.nombre)}" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;">`
      : `<div style="width:100%;height:120px;background:var(--purple-light);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:52px;">${iconMap[a.especie] || '🐾'}</div>`;
    const wspClean = (a.wsp || '').replace(/\D/g, '');
    return `
      <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);overflow:hidden;box-shadow:var(--shadow-sm);">
        ${fotoHtml}
        <div style="padding:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${escHTML(a.nombre)}</div>
            <span style="font-size:10px;color:var(--text-hint);">${escHTML(fechaStr)}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${iconMap[a.especie] || '🐾'} ${escHTML((a.especie||'').charAt(0).toUpperCase()+(a.especie||'').slice(1))}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${escHTML(a.edad)}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${escHTML(a.tamano)}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:rgba(0,0,0,0.05);color:var(--text-muted);">📍 ${escHTML(a.ciudad)}</span>
          </div>
          <p style="font-size:13px;color:var(--text-muted);line-height:1.55;margin-bottom:12px;">${escHTML(a.descripcion)}</p>
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
  document.querySelectorAll('#csub-adoptar .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderAdopFeed();
}

function mostrarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'block';
  document.getElementById('btnPublicar').style.display = 'none';
  document.getElementById('formAdopcion').scrollIntoView({ behavior: 'smooth' });

  const zone = document.getElementById('adoptUploadZone');
  const input = document.getElementById('adoptFileInput');
  zone.onclick = () => input.click();
  input.onchange = function(e) {
    const f = e.target.files[0];
    if (!f) return;
    adoptFile = f;
    const img = document.getElementById('adoptPreviewImg');
    img.src = URL.createObjectURL(f);
    img.style.display = 'block';
    const p = zone.querySelector('p');
    if (p) p.textContent = 'Toca para cambiar';
  };
}

function ocultarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'none';
  document.getElementById('btnPublicar').style.display = 'flex';
  adoptFile = null;
}

async function publicarAdopcion() {
  if (!currentUser) { abrirAuthModal('login'); return; }

  const nombre = document.getElementById('adoptNombre').value.trim();
  const wsp    = document.getElementById('adoptWsp').value.trim();

  if (!nombre || nombre.length < 2) { alert('Por favor ingresa el nombre de la mascota (mínimo 2 caracteres).'); return; }
  if (!wsp) { alert('Por favor ingresa un número de WhatsApp para contacto.'); return; }
  if (!/^\+?\d{7,15}$/.test(wsp.replace(/[\s\-()]/g, ''))) {
    alert('Ingresa un número de WhatsApp válido, ej: +56912345678'); return;
  }

  const btn = document.getElementById('adoptBtnPublicar');
  if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

  const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

  let foto_url = null;
  if (adoptFile) {
    try { foto_url = await Promise.race([subirFotoComunidad(adoptFile, 'adopciones'), _timeout(10000)]); }
    catch { /* continuar sin foto */ }
  }

  const payload = {
    user_id:     currentUser?.id || null,
    nombre,
    especie:     document.getElementById('adoptEspecie').value,
    edad:        document.getElementById('adoptEdad').value,
    tamano:      document.getElementById('adoptTamano').value,
    descripcion: document.getElementById('adoptDesc').value.trim() || 'Mascota en busca de un hogar lleno de amor.',
    wsp,
    ciudad:      document.getElementById('adoptCiudad').value,
    foto_url,
  };

  // Leer token desde localStorage sin hacer llamada de red
  let token = SUPABASE_ANON;
  try {
    const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
    const stored = JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null');
    if (stored?.access_token) token = stored.access_token;
  } catch {}

  let error;
  try {
    const res = await Promise.race([
      fetch(`${SUPABASE_URL}/rest/v1/adopciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${token}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(payload),
      }),
      _timeout(10000),
    ]);
    if (!res.ok) {
      const txt = await res.text();
      error = new Error(`HTTP ${res.status}: ${txt}`);
    }
  } catch (e) { error = e; }

  if (btn) { btn.disabled = false; btn.textContent = 'Publicar'; }

  if (error) { console.error('[adoptar]', error); alert('Error: ' + error.message); return; }

  ocultarFormAdopcion();
  document.getElementById('adoptNombre').value = '';
  document.getElementById('adoptDesc').value = '';
  document.getElementById('adoptWsp').value = '';
  const prev = document.getElementById('adoptPreviewImg');
  if (prev) { prev.style.display = 'none'; prev.src = ''; }
  adoptFile = null;
  renderAdopFeed();
}

function renderAdoptar() { renderAdopFeed(); }

document.addEventListener('DOMContentLoaded', () => { renderAdopFeed(); });
