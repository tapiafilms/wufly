SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id IN ('media-videos', 'media-photos', 'shorts-public');
