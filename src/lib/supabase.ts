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
  published: boolean;
  created_at: string;
}
