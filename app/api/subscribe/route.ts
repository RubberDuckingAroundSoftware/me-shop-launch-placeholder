import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;

    // Validate
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Normalize
    const normalized = email.toLowerCase().trim();

    // Add to Redis SET (duplicates silently ignored)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      await kv.sadd("meshop:subscribers", normalized);
    } else {
      console.warn(
        "KV_REST_API_URL missing, simulated subscription for local development:",
        normalized
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/subscribe error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
