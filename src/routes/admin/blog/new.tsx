import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/blog/new")({
  beforeLoad: requireAuth,
  component: NewBlogPost,
  head: () => ({
    meta: [{ title: "New Blog Post" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function NewBlogPost() {
  return (
    <AdminLayout title="New Blog Post">
      <BlogPostForm />
    </AdminLayout>
  );
}
