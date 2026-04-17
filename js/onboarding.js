/* ══════════════════════════════════════
   ONBOARDING WUFLY — 3 pasos rápidos
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

/* ── HTML DEL ONBOARDING ── */
function showOnboarding() {
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="ob-container">

      <!-- PASO 1: Bienvenida + nombre -->
      <div class="ob-step active" id="ob-step-1">
        <div class="ob-logo">
          <img src="img/logo.png" alt="Wufly" style="height:48px;width:auto;object-fit:contain;filter:brightness(0) invert(1);">
        </div>
        <h1 class="ob-title">BIENVENIDOS A WUFLY</h1>
        <p class="ob-desc">Tu guía de mascotas personalizada en Valparaíso. Cuéntanos sobre ti para darte una mejor experiencia.</p>
        <div class="ob-field">
          <input type="text" id="ob-nombre" placeholder="Tu nombre...">
        </div>
        <button class="ob-btn-primary" onclick="obNext(1)">EMPEZAR</button>
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
              <div>
                <div class="ob-opt-title">Cachorro</div>
                <div class="ob-opt-sub">Menos de 1 año</div>
              </div>
            </div>
            <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','joven',this)">
              <span class="ob-opt-icon">⚡</span>
              <div>
                <div class="ob-opt-title">Joven</div>
                <div class="ob-opt-sub">1 – 3 años</div>
              </div>
            </div>
            <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','adulto',this)">
              <span class="ob-opt-icon">🌟</span>
              <div>
                <div class="ob-opt-title">Adulto</div>
                <div class="ob-opt-sub">3 – 8 años</div>
              </div>
            </div>
            <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','senior',this)">
              <span class="ob-opt-icon">🏅</span>
              <div>
                <div class="ob-opt-title">Senior</div>
                <div class="ob-opt-sub">Más de 8 años</div>
              </div>
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
        <div class="ob-progress"><div class="ob-bar" style="width:85%"></div></div>
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
          <button class="ob-btn-primary" onclick="obFinish()">Guardar perfil ✓</button>
        </div>
      </div>

      <!-- PASO 4: Confirmación -->
      <div class="ob-step" id="ob-step-4">
        <div class="ob-progress"><div class="ob-bar" style="width:100%"></div></div>
        <div class="ob-icon">🐾</div>
        <h2 class="ob-title" id="ob-welcome-name">¡Todo listo!</h2>
        <p class="ob-desc">Tu perfil está guardado. Wufly AI usará esta información en cada consulta y recomendación.</p>
        <div class="ob-summary" id="ob-summary"></div>
        <button class="ob-btn-primary" onclick="obClose()" style="margin-top:24px;">Ver clínicas cercanas →</button>
      </div>

    </div>
  `;
  document.body.appendChild(overlay);
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
  saveProfileData(obData);

  if (obData.nombre) {
    document.getElementById('ob-welcome-name').textContent = `¡Listo, ${obData.nombre}!`;
  }

  const tipoMap = { perro:'🐕 Perro', gato:'🐈 Gato', otro:'🐾 Otra mascota' };
  const edadMap = { cachorro:'🍼 Cachorro', joven:'⚡ Joven', adulto:'🌟 Adulto', senior:'🏅 Senior' };
  const items = [
    tipoMap[obData.tipomascota],
    edadMap[obData.edadmascota],
    ...obData.salud,
  ].filter(Boolean);

  document.getElementById('ob-summary').innerHTML = items.map(i =>
    `<span class="ob-summary-tag">${i}</span>`
  ).join('');

  document.getElementById('ob-step-3').classList.remove('active');
  document.getElementById('ob-step-4').classList.add('active');
}

function obClose() {
  const overlay = document.getElementById('onboarding-overlay');
  overlay.style.animation = 'obFadeOut 0.3s ease forwards';
  setTimeout(() => {
    overlay.remove();
    switchTab('restaurantes', document.querySelectorAll('.tab')[0]);
  }, 300);
}

function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
  if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
  if (typeof showOnboarding === 'function') showOnboarding();
}

/* ── CSS DEL ONBOARDING ── */
function injectOnboardingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #onboarding-overlay {
      position:fixed; inset:0; z-index:1000;
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
    #ob-step-1 { align-items:center; text-align:center; gap:14px; }
    .ob-logo { text-align:center; }
    .ob-icon { font-size:52px; text-align:center; }
    .ob-label { font-size:11px; font-weight:700; color:rgba(255,255,255,0.7); letter-spacing:0.06em; text-transform:uppercase; }
    #ob-step-1 .ob-title {
      font-family:'Funnel Display', sans-serif;
      font-weight:700; font-size:14px; letter-spacing:0.15em;
      color:#fff; text-transform:uppercase; text-align:center;
    }
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
      outline:none; background:rgba(255,255,255,0.1); width:100%;
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

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const profile = loadProfile();
  if (!profile) {
    injectOnboardingStyles();
    showOnboarding();
  }
});
