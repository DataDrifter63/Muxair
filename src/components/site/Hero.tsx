import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Flame, PlayCircle, Snowflake, TrendingUp } from "lucide-react";
import { useRef } from "react";
import heroMockup from "@/assets/hero-mockup.jpg";
import { MagneticButton } from "./primitives";

const headline = ["Websites Built for", "HVAC Companies", "That Want More Booked Jobs"];

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
            {["Top-Rated on Upwork", "50+ Projects", "HVAC-Only Studio"].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-primary/70" /> : null}
                <span>{t}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          style={{ y: mockY }}
          initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 [perspective:1400px]"
        >
          <div className="relative rounded-2xl border border-border bg-surface/60 p-2 backdrop-blur-xl glow-cool">
            <img
              src={heroMockup}
              alt="Example of a modern HVAC company website designed by our agency, showing heating, cooling and air quality service cards with a free quote call to action"
              width={1200}
              height={912}
              fetchPriority="high"
              className="w-full rounded-xl"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
          </div>

          <motion.div
            className="absolute -left-4 top-10 hidden items-center gap-2.5 rounded-xl border border-border bg-background/85 px-3.5 py-2.5 backdrop-blur-xl sm:flex"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp className="h-4 w-4 text-primary" />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Rank #1 · "boiler repair"</p>
              <p className="text-[11px] text-muted-foreground">Local pack, 4 months</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-3 bottom-10 hidden items-center gap-2.5 rounded-xl border border-heat/30 bg-background/85 px-3.5 py-2.5 backdrop-blur-xl sm:flex glow-heat"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <Flame className="h-4 w-4 text-heat" />
            <div className="leading-tight">
              <p className="text-xs font-semibold">+38 quote requests</p>
              <p className="text-[11px] text-muted-foreground">This month</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
