// Central place to hook up client-side error reporting (e.g. Sentry, Bugsnag).
// Currently logs to the console; wire up a real provider here when ready.

export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  console.error("[client error]", message, {
    route: window.location.pathname,
    ...context,
  });
}
