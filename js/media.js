/* ══════════════════════════════════════════════════════════════
   MEDIA - WUFLY
   Lógica principal: upload, galerías, shorts públicos
   ══════════════════════════════════════════════════════════════ */

let _mediaPhotos = [];
let _mediaPhotoIndex = 0;

/* ══ SUB-TABS DE MEDIA ══ */
function switchMediaTab(tab) {
  const subs = ['videos', 'fotos', 'galerias'];
  subs.forEach(s => {
    const el = document.getElementById('msub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('mtab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color = s === tab ? 'white' : 'var(--text-muted)';
    }
  });

  // Renderizar contenido según tab
  if (tab === 'videos') renderMediaVideos();
  if (tab === 'fotos') renderMediaFotos();
  if (tab === 'galerias') renderMediaGalerias();
}

/* ══ RENDER VIDEOS PRIVADOS ══ */
async function renderMediaVideos() {
  const container = document.getElementById('msub-videos');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">🎬</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Crea tu primer video
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Videos de 8-10 segundos estilo Reels.<br>Solo tú puedes verlos.
      </div>
      <button onclick="mediaCreateVideo()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Grabar video
      </button>
    </div>
  `;

  // Cargar videos del usuario
  try {
    const { data: videos, error } = await db
      .from('media_videos')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (videos && videos.length > 0) {
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS VIDEOS (${videos.length})
          </div>
        </div>
      `;

      videos.forEach(v => {
        const fecha = new Date(v.created_at);
        const expira = new Date(v.expires_at);
        const horasRestantes = Math.max(0, Math.floor((expira - Date.now()) / (1000 * 60 * 60)));
        const sizeKB = Math.round(v.size_bytes / 1024);

        html += `
          <div style="
            background:var(--surface); border-radius:14px; border:1.5px solid var(--border-md);
            margin-bottom:10px; overflow:hidden;
          ">
            <div style="
              height:140px; background:linear-gradient(135deg,#1a1a2e,#16213e);
              display:flex; align-items:center; justify-content:center; position:relative;
            ">
              ${v.thumbnail_url ? `
                <img src="${_getMediaUrl(v.thumbnail_url)}" style="width:100%;height:100%;object-fit:cover;" alt="video">
              ` : `
                <span style="font-size:40px;">🎬</span>
              `}
              <div style="
                position:absolute; bottom:8px; right:8px;
                background:rgba(0,0,0,0.7); padding:4px 8px; border-radius:6px;
                font-size:11px; font-weight:600;
              ">
                ${v.duration || 10}s • ${sizeKB}KB
              </div>
              <div style="
                position:absolute; top:8px; right:8px;
                background:${horasRestantes > 0 ? 'rgba(220,38,38,0.9)' : 'rgba(100,100,100,0.9)'};
                padding:3px 8px; border-radius:6px; font-size:10px; font-weight:600;
              ">
                ${horasRestantes > 0 ? `⏱ ${horasRestantes}h restantes` : '⏱ Expirado'}
              </div>
            </div>
            <div style="padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:11px; color:var(--text-muted);">
                ${fecha.toLocaleDateString('es-CL')} ${fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <button onclick="mediaDeleteVideo('${v.id}')" style="
                background:none; border:none; color:#DC2626; font-size:11px;
                font-weight:600; cursor:pointer; padding:4px 8px;
              ">Eliminar</button>
            </div>
          </div>
        `;
      });

      container.innerHTML = `
        <div style="text-align:center;padding:16px 20px 8px;">
          <button onclick="mediaCreateVideo()" class="btn-primary" style="
            padding:12px 24px; font-size:13px;
          ">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Grabar video
          </button>
        </div>
        ${html}
      `;
    }
  } catch (err) {
    console.error('Error loading videos:', err);
  }
}

