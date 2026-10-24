import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ListTree } from "lucide-react";
import { MagneticButton } from "./primitives";
import type { TocHeading } from "@/lib/markdown-headings";
import { cn } from "@/lib/utils";
import type { WorkItemRow } from "@/lib/supabase";
import { workServiceHrefs, workServiceLabels, type WorkService } from "@/lib/site-data";

/** Key facts about the project: client, place, services delivered and the headline result. */
export function CaseStudySnapshot({ item }: { item: WorkItemRow }) {
  const isCool = item.tone === "cool";
  const services = (item.services ?? []) as string[];

  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        Project snapshot
      </p>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Client</dt>
          <dd className="mt-0.5 font-semibold text-foreground">{item.name}</dd>
        </div>
        {item.location ? (
          <div>
            <dt className="text-xs text-muted-foreground">Location</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.location}</dd>
          </div>
        ) : null}
        {item.category ? (
          <div>
            <dt className="text-xs text-muted-foreground">Industry</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.category}</dd>
          </div>
        ) : null}
        {services.length > 0 ? (
          <div>
            <dt className="text-xs text-muted-foreground">Services delivered</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {services.map((s) => {
                const href = workServiceHrefs[s as WorkService];
                const label = workServiceLabels[s as WorkService] ?? s;
                return href ? (
                  <Link
                    key={s}
                    to={href}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {label}
                  </span>
                );
              })}
            </dd>
          </div>
        ) : null}
        {item.result ? (
          <div className="rounded-xl border border-border bg-background/50 p-3.5">
            <dt className="text-xs text-muted-foreground">Result</dt>
            <dd
              className={cn(
                "mt-1 font-display text-base leading-snug",
                isCool ? "text-primary" : "text-heat",
              )}
            >
              {item.result}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 border-t border-border pt-5">
        <MagneticButton href="/contact" className="w-full">
          Book a Free Call
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
      </div>
    </div>
  );
}

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!ids.length) return;
    let frame = 0;

    // The active section is the last heading that has scrolled up past the fixed navbar.
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
        else break;
      }
      setActive(current ?? ids[0] ?? null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    history.replaceState(null, "", `#${id}`);
  } catch {
    /* ignore */
  }
}

function TocList({ headings, onPick }: { headings: TocHeading[]; onPick?: () => void }) {
  const active = useActiveHeading(headings.map((h) => h.id));

  // Keep the highlighted entry visible inside the (separately scrolling) sidebar list.
  useEffect(() => {
    if (!active) return;
    const link = document.querySelector<HTMLElement>(`[data-toc-id="${active}"]`);
    const box = link?.closest<HTMLElement>("[data-toc-scroll]");
    if (!link || !box) return;
    const top = link.offsetTop;
    if (top < box.scrollTop + 8 || top > box.scrollTop + box.clientHeight - 56) {
      box.scrollTo({ top: Math.max(0, top - 24), behavior: "smooth" });
    }
  }, [active]);

  return (
    <ul className="space-y-0.5 border-l border-border">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            data-toc-id={h.id}
            onClick={(e) => {
              e.preventDefault();
              goTo(h.id);
              onPick?.();
            }}
            className={cn(
              "-ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-colors",
              h.level === 3 ? "pl-7" : "pl-4 font-medium",
              active === h.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** "On this page" list. `collapsible` renders it as a closed dropdown (for phones). */
export function CaseStudyToc({
  headings,
  collapsible = false,
}: {
  headings: TocHeading[];
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (headings.length < 3) return null;

  if (collapsible) {
    return (
      <div className="rounded-2xl border border-border bg-surface/50 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ListTree className="h-4 w-4 text-primary" />
            In this case study
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
        {open ? (
          <div className="border-t border-border px-5 py-4">
            <TocList headings={headings} onPick={() => setOpen(false)} />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface/30 p-6"
    >
      <p className="flex flex-none items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <ListTree className="h-3.5 w-3.5" />
        On this page
      </p>
      <div data-toc-scroll className="relative mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        <TocList headings={headings} />
      </div>
    </nav>
  );
}
