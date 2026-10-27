import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { MagneticButton, Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Canonical is hardcoded to the Muxair domain per the SEO checklist for new
// pages, rather than the shared SITE_URL constant (which still points at
// the Muxair domain).
const PAGE_URL = "https://muxair.com/pricing";

const title = "HVAC Website Design & Marketing Pricing | Muxair";
const description =
  "Explore Muxair's pricing for HVAC website design, local SEO and digital advertising. Website packages start at $1,200, with clear pricing and no hidden fees.";

const trustStats = [{ display: "$0", label: "Hidden setup fees" }];

const websitePlans = [
  {
    name: "Foundation",
    tone: "cool" as const,
    tagline: "For businesses that need a solid foundation",
    price: "$1,200",
    priceNote: "One-time project cost",
    chooseIf:
      "you're just getting started online and want a professional, working website without paying for pages or features you don't need yet.",
    popular: false,
    ctaLabel: "Get Started",
    features: [
      "5-7 custom-designed pages",
      "Mobile-first, conversion-focused build",
      "Core page copywriting included",
      "Local SEO foundations included (Google Search Console setup, basic on-page SEO)",
      "Contact form + click-to-call button",
      "Live in ~30 days",
      "30-day launch warranty on our build",
    ],
  },
  {
    name: "Growth",
    tone: "heat" as const,
    tagline: "For businesses ready to actually compete online",
    price: "$2,500",
    priceNote: "One-time project cost",
    chooseIf:
      "you already have some traction but your current site isn't pulling its weight, and you're ready to actually compete for local search traffic.",
    popular: true,
    ctaLabel: "Get Started",
    features: [
      "Everything in Foundation",
      "Website live in ~30-45 days",
      "8-12 custom-designed pages",
      "Full HVAC-specific copywriting across every page",
      "Service-area landing pages, each built to convert for its specific town",
      "5 launch blog posts included",
      "Google Analytics, Search Console, and conversion tracking (form submissions and click-to-call clicks)",
    ],
  },
  {
    name: "Complete",
    tone: "cool" as const,
    tagline: "For businesses ready for a complete growth system",
    price: "$5,000",
    priceNote: "One-time build + 3 months of ongoing services included",
    chooseIf:
      "you want SEO and ads running from day one instead of adding them later, and a complete growth system rather than just a new website.",
    popular: false,
    ctaLabel: "Talk to Us",
    features: [
      "Everything in Growth",
      "Website live in ~30-45 days",
      "SEO and Ads begin running shortly after launch, continuing through your 3-month included period and beyond",
      "First 3 months of SEO Retainer included (Google Business Profile setup and optimization, on-page SEO, local citations), then billed monthly at the standard rate",
      "First 3 months of Ads Management included (Google or Meta), then billed monthly at the standard rate",
      "Ad spend billed separately throughout, direct to Google or Meta",
      "Monthly performance reporting",
      "Dedicated point of contact",
    ],
  },
];

const growthPlans = [
  {
    name: "SEO Retainer",
    tone: "cool" as const,
    price: "From $500",
    priceNote: "/mo",
    description:
      "Google Business Profile optimization, on-page SEO, monthly content, and reporting. 3-month minimum commitment.",
    href: "/services/seo",
  },
  {
    name: "Google Ads",
    tone: "heat" as const,
    price: "From $400",
    priceNote: "/mo + ad spend",
    description:
      "Google Ads management with monthly optimization. 3-month minimum commitment. Recommended ad spend varies by market and competition, we'll give you a realistic number on your strategy call.",
    href: "/services/google-ads",
  },
  {
    name: "Meta Ads",
    tone: "heat" as const,
    price: "From $400",
    priceNote: "/mo + ad spend",
    description:
      "Facebook and Instagram ad management with monthly optimization. 3-month minimum commitment. Recommended ad spend varies by market and competition, we'll give you a realistic number on your strategy call.",
    href: "/services/meta-ads",
  },
  {
    name: "Maintenance",
    tone: "cool" as const,
    price: "From $79",
    priceNote: "/mo",
    description:
      "Hosting, security, updates, and priority support. No minimum term, cancel anytime.",
    href: "/services/maintenance",
  },
];

const differentiators = [
  "Fixed price, agreed before work starts",
  "No hidden fees or surprise line items",
  "No lock-in on most services",
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
      "Yes. The Complete package bundles a website with SEO and ad management at a better combined rate than booking each separately. We'll always tell you if bundling saves you money for your situation.",
  },
  {
    question: "What's not included in these prices?",
    answer:
      "Domain registration and any paid stock photography or premium plugins, if needed, are billed at cost. Hosting is paid by you directly to your hosting provider, and we'll guide you to a reliable option. For Google Ads and Meta Ads, your ad spend is paid to the platform and is separate from our management fee. Extra landing pages (beyond the first 3 on Google Ads) and extra ad creative (beyond the first 4 on Meta Ads) are quoted before we start.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "No. You buy hosting directly from a provider, so the account stays in your name. We'll recommend a reliable, fast option for HVAC sites and guide you through getting it set up.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "For larger projects, yes. We can split the balance across milestones instead of a single payment at launch. Ask on your strategy call.",
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://muxair.com" },
            { "@type": "ListItem", position: 2, name: "Pricing", item: PAGE_URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "HVAC Website Design & Digital Marketing",
          provider: { "@type": "ProfessionalService", name: "Muxair" },
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Foundation",
              description:
                "5-7 page website, mobile-first, local SEO foundations, contact form and click-to-call, 30-day launch warranty.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 1200,
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Offer",
              name: "Growth",
              description:
                "8-12 page website, full copywriting, service-area landing pages, 5 launch blog posts, Google Analytics and conversion tracking.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 2500,
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Offer",
              name: "Complete",
              description:
                "Everything in Growth plus 3 months of SEO retainer and ads management included, with monthly performance reporting.",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: 5000,
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Offer",
              name: "SEO Retainer",
              description:
                "Google Business Profile optimization, on-page SEO, monthly content, reporting. 3-month minimum.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 500,
                priceCurrency: "USD",
                unitCode: "MON",
                minPrice: 500,
              },
            },
            {
              "@type": "Offer",
              name: "Google Ads Management",
              description:
                "Google Ads management with monthly optimization. Ad spend billed separately. 3-month minimum.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 400,
                priceCurrency: "USD",
                unitCode: "MON",
                minPrice: 400,
              },
            },
            {
              "@type": "Offer",
              name: "Meta Ads Management",
              description:
                "Facebook and Instagram ad management with monthly optimization. Ad spend billed separately. 3-month minimum.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 400,
                priceCurrency: "USD",
                unitCode: "MON",
                minPrice: 400,
              },
            },
            {
              "@type": "Offer",
              name: "Website Maintenance",
              description: "Monitoring, backups, updates, and priority support. No minimum term.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 79,
                priceCurrency: "USD",
                unitCode: "MON",
                minPrice: 79,
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
                Every price on this page is a real starting point, not a bait figure. What you pay
                depends on your business, but it stays within the range shown here, never a surprise
                jump to something else entirely.
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
                  See Our Services
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-14 grid max-w-xs grid-cols-1 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:px-10">
                {trustStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {s.display}
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
              subtitle="A real starting price, and a fixed final quote agreed with you before any work begins. Never a surprise number after you've committed."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {websitePlans.map((plan, i) => {
                const c = toneClasses(plan.tone);
                const prem = plan.name === "Complete";
                return (
                  <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-md sm:p-8 ${
                        prem
                          ? "border-heat bg-heat text-white shadow-[0_30px_70px_-20px_rgba(255,107,53,0.65)] lg:-my-3 lg:py-10"
                          : plan.popular
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

                      {prem ? (
                        <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                          <Sparkles className="h-3 w-3" />
                          Best Value
                        </span>
                      ) : null}

                      <h3 className="font-display text-xl">{plan.name}</h3>
                      <p
                        className={`mt-2 min-h-[2.5rem] text-sm leading-relaxed ${prem ? "text-white/90" : "text-muted-foreground"}`}
                      >
                        {plan.tagline}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span
                          className={`text-sm font-medium ${prem ? "text-white/90" : "text-muted-foreground"}`}
                        >
                          From
                        </span>
                        <span
                          className={`font-display text-3xl font-bold sm:text-4xl ${prem ? "text-white" : "text-foreground"}`}
                        >
                          {plan.price}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-xs ${prem ? "text-white/90" : "text-muted-foreground"}`}
                      >
                        {plan.priceNote}
                      </p>

                      <p
                        className={`mt-5 text-sm leading-relaxed ${prem ? "text-white/90" : "text-muted-foreground"}`}
                      >
                        <span
                          className={`font-semibold ${prem ? "text-white" : "text-foreground"}`}
                        >
                          Choose this if:
                        </span>{" "}
                        {plan.chooseIf}
                      </p>

                      <ul className="mt-7 flex-1 space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <Check
                              className={`mt-0.5 h-4 w-4 flex-none ${prem ? "text-white" : c.text}`}
                              strokeWidth={2.5}
                            />
                            <span className={prem ? "text-white" : "text-foreground/90"}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <MagneticButton
                          href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                          variant={
                            prem
                              ? "light"
                              : plan.popular
                                ? plan.tone === "cool"
                                  ? "cool"
                                  : "heat"
                                : "ghost"
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

            <Reveal delay={0.2}>
              <p className="mx-auto mt-10 max-w-3xl text-balance text-center text-sm leading-relaxed text-muted-foreground">
                Whichever package you choose, you get proper contact and communication throughout.
                You always know where your project stands.
              </p>
            </Reveal>
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

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        className={`group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
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
              <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-xs text-muted-foreground">
                Ad spend is paid directly to Google or Meta and is separate from our monthly
                management fee. Prices shown in USD. Clients in the UK or Canada can be invoiced in
                their local currency, just mention it on your call.
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
                  and we'll recommend a starting point. No pressure.
                </p>

                <div className="relative mt-9 grid justify-center gap-y-4 border-t border-border/70 pt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-5">
                  {differentiators.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
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

        <RelatedLinks exclude="/pricing" />
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
          footnote="No sales pitch · No obligation"
        />
      </main>
    </div>
  );
}
