/* ══════════════════════════════════════════════════════════════
   TIENDAS DESTACADAS — Wufly
   Sistema multi-región: detecta por GPS y carga las tiendas
   de la región más cercana.
   ══════════════════════════════════════════════════════════════ */

/* ── Región de Coquimbo (IV) — Capital: La Serena ── */
const TIENDAS_LASERENA = [
  {
    id: 'cancatmarket-serena',
    nombre: 'Can Cat Market',
    subtitulo: 'Alimentos premium · Accesorios · Snacks',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'La Serena',
    direccion: 'La Serena (envíos gratis en La Serena y Coquimbo)',
    telefono: '+56 9 8328 3627',
    whatsapp: '56983283627',
    web: 'cancatmarket.cl',
    horario: 'Lun–Vie 10–20h · Sáb 11–16h',
    descripcion: 'Tienda especializada en alimentos premium para perros y gatos en La Serena. Amplio catálogo, snacks, accesorios y envíos gratis en La Serena y Coquimbo.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Snacks', 'Envío gratis', 'Perros y gatos'],
    bannerImg: '', lat: -29.90700, lng: -71.24900,
  },
  {
    id: 'memipetshop-serena',
    nombre: 'Memi Pet Shop',
    subtitulo: 'Alimentos · Accesorios · Envío a domicilio',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'La Serena',
    direccion: 'La Serena',
    telefono: '',
    whatsapp: '',
    web: 'memipetshop.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop online y físico en La Serena y Coquimbo. Alimentos de calidad, accesorios y despacho a domicilio de lunes a sábado por compras sobre $15.000.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Despacho a domicilio', 'La Serena', 'Coquimbo'],
    bannerImg: '', lat: -29.91200, lng: -71.25300,
  },
  {
    id: 'decoralia-serena',
    nombre: 'Decoralia Pet Shop',
    subtitulo: 'Mascotas · Accesorios · Farmacia veterinaria',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'La Serena',
    direccion: 'Calle O\'Higgins 650, La Serena',
    telefono: '+56 51 2225437',
    whatsapp: '',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas en el centro de La Serena. Alimentos, accesorios, farmacia veterinaria básica y artículos para todo tipo de mascotas.',
    rating: 4.4, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Accesorios', 'Farmacia veterinaria', 'Alimentos', 'Centro'],
    bannerImg: '', lat: -29.90600, lng: -71.25400,
  },
];

/* ── Región de Valparaíso (V) — Capital: Valparaíso / Viña del Mar ── */
const TIENDAS_DESTACADAS = [
  {
    id: 'petslife-vit',
    nombre: 'PetsLife',
    subtitulo: 'Alimentos premium · Accesorios · Peluquería',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Viña del Mar',
    direccion: 'Av. Libertad 1198, Viña del Mar',
    telefono: '+56 9 6631 7573',
    whatsapp: '56966317573',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop con múltiples sucursales en Viña del Mar. Alimentos premium, accesorios, higiene y peluquería canina. Atención personalizada y asesoría en nutrición.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Peluquería canina', 'Higiene', 'Nutrición'],
    bannerImg: '/img/banner-petslife.png', lat: null, lng: null,
  },
  {
    id: 'infopet-vit',
    nombre: 'InfoPet Reñaca',
    subtitulo: 'Nutrición · Grooming · Juguetes',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Reñaca, Viña del Mar',
    direccion: 'Eluchans 1737 Local 6, Reñaca, Viña del Mar',
    telefono: '+56 9 9760 0367',
    whatsapp: '56997600367',
    web: '',
    horario: 'Lun–Sáb 11–20h',
    descripcion: 'Tienda especializada en nutrición y accesorios para mascotas en Reñaca. Alimentos de marcas premium, higiene, juguetes y servicio de grooming.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Grooming', 'Juguetes', 'Higiene', 'Marcas premium'],
    bannerImg: '/img/banner-infopet.png', lat: null, lng: null,
  },
  {
    id: 'petzonas-vit',
    nombre: 'Petzonas',
    subtitulo: 'Alimentos · Grooming · Accesorios',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Concón',
    direccion: 'Av. Concón-Reñaca 44, Concón',
    telefono: '+56 9 3078 8923',
    whatsapp: '56930788923',
    web: '',
    horario: 'Lun–Vie 9:30–20h',
    descripcion: 'Centro de productos y cuidado para mascotas en Concón. Alimentos de primeras marcas, accesorios, higiene y servicio de grooming.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Grooming', 'Accesorios', 'Higiene', 'Primeras marcas'],
    bannerImg: '/img/banner-petzonas.png', lat: null, lng: null,
  },
];

