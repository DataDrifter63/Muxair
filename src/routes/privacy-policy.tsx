import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-data";

const title = "Privacy Policy | Muxair";
const description =
  "How Muxair collects, uses and protects your personal information when you use our website or contact us.";

export const Route = createFileRoute("/privacy-policy")({
  component: Page,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacy-policy` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy-policy` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy-policy` },
          ],
        }),
      },
    ],
  }),
});

// DEMO CONTENT — replace with the client's approved text before launch.
const sections: { heading: string; text: string }[] = [
  { heading: "1. Information We Collect", text: "This is demo text. We may collect the details you submit through our contact form, such as your name, email address, phone number, company name and message, along with basic analytics data about how you use the site." },
  { heading: "2. How We Use Your Information", text: "This is demo text. We use your information to respond to enquiries, provide our services, improve our website and, where permitted, send relevant updates about our work." },
  { heading: "3. Cookies and Analytics", text: "This is demo text. Our website may use cookies and similar technologies to understand traffic and improve performance. You can control cookies through your browser settings." },
  { heading: "4. Sharing Your Information", text: "This is demo text. We do not sell your personal information. We may share it with trusted service providers who help us operate the site and deliver our services." },
  { heading: "5. Data Retention and Your Rights", text: "This is demo text. We keep your information only as long as needed. You may request access, correction or deletion of your data by contacting us." },
  { heading: "6. Contact Us", text: "This is demo text. For any privacy questions, please contact us through the form on our Contact page." },
];

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: [date]</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
