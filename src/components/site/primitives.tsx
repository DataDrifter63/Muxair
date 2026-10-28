import { m as motion, useInView, useSpring, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// One shared IntersectionObserver for every <Reveal> on the page (cheaper than a motion component
// per block). The entrance itself is plain CSS (.reveal in styles.css); the observer only flips a
// data attribute, so React never re-renders for it.
let revealObserver: IntersectionObserver | null = null;
function observeReveal(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    el.setAttribute("data-in", "");
    return () => {};
  }
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-in", "");
          revealObserver?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -80px 0px" },
  );
  revealObserver.observe(el);
  return () => revealObserver?.unobserve(el);
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    return el ? observeReveal(el) : undefined;
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      ) : null}
      <As className="mt-5 text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">{title}</As>
      {subtitle ? (
        <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function MagneticButton({
  children,
  href = "#contact",
  variant = "cool",
  className,
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  variant?: "cool" | "ghost" | "heat" | "light";
  className?: string;
  size?: "md" | "lg";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const tx = useTransform(x, (v) => v);
  const ty = useTransform(y, (v) => v);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: tx, y: ty }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-300",
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
        variant === "cool" &&
          "bg-primary text-primary-foreground shadow-[0_18px_50px_-18px_var(--primary)] hover:brightness-110",
        variant === "heat" &&
          "bg-heat text-heat-foreground shadow-[0_18px_50px_-18px_var(--heat)] hover:brightness-110",
        variant === "light" &&
          "bg-white text-heat shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)] hover:bg-white/90",
        variant === "ghost" &&
          "border border-border bg-surface/40 text-foreground backdrop-blur-md hover:border-primary/60 hover:text-primary",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:animate-[sweep_0.9s_ease-out] group-hover:opacity-100" />
    </motion.a>
  );
}

export function TechBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-0 grid-tech opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[110px] animate-drift" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-heat/10 blur-[120px]" />
    </div>
  );
}
