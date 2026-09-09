import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  MapPin,
  PhoneCall,
  Target,
  ThumbsDown,
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
import work3 from "@/assets/work-3.jpg";
import { services } from "@/lib/site-data";

const PAGE_URL = "https://muxair.com/services/google-ads";

const title = "Google Ads Management for HVAC Companies | More Enquiries, Less Wasted Spend";
const description =
  "We manage Google Ads campaigns exclusively for HVAC businesses. Targeted, seasonal, and optimised to get you more booked jobs at the lowest cost per lead.";

const faqs = [
  {
    question: "What's a typical starting budget?",
    answer:
      "This varies by service area competition — we'll give you a realistic number on the strategy call once we know your market.",
  },
  {
    question: "Do you charge a management fee on top of ad spend?",
    answer:
      "Yes, this is standard across the industry and we're upfront about the fee structure before you commit to anything.",
  },
  {
    question: "How is this different from running Google Ads myself?",
    answer:
      "Most self-managed campaigns waste budget on broad keywords and irrelevant clicks. We build around your specific services, service areas, and call tracking from day one — and manage it daily rather than checking in once a month.",
  },
];

export const Route = createFileRoute("/services/google-ads")({
  component: GoogleAdsPage,
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
    // Schema taken as-is from the approved service-inner-google-ads.html reference.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Google Ads Management",
          name: "Google Ads Management for HVAC Companies",
          description:
            "Google Ads campaigns built around seasonal demand spikes, service-specific keywords, and cost per booked job.",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          offers: {
            "@type": "Offer",
            name: "Ads Management",
            description:
              "Google or Meta ad management, monthly optimisation. Ad spend billed separately.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 400,
              priceCurrency: "GBP",
              unitCode: "MON",
              minPrice: 400,
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
            { "@type": "ListItem", position: 2, name: "Google Ads", item: PAGE_URL },
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

const stats = [
  { to: 9, suffix: " days", prefix: "", label: "Avg. time to first lead" },
  { to: 35, suffix: "%", prefix: "", label: "Avg. reduction in wasted spend" },
  { to: 100, suffix: "%", prefix: "", label: "Call-tracked campaigns" },
];

const features = [
  {
    icon: Target,
    title: "Campaigns Built Around Your Services",
    description:
      'Ad groups structured by service and service area — not one generic "HVAC" campaign lumping everything together.',
  },
  {
    icon: PhoneCall,
    title: "Call Tracking on Every Campaign",
    description:
      "Every lead and call is tracked back to the exact keyword and ad that generated it — no guessing what's working.",
  },
  {
    icon: ThumbsDown,
    title: "Aggressive Negative Keywords",
    description:
      'We exclude searches like "DIY," "jobs," and "how to" upfront, so budget only goes toward people ready to hire.',
  },
  {
    icon: CalendarClock,
    title: "Seasonal Budget Shifts",
    description:
      "Budgets shift automatically around your AC season versus your boiler season, instead of a flat spend all year.",
  },
  {
    icon: MapPin,
    title: "Landing Pages Matched to Ad Groups",
    description:
      "Each ad group sends traffic to a page built for that exact search intent — never your generic homepage.",
  },
  {
    icon: BarChart3,
    title: "Transparent Monthly Reporting",
    description:
      "A plain-English report on spend, leads, and cost-per-booked-job — not a dashboard full of vanity metrics.",
  },
];

const timeline = [
  { week: "Week 1", title: "Account & Keyword Build" },
  { week: "Week 1–2", title: "Landing Pages + Tracking Setup" },
  { week: "Week 2–3", title: "Launch & Early Optimisation" },
  { week: "Ongoing", title: "Ongoing Optimisation & Reporting" },
];

const relatedServices = services.filter((s) => s.slug !== "google-ads");

const serviceHrefs = {
  websites: "/services/websites",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function GoogleAdsPage() {
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
                <span className="text-foreground">Google Ads</span>
              </nav>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-heat">
                <span className="h-1.5 w-1.5 rounded-full bg-heat" />
                Google Ads Management
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Google Ads Built for <span className="text-gradient-heat">Booked Jobs</span>, Not
                Clicks
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                We manage Google Ads campaigns built around seasonal demand spikes, service-specific
                keywords, and — most importantly — cost per booked job, not vanity click metrics.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg" variant="heat">
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
                      <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
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
                  Ads Built Around <span className="text-gradient-heat">Cost Per Booked Job</span>
                </>
              }
              subtitle="Not clicks, not impressions — the number that actually matters to your business."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className="h-full">
                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heat/70 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-heat/18 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-heat/30 bg-heat/10 text-heat transition-transform duration-500 group-hover:scale-110">
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
                <Link to="/contact" className="font-semibold text-heat hover:underline">
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
                  From Launch to Leads in <span className="text-gradient-heat">Under 2 Weeks</span>
                </>
              }
              align="left"
            />
            <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08} className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-heat">
                      {step.week}
                    </p>
                    <h3 className="mt-3 font-display text-base leading-snug">{step.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Recent results" title="Ads Case Studies" align="left" />
              <Reveal delay={0.1}>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-heat"
                >
                  See all work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0} className="h-full">
                <Link to="/work/$slug" params={{ slug: "london-ac-installer" }}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-heat/40"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={work3}
                        alt="Google Ads results preview for London AC Installer"
                        width={1200}
                        height={800}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-heat/40 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-heat">
                        40 quotes/30d
                      </span>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base">London AC Installer</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        &ldquo;40 quote requests in 30 days&rdquo; — London
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-heat">
                        View Case Study
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <Link
                  to="/work"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-heat/40"
                >
                  <div className="flex aspect-[3/2] items-center justify-center bg-surface/60 text-center text-xs text-muted-foreground">
                    Case study in progress
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base">Google Ads case study coming soon</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      We're onboarding HVAC companies for Google Ads management this quarter.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-heat">
                      View All Work
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.12} className="h-full">
                <Link
                  to="/contact"
                  className="group flex h-full flex-col items-center justify-center rounded-2xl border border-heat/40 bg-heat/[0.05] p-8 text-center backdrop-blur-md glow-heat"
                >
                  <h3 className="font-display text-lg">Become Our Next Ads Case Study</h3>
                  <p className="mt-2.5 max-w-xs text-sm text-muted-foreground">
                    We're onboarding a small number of HVAC companies this quarter for Google Ads
                    management — be featured here.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-heat">
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Want results like these for your own business?{" "}
                <Link to="/contact" className="font-semibold text-heat hover:underline">
                  Book a Free Strategy Call →
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-heat/30 bg-heat/[0.05] px-7 py-8 backdrop-blur-md glow-heat sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-heat/18 blur-[100px]" />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl">
                      Ads Management starts at £400/mo + ad spend
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                      Ad spend is paid directly to Google, separate from our management fee. Full
                      breakdown on the pricing page.
                    </p>
                  </div>
                  <MagneticButton href="/pricing" variant="heat" className="flex-none">
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
                  Questions About <span className="text-gradient-heat">Google Ads</span>
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
                <Link to="/contact" className="font-semibold text-heat hover:underline">
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
              Ready for Leads That Actually{" "}
              <span className="text-gradient-heat">Turn Into Jobs?</span>
            </>
          }
          description="Book a free strategy call and we'll show you exactly what a well-structured Google Ads campaign could realistically look like for your service area."
          primaryLabel="Book a Free Strategy Call"
          primaryHref="/contact"
          secondaryLabel="See Pricing"
          secondaryHref="/pricing"
          footnote="We reply within 4 hours · No obligation"
        />
      </main>
    </div>
  );
}
