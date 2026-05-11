/* ══════════════════════════════════════
   ARTE — Wufly
   Retratos y arte de mascotas
   ══════════════════════════════════════ */

const artistas = [
  {
    id: 'valeria-retrato',
    nombre: 'Tapiah',
    handle: '@soytapiah',
    tecnica: 'ÓLEO · HIPERREALISMO',
    ciudad: 'Viña del Mar',
    avatar: '👩‍🎨',
    descripcion: 'Especialista en retratos hiperrealistas con Lápices de Colores y Carboncillo. Cada obra captura la personalidad única de tu mascota con un nivel de detalle increíble. Trabajos enmarcados y con certificado de autenticidad.',
    tags: ['Carboncillo', 'Hiperrealismo', 'Enmarcado', 'Certificado'],
    precioDesde: '$65.000',
    entrega: '3–4 semanas',
    wsp: '+56991609104',
    rating: 5.0,
    reviews: 47,
    obras: [
      { titulo: 'Retrato Golden Retriever', tecnica: 'Óleo sobre lienzo 40×50cm', emoji: '🖼️', precio: '$75.000' },
      { titulo: 'Border Collie en campo', tecnica: 'Óleo sobre lienzo 50×60cm', emoji: '🎨', precio: '$95.000' },
      { titulo: 'Retrato de gato siamés', tecnica: 'Óleo sobre lienzo 30×40cm', emoji: '🖼️', precio: '$65.000' },
      { titulo: 'Dúo de mascotas', tecnica: 'Óleo sobre lienzo 60×70cm', emoji: '🎨', precio: '$130.000' },
    ],
  },
];

/* ══ GALERÍA DE OBRAS ══ */
const GALERIA_OBRAS = [
  { thumb: 'img/dibujo1.jpg', full: 'img/dibujo1.jpg' },
  { thumb: 'img/dibujo2.jpg', full: 'img/dibujo2.jpg' },
  { thumb: 'img/dibujo3.jpg', full: 'img/dibujo3.jpg' },
  { thumb: 'img/dibujo4.jpg', full: 'img/dibujo4.jpg' },
  { thumb: 'img/dibujo5.jpg', full: 'img/dibujo5.jpg' },
  { thumb: 'img/dibujo6.jpg', full: 'img/dibujo6.jpg' },
];

function cargarGaleriaCloudinary() {
  const grid = document.getElementById('cloudinary-gallery');
  if (!grid) return;

  grid.innerHTML = GALERIA_OBRAS.map((obra, i) => {
    return '<div onclick="abrirLightbox(\'' + obra.full + '\',' + i + ',' + GALERIA_OBRAS.length + ')" style="aspect-ratio:1;border-radius:10px;overflow:hidden;cursor:pointer;background:#EDE9FE;">' +
      '<img src="' + obra.thumb + '" alt="Obra ' + (i+1) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.2s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">' +
      '</div>';
  }).join('');
}

/* ══ LIGHTBOX ══ */
function abrirLightbox(src, idx, total) {
  const existing = document.getElementById('arte-lightbox');
  if (existing) existing.remove();

  const lb = document.createElement('div');
  lb.id = 'arte-lightbox';
  lb.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Plus Jakarta Sans,sans-serif;';

  lb.innerHTML =
    '<button onclick="document.getElementById(\'arte-lightbox\').remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.15);border:none;color:white;font-size:18px;cursor:pointer;">✕</button>' +
    '<div style="position:absolute;top:20px;left:50%;transform:translateX(-50%);font-size:12px;color:rgba(255,255,255,0.5);">' + (idx+1) + ' / ' + total + '</div>' +
    '<img src="' + src + '" style="max-width:92vw;max-height:80vh;object-fit:contain;border-radius:12px;">';

  lb.addEventListener('click', function(e) { if (e.target === lb) lb.remove(); });
  document.body.appendChild(lb);
}

