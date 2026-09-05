import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import {
  MagneticButton,
  Reveal,
  SectionHeading,
  TechBackdrop,
  Counter,
} from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Canonical is hardcoded to the Muxair domain per the SEO checklist for new
// pages, rather than the shared SITE_URL constant (which still points at
// the old Ductwork Studio domain used elsewhere in the codebase).
const PAGE_URL = "https://muxair.com/pricing";

const title = "HVAC Website & Marketing Pricing | Transparent Packages, No Hidden Fees";
const description =
  "See exactly what our HVAC website, SEO, and ads packages cost — starting at £1,500. No hidden fees, no surprise quotes.";

const trustStats = [
  { to: 0, suffix: "", display: "£0", label: "Hidden setup fees" },
  { to: 2, suffix: "", display: "", label: "Revision rounds included" },
  { to: 1, suffix: " day", display: "", label: "Average response time" },
];

const websitePlans = [
  {
    name: "Starter Site",
    tone: "cool" as const,
    tagline: "For businesses that need a solid foundation",
    price: "£1,500",
    priceSuffix: "–£2,500",
    priceNote: "One-time project cost",
    popular: false,
    ctaLabel: "Get Started",
    features: [
      "5 custom-designed pages",
      "Mobile-first, fast-loading build",
      "Local SEO foundations included",
      "Contact form + click-to-call button",
      "Live in ~30 days",
    ],
  },
  {
    name: "Growth Site",
    tone: "heat" as const,
    tagline: "For businesses ready to actually compete online",
    price: "£3,000",
    priceSuffix: "–£5,000",
    priceNote: "One-time project cost",
    popular: true,
    ctaLabel: "Get Started",
    features: [
      "Everything in Starter Site",
      "8–12 custom-designed pages",
      "Full HVAC-specific copywriting",
      "Blog setup for ongoing content",
      "Google Analytics + conversion tracking",
      "CRO-focused layout, built to convert",
    ],
  },
  {
    name: "Full Digital",
    tone: "cool" as const,
    tagline: "For businesses ready for a complete growth system",
    price: "£5,000",
    priceSuffix: "+",
    priceNote: "One-time build + ongoing services below",
    popular: false,
    ctaLabel: "Talk to Us",
    features: [
      "Everything in Growth Site",
      "SEO retainer included",
      "Ad management included (Google or Meta)",
      "Monthly performance reporting",
      "Dedicated point of contact",
    ],
  },
];

const growthPlans = [
  {
    name: "SEO Retainer",
    tone: "cool" as const,
    price: "From £500",
    priceNote: "/mo",
    description:
      "Google Business Profile optimisation, on-page SEO, monthly content, and reporting.",
    href: "/services/seo",
  },
  {
    name: "Ads Management",
    tone: "heat" as const,
    price: "From £400",
    priceNote: "/mo + ad spend",
    description: "Google or Meta ad management with monthly optimisation.",
    href: "/services/google-ads",
  },
  {
    name: "Maintenance",
    tone: "cool" as const,
    price: "£79",
    priceNote: "–£199/mo",
    description: "Hosting, security, updates, and priority support.",
    href: "/services/maintenance",
  },
];

const differentiators = [
  "Fixed price, agreed before work starts",
  "No hidden fees or surprise line items",
  "No lock-in on most services",
  "One point of contact for every project",
];

const faqs = [
  {
    question: "Do you require a deposit?",
    answer:
      "Yes, typically 50% upfront to begin work, with the balance due at launch. This is laid out clearly in your proposal before you commit to anything.",
  },
  {
    question: "Can I combine services for a better rate?",
    answer:
      "Yes — Full Digital bundles a website with SEO and ad management at a better combined rate than booking each separately. We'll always tell you if bundling saves you money for your situation.",
  },
  {
    question: "What's not included in these prices?",
    answer:
      "Domain registration and any paid stock photography or premium plugins, if needed, are billed at cost. For Ads Management, your actual ad spend to Google or Meta is separate from our management fee.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "For larger projects, yes — we can split the balance across milestones instead of a single payment at launch. Ask on your strategy call.",
  },
  {
    question: "Are monthly plans a long-term contract?",
    answer:
      "No lock-in on most services. SEO and Ads Management work best with a minimum 3-month commitment since results take time to show, but Maintenance is cancel-anytime.",
  },
];

