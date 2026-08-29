import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Headphones,
  Search,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const solutions = [
  {
    icon: Zap,
    title: "High-Converting Design",
    description:
      "Built specifically for HVAC buyers \u2014 urgent, trust-building layouts that turn visitors into phone calls within seconds.",
    stat: "Avg. 47% higher conversion rate",
    tone: "heat" as const,
  },
  {
    icon: Search,
    title: "Local SEO Optimized",
    description:
      "Every page is architected to rank for your service areas. We build sites that Google loves and local customers find.",
    stat: "Rank in your city's top 3",
    tone: "cool" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile-First Performance",
    description:
      "HVAC customers are searching on the go. We build websites that load quickly, adapt seamlessly to every screen, and make it easy for visitors to take action.",
    stat: "Speed and usability—built in",
    tone: "heat" as const,
  },
  {
    icon: BarChart3,
    title: "Lead Tracking & Analytics",
    description:
      "Know exactly where your leads come from. We set up call tracking, form analytics, and monthly performance reports.",
    stat: "Full ROI visibility",
    tone: "cool" as const,
  },
  {
    icon: ShieldCheck,
    title: "HVAC-Specific Content",
    description:
      "Copywriters who understand HVAC. We write service pages, FAQs, and blog content that speaks to your customers' exact problems.",
    stat: "Industry-native copywriting",
    tone: "heat" as const,
  },
  {
    icon: Headphones,
    title: "Ongoing Support & Updates",
    description:
      "We're not a one-and-done agency. Seasonal promotions, new service pages, emergency updates \u2014 we're your digital team.",
    stat: "Dedicated account manager",
    tone: "cool" as const,
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="section-shell border-y border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="The solution"
            title={
              <>
                We Build Websites That <span className="text-gradient-cool">Work As Hard</span> As
                You Do
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              We've spent years studying what makes HVAC customers call. Every design decision,
              every headline, every button placement is backed by data from 100+ HVAC websites we've
              built and optimized.
            </p>
            <a
              href="#services"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-heat"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md"
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                    s.tone === "cool" ? "via-primary/70" : "via-heat/70"
                  } to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div
                  className={`pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    s.tone === "cool" ? "bg-primary/18" : "bg-heat/18"
                  }`}
                />
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${
                    s.tone === "cool"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-heat/30 bg-heat/10 text-heat"
                  }`}
                >
                  <s.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg leading-snug">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <span
                  className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    s.tone === "cool"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-heat/30 bg-heat/10 text-heat"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s.stat}
                </span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
