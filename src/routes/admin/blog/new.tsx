import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const Route = createFileRoute("/admin/blog/new")({
  beforeLoad: requireAuth,
  component: NewBlogPost,
  head: () => ({
    meta: [{ title: "New Blog Post" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function NewBlogPost() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
        <Link to="/admin/blog" className="text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">New Blog Post</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">
        <BlogPostForm />
      </main>
    </div>
  );
}
