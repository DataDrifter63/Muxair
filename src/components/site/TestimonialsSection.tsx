// import { motion } from "motion/react";
// import { Quote } from "lucide-react";
// import { Counter, Reveal, SectionHeading, TechBackdrop } from "./primitives";

// const metrics = [
//   {
//     value: 300,
//     suffix: "%",
//     label: "increase in organic enquiries",
//     client: "Midlands HVAC Co.",
//     tone: "cool",
//   },
//   {
//     text: "First Page",
//     label: "Google in 4 months",
//     client: "Yorkshire Boiler Specialists",
//     tone: "heat",
//   },
//   {
//     value: 40,
//     suffix: "",
//     label: "new quote requests in first 30 days of ads",
//     client: "London AC Installer",
//     tone: "cool",
//   },
// ] as const;

// const testimonials = [
//   {
//     name: "James Whitfield",
//     business: "Midlands HVAC Co.",
//     quote:
//       "They actually understood our service areas and the way homeowners search for boiler repairs. The enquiry quality changed within weeks.",
//     result: "300% more organic enquiries",
//     initials: "JW",
//   },
//   {
//     name: "Sarah Doyle",
//     business: "Yorkshire Boiler Specialists",
//     quote:
//       "First agency that didn't need HVAC explained to them. They planned the whole build around our winter demand peak.",
//     result: "Page one in 4 months",
//     initials: "SD",
//   },
//   {
//     name: "Aaron Price",
//     business: "London AC Installer",
//     quote:
//       "The new site plus their Google Ads gave us more commercial AC quotes in a month than the whole previous quarter.",
//     result: "40 quotes in 30 days",
//     initials: "AP",
//   },
// ];

// export function TestimonialsSection() {
//   return (
//     <section id="results" className="section-shell">
//       <TechBackdrop />
//       <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
//         <SectionHeading
//           eyebrow="Results"
//           title={
//             <>
//               Real Results for <span className="text-gradient-cool">Real HVAC Companies</span>
//             </>
//           }
//           subtitle="Sample case-study metrics from live HVAC engagements — easily swapped for your latest verified numbers."
//         />

//         <div className="mt-14 grid gap-5 md:grid-cols-3">
//           {metrics.map((m, i) => (
//             <Reveal key={m.client} delay={i * 0.1}>
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 className={`group relative h-full overflow-hidden rounded-2xl border p-8 backdrop-blur-md ${
//                   m.tone === "cool"
//                     ? "border-primary/25 bg-primary/[0.04]"
//                     : "border-heat/25 bg-heat/[0.04]"
//                 }`}
//               >
//                 <div
//                   className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-[80px] ${
//                     m.tone === "cool" ? "bg-primary/15" : "bg-heat/15"
//                   }`}
//                 />
//                 <p
//                   className={`relative font-display text-5xl font-extrabold tracking-tight lg:text-6xl ${
//                     m.tone === "cool" ? "text-primary" : "text-heat"
//                   }`}
//                 >
//                   {"value" in m ? <Counter to={m.value} suffix={m.suffix ?? ""} /> : m.text}
//                 </p>
//                 <p className="relative mt-3 text-sm leading-relaxed text-foreground/90">
//                   {m.label}
//                 </p>
//                 <p className="relative mt-5 border-t border-border pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
//                   — {m.client}
//                 </p>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>

//         <div className="mt-6 grid gap-5 md:grid-cols-3">
//           {testimonials.map((t, i) => (
//             <Reveal key={t.name} delay={0.1 + i * 0.08}>
//               <motion.figure
//                 whileHover={{ y: -6 }}
//                 className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface/55 p-7 backdrop-blur-md transition-colors hover:border-primary/40"
//               >
//                 <Quote className="h-6 w-6 text-primary/60" />
//                 <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
//                   “{t.quote}”
//                 </blockquote>
//                 <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
//                   <span
//                     className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary"
//                     aria-hidden
//                   >
//                     {t.initials}
//                   </span>
//                   <span className="leading-tight">
//                     <span className="block text-sm font-semibold text-foreground">{t.name}</span>
//                     <span className="block text-xs text-muted-foreground">{t.business}</span>
//                   </span>
//                 </figcaption>
//                 <p className="mt-4 inline-flex w-fit rounded-full border border-heat/30 bg-heat/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-heat">
//                   {t.result}
//                 </p>
//               </motion.figure>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Video } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

type VideoTestimonial = {
  name: string;
  role: string;
  category: string;
  duration?: string;
  tone: "cool" | "heat" | "mixed";
  /** Poster/thumbnail image — swap for a real video still. */
  poster?: string;
  /** Actual video file/URL — wire this up when clips are ready. */
  videoSrc?: string;
};

const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dmaibvnp/video/upload";
// Web-optimised delivery: H.264/AAC MP4 (also converts .mov), capped at 720px wide.
const VIDEO_T = "f_mp4,vc_h264,ac_aac,q_auto:good,w_720,c_limit";
// First-frame thumbnail, cropped to the card's 3:4 shape at a small size.
const POSTER_T = "so_0,f_jpg,q_auto,w_480,h_640,c_fill,g_auto";

