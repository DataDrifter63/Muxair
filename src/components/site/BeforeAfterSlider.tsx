import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ArrowLeftRight } from "lucide-react";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Interactive drag-to-reveal before/after image comparison.
 *
 * - Drag the handle (or press anywhere with a mouse, or tap) to move the divider.
 * - Keyboard: focus it, then use the arrow keys (Shift = bigger steps, Home/End = edges).
 * - The first time it scrolls into view it does one gentle sweep so people notice it
 *   is draggable (skipped for users who prefer reduced motion).
 * - Touch: vertical swipes still scroll the page; only a horizontal drag moves the slider.
 *
 * The "before" image is revealed with `clip-path`, so both images always share the exact
 * same frame (no width syncing) and dragging stays smooth.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  location,
  className = "",
  fit = "cover",
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  location?: string;
  className?: string;
  /** "cover" fills the frame (crops); "contain" shows the whole image, centred. */
  fit?: "cover" | "contain";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const positionRef = useRef(50);
  const dragging = useRef(false);
  const pressStart = useRef<{ x: number; y: number; touch: boolean } | null>(null);
  const rafRef = useRef<number | null>(null);

  const inView = useInView(containerRef, { once: true, margin: "-10%" });
  const fitClass = fit === "contain" ? "object-contain object-center" : "object-cover";

  const setPos = useCallback((value: number) => {
    const next = clamp(value);
    positionRef.current = next;
    setPosition(next);
  }, []);

  const cancelGlide = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  /** Smoothly animate the divider to `to` (eased). Cancelled by any user input. */
  const glide = useCallback(
    (to: number, duration = 600, onDone?: () => void) => {
      cancelGlide();
      const from = positionRef.current;
      const startedAt = performance.now();
      const step = () => {
        const t = Math.min(1, Math.max(0, (performance.now() - startedAt) / duration));
        setPos(from + (clamp(to) - from) * easeInOutCubic(t));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          onDone?.();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [cancelGlide, setPos],
  );

  // One-time hint sweep the first time this scrolls into view.
  useEffect(() => {
    if (!inView || hasInteracted) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      glide(32, 700, () => glide(68, 1000, () => glide(50, 700)));
    }, 450);
    return () => window.clearTimeout(timer);
  }, [inView, hasInteracted, glide]);

  useEffect(() => cancelGlide, [cancelGlide]);

  const percentFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return positionRef.current;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return positionRef.current;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }, []);

  const beginDrag = (pointerId: number) => {
    dragging.current = true;
    setIsDragging(true);
    try {
      containerRef.current?.setPointerCapture(pointerId);
    } catch {
      /* pointer may already be released */
    }
  };

  const endDrag = () => {
    dragging.current = false;
    pressStart.current = null;
    setIsDragging(false);
  };

  const nudge = (delta: number) => {
    cancelGlide();
    setHasInteracted(true);
    glide(positionRef.current + delta, 220);
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={caption ? `Before and after: ${caption}` : "Before and after comparison"}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`group relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        isDragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        cancelGlide();
        setHasInteracted(true);
        const touch = e.pointerType !== "mouse";
        pressStart.current = { x: e.clientX, y: e.clientY, touch };
        if (!touch) {
          // Mouse / pen: jump to the pointer and start dragging straight away.
          beginDrag(e.pointerId);
          setPos(percentFromClientX(e.clientX));
        }
        // Touch: wait to see whether this is a horizontal drag (slider) or a vertical scroll.
      }}
      onPointerMove={(e) => {
        if (!dragging.current) {
          const start = pressStart.current;
          if (!start || !start.touch) return;
          const dx = Math.abs(e.clientX - start.x);
          const dy = Math.abs(e.clientY - start.y);
          if (dx > 6 && dx > dy) beginDrag(e.pointerId);
          else return;
        }
        setPos(percentFromClientX(e.clientX));
      }}
      onPointerUp={(e) => {
        const wasTap = !dragging.current && pressStart.current !== null;
        if (wasTap) glide(percentFromClientX(e.clientX), 320); // tap on touch: glide there
        endDrag();
      }}
      onPointerCancel={endDrag}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 15 : 5;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          nudge(-step);
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          nudge(step);
        } else if (e.key === "Home") {
          e.preventDefault();
          nudge(-100);
        } else if (e.key === "End") {
          e.preventDefault();
          nudge(100);
        }
      }}
    >
      {/* After (base layer) */}
      <img
        src={afterImage}
        alt={caption ? `After: ${caption}` : "After"}
        className={`absolute inset-0 h-full w-full ${fitClass}`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* Before (same frame, revealed from the left with clip-path) */}
      <div
        className={`absolute inset-0 will-change-[clip-path] ${fit === "contain" ? "bg-surface" : ""}`}
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt={caption ? `Before: ${caption}` : "Before"}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Labels fade out as the divider reaches their edge */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: position > 14 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: position < 86 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <span
          className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
            isDragging ? "scale-110" : "group-hover:scale-105"
          }`}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </span>
      </div>

      {caption || location ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-background/90 to-transparent px-4 pb-3 pt-8">
          {caption ? (
            <span className="text-sm font-semibold text-foreground">{caption}</span>
          ) : null}
          {location ? <span className="text-xs text-muted-foreground">{location}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
