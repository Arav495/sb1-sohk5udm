// api/receive-bill.ts

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST requests allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();

    console.log('✅ Bill received:', body);

    // Example: You can later save this to a database or process it further here.

    return new Response(JSON.stringify({ success: true, received: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error parsing request:', err);
    return new Response(JSON.stringify({ error: 'Failed to parse bill data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
