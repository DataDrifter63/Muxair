import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

// Dynamic sitemap.xml — served by the app's own Node server (works
// wherever this app runs: hPanel, a VPS, Netlify, anywhere) instead of a
// static public/sitemap.xml. Blog posts and case studies live in Supabase
// and get added/removed through the admin dashboard, so a static file
// can't reflect that; this builds the list fresh from published content
// on every request.

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/services/website", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo", changefreq: "monthly", priority: "0.8" },
  { path: "/services/google-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/meta-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/maintenance", changefreq: "monthly", priority: "0.8" },
  { path: "/work", changefreq: "weekly", priority: "0.8" },
  { path: "/process", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  // Deliberately excluded: /thank-you (noindex, thin content) and /admin/*
  // (private dashboard). NOTE: while the site is in client-approval mode,
  // robots.txt is Disallow: / — swap it at launch (see README).
];

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod: string | undefined, changefreq: string, priority: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ""}<changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function buildSitemap() {
  const entries: string[] = STATIC_PAGES.map((p) =>
    urlEntry(`${SITE_URL}${p.path}`, undefined, p.changefreq, p.priority),
  );

  const [{ data: posts, error: postsError }, { data: caseStudies, error: caseStudiesError }] =
    await Promise.all([
      supabase.from("blog_posts").select("slug, created_at").eq("published", true),
      supabase.from("case_studies").select("slug, created_at").eq("published", true),
    ]);

  if (postsError) console.error("[sitemap] failed to load blog posts:", postsError.message);
  if (caseStudiesError)
    console.error("[sitemap] failed to load case studies:", caseStudiesError.message);

  for (const post of posts ?? []) {
    entries.push(
      urlEntry(
        `${SITE_URL}/blog/${post.slug}`,
        new Date(post.created_at).toISOString().slice(0, 10),
        "monthly",
        "0.6",
      ),
    );
  }

  for (const item of caseStudies ?? []) {
    entries.push(
      urlEntry(
        `${SITE_URL}/work/${item.slug}`,
        new Date(item.created_at).toISOString().slice(0, 10),
        "monthly",
        "0.6",
      ),
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

// File is named sitemap[.]xml.ts — the [.] escapes the dot so the route
// path is literally /sitemap.xml (a plain "." in a TanStack Start route
// filename would otherwise be read as a path separator).
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = await buildSitemap();
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            // Cache for an hour at any CDN/proxy in front of the Node
            // server; harmless if there isn't one (hPanel serves it
            // straight from this route on every request either way).
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
