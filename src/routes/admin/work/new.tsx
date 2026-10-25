import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { WorkItemForm } from "@/components/admin/WorkItemForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/work/new")({
  // Admin pages render only in the browser, after the login check, so the server
  // never sends admin screens or data to anyone who is not signed in.
  ssr: false,
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
