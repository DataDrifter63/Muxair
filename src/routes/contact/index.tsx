import { RelatedLinks } from "@/components/site/RelatedLinks";
import { useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, stepFields, type ContactFormValues } from "@/lib/contact-schema";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Layers,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import { SITE_URL } from "@/lib/site-data";
import { sendLeadEmails } from "@/lib/send-lead-emails.server";
import { syncLeadToSheet } from "@/lib/sync-lead-to-sheet.server";

const title = "Get an HVAC Website Quote | Contact Muxair";
const description =
  "Planning a new HVAC website or looking to improve your marketing? Book a free 30-minute call with Muxair to discuss your goals and explore your options.";

// Spam protection: a submit sooner than this after the page opened is a bot.
const MIN_FILL_MS = 3000;

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
  // Lets pricing plan buttons link here as /contact?plan=Growth so the chosen
  // plan carries through into the lead automatically.
  validateSearch: (search: Record<string, unknown>): { plan?: string } => {
    const plan = typeof search["plan"] === "string" ? search["plan"].trim().slice(0, 60) : "";
    return plan ? { plan } : {};
  },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: title,
          description,
          url: `${SITE_URL}/contact`,
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

const contactInfo = [
  {
    icon: ShieldCheck,
    title: "Top-Rated on Upwork",
    subtitle: "50+ projects delivered",
  },
  {
    icon: Clock,
    title: "We Respond Fast",
    subtitle: "Usually Within 1-2 Business Days",
  },
  {
    icon: Check,
    title: "No sales pressure",
    subtitle: "Just honest advice on the call",
  },
];

const nextSteps = [
  {
    title: "We Look You Up",
    description: "Your current site, Google presence, and reviews, before we call.",
  },
  {
    title: "We Reach Out",
    description:
      "We'll get in touch within 1-2 business days to find a time for a proper 30-minute strategy call.",
  },
  {
    title: "You Get a Clear Plan",
    description: "What's costing you leads, and what we'd recommend doing about it.",
  },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
];

const faqs = [
  {
    question: "What happens after I submit the form?",
    answer:
      "We'll get back to you within 1-2 business days to book a free 30-minute strategy call. No pitch decks, no pressure — just an honest look at your online presence and what's holding you back.",
  },
  {
    question: "Do I need to know which service I want first?",
    answer:
      "Not at all. Just tell us where you're at and what you're trying to fix. We'll figure out the right approach together on the call.",
  },
  {
    question: "Do you work with HVAC companies outside the US and UK?",
    answer:
      "Yes. We primarily work with HVAC companies in the US and UK, and we're actively expanding into Canada and Australia. If you're outside these regions, reach out, we may still be able to help.",
  },
  {
    question: "Is the strategy call really free?",
    answer:
      "Completely. No invoice, no hidden catch. If we're a good fit we'll talk next steps. If not, you'll still walk away knowing exactly what your website needs.",
  },
  {
    question: "How quickly can you start on a project?",
    answer:
      "Typically within 1 to 2 weeks of agreeing scope. We keep our client load intentionally small so you're never waiting months to get started.",
  },
  {
    question: "What information should I have ready for the call?",
    answer:
      "Nothing formal. It helps to roughly know your service area, your busiest seasons, and what you feel isn't working right now. That's it — we handle the rest.",
  },
  {
    question: "Do I need an existing website to get started?",
    answer:
      "Not at all. Whether you're starting from scratch or replacing an outdated site, our process works the same way, we'll walk you through everything on the strategy call.",
  },
  {
    question: "What if I'm not ready to commit to a full package yet?",
    answer:
      "That's exactly what the strategy call is for. No pressure, no pitch, we'll give you honest advice on what to prioritize, even if you're not ready to start right away.",
  },
];

