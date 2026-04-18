/* ══ ASISTENTE VETERINARIO WUFLY ══ */

async function sendChat() {
  const inp = document.getElementById('chatInput');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';

  addMsg(msg, 'user');
  document.getElementById('btnSend').disabled = true;
  const loading = addMsg('Escribiendo...', 'loading-msg');

  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const sys = `Eres Wufly AI, un asistente especializado en salud animal y bienestar de mascotas. Respondes en español de forma clara, empática y práctica.
${userContext ? `PERFIL DE LA MASCOTA: ${userContext}` : ''}
Usa el perfil para personalizar cada respuesta (tipo de mascota, edad, condiciones de salud).
Reglas importantes:
- Responde siempre en lenguaje simple, sin tecnicismos innecesarios
- Si la situación es urgente (envenenamiento, dificultad respiratoria, trauma, convulsiones), indícalo claramente y recomienda ir INMEDIATAMENTE a una clínica veterinaria
- Si corresponde, menciona que puede encontrar clínicas con urgencias 24h en la sección VETS de la app
- Para consultas de salud, siempre aclara que eres un orientador y que el diagnóstico definitivo lo debe dar un veterinario presencialmente
- Sé empático — los dueños suelen estar preocupados por sus mascotas
- Para cachorros y animales senior, sé más precavido en tus recomendaciones
Aviso: Este asistente entrega orientación general y no constituye un diagnóstico médico veterinario.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: sys,
        messages: [{ role: 'user', content: msg }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.status >= 500) throw new Error('server');
    if (!res.ok) throw new Error('client');

    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');
    loading.remove();
    addMsg(text, 'bot');
  } catch (e) {
    clearTimeout(timeoutId);
    let errMsg;
    if (e.name === 'AbortError') {
      errMsg = 'La respuesta tardó demasiado. Intenta de nuevo. ⏱️';
    } else if (!navigator.onLine) {
      errMsg = 'Sin conexión a internet. Conéctate para chatear.';
    } else if (e.message === 'server') {
      errMsg = 'El asistente no está disponible ahora. Intenta más tarde. 🙏';
    } else {
      errMsg = 'No pude conectarme. Intenta de nuevo en un momento.';
    }
    loading.className = 'msg bot error-msg';
    loading.textContent = errMsg;
  }

  document.getElementById('btnSend').disabled = false;
}

function addMsg(text, type) {
  const wrap = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
  return div;
}
