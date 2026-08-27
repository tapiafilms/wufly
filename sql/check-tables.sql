SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('media_videos', 'media_photos', 'media_galleries', 'shorts_public');
