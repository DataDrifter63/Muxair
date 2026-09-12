import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { WorkItemForm } from "@/components/admin/WorkItemForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/work/new")({
  beforeLoad: requireAuth,
  component: NewWorkItem,
  head: () => ({
    meta: [{ title: "New Case Study" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function NewWorkItem() {
  return (
    <AdminLayout title="New Case Study">
      <WorkItemForm />
    </AdminLayout>
  );
}
