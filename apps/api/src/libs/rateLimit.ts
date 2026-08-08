import { status } from "elysia";
import { getClientIp } from "./net";

type RateLimitOptions = {
  windowMs: number;
  max: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const CLEANUP_INTERVAL_MS = 60_000;
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}, CLEANUP_INTERVAL_MS);
cleanupTimer.unref?.();

function consume(key: string, options: RateLimitOptions) {
  const now = Date.now();

  let bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + options.windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  if (bucket.count > options.max) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);

    return status(429, {
      error: "Too many requests, please try again later",
      retryAfter,
    });
  }

  return undefined;
}

export function rateLimit(name: string, options: RateLimitOptions) {
  return ({ request }: { request: Request }) => {
    const ip = getClientIp(request);
    return consume(`${name}:${ip}`, options);
  };
}

export function rateLimitByKey(
  name: string,
  key: string,
  options: RateLimitOptions,
) {
  return consume(`${name}:${key}`, options);
}
