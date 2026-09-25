import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkItemRow } from "@/lib/supabase";
import { workServiceLabels, type WorkService } from "@/lib/site-data";

export function WorkCarousel({ items }: { items: WorkItemRow[] }) {
  const [active, setActive] = useState(0);

  function go(delta: number) {
    setActive((a) => Math.max(0, Math.min(items.length - 1, a + delta)));
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="relative h-[420px] sm:h-[440px]">
        {items.map((project, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          return (
            <motion.div
              key={project.id}
              className="absolute inset-y-0 left-1/2 w-[85%] max-w-xl sm:w-[70%]"
              style={{ zIndex: 10 - abs }}
              animate={{
                x: `calc(-50% + ${offset * 46}%)`,
                scale: abs === 0 ? 1 : abs === 1 ? 0.86 : 0.74,
                opacity: abs === 0 ? 1 : abs === 1 ? 0.5 : 0.2,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                aria-hidden={abs !== 0}
                tabIndex={abs === 0 ? 0 : -1}
                onClick={(e) => {
                  if (abs !== 0) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 shadow-xl backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-background/60">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={`Website design preview for ${project.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="pointer-events-none absolute inset-0 grid-tech opacity-30"
                      aria-hidden
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90" />
                  <span
                    className={cn(
                      "absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md",
                      project.tone === "cool"
                        ? "border-primary/40 bg-background/80 text-primary"
                        : "border-heat/40 bg-background/80 text-heat",
                    )}
                  >
                    {project.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg leading-snug sm:text-xl">{project.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{project.location}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {workServiceLabels[s as WorkService] ?? s}
                      </span>
                    ))}
                  </div>

                  <span
                    className={cn(
                      "mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold",
                      project.tone === "cool" ? "text-primary" : "text-heat",
                    )}
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous case study"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Progress bar */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-border sm:w-56">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((active + 1) / items.length) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === items.length - 1}
          aria-label="Next case study"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
