import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Smartphone,
  LayoutTemplate,
  Gauge,
  PenLine,
  Search,
  MapPin,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import {
  MagneticButton,
  Counter,
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

const PAGE_URL = "https://muxair.com/services/websites";

const title =
  "HVAC Website Design | Custom Sites Built to Convert for Heating & Cooling Companies";
const description =
  "We design and build custom websites exclusively for HVAC businesses. Fast, mobile-first, conversion-optimised, and built to rank on Google.";

const faqs = [
  {
    question: "How long does a new website take?",
    answer:
      "Most sites launch within 30 days of kickoff, depending on how quickly we get your content and approvals back.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Every site is built mobile-first, since the majority of HVAC searches happen on a phone.",
  },
  {
    question: "Do you write the content too?",
    answer:
      "Yes — our in-house content writer handles HVAC-specific copywriting as part of the build. You review and approve before launch.",
  },
  {
    question: "Can I update the site myself after launch?",
    answer:
      "Yes, we include a training session so you're comfortable making basic edits. For anything bigger, our maintenance plans cover ongoing changes.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "You approve the design before any code is written, so this is the stage to request changes — for free. We'd rather get it right before build starts than after.",
  },
];

export const Route = createFileRoute("/services/websites")({
  component: WebsitesPage,
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
    // Schema content taken from service-inner-website.html.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "HVAC Website Design",
          name: "HVAC Website Design",
          description:
            "Custom, mobile-first websites built exclusively for HVAC businesses, optimised to convert and rank on Google.",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          offers: {
            "@type": "Offer",
            name: "Starter Site",
            description:
              "5-page website, mobile-first, local SEO foundations, contact form and click-to-call.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 1500,
              maxPrice: 2500,
              priceCurrency: "GBP",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "Website Design",
              item: PAGE_URL,
            },
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
  { to: 30, suffix: " days", prefix: "", label: "Average time to launch" },
  { to: 300, suffix: "%", prefix: "+", label: "Best organic enquiry increase" },
  { to: 100, suffix: "%", prefix: "", label: "Mobile-first builds" },
];

const features = [
  {
    icon: LayoutTemplate,
    title: "Custom Design for Your Brand",
    description:
      "Not a recycled template — a design built around your actual business, not a generic HVAC theme.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Build",
    description:
      "Most HVAC searches happen on a phone. Every page is designed for mobile first, desktop second.",
  },
  {
    icon: MapPin,
    title: "Service-Area Landing Pages",
    description:
      "Dedicated pages targeting your actual towns and service areas — not one generic \"areas we cover\" list.",
  },
  {
    icon: Gauge,
    title: "Speed-Optimised Build",
    description:
      "Built to pass Core Web Vitals and load fast, since slow sites lose visitors before they even see your offer.",
  },
  {
    icon: PenLine,
    title: "HVAC-Specific Copywriting",
    description:
      "Written by our in-house content writer around how HVAC customers actually search and decide — not filler text.",
  },
  {
    icon: Search,
    title: "Local SEO Foundations Included",
    description:
      "Technical SEO basics and schema markup built in from day one, so you're not starting from zero on Google.",
  },
];

const timeline = [
  {
    week: "Step 1",
    title: "Discovery Call",
    description:
      "A free 30-minute call to learn your business, service area, and goals — no pitch, just an honest assessment.",
  },
  {
    week: "Step 2",
    title: "Strategy & Proposal",
    description:
      "A custom plan with scope, timeline, and fixed-price quote, sent within 48 hours.",
  },
  {
    week: "Step 3",
    title: "Design",
    description:
      "Wireframes and visual design sent for your approval before a single line of code is written.",
  },
  {
    week: "Step 4",
    title: "Build, Launch & Handover",
    description:
      "We build, you review, we launch — plus a training session and 30 days of support included.",
  },
];

const relatedServices = services.filter((s) => s.slug !== "websites");

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
                <span className="text-foreground">Website Design</span>
              </nav>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                HVAC Website Design
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Websites Built to Turn <span className="text-gradient-cool">Visitors Into Booked Jobs</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Fast, mobile-first sites designed specifically for how homeowners and property managers search for and choose an HVAC company — not a recycled template with your logo dropped in.
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
              eyebrow="What's Included"
              title={
                <>
                  Built to <span className="text-gradient-cool">Convert</span>, Not Just Look Good
                </>
              }
              subtitle="A pretty site that doesn't generate calls isn't doing its job. Every element here exists to move a visitor toward booking."
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
              eyebrow="How It Works"
              title={
                <>
                  From Kickoff to <span className="text-gradient-cool">Live Site in 30 Days</span>
                </>
              }
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
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Recent results" title="Website Case Studies" align="left" />
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

            <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0} className="h-full">
                <Link to="/work/$slug" params={{ slug: "coastal-cooling" }}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden border-b border-border bg-surface/60 px-6 text-center text-xs text-muted-foreground">
                      <span>[ Site screenshot / mockup ]</span>
                      <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        4% → 19% booking rate
                      </span>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-90" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base">Coastal Cooling Ltd.</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        “Booking rate climbed from 4% to 19%” — Brighton
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        View Case Study
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <Link to="/work/$slug" params={{ slug: "midlands-hvac-co" }}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden border-b border-border bg-surface/60 px-6 text-center text-xs text-muted-foreground">
                      <span>[ Site screenshot / mockup ]</span>
                      <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        +300% enquiries
                      </span>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-90" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base">Midlands HVAC Co.</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        “300% increase in organic enquiries” — Birmingham
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        View Case Study
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>

              <Reveal delay={0.12} className="h-full">
                <Link
                  to="/contact"
                  className="group flex h-full flex-col items-center justify-center rounded-2xl border border-primary/40 bg-primary/[0.05] p-8 text-center backdrop-blur-md glow-cool"
                >
                  <h3 className="font-display text-lg">Become Our Next Case Study</h3>
                  <p className="mt-2.5 max-w-xs text-sm text-muted-foreground">
                    We're onboarding a small number of HVAC companies this quarter for new website builds — be featured here.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Want results like these for your own business?{" "}
                <Link to="/contact" className="font-semibold text-primary hover:underline">
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
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] px-7 py-8 backdrop-blur-md glow-cool sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/18 blur-[100px]" />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl">Websites start at £1,500</h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                      Fixed price, agreed before work starts. Full package breakdown on the pricing page.
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
                  Questions About <span className="text-gradient-cool">Website Design</span>
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
              Ready for a Website That Actually <span className="text-gradient-cool">Books Jobs?</span>
            </>
          }
          description="Book a free strategy call and we'll show you what's realistically possible for your business — including a live look at your current site."
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

