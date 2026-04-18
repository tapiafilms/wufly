/* ══════════════════════════════════════
   GEO — Búsqueda de negocios cercanos
   Fuente: OpenStreetMap / Overpass API
   100% gratuito, sin API key
   ══════════════════════════════════════ */

/* ── Resultados globales accesibles por cada sección ── */
const geoResults = {
  clinicas: [],
  tiendas:  [],
  grooming: [],
};

let userLocation = null;      // { lat, lng }
let geoStatus    = 'idle';    // 'idle' | 'loading' | 'ok' | 'denied' | 'error'

/* ── Haversine: distancia en km entre dos coordenadas ── */
function haversine(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const toR  = x => x * Math.PI / 180;
  const dLat = toR(lat2 - lat1);
  const dLng = toR(lng2 - lng1);
  const a    = Math.sin(dLat / 2) ** 2
             + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── Formato legible de distancia ── */
function fmtDist(km) {
  if (km == null) return '';
  if (km < 1) return Math.round(km * 1000) + ' m';
  return km.toFixed(1).replace('.', ',') + ' km';
}

/* ── Pedir ubicación al usuario ── */
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('no_support')); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { timeout: 12000, maximumAge: 300000, enableHighAccuracy: false }
    );
  });
}

/* ── Consulta Overpass API (OpenStreetMap) ── */
async function queryOverpass(lat, lng, radius, tags) {
  const partes = tags.flatMap(tag => {
    const [k, v] = tag.split('=');
    return [
      `node["${k}"="${v}"](around:${radius},${lat},${lng});`,
      `way["${k}"="${v}"](around:${radius},${lat},${lng});`,
    ];
  }).join('\n');

  const query = `[out:json][timeout:20];\n(\n${partes}\n);\nout center;`;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: query,
  });
  if (!res.ok) throw new Error('overpass_error');
  const data = await res.json();
  // Solo elementos que tienen nombre
  return (data.elements || []).filter(e => e.tags?.name);
}