/* ── Región Metropolitana (XIII) — Capital: Santiago ── */
const TIENDAS_SANTIAGO = [
  {
    id: 'fonomascotas-stgo',
    nombre: 'Fonomascotas',
    subtitulo: 'Alimentos premium · Accesorios · Peluquería',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Providencia',
    direccion: 'Av. Francisco Bilbao 2016, Providencia, Santiago',
    telefono: '+56 2 2225 6524',
    whatsapp: '',
    web: 'fonomascotas.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Tienda con veterinaria y peluquería integradas en Providencia. Amplio stock de alimentos premium y accesorios para perros y gatos.',
    rating: 4.5, reviews: 88,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Peluquería', 'Veterinaria'],
    bannerImg: '', lat: -33.43630, lng: -70.62180,
  },
  {
    id: 'europet-stgo',
    nombre: 'Europet',
    subtitulo: 'Alimentos premium · Acana · Orijen · Brit Care',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Las Condes',
    direccion: 'Eduardo Castillo Velasco, Las Condes, Santiago',
    telefono: '',
    whatsapp: '',
    web: 'europet.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Especialistas en alimentos premium: Acana, Orijen, Brit Care y más. Entrega el mismo día en 8 comunas. Envío gratis en toda la Región Metropolitana.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Acana', 'Orijen', 'Brit Care', 'Alimentos premium', 'Despacho rápido'],
    bannerImg: '', lat: -33.41200, lng: -70.57800,
  },
  {
    id: 'superzoo-stgo',
    nombre: 'SuperZoo',
    subtitulo: 'Alimentos · Accesorios · Royal Canin · Hills',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Independencia',
    direccion: 'Av. Fermín Vivaceta 1030, Local 7, Independencia',
    telefono: '',
    whatsapp: '',
    web: 'superzoo.cl',
    horario: 'Lun–Vie 9–20h · Sáb 10–18h',
    descripcion: 'Una de las tiendas más completas de Santiago. Royal Canin, Hills, ProPlan y más. Accesorios, juguetes, higiene y productos para todo tipo de mascotas.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Royal Canin', 'Hills', 'ProPlan', 'Accesorios', 'Juguetes'],
    bannerImg: '', lat: -33.41580, lng: -70.66520,
  },
];

/* ── Región de O'Higgins (VI) — Capital: Rancagua ── */
const TIENDAS_RANCAGUA = [
  {
    id: 'animania-rancagua',
    nombre: 'Animania',
    subtitulo: 'Alimentos súper premium · Farmacia · Despacho',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Rancagua',
    direccion: 'Av. Illanes 384, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'animania.cl',
    horario: 'Lun–Sáb 9:30–19:30h',
    descripcion: 'Tienda de mascotas en Rancagua con alimentos súper premium, accesorios, farmacia veterinaria básica y despacho a domicilio. También semillería e insecticidas.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos súper premium', 'Farmacia veterinaria', 'Accesorios', 'Despacho'],
    bannerImg: '', lat: -34.17000, lng: -70.74500,
  },
  {
    id: 'supermascota-rancagua',
    nombre: 'Supermercado de la Mascota',
    subtitulo: 'Alimentos · Snacks · Remedios · Juguetes',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Rancagua',
    direccion: 'Pasaje Lirima 2360, Villa Alameda, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'supermercadodelamascota.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Tienda online y física en Rancagua. Alimentos, snacks, remedios, accesorios, juguetes y ropa para perros, gatos, conejos, aves y más mascotas.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Snacks', 'Remedios', 'Juguetes', 'Ropa'],
    bannerImg: '', lat: -34.16200, lng: -70.73800,
  },
  {
    id: 'petfamily-rancagua',
    nombre: 'Pet Family',
    subtitulo: 'Alimentos premium · Accesorios · Distribución',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Rancagua',
    direccion: 'Av. Valparaíso 1414, Rancagua Sur',
    telefono: '',
    whatsapp: '',
    web: 'petfamilyweb.com',
    horario: 'Lun–Sáb 9–19h',
    descripcion: 'Punto de venta Pet Family en Rancagua. Alimentos premium y accesorios para mascotas con distribución regional.',
    rating: 4.4, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Distribución regional'],
    bannerImg: '', lat: -34.17800, lng: -70.74800,
  },
];

