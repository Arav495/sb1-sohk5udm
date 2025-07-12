// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';

// Replace these with your actual project values
const supabaseUrl = 'https://ujbytwqmhwcducxtkmix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnl0d3FtaHdjZHVjeHRrbWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMzNjI3MiwiZXhwIjoyMDY3OTEyMjcyfQ.tt7WLRNSsmTz39XaCG6g8N_bBECrKCeAWuYFnkGkHIU'; // from the "API Keys" screen
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Insert into the Supabase table
    const { error } = await supabase.from('birdy').insert([
      {
        id: body.id,
        brand: body.brand,
        store_location: body.store_location,
        order_id: body.order_id,
        amount: body.amount,
        date: body.date,
        delivery_date: body.delivery_date,
        payment_method: body.payment_method,
        items: body.items,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error('API handler error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
}
