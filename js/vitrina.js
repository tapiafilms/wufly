/* ══════════════════════════════════════
   VITRINA — Wufly
   Vista exclusiva de negocios premium
   con catálogo de productos y chat IA
   ══════════════════════════════════════ */

/* ── Datos de negocios Vitrina ──
   Cada negocio puede tener:
   - info básica (nombre, desc, fotos, video)
   - productos[] con nombre, precio, desc, emoji
   - prompt personalizado para la IA
   ─────────────────────────────────────── */
const vitrinas = [
  {
    id: 'petslife-vitrina',
    negocioId: 'petslife-tienda',   // debe coincidir con el id en tiendas.js
    nombre: 'PetsLife',
    seccion: 'tiendas',
    tagline: 'Nutrición y cuidado para tu mascota',
    icon: '🐾',
    color: '#10B981',
    colorLight: '#DCFCE7',
    address: 'Av. Libertad 1198, Viña del Mar',
    horario: 'Lun–Sáb 10–19h',
    wsp: '+56966317573',
    video: null,
    fotos: [],
    productos: [
      { nombre: 'Royal Canin Adulto 15kg', precio: '$42.990', desc: 'Alimento seco para perros adultos de todas las razas.', emoji: '🥣' },
      { nombre: 'Acana Puppy 2kg', precio: '$18.500', desc: 'Fórmula premium para cachorros, libre de granos.', emoji: '🐶' },
      { nombre: 'Hills Science Diet Gato', precio: '$28.990', desc: 'Nutrición científicamente formulada para gatos adultos.', emoji: '🐈' },
      { nombre: 'Shampoo Hipoalergénico 500ml', precio: '$9.900', desc: 'Apto para pieles sensibles, sin parabenos.', emoji: '🛁' },
      { nombre: 'Correa retráctil 5m', precio: '$12.500', desc: 'Resistente hasta 40kg, con freno de seguridad.', emoji: '🦮' },
      { nombre: 'Antiparasitario Frontline', precio: '$15.990', desc: 'Pipeta mensual contra pulgas y garrapatas.', emoji: '💊' },
    ],
    promptExtra: 'Tienes alimentos de las marcas Royal Canin, Acana, Hills, Eukanuba, Proplan y Purina. También accesorios, correas, camas y productos de higiene. Entregas a domicilio disponibles dentro de Viña del Mar.',
  },
  {
    id: 'petlandia-vitrina',
    negocioId: 'petlandia',
    nombre: 'Petlandia Chile',
    seccion: 'tiendas',
    tagline: 'Todo para tu mascota en el centro de Viña',
    icon: '🦴',
    color: '#10B981',
    colorLight: '#DCFCE7',
    address: 'Av. Libertad 1002, Viña del Mar',
    horario: 'Lun–Sáb 10–19:30h · Dom 10–17h',
    wsp: '+56934471222',
    video: null,
    fotos: [],
    productos: [
      { nombre: 'Proplan Perro Senior 3kg', precio: '$19.990', desc: 'Fórmula especial para perros mayores de 7 años.', emoji: '🥣' },
      { nombre: 'Arena sanitaria Catsan 10L', precio: '$8.990', desc: 'Máxima absorción y control de olores.', emoji: '🐈' },
      { nombre: 'Cama ortopédica M', precio: '$24.900', desc: 'Memory foam para perros hasta 20kg.', emoji: '🛏️' },
      { nombre: 'Juguete Kong Classic', precio: '$11.500', desc: 'Resistente, relleno de snacks, estimula la mente.', emoji: '🦷' },
      { nombre: 'Ropa impermeable talla S', precio: '$13.990', desc: 'Ideal para paseos en días lluviosos.', emoji: '🧥' },
    ],
    promptExtra: 'También vendes ropa para mascotas, camas, juguetes interactivos, y tienes sección de regalos para mascotas. Haces envíos a domicilio y aceptas transferencia y tarjetas.',
  },
];

/* ── Historial de chat por vitrina ── */
const vitrinaChats = {};

