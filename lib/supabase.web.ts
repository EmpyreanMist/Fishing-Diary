import { createClient } from "@supabase/supabase-js";
// Om du använder EXPO_PUBLIC_* kan du även läsa via process.env

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

export const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    // Använd standard (localStorage i browsern). Inte AsyncStorage här.
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // web-login via URL
  },
});
