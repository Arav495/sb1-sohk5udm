import { supabase } from './supabaseClient';

const fetchBills = async () => {
  console.log('🔍 Starting to fetch bills from Supabase...');
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  
  const { data, error } = await supabase.from('birdy').select('*');
  if (error) {
    console.error('Error fetching bills:', error.message);
    console.error('Full error:', error);
    return [];
  }
  console.log('✅ Raw data from Supabase:', data);
  console.log('📊 Number of bills found:', data?.length || 0);
  
  if (data && data.length > 0) {
    console.log('📋 First bill structure:', data[0]);
    console.log('📋 All bill brands:', data.map(bill => bill.brand));
  }
  
  return data || [];
};

export default fetchBills;
