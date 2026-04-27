/* ══ DRA. WUFLY — ASISTENTE VETERINARIA ══ */

function drwSetBubble(text, type) {
  const bubble = document.getElementById('drw-bubble');
  const bubbleText = document.getElementById('drw-bubble-text');
  if (!bubble || !bubbleText) return;

  bubble.classList.remove('visible');

  setTimeout(() => {
    bubble.classList.remove('drw-bubble--doc', 'drw-bubble--user');

    if (type === 'loading') {
      bubble.classList.add('drw-bubble--doc');
      bubbleText.innerHTML = '<span class="drw-dot"></span><span class="drw-dot"></span><span class="drw-dot"></span>';
    } else if (type === 'user') {
      bubble.classList.add('drw-bubble--user');
      bubbleText.textContent = text;
    } else {
      bubble.classList.add('drw-bubble--doc');
      bubbleText.textContent = text;
    }

    bubble.classList.add('visible');
  }, 180);
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

  const sys = `Eres la Dra. Wufly, asistente veterinaria virtual de la app Wufly. Eres amable, empática y de pocas palabras.
${userContext ? `PERFIL DE LA MASCOTA: ${userContext}` : ''}
Reglas:
- Máximo 2 oraciones cortas. Sé directa y cálida.
- Usa el perfil de la mascota para personalizar tu respuesta si está disponible.
- Si la situación es urgente (envenenamiento, dificultad respiratoria, trauma, convulsiones), indícalo claramente y recomienda ir INMEDIATAMENTE a una clínica.
- Puedes mencionar la sección VETS de la app para clínicas con urgencias 24h.
- Siempre aclara que el diagnóstico definitivo lo da un veterinario presencial.
Aviso: Entregas orientación general, no diagnóstico médico.`;

  setTimeout(() => drwSetBubble('', 'loading'), 400);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        system: sys,
        messages: [{ role: 'user', content: msg }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(res.status >= 500 ? 'server' : 'client');

    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');

    drwSetVideo('hablando');
    drwSetBubble(text, 'doc');

    const readTime = Math.max(3500, text.length * 55);
    setTimeout(() => drwSetVideo('escuchando'), readTime);

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
