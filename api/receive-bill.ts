// api/receive-bill.ts

import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(
  'https://ujbytwqmhwcducxtkmix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnl0d3FtaHdjZHVjeHRrbWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMzNjI3MiwiZXhwIjoyMDY3OTEyMjcyfQ.tt7WLRNSsmTz39XaCG6g8N_bBECrKCeAWuYFnkGkHIU'
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const data = req.body;

    const { error } = await supabase.from('birdy').insert([data]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'Insert failed', error });
    }

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'Unexpected error', err });
  }
}

