import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ArrowLeftRight } from "lucide-react";

/**
 * Interactive drag-to-reveal before/after image comparison. Drag the handle
 * (or click/tap anywhere, or focus + arrow keys) to reveal more of the
 * "after" photo. The first time it scrolls into view it does a quick
 * automatic sweep so people notice it's draggable, then hands control back.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  location,
  className = "",
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  location?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragging = useRef(false);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // One-time hint sweep the first time this scrolls into view — cancels
  // immediately if the person starts dragging before it finishes.
  useEffect(() => {
    if (!inView || hasInteracted) return;
    const sweep = [50, 28, 72, 50];
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      const next = sweep[step];
      if (next === undefined) {
        clearInterval(id);
        return;
      }
      setPosition(next);
    }, 550);
    return () => clearInterval(id);
  }, [inView, hasInteracted]);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={caption ? `Before and after: ${caption}` : "Before and after comparison"}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${className}`}
      onPointerDown={(e) => {
        setHasInteracted(true);
        setIsDragging(true);
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
        setIsDragging(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          setHasInteracted(true);
          setPosition((p) => Math.max(0, p - 5));
        } else if (e.key === "ArrowRight") {
          setHasInteracted(true);
          setPosition((p) => Math.min(100, p + 5));
        }
      }}
    >
      {/* After (full colour, base layer) */}
      <img
        src={afterImage}
        alt={caption ? `After: ${caption}` : "After"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-md">
        {afterLabel}
      </span>

      {/* Before (clipped to the left of the handle) */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          isDragging ? "" : "transition-[width] duration-500 ease-out"
        }`}
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt={caption ? `Before: ${caption}` : "Before"}
          className="h-full w-full object-cover"
          style={{ width: containerWidth || "100%" }}
          draggable={false}
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md">
          {beforeLabel}
        </span>
      </div>

      {/* Drag handle */}
      <div
        className={`pointer-events-none absolute inset-y-0 flex w-0.5 -translate-x-1/2 items-center bg-background/90 ${
          isDragging ? "" : "transition-[left] duration-500 ease-out"
        }`}
        style={{ left: `${position}%` }}
      >
        <span className="flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
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
