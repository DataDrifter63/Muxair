// 







import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
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
import { Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-data";

const title = "HVAC Website & Marketing Pricing | Ductwork Studio";
const description =
  "Transparent pricing for HVAC website design, local SEO, Google Ads, Meta Ads and website maintenance. No hidden fees, no lock-in contracts on most plans.";

export const Route = createFileRoute("/pricing/")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/pricing` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pricing` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
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

const trustStats = [
  { to: 0, prefix: "", suffix: "£0", label: "Hidden setup fees" },
  { to: 2, suffix: "", label: "Revision rounds included" },
  { to: 1, suffix: " day", label: "Average response time" },
];

const websitePlans = [
  {
    name: "Starter Site",
    tone: "cool" as const,
    price: "£1,500",
    priceNote: "one-time",
    tagline: "For a single-location business that needs a fast, credible online home.",
    popular: false,
    features: [
      { label: "Up to 5 pages", included: true },
      { label: "Mobile-first custom design", included: true },
      { label: "Quote form & click-to-call setup", included: true },
      { label: "Core Web Vitals optimization", included: true },
      { label: "Service-area landing pages", included: false },
      { label: "Blog / content setup", included: false },
    ],
  },
  {
    name: "Growth Site",
    tone: "heat" as const,
    price: "£2,900",
    priceNote: "one-time",
    tagline: "For companies actively covering multiple towns and wanting to rank locally.",
    popular: true,
    features: [
      { label: "Up to 12 pages", included: true },
      { label: "Mobile-first custom design", included: true },
      { label: "Quote form & click-to-call setup", included: true },
      { label: "Core Web Vitals optimization", included: true },
      { label: "Service-area landing pages (up to 8)", included: true },
      { label: "Blog / content setup", included: true },
    ],
  },
  {
    name: "Pro / Multi-Location",
    tone: "cool" as const,
    price: "From £4,500",
    priceNote: "one-time",
    tagline: "For multi-branch or franchise-style HVAC businesses with complex needs.",
    popular: false,
    features: [
      { label: "Unlimited pages", included: true },
      { label: "Mobile-first custom design", included: true },
      { label: "Quote form & click-to-call setup", included: true },
      { label: "Core Web Vitals optimization", included: true },
      { label: "Unlimited service-area pages", included: true },
      { label: "Blog / content setup", included: true },
    ],
  },
];

const growthPlans = [
  {
    name: "Local SEO",
    tone: "cool" as const,
    price: "From £650",
    priceNote: "/month",
    description: "Google Business optimization, local content and citation building.",
  },
  {
    name: "Google Ads Management",
    tone: "heat" as const,
    price: "From £450",
    priceNote: "/month + ad spend",
    description: "Campaign build, ongoing optimization and call-tracked reporting.",
  },
  {
    name: "Meta Ads Management",
    tone: "cool" as const,
    price: "From £400",
    priceNote: "/month + ad spend",
    description: "Offer-led Facebook & Instagram campaigns for installs and upgrades.",
  },
  {
    name: "Website Maintenance",
    tone: "heat" as const,
    price: "From £120",
    priceNote: "/month",
    description: "Updates, monitoring, backups and small edits — hands-off for you.",
  },
];

const faqs = [
  {
    question: "Is ad spend included in the management fee?",
    answer:
      "No — the management fee covers our strategy, setup and optimization work. Your ad spend goes directly to Google or Meta, separately, so you always know exactly where your budget is going.",
  },
  {
    question: "Are there long-term contracts?",
    answer:
      "Website builds are a one-time project fee. Ongoing plans (SEO, ads, maintenance) run month-to-month with no lock-in — we'd rather earn your business every month than trap you in a contract.",
  },
  {
    question: "What if my business needs something custom?",
    answer:
      "These packages cover most HVAC businesses, but multi-location groups, franchises or unusual scopes often need a tailored quote. Book a free strategy call and we'll put together a plan specific to you.",
  },
  {
    question: "Do you offer bundle discounts?",
    answer:
      "Yes. Most clients combine a website build with an ongoing SEO or ads plan, and we offer preferential pricing when services are bundled together — ask on your discovery call.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Bank transfer and card payments, with website projects typically split into a deposit and a completion payment, and monthly plans billed automatically at the start of each cycle.",
  },
];

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
                Simple, Transparent{" "}
                <span className="text-gradient-cool">Pricing</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                No vague "get a quote" forms and no hidden fees. Here's exactly what our website
                packages and ongoing growth plans cost — built specifically for HVAC companies.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost" size="lg">
                  Compare Services
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:px-10">
                {trustStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {s.to === 0 ? s.suffix : <Counter to={s.to} suffix={s.suffix} />}
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
              eyebrow="Website packages"
              title={
                <>
                  Pick the Build That <span className="text-gradient-cool">Fits Your Business</span>
                </>
              }
              subtitle="A one-time project fee — the site is yours to keep, with no monthly platform fees attached."
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
                          Most popular
                        </span>
                      ) : null}

                      <h3 className="font-display text-xl">{plan.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {plan.tagline}
                      </p>

                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                          {plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
                      </div>

                      <ul className="mt-7 flex-1 space-y-3">
                        {plan.features.map((f) => (
                          <li key={f.label} className="flex items-start gap-2.5 text-sm">
                            {f.included ? (
                              <Check className={`mt-0.5 h-4 w-4 flex-none ${c.text}`} strokeWidth={2.5} />
                            ) : (
                              <X className="mt-0.5 h-4 w-4 flex-none text-muted-foreground/50" strokeWidth={2.5} />
                            )}
                            <span
                              className={f.included ? "text-foreground/90" : "text-muted-foreground/60"}
                            >
                              {f.label}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <MagneticButton
                          href="/contact"
                          variant={plan.popular ? (plan.tone === "cool" ? "cool" : "heat") : "ghost"}
                          className="w-full justify-center"
                        >
                          Get Started
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

        {/* Ongoing growth plans */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Ongoing plans"
              title={
                <>
                  Keep the Leads <span className="text-gradient-cool">Coming In</span>
                </>
              }
              subtitle="Month-to-month growth plans, run alongside your new site or your existing one. No lock-in contracts."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {growthPlans.map((plan, i) => {
                const c = toneClasses(plan.tone);
                return (
                  <Reveal key={plan.name} delay={i * 0.06} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md transition-colors hover:border-border/80">
                      <div
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.via} to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <h3 className="font-display text-base leading-snug">{plan.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="font-display text-2xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground">{plan.priceNote}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] px-7 py-8 text-center backdrop-blur-md sm:px-10">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/18 blur-[100px]" />
                <p className="relative text-sm text-muted-foreground">
                  Bundling a website with an ongoing plan? Most clients save when services are
                  combined —{" "}
                  <Link to="/contact" className="font-semibold text-primary hover:underline">
                    ask us for a bundled quote
                  </Link>
                  .
                </p>
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
                  Questions About <span className="text-gradient-cool">Pricing</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-12">
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

        <CTASection />
      </main>
    </div>
  );
}
