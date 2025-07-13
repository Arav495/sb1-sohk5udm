import { supabase } from './supabaseClient';

const fetchBills = async () => {
  try {
    console.log('🔍 Starting to fetch bills from Supabase...');
    console.log('🔧 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('🔧 Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

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

    // ✅ Final and clean items parsing logic
    const parsed = data.map(bill => {
      let itemsParsed = [];

      if (typeof bill.items === 'string') {
        try {
          // Try normal JSON.parse
          itemsParsed = JSON.parse(bill.items);
        } catch (err) {
          try {
            // Fix missing brackets and parse again
            const fixedJson = `[${bill.items.replace(/}\s*,\s*{/g, '},{')}]`;
            itemsParsed = JSON.parse(fixedJson);
            console.warn('⚠️ Fixed invalid JSON by wrapping and cleaning:', bill.items);
          } catch (e) {
            // Total fallback
            itemsParsed = [{ name: bill.items }];
            console.warn('❌ Could not parse items even after fixing. Showing as raw:', bill.items);
          }
        }
      } else if (Array.isArray(bill.items)) {
        itemsParsed = bill.items;
      }

      return {
        ...bill,
        items: itemsParsed,
      };
    });

    return parsed;

  } catch (error) {
    console.error('💥 Unexpected error in fetchBills:', error);
    return [];
  }
};

export default fetchBills;
