import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Facebook,
  Layers,
  MapPin,
  MonitorSmartphone,
  Quote,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTASection } from "@/components/site/CTASection";
import {
  Counter,
  MagneticButton,
  Reveal,
  SectionHeading,
  TechBackdrop,
} from "@/components/site/primitives";
import { services, SITE_URL, type Tone } from "@/lib/site-data";

const title = "HVAC Marketing Services | Websites, SEO, Google & Meta Ads";
const description =
  "Explore every service we offer HVAC companies — website design, local SEO, Google Ads, Meta Ads and ongoing website maintenance. Built to book more jobs.";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: services
            .flatMap((s) => s.faqs)
            .map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
        }),
      },
    ],
  }),
});

const serviceIcons: Record<string, typeof MonitorSmartphone> = {
  websites: MonitorSmartphone,
  seo: MapPin,
  "google-ads": Target,
  "meta-ads": Facebook,
  maintenance: ShieldCheck,
};

// Each service lives at its own static route (not a $slug dynamic route),
// so map slugs to the exact literal paths the router knows about.
const serviceHrefs = {
  websites: "/services/websites",
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  maintenance: "/services/maintenance",
} as const;

const stats = [
  { to: 5, suffix: "", label: "Specialist services, one team" },
  { to: 30, suffix: " days", label: "Average time to a live site" },
  { to: 300, suffix: "%+", label: "Avg. increase in enquiries" },
];

const included = [
  "No lock-in contracts on most services",
  "One point of contact for every project",
  "Reporting you can actually understand",
  "Built and run exclusively for HVAC companies",
];

const startingPoints = [
  {
    tag: "New / No Website Yet",
    title: "Get the Foundation Right",
    description:
      "If you don't have a site — or yours is actively hurting you — start here. Everything else depends on this being solid first.",
    chips: [{ label: "Website Design", slug: "websites" as const }],
    featured: false,
  },
  {
    tag: "Established, Ready to Grow",
    title: "Turn Traffic Into Bookings",
    description:
      "Site's in decent shape but the phone isn't ringing enough. This is the combination most of our clients land on.",
    chips: [
      { label: "Local SEO", slug: "seo" as const },
      { label: "Google Ads", slug: "google-ads" as const },
    ],
    featured: true,
  },
  {
    tag: "Scaling Across Areas",
    title: "Full Growth System",
    description:
      "Multiple vans, multiple service areas, and you need every channel working together with reporting you can actually act on.",
    chips: [
      { label: "SEO", slug: "seo" as const },
      { label: "Google Ads", slug: "google-ads" as const },
      { label: "Meta Ads", slug: "meta-ads" as const },
      { label: "Maintenance", slug: "maintenance" as const },
    ],
    featured: false,
  },
];

const proof = {
  highlight: "40 quote requests",
  name: "Aaron Price",
  role: "London AC Installer · Website Design + Google Ads",
};

function toneClasses(tone: Tone) {
  return {
    border: tone === "cool" ? "border-primary/30" : "border-heat/30",
    bg: tone === "cool" ? "bg-primary/10" : "bg-heat/10",
    text: tone === "cool" ? "text-primary" : "text-heat",
    glowBg: tone === "cool" ? "bg-primary/18" : "bg-heat/18",
    via: tone === "cool" ? "via-primary/70" : "via-heat/70",
  };
}

