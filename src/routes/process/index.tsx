// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/process/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/process/"!</div>
// }










import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  LineChart,
  MessagesSquare,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
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
import { SITE_URL } from "@/lib/site-data";

const title = "Our Process | How We Build HVAC Websites & Marketing Systems";
const description =
  "From discovery call to booked jobs — see the exact 30-day process we follow to design, build and launch marketing systems for HVAC companies.";

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
  { to: 30, suffix: " days", label: "Average kickoff-to-launch time" },
  { to: 2, suffix: "", label: "Included revision rounds" },
  { to: 1, suffix: "", label: "Point of contact, start to finish" },
];

const steps = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Discovery Call",
    day: "Day 1–2",
    tone: "cool" as const,
    description:
      "We start with a 30-minute call to understand your business — the towns you cover, the services you push hardest, who you're really competing with, and what a 'good result' looks like to you. No generic questionnaires; just the questions that actually matter for an HVAC company.",
    deliverables: [
      "Service-area map agreed",
      "Competitor shortlist",
      "Goals and success metrics defined",
      "Right package confirmed",
    ],
  },
  {
    number: "02",
    icon: Compass,
    title: "Research & Strategy",
    day: "Day 3–7",
    tone: "heat" as const,
    description:
      "Before anything gets designed, we audit your current site (if you have one), research the exact keywords homeowners in your area search when something breaks, and tear down what your top three local competitors are doing well — and badly.",
    deliverables: [
      "Local keyword research",
      "Competitor teardown report",
      "Site map and page structure",
      "Content and conversion plan",
    ],
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    day: "Day 8–15",
    tone: "cool" as const,
    description:
      "You'll see real design mockups of your homepage and key service pages before a single line of code is written. This is where your brand comes through — not a recycled template with your logo swapped in. Two rounds of revisions are built into every project.",
    deliverables: [
      "Custom homepage mockup",
      "Service page templates",
      "Mobile-first layouts",
      "Two revision rounds included",
    ],
  },
  {
    number: "04",
    icon: ClipboardCheck,
    title: "Build & Test",
    day: "Day 16–25",
    tone: "heat" as const,
    description:
      "Approved designs get built into a fast, mobile-first site. We wire up quote forms, click-to-call buttons and booking widgets, then test everything — load speed, form submissions, mobile behaviour and Core Web Vitals — before it ever reaches a homeowner.",
    deliverables: [
      "Full site build",
      "Forms and call tracking wired up",
      "Speed and Core Web Vitals pass",
      "Cross-device testing",
    ],
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    day: "Day 26–30",
    tone: "cool" as const,
    description:
      "We handle the technical side of going live — domain and hosting setup, Google Search Console, analytics and call tracking — then walk you through the finished site so you know exactly how it works before it starts taking enquiries.",
    deliverables: [
      "Domain, hosting & SSL configured",
      "Search Console & analytics live",
      "Walkthrough call with your team",
      "Site fully indexed and submitted",
    ],
  },
  {
    number: "06",
    icon: LineChart,
    title: "Grow & Support",
    day: "Day 30+",
    tone: "heat" as const,
    description:
      "Launch is the start, not the finish line. If you've added SEO, Google Ads or Meta Ads, we start actively managing and reporting on those from week one — and every client gets ongoing monitoring, so small issues get fixed before they cost you enquiries.",
    deliverables: [
      "Monthly performance reporting",
      "Uptime & security monitoring",
      "Seasonal content updates",
      "Direct line to your account contact",
    ],
  },
];

const expectations = [
  {
    icon: Users,
    title: "One point of contact",
    text: "You'll work with the same person throughout your project — not a rotating cast of account managers who don't know your business.",
  },
  {
    icon: ShieldCheck,
    title: "No surprise costs",
    text: "Everything is scoped and agreed before we start. If something extra comes up, you'll hear about it before it happens, not on an invoice.",
  },
  {
    icon: Sparkles,
    title: "Built for HVAC, not generic",
    text: "Every recommendation is filtered through what actually works for heating and cooling companies — because it's the only industry we work in.",
  },
];

const faqs = [
  {
    question: "What do you need from me during the process?",
    answer:
      "Mainly your time on two calls (discovery and the launch walkthrough) and quick feedback during design reviews. We handle the research, writing, design and build — you stay informed without it eating your week.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Small edits are included if you're on a maintenance plan. Bigger changes — new pages, a rebrand, added services — are scoped and quoted separately, and we're always happy to help.",
  },
  {
    question: "Can the timeline move faster or slower than 30 days?",
    answer:
      "Yes. 30 days is our average for a full website build. Simpler projects can move faster; larger multi-location sites or projects bundled with SEO and ad campaigns can take longer. We'll give you a realistic timeline on the discovery call.",
  },
  {
    question: "Do I need to already have a website?",
    answer:
      "No — we work with HVAC companies starting from scratch just as often as ones replacing an existing site. Either way, the process is the same.",
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
                A Clear Path From First Call to{" "}
                <span className="text-gradient-cool">Booked Jobs</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                No black boxes and no guessing where your project stands. Here's exactly what
                happens, step by step, from the moment you reach out to the day your site starts
                taking calls.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost" size="lg">
                  See Our Services
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

        {/* Timeline */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Step by step"
              title={
                <>
                  Six Stages, <span className="text-gradient-cool">Zero Guesswork</span>
                </>
              }
              subtitle="Every project moves through the same six stages. You'll always know what's happening, what's next, and what we need from you."
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

                      <div className="relative flex flex-none items-center gap-4 sm:flex-col sm:items-center sm:gap-2">
                        <span
                          className={`relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-xl border backdrop-blur-md ${
                            step.tone === "cool"
                              ? "border-primary/30 bg-background text-primary"
                              : "border-heat/30 bg-background text-heat"
                          }`}
                        >
                          <step.icon className="h-5.5 w-5.5" strokeWidth={2} />
                        </span>
                        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:hidden">
                          Step {step.number}
                        </span>
                      </div>

                      <div className="relative min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className={`font-display text-sm font-extrabold ${
                              step.tone === "cool" ? "text-primary" : "text-heat"
                            }`}
                          >
                            {step.number}
                          </span>
                          <h3 className="text-lg text-foreground sm:text-xl">{step.title}</h3>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              step.tone === "cool"
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-heat/30 bg-heat/10 text-heat"
                            }`}
                          >
                            {step.day}
                          </span>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {step.deliverables.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you can expect */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Working with us"
              title={
                <>
                  What You Can <span className="text-gradient-cool">Expect</span>
                </>
              }
              subtitle="Beyond the steps themselves, here's how we run every project."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {expectations.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface/40 p-7 backdrop-blur-md">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <item.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-6 font-display text-lg leading-snug">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  Questions About the <span className="text-gradient-cool">Process</span>
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
