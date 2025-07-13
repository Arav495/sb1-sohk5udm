// src/components/fetchBills.ts
import { supabase } from './supabaseClient';

const fetchBills = async () => {
  const { data, error } = await supabase.from('birdy').select('*');
  if (error) {
    console.error('Error fetching bills:', error.message);
    return [];
  }
  return data || [];
};

export default fetchBills;
