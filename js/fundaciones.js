/* ══════════════════════════════════════
   FUNDACIONES — WUFLY
   Organizaciones de rescate animal
   ══════════════════════════════════════ */

const fundaciones = [
  {
    id: 'f1',
    nombre: 'Fundación Tierra de Animales',
    especie: 'todos',
    ciudad: 'Santiago',
    emoji: '🏡',
    descripcion: 'Una de las fundaciones de rescate animal más grandes de Chile. Trabajan con perros y gatos en situación de calle, ofreciendo refugio, atención veterinaria y adopción responsable.',
    mision: 'Rescatar, rehabilitar y encontrar un hogar para animales abandonados, promoviendo la tenencia responsable.',
    actividades: [
      'Rescate de animales en situación de calle',
      'Atención veterinaria gratuita a animales rescatados',
      'Proceso de adopción responsable con seguimiento',
      'Campañas de esterilización masiva',
      'Educación y concientización en colegios',
    ],
    comoAyudar: 'Puedes apadrinar un animal, donar alimento o insumos veterinarios, o postular como familia adoptante.',
    web: 'https://www.tierradeanimales.cl',
    instagram: '@tierradeanimales',
    whatsapp: null,
  },
  {
    id: 'f2',
    nombre: 'Fundación Equidad',
    especie: 'todos',
    ciudad: 'Santiago',
    emoji: '🤝',
    descripcion: 'Organización sin fines de lucro enfocada en la protección animal y el bienestar de animales domésticos en situación de vulnerabilidad en Chile.',
    mision: 'Promover la tenencia responsable, el respeto hacia los animales y el fin del maltrato y abandono.',
    actividades: [
      'Rescate de animales maltratados o abandonados',
      'Programa de familias de acogida temporal',
      'Ferias de adopción periódicas',
      'Asesoría legal en casos de maltrato animal',
      'Campañas de esterilización subsidiadas',
    ],
    comoAyudar: 'Hazte voluntario, conviértete en familia de acogida o realiza donaciones en su sitio web.',
    web: 'https://www.fundacionequidad.cl',
    instagram: '@fundacionequidad',
    whatsapp: null,
  },
  {
    id: 'f3',
    nombre: 'WWF Chile',
    especie: 'silvestre',
    ciudad: 'Nacional',
    emoji: '🐼',
    descripcion: 'Filial chilena del Fondo Mundial para la Naturaleza. Trabaja en la conservación de especies silvestres nativas y sus ecosistemas, con especial foco en fauna patagónica y marina.',
    mision: 'Conservar la naturaleza y reducir las amenazas más urgentes para la diversidad de la vida en la Tierra.',
    actividades: [
      'Conservación del huemul, puma y otras especies en peligro',
      'Protección de ecosistemas marinos en Patagonia',
      'Programas de educación ambiental',
      'Investigación y monitoreo de fauna silvestre',
      'Incidencia en políticas públicas medioambientales',
    ],
    comoAyudar: 'Puedes apadrinar una especie, donar mensualmente o participar como voluntario en campañas.',
    web: 'https://www.wwf.cl',
    instagram: '@wwfchile',
    whatsapp: null,
  },
  {
    id: 'f4',
    nombre: 'Red de Rescate Animal Chile',
    especie: 'todos',
    ciudad: 'Nacional',
    emoji: '🚨',
    descripcion: 'Red colaborativa de voluntarios a lo largo de Chile que coordinan rescates de emergencia, acogidas temporales y adopciones para animales en situación de riesgo.',
    mision: 'Articular una red solidaria que garantice atención rápida a animales en peligro en todo el territorio nacional.',
    actividades: [
      'Coordinación de rescates de emergencia 24/7',
      'Red de hogares de acogida temporal',
      'Difusión de animales en adopción en redes sociales',
      'Conexión entre veterinarios solidarios y animales rescatados',
      'Apoyo a dueños en crisis que deben entregar sus mascotas',
    ],
    comoAyudar: 'Únete como voluntario, ofrece tu hogar como acogida temporal o difunde animales en busca de hogar.',
    web: null,
    instagram: '@redrescateanimalchile',
    whatsapp: '+56 9 1234 5678',
  },
  {
    id: 'f5',
    nombre: 'Humane Society International',
    especie: 'todos',
    ciudad: 'Internacional',
    emoji: '🌍',
    descripcion: 'Una de las organizaciones de protección animal más grandes del mundo, con presencia en Chile. Trabajan contra el maltrato, el comercio ilegal de fauna y las granjas de producción intensiva.',
    mision: 'Crear un mundo donde los animales estén libres de crueldad, explotación y negligencia.',
    actividades: [
      'Campañas contra el maltrato y abandono de mascotas',
      'Oposición al comercio ilegal de fauna silvestre',
      'Rescate y reubicación de animales de granjas',
      'Presión legislativa para leyes de protección animal',
      'Educación sobre bienestar y tenencia responsable',
    ],
    comoAyudar: 'Dona, firma peticiones o participa en campañas de concientización desde su sitio web.',
    web: 'https://www.hsi.org/es',
    instagram: '@hsichile',
    whatsapp: null,
  },
];

