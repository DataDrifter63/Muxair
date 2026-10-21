import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
      "Add them to a .env file at the project root (see README).",
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// Matches the `case_studies` table columns — used by /work and /work/$slug.
export interface WorkItemRow {
  id: string;
  slug: string;
  name: string;
  tone: "cool" | "heat";
  location: string;
  services: string[];
  badge: string;
  category: string | null;
  result: string | null;
  summary: string | null;
  cover_image: string | null;
  metrics: { label: string; value: string }[];
  challenge: string | null;
  approach: string[];
  outcome: string | null;
  // Optional full-length Markdown case study (section headings + images,
  // like a blog post). When set, the case study page shows this instead of
  // the short challenge/approach/outcome fields above.
  content: string | null;
  published: boolean;
  created_at: string;
}

// Matches the `blog_posts` table columns — used by /blog and /blog/$slug.
export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  meta_description: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  // Shown on the post page; blank falls back to "Muxair Team".
  author_name: string | null;
  // Manual override for the "Related Service" card on the post page (a service
  // slug such as "seo") — falls back to auto-matching against `category` when null.
  related_service: string | null;
  // Per-post overrides for the bottom CTASection — each falls back to that
  // component's site-wide default when left null/empty.
  cta_badge_label: string | null;
  cta_title: string | null;
  cta_description: string | null;
  cta_button_label: string | null;
  cta_button_href: string | null;
  cta_footnote: string | null;
  created_at: string;
}

// Matches the actual `leads` table columns in Supabase (see table editor —
// this table has no `status`, `other_info`, or `heard_about` columns; extra
// notes go into `message`).
export interface LeadRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  service_area: string;
  need: string;
  message: string | null;
  deleted_at: string | null;
  created_at: string;
}

/**
 * Latest published case study tagged with the given service slug
 * ("website" | "seo" | "google-ads" | "meta-ads" | "maintenance").
 * Used by the service pages so each one links to its own real case study.
 * Returns null when none is published yet (the page shows "Coming Soon").
 *
 * Loads published rows the same way /work does and matches the tag in code,
 * so it works whether `services` is a text[] or a jsonb column.
 */
export async function fetchServiceCaseStudy(service: string): Promise<WorkItemRow | null> {
  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[service-case-study] load failed:", error.message);
      return null;
    }
    const rows = (data ?? []) as WorkItemRow[];
    return (
      rows.find(
        (r) =>
          Array.isArray(r.services) &&
          r.services.some((s) => String(s).trim().toLowerCase() === service),
      ) ?? null
    );
  } catch (e) {
    console.error("[service-case-study] load failed:", e);
    return null;
  }
}
