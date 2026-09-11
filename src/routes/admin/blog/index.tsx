import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { useState } from "react";

export const Route = createFileRoute("/admin/blog/")({
  beforeLoad: requireAuth,
  component: AdminBlogList,
  loader: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    return { posts: (data ?? []) as BlogPostRow[] };
  },
  head: () => ({
    meta: [{ title: "Manage Blog Posts" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminBlogList() {
  const { posts: initialPosts } = Route.useLoaderData();
  const [posts, setPosts] = useState(initialPosts);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    setPosts((p) => p.filter((post) => post.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-semibold">Blog Posts</h1>
        </div>
        <Link
          to="/admin/blog/new"
          className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {posts.length === 0 ? (
          <p className="text-slate-500">No posts yet — create your first one.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-left text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-slate-800">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3 text-slate-400">{post.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          post.published
                            ? "bg-green-500/15 text-green-400"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(post.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to="/admin/blog/$id"
                          params={{ id: post.id }}
                          className="text-slate-400 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
