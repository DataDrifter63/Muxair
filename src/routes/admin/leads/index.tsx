import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Mail, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { requireAuth } from "@/lib/auth";
import { supabase, type LeadRow } from "@/lib/supabase";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/leads/")({
  beforeLoad: requireAuth,
  component: AdminLeads,
  loader: async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    return { leads: (data ?? []) as LeadRow[] };
  },
  head: () => ({
    meta: [{ title: "Leads" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminLeads() {
  const { leads: initialLeads } = Route.useLoaderData();
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [workingId, setWorkingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Move this lead to Trash? You can restore it within 30 days.")) return;
    setWorkingId(id);
    const { error } = await supabase
      .from("leads")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
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
      title="Leads"
      actions={
        <Link
          to="/admin/leads/trash"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Trash
        </Link>
      }
    >
      {leads.length === 0 ? (
        <p className="text-muted-foreground">
          No leads yet — submissions from the /contact form will show up here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-surface/60 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name / Business</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Need</th>
                <th className="px-4 py-3 font-medium">Service Area</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium">{lead.full_name}</p>
                    <p className="text-muted-foreground">{lead.business_name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {lead.email}
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="mt-1 flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lead.need}
                    {lead.message ? (
                      <p className="mt-1 max-w-xs whitespace-pre-line text-xs text-muted-foreground/80">
                        {lead.message}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.service_area}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      disabled={workingId === lead.id}
                      className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
