/* ══════════════════════════════════════
   AUTH — Wufly + Supabase
   Login, registro, sync de perfil y
   recordatorios con la nube
   ══════════════════════════════════════ */

const SUPABASE_URL  = 'https://ybnacudfqerbzpvqcjzc.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
let currentUser = null;

/* ── Escuchar cambios de sesión ── */
db.auth.onAuthStateChange(async (event, session) => {
  currentUser = session?.user ?? null;
  renderAuthBanner();
  if (currentUser && event === 'SIGNED_IN') {
    await sincronizarPerfil();
    await sincronizarRecordatorios();
  }
});

/* ══ TOPBAR: botón de cuenta ══ */
function renderTopbarAuth() {
  const el = document.getElementById('topbarAuthBtn');
  if (!el) return;

  if (currentUser) {
    el.innerHTML = `
      <button onclick="abrirAuthModal('login')"
        style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.5);color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;"
        title="${currentUser.email}">
        ${currentUser.email.charAt(0).toUpperCase()}
      </button>`;
  } else {
    el.innerHTML = `
      <button onclick="abrirAuthModal('login')"
        style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.18);border:1.5px solid rgba(255,255,255,0.4);border-radius:100px;padding:7px 13px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
        👤 Entrar
      </button>`;
  }
}

/* ══ BANNER DE SESIÓN en MI PERFIL ══ */
function renderAuthBanner() {
  renderTopbarAuth();

  const banner = document.getElementById('authBanner');
  if (!banner) return;

  if (currentUser) {
    banner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:white;flex-shrink:0;">
            ${currentUser.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--mint-dark);">☁️ Sincronizado</div>
            <div style="font-size:11px;color:var(--mint-dark);opacity:0.8;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${currentUser.email}</div>
          </div>
        </div>
        <button onclick="cerrarSesion()"
          style="font-size:11px;font-weight:700;color:var(--text-muted);background:white;border:1.5px solid var(--border-md);border-radius:100px;padding:6px 12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;">
          Salir
        </button>
      </div>`;
    banner.style.background    = 'var(--mint-light)';
    banner.style.borderColor   = 'rgba(93,214,168,0.35)';
  } else {
    banner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text);">☁️ Guarda tus datos en la nube</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Fotos y recordatorios siempre disponibles</div>
        </div>
        <button onclick="abrirAuthModal('register')"
          style="font-size:12px;font-weight:700;color:white;background:var(--purple);border:none;border-radius:100px;padding:8px 14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;">
          Crear cuenta
        </button>
      </div>`;
    banner.style.background  = 'var(--purple-light)';
    banner.style.borderColor = 'rgba(124,77,204,0.2)';
  }
}

/* ══ MODAL AUTH ══ */
function abrirAuthModal(modo = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.dataset.modo = modo;
  _actualizarModalModo(modo);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('authEmail')?.focus(), 120);
}

function cerrarAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
  _limpiarModal();
}

function setAuthModo(modo) {
  if (document.getElementById('authModal')) {
    document.getElementById('authModal').dataset.modo = modo;
  }
  _actualizarModalModo(modo);
}

function _actualizarModalModo(modo) {
  const esRegistro = modo === 'register';
  document.getElementById('authTitulo').textContent        = esRegistro ? 'Crear cuenta' : 'Iniciar sesión';
  document.getElementById('authBtnSubmit').textContent     = esRegistro ? 'Crear cuenta' : 'Entrar';
  document.getElementById('authCampoNombre').style.display = esRegistro ? 'block' : 'none';
  document.getElementById('authLinkAlternativo').innerHTML  = esRegistro
    ? `¿Ya tienes cuenta? <button onclick="setAuthModo('login')" style="background:none;border:none;color:var(--purple);font-weight:700;cursor:pointer;font-family:inherit;font-size:13px;">Iniciar sesión</button>`
    : `¿No tienes cuenta? <button onclick="setAuthModo('register')" style="background:none;border:none;color:var(--purple);font-weight:700;cursor:pointer;font-family:inherit;font-size:13px;">Registrarse</button>`;
  document.getElementById('authError').style.display = 'none';
}

