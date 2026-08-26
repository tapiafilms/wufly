SELECT jobid, jobname, schedule, command FROM cron.job WHERE jobname = 'cleanup-videos-hourly';
