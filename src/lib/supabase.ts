/**
 * Supabase Client Configuration
 * Description: Initializes and exports the Supabase client for database operations.
 * 
 * Technical choices:
 * - Environment variables: For secure configuration management
 * - URL validation: To ensure valid Supabase URL format
 * - Error handling: Clear error messages for missing/invalid configuration
 */
import { createClient } from '@supabase/supabase-js'; // Supabase client library

// Get configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required configuration
if (!supabaseUrl || supabaseUrl === 'votre_url_supabase') {
  throw new Error('Missing or invalid VITE_SUPABASE_URL. Please set it in your .env file with your Supabase project URL');
}

if (!supabaseAnonKey || supabaseAnonKey === 'votre_clé_anon_supabase') {
  throw new Error('Missing or invalid VITE_SUPABASE_ANON_KEY. Please set it in your .env file with your Supabase anon key');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error('Invalid VITE_SUPABASE_URL format. Please provide a valid URL');
}

// Initialize and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);