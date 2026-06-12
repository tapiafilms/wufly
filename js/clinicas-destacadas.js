/* ══════════════════════════════════════════════════════════════
   CLÍNICAS DESTACADAS — Wufly
   Sistema multi-región: detecta por GPS y carga las clínicas
   de la región más cercana. Agregar nuevas regiones en
   REGIONES_CLINICAS con su bounding box y arreglo de clínicas.
   ══════════════════════════════════════════════════════════════ */

/* ── Región de Coquimbo (IV) — Capital: La Serena ── */
const CLINICAS_LASERENA = [
  {
    id: 'laserenavet',
    nombre: 'La Serena Vet',
    subtitulo: 'Urgencias 24h · Cirugía · Ortopedia',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Av. Los Perales 1218, La Serena',
    telefono: '',
    whatsapp: '',
    web: 'laserenavet.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria integral 24h en La Serena. Cirugía, ortopedia, radiografías, peluquería, farmacia y laboratorio clínico. Consulta gratis en primera visita.',
    rating: 4.6, reviews: 180,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Cirugía', 'Ortopedia', 'Laboratorio', 'Farmacia'],
    bannerImg: '', lat: -29.90430, lng: -71.25210,
  },
  {
    id: 'antakari-serena',
    nombre: 'Clínica Veterinaria Antakari',
    subtitulo: 'Hospital full service · 24h · Domicilio',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Av. Juan Cisternas 2902, La Serena',
    telefono: '+56 9 3408 2534',
    whatsapp: '56934082534',
    web: 'veterinariantakari.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Hospital veterinario full service en La Serena y Coquimbo. Urgencias 24h, laboratorio clínico propio, cirugías y atención a domicilio. Equipo de médicos altamente capacitados.',
    rating: 4.7, reviews: 210,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio', 'Domicilio', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -29.91800, lng: -71.24600,
  },
  {
    id: 'larrain-serena',
    nombre: 'Clínica Veterinaria Larraín',
    subtitulo: 'Urgencias 24h · Laboratorio · Especialidades',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Larrraín Alcalde 3096, La Serena',
    telefono: '+56 9 9883 4811',
    whatsapp: '56998834811',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Centro de referencia 24h en La Serena. Cuenta con laboratorio clínico propio. Referente de urgencias en la ciudad, con recepcionista nocturno permanente.',
    rating: 4.5, reviews: 150,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio', 'Especialidades', 'Hospitalización'],
    bannerImg: '', lat: -29.89500, lng: -71.24100,
  },
];

/* ── Región de Valparaíso (V) — Capital: Valparaíso / Viña del Mar ── */
const CLINICAS_DESTACADAS = [
  {
    id: 'mevetlab',
    nombre: 'MEVETLAB Clínica Veterinaria',
    subtitulo: 'Clínica · Laboratorio · Urgencias 24h',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Viña del Mar',
    direccion: 'Álvarez 2172, Chorrillos, Viña del Mar',
    telefono: '',
    whatsapp: '',
    web: 'mevetlab.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica integral especializada en pequeños animales con laboratorio propio. Quirófano equipado, hospitalización 24h y atención Fear Free. Una de las más completas de Viña del Mar.',
    rating: 4.8, reviews: 312,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio propio', 'Hospitalización', 'Cirugía', 'Fear Free'],
    bannerImg: '/img/banner-mevetlab.png', lat: -33.02587, lng: -71.55578,
  },
  {
    id: 'artemisa',
    nombre: 'Clínica Artemisa',
    subtitulo: 'Urgencias 24h · Exóticos · Peluquería',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Viña del Mar',
    direccion: '2 Oriente 526, Viña del Mar',
    telefono: '+56 9 9109 2675',
    whatsapp: '56991092675',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria 24 horas comprometida con la salud animal. Atiende mascotas convencionales y animales exóticos. Urgencias permanentes y peluquería canina.',
    rating: 4.0, reviews: 364,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Animales exóticos', 'Peluquería canina', 'Farmacia'],
    bannerImg: '/img/banner-artemisa.png', lat: -33.01618, lng: -71.54760,
  },
  {
    id: 'recreo',
    nombre: 'Centro Veterinario Recreo',
    subtitulo: 'Emergencias · Cirugía · Medicina preventiva',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Valparaíso',
    direccion: 'Olga 117, Recreo, Valparaíso',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb–Dom 10–18h',
    descripcion: 'Centro veterinario especializado en emergencias. Cirugías, vacunaciones y medicina preventiva. Reconocido por su dedicación y trato cercano con los pacientes.',
    rating: 4.5, reviews: 276,
    fotos: [], veterinarios: [],
    tags: ['Emergencias', 'Cirugía', 'Vacunación', 'Medicina preventiva'],
    bannerImg: '/img/banner-recreo.png', lat: -33.02869, lng: -71.57712,
  },
];

