import { motion } from "motion/react";
import { AlertTriangle, Clock3, TrendingDown, XCircle } from "lucide-react";
import { Reveal, SectionHeading, TechBackdrop } from "./primitives";

const problems = [
  {
    icon: TrendingDown,
    title: "Your competitors are stealing your calls",
    description:
      "While you're running service calls, your competitors' websites are ranking on Google and capturing every lead in your area — leads that should be yours.",
    tone: "heat" as const,
  },
  {
    icon: XCircle,
    title: "Your current site looks like it's from 2010",
    description:
      "Homeowners judge your professionalism in 3 seconds. An outdated, slow, or generic website signals \u2018amateur operation\u2019 \u2014 and they call someone else.",
    tone: "cool" as const,
  },
  {
    icon: Clock3,
    title: "You're paying for leads you can't see",
    description:
      "Ad spend going out, but no visibility on what's actually working, what's wasted, or why the phone isn't ringing.",
    tone: "cool" as const,
  },
  {
    icon: AlertTriangle,
    title: "Enquiries come in and go nowhere",
    description:
      "No follow-up system, no automated response, no way to catch a lead before it goes cold. Every gap is a job for your competitor.",
    tone: "heat" as const,
  },
  {
    icon: AlertTriangle,
    title: "You're too busy to fix it yourself",
    description:
      "You're an HVAC expert, not a web developer. Every hour spent trying to update your site is an hour not spent on the work that actually pays.",
    tone: "heat" as const,
  },
  {
    icon: AlertTriangle,
    title: "Generic agencies don't understand HVAC",
    description:
      "They don't know what a heat pump is. You spend half the call explaining your own business, and get a cookie-cutter site back anyway.",
    tone: "heat" as const,
},
];

export function ProblemSection() {
  return (
    <section id="problems" className="section-shell">
      <TechBackdrop />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Most HVAC Websites Are <span className="text-heat">Actively Costing You Money</span>
            </>
          }
          subtitle="You've built a great HVAC business through hard work and reputation. But if your website doesn't reflect that quality, you're leaving thousands of dollars on the table every single month."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.09}>
              <motion.article
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 [transform-style:preserve-3d] backdrop-blur-md"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px] transition-opacity duration-500 ${
                    p.tone === "cool" ? "bg-primary/20" : "bg-heat/20"
                  } opacity-0 group-hover:opacity-100`}
                />
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                    p.tone === "cool"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-heat/30 bg-heat/10 text-heat"
                  }`}
                >
                  <p.icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-lg leading-snug sm:text-xl">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-heat transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-heat/25 bg-heat/[0.05] p-7 text-center backdrop-blur-md sm:p-9">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-heat/15 blur-[80px]" />
            <p className="relative text-base leading-relaxed text-foreground/90 sm:text-lg">
              <span className="font-display font-bold text-foreground">
                Here's the hard truth:{" "}
              </span>
              Every month you delay fixing your website, you're handing paying customers to your
              competitors. The average HVAC company loses{" "}
              <span className="font-display font-bold text-heat">$8,000 - $15,000</span> per
              month in potential revenue from a poor online presence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
