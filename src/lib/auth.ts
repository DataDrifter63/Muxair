import { redirect } from "@tanstack/react-router";
import { supabase } from "./supabase";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

/**
 * Call this from a route's `beforeLoad`. Redirects to /admin/login if
 * there's no active session — use on every protected /admin/* route.
 *
 *   export const Route = createFileRoute("/admin/")({
 *     beforeLoad: requireAuth,
 *     component: AdminHome,
 *   });
 */
export async function requireAuth() {
  // beforeLoad runs on the server too (SSR / hard refresh). The server has
  // no access to the browser's localStorage, so supabase.auth.getSession()
  // always comes back empty there — even when the browser genuinely has a
  // valid session — which was bouncing every refresh to /admin/login.
  // Only enforce the redirect client-side; the client immediately
  // re-validates against the real session on hydration.
  if (typeof window === "undefined") return {};

  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw redirect({ to: "/admin/login" });
  }
  return { session: data.session };
}