/* ══ RENDER FOTOS PRIVADAS ══ */
async function renderMediaFotos() {
  const container = document.getElementById('msub-fotos');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">📸</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Tomar foto
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Fotos cuadradas comprimidas.<br>Solo tú puedes verlas.
      </div>
      <button onclick="mediaCreatePhoto()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        Tomar foto
      </button>
    </div>
  `;

  // Cargar fotos del usuario
  try {
    const { data: photos, error } = await db
      .from('media_photos')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (photos && photos.length > 0) {
      _mediaPhotos = photos;
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS FOTOS (${photos.length})
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:0 2px;">
      `;

      photos.forEach((p, idx) => {
        const sizeKB = Math.round(p.size_bytes / 1024);
        html += `
          <div onclick="mediaOpenPhoto(${idx})" style="
            aspect-ratio:1; border-radius:8px; overflow:hidden; position:relative;
            background:var(--surface); border:1px solid var(--border-md);
            cursor:pointer;
          ">
            <img src="${_getMediaUrl(p.photo_url)}" style="width:100%;height:100%;object-fit:cover;" alt="foto">
            <button onclick="event.stopPropagation();mediaDeletePhoto('${p.id}')" style="
              position:absolute; top:4px; right:4px;
              width:20px; height:20px; border-radius:50%; border:none;
              background:rgba(0,0,0,0.6); color:white; font-size:10px;
              cursor:pointer; display:flex; align-items:center; justify-content:center;
            ">✕</button>
          </div>
        `;
      });

      html += '</div>';
      container.innerHTML = `
        <div style="text-align:center;padding:16px 20px 8px;">
          <button onclick="mediaCreatePhoto()" class="btn-primary" style="
            padding:12px 24px; font-size:13px;
          ">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            Tomar foto
          </button>
        </div>
        ${html}
      `;
    }
  } catch (err) {
    console.error('Error loading photos:', err);
  }
}

/* ══ RENDER GALERÍAS ══ */
async function renderMediaGalerias() {
  const container = document.getElementById('msub-galerias');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">🖼️</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Crear galería
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Organiza tus fotos en galerías.<br>
        <em style="color:var(--purple);">Próximamente: galerías animadas para compartir</em>
      </div>
      <button onclick="mediaCreateGallery()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        Nueva galería
      </button>
    </div>
  `;

  // Cargar galerías del usuario
  try {
    const { data: galleries, error } = await db
      .from('media_galleries')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (galleries && galleries.length > 0) {
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS GALERÍAS (${galleries.length})
          </div>
        </div>
      `;

      galleries.forEach(g => {
        const fecha = new Date(g.created_at);
        html += `
          <div onclick="mediaOpenGallery('${g.id}')" style="
            background:var(--surface); border-radius:14px; border:1.5px solid var(--border-md);
            margin-bottom:10px; padding:14px; display:flex; gap:12px; align-items:center;
            cursor:pointer;
          ">
            <div style="
              width:56px; height:56px; border-radius:10px; background:var(--purple-light);
              display:flex; align-items:center; justify-content:center; flex-shrink:0;
            ">
              ${g.cover_url ? `
                <img src="${_getMediaUrl(g.cover_url)}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" alt="">
              ` : `
                <span style="font-size:24px;">🖼️</span>
              `}
            </div>
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700;font-size:14px;color:var(--text);margin-bottom:2px;">${g.name}</div>
              <div style="font-size:11px;color:var(--text-muted);">
                ${g.photo_count || 0} fotos • ${fecha.toLocaleDateString('es-CL')}
              </div>
            </div>
            <button onclick="event.stopPropagation();mediaDeleteGallery('${g.id}')" style="
              background:none; border:none; color:#DC2626; font-size:11px;
              font-weight:600; cursor:pointer; padding:4px 8px;
            ">Eliminar</button>
          </div>
        `;
      });

      container.innerHTML = `
        <div style="text-align:center;padding:16px 20px 8px;">
          <button onclick="mediaCreateGallery()" class="btn-primary" style="
            padding:12px 24px; font-size:13px;
          ">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Nueva galería
          </button>
        </div>
        ${html}
      `;
    }
  } catch (err) {
    console.error('Error loading galleries:', err);
  }
}

