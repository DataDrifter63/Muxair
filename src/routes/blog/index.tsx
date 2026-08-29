import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  type LucideIcon,
  MonitorSmartphone,
  Search,
  Target,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { Reveal, TechBackdrop } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { blogPosts, SITE_URL } from "@/lib/site-data";

const title = "HVAC Marketing Blog | Website, SEO & Ads Advice";
const description =
  "Practical website design, local SEO and paid ads advice for HVAC companies — no fluff, just what actually moves the needle for heating and cooling businesses.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
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
          name: "Ductwork Studio Blog",
          url: `${SITE_URL}/blog`,
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }),
      },
    ],
  }),
});

// NOTE: posts are read from src/lib/site-data.ts as placeholder content.
// Once the blog moves into Supabase, swap the `blogPosts` import above for
// a query (e.g. inside a route `loader`) that returns the same shape —
// the markup below doesn't need to change.
const categories = ["All", "Website Design", "SEO", "Paid Ads"] as const;

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

// A lightweight, illustrative cover — no photo asset needed. Reuses the
// site's grid-tech + glow language so cards feel on-brand while staying
// tiny for performance (good for LCP/Core Web Vitals) until real cover
// images are attached via Supabase.
function BlogCoverArt({ category, size = "md" }: { category: string; size?: "md" | "lg" }) {
  const { icon: Icon, tone } = categoryStyle[category] ?? { icon: MonitorSmartphone, tone: "cool" };
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

function BlogIndex() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    if (category === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === category);
  }, [category]);

  const [featured, ...rest] = filtered;

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
                Insights & Advice for <span className="text-gradient-cool">HVAC Businesses</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Practical, no-fluff articles on websites, local SEO and paid ads — written
                specifically for heating, cooling and air quality companies.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Category filters + posts */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
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
                        <BlogCoverArt category={featured.category} size="lg" />
                        <div className="relative p-8 sm:p-10">
                          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                            Featured &middot; {featured.category}
                          </span>
                          <h2 className="mt-5 max-w-3xl text-balance font-display text-2xl leading-snug sm:text-3xl">
                            {featured.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {featured.excerpt}
                          </p>
                          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(featured.date)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {featured.readTime}
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
                      <Reveal key={post.slug} delay={0.1 + i * 0.08} className="h-full">
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
                            <BlogCoverArt category={post.category} />
                            <div className="flex flex-1 flex-col p-7 sm:p-8">
                              <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                {post.category}
                              </span>
                              <h3 className="mt-5 flex-1 text-balance font-display text-lg leading-snug sm:text-xl">
                                {post.title}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {post.excerpt}
                              </p>
                              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(post.date)}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  {post.readTime}
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
              </>
            )}
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
}
