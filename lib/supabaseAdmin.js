const { createClient } = require('@supabase/supabase-js');

let supabaseAdmin;

function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin;

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase server environment variables are not configured.');
  }

  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  return supabaseAdmin;
}

module.exports = { getSupabaseAdmin };
