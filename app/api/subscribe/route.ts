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
    const isConfigured = ensureKVEnv();
    if (isConfigured) {
      await kv.sadd("meshop:subscribers", normalized);
    } else {
      console.warn(
        "KV environment variables missing (checked KV_REST_API_*, meshop_REDIS_URL, REDIS_URL), simulated subscription for local development:",
        normalized
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/subscribe error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
