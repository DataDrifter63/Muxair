import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Layers,
  Linkedin,
  Loader2,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Target,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import { SITE_URL } from "@/lib/site-data";

const title = "Get a Free HVAC Website Quote | Talk to Our HVAC Web Design Specialists";
const description =
  "Ready to get more booked jobs from your website? Book a free 30-minute strategy call. No sales pressure, just honest advice.";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
          ],
        }),
      },
    ],
  }),
});

// ---------- Step 1 options ----------
const needs = [
  { value: "Website Design", icon: MonitorSmartphone },
  { value: "Local SEO", icon: MapPin },
  { value: "Google Ads", icon: Target },
  { value: "Meta Ads", icon: Facebook },
  { value: "Maintenance", icon: ShieldCheck },
  { value: "Not Sure Yet", icon: Layers },
];

const heardOptions = ["Google search", "Instagram / Facebook", "Referral", "Other"];

const contactSchema = z.object({
  need: z.string().min(1, "Select what you need help with"),
  bizName: z.string().trim().min(2, "Enter your business name"),
  serviceArea: z.string().trim().min(2, "Enter your service area"),
  fullName: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  heard: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const stepFields: Record<number, (keyof ContactFormValues)[]> = {
  1: ["need"],
  2: ["bizName", "serviceArea"],
  3: ["fullName", "email", "phone"],
};

const contactInfo = [
  {
    icon: ShieldCheck,
    title: "Top-Rated on Upwork",
    subtitle: "50+ projects delivered",
  },
  {
    icon: Clock,
    title: "We reply within 4 hours",
    subtitle: "Usually much sooner",
  },
  {
    icon: Check,
    title: "No sales pressure",
    subtitle: "Just honest advice on the call",
  },
];

const nextSteps = [
  {
    title: "We look you up",
    description: "Your current site, Google presence and reviews — before we call.",
  },
  {
    title: "We call you",
    description: "Within 4 hours, to find a time for a proper 30-minute strategy call.",
  },
  {
    title: "You get a clear plan",
    description: "What's costing you leads, and what we'd recommend doing about it.",
  },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

const faqs = [
  {
    question: "What happens after I submit the form?",
    answer:
      "We'll call you within 4 business hours to find a time that works for a free 30-minute strategy call — no calendar links, no bots, just a quick chat about your business.",
  },
  {
    question: "Do I need to know which service I want first?",
    answer:
      "No — pick \"Not Sure Yet\" on step one. Most clients don't know exactly what they need until we've looked at their numbers together.",
  },
  {
    question: "Do you work with HVAC companies outside the UK?",
    answer:
      "Our team is UK-based, but we've worked with heating and cooling companies internationally. Mention your location and we'll let you know if we're a fit.",
  },
];

function ContactPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      need: "",
      bizName: "",
      serviceArea: "",
      fullName: "",
      email: "",
      phone: "",
      heard: "",
    },
  });

  const { watch, setValue, trigger, formState, handleSubmit } = form;
  const values = watch();

  const currentFieldsValid = (stepFields[step] ?? []).every((f) => {
    const v = values[f];
    return typeof v === "string" && v.trim().length > 0 && !formState.errors[f];
  });

  async function handleContinue() {
    const valid = await trigger(stepFields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, totalSteps));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function onSubmit(values: ContactFormValues) {
    // TODO: wire this up to a real backend — e.g. a TanStack Start server
    // function that emails the team or forwards to a CRM.
    console.info("Contact form submission", values);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate({ to: "/thank-you" });
  }

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="section-shell relative overflow-hidden pt-36 sm:pt-40">
          <TechBackdrop />
          <div className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Free 30-Minute Call
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
                Let's Get Your HVAC Business More{" "}
                <span className="text-gradient-cool">Booked Jobs</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Takes about a minute. Tell us a bit about your business and we'll call you — no
                live calendar, no bot, an actual person.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="section-shell pt-0">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:px-8">
            {/* Step form */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:p-9">
                <div
                  className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/12 blur-[110px]"
                  aria-hidden
                />

                {/* Progress bar */}
                <div className="relative mb-8 flex gap-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-border"
                    >
                      <motion.div
                        className="h-full bg-primary"
                        initial={false}
                        animate={{ width: i < step - 1 ? "100%" : i === step - 1 ? "50%" : "0%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative"
                  noValidate
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && step < totalSteps) e.preventDefault();
                  }}
                >
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Step 1 of 3
                        </p>
                        <h2 className="mt-2 font-display text-2xl">
                          What do you need help with?
                        </h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          Pick what's closest — we'll tailor the call around it.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {needs.map((n) => {
                            const selected = values.need === n.value;
                            return (
                              <button
                                key={n.value}
                                type="button"
                                onClick={() =>
                                  setValue("need", n.value, { shouldValidate: true })
                                }
                                className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm font-semibold transition-colors ${
                                  selected
                                    ? "border-primary/60 bg-primary/10 text-foreground"
                                    : "border-border bg-background/60 text-foreground/90 hover:border-primary/30"
                                }`}
                              >
                                <span className="flex items-center gap-2.5">
                                  <n.icon
                                    className={`h-4 w-4 ${
                                      selected ? "text-primary" : "text-muted-foreground"
                                    }`}
                                  />
                                  {n.value}
                                </span>
                                <span
                                  className={`flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full border ${
                                    selected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-muted-foreground/40"
                                  }`}
                                >
                                  {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <Button
                            type="button"
                            onClick={handleContinue}
                            disabled={!currentFieldsValid}
                            className="rounded-full bg-primary px-7 text-primary-foreground hover:brightness-110"
                          >
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : null}

                    {step === 2 ? (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Step 2 of 3
                        </p>
                        <h2 className="mt-2 font-display text-2xl">
                          Tell us about your business
                        </h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          So we can look you up before the call, not during it.
                        </p>

                        <div className="mt-7 space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="bizName">Business name</Label>
                            <Input
                              id="bizName"
                              placeholder="e.g. Midlands HVAC Co."
                              value={values.bizName}
                              onChange={(e) =>
                                setValue("bizName", e.target.value, { shouldValidate: true })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="serviceArea">Service area (city / region)</Label>
                            <Input
                              id="serviceArea"
                              placeholder="e.g. Birmingham & the West Midlands"
                              value={values.serviceArea}
                              onChange={(e) =>
                                setValue("serviceArea", e.target.value, { shouldValidate: true })
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleBack}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={handleContinue}
                            disabled={!currentFieldsValid}
                            className="rounded-full bg-primary px-7 text-primary-foreground hover:brightness-110"
                          >
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : null}

                    {step === 3 ? (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Step 3 of 3
                        </p>
                        <h2 className="mt-2 font-display text-2xl">Where should we send this?</h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          We reply within 4 hours — usually faster.
                        </p>

                        <div className="mt-7 space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Your name</Label>
                            <Input
                              id="fullName"
                              placeholder="Full name"
                              autoComplete="name"
                              value={values.fullName}
                              onChange={(e) =>
                                setValue("fullName", e.target.value, { shouldValidate: true })
                              }
                            />
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@business.com"
                                autoComplete="email"
                                value={values.email}
                                onChange={(e) =>
                                  setValue("email", e.target.value, { shouldValidate: true })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="07xxx xxxxxx"
                                autoComplete="tel"
                                value={values.phone}
                                onChange={(e) =>
                                  setValue("phone", e.target.value, { shouldValidate: true })
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="heard">
                              How did you hear about us?{" "}
                              <span className="text-muted-foreground">(optional)</span>
                            </Label>
                            <Select
                              value={values.heard ?? ""}
                              onValueChange={(v) => setValue("heard", v)}
                            >
                              <SelectTrigger id="heard">
                                <SelectValue placeholder="Select one" />
                              </SelectTrigger>
                              <SelectContent>
                                {heardOptions.map((h) => (
                                  <SelectItem key={h} value={h}>
                                    {h}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleBack}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={!currentFieldsValid || formState.isSubmitting}
                            className="rounded-full bg-primary px-7 text-primary-foreground hover:brightness-110"
                          >
                            {formState.isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Get My Free Call
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </form>
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-5">
                <div className="rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md">
                  <ul className="space-y-5">
                    {contactInfo.map((c) => (
                      <li key={c.title} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                          <c.icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">{c.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{c.subtitle}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-3 border-t border-border pt-6">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md">
                  <h3 className="text-sm font-semibold text-foreground">What happens next</h3>
                  <ol className="mt-5 space-y-5">
                    {nextSteps.map((s, i) => (
                      <li key={s.title} className="flex items-start gap-3">
                        <span className="flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{s.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {s.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-shell border-t border-border bg-surface/25">
          <div className="pointer-events-none absolute inset-0 grid-tech opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="FAQs"
              title={
                <>
                  Questions Before You <span className="text-gradient-cool">Reach Out?</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-12">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.question} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base">{f.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
