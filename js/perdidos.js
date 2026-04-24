let rescateFile = null;
let perdidoFile = null;

function escHTMLPerdidos(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const iconMapP = { perro: '🐕', gato: '🐈', otro: '🐾' };

function toggleFormPerdido() {
  const form = document.getElementById('formPerdido');
  const visible = form.style.display !== 'none';
  form.style.display = visible ? 'none' : 'block';
  document.getElementById('btnPublicarPerdido').style.display = visible ? 'flex' : 'none';
  if (!visible) {
    document.getElementById('perdidoFecha').value = new Date().toISOString().split('T')[0];
    const zone = document.getElementById('perdidoUploadZone');
    const input = document.getElementById('perdidoFileInput');
    zone.onclick = () => input.click();
    input.onchange = function(e) {
      const f = e.target.files[0]; if (!f) return;
      perdidoFile = f;
      const img = document.getElementById('perdidoPreviewImg');
      img.src = URL.createObjectURL(f); img.style.display = 'block';
      const p = zone.querySelector('p'); if (p) p.textContent = 'Toca para cambiar';
    };
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleFormRescate() {
  const form = document.getElementById('formRescate');
  const visible = form.style.display !== 'none';
  form.style.display = visible ? 'none' : 'block';
  document.getElementById('btnPublicarRescate').style.display = visible ? 'flex' : 'none';
  if (!visible) {
    const zone = document.getElementById('rescateUploadZone');
    const input = document.getElementById('rescateFileInput');
    zone.onclick = () => input.click();
    input.onchange = function(e) {
      const f = e.target.files[0]; if (!f) return;
      rescateFile = f;
      const img = document.getElementById('rescatePreviewImg');
      img.src = URL.createObjectURL(f); img.style.display = 'block';
      const p = zone.querySelector('p'); if (p) p.textContent = 'Toca para cambiar';
    };
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

async function publicarPerdido(tipo) {
  if (!currentUser) { abrirAuthModal('login'); return; }
  if (tipo === 'perdido') {
    const desc = document.getElementById('perdidoDesc').value.trim();
    const ubic = document.getElementById('perdidoUbicacion').value.trim();
    const wsp  = document.getElementById('perdidoWsp').value.trim();
    if (!desc || desc.length < 10) { alert('Por favor describe la mascota con más detalle (mínimo 10 caracteres).'); return; }
    if (!ubic || ubic.length < 5)  { alert('Por favor indica la ubicación (mínimo 5 caracteres).'); return; }
    if (!wsp)  { alert('Por favor ingresa un WhatsApp de contacto.'); return; }
    if (!/^\+?\d{7,15}$/.test(wsp.replace(/[\s\-()]/g, ''))) {
      alert('Ingresa un número de WhatsApp válido, ej: +56912345678'); return;
    }

    const btn = document.getElementById('btnPublicarPerdido');
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

    const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

    let foto_url = null;
    if (perdidoFile) {
      try { foto_url = await Promise.race([subirFotoComunidad(perdidoFile, 'perdidos'), _timeout(10000)]); }
      catch { /* continuar sin foto */ }
    }

    const fechaVal = document.getElementById('perdidoFecha').value;
    let error;
    try {
      const res = await Promise.race([
        fetch(`${SUPABASE_URL}/rest/v1/perdidos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}`, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ user_id: currentUser?.id || null, especie: document.getElementById('perdidoEspecie').value, descripcion: desc, ubicacion: ubic, fecha_extravio: fechaVal || null, wsp, foto_url }),
        }),
        _timeout(10000),
      ]);
      if (!res.ok) { const t = await res.text(); error = new Error(`HTTP ${res.status}: ${t}`); }
    } catch (e) { error = e; }

    if (btn) { btn.disabled = false; btn.textContent = 'Publicar reporte'; }
    if (error) { console.error('[perdidos]', error); alert('Error: ' + error.message); return; }

    toggleFormPerdido();
    document.getElementById('perdidoDesc').value = '';
    document.getElementById('perdidoWsp').value = '';
    document.getElementById('perdidoUbicacion').value = '';
    const prev = document.getElementById('perdidoPreviewImg');
    if (prev) { prev.style.display = 'none'; prev.src = ''; }
    perdidoFile = null;
    renderPerdidoFeed();

  } else {
    const desc = document.getElementById('rescateDesc').value.trim();
    const ubic = document.getElementById('rescateUbicacion').value.trim();
    if (!desc || desc.length < 10) { alert('Por favor describe el animal con más detalle (mínimo 10 caracteres).'); return; }
    if (!ubic || ubic.length < 5)  { alert('Por favor indica la ubicación exacta (mínimo 5 caracteres).'); return; }

    const btn = document.getElementById('btnPublicarRescate');
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

    const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

    let foto_url = null;
    if (rescateFile) {
      try { foto_url = await Promise.race([subirFotoComunidad(rescateFile, 'rescates'), _timeout(10000)]); }
      catch { /* continuar sin foto */ }
    }

    let error;
    try {
      const res = await Promise.race([
        fetch(`${SUPABASE_URL}/rest/v1/rescates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}`, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ user_id: currentUser?.id || null, especie: document.getElementById('rescateEspecie').value, descripcion: desc, ubicacion: ubic, foto_url, estado: 'esperando' }),
        }),
        _timeout(10000),
      ]);
      if (!res.ok) { const t = await res.text(); error = new Error(`HTTP ${res.status}: ${t}`); }
    } catch (e) { error = e; }

    if (btn) { btn.disabled = false; btn.textContent = 'Publicar alerta'; }
    if (error) { console.error('[rescate]', error); alert('Error: ' + error.message); return; }

    toggleFormRescate();
    document.getElementById('rescateDesc').value = '';
    document.getElementById('rescateUbicacion').value = '';
    const prev = document.getElementById('rescatePreviewImg');
    if (prev) { prev.style.display = 'none'; prev.src = ''; }
    rescateFile = null;
    renderRescateFeed();
  }
}

