import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({
      count: 0,
      subscribers: [],
      note: "KV environment variables not configured",
    });
  }

  try {
    const subscribers = await kv.smembers("meshop:subscribers");
    return NextResponse.json({ count: subscribers.length, subscribers });
  } catch (error) {
    console.error("GET /api/subscribers error:", error);
    return NextResponse.json({ error: "Failed to retrieve subscribers" }, { status: 500 });
  }
}
