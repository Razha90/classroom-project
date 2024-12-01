export async function GET() {
  return new Response(
    JSON.stringify({ message: "GET request successful", status: "success" }),
    {
      status: 200, // Status code 200 untuk permintaan sukses
      headers: {
        "Content-Type": "application/json", // Set header response ke JSON
      },
    }
  );
}
