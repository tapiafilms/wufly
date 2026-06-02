/* ══ DRA. WUFLY — ASISTENTE VETERINARIA ══ */

const ELEVENLABS_KEY     = 'sk_dc7b78b29bccad83d31fd71cb5a46c6db16d3b7f3db64cd6';
const ELEVENLABS_VOICE   = 'kcQkGnn0HAT2JRDQ4Ljp'; // Norah

let _recognition = null;
let _micActive = false;
const _chatPlaceholder = 'Ej: Mi perro lleva 2 días sin comer...';

function initMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;

  const btn = document.getElementById('btnMic');
  if (btn) btn.style.display = 'flex';

  _recognition = new SR();
  _recognition.lang = 'es-CL';
  _recognition.continuous = false;
  _recognition.interimResults = true;

  _recognition.onstart = () => {
    _micActive = true;
    btn.classList.add('recording');
    drwSetVideo('escuchando');
    document.getElementById('chatInput').placeholder = 'Escuchando...';
  };

  _recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('chatInput').value = transcript;
  };

  _recognition.onend = () => {
    _micActive = false;
    btn.classList.remove('recording');
    document.getElementById('chatInput').placeholder = _chatPlaceholder;
    const val = document.getElementById('chatInput').value.trim();
    if (val) sendChat();
  };

  _recognition.onerror = (e) => {
    _micActive = false;
    btn.classList.remove('recording');
    if (e.error !== 'no-speech' && e.error !== 'aborted') {
      document.getElementById('chatInput').placeholder = 'No se pudo acceder al micrófono';
      setTimeout(() => {
        document.getElementById('chatInput').placeholder = _chatPlaceholder;
      }, 2500);
    } else {
      document.getElementById('chatInput').placeholder = _chatPlaceholder;
    }
  };
}

function toggleMic() {
  if (!_recognition) return;
  if (_micActive) {
    _recognition.stop();
  } else {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
    try { _recognition.start(); } catch {}
  }
}

document.addEventListener('DOMContentLoaded', initMic);


async function drwSpeak(text) {
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE}/stream`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    });

    if (!res.ok) throw new Error(`ElevenLabs ${res.status}`);

    const buffer = await res.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(buffer);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.onended = () => drwSetVideo('escuchando');
    source.start();
    drwSetVideo('hablando'); // cambia justo cuando el audio arranca
  } catch (err) {
    console.warn('[drwSpeak]', err);
    drwSetVideo('escuchando');
  }
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