/* ══ RENDER LISTA ══ */
function renderFundaciones() {
  const especieColor = {
    'todos':    { bg: 'var(--purple-light)', color: 'var(--purple)', label: '🐾 Perros y gatos' },
    'silvestre':{ bg: 'var(--mint-light)',   color: 'var(--mint-dark)', label: '🦁 Fauna silvestre' },
  };

  const html = fundaciones.map(f => {
    const ec = especieColor[f.especie] || especieColor['todos'];
    return `
      <div onclick="abrirFundacion('${f.id}')"
        style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);cursor:pointer;display:flex;gap:14px;align-items:center;transition:box-shadow 0.2s;"
        onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'">
        <div style="font-size:40px;width:56px;height:56px;min-width:56px;display:flex;align-items:center;justify-content:center;background:var(--purple-light);border-radius:14px;">${f.emoji}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:4px;">${f.nombre}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px;">
            <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:${ec.bg};color:${ec.color};">${ec.label}</span>
            <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--peach-light);color:#C0660A;">📍 ${f.ciudad}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${f.descripcion}</div>
        </div>
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--text-hint);fill:none;stroke-width:2;stroke-linecap:round;flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
  }).join('');

  ['fundacionesFeed', 'fundacionesFeedCom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

/* ══ ABRIR DETALLE ══ */
function abrirFundacion(id) {
  const f = fundaciones.find(x => x.id === id);
  if (!f) return;

  const modal = document.getElementById('recetaModal');
  const body  = document.getElementById('recetaModalBody');
  if (!modal || !body) return;

  const especieColor = {
    'todos':    { bg: 'var(--purple-light)', color: 'var(--purple)', label: '🐾 Perros y gatos' },
    'silvestre':{ bg: 'var(--mint-light)',   color: 'var(--mint-dark)', label: '🦁 Fauna silvestre' },
  };
  const ec = especieColor[f.especie] || especieColor['todos'];

  const botonesContacto = [
    f.web ? `<a href="${f.web}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:13px;font-size:14px;font-weight:700;text-decoration:none;">🌐 Visitar sitio web</a>` : '',
    f.whatsapp ? `<a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:13px;font-size:14px;font-weight:700;text-decoration:none;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Contactar por WhatsApp</a>` : '',
    f.instagram ? `<div style="text-align:center;font-size:12px;color:var(--text-muted);padding:4px 0;">📸 Instagram: <strong>${f.instagram}</strong></div>` : '',
  ].filter(Boolean).join('');

  body.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:white;padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${f.emoji} ${f.nombre}</div>
      <button onclick="cerrarReceta()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:16px;">

      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:${ec.bg};color:${ec.color};">${ec.label}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--peach-light);color:#C0660A;">📍 ${f.ciudad}</span>
      </div>

      <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">${f.descripcion}</p>

      <div style="background:var(--purple-light);border-radius:var(--r-xs);padding:12px 14px;">
        <div style="font-size:11px;font-weight:700;color:var(--purple);margin-bottom:4px;">🎯 Misión</div>
        <div style="font-size:13px;color:var(--text);line-height:1.6;">${f.mision}</div>
      </div>

      <div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">🐾 Qué hacen</div>
        ${f.actividades.map(a => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);">
            <span style="color:var(--purple);font-weight:700;margin-top:1px;">•</span>
            <span style="font-size:14px;color:var(--text);">${a}</span>
          </div>
        `).join('')}
      </div>

      <div style="background:var(--mint-light);border-radius:var(--r-xs);padding:12px 14px;">
        <div style="font-size:11px;font-weight:700;color:var(--mint-dark);margin-bottom:4px;">💚 ¿Cómo ayudar?</div>
        <div style="font-size:13px;color:var(--mint-dark);line-height:1.6;">${f.comoAyudar}</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;padding-bottom:8px;">
        ${botonesContacto}
      </div>

    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderFundaciones);
