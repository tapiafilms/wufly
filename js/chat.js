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

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: sys,
        messages: [{ role: 'user', content: msg }]
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');
    loading.remove();
    addMsg(text, 'bot');
  } catch (e) {
    console.error('[Chat]', e);
    const errMsg = navigator.onLine
      ? 'No pude conectarme. Intenta de nuevo en un momento. 🙏'
      : 'Sin conexión a internet. Conéctate para chatear.';
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
