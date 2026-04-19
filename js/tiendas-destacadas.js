/* ══════════════════════════════════════════════════════════════
   TIENDAS VITRINA — edita este archivo para actualizar
   las 3 tiendas fijas que aparecen al tope de la sección TIENDAS.

   Campos disponibles por tienda:
   ──────────────────────────────
   id          string   identificador único (sin espacios)
   nombre      string   nombre completo de la tienda
   subtitulo   string   categorías principales (línea pequeña bajo el nombre)
   grad        string   gradiente CSS del card (ej: 'linear-gradient(135deg,#B45309,#F59E0B)')
   icon        string   emoji principal
   ciudad      string   ciudad (aparece al pie del card)
   direccion   string   dirección física completa
   telefono    string   número para llamar (con +56, ej: '+56 9 6631 7573')
   whatsapp    string   número para WhatsApp sin espacios ni guiones (ej: '56966317573')
   web         string   dominio sin https:// (ej: 'petslife.cl')
   horario     string   horario de atención
   descripcion string   texto descriptivo que aparece en el card y en el detalle
   rating      number   nota promedio (ej: 4.6)
   reviews     number   cantidad de reseñas
   fotos       array    URLs de fotos para la vista de detalle (dejar [] si no hay)
   equipo      array    lista de staff: { nombre, rol, foto (URL o '') }
   tags        array    lista de categorías/productos que aparecen como pills
   lat/lng     number   coordenadas para el botón "Cómo llegar" (null si no se tiene)
   ══════════════════════════════════════════════════════════════ */

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
    descripcion: 'Pet shop con múltiples sucursales en Viña del Mar. Alimentos premium, accesorios, higiene y peluquería canina. Atención personalizada y asesoría en nutrición para todas las especies.',
    rating: 4.6,
    reviews: 0,
    fotos: [],
    equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Peluquería canina', 'Higiene', 'Nutrición'],
    lat: null,
    lng: null,
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
    descripcion: 'Tienda especializada en nutrición y accesorios para mascotas en Reñaca. Amplio stock de alimentos de marcas premium, productos de higiene, juguetes y servicio de grooming.',
    rating: 4.7,
    reviews: 0,
    fotos: [],
    equipo: [],
    tags: ['Alimentos premium', 'Grooming', 'Juguetes', 'Higiene', 'Marcas premium'],
    lat: null,
    lng: null,
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
    descripcion: 'Centro de productos y cuidado para mascotas en Concón. Alimentos de primeras marcas, accesorios, productos de higiene y servicio de grooming. Amplio horario de atención.',
    rating: 4.7,
    reviews: 0,
    fotos: [],
    equipo: [],
    tags: ['Alimentos', 'Grooming', 'Accesorios', 'Higiene', 'Primeras marcas'],
    lat: null,
    lng: null,
  },
];
