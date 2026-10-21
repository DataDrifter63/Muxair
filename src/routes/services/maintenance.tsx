import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Gauge,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Timer,
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

const PAGE_URL = "https://muxair.com/services/maintenance";

const title = "HVAC Website Maintenance | Ongoing Support & Security";
const description =
  "Keep your HVAC website fast, secure, and up to date. Monthly maintenance plans with priority support, updates, and monitoring. Cancel anytime.";

const timeline = [
  {
    week: "Week 1",
    title: "Onboarding & Site Audit",
    desc: "We review your current site, get access set up, and flag anything urgent right away.",
  },
  {
    week: "Week 1-2",
    title: "Monitoring Setup",
    desc: "Uptime, security, and Core Web Vitals monitoring is configured and a performance baseline is recorded.",
  },
  {
    week: "Ongoing",
    title: "Regular Maintenance & Updates",
    desc: "Backups, software updates, and small content changes handled on a rolling basis.",
  },
  {
    week: "Monthly",
    title: "Reporting & Review",
    desc: "A plain-English summary of what we did, what we found, and what's next.",
  },
];

const faqs = [
  {
    question: "Is maintenance required after you build my site?",
    answer:
      "Not required, but recommended. Most sites that skip maintenance see slow performance and security issues creep in within a year.",
  },
  {
    question: "What's the difference between maintenance and the 30-day launch warranty?",
    answer:
      "The launch warranty covers fixing anything broken or missed in our own build during the first 30 days. Maintenance is ongoing care after that: monitoring, backups, updates, and support.",
  },
  {
    question: "What happens if my site goes down?",
    answer:
      "Uptime monitoring alerts us as soon as it happens, and we start diagnosing right away. If the cause is on your hosting provider's side, we work with them to get it resolved.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "No. You buy hosting directly from a provider, so the account stays in your name. We'll guide you to a reliable option, then monitor, back up, and maintain your site on it.",
  },
  {
    question: "What's included in the monthly fee, and what costs extra?",
    answer:
      "Included: uptime and security monitoring, regular backups, Core Web Vitals monitoring, software and plugin updates, small content changes like swapping an offer or updating service details, and priority support. Your exact monthly price depends on your site's size and how much ongoing work you want handled, and we confirm it before you commit. Not included: hosting and domain, which you pay directly to the providers, and larger projects like new pages or a redesign, which we quote separately.",
  },
  {
    question: "Do you maintain sites you didn't build?",
    answer:
      "In most cases, yes, after a quick technical review to make sure the site is in a state we're comfortable maintaining.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Maintenance is the one service with no minimum term. Cancel whenever you like.",
  },
];

export const Route = createFileRoute("/services/maintenance")({
  component: MaintenancePage,
  loader: async () => ({ caseStudy: await fetchServiceCaseStudy("maintenance") }),
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
    // Schema taken as-is from the approved service-inner-maintenance.html reference.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Website Maintenance",
          name: "HVAC Website Maintenance",
          description:
            "Ongoing website maintenance for HVAC business websites: uptime and security monitoring, regular backups, software updates, and priority support.",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
          ],
          offers: {
            "@type": "Offer",
            name: "Website Maintenance",
            description: "Monitoring, backups, updates, and priority support.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 79,
              priceCurrency: "USD",
              unitCode: "MON",
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
            { "@type": "ListItem", position: 2, name: "Maintenance", item: PAGE_URL },
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

const stats: {
  to?: number;
  suffix?: string;
  prefix?: string;
  text?: string;
  label: string;
}[] = [
  { to: 79, suffix: "+", prefix: "$", label: "Starting price per month" },
  { to: 0, label: "Minimum term, cancel anytime" },
  { text: "Monthly", label: "Plain-English site health report" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Uptime & Security Monitoring",
    description:
      "We're alerted the moment your site goes down or shows signs of a security issue, not when a customer tells you.",
  },
  {
    icon: RefreshCcw,
    title: "Regular Backups",
    description:
      "Regular backups, so a bad update or attack means a quick restore, not a rebuild from scratch.",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals Monitoring",
    description:
      "We track load speed and performance over time, catching slow creep before it costs you rankings.",
  },
  {
    icon: PackageCheck,
    title: "Software & Plugin Updates",
    description:
      "Kept current and patched, since outdated software is the most common way sites get compromised.",
  },
  {
    icon: Sparkles,
    title: "Seasonal Content Updates",
    description:
      "Small changes like swapping an offer or updating service details, as your business shifts through the year.",
  },
  {
    icon: Timer,
    title: "Priority Support",
    description:
      "Maintenance clients go to the front of the queue, not a generic support ticket system.",
  },
];

const relatedServices = services.filter((s) => s.slug !== "maintenance");

const serviceHrefs = {
  websites: "/services/websites",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

function MaintenancePage() {
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
                <span className="text-foreground">Maintenance</span>
              </nav>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Website Maintenance
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Keep Your Site{" "}
                <span className="text-gradient-cool">Fast, Secure &amp; Up to Date</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A website is never really &ldquo;done.&rdquo; It needs ongoing updates, monitoring,
                and support to keep working for you long after launch, instead of quietly degrading.
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
                      {s.to !== undefined ? (
                        <Counter to={s.to} suffix={s.suffix ?? ""} prefix={s.prefix ?? ""} />
                      ) : (
                        s.text
                      )}
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
                  The Unglamorous Work That{" "}
                  <span className="text-gradient-cool">Keeps Sites Running</span>
                </>
              }
              subtitle="The kind of thing nobody notices when it's working, and everybody notices when it isn't."
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
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-sm font-bold text-primary transition-transform duration-500 group-hover:scale-110">
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
                Want peace of mind your site's actually being watched?{" "}
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
                  Set Up Once, <span className="text-gradient-cool">Watched All Year</span>
                </>
              }
              subtitle="Setup takes about two weeks, then maintenance runs in the background every month."
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
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <ServiceCaseStudies
          title="Maintenance Case Studies"
          tone="cool"
          item={caseStudy}
          comingSoonTitle="Maintenance Case Study, Coming Soon"
          comingSoonBody="Our first maintenance client results will be featured here."
          nextTitle="Become Our Next Case Study"
          nextBody="We're onboarding a small number of HVAC companies this quarter for ongoing maintenance, and featuring each one here."
          footerLine="Want peace of mind like this for your own site?"
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
                      Maintenance starts at $79/mo
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                      No minimum term, cancel anytime. Your exact price depends on your site and how
                      much ongoing work you want handled, and is confirmed before you commit. Full
                      breakdown on the pricing page.
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
                  Questions About <span className="text-gradient-cool">Maintenance</span>
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
          title={
            <>
              Don't Let Your Site <span className="text-gradient-cool">Quietly Fall Behind</span>
            </>
          }
          description="Book a free strategy call and we'll take a look at how your current site is actually holding up."
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
