import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { requireAuth } from "@/lib/auth";
import { supabase, type LeadRow } from "@/lib/supabase";
import { AdminLayout } from "@/components/admin/AdminLayout";

const RETENTION_DAYS = 30;

export const Route = createFileRoute("/admin/leads/trash")({
  beforeLoad: requireAuth,
  component: LeadsTrash,
  loader: async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });
    if (error) console.error(error);
    return { leads: (data ?? []) as LeadRow[] };
  },
  head: () => ({
    meta: [{ title: "Leads — Trash" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function daysLeft(deletedAt: string) {
  const elapsed = (Date.now() - new Date(deletedAt).getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(RETENTION_DAYS - elapsed));
}

function LeadsTrash() {
  const { leads: initialLeads } = Route.useLoaderData();
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [workingId, setWorkingId] = useState<string | null>(null);

  async function handleRestore(id: string) {
    setWorkingId(id);
    const { error } = await supabase.from("leads").update({ deleted_at: null }).eq("id", id);
    setWorkingId(null);
    if (error) {
      alert(`Failed to restore: ${error.message}`);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    router.invalidate();
  }

  async function handleDeleteForever(id: string) {
    if (!confirm("Permanently delete this lead? This cannot be undone.")) return;
    setWorkingId(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);
    setWorkingId(null);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    router.invalidate();
  }

  return (
    <AdminLayout
      title="Trash"
      actions={
        <Link
          to="/admin/leads"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Leads
        </Link>
      }
    >
      <p className="mb-4 text-sm text-muted-foreground">
        Deleted leads stay here for {RETENTION_DAYS} days before they're gone for good.
      </p>

      {leads.length === 0 ? (
        <p className="text-muted-foreground">Trash is empty.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-surface/60 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name / Business</th>
                <th className="px-4 py-3 font-medium">Deleted</th>
                <th className="px-4 py-3 font-medium">Days Left</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const left = daysLeft(lead.deleted_at as string);
                return (
                  <tr key={lead.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <p className="font-medium">{lead.full_name}</p>
                      <p className="text-muted-foreground">{lead.business_name}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(lead.deleted_at as string).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          left <= 5
                            ? "rounded-full bg-destructive/15 px-2 py-0.5 text-xs text-destructive"
                            : "rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground"
                        }
                      >
                        {left} day{left === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleRestore(lead.id)}
                          disabled={workingId === lead.id}
                          className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteForever(lead.id)}
                          disabled={workingId === lead.id}
                          className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
