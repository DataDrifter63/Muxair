import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
      "Add them to a .env file at the project root (see README).",
  );
}

/** Full client with login session — used by the admin panel and auth only. */
export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

/** Give up on a request that hangs, so a page never waits forever on the database. */
const REQUEST_TIMEOUT_MS = 7000;
function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal =
    init?.signal && typeof AbortSignal.any === "function"
      ? AbortSignal.any([init.signal, timeout])
      : (init?.signal ?? timeout);
  return fetch(input, { ...init, signal });
}

/**
 * Client for public pages (work, blog, service pages, contact form). It has no login session,
 * so it never touches the browser auth lock (a stuck lock froze every request until a hard
 * refresh, which made links change the URL but not the page) and its requests time out.
 */
export const supabasePublic = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: "sb-muxair-public",
  },
  // No automatic retries: with the timeout above they would stretch a hung request to 20s+.
  db: { retry: false },
  global: { fetch: fetchWithTimeout },
});

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
/**
 * Case studies kept off the public site for now (their content is being redone).
 * Matched by slug or name. To show one again, remove it from this list and also
 * make sure it is published in the admin.
 */
const HIDDEN_CASE_STUDY = /solace/i;
export function isHiddenCaseStudy(row: { slug?: string | null; name?: string | null }): boolean {
  return HIDDEN_CASE_STUDY.test(row.slug ?? "") || HIDDEN_CASE_STUDY.test(row.name ?? "");
}

export async function fetchServiceCaseStudy(service: string): Promise<WorkItemRow | null> {
  try {
    const { data, error } = await supabasePublic
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[service-case-study] load failed:", error.message);
      return null;
    }
    const rows = ((data ?? []) as WorkItemRow[]).filter((r) => !isHiddenCaseStudy(r));
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

/** The fields a case study *card* needs (no long Markdown body). */
export type WorkCardRow = Pick<
  WorkItemRow,
  | "slug"
  | "name"
  | "tone"
  | "location"
  | "services"
  | "badge"
  | "category"
  | "result"
  | "summary"
  | "cover_image"
  | "created_at"
>;

/**
 * Other published case studies to suggest at the end of a case study page.
 * Ones that share the most services with the current one come first, then
 * newest first.
 */
export async function fetchRelatedCaseStudies(
  slug: string,
  services: string[],
  limit = 3,
): Promise<WorkCardRow[]> {
  try {
    const { data, error } = await supabasePublic
      .from("case_studies")
      .select(
        "slug,name,tone,location,services,badge,category,result,summary,cover_image,created_at",
      )
      .eq("published", true)
      .neq("slug", slug)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[related-case-studies] load failed:", error.message);
      return [];
    }
    const rows = ((data ?? []) as WorkCardRow[]).filter((r) => !isHiddenCaseStudy(r));
    const shared = (r: WorkCardRow) =>
      Array.isArray(r.services) ? r.services.filter((s) => services.includes(s)).length : 0;
    return rows
      .map((row, index) => ({ row, index, score: shared(row) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, limit)
      .map((x) => x.row);
  } catch (e) {
    console.error("[related-case-studies] load failed:", e);
    return [];
  }
}