/* ══ RENDER ══ */
function renderArte() {
  const list = document.getElementById('arteList');
  if (!list) return;

  const a = artistas[0];
  const wspNum = a.wsp.replace(/\D/g, '');
  const stars = '★'.repeat(Math.round(a.rating)) + '☆'.repeat(5 - Math.round(a.rating));
  const wspMsg = encodeURIComponent('Hola Tapiah! Vi tu trabajo en Wufly y me gustaría encargar un retrato de mi mascota 🎨');

  registrarClick(a.id, a.nombre, 'arte');

  const obrasHTML = a.obras.map(function(o) {
    return '<div style="background:#F9FAFB;border:1.5px solid #EDE9FE;border-radius:14px;padding:14px;display:flex;align-items:center;gap:12px;">' +
      '<div style="width:50px;height:50px;background:linear-gradient(135deg,#EDE9FE,#DDD6FE);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">' + o.emoji + '</div>' +
      '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;color:#111827;">' + o.titulo + '</div><div style="font-size:11px;color:#6B7280;margin-top:2px;">' + o.tecnica + '</div></div>' +
      '<div style="font-size:15px;font-weight:800;color:#7C3AED;flex-shrink:0;">' + o.precio + '</div></div>';
  }).join('');

  const tagsHTML = a.tags.map(function(t) {
    return '<span style="font-size:12px;font-weight:600;padding:5px 12px;border-radius:100px;background:#EDE9FE;color:#5B21B6;">' + t + '</span>';
  }).join('');

  const wsvg = '<svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

  list.innerHTML =
    '<div style="background:linear-gradient(135deg,#4C1D95,#7C3AED,#C026D3);background-image:url(img/tapiah-bg.jpg);background-size:cover;background-position:center;padding:16px 20px 20px;border-radius:20px;position:relative;overflow:hidden;">' +
      '<div style="position:absolute;inset:0;background:rgba(60,20,120,0.55);border-radius:20px;"></div>' +
      '<div style="position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:flex-end;margin-bottom:14px;">' +
        '<button onclick="window.open(\'https://wa.me/' + wspNum + '\',\'_blank\')" style="display:flex;align-items:center;gap:6px;background:#25D366;border:none;border-radius:100px;padding:8px 14px;color:white;font-size:12px;font-weight:700;cursor:pointer;">' + wsvg + ' Encargar</button>' +
      '</div>' +
      '<div style="position:relative;z-index:1;display:flex;align-items:center;gap:14px;">' +
        '<div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:28px;border:2px solid rgba(255,255,255,0.4);flex-shrink:0;">' + a.avatar + '</div>' +
        '<div>' +
          '<div style="font-family:Funnel Display,sans-serif;font-size:20px;font-weight:700;color:white;">' + a.nombre + '</div>' +
          '<div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:2px;">' + a.handle + ' · ' + a.ciudad + '</div>' +
          '<div style="font-size:12px;color:rgba(255,255,255,0.9);margin-top:4px;"><span style="color:#FCD34D;">' + stars + '</span><span style="margin-left:4px;font-weight:600;">' + a.rating + ' (' + a.reviews + ' reseñas)</span></div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div style="padding:20px;display:flex;flex-direction:column;gap:18px;">' +

      
      '<div><div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:8px;">SOBRE EL ARTISTA</div><div style="font-size:14px;color:#374151;line-height:1.6;">' + a.descripcion + '</div></div>' +

      '<div>' +
        '<div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:10px;">GALERÍA DE OBRAS</div>' +
        '<div id="cloudinary-gallery" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">' +
          '<div style="grid-column:1/-1;text-align:center;padding:24px;color:#9CA3AF;font-size:13px;"><div style="font-size:28px;margin-bottom:8px;">🎨</div>Cargando galería…</div>' +
        '</div>' +
      '</div>' +

      
      '<a href="https://wa.me/' + wspNum + '?text=' + wspMsg + '" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#25D366;color:white;border-radius:14px;padding:16px;font-size:15px;font-weight:700;text-decoration:none;margin-top:4px;">' + wsvg.replace('13px', '18px') + ' Encargar retrato por WhatsApp</a>' +

      '<div style="text-align:center;font-size:11px;color:#9CA3AF;padding-bottom:8px;">Al contactar, envía una foto de tu mascota con buena iluminación 📸</div>' +

    '</div>';

  requestAnimationFrame(function() {
    requestAnimationFrame(cargarGaleriaCloudinary);
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('ssub-arte') && document.getElementById('ssub-arte').style.display !== 'none') {
    renderArte();
  }
});