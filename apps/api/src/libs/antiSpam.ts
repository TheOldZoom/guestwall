const URL_REGEX = /https?:\/\/\S+|www\.\S+/gi;

const REPETITION_REGEX = /(.)\1{9,}/;

function countLinks(text: string): number {
  return (text.match(URL_REGEX) || []).length;
}

function hasExcessiveRepetition(text: string): boolean {
  return REPETITION_REGEX.test(text);
}

function isMostlyUppercase(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, "");

  if (letters.length < 12) {
    return false;
  }

  const upper = letters.replace(/[^A-Z]/g, "");

  return upper.length / letters.length > 0.8;
}

export function looksLikeSpam(text: string): boolean {
  return (
    countLinks(text) >= 3 ||
    hasExcessiveRepetition(text) ||
    isMostlyUppercase(text)
  );
}

export function isHoneypotFilled(value?: string): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;
const recentSubmissions = new Map<string, number>();

const CLEANUP_INTERVAL_MS = 60_000;
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, expiresAt] of recentSubmissions) {
    if (expiresAt <= now) {
      recentSubmissions.delete(key);
    }
  }
}, CLEANUP_INTERVAL_MS);
cleanupTimer.unref?.();

export function isDuplicateSubmission(ip: string, payload: string): boolean {
  const key = `${ip}:${payload.trim().toLowerCase()}`;
  const now = Date.now();
  const expiresAt = recentSubmissions.get(key);

  if (expiresAt && expiresAt > now) {
    return true;
  }

  recentSubmissions.set(key, now + DUPLICATE_WINDOW_MS);
  return false;
}
