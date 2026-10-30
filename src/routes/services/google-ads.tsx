import { createFileRoute, Link } from "@tanstack/react-router";
import { m as motion } from "motion/react";
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
import { ServiceCaseStudies } from "@/components/site/ServiceCaseStudies";
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

const PAGE_URL = "https://muxair.com/services/google-ads";

const title = "Google Ads Management for HVAC Companies | Muxair";
const description =
  "Reach local homeowners searching for HVAC services with targeted Google Ads campaigns. Muxair focuses on qualified enquiries, booked jobs and efficient ad spend.";

const faqs = [
  {
    question: "What's a typical starting budget?",
    answer:
      "This varies by market and competition. We'll give you a realistic number on the strategy call once we know your service area.",
  },
  {
    question: "Do you charge a management fee on top of ad spend?",
    answer:
      "Yes. Our management fee starts at $400/mo and is separate from your ad spend, which you pay directly to Google. This is standard across the industry, and we're upfront about it before you commit to anything.",
  },
  {
    question: "What's included in the monthly fee, and what costs extra?",
    answer:
      "Included: campaign setup and management, call tracking through Google's call reporting, up to 3 landing pages at setup, and a monthly report. Not included: your ad spend, which you pay directly to Google, and any landing pages beyond the first 3, which we quote before starting. Optional tools like call recording are billed directly by the provider.",
  },
  {
    question: "How is this different from running Google Ads myself?",
    answer:
      "Most self-managed campaigns waste budget on broad keywords and irrelevant clicks. We build around your specific services and service areas, with call tracking from day one, and keep optimising throughout the month, not just at a monthly check-in.",
  },
  {
    question: "Do you manage Meta Ads too, or just Google?",
    answer:
      "Both. Each is its own monthly plan, and many clients add Meta Ads once Google Ads is performing well.",
  },
  {
    question: "How much of my budget goes to Google vs your fee?",
    answer:
      "Your ad spend goes directly to Google, and we never touch it. Our management fee is separate and billed by us, so you always know exactly where your money is going.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "Yes, 3 months. Ads need time to collect data and be optimised, so we ask for a minimum of 3 months. After that, it continues month to month.",
  },
  {
    question: "What if I don't have a website?",
    answer:
      "Ads work best when they send people to a site built to convert. If yours isn't ready, we'd recommend starting with a Foundation or Growth website, or the Complete package, which includes ads, rather than sending paid traffic to a weak site.",
  },
];

