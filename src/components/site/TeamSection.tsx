import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./primitives";
import musab from "@/assets/team/musab.webp";
import isbah from "@/assets/team/isbah.webp";
import anas from "@/assets/team/anas.webp";
import saad from "@/assets/team/saad.webp";

export const teamMembers = [
  {
    name: "Musab Sikander",
    role: "Founder, Strategy & Client Leadership",
    image: musab,
    bio: "The face of Muxair and the one who sets the direction. Leads your strategy call and project meetings, makes the calls on every client project, and stays hands-on in the build as a Top-Rated developer on Upwork.",
  },
  {
    name: "Isbah Maniar",
    role: "Operations & Development",
    image: isbah,
    bio: "Keeps every project moving smoothly and builds alongside the team as a Top-Rated developer on Upwork. Oversees development quality and delivery, so nothing stalls and what we promise on your strategy call is what ships at launch.",
  },
  {
    name: "Anas Shah Mir",
    role: "Development & Performance Marketing",
    image: anas,
    bio: "Builds the sites and runs the campaigns that bring in hot leads. Owns the technical side of SEO and leads our Google Ads and Meta Ads work, from tracking setup to campaign optimization.",
  },
  {
    name: "Saad Khan",
    role: "Sales & Outreach",
    image: saad,
    bio: "Breaks the ice with HVAC business owners. Handles first conversations, answers your questions honestly, and gets you to the right person on our team.",
  },
];

/**
 * Four portrait cards. On hover (or tap / keyboard focus) the photo card flips to a
 * brand-orange panel with the person's name and role at the top and their bio at the bottom.
 */
export function TeamSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {teamMembers.map((m, i) => {
        const open = active === i;
        return (
          <Reveal key={m.name} delay={i * 0.08} className="h-full">
            <button
              type="button"
              aria-expanded={open}
              aria-label={`${m.name}, ${m.role}. Show bio`}
              onClick={() => setActive(open ? null : i)}
              onBlur={() => setActive((a) => (a === i ? null : a))}
              className="group relative block aspect-[1080/1399] w-full overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] outline-none transition-shadow duration-500 hover:shadow-[0_30px_70px_-26px_color-mix(in_oklab,var(--primary)_70%,transparent)] focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Photo face */}
              <img
                src={m.image}
                alt={`${m.name}, ${m.role} at Muxair`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                  open ? "scale-[1.04]" : ""
                }`}
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-500 group-hover:opacity-0 ${
                  open ? "opacity-0" : ""
                }`}
                aria-hidden
              />
              <div
                className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-3 group-hover:opacity-0 ${
                  open ? "translate-y-3 opacity-0" : ""
                }`}
              >
                <p className="font-display text-lg font-semibold leading-tight text-white">
                  {m.name}
                </p>
                <p className="mt-1 text-xs font-medium leading-snug text-white/80">{m.role}</p>
              </div>

              {/* Bio face */}
              <motion.div
                aria-hidden={!open}
                className={`absolute inset-0 flex flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,#F77036,#C8501F)] p-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  open ? "opacity-100" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:34px_34px]"
                  aria-hidden
                />
                <div className="relative">
                  <p className="font-display text-xl font-semibold leading-tight">{m.name}</p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-white/85">{m.role}</p>
                </div>
                <p className="relative text-[13px] leading-relaxed text-white/95">{m.bio}</p>
              </motion.div>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
