import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Loader2, Save } from "lucide-react";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadField } from "./ImageUploadField";
import { MarkdownEditor } from "./MarkdownEditor";

type RelatedService = BlogPostRow["related_service"];

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  meta_description: string;
  category: string;
  cover_image: string | null;
  content: string;
  related_service: RelatedService;
  cta_badge_label: string;
  cta_title: string;
  cta_description: string;
  cta_button_label: string;
  cta_button_href: string;
  cta_footnote: string;
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
  related_service: null,
  cta_badge_label: "",
  cta_title: "",
  cta_description: "",
  cta_button_label: "",
  cta_button_href: "",
  cta_footnote: "",
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
          related_service: existing.related_service,
          cta_badge_label: existing.cta_badge_label ?? "",
          cta_title: existing.cta_title ?? "",
          cta_description: existing.cta_description ?? "",
          cta_button_label: existing.cta_button_label ?? "",
          cta_button_href: existing.cta_button_href ?? "",
          cta_footnote: existing.cta_footnote ?? "",
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
      cta_badge_label: form.cta_badge_label || null,
      cta_title: form.cta_title || null,
      cta_description: form.cta_description || null,
      cta_button_label: form.cta_button_label || null,
      cta_button_href: form.cta_button_href || null,
      cta_footnote: form.cta_footnote || null,
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
        <Label>
          Related Service{" "}
          <span className="font-normal text-muted-foreground">
            (shown as a link at the end of the post)
          </span>
        </Label>
        <Select
          value={form.related_service ?? "none"}
          onValueChange={(v) => set("related_service", v === "none" ? null : (v as RelatedService))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a service..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Auto-detect from category</SelectItem>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <div className="rounded-xl border border-border p-5">
        <p className="font-display text-base text-foreground">Final CTA (optional)</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The orange card at the bottom of every post, before the footer. Leave any field blank to
          use the site's default copy — you don't need to fill in all of them together.
        </p>

        <div className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cta_badge_label">Badge label</Label>
              <Input
                id="cta_badge_label"
                placeholder="Free 30-minute call"
                value={form.cta_badge_label}
                onChange={(e) => set("cta_badge_label", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cta_button_label">Button text</Label>
              <Input
                id="cta_button_label"
                placeholder="Get a Free Strategy Call"
                value={form.cta_button_label}
                onChange={(e) => set("cta_button_label", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cta_title">Heading</Label>
            <Input
              id="cta_title"
              placeholder="Ready to Get More Booked Jobs?"
              value={form.cta_title}
              onChange={(e) => set("cta_title", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cta_description">Description</Label>
            <Textarea
              id="cta_description"
              rows={2}
              value={form.cta_description}
              onChange={(e) => set("cta_description", e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cta_button_href">Button link</Label>
              <Input
                id="cta_button_href"
                placeholder="/contact"
                value={form.cta_button_href}
                onChange={(e) => set("cta_button_href", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cta_footnote">Footnote</Label>
              <Input
                id="cta_footnote"
                placeholder="We reply within 4 hours · No obligation"
                value={form.cta_footnote}
                onChange={(e) => set("cta_footnote", e.target.value)}
              />
            </div>
          </div>
        </div>
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
