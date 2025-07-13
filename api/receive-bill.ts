import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;

    if (!data.order_id || !data.amount) {
      return res.status(400).json({ error: 'Missing order_id or amount' });
    }

    const formatted = {
      brand: data.brand,
      store_location: data.store_location,
      order_id: data.order_id,
      amount: Number(data.amount),
      date: new Date(data.date).toISOString().split('T')[0],
      delivery_date: new Date(data.delivery_date).toISOString().split('T')[0],
      payment_method: data.payment_method,
      items: data.items, // expects JSON array
    };

    const { error } = await supabase.from('birdy').insert([formatted]);

    if (error) {
      return res.status(500).json({ error: 'Supabase insert failed', details: error.message });
    }

    return res.status(200).json({ message: 'Bill stored successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Unhandled server error', details: err.message });
  }
}
