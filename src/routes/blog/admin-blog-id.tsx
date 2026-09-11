import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const Route = createFileRoute("/blog/admin-blog-id")({
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
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
        <Link to="/admin/blog" className="text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">Edit Blog Post</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">
        {post ? <BlogPostForm existing={post} /> : <p className="text-slate-400">Post not found.</p>}
      </main>
    </div>
  );
}
