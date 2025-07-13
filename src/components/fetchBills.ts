import { supabase } from './supabaseClient';

const fetchBills = async () => {
  try {
    console.log('🔍 Starting to fetch bills from Supabase...');
    console.log('🔧 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('🔧 Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    // Test the connection first
    const { data: testData, error: testError } = await supabase
      .from('birdy')
      .select('count', { count: 'exact', head: true });
    
    if (testError) {
      console.error('❌ Supabase connection test failed:', testError);
      return [];
    }
    
    console.log('✅ Supabase connection successful');
    
    const { data, error } = await supabase
      .from('birdy')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching bills:', error.message);
      console.error('❌ Full error:', error);
      return [];
    }
    
    console.log('✅ Raw data from Supabase:', data);
    console.log('📊 Number of bills found:', data?.length || 0);
    
    if (data && data.length > 0) {
      console.log('📋 First bill structure:', data[0]);
      console.log('📋 All bill brands:', data.map(bill => bill.brand));
      console.log('📋 Sample bill keys:', Object.keys(data[0]));
    }
    
    return data || [];
  } catch (error) {
    console.error('💥 Unexpected error in fetchBills:', error);
    return [];
  }
};

export default fetchBills;