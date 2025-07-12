import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const bill = req.body;

    if (!bill || Object.keys(bill).length === 0) {
      return res.status(400).json({ error: 'Empty or invalid bill data' });
    }

    console.log('Received bill data:', bill);

    // 🧠 TODO: Save to DB or forward to your billing logic here

    return res.status(200).json({ message: 'Bill received successfully' });
  } catch (error: any) {
    console.error('Error handling bill:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
