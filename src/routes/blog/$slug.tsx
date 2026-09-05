import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { MagneticButton, Reveal } from "@/components/site/primitives";
import { CTASection } from "@/components/site/CTASection";
import { supabase, type BlogPostRow } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

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
    return {
      meta: [
        { title: `${post.title} | Ductwork Studio Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
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
            description: post.excerpt,
            datePublished: post.created_at,
            image: post.cover_image ?? undefined,
            url: `${SITE_URL}/blog/${post.slug}`,
          }),
        },
      ],
    };
  },
});

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

  // Content is stored as plain text in Supabase — split on blank lines so
  // each paragraph renders as its own <p>. Swap in a markdown renderer
  // later if you want bold/links/headings inside posts.
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

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
              <div className="prose-invert mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </article>

        <CTASection />
      </main>
    </div>
  );
}
