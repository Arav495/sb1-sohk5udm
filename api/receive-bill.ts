import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    const bill = req.body;

    if (!bill || typeof bill !== 'object') {
      return res.status(400).json({ error: 'Invalid or empty bill data' });
    }

    console.log('✅ Bill received:', bill);

    return res.status(200).json({ success: true, message: 'Bill received by Birdy 🎉' });
  } catch (err: any) {
    console.error('❌ Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