export const Route = createFileRoute("/pricing/")({
  component: PricingPage,
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
    // Schema taken as-is from the approved pricing-page.html reference —
    // Service + per-package Offers, plus the FAQPage entity.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "HVAC Website Design & Digital Marketing",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          offers: [
            {
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
            {
              "@type": "Offer",
              name: "Growth Site",
              description:
                "8-12 page website, full copywriting, blog setup, Google Analytics, CRO-focused layout.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 3000,
                maxPrice: 5000,
                priceCurrency: "GBP",
              },
            },
            {
              "@type": "Offer",
              name: "Full Digital",
              description: "Website plus SEO retainer and ad management, with monthly reporting.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 5000,
                priceCurrency: "GBP",
              },
            },
            {
              "@type": "Offer",
              name: "SEO Retainer",
              description:
                "Google Business Profile optimisation, on-page SEO, monthly content, reporting.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 500,
                priceCurrency: "GBP",
                unitCode: "MON",
                minPrice: 500,
              },
            },
            {
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
            {
              "@type": "Offer",
              name: "Website Maintenance",
              description: "Hosting, security, updates, priority support.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 79,
                maxPrice: 199,
                priceCurrency: "GBP",
                unitCode: "MON",
              },
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

function toneClasses(tone: "cool" | "heat") {
  return {
    border: tone === "cool" ? "border-primary/30" : "border-heat/30",
    bg: tone === "cool" ? "bg-primary/10" : "bg-heat/10",
    text: tone === "cool" ? "text-primary" : "text-heat",
    ring: tone === "cool" ? "ring-primary/40" : "ring-heat/40",
    via: tone === "cool" ? "via-primary/70" : "via-heat/70",
  };
}

function PricingPage() {
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
                Pricing
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Straightforward Pricing for HVAC{" "}
                <span className="text-gradient-cool">Websites &amp; Marketing</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every price on this page is what you'll actually pay. No &ldquo;request a
                quote&rdquo; games, no surprise line items after you've signed.
              </p>
              <span className="mx-auto mt-6 inline-flex max-w-xl items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-foreground">
                Most agencies hide their pricing. We don't think that builds trust — so here it is.
              </span>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Get a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost" size="lg">
                  Compare Services
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:px-10">
                {trustStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {s.display ? s.display : <Counter to={s.to} suffix={s.suffix} />}
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

        {/* Website packages */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="One-Time Projects"
              title="Website Packages"
              subtitle="A fixed price agreed before work starts — not a “starting from” figure that grows once you're committed."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {websitePlans.map((plan, i) => {
                const c = toneClasses(plan.tone);
                return (
                  <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-md sm:p-8 ${
                        plan.popular
                          ? `${c.border} bg-background/80 ring-1 ${c.ring} glow-cool`
                          : "border-border bg-background/60"
                      }`}
                    >
                      {plan.popular ? (
                        <span
                          className={`absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border ${c.border} ${c.bg} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${c.text}`}
                        >
                          <Sparkles className="h-3 w-3" />
                          Most Chosen
                        </span>
                      ) : null}

                      <h3 className="font-display text-xl">{plan.name}</h3>
                      <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
                        {plan.tagline}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                          {plan.price}
                        </span>
                        <span className="text-lg font-semibold text-muted-foreground">
                          {plan.priceSuffix}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{plan.priceNote}</p>

                      <ul className="mt-7 flex-1 space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <Check
                              className={`mt-0.5 h-4 w-4 flex-none ${c.text}`}
                              strokeWidth={2.5}
                            />
                            <span className="text-foreground/90">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <MagneticButton
                          href="/contact"
                          variant={
                            plan.popular ? (plan.tone === "cool" ? "cool" : "heat") : "ghost"
                          }
                          className="w-full justify-center"
                        >
                          {plan.ctaLabel}
                          <ArrowRight className="h-4 w-4" />
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ongoing services + not sure what fits / differentiators */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Ongoing Services"
              title="Monthly Plans"
              subtitle="Can be booked on their own, or added to any website package above."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {growthPlans.map((plan, i) => {
                const c = toneClasses(plan.tone);
                return (
                  <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md transition-colors hover:border-border/80">
                      <div
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.via} to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <h3 className="font-display text-base leading-snug">{plan.name}</h3>
                      <div
                        className={`mt-3 flex items-baseline gap-1.5 font-display text-2xl font-bold ${c.text}`}
                      >
                        {plan.price}
                        <span className="text-xs font-medium text-muted-foreground">
                          {plan.priceNote}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {plan.description}
                      </p>
                      <Link
                        to={plan.href}
                        className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted-foreground">
                Ad spend is paid directly to Google or Meta and is separate from our monthly
                management fee.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="relative mt-14 overflow-hidden rounded-2xl border border-primary/25 bg-primary/[0.04] px-6 py-10 backdrop-blur-md sm:px-10">
                <div
                  className="pointer-events-none absolute inset-0 grid-tech opacity-15"
                  aria-hidden
                />
                <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />

                <p className="relative text-center text-base leading-relaxed text-foreground/90">
                  Not sure which package fits?{" "}
                  <Link to="/contact" className="font-semibold text-primary hover:underline">
                    Book a free call
                  </Link>{" "}
                  and we'll recommend a starting point — no pressure.
                </p>

                <div className="relative mt-9 grid gap-6 border-t border-border/70 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                  {differentiators.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <p className="text-sm leading-snug text-foreground/90">{item}</p>
                    </div>
                  ))}
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
                  Questions About <span className="text-gradient-cool">Pricing</span>
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
          </div>
        </section>

        <CTASection
          badgeLabel="Free 30-Minute Call"
          title={
            <>
              Still Not Sure What You <span className="text-gradient-cool">Need?</span>
            </>
          }
          description="Book a free strategy call and we'll recommend a starting point based on your actual business, not the biggest package we sell."
          primaryLabel="Get a Free Strategy Call"
          primaryHref="/contact"
          footnote="We reply within 4 hours · No obligation"
        />
      </main>
    </div>
  );
}
