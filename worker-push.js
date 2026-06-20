/* ══════════════════════════════════════════════════════════════════
   WUFLY — Push Notification Worker
   Deploy: wrangler deploy worker-push.js --name wufly-push
   Secret: wrangler secret put SUPABASE_SERVICE_KEY
   ══════════════════════════════════════════════════════════════════ */

const VAPID_PUBLIC_KEY = 'BKgfIN8ffRfuVhQ-ebLhvt1zT-bTumBBsHw-pTrYIdwJgjJ217jGNk3zD9-ycbjfKwQ-awzb2G1lOVWqOLBXM50';
const VAPID_SUBJECT    = 'mailto:admin@wufly.cl';
// VAPID_PRIVATE_KEY se lee de env.VAPID_PRIVATE_KEY (wrangler secret put VAPID_PRIVATE_KEY)
const SUPABASE_URL      = 'https://ybnacudfqerbzpvqcjzc.supabase.co';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── Subir imagen base64 a fal.ai Storage y devolver URL pública ──────────
// Subir imagen base64 a Supabase Storage temporal y devolver URL pública para fal.ai
async function uploadBase64ToSupabase(dataUrl, serviceKey) {
  const [header, b64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const binary = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const ext  = mime.split('/')[1] || 'jpg';
  const path = `temp/juntos_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  console.log(`[upload] mime=${mime} size=${binary.length} path=${path}`);
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/mascotas/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': mime,
      'x-upsert': 'true',
    },
    body: binary,
  });
  const resText = await res.text();
  console.log(`[upload] status=${res.status} body=${resText.slice(0, 200)}`);
  if (!res.ok) throw new Error(`supabase upload error ${res.status}: ${resText.slice(0, 200)}`);
  return `${SUPABASE_URL}/storage/v1/object/public/mascotas/${path}`;
}

// ── Helpers ──────────────────────────────────────────────────────────────
function b64url(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function fromB64url(s) {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b + '='.repeat((4 - b.length % 4) % 4)), c => c.charCodeAt(0));
}
function concat(...arrs) {
  const out = new Uint8Array(arrs.reduce((n, a) => n + a.length, 0));
  let i = 0; for (const a of arrs) { out.set(a, i); i += a.length; }
  return out;
}

// ── VAPID JWT ─────────────────────────────────────────────────────────────
async function vapidAuth(endpoint, privateKey) {
  const origin  = new URL(endpoint).origin;
  const now     = Math.floor(Date.now() / 1000);
  const enc     = new TextEncoder();
  const header  = b64url(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = b64url(enc.encode(JSON.stringify({ aud: origin, exp: now + 43200, sub: VAPID_SUBJECT })));
  const input   = `${header}.${payload}`;

  const pubBytes = fromB64url(VAPID_PUBLIC_KEY);
  const key = await crypto.subtle.importKey('jwk', {
    kty: 'EC', crv: 'P-256',
    d: privateKey,
    x: b64url(pubBytes.slice(1, 33)),
    y: b64url(pubBytes.slice(33, 65)),
  }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);

  const sig = new Uint8Array(await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(input)
  ));
  return `vapid t=${input}.${b64url(sig)},k=${VAPID_PUBLIC_KEY}`;
}

// ── RFC 8291 payload encryption ───────────────────────────────────────────
async function encryptPayload(payloadStr, p256dh, authSecret) {
  const enc       = new TextEncoder();
  const plain     = enc.encode(payloadStr);
  const uaPublic  = fromB64url(p256dh);
  const authKey   = fromB64url(authSecret);

  // Ephemeral server ECDH key pair
  const asKP = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const asPublicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', asKP.publicKey));

  // ECDH shared secret
  const uaKey = await crypto.subtle.importKey('raw', uaPublic, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdhBits = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: uaKey }, asKP.privateKey, 256));

  // PRK_key = HKDF(salt=auth, IKM=ecdh, info="WebPush: info\0"||ua_pub||as_pub, L=32)
  const prkIkm = await crypto.subtle.importKey('raw', ecdhBits, 'HKDF', false, ['deriveBits']);
  const prk = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: authKey,
      info: concat(enc.encode('WebPush: info\x00'), uaPublic, asPublicRaw) },
    prkIkm, 256
  ));

  // Random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // CEK = HKDF(IKM=prk, salt, info="Content-Encoding: aes128gcm\0", L=16)
  const prkKey = await crypto.subtle.importKey('raw', prk, 'HKDF', false, ['deriveBits']);
  const cek = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: enc.encode('Content-Encoding: aes128gcm\x00') }, prkKey, 128
  ));

  // NONCE = HKDF(IKM=prk, salt, info="Content-Encoding: nonce\0", L=12)
  const prkKey2 = await crypto.subtle.importKey('raw', prk, 'HKDF', false, ['deriveBits']);
  const nonce = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: enc.encode('Content-Encoding: nonce\x00') }, prkKey2, 96
  ));

  // AES-128-GCM encrypt (plain || 0x02 delimiter)
  const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce }, aesKey, concat(plain, new Uint8Array([2]))
  ));

  // Body: salt(16) + rs(4 BE) + keyid_len(1) + keyid(65) + ciphertext
  const rs = new Uint8Array(4); new DataView(rs.buffer).setUint32(0, 4096, false);
  return concat(salt, rs, new Uint8Array([65]), asPublicRaw, ciphertext);
}

// ── Send one push ─────────────────────────────────────────────────────────
async function sendPush(sub, payload, vapidPrivateKey) {
  const auth = await vapidAuth(sub.endpoint, vapidPrivateKey);
  const body = await encryptPayload(JSON.stringify(payload), sub.p256dh, sub.auth);
  const res  = await fetch(sub.endpoint, {
    method:  'POST',
    headers: {
      'Authorization':    auth,
      'Content-Type':     'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      'TTL':              '86400',
    },
    body,
  });
  // 410 Gone = subscription expired, should be removed
  if (res.status === 410) return { expired: true, endpoint: sub.endpoint };
  return { status: res.status };
}

// ── Worker entry ──────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'POST' && request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });

    const url = new URL(request.url);

    /* POST /subscribe — guardar suscripción */
    if (url.pathname === '/subscribe') {
      const sub = await request.json();
      await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Prefer':        'return=minimal,resolution=merge-duplicates',
          'on_conflict':   'endpoint',
        },
        body: JSON.stringify({
          endpoint: sub.endpoint,
          p256dh:   sub.keys.p256dh,
          auth:     sub.keys.auth,
          user_id:  sub.user_id || null,  // asociar suscripción al usuario
        }),
      });
      return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* POST /push — enviar notificación a todos los suscriptores */
    if (url.pathname === '/push') {
      const { payload } = await request.json();

      const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?select=*`, {
        headers: { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}` }
      });
      const subs = await sbRes.json();
      if (!Array.isArray(subs) || subs.length === 0)
        return new Response(JSON.stringify({ sent: 0 }), { headers: { 'Content-Type': 'application/json', ...CORS } });

      const results = await Promise.allSettled(subs.map(s => sendPush(s, payload, env.VAPID_PRIVATE_KEY)));

      // Limpiar suscripciones expiradas (410 Gone)
      const expired = results
        .filter(r => r.status === 'fulfilled' && r.value?.expired)
        .map(r => r.value.endpoint);
      if (expired.length) {
        for (const ep of expired) {
          await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(ep)}`, {
            method: 'DELETE',
            headers: { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}` }
          });
        }
      }

      const sent = results.filter(r => r.status === 'fulfilled' && !r.value?.expired).length;
      return new Response(JSON.stringify({ sent, total: subs.length }), {
        headers: { 'Content-Type': 'application/json', ...CORS }
      });
    }

    /* POST /api/juntar-fotos — combinar selfie + foto mascota con IA */
    if (url.pathname === '/api/juntar-fotos') {
      const { selfie, fotoMascota, lugar, tipoPet } = await request.json();

      if (!selfie || !fotoMascota) {
        return new Response(JSON.stringify({ error: 'Faltan imágenes' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }

      const lugarSafe = (lugar   || 'beautiful beach in Patagonia').slice(0, 120);
      const petWord   = (tipoPet || 'pet').slice(0, 20);

      const sizeHint = {
        dog:     'medium-sized, roughly reaching the person\'s knees or waist depending on breed',
        cat:     'small, fits comfortably in the person\'s arms, much smaller than the person',
        rabbit:  'very small, fits in the person\'s hands or lap, tiny compared to the person',
        hamster: 'tiny, fits in the palm of one hand, extremely small compared to the person',
        bird:    'very small, can perch on the person\'s shoulder or finger',
        fish:    'small, the person holds a fishbowl or the fish swims nearby in water',
      }[tipoPet] || 'appropriately sized relative to the person';

      const prompt = `Pixar 3D animated movie style, render quality like Coco or Up.

STRICT RULES — follow exactly:

RULE 1 — THE ${petWord.toUpperCase()} (first image): Transform it into a Pixar-style ${petWord} that looks exactly like the one in the photo — same breed, fur color, size and markings. The ${petWord} must be rendered at REALISTIC SIZE relative to the person: ${sizeHint}. It is 100% animal — no human features.

RULE 2 — THE PERSON (second image): Transform them into a fully HUMAN Pixar character. They must keep their complete human anatomy: human face, human hands, human feet, human legs, human body. Do NOT give them paws, claws, fur, tails, animal ears, snouts, or any animal feature whatsoever. Preserve their exact face structure, hair color and style, skin tone, eye color and distinctive features translated faithfully into Pixar art style. They are 100% human.

RULE 3 — THE SCENE: Generate one single magical scene where the fully human Pixar character joyfully interacts with their Pixar ${petWord} on ${lugarSafe}. The human has zero animal features. The ${petWord} has zero human features. No mixing or blending of anatomy between them.

Vibrant colors, cinematic Pixar lighting, rich background details, ultra high quality, 8K render.`;

      // Si las imágenes vienen como base64, subirlas a fal.ai Storage para obtener URLs públicas
      // fal.ai no acepta base64 directamente en image_urls — necesita URLs https://
      let selfieUrl     = selfie;
      let mascotaUrl    = fotoMascota;
      if (selfie.startsWith('data:')) {
        selfieUrl  = await uploadBase64ToSupabase(selfie, env.SUPABASE_SERVICE_KEY);
      }
      if (fotoMascota.startsWith('data:')) {
        mascotaUrl = await uploadBase64ToSupabase(fotoMascota, env.SUPABASE_SERVICE_KEY);
      }

      // Enviar a la cola de fal.ai (no bloquea — devuelve request_id de inmediato)
      const falRes = await fetch('https://queue.fal.run/fal-ai/flux-pro/kontext/multi', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${env.FAL_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          image_urls:       [mascotaUrl, selfieUrl],
          prompt,
          num_images:       1,
          guidance_scale:   3.5,
          safety_tolerance: '2',
          output_format:    'jpeg',
          aspect_ratio:     '1:1',
        }),
      });

      if (!falRes.ok) {
        const detail = await falRes.text();
        return new Response(JSON.stringify({ error: 'fal.ai error', detail }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }

      const falData = await falRes.json();
      // fal.ai devuelve status_url y response_url exactas — las guardamos para polling
      return new Response(JSON.stringify({
        requestId:   falData.request_id,
        statusUrl:   falData.status_url,
        responseUrl: falData.response_url,
      }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    /* GET /api/juntar-status?id=xxx — consultar estado del job en fal.ai */
    if (url.pathname === '/api/juntar-status' && request.method === 'GET') {
      const id = url.searchParams.get('id');
      if (!id) return new Response(JSON.stringify({ error: 'Falta id' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      // Recibir las URLs exactas que fal.ai generó (vienen del frontend)
      const statusUrl  = url.searchParams.get('statusUrl');
      const responseUrl = url.searchParams.get('responseUrl');
      if (!statusUrl || !responseUrl) {
        return new Response(JSON.stringify({ error: 'Faltan statusUrl/responseUrl' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });
      }

      const FAL_HEADERS = { 'Authorization': `Key ${env.FAL_API_KEY}` };

      const statusRes = await fetch(statusUrl, { headers: FAL_HEADERS });
      const statusRaw = await statusRes.text();
      let statusData;
      try { statusData = JSON.parse(statusRaw); }
      catch { return new Response(JSON.stringify({ status: 'IN_QUEUE' }), { headers: { 'Content-Type': 'application/json', ...CORS } }); }

      if (statusData.status === 'COMPLETED') {
        const resultRes = await fetch(responseUrl, { headers: FAL_HEADERS });
        const resultRaw = await resultRes.text();
        let result;
        try { result = JSON.parse(resultRaw); }
        catch { return new Response(JSON.stringify({ status: 'COMPLETED', imagenUrl: null }), { headers: { 'Content-Type': 'application/json', ...CORS } }); }

        const imagenUrl = result?.images?.[0]?.url ?? result?.image?.url
          ?? result?.output?.[0] ?? result?.output ?? null;
        return new Response(JSON.stringify({ status: 'COMPLETED', imagenUrl }), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }

      return new Response(JSON.stringify({ status: statusData.status ?? 'IN_QUEUE' }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    /* POST /api/portrait-transform — transformar retrato con IA (Portrait Experience) */
    if (url.pathname === '/api/portrait-transform' && request.method === 'POST') {
      const { imageUrl, sessionId } = await request.json();
      if (!imageUrl) return new Response(JSON.stringify({ error: 'Falta imageUrl' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const prompt = `The image shows a PERSON — transform them into a premium Pixar 3D animated character that is instantly and unmistakably recognizable as that same person: preserve their exact face structure, hair color and style, eye color, skin tone, facial hair and any distinctive features, faithfully translated into Pixar art style. Render quality like Coco, Up or Soul. The character should have big expressive Pixar eyes, smooth subsurface scattering skin, detailed hair grooming. Improve posture naturally: confident and charismatic stance, relaxed shoulders. IMPORTANT: always give the character a warm, genuine, joyful smile and happy expression regardless of the expression in the original photo — the character must look happy, energetic and celebratory. Preserve and enhance original clothing with premium quality. Background: elegant outdoor corporate event at night, warm golden string lights, purple and blue accent lighting, guests socializing in the background, bokeh, luxury cocktail atmosphere. Cinematic Pixar lighting with warm key light on face, soft rim light, golden highlights. Mood: celebration, success, innovation. Ultra high quality, 8K Pixar feature film render.`;

      const falRes = await fetch('https://queue.fal.run/fal-ai/flux-pro/kontext', {
        method: 'POST',
        headers: { 'Authorization': `Key ${env.FAL_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          prompt,
          num_images: 1,
          guidance_scale: 3.5,
          safety_tolerance: '2',
          output_format: 'jpeg',
          aspect_ratio: '3:4',
        }),
      });

      if (!falRes.ok) {
        const detail = await falRes.text();
        return new Response(JSON.stringify({ error: 'fal.ai error', detail }), { status: 502, headers: { 'Content-Type': 'application/json', ...CORS } });
      }

      const falData = await falRes.json();
      return new Response(JSON.stringify({
        requestId:   falData.request_id,
        statusUrl:   falData.status_url,
        responseUrl: falData.response_url,
        sessionId,
      }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* GET /api/portrait-status?id=xxx — consultar estado del job de retrato */
    if (url.pathname === '/api/portrait-status' && request.method === 'GET') {
      const statusUrl   = url.searchParams.get('statusUrl');
      const responseUrl = url.searchParams.get('responseUrl');
      if (!statusUrl || !responseUrl) return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const FAL_HEADERS = { 'Authorization': `Key ${env.FAL_API_KEY}` };
      const statusRes  = await fetch(statusUrl, { headers: FAL_HEADERS });
      let statusData;
      try { statusData = await statusRes.json(); } catch { return new Response(JSON.stringify({ status: 'IN_QUEUE' }), { headers: { 'Content-Type': 'application/json', ...CORS } }); }

      if (statusData.status === 'COMPLETED') {
        const resultRes = await fetch(responseUrl, { headers: FAL_HEADERS });
        let result;
        try { result = await resultRes.json(); } catch { return new Response(JSON.stringify({ status: 'COMPLETED', imageUrl: null }), { headers: { 'Content-Type': 'application/json', ...CORS } }); }
        const imageUrl = result?.images?.[0]?.url ?? result?.image?.url ?? null;
        return new Response(JSON.stringify({ status: 'COMPLETED', imageUrl }), { headers: { 'Content-Type': 'application/json', ...CORS } });
      }

      return new Response(JSON.stringify({ status: statusData.status ?? 'IN_QUEUE' }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* GET /api/proxy-imagen?url=... — descargar imagen de fal.ai sin CORS */
    if (url.pathname === '/api/proxy-imagen' && request.method === 'GET') {
      const imgUrl = url.searchParams.get('url');
      if (!imgUrl || !imgUrl.startsWith('https://')) {
        return new Response('URL inválida', { status: 400, headers: CORS });
      }
      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) {
        return new Response('No se pudo descargar la imagen', { status: 502, headers: CORS });
      }
      const imgBlob = await imgRes.arrayBuffer();
      return new Response(imgBlob, {
        headers: {
          'Content-Type': imgRes.headers.get('Content-Type') || 'image/jpeg',
          'Cache-Control': 'no-store',
          ...CORS,
        },
      });
    }

    /* GET /api/shorts — último Short de cada canal vinculado */
    if (url.pathname === '/api/shorts' && request.method === 'GET') {
      const CANALES = [
        { uploads: 'UUGi1-MMRagIIhzPWp3nCl6Q', nombre: 'TV Mascotas' },
        { uploads: 'UUQQOXSmeLzqBlaVIXt-58YA', nombre: 'Universo de Gatitos' },
        { uploads: 'UUMJdVEwqOrsR4y5VCJEFOag', nombre: 'Husky Mania ASM' },
      ];
      const YT = env.YOUTUBE_API_KEY;

      const results = await Promise.all(CANALES.map(async ch => {
        try {
          // Últimas 20 subidas del canal
          const plRes = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${ch.uploads}&maxResults=20&key=${YT}`
          );
          const plData = await plRes.json();
          const videoIds = (plData.items || []).map(i => i.snippet.resourceId.videoId).join(',');
          if (!videoIds) return null;

          // Detalles para filtrar por duración (Shorts ≤ 3 min)
          const vRes = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YT}`
          );
          const vData = await vRes.json();

          const shorts = (vData.items || []).filter(v => {
            const dur = v.contentDetails.duration;
            const m = dur.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
            if (!m) return false;
            const mins = parseInt(m[1] || '0');
            const secs = parseInt(m[2] || '0');
            return mins < 3 || (mins === 3 && secs === 0);
          }).slice(0, 3); // máximo 3 por canal

          if (!shorts.length) return [];
          return shorts.map(s => ({
            videoId:   s.id,
            titulo:    s.snippet.title,
            canal:     ch.nombre,
            thumbnail: `https://wufly-push.pablo77tapia.workers.dev/api/thumb?id=${s.id}`,
          }));
        } catch { return null; }
      }));

      const shorts = results.flat().filter(Boolean);
      return new Response(JSON.stringify(shorts), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=1800', ...CORS },
      });
    }

    /* GET /api/thumb?id=VIDEO_ID — proxy de thumbnail YouTube */
    if (url.pathname === '/api/thumb' && request.method === 'GET') {
      const id = url.searchParams.get('id');
      if (!id) return new Response('Falta id', { status: 400, headers: CORS });
      const thumbUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      const r = await fetch(thumbUrl);
      if (!r.ok) return new Response('No encontrado', { status: 404, headers: CORS });
      const buf = await r.arrayBuffer();
      return new Response(buf, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400',
          ...CORS,
        },
      });
    }

    /* POST /api/registrar-visita — contar visita única por IP+día */
    if (url.pathname === '/api/registrar-visita' && request.method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP')
               || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
               || 'unknown';
      const ua    = request.headers.get('User-Agent') || '';
      const today = new Date().toISOString().slice(0, 10);

      const res = await fetch(`${SUPABASE_URL}/rest/v1/visitas`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Prefer':        'return=minimal,resolution=ignore-duplicates',
        },
        body: JSON.stringify({ ip, fecha: today, user_agent: ua }),
      });

      const nueva = res.status === 201;
      return new Response(JSON.stringify({ ok: true, nueva }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    /* GET /api/stats-visitas — estadísticas para el dashboard */
    if (url.pathname === '/api/stats-visitas' && request.method === 'GET') {
      const hoy    = new Date().toISOString().slice(0, 10);
      const hace7  = new Date(Date.now() - 7  * 86400000).toISOString().slice(0, 10);
      const hace30 = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
      const hace14 = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);

      const h = {
        'apikey':        env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        'Prefer':        'count=exact',
      };

      const [resTotal, resHoy, res7d, res30d, resDias] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/visitas?select=*`, { headers: h }),
        fetch(`${SUPABASE_URL}/rest/v1/visitas?select=*&fecha=eq.${hoy}`, { headers: h }),
        fetch(`${SUPABASE_URL}/rest/v1/visitas?select=*&fecha=gte.${hace7}`, { headers: h }),
        fetch(`${SUPABASE_URL}/rest/v1/visitas?select=*&fecha=gte.${hace30}`, { headers: h }),
        fetch(`${SUPABASE_URL}/rest/v1/visitas?select=fecha&fecha=gte.${hace14}`, {
          headers: { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}` }
        }),
      ]);

      const total = parseInt(resTotal.headers.get('content-range')?.split('/')[1] ?? '0');
      const hoyN  = parseInt(resHoy.headers.get('content-range')?.split('/')[1] ?? '0');
      const n7d   = parseInt(res7d.headers.get('content-range')?.split('/')[1] ?? '0');
      const n30d  = parseInt(res30d.headers.get('content-range')?.split('/')[1] ?? '0');

      const diasData = await resDias.json();
      const porDia   = {};
      (Array.isArray(diasData) ? diasData : []).forEach(v => {
        porDia[v.fecha] = (porDia[v.fecha] || 0) + 1;
      });

      return new Response(JSON.stringify({ total, hoy: hoyN, n7d, n30d, porDia }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    /* POST /subscribe — guardar suscripción CON user_id (versión extendida) */
    /* Ya manejado arriba, pero si llega aquí con user_id en body lo procesamos */

    /* POST /push-user — enviar push a un usuario específico por user_id */
    if (url.pathname === '/push-user') {
      const { user_id, payload } = await request.json();
      if (!user_id || !payload) return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const sbRes = await fetch(
        `${SUPABASE_URL}/rest/v1/push_subscriptions?user_id=eq.${user_id}&select=*`,
        { headers: { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}` } }
      );
      const subs = await sbRes.json();
      if (!Array.isArray(subs) || subs.length === 0)
        return new Response(JSON.stringify({ sent: 0 }), { headers: { 'Content-Type': 'application/json', ...CORS } });

      const results = await Promise.allSettled(subs.map(s => sendPush(s, payload, env.VAPID_PRIVATE_KEY)));
      const sent = results.filter(r => r.status === 'fulfilled' && !r.value?.expired).length;
      return new Response(JSON.stringify({ sent }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* POST /api/encuentro/pixar — generar foto Pixar del encuentro con fal.ai */
    if (url.pathname === '/api/encuentro/pixar') {
      const { fotoUrl, encuentroId } = await request.json();
      if (!fotoUrl) return new Response(JSON.stringify({ error: 'Falta fotoUrl' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const prompt = `Pixar 3D animated movie style, render quality like Coco or Up. The photo shows two dogs that just met during a walk. Transform BOTH dogs into Pixar-style animated characters that look EXACTLY like the ones in the photo — same breed, fur color, markings, size and distinctive features. Show both Pixar dogs joyfully playing together, facing each other with tails wagging in a moment of pure happiness. Background: a magical vibrant park with golden sunlight, lush green grass, colorful wildflowers, warm cinematic lighting. The mood is pure joy and friendship. Both dogs must be clearly visible and prominent. Ultra high quality, 8K Pixar feature film render.`;

      const falRes = await fetch('https://queue.fal.run/fal-ai/flux-pro/kontext', {
        method: 'POST',
        headers: { 'Authorization': `Key ${env.FAL_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url:        fotoUrl,
          prompt,
          num_images:       1,
          guidance_scale:   3.5,
          safety_tolerance: '2',
          output_format:    'jpeg',
          aspect_ratio:     '1:1',
        }),
      });

      if (!falRes.ok) {
        const detail = await falRes.text();
        return new Response(JSON.stringify({ error: 'fal.ai error', detail }), { status: 502, headers: { 'Content-Type': 'application/json', ...CORS } });
      }

      const falData = await falRes.json();
      return new Response(JSON.stringify({
        requestId:   falData.request_id,
        statusUrl:   falData.status_url,
        responseUrl: falData.response_url,
        encuentroId,
      }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* POST /api/encuentro/completar — otorgar premium a ambos usuarios (service role) */
    if (url.pathname === '/api/encuentro/completar') {
      // Verificar que el solicitante es un participante del encuentro
      const authHeader = request.headers.get('Authorization') || '';
      const userJwt = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
      if (!userJwt) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json', ...CORS } });

      const meRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${userJwt}` },
      });
      if (!meRes.ok) return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401, headers: { 'Content-Type': 'application/json', ...CORS } });
      const me = await meRes.json();
      const requesterId = me?.id;
      if (!requesterId) return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401, headers: { 'Content-Type': 'application/json', ...CORS } });

      const { encuentroId, pixarUrl } = await request.json();
      if (!encuentroId || !pixarUrl) return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const h = { 'apikey': env.SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`, 'Content-Type': 'application/json' };

      // Verificar que el encuentro existe y el solicitante es participante
      const encRes = await fetch(`${SUPABASE_URL}/rest/v1/encuentros?id=eq.${encuentroId}&select=user1_id,user2_id,nombre1,nombre2,estado`, { headers: h });
      const encData = await encRes.json();
      if (!Array.isArray(encData) || encData.length === 0)
        return new Response(JSON.stringify({ error: 'Encuentro no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json', ...CORS } });

      const enc = encData[0];

      // Verificar que el solicitante es participante del encuentro
      if (enc.user1_id !== requesterId && enc.user2_id !== requesterId)
        return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403, headers: { 'Content-Type': 'application/json', ...CORS } });

      // Update encuentro as completed
      await fetch(`${SUPABASE_URL}/rest/v1/encuentros?id=eq.${encuentroId}`, {
        method: 'PATCH',
        headers: { ...h, 'Prefer': 'return=minimal' },
        body: JSON.stringify({ pixar_url: pixarUrl, estado: 'completado', updated_at: new Date().toISOString() }),
      });

      // Grant premium to BOTH users using service role (bypasses RLS)
      const now = new Date().toISOString();
      for (const userId of [enc.user1_id, enc.user2_id]) {
        await fetch(`${SUPABASE_URL}/rest/v1/wufly_premium`, {
          method: 'POST',
          headers: { ...h, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({ user_id: userId, premium: true, fecha_premio: now, encuentros: 1 }),
        });
      }

      // Notify both users
      for (const [userId, nombre] of [[enc.user1_id, enc.nombre2], [enc.user2_id, enc.nombre1]]) {
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?user_id=eq.${userId}&select=*`, { headers: h });
        const subs = await subRes.json();
        if (Array.isArray(subs)) {
          await Promise.allSettled(subs.map(s => sendPush(s, {
            title: '🎉 ¡Encuentro Canino completado!',
            body:  `¡Tú y ${nombre} son Premium Wufly! Abre la app para ver tu foto Pixar.`,
            icon:  '/img/icono.png',
            url:   '/',
          }, env.VAPID_PRIVATE_KEY)));
        }
      }

      return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    /* POST /api/tts — proxy de ElevenLabs para no exponer la API key en el cliente */
    if (url.pathname === '/api/tts' && request.method === 'POST') {
      if (!env.ELEVENLABS_KEY) return new Response('TTS no configurado', { status: 503, headers: CORS });
      const { text, voice_id } = await request.json();
      if (!text || !voice_id) return new Response(JSON.stringify({ error: 'Faltan parámetros' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });

      const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream`, {
        method: 'POST',
        headers: { 'xi-api-key': env.ELEVENLABS_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.8 } }),
      });

      if (!ttsRes.ok) return new Response(`ElevenLabs error ${ttsRes.status}`, { status: ttsRes.status, headers: CORS });
      return new Response(ttsRes.body, { headers: { 'Content-Type': 'audio/mpeg', 'Access-Control-Allow-Origin': '*' } });
    }

    return new Response('Not Found', { status: 404 });
  }
};
