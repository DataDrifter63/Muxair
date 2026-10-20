import { useEffect, useRef } from "react";

const BRAND = "#F77036";
const BRAND_RGB: [number, number, number] = [247, 112, 54];
const INTERACTIVE =
  'a, button, [role="button"], [role="slider"], [role="tab"], summary, label[for], select, input[type="range"], input[type="checkbox"], input[type="radio"], [data-cursor-label]';
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
 * Text shown next to the fan over interactive things. Override per element with
 * data-cursor-label="Text" (or data-cursor-label="" to show no label at all).
 */
function labelFor(start: Element | null): string | null {
  if (!start) return null;
  const explicit = start.closest<HTMLElement>("[data-cursor-label]");
  if (explicit) return explicit.dataset["cursorLabel"] || null;

  const el = start.closest<HTMLElement>(INTERACTIVE);
  if (!el) return null;
  const aria = (el.getAttribute("aria-label") ?? "").toLowerCase();
  const text = (el.textContent ?? "").trim().toLowerCase();

  if (el.matches('input[type="range"], [role="slider"]')) return "Drag";
  if (el.matches('input[type="checkbox"], input[type="radio"]')) return null;
  if (/prev/.test(aria)) return "Prev";
  if (/next/.test(aria)) return "Next";
  if (/theme|dark|light mode/.test(aria)) return "Theme";
  if (/menu/.test(aria)) return "Menu";
  if (/close/.test(aria)) return "Close";

  if (el.tagName === "A") {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) return "Call";
    if (href.startsWith("mailto:")) return "Email";
    if (
      /^https?:\/\//.test(href) &&
      !href.includes(location.hostname) &&
      !href.includes("muxair.com")
    )
      return "Open ↗";
    if (
      /strategy call|book|get a (free )?quote|get started|free audit/.test(text) ||
      /contact/.test(href)
    )
      return "Book a Call →";
    if (/\/blog/.test(href)) return "Read";
    if (/\/(work|services|pricing)/.test(href)) return "View";
    if (href === "/" || href === "") return "Home";
    return "Open";
  }

  if (
    el.tagName === "BUTTON" ||
    el.getAttribute("role") === "button" ||
    el.getAttribute("role") === "tab"
  ) {
    if ((el as HTMLButtonElement).type === "submit") return "Send →";
    if (el.hasAttribute("aria-expanded"))
      return el.getAttribute("aria-expanded") === "true" ? "Close" : "Open";
    if (/strategy call|book|get a (free )?quote/.test(text)) return "Book a Call →";
    return "Click";
  }
  return null;
}

/**
 * Brand cursor: a three-blade fan in #F77036 that spins with mouse speed (faster over links),
 * with a small label pill beside it on interactive elements. Turns white wherever the
 * background is already that orange. Steps aside (native caret) over text fields.
 * Only mounts for mouse / trackpad users — touch devices keep the default behaviour.
 */
export function CustomCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const rot = useRef<SVGGElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    const w = wrap.current;
    const g = rot.current;
    const lab = labelRef.current;
    if (!w || !g || !lab) return;

    root.classList.add("has-custom-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = -200;
    let my = -200;
    let px = -200;
    let py = -200;
    let fx = -200;
    let fy = -200;
    let angle = 0;
    let spin = 2;
    let hover = false;
    let down = false;
    let light = false;
    let native = false;
    let visible = false;
    let label: string | null = null;
    let target: Element | null = null;
    let queued = false;
    let raf = 0;

    const evaluate = () => {
      queued = false;
      native = !!target?.closest(NATIVE);
      hover = !native && !!target?.closest(INTERACTIVE);
      label = native ? null : labelFor(target);
      light = onBrandBackground(target);
      if (label) lab.textContent = label;
      w.classList.toggle("is-light", light);
      w.classList.toggle("is-hover", hover);
      w.classList.toggle("has-label", !!label);
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(evaluate);
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      visible = true;
      target = e.target as Element | null;
      queue();
    };
    const onDown = () => {
      down = true;
      w.classList.add("is-down");
    };
    const onUp = () => {
      down = false;
      w.classList.remove("is-down");
    };
    const onLeave = () => {
      visible = false;
    };
    const onScroll = () => {
      // The page moved under a still pointer: re-check what's below it.
      const t = document.elementFromPoint(mx, my);
      if (t && t !== target) {
        target = t;
        queue();
      }
    };
    const onClickCapture = () => queue(); // aria-expanded etc. may change the label

    const tick = () => {
      const speed = Math.hypot(mx - px, my - py);
      px = mx;
      py = my;
      const goal = reduce ? 1 : 1.6 + Math.min(speed * 1.1, 48) + (hover ? 14 : 0);
      spin += (goal - spin) * (goal > spin ? 0.18 : 0.035);
      angle = (angle + spin) % 360;
      fx += (mx - fx) * 0.35;
      fy += (my - fy) * 0.35;
      g.setAttribute("transform", `rotate(${angle})`);
      w.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
      w.classList.toggle("is-visible", visible && !native);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClickCapture, true);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClickCapture, true);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="muxair-cursor" style={{ color: BRAND }}>
      <div className="muxair-fan">
        <div className="muxair-fan-scale">
          <svg viewBox="-22 -22 44 44">
            <defs>
              <path
                id="muxair-blade"
                d="M0 -1.5 C 6 -3, 11 -10, 9 -19 C 2 -19, -3 -13, -2.5 -5 C -2.4 -3.2, -1.2 -1.8, 0 -1.5 Z"
              />
            </defs>
            <g ref={rot} fill="currentColor">
              <use href="#muxair-blade" />
              <use href="#muxair-blade" transform="rotate(120)" />
              <use href="#muxair-blade" transform="rotate(240)" />
              <circle r="3.4" fill="var(--cursor-inv)" />
              <circle r="1.4" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
      <div className="muxair-pill">
        <span ref={labelRef} />
      </div>
    </div>
  );
}
