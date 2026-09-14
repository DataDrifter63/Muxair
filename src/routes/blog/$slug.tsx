import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
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
      return { meta: [{ title: "Post Not Found | Ductwork Studio" }] };
    }
    // meta_description is the SEO-specific field (can differ from the
    // card-preview excerpt) — falls back to excerpt if not set.
    const metaDescription = post.meta_description || post.excerpt;
    return {
      meta: [
        { title: `${post.title} | Ductwork Studio Blog` },
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
            author: { "@type": "Organization", name: "Ductwork Studio", url: SITE_URL },
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

  // Every post must link to at least one relevant /services/* page (SEO
  // checklist rule). Match the post's category against a service title,
  // falling back to the website design page — every HVAC business needs a
  // site, so it's a safe default when the category doesn't map cleanly.
  const relatedService =
    services.find((s) => post.category.toLowerCase().includes(s.title.toLowerCase())) ??
    services.find((s) =>
      s.title
        .toLowerCase()
        .split(" ")
        .some((word) => post.category.toLowerCase().includes(word)),
    ) ??
    services.find((s) => s.slug === "websites") ??
    services[0];

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <article className="section-shell pt-36 sm:pt-40">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {post.category ? (
                <span className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {post.category}
                </span>
              ) : null}

              <h1 className="mt-4 text-balance font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
            </Reveal>

            {post.cover_image ? (
              <Reveal delay={0.1}>
                <img
                  src={post.cover_image}
                  alt=""
                  className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
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
                  DS
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Ductwork Studio Team</p>
                  <p className="text-xs text-muted-foreground">HVAC-specialist web design agency</p>
                </div>
              </div>
            </Reveal>

            {relatedService ? (
              <Reveal delay={0.2}>
                <Link
                  to={serviceHrefs[relatedService.slug as keyof typeof serviceHrefs]}
                  className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/[0.04] p-6 transition-colors hover:border-primary/45"
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

        <CTASection />
      </main>
    </div>
  );
}
