import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, LogOut, MessageSquare, Newspaper } from "lucide-react";
import { requireAuth, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAuth,
  component: AdminHome,
  loader: async () => {
    const [posts, leads] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      // These two tables may not exist yet — fail quietly until they're created.
      supabase.from("leads").select("id", { count: "exact", head: true }),
    ]).then((results) =>
      results.map((r) => (r.error ? 0 : (r.count ?? 0))),
    );
    return { postCount: posts, leadCount: leads };
  },
  head: () => ({
    meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const cards = [
  { label: "Blog Posts", icon: Newspaper, to: "/admin/blog" as const, key: "postCount" as const },
  { label: "Leads", icon: MessageSquare, to: "/admin/leads" as const, key: "leadCount" as const },
];

function AdminHome() {
  const { postCount, leadCount } = Route.useLoaderData();
  const counts = { postCount, leadCount };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <h1 className="text-lg font-semibold">Ductwork Studio — Admin</h1>
        <button
          onClick={() => signOut().then(() => window.location.assign("/admin/login"))}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-slate-700"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800">
                <c.icon className="h-5 w-5 text-slate-300" />
              </span>
              <div>
                <p className="text-2xl font-semibold">{counts[c.key]}</p>
                <p className="text-sm text-slate-400">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Case studies manager and the leads/case_studies tables are next — see the plan
          in ADMIN-DASHBOARD-PROMPT.md.
        </p>
      </main>
    </div>
  );
}
