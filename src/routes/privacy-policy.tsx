import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-data";
import { LegalPage } from "@/components/site/LegalPage";
import { privacyPolicy } from "@/lib/legal-content";

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
            {
              "@type": "ListItem",
              position: 2,
              name: "Privacy Policy",
              item: `${SITE_URL}/privacy-policy`,
            },
          ],
        }),
      },
    ],
  }),
});

function Page() {
  return (
    <LegalPage
      doc={privacyPolicy}
      eyebrow="Legal"
      other={{ to: "/terms", label: "Read our Terms of Service" }}
      showCookieSettings
    />
  );
}
