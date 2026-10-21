import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Flame, PlayCircle, Snowflake } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import heroSite1 from "@/assets/hero-site-1.webp";
import heroSite2 from "@/assets/hero-site-2.webp";
import { MagneticButton } from "./primitives";

const headline = ["Websites Built for", "HVAC Companies", "That Want More Booked Jobs"];

/**
 * Hero visual: two tilted browser windows whose page screenshots scroll on their own.
 *
 * TO CHANGE THE IMAGES: replace `image` (a Cloudinary URL, or an imported file) and `label`
 * (the address shown in the browser bar) below. Use TALL, full-page screenshots of a website
 * (about 800-1200px wide) — the taller the screenshot, the more scrolling you see. Images are
 * never stretched: they fill the window width and slide from the top of the page to the bottom.
 */
const heroSites: { label: string; image: string }[] = [
  { label: "klarta.com", image: heroSite1 },
  { label: "oracledental.com.au", image: heroSite2 },
];

/** Cloudinary URLs: add auto format/quality and cap the width (no cropping). Others untouched. */
function optimiseImage(url: string, width = 1000): string {
  const marker = "/image/upload/";
  const at = url.indexOf(marker);
  if (!url.includes("res.cloudinary.com") || at === -1) return url;
  const head = url.slice(0, at + marker.length);
  const rest = url.slice(at + marker.length);
  const first = rest.split("/")[0] ?? "";
  if (first.includes(",") || /^[a-z]{1,3}_/.test(first)) return url;
  return `${head}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}

/** On-screen scroll speed of the hero screenshots, in px per second (same for both windows). */
const SCAN_PX_PER_SECOND = 45;

function BrowserFrame({
  label,
  image,
  className,
  tilt,
  aspect,
  priority = false,
}: {
  label: string;
  image: string;
  className: string;
  tilt: number;
  aspect: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const [scanSeconds, setScanSeconds] = useState<number | null>(null);

  // Both windows scroll at the same on-screen speed (SCAN_PX_PER_SECOND), whatever the
  // screenshot's height or the window's size: duration = distance to travel / speed.
  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.clientWidth) return;
    const renderedHeight = img.naturalHeight * (img.clientWidth / img.naturalWidth);
    const distance = Math.max(0, renderedHeight - img.clientHeight);
    setScanSeconds(Math.max(8, distance / SCAN_PX_PER_SECOND));
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(img);
    return () => ro.disconnect();
  }, [measure]);

  const scan =
    reduceMotion || scanSeconds === null
      ? {}
      : {
          animate: { objectPosition: ["50% 0%", "50% 100%"] },
          transition: {
            duration: scanSeconds,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "linear" as const,
          },
        };

  return (
    <motion.div
      style={{ rotate: tilt }}
      className={`absolute overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_50px_90px_-30px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3.5 py-2.5">
        <i className="h-[9px] w-[9px] rounded-full bg-border" />
        <i className="h-[9px] w-[9px] rounded-full bg-border" />
        <i className="h-[9px] w-[9px] rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate text-left text-[11px] text-muted-foreground">
          {label}
        </span>
      </div>
      <motion.img
        ref={imgRef}
        onLoad={measure}
        src={optimiseImage(image)}
        alt={`Website design example: ${label}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        style={{ objectPosition: "50% 0%" }}
        className={`block w-full object-cover ${aspect}`}
        {...scan}
      />
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-tech opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <motion.div
          style={{ y: glowY }}
          className="absolute -top-40 left-1/2 h-[36rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]"
        />
        <div className="absolute right-[8%] top-1/3 h-64 w-64 rounded-full bg-heat/12 blur-[110px]" />
        <svg
          className="absolute inset-x-0 top-1/4 h-72 w-full opacity-50"
          viewBox="0 0 1200 300"
          fill="none"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M-50 ${70 + i * 48} C 300 ${20 + i * 48}, 620 ${140 + i * 48}, 1250 ${50 + i * 48}`}
              stroke="url(#airflow)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            />
          ))}
          <defs>
            <linearGradient id="airflow" x1="0" x2="1">
              <stop offset="0%" stopColor="#FF9D5C" stopOpacity="0" />
              <stop offset="45%" stopColor="#FF9D5C" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md"
          >
            <Snowflake className="h-3.5 w-3.5" />
            HVAC-only growth studio
            <Flame className="h-3.5 w-3.5 text-heat" />
          </motion.span>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[2.3rem] xl:text-[2.7rem]">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? <span className="text-gradient-cool">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We're a specialist web design agency working exclusively with heating, cooling, and air
            quality businesses. No generalists. No guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact" size="lg">
              Get a Free Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost" size="lg">
              <PlayCircle className="h-4 w-4" />
              See Our Work
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
          >
            {["Top-Rated on Upwork ", "7 Years Experience", " HVAC-Only Studio "].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-primary/70" /> : null}
                <span>{t}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          style={{ y: mockY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[1/1.05] w-full min-w-0"
        >
          {/* soft glow behind the windows */}
          <div
            className="pointer-events-none absolute inset-x-[8%] inset-y-[6%] rounded-full bg-primary/25 blur-[70px]"
            aria-hidden
          />

          {heroSites[0] ? (
            <BrowserFrame
              label={heroSites[0].label}
              image={heroSites[0].image}
              className="right-0 top-0 z-10 w-[82%]"
              tilt={2.5}
              aspect="aspect-[4/4.4]"
              priority
            />
          ) : null}
          {heroSites[1] ? (
            <BrowserFrame
              label={heroSites[1].label}
              image={heroSites[1].image}
              className="bottom-0 left-0 z-20 w-[56%]"
              tilt={-3.5}
              aspect="aspect-[4/4.6]"
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
