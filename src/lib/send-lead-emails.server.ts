import { createServerFn } from "@tanstack/react-start";

export type LeadEmailInput = {
  fullName: string;
  email: string;
  phone: string;
  bizName: string;
  serviceArea: string;
  need: string;
  message: string | null;
};

function adminNotificationHtml(data: LeadEmailInput) {
  return `
    <h2>New lead from the website</h2>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Business:</strong> ${data.bizName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Service Area:</strong> ${data.serviceArea}</p>
    <p><strong>Need:</strong> ${data.need}</p>
    ${data.message ? `<p><strong>Notes:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>` : ""}
  `;
}

function submitterThankYouHtml(data: LeadEmailInput) {
  return `
    <p>Hi ${data.fullName},</p>
    <p>Thanks for reaching out to Ductwork Studio! We've got your details and will call you
    within 4 hours (usually much sooner) to find a time for your free 30-minute strategy call.</p>
    <p>In the meantime, feel free to reply to this email if anything urgent comes up.</p>
    <p>— The Ductwork Studio Team</p>
  `;
}

/**
 * Sends both lead-related emails via Resend. Runs server-side only, so the
 * RESEND_API_KEY never reaches the browser bundle. Best-effort: a missing
 * key or a send failure is logged but never blocks the form from succeeding
 * (the lead is already saved in Supabase by the time this runs).
 *
 * Required env vars (set locally in .env and on your host, e.g. Netlify):
 *   RESEND_API_KEY          - from resend.com/api-keys
 *   RESEND_FROM_EMAIL       - e.g. "Ductwork Studio <hello@yourdomain.com>"
 *                             (must be on a domain verified in Resend to
 *                             email real customers — see resend.com/domains)
 *   LEAD_NOTIFICATION_EMAIL - your inbox, where new-lead alerts go
 */
export const sendLeadEmails = createServerFn({ method: "POST" })
  .validator((data: LeadEmailInput) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("[email] RESEND_API_KEY is not set — skipping lead emails.");
      return { sent: false };
    }

    const fromAddress =
      process.env["RESEND_FROM_EMAIL"] ?? "Ductwork Studio <onboarding@resend.dev>";
    const adminEmail = process.env["LEAD_NOTIFICATION_EMAIL"];

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const sends = [
      resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: "Thanks for reaching out — Ductwork Studio",
        html: submitterThankYouHtml(data),
      }),
    ];

    if (adminEmail) {
      sends.push(
        resend.emails.send({
          from: fromAddress,
          to: adminEmail,
          subject: `New lead: ${data.bizName}`,
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
