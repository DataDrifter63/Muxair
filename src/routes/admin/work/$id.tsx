import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import type { WorkItemRow } from "@/lib/supabase";
import { WorkItemForm } from "@/components/admin/WorkItemForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/work/$id")({
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