function ServicesIndex() {
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
                Services
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Everything Your HVAC Business Needs to{" "}
                <span className="text-gradient-cool">Win Online</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Five specialist services, one team that only works with heating, cooling and air
                quality companies. Pick one, or combine them into a full growth system.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/work" variant="ghost" size="lg">
                  See Our Work
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

        {/* Which service is right for you */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Where to start"
              title={
                <>
                  Which Service Is Right for{" "}
                  <span className="text-gradient-cool">Your Business?</span>
                </>
              }
              subtitle="Most clients don't start with all five. Here's what we typically recommend based on where your business is right now."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {startingPoints.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.08} className="h-full">
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-md sm:p-8 ${
                      point.featured
                        ? "border-primary/40 bg-primary/[0.05] glow-cool"
                        : "border-border bg-surface/40"
                    }`}
                  >
                    {point.featured ? (
                      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/18 blur-[90px]" />
                    ) : null}
                    <span
                      className={`relative inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        point.featured
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-surface/60 text-muted-foreground"
                      }`}
                    >
                      {point.tag}
                    </span>
                    <h3 className="relative mt-5 font-display text-xl leading-snug sm:text-2xl">
                      {point.title}
                    </h3>
                    <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {point.chips.map((chip) => (
                        <Link
                          key={chip.label}
                          to={serviceHrefs[chip.slug]}
                          className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          {chip.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Service cards */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Five Services, <span className="text-gradient-cool">One Growth System</span>
                </>
              }
              subtitle="Each service is built to work on its own — or stack together for a full pipeline from search to booked job."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {services.map((s, i) => {
                const Icon = serviceIcons[s.slug] ?? Layers;
                const c = toneClasses(s.tone);
                return (
                  <Reveal key={s.slug} delay={i * 0.07} className="h-full">
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md sm:p-8"
                    >
                      <div
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.via} to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <div
                        className={`pointer-events-none absolute -bottom-24 right-0 h-48 w-48 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${c.glowBg}`}
                      />

                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${c.border} ${c.bg} ${c.text}`}
                        >
                          <Icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-xl leading-snug sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className={`mt-2 text-sm font-medium ${c.text}`}>{s.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {s.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm leading-snug text-foreground/90"
                          >
                            <BadgeCheck
                              className={`mt-0.5 h-4 w-4 flex-none ${c.text}`}
                              strokeWidth={2}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={serviceHrefs[s.slug as keyof typeof serviceHrefs]}
                        className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
                      >
                        Explore {s.shortTitle}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </motion.article>
                  </Reveal>
                );
              })}

              {/* Bundle / pricing teaser card, filling the 2-col grid evenly */}
              <Reveal delay={services.length * 0.07} className="h-full">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.05] p-7 backdrop-blur-md glow-cool sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/18 blur-[90px]" />
                  <div className="relative">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Layers className="h-5.5 w-5.5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-6 font-display text-xl leading-snug sm:text-2xl">
                      Not sure what you need?
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Most clients don't buy one service in isolation — they bundle a website with
                      SEO and ads for a complete pipeline. Tell us where jobs are falling short and
                      we'll recommend a starting point, no pressure.
                    </p>
                  </div>
                  <Link
                    to="/pricing"
                    className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    See Pricing &amp; Packages
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Proof / testimonial spotlight */}
        <section className="section-shell border-b border-border">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
            <Reveal>
              <Quote className="mx-auto h-8 w-8 text-primary" strokeWidth={1.6} />
              <p className="mx-auto mt-6 max-w-3xl text-balance font-display text-xl leading-snug sm:text-2xl lg:text-3xl">
                &ldquo;They set us up with a new site and Google Ads together.{" "}
                <span className="text-gradient-cool">{proof.highlight}</span> in the first month
                alone — more than the whole previous quarter.&rdquo;
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{proof.name}</span> — {proof.role}
              </p>
            </Reveal>
          </div>
        </section>

        {/* What's included / trust strip */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 px-6 py-10 backdrop-blur-md sm:px-10">
                <div
                  className="pointer-events-none absolute inset-0 grid-tech opacity-15"
                  aria-hidden
                />
                <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <p className="text-sm leading-snug text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
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
                  Questions About Our <span className="text-gradient-cool">Services</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-12">
                {services
                  .flatMap((s) => s.faqs.map((f) => ({ ...f, service: s.shortTitle })))
                  .map((f, i) => (
                    <AccordionItem key={`${f.service}-${i}`} value={`${f.service}-${i}`}>
                      <AccordionTrigger className="text-base">
                        <span>
                          {f.question}
                          <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {f.service}
                          </span>
                        </span>
                      </AccordionTrigger>
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
