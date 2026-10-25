import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import type { WorkItemRow } from "@/lib/supabase";
import { WorkItemForm } from "@/components/admin/WorkItemForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/work/$id")({
  // Admin pages render only in the browser, after the login check, so the server
  // never sends admin screens or data to anyone who is not signed in.
  ssr: false,
  beforeLoad: requireAuth,
  component: EditWorkItem,
  loader: async ({ params }) => {
    const { supabase: db } = await import("@/lib/supabase");
    const { data, error } = await db.from("case_studies").select("*").eq("id", params.id).single();
    if (error) console.error(error);
    return { item: data as WorkItemRow | null };
  },
  head: () => ({
    meta: [{ title: "Edit Case Study" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function EditWorkItem() {
  const { item } = Route.useLoaderData();

  return (
    <AdminLayout title="Edit Case Study">
      {item ? (
        <WorkItemForm existing={item} />
      ) : (
        <p className="text-muted-foreground">Case study not found.</p>
      )}
    </AdminLayout>
  );
}
