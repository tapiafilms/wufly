-- ══════════════════════════════════════════════════════════════
-- WUFLY MEDIA - Tablas para Supabase
-- Videos privados (auto-delete 48h), Fotos privadas, Galerías, Shorts públicos
-- ══════════════════════════════════════════════════════════════

-- ── VIDEOS PRIVADOS (se eliminan después de 48 horas) ──
CREATE TABLE IF NOT EXISTS media_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INT DEFAULT 8,
  size_bytes INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours')
);

-- ── FOTOS PRIVADAS (permanentes) ──
CREATE TABLE IF NOT EXISTS media_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  size_bytes INT,
  gallery_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── GALERÍAS ──
CREATE TABLE IF NOT EXISTS media_galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cover_url TEXT,
  photo_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── SHORTS PÚBLICOS (último video por usuario para Home) ──
CREATE TABLE IF NOT EXISTS shorts_public (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  pet_name TEXT,
  user_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ══════════════════════════════════════════════════════════════
-- RLS (Row Level Security)
-- ══════════════════════════════════════════════════════════════

-- Videos: solo el usuario ve los suyos
ALTER TABLE media_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own videos" ON media_videos
  FOR ALL USING (auth.uid() = user_id);

-- Fotos: solo el usuario ve las suyas
ALTER TABLE media_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own photos" ON media_photos
  FOR ALL USING (auth.uid() = user_id);

-- Galerías: solo el usuario ve las suyas
ALTER TABLE media_galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own galleries" ON media_galleries
  FOR ALL USING (auth.uid() = user_id);

-- Shorts: todos ven, solo el dueño edita
ALTER TABLE shorts_public ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read, owner write" ON shorts_public
  FOR ALL USING (true)
  WITH CHECK (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ══════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('media-videos', 'media-videos', false, 1048576, ARRAY['video/webm', 'video/mp4']),
  ('media-photos', 'media-photos', false, 524288, ARRAY['image/jpeg', 'image/png']),
  ('shorts-public', 'shorts-public', true, 1048576, ARRAY['video/webm', 'video/mp4'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Users upload own videos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users view own videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own videos" ON storage.objects
  FOR DELETE USING (bucket_id = 'media-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users view own photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'media-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'media-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public read shorts" ON storage.objects
  FOR SELECT USING (bucket_id = 'shorts-public');

CREATE POLICY "Users upload own shorts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'shorts-public' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own shorts" ON storage.objects
  FOR UPDATE USING (bucket_id = 'shorts-public' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own shorts" ON storage.objects
  FOR DELETE USING (bucket_id = 'shorts-public' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ══════════════════════════════════════════════════════════════
-- INDEXES
-- ══════════════════════════════════════════════════════════════

CREATE INDEX idx_media_videos_user_id ON media_videos(user_id);
CREATE INDEX idx_media_videos_expires_at ON media_videos(expires_at);
CREATE INDEX idx_media_photos_user_id ON media_photos(user_id);
CREATE INDEX idx_media_photos_gallery_id ON media_photos(gallery_id);
CREATE INDEX idx_media_galleries_user_id ON media_galleries(user_id);
CREATE INDEX idx_shorts_public_created_at ON shorts_public(created_at DESC);
