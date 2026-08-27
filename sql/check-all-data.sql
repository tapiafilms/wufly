SELECT 'media_photos' as tabla, count(*) as total FROM media_photos
UNION ALL
SELECT 'media_galleries', count(*) FROM media_galleries
UNION ALL
SELECT 'media_gallery_photos', count(*) FROM media_gallery_photos
UNION ALL
SELECT 'media_videos', count(*) FROM media_videos;
