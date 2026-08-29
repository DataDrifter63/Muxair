// import { motion } from "motion/react";
// import { Check, X } from "lucide-react";
// import { Reveal, SectionHeading } from "./primitives";

// const generic = [
//   "Don't understand HVAC seasons",
//   "Cookie-cutter designs",
//   "Don't understand HVAC terminology",
//   "Generic marketing strategies",
// ];

// const ours = [
//   "Built only for HVAC",
//   "Understand HVAC terminology",
//   "Understand HVAC buying cycles",
//   "Copy that speaks to homeowners AND commercial facilities managers",
// ];

// export function WhyUsSection() {
//   return (
//     <section id="why-us" className="section-shell border-y border-border bg-surface/25">
//       <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
//       <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
//         <SectionHeading
//           eyebrow="Why us"
//           title={
//             <>
//               Why HVAC Companies Choose Us Over{" "}
//               <span className="text-muted-foreground">Generic Agencies</span>
//             </>
//           }
//         />

//         <div className="relative mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
//           <Reveal>
//             <div className="h-full rounded-2xl border border-border bg-background/40 p-8 opacity-70 transition-opacity duration-500 hover:opacity-90">
//               <h3 className="text-lg text-muted-foreground">Generic Agencies</h3>
//               <ul className="mt-6 space-y-4">
//                 {generic.map((g) => (
//                   <li key={g} className="flex items-start gap-3 text-sm text-muted-foreground">
//                     <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border bg-surface">
//                       <X className="h-3 w-3" />
//                     </span>
//                     {g}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Reveal>

//           <div className="relative hidden w-24 lg:block" aria-hidden>
//             <svg viewBox="0 0 100 220" className="h-56 w-full" fill="none">
//               {[40, 90, 140, 190].map((y, i) => (
//                 <motion.path
//                   key={y}
//                   d={`M0 ${y} C 40 ${y}, 60 ${y - 18}, 100 ${y - 18}`}
//                   stroke="url(#connector)"
//                   strokeWidth="1.2"
//                   initial={{ pathLength: 0 }}
//                   whileInView={{ pathLength: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 1, delay: i * 0.15 }}
//                 />
//               ))}
//               <defs>
//                 <linearGradient id="connector" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#6B6B6B" stopOpacity="0.25" />
//                   <stop offset="100%" stopColor="#FF9D5C" stopOpacity="0.9" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>

//           <Reveal delay={0.15}>
//             <div className="relative h-full overflow-hidden rounded-2xl border border-primary/35 bg-primary/[0.05] p-8 backdrop-blur-md glow-cool">
//               <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-[80px]" />
//               <h3 className="relative text-lg text-primary">Our Approach</h3>
//               <ul className="relative mt-6 space-y-4">
//                 {ours.map((o, i) => (
//                   <motion.li
//                     key={o}
//                     initial={{ opacity: 0, x: 14 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
//                     className="flex items-start gap-3 text-sm text-foreground"
//                   >
//                     <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
//                       <Check className="h-3 w-3" strokeWidth={3} />
//                     </span>
//                     {o}
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }



import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const generic = [
  "Don't understand HVAC seasons",
  "Cookie-cutter designs",
  "Don't understand HVAC terminology",
  "Generic marketing strategies",
];

const ours = [
  "Built only for HVAC",
  "Understand HVAC terminology",
  "Understand HVAC buying cycles",
  "Copy that speaks to homeowners AND commercial facilities managers",
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="section-shell border-y border-border bg-surface/25">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why us"
          title={
            <>
              Why HVAC Companies Choose Us Over{" "}
              <span className="text-muted-foreground">Generic Agencies</span>
            </>
          }
        />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-background/40 p-8 opacity-85 transition-opacity duration-500 hover:opacity-100">
              <h3 className="text-lg text-foreground/80">Generic Agencies</h3>
              <ul className="mt-6 space-y-4">
                {generic.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-sm text-foreground/70">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border bg-surface">
                      <X className="h-3 w-3" />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="relative hidden w-24 lg:block" aria-hidden>
            <svg viewBox="0 0 100 220" className="h-56 w-full" fill="none">
              {[40, 90, 140, 190].map((y, i) => (
                <motion.path
                  key={y}
                  d={`M0 ${y} C 40 ${y}, 60 ${y - 18}, 100 ${y - 18}`}
                  stroke="url(#connector)"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              ))}
              <defs>
                <linearGradient id="connector" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6B6B6B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FF9D5C" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <Reveal delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-primary/35 bg-primary/[0.05] p-8 backdrop-blur-md glow-cool">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-[80px]" />
              <h3 className="relative text-lg text-primary">Our Approach</h3>
              <ul className="relative mt-6 space-y-4">
                {ours.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {o}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}