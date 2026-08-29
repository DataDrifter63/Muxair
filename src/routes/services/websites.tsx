import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Compass,
  MapPin,
  PenTool,
  PhoneCall,
  Rocket,
  Smartphone,
  Zap,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import {
  Counter,
  MagneticButton,
  Reveal,
  SectionHeading,
  TechBackdrop,
} from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import work1 from "@/assets/work-1.jpg";
import work3 from "@/assets/work-3.jpg";
import { services, SITE_URL } from "@/lib/site-data";

const service = services.find((s) => s.slug === "websites")!;

const title = "HVAC Website Design That Books Jobs | Ductwork Studio";
const description =
  "Custom, mobile-first HVAC websites built to convert — service-area pages, quote forms and Core Web Vitals-optimized speed. Live in as little as 30 days.";

export const Route = createFileRoute("/services/websites")({
  component: WebsitesPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services/websites` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/websites` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Website Design",
              item: `${SITE_URL}/services/websites`,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "HVAC Website Design",
          name: service.title,
          description: service.description,
          areaServed: "GB",
          provider: { "@type": "Organization", name: "Ductwork Studio", url: SITE_URL },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
});

const stats = [
  { to: 30, suffix: " days", label: "Average build & launch time" },
  { to: 2, suffix: "", label: "Design revision rounds included" },
  { to: 100, suffix: "%", label: "Mobile-first, every build" },
];

const features = [
  {
    icon: PenTool,
    title: "Custom Design, Not a Template",
    description:
      "Every site is designed around your brand and your customers — never a recycled template with your logo swapped in.",
    stat: "Built from scratch, every time",
    tone: "cool" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile-First Build",
    description:
      "Most emergency HVAC searches happen on a phone. Every page is designed and tested for one-thumb navigation first.",
    stat: "Sub-2s mobile load time",
    tone: "heat" as const,
  },
  {
    icon: MapPin,
    title: "Service-Area Landing Pages",
    description:
      "A dedicated, SEO-structured page for every town you cover — so you show up for searches beyond your home base.",
    stat: "One page per service area",
    tone: "cool" as const,
  },
  {
    icon: Zap,
    title: "Core Web Vitals Optimized",
    description:
      "We build lean, fast pages from day one — no bloated page builders — so your site passes Google's speed benchmarks.",
    stat: "Built for Core Web Vitals",
    tone: "heat" as const,
  },
  {
    icon: PhoneCall,
    title: "Quote Forms & Click-to-Call",
    description:
      "Every page is built around getting a homeowner to reach out — inline quote forms, sticky call buttons and booking widgets.",
    stat: "Conversion-first layout",
    tone: "cool" as const,
  },
  {
    icon: BarChart3,
    title: "Analytics & Call Tracking",
    description:
      "Know exactly which pages and campaigns bring in enquiries, with tracking wired up before your site ever goes live.",
    stat: "Full visibility from day one",
    tone: "heat" as const,
  },
];

const processSteps = [
  { icon: Compass, title: "Discovery & Strategy", day: "Day 1–7" },
  { icon: PenTool, title: "Design & Build", day: "Day 8–25" },
  { icon: ClipboardCheck, title: "Test & Refine", day: "Day 20–25" },
  { icon: Rocket, title: "Launch & Support", day: "Day 26–30" },
];

const relatedServices = services.filter((s) => s.slug !== "websites");

// Each service lives at its own static route, so map slugs to the exact
// literal paths the router knows about (mirrors src/routes/services/index.tsx).
const serviceHrefs = {
  websites: "/services/websites",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function WebsitesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="section-shell relative overflow-hidden pt-36 sm:pt-40">
          <TechBackdrop />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <nav className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Link to="/services" className="hover:text-primary">
                  Services
                </Link>
                <span>/</span>
                <span className="text-foreground">Websites</span>
              </nav>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Website Design
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                HVAC Websites Built to <span className="text-gradient-cool">Book More Jobs</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/pricing" variant="ghost" size="lg">
                  See Pricing
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

        {/* Features */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="What's included"
              title={
                <>
                  Everything Your Site <span className="text-gradient-cool">Needs to Convert</span>
                </>
              }
              subtitle="No add-ons, no upsells for the basics — every website we build includes all of this as standard."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className="h-full">
                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md"
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                        f.tone === "cool" ? "via-primary/70" : "via-heat/70"
                      } to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    <div
                      className={`pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100 ${
                        f.tone === "cool" ? "bg-primary/18" : "bg-heat/18"
                      }`}
                    />
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${
                        f.tone === "cool"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-heat/30 bg-heat/10 text-heat"
                      }`}
                    >
                      <f.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-lg leading-snug">{f.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <span
                      className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        f.tone === "cool"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-heat/30 bg-heat/10 text-heat"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {f.stat}
                    </span>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process teaser */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="How it works"
                title={
                  <>
                    Live in as Little as <span className="text-gradient-cool">30 Days</span>
                  </>
                }
                align="left"
              />
              <Reveal delay={0.1}>
                <Link
                  to="/process"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  See the full process
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {step.day}
                    </p>
                    <h3 className="mt-1.5 font-display text-base leading-snug">{step.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio teaser */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Recent work" title="Sites We've Built" align="left" />
              <Reveal delay={0.1}>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  See all work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                {
                  image: work1,
                  name: "Midlands HVAC Co.",
                  result: "300% increase in organic enquiries",
                  slug: "midlands-hvac-co",
                },
                {
                  image: work3,
                  name: "London AC Installer",
                  result: "40 quote requests in 30 days",
                  slug: "london-ac-installer",
                },
              ].map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link to="/work/$slug" params={{ slug: p.slug }}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={p.image}
                          alt={`Website design preview for ${p.name}`}
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
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-lg">{p.name}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">
                          &ldquo;{p.result}&rdquo;
                        </p>
                        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          View Case Study
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] px-7 py-10 backdrop-blur-md glow-cool sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/18 blur-[100px]" />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl">
                      Website builds start at £1,500
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                      A one-time project fee — the site is yours to keep, with no monthly platform
                      fees attached. Full package breakdown on the pricing page.
                    </p>
                  </div>
                  <MagneticButton href="/pricing" className="flex-none">
                    See Full Pricing
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-shell border-t border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="FAQs"
              title={
                <>
                  Questions About <span className="text-gradient-cool">Website Design</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-12">
                {service.faqs.map((f, i) => (
                  <AccordionItem key={f.question} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base">{f.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* Related services */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Pairs well with"
              title={
                <>
                  Other Ways We Help You <span className="text-gradient-cool">Grow</span>
                </>
              }
              align="left"
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.06}>
                  <Link
                    to={serviceHrefs[s.slug as keyof typeof serviceHrefs]}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <h3 className="font-display text-sm leading-snug">{s.shortTitle}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {s.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
}
