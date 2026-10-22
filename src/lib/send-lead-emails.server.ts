import { createServerFn } from "@tanstack/react-start";
import { guardLead } from "./lead-guard.server";

export type LeadEmailInput = {
  fullName: string;
  email: string;
  phone: string;
  bizName: string;
  serviceArea: string;
  need: string;
  message: string | null;
  // Spam-protection fields (checked server-side by lead-guard, never stored).
  hp?: string;
  elapsedMs?: number;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function adminNotificationHtml(data: LeadEmailInput) {
  return `
    <h2>New lead from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
    <p><strong>Business:</strong> ${escapeHtml(data.bizName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Service Area:</strong> ${escapeHtml(data.serviceArea)}</p>
    <p><strong>Need:</strong> ${escapeHtml(data.need)}</p>
    ${data.message ? `<p><strong>Notes:</strong><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
  `;
}

function submitterThankYouHtml(data: LeadEmailInput) {
  return `
    <p>Hi ${escapeHtml(data.fullName)},</p>
    <p>Thanks for reaching out to Muxair! We've got your details and will call you
    within 4 hours (usually much sooner) to find a time for your free 30-minute strategy call.</p>
    <p>In the meantime, feel free to reply to this email if anything urgent comes up.</p>
    <p>— The Muxair Team</p>
  `;
}

/**
 * Sends both lead-related emails via Resend. Runs server-side only, so the
 * RESEND_API_KEY never reaches the browser bundle. Best-effort: a missing
 * key or a send failure is logged but never blocks the form from succeeding
 * (the lead is already saved in Supabase by the time this runs).
 *
 * Spam protection: every call goes through guardLead() (honeypot, minimum
 * fill time, validation, per-IP rate limit) so this can't be abused to send
 * emails to arbitrary addresses.
 *
 * Required env vars (set locally in .env and on your host, e.g. Netlify):
 *   RESEND_API_KEY          - from resend.com/api-keys
 *   RESEND_FROM_EMAIL       - e.g. "Muxair <digitalmuxair@gmail.com>"
 *                             (must be on a domain verified in Resend to
 *                             email real customers — see resend.com/domains)
 *   LEAD_NOTIFICATION_EMAIL - your inbox, where new-lead alerts go
 */
export const sendLeadEmails = createServerFn({ method: "POST" })
  .validator((data: LeadEmailInput) => data)
  .handler(async ({ data: input }) => {
    const guard = await guardLead(input, "emails");
    if (!guard.ok) {
      console.warn(`[email] blocked lead submission (${guard.reason}).`);
      return { sent: false };
    }
    const data = guard.lead;

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("[email] RESEND_API_KEY is not set — skipping lead emails.");
      return { sent: false };
    }

    const fromAddress = process.env["RESEND_FROM_EMAIL"] ?? "Muxair <onboarding@resend.dev>";
    const adminEmail = process.env["LEAD_NOTIFICATION_EMAIL"];

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const sends = [
      resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: "Thanks for reaching out — Muxair",
        html: submitterThankYouHtml(data),
      }),
    ];

    if (adminEmail) {
      sends.push(
        resend.emails.send({
          from: fromAddress,
          to: adminEmail,
          subject: `New lead: ${data.bizName.replace(/[\r\n]+/g, " ")}`,
          html: adminNotificationHtml(data),
        }),
      );
    } else {
      console.warn("[email] LEAD_NOTIFICATION_EMAIL is not set — skipping admin alert.");
    }

    const results = await Promise.allSettled(sends);
    for (const r of results) {
      if (r.status === "rejected") console.error("[email] send failed:", r.reason);
    }

    return { sent: true };
  });