export const Route = createFileRoute("/services/google-ads")({
  component: GoogleAdsPage,
  loader: async () => {
    // Loaded on demand so the database client isn't part of every page's JavaScript.
    const { fetchServiceCaseStudy } = await import("@/lib/supabase");
    return { caseStudy: await fetchServiceCaseStudy("google-ads") };
  },
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
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
          ],
          offers: {
            "@type": "Offer",
            name: "Ads Management",
            description:
              "Google or Meta ad management, monthly optimisation. Ad spend billed separately.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 400,
              priceCurrency: "USD",
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://muxair.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://muxair.com/services",
            },
            { "@type": "ListItem", position: 3, name: "Google Ads", item: PAGE_URL },
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

const stats: { to?: number; suffix?: string; unit?: string; text?: string; label: string }[] = [
  { to: 3, suffix: "", unit: "months", label: "Minimum commitment, stated upfront" },
  { text: "Monthly", label: "Plain-English performance report" },
  { to: 100, suffix: "%", label: "Call-tracked campaigns" },
];

const features = [
  {
    icon: Target,
    title: "Campaigns Built Around Your Services",
    description:
      "Ad groups structured by service and service area, not one generic \u201cHVAC\u201d campaign lumping everything together.",
  },
  {
    icon: PhoneCall,
    title: "Call Tracking on Every Campaign",
    description:
      "Every call from your ads is tracked back to the exact keyword and ad that generated it. Included, at no extra cost.",
  },
  {
    icon: ThumbsDown,
    title: "Aggressive Negative Keywords",
    description:
      "We exclude searches like \u201cDIY,\u201d \u201cjobs,\u201d and \u201chow to\u201d upfront, so your budget only goes toward people ready to hire.",
  },
  {
    icon: CalendarClock,
    title: "Seasonal Budget Shifts",
    description:
      "We shift budgets with demand, spending more in your AC and heating peaks instead of a flat amount all year.",
  },
  {
    icon: MapPin,
    title: "Landing Pages Matched to Ad Groups",
    description:
      "We build up to 3 landing pages at setup, each matched to a service and its search intent, never your generic homepage.",
  },
  {
    icon: BarChart3,
    title: "Transparent Monthly Reporting",
    description:
      "A plain-English report on spend, leads, and cost per booked job, not a dashboard full of vanity metrics.",
  },
];

const timeline = [
  {
    week: "Week 1",
    title: "Account & Keyword Build",
    description:
      "We structure your account by service and area, research the exact keywords your customers search, and set up conversion tracking.",
  },
  {
    week: "Week 1–2",
    title: "Landing Pages + Tracking Setup",
    description:
      "Up to 3 landing pages built for your highest-value services, with call tracking wired in from day one.",
  },
  {
    week: "Week 2–3",
    title: "Launch & Early Optimisation",
    description:
      "Campaigns go live. We monitor closely and cut anything wasting budget in the first few weeks.",
  },
  {
    week: "Ongoing",
    title: "Optimisation & Reporting",
    description:
      "Monthly adjustments based on real booked-job data, with a plain-English report every month.",
  },
];

const relatedServices = services.filter((s) => s.slug !== "google-ads");

const serviceHrefs = {
  website: "/services/website",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function GoogleAdsPage() {
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
              <p className="mx-auto mt-5 max-w-[52rem] text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                We run Google Ads campaigns that target seasonal demand and the services you want to
                promote, with a focus on turning ad spend into booked jobs rather than just clicks.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <MagneticButton
                  href="/contact"
                  size="lg"
                  variant="heat"
                  className="w-full justify-center sm:w-auto"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  href="/pricing"
                  variant="ghost"
                  size="lg"
                  className="w-full justify-center sm:w-auto"
                >
                  See Pricing
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-3 rounded-2xl border border-border bg-surface/40 px-4 py-7 backdrop-blur-md sm:gap-4 sm:px-10">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="whitespace-nowrap font-display text-lg font-bold text-foreground min-[400px]:text-xl sm:text-3xl">
                      {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix ?? ""} /> : s.text}
                      {s.unit ? (
                        <span className="ml-1 text-xs font-semibold min-[400px]:text-sm sm:text-xl">
                          {s.unit}
                        </span>
                      ) : null}
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
              subtitle="Not clicks, not impressions. The number that actually matters to your business."
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
                  From Kickoff to Live Campaigns in{" "}
                  <span className="text-gradient-heat">2 to 3 Weeks</span>
                </>
              }
              subtitle="Timing depends on how quickly we get access to your accounts and your approvals."
              align="left"
              className="mx-auto text-center lg:mx-0 lg:text-left"
            />
            <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08} className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-heat">
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
          title="Ads Case Studies"
          tone="heat"
          item={caseStudy}
          comingSoonTitle="Google Ads Case Study, Coming Soon"
          comingSoonBody="Our next campaign results will be featured here."
          nextTitle="Become Our Next Ads Case Study"
          nextBody="We're onboarding a small number of HVAC companies this quarter for Google Ads management, and featuring each one here."
          footerLine="Want results like these for your own business?"
        />

        {/* Pricing teaser */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-heat/30 bg-heat/[0.05] px-7 py-8 backdrop-blur-md glow-heat sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-heat/18 blur-[100px]" />
                <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-left">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl">
                      Google Ads management starts at $400/mo + ad spend
                    </h3>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:mx-0">
                      Ad spend is paid directly to Google, separate from our management fee. Your
                      exact monthly price is confirmed with you before you commit, with a 3-month
                      minimum. Full breakdown on the pricing page.
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
          footnote="No sales pitch · No obligation"
        />
      </main>
    </div>
  );
}
