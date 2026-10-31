import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SHOW_AFTER = 500; // px scrolled before the button appears
const R = 20;
const CIRC = 2 * Math.PI * R;

/**
 * Floating "back to top" button. Appears after scrolling down, shows a thin ring that fills as
 * you read down the page, and smooth-scrolls to the top on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      ringRef.current?.style.setProperty("stroke-dashoffset", String(CIRC * (1 - p)));
      setVisible(y > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <circle cx="24" cy="24" r={R} className="stroke-border" strokeWidth="2" />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={R}
          className="stroke-primary transition-colors group-hover:stroke-primary-foreground"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
        />
      </svg>
      <ArrowUp className="relative h-4 w-4 transition-transform group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />
    </button>
  );
}