function _limpiarModal() {
  const ids = ['authEmail','authPassword','authNombre'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const err = document.getElementById('authError');
  if (err) err.style.display = 'none';
}

async function submitAuth() {
  const modal  = document.getElementById('authModal');
  const modo   = modal.dataset.modo || 'login';
  const email  = document.getElementById('authEmail').value.trim();
  const pass   = document.getElementById('authPassword').value;
  const nombre = document.getElementById('authNombre')?.value.trim() || '';
  const btn    = document.getElementById('authBtnSubmit');

  if (!email || !pass) { _authErr('Completa correo y contraseña.'); return; }
  if (pass.length < 6)  { _authErr('La contraseña debe tener al menos 6 caracteres.'); return; }

  btn.disabled = true;
  btn.textContent = '...';

  try {
    if (modo === 'register') {
      const { error } = await db.auth.signUp({
        email, password: pass,
        options: { data: { nombre } }
      });
      if (error) throw error;
      _authErr('Revisa tu correo para confirmar tu cuenta 📧', 'ok');
      setTimeout(cerrarAuthModal, 3500);
      return;
    } else {
      const { error } = await db.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      cerrarAuthModal();
    }
  } catch (e) {
    const mapa = {
      'Invalid login credentials':                  'Correo o contraseña incorrectos.',
      'User already registered':                    'Este correo ya tiene una cuenta.',
      'Password should be at least 6 characters':   'La contraseña debe tener al menos 6 caracteres.',
      'Email not confirmed':                        'Confirma tu correo antes de entrar.',
    };
    _authErr(mapa[e.message] || 'Ocurrió un error. Intenta de nuevo.');
  } finally {
    btn.disabled = false;
    _actualizarModalModo(modo);
  }
}

function _authErr(msg, tipo = 'error') {
  const el = document.getElementById('authError');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  if (tipo === 'ok') {
    el.style.color = 'var(--mint-dark)'; el.style.background = 'var(--mint-light)';
  } else {
    el.style.color = '#DC2626'; el.style.background = '#FEE2E2';
  }
}

async function cerrarSesion() {
  await db.auth.signOut();
  currentUser = null;
  renderAuthBanner();
}

/* ══ STORAGE: subir foto ══ */
async function subirFotoStorage(file, carpeta) {
  if (!currentUser) throw new Error('Sin sesión');
  const ext  = file.name.split('.').pop() || 'jpg';
  const path = `${carpeta}/${currentUser.id}.${ext}`;
  const { error } = await db.storage.from('mascotas').upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = db.storage.from('mascotas').getPublicUrl(path);
  // Cache-bust para que el navegador actualice la imagen
  return data.publicUrl + '?t=' + Date.now();
}

/* ══ SINCRONIZAR PERFIL DB → localStorage ══ */
async function sincronizarPerfil() {
  if (!currentUser) return;
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .single();
  if (error || !data) return;

  const local = (() => {
    try { const r = localStorage.getItem('wufly_profile_v1'); return r ? JSON.parse(r) : {}; }
    catch { return {}; }
  })();

  const merged = {
    ...local,
    nombre:        data.nombre         || local.nombre        || '',
    nombreMascota: data.nombre_mascota || local.nombreMascota || '',
    tipomascota:   data.tipo_mascota   || local.tipomascota   || 'perro',
    edadmascota:   data.edad_mascota   || local.edadmascota   || 'adulto',
    salud:         (data.salud?.length ? data.salud : null)   || local.salud || [],
    fotoMascota:   data.foto_mascota_url || local.fotoMascota || null,
    fotoDueno:     data.foto_dueno_url   || local.fotoDueno   || null,
  };

  localStorage.setItem('wufly_profile_v1', JSON.stringify(merged));
  if (typeof renderPerfilUI === 'function') renderPerfilUI(merged);
}

/* ══ GUARDAR PERFIL EN DB ══ */
async function guardarPerfilEnDB(p) {
  if (!currentUser) return;
  await db.from('profiles').upsert({
    id:              currentUser.id,
    nombre:          p.nombre         || null,
    nombre_mascota:  p.nombreMascota  || null,
    tipo_mascota:    p.tipomascota    || 'perro',
    edad_mascota:    p.edadmascota    || 'adulto',
    salud:           p.salud          || [],
    foto_mascota_url: p.fotoMascota?.startsWith('http') ? p.fotoMascota : null,
    foto_dueno_url:   p.fotoDueno?.startsWith('http')   ? p.fotoDueno   : null,
    updated_at:      new Date().toISOString(),
  });
}

/* ══ SINCRONIZAR RECORDATORIOS DB → localStorage ══ */
async function sincronizarRecordatorios() {
  if (!currentUser) return;
  const { data, error } = await db
    .from('recordatorios')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('fecha');
  if (error || !data) return;

  const lista = data.map(r => ({
    id: r.id, tipo: r.tipo,
    descripcion: r.descripcion,
    fecha: r.fecha, notas: r.notas || '', creado: r.creado,
  }));

  if (typeof guardarRecordatoriosStorage === 'function') guardarRecordatoriosStorage(lista);
  if (typeof renderRecordatorios === 'function') renderRecordatorios();
  if (typeof actualizarBadgeRecordatorios === 'function') actualizarBadgeRecordatorios();
}

/* ══ GUARDAR RECORDATORIO EN DB ══ */
async function guardarRecordatorioDB(rec) {
  if (!currentUser) return;
  await db.from('recordatorios').upsert({
    id:          rec.id,
    user_id:     currentUser.id,
    tipo:        rec.tipo,
    descripcion: rec.descripcion,
    fecha:       rec.fecha,
    notas:       rec.notas || null,
    creado:      rec.creado,
  });
}

/* ══ ELIMINAR RECORDATORIO EN DB ══ */
async function eliminarRecordatorioDB(id) {
  if (!currentUser) return;
  await db.from('recordatorios').delete().eq('id', id).eq('user_id', currentUser.id);
}

/* ── Init: restaurar sesión existente ── */
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await db.auth.getSession();
  currentUser = session?.user ?? null;
  renderAuthBanner();
  if (currentUser) {
    await sincronizarPerfil();
    await sincronizarRecordatorios();
  } else {
    // Mostrar modal de login la primera vez que el usuario abre la app
    const yaVisto = localStorage.getItem('wufly_welcome_shown');
    if (!yaVisto) {
      localStorage.setItem('wufly_welcome_shown', '1');
      setTimeout(() => abrirAuthModal('register'), 1200);
    }
  }
});