/* ── Abrir vitrina ── */
function abrirVitrina(negocioId, seccion) {
  // Buscar vitrina por negocioId
  const v = vitrinas.find(x => x.negocioId === negocioId);
  if (!v) return false; // no tiene vitrina → no interceptar

  registrarClick(negocioId, v.nombre, seccion);

  const overlay = document.createElement('div');
  overlay.id = 'vitrina-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9998;
    background:white;
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:linear-gradient(135deg,${v.color},${v.color}CC);padding:16px 20px 14px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:22px;">${v.icon}</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:18px;font-weight:700;color:white;">${v.nombre}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.8);">${v.tagline}</div>
        </div>
      </div>
      <button onclick="cerrarVitrina()"
        style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.2);border:1.5px solid rgba(255,255,255,0.4);color:white;font-size:15px;cursor:pointer;">✕</button>
    </div>

    <!-- Badge Vitrina -->
    <div style="background:linear-gradient(90deg,#FEF3C7,#FDE68A);padding:7px 20px;display:flex;align-items:center;gap:8px;flex-shrink:0;border-bottom:1px solid #FCD34D;">
      <span style="font-size:14px;">⭐</span>
      <span style="font-size:11px;font-weight:700;color:#92400E;letter-spacing:0.05em;">VITRINA PREMIUM · NEGOCIO VERIFICADO WUFLY</span>
    </div>

    <!-- Tabs -->
    <div style="display:flex;background:white;border-bottom:1.5px solid #F3F4F6;flex-shrink:0;">
      <button id="vtab-info" onclick="switchVTab('info')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:${v.color};border-bottom:2.5px solid ${v.color};font-family:'Plus Jakarta Sans',sans-serif;">
        🏪 Negocio
      </button>
      <button id="vtab-productos" onclick="switchVTab('productos')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:#9CA3AF;border-bottom:2.5px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;">
        📦 Productos
      </button>
      <button id="vtab-chat" onclick="switchVTab('chat')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:#9CA3AF;border-bottom:2.5px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;">
        🤖 Preguntar IA
      </button>
    </div>

    <!-- Contenido (scrollable) -->
    <div style="flex:1;overflow-y:auto;" id="vitrina-body">

      <!-- Tab: Info -->
      <div id="vpage-info" style="padding:20px;display:flex;flex-direction:column;gap:14px;">

        ${v.fotos.length > 0 ? `
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
          ${v.fotos.map(f => `<img src="${f}" style="height:140px;border-radius:12px;object-fit:cover;flex-shrink:0;">`).join('')}
        </div>` : ''}

        ${v.video ? `
        <div style="border-radius:12px;overflow:hidden;background:#000;">
          <iframe src="${v.video}" width="100%" height="200" frameborder="0" allowfullscreen style="display:block;"></iframe>
        </div>` : ''}

        <div style="background:#F9FAFB;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151;">
            <span>📍</span><span>${v.address}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151;">
            <span>🕐</span><span>${v.horario}</span>
          </div>
        </div>

        <a href="https://wa.me/${(v.wsp||'').replace(/\D/g,'')}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:12px;padding:14px;font-size:14px;font-weight:700;text-decoration:none;">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Contactar por WhatsApp
        </a>

        <!-- CTA chat IA -->
        <button onclick="switchVTab('chat')"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          🤖 Preguntar a la IA sobre sus productos
        </button>
      </div>

      <!-- Tab: Productos -->
      <div id="vpage-productos" style="padding:20px;display:none;flex-direction:column;gap:10px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:4px;">CATÁLOGO DE PRODUCTOS</div>
        ${v.productos.map(p => `
          <div style="background:#F9FAFB;border:1.5px solid #F3F4F6;border-radius:12px;padding:13px 14px;display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:${v.colorLight};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${p.emoji}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:700;color:#111827;">${p.nombre}</div>
              <div style="font-size:11px;color:#6B7280;margin-top:1px;line-height:1.4;">${p.desc}</div>
            </div>
            <div style="font-size:14px;font-weight:800;color:${v.color};flex-shrink:0;">${p.precio}</div>
          </div>
        `).join('')}
        <button onclick="switchVTab('chat')"
          style="margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          🤖 ¿Tienes dudas? Pregunta a la IA
        </button>
      </div>

      <!-- Tab: Chat IA -->
      <div id="vpage-chat" style="display:none;flex-direction:column;height:100%;">
        <div style="padding:14px 20px 10px;background:#F9FAFB;border-bottom:1px solid #F3F4F6;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);display:flex;align-items:center;justify-content:center;font-size:14px;">🤖</div>
            <div>
              <div style="font-size:12px;font-weight:700;color:#111827;">Asistente de ${v.nombre}</div>
              <div style="font-size:10px;color:#10B981;font-weight:600;">● En línea</div>
            </div>
          </div>
        </div>
        <div id="vitrina-chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:200px;">
          <div style="background:#F3F4F6;border-radius:12px 12px 12px 4px;padding:12px 14px;max-width:85%;font-size:13px;color:#374151;line-height:1.5;">
            ¡Hola! 👋 Soy el asistente de <strong>${v.nombre}</strong>. Puedo ayudarte con preguntas sobre nuestros productos, precios, disponibilidad y recomendaciones para tu mascota. ¿En qué te ayudo?
          </div>
        </div>
        <div style="padding:12px 16px;background:white;border-top:1px solid #F3F4F6;display:flex;gap:8px;flex-shrink:0;">
          <input id="vitrina-chat-input" type="text" placeholder="Ej: ¿Tienen alimento para gato senior?"
            onkeydown="if(event.key==='Enter')enviarMsgVitrina('${v.id}')"
            style="flex:1;border:1.5px solid #E5E7EB;border-radius:10px;padding:10px 13px;font-size:13px;outline:none;font-family:'Plus Jakarta Sans',sans-serif;">
          <button onclick="enviarMsgVitrina('${v.id}')"
            style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);border:none;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            ➤
          </button>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);
  if (!vitrinaChats[v.id]) vitrinaChats[v.id] = [];

  return true;
}

