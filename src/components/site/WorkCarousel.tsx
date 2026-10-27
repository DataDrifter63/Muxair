import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkItemRow } from "@/lib/supabase";
import { workServiceLabels, type WorkService } from "@/lib/site-data";

const AUTOPLAY_MS = 4500; // time each case study stays in the center
const RESUME_DELAY_MS = 1500; // wait after the mouse leaves before auto-scroll resumes
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Start on the middle case study so there are cards visible on both the left
// and right sides, and the user can scroll either way.
const centerIndex = (length: number) => Math.max(0, Math.floor((length - 1) / 2));

// Shortest signed distance on a loop of `n` cards (0 = center, -1 = one left, ...).
function wrapOffset(d: number, n: number) {
  let o = ((d % n) + n) % n;
  if (o > n / 2) o -= n;
  return o;
}

type View = { active: number; jumped: ReadonlySet<number> };

// Moves to `target` (looping). `jumped` holds the cards that wrap from one end
// of the stack to the other, so they can be repositioned instantly instead of
// flying across the whole carousel.
function advance(v: View, target: number, n: number): View {
  const next = ((target % n) + n) % n;
  if (n === 0 || next === v.active) return v;
  const step = wrapOffset(next - v.active, n);
  const jumped = new Set<number>();
  for (let i = 0; i < n; i++) {
    if (wrapOffset(i - v.active, n) - step !== wrapOffset(i - next, n)) jumped.add(i);
  }
  return { active: next, jumped };
}

export function WorkCarousel({ items }: { items: WorkItemRow[] }) {
  const n = items.length;
  const [view, setView] = useState<View>(() => ({
    active: centerIndex(n),
    jumped: new Set<number>(),
  }));
  const { active, jumped } = view;
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const swipeX = useRef<number | null>(null);

  // Re-center whenever the list changes (e.g. switching the category filter).
  useEffect(() => {
    setView({ active: centerIndex(n), jumped: new Set<number>() });
  }, [items, n]);

  const go = (delta: number) => setView((v) => advance(v, v.active + delta, n));
  const goTo = (i: number) => setView((v) => advance(v, i, n));

  // Pause while the mouse / finger / keyboard focus is on the carousel, then
  // resume a moment after it leaves.
  const pause = () => {
    clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const resumeSoon = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  };
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  // Auto-advance. The timer restarts after every move (manual or automatic),
  // so a click never gets followed by an instant auto-slide.
  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        setView((v) => advance(v, v.active + 1, n));
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, n, active]);

  if (n === 0) return null;

  return (
    <div
      className="mt-10 overflow-x-clip"
      onMouseEnter={pause}
      onMouseLeave={resumeSoon}
      onFocusCapture={pause}
      onBlurCapture={resumeSoon}
      onTouchStart={(e) => {
        swipeX.current = e.touches[0]?.clientX ?? null;
        pause();
      }}
      onTouchEnd={(e) => {
        const start = swipeX.current;
        const end = e.changedTouches[0]?.clientX;
        swipeX.current = null;
        // Swipe left/right to move between case studies on touch screens.
        if (start !== null && end !== undefined && Math.abs(end - start) > 45) {
          go(end < start ? 1 : -1);
        }
        resumeSoon();
      }}
    >
      <div className="relative h-[420px] sm:h-[440px]">
        {items.map((project, i) => {
          const offset = wrapOffset(i - active, n);
          const abs = Math.abs(offset);
          const visible = abs <= 2;
          const slot = Math.max(-3, Math.min(3, offset));

          return (
            <motion.div
              key={project.id}
              className="absolute inset-y-0 left-1/2 w-[85%] max-w-xl sm:w-[70%]"
              style={{
                zIndex: 10 - abs,
                willChange: "transform, opacity",
                pointerEvents: visible ? "auto" : "none",
              }}
              initial={false}
              animate={{
                x: `${-50 + slot * 46}%`,
                scale: abs === 0 ? 1 : abs === 1 ? 0.86 : abs === 2 ? 0.74 : 0.62,
                opacity: visible ? 1 : 0,
              }}
              transition={jumped.has(i) ? { duration: 0 } : { duration: 0.7, ease: EASE }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                aria-hidden={abs !== 0}
                tabIndex={abs === 0 ? 0 : -1}
                onClick={(e) => {
                  if (abs !== 0) {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-background">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={`Website design preview for ${project.name}`}
                      width={1600}
                      height={900}
                      loading={abs <= 3 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="pointer-events-none absolute inset-0 grid-tech opacity-30"
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                      project.tone === "cool"
                        ? "border-primary/40 bg-background text-primary"
                        : "border-heat/40 bg-background text-heat",
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

      {/* Nav arrows (loop: they never get disabled) */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous case study"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Progress bar */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-border sm:w-56">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((active + 1) / n) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next case study"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
