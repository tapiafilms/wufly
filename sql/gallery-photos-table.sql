CREATE TABLE IF NOT EXISTS media_gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID NOT NULL REFERENCES media_galleries(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL REFERENCES media_photos(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(gallery_id, photo_id)
);

ALTER TABLE media_gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own gallery_photos"
  ON media_gallery_photos FOR ALL
  USING (
    gallery_id IN (
      SELECT id FROM media_galleries WHERE user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_gallery_photos_gallery ON media_gallery_photos(gallery_id);
