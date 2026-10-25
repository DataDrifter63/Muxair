import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import type { BlogPostRow } from "@/lib/supabase";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/blog/$id")({
  // Admin pages render only in the browser, after the login check, so the server
  // never sends admin screens or data to anyone who is not signed in.
  ssr: false,
  beforeLoad: requireAuth,
  component: EditBlogPost,
  loader: async ({ params }) => {
    const { supabase: db } = await import("@/lib/supabase");
    const { data, error } = await db.from("blog_posts").select("*").eq("id", params.id).single();
    if (error) console.error(error);
    return { post: data as BlogPostRow | null };
  },
  head: () => ({
    meta: [{ title: "Edit Blog Post" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function EditBlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <AdminLayout title="Edit Blog Post">
      {post ? (
        <BlogPostForm existing={post} />
      ) : (
        <p className="text-muted-foreground">Post not found.</p>
      )}
    </AdminLayout>
  );
}
