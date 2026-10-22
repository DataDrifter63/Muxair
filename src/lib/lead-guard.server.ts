import { z } from "zod";
import type { LeadEmailInput } from "./send-lead-emails.server";

/**
 * Spam / abuse protection for the lead server functions (emails + Google Sheet).
 * Server-side only. Checks, in order:
 *   1. honeypot field must be empty (real people never see or fill it)
 *   2. the form must have been open for a few seconds (bots submit instantly)
 *   3. strict validation + length limits on every field
 *   4. per-IP rate limit (in memory; resets when the server restarts)
 */

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  bizName: z.string().trim().min(2).max(150),
  serviceArea: z.string().trim().min(2).max(150),
  need: z.string().trim().min(1).max(60),
  message: z.string().trim().max(3000).nullable(),
});

const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

async function clientIp(): Promise<string> {
  try {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const direct = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-real-ip");
    if (direct) return direct.trim();
    const forwarded = getRequestHeader("x-forwarded-for");
    const parts = forwarded
      ?.split(",")
      .map((p: string) => p.trim())
      .filter(Boolean);
    return parts && parts.length ? (parts[parts.length - 1] as string) : "unknown";
  } catch {
    return "unknown";
  }
}

export type LeadGuardResult = { ok: true; lead: LeadEmailInput } | { ok: false; reason: string };

export async function guardLead(raw: LeadEmailInput, bucket: string): Promise<LeadGuardResult> {
  if (typeof raw?.hp === "string" && raw.hp.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }
  if (typeof raw?.elapsedMs !== "number" || raw.elapsedMs < MIN_FILL_MS) {
    return { ok: false, reason: "too-fast" };
  }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const ip = await clientIp();
  if (ip !== "unknown" && isRateLimited(`${bucket}:${ip}`)) {
    return { ok: false, reason: "rate-limited" };
  }

  const d = parsed.data;
  return {
    ok: true,
    lead: {
      fullName: d.fullName,
      email: d.email,
      phone: d.phone,
      bizName: d.bizName,
      serviceArea: d.serviceArea,
      need: d.need,
      message: d.message,
    },
  };
}
