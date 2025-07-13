// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const {
    brand,
    store_location,
    order_id,
    amount,
    date,
    delivery_date,
    payment_method,
    items,
    email // <-- add this
  } = req.body;

  const { error } = await supabase.from('birdy').insert([
    {
      brand,
      store_location,
      order_id,
      amount,
      date,
      delivery_date,
      payment_method,
      items,
      email // <-- insert it here too
    }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Bill stored successfully' });
}
