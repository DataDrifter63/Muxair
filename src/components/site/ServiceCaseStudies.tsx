import { Link } from "@tanstack/react-router";
import { m as motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import type { WorkItemRow } from "@/lib/supabase";

/** Static card used when the database has no published case study for a service yet. */
export interface StaticCase {
  slug: string;
  name: string;
  badge: string;
  quote: string;
  image?: string | undefined;
  imageAlt?: string;
}

interface Props {
  title: string;
  tone: "cool" | "heat";
  /** Real case study from Supabase for this service (null = none published yet). */
  item: WorkItemRow | null;
  /** Shown instead of "Coming Soon" when `item` is null. */
  fallback?: StaticCase;
  comingSoonTitle: string;
  comingSoonBody: string;
  nextTitle?: string;
  nextBody: string;
  footerLine: string;
}

// Full literal class names so Tailwind can see them.
const tones = {
  cool: {
    text: "text-primary",
    hoverBorder: "hover:border-primary/40",
    badge: "border-primary/40 text-primary",
    next: "border-primary/40 bg-primary/[0.05] glow-cool",
  },
  heat: {
    text: "text-heat",
    hoverBorder: "hover:border-heat/40",
    badge: "border-heat/40 text-heat",
    next: "border-heat/40 bg-heat/[0.05] glow-heat",
  },
} as const;

export function ServiceCaseStudies({
  title,
  tone,
  item,
  fallback,
  comingSoonTitle,
  comingSoonBody,
  nextTitle = "Become Our Next Case Study",
  nextBody,
  footerLine,
}: Props) {
  const t = tones[tone];

  const card: StaticCase | null = item
    ? {
        slug: item.slug,
        name: item.name,
        badge: item.badge,
        quote: item.result || item.summary || item.location,
        image: item.cover_image ?? undefined,
        imageAlt: `${item.name} case study preview`,
      }
    : (fallback ?? null);

  return (
    <section className="section-shell border-y border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-stretch justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Recent results"
            title={title}
            align="left"
            className="mx-auto text-center sm:mx-0 sm:text-left"
          />
          <Reveal delay={0.1} className="text-center sm:text-left">
            <Link
              to="/work"
              className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${t.text}`}
            >
              See all work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2">
          <Reveal delay={0} className="h-full">
            {card ? (
              <Link to="/work/$slug" params={{ slug: card.slug }} className="block h-full">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors ${t.hoverBorder}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface/60">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.imageAlt ?? `${card.name} case study preview`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center font-display text-lg text-muted-foreground">
                        {card.name}
                      </div>
                    )}
                    {card.badge && (
                      <span
                        className={`absolute right-3 top-3 rounded-full border bg-background/85 px-2.5 py-1 text-[11px] font-semibold ${t.badge}`}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg">{card.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      &ldquo;{card.quote}&rdquo;
                    </p>
                    <span
                      className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${t.text}`}
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            ) : (
              <Link
                to="/work"
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors ${t.hoverBorder}`}
              >
                <div className="flex aspect-[16/9] items-center justify-center bg-surface/60 text-center text-xs text-muted-foreground">
                  Case study in progress
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg">{comingSoonTitle}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{comingSoonBody}</p>
                  <span
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${t.text}`}
                  >
                    View All Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <Link
              to="/contact"
              className={`group flex h-full flex-col items-center justify-center rounded-2xl border p-8 text-center backdrop-blur-md ${t.next}`}
            >
              <h3 className="font-display text-lg">{nextTitle}</h3>
              <p className="mt-2.5 max-w-xs text-sm text-muted-foreground">{nextBody}</p>
              <span
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${t.text}`}
              >
                Claim Your Spot
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {footerLine}{" "}
            <Link to="/contact" className={`font-semibold hover:underline ${t.text}`}>
              Book a Free Strategy Call →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
