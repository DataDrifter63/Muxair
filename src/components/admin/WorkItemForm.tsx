import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { supabase, type WorkItemRow } from "@/lib/supabase";
import { workServiceLabels, type WorkService } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadField } from "./ImageUploadField";

type Metric = { label: string; value: string };

type FormState = {
  name: string;
  slug: string;
  tone: "cool" | "heat";
  location: string;
  services: WorkService[];
  badge: string;
  category: string;
  result: string;
  summary: string;
  cover_image: string | null;
  metrics: Metric[];
  challenge: string;
  approach: string[];
  outcome: string;
  published: boolean;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  tone: "cool",
  location: "",
  services: [],
  badge: "",
  category: "",
  result: "",
  summary: "",
  cover_image: null,
  metrics: [],
  challenge: "",
  approach: [],
  outcome: "",
  published: true,
};

const allServices = Object.keys(workServiceLabels) as WorkService[];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function WorkItemForm({ existing }: { existing?: WorkItemRow }) {
  const navigate = useNavigate();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    existing
      ? {
          name: existing.name,
          slug: existing.slug,
          tone: existing.tone,
          location: existing.location,
          services: existing.services,
          badge: existing.badge,
          category: existing.category ?? "",
          result: existing.result ?? "",
          summary: existing.summary ?? "",
          cover_image: existing.cover_image,
          metrics: existing.metrics ?? [],
          challenge: existing.challenge ?? "",
          approach: existing.approach ?? [],
          outcome: existing.outcome ?? "",
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

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugTouched) set("slug", slugify(name));
  }

  function toggleService(service: WorkService, checked: boolean) {
    set(
      "services",
      checked ? [...form.services, service] : form.services.filter((s) => s !== service),
    );
  }

  function updateMetric(index: number, field: keyof Metric, value: string) {
    const next = form.metrics.map((m, i) =>
      i === index ? { ...m, [field]: value } : m,
    ) as Metric[];
    set("metrics", next);
  }

  function updateApproach(index: number, value: string) {
    const next = [...form.approach];
    next[index] = value;
    set("approach", next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      category: form.category || null,
      result: form.result || null,
      summary: form.summary || null,
      challenge: form.challenge || null,
      outcome: form.outcome || null,
      metrics: form.metrics.filter((m) => m.label.trim() || m.value.trim()),
      approach: form.approach.filter((step) => step.trim()),
    };

    const { data, error: dbError } = existing
      ? await supabase.from("case_studies").update(payload).eq("id", existing.id).select().single()
      : await supabase.from("case_studies").insert(payload).select().single();

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }
    if (!data) {
      setError(
        "The save didn't go through — this usually means a database permission (RLS policy) is blocking it. Check that case_studies has insert/update policies for authenticated users.",
      );
      return;
    }

    await router.invalidate();
    navigate({ to: "/admin/work" });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="name">Client / Business Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
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
        <p className="text-xs text-muted-foreground">URL: /work/{form.slug || "..."}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tone">Tone</Label>
          <Select value={form.tone} onValueChange={(v) => set("tone", v as "cool" | "heat")}>
            <SelectTrigger id="tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cool">Cool (cooling / AC)</SelectItem>
              <SelectItem value="heat">Heat (heating)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="badge">Badge</Label>
        <Input
          id="badge"
          value={form.badge}
          onChange={(e) => set("badge", e.target.value)}
          placeholder="e.g. 3x more booked jobs"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Services Delivered</Label>
        <div className="flex flex-wrap gap-4">
          {allServices.map((service) => (
            <label key={service} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.services.includes(service)}
                onCheckedChange={(checked) => toggleService(service, checked === true)}
              />
              {workServiceLabels[service]}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category">
            Category <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
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
        <Label htmlFor="result">
          Result <span className="font-normal text-muted-foreground">(short headline result)</span>
        </Label>
        <Input id="result" value={form.result} onChange={(e) => set("result", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Cover Image</Label>
        <ImageUploadField value={form.cover_image} onChange={(url) => set("cover_image", url)} />
      </div>

      <div className="space-y-2">
        <Label>Metrics</Label>
        {form.metrics.map((metric, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={metric.label}
              onChange={(e) => updateMetric(i, "label", e.target.value)}
              placeholder="Label (e.g. Booked Jobs)"
            />
            <Input
              value={metric.value}
              onChange={(e) => updateMetric(i, "value", e.target.value)}
              placeholder="Value (e.g. +180%)"
            />
            <button
              type="button"
              onClick={() =>
                set(
                  "metrics",
                  form.metrics.filter((_, idx) => idx !== i),
                )
              }
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => set("metrics", [...form.metrics, { label: "", value: "" }])}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Metric
        </Button>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="challenge">Challenge</Label>
        <Textarea
          id="challenge"
          value={form.challenge}
          onChange={(e) => set("challenge", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Approach Steps</Label>
        {form.approach.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={step} onChange={(e) => updateApproach(i, e.target.value)} />
            <button
              type="button"
              onClick={() =>
                set(
                  "approach",
                  form.approach.filter((_, idx) => idx !== i),
                )
              }
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => set("approach", [...form.approach, ""])}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Step
        </Button>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="outcome">Outcome</Label>
        <Textarea
          id="outcome"
          value={form.outcome}
          onChange={(e) => set("outcome", e.target.value)}
          rows={3}
        />
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
        {existing ? "Save Changes" : "Create Case Study"}
      </Button>
    </form>
  );
}
