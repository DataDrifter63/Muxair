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
// drives the canonical/OG URLs below and public/sitemap.xml + robots.txt.
const SITE_URL = "https://www.ductworkstudio.com";

const title = "HVAC Website Design Agency | Built Exclusively for Heating & Cooling Companies";
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ductwork Studio",
          url: SITE_URL,
          description,
          serviceType: [
            "HVAC web design agency",
            "Website design for HVAC companies",
            "HVAC digital marketing",
            "Heating and cooling website design",
          ],
          areaServed: "United Kingdom",
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
        < TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
