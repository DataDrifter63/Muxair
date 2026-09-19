import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

/**
 * Interactive drag-to-reveal before/after image comparison. Drag the handle
 * (or tap/click anywhere) to reveal more of the "after" image.
 *
 * NOTE: until real before/after job photos are available per case study,
 * both sides render the same source image — "before" desaturated, "after"
 * full colour — so the slider still demonstrates correctly. Swap in real
 * photography (e.g. two Cloudinary URLs from the case_studies table) when
 * available; the component itself doesn't need to change.
 */
export function BeforeAfterSlider({
  image,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  location,
}: {
  image: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  location?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-border"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      {/* After (full colour, base layer) */}
      <img
        src={image}
        alt={caption ? `After: ${caption}` : "After"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-md">
        {afterLabel}
      </span>

      {/* Before (desaturated, clipped to the left of the handle) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={image}
          alt={caption ? `Before: ${caption}` : "Before"}
          className="h-full w-full object-cover grayscale brightness-90"
          style={{ width: containerWidth || "100%" }}
          draggable={false}
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md">
          {beforeLabel}
        </span>
      </div>

      {/* Drag handle */}
      <div
        className="pointer-events-none absolute inset-y-0 flex w-0.5 -translate-x-1/2 items-center bg-background/90"
        style={{ left: `${position}%` }}
      >
        <span className="flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg">
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
