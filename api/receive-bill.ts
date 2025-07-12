// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';

// ✅ Your real Supabase URL & anon key
const supabaseUrl = 'https://ujbytwqmhwcducxtkmix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // 👈 use full valid anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
      });
    }

    const body = await req.json();

    // 👇 Log the incoming data to debug
    console.log('Received data:', body);

    // Optional validation: ensure required fields exist
    if (!body.order_id || !body.amount || !body.brand) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
      });
    }

    const { error } = await supabase.from('birdy').insert([body]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ message: 'Insert failed', error }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (error: any) {
    console.error('Unexpected server error:', error.message);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message }),
      { status: 500 }
    );
  }
}
