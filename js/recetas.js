/* ══════════════════════════════════════
   RECETAS CASERAS — WUFLY
   Para perros y gatos
   ══════════════════════════════════════ */

const recetas = [
  /* ══ PERROS ══ */
  {
    id: 'r1',
    nombre: 'Galletas de avena y plátano',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '25 min',
    dificultad: 'Fácil',
    emoji: '🍪',
    descripcion: 'Snack crujiente y dulce que los perros adoran. Sin azúcar, sin sal, solo ingredientes naturales.',
    ingredientes: [
      '1 plátano maduro',
      '1 taza de avena en hojuelas',
      '1 huevo',
      '2 cucharadas de mantequilla de maní (sin xilitol)',
    ],
    pasos: [
      'Precalienta el horno a 180°C.',
      'Aplasta el plátano con un tenedor hasta obtener un puré.',
      'Mezcla todos los ingredientes hasta obtener una masa firme.',
      'Forma pequeñas galletas y colócalas en una bandeja con papel mantequilla.',
      'Hornea 15 min hasta que estén doradas. Deja enfriar completamente antes de dar.',
    ],
    conservacion: 'Hasta 1 semana en recipiente hermético o 1 mes congelado.',
    advertencia: null,
  },
  {
    id: 'r2',
    nombre: 'Caldo de pollo para perros',
    especie: 'perro',
    tipo: 'comida',
    tiempo: '1h 30min',
    dificultad: 'Fácil',
    emoji: '🍲',
    descripcion: 'Caldo nutritivo ideal para mejorar el apetito, hidratar en días calurosos o mezclar con croquetas.',
    ingredientes: [
      '500g de pechuga de pollo sin piel',
      '1 zanahoria grande',
      '1 rama de apio',
      '1 litro de agua',
    ],
    pasos: [
      'Coloca el pollo en una olla con agua fría.',
      'Agrega la zanahoria y el apio en trozos grandes.',
      'Cocina a fuego medio-bajo por 1 hora sin sal ni condimentos.',
      'Retira el pollo y las verduras. Deja enfriar el caldo.',
      'Puedes desmenuzar el pollo y mezclarlo de vuelta al caldo.',
      'Sirve tibio, nunca caliente.',
    ],
    conservacion: 'Hasta 4 días en refrigerador o 2 meses congelado en porciones.',
    advertencia: 'Nunca agregues cebolla, ajo, sal ni especias. Son tóxicos para los perros.',
  },
  {
    id: 'r3',
    nombre: 'Helado de yogur y arándanos',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '10 min + 4h congelado',
    dificultad: 'Muy fácil',
    emoji: '🍦',
    descripcion: 'Refrescante para días de calor. El yogur natural aporta probióticos y los arándanos son ricos en antioxidantes.',
    ingredientes: [
      '1 taza de yogur natural sin azúcar',
      '½ taza de arándanos frescos o congelados',
      '1 cucharada de miel (solo para perros adultos)',
    ],
    pasos: [
      'Mezcla el yogur con los arándanos en una licuadora.',
      'Vierte en moldes de hielo o vasitos pequeños.',
      'Congela por al menos 4 horas.',
      'Sirve directamente del congelador en un día caluroso.',
    ],
    conservacion: 'Hasta 2 meses congelado.',
    advertencia: 'No uses yogur con edulcorantes artificiales ni xilitol. No dar miel a cachorros menores de 1 año.',
  },
  {
    id: 'r4',
    nombre: 'Bolitas de atún y zanahoria',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '20 min',
    dificultad: 'Fácil',
    emoji: '🐟',
    descripcion: 'Snack proteico y sabroso. El atún aporta omega-3 y la zanahoria es excelente para los dientes.',
    ingredientes: [
      '1 lata de atún al agua (sin sal)',
      '1 zanahoria rallada',
      '1 huevo',
      '½ taza de harina de arroz',
    ],
    pasos: [
      'Precalienta el horno a 175°C.',
      'Escurre bien el atún y mezcla con la zanahoria y el huevo.',
      'Agrega la harina hasta obtener una masa manejable.',
      'Forma bolitas pequeñas y ponlas en una bandeja.',
      'Hornea 15 min. Deja enfriar antes de servir.',
    ],
    conservacion: 'Hasta 5 días refrigerado.',
    advertencia: null,
  },
  /* ══ GATOS ══ */
  {
    id: 'r5',
    nombre: 'Mousse de pollo para gatos',
    especie: 'gato',
    tipo: 'comida',
    tiempo: '30 min',
    dificultad: 'Fácil',
    emoji: '🐈',
    descripcion: 'Textura suave ideal para gatos exigentes o adultos mayores. Rica en proteína animal.',
    ingredientes: [
      '150g de pechuga de pollo cocida',
      '2 cucharadas de caldo de pollo sin sal',
      '1 cucharadita de aceite de salmón',
    ],
    pasos: [
      'Cocina el pollo al vapor o hervido, sin sal ni condimentos.',
      'Procesa el pollo en una licuadora o procesador.',
      'Agrega el caldo poco a poco hasta lograr una textura cremosa.',
      'Añade el aceite de salmón y mezcla bien.',
      'Sirve a temperatura ambiente.',
    ],
    conservacion: 'Hasta 3 días refrigerado en recipiente cerrado.',
    advertencia: 'Los gatos son carnívoros estrictos — nunca agregues verduras, frutas ni carbohidratos en exceso.',
  },
  {
    id: 'r6',
    nombre: 'Snack de salmón deshidratado',
    especie: 'gato',
    tipo: 'snack',
    tiempo: '3h (horno bajo)',
    dificultad: 'Media',
    emoji: '🐠',
    descripcion: 'Snacks naturales de salmón sin aditivos. Perfectos como premio o para estimular a un gato inapetente.',
    ingredientes: [
      '200g de filete de salmón fresco',
    ],
    pasos: [
      'Precalienta el horno a 90°C (temperatura muy baja).',
      'Corta el salmón en tiras finas de 1-2 cm.',
      'Colócalas en una rejilla sobre una bandeja.',
      'Deshidrata por 2,5 a 3 horas, dando vuelta a mitad del proceso.',
      'Están listas cuando se sientan secas y flexibles. Deja enfriar.',
    ],
    conservacion: 'Hasta 2 semanas en refrigerador o 2 meses congelado.',
    advertencia: 'No agregues sal, aceite ni condimentos. Asegúrate de que el salmón esté bien cocido.',
  },
  {
    id: 'r7',
    nombre: 'Caldo hidratante para gatos',
    especie: 'gato',
    tipo: 'bebida',
    tiempo: '45 min',
    dificultad: 'Muy fácil',
    emoji: '💧',
    descripcion: 'Ideal para gatos que beben poca agua. El aroma del pollo los atrae y mejora su hidratación.',
    ingredientes: [
      '300g de pollo (pechuga o muslo sin huesos)',
      '600ml de agua filtrada',
    ],
    pasos: [
      'Hierve el pollo en el agua a fuego medio por 40 minutos.',
      'Retira el pollo (puedes guardarlo para otra preparación).',
      'Cuela el caldo y déjalo enfriar completamente.',
      'Retira la grasa que se solidifica en la superficie.',
      'Sirve en pequeñas cantidades junto al agua fresca habitual.',
    ],
    conservacion: 'Hasta 4 días refrigerado.',
    advertencia: 'Nunca uses huesos pequeños ni condimentos. El caldo es un suplemento, no un reemplazo del agua.',
  },
];

