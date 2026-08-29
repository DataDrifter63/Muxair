import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

const projects = [
  {
    image: work1,
    alt: "Website design for Midlands HVAC Co. showing heating and cooling services with a free quote call to action",
    name: "Midlands HVAC Co.",
    result: "300% increase in organic enquiries",
    tone: "cool" as const,
  },
  {
    image: work2,
    alt: "Website design for Yorkshire Boiler Specialists showing fixed price boiler installations and a survey booking button",
    name: "Yorkshire Boiler Specialists",
    result: "First page Google in 4 months",
    tone: "heat" as const,
  },
  {
    image: work3,
    alt: "Website design for a London air conditioning installer showing an inline quote request form",
    name: "London AC Installer",
    result: "40 quote requests in 30 days",
    tone: "cool" as const,
  },
];

export function PortfolioSection() {
  return (
    <section id="work" className="section-shell">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Portfolio" title="Recent Work" align="left" />
          <Reveal delay={0.1}>
            <MagneticButton href="#contact" variant="ghost">
              See All Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={p.image}
                    alt={p.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    initial={{ scale: 1.12, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-[3/2] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                  <span
                    className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${
                      p.tone === "cool"
                        ? "border-primary/40 bg-background/70 text-primary"
                        : "border-heat/40 bg-background/70 text-heat"
                    }`}
                  >
                    {p.tone === "cool" ? "Cooling" : "Heating"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">“{p.result}”</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
