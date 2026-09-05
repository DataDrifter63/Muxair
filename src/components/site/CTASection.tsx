import { motion } from "motion/react";
import { ArrowRight, PhoneCall, type LucideIcon } from "lucide-react";
import { MagneticButton, Reveal } from "./primitives";

interface CTASectionProps {
  /** Small pill above the heading. */
  badgeLabel?: string;
  badgeIcon?: LucideIcon;
  /** Heading — pass JSX if you need a gradient span inside it. */
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Optional second button — omitted entirely if not provided. */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Small line under the buttons — omitted if not provided. */
  footnote?: string;
}

export function CTASection({
  badgeLabel = "Free 30-minute call",
  badgeIcon: BadgeIcon = PhoneCall,
  title = (
    <>
      Ready to Get More <span className="text-gradient-cool">Booked Jobs?</span>
    </>
  ),
  description = "Book a free 30-minute strategy call. We'll review your current website, your Google presence, and show you exactly what's costing you leads.",
  primaryLabel = "Book Your Free Call",
  primaryHref = "#contact",
  secondaryLabel,
  secondaryHref,
  footnote,
}: CTASectionProps) {
  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 px-6 py-20 text-center backdrop-blur-xl sm:px-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute inset-0 grid-tech opacity-25" />
              <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/18 blur-[130px]" />
              <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-heat/16 blur-[120px]" />
              <svg
                className="absolute inset-x-0 bottom-8 h-32 w-full opacity-60"
                viewBox="0 0 1200 140"
                fill="none"
              >
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d={`M-40 ${40 + i * 34} C 320 ${10 + i * 34}, 700 ${90 + i * 34}, 1240 ${30 + i * 34}`}
                    stroke="url(#ctaflow)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: i * 0.2 }}
                  />
                ))}
                <defs>
                  <linearGradient id="ctaflow" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FF9D5C" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FF9D5C" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <BadgeIcon className="h-3.5 w-3.5" />
                {badgeLabel}
              </span>
              <h2 className="mt-6 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <MagneticButton href={primaryHref} size="lg">
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                {secondaryLabel && secondaryHref ? (
                  <MagneticButton href={secondaryHref} variant="ghost" size="lg">
                    {secondaryLabel}
                  </MagneticButton>
                ) : null}
              </div>
              {footnote ? (
                <p className="mt-6 text-xs text-muted-foreground">{footnote}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
