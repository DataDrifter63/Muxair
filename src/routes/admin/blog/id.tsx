import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/blog/id")({
  beforeLoad: requireAuth,
  component: EditBlogPost,
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();
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
