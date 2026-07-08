import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// Helper to auto-parse meshop_REDIS_URL (or REDIS_URL) into KV_REST_API_* format
function ensureKVEnv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    const rawUrl =
      process.env.meshop_REDIS_URL ||
      process.env.REDIS_URL ||
      process.env.UPSTASH_REDIS_REST_URL ||
      process.env.KV_URL;

    if (rawUrl && (rawUrl.startsWith("redis://") || rawUrl.startsWith("rediss://"))) {
      try {
        const parsed = new URL(rawUrl);
        process.env.KV_REST_API_URL = `https://${parsed.hostname}`;
        process.env.KV_REST_API_TOKEN = parsed.password;
      } catch (e) {
        console.error("Failed to parse Redis URL:", e);
      }
    } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      process.env.KV_REST_API_URL = process.env.UPSTASH_REDIS_REST_URL;
      process.env.KV_REST_API_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
    }
  }
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function GET(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isConfigured = ensureKVEnv();

  if (!isConfigured) {
    return NextResponse.json({
      count: 0,
      subscribers: [],
      note: "KV environment variables not configured (checked KV_REST_API_*, meshop_REDIS_URL, REDIS_URL)",
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
