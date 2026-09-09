import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
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
import { SITE_URL } from "@/lib/site-data";

// Per the site's per-page SEO checklist for /process.
const title = "How We Work | Our 5-Step Process for HVAC Website Projects";
const description =
  "From discovery call to live site, here's exactly how we work with HVAC companies. Clear stages, clear timelines, zero surprises.";

export const Route = createFileRoute("/process/")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/process` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/process` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Process", item: `${SITE_URL}/process` },
          ],
        }),
      },
      // HowTo + FAQPage schema — kept exactly as specified in the process-page blueprint.
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How Muxair Builds an HVAC Website: Our 5-Step Process",
          description:
            "From discovery call to live site, here's exactly how we work with HVAC companies.",
          totalTime: "P30D",
          step: [
            {
              "@type": "HowToStep",
              name: "Discovery Call",
              text: "A free 30-minute call to learn your business, service area, seasonal peaks, and goals.",
            },
            {
              "@type": "HowToStep",
              name: "Strategy & Proposal",
              text: "A custom plan with scope, timeline, and fixed-price quote sent within 48 hours.",
            },
            {
              "@type": "HowToStep",
              name: "Design",
              text: "Wireframes and visual design sent for your approval before a single line of code is written.",
            },
            {
              "@type": "HowToStep",
              name: "Build & Content",
              text: "We build the site and write HVAC-specific copy. You review and approve at each stage.",
            },
            {
              "@type": "HowToStep",
              name: "Launch & Handover",
              text: "Live site, a training session, and 30 days of post-launch support included.",
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
  { to: 5, suffix: "", label: "Clear stages" },
  { to: 30, suffix: " days", label: "Average time to launch" },
  { to: 48, suffix: " hrs", label: "Proposal turnaround" },
  { to: 30, suffix: " days", label: "Post-launch support included" },
];

const steps = [
  {
    number: "1",
    title: "Discovery Call",
    tag: "30 min · Free",
    tone: "cool" as const,
    description:
      "We learn your business properly before recommending anything — your service area, your seasonal peaks, what's working, and what isn't.",
    checklist: [
      "Live look at your current website and Google presence",
      "Understand your busiest and slowest months",
      "No pitch — just an honest assessment",
    ],
  },
  {
    number: "2",
    title: "Strategy & Proposal",
    tag: "Within 48 hours",
    tone: "heat" as const,
    description:
      "We send a custom plan built around what we learned on the call — not a generic package.",
    checklist: [
      "Clear scope of exactly what's included",
      "A realistic timeline, not an optimistic one",
      "Fixed-price quote — no hourly surprises later",
    ],
  },
  {
    number: "3",
    title: "Design",
    tag: "Your approval required",
    tone: "cool" as const,
    description:
      "Wireframes and visual design come to you for sign-off before a single line of code gets written.",
    checklist: [
      "See the full layout and look before build starts",
      "Request changes here for free — this is the cheapest stage to adjust",
      "No code committed until you're happy with the direction",
    ],
  },
  {
    number: "4",
    title: "Build & Content",
    tag: "You review as we go",
    tone: "heat" as const,
    description:
      "We build the approved design and write HVAC-specific copy for every page — not filler text waiting for you to rewrite it.",
    checklist: [
      "Content written by our in-house HVAC copywriter",
      "Staging link so you can watch progress, not just wait",
      "You review and approve before we move to launch",
    ],
  },
  {
    number: "5",
    title: "Launch & Handover",
    tag: "Live + supported",
    tone: "cool" as const,
    description:
      "Your site goes live, and we make sure you're never stuck figuring it out alone afterward.",
    checklist: [
      "A training session so you can make basic edits yourself",
      "30 days of post-launch support included, no extra cost",
      "Direct line to the person who built it — not a support ticket",
    ],
  },
];

const proof = {
  quote:
    "They kept us updated at every stage — no surprises, no chasing for updates. We knew exactly where things stood the whole way through.",
  highlight: "no surprises, no chasing for updates",
  name: "Emily Marsh",
  role: "Home Counties Heating",
};

const differentiators = [
  "Fixed price, agreed before work starts",
  "You approve design before any code is written",
  "30 days of post-launch support included",
  "One point of contact from call to launch",
];

const faqs = [
  {
    question: "What if I don't have my content or photos ready?",
    answer:
      "That's normal — our content writer handles HVAC-specific copy for you, and we can work with stock or placeholder imagery until you send real photos, then swap them in before launch.",
  },
  {
    question: "Can I request changes during the build?",
    answer:
      "Yes. You approve design before any code is written, so major changes at that stage are expected and free. Changes after build has started are still possible, just scoped so they don't push your launch date without a conversation first.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get a training session so you're comfortable making basic edits, plus 30 days of post-launch support included at no extra cost for any bugs or tweaks.",
  },
  {
    question: "What if my project needs more than 30 days?",
    answer:
      "30 days is our average for a standard site. Larger builds (e-commerce, multi-location sites) get a realistic timeline in your proposal — we'd rather tell you upfront than miss a promised date.",
  },
];

function ProcessPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scaleY = useTransform(lineProgress, [0, 1], [0, 1]);

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
                Our Process
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                From Discovery Call to <span className="text-gradient-cool">Live Site</span> in 30
                Days
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Clear stages, clear timelines, zero surprises. Here's exactly how we work with HVAC
                companies, from the first call to the day your site goes live.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Get a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/work" variant="ghost" size="lg">
                  See Our Work
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-7 backdrop-blur-md sm:grid-cols-4 sm:px-10">
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

        {/* Timeline */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="How It Works"
              title={
                <>
                  Five Steps. <span className="text-gradient-cool">No Guesswork.</span>
                </>
              }
              subtitle="Every project follows the same structure — so you always know what's happening and what's next."
            />

            <div ref={timelineRef} className="relative mt-14">
              <div
                className="absolute left-7 top-6 hidden h-[calc(100%-3rem)] w-px bg-border/60 sm:block lg:left-8"
                aria-hidden
              />
              <motion.div
                className="absolute left-7 top-6 hidden h-[calc(100%-3rem)] w-px origin-top bg-gradient-to-b from-primary via-primary/70 to-heat/60 sm:block lg:left-8"
                style={{ scaleY }}
                aria-hidden
              />

              <div className="space-y-5">
                {steps.map((step, i) => (
                  <Reveal key={step.number} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 backdrop-blur-md sm:flex-row sm:items-start sm:gap-7 sm:p-7 ${
                        step.tone === "cool"
                          ? "border-primary/25 bg-primary/[0.04] hover:border-primary/45"
                          : "border-heat/25 bg-heat/[0.04] hover:border-heat/45"
                      }`}
                    >
                      <div
                        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-100 ${
                          step.tone === "cool" ? "bg-primary/15" : "bg-heat/15"
                        }`}
                      />

                      <span
                        className={`relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-xl border font-display text-xl font-bold backdrop-blur-md ${
                          step.tone === "cool"
                            ? "border-primary/30 bg-background text-primary"
                            : "border-heat/30 bg-background text-heat"
                        }`}
                      >
                        {step.number}
                      </span>

                      <div className="relative min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-lg text-foreground sm:text-xl">{step.title}</h3>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              step.tone === "cool"
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-heat/30 bg-heat/10 text-heat"
                            }`}
                          >
                            {step.tag}
                          </span>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>

                        <ul className="mt-4 space-y-1.5">
                          {step.checklist.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-[13.5px] leading-relaxed text-muted-foreground"
                            >
                              <Check
                                className={`mt-0.5 h-3.5 w-3.5 flex-none ${
                                  step.tone === "cool" ? "text-primary" : "text-heat"
                                }`}
                                strokeWidth={2.5}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proof / testimonial spotlight */}
        <section className="section-shell border-b border-border">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
            <Reveal>
              <p className="mx-auto max-w-3xl text-balance font-display text-xl leading-snug sm:text-2xl lg:text-3xl">
                <span
                  className="mr-1.5 font-display text-3xl leading-none text-primary/40 sm:text-4xl"
                  aria-hidden
                >
                  &ldquo;
                </span>
                They kept us updated at every stage —{" "}
                <span className="text-gradient-cool">{proof.highlight}</span>. We knew exactly where
                things stood the whole way through.
                <span
                  className="ml-1.5 font-display text-3xl leading-none text-primary/40 sm:text-4xl"
                  aria-hidden
                >
                  &rdquo;
                </span>
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{proof.name}</span> — {proof.role}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Differentiators strip */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {differentiators.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <p className="text-sm leading-snug text-foreground/90">{item}</p>
                  </div>
                ))}
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
                  Questions About Our <span className="text-gradient-cool">Process</span>
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

        <CTASection
          badgeLabel="Free 30-Minute Call"
          title={
            <>
              Ready to Start With a <span className="text-gradient-cool">Discovery Call?</span>
            </>
          }
          description="No pressure, no obligation — just an honest look at your website and what step 1 would look like for your business."
          primaryLabel="Get a Free Strategy Call"
          primaryHref="/contact"
          footnote="We reply within 4 hours · No obligation"
        />
      </main>
    </div>
  );
}
