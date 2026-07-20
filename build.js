const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = [
  'js/config.js',
  'js/supabase.min.js',
  'js/clinicas-destacadas.js',
  'js/auth.js',
  'js/analytics.js',
  'js/vitrina.js',
  'js/geo.js',
  'js/places.js',
  'js/onboarding.js',
  'js/app.js',
  'js/perdidos.js',
  'js/notificaciones.js',
  'js/adoptar.js',
  'js/tiendas-destacadas.js',
  'js/tiendas.js',
  'js/grooming.js',
  'js/paseadores.js',
  'js/arte.js',
  'js/recetas.js',
  'js/fundaciones.js',
  'js/recordatorios.js',
  'js/perfil.js',
  'js/chat.js',
  'js/pet-gallery.js',
  'js/foto-juntos.js',
  'js/home.js',
  'js/companion.js',
  'js/mapa-paseos.js',
  'js/encuentro.js',
  'js/paseador-mode.js'
];

const bundlePath = path.join(__dirname, 'js/wufly.bundle.js');
const minBundlePath = path.join(__dirname, 'js/wufly.bundle.min.js');

function build() {
  console.log('📦 Iniciando compilación de Wufly...');
  try {
    let concatenated = '';
    for (const file of files) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Archivo no encontrado: ${filePath}`);
        return false;
      }
      const content = fs.readFileSync(filePath, 'utf8');
      concatenated += `\n\n// ==========================================\n// ARCHIVO: ${file}\n// ==========================================\n\n${content}`;
    }

    fs.writeFileSync(bundlePath, concatenated, 'utf8');
    console.log(`✅ Archivos concatenados en ${bundlePath}`);

    // Minificar usando esbuild de forma síncrona
    const esbuildCmd = `npx esbuild "${bundlePath}" --minify --outfile="${minBundlePath}"`;
    console.log('⚡ Ejecutando esbuild...');
    try {
      execSync(esbuildCmd, { stdio: 'inherit' });
      console.log(`🚀 Minificación completada: ${minBundlePath}`);
      console.log(`📊 Tamaño del bundle minificado: ${(fs.statSync(minBundlePath).size / 1024).toFixed(2)} KB`);
      return true;
    } catch (err) {
      console.error('❌ Error de minificación con esbuild:', err.message);
      return false;
    }
  } catch (e) {
    console.error('❌ Error general de compilación:', e.message);
    return false;
  }
}

// Ejecutar compilación inicial
build();

// Watcher si se pasa el flag --watch
if (process.argv.includes('--watch')) {
  console.log('👀 Vigilando cambios en archivos JS...');
  
  // Lista de archivos absolutos a vigilar
  const watchFiles = files.map(f => path.join(__dirname, f));
  
  let debounceTimeout;
  fs.watch(path.join(__dirname, 'js'), (eventType, filename) => {
    // Si cambia un archivo que no sea wufly.bundle.js o wufly.bundle.min.js
    if (filename && filename !== 'wufly.bundle.js' && filename !== 'wufly.bundle.min.js' && filename.endsWith('.js')) {
      const fullPath = path.join(__dirname, 'js', filename);
      // Verificar si el archivo está en nuestra lista de compilación
      if (watchFiles.includes(fullPath)) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          console.log(`📝 Cambio detectado en js/${filename}. Recompilando...`);
          build();
        }, 100);
      }
    }
  });
}
