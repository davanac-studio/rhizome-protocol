import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'votre_url_supabase') {
  throw new Error('Missing or invalid VITE_SUPABASE_URL. Please set it in your .env file with your Supabase project URL');
}

if (!supabaseAnonKey || supabaseAnonKey === 'votre_clé_anon_supabase') {
  throw new Error('Missing or invalid VITE_SUPABASE_ANON_KEY. Please set it in your .env file with your Supabase anon key');
}

try {
  new URL(supabaseUrl); // Validate URL format
} catch (error) {
  throw new Error('Invalid VITE_SUPABASE_URL format. Please provide a valid URL');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);