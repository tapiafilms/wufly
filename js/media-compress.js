/* ══════════════════════════════════════════════════════════════
   MEDIA COMPRESS - WUFLY
   Compresión simple y robusta para video/foto
   ══════════════════════════════════════════════════════════════ */

const COMPRESS_PHOTO_QUALITY = 0.65;

/* ══ COMPRIMIR VIDEO ══ */
/* Simplificado: retorna el blob tal cual.
   La cámara ya graba a resolución razonable.
   La compresión real la hace el servidor o se hace después. */
async function compressVideo(blob) {
  // Por ahora retornar el original — la cámara ya comprime con MediaRecorder
  console.log(`Video original: ${(blob.size / 1024).toFixed(0)}KB`);
  return blob;
}

/* ══ COMPRIMIR FOTO ══ */
/* Canvas cuadrado 800x800, JPEG quality 0.65 */
async function compressPhoto(blob) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 800;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Recortar al centro (cuadrado)
        const imgAspect = img.width / img.height;
        let srcX, srcY, srcW, srcH;

        if (imgAspect > 1) {
          srcH = img.height;
          srcW = srcH;
          srcX = (img.width - srcW) / 2;
          srcY = 0;
        } else {
          srcW = img.width;
          srcH = srcW;
          srcX = 0;
          srcY = (img.height - srcH) / 2;
        }

        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, size, size);

        canvas.toBlob((compressedBlob) => {
          URL.revokeObjectURL(url);
          if (compressedBlob) {
            console.log(`Foto comprimida: ${(blob.size / 1024).toFixed(0)}KB → ${(compressedBlob.size / 1024).toFixed(0)}KB`);
            resolve(compressedBlob);
          } else {
            resolve(blob);
          }
        }, 'image/jpeg', COMPRESS_PHOTO_QUALITY);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(blob);
      };

      img.src = url;
    } catch (err) {
      console.error('Photo compression error:', err);
      resolve(blob);
    }
  });
}

/* ══ GENERAR THUMBNAIL ══ */
/* Extrae primer frame del video y genera thumbnail cuadrada 200x200 */
async function generateThumbnail(videoBlob) {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';

      const url = URL.createObjectURL(videoBlob);
      video.src = url;

      // Timeout de seguridad: si no carga en 5s, retornar null
      const timeout = setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve(null);
      }, 5000);

      video.onloadeddata = () => {
        // Capturar frame actual (0s)
        try {
          const canvas = document.createElement('canvas');
          const size = 200;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          const videoAspect = video.videoWidth / video.videoHeight;
          let srcX, srcY, srcW, srcH;

          if (videoAspect > 1) {
            srcH = video.videoHeight;
            srcW = srcH;
            srcX = (video.videoWidth - srcW) / 2;
            srcY = 0;
          } else {
            srcW = video.videoWidth;
            srcH = srcW;
            srcX = 0;
            srcY = (video.videoHeight - srcH) / 2;
          }

          ctx.drawImage(video, srcX, srcY, srcW, srcH, 0, 0, size, size);

          canvas.toBlob((thumbBlob) => {
            clearTimeout(timeout);
            URL.revokeObjectURL(url);
            resolve(thumbBlob);
          }, 'image/jpeg', 0.6);
        } catch (err) {
          clearTimeout(timeout);
          URL.revokeObjectURL(url);
          resolve(null);
        }
      };

      video.onerror = () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(url);
        resolve(null);
      };

    } catch (err) {
      console.error('Thumbnail error:', err);
      resolve(null);
    }
  });
}

/* ══ API PÚBLICA ══ */
window.compressVideo = compressVideo;
window.compressPhoto = compressPhoto;
window.generateThumbnail = generateThumbnail;
