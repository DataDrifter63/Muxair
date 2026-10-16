import { useEffect, useRef } from "react";

const BRAND = "#F77036";
const BRAND_RGB: [number, number, number] = [247, 112, 54];
const INTERACTIVE =
  'a, button, [role="button"], summary, label[for], select, input[type="range"], input[type="checkbox"], input[type="radio"], [data-cursor="hover"]';
const NATIVE =
  'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';
const COLOR_TOKEN =
  /(rgba?\([^)]+\)|oklch\([^)]+\)|oklab\([^)]+\)|lab\([^)]+\)|lch\([^)]+\)|color\([^)]+\)|#[0-9a-f]{3,8})/gi;

let ctx: CanvasRenderingContext2D | null = null;
const cache = new Map<string, [number, number, number, number] | null>();

/** Normalises any CSS colour (rgb, oklch, hex...) to sRGBA through a 1px canvas. */
function toRgba(color: string): [number, number, number, number] | null {
  if (cache.has(color)) return cache.get(color) ?? null;
  if (!ctx) {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    ctx = c.getContext("2d", { willReadFrequently: true });
  }
  let out: [number, number, number, number] | null = null;
  if (ctx) {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    out = [d[0] ?? 0, d[1] ?? 0, d[2] ?? 0, d[3] ?? 0];
  }
  cache.set(color, out);
  return out;
}

function isBrand(rgba: [number, number, number, number] | null, minAlpha = 200) {
  if (!rgba || rgba[3] < minAlpha) return false;
  const [r, g, b] = BRAND_RGB;
  return Math.hypot(rgba[0] - r, rgba[1] - g, rgba[2] - b) < 70;
}

/** True when the pixel under the pointer is (visually) the brand orange. */
function onBrandBackground(start: Element | null): boolean {
  for (let el = start; el; el = el.parentElement) {
    if ((el as HTMLElement).dataset?.["cursor"] === "light") return true;
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const rgba = toRgba(bg);
      if (rgba && rgba[3] >= 200) return isBrand(rgba);
    }
    const img = cs.backgroundImage;
    if (img && img.includes("gradient")) {
      const tokens = img.match(COLOR_TOKEN) ?? [];
      const hits = tokens.filter((t) => isBrand(toRgba(t), 160)).length;
      if (hits > 0 && hits >= tokens.length / 2) return true;
    }
  }
  return false;
}

/**
 * Brand cursor: a small dot plus a trailing ring in #F77036. It turns white over any
 * element whose background is already that orange, grows over links/buttons, and
 * steps aside (native caret) over text fields. Only mounts for mouse / trackpad users.
 */
export function CustomCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    const w = wrap.current;
    const d = dot.current;
    const r = ring.current;
    if (!w || !d || !r) return;

    root.classList.add("has-custom-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let hover = false;
    let down = false;
    let light = false;
    let native = false;
    let visible = false;
    let raf = 0;
    let checkQueued = false;
    let lastTarget: Element | null = null;

    const paint = () => {
      w.style.color = light ? "#ffffff" : BRAND;
      w.style.opacity = visible && !native ? "1" : "0";
      d.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${hover ? 0 : down ? 0.7 : 1})`;
    };

    const evaluate = () => {
      checkQueued = false;
      const t = lastTarget;
      native = !!t?.closest(NATIVE);
      hover = !native && !!t?.closest(INTERACTIVE);
      light = onBrandBackground(t);
      ring.current?.classList.toggle("is-hover", hover);
      paint();
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      visible = true;
      lastTarget = e.target as Element | null;
      if (!checkQueued) {
        checkQueued = true;
        requestAnimationFrame(evaluate);
      }
      paint();
    };
    const onDown = () => {
      down = true;
      r.classList.add("is-down");
      paint();
    };
    const onUp = () => {
      down = false;
      r.classList.remove("is-down");
      paint();
    };
    const onLeave = () => {
      visible = false;
      paint();
    };
    const onScroll = () => {
      // Page moved under a still pointer: re-check what's below it.
      const t = document.elementFromPoint(mx, my);
      if (t && t !== lastTarget && !checkQueued) {
        lastTarget = t;
        checkQueued = true;
        requestAnimationFrame(evaluate);
      }
    };

    const tick = () => {
      const k = reduce ? 1 : 0.18;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="muxair-cursor pointer-events-none fixed inset-0 z-[9999] opacity-0"
      style={{ color: BRAND }}
    >
      <div ref={ring} className="muxair-cursor-ring">
        <span />
      </div>
      <div ref={dot} className="muxair-cursor-dot" />
    </div>
  );
}
