SELECT name, bucket_id, created_at, metadata FROM storage.objects WHERE bucket_id = 'media-photos' ORDER BY created_at DESC LIMIT 5;
