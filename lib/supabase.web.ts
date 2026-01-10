import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
