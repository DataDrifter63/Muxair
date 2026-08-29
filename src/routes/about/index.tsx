// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/about/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/about/"!</div>
// }






import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Compass,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import {
  Counter,
  MagneticButton,
  Reveal,
  SectionHeading,
  TechBackdrop,
} from "@/components/site/primitives";
import { SITE_URL } from "@/lib/site-data";

const title = "About Us | The HVAC-Specialist Web Design Agency";
const description =
  "We're a small team that works exclusively with HVAC companies. Meet the specialists behind Ductwork Studio, and why we chose this niche.";

const team = [
  { name: "Noah Ferris", role: "Developer" },
  { name: "Grace Whitfield", role: "Client & Sales Lead" },
  { name: "Liam Turner", role: "HVAC Content Writer" },
];

export const Route = createFileRoute("/about/")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "Ductwork Studio",
            description:
              "A small specialist web design agency working exclusively with HVAC (heating, cooling and air quality) companies.",
            url: SITE_URL,
            employee: [
              { "@type": "Person", name: "Ethan Cole", jobTitle: "Lead Developer & Strategy" },
              { "@type": "Person", name: "Sophie Marsh", jobTitle: "Design & Client Delivery" },
              { "@type": "Person", name: "Noah Ferris", jobTitle: "Developer" },
              { "@type": "Person", name: "Grace Whitfield", jobTitle: "Client & Sales Lead" },
              { "@type": "Person", name: "Liam Turner", jobTitle: "HVAC Content Writer" },
            ],
          },
        }),
      },
    ],
  }),
});

const differentiators = [
  {
    icon: Users,
    title: "You never have to guess",
    description: "Five names, five faces — you know exactly who's doing what on your project, always.",
  },
  {
    icon: Sparkles,
    title: "A specialist for everything",
    description:
      "Design, development, content and sales each have a dedicated person — not one generalist stretched across all four.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Direct line, every time",
    description:
      "Questions go straight to the person who can answer them. No support ticket, no \"I'll check and get back to you.\"",
  },
  {
    icon: Compass,
    title: "We say no to other industries",
    description:
      "Every hour this team spends is spent getting better at HVAC specifically — not split across twenty niches.",
  },
];

const founders = [
  {
    initials: "EC",
    name: "Ethan Cole",
    role: "Lead Developer & Strategy",
    bio: "Top-rated on Upwork with 50+ web projects delivered. Leads every build alongside our in-house developer — never outsourced to someone you'll never meet.",
    tone: "cool" as const,
  },
  {
    initials: "SM",
    name: "Sophie Marsh",
    role: "Design & Client Delivery",
    bio: "Also top-rated on Upwork, focused on design direction and making sure every launch matches exactly what was promised on the strategy call — no surprises at handover.",
    tone: "heat" as const,
  },
];

function AboutPage() {
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
                About Ductwork Studio
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                The Web Studio That Actually{" "}
                <span className="text-gradient-cool">Understands HVAC</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                No account managers, no outsourced developers, no agency that needs a Gas Safe
                engineer explained to them. Just a small team that works on your site personally,
                start to finish.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3">
                <MagneticButton href="/contact" size="lg">
                  Book a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <p className="text-xs text-muted-foreground">
                  30 minutes &middot; No sales pressure &middot; We'll audit your current site live
                  on the call
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pain recap */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <h2 className="text-balance font-display text-2xl leading-snug sm:text-3xl">
                You've probably worked with an agency before. It probably didn't go well.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                A junior you never spoke to built your site. Your account manager didn't know the
                difference between an installer and an engineer. Follow-up emails took a week.{" "}
                <span className="font-semibold text-foreground">
                  That's not how this works with us.
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why HVAC */}
        <section className="section-shell">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-md">
                <div className="pointer-events-none absolute inset-0 grid-tech opacity-25" aria-hidden />
                <div
                  className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-primary/18 blur-[100px]"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    <Users className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { to: 50, suffix: "+", label: "Projects delivered" },
                      { to: 100, suffix: "%", label: "HVAC-only clients" },
                      { to: 5, suffix: "", label: "Dedicated specialists" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                          <Counter to={stat.to} suffix={stat.suffix} />
                        </p>
                        <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Why HVAC
              </span>
              <h2 className="mt-5 text-balance font-display text-2xl leading-tight sm:text-3xl lg:text-4xl">
                We picked one industry and decided to know it better than anyone else building
                websites.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Most HVAC companies are stuck choosing between generic agencies who've never heard
                of an F-Gas certification, and expensive marketing firms who treat a boiler
                installer's website the same as a law firm's.{" "}
                <span className="font-semibold text-foreground">
                  Neither actually understands the business.
                </span>
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                So we stopped taking on other industries. Every case study, every line of copy,
                every layout decision we make is built around how homeowners and facilities
                managers actually search for and choose an HVAC company.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Team */}
        <section className="section-shell border-y border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="The Team"
              title={
                <>
                  A Small Team. <span className="text-gradient-cool">Every Name, Every Face.</span>
                </>
              }
              subtitle="Five of us, each with one job to be great at — so you always know exactly who's working on your business, and you can always reach them directly."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {founders.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.1} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="flex h-full flex-col rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md sm:p-8"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-lg font-bold ${
                        f.tone === "cool"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-heat/30 bg-heat/10 text-heat"
                      }`}
                    >
                      {f.initials}
                    </span>
                    <h3 className="mt-5 font-display text-xl leading-snug">{f.name}</h3>
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        f.tone === "cool" ? "text-primary" : "text-heat"
                      }`}
                    >
                      {f.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <p className="mx-auto mt-12 max-w-xl text-center text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Backed by a small team of specialists — so every part of your project has a
              dedicated expert
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {team.map((t, i) => (
                <Reveal key={t.name} delay={0.15 + i * 0.08}>
                  <div className="flex items-center gap-3.5 rounded-xl border border-border bg-background/60 p-4 backdrop-blur-sm">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-border bg-surface text-xs font-bold text-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Why It Matters to You"
              title={
                <>
                  What "Small on Purpose" Actually <span className="text-gradient-cool">Gets You</span>
                </>
              }
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <d.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-base leading-snug">{d.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-border py-10">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-5 text-center lg:px-8">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Top-Rated on Upwork
              </span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
              <span className="text-sm font-semibold text-foreground/90">
                50+ Projects Delivered
              </span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
              <span className="text-sm font-semibold text-foreground/90">HVAC-Only Studio</span>
            </div>
          </Reveal>
        </section>

        <CTASection />
      </main>
    </div>
  );
}
