import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Thin bar at the very top that shows while a page is loading after a link click, so the
 * person sees something is happening instead of the old page just sitting there. It only
 * appears if loading takes longer than a moment, so fast navigations don't flash.
 */
export function NavProgress() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!pending) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(t);
  }, [pending]);

  if (!show) return null;
  return (
    <div
      data-nav-progress
      role="progressbar"
      aria-label="Loading page"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] overflow-hidden bg-primary/15"
    >
      <div className="nav-progress-bar h-full w-1/3 rounded-full bg-primary" />
    </div>
  );
}
