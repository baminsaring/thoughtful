import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
//import localStorage from 'expo-sqlite/localStorage/install';
import 'expo-sqlite/localStorage/install';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

//console.log(`Url: ${supabaseUrl}, apiKey: ${supabaseAnonKey}`)

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false      
    }
})