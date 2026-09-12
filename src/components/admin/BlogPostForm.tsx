import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Loader2, Save } from "lucide-react";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUploadField } from "./ImageUploadField";
import { MarkdownEditor } from "./MarkdownEditor";

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
  const router = useRouter();
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

    // .select().single() makes a silent failure loud: if Supabase's Row
    // Level Security blocks the write (e.g. a missing INSERT/UPDATE policy),
    // .update()/.insert() alone can report success with zero rows actually
    // changed. Asking for the row back means a blocked write surfaces as a
    // real, visible error instead of quietly doing nothing.
    const { data, error: dbError } = existing
      ? await supabase.from("blog_posts").update(payload).eq("id", existing.id).select().single()
      : await supabase.from("blog_posts").insert(payload).select().single();

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }
    if (!data) {
      setError(
        "The save didn't go through — this usually means a database permission (RLS policy) is blocking it. Check that blog_posts has insert/update policies for authenticated users.",
      );
      return;
    }
    // The /admin/blog list route loads its posts via a route loader, which
    // TanStack Router caches — without invalidating it, a freshly
    // created/edited post wouldn't show up until a hard refresh.
    await router.invalidate();
    navigate({ to: "/admin/blog" });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set("slug", e.target.value);
          }}
          required
        />
        <p className="text-xs text-muted-foreground">URL: /blog/{form.slug || "..."}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2.5 pt-6">
          <Switch
            id="published"
            checked={form.published}
            onCheckedChange={(v) => set("published", v)}
          />
          <Label htmlFor="published" className="cursor-pointer">
            Published (visible on the site)
          </Label>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">
          Excerpt{" "}
          <span className="font-normal text-muted-foreground">
            (short preview text on the blog list)
          </span>
        </Label>
        <Textarea
          id="excerpt"
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="meta_description">
          Meta Description{" "}
          <span className="font-normal text-muted-foreground">
            (for Google search results — leave blank to reuse excerpt)
          </span>
        </Label>
        <Textarea
          id="meta_description"
          value={form.meta_description}
          onChange={(e) => set("meta_description", e.target.value)}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Cover Image</Label>
        <ImageUploadField value={form.cover_image} onChange={(url) => set("cover_image", url)} />
      </div>

      <div className="space-y-1.5">
        <Label>
          Content{" "}
          <span className="font-normal text-muted-foreground">
            (Markdown — use the toolbar for formatting)
          </span>
        </Label>
        <MarkdownEditor value={form.content} onChange={(v) => set("content", v)} />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={saving} className="gap-2">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {existing ? "Save Changes" : "Create Post"}
      </Button>
    </form>
  );
}
