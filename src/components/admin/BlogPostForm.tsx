import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import { Loader2, Save } from "lucide-react";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { ImageUploadField } from "./ImageUploadField";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  meta_description: string;
  category: string;
  cover_image: string | null;
  content: string;
  published: boolean;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  meta_description: "",
  category: "",
  cover_image: null,
  content: "",
  published: true,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogPostForm({ existing }: { existing?: BlogPostRow }) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(
    existing
      ? {
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt,
          meta_description: existing.meta_description ?? "",
          category: existing.category,
          cover_image: existing.cover_image,
          content: existing.content,
          published: existing.published,
        }
      : emptyForm,
  );
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // MDEditor touches the DOM directly — only mount it client-side.
  useEffect(() => setMounted(true), []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleTitleChange(title: string) {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      meta_description: form.meta_description || null,
    };

    const { error } = existing
      ? await supabase.from("blog_posts").update(payload).eq("id", existing.id)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin/blog" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Title</label>
        <input
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Slug</label>
        <input
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set("slug", e.target.value);
          }}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
        />
        <p className="mt-1 text-xs text-slate-500">URL: /blog/{form.slug || "..."}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-slate-300">Category</label>
          <input
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="h-4 w-4"
            />
            Published (visible on the site)
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">
          Excerpt <span className="text-slate-500">(short preview text on the blog list)</span>
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">
          Meta Description{" "}
          <span className="text-slate-500">(for Google search results — leave blank to reuse excerpt)</span>
        </label>
        <textarea
          value={form.meta_description}
          onChange={(e) => set("meta_description", e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Cover Image</label>
        <ImageUploadField
          value={form.cover_image}
          onChange={(url) => set("cover_image", url)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">
          Content <span className="text-slate-500">(Markdown — use the toolbar for formatting)</span>
        </label>
        {mounted ? (
          <div data-color-mode="dark">
            <MDEditor
              value={form.content}
              onChange={(v) => set("content", v ?? "")}
              height={420}
              preview="live"
            />
          </div>
        ) : (
          <div className="h-[420px] rounded-lg border border-slate-700 bg-slate-900" />
        )}
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {existing ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
