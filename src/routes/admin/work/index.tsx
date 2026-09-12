import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { requireAuth } from "@/lib/auth";
import { supabase, type WorkItemRow } from "@/lib/supabase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/work/")({
  beforeLoad: requireAuth,
  component: AdminWorkList,
  loader: async () => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    return { items: (data ?? []) as WorkItemRow[] };
  },
  head: () => ({
    meta: [{ title: "Manage Case Studies" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminWorkList() {
  const { items: initialItems } = Route.useLoaderData();
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this case study? This can't be undone.")) return;
    setDeletingId(id);
    const { error } = await supabase.from("case_studies").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    setItems((p) => p.filter((item) => item.id !== id));
    router.invalidate();
  }

  return (
    <AdminLayout
      title="Case Studies"
      actions={
        <Button asChild size="sm" className="gap-1.5">
          <Link to="/admin/work/new">
            <Plus className="h-4 w-4" />
            New Case Study
          </Link>
        </Button>
      }
    >
      {items.length === 0 ? (
        <p className="text-muted-foreground">No case studies yet — create your first one.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.location}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.published
                          ? "rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary"
                          : "rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground"
                      }
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to="/admin/work/$id"
                        params={{ id: item.id }}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
