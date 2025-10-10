// @ts-ignore: no type declarations for this side-effect import
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    storage: AsyncStorage,              // OK på native
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,          // ingen URL-redirect på native
  },
});