async function marcarRescatado(id) {
  const { error } = await db.from('rescates').update({ estado: 'rescatado' }).eq('id', id);
  if (error) { alert('No se pudo actualizar el estado.'); return; }
  renderRescateFeed();
}

function _sbToken() {
  try {
    const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
    const s = JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null');
    return s?.access_token || SUPABASE_ANON;
  } catch { return SUPABASE_ANON; }
}

async function renderPerdidoFeed() {
  const feed = document.getElementById('perdidoFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let data, error;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/perdidos?select=*&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) { error = e; }

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar reportes. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);"><div style="font-size:32px;margin-bottom:8px;">🔍</div><div style="font-size:13px;">No hay mascotas perdidas reportadas</div></div>`;
    return;
  }

  feed.innerHTML = data.map(p => {
    const ts = new Date(p.created_at);
    const dias = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const horas = Math.max(1, Math.floor((Date.now() - ts.getTime()) / 3600000));
    const tiempo = dias === 0 ? `Hace ${horas}h` : dias === 1 ? 'Ayer' : `Hace ${dias} días`;
    const fechaStr = p.fecha_extravio
      ? new Date(p.fecha_extravio + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })
      : '';
    const fotoHtml = p.foto_url
      ? `<img src="${escHTMLPerdidos(p.foto_url)}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;">`
      : `<div style="width:100%;height:90px;background:linear-gradient(135deg,#FAF0EE,#FEF3E8);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:44px;">${iconMapP[p.especie] || '🐾'}</div>`;
    const wspClean = (p.wsp || '').replace(/\D/g, '');
    return `<div style="background:var(--surface);border-radius:var(--r);border:1.5px solid rgba(215,137,127,0.25);overflow:hidden;box-shadow:var(--shadow-sm);">
      ${fotoHtml}
      <div style="padding:13px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:100px;background:#FAF0EE;color:#D7897F;">🔍 SE BUSCA</span>
          <span style="font-size:10px;color:var(--text-hint);">${escHTMLPerdidos(tiempo)}</span>
        </div>
        <p style="font-size:13px;color:var(--text);line-height:1.6;margin-bottom:8px;">${escHTMLPerdidos(p.descripcion)}</p>
        <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:11px;font-size:12px;color:var(--text-muted);">
          <div>📍 <strong style="color:var(--text);">Última vez:</strong> ${escHTMLPerdidos(p.ubicacion)}</div>
          ${fechaStr ? `<div>📅 <strong style="color:var(--text);">Perdido el:</strong> ${escHTMLPerdidos(fechaStr)}</div>` : ''}
        </div>
        <div style="display:flex;gap:8px;">
          <a href="https://wa.me/${encodeURIComponent(wspClean)}" target="_blank" rel="noopener noreferrer"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#25D366;color:white;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;text-decoration:none;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Contactar
          </a>
          <button onclick="compartirReporte('perdido','${escHTMLPerdidos(p.id)}')"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:var(--purple-light);color:var(--purple);border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Compartir
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

async function renderRescateFeed() {
  const feed = document.getElementById('rescateFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let data, error;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rescates?select=*&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) { error = e; }

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar reportes. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);"><div style="font-size:32px;margin-bottom:8px;">🆘</div><div style="font-size:13px;">No hay reportes de rescate</div></div>`;
    return;
  }

  feed.innerHTML = data.map(p => {
    const ts = new Date(p.created_at);
    const dias = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const horas = Math.max(1, Math.floor((Date.now() - ts.getTime()) / 3600000));
    const tiempo = dias === 0 ? `Hace ${horas}h` : dias === 1 ? 'Ayer' : `Hace ${dias} días`;
    const esRescatado = p.estado === 'rescatado';
    const fotoHtml = p.foto_url
      ? `<img src="${escHTMLPerdidos(p.foto_url)}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;${esRescatado ? 'filter:grayscale(0.4);' : ''}">`
      : `<div style="width:100%;height:90px;background:linear-gradient(135deg,#FEF3E8,#FFF8E8);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:44px;">${iconMapP[p.especie] || '🐾'}</div>`;
    return `<div style="background:var(--surface);border-radius:var(--r);border:1.5px solid rgba(249,185,92,0.3);overflow:hidden;box-shadow:var(--shadow-sm);">
      ${fotoHtml}
      <div style="padding:13px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:center;">
            <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:100px;background:#FEF3E8;color:#E8A820;">🆘 RESCATE</span>
            <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;background:${esRescatado ? '#E6F9F3' : '#FEF3E8'};color:${esRescatado ? '#3DAF87' : '#E8A820'};">${esRescatado ? '✓ Rescatado' : '⏳ Necesita ayuda'}</span>
          </div>
          <span style="font-size:10px;color:var(--text-hint);">${escHTMLPerdidos(tiempo)}</span>
        </div>
        <p style="font-size:13px;color:var(--text);line-height:1.6;margin-bottom:8px;">${escHTMLPerdidos(p.descripcion)}</p>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:11px;">📍 <strong style="color:var(--text);">Se encuentra en:</strong> ${escHTMLPerdidos(p.ubicacion)}</div>
        <div style="display:flex;gap:8px;">
          <button onclick="compartirReporte('rescate','${escHTMLPerdidos(p.id)}')"
            style="flex:2;display:flex;align-items:center;justify-content:center;gap:6px;background:${esRescatado ? 'var(--mint-light)' : '#FEF3E8'};color:${esRescatado ? 'var(--mint-dark)' : '#E8A820'};border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            ${esRescatado ? 'Gracias por ayudar' : 'Difundir para rescatar'}
          </button>
          ${!esRescatado ? `<button onclick="marcarRescatado('${escHTMLPerdidos(p.id)}')"
            style="flex:1;display:flex;align-items:center;justify-content:center;background:var(--mint-light);color:var(--mint-dark);border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">✓ Rescatado</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

async function compartirReporte(tipo, id) {
  const tabla = tipo === 'perdido' ? 'perdidos' : 'rescates';
  const { data, error } = await db.from(tabla).select('*').eq('id', id).single();
  if (error || !data) return;
  const p = data;
  const espIco = iconMapP[p.especie] || '🐾';
  let texto;
  if (tipo === 'perdido') {
    const fechaStr = p.fecha_extravio
      ? new Date(p.fecha_extravio + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })
      : '';
    texto = `${espIco} *SE BUSCA MASCOTA*\n\n${p.descripcion}\n\n📍 Última vez: ${p.ubicacion}${fechaStr ? `\n📅 Perdido el: ${fechaStr}` : ''}\n\n¿La viste? Contactar: ${p.wsp}\n\n_Compartido desde Wufly 🐾_`;
  } else {
    texto = `🆘 *ANIMAL NECESITA RESCATE*\n\n${p.descripcion}\n\n📍 Se encuentra en: ${p.ubicacion}\n\n¿Puedes ayudar? Comparte este mensaje.\n\n_Reportado en Wufly 🐾_`;
  }
  if (navigator.share) {
    navigator.share({ title: tipo === 'perdido' ? 'Mascota perdida' : 'Animal necesita rescate', text: texto });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  }
}

function renderPerdidos() { renderPerdidoFeed(); }
function renderRescate()  { renderRescateFeed(); }

document.addEventListener('DOMContentLoaded', () => {
  renderPerdidoFeed();
  renderRescateFeed();
});
