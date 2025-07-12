// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';

// Replace these with your actual project values
const supabaseUrl = 'https://ujbytwqmhwcducxtkmix.supabase.co';
const supabaseKey = 'YOUR_SERVICE_ROLE_KEY'; // from the "API Keys" screen
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
