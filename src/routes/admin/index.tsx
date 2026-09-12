import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, MessageSquare, Newspaper } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAuth,
  component: AdminHome,
  loader: async () => {
    const [posts, work, leads] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("case_studies").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
    ]).then((results) => results.map((r) => (r.error ? 0 : (r.count ?? 0))));
    return { postCount: posts, workCount: work, leadCount: leads };
  },
  head: () => ({
    meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const cards = [
  { label: "Blog Posts", icon: Newspaper, to: "/admin/blog" as const, key: "postCount" as const },
  { label: "Case Studies", icon: Briefcase, to: "/admin/work" as const, key: "workCount" as const },
  { label: "Leads", icon: MessageSquare, to: "/admin/leads" as const, key: "leadCount" as const },
];

function AdminHome() {
  const { postCount, workCount, leadCount } = Route.useLoaderData();
  const counts = { postCount, workCount, leadCount };

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-primary/30"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold">{counts[c.key]}</p>
              <p className="text-sm text-muted-foreground">{c.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