const testimonials: VideoTestimonial[] = [
  {
    name: "Sam T.",
    role: "United Kingdom",
    category: "Website Design",
    tone: "cool",
    // f_mp4,q_auto = Cloudinary serves a web-optimised MP4; the .jpg is an auto thumbnail.
    videoSrc: `${CLOUDINARY_VIDEO}/${VIDEO_T}/v1792669862/client_testimonial_1.mp4`,
    poster: `${CLOUDINARY_VIDEO}/${POSTER_T}/v1792669862/client_testimonial_1.jpg`,
  },
  {
    name: "Mi P.",
    role: "NY, USA",
    category: "Website Design & Support",
    tone: "heat",
    // The source is a .mov; f_mp4 converts it so every browser can play it.
    videoSrc: `${CLOUDINARY_VIDEO}/${VIDEO_T}/v1792669844/client_testimonial_2.mp4`,
    poster: `${CLOUDINARY_VIDEO}/${POSTER_T}/v1792669844/client_testimonial_2.jpg`,
  },
];

const toneGradient: Record<VideoTestimonial["tone"], string> = {
  cool: "from-primary/25 via-background to-background",
  heat: "from-heat/25 via-background to-background",
  mixed: "from-primary/20 via-background to-heat/15",
};

const toneBadge: Record<VideoTestimonial["tone"], string> = {
  cool: "border-primary/30 bg-primary/10 text-primary",
  heat: "border-heat/30 bg-heat/10 text-heat",
  mixed: "border-primary/30 bg-primary/10 text-primary",
};

function TestimonialPlayer({ src, poster }: { src: string; poster?: string | undefined }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="auto"
        controlsList="nodownload"
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onSeeked={() => setLoading(false)}
        className="h-full w-full bg-black object-contain"
      />
      {loading ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-foreground/30 border-t-primary" />
        </div>
      ) : null}
    </>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState<VideoTestimonial | null>(null);
  // Which videos to warm up (fetch metadata + start Cloudinary processing) on hover/focus.
  const [warm, setWarm] = useState<Set<string>>(new Set());
  const warmUp = (name: string) =>
    setWarm((prev) => (prev.has(name) ? prev : new Set(prev).add(name)));

  return (
    <section className="section-shell">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Client Testimonials"
          title={
            <>
              Hear It <span className="text-gradient-cool">From Them</span>, Not Us
            </>
          }
          subtitle="A few clients agreed to go on camera. Different industries, same story — a website that actually works for their business."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <motion.button
                type="button"
                onClick={() => setActive(t)}
                onPointerEnter={() => warmUp(t.name)}
                onFocus={() => warmUp(t.name)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface/60 text-left"
                aria-label={`Play testimonial from ${t.name}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${toneGradient[t.tone]}`}
                  aria-hidden
                />
                {t.poster ? (
                  <img
                    src={t.poster}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 grid-tech opacity-30 mix-blend-overlay"
                    aria-hidden
                  />
                )}

                {t.duration ? (
                  <span className="absolute right-3 top-3 rounded-md bg-background/80 px-2 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
                    {t.duration}
                  </span>
                ) : null}

                {t.videoSrc && warm.has(t.name) ? (
                  <video
                    src={t.videoSrc}
                    preload="metadata"
                    muted
                    playsInline
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                  />
                ) : null}

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/40 bg-background/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20">
                    <Play className="h-5 w-5 translate-x-0.5 text-foreground" fill="currentColor" />
                  </span>
                </span>

                <div className="relative z-10 bg-gradient-to-t from-background/75 via-background/30 to-transparent p-5 pt-12">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                  <span
                    className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${toneBadge[t.tone]}`}
                  >
                    {t.category}
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}

          <Reveal delay={testimonials.length * 0.08}>
            <div className="relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-primary/[0.04] p-7 text-center">
              <div
                className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]"
                aria-hidden
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Video className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-display text-xl leading-snug">
                Be Our Next Testimonial
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                We're taking on a few more HVAC companies this quarter. Get a website that books
                jobs, and tell your story next.
              </p>
              <MagneticButton href="/contact" className="relative mt-6">
                Book a Free Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <a
                href="/work"
                className="relative mt-4 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                or see our case studies
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-md overflow-hidden border-border bg-background p-0 [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-background/80 [&>button]:p-2 [&>button]:backdrop-blur-sm sm:rounded-2xl">
          {active ? (
            <div className="relative aspect-[9/16] w-full bg-surface">
              <DialogTitle className="sr-only">Testimonial from {active.name}</DialogTitle>
              {active.videoSrc ? (
                <TestimonialPlayer src={active.videoSrc} poster={active.poster} />
              ) : (
                <div
                  className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${toneGradient[active.tone]} px-6 text-center`}
                >
                  <p className="text-sm text-muted-foreground">
                    Video for {active.name} goes here — set{" "}
                    <code className="rounded bg-surface px-1.5 py-0.5 text-xs">videoSrc</code> in
                    the testimonials list.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