/* ── Cerrar vitrina ── */
function cerrarVitrina() {
  const overlay = document.getElementById('vitrina-overlay');
  if (overlay) overlay.remove();
}

/* ── Cambiar tab de la vitrina ── */
function switchVTab(tab) {
  ['info','productos','chat'].forEach(t => {
    const page = document.getElementById(`vpage-${t}`);
    const btn  = document.getElementById(`vtab-${t}`);
    if (!page || !btn) return;
    const isActive = t === tab;
    page.style.display  = isActive ? 'flex' : 'none';
    page.style.flexDirection = 'column';
    // color del tab activo — usar color del negocio desde el botón del header
    const color = '#10B981';
    btn.style.color       = isActive ? color : '#9CA3AF';
    btn.style.borderBottom = isActive ? `2.5px solid ${color}` : '2.5px solid transparent';
  });
  if (tab === 'chat') {
    setTimeout(() => document.getElementById('vitrina-chat-input')?.focus(), 150);
  }
}

/* ── Chat IA de la vitrina ── */
async function enviarMsgVitrina(vitrinaId) {
  const v   = vitrinas.find(x => x.id === vitrinaId);
  if (!v) return;

  const input   = document.getElementById('vitrina-chat-input');
  const messages = document.getElementById('vitrina-chat-messages');
  const msg     = input?.value.trim();
  if (!msg || !input || !messages) return;

  input.value = '';
  input.disabled = true;

  // Burbuja usuario
  const userBubble = document.createElement('div');
  userBubble.style.cssText = 'background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border-radius:12px 12px 4px 12px;padding:10px 14px;max-width:85%;align-self:flex-end;font-size:13px;line-height:1.5;';
  userBubble.textContent = msg;
  messages.appendChild(userBubble);

  // Burbuja loading
  const loadBubble = document.createElement('div');
  loadBubble.style.cssText = 'background:#F3F4F6;border-radius:12px 12px 12px 4px;padding:10px 14px;max-width:85%;font-size:13px;color:#9CA3AF;';
  loadBubble.textContent = '...';
  messages.appendChild(loadBubble);
  messages.scrollTop = messages.scrollHeight;

  // Guardar en historial
  if (!vitrinaChats[vitrinaId]) vitrinaChats[vitrinaId] = [];
  vitrinaChats[vitrinaId].push({ role: 'user', content: msg });

  // Contexto de la mascota del usuario
  const userCtx = typeof getUserContext === 'function' ? getUserContext() : '';

  const system = `Eres el asistente de la tienda "${v.nombre}" en Wufly, una app de mascotas chilena.
Tu función es ayudar a los clientes con preguntas sobre los productos, precios y servicios de ${v.nombre}.
Responde siempre en español, de forma amable, breve y útil.
${v.promptExtra ? `\nINFORMACIÓN DE LA TIENDA:\n${v.promptExtra}` : ''}
${v.productos.length > 0 ? `\nPRODUCTOS DISPONIBLES:\n${v.productos.map(p => `- ${p.nombre}: ${p.precio} — ${p.desc}`).join('\n')}` : ''}
${userCtx ? `\nPERFIL DE LA MASCOTA DEL CLIENTE: ${userCtx}` : ''}
Si el usuario pregunta algo que no sabes, sugiere que contacte directamente por WhatsApp al ${v.wsp}.
No inventes precios ni productos que no estén listados.`;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system,
        messages: vitrinaChats[vitrinaId].slice(-6), // últimos 6 turnos de contexto
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');

    loadBubble.style.color = '#374151';
    loadBubble.textContent = text;

    vitrinaChats[vitrinaId].push({ role: 'assistant', content: text });
  } catch (e) {
    loadBubble.style.color = '#EF4444';
    loadBubble.textContent = 'No pude conectarme. Intenta de nuevo 🙏';
  }

  input.disabled = false;
  input.focus();
  messages.scrollTop = messages.scrollHeight;
}

/* ── Chips de preguntas rápidas en el chat ── */
function _vitrinaChatChip(vitrinaId, texto) {
  const input = document.getElementById('vitrina-chat-input');
  if (input) { input.value = texto; enviarMsgVitrina(vitrinaId); }
}
