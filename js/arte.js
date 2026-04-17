/* ══════════════════════════════════════
   ARTE — Wufly
   Retratos y arte de mascotas
   ══════════════════════════════════════ */

const artistas = [
  {
    id: 'valeria-retrato',
    nombre: 'Valeria Muñoz',
    handle: '@valeriaretratospets',
    tecnica: 'ÓLEO · HIPERREALISMO',
    ciudad: 'Viña del Mar',
    avatar: '👩‍🎨',
    descripcion: 'Especialista en retratos hiperrealistas al óleo. Cada obra captura la personalidad única de tu mascota con un nivel de detalle increíble. Trabajos enmarcados y con certificado de autenticidad.',
    tags: ['Óleo', 'Hiperrealismo', 'Enmarcado', 'Certificado'],
    precioDesde: '$65.000',
    entrega: '3–4 semanas',
    wsp: '+56912345001',
    rating: 5.0,
    reviews: 47,
    obras: [
      { titulo: 'Retrato Golden Retriever', tecnica: 'Óleo sobre lienzo 40×50cm', emoji: '🖼️', precio: '$75.000' },
      { titulo: 'Border Collie en campo', tecnica: 'Óleo sobre lienzo 50×60cm', emoji: '🎨', precio: '$95.000' },
      { titulo: 'Retrato de gato siamés', tecnica: 'Óleo sobre lienzo 30×40cm', emoji: '🖼️', precio: '$65.000' },
      { titulo: 'Dúo de mascotas', tecnica: 'Óleo sobre lienzo 60×70cm', emoji: '🎨', precio: '$130.000' },
    ],
  },
  {
    id: 'martin-acuarela',
    nombre: 'Martín Soto',
    handle: '@martinacuarelaspets',
    tecnica: 'ACUARELA · ESTILO LIBRE',
    ciudad: 'Valparaíso',
    avatar: '👨‍🎨',
    descripcion: 'Acuarelista con estilo expresionista y libre. Sus retratos transmiten emoción y vida con pinceladas fluidas llenas de color. Disponible en formato digital e impresión fine art.',
    tags: ['Acuarela', 'Expresionismo', 'Fine Art', 'Digital'],
    precioDesde: '$35.000',
    entrega: '1–2 semanas',
    wsp: '+56912345002',
    rating: 4.9,
    reviews: 83,
    obras: [
      { titulo: 'Labrador en acuarela splash', tecnica: 'Acuarela 30×40cm + impresión', emoji: '💧', precio: '$45.000' },
      { titulo: 'Gato naranja abstracto', tecnica: 'Acuarela 25×35cm', emoji: '🎨', precio: '$35.000' },
      { titulo: 'Retrato doble perro + dueño', tecnica: 'Acuarela 40×50cm', emoji: '💧', precio: '$70.000' },
      { titulo: 'Cachorro en acuarela pastel', tecnica: 'Acuarela 20×25cm digital', emoji: '🖼️', precio: '$28.000' },
    ],
  },
  {
    id: 'sofia-lapiz',
    nombre: 'Sofía Arriagada',
    handle: '@sofiaartemascotas',
    tecnica: 'LÁPIZ · GRAFITO · CARBÓN',
    ciudad: 'Viña del Mar',
    avatar: '👩‍🎨',
    descripcion: 'Artista especialista en grafito y carbón. Sus retratos en escala de grises son profundamente detallados y emotivos. Técnica de alta precisión que logra capturar hasta el pelo a pelo.',
    tags: ['Grafito', 'Carbón', 'Hiperrealismo', 'B&N'],
    precioDesde: '$28.000',
    entrega: '2–3 semanas',
    wsp: '+56912345003',
    rating: 4.8,
    reviews: 62,
    obras: [
      { titulo: 'Pastor alemán en grafito', tecnica: 'Grafito sobre papel 35×45cm', emoji: '✏️', precio: '$45.000' },
      { titulo: 'Gato persa en carbón', tecnica: 'Carbón sobre papel 30×40cm', emoji: '🖤', precio: '$38.000' },
      { titulo: 'Retrato schnauzer', tecnica: 'Grafito sobre papel 25×35cm', emoji: '✏️', precio: '$28.000' },
      { titulo: 'Bulldog en carbón', tecnica: 'Carbón sobre papel 40×50cm', emoji: '🖤', precio: '$52.000' },
    ],
  },
  {
    id: 'camila-digital',
    nombre: 'Camila Reyes',
    handle: '@camiladigitalpets',
    tecnica: 'ARTE DIGITAL · ILUSTRACIÓN',
    ciudad: 'Concón',
    avatar: '👩‍💻',
    descripcion: 'Ilustradora digital especialista en retratos de mascotas con estilo personalizado. Desde hiperrealismo digital hasta estilos kawaii y pop art. Entrega en alta resolución lista para imprimir.',
    tags: ['Digital', 'Ilustración', 'Pop Art', 'Kawaii'],
    precioDesde: '$20.000',
    entrega: '5–7 días',
    wsp: '+56912345004',
    rating: 4.9,
    reviews: 121,
    obras: [
      { titulo: 'Retrato hiperrealista digital', tecnica: 'Ilustración digital 300dpi', emoji: '💻', precio: '$30.000' },
      { titulo: 'Estilo pop art mascota', tecnica: 'Ilustración digital 300dpi', emoji: '🎨', precio: '$25.000' },
      { titulo: 'Estilo kawaii personalizado', tecnica: 'Ilustración digital 300dpi', emoji: '✨', precio: '$20.000' },
      { titulo: 'Mascota + fondo personalizado', tecnica: 'Ilustración digital 300dpi', emoji: '💻', precio: '$35.000' },
    ],
  },
  {
    id: 'pablo-mixta',
    nombre: 'Pablo Herrera',
    handle: '@pabloherreraarte',
    tecnica: 'TÉCNICA MIXTA · ÓLEO + ACRÍLICO',
    ciudad: 'Valparaíso',
    avatar: '👨‍🎨',
    descripcion: 'Artista plástico con 12 años de experiencia. Combina óleo y acrílico para crear retratos vibrantes con texturas únicas. Sus obras tienen presencia en galerías de Valparaíso y Santiago.',
    tags: ['Técnica mixta', 'Óleo', 'Acrílico', 'Galería'],
    precioDesde: '$80.000',
    entrega: '4–6 semanas',
    wsp: '+56912345005',
    rating: 4.9,
    reviews: 34,
    obras: [
      { titulo: 'Retrato gran formato mixto', tecnica: 'Óleo + acrílico 60×80cm', emoji: '🖼️', precio: '$120.000' },
      { titulo: 'Díptico dos mascotas', tecnica: 'Acrílico 2×30×40cm', emoji: '🎨', precio: '$150.000' },
      { titulo: 'Retrato mediano', tecnica: 'Técnica mixta 40×50cm', emoji: '🖼️', precio: '$80.000' },
      { titulo: 'Serie mini retratos x3', tecnica: 'Acrílico 3×15×20cm', emoji: '✨', precio: '$95.000' },
    ],
  },
];

