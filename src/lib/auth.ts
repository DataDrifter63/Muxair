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
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw redirect({ to: "/admin/login" });
  }
  return { session: data.session };
}
