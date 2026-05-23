/* ══════════════════════════════════════
   ONBOARDING WUFLY
   Se activa solo cuando el usuario
   pincha el ícono de Perfil.
   Flujo: bienvenida → mascota → salud → registro
   ══════════════════════════════════════ */

const ONBOARDING_KEY = 'wufly_profile_v1';

function loadProfile() {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProfileData(data) {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
}

/* Contexto para la IA */
function buildAIContext() {
  const p = loadProfile();
  if (!p) return '';
  const lines = [];
  if (p.nombre) lines.push(`El dueño se llama ${p.nombre}.`);
  if (p.tipomascota) {
    const tipoMap = { perro:'tiene un perro', gato:'tiene un gato', otro:'tiene otra mascota' };
    lines.push(`El usuario ${tipoMap[p.tipomascota] || 'tiene una mascota'}.`);
  }
  if (p.edadmascota) {
    const edadMap = {
      cachorro: 'Su mascota es un cachorro (menos de 1 año).',
      joven:    'Su mascota es joven (1–3 años).',
      adulto:   'Su mascota es adulta (3–8 años).',
      senior:   'Su mascota es senior (más de 8 años).',
    };
    if (edadMap[p.edadmascota]) lines.push(edadMap[p.edadmascota]);
  }
  if (p.salud && p.salud.length > 0) {
    lines.push(`Condiciones de salud especiales: ${p.salud.join(', ')}.`);
  }
  return lines.join(' ');
}

/* ══════════════════════════════════════
   PUNTO DE ENTRADA — llamado desde el
   ícono de Perfil en la navegación
   ══════════════════════════════════════ */
function abrirPerfil() {
  // Si ya hay sesión activa, ir directo a la sección de perfil
  if (typeof currentUser !== 'undefined' && currentUser) {
    if (typeof switchTab === 'function') switchTab('alergias');
    return;
  }
  // Si ya completó el onboarding pero no está logueado (caso raro), ir al perfil igual
  const profile = loadProfile();
  if (profile && profile.nombre) {
    if (typeof switchTab === 'function') switchTab('alergias');
    return;
  }
  // Usuario nuevo: mostrar pantalla de bienvenida al perfil
  injectOnboardingStyles();
  showOnboardingWelcome();
}

/* ── PANTALLA DE BIENVENIDA AL PERFIL ── */
function showOnboardingWelcome() {
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="ob-container">
      <div class="ob-step active" id="ob-step-welcome" style="align-items:center;text-align:center;gap:18px;">
        <div class="ob-logo">
          <img src="img/logo.png" alt="Wufly" style="height:48px;width:auto;object-fit:contain;filter:brightness(0) invert(1);">
        </div>
        <div style="font-size:52px;">🐾</div>
        <h1 class="ob-title">Sé parte de la comunidad Wufly</h1>
        <p class="ob-desc">Crea tu perfil para publicar en adopción, reportar mascotas perdidas, guardar recordatorios y acceder a todo personalizado para tu mascota.</p>
        <div style="display:flex;flex-direction:column;gap:10px;width:100%;margin-top:8px;">
          <button class="ob-btn-primary" onclick="iniciarOnboarding()">Crear mi perfil 🐾</button>
          <button class="ob-btn-ghost" onclick="cerrarOnboarding()">Seguir navegando</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ── INICIA EL FLUJO DE PREGUNTAS ── */
function iniciarOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.querySelector('.ob-container').innerHTML = `

    <!-- PASO 1: Nombre -->
    <div class="ob-step active" id="ob-step-1">
      <div class="ob-progress"><div class="ob-bar" style="width:25%"></div></div>
      <h2 class="ob-title">¿Cómo te llamamos?</h2>
      <p class="ob-desc">Tu nombre para personalizar la experiencia.</p>
      <div class="ob-field">
        <input type="text" id="ob-nombre" placeholder="Tu nombre..." autocomplete="given-name">
      </div>
      <button class="ob-btn-primary" onclick="obNext(1)">Continuar →</button>
      <button class="ob-btn-ghost" style="margin-top:-4px;" onclick="cerrarOnboarding()">Cancelar</button>
    </div>

    <!-- PASO 2: Tipo y edad de mascota -->
    <div class="ob-step" id="ob-step-2">
      <div class="ob-progress"><div class="ob-bar" style="width:50%"></div></div>
      <h2 class="ob-title">Cuéntanos sobre tu mascota</h2>
      <p class="ob-desc">La IA personalizará cada consulta según tu compañero.</p>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <div class="ob-label">¿Qué tipo de mascota tienes?</div>
        <div class="ob-options" id="ob-tipomascota">
          <div class="ob-option" onclick="obSelect('tipomascota','perro',this)">
            <span class="ob-opt-icon">🐕</span>
            <div>
              <div class="ob-opt-title">Perro</div>
              <div class="ob-opt-sub">Mi mejor amigo peludo</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('tipomascota','gato',this)">
            <span class="ob-opt-icon">🐈</span>
            <div>
              <div class="ob-opt-title">Gato</div>
              <div class="ob-opt-sub">Independiente y adorable</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('tipomascota','otro',this)">
            <span class="ob-opt-icon">🐾</span>
            <div>
              <div class="ob-opt-title">Otra mascota</div>
              <div class="ob-opt-sub">Conejo, ave, reptil u otro</div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px;">
        <div class="ob-label">¿Cuántos años tiene?</div>
        <div class="ob-options" id="ob-edadmascota">
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','cachorro',this)">
            <span class="ob-opt-icon">🍼</span>
            <div><div class="ob-opt-title">Cachorro</div><div class="ob-opt-sub">Menos de 1 año</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','joven',this)">
            <span class="ob-opt-icon">⚡</span>
            <div><div class="ob-opt-title">Joven</div><div class="ob-opt-sub">1 – 3 años</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','adulto',this)">
            <span class="ob-opt-icon">🌟</span>
            <div><div class="ob-opt-title">Adulto</div><div class="ob-opt-sub">3 – 8 años</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','senior',this)">
            <span class="ob-opt-icon">🏅</span>
            <div><div class="ob-opt-title">Senior</div><div class="ob-opt-sub">Más de 8 años</div></div>
          </div>
        </div>
      </div>

      <div class="ob-nav">
        <button class="ob-btn-ghost" onclick="obBack(2)">← Atrás</button>
        <button class="ob-btn-primary" onclick="obNext(2)">Continuar →</button>
      </div>
    </div>

    <!-- PASO 3: Condición de salud -->
    <div class="ob-step" id="ob-step-3">
      <div class="ob-progress"><div class="ob-bar" style="width:75%"></div></div>
      <h2 class="ob-title">¿Tiene alguna condición de salud?</h2>
      <p class="ob-desc">Selecciona las que apliquen. La IA las considerará en cada consulta.</p>
      <div class="ob-grid" id="ob-salud">
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Alergia alimentaria">🥣 Alergia alimentaria</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas digestivos">🫁 Problemas digestivos</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Diabetes">💉 Diabetes</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Enfermedad renal">🫘 Enfermedad renal</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas articulares">🦴 Problemas articulares</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas de piel">🐾 Problemas de piel</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sobrepeso">⚖️ Sobrepeso</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sin condiciones especiales">✅ Saludable</div>
      </div>
      <div class="ob-nav">
        <button class="ob-btn-ghost" onclick="obBack(3)">← Atrás</button>
        <button class="ob-btn-primary" onclick="obFinish()">Continuar →</button>
      </div>
    </div>

    <!-- PASO 4: Crear cuenta -->
    <div class="ob-step" id="ob-step-4">
      <div class="ob-progress"><div class="ob-bar" style="width:100%"></div></div>
      <h2 class="ob-title">¡Casi listo! Crea tu cuenta</h2>
      <p class="ob-desc">Tu perfil se guardará en la nube. Accede desde cualquier dispositivo.</p>

      <div class="ob-field">
        <label class="ob-label">Correo electrónico</label>
        <input type="email" id="ob-email" placeholder="tu@correo.com" autocomplete="email">
      </div>
      <div class="ob-field">
        <label class="ob-label">Contraseña</label>
        <input type="password" id="ob-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
      </div>

      <div id="ob-register-error" style="display:none;background:#fee2e2;color:#dc2626;border-radius:8px;padding:10px 14px;font-size:13px;"></div>

      <button class="ob-btn-primary" id="ob-register-btn" onclick="obRegistrar()">Crear cuenta y entrar 🐾</button>

      <div style="display:flex;align-items:center;gap:10px;">
        <div style="flex:1;height:1px;background:rgba(255,255,255,0.2);"></div>
        <span style="font-size:11px;color:rgba(255,255,255,0.45);font-weight:600;">O</span>
        <div style="flex:1;height:1px;background:rgba(255,255,255,0.2);"></div>
      </div>

      <button onclick="obRegistrarConGoogle()" style="width:100%;padding:13px;border:1.5px solid rgba(255,255,255,0.25);border-radius:10px;background:rgba(255,255,255,0.08);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:white;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Continuar con Google
      </button>

      <div style="text-align:center;font-size:12px;color:rgba(255,255,255,0.5);margin-top:-4px;">
        ¿Ya tienes cuenta? <button onclick="obIrALogin()" style="background:none;border:none;color:#5DD6A8;font-weight:700;cursor:pointer;font-size:12px;font-family:inherit;">Inicia sesión</button>
      </div>
      <div class="ob-nav" style="margin-top:0;">
        <button class="ob-btn-ghost" onclick="obBack(4)">← Atrás</button>
      </div>
    </div>

  `;
}

/* ── ESTADO TEMPORAL ── */
const obData = { nombre:'', tipomascota:'', edadmascota:'', salud:[] };

function obNext(step) {
  if (step === 1) {
    obData.nombre = document.getElementById('ob-nombre').value.trim();
  }
  if (step === 2) {
    if (!obData.tipomascota) { obShake('ob-tipomascota'); return; }
    if (!obData.edadmascota) { obShake('ob-edadmascota'); return; }
  }
  document.getElementById('ob-step-' + step).classList.remove('active');
  document.getElementById('ob-step-' + (step + 1)).classList.add('active');
}

function obBack(step) {
  document.getElementById('ob-step-' + step).classList.remove('active');
  // Paso 2 retrocede a paso 1 (dentro del flujo dinámico)
  document.getElementById('ob-step-' + (step - 1)).classList.add('active');
}

function obSelect(field, val, el) {
  document.querySelectorAll(`#ob-${field} .ob-option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  obData[field] = val;
}

function obToggleChip(el) {
  el.classList.toggle('selected');
}

function obShake(id) {
  const el = document.getElementById(id);
  el.style.animation = 'obShake 0.4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

function obFinish() {
  obData.salud = [...document.querySelectorAll('#ob-salud .ob-chip.selected')].map(c => c.dataset.val);
  // Avanzar al paso de registro
  document.getElementById('ob-step-3').classList.remove('active');
  document.getElementById('ob-step-4').classList.add('active');
  setTimeout(() => document.getElementById('ob-email')?.focus(), 120);
}

/* ── REGISTRO FINAL ── */
async function obRegistrar() {
  const email    = document.getElementById('ob-email')?.value.trim();
  const password = document.getElementById('ob-password')?.value;
  const btn      = document.getElementById('ob-register-btn');
  const errEl    = document.getElementById('ob-register-error');

  if (!email || !password) { obRegError('Completa tu correo y contraseña.'); return; }
  if (password.length < 6) { obRegError('La contraseña debe tener al menos 6 caracteres.'); return; }

  btn.disabled = true;
  btn.textContent = 'Creando cuenta...';
  errEl.style.display = 'none';

  try {
    // 1. Crear usuario en Supabase Auth
    const { data, error } = await db.auth.signUp({
      email,
      password,
      options: { data: { nombre: obData.nombre } }
    });
    if (error) throw error;

    // 2. Guardar perfil en localStorage
    saveProfileData(obData);

    // 3. Si ya hay sesión (confirmación desactivada en Supabase), guardar en DB
    if (data.session) {
      currentUser = data.user;
      await guardarPerfilEnDB({
        nombre:        obData.nombre,
        nombreMascota: '',
        tipomascota:   obData.tipomascota,
        edadmascota:   obData.edadmascota,
        salud:         obData.salud,
        fotoMascota:   null,
        fotoDueno:     null,
      });
      localStorage.setItem('wufly_session_email', email);
    }

    // 4. Mostrar pantalla de éxito
    obMostrarExito(obData.nombre, !!data.session);

  } catch(e) {
    const mapa = {
      'User already registered':  'Este correo ya tiene una cuenta. Inicia sesión.',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
      'Invalid email': 'El correo no es válido.',
    };
    obRegError(mapa[e.message] || 'Ocurrió un error. Intenta de nuevo.');
    btn.disabled = false;
    btn.textContent = 'Crear cuenta y entrar 🐾';
  }
}

function obRegError(msg) {
  const el = document.getElementById('ob-register-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

/* ── PANTALLA DE ÉXITO ── */
function obMostrarExito(nombre, sesionActiva) {
  const container = document.querySelector('#onboarding-overlay .ob-container');
  if (!container) return;
  container.innerHTML = `
    <div class="ob-step active" style="align-items:center;text-align:center;gap:16px;">
      <div style="font-size:64px;">🎉</div>
      <h2 class="ob-title">¡Bienvenido${nombre ? ', ' + nombre : ''}!</h2>
      <p class="ob-desc">${sesionActiva
        ? 'Tu perfil está listo. Ya puedes publicar, guardar recordatorios y consultar a la Dra. Wufly.'
        : 'Te enviamos un correo de confirmación. Revísalo y luego inicia sesión para acceder a todo.'
      }</p>
      <button class="ob-btn-primary" onclick="cerrarOnboarding()" style="margin-top:8px;">¡Explorar Wufly! 🐾</button>
    </div>
  `;
}

/* ── REGISTRO CON GOOGLE DESDE EL ONBOARDING ── */
async function obRegistrarConGoogle() {
  // Guardar los datos del perfil en localStorage antes de redirigir
  // (Google redirige fuera y vuelve, así que los datos deben persistir)
  obData.salud = obData.salud.length
    ? obData.salud
    : [...(document.querySelectorAll('#ob-salud .ob-chip.selected') || [])].map(c => c.dataset.val);
  saveProfileData(obData);

  try {
    const { error } = await db.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
    // La redirección ocurre aquí — cuando vuelva, auth.js retomará la sesión
    // y sincronizarPerfil() subirá los datos del localStorage a la DB
  } catch(e) {
    obRegError('Error al conectar con Google. Intenta de nuevo.');
  }
}

/* ── IR A LOGIN DESDE EL ONBOARDING ── */
function obIrALogin() {
  cerrarOnboarding();
  if (typeof abrirAuthModal === 'function') abrirAuthModal('login');
}

/* ── CERRAR ONBOARDING ── */
function cerrarOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.style.animation = 'obFadeOut 0.3s ease forwards';
  setTimeout(() => {
    overlay.remove();
    if (typeof renderAuthBanner === 'function') renderAuthBanner();
    if (typeof _actualizarBotonesPublicar === 'function') _actualizarBotonesPublicar();
  }, 300);
}

function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
}

/* ── CSS DEL ONBOARDING ── */
function injectOnboardingStyles() {
  if (document.getElementById('ob-styles')) return;
  const style = document.createElement('style');
  style.id = 'ob-styles';
  style.textContent = `
    #onboarding-overlay {
      position:fixed; inset:0; z-index:2000;
      background: linear-gradient(160deg, #3B1A8C 0%, #5C2FA8 50%, #7C4DCC 100%);
      display:flex; align-items:center; justify-content:center;
      padding:24px;
      animation:obFadeIn 0.4s ease;
    }
    @keyframes obFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes obFadeOut { from{opacity:1} to{opacity:0} }
    @keyframes obShake {
      0%,100%{transform:translateX(0)}
      25%{transform:translateX(-8px)}
      75%{transform:translateX(8px)}
    }
    .ob-container {
      width:100%; max-width:400px;
      max-height:92vh; overflow-y:auto; scrollbar-width:none;
    }
    .ob-container::-webkit-scrollbar { display:none; }
    .ob-step {
      display:none; flex-direction:column; gap:16px;
      background:rgba(255,255,255,0.1);
      border-radius:20px; padding:32px 24px 28px;
      backdrop-filter:blur(8px);
      border:1px solid rgba(255,255,255,0.15);
    }
    .ob-step.active { display:flex; animation:obFadeIn 0.3s ease; }
    .ob-logo { text-align:center; }
    .ob-icon { font-size:52px; text-align:center; }
    .ob-label { font-size:11px; font-weight:700; color:rgba(255,255,255,0.7); letter-spacing:0.06em; text-transform:uppercase; }
    .ob-title {
      font-family:'Funnel Display', sans-serif;
      font-weight:700; font-size:19px; line-height:1.25; color:#fff; text-align:center;
    }
    .ob-desc { font-size:13px; color:rgba(255,255,255,0.72); line-height:1.6; text-align:center; }
    .ob-progress { height:3px; background:rgba(255,255,255,0.15); border-radius:4px; overflow:hidden; }
    .ob-bar { height:100%; background:#5DD6A8; border-radius:4px; transition:width 0.4s ease; }
    .ob-field { display:flex; flex-direction:column; gap:8px; width:100%; }
    .ob-field input {
      border:1.5px solid rgba(255,255,255,0.25); border-radius:10px; padding:13px 16px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:14px; color:#fff;
      outline:none; background:rgba(255,255,255,0.1); width:100%; box-sizing:border-box;
    }
    .ob-field input::placeholder { color:rgba(255,255,255,0.4); }
    .ob-field input:focus { border-color:#5DD6A8; background:rgba(255,255,255,0.14); }
    .ob-options { display:flex; flex-direction:column; gap:8px; }
    .ob-option {
      display:flex; align-items:center; gap:12px;
      background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.12);
      border-radius:14px; padding:12px 14px; cursor:pointer; transition:all 0.2s;
    }
    .ob-option-sm { padding:10px 14px; }
    .ob-option:hover { border-color:rgba(93,214,168,0.5); background:rgba(255,255,255,0.11); }
    .ob-option.selected { border-color:#5DD6A8; background:rgba(93,214,168,0.15); }
    .ob-opt-icon { font-size:20px; flex-shrink:0; }
    .ob-opt-title { font-size:13px; font-weight:600; color:#fff; }
    .ob-opt-sub { font-size:11px; color:rgba(255,255,255,0.55); margin-top:1px; }
    .ob-grid { display:flex; flex-wrap:wrap; gap:8px; }
    .ob-chip {
      background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.15);
      border-radius:100px; padding:8px 14px; font-size:12px; font-weight:500;
      color:rgba(255,255,255,0.75); cursor:pointer; transition:all 0.15s;
    }
    .ob-chip:hover { border-color:#5DD6A8; color:#5DD6A8; }
    .ob-chip.selected { background:#5DD6A8; color:#1a3a2a; border-color:#5DD6A8; font-weight:700; }
    .ob-nav { display:flex; gap:10px; margin-top:4px; }
    .ob-btn-primary {
      flex:1; width:100%; background:#7C4DCC; color:white;
      border:none; border-radius:10px; padding:14px;
      font-family:'Plus Jakarta Sans', sans-serif; font-weight:700; font-size:13px;
      letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; transition:all 0.2s;
      box-shadow:0 4px 20px rgba(124,77,204,0.4);
    }
    .ob-btn-primary:hover { background:#5C2FA8; transform:translateY(-1px); }
    .ob-btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    .ob-btn-ghost {
      background:transparent; border:1.5px solid rgba(255,255,255,0.2);
      border-radius:10px; padding:14px 20px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:13px;
      color:rgba(255,255,255,0.65); cursor:pointer; transition:all 0.15s;
    }
    .ob-btn-ghost:hover { border-color:#5DD6A8; color:#5DD6A8; }
    .ob-summary { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px; }
    .ob-summary-tag {
      background:rgba(93,214,168,0.2); color:#5DD6A8;
      font-size:12px; font-weight:600; padding:5px 12px; border-radius:100px;
      border:1px solid rgba(93,214,168,0.3);
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT: NO hacer nada al cargar ── */
// El onboarding ya NO se activa automáticamente.
// Se activa solo cuando el usuario pincha el ícono de Perfil → abrirPerfil()
