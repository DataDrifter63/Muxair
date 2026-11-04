import { useEffect, useRef, useState } from "react";

/**
 * Branded page scrollbar.
 *
 * The browser's own scrollbar is hidden (see styles.css) and drawn here instead, because a native
 * scrollbar sits above everything on the page: the site's custom cursor would disappear behind it.
 *  - Touch devices: a slim orange indicator that shows while scrolling and fades out.
 *  - Mouse / trackpad: a slim always-visible bar on the right edge that can be dragged, and a
 *    click on the track jumps by a page. The brand cursor shows above it.
 */
export function ScrollThumb() {
  const [mode, setMode] = useState<"touch" | "mouse" | null>(null);
  useEffect(() => {
    setMode(window.matchMedia("(hover: hover) and (pointer: fine)").matches ? "mouse" : "touch");
  }, []);
  if (mode === "mouse") return <MouseScrollbar />;
  if (mode === "touch") return <TouchIndicator />;
  return null;
}

/* ------------------------------- touch ------------------------------- */

const MARGIN = 6; // px gap from the top/bottom of the screen
const MIN_THUMB = 44; // px, so it stays easy to see on very long pages
const HIDE_AFTER_MS = 900;

function TouchIndicator() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      raf = 0;
      const view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const track = view - MARGIN * 2;
      if (total <= view + 1) {
        thumb.style.opacity = "0";
        return;
      }
      const h = Math.max(MIN_THUMB, Math.round((view / total) * track));
      const progress = Math.min(1, Math.max(0, window.scrollY / (total - view)));
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translate3d(0, ${MARGIN + progress * (track - h)}px, 0)`;
      thumb.style.opacity = "1";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        thumb.style.opacity = "0";
      }, HIDE_AFTER_MS);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 z-[65] w-2">
      <div
        ref={thumbRef}
        style={{ opacity: 0, willChange: "transform, opacity" }}
        className="absolute right-[3px] top-0 w-[4px] rounded-full bg-gradient-to-b from-[#FF9D5C] to-primary shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_2px_8px_-2px_rgba(255,107,53,0.6)] transition-opacity duration-300"
      />
    </div>
  );
}

/* ------------------------------- mouse ------------------------------- */

function MouseScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false); // false when the page doesn't scroll
  const [dragging, setDragging] = useState(false);
  const geo = useRef({ h: 0, room: 0, max: 0 }); // thumb height, travel room, scrollable distance
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const max = total - view;
      if (max <= 1) {
        setActive(false);
        return;
      }
      setActive(true);
      const track = view - MARGIN * 2;
      const h = Math.max(48, Math.round((view / total) * track));
      const room = track - h;
      geo.current = { h, room, max };
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translate3d(0, ${MARGIN + progress * room}px, 0)`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    // The page height changes as content loads / sections open, so watch it too.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queue) : null;
    ro?.observe(document.documentElement);
    ro?.observe(document.body);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onThumbDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    setDragging(true);
    document.body.style.userSelect = "none";
  };
  const onThumbMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const { room, max } = geo.current;
    if (!d || room <= 0) return;
    const next = d.startScroll + ((e.clientY - d.startY) / room) * max;
    window.scrollTo({ top: Math.min(max, Math.max(0, next)), behavior: "instant" });
  };
  const onThumbUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    drag.current = null;
    setDragging(false);
    document.body.style.userSelect = "";
  };
  // Clicking the empty track pages up or down towards the click.
  const onTrackDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const thumbTop = thumbRef.current?.getBoundingClientRect().top ?? 0;
    const dir = e.clientY < thumbTop ? -1 : 1;
    window.scrollBy({ top: dir * window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <div
      ref={trackRef}
      data-cursor-label=""
      onPointerDown={onTrackDown}
      aria-hidden
      className={`group fixed inset-y-0 right-0 z-[65] w-[14px] select-none transition-opacity duration-300 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        ref={thumbRef}
        data-cursor-label="Drag"
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
        style={{ willChange: "transform", touchAction: "none" }}
        className={`absolute right-[3px] top-0 rounded-full transition-[width,background-color] duration-150 ${
          dragging
            ? "w-[8px] bg-primary"
            : "w-[6px] bg-primary/65 group-hover:w-[8px] hover:bg-primary"
        }`}
      />
    </div>
  );
}
