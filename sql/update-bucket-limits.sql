UPDATE storage.buckets SET file_size_limit = 5242880 WHERE id = 'media-videos';
UPDATE storage.buckets SET file_size_limit = 1048576 WHERE id = 'media-photos';
