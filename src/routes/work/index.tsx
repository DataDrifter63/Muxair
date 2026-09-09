import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { Counter, MagneticButton, Reveal, TechBackdrop } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { supabase, type WorkItemRow } from "@/lib/supabase";
import { SITE_URL, workServiceLabels, type WorkService } from "@/lib/site-data";

// Per the site's per-page SEO checklist for /work.
const title = "HVAC Website Design Portfolio | Case Studies for Heating & Cooling Companies";
const description =
  "Browse our portfolio of websites built exclusively for HVAC companies. See the results we've delivered for heating, cooling, and air quality businesses.";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  loader: async () => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[work] failed to load case studies:", error.message);
      return { items: [] as WorkItemRow[] };
    }
    return { items: (data ?? []) as WorkItemRow[] };
  },
  head: ({ loaderData }) => {
    const items = loaderData?.items ?? [];
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/work` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/work` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
            ],
          }),
        },
        // CollectionPage + ItemList schema — kept exactly as specified in the
        // work-page blueprint, built from whatever is currently published.
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "HVAC Website Design Portfolio",
            description: "Case studies of websites and marketing built for HVAC companies.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: items.map((w, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/work/${w.slug}`,
              })),
            },
          }),
        },
      ],
    };
  },
});

const stats = [
  { to: 300, suffix: "%", label: "Best organic enquiry increase" },
  { to: 30, suffix: " days", label: "Average time to launch" },
  { to: 100, suffix: "%", label: "HVAC-only clients" },
];

const filters: { id: WorkService | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "website", label: "Website Design" },
  { id: "seo", label: "Local SEO" },
  { id: "google-ads", label: "Google Ads" },
  { id: "meta-ads", label: "Meta Ads" },
];

const reviews = [
  {
    quote:
      "First agency that didn't need HVAC explained to them. They planned the whole build around our winter demand peak.",
    name: "Sarah Doyle",
    company: "Yorkshire Boiler Specialists",
    badge: "Page 1 in 4mo",
  },
  {
    quote:
      "The new site plus their Google Ads gave us more commercial AC quotes in a month than the whole previous quarter.",
    name: "Aaron Price",
    company: "London AC Installer",
    badge: "40 quotes/30d",
  },
  {
    quote:
      "Our booking rate barely moved for years. Within a few months of the redesign it climbed from 4% to 19% — same traffic, more booked jobs.",
    name: "Ryan Holt",
    company: "Coastal Cooling Ltd.",
    badge: "4% → 19%",
  },
];

function WorkIndex() {
  const { items } = Route.useLoaderData();
  const [filter, setFilter] = useState<WorkService | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((w) => w.services.includes(filter));
  }, [filter, items]);

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
                Our Work
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Real Websites for <span className="text-gradient-cool">Real HVAC Companies</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every project below is a heating, cooling, or air quality business — no portfolio
                padding from unrelated industries.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:grid-cols-3 sm:px-10">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </p>
                    <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filter bar + case studies */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      filter === f.id
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-surface/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08} className="h-full">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="h-full"
                  >
                    <Link
                      to="/work/$slug"
                      params={{ slug: project.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-background/60">
                        {project.cover_image ? (
                          <motion.img
                            src={project.cover_image}
                            alt={`Website design preview for ${project.name}`}
                            loading="lazy"
                            initial={{ scale: 1.12, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="pointer-events-none absolute inset-0 grid-tech opacity-30"
                            aria-hidden
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                        <span
                          className={cn(
                            "absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md",
                            project.tone === "cool"
                              ? "border-primary/40 bg-background/80 text-primary"
                              : "border-heat/40 bg-background/80 text-heat",
                          )}
                        >
                          {project.badge}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-lg leading-snug">{project.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{project.location}</p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.services.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {workServiceLabels[s as WorkService] ?? s}
                            </span>
                          ))}
                        </div>

                        <span
                          className={cn(
                            "mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold",
                            project.tone === "cool" ? "text-primary" : "text-heat",
                          )}
                        >
                          View Case Study
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </Reveal>
              ))}

              {/* Become our next case study */}
              <Reveal delay={filtered.length * 0.08} className="h-full">
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-primary/40 bg-primary/[0.04] p-8 text-center shadow-[0_0_0_1px_rgba(232,98,44,0.15)]">
                  <h3 className="font-display text-lg leading-snug">Become Our Next Case Study</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    We're onboarding a small number of HVAC companies this quarter to work directly
                    with our whole team — and be featured here.
                  </p>
                  <MagneticButton href="/contact" className="mt-5">
                    Get in Touch
                  </MagneticButton>
                </div>
              </Reveal>

              {items.length === 0 ? (
                <Reveal className="col-span-full">
                  <p className="rounded-2xl border border-border bg-surface/40 px-6 py-10 text-center text-sm text-muted-foreground">
                    No case studies published yet — check back soon.
                  </p>
                </Reveal>
              ) : filtered.length === 0 ? (
                <Reveal className="col-span-full">
                  <p className="rounded-2xl border border-border bg-surface/40 px-6 py-10 text-center text-sm text-muted-foreground">
                    No projects in this category yet — check back soon.
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                In Their Words
              </span>
              <h2 className="mt-5 text-balance font-display text-2xl sm:text-3xl">
                What HVAC Owners Say{" "}
                <span className="text-gradient-cool">After Working With Us</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <div className="flex gap-0.5 text-primary" aria-hidden>
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star key={starIdx} className="h-3.5 w-3.5 fill-primary" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <div>
                        <p className="text-sm font-bold text-foreground">{r.name}</p>
                        <p className="text-[11px] text-muted-foreground">{r.company}</p>
                      </div>
                      <span className="whitespace-nowrap rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10.5px] font-bold text-primary">
                        {r.badge}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title={
            <>
              Want Results Like <span className="text-gradient-cool">These?</span>
            </>
          }
          description="Book a free strategy call and we'll show you what's possible for your business specifically — not a generic pitch."
          primaryLabel="Get a Free Strategy Call"
          primaryHref="/contact"
          footnote="We reply within 4 hours · No obligation"
        />
      </main>
    </div>
  );
}
