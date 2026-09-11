import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { requireAuth } from "@/lib/auth";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;
    setDeletingId(id);
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    setPosts((p) => p.filter((post) => post.id !== id));
  }

  return (
    <AdminLayout
      title="Blog Posts"
      actions={
        <Button asChild size="sm" className="gap-1.5">
          <Link to="/admin/blog/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      }
    >
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet — create your first one.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-left text-muted-foreground">
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
                <tr key={post.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        post.published
                          ? "rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary"
                          : "rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to="/admin/blog/$id"
                        params={{ id: post.id }}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
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
    </AdminLayout>
  );
}
