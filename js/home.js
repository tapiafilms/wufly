/* ══════════════════════════════════════
   HOME — Wufly
   Página de inicio personalizada
   ══════════════════════════════════════ */

function renderHome() {
  const el = document.getElementById('page-home');
  if (!el) return;

  /* ── Leer perfil ── */
  let perfil = {};
  try {
    const raw = localStorage.getItem('wufly_profile_v1');
    if (raw) perfil = JSON.parse(raw);
  } catch {}

  /* ── Saludo según hora ── */
  const hora = new Date().getHours();
  let saludo = 'Buenos días';
  if (hora >= 12 && hora < 20) saludo = 'Buenas tardes';
  else if (hora >= 20) saludo = 'Buenas noches';

  /* ── Nombre del dueño ── */
  const nombre = perfil.nombre ? `, ${perfil.nombre}` : '';

  /* ── Nombre y emoji de la mascota ── */
  const nombreMascota = perfil.nombreMascota || '';
  const tipoEmoji = { perro: '🐕', gato: '🐈' }[perfil.tipomascota] || '🐾';

  /* ── Foto o emoji de mascota en el hero ── */
  const heroMedia = perfil.fotoMascota
    ? `<img src="${perfil.fotoMascota}" alt="mascota" style="width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.7);box-shadow:0 4px 16px rgba(0,0,0,0.25);">`
    : `<div style="font-size:72px;line-height:1;">${tipoEmoji}</div>`;

  /* ── Subtítulo hero ── */
  const subtitulo = nombreMascota
    ? `<div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:4px;font-weight:600;">${tipoEmoji} ${nombreMascota}</div>`
    : `<div style="font-size:13px;color:rgba(255,255,255,0.75);margin-top:4px;">Tu app de bienestar animal</div>`;

  /* ── Tips rotativos del Dr. Wufly ── */
  const tips = [
    'Asegúrate de que tu mascota siempre tenga agua fresca disponible. La hidratación es clave para su salud.',
    'Los perros necesitan al menos 30 minutos de ejercicio diario. Incluso un paseo corto mejora su bienestar.',
    'Cepilla los dientes de tu mascota 2-3 veces por semana para prevenir enfermedades periodontales.',
    'Las revisiones veterinarias anuales detectan problemas de salud antes de que se agraven.',
    'Nunca des chocolate, uvas, cebolla ni ajo a tu perro o gato — son tóxicos para ellos.',
    'Desparasita a tu mascota cada 3 meses para protegerla de parásitos internos y externos.',
    'El juego mental (juguetes de rompecabezas) cansa tanto como el ejercicio físico y reduce la ansiedad.',
  ];
  const tipIndex = new Date().getDay(); // 0-6 según día de semana
  const tipHoy = tips[tipIndex];

  /* ── Render ── */
  el.innerHTML = `
    <div style="padding-bottom:8px;">

      <!-- HERO con saludo -->
      <div style="background:linear-gradient(135deg,#4C1D95,#7C4DCC,#9B6BE0);border-radius:0 0 28px 28px;padding:24px 20px 28px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden;">
        <!-- Decoración de fondo -->
        <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.05);"></div>
        <div style="position:absolute;bottom:-30px;left:-20px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.04);"></div>

        <div style="position:relative;z-index:1;">
          ${heroMedia}
          <div style="margin-top:14px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:22px;color:white;line-height:1.2;">${saludo}${nombre}!</div>
            ${subtitulo}
          </div>
        </div>
      </div>

      <!-- ACCESO RÁPIDO -->
      <div style="padding:0 16px;margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:12px;">ACCESO RÁPIDO</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">

          <!-- Vets -->
          <button onclick="switchTab('restaurantes')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#5C2FA8,#7C4DCC);box-shadow:0 4px 14px rgba(92,47,168,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🏥</span>
            <span style="font-size:11px;font-weight:700;color:white;">Vets Cercanas</span>
          </button>

          <!-- Dr. Wufly -->
          <button onclick="switchTab('drwufly')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#0891B2,#06B6D4);box-shadow:0 4px 14px rgba(8,145,178,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🩺</span>
            <span style="font-size:11px;font-weight:700;color:white;">Dr. Wufly</span>
          </button>

          <!-- Adoptar -->
          <button onclick="switchComunidadTab('adoptar'); switchTab('comunidad')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#059669,#10B981);box-shadow:0 4px 14px rgba(5,150,105,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🐾</span>
            <span style="font-size:11px;font-weight:700;color:white;">Adoptar</span>
          </button>

          <!-- Arte -->
          <button onclick="switchServiciosTab('arte'); switchTab('servicios')"
            style="height:80px;border:none;cursor:pointer;border-radius:16px;background:linear-gradient(135deg,#7C3AED,#C026D3);box-shadow:0 4px 14px rgba(124,58,237,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;transition:transform 0.15s;"
            onmousedown="this.style.transform='scale(0.96)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.96)'" ontouchend="this.style.transform='scale(1)'">
            <span style="font-size:28px;line-height:1;">🎨</span>
            <span style="font-size:11px;font-weight:700;color:white;">Arte</span>
          </button>

        </div>
      </div>

      <!-- BANNER MEVETLAB -->
      <div style="margin:0 16px 20px;border-radius:18px;overflow:hidden;box-shadow:0 4px 18px rgba(124,77,204,0.3);">
        <div style="background:linear-gradient(135deg,#7C4DCC,#5DD6A8);padding:16px 18px;">
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:0.06em;margin-bottom:6px;">🚨 Urgencias 24h — MEVETLAB</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:white;margin-bottom:4px;">Clínica con laboratorio propio</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.8);margin-bottom:14px;">Hospitalización 24h · Atención Fear Free · Quirófano equipado</div>
          <button onclick="switchTab('restaurantes')"
            style="background:rgba(255,255,255,0.22);border:1.5px solid rgba(255,255,255,0.5);border-radius:100px;padding:8px 18px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            Ver clínicas →
          </button>
        </div>
      </div>

      <!-- ARTISTA DESTACADO -->
      <div style="margin:0 16px 20px;background:linear-gradient(150deg,#FAF5FF,#F3E8FF);border-radius:16px;border-left:4px solid #7C3AED;padding:16px 18px;box-shadow:0 2px 10px rgba(124,58,237,0.1);">
        <div style="font-size:10px;font-weight:700;color:#7C3AED;letter-spacing:0.07em;margin-bottom:6px;">🎨 ARTE · RETRATOS DE MASCOTAS</div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:#2D1B6B;margin-bottom:4px;">Valeria Muñoz</div>
        <div style="font-size:12px;color:#6B7280;margin-bottom:14px;">¿Quieres inmortalizar a tu mascota? Óleo, acuarela, lápiz y arte digital.</div>
        <button onclick="switchServiciosTab('arte'); switchTab('servicios')"
          style="background:linear-gradient(135deg,#7C3AED,#C026D3);border:none;border-radius:100px;padding:8px 18px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Ver artistas →
        </button>
      </div>

      <!-- TIP DEL DR. WUFLY -->
      <div style="margin:0 16px 24px;background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-radius:16px;border-left:4px solid #3B82F6;padding:16px 18px;box-shadow:0 2px 10px rgba(59,130,246,0.1);">
        <div style="font-size:10px;font-weight:700;color:#3B82F6;letter-spacing:0.07em;margin-bottom:6px;">💡 TIP DEL DÍA</div>
        <div style="font-size:13px;color:#1E3A5F;line-height:1.6;margin-bottom:14px;">${tipHoy}</div>
        <button onclick="switchTab('drwufly')"
          style="background:linear-gradient(135deg,#2563EB,#3B82F6);border:none;border-radius:100px;padding:8px 18px;color:white;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Preguntar al Dr. Wufly →
        </button>
      </div>

    </div>
  `;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
});
