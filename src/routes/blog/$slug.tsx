import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { MagneticButton, Reveal } from "@/components/site/primitives";
import { MarkdownContent } from "@/components/site/MarkdownContent";
import { CTASection } from "@/components/site/CTASection";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { services, SITE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("[blog] failed to load post:", error.message);
    }
    return { post: (data ?? null) as BlogPostRow | null };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Post Not Found | Muxair" }] };
    }
    // meta_description is the SEO-specific field (can differ from the
    // card-preview excerpt) — falls back to excerpt if not set.
    const metaDescription = post.meta_description || post.excerpt;
    return {
      meta: [
        { title: `${post.title} | Muxair Blog` },
        { name: "description", content: metaDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        ...(post.cover_image ? [{ property: "og:image", content: post.cover_image }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: metaDescription,
            datePublished: post.created_at,
            author: { "@type": "Organization", name: "Muxair", url: SITE_URL },
            image: post.cover_image ?? undefined,
            url: `${SITE_URL}/blog/${post.slug}`,
          }),
        },
      ],
    };
  },
});

const serviceHrefs = {
  websites: "/services/websites",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div>
          <h1 className="font-display text-3xl">Post Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            This article may have been moved or unpublished.
          </p>
          <div className="mt-8">
            <MagneticButton href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </MagneticButton>
          </div>
        </div>
      </div>
    );
  }

  // The admin can pick a specific related service per post; if they leave it
  // on "Auto-detect", fall back to matching the post's category text against
  // a service title (SEO checklist: every post must link to a service page).
  const relatedService = post.related_service
    ? services.find((s) => s.slug === post.related_service)
    : (services.find((s) => post.category.toLowerCase().includes(s.title.toLowerCase())) ??
      services.find((s) =>
        s.title
          .toLowerCase()
          .split(" ")
          .some((word) => post.category.toLowerCase().includes(word)),
      ) ??
      services.find((s) => s.slug === "websites") ??
      services[0]);

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <article className="section-shell pt-36 sm:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </div>

              {post.category ? (
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {post.category}
                  </span>
                </div>
              ) : null}

              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(post.created_at)}
                </span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime(post.content)} min read
                </span>
              </div>
            </Reveal>

            {post.cover_image ? (
              <Reveal delay={0.1}>
                <img
                  src={post.cover_image}
                  alt=""
                  className="mt-10 aspect-[21/9] w-full rounded-2xl border border-border object-cover"
                />
              </Reveal>
            ) : null}

            <Reveal delay={0.15}>
              <MarkdownContent content={post.content} />
            </Reveal>

            {/* Author box */}
            <Reveal delay={0.18}>
              <div className="mt-12 flex items-center gap-3.5 border-t border-border pt-8">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                  M
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Muxair Team</p>
                  <p className="text-xs text-muted-foreground">HVAC-specialist web design agency</p>
                </div>
              </div>
            </Reveal>

            {relatedService ? (
              <Reveal delay={0.2}>
                <Link
                  to={serviceHrefs[relatedService.slug as keyof typeof serviceHrefs]}
                  className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/[0.04] p-6 transition-colors hover:border-primary/45"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Related Service
                    </p>
                    <p className="mt-1 font-display text-base text-foreground">
                      {relatedService.title}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-none text-primary transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Reveal>
            ) : null}
          </div>
        </article>

        <CTASection
          {...(post.cta_badge_label ? { badgeLabel: post.cta_badge_label } : {})}
          {...(post.cta_title ? { title: post.cta_title } : {})}
          {...(post.cta_description ? { description: post.cta_description } : {})}
          {...(post.cta_button_label ? { primaryLabel: post.cta_button_label } : {})}
          {...(post.cta_button_href ? { primaryHref: post.cta_button_href } : {})}
          {...(post.cta_footnote ? { footnote: post.cta_footnote } : {})}
        />
      </main>
    </div>
  );
}
