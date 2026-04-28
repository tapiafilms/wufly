/* ══ DRA. WUFLY — ASISTENTE VETERINARIA ══ */

/* Precarga voces del navegador (algunas cargan async) */
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices();
  });
  /* Keepalive para iOS — evita que Safari pause el speech a los 15s */
  setInterval(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);
}

function drwGetVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  return (
    voices.find(v => v.lang.startsWith('es') && /mónica|monica|lucía|lucia|elena|female/i.test(v.name)) ||
    voices.find(v => v.lang === 'es-ES') ||
    voices.find(v => v.lang.startsWith('es')) ||
    null
  );
}

function drwSpeak(text) {
  if (!window.speechSynthesis) { drwSetVideo('escuchando'); return; }
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'es-ES';
  utt.rate = 0.92;
  utt.pitch = 1.05;
  utt.volume = 1.0;

  const voice = drwGetVoice();
  if (voice) utt.voice = voice;

  utt.onstart  = () => drwSetVideo('hablando');
  utt.onend    = () => drwSetVideo('escuchando');
  utt.onerror  = () => drwSetVideo('escuchando');

  window.speechSynthesis.speak(utt);
}

let _typeTimer = null;

function drwSetBubble(text, type) {
  const bubble = document.getElementById('drw-bubble');
  const bubbleText = document.getElementById('drw-bubble-text');
  if (!bubble || !bubbleText) return;

  if (_typeTimer) { clearTimeout(_typeTimer); _typeTimer = null; }

  bubble.classList.remove('visible', 'drw-bubble--doc', 'drw-bubble--user');
  void bubble.offsetWidth; /* fuerza reflow para reiniciar animación */

  setTimeout(() => {
    bubble.classList.remove('drw-bubble--doc', 'drw-bubble--user');

    if (type === 'loading') {
      bubble.classList.add('drw-bubble--doc');
      bubbleText.innerHTML = '<span class="drw-dot"></span><span class="drw-dot"></span><span class="drw-dot"></span>';
      bubble.classList.add('visible');
    } else if (type === 'user') {
      bubble.classList.add('drw-bubble--user');
      bubbleText.textContent = text;
      bubble.classList.add('visible');
    } else {
      bubble.classList.add('drw-bubble--doc');
      bubbleText.textContent = '';
      bubble.classList.add('visible');
      /* Escritura letra por letra */
      let i = 0;
      function typeNext() {
        if (i < text.length) {
          bubbleText.textContent += text[i++];
          _typeTimer = setTimeout(typeNext, 18);
        }
      }
      typeNext();
    }
  }, 150);
}

function drwSetVideo(state) {
  const escuchando = document.getElementById('drw-escuchando');
  const hablando = document.getElementById('drw-hablando');
  if (!escuchando) return;

  if (state === 'hablando' && hablando) {
    escuchando.style.display = 'none';
    hablando.style.display = 'block';
    hablando.play().catch(() => {});
  } else {
    if (hablando) { hablando.pause(); hablando.style.display = 'none'; }
    escuchando.style.display = 'block';
    escuchando.play().catch(() => {});
  }
}

async function sendChat() {
  const inp = document.getElementById('chatInput');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';

  document.getElementById('btnSend').disabled = true;

  /* Desbloquear speechSynthesis en iOS sincrónicamente dentro del gesto */
  if (window.speechSynthesis) {
    const unlock = new SpeechSynthesisUtterance(' ');
    unlock.volume = 0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(unlock);
  }

  drwSetBubble(msg, 'user');

  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const sys = `Eres la Dra. Wufly, asistente veterinaria virtual de la app Wufly. Amable, directa y MUY breve — como si hablaras en voz alta.
${userContext ? `MASCOTA: ${userContext}` : ''}
SECCIONES DE LA APP — siempre redirige aquí, nunca a Google ni sitios externos:
- VETS: clínicas veterinarias cercanas, incluye urgencias 24h
- SERVICIOS: tiendas de mascotas, grooming, paseadores
- COMUNIDAD: adopciones, mascotas perdidas, rescate, recetas caseras
REGLAS ESTRICTAS:
- MÁXIMO 2 oraciones cortas. Nunca más. Sin listas ni puntos.
- Si alguien pregunta dónde encontrar algo (clínicas, tiendas, etc.), siempre responde con la sección correcta de la app.
- Nunca sugieras buscar en Google, internet ni fuera de la app.
- Si es urgente (envenenamiento, convulsiones, dificultad respiratoria), di ir a la sección VETS YA.
- El diagnóstico lo da el veterinario presencial, no tú.`;

  setTimeout(() => drwSetBubble('', 'loading'), 400);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 80,
        system: sys,
        messages: [{ role: 'user', content: msg }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(res.status >= 500 ? 'server' : 'client');

    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');

    drwSetBubble(text, 'doc');
    drwSpeak(text);

  } catch (e) {
    clearTimeout(timeoutId);
    let errMsg;
    if (e.name === 'AbortError') errMsg = 'La respuesta tardó demasiado. Intenta de nuevo.';
    else if (!navigator.onLine) errMsg = 'Sin conexión a internet.';
    else errMsg = 'No pude conectarme. Intenta en un momento.';
    drwSetBubble(errMsg, 'doc');
    drwSetVideo('escuchando');
  }

  document.getElementById('btnSend').disabled = false;
}
