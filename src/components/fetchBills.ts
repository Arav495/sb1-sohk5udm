import { supabase } from './supabaseClient';

const fetchBills = async () => {
  try {
    console.log('🔍 Starting to fetch bills from Supabase...');
    console.log('🔧 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('🔧 Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

    // Confirm credentials first
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('❌ Missing Supabase credentials in .env file');
      return [];
    }

    const { data, error } = await supabase
      .from('birdy')
      .select(`
        id,
        brand,
        amount,
        date,
        store_location,
        order_id,
        payment_method,
        delivery_date,
        created_at,
        items
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching bills from Supabase:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ Supabase returned 0 rows');
    } else {
      console.log('✅ Supabase returned data:', data);
      console.log('📊 Total bills:', data.length);
    }

    // Optional: parse items JSON string if needed
    const parsed = data.map(bill => ({
      ...bill,
      items: typeof bill.items === 'string' ? JSON.parse(bill.items) : bill.items
    }));

    return parsed;
  } catch (error) {
    console.error('💥 Unexpected error in fetchBills:', error);
    return [];
  }
};

export default fetchBills;
