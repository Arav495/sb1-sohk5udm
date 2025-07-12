export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method === "POST") {
      const data = await req.json();
      console.log("Received bill data:", data);

      return new Response(JSON.stringify({ status: "success", data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional: for browser testing
    return new Response(
      JSON.stringify({ status: "ready", message: "Send a POST request to submit bill data." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error receiving bill:", err);
    return new Response(
      JSON.stringify({ status: "error", message: err.message }),
      { status: 500 }
    );
  }
}
