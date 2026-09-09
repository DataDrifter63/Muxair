import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { MagneticButton, Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { supabase, type WorkItemRow } from "@/lib/supabase";
import { SITE_URL, workServiceLabels, type WorkService } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  component: CaseStudyPage,
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
    return { item: (data ?? null) as WorkItemRow | null };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    if (!item) {
      return { meta: [{ title: "Case Study Not Found | Muxair" }] };
    }
    const description = item.summary ?? `See how ${item.name} worked with Muxair — ${item.badge}.`;
    return {
      meta: [
        { title: `${item.name} | Muxair Case Study` },
        { name: "description", content: description },
        { property: "og:title", content: item.name },
        { property: "og:description", content: description },
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
            "@type": "CaseStudy",
            name: item.name,
            description,
            url: `${SITE_URL}/work/${item.slug}`,
            image: item.cover_image ?? undefined,
          }),
        },
      ],
    };
  },
});

function CaseStudyPage() {
  const { item } = Route.useLoaderData();

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

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <article className="section-shell pt-36 sm:pt-40">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Work
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-bold",
                    isCool
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-heat/40 bg-heat/10 text-heat",
                  )}
                >
                  {item.badge}
                </span>
                {item.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {workServiceLabels[s as WorkService] ?? s}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-balance font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {item.name}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">{item.location}</p>
            </Reveal>

            {item.cover_image ? (
              <Reveal delay={0.1}>
                <img
                  src={item.cover_image}
                  alt={`Website design preview for ${item.name}`}
                  className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
                />
              </Reveal>
            ) : null}

            {item.summary ? (
              <Reveal delay={0.15}>
                <p className="mt-10 text-base leading-relaxed text-foreground/90">{item.summary}</p>
              </Reveal>
            ) : null}

            {item.metrics && item.metrics.length > 0 ? (
              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-display text-lg font-bold text-foreground sm:text-xl">
                        {m.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {item.challenge ? (
              <Reveal delay={0.25}>
                <div className="mt-10">
                  <h2 className="font-display text-xl">The Challenge</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.challenge}
                  </p>
                </div>
              </Reveal>
            ) : null}

            {item.approach && item.approach.length > 0 ? (
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <h2 className="font-display text-xl">What We Did</h2>
                  <ul className="mt-4 space-y-2.5">
                    {item.approach.map((step) => (
                      <li
                        key={step}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 flex-none",
                            isCool ? "text-primary" : "text-heat",
                          )}
                          strokeWidth={2.5}
                        />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {item.outcome ? (
              <Reveal delay={0.35}>
                <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/[0.04] p-6">
                  <h2 className="font-display text-xl">The Outcome</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.outcome}</p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </article>

        <CTASection />
      </main>
    </div>
  );
}
