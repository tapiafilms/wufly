-- 1. Activar extensión pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 2. Activar extensión http
CREATE EXTENSION IF NOT EXISTS http;

-- 3. Crear cron job cada hora
SELECT cron.schedule(
  'cleanup-videos-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ybnacudfqerbzpvqcjzc.supabase.co/functions/v1/cleanup-videos',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM3NjM2OSwiZXhwIjoyMDkxOTUyMzY5fQ.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE"}'::jsonb
  );
  $$
);
