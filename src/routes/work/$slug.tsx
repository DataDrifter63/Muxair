import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, MapPin } from "lucide-react";
import { MagneticButton, Reveal, TechBackdrop } from "@/components/site/primitives";
import { MarkdownContent } from "@/components/site/MarkdownContent";
import { extractHeadings } from "@/lib/markdown-headings";
import { CTASection } from "@/components/site/CTASection";
import { CaseStudySnapshot, CaseStudyToc } from "@/components/site/CaseStudyAside";
import { CaseStudyRelated } from "@/components/site/CaseStudyRelated";
import {
  fetchRelatedCaseStudies,
  isHiddenCaseStudy,
  supabase,
  type WorkItemRow,
} from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  component: WorkItemPage,
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("[work] failed to load case study:", error.message);
    }
    const found = (data ?? null) as WorkItemRow | null;
    const item = found && !isHiddenCaseStudy(found) ? found : null;
    const related = item ? await fetchRelatedCaseStudies(item.slug, item.services ?? []) : [];
    return { item, related };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    if (!item) {
      return { meta: [{ title: "Case Study Not Found | Muxair" }] };
    }
    const metaDescription = item.summary || item.result || `${item.name} — a Muxair case study.`;
    return {
      meta: [
        { title: `${item.name} Case Study | Muxair` },
        { name: "description", content: metaDescription },
        { property: "og:title", content: item.name },
        { property: "og:description", content: metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/work/${item.slug}` },
        ...(item.cover_image ? [{ property: "og:image", content: item.cover_image }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/work/${item.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
              {
                "@type": "ListItem",
                position: 3,
                name: item.name,
                item: `${SITE_URL}/work/${item.slug}`,
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${item.name} Case Study`,
            description: metaDescription,
            about: item.name,
            image: item.cover_image ?? undefined,
            url: `${SITE_URL}/work/${item.slug}`,
          }),
        },
      ],
    };
  },
});

function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function WorkItemPage() {
  const { item, related } = Route.useLoaderData();

  if (!item) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div>
          <h1 className="font-display text-3xl">Case Study Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            This case study may have been moved or unpublished.
          </p>
          <div className="mt-8">
            <MagneticButton href="/work">
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </MagneticButton>
          </div>
        </div>
      </div>
    );
  }

  const isCool = item.tone === "cool";
  const accentText = isCool ? "text-primary" : "text-heat";
  const headings = item.content ? extractHeadings(item.content) : [];
  const lead = item.summary || item.result;

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <article>
          {/* Header */}
          <header className="relative overflow-hidden pb-4 pt-36 sm:pt-40">
            <TechBackdrop />
            <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
              <Reveal>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Work
                </Link>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                      isCool
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-heat/40 bg-heat/10 text-heat"
                    }`}
                  >
                    {item.badge}
                  </span>
                  {item.category ? (
                    <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      {item.category}
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  {item.name}
                </h1>

                {lead ? (
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    {lead}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  {item.location ? (
                    <span className="flex items-center gap-1.5">
                      <MapPin className={`h-4 w-4 ${accentText}`} />
                      {item.location}
                    </span>
                  ) : null}
                  {item.location && item.content ? (
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  ) : null}
                  {item.content ? (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {readingTime(item.content)} min read
                    </span>
                  ) : null}
                </div>
              </Reveal>

              {item.cover_image ? (
                <Reveal delay={0.1}>
                  <img
                    src={item.cover_image}
                    alt={`Website design preview for ${item.name}`}
                    className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border object-cover object-top shadow-2xl shadow-black/10"
                  />
                </Reveal>
              ) : null}

              {item.metrics && item.metrics.length > 0 ? (
                <Reveal delay={0.15}>
                  <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:grid-cols-3">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className={`font-display text-2xl font-bold sm:text-3xl ${accentText}`}>
                          {m.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>
          </header>

          {/* Body: story on the left, sticky snapshot + contents on the right */}
          <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-10 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
              <div className="min-w-0">
                <div className="mb-10 space-y-4 lg:hidden">
                  <CaseStudySnapshot item={item} />
                  <CaseStudyToc headings={headings} collapsible />
                </div>

                <div className="max-w-3xl">
                  {item.content ? (
                    <Reveal delay={0.1}>
                      <MarkdownContent content={item.content} />
                    </Reveal>
                  ) : (
                    <>
                      {item.challenge ? (
                        <Reveal delay={0.1}>
                          <h2 className="font-display text-xl sm:text-2xl">The Challenge</h2>
                          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                            {item.challenge}
                          </p>
                        </Reveal>
                      ) : null}

                      {item.approach && item.approach.length > 0 ? (
                        <Reveal delay={0.15}>
                          <h2 className="mt-10 font-display text-xl sm:text-2xl">What We Did</h2>
                          <ul className="mt-3 space-y-2.5">
                            {item.approach.map((step) => (
                              <li key={step} className="flex items-start gap-2.5">
                                <CheckCircle2
                                  className={`mt-0.5 h-5 w-5 flex-none ${accentText}`}
                                />
                                <span className="text-base leading-relaxed text-foreground/90">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </Reveal>
                      ) : null}

                      {item.outcome ? (
                        <Reveal delay={0.2}>
                          <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6">
                            <h2 className="font-display text-xl sm:text-2xl">The Outcome</h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                              {item.outcome}
                            </p>
                          </div>
                        </Reveal>
                      ) : null}
                    </>
                  )}
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-5">
                  <div className="flex-none">
                    <CaseStudySnapshot item={item} />
                  </div>
                  <CaseStudyToc headings={headings} />
                </div>
              </aside>
            </div>
          </div>
        </article>

        <CaseStudyRelated item={item} related={related} />

        <CTASection
          title={
            <>
              Want results like this for <span className="text-gradient-cool">your business?</span>
            </>
          }
          description="Book a free 30-minute strategy call. We'll look at your current website and search presence and tell you honestly what we would fix first."
          primaryLabel="Book Your Free Call"
          primaryHref="/contact"
          secondaryLabel="See More Work"
          secondaryHref="/work"
          footnote="No pressure and no lock-in. Built only for HVAC companies."
        />
      </main>
    </div>
  );
}
