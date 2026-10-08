import { ArrowUpRight, BadgeCheck, TrendingUp } from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

/**
 * Static, in-file portfolio highlights for the homepage teaser section.
 * Deliberately NOT wired to the `case_studies` Supabase table — those are
 * real client case studies shown on /work; this section is example/sample
 * proof content maintained directly here.
 *
 * `chartImage`: paste a hosted image URL (a screenshot of the traffic/rank
 * graph, matching the reference design). Leave it "" to hide the visual
 * side gracefully until you have one.
 */
type PortfolioHighlight = {
  name: string;
  tone: "cool" | "heat";
  headline: string; // e.g. "We helped Acme HVAC grow annual revenue +167% in 12 months (client-reported)"
  before: { label: string; stats: string[] };
  after: { label: string; stats: string[] };
  pills: { value: string; label: string }[];
  chartImage: string;
  chartCaption: string; // e.g. "5669.23% increase in real visitors"
  verifiedLabel: string; // e.g. "Rank #1 for \"boiler repair leeds\""
};

const highlights: PortfolioHighlight[] = [
  {
    name: "EEP Plumbing",
    tone: "cool",
    headline:
      "A Website Rebuilt for Modern HVAC Customers",
    before: {
      label: "Before (Jun 2024)",
      stats: ["Outdated design, hard to navigate", "Not optimized for mobile", "No clear path to contact or book a call"],
    },
    after: {
      label: "After (Aug 2025)",
      stats: ["Modern, conversion-focused layout", "Mobile-first, fast-loading design", "SEO structure built for local search visibility", "Clear calls-to-action throughout"],
    },
    pills: [
      { value: "+5,669%", label: "Full Website Redesign" },
      { value: "Top 3", label: 'SEO-Structured From the Ground Up"' },
    ],
    chartImage: "",
    chartCaption: "From an outdated, hard-to-navigate site to a fast, modern design built to convert.",
    verifiedLabel: 'BEFORE & AFTER · FULL REDESIGN"',
  },
  {
    name: "Ruzz Global",
    tone: "heat",
    headline: "We Helped Midlands HVAC 6x Their Website Clicks in 4 Weeks",
    before: {
      label: " BEFORE (7/25 to 8/21)",
      stats: ["261 total clicks", "62.4K total impressions","0.4% average CTR","Average position 8"],
    },
    after: {
      label: "AFTER (8/22 to 9/17)",
      stats: [
        "1.66K total clicks",
        '215K total impressions',
        "0.8% average CTR",
        "Average position 5.9",
      ],
    },
    pills: [
      { value: "+536%", label: "Increase in Website Clicks" },
      { value: "Top 2", label: 'CTR Doubled from 0.4% to 0.8%' },
    ],
    chartImage: "",
    chartCaption: "Source: Google Search Console",
    verifiedLabel: 'SEO CAMPAIGN RESULTS · 4 WEEKS',
  },
];

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
          <SectionHeading eyebrow="Case-studies" title="Work That Speaks for Itself" align="left" />
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
                      href="/work"
                      className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
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

                    {item.chartImage ? (
                      <img
                        src={item.chartImage}
                        alt={item.chartCaption}
                        className="mt-4 aspect-[4/3] w-full rounded-xl border border-border object-cover"
                      />
                    ) : (
                      <div className="mt-4 flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground">
                        <TrendingUp className="h-6 w-6" />
                        <p className="text-xs">Growth chart image goes here</p>
                      </div>
                    )}

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








