// api/receive-bill.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/supabaseClient'; // use shared supabase client

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;
    console.log('Received bill data:', data);

    if (!data.order_id || !data.amount) {
      return res.status(400).json({ error: 'Missing required fields: order_id or amount' });
    }

    // Format values to match Supabase column types
    const formattedData = {
      ...data,
      amount: Number(data.amount), // ensure numeric
      date: new Date(data.date).toISOString().split('T')[0], // YYYY-MM-DD
      delivery_date: new Date(data.delivery_date).toISOString().split('T')[0], // YYYY-MM-DD
      items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items, // ensure JSON object
    };

    const { error } = await supabase.from('birdy').insert([formattedData]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Supabase insert failed', details: error.message });
    }

    return res.status(200).json({ message: 'Bill stored successfully' });
  } catch (err: any) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
