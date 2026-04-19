/* ══════════════════════════════════════
   COMPANION IA — Burbuja flotante
   Aparece 1 vez por día con mensaje
   personalizado basado en el perfil
   ══════════════════════════════════════ */

const COMPANION_KEY   = 'wufly_companion';   // localStorage
const COMPANION_DATE  = 'wufly_companion_date';
const COMPANION_DELAY = 12000; // 12 segundos tras carga

/* ── Leer/guardar memoria en localStorage ── */
function _cmpMemoria() {
  try { return JSON.parse(localStorage.getItem(COMPANION_KEY) || '{}'); }
  catch { return {}; }
}

function _cmpGuardar(mem) {
  try { localStorage.setItem(COMPANION_KEY, JSON.stringify(mem)); } catch {}
}

/* ── Sincronizar memoria con Supabase profiles ── */
async function _cmpSync(mem) {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) return;
  try {
    await db.from('profiles').upsert({
      id: currentUser.id,
      companion_notes: JSON.stringify(mem),
      updated_at: new Date().toISOString(),
    });
  } catch {}
}

async function _cmpCargarDesdeDB() {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) return;
  try {
    const { data } = await db
      .from('profiles')
      .select('companion_notes')
      .eq('id', currentUser.id)
      .single();
    if (data?.companion_notes) {
      const remote = typeof data.companion_notes === 'string'
        ? JSON.parse(data.companion_notes)
        : data.companion_notes;
      _cmpGuardar(remote);
    }
  } catch {}
}

/* ── Generar mensaje de la IA ── */
async function _cmpGenerarMensaje(perfil, mem) {
  const nombre      = perfil.nombre      || 'amigo';
  const mascota     = perfil.nombreMascota || 'tu mascota';
  const tipo        = perfil.tipomascota  || 'mascota';
  const edad        = perfil.edadmascota  || '';
  const salud       = (perfil.salud || []).join(', ');
  const historial   = (mem.conversaciones || []).slice(-6)
    .map(c => `Usuario: "${c.usuario}" → IA: "${c.ia}"`)
    .join('\n');
  const resumen     = mem.resumen || '';

  const system = `Eres el asistente compañero de Wufly, una app de mascotas.
Tu objetivo es generar UN SOLO mensaje corto, amigable y personalizado para ${nombre}, dueño de ${tipo} llamado "${mascota}"${edad ? ` (${edad})` : ''}${salud ? `, con condición: ${salud}` : ''}.
${resumen ? `Lo que sabes de ellos: ${resumen}` : ''}
${historial ? `Últimas conversaciones:\n${historial}` : ''}

Reglas IMPORTANTES:
- El mensaje debe ser MUY CORTO (máximo 2 oraciones)
- Varía el tipo: a veces es una pregunta sobre el día, a veces un dato curioso sobre la raza/especie, a veces un consejo, a veces algo chistoso
- Usa el nombre del dueño y de la mascota si los tienes
- Habla en español, tono cálido y cercano
- NO repitas mensajes que ya enviaste
- No uses emojis excesivos, máximo 1
- Responde SOLO con el mensaje, sin comillas ni prefijos`;

  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 120,
      system,
      messages: [{ role: 'user', content: 'genera el mensaje de hoy' }]
    })
  });

  if (!res.ok) throw new Error('worker_error');
  const data = await res.json();
  return (data.content || []).map(i => i.text || '').join('').trim();
}

/* ── Guardar respuesta del usuario y actualizar memoria ── */
async function _cmpGuardarRespuesta(mensajeIA, respuestaUsuario) {
  const mem = _cmpMemoria();
  if (!mem.conversaciones) mem.conversaciones = [];

  mem.conversaciones.push({
    fecha:   new Date().toISOString().split('T')[0],
    ia:      mensajeIA,
    usuario: respuestaUsuario,
  });

  // Mantener máximo 20 conversaciones
  if (mem.conversaciones.length > 20) {
    mem.conversaciones = mem.conversaciones.slice(-20);
  }

  // Actualizar resumen si acumulamos suficiente info
  const perfil = _cmpGetPerfil();
  if (mem.conversaciones.length % 5 === 0) {
    try {
      mem.resumen = await _cmpGenerarResumen(perfil, mem);
    } catch {}
  }

  _cmpGuardar(mem);
  _cmpSync(mem);
}

async function _cmpGenerarResumen(perfil, mem) {
  const convs = mem.conversaciones
    .map(c => `IA: "${c.ia}" / Usuario: "${c.usuario}"`)
    .join('\n');

  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: 'Resume en 3 oraciones los datos más relevantes aprendidos sobre el usuario y su mascota. Solo datos concretos, sin adornos.',
      messages: [{ role: 'user', content: convs }]
    })
  });
  if (!res.ok) return mem.resumen || '';
  const data = await res.json();
  return (data.content || []).map(i => i.text || '').join('').trim();
}

