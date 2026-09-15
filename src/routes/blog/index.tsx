import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
  MonitorSmartphone,
  Newspaper,
  Search,
  Target,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { Reveal, TechBackdrop } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

// --- Content / meta / schema (sourced from the Muxair blog page) ---
const title = "HVAC Marketing & Website Tips | Muxair Blog";
const description =
  "Practical advice on HVAC websites, local SEO, and digital marketing — written for heating and cooling business owners, not marketers.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  // Functionality: posts are loaded live from Supabase (same as the
  // current production blog page) instead of the old static placeholder list.
  loader: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[blog] failed to load posts:", error.message);
      return { posts: [] as BlogPostRow[] };
    }
    return { posts: (data ?? []) as BlogPostRow[] };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Muxair Blog",
          description,
          url: `${SITE_URL}/blog`,
        }),
      },
    ],
  }),
});

// Design: category pill styling from the original blog layout. Falls back
// to a generic icon for any category coming from Supabase that isn't in
// this map, so it never breaks on new/unexpected category values.
const categoryStyle: Record<string, { icon: LucideIcon; tone: "cool" | "heat" }> = {
  "Website Design": { icon: MonitorSmartphone, tone: "cool" },
  SEO: { icon: Search, tone: "heat" },
  "Paid Ads": { icon: Target, tone: "cool" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Illustrative fallback cover for posts without a `cover_image` in Supabase —
// keeps the original design's on-brand placeholder instead of a blank box.
function BlogCoverArt({ category, size = "md" }: { category: string; size?: "md" | "lg" }) {
  const { icon: Icon, tone } = categoryStyle[category] ?? { icon: Newspaper, tone: "cool" };
  return (
    <div
      className={cn("relative overflow-hidden", size === "lg" ? "aspect-[21/9]" : "aspect-[16/9]")}
      aria-hidden
    >
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 grid-tech opacity-25" />
      <div
        className={cn(
          "absolute h-40 w-40 rounded-full blur-[70px] transition-transform duration-500 group-hover:scale-110",
          tone === "cool" ? "-left-8 -top-8 bg-primary/30" : "-left-8 -top-8 bg-heat/30",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-10 -right-6 h-32 w-32 rounded-full blur-[70px]",
          tone === "cool" ? "bg-heat/15" : "bg-primary/15",
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "flex items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-500 group-hover:scale-110",
            size === "lg" ? "h-20 w-20" : "h-16 w-16",
            tone === "cool"
              ? "border-primary/30 bg-background/60 text-primary"
              : "border-heat/30 bg-background/60 text-heat",
          )}
        >
          <Icon className={size === "lg" ? "h-9 w-9" : "h-7 w-7"} strokeWidth={1.6} />
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}

// Cover art wrapper: real Supabase image when present, illustrative
// fallback otherwise.
function PostCover({ post, size = "md" }: { post: BlogPostRow; size?: "md" | "lg" }) {
  if (post.cover_image) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          size === "lg" ? "aspect-[21/9]" : "aspect-[16/9]",
        )}
      >
        <img
          src={post.cover_image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  return <BlogCoverArt category={post.category} size={size} />;
}

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  // Categories are derived from whatever's actually published in Supabase,
  // with "All" pinned first — same filter UX as the original design.
  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    return ["All", ...unique];
  }, [posts]);

  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    if (category === "All") return posts;
    return posts.filter((p) => p.category === category);
  }, [category, posts]);

  // Page 1: 1 featured post + a 2-col grid of 6 (7 total). Every page after
  // that: no featured post, just a 2-col grid of 8 (4 rows).
  const FIRST_PAGE_SIZE = 7;
  const OTHER_PAGE_SIZE = 8;

  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [category]);

  const totalPages =
    filtered.length <= FIRST_PAGE_SIZE
      ? 1
      : 1 + Math.ceil((filtered.length - FIRST_PAGE_SIZE) / OTHER_PAGE_SIZE);

  const pageItems = useMemo(() => {
    if (page === 1) return filtered.slice(0, FIRST_PAGE_SIZE);
    const start = FIRST_PAGE_SIZE + (page - 2) * OTHER_PAGE_SIZE;
    return filtered.slice(start, start + OTHER_PAGE_SIZE);
  }, [filtered, page]);

  const featured = page === 1 ? pageItems[0] : undefined;
  const rest = page === 1 ? pageItems.slice(1) : pageItems;

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="section-shell relative overflow-hidden pt-36 sm:pt-40">
          <TechBackdrop />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Blog
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                HVAC Marketing, <span className="text-gradient-cool">Explained Simply</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                No jargon, no filler — practical advice on websites, SEO, and ads written
                specifically for HVAC business owners.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Category filters + posts */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            {categories.length > 1 ? (
              <Reveal>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        category === c
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-surface/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {filtered.length === 0 ? (
              <Reveal delay={0.1}>
                <p className="mt-12 rounded-2xl border border-border bg-surface/40 px-6 py-10 text-center text-sm text-muted-foreground">
                  No articles in this category yet — check back soon.
                </p>
              </Reveal>
            ) : (
              <>
                {/* Featured post */}
                {featured ? (
                  <Reveal delay={0.1} className="mt-12">
                    <Link to="/blog/$slug" params={{ slug: featured.slug }}>
                      <motion.article
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 240, damping: 22 }}
                        className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-background/70 backdrop-blur-md"
                      >
                        <PostCover post={featured} size="lg" />
                        <div className="relative p-8 sm:p-10">
                          {featured.category ? (
                            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                              Featured &middot; {featured.category}
                            </span>
                          ) : null}
                          <h2 className="mt-5 max-w-3xl text-balance font-display text-2xl leading-snug sm:text-3xl">
                            {featured.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {featured.excerpt}
                          </p>
                          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(featured.created_at)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                              Read article
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </Reveal>
                ) : null}

                {/* Remaining posts */}
                {rest.length > 0 ? (
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {rest.map((post, i) => (
                      <Reveal key={post.id} delay={0.1 + i * 0.08} className="h-full">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="block h-full"
                        >
                          <motion.article
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                          >
                            <PostCover post={post} />
                            <div className="flex flex-1 flex-col p-7 sm:p-8">
                              {post.category ? (
                                <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                  {post.category}
                                </span>
                              ) : null}
                              <h3 className="mt-5 flex-1 text-balance font-display text-lg leading-snug sm:text-xl">
                                {post.title}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {post.excerpt}
                              </p>
                              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(post.created_at)}
                                </span>
                                <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-primary">
                                  Read
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                              </div>
                            </div>
                          </motion.article>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                ) : null}

                {totalPages > 1 ? (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                          p === page
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                        )}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>

        <CTASection
          title={
            <>
              Want This Handled <span className="text-gradient-cool">For You?</span>
            </>
          }
          description="Skip the DIY audit — book a free strategy call and we'll review your actual website with you."
          primaryLabel="Get a Free Strategy Call"
          primaryHref="/contact"
        />
      </main>
    </div>
  );
}
