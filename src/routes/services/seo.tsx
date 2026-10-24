import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ClipboardCheck,
  Gauge,
  LayoutTemplate,
  LineChart,
  MapPin,
  PenLine,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { ServiceCaseStudies } from "@/components/site/ServiceCaseStudies";
import { fetchServiceCaseStudy } from "@/lib/supabase";
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
import { services } from "@/lib/site-data";

const PAGE_URL = "https://muxair.com/services/seo";

const title = "HVAC Local SEO Services | Rank Higher on Google";
const description =
  "Local SEO built exclusively for HVAC companies. Get found on Google Maps and in local search by homeowners ready to book. Free 30-minute strategy call.";

const faqs = [
  {
    question: "How long until we see rankings improve?",
    answer:
      "Most clients see meaningful movement within 3 to 6 months. We'll give you an honest month-by-month outlook, not a guaranteed timeline nobody can promise.",
  },
  {
    question: "Do you guarantee rankings?",
    answer:
      "No agency honestly can. What we guarantee is the work: technical fixes, content, and citations done properly and on schedule.",
  },
  {
    question: "What's included in local SEO?",
    answer:
      "Google Business Profile setup and optimisation, service-area landing pages, local citation building, technical SEO audits, ongoing content targeting local search, and a monthly report.",
  },
  {
    question: "Do you handle Google Business Profile management?",
    answer:
      "Yes. Setup, optimisation, review strategy, and ongoing posts are all part of the SEO retainer.",
  },
  {
    question: "Is SEO ongoing or one-time?",
    answer:
      "Ongoing. SEO isn't a one-off fix. Rankings need to be maintained and built on month over month, which is why it's a monthly plan with a 3-month minimum. After the first 3 months, it continues month to month.",
  },
  {
    question: "Can I get SEO without a new website from you?",
    answer:
      "Yes, SEO can be booked on its own. If your current site has problems holding your rankings back, we'll tell you plainly in the first-month audit, and you decide whether to fix them or rebuild.",
  },
];