/* ══ ESTADO ══ */
let recetasFiltro = 'todos';
let recetaAbierta = null;

/* ══ RENDER LISTA ══ */
function renderRecetas() {
  const container = document.getElementById('recetasFeed');
  if (!container) return;

  const filtered = recetas.filter(r =>
    recetasFiltro === 'todos' || r.especie === recetasFiltro
  );

  container.innerHTML = filtered.map(r => `
    <div onclick="abrirReceta('${r.id}')"
      style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);cursor:pointer;display:flex;gap:14px;align-items:center;transition:box-shadow 0.2s;"
      onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'">
      <div style="font-size:40px;width:56px;height:56px;min-width:56px;display:flex;align-items:center;justify-content:center;background:var(--peach-light);border-radius:14px;">${r.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:4px;">${r.nombre}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px;">
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:${r.especie === 'perro' ? 'var(--purple-light)' : 'var(--mint-light)'};color:${r.especie === 'perro' ? 'var(--purple)' : 'var(--mint-dark)'};">${r.especie === 'perro' ? '🐕 Perro' : '🐈 Gato'}</span>
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--peach-light);color:#C0660A;">⏱ ${r.tiempo}</span>
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--bg);color:var(--text-muted);">${r.dificultad}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.4;">${r.descripcion}</div>
      </div>
      <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--text-hint);fill:none;stroke-width:2;stroke-linecap:round;flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `).join('');
}

/* ══ ABRIR RECETA DETALLE ══ */
function abrirReceta(id) {
  const r = recetas.find(x => x.id === id);
  if (!r) return;

  const modal = document.getElementById('recetaModal');
  const body  = document.getElementById('recetaModalBody');

  body.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:white;padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${r.emoji} ${r.nombre}</div>
      <button onclick="cerrarReceta()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;">✕</button>
    </div>
    <div style="padding:20px;">
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:${r.especie === 'perro' ? 'var(--purple-light)' : 'var(--mint-light)'};color:${r.especie === 'perro' ? 'var(--purple)' : 'var(--mint-dark)'};">${r.especie === 'perro' ? '🐕 Para perros' : '🐈 Para gatos'}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--peach-light);color:#C0660A;">⏱ ${r.tiempo}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--bg);color:var(--text-muted);">${r.dificultad}</span>
      </div>

      <p style="font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:20px;">${r.descripcion}</p>

      <div style="margin-bottom:20px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">🧾 Ingredientes</div>
        ${r.ingredientes.map(i => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);">
            <span style="color:var(--mint);font-weight:700;margin-top:1px;">•</span>
            <span style="font-size:14px;color:var(--text);">${i}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom:20px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">👩‍🍳 Preparación</div>
        ${r.pasos.map((p, i) => `
          <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--border);">
            <div style="width:24px;height:24px;min-width:24px;background:var(--purple);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;">${i+1}</div>
            <span style="font-size:13px;color:var(--text);line-height:1.6;">${p}</span>
          </div>
        `).join('')}
      </div>

      <div style="background:var(--mint-light);border-radius:var(--r-xs);padding:12px 14px;margin-bottom:${r.advertencia ? '12px' : '0'};">
        <div style="font-size:11px;font-weight:700;color:var(--mint-dark);margin-bottom:3px;">🧊 Conservación</div>
        <div style="font-size:13px;color:var(--mint-dark);">${r.conservacion}</div>
      </div>

      ${r.advertencia ? `
        <div style="background:#FFF3CD;border-radius:var(--r-xs);padding:12px 14px;border:1px solid #FFD93D;">
          <div style="font-size:11px;font-weight:700;color:#856404;margin-bottom:3px;">⚠️ Advertencia</div>
          <div style="font-size:13px;color:#856404;">${r.advertencia}</div>
        </div>
      ` : ''}
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarReceta() {
  const modal = document.getElementById('recetaModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function setFiltroRecetas(el, val) {
  recetasFiltro = val;
  document.querySelectorAll('#sub-recetas .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderRecetas();
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderRecetas);
