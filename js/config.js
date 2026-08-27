/* ══════════════════════════════════════
   CONFIG GLOBAL — Wufly
   Constantes compartidas por todos los módulos.
   Este archivo debe cargarse PRIMERO en index.html.
   ══════════════════════════════════════ */

const SUPABASE_URL  = 'https://ybnacudfqerbzpvqcjzc.supabase.co';
const SUPABASE_REF  = 'ybnacudfqerbzpvqcjzc';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';

const PERFIL_KEY = 'wufly_profile_v1';

/* ── Utilidades compartidas ── */

/** Escapa HTML para usar en atributos onclick */
function escHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Lee el token de Supabase desde localStorage */
function _sbToken() {
  try {
    const stored = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF}-auth-token`) || 'null');
    return stored?.access_token || null;
  } catch {
    return null;
  }
}
