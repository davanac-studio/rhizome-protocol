// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://vorbdsrwoirazuumvwjf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcmJkc3J3b2lyYXp1dW12d2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzk3NTcsImV4cCI6MjA0Njc1NTc1N30.G9lSiW_zmxWzYC3lOy2DifyGdS85sHMwIckyoZ9lZh0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);