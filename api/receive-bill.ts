import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aolaukhqshjvxtokvlji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbGF1a2hxc2hqdnh0b2t2bGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3ODc2NDksImV4cCI6MjAxNTQ2MzY0OX0.PXCyhUzw_lzLtxRby1Oe62lsDNoFnOaJuOKZVXqBTkI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;

    // ✅ Log incoming data for debugging
    console.log('Received bill data:', data);

    // ✅ Basic validation
    if (!data.order_id || !data.amount) {
      return res.status(400).json({ error: 'Missing required fields: order_id or amount' });
    }

    // ✅ Insert into Supabase
    const { error } = await supabase.from('birdy').insert([data]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Supabase insert failed' });
    }

    return res.status(200).json({ message: 'Bill saved successfully 🎉' });
  } catch (err: any) {
    console.error('Server crash:', err.message);
    return res.status(500).json({ error: 'A server error occurred' });
  }
}
