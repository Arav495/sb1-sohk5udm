// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ujbytwqmhwcducxtkmix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZ...'
);

export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    // Required fields check (optional but helpful)
    if (!body.order_id || !body.amount) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const { error } = await supabase.from('birdy').insert([body]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ message: 'Insert failed', error }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });

  } catch (error: any) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
    });
  }
}