/* ══ RENDER LISTA ══ */
function renderArte() {
  const list = document.getElementById('arteList');
  if (!list) return;

  list.innerHTML = artistas.map(a => {
    const stars = '★'.repeat(Math.round(a.rating)) + '☆'.repeat(5 - Math.round(a.rating));
    return `
    <div onclick="abrirArtista('${a.id}')"
      style="background:linear-gradient(150deg,#FAF5FF 0%,#F3E8FF 100%);border-radius:var(--r);border:1.5px solid rgba(124,77,204,0.18);border-left:4px solid #7C3AED;padding:16px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 14px rgba(124,77,204,0.08);"
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 24px rgba(124,77,204,0.16)'"
      onmouseout="this.style.transform='';this.style.boxShadow='0 2px 14px rgba(124,77,204,0.08)'">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:52px;height:52px;min-width:52px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#C026D3);display:flex;align-items:center;justify-content:center;font-size:24px;border:2px solid rgba(124,77,204,0.2);">${a.avatar}</div>
        <div style="flex:1;min-width:0;">
          <span style="display:inline-flex;align-items:center;gap:3px;background:linear-gradient(135deg,#7C3AED,#C026D3);color:white;font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;margin-bottom:6px;">🎨 Arte Verificado</span>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:1px;">${a.nombre}</div>
          <div style="font-size:10px;font-weight:700;color:#7C3AED;letter-spacing:0.04em;margin-bottom:4px;">${a.tecnica}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:5px;">${a.handle} · ${a.ciudad}</div>
          <div style="font-size:12px;margin-bottom:6px;">
            <span style="color:#F59E0B;">${stars}</span>
            <span style="margin-left:3px;font-weight:600;color:var(--text-muted);">${a.rating} (${a.reviews} reseñas)</span>
          </div>
          <div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px;">${a.descripcion}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            ${a.tags.map(t => `<span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:#EDE9FE;color:#5B21B6;">${t}</span>`).join('')}
          </div>
          <div style="border-top:1px solid rgba(124,77,204,0.12);padding-top:10px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:11px;color:var(--text-hint);">Desde <strong style="font-size:14px;color:#7C3AED;">${a.precioDesde}</strong></div>
              <div style="font-size:11px;color:var(--text-hint);">🕐 Entrega: ${a.entrega}</div>
            </div>
            <div style="color:#7C3AED;font-size:13px;font-weight:700;">Ver obras →</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ══ MODAL DE DETALLE DEL ARTISTA ══ */
function abrirArtista(id) {
  const a = artistas.find(x => x.id === id);
  if (!a) return;

  registrarClick(a.id, a.nombre, 'arte');

  const overlay = document.createElement('div');
  overlay.id = 'artista-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9998;
    background:white;
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
  `;

  const wspNum = a.wsp.replace(/\D/g, '');
  const stars  = '★'.repeat(Math.round(a.rating)) + '☆'.repeat(5 - Math.round(a.rating));

  overlay.innerHTML = `
    <!-- Header degradado -->
    <div style="background:linear-gradient(135deg,#4C1D95,#7C3AED,#C026D3);padding:16px 20px 20px;flex-shrink:0;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
        <button onclick="cerrarArtista()"
          style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.2);border:1.5px solid rgba(255,255,255,0.4);color:white;font-size:15px;cursor:pointer;">←</button>
        <button onclick="window.open('https://wa.me/${wspNum}','_blank')"
          style="display:flex;align-items:center;gap:6px;background:#25D366;border:none;border-radius:100px;padding:8px 14px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Encargar
        </button>
      </div>
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:28px;border:2px solid rgba(255,255,255,0.4);flex-shrink:0;">${a.avatar}</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:20px;font-weight:700;color:white;">${a.nombre}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:2px;">${a.handle} · ${a.ciudad}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.9);margin-top:4px;">
            <span style="color:#FCD34D;">${stars}</span>
            <span style="margin-left:4px;font-weight:600;">${a.rating} (${a.reviews} reseñas)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body scrollable -->
    <div style="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:18px;">

      <!-- Técnica + entrega -->
      <div style="display:flex;gap:10px;">
        <div style="flex:1;background:#FAF5FF;border-radius:12px;padding:12px;text-align:center;border:1px solid #EDE9FE;">
          <div style="font-size:18px;margin-bottom:4px;">🎨</div>
          <div style="font-size:11px;font-weight:700;color:#5B21B6;">${a.tecnica}</div>
        </div>
        <div style="flex:1;background:#FAF5FF;border-radius:12px;padding:12px;text-align:center;border:1px solid #EDE9FE;">
          <div style="font-size:18px;margin-bottom:4px;">🕐</div>
          <div style="font-size:11px;font-weight:700;color:#5B21B6;">Entrega ${a.entrega}</div>
        </div>
        <div style="flex:1;background:#FAF5FF;border-radius:12px;padding:12px;text-align:center;border:1px solid #EDE9FE;">
          <div style="font-size:18px;margin-bottom:4px;">💰</div>
          <div style="font-size:11px;font-weight:700;color:#5B21B6;">Desde ${a.precioDesde}</div>
        </div>
      </div>

      <!-- Descripción -->
      <div>
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:8px;">SOBRE EL ARTISTA</div>
        <div style="font-size:14px;color:#374151;line-height:1.6;">${a.descripcion}</div>
      </div>

      <!-- Tags -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${a.tags.map(t => `<span style="font-size:12px;font-weight:600;padding:5px 12px;border-radius:100px;background:#EDE9FE;color:#5B21B6;">${t}</span>`).join('')}
      </div>

      <!-- Obras -->
      <div>
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:10px;">OBRAS DISPONIBLES</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${a.obras.map(o => `
            <div style="background:#F9FAFB;border:1.5px solid #EDE9FE;border-radius:14px;padding:14px;display:flex;align-items:center;gap:12px;">
              <div style="width:50px;height:50px;background:linear-gradient(135deg,#EDE9FE,#DDD6FE);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${o.emoji}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:700;color:#111827;">${o.titulo}</div>
                <div style="font-size:11px;color:#6B7280;margin-top:2px;">${o.tecnica}</div>
              </div>
              <div style="font-size:15px;font-weight:800;color:#7C3AED;flex-shrink:0;">${o.precio}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- CTA encargo -->
      <a href="https://wa.me/${wspNum}?text=${encodeURIComponent(`Hola ${a.nombre}! Vi tu trabajo en Wufly y me gustaría encargar un retrato de mi mascota 🎨`)}"
        target="_blank" rel="noopener"
        style="display:flex;align-items:center;justify-content:center;gap:10px;background:#25D366;color:white;border-radius:14px;padding:16px;font-size:15px;font-weight:700;text-decoration:none;margin-top:4px;">
        <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        Encargar retrato por WhatsApp
      </a>

      <div style="text-align:center;font-size:11px;color:#9CA3AF;padding-bottom:8px;">
        Al contactar, envía una foto de tu mascota con buena iluminación 📸
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function cerrarArtista() {
  const overlay = document.getElementById('artista-overlay');
  if (overlay) overlay.remove();
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Renderiza si el tab de arte está activo al cargar
  if (document.getElementById('ssub-arte')?.style.display !== 'none') {
    renderArte();
  }
});