/* ── Región Metropolitana (XIII) — Capital: Santiago ── */
const CLINICAS_SANTIAGO = [
  {
    id: 'veterinaria-colon',
    nombre: 'Veterinaria Colón',
    subtitulo: 'Clínica · Peluquería · Urgencias 24h',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Las Condes',
    direccion: 'Av. Cristóbal Colón 5781, Las Condes, Santiago',
    telefono: '+56 2 2211 9305',
    whatsapp: '',
    web: 'veterinariacolon.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria con más de 20 años en Las Condes. Atención 24h por orden de llegada. Especialidades, peluquería, farmacia y alimentos.',
    rating: 4.5, reviews: 280,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Especialidades', 'Peluquería', 'Farmacia', 'Alimentos'],
    bannerImg: '', lat: -33.40339, lng: -70.57120,
  },
  {
    id: 'clinica-veterinaria-providencia',
    nombre: 'Clínica Veterinaria Providencia',
    subtitulo: 'Urgencias 24h · Cirugía · Hospitalización',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Providencia',
    direccion: 'Santa Beatriz 126, Providencia, Santiago',
    telefono: '+56 2 2235 5855',
    whatsapp: '56989297552',
    web: 'veterinariaprovidencia.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: '40 años cuidando mascotas en Providencia. Urgencias 24h, cirugía especializada, hospitalización, farmacia y peluquería.',
    rating: 4.6, reviews: 520,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Cirugía especializada', 'Hospitalización', 'Peluquería', 'Farmacia'],
    bannerImg: '', lat: -33.43520, lng: -70.62810,
  },
  {
    id: 'cvms-santiago',
    nombre: 'Clínica Veterinaria Mascotas Santiago',
    subtitulo: 'UCI · UTI · Urgencias 24h · Laboratorio',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Santiago Centro',
    direccion: 'Av. Matta 851, Santiago Centro',
    telefono: '+56 2 2544 3528',
    whatsapp: '',
    web: 'cvms.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Hospital veterinario de alta complejidad en Santiago Centro. UCI y UTI propias, laboratorio con resultados inmediatos, cirugías de urgencia 24h.',
    rating: 4.7, reviews: 390,
    fotos: [], veterinarios: [],
    tags: ['UCI / UTI', 'Urgencias 24h', 'Laboratorio', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -33.45810, lng: -70.64970,
  },
];

/* ── Región de O'Higgins (VI) — Capital: Rancagua ── */
const CLINICAS_RANCAGUA = [
  {
    id: 'arrayan-rancagua',
    nombre: 'Hospital Veterinario Arrayán',
    subtitulo: 'Urgencias 24/7 · Especialidades · Cirugía',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Rancagua',
    direccion: 'Hno. Claudio 364, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'arrayanveterinaria.cl',
    horario: 'Abierto 24/7',
    descripcion: 'Hospital veterinario de referencia en Rancagua y Machalí. Urgencias 24/7, especialidades médicas, cirugías y hospitalización en la Región de O\'Higgins.',
    rating: 4.7, reviews: 195,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24/7', 'Especialidades', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -34.16800, lng: -70.74200,
  },
  {
    id: 'sanpablo-rancagua',
    nombre: 'San Pablo Vet Clinic',
    subtitulo: 'Hospital 24h · Cirugía · Neurología · Oftalmología',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Rancagua',
    direccion: 'Av. Central 251, Rancagua',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria con hospital 24h en Rancagua. Cirugías, neurología, oftalmología, gastroenterología, laboratorio, ecografías y rayos X. Atención personalizada.',
    rating: 4.6, reviews: 230,
    fotos: [], veterinarios: [],
    tags: ['Hospital 24h', 'Neurología', 'Oftalmología', 'Laboratorio', 'Rayos X'],
    bannerImg: '', lat: -34.17200, lng: -70.73800,
  },
  {
    id: 'petvet-rancagua',
    nombre: 'Pet & Vet Rancagua',
    subtitulo: 'Consultas · Cirugía · Vacunas · Desparasitación',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: false,
    ciudad: 'Rancagua',
    direccion: 'Av. Balmaceda 2395, Rancagua',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–18h',
    descripcion: 'Clínica veterinaria con enfoque en atención personalizada en Rancagua. Vacunaciones, desparasitaciones, cirugías y chequeos anuales. Reconocida por su calidez y compromiso.',
    rating: 4.5, reviews: 160,
    fotos: [], veterinarios: [],
    tags: ['Consultas', 'Cirugía', 'Vacunas', 'Desparasitación', 'Farmacia'],
    bannerImg: '', lat: -34.16500, lng: -70.73500,
  },
];

/* ── Región del Bío-Bío (VIII) — Capital: Concepción ── */
const CLINICAS_CONCEPCION = [
  {
    id: 'pedro-valdivia-conce',
    nombre: 'Clínica Veterinaria Pedro de Valdivia',
    subtitulo: 'Urgencias 24h · Exóticos · Laboratorio',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Concepción',
    direccion: 'Av. Pedro de Valdivia 1559, Concepción',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Dom 24 horas',
    descripcion: 'Clínica veterinaria 24h en Concepción. Traumatología, rayos X, ecografía, ECG, endoscopía, hospital, laboratorio, peluquería, hotel y animales exóticos.',
    rating: 4.6, reviews: 220,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Exóticos', 'Laboratorio', 'Traumatología', 'Hotel'],
    bannerImg: '', lat: -36.82690, lng: -73.04980,
  },
  {
    id: 'happy-puppy-conce',
    nombre: 'Clínica Veterinaria Happy Puppy',
    subtitulo: 'Consultas · Cirugía · Peluquería · Pet shop',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: false,
    ciudad: 'Concepción',
    direccion: 'Bernardino Corral 117, Concepción',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Sáb 9–20h · Dom 10–14h',
    descripcion: 'Clínica con más de 20 años en Concepción. Consultas, cirugías, baños, hotel, laboratorio y pet shop. Equipo comprometido con el bienestar animal.',
    rating: 4.5, reviews: 185,
    fotos: [], veterinarios: [],
    tags: ['Cirugía', 'Peluquería', 'Hotel', 'Pet shop', 'Laboratorio'],
    bannerImg: '', lat: -36.82100, lng: -73.04500,
  },
  {
    id: 'cmvc-conce',
    nombre: 'Centro Médico Veterinario Concepción',
    subtitulo: 'Urgencias 24h · Domicilio · Cirugía · Farmacia',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Concepción',
    direccion: 'Manuel Bulnes 1598, Concepción',
    telefono: '',
    whatsapp: '',
    web: 'cmvc.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Centro médico veterinario con asistencia a domicilio 24h. Cirugías, laboratorio clínico, radiografías, ecografías, farmacia y accesorios con reparto a domicilio.',
    rating: 4.6, reviews: 200,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Domicilio', 'Laboratorio', 'Cirugía', 'Farmacia'],
    bannerImg: '', lat: -36.83200, lng: -73.05500,
  },
];

/* ══════════════════════════════════════════════════════════════
   MAPA DE REGIONES — bounding boxes geográficos
   Agrega nuevas regiones aquí sin tocar el resto del código
   ══════════════════════════════════════════════════════════════ */
const REGIONES_CLINICAS = [
  {
    nombre: 'Coquimbo',
    clinicas: CLINICAS_LASERENA,
    lat: { min: -31.5, max: -29.0 },
    lng: { min: -72.5, max: -69.5 },
  },
  {
    nombre: 'Valparaíso',
    clinicas: CLINICAS_DESTACADAS,
    lat: { min: -33.7, max: -32.0 },
    lng: { min: -72.0, max: -70.0 },
  },
  {
    nombre: 'Metropolitana',
    clinicas: CLINICAS_SANTIAGO,
    lat: { min: -34.4, max: -32.9 },
    lng: { min: -71.5, max: -69.8 },
  },
  {
    nombre: "O'Higgins",
    clinicas: CLINICAS_RANCAGUA,
    lat: { min: -35.2, max: -33.8 },
    lng: { min: -72.0, max: -70.0 },
  },
  {
    nombre: 'Bío-Bío',
    clinicas: CLINICAS_CONCEPCION,
    lat: { min: -38.5, max: -36.0 },
    lng: { min: -74.0, max: -71.0 },
  },
];

/* ══════════════════════════════════════════════════════════════
   DETECCIÓN DE REGIÓN
   ══════════════════════════════════════════════════════════════ */
let _clinicasActivas = null;

function _detectarClinicasPorCoords(lat, lng) {
  for (const region of REGIONES_CLINICAS) {
    if (lat >= region.lat.min && lat <= region.lat.max &&
        lng >= region.lng.min && lng <= region.lng.max) {
      return region.clinicas;
    }
  }
  return null; // fuera de cobertura
}

async function _detectarRegionYCargarClinicas() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      _mostrarBannerUbicacion();
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const clinicas = _detectarClinicasPorCoords(lat, lng);
        if (clinicas) {
          _clinicasActivas = clinicas;
          resolve(clinicas);
        } else {
          // Fuera de cobertura — mostrar banner informativo
          _mostrarBannerSinCobertura();
          resolve(null);
        }
      },
      () => {
        _mostrarBannerUbicacion();
        resolve(null);
      },
      { timeout: 5000, maximumAge: 3600000 }
    );
  });
}

