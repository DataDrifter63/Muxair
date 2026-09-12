import { createServerFn } from "@tanstack/react-start";
import { createSign } from "node:crypto";
import type { LeadEmailInput } from "./send-lead-emails.server";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Exchanges a Google service-account key for a short-lived access token,
 * signing the JWT ourselves with Node's built-in `crypto` — avoids pulling
 * in the much heavier `googleapis`/`google-auth-library` packages just for
 * one endpoint.
 */
async function getAccessToken(clientEmail: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = base64url(
    createSign("RSA-SHA256").update(`${header}.${claims}`).sign(privateKey),
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

/**
 * Appends one row per lead to a Google Sheet — a permanent, off-Supabase
 * backup that's never touched by Trash/delete actions in the dashboard.
 * Best-effort: missing config or a failed call is logged, never blocks the
 * form (the lead is already saved in Supabase by the time this runs).
 *
 * One-time setup (all free):
 *   1. console.cloud.google.com → new project → enable "Google Sheets API".
 *   2. IAM & Admin → Service Accounts → create one → Keys → Add key (JSON).
 *      Download the JSON file.
 *   3. Create a Google Sheet. Share it (Editor access) with the service
 *      account's email (looks like ...@...iam.gserviceaccount.com).
 *   4. Set these env vars (locally in .env, and on your host e.g. Netlify):
 *        GOOGLE_SHEETS_SPREADSHEET_ID   - from the sheet's URL
 *        GOOGLE_SERVICE_ACCOUNT_EMAIL   - "client_email" from the JSON file
 *        GOOGLE_SERVICE_ACCOUNT_KEY     - "private_key" from the JSON file,
 *                                         pasted as-is (with \n escapes)
 */
export const syncLeadToSheet = createServerFn({ method: "POST" })
  .validator((data: LeadEmailInput) => data)
  .handler(async ({ data }) => {
    const spreadsheetId = process.env["GOOGLE_SHEETS_SPREADSHEET_ID"];
    const clientEmail = process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"];
    const rawKey = process.env["GOOGLE_SERVICE_ACCOUNT_KEY"];

    if (!spreadsheetId || !clientEmail || !rawKey) {
      console.warn("[sheets] Google Sheets backup env vars are not set — skipping sync.");
      return { synced: false };
    }

    try {
      const privateKey = rawKey.replace(/\\n/g, "\n");
      const accessToken = await getAccessToken(clientEmail, privateKey);

      const row = [
        new Date().toISOString(),
        data.fullName,
        data.bizName,
        data.email,
        data.phone,
        data.serviceArea,
        data.need,
        data.message ?? "",
      ];

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:H:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values: [row] }),
        },
      );

      if (!res.ok) {
        throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
      }
      return { synced: true };
    } catch (err) {
      console.error("[sheets] failed to sync lead:", err);
      return { synced: false };
    }
  });
