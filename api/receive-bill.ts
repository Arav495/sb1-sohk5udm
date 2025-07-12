// /api/receive-bill.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    console.log("✅ Received bill data:", data);

    return res.status(200).json({ status: "success", data });
  } catch (err: any) {
    console.error("❌ Error receiving bill:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
