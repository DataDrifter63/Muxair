import { ArrowUpRight, BadgeCheck, TrendingUp } from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

/**
 * Static, in-file portfolio highlights for the homepage teaser section.
 * Deliberately NOT wired to the `case_studies` Supabase table — those are
 * real client case studies shown on /work; this section is example/sample
 * proof content maintained directly here.
 *
 * Visual side (right/left box) — paste hosted image URLs (Cloudinary):
 *   - `beforeImage` AND `afterImage` both set  -> drag-to-reveal before/after slider
 *   - only ONE URL set (in `chartImage`, `afterImage` or `beforeImage`) -> just that
 *     single image, no slider
 *   - nothing set -> dashed placeholder
 * The image frame is always the same 4:3 size for every card. Images are NEVER
 * cropped: each one is shown whole, centred inside that frame, whatever its
 * size or ratio. Cloudinary URLs are only optimised (auto format/quality, max
 * 1600px wide) — see `optimiseImage`.
 */
type PortfolioHighlight = {
  href: string; // case study page this card links to
  name: string;
  tone: "cool" | "heat";
  headline: string; // e.g. "We helped Acme HVAC grow annual revenue +167% in 12 months (client-reported)"
  before: { label: string; stats: string[] };
  after: { label: string; stats: string[] };
  pills: { value: string; label: string }[];
  chartImage?: string; // single image (e.g. a Search Console / rank graph screenshot)
  beforeImage?: string; // set BOTH beforeImage + afterImage to get the slider
  afterImage?: string;
  chartCaption: string; // e.g. "5669.23% increase in real visitors"
  verifiedLabel: string; // e.g. "Rank #1 for \"boiler repair leeds\""
};

const highlights: PortfolioHighlight[] = [
  {
    name: "EEP Plumbing",
    href: "/work/eep-plumbing",
    tone: "cool",
    headline: "A Website Rebuilt for Modern HVAC Customers",
    before: {
      label: "Before (July 2026)",
      stats: [
        "Outdated design, hard to navigate",
        "Not optimized for mobile",
        "No clear path to contact or book a call",
      ],
    },
    after: {
      label: "After (August 2026)",
      stats: [
        "Modern, conversion-focused layout",
        "Mobile-first, fast-loading design",
        "SEO structure built for local search visibility",
        "Clear calls-to-action throughout",
      ],
    },
    pills: [
      { value: "Complete Redesign", label: "Full Website Redesign" },
      { value: "SEO-Ready Structured", label: "From the Ground Up" },
    ],
    chartImage: "",
    beforeImage:
      "https://res.cloudinary.com/dmaibvnp/image/upload/v1792674111/eep-before-cover-1600x1200.png",
    afterImage:
      "https://res.cloudinary.com/dmaibvnp/image/upload/v1792674105/eep-after-cover-1600x1200.png",
    chartCaption:
      "From an outdated, hard-to-navigate site to a fast, modern design built to convert.",
    verifiedLabel: "BEFORE & AFTER · FULL REDESIGN",
  },
  {
    name: "Ruzz Global",
    href: "/work/ruzz-global-local-seo",
    tone: "heat",
    headline: "We Helped Ruzz Global 6x Their Website Clicks in 4 Weeks",
    before: {
      label: "BEFORE (25 Jul – 21 Aug 2026)",
      stats: [
        "261 total clicks",
        "62.4K total impressions",
        "0.4% average CTR",
        "Average position 8",
      ],
    },
    after: {
      label: "AFTER (22 Aug – 17 Sep 2026)",
      stats: [
        "1.66K total clicks",
        "215K total impressions",
        "0.8% average CTR",
        "Average position 5.9",
      ],
    },
    pills: [
      { value: "+536%", label: "Increase in Website Clicks" },
      { value: "2x CTR", label: "CTR Doubled from 0.4% to 0.8%" },
    ],
    chartImage:
      "https://res.cloudinary.com/dmaibvnp/image/upload/v1792673406/ruzz-seo-chart-1600x1200.png",
    chartCaption: "Source: Google Search Console",
    verifiedLabel: "SEO CAMPAIGN RESULTS · 4 WEEKS",
  },
  // DEMO ITEM — replace every field below with your real third case study.
  // {
  //   name: "Demo HVAC Co.",
  //   tone: "cool",
  //   headline: "Demo case study: replace this headline with your real result",
  //   before: {
  //     label: "Before (Month Year)",
  //     stats: ["Add your first before stat", "Add your second before stat"],
  //   },
  //   after: {
  //     label: "After (Month Year)",
  //     stats: ["Add your first after stat", "Add your second after stat", "Add your third after stat"],
  //   },
  //   pills: [
  //     { value: "+000%", label: "Replace with your key result" },
  //     { value: "Top 3", label: "Replace with a second result" },
  //   ],
  //   chartImage: "",
  //   beforeImage: work1,
  //   afterImage: work2,
  //   chartCaption: "Replace with a one-line result summary",
  //   verifiedLabel: "DEMO · REPLACE WITH YOUR CASE STUDY",
  // },
];

