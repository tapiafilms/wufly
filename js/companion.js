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
  initWuflyFAB();
});

/* ══════════════════════════════════════
   FAB "Pregúntale a Wufly" — siempre visible
   Anillo giratorio + burbuja de bienvenida
   ══════════════════════════════════════ */

function initWuflyFAB() {
  if (document.getElementById('wuflyFAB')) return;

  /* ── Estilos del FAB ── */
  const style = document.createElement('style');
  style.textContent = `
    #wuflyFAB {
      position: fixed;
      bottom: 96px;
      right: 16px;
      z-index: 7000;
    }
    #wuflyFABBtn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      padding: 0;
      background: none;
      position: relative;
      -webkit-tap-highlight-color: transparent;
    }
    /* Anillo exterior giratorio */
    #wuflyFABRing {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #7C4DCC, #5DD6A8, #F9B95C, #C026D3, #7C4DCC);
      animation: fabSpin 2.4s linear infinite;
    }
    /* Centro blanco que cubre el anillo dejando solo el borde */
    #wuflyFABRing::after {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background: white;
    }
    /* Icono interior */
    #wuflyFABInner {
      position: relative;
      z-index: 1;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #5C2FA8, #7C4DCC);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(92,47,168,0.45);
      transition: transform 0.15s ease;
    }
    #wuflyFABBtn:active #wuflyFABInner {
      transform: scale(0.92);
    }
    @keyframes fabSpin {
      to { transform: rotate(360deg); }
    }
    /* Burbuja greeting */
    #wuflyFABBubble {
      position: fixed;
      bottom: 162px;
      right: 12px;
      z-index: 7001;
      width: min(280px, calc(100vw - 24px));
      background: white;
      border-radius: 18px 18px 4px 18px;
      box-shadow: 0 8px 32px rgba(92,47,168,0.22), 0 2px 8px rgba(0,0,0,0.1);
      border: 1.5px solid rgba(124,77,204,0.18);
      overflow: hidden;
      animation: fabBubbleIn 0.32s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes fabBubbleIn {
      from { opacity:0; transform:translateY(16px) scale(0.9); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML del botón ── */
  const fab = document.createElement('div');
  fab.id = 'wuflyFAB';
  fab.innerHTML = `
    <button id="wuflyFABBtn" aria-label="Pregúntale a Wufly">
      <div id="wuflyFABRing"></div>
      <div id="wuflyFABInner">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="rgba(255,255,255,0.25)" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 11h.01M12 11h.01M16 11h.01" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      </div>
    </button>
  `;
  document.body.appendChild(fab);

  /* ── Toggle burbuja ── */
  let bubbleOpen = false;

  document.getElementById('wuflyFABBtn').addEventListener('click', () => {
    if (bubbleOpen) {
      _fabCerrarBurbuja();
    } else {
      _fabAbrirBurbuja();
    }
  });
}

function _fabAbrirBurbuja() {
  if (document.getElementById('wuflyFABBubble')) return;

  const perfil = _cmpGetPerfil();
  const nombre = perfil.nombre ? `, ${perfil.nombre}` : '';

  const bubble = document.createElement('div');
  bubble.id = 'wuflyFABBubble';
  bubble.innerHTML = `
    <div style="background:linear-gradient(135deg,#5C2FA8,#7C4DCC);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;">🐾</div>
        <span style="font-size:12px;font-weight:700;color:white;font-family:'Plus Jakarta Sans',sans-serif;">Wufly</span>
      </div>
      <button onclick="_fabCerrarBurbuja()" style="background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.7);font-size:20px;line-height:1;padding:0 2px;">×</button>
    </div>
    <div style="padding:14px 14px 10px;">
      <p style="font-size:13px;color:#2D1B6B;line-height:1.55;margin:0;font-family:'Plus Jakarta Sans',sans-serif;">
        ¡Hola${nombre}! 👋 ¿Qué estás buscando en Wufly hoy?
      </p>
    </div>
    <div style="padding:0 12px 12px;display:flex;gap:8px;">
      <input id="wuflyFABInput" type="text" placeholder="Escríbeme algo..."
        style="flex:1;border:1.5px solid #E5E7EB;border-radius:100px;padding:8px 14px;font-size:12px;font-family:'Plus Jakarta Sans',sans-serif;color:#1F2937;background:#F9FAFB;outline:none;"
        maxlength="200">
      <button onclick="_fabEnviar()"
        style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#5C2FA8,#7C4DCC);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
    <div style="padding:0 12px 12px;display:flex;gap:6px;flex-wrap:wrap;">
      <button onclick="_fabSugerencia('¿Cómo puedo ayudar a mi mascota?')" style="font-size:10px;padding:5px 10px;border-radius:100px;background:#F0EAFB;color:#7C4DCC;border:1px solid rgba(124,77,204,0.2);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;">🩺 Dr. Wufly</button>
      <button onclick="_fabSugerencia('Busco veterinarias cercanas')" style="font-size:10px;padding:5px 10px;border-radius:100px;background:#F0EAFB;color:#7C4DCC;border:1px solid rgba(124,77,204,0.2);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;">🏥 Vets</button>
      <button onclick="_fabSugerencia('Quiero adoptar una mascota')" style="font-size:10px;padding:5px 10px;border-radius:100px;background:#F0EAFB;color:#7C4DCC;border:1px solid rgba(124,77,204,0.2);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;">🐾 Adoptar</button>
    </div>
  `;
  document.body.appendChild(bubble);

  setTimeout(() => document.getElementById('wuflyFABInput')?.focus(), 100);

  document.getElementById('wuflyFABInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') _fabEnviar();
  });

  // Cerrar al tocar fuera
  setTimeout(() => {
    document.addEventListener('click', _fabClickFuera);
  }, 50);

  const btn = document.getElementById('wuflyFABBtn');
  if (btn) { btn.setAttribute('aria-expanded', 'true'); }
  window._fabBubbleOpen = true;
}

function _fabCerrarBurbuja() {
  const b = document.getElementById('wuflyFABBubble');
  if (!b) return;
  b.style.transition = 'all 0.2s ease';
  b.style.opacity = '0';
  b.style.transform = 'translateY(10px) scale(0.95)';
  setTimeout(() => b.remove(), 200);
  document.removeEventListener('click', _fabClickFuera);
  const btn = document.getElementById('wuflyFABBtn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  window._fabBubbleOpen = false;
}

function _fabClickFuera(e) {
  const bubble = document.getElementById('wuflyFABBubble');
  const fabBtn = document.getElementById('wuflyFABBtn');
  if (bubble && !bubble.contains(e.target) && !fabBtn.contains(e.target)) {
    _fabCerrarBurbuja();
  }
}

function _fabSugerencia(texto) {
  const input = document.getElementById('wuflyFABInput');
  if (input) { input.value = texto; input.focus(); }
}

/* ── Mapa de intenciones → secciones de la app ── */
const _fabIntenciones = [
  {
    keywords: ['adopt', 'hogar', 'rescata'],
    titulo:   'Adoptar',
    desc:     'Mascotas que buscan un hogar en Viña, Valpo y Concón.',
    ir: () => { switchComunidadTab('adoptar'); switchTab('comunidad'); },
  },
  {
    keywords: ['perdid', 'extravia', 'encontr', 'rescate'],
    titulo:   'Mascotas Perdidas y Rescate',
    desc:     'Reporta o busca mascotas perdidas en tu zona.',
    ir: () => { switchComunidadTab('perdidos'); switchTab('comunidad'); },
  },
  {
    keywords: ['vet', 'clínica', 'clinica', 'urgencia', 'hospital', 'médico', 'medico', 'doctor'],
    titulo:   'Clínicas Veterinarias',
    desc:     '11 clínicas verificadas en Viña del Mar, Valparaíso y Concón.',
    ir: () => switchTab('restaurantes'),
  },
  {
    keywords: ['dr', 'doctor', 'síntoma', 'sintoma', 'enferm', 'consejo', 'pregunt', 'diagnos'],
    titulo:   'Dr. Wufly',
    desc:     'Asistente veterinario IA. Cuéntale síntomas y te orienta.',
    ir: () => switchTab('drwufly'),
  },
  {
    keywords: ['tienda', 'comprar', 'aliment', 'comida', 'accesorio', 'pet shop', 'petshop', 'product'],
    titulo:   'Tiendas',
    desc:     'Pet shops físicos y online con productos para tu mascota.',
    ir: () => { switchServiciosTab('tiendas'); switchTab('servicios'); },
  },
  {
    keywords: ['peluquer', 'groomin', 'baño', 'bano', 'corte', 'estética', 'estetica'],
    titulo:   'Grooming y Peluquerías',
    desc:     'Peluquerías caninas y felinas en las 3 ciudades.',
    ir: () => { switchServiciosTab('grooming'); switchTab('servicios'); },
  },
  {
    keywords: ['paseo', 'paseador', 'caminata', 'pasear'],
    titulo:   'Paseadores',
    desc:     'Paseadores profesionales verificados cerca de ti.',
    ir: () => { switchServiciosTab('paseadores'); switchTab('servicios'); },
  },
  {
    keywords: ['arte', 'retrato', 'pintura', 'dibujo', 'ilustra', 'artista'],
    titulo:   'Arte — Retratos de mascotas',
    desc:     'Artistas que inmortalizan a tu mascota en óleo, acuarela y más.',
    ir: () => { switchServiciosTab('arte'); switchTab('servicios'); },
  },
  {
    keywords: ['receta', 'casera', 'natural', 'snack', 'cocina'],
    titulo:   'Recetas Caseras',
    desc:     'Comida y snacks naturales para preparar en casa.',
    ir: () => { switchComunidadTab('recetas'); switchTab('comunidad'); },
  },
  {
    keywords: ['vacuna', 'recordatorio', 'desparasit', 'control', 'calendario'],
    titulo:   'Recordatorios',
    desc:     'Vacunas, desparasitaciones y controles de tu mascota.',
    ir: () => switchTab('recordatorios'),
  },
  {
    keywords: ['perfil', 'cuenta', 'foto', 'mascota', 'datos', 'editar'],
    titulo:   'Mi Perfil',
    desc:     'Datos de tu mascota, avatar, recordatorios y más.',
    ir: () => switchTab('alergias'),
  },
];

function _fabBuscarIntencion(texto) {
  const q = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const intent of _fabIntenciones) {
    if (intent.keywords.some(k => q.includes(k.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
      return intent;
    }
  }
  return null;
}

function _fabEnviar() {
  const input = document.getElementById('wuflyFABInput');
  const texto = input?.value.trim();
  if (!texto) return;

  const intent = _fabBuscarIntencion(texto);

  if (intent) {
    /* Encontró una sección — mostrar respuesta de navegación */
    _fabMostrarRespuesta(intent);
  } else {
    /* No reconoció — derivar al Dr. Wufly */
    _fabCerrarBurbuja();
    if (typeof switchTab === 'function') switchTab('drwufly');
    setTimeout(() => {
      const chatInput = document.getElementById('chatInput');
      if (chatInput) { chatInput.value = texto; chatInput.focus(); }
    }, 350);
  }
}

function _fabMostrarRespuesta(intent) {
  /* Reemplaza el contenido de la burbuja con la respuesta */
  const bubble = document.getElementById('wuflyFABBubble');
  if (!bubble) return;

  const cuerpo = bubble.querySelector('div:nth-child(2)');
  if (cuerpo) {
    cuerpo.innerHTML = `
      <div style="padding:14px 14px 4px;">
        <div style="font-size:10px;font-weight:700;color:var(--mint-dark);letter-spacing:0.06em;margin-bottom:6px;">📍 ENCONTRÉ ESTO</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:#2D1B6B;margin-bottom:4px;">${intent.titulo}</div>
        <div style="font-size:12px;color:#6B5C8A;line-height:1.5;margin-bottom:14px;">${intent.desc}</div>
        <button onclick="_fabNavegar()" id="fabIrBtn"
          style="width:100%;padding:11px;background:linear-gradient(135deg,#5C2FA8,#7C4DCC);border:none;border-radius:12px;color:white;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Ir ahí →
        </button>
        <button onclick="_fabVolver()"
          style="width:100%;padding:8px;background:none;border:none;color:#9CA3AF;font-size:12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;margin-top:6px;">
          Buscar otra cosa
        </button>
      </div>`;
  }

  /* Guardar la función de navegación para el botón */
  window._fabNavFn = intent.ir;
}

function _fabNavegar() {
  _fabCerrarBurbuja();
  setTimeout(() => { if (window._fabNavFn) window._fabNavFn(); }, 150);
}

function _fabVolver() {
  /* Volver al estado inicial de la burbuja */
  const bubble = document.getElementById('wuflyFABBubble');
  if (!bubble) return;
  bubble.remove();
  _fabAbrirBurbuja();
}
