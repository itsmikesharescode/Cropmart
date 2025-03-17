import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sxubqviccwgfscizytkv.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4dWJxdmljY3dnZnNjaXp5dGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMTE0NzUsImV4cCI6MjA0MTg4NzQ3NX0.kAdBVxCyvX1ajjfi6n9uJHm4zyDoAdc7dEf2elWLbro';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