/* ══ ABRIR GALERÍA — ver fotos de la galería ══ */
async function mediaOpenGallery(galleryId) {
  if (!currentUser) return;

  const { data: gallery } = await db
    .from('media_galleries')
    .select('*')
    .eq('id', galleryId)
    .single();

  if (!gallery) return;

  // Cargar fotos de esta galería
  const { data: galleryPhotos } = await db
    .from('media_gallery_photos')
    .select('photo_id, position')
    .eq('gallery_id', galleryId)
    .order('position');

  const photoIds = (galleryPhotos || []).map(gp => gp.photo_id);

  if (photoIds.length === 0) {
    _mediaShowToast('Abrí una foto y tocá "Agregar a galería"');
    return;
  }

  // Cargar datos de las fotos
  const { data: photos } = await db
    .from('media_photos')
    .select('*')
    .in('id', photoIds);

  if (!photos || photos.length === 0) return;

  // Ordenar según el orden guardado
  const ordered = photoIds.map(id => photos.find(p => p.id === id)).filter(Boolean);

  const overlay = document.createElement('div');
  overlay.id = 'gallery-viewer-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:99999;
    background:var(--bg, #0d0d1a);
    display:flex; flex-direction:column;
    animation:fadeIn 0.2s ease;
  `;

  let html = `
    <div style="
      padding:16px; padding-top:max(env(safe-area-inset-top,16px),16px);
      display:flex; align-items:center; justify-content:space-between;
      border-bottom:1px solid var(--border-md);
    ">
      <button id="gv-close" style="
        background:none; border:none; color:var(--text); font-size:14px;
        cursor:pointer; padding:4px;
      ">← Volver</button>
      <div style="font-weight:700;font-size:15px;color:var(--text);">
        ${gallery.name}
      </div>
      <div style="font-size:12px;color:var(--text-muted);">
        ${ordered.length} fotos
      </div>
    </div>
    <div style="
      flex:1; overflow-y:auto; padding:12px;
      display:grid; grid-template-columns:repeat(3,1fr); gap:4px;
      align-content:start;
    ">
  `;

  ordered.forEach(p => {
    html += `
      <div style="
        aspect-ratio:1; border-radius:8px; overflow:hidden;
        background:var(--surface); border:1px solid var(--border-md);
      ">
        <img src="${_getMediaUrl(p.photo_url)}" style="width:100%;height:100%;object-fit:cover;" alt="">
      </div>
    `;
  });

  html += '</div>';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.querySelector('#gv-close').addEventListener('click', () => {
    overlay.remove();
    document.body.style.overflow = '';
  });
}

/* ══ CREAR VIDEO ══ */
function mediaCreateVideo() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  openCamera('video', async (blob) => {
    _mediaShowLoading('Procesando video...');

    // Timeout de seguridad: 30 segundos
    const safetyTimeout = setTimeout(() => {
      _mediaHideLoading();
      _mediaShowToast('Tiempo de espera agotado. Intenta de nuevo.', 'error');
    }, 30000);

    try {
      // Comprimir video
      const compressed = await compressVideo(blob);

      // Generar thumbnail
      const thumbnail = await generateThumbnail(compressed);

      // Determinar MIME type correcto para Supabase
      const rawType = compressed.type || '';
      const videoMimeType = rawType.includes('mp4') ? 'video/mp4' : 'video/webm';
      console.log(`[media] Video blob type: ${rawType}, using: ${videoMimeType}`);

      // Upload directo con fetch
      const videoPath = `${currentUser.id}/video_${Date.now()}.webm`;
      console.log(`[media] Uploading video: ${videoPath}, size: ${(compressed.size / 1024).toFixed(0)}KB, type: ${videoMimeType}`);

      const token = _sbToken();

      const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/media-videos/${videoPath}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': videoMimeType,
          'x-upsert': 'true'
        },
        body: compressed
      });

      console.log('[media] Video upload response:', uploadRes.status);
      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error('[media] Video upload error:', errText);
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      // Subir thumbnail (si se generó)
      let thumbPath = null;
      if (thumbnail) {
        thumbPath = `${currentUser.id}/thumb_${Date.now()}.jpg`;
        const thumbRes = await fetch(`${SUPABASE_URL}/storage/v1/object/media-photos/${thumbPath}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'image/jpeg',
            'x-upsert': 'true'
          },
          body: thumbnail
        });
        if (!thumbRes.ok) console.warn('Thumbnail upload error:', thumbRes.status);
      }

      // Guardar en BD
      const { error: dbErr } = await db.from('media_videos').insert({
        user_id: currentUser.id,
        video_url: videoPath,
        thumbnail_url: thumbPath,
        duration: CAMERA_MAX_DURATION,
        size_bytes: compressed.size,
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      });

      if (dbErr) throw dbErr;

      // Actualizar shorts públicos
      await _updatePublicShort(videoPath, thumbPath);

      clearTimeout(safetyTimeout);
      _mediaHideLoading();
      _mediaShowToast('Video guardado ✓');

      // Refrescar lista
      renderMediaVideos();

    } catch (err) {
      console.error('Error uploading video:', err);
      clearTimeout(safetyTimeout);
      _mediaHideLoading();
      _mediaShowToast('Error al guardar video', 'error');
    }
  });
}

