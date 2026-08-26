/* ══════════════════════════════════════════════════════════════
   CAMERA CAPTURE - WUFLY
   Interfaz de cámara custom para fotos cuadradas y videos verticales
   Inspirada en CumpLand CameraCapture.jsx
   ══════════════════════════════════════════════════════════════ */

let _cameraStream = null;
let _cameraRecorder = null;
let _cameraChunks = [];
let _cameraTimer = null;
let _cameraSecondsLeft = 10;
let _cameraFacingMode = 'environment';
let _cameraType = 'video'; // 'video' | 'photo'
let _cameraOnComplete = null;
let _cameraOnClose = null;

const CAMERA_MAX_DURATION = 10; // segundos
const CAMERA_MIN_DURATION = 8;

/* ══ ABRIR CÁMARA ══ */
function openCamera(type = 'video', onComplete, onClose) {
  _cameraType = type;
  _cameraOnComplete = onComplete;
  _cameraOnClose = onClose;
  _cameraFacingMode = 'environment';
  _cameraSecondsLeft = CAMERA_MAX_DURATION;

  const overlay = document.createElement('div');
  overlay.id = 'cameraOverlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column;
    background:#000; color:white; overflow:hidden; height:100dvh;
  `;

  overlay.innerHTML = _buildCameraHTML(type);
  document.body.appendChild(overlay);

  _startCamera();
  _attachCameraEvents();
}

/* ══ CONSTRUIR HTML ══ */
function _buildCameraHTML(type) {
  const isVideo = type === 'video';

  return `
    <!-- Barra superior -->
    <div style="position:absolute;top:0;left:0;right:0;z-index:10;padding:16px 20px;
      display:flex;justify-content:space-between;align-items:center;
      background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);"
      class="safe-area-top">
      <button id="camCloseBtn" style="
        width:40px; height:40px; border-radius:50%; border:none;
        background:rgba(0,0,0,0.4); color:white; font-size:20px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
      ">✕</button>

      ${isVideo ? `
      <div id="camCountdown" style="
        display:none; align-items:center; gap:8px;
        background:#DC2626; padding:6px 16px; border-radius:20px;
        font-size:13px; font-weight:700; animation:pulse 1s infinite;
      ">
        <span style="width:8px;height:8px;background:white;border-radius:50%;"></span>
        <span id="camCountdownText">0:10</span>
      </div>
      ` : '<div></div>'}

      <button id="camSwitchBtn" style="
        width:40px; height:40px; border-radius:50%; border:none;
        background:rgba(0,0,0,0.4); color:white; font-size:18px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
      ">🔄</button>
    </div>

    <!-- Visor de cámara -->
    <div id="camViewfinder" style="
      flex:1; position:relative; display:flex; align-items:center; justify-content:center;
      background:#000; overflow:hidden; padding-top:56px;
    ">
      <!-- Loading -->
      <div id="camLoading" style="
        position:absolute; inset:0; display:flex; flex-direction:column;
        align-items:center; justify-content:center; gap:12px; background:#0a0a0a;
      ">
        <div style="
          width:36px; height:36px; border:3px solid rgba(124,77,204,0.25);
          border-top-color:var(--purple); border-radius:50%;
          animation:spin 0.8s linear infinite;
        "></div>
        <p style="font-size:12px; color:#888;">Encendiendo cámara...</p>
      </div>

      <!-- Error -->
      <div id="camError" style="
        position:absolute; inset:0; display:none; flex-direction:column;
        align-items:center; justify-content:center; gap:16px; padding:24px;
        text-align:center; background:#0a0a0a;
      ">
        <div style="font-size:40px;">⚠️</div>
        <p style="font-size:13px; color:#ccc;">No se pudo acceder a la cámara. Verifica los permisos.</p>
        <button id="camFallbackBtn" style="
          font-size:12px; background:#1e1e1e; color:white; font-weight:700;
          padding:10px 16px; border-radius:12px; border:none; cursor:pointer;
        ">Usar selector de archivos</button>
      </div>

      <!-- Video element -->
      <video id="camVideo" autoplay playsinline muted style="
        width:100%; height:100%; object-fit:contain;
      "></video>

      <!-- Guía cuadrada para fotos -->
      ${!isVideo ? `
      <div id="camSquareGuide" style="
        position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        width:min(85vw, 85vh); height:min(85vw, 85vh);
        border:2px solid rgba(255,255,255,0.3); border-radius:12px;
        pointer-events:none;
      "></div>
      ` : ''}

      <!-- Barra de progreso video -->
      ${isVideo ? `
      <div id="camProgressBar" style="
        position:absolute; bottom:16px; left:24px; right:24px;
        height:6px; background:rgba(255,255,255,0.2); border-radius:3px;
        overflow:hidden; display:none;
      ">
        <div id="camProgressFill" style="
          height:100%; background:#DC2626; border-radius:3px;
          transition:width 1s linear; width:0%;
        "></div>
      </div>
      ` : ''}
    </div>

    <!-- Panel inferior -->
    <div style="
      height:100px; background:#000; display:flex; align-items:center;
      justify-content:center; flex-shrink:0;
    " class="safe-area-bottom">
      ${isVideo ? `
      <!-- Botón grabar video -->
      <button id="camRecordBtn" style="
        width:68px; height:68px; border-radius:16px; border:4px solid white;
        background:#DC2626; cursor:pointer; display:flex;
        align-items:center; justify-content:center; transition:all 0.2s;
      ">
        <div id="camRecordIcon" style="
          width:28px; height:28px; background:#DC2626; border-radius:50%;
          border:2px solid white;
        "></div>
      </button>
      ` : `
      <!-- Botón foto -->
      <button id="camPhotoBtn" style="
        width:68px; height:68px; border-radius:50%; border:4px solid #555;
        background:white; cursor:pointer; display:flex;
        align-items:center; justify-content:center; transition:all 0.2s;
      ">
        <div style="
          width:56px; height:56px; background:white; border-radius:50%;
          border:1px solid #ddd;
        "></div>
      </button>
      `}
    </div>

    <style>
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      @keyframes spin { to{transform:rotate(360deg)} }
    </style>
  `;
}

/* ══ INICIAR CÁMARA ══ */
async function _startCamera() {
  const video = document.getElementById('camVideo');
  const loading = document.getElementById('camLoading');
  const error = document.getElementById('camError');

  try {
    // Detener stream anterior
    _stopCamera();

    const constraints = {
      video: {
        facingMode: { ideal: _cameraFacingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: _cameraType === 'video'
    };

    _cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = _cameraStream;

    // Aplicar espejo si es cámara frontal
    if (_cameraFacingMode === 'user') {
      video.style.transform = 'scaleX(-1)';
    } else {
      video.style.transform = 'none';
    }

    loading.style.display = 'none';
    error.style.display = 'none';
  } catch (err) {
    console.error('Camera error:', err);
    loading.style.display = 'none';
    error.style.display = 'flex';
  }
}

/* ══ DETENER CÁMARA ══ */
function _stopCamera() {
  if (_cameraStream) {
    _cameraStream.getTracks().forEach(track => track.stop());
    _cameraStream = null;
  }
  if (_cameraTimer) {
    clearInterval(_cameraTimer);
    _cameraTimer = null;
  }
}

/* ══ EVENTOS ══ */
function _attachCameraEvents() {
  // Cerrar
  document.getElementById('camCloseBtn')?.addEventListener('click', _closeCamera);

  // Rotar cámara
  document.getElementById('camSwitchBtn')?.addEventListener('click', () => {
    _cameraFacingMode = _cameraFacingMode === 'environment' ? 'user' : 'environment';
    _startCamera();
  });

  // Fallback a selector de archivos
  document.getElementById('camFallbackBtn')?.addEventListener('click', () => {
    _closeCamera();
    _openFileFallback();
  });

  if (_cameraType === 'video') {
    // Grabar video
    document.getElementById('camRecordBtn')?.addEventListener('click', _toggleRecording);
  } else {
    // Tomar foto
    document.getElementById('camPhotoBtn')?.addEventListener('click', _takePhoto);
  }
}

/* ══ TOGGLE GRABACIÓN ══ */
function _toggleRecording() {
  if (_cameraRecorder && _cameraRecorder.state === 'recording') {
    _stopRecording();
  } else {
    _startRecording();
  }
}

/* ══ INICIAR GRABACIÓN ══ */
function _startRecording() {
  if (!_cameraStream) return;

  _cameraChunks = [];

  // Seleccionar codec compatible
  let options = { mimeType: 'video/webm;codecs=vp8,opus' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    options = { mimeType: 'video/webm' };
  }
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    options = { mimeType: 'video/mp4' };
  }

  try {
    _cameraRecorder = new MediaRecorder(_cameraStream, options);

    _cameraRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        _cameraChunks.push(e.data);
      }
    };

    _cameraRecorder.onstop = () => {
      const blob = new Blob(_cameraChunks, { type: _cameraRecorder.mimeType || 'video/webm' });
      if (_cameraOnComplete) _cameraOnComplete(blob);
      _closeCamera();
    };

    _cameraRecorder.start();

    // UI: modo grabando
    const btn = document.getElementById('camRecordBtn');
    const icon = document.getElementById('camRecordIcon');
    const countdown = document.getElementById('camCountdown');
    const progress = document.getElementById('camProgressBar');

    if (btn) {
      btn.style.borderRadius = '50%';
      btn.style.background = '#DC2626';
    }
    if (icon) {
      icon.style.width = '22px';
      icon.style.height = '22px';
      icon.style.borderRadius = '4px';
      icon.style.background = 'white';
      icon.style.border = 'none';
    }
    if (countdown) countdown.style.display = 'flex';
    if (progress) progress.style.display = 'block';

    // Countdown
    _cameraSecondsLeft = CAMERA_MAX_DURATION;
    _updateCountdown();

    _cameraTimer = setInterval(() => {
      _cameraSecondsLeft--;
      _updateCountdown();

      // Actualizar barra de progreso
      const fill = document.getElementById('camProgressFill');
      if (fill) {
        const pct = ((CAMERA_MAX_DURATION - _cameraSecondsLeft) / CAMERA_MAX_DURATION) * 100;
        fill.style.width = pct + '%';
      }

      if (_cameraSecondsLeft <= 0) {
        _stopRecording();
      }
    }, 1000);

  } catch (err) {
    console.error('MediaRecorder error:', err);
    alert('Tu navegador no soporta grabación de video.');
  }
}

/* ══ DETENER GRABACIÓN ══ */
function _stopRecording() {
  if (_cameraRecorder && _cameraRecorder.state !== 'inactive') {
    _cameraRecorder.stop();
  }
  if (_cameraTimer) {
    clearInterval(_cameraTimer);
    _cameraTimer = null;
  }
}

/* ══ ACTUALIZAR COUNTDOWN ══ */
function _updateCountdown() {
  const text = document.getElementById('camCountdownText');
  if (text) {
    const secs = _cameraSecondsLeft;
    text.textContent = `0:${secs < 10 ? '0' + secs : secs}`;
  }
}

/* ══ TOMAR FOTO ══ */
function _takePhoto() {
  const video = document.getElementById('camVideo');
  if (!video || !_cameraStream) return;

  const canvas = document.createElement('canvas');
  const size = Math.min(video.videoWidth, video.videoHeight);
  canvas.width = 800;  // Salida cuadrada 800x800
  canvas.height = 800;

  const ctx = canvas.getContext('2d');

  // Recortar al centro (formato cuadrado)
  const srcX = (video.videoWidth - size) / 2;
  const srcY = (video.videoHeight - size) / 2;

  // Si es cámara frontal, voltear horizontalmente
  if (_cameraFacingMode === 'user') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, srcX, srcY, size, size, 0, 0, 800, 800);

  canvas.toBlob((blob) => {
    if (blob && _cameraOnComplete) {
      _cameraOnComplete(blob);
    }
    _closeCamera();
  }, 'image/jpeg', 0.7);
}

/* ══ CERRAR CÁMARA ══ */
function _closeCamera() {
  _stopCamera();
  _cameraRecorder = null;
  _cameraChunks = [];

  const overlay = document.getElementById('cameraOverlay');
  if (overlay) {
    overlay.remove();
  }

  if (_cameraOnClose) _cameraOnClose();
  _cameraOnComplete = null;
  _cameraOnClose = null;
}

/* ══ FALLBACK: SELECTOR DE ARCHIVOS ══ */
function _openFileFallback() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = _cameraType === 'video' ? 'video/*' : 'image/*';
  input.capture = 'environment';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file && _cameraOnComplete) {
      _cameraOnComplete(file);
    }
  };

  input.click();
}

/* ══ API PÚBLICA ══ */
window.openCamera = openCamera;