function getClinicasActivas() {
  return _clinicasActivas;
}

/* ── Banner: permiso de ubicación negado ── */
function _mostrarBannerUbicacion() {
  if (document.getElementById('wufly-geo-banner')) return;
  ['clinicas-section', 'tiendas-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const banner = document.createElement('div');
  banner.id = 'wufly-geo-banner';
  banner.innerHTML = `
    <div style="margin:0 16px 24px;background:linear-gradient(135deg,#3B1A8C,#5C2FA8);border-radius:18px;padding:22px 20px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 24px rgba(92,47,168,0.25);">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;flex-shrink:0;">📍</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:16px;font-weight:700;color:white;line-height:1.3;">Activa tu ubicación</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;line-height:1.5;">Sin permiso de ubicación, Wufly no puede mostrarte clínicas veterinarias ni tiendas cercanas a ti.</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button onclick="_irAConfiguracionUbicacion()" style="flex:1;background:white;color:#5C2FA8;border:none;border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚙️ Ir a configuración</button>
        <button onclick="this.closest('#wufly-geo-banner').remove()" style="background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.2);border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">Ahora no</button>
      </div>
    </div>`;
  _insertarBanner(banner);
}

/* ── Banner: región sin cobertura aún ── */
function _mostrarBannerSinCobertura() {
  if (document.getElementById('wufly-geo-banner')) return;
  ['clinicas-section', 'tiendas-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const banner = document.createElement('div');
  banner.id = 'wufly-geo-banner';
  banner.innerHTML = `
    <div style="margin:0 16px 24px;background:linear-gradient(135deg,#3B1A8C,#5C2FA8);border-radius:18px;padding:22px 20px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 24px rgba(92,47,168,0.25);">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;flex-shrink:0;">🌎</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:16px;font-weight:700;color:white;line-height:1.3;">Llegando pronto a tu ciudad</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;line-height:1.5;">Seguimos sumando clínicas verificadas en todo Chile. ¡Pronto habrá más cerca de ti!</div>
        </div>
      </div>
      <button onclick="this.closest('#wufly-geo-banner').remove()" style="background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.2);border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">Entendido 🐾</button>
    </div>`;
  _insertarBanner(banner);
}

function _insertarBanner(banner) {
  const ref = document.getElementById('pet-gallery-section');
  if (ref && ref.parentNode) {
    ref.parentNode.insertBefore(banner, ref.nextSibling);
  } else {
    const home = document.getElementById('page-home');
    if (home) home.prepend(banner);
  }
}

function _irAConfiguracionUbicacion() {
  const isIOS     = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  if (isIOS) {
    window.location.href = 'app-settings:';
  } else if (isAndroid) {
    window.location.href = 'intent:#Intent;action=android.settings.LOCATION_SOURCE_SETTINGS;end';
  } else {
    const isSafari  = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.includes('Firefox');
    let instruccion = '';
    if (isSafari)       instruccion = 'Safari → Preferencias → Sitios web → Ubicación → Permitir para wufly.cl';
    else if (isFirefox) instruccion = 'Firefox → Menú → Ajustes → Privacidad → Permisos → Ubicación';
    else                instruccion = 'Chrome → ícono 🔒 en la barra → Ubicación → Permitir → Recargar la página';
    alert(`Para activar la ubicación en tu navegador:\n\n${instruccion}`);
  }
}
