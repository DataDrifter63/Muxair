import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Facebook,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import type { WorkCardRow, WorkItemRow } from "@/lib/supabase";
import { services as allServices, workServiceHrefs, type WorkService } from "@/lib/site-data";

const serviceIcons: Record<WorkService, LucideIcon> = {
  website: MonitorSmartphone,
  seo: MapPin,
  "google-ads": Target,
  "meta-ads": Facebook,
  maintenance: ShieldCheck,
};

/** The services behind this result, each linking to its own page. */
function ServicesBehindResult({ serviceKeys }: { serviceKeys: WorkService[] }) {
  const cards = serviceKeys
    .map((key) => ({ key, service: allServices.find((s) => s.slug === key) }))
    .filter((c): c is { key: WorkService; service: (typeof allServices)[number] } => !!c.service);
  if (!cards.length) return null;

  return (
    <div>
      <SectionHeading
        eyebrow="Behind the result"
        title="The services that made it happen"
        subtitle="Every project is built from the same few services. See exactly what each one includes."
        align="left"
      />
      <div
        className={`mt-10 grid gap-5 sm:grid-cols-2 ${
          cards.length >= 3
            ? "lg:grid-cols-3"
            : cards.length === 1
              ? "sm:grid-cols-1 sm:max-w-md"
              : ""
        }`}
      >
        {cards.map(({ key, service }, i) => {
          const Icon = serviceIcons[key];
          const heat = service.tone === "heat";
          return (
            <Reveal key={key} delay={0.05 * i} className="h-full">
              <Link
                to={workServiceHrefs[key]}
                className={`group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 backdrop-blur-md transition-colors ${
                  heat ? "hover:border-heat/40" : "hover:border-primary/40"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    heat
                      ? "border-heat/30 bg-heat/10 text-heat"
                      : "border-primary/30 bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg leading-snug">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.tagline}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                    heat ? "text-heat" : "text-primary"
                  }`}
                >
                  Explore service
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function MoreCaseStudies({ items }: { items: WorkCardRow[] }) {
  if (!items.length) return null;
  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Keep reading" title="More case studies" align="left" />
        <Reveal delay={0.1}>
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            See all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2">
        {items.map((c, i) => {
          const heat = c.tone === "heat";
          return (
            <Reveal key={c.slug} delay={0.06 * i} className="h-full">
              <Link to="/work/$slug" params={{ slug: c.slug }} className="block h-full">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors ${
                    heat ? "hover:border-heat/40" : "hover:border-primary/40"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden border-b border-border bg-surface/60 ${
                      c.cover_image ? "aspect-[3/2]" : "aspect-[16/8]"
                    }`}
                  >
                    {c.cover_image ? (
                      <img
                        src={c.cover_image}
                        alt={`${c.name} case study preview`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full flex-col items-center justify-center gap-1 px-6 text-center ${
                          heat
                            ? "bg-gradient-to-br from-heat/15 via-heat/5 to-transparent"
                            : "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
                        }`}
                      >
                        <span
                          className={`font-display text-3xl leading-tight sm:text-4xl ${
                            heat ? "text-heat" : "text-primary"
                          }`}
                        >
                          {c.badge || c.name}
                        </span>
                        {c.category ? (
                          <span className="text-xs text-muted-foreground">{c.category}</span>
                        ) : null}
                      </div>
                    )}
                    {c.badge && c.cover_image ? (
                      <span
                        className={`absolute right-3 top-3 rounded-full border bg-background/85 px-2.5 py-1 text-[11px] font-semibold ${
                          heat ? "border-heat/40 text-heat" : "border-primary/40 text-primary"
                        }`}
                      >
                        {c.badge}
                      </span>
                    ) : null}
                    {c.cover_image ? (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg">{c.name}</h3>
                    {c.result || c.summary ? (
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        {c.result || c.summary}
                      </p>
                    ) : (
                      <span className="flex-1" />
                    )}
                    <span
                      className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${
                        heat ? "text-heat" : "text-primary"
                      }`}
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/** Closing sections of a case study page: related services, then more case studies. */
export function CaseStudyRelated({ item, related }: { item: WorkItemRow; related: WorkCardRow[] }) {
  const serviceKeys = ((item.services ?? []) as string[]).filter(
    (s): s is WorkService => s in workServiceHrefs,
  );
  if (!serviceKeys.length && !related.length) return null;

  return (
    <section className="section-shell border-t border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl space-y-24 px-5 lg:px-8">
        <ServicesBehindResult serviceKeys={serviceKeys} />
        <MoreCaseStudies items={related} />
      </div>
    </section>
  );
}
