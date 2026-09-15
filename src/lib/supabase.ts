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
  services: ("website" | "seo" | "google-ads" | "meta-ads")[];
  badge: string;
  category: string | null;
  result: string | null;
  summary: string | null;
  cover_image: string | null;
  metrics: { label: string; value: string }[] | null;
  challenge: string | null;
  approach: string[] | null;
  outcome: string | null;
  published: boolean;
  created_at: string;
}

// Matches the `blog_posts` table columns.
export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  // SEO-specific description (per SEO checklist: every post needs its own
  // unique meta description, written to earn the click — not a restatement
  // of the title). Falls back to `excerpt` if left blank.
  meta_description: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  // Which /services/* page this post links to at the bottom (SEO checklist:
  // every post must link to a relevant service page). Chosen explicitly by
  // the admin when writing the post — nullable so older rows without it
  // still fall back to auto-matching against `category` on the public page.
  related_service: "websites" | "seo" | "google-ads" | "meta-ads" | "maintenance" | null;
  // Optional per-post override for the final CTA section at the bottom of
  // the post. Any field left blank falls back to the site's default
  // CTASection copy — these don't need to be filled in together.
  cta_badge_label: string | null;
  cta_title: string | null;
  cta_description: string | null;
  cta_button_label: string | null;
  cta_button_href: string | null;
  cta_footnote: string | null;
  published: boolean;
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
