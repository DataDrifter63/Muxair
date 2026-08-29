// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/contact/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/contact/"!</div>
// }




import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeading, TechBackdrop } from "@/components/site/primitives";
import { SITE_URL } from "@/lib/site-data";

const title = "Contact Us | Book a Free HVAC Website & Marketing Strategy Call";
const description =
  "Get in touch with Ductwork Studio. Book a free 30-minute strategy call and we'll review your current website and Google presence — no obligation.";

export const Route = createFileRoute("/contact/pokka")({
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

const services = [
  { value: "websites", label: "HVAC Website Design" },
  { value: "seo", label: "Local SEO" },
  { value: "google-ads", label: "Google Ads" },
  { value: "meta-ads", label: "Meta Ads" },
  { value: "maintenance", label: "Website Maintenance" },
  { value: "not-sure", label: "Not sure yet" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  company: z.string().trim().min(2, "Enter your company name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a little about what you need"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ductworkstudio.com",
    href: "mailto:hello@ductworkstudio.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 20 1234 5678",
    href: "tel:+442012345678",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "We reply within 4 business hours",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "United Kingdom · working with HVAC companies UK-wide",
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
      "We'll reply within 4 business hours to book a free 30-minute strategy call. On that call we'll review your current website and Google presence live and show you exactly what's costing you jobs — no pressure, no obligation.",
  },
  {
    question: "Do I need to know which service I want first?",
    answer:
      "No — select \"Not sure yet\" and tell us what's going on in the message field. Most clients don't know exactly what they need until we've looked at their numbers together.",
  },
  {
    question: "Do you work with HVAC companies outside the UK?",
    answer:
      "Our team is UK-based, but we've worked with heating and cooling companies internationally. Mention your location in the message and we'll let you know if we're a fit.",
  },
];

function ContactPage() {
  const navigate = useNavigate();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactFormValues) {
    // TODO: wire this up to a real backend — e.g. a TanStack Start server
    // function that emails the team or forwards to a CRM. For now this
    // simulates a submission and forwards to the thank-you page.
    console.info("Contact form submission", values);
    await new Promise((resolve) => setTimeout(resolve, 600));
    navigate({ to: "/thank-you" });
  }

  return (
    <div className="relative min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="section-shell relative overflow-hidden pt-36 sm:pt-40">
          <TechBackdrop />
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Get in Touch
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Let's Get You{" "}
                <span className="text-gradient-cool">More Booked Jobs</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Book a free 30-minute strategy call, or send us a message below. We'll review your
                current site and Google presence and reply within 4 business hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="section-shell pt-0">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:px-8">
            {/* Form */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:p-9">
                <div
                  className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/12 blur-[110px]"
                  aria-hidden
                />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="relative space-y-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jamie Ellison" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ellison Heating & Air"
                                autoComplete="organization"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="jamie@ellisonhvac.com"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone <span className="text-muted-foreground">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+44 20 1234 5678"
                                autoComplete="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What do you need help with?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your business</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. We install and repair residential AC across three counties, and our site barely brings in any calls..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-primary text-primary-foreground hover:brightness-110 sm:w-auto sm:px-8"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      By submitting, you agree to our{" "}
                      <a href="/privacy-policy" className="underline hover:text-primary">
                        Privacy Policy
                      </a>
                      . We never share your details with third parties.
                    </p>
                  </form>
                </Form>
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-5">
                <div className="rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md">
                  <h2 className="font-display text-lg">Contact Details</h2>
                  <ul className="mt-5 space-y-5">
                    {contactInfo.map((c) => (
                      <li key={c.label} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                          <c.icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                            {c.label}
                          </p>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="mt-0.5 block text-sm text-foreground transition-colors hover:text-primary"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="mt-0.5 text-sm text-foreground">{c.value}</p>
                          )}
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

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative flex-1 overflow-hidden rounded-2xl border border-heat/30 bg-heat/[0.06] p-7"
                >
                  <div
                    className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-heat/18 blur-[90px]"
                    aria-hidden
                  />
                  <p className="relative inline-flex items-center gap-2 rounded-full border border-heat/30 bg-heat/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-heat">
                    <span className="h-1.5 w-1.5 rounded-full bg-heat" />
                    Prefer to talk it through?
                  </p>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    Skip the form and book straight into our calendar for a free 30-minute
                    strategy call — no sales pressure, just a live audit of your current site.
                  </p>
                  <a
                    href="tel:+442012345678"
                    className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heat"
                  >
                    <Phone className="h-4 w-4" />
                    +44 20 1234 5678
                  </a>
                </motion.div>
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
                  Questions Before You{" "}
                  <span className="text-gradient-cool">Reach Out?</span>
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
