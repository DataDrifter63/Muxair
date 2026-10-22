import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./primitives";
import type { WorkCardRow, WorkItemRow } from "@/lib/supabase";
import {
  services as allServices,
  workServiceHrefs,
  workServiceLabels,
  type ServiceItem,
  type WorkService,
} from "@/lib/site-data";

const serviceIcons: Record<WorkService, LucideIcon> = {
  website: MonitorSmartphone,
  seo: MapPin,
  "google-ads": Target,
  "meta-ads": Facebook,
  maintenance: ShieldCheck,
};

// Full literal class names so Tailwind can see them.
const tones = {
  cool: {
    text: "text-primary",
    hoverBorder: "hover:border-primary/40",
    chip: "border-primary/30 bg-primary/10 text-primary",
    soft: "border-primary/25 bg-primary/[0.06]",
    glow: "bg-primary/15",
    panel: "from-primary/20 via-primary/5 to-transparent",
  },
  heat: {
    text: "text-heat",
    hoverBorder: "hover:border-heat/40",
    chip: "border-heat/30 bg-heat/10 text-heat",
    soft: "border-heat/25 bg-heat/[0.06]",
    glow: "bg-heat/15",
    panel: "from-heat/20 via-heat/5 to-transparent",
  },
} as const;

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-3xl lg:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

/** One service, linking to its page. `wide` lays it out as a full-width feature card. */
function ServiceFeatureCard({
  serviceKey,
  service,
  wide,
}: {
  serviceKey: WorkService;
  service: ServiceItem;
  wide: boolean;
}) {
  const Icon = serviceIcons[serviceKey];
  const t = tones[service.tone];

  const features = (
    <ul className={wide ? "grid gap-3 sm:grid-cols-2" : "mt-5 space-y-2.5"}>
      {service.features.map((f) => (
        <li
          key={f}
          className={
            wide
              ? "flex items-start gap-3 rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm font-medium leading-snug text-foreground"
              : "flex items-start gap-2.5 text-sm leading-snug text-foreground/90"
          }
        >
          <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${t.text}`} />
          {f}
        </li>
      ))}
    </ul>
  );

  const cta = (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${t.text} ${wide ? "mt-7" : "mt-6"}`}
    >
      Explore {service.shortTitle}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </span>
  );

  const header = (
    <div>
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${t.chip}`}>
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Delivered on this project
      </p>
      <h3
        className={`mt-1.5 font-display leading-snug ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}
      >
        {service.title}
      </h3>
      <p
        className={`mt-3 leading-relaxed text-muted-foreground ${wide ? "max-w-md text-base" : "text-sm"}`}
      >
        {service.tagline}
      </p>
    </div>
  );

  return (
    <Link
      to={workServiceHrefs[serviceKey]}
      className={`group relative block h-full overflow-hidden rounded-3xl border border-border bg-background/70 p-7 backdrop-blur-md transition-colors sm:p-9 ${t.hoverBorder}`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${t.glow}`}
        aria-hidden
      />
      {wide ? (
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            {header}
            {cta}
          </div>
          {features}
        </div>
      ) : (
        <div className="relative flex h-full flex-col">
          {header}
          {features}
          <div className="mt-auto">{cta}</div>
        </div>
      )}
    </Link>
  );
}

function ServicesBehindResult({ serviceKeys }: { serviceKeys: WorkService[] }) {
  const cards = serviceKeys
    .map((key) => ({ key, service: allServices.find((s) => s.slug === key) }))
    .filter((c): c is { key: WorkService; service: ServiceItem } => !!c.service);
  if (!cards.length) return null;

  const cols = cards.length >= 3 ? "lg:grid-cols-3" : cards.length === 2 ? "lg:grid-cols-2" : "";

  return (
    <div>
      <SectionIntro
        eyebrow="Behind the result"
        title="The work that made it happen"
        subtitle="Every project is built from a few focused services. Here is what was delivered here, and what each one includes."
      />
      <div className={`mt-9 grid gap-6 ${cols}`}>
        {cards.map(({ key, service }, i) => (
          <Reveal key={key} delay={0.06 * i} className="h-full">
            <ServiceFeatureCard serviceKey={key} service={service} wide={cards.length === 1} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** Cover for a case study card; falls back to a tinted panel with the service icon and badge. */
function CardCover({ c }: { c: WorkCardRow }) {
  const t = tones[c.tone === "heat" ? "heat" : "cool"];
  const firstService = ((c.services ?? []) as string[]).find(
    (s): s is WorkService => s in serviceIcons,
  );
  const Icon = firstService ? serviceIcons[firstService] : MonitorSmartphone;

  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface/60">
      {c.cover_image ? (
        <>
          <img
            src={c.cover_image}
            alt={`${c.name} case study preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          {c.badge ? (
            <span
              className={`absolute bottom-3 left-3 rounded-full border bg-background/90 px-3 py-1 text-[11px] font-semibold backdrop-blur-sm ${t.chip}`}
            >
              {c.badge}
            </span>
          ) : null}
        </>
      ) : (
        <div
          className={`relative flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br px-6 text-center ${t.panel}`}
        >
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-30" aria-hidden />
          <span
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-background/70 backdrop-blur-sm ${t.chip}`}
          >
            <Icon className="h-6 w-6" />
          </span>
          {c.badge ? (
            <span className={`relative font-display text-2xl leading-tight ${t.text}`}>
              {c.badge}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function MoreCaseStudies({ items }: { items: WorkCardRow[] }) {
  if (!items.length) return null;
  const cols =
    items.length >= 3
      ? "md:grid-cols-2 lg:grid-cols-3"
      : items.length === 2
        ? "md:grid-cols-2"
        : "max-w-xl";

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <SectionIntro
          eyebrow="Keep reading"
          title="More case studies"
          subtitle="Real results for HVAC businesses, with the work behind each one."
        />
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

      <div className={`mt-9 grid items-stretch gap-6 ${cols}`}>
        {items.map((c, i) => {
          const t = tones[c.tone === "heat" ? "heat" : "cool"];
          const chips = ((c.services ?? []) as string[])
            .filter((s): s is WorkService => s in workServiceLabels)
            .slice(0, 2);
          const blurb = c.result || c.summary;
          return (
            <Reveal key={c.slug} delay={0.06 * i} className="h-full">
              <Link to="/work/$slug" params={{ slug: c.slug }} className="block h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur-md transition-colors ${t.hoverBorder}`}
                >
                  <CardCover c={c} />
                  <div className="flex flex-1 flex-col p-6">
                    {chips.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {chips.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {workServiceLabels[s]}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <h3 className={`text-lg leading-snug ${chips.length ? "mt-3" : ""}`}>
                      {c.name}
                    </h3>
                    {c.location ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className={`h-3.5 w-3.5 ${t.text}`} />
                        {c.location}
                      </p>
                    ) : null}
                    {blurb ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {blurb}
                      </p>
                    ) : null}
                    <span
                      className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${t.text}`}
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
      <div className="relative mx-auto max-w-7xl space-y-20 px-5 lg:px-8">
        <ServicesBehindResult serviceKeys={serviceKeys} />
        <MoreCaseStudies items={related} />
      </div>
    </section>
  );
}
