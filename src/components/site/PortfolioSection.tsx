import { ArrowUpRight } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";
import type { WorkItemRow } from "@/lib/supabase";

// Local fallback photos, used only until a case study has its own
// cover_image (a Cloudinary URL) set in the admin dashboard.
const fallbackImages = [work1, work2, work3];

function toneClasses(tone: "cool" | "heat") {
  return tone === "cool"
    ? { text: "text-primary", border: "border-primary/30", bg: "bg-primary/10" }
    : { text: "text-heat", border: "border-heat/30", bg: "bg-heat/10" };
}

export function PortfolioSection({ items }: { items: WorkItemRow[] }) {
  if (items.length === 0) return null;

  return (
    <section id="work" className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Results" title="Real HVAC Results" align="left" />
          <Reveal delay={0.1}>
            <MagneticButton href="/work" variant="ghost">
              See All Work
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {items.map((item, i) => {
            const c = toneClasses(item.tone);
            const reversed = i % 2 === 1;
            const image = item.cover_image || fallbackImages[i % fallbackImages.length] || work1;

            return (
              <Reveal key={item.slug} delay={0.05}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text side */}
                  <div>
                    {item.category ? (
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${c.border} ${c.bg} ${c.text}`}
                      >
                        {item.category}
                      </span>
                    ) : null}
                    <h3 className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                    {item.summary ? (
                      <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/90">
                        {item.summary}
                      </p>
                    ) : null}

                    {/* Stat chips — the proof: concrete, verifiable numbers */}
                    {item.metrics && item.metrics.length > 0 ? (
                      <div className="mt-7 flex flex-wrap gap-3">
                        {item.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 backdrop-blur-md"
                          >
                            <ArrowUpRight
                              className={`h-4 w-4 flex-none ${c.text}`}
                              strokeWidth={2.4}
                            />
                            <div>
                              <p className="font-display text-sm font-bold leading-none text-foreground">
                                {m.value}
                              </p>
                              <p className="mt-1 text-[11px] leading-none text-muted-foreground">
                                {m.label}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <a
                      href={`/work/${item.slug}`}
                      className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}
                    >
                      View Full Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>

                  {/* Visual side — before/after proof */}
                  <BeforeAfterSlider
                    image={image}
                    location={item.location}
                    {...(item.result ? { caption: item.result } : {})}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
