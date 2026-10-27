import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const testimonials = [
  {
    name: "Sam T",
    role: "Owner",
    location: "Swansea, UK",
    initials: "ST",
    quote:
      "Couldn't be happier with Musab's work. The communication was very prompt and clear. I never had to explain anything twice and he delivered on everything we discussed. I would highly recommend his services and wouldn't hesitate to utilise his skills again in the future.",
    stat: "New Website Design",
  },
  {
    name: "Raymond C.",
    role: "CEO",
    location: "New York, US",
    initials: "RC",
    quote:
      "Helped up with completely revamping one site and updating another. Very communicative and easy to work with. Such a pleasure collaborating on these projects, thank you Musab !",
    stat: "SEO & Website Revamp",
  },
  {
    name: "Alan W",
    role: "Director",
    location: "Olympia, US",
    initials: "AW",
    quote:
      "Musab did a great job! Paid close attention to detail and delivered what he promised. Spent considerable time after the initial site was completed getting page speed insights score to 100. Will hire Musab for any other web development project I have. Thanks again!",
    stat: "Website Design & Performance Optimization",
  },
  {
    name: "Rachel W",
    role: "Business Owner",
    location: "London, UK",
    initials: "RW",
    quote:
      "Isbah is very professional. He pays attention to details, carefully asks about changes, and executes them professionally. I would gladly work with him again in the future. I can recommend him to anyone.",
    stat: "Website Design & Local SEO",
  },
  {
    name: "Summit M",
    role: "Agency Owner",
    location: "Colorado, US",
    initials: "US",
    quote:
      "Working with Muhammad was great! He was easy to communicate with, understood our requests perfectly, and went above and beyond to try to help us with our timeline and budget.",
    stat: "Website Launch in 14 days",
  },
];

export function Results() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const active = testimonials[index]!;

  return (
    <section id="testimonials" className="section-shell border-y border-border bg-surface">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Results"
          title={
            <>
              Trusted by Business Owners <span className="text-gradient-cool">Like You</span>
            </>
          }
          subtitle="We hold every project to the same standard: clear communication, fast execution, and a site that actually performs. Here's what clients have said about working with us."
        />

        <div
          className="mt-10 sm:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-xl sm:p-12">
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/12 blur-[100px]"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -top-3 left-6 select-none font-display text-[6.5rem] font-bold leading-none text-primary/[0.08] sm:left-9 sm:text-[8rem]"
                aria-hidden
              >
                &rdquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="relative mt-6 flex gap-1" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <blockquote className="mt-5 text-balance text-lg leading-relaxed text-foreground/95 sm:text-xl">
                    {active.quote}
                  </blockquote>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                        {active.initials}
                      </span>
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold text-foreground">
                          {active.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {active.role} · {active.location}
                        </span>
                      </span>
                    </div>
                    <span className="inline-flex rounded-full border border-heat/30 bg-heat/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-heat">
                      {active.stat}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  className={cn(
                    "relative h-1.5 rounded-full transition-all duration-300 before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']",
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <motion.button
                  type="button"
                  onClick={() => setIndex(i)}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "group flex w-full flex-col items-start gap-2 rounded-xl border p-4 text-left backdrop-blur-md transition-colors",
                    i === index
                      ? "border-primary/50 bg-primary/[0.06]"
                      : "border-border bg-surface/40 hover:border-primary/30",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex h-8 w-8 flex-none items-center justify-center rounded-full border text-xs font-bold",
                        i === index
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : "border-border bg-surface text-muted-foreground",
                      )}
                    >
                      {t.initials}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-xs font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {t.location}
                      </span>
                    </span>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                    {t.stat}
                  </span>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
