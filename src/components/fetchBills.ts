// src/utils/fetchBills.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchBills() {
  const { data, error } = await supabase.from('birdy').select('*');
  if (error) {
    console.error('Error fetching bills:', error);
    return [];
  }
  return data;
}
