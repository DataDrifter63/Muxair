// import { createFileRoute } from "@tanstack/react-router";

// export const Route = createFileRoute("/thank-you")({
//   component: Page,
//   head: () => ({
//     meta: [{ title: "Privacy Policy | Ductwork Studio" }],
//   }),
// });

// function Page() {
//   return (
//     <div>
//       <h1>Privacy Policy</h1>
//       <p>Coming soon.</p>
//     </div>
//   );
// }






import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CalendarClock, CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import { MagneticButton, Reveal, TechBackdrop } from "@/components/site/primitives";
import { SITE_URL } from "@/lib/site-data";

const title = "Thanks — We've Got Your Message | Ductwork Studio";
const description =
  "Your message has been received. Our team will review your details and get back to you within one business day.";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      // Confirmation pages have no unique content for search and can create
      // thin/duplicate-content noise — keep it out of the index.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/thank-you` }],
  }),
});

const nextSteps = [
  {
    icon: MessageCircle,
    title: "We review your message",
    text: "A member of our team reads every enquiry personally — no bots, no auto-replies.",
  },
  {
    icon: PhoneCall,
    title: "We reach out to you",
    text: "Expect an email or call within 1 business day to talk through your goals.",
  },
  {
    icon: CalendarClock,
    title: "We book a strategy call",
    text: "If it's a good fit, we'll find a time to map out a plan for your business.",
  },
];

function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <section className="section-shell relative flex min-h-[92vh] items-center overflow-hidden pt-32 sm:pt-28">
          <TechBackdrop />
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <CheckCircle2 className="relative h-10 w-10 text-primary" strokeWidth={1.8} />
              </motion.div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Message received
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
                Thanks — We've Got Your <span className="text-gradient-cool">Message</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A confirmation has been sent to your inbox. Our team is already looking at your
                details — here's what happens next.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mx-auto mt-14 grid gap-4 text-left sm:grid-cols-3">
                {nextSteps.map((step, i) => (
                  <div
                    key={step.title}
                    className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Step 0{i + 1}
                    </p>
                    <h3 className="mt-1.5 font-display text-base leading-snug">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/work" size="lg">
                  See Our Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/" variant="ghost" size="lg">
                  Back to Home
                </MagneticButton>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Need a faster answer? Call us directly on{" "}
                <a href="tel:+442012345678" className="font-semibold text-primary hover:underline">
                  +44 20 1234 5678
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
