import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MessagesSquare, PenTool, Rocket, Search } from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

const steps = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Discovery Call",
    day: "Day 1–2",
    tags: ["Service area mapping", "Competitor analysis", "Goal setting", "Package recommendation"],
    description:
      "We start with a 30-minute call to understand your business, service areas, competitors, and goals — no generic questionnaires, just the questions that actually matter for HVAC.",
    tone: "cool" as const,
  },
  {
    number: "02",
    icon: Search,
    title: "Research & Strategy",
    day: "Day 3–7",
    tags: ["Keyword research", "Competitor teardown", "Conversion strategy", "Content planning"],
    description:
      "We audit your current site, research local keywords, break down your top competitors, and build a conversion strategy tailored to your market.",
    tone: "heat" as const,
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design & Build",
    day: "Day 8–25",
    tags: [
      "Custom design mockups",
      "Mobile-first development",
      "2 revision rounds",
      "Speed optimization",
    ],
    description:
      "Our designers and developers build your site from the ground up — every page and section crafted around how homeowners actually search for and book HVAC work.",
    tone: "cool" as const,
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    day: "Day 26–30",
    tags: [
      "Google Search Console",
      "Call tracking setup",
      "Analytics dashboard",
      "Ongoing support",
    ],
    description:
      "We launch your site, set up tracking, submit to Google, and hand everything over ready to go. Then we stay on to support your growth.",
    tone: "heat" as const,
  },
];

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const scaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-shell border-y border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              From Kickoff to Live Site <span className="text-gradient-cool">in 30 Days</span>
            </>
          }
          subtitle="A proven process built around your schedule. You stay in the loop without being overwhelmed — we handle the heavy lifting."
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
              <Reveal key={step.number} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 backdrop-blur-md sm:flex-row sm:items-start sm:gap-7 sm:p-7 ${
                    step.tone === "cool"
                      ? "border-primary/25 bg-primary/[0.04] hover:border-primary/45"
                      : "border-heat/25 bg-heat/[0.04] hover:border-heat/45"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[90px] transition-opacity duration-500 group-hover:opacity-100 opacity-0 ${
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
                      {step.tags.map((tag) => (
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

        <Reveal delay={0.15} className="mt-6">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-surface/60 to-heat/10 p-8 backdrop-blur-xl sm:flex-row sm:items-center sm:p-10">
            <div
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-[90px]"
              aria-hidden
            />
            <div className="relative">
              <h3 className="text-xl text-foreground sm:text-2xl">Ready to get started?</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Book a free 30-minute discovery call. No pressure, no pitch — just a real
                conversation about your business.
              </p>
            </div>
            <div className="relative flex-none">
              <MagneticButton href="#contact" size="lg">
                Book Discovery Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
