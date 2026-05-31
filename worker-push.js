/* ══════════════════════════════════════════════════════════════════
   WUFLY — Push Notification Worker
   Deploy: wrangler deploy worker-push.js --name wufly-push
   Secret: wrangler secret put SUPABASE_SERVICE_KEY
   ══════════════════════════════════════════════════════════════════ */

const VAPID_PUBLIC_KEY  = 'BKgfIN8ffRfuVhQ-ebLhvt1zT-bTumBBsHw-pTrYIdwJgjJ217jGNk3zD9-ycbjfKwQ-awzb2G1lOVWqOLBXM50';
const VAPID_PRIVATE_KEY = 'C9fBTUiIaR3KK1DEGKHQT8gZj_Xakb9P8Gq6X2-p1K0';
const VAPID_SUBJECT     = 'mailto:admin@wufly.cl';
const SUPABASE_URL      = 'https://ybnacudfqerbzpvqcjzc.supabase.co';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

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
async function vapidAuth(endpoint) {
  const origin  = new URL(endpoint).origin;
  const now     = Math.floor(Date.now() / 1000);
  const enc     = new TextEncoder();
  const header  = b64url(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = b64url(enc.encode(JSON.stringify({ aud: origin, exp: now + 43200, sub: VAPID_SUBJECT })));
  const input   = `${header}.${payload}`;

  const pubBytes = fromB64url(VAPID_PUBLIC_KEY);
  const key = await crypto.subtle.importKey('jwk', {
    kty: 'EC', crv: 'P-256',
    d: VAPID_PRIVATE_KEY,
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
async function sendPush(sub, payload) {
  const auth = await vapidAuth(sub.endpoint);
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
          'Prefer':        'return=minimal,resolution=ignore-duplicates',
          'on_conflict':   'endpoint',
        },
        body: JSON.stringify({ endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth }),
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

      const results = await Promise.allSettled(subs.map(s => sendPush(s, payload)));

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
        perro:   'medium-sized, roughly reaching the person\'s knees or waist depending on breed',
        gato:    'small, fits comfortably in the person\'s arms, much smaller than the person',
        conejo:  'very small, fits in the person\'s hands or lap, tiny compared to the person',
        hamster: 'tiny, fits in the palm of one hand, extremely small compared to the person',
        ave:     'very small, can perch on the person\'s shoulder or finger',
        pez:     'small, the person holds a fishbowl or the fish swims nearby in water',
      }[tipoPet] || 'appropriately sized relative to the person';

      const prompt = `Pixar 3D animated movie style, render quality like Coco or Up. The FIRST image is a reference photo of a PERSON — transform them into a Pixar character that is instantly and unmistakably recognizable as that same person: preserve their exact face structure, hair color and style, eye color, skin tone and any distinctive features, faithfully translated into Pixar art style. The SECOND image is a reference photo of their ${petWord} — transform it into a Pixar-style ${petWord} that looks exactly like the one in the photo, same breed, fur color, size and markings. IMPORTANT: the ${petWord} must be rendered at its REALISTIC SIZE relative to the person — it is ${sizeHint}. Generate a single magical scene where this Pixar-style person is joyfully interacting with their Pixar-style ${petWord} on ${lugarSafe}, rendered as a breathtaking magical world with vibrant colors, cinematic Pixar lighting, rich details and an epic sense of wonder. Ultra high quality, 8K render.`;

      // Enviar a la cola de fal.ai (no bloquea — devuelve request_id de inmediato)
      const falRes = await fetch('https://queue.fal.run/fal-ai/flux-pro/kontext/multi', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${env.FAL_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          image_urls:       [selfie, fotoMascota],
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

    return new Response('Not Found', { status: 404 });
  }
};
