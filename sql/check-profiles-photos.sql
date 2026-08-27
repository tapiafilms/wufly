SELECT id, nombre_mascota, foto_mascota_url, updated_at FROM profiles WHERE foto_mascota_url IS NOT NULL ORDER BY updated_at DESC LIMIT 5;