/* ══ HELPERS para extraer datos de nodos OSM ══ */
function osmAddr(tags) {
  const calle  = [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(' ');
  const ciudad = tags['addr:city'] || tags['addr:suburb'] || '';
  return [calle, ciudad].filter(Boolean).join(', ');
}

function osmHorario(oh) {
  if (!oh) return '';
  if (oh === '24/7') return 'Abierto 24 horas';
  return oh.length > 45 ? oh.substring(0, 45) + '…' : oh;
}

function osmTel(tags) {
  return tags.phone || tags['contact:phone'] || tags['mobile'] || '';
}

function osmWeb(tags) {
  return tags.website || tags['contact:website'] || '';
}

function osmCoords(node) {
  return {
    lat: node.lat ?? node.center?.lat ?? null,
    lng: node.lon ?? node.center?.lon ?? null,
  };
}

/* ── OSM → formato clínica ── */
function osmToClinica(node, uLat, uLng) {
  const { lat, lng } = osmCoords(node);
  const tags   = node.tags || {};
  const dist   = lat && lng ? haversine(uLat, uLng, lat, lng) : 9999;
  const es24h  = /24\/7|24h/i.test(tags.opening_hours || '');

  return {
    id:      'osm_' + node.id,
    name:    tags.name,
    type:    'CLÍNICA VETERINARIA',
    icon:    '🏥',
    city:    'geo',
    urgencia: es24h,
    rating:  null,
    reviews: null,
    desc:    tags.description || 'Clínica veterinaria encontrada cerca de tu ubicación.',
    tags:    ['Veterinaria', ...(es24h ? ['24 horas'] : [])],
    address: osmAddr(tags),
    tel:     osmTel(tags),
    web:     osmWeb(tags),
    horario: osmHorario(tags.opening_hours),
    distKm:  dist,
    lat, lng,
    fromOSM: true,
  };
}

/* ── OSM → formato tienda ── */
function osmToTienda(node, uLat, uLng) {
  const { lat, lng } = osmCoords(node);
  const tags = node.tags || {};
  const dist = lat && lng ? haversine(uLat, uLng, lat, lng) : 9999;

  return {
    id:         'osm_' + node.id,
    nombre:     tags.name,
    tipo:       'fisica',
    city:       'geo',
    icon:       '🐾',
    desc:       tags.description || 'Tienda de mascotas encontrada cerca de tu ubicación.',
    categorias: ['Mascotas'],
    address:    osmAddr(tags),
    horario:    osmHorario(tags.opening_hours),
    rating:     null,
    tel:        osmTel(tags),
    web:        osmWeb(tags),
    distKm:     dist,
    lat, lng,
    fromOSM:    true,
  };
}

/* ── OSM → formato grooming ── */
function osmToGrooming(node, uLat, uLng) {
  const { lat, lng } = osmCoords(node);
  const tags = node.tags || {};
  const dist = lat && lng ? haversine(uLat, uLng, lat, lng) : 9999;

  return {
    id:       'osm_' + node.id,
    name:     tags.name,
    type:     'PELUQUERÍA · GROOMING',
    icon:     '✂️',
    city:     'geo',
    destacado: false,
    rating:   null,
    reviews:  null,
    desc:     tags.description || 'Peluquería canina encontrada cerca de tu ubicación.',
    tags:     ['Grooming'],
    address:  osmAddr(tags),
    wsp:      osmTel(tags).replace(/\s/g, ''),
    horario:  osmHorario(tags.opening_hours),
    especies: ['perro', 'gato'],
    distKm:   dist,
    lat, lng,
    fromOSM:  true,
  };
}

/* ══ BANNER GEO — renderiza en múltiples banners ══ */
const _geoBanners = [
  { id: 'geoBanner',     titulo: 'Ver tiendas cerca de ti',  sub: 'Pet shops y tiendas reales en tu zona',
    msgOk: () => `${(geoResults.tiendas?.length||0) + (geoResults.grooming?.length||0)} negocios encontrados a menos de 7 km` },
  { id: 'geoBannerVets', titulo: 'Ver clínicas cerca de ti', sub: 'Veterinarias y urgencias en tu zona',
    msgOk: () => `${geoResults.clinicas?.length||0} clínicas encontradas a menos de 7 km` },
];

function renderGeoBanner(estado, msg = '') {
  _geoBanners.forEach(({ id, titulo, sub, msgOk }) => {
    const banner = document.getElementById(id);
    if (!banner) return;

    if (estado === 'idle') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--purple-light)';
      banner.style.borderColor = 'rgba(124,77,204,0.2)';
      banner.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;">📍</span>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text);">${titulo}</div>
              <div style="font-size:11px;color:var(--text-muted);">${sub}</div>
            </div>
          </div>
          <button onclick="iniciarGeoBusqueda(true)"
            style="font-size:12px;font-weight:700;color:white;background:var(--purple);border:none;border-radius:100px;padding:8px 14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;flex-shrink:0;">
            Activar 📍
          </button>
        </div>`;

    } else if (estado === 'loading') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--purple-light)';
      banner.style.borderColor = 'rgba(124,77,204,0.2)';
      banner.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando cerca de ti…</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
          </div>
        </div>`;

    } else if (estado === 'ok') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--mint-light)';
      banner.style.borderColor = 'rgba(93,214,168,0.35)';
      const textoOk = msgOk ? msgOk() : msg;
      banner.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:12px;font-weight:700;color:var(--mint-dark);">📍 ${textoOk}</div>
          <button onclick="iniciarGeoBusqueda(true)"
            style="font-size:11px;color:var(--text-muted);background:white;border:1.5px solid var(--border-md);border-radius:100px;padding:4px 10px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            Actualizar
          </button>
        </div>`;

    } else if (estado === 'denied') {
      banner.style.display     = 'block';
      banner.style.background  = '#FEF9C3';
      banner.style.borderColor = 'rgba(234,179,8,0.4)';
      banner.innerHTML = `<div style="font-size:12px;color:#92400E;">⚠️ Permiso de ubicación denegado. Actívalo en la configuración del navegador.</div>`;

    } else {
      banner.style.display = 'none';
    }
  });
}

/* ══ ACTUALIZAR BOTONES "Cerca" en cada sección ══ */
function actualizarBotonesGeo() {
  const secciones = [
    { btnId: 'clinicaGeoBtn',  key: 'clinicas'  },
    { btnId: 'tiendaGeoBtn',   key: 'tiendas'   },
    { btnId: 'groomingGeoBtn', key: 'grooming'  },
  ];
  secciones.forEach(({ btnId, key }) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const n = geoResults[key]?.length || 0;
    btn.style.display = 'inline-flex';
    btn.innerHTML = n > 0
      ? `📍 Cerca <span style="background:var(--purple);color:white;border-radius:100px;padding:1px 6px;font-size:10px;margin-left:4px;">${n}</span>`
      : '📍 Cerca';
  });
}

/* ══ BÚSQUEDA PRINCIPAL ══ */
async function iniciarGeoBusqueda(forzar = false) {
  if (geoStatus === 'loading') return;
  if (geoStatus === 'ok' && !forzar) return;

  geoStatus = 'loading';
  renderGeoBanner('loading');

  try {
    /* 1 · Pedir ubicación */
    const loc = await obtenerUbicacion();
    userLocation = loc;

    const RADIO = 7000; // 7 km

    /* 2 · Buscar las 3 categorías en paralelo */
    const [rVet, rTienda, rGroom] = await Promise.allSettled([
      queryOverpass(loc.lat, loc.lng, RADIO, ['amenity=veterinary']),
      queryOverpass(loc.lat, loc.lng, RADIO, ['shop=pet', 'shop=pet_care', 'shop=pet_food']),
      queryOverpass(loc.lat, loc.lng, RADIO, ['shop=pet_grooming', 'craft=pet_grooming']),
    ]);

    /* 3 · Convertir y ordenar por distancia */
    geoResults.clinicas = (rVet.status    === 'fulfilled' ? rVet.value    : [])
      .map(n => osmToClinica(n, loc.lat, loc.lng))
      .sort((a, b) => a.distKm - b.distKm);

    geoResults.tiendas  = (rTienda.status === 'fulfilled' ? rTienda.value : [])
      .map(n => osmToTienda(n, loc.lat, loc.lng))
      .sort((a, b) => a.distKm - b.distKm);

    geoResults.grooming = (rGroom.status  === 'fulfilled' ? rGroom.value  : [])
      .map(n => osmToGrooming(n, loc.lat, loc.lng))
      .sort((a, b) => a.distKm - b.distKm);

    geoStatus = 'ok';

    const total = geoResults.clinicas.length + geoResults.tiendas.length + geoResults.grooming.length;
    renderGeoBanner('ok', `${total} negocios encontrados a menos de 7 km`);

    /* 4 · Mostrar botones "Cerca" y re-render si aplica */
    actualizarBotonesGeo();
    if (typeof renderClinicas  === 'function') renderClinicas();
    if (typeof renderTiendas   === 'function') renderTiendas();
    if (typeof renderGrooming  === 'function') renderGrooming();

  } catch (err) {
    if (err.code === 1) {
      // PERMISSION_DENIED
      geoStatus = 'denied';
      renderGeoBanner('denied');
    } else {
      geoStatus = 'error';
      renderGeoBanner('idle');
      console.warn('[Wufly Geo]', err.message || err);
    }
  }
}

/* ── Init: si ya tiene permiso, buscar silenciosamente ── */
document.addEventListener('DOMContentLoaded', () => {
  // Inyectar keyframe del spinner una sola vez
  if (!document.getElementById('_geoSpinStyle')) {
    const s = document.createElement('style');
    s.id = '_geoSpinStyle';
    s.textContent = '@keyframes geoSpin { to { transform: rotate(360deg); } }';
    document.head.appendChild(s);
  }
  renderGeoBanner('idle');
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' })
      .then(result => { if (result.state === 'granted') iniciarGeoBusqueda(); })
      .catch(() => {});
  }
});