/* ── Región del Bío-Bío (VIII) — Capital: Concepción ── */
const TIENDAS_CONCEPCION = [
  {
    id: 'premiumpet-conce',
    nombre: 'Premium Pet Concepción',
    subtitulo: 'Alimentos · Accesorios · Antiparasitarios · Despacho',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Concepción',
    direccion: 'Maipú 935, Concepción',
    telefono: '+56 9 3105 6709',
    whatsapp: '56931056709',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas en Concepción. Alimentos para perros y gatos, accesorios, pipetas, antiparasitarios y arena sanitaria. Reparto a domicilio disponible.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Antiparasitarios', 'Domicilio'],
    bannerImg: '', lat: -36.82500, lng: -73.05200,
  },
  {
    id: 'arcadenoe-conce',
    nombre: 'El Arca de Noé',
    subtitulo: 'Alimentos · Accesorios · Despacho gratis Gran Conce',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Concepción',
    direccion: 'Concepción (despacho en Gran Concepción)',
    telefono: '',
    whatsapp: '',
    web: 'elarcadenoe.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas con despacho gratis desde $14.990 en Concepción, Talcahuano, Hualpén, San Pedro de la Paz, Chiguayante, Penco, Tomé y más.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Despacho gratis', 'Gran Concepción'],
    bannerImg: '', lat: -36.82000, lng: -73.04800,
  },
  {
    id: 'biopetshop-conce',
    nombre: 'Bio Pet Shop',
    subtitulo: 'Alimentos · Snacks · Accesorios · Juguetes',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Concepción',
    direccion: 'Concepción',
    telefono: '',
    whatsapp: '',
    web: 'biopetshop.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop en Concepción. Alimentos, snacks, premios, accesorios, juguetes, camas, artículos de limpieza y ropa para perros y gatos.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Snacks', 'Juguetes', 'Accesorios', 'Ropa'],
    bannerImg: '', lat: -36.83000, lng: -73.05000,
  },
];

/* ══════════════════════════════════════════════════════════════
   MAPA DE REGIONES
   ══════════════════════════════════════════════════════════════ */
const REGIONES_TIENDAS = [
  { nombre: 'Coquimbo',      tiendas: TIENDAS_LASERENA,   lat: { min: -31.5, max: -29.0 }, lng: { min: -72.5, max: -69.5 } },
  { nombre: 'Valparaíso',    tiendas: TIENDAS_DESTACADAS, lat: { min: -33.7, max: -32.0 }, lng: { min: -72.0, max: -70.0 } },
  { nombre: 'Metropolitana', tiendas: TIENDAS_SANTIAGO,   lat: { min: -34.4, max: -32.9 }, lng: { min: -71.5, max: -69.8 } },
  { nombre: "O'Higgins",     tiendas: TIENDAS_RANCAGUA,   lat: { min: -35.2, max: -33.8 }, lng: { min: -72.0, max: -70.0 } },
  { nombre: 'Bío-Bío',       tiendas: TIENDAS_CONCEPCION, lat: { min: -38.5, max: -36.0 }, lng: { min: -74.0, max: -71.0 } },
];

/* ══════════════════════════════════════════════════════════════
   DETECCIÓN DE REGIÓN
   ══════════════════════════════════════════════════════════════ */
let _tiendasActivas = null;

function _detectarTiendasPorCoords(lat, lng) {
  for (const region of REGIONES_TIENDAS) {
    if (lat >= region.lat.min && lat <= region.lat.max &&
        lng >= region.lng.min && lng <= region.lng.max) {
      return region.tiendas;
    }
  }
  return null;
}

async function _detectarRegionYCargarTiendas() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const tiendas = _detectarTiendasPorCoords(lat, lng);
        _tiendasActivas = tiendas;
        resolve(tiendas); // null si fuera de cobertura (banner lo maneja clinicas.js)
      },
      () => resolve(null),
      { timeout: 5000, maximumAge: 3600000 }
    );
  });
}

function getTiendasActivas() {
  return _tiendasActivas;
}
