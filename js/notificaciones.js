/* ══ WUFLY — Notificaciones Push ══ */

const VAPID_PUBLIC_KEY = 'BKgfIN8ffRfuVhQ-ebLhvt1zT-bTumBBsHw-pTrYIdwJgjJ217jGNk3zD9-ycbjfKwQ-awzb2G1lOVWqOLBXM50';
const PUSH_WORKER_URL  = 'https://wufly-push.pablo77tapia.workers.dev';

function _vapidKey() {
  const b = (VAPID_PUBLIC_KEY + '='.repeat((4 - VAPID_PUBLIC_KEY.length % 4) % 4))
    .replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b), c => c.charCodeAt(0));
}

/* Muestra un toast con botón "Activar" antes de pedir permiso al browser */
function _mostrarToastNotificaciones() {
  if (document.getElementById('pushToast')) return;
  const toast = document.createElement('div');
  toast.id = 'pushToast';
  toast.style.cssText = `
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:#2D1B6B;color:white;border-radius:14px;
    padding:13px 16px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;
    display:flex;align-items:center;gap:12px;z-index:9000;
    box-shadow:0 4px 24px rgba(0,0,0,0.25);max-width:320px;width:calc(100% - 40px);
    animation:toast-in 0.3s cubic-bezier(0.34,1.46,0.64,1);
  `;
  toast.innerHTML = `
    <span style="font-size:22px;flex-shrink:0;">🔔</span>
    <span style="flex:1;line-height:1.4;">Activa notificaciones para saber cuándo alguien pierde una mascota</span>
    <button onclick="activarNotificaciones()" style="background:var(--purple);color:white;border:none;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;">Activar</button>
    <button onclick="cerrarToastPush()" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;padding:0;line-height:1;">✕</button>
  `;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
  document.head.appendChild(style);
}

function cerrarToastPush() {
  const t = document.getElementById('pushToast');
  if (t) t.remove();
  localStorage.setItem('wufly_push_asked', '1');
}

async function activarNotificaciones() {
  cerrarToastPush();
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    localStorage.setItem('wufly_push_asked', '1');
    return;
  }

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _vapidKey(),
      });
    }
    // Incluir user_id para poder enviar push dirigido (Encuentro Canino)
    const subData = sub.toJSON();
    const userId  = (typeof currentUser !== 'undefined' && currentUser?.id) ? currentUser.id : null;
    await fetch(`${PUSH_WORKER_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...subData, user_id: userId }),
    });
    localStorage.setItem('wufly_push_subscribed', '1');
  } catch (e) {
    console.warn('[push] suscripción fallida', e);
  }
}

/* Llamar cuando el usuario entra a la pestaña Perdidos */
function checkPushPermiso() {
  if (!('PushManager' in window)) return;
  if (localStorage.getItem('wufly_push_asked'))    return;
  if (localStorage.getItem('wufly_push_subscribed')) return;
  if (Notification.permission === 'denied')         return;
  setTimeout(_mostrarToastNotificaciones, 1200);
}

/* Llamar después de publicar una mascota perdida con éxito */
async function notificarMascotaPerdida(descripcion, ubicacion) {
  try {
    await fetch(`${PUSH_WORKER_URL}/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: {
          title: '🔍 Mascota perdida cerca',
          body:  `${descripcion.slice(0, 90)}${descripcion.length > 90 ? '…' : ''} — 📍 ${ubicacion}`,
          icon:  '/img/icono.png',
          badge: '/img/icon-192.svg',
          url:   '/?tab=comunidad',
        }
      }),
    });
  } catch {}
}
