import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// The site is indexable by default. Private pages (/admin, /thank-you) always send
// noindex. To take the whole site out of Google again (staging / client approval), set
// BLOCK_INDEXING=true (and VITE_BLOCK_INDEXING=true at build time) and restore
// public/robots.txt to `Disallow: /`.
function withRobotsHeader(req: Request, res: Response): Response {
  const path = new URL(req.url).pathname;
  const isPrivate = path.startsWith("/admin") || path.startsWith("/thank-you");
  if (process.env["BLOCK_INDEXING"] !== "true" && !isPrivate) return res;
  const headers = new Headers(res.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

// www.muxair.com and muxair.com both answered with the full site, so crawlers saw every page
// twice. Send www to the main domain with a permanent redirect.
function redirectWwwToApex(req: Request): Response | null {
  const raw = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const host = (raw.split(",")[0] ?? "").trim().toLowerCase();
  if (host !== "www.muxair.com") return null;
  const { pathname, search } = new URL(req.url);
  return Response.redirect(`https://muxair.com${pathname}${search}`, 301);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = redirectWwwToApex(request);
    if (redirect) return redirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const res = await normalizeCatastrophicSsrResponse(response);
      return withRobotsHeader(request, res);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