export const Route = createFileRoute("/services/seo")({
  component: SeoPage,
  loader: async () => ({ caseStudy: await fetchServiceCaseStudy("seo") }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    // Schema taken as-is from the approved service-inner-seo.html reference.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "HVAC Local SEO",
          name: "HVAC Local SEO",
          description:
            "Local SEO built specifically around how homeowners and businesses search for HVAC services in their area.",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
          ],
          offers: {
            "@type": "Offer",
            name: "SEO Retainer",
            description:
              "Google Business Profile optimisation, on-page SEO, monthly content, reporting.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 500,
              priceCurrency: "USD",
              unitCode: "MON",
              minPrice: 500,
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Services",
              item: "https://muxair.com/services",
            },
            { "@type": "ListItem", position: 2, name: "Local SEO", item: PAGE_URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
});

const stats: { to?: number; suffix?: string; text?: string; label: string }[] = [
  { to: 3, suffix: " months", label: "Minimum commitment, stated upfront" },
  { text: "Monthly", label: "Ranking and traffic report in plain English" },
  { to: 100, suffix: "%", label: "HVAC-focused strategy, no generic SEO playbooks" },
];

const features = [
  {
    icon: MapPin,
    title: "Google Business Profile Optimisation",
    description:
      "Setup (or clean-up) and full optimisation, plus a review strategy, since your Google listing is often the first thing a searcher sees.",
  },
  {
    icon: LayoutTemplate,
    title: "Service-Area Landing Pages",
    description:
      "Dedicated pages for each service and town you cover, not one page trying to rank for everything.",
  },
  {
    icon: ClipboardCheck,
    title: "Local Citation Building",
    description:
      "Consistent name, address, and phone details across directories. Inconsistency quietly hurts your rankings.",
  },
  {
    icon: Gauge,
    title: "Technical SEO Audits",
    description:
      "Core Web Vitals fixes and technical health checks, since a slow or broken site undermines everything else.",
  },
  {
    icon: PenLine,
    title: "Ongoing Content Targeting Local Search",
    description:
      "Regular content built around the exact terms your customers search, not generic blog filler.",
  },
  {
    icon: LineChart,
    title: "Monthly Ranking & Traffic Reporting",
    description:
      "A plain-English report on where you rank, what's changed, and what we're doing next.",
  },
];

const timeline = [
  {
    week: "Month 1",
    title: "Technical Audit & Foundations",
    description:
      "We fix technical issues, set up tracking, and lay the groundwork everything else builds on.",
  },
  {
    week: "Month 1–2",
    title: "On-Page + Google Business Profile Setup",
    description:
      "Your service and location pages are optimised, and your Google Business Profile is set up or cleaned up and fully built out.",
  },
  {
    week: "Month 2–3",
    title: "Content & Local Citations",
    description:
      "Ongoing content targeting local search terms, plus citation building across relevant directories.",
  },
  {
    week: "Ongoing",
    title: "Rankings Monitoring & Reporting",
    description:
      "Monthly tracking of rankings and traffic, with adjustments based on what's actually moving the needle.",
  },
];

const relatedServices = services.filter((s) => s.slug !== "seo");

const serviceHrefs = {
  website: "/services/website",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function SeoPage() {
  const { caseStudy } = Route.useLoaderData();
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
                <span className="text-foreground">Local SEO</span>
              </nav>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                HVAC Local SEO
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Own the Map Pack for{" "}
                <span className="text-gradient-cool">Every Town You Cover</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                Local SEO built specifically around how homeowners and businesses search for HVAC
                services, not generic SEO advice recycled from a different industry.
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
                      {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix ?? ""} /> : s.text}
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
              eyebrow="What's Included"
              title={
                <>
                  Built Around <span className="text-gradient-cool">Real Local Search</span>
                </>
              }
              subtitle='Not generic SEO checklist items. Work built around how "AC repair near me" or "Boiler repair near me" searches actually behave.'
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className="h-full">
                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/18 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                      <f.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-lg leading-snug">{f.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </motion.article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Curious what this could look like for your business?{" "}
                <Link to="/contact" className="font-semibold text-primary hover:underline">
                  Book a Free Strategy Call →
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  What Local SEO Looks Like{" "}
                  <span className="text-gradient-cool">Month by Month</span>
                </>
              }
              subtitle="Most clients see meaningful movement within 3 to 6 months. Here's what we're doing along the way."
              align="left"
            />
            <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08} className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {step.week}
                    </p>
                    <h3 className="mt-3 font-display text-base leading-snug">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <ServiceCaseStudies
          title="SEO Case Studies"
          tone="cool"
          item={caseStudy}
          cover="/case-studies/covers/ruzz-local-seo.webp"
          fallback={{
            slug: "ruzz-global-local-seo",
            name: "Ruzz Global",
            badge: "+536% clicks",
            quote: "6x website clicks in 4 weeks",
          }}
          comingSoonTitle="SEO Case Study, Coming Soon"
          comingSoonBody="Our next campaign results will be featured here."
          nextTitle="Become Our Next Case Study"
          nextBody="We're onboarding a small number of HVAC companies this quarter for local SEO, and featuring each one here."
          footerLine="Want results like these for your own business?"
        />

        {/* Pricing teaser */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] px-7 py-8 backdrop-blur-md glow-cool sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/18 blur-[100px]" />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl">
                      SEO Retainer starts at $500/mo
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                      Your exact monthly price is confirmed with you before you commit, with a
                      3-month minimum and no lock-in after that. Full breakdown on the pricing page.
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
              eyebrow="FAQ"
              title={
                <>
                  Questions About <span className="text-gradient-cool">Local SEO</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-12" defaultValue="faq-0">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.question} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base">{f.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Still have questions?{" "}
                <Link to="/contact" className="font-semibold text-primary hover:underline">
                  Ask Us on a Free Call →
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="section-shell border-t border-border">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Explore more"
              title={
                <>
                  Other Ways We Help You <span className="text-gradient-cool">Grow</span>
                </>
              }
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

        <CTASection
          badgeLabel="Free 30-Minute Call"
          title={
            <>
              Ready to Own Your <span className="text-gradient-cool">Local Search Results?</span>
            </>
          }
          description="Book a free strategy call and we'll show you exactly where you stand on Google today, and what it would take to improve it."
          primaryLabel="Book a Free Strategy Call"
          primaryHref="/contact"
          secondaryLabel="See Pricing"
          secondaryHref="/pricing"
          footnote="No sales pitch · No obligation"
        />
      </main>
    </div>
  );
}
