export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received bill data:", data);

    return new Response(JSON.stringify({ status: "success", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error receiving bill:", err);
    return new Response(
      JSON.stringify({ status: "error", message: err.message }),
      { status: 500 }
    );
  }
}

// Optional: respond to GET requests for testing in browser
export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ready",
      message: "Send a POST request to submit bill data.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
