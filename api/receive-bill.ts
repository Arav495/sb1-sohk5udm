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

    // Optional: You can log or store this
    console.log('Received bill:', body);

    return new Response(JSON.stringify({ success: true, data: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Invalid JSON or internal error', detail: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
