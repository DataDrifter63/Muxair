import { motion } from "motion/react";
import { ArrowRight, Facebook, MapPin, MonitorSmartphone, Target } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const services = [
  {
    icon: MonitorSmartphone,
    title: "HVAC Website Design",
    description:
      "Fast, mobile-first sites engineered around quote forms, service areas and emergency call-outs.",
    tone: "cool" as const,
  },
  {
    icon: MapPin,
    title: "Local SEO for HVAC",
    description: "Own the map pack for boiler repair, AC install and every service town you cover.",
    tone: "cool" as const,
  },
  {
    icon: Target,
    title: "Google Ads Management",
    description:
      "High-intent search campaigns built around seasonal demand spikes and cost-per-booked-job.",
    tone: "heat" as const,
  },
  {
    icon: Facebook,
    title: "Meta Ads (Facebook & Instagram)",
    description:
      "Offer-led creative that fills quiet months with installs, servicing plans and upgrades.",
    tone: "heat" as const,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-shell border-y border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything Your HVAC Business Needs to{" "}
              <span className="text-gradient-cool">Win Online</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
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
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </span>
                <span
                  className={`mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${
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
                <a
                  href="#contact"
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${
                    s.tone === "cool" ? "text-primary" : "text-heat"
                  }`}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