/* ── Obtener perfil actual ── */
function _cmpGetPerfil() {
  try { return JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}'); }
  catch { return {}; }
}

/* ── UI: mostrar burbuja ── */
function _cmpMostrarBurbuja(mensaje) {
  // Eliminar burbuja anterior si existe
  document.getElementById('companionBubble')?.remove();

  const burbuja = document.createElement('div');
  burbuja.id = 'companionBubble';
  burbuja.style.cssText = `
    position:fixed;
    bottom:80px;
    right:12px;
    z-index:8000;
    width:min(300px, calc(100vw - 24px));
    background:white;
    border-radius:20px 20px 4px 20px;
    box-shadow:0 8px 32px rgba(124,77,204,0.25),0 2px 8px rgba(0,0,0,0.12);
    border:1.5px solid rgba(124,77,204,0.2);
    animation:cmpSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    overflow:hidden;
  `;

  burbuja.innerHTML = `
    <style>
      @keyframes cmpSlideIn {
        from { opacity:0; transform:translateY(20px) scale(0.92); }
        to   { opacity:1; transform:translateY(0)    scale(1); }
      }
      #companionBubble input:focus { outline:none; }
    </style>

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#5C2FA8,#7C4DCC);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;">🐾</div>
        <span style="font-size:12px;font-weight:700;color:white;font-family:'Plus Jakarta Sans',sans-serif;">Wufly</span>
      </div>
      <button id="cmpCerrar" style="background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.7);font-size:18px;line-height:1;padding:0 2px;" aria-label="Cerrar">×</button>
    </div>

    <!-- Mensaje IA -->
    <div style="padding:14px 14px 10px;">
      <p id="cmpMensaje" style="font-size:13px;color:#2D1B6B;line-height:1.55;margin:0;font-family:'Plus Jakarta Sans',sans-serif;">${mensaje}</p>
    </div>

    <!-- Input respuesta -->
    <div style="padding:0 14px 14px;display:flex;gap:8px;align-items:center;">
      <input id="cmpInput" type="text" placeholder="Respóndeme..."
        style="flex:1;border:1.5px solid #E5E7EB;border-radius:100px;padding:8px 14px;font-size:12px;font-family:'Plus Jakarta Sans',sans-serif;color:#1F2937;background:#F9FAFB;"
        maxlength="200">
      <button id="cmpEnviar"
        style="width:34px;height:34px;border-radius:50%;background:var(--purple,#7C4DCC);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(burbuja);

  // Eventos
  document.getElementById('cmpCerrar').addEventListener('click', () => {
    burbuja.style.animation = 'none';
    burbuja.style.opacity = '0';
    burbuja.style.transform = 'translateY(10px) scale(0.95)';
    burbuja.style.transition = 'all 0.2s ease';
    setTimeout(() => burbuja.remove(), 200);
  });

  const enviar = async () => {
    const input = document.getElementById('cmpInput');
    const texto = input?.value.trim();
    if (!texto) return;

    const btnEnviar = document.getElementById('cmpEnviar');
    if (btnEnviar) btnEnviar.disabled = true;
    input.disabled = true;
    input.value = '';

    // Mostrar confirmación
    const mensajeEl = document.getElementById('cmpMensaje');
    if (mensajeEl) {
      mensajeEl.textContent = '¡Anotado! Lo tendré en cuenta 🐾';
      mensajeEl.style.color = '#059669';
    }

    await _cmpGuardarRespuesta(mensaje, texto);

    setTimeout(() => {
      burbuja.style.transition = 'all 0.25s ease';
      burbuja.style.opacity = '0';
      burbuja.style.transform = 'translateY(8px)';
      setTimeout(() => burbuja.remove(), 250);
    }, 1800);
  };

  document.getElementById('cmpEnviar').addEventListener('click', enviar);
  document.getElementById('cmpInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') enviar();
  });
}

/* ── Init principal ── */
async function initCompanion() {
  // Solo si el usuario está logueado
  const sessionEmail = typeof currentUser !== 'undefined' && currentUser
    ? currentUser.email
    : localStorage.getItem('wufly_session_email');
  if (!sessionEmail) return;

  // Una vez por día
  const hoy = new Date().toISOString().split('T')[0];
  if (localStorage.getItem(COMPANION_DATE) === hoy) return;

  // Cargar memoria remota
  await _cmpCargarDesdeDB();

  const perfil = _cmpGetPerfil();
  // Necesitamos al menos nombre de mascota para personalizar
  if (!perfil.nombreMascota && !perfil.nombre) return;

  let mensaje;
  try {
    mensaje = await _cmpGenerarMensaje(perfil, _cmpMemoria());
  } catch { return; }

  if (!mensaje) return;

  // Marcar como mostrada hoy
  localStorage.setItem(COMPANION_DATE, hoy);

  _cmpMostrarBurbuja(mensaje);
}

/* ── Lanzar con delay tras carga ── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initCompanion, COMPANION_DELAY);
});
