import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

const title = "HVAC Marketing Blog | Tips for Booking More Jobs";
const description =
  "Practical, no-fluff advice on websites, local SEO and paid ads — written specifically for HVAC business owners.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
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
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="section-shell relative overflow-hidden pt-36 sm:pt-40">
          <TechBackdrop />
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                The Blog
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
                HVAC Marketing, <span className="text-gradient-cool">No Fluff</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Practical advice on websites, local SEO and paid ads — written specifically for
                heating and cooling business owners.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Post grid */}
        <section className="section-shell pt-0">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {posts.length === 0 ? (
              <Reveal>
                <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-border bg-surface/40 p-10 text-center backdrop-blur-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Newspaper className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h2 className="font-display text-lg">No posts yet</h2>
                  <p className="text-sm text-muted-foreground">
                    New articles are on the way — check back soon.
                  </p>
                </div>
              </Reveal>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.id} delay={i * 0.06} className="h-full">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md transition-colors hover:border-primary/40"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-background/60">
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="pointer-events-none absolute inset-0 grid-tech opacity-30" aria-hidden />
                        )}
                        {post.category ? (
                          <span className="absolute left-3 top-3 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary backdrop-blur-sm">
                            {post.category}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(post.created_at)}
                        </div>
                        <h2 className="mt-3 font-display text-lg leading-snug">{post.title}</h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Read Article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
