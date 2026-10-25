// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/about/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/about/"!</div>
// }

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { MagneticButton, Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import { CTASection } from "@/components/site/CTASection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { TeamSection, teamMembers } from "@/components/site/TeamSection";
import { SITE_URL } from "@/lib/site-data";
import whyHvacImg from "@/assets/why-hvac.webp";

const title = "About Us | The HVAC-Specialist Web Design Agency";
const description =
  "We're a small team that works exclusively with HVAC companies. Meet the specialists behind Muxair, and why we chose this niche.";

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
            name: "Muxair",
            description:
              "A small specialist web design agency working exclusively with HVAC (heating, cooling and air quality) companies.",
            url: SITE_URL,
            employee: teamMembers.map((m) => ({
              "@type": "Person",
              name: m.name,
              jobTitle: m.role,
            })),
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
    description:
      "Four names, four faces, you know exactly who's doing what on your project, always.",
  },
  {
    icon: Sparkles,
    title: "A specialist for everything",
    description:
      "Strategy, development, performance marketing, and sales each have a dedicated person, not one generalist stretched across all four.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Direct line, every time",
    description:
      "Questions go straight to the person who can answer them. No support ticket, no \"I'll check and get back to you.",
  },
  {
    icon: Compass,
    title: "We say no to other industries",
    description:
      "Every hour this team spends is spent getting better at HVAC specifically, not split across twenty niches.",
  },
];

const proof = {
  quote:
    "Helped up with completely revamping one site and updating another. Very communicative and easy to work with. Such a pleasure collaborating on these projects, thank you Musab !",
  project: "SEO & Website Revamp",
  name: "Raymond C.",
  detail: "New York, US",
};

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
                About Muxair
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                The Web Design Agency That Actually{" "}
                <span className="text-gradient-cool">Understands HVAC</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                We're the HVAC web design agency behind Muxair. No account managers, no outsourced
                developers, no agency that needs a Gas Safe engineer explained to them. Just a small
                team that works on your site personally, start to finish.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg">
                  Get a Free Strategy Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost" size="lg">
                  See Our Services
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Takes about a minute &middot; No sales pressure
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pain recap */}
        <section className="section-shell bg-[#F77036] text-white">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <h2 className="text-balance font-display text-2xl leading-snug text-white sm:text-3xl">
                You've probably worked with an agency before. It probably didn't go well.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                A junior you never spoke to built your site. Your account manager didn't know the
                difference between an installer and an engineer. Follow-up emails took a week.{" "}
                <span className="font-semibold text-white">That's not how this works with us.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why HVAC */}
        <section className="section-shell">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <Reveal>
              <img
                src={whyHvacImg}
                alt="Muxair — HVAC-only web design specialists"
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-3xl border border-border object-cover"
              />
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
                installer's website the same as a law firm's. Neither actually understands the
                business. So we stopped taking on other industries. Every case study, every line of
                copy, every layout decision we make is built around how homeowners and facilities
                managers actually search for and choose an HVAC company.{" "}
                <span className="font-semibold text-foreground"></span>
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground"></p>
              <Link
                to="/services"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                See everything we offer
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
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
              subtitle="Four of us, each with one job to be great at — so you always know exactly who's working on your business, and you can always reach them directly."
            />

            <div className="mt-14">
              <TeamSection />
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
                  What "Small on Purpose" Actually{" "}
                  <span className="text-gradient-cool">Gets You</span>
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
        <section className="bg-[#F77036] py-10">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-5 text-center lg:px-8">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-white" />
                Top-Rated on Upwork
              </span>
              <span className="h-1 w-1 rounded-full bg-white/60" aria-hidden />
              <span className="text-sm font-semibold text-white">50+ Projects Delivered</span>
              <span className="h-1 w-1 rounded-full bg-white/60" aria-hidden />
              <span className="text-sm font-semibold text-white">HVAC-Only Agency</span>
            </div>
          </Reveal>
        </section>

        {/* Social proof */}
        <section className="section-shell border-b border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-8 text-center backdrop-blur-md sm:p-12">
                <div
                  className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/12 blur-[100px]"
                  aria-hidden
                />
                <span className="relative mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {proof.project}
                </span>
                <p className="relative text-balance font-display text-xl leading-snug sm:text-2xl">
                  <span
                    className="mr-1.5 font-display text-3xl leading-none text-primary/40 sm:text-4xl"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  {proof.quote}
                  <span
                    className="ml-1.5 font-display text-3xl leading-none text-primary/40 sm:text-4xl"
                    aria-hidden
                  >
                    &rdquo;
                  </span>
                </p>
                <p className="relative mt-6 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{proof.name}</span> —{" "}
                  {proof.detail}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <RelatedLinks />
        <CTASection
          title={
            <>
              Ready to Work With Someone Who Gets <span className="text-gradient-cool">HVAC</span>?
            </>
          }
          description="Book a free 30-minute strategy call. We'll review your current website, your Google presence, and show you exactly what's costing you leads."
          primaryLabel="Get a Free Strategy Call"
          primaryHref="/contact"
          secondaryLabel="See Our Work"
          secondaryHref="/work"
          footnote="No sales pressure · No obligation"
        />
      </main>
    </div>
  );
}
