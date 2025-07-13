// Step 2: Fix the ES Module error in receive-bill.ts

// ✅ Replace the contents of your existing receive-bill.ts file with this:

import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Use environment variables
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;
    console.log('[INFO] Raw data received:', data);

    if (!data.order_id || !data.amount) {
      return res.status(400).json({ error: 'Missing required fields: order_id or amount' });
    }

    if (!Array.isArray(data.items)) {
      return res.status(400).json({ error: 'Items field must be a valid array' });
    }

    const formatted = {
      brand: data.brand || '',
      store_location: data.store_location || '',
      order_id: data.order_id,
      amount: Number(data.amount),
      date: new Date(data.date).toISOString().split('T')[0],
      delivery_date: new Date(data.delivery_date).toISOString().split('T')[0],
      payment_method: data.payment_method || '',
      items: data.items,
    };

    console.log('[DEBUG] Formatted data before insert:', formatted);

    const { error } = await supabase.from('birdy').insert([formatted]);

    if (error) {
      console.error('[ERROR] Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Supabase insert failed', details: error.message });
    }

    console.log('[SUCCESS] Bill inserted successfully');
    return res.status(200).json({ message: 'Bill stored successfully' });

  } catch (err: any) {
    console.error('[CRITICAL] Unhandled error:', err.message);
    return res.status(500).json({ error: 'Unhandled server error', details: err.message });
  }
}
