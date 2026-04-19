/* ══════════════════════════════════════════════════════════════
   CLÍNICAS DESTACADAS — edita este archivo para actualizar
   las 3 clínicas fijas que aparecen al tope de la sección VETS.

   Campos disponibles por clínica:
   ──────────────────────────────
   id          string   identificador único (sin espacios)
   nombre      string   nombre completo de la clínica
   subtitulo   string   servicios principales (línea pequeña bajo el nombre)
   grad        string   gradiente CSS del card (ej: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)')
   icon        string   emoji principal
   urgencia    boolean  muestra badge "Urgencias 24h" si es true
   ciudad      string   ciudad (aparece al pie del card)
   direccion   string   dirección física completa
   telefono    string   número para llamar (con +56, ej: '+56 9 9109 2675')
   whatsapp    string   número para WhatsApp sin espacios ni guiones (ej: '56991092675')
   web         string   dominio sin https:// (ej: 'mevetlab.cl')
   horario     string   horario de atención
   descripcion string   texto descriptivo que aparece en el card y en el detalle
   rating      number   nota promedio (ej: 4.8)
   reviews     number   cantidad de reseñas
   fotos       array    URLs de fotos para la vista de detalle (dejar [] si no hay)
   veterinarios array   lista de vets: { nombre, especialidad, foto (URL o '') }
   tags        array    lista de servicios que aparecen como pills
   lat/lng     number   coordenadas para el botón "Cómo llegar" (null si no se tiene)
   ══════════════════════════════════════════════════════════════ */

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
    rating: 4.8,
    reviews: 312,
    fotos: [],
    veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio propio', 'Hospitalización', 'Cirugía', 'Fear Free'],
    lat: null,
    lng: null,
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
    rating: 4.0,
    reviews: 364,
    fotos: [],
    veterinarios: [],
    tags: ['Urgencias 24h', 'Animales exóticos', 'Peluquería canina', 'Farmacia'],
    lat: null,
    lng: null,
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
    rating: 4.5,
    reviews: 276,
    fotos: [],
    veterinarios: [],
    tags: ['Emergencias', 'Cirugía', 'Vacunación', 'Medicina preventiva'],
    lat: null,
    lng: null,
  },
];
