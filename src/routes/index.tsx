import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { SolutionSection } from "@/components/site/SolutionSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { WhyUsSection } from "@/components/site/WhyUsSection";
import { PortfolioSection } from "@/components/site/PortfolioSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { Results } from "@/components/site/Results";
import { CTASection } from "@/components/site/CTASection";

// TODO: replace with the real production domain before launch — it also
// drives the canonical/OG URLs below (sitemap.xml is served dynamically).
const SITE_URL = "https://muxair.com";

const title = "HVAC Website Design Agency | Muxair";
const description =
  "We build high-converting websites and run digital marketing exclusively for HVAC businesses. More booked jobs, guaranteed. Get a free quote today.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Muxair",
          url: SITE_URL,
          logo: `${SITE_URL}/icon-512.png`,
          image: `${SITE_URL}/og-image.png`,
          description,
          serviceType: [
            "HVAC web design agency",
            "Website design for HVAC companies",
            "HVAC digital marketing",
            "Heating and cooling website design",
          ],
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Results />
        <ServicesSection />
        <WhyUsSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
