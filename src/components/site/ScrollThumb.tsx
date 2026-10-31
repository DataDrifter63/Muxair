import { useEffect, useRef } from "react";

const MARGIN = 6; // px gap from the top/bottom of the screen
const MIN_THUMB = 44; // px, so it stays easy to see on very long pages
const HIDE_AFTER_MS = 900;

/**
 * Slim orange scroll indicator for touch devices (the native one is hidden there in
 * styles.css because it can't be styled on iOS). It appears while scrolling, shows where you
 * are on the page and fades out when you stop. It is purely visual and never intercepts touches.
 * On desktop the normal scrollbar is used instead (also styled in styles.css), so this renders nothing.
 */
export function ScrollThumb() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const thumb = thumbRef.current;
    if (!thumb) return;

    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const view = window.innerHeight;
      const total = doc.scrollHeight;
      const track = view - MARGIN * 2;
      if (total <= view + 1) {
        thumb.style.opacity = "0";
        return;
      }
      const h = Math.max(MIN_THUMB, Math.round((view / total) * track));
      const progress = Math.min(1, Math.max(0, window.scrollY / (total - view)));
      const y = MARGIN + progress * (track - h);
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translate3d(0, ${y}px, 0)`;
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
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-[65] w-2 [@media(hover:hover)]:hidden"
    >
      <div
        ref={thumbRef}
        style={{ opacity: 0, willChange: "transform, opacity" }}
        className="absolute right-[3px] top-0 w-[4px] rounded-full bg-gradient-to-b from-[#FF9D5C] to-primary shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_2px_8px_-2px_rgba(255,107,53,0.6)] transition-opacity duration-300"
      />
    </div>
  );
}
