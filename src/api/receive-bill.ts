// src/api/receive-bill.ts
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received bill data:", data);

    return new Response(JSON.stringify({ status: "success", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error receiving bill:", err);
    return new Response(
      JSON.stringify({ status: "error", message: err.message }),
      { status: 500 }
    );
  }
}