/**
 * For Cloudinary URLs, add f_auto/q_auto and cap the width at 1600px (c_limit
 * only ever scales DOWN, it never crops). URLs that already contain
 * transformations, and non-Cloudinary URLs, are left untouched.
 */
const CLOUDINARY_OPTIMISE = "f_auto,q_auto,c_limit,w_1600";

function optimiseImage(url: string): string {
  const marker = "/image/upload/";
  const at = url.indexOf(marker);
  if (!url.includes("res.cloudinary.com") || at === -1) return url;
  const head = url.slice(0, at + marker.length);
  const rest = url.slice(at + marker.length);
  const first = rest.split("/")[0] ?? "";
  if (first.includes(",") || /^[a-z]{1,3}_/.test(first)) return url;
  return `${head}${CLOUDINARY_OPTIMISE}/${rest}`;
}

function CaseVisual({ item }: { item: PortfolioHighlight }) {
  const before = item.beforeImage ? optimiseImage(item.beforeImage) : "";
  const after = item.afterImage ? optimiseImage(item.afterImage) : "";
  const single = optimiseImage(item.chartImage || item.afterImage || item.beforeImage || "");

  if (before && after) {
    return (
      <BeforeAfterSlider
        beforeImage={before}
        afterImage={after}
        caption={item.name}
        fit="contain"
        className="mt-4 bg-surface"
      />
    );
  }

  if (single) {
    return (
      <img
        src={single}
        alt={item.chartCaption}
        loading="lazy"
        className="mt-4 aspect-[4/3] w-full rounded-xl border border-border bg-surface object-contain object-center"
      />
    );
  }

  return (
    <div className="mt-4 flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground">
      <TrendingUp className="h-6 w-6" />
      <p className="text-xs">Before/after photos or a single image go here</p>
    </div>
  );
}

function toneClasses(tone: "cool" | "heat") {
  return tone === "cool"
    ? { text: "text-primary", border: "border-primary/30", bg: "bg-primary/10" }
    : { text: "text-heat", border: "border-heat/30", bg: "bg-heat/10" };
}

export function PortfolioSection() {
  return (
    <section id="work" className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Case-studies"
            title="Work That Speaks for Itself"
            subtitle="Every project is different, some are full redesigns, some come with measurable growth. Here's a look at the work and the outcomes so far."
            align="left"
          />
          <Reveal delay={0.1}>
            <MagneticButton href="/work" variant="ghost">
              See All Work
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {highlights.map((item, i) => {
            const c = toneClasses(item.tone);
            const reversed = i % 2 === 1;

            return (
              <Reveal key={item.name} delay={0.05}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text side */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${c.border} ${c.bg} ${c.text}`}
                    >
                      {item.name}
                    </span>

                    <h3 className="mt-4 max-w-lg text-balance font-display text-xl leading-snug sm:text-2xl">
                      {item.headline}
                    </h3>

                    {/* Before / After comparison */}
                    <div className="mt-7 grid grid-cols-2 gap-5 border-t border-border pt-6">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {item.before.label}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {item.before.stats.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-sm leading-snug text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-muted-foreground" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p
                          className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${c.text}`}
                        >
                          {item.after.label}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {item.after.stats.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-sm font-medium leading-snug text-foreground"
                            >
                              <span
                                className={`mt-1.5 h-1 w-1 flex-none rounded-full ${c.text.replace("text-", "bg-")}`}
                              />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Stat pills */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.pills.map((p) => (
                        <div
                          key={p.label}
                          className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 backdrop-blur-md"
                        >
                          <ArrowUpRight
                            className={`h-4 w-4 flex-none ${c.text}`}
                            strokeWidth={2.4}
                          />
                          <div>
                            <p className="font-display text-sm font-bold leading-none text-foreground">
                              {p.value}
                            </p>
                            <p className="mt-1 text-[11px] leading-none text-muted-foreground">
                              {p.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={item.href}
                      className={`group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
                    >
                      View Full Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>

                  {/* Visual side — verified growth chart only (no search-result mockup) */}
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur-md sm:p-6">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      <BadgeCheck className={`h-3.5 w-3.5 ${c.text}`} />
                      Verified
                      <span className="text-foreground">{item.verifiedLabel}</span>
                    </div>

                    <CaseVisual item={item} />

                    <div
                      className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${c.border} ${c.bg} ${c.text}`}
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      {item.chartCaption}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
