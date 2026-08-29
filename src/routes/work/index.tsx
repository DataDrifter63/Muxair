// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/work/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/Work/"!</div>
// }








import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import { CTASection } from "@/components/site/CTASection";
import {
  Counter,
  MagneticButton,
  Reveal,
  SectionHeading,
  TechBackdrop,
} from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { SITE_URL, workItems } from "@/lib/site-data";

const title = "Our Work | HVAC Website & Marketing Case Studies";
const description =
  "See the real results heating, cooling and air quality companies get from our website design, local SEO and paid ads campaigns — with the numbers to back it up.";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => ({
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: workItems.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/work/${w.slug}`,
            name: w.name,
          })),
        }),
      },
    ],
  }),
});

// NOTE: case studies are read from src/lib/site-data.ts as placeholder
// content. Once case studies move into Supabase, swap the `workItems`
// import above for a query (e.g. inside a route `loader`) that returns
// the same shape — the markup below doesn't need to change.
const images = [work1, work2, work3];

const stats = [
  { to: 3, suffix: "+", label: "HVAC companies served" },
  { to: 240, suffix: "%", label: "Average enquiry uplift" },
  { to: 100, suffix: "%", label: "Built for heating & cooling" },
];

const filters = ["All", "Cooling", "Heating"] as const;

function WorkIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return workItems;
    const wantTone = filter === "Cooling" ? "cool" : "heat";
    return workItems.filter((w) => w.tone === wantTone);
  }, [filter]);

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
                Real Results for Real{" "}
                <span className="text-gradient-cool">HVAC Businesses</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every project below is a heating, cooling or air quality company — because it's
                the only industry we work in. Here's what changed after we got involved.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost" size="lg">
                  See Our Services
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:px-10">
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

        {/* Case studies */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Case studies" title="Recent Projects" align="left" />
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        filter === f
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-surface/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1} className="h-full">
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={images[workItems.findIndex((w) => w.slug === project.slug) % images.length]}
                        alt={`Website design preview for ${project.name}, ${project.category}`}
                        width={1200}
                        height={800}
                        loading="lazy"
                        initial={{ scale: 1.12, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="aspect-[3/2] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                      <span
                        className={cn(
                          "absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md",
                          project.tone === "cool"
                            ? "border-primary/40 bg-background/70 text-primary"
                            : "border-heat/40 bg-background/70 text-heat",
                        )}
                      >
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-lg leading-snug">{project.name}</h3>
                      <p
                        className={cn(
                          "mt-2 flex items-start gap-1.5 text-sm font-semibold",
                          project.tone === "cool" ? "text-primary" : "text-heat",
                        )}
                      >
                        <Quote className="mt-0.5 h-3.5 w-3.5 flex-none" strokeWidth={2.5} />
                        {project.result}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>

                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
                        {project.metrics.slice(0, 3).map((m) => (
                          <div key={m.label} className="text-center">
                            <p className="font-display text-sm font-bold text-foreground">
                              {m.value}
                            </p>
                            <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Link
                        to="/work/$slug"
                        params={{ slug: project.slug }}
                        className={cn(
                          "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                          project.tone === "cool" ? "text-primary" : "text-heat",
                        )}
                      >
                        View Case Study
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </motion.article>
                </Reveal>
              ))}

              {filtered.length === 0 ? (
                <Reveal className="col-span-full">
                  <p className="rounded-2xl border border-border bg-surface/40 px-6 py-10 text-center text-sm text-muted-foreground">
                    No projects in this category yet — check back soon.
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
}