/* ══ CREAR FOTO ══ */
function mediaCreatePhoto() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  openCamera('photo', async (blob) => {
    _mediaShowLoading('Procesando foto...');

    // Timeout de seguridad: 15 segundos
    const safetyTimeout = setTimeout(() => {
      _mediaHideLoading();
      _mediaShowToast('Tiempo de espera agotado. Intenta de nuevo.', 'error');
    }, 15000);

    try {
      // Comprimir foto
      const compressed = await compressPhoto(blob);
      console.log(`[media] Foto comprimida: ${(blob.size/1024).toFixed(0)}KB → ${(compressed.size/1024).toFixed(0)}KB`);

      // Upload directo con fetch (más confiable que el cliente Supabase)
      const photoPath = `${currentUser.id}/photo_${Date.now()}.jpg`;
      console.log(`[media] Uploading photo: ${photoPath}`);

      const token = _sbToken();

      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/media-photos/${photoPath}`;
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'image/jpeg',
          'x-upsert': 'true'
        },
        body: compressed
      });

      console.log('[media] Upload response:', uploadRes.status);
      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error('[media] Upload error:', errText);
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }
      console.log('[media] Upload OK');

      // Guardar en BD
      const { error: dbErr } = await db.from('media_photos').insert({
        user_id: currentUser.id,
        photo_url: photoPath,
        size_bytes: compressed.size
      });

      if (dbErr) {
        console.error('[media] DB insert error:', dbErr);
        throw dbErr;
      }
      console.log('[media] DB insert OK');

      clearTimeout(safetyTimeout);
      _mediaHideLoading();
      _mediaShowToast('Foto guardada ✓');

      // Refrescar lista
      renderMediaFotos();

    } catch (err) {
      console.error('Error uploading photo:', err);
      clearTimeout(safetyTimeout);
      _mediaHideLoading();
      _mediaShowToast('Error al guardar foto', 'error');
    }
  });
}

/* ══ CREAR GALERÍA ══ */
async function mediaCreateGallery() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  const name = prompt('Nombre de la galería:');
  if (!name || name.trim().length < 2) return;

  try {
    const { error } = await db.from('media_galleries').insert({
      user_id: currentUser.id,
      name: name.trim()
    });

    if (error) throw error;

    _mediaShowToast('Galería creada ✓');
    renderMediaGalerias();
  } catch (err) {
    console.error('Error creating gallery:', err);
    _mediaShowToast('Error al crear galería', 'error');
  }
}

/* ══ ACTUALIZAR SHORTS PÚBLICOS ══ */
async function _updatePublicShort(videoPath, thumbPath) {
  try {
    // Obtener perfil del usuario
    let petName = '';
    let userName = '';
    try {
      const profile = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
      petName = profile.nombreMascota || '';
      userName = profile.nombre || currentUser.email.split('@')[0];
    } catch {}

    // Verificar si ya tiene short público
    const { data: existing } = await db
      .from('shorts_public')
      .select('video_url, thumbnail_url')
      .eq('user_id', currentUser.id)
      .single();

    if (existing) {
      // Eliminar video anterior de storage
      try {
        await db.storage.from('shorts-public').remove([existing.video_url]);
      } catch {}

      // Actualizar registro
      await db.from('shorts_public').update({
        video_url: videoPath,
        thumbnail_url: thumbPath,
        pet_name: petName,
        user_name: userName,
        created_at: new Date().toISOString()
      }).eq('user_id', currentUser.id);
    } else {
      // Crear nuevo
      await db.from('shorts_public').insert({
        user_id: currentUser.id,
        video_url: videoPath,
        thumbnail_url: thumbPath,
        pet_name: petName,
        user_name: userName
      });
    }
  } catch (err) {
    console.error('Error updating public short:', err);
  }
}

/* ══ ELIMINAR VIDEO ══ */
async function mediaDeleteVideo(id) {
  if (!confirm('¿Eliminar este video?')) return;

  try {
    // Obtener datos del video
    const { data: video } = await db
      .from('media_videos')
      .select('video_url, thumbnail_url')
      .eq('id', id)
      .single();

    if (video) {
      // Eliminar de storage
      try {
        await db.storage.from('media-videos').remove([video.video_url]);
        if (video.thumbnail_url) {
          await db.storage.from('media-photos').remove([video.thumbnail_url]);
        }
      } catch {}
    }

    // Eliminar de BD
    await db.from('media_videos').delete().eq('id', id);

    _mediaShowToast('Video eliminado');
    renderMediaVideos();
  } catch (err) {
    console.error('Error deleting video:', err);
  }
}

/* ══ ELIMINAR FOTO ══ */
async function mediaDeletePhoto(id) {
  if (!confirm('¿Eliminar esta foto?')) return;

  try {
    const { data: photo } = await db
      .from('media_photos')
      .select('photo_url')
      .eq('id', id)
      .single();

    if (photo) {
      try {
        await db.storage.from('media-photos').remove([photo.photo_url]);
      } catch {}
    }

    await db.from('media_photos').delete().eq('id', id);

    _mediaShowToast('Foto eliminada');
    renderMediaFotos();
  } catch (err) {
    console.error('Error deleting photo:', err);
  }
}

/* ══ ELIMINAR GALERÍA ══ */
async function mediaDeleteGallery(id) {
  if (!confirm('¿Eliminar esta galería? Las fotos no se eliminarán.')) return;

  try {
    await db.from('media_galleries').delete().eq('id', id);
    _mediaShowToast('Galería eliminada');
    renderMediaGalerias();
  } catch (err) {
    console.error('Error deleting gallery:', err);
  }
}

/* ══ UTILS ══ */
function _getMediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];

  // Determinar bucket
  let bucket = 'media-photos';
  if (path.includes('video_') || path.includes('thumb_')) {
    bucket = path.includes('video_') ? 'media-videos' : 'media-photos';
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

function _mediaShowLoading(text) {
  const el = document.getElementById('mediaLoading');
  if (el) {
    el.querySelector('p').textContent = text;
    el.style.display = 'flex';
  }
}

function _mediaHideLoading() {
  const el = document.getElementById('mediaLoading');
  if (el) el.style.display = 'none';
}

function _mediaShowToast(msg, type = 'ok') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
    background:${type === 'ok' ? 'var(--purple)' : '#DC2626'};
    color:white; padding:12px 24px; border-radius:12px;
    font-size:13px; font-weight:600; z-index:10000;
    animation:slideUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

/* ══ LIGHTBOX FOTOS — pantalla completa con swipe ══ */
function mediaOpenPhoto(index) {
  if (!_mediaPhotos || !_mediaPhotos.length) return;
  _mediaPhotoIndex = index;

  const overlay = document.createElement('div');
  overlay.id = 'media-photo-lightbox';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:99999;
    background:rgba(0,0,0,0.95);
    display:flex; align-items:center; justify-content:center;
    touch-action:pan-y;
  `;

  overlay.innerHTML = `
    <div id="media-lightbox-img" style="
      width:100vw; height:100vh;
      display:flex; align-items:center; justify-content:center;
      transition:transform 0.3s ease;
    ">
      <img id="media-lightbox-photo" src="${_getMediaUrl(_mediaPhotos[_mediaPhotoIndex].photo_url)}"
        style="max-width:100%; max-height:100%; object-fit:contain; user-select:none; -webkit-user-select:none;"
        draggable="false">
    </div>
    <div style="
      position:absolute; top:0; left:0; right:0;
      padding:env(safe-area-inset-top,16px) 16px 12px;
      display:flex; justify-content:space-between; align-items:center;
      background:linear-gradient(rgba(0,0,0,0.6), transparent);
      padding-top: max(env(safe-area-inset-top,16px), 16px);
    ">
      <div style="color:rgba(255,255,255,0.7); font-size:13px; font-weight:600;">
        <span id="media-lightbox-counter">${_mediaPhotoIndex + 1} / ${_mediaPhotos.length}</span>
      </div>
      <button id="media-lightbox-close" style="
        width:36px; height:36px; border-radius:50%; border:none;
        background:rgba(255,255,255,0.15); color:white; font-size:18px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
      ">✕</button>
    </div>
    <button id="media-lightbox-prev" style="
      position:absolute; left:8px; top:50%; transform:translateY(-50%);
      width:44px; height:44px; border-radius:50%; border:none;
      background:rgba(255,255,255,0.12); color:white; font-size:20px;
      cursor:pointer; display:${_mediaPhotos.length > 1 ? 'flex' : 'none'}; align-items:center; justify-content:center;
    ">‹</button>
    <button id="media-lightbox-next" style="
      position:absolute; right:8px; top:50%; transform:translateY(-50%);
      width:44px; height:44px; border-radius:50%; border:none;
      background:rgba(255,255,255,0.12); color:white; font-size:20px;
      cursor:pointer; display:${_mediaPhotos.length > 1 ? 'flex' : 'none'}; align-items:center; justify-content:center;
    ">›</button>
    <div style="
      position:absolute; bottom:0; left:0; right:0;
      padding:12px 16px max(env(safe-area-inset-bottom,16px),16px);
      display:flex; justify-content:center;
      background:linear-gradient(transparent, rgba(0,0,0,0.6));
    ">
      <button id="media-lightbox-add-gallery" style="
        background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2);
        color:white; font-size:13px; font-weight:600;
        padding:10px 20px; border-radius:24px; cursor:pointer;
        display:flex; align-items:center; gap:6px;
      ">
        <span style="font-size:16px;">🖼️</span> Agregar a galería
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Close
  const closeBtn = overlay.querySelector('#media-lightbox-close');
  closeBtn.addEventListener('click', _mediaClosePhoto);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) _mediaClosePhoto();
  });

  // Nav buttons
  overlay.querySelector('#media-lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    _mediaNavPhoto(-1);
  });
  overlay.querySelector('#media-lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    _mediaNavPhoto(1);
  });

  // Add to gallery
  overlay.querySelector('#media-lightbox-add-gallery').addEventListener('click', (e) => {
    e.stopPropagation();
    _mediaShowGalleryPicker();
  });

  // Keyboard
  overlay._keyHandler = (e) => {
    if (e.key === 'Escape') _mediaClosePhoto();
    if (e.key === 'ArrowLeft') _mediaNavPhoto(-1);
    if (e.key === 'ArrowRight') _mediaNavPhoto(1);
  };
  document.addEventListener('keydown', overlay._keyHandler);

  // Swipe
  let startX = 0;
  overlay.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      _mediaNavPhoto(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
}

function _mediaNavPhoto(dir) {
  const newIndex = _mediaPhotoIndex + dir;
  if (newIndex < 0 || newIndex >= _mediaPhotos.length) return;
  _mediaPhotoIndex = newIndex;

  const img = document.getElementById('media-lightbox-photo');
  const counter = document.getElementById('media-lightbox-counter');
  if (img) {
    img.src = _getMediaUrl(_mediaPhotos[_mediaPhotoIndex].photo_url);
  }
  if (counter) {
    counter.textContent = `${_mediaPhotoIndex + 1} / ${_mediaPhotos.length}`;
  }
}

function _mediaClosePhoto() {
  const overlay = document.getElementById('media-photo-lightbox');
  if (!overlay) return;
  if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
  overlay.remove();
  document.body.style.overflow = '';
}

/* ══ GALLERY PICKER — desde el lightbox ══ */
async function _mediaShowGalleryPicker() {
  if (!_mediaPhotos || !_mediaPhotos[_mediaPhotoIndex]) return;
  const photoId = _mediaPhotos[_mediaPhotoIndex].id;

  // Cargar galerías del usuario
  const { data: galleries } = await db
    .from('media_galleries')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });

  if (!galleries || galleries.length === 0) {
    _mediaShowToast('Creá una galería primero', 'error');
    return;
  }

  // Cargar en cuáles ya está esta foto
  const { data: existing } = await db
    .from('media_gallery_photos')
    .select('gallery_id')
    .eq('photo_id', photoId);

  const photoInGalleries = new Set((existing || []).map(e => e.gallery_id));

  const picker = document.createElement('div');
  picker.id = 'gallery-picker-sheet';
  picker.style.cssText = `
    position:fixed; bottom:0; left:0; right:0; z-index:100000;
    background:var(--surface, #1a1a2e);
    border-radius:20px 20px 0 0;
    padding:20px 16px max(env(safe-area-inset-bottom,20px),20px);
    box-shadow:0 -8px 32px rgba(0,0,0,0.5);
    animation:slideUp 0.25s ease;
  `;

  let html = `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="width:36px;height:4px;border-radius:2px;background:rgba(255,255,255,0.2);margin:0 auto 12px;"></div>
      <div style="font-weight:700;font-size:16px;color:var(--text);">Agregar a galería</div>
    </div>
  `;

  galleries.forEach(g => {
    const isIn = photoInGalleries.has(g.id);
    html += `
      <div onclick="mediaAddPhotoToGallery('${g.id}','${photoId}',this)" style="
        display:flex; align-items:center; gap:12px;
        padding:12px; border-radius:12px; margin-bottom:6px;
        background:${isIn ? 'var(--purple-light, #2d1b69)' : 'transparent'};
        cursor:pointer; transition:background 0.15s;
      ">
        <div style="
          width:44px; height:44px; border-radius:10px;
          background:var(--purple-light, #2d1b69);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        ">
          ${g.cover_url ? `
            <img src="${_getMediaUrl(g.cover_url)}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" alt="">
          ` : `
            <span style="font-size:18px;">🖼️</span>
          `}
        </div>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:14px;color:var(--text);">${g.name}</div>
          <div style="font-size:11px;color:var(--text-muted);">${g.photo_count || 0} fotos</div>
        </div>
        <div style="
          width:24px; height:24px; border-radius:50%;
          background:${isIn ? 'var(--purple)' : 'rgba(255,255,255,0.1)'};
          display:flex; align-items:center; justify-content:center;
          color:white; font-size:12px; font-weight:700;
        ">${isIn ? '✓' : '+'}</div>
      </div>
    `;
  });

  picker.innerHTML = html;
  document.body.appendChild(picker);

  // Cerrar con tap en el fondo oscuro
  picker.addEventListener('click', (e) => {
    if (e.target === picker) picker.remove();
  });

  // Cerrar con gesto swipe down
  let startY = 0;
  picker.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });
  picker.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientY - startY;
    if (diff > 80) picker.remove();
  }, { passive: true });
}

async function mediaAddPhotoToGallery(galleryId, photoId, el) {
  // Verificar si ya está
  const { data: existing } = await db
    .from('media_gallery_photos')
    .select('id')
    .eq('gallery_id', galleryId)
    .eq('photo_id', photoId)
    .single();

  if (existing) {
    // Quitar de la galería
    await db.from('media_gallery_photos').delete().eq('id', existing.id);

    // Actualizar photo_count
    const { count } = await db
      .from('media_gallery_photos')
      .select('*', { count: 'exact', head: true })
      .eq('gallery_id', galleryId);

    await db.from('media_galleries').update({ photo_count: count || 0 }).eq('id', galleryId);

    _mediaShowToast('Foto removida de la galería');
  } else {
    // Agregar a la galería
    const { count: currentCount } = await db
      .from('media_gallery_photos')
      .select('*', { count: 'exact', head: true })
      .eq('gallery_id', galleryId);

    await db.from('media_gallery_photos').insert({
      gallery_id: galleryId,
      photo_id: photoId,
      position: currentCount || 0
    });

    // Actualizar photo_count y cover
    const { count } = await db
      .from('media_gallery_photos')
      .select('*', { count: 'exact', head: true })
      .eq('gallery_id', galleryId);

    // Cover = primera foto si no tiene
    const { data: g } = await db.from('media_galleries').select('cover_url').eq('id', galleryId).single();
    if (!g || !g.cover_url) {
      const photo = _mediaPhotos.find(p => p.id === photoId);
      if (photo) {
        await db.from('media_galleries').update({
          photo_count: count || 0,
          cover_url: photo.photo_url
        }).eq('id', galleryId);
      }
    } else {
      await db.from('media_galleries').update({ photo_count: count || 0 }).eq('id', galleryId);
    }

    _mediaShowToast('Agregada a la galería ✓');
  }

  // Cerrar el sheet después de un momento
  setTimeout(() => {
    const sheet = document.getElementById('gallery-picker-sheet');
    if (sheet) sheet.remove();
  }, 400);
}
