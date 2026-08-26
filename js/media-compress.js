/* ══════════════════════════════════════════════════════════════
   MEDIA COMPRESS - WUFLY
   Compresión de video (vertical 9:16) y foto (cuadrada 1:1)
   Objetivo: videos ~500KB, fotos ~150KB
   ══════════════════════════════════════════════════════════════ */

const COMPRESS_VIDEO_MAX_SIZE = 600 * 1024;  // 600KB max
const COMPRESS_PHOTO_MAX_SIZE = 180 * 1024;  // 180KB max
const COMPRESS_VIDEO_BITRATE = 400000;        // 400kbps
const COMPRESS_PHOTO_QUALITY = 0.65;         // JPEG quality

/* ══ COMPRIMIR VIDEO ══ */
async function compressVideo(blob) {
  return new Promise(async (resolve) => {
    try {
      // Si ya es pequeño, retornar directo
      if (blob.size <= COMPRESS_VIDEO_MAX_SIZE) {
        resolve(blob);
        return;
      }

      // Crear video element para procesar
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;

      const url = URL.createObjectURL(blob);
      video.src = url;

      video.onloadedmetadata = async () => {
        // Canvas vertical 9:16 (720x1280)
        const canvas = document.createElement('canvas');
        const targetWidth = 720;
        const targetHeight = 1280;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');

        // MediaRecorder para re-comprimir
        const stream = canvas.captureStream(24);

        // Agregar audio si existe
        if (video.captureStream) {
          const originalStream = video.captureStream();
          const audioTracks = originalStream.getAudioTracks();
          audioTracks.forEach(track => stream.addTrack(track));
        }

        let options = { mimeType: 'video/webm;codecs=vp8', videoBitsPerSecond: COMPRESS_VIDEO_BITRATE };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm', videoBitsPerSecond: COMPRESS_VIDEO_BITRATE };
        }

        const recorder = new MediaRecorder(stream, options);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const compressed = new Blob(chunks, { type: 'video/webm' });
          URL.revokeObjectURL(url);

          // Si sigue siendo muy grande, reducir calidad
          if (compressed.size > COMPRESS_VIDEO_MAX_SIZE) {
            console.log(`Video comprimido: ${blob.size} → ${compressed.size} bytes`);
          }
          resolve(compressed);
        };

        recorder.start();

        // Dibujar frames del video al canvas
        const drawFrame = () => {
          if (video.ended || video.paused) return;

          // Calcular recorte centrado (mantener aspecto 9:16)
          const videoAspect = video.videoWidth / video.videoHeight;
          const targetAspect = targetWidth / targetHeight;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (videoAspect > targetAspect) {
            // Video más ancho - recortar lados
            drawHeight = video.videoHeight;
            drawWidth = drawHeight * targetAspect;
            offsetX = (video.videoWidth - drawWidth) / 2;
            offsetY = 0;
          } else {
            // Video más alto - recortar arriba/abajo
            drawWidth = video.videoWidth;
            drawHeight = drawWidth / targetAspect;
            offsetX = 0;
            offsetY = (video.videoHeight - drawHeight) / 2;
          }

          ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight, 0, 0, targetWidth, targetHeight);

          if (!video.ended) {
            requestAnimationFrame(drawFrame);
          }
        };

        video.onplay = () => {
          drawFrame();
        };

        // Reproducir y grabar
        await video.play();

        // Detener después de la duración del video
        setTimeout(() => {
          video.pause();
          recorder.stop();
        }, video.duration * 1000);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(blob); // Retornar original si hay error
      };

    } catch (err) {
      console.error('Video compression error:', err);
      resolve(blob); // Retornar original si hay error
    }
  });
}

/* ══ COMPRIMIR FOTO ══ */
async function compressPhoto(blob) {
  return new Promise((resolve) => {
    try {
      // Si ya es pequeña, retornar directo
      if (blob.size <= COMPRESS_PHOTO_MAX_SIZE) {
        resolve(blob);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        // Canvas cuadrado 800x800
        const canvas = document.createElement('canvas');
        const size = 800;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        // Recortar al centro (formato cuadrado)
        const imgAspect = img.width / img.height;
        let srcX, srcY, srcW, srcH;

        if (imgAspect > 1) {
          // Imagen más ancha - recortar lados
          srcH = img.height;
          srcW = srcH;
          srcX = (img.width - srcW) / 2;
          srcY = 0;
        } else {
          // Imagen más alta - recortar arriba/abajo
          srcW = img.width;
          srcH = srcW;
          srcX = 0;
          srcY = (img.height - srcH) / 2;
        }

        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, size, size);

        canvas.toBlob((compressedBlob) => {
          URL.revokeObjectURL(url);

          if (compressedBlob) {
            console.log(`Foto comprimida: ${blob.size} → ${compressedBlob.size} bytes`);
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
async function generateThumbnail(videoBlob) {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;

      const url = URL.createObjectURL(videoBlob);
      video.src = url;

      video.onloadeddata = () => {
        // Buscar frame a los 2 segundos
        video.currentTime = Math.min(2, video.duration * 0.25);
      };

      video.onseeked = () => {
        // Canvas cuadrado 200x200 para thumbnail
        const canvas = document.createElement('canvas');
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        // Recortar al centro
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
          URL.revokeObjectURL(url);
          resolve(thumbBlob || videoBlob);
        }, 'image/jpeg', 0.6);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(videoBlob);
      };

    } catch (err) {
      console.error('Thumbnail generation error:', err);
      resolve(videoBlob);
    }
  });
}

/* ══ API PÚBLICA ══ */
window.compressVideo = compressVideo;
window.compressPhoto = compressPhoto;
window.generateThumbnail = generateThumbnail;