function ContactPage() {
  const navigate = useNavigate();
  const { plan } = Route.useSearch();
  const [step, setStep] = useState(plan ? 2 : 1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Spam protection: when the page opened, and a hidden "honeypot" input that
  // real visitors never see or fill but bots usually do.
  const openedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Arriving with a plan already picked means step 1 ("what do you need help
  // with") is redundant, they just told us on /pricing. Skip straight to
  // step 2 and renumber what's shown accordingly.
  const totalSteps = 3;
  const visibleTotalSteps = plan ? 2 : 3;
  const visibleStep = plan ? step - 1 : step;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      need: plan ? "Website Design" : "",
      bizName: "",
      serviceArea: "",
      otherInfo: "",
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
    setStep((s) => Math.max(s - 1, plan ? 2 : 1));
  }

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);

    // Bot check: honeypot filled, or submitted faster than a human could.
    // Pretend it worked (thank-you page) but save nothing and send nothing,
    // so the bot gets no signal to adapt to.
    const elapsedMs = Date.now() - openedAt.current;
    if ((honeypotRef.current?.value ?? "").trim() !== "" || elapsedMs < MIN_FILL_MS) {
      navigate({ to: "/thank-you" });
      return;
    }

    const message = [
      plan ? `Selected plan: ${plan}` : null,
      values.otherInfo?.trim() ? values.otherInfo.trim() : null,
      values.heard ? `Heard about us via: ${values.heard}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const { supabase } = await import("@/lib/supabase");
    const { error } = await supabase.from("leads").insert({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      business_name: values.bizName,
      service_area: values.serviceArea,
      need: values.need,
      message: message || null,
    });

    if (error) {
      setSubmitError("Couldn't send that — please try again, or call/WhatsApp us directly.");
      return;
    }

    // Best-effort: the lead is already saved above, so an email/sheet hiccup
    // here should never block the thank-you page or make the submission
    // look like it failed.
    const leadPayload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      bizName: values.bizName,
      serviceArea: values.serviceArea,
      need: values.need,
      message: message || null,
      // Checked again server-side (lead-guard) before any email/sheet write.
      hp: honeypotRef.current?.value ?? "",
      elapsedMs,
    };
    sendLeadEmails({ data: leadPayload }).catch((err) =>
      console.error("[contact] lead emails failed:", err),
    );
    syncLeadToSheet({ data: leadPayload }).catch((err) =>
      console.error("[contact] Google Sheets sync failed:", err),
    );

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
                It takes about a minute. Tell us a bit about your business and we'll call you back.
                No live calendar, no bot, an actual person.
              </p>
              {plan ? (
                <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  Selected plan: {plan}
                </p>
              ) : null}
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
                  {Array.from({ length: visibleTotalSteps }).map((_, i) => (
                    <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                      <motion.div
                        className="h-full bg-primary"
                        initial={false}
                        animate={{
                          width:
                            i < visibleStep - 1 ? "100%" : i === visibleStep - 1 ? "50%" : "0%",
                        }}
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
                  {/* Honeypot: hidden from people and screen readers, left empty by
                      humans. Bots that auto-fill every field give themselves away. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
                  >
                    <label htmlFor="company_url">Leave this field empty</label>
                    <input
                      ref={honeypotRef}
                      id="company_url"
                      name="company_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

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
                          Step {visibleStep} of {visibleTotalSteps}
                        </p>
                        <h2 className="mt-2 font-display text-2xl">What do you need help with?</h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          Select all that apply — we'll tailor the call around it.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {needs.map((n) => {
                            const picked = values.need ? values.need.split(", ") : [];
                            const selected = picked.includes(n.value);
                            return (
                              <button
                                key={n.value}
                                type="button"
                                onClick={() => {
                                  let next: string[];
                                  if (n.value === "Not Sure Yet") {
                                    next = selected ? [] : [n.value];
                                  } else {
                                    const base = picked.filter((v) => v !== "Not Sure Yet");
                                    next = selected
                                      ? base.filter((v) => v !== n.value)
                                      : [...base, n.value];
                                  }
                                  setValue("need", next.join(", "), { shouldValidate: true });
                                }}
                                aria-pressed={selected}
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
                                  className={`flex h-4.5 w-4.5 flex-none items-center justify-center rounded border ${
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
                          Step {visibleStep} of {visibleTotalSteps}
                        </p>
                        <h2 className="mt-2 font-display text-2xl">Tell us about your business</h2>
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
                          <div className="space-y-2">
                            <Label htmlFor="otherInfo">
                              Anything else you'd like to tell us?{" "}
                              <span className="text-muted-foreground">(optional)</span>
                            </Label>
                            <Textarea
                              id="otherInfo"
                              placeholder="Share anything else about your business, your goals, or a specific challenge you'd like us to help with."
                              rows={4}
                              value={values.otherInfo}
                              onChange={(e) =>
                                setValue("otherInfo", e.target.value, { shouldValidate: true })
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          {plan ? (
                            <span />
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handleBack}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <ArrowLeft className="h-4 w-4" />
                              Back
                            </Button>
                          )}
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
                          Step {visibleStep} of {visibleTotalSteps}
                        </p>
                        <h2 className="mt-2 font-display text-2xl">Where should we send this?</h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          We'll get in touch within 1-2 business days.
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

                        {submitError ? (
                          <p
                            role="alert"
                            className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
                          >
                            {submitError}
                          </p>
                        ) : null}

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
        <RelatedLinks />
      </main>
    </div>
  );
}
