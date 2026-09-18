import { lazy, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DeferredSection from "@/components/performance/DeferredSection";
import { pageSeo } from "@/seo/pageSeo";

const JourneyTimeline = lazy(() => import("@/components/JourneyTimeline"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const IndustriesSection = lazy(() => import("@/components/IndustriesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const CaseStudiesSection = lazy(() => import("@/components/CaseStudiesSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const OurBrandsSection = lazy(() => import("@/components/OurBrandsSection"));
const LeadFormPopup = lazy(() => import("@/components/LeadFormPopup"));

const PAGE_SEO = pageSeo["/"];
const SOCIAL_DESCRIPTION = "AI data collection, annotation, validation, model testing and scalable content services for global AI and learning teams.";

const Index = () => {
  const [activeServiceTab, setActiveServiceTab] = useState<"education" | "ai">("ai");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta
          name="description"
          content={PAGE_SEO.description}
        />
        <meta
          name="keywords"
          content="eQOURSE, AI data services, AI data collection, data annotation, data cleaning, data validation, AI model testing, robotics training data, Physical AI, Embodied AI, content services, e-learning content development, curriculum development, localization services, India, Singapore"
        />
        <link rel="canonical" href="https://www.eqourse.com/" />
        <meta property="og:title" content={PAGE_SEO.title} />
        <meta
          property="og:description"
          content={SOCIAL_DESCRIPTION}
        />
        <meta property="og:url" content="https://www.eqourse.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="eQOURSE" />
        <meta property="og:image" content="https://www.eqourse.com/assets/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EQourse" />
        <meta name="twitter:title" content={PAGE_SEO.title} />
        <meta
          name="twitter:description"
          content={SOCIAL_DESCRIPTION}
        />
        <meta name="twitter:image" content="https://www.eqourse.com/assets/og-image.webp" />

        {/* Organization structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.eqourse.com/#organization",
              "name": "eQOURSE",
              "url": "https://www.eqourse.com/",
              "logo": "https://www.eqourse.com/assets/og-image.webp",
              "description": "eQOURSE provides AI data collection, annotation, cleaning, validation, model testing and robotics training data, plus scalable content services for global AI and learning teams.",
              "foundingDate": "2020",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 500
              },
              "sameAs": [
                "https://www.linkedin.com/company/eqourse",
                "https://www.facebook.com/eQOURSE-102057078229490",
                "https://www.instagram.com/eqourse/",
                "https://www.youtube.com/@eqourse",
                "https://twitter.com/EQourse"
              ],
              "subOrganization": [
                {
                  "@type": "Organization",
                  "@id": "https://tutrain.com/#organization",
                  "name": "TUTRAIN",
                  "url": "https://tutrain.com"
                },
                {
                  "@type": "Organization",
                  "@id": "https://plus.eqourse.com/#organization",
                  "name": "eQOURSE+",
                  "url": "https://plus.eqourse.com"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-92144-45870",
                  "contactType": "customer service",
                  "email": "info@eqourse.com",
                  "areaServed": ["IN", "SG", "US", "GB", "AE", "CN"],
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "knowsAbout": [
                "AI Data Services",
                "AI Data Collection",
                "Data Annotation & Labeling",
                "Data Cleaning & Validation",
                "AI Model Testing",
                "Robotics Training Data",
                "Content Services",
                "E-Learning Content Development",
                "Curriculum Development",
                "Embodied AI Data",
                "Localization Services",
                "LMS Integration"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C-29, Indra Vihar, Shiv Jyoti School Road",
                "addressLocality": "Kota",
                "addressRegion": "Rajasthan",
                "postalCode": "324005",
                "addressCountry": "IN"
              }
            }
          `}
        </script>

        {/* WebSite identity. The blog has no indexable site-search endpoint. */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "eQOURSE",
              "url": "https://www.eqourse.com/",
              "publisher": { "@id": "https://www.eqourse.com/#organization" }
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <DeferredSection minHeight={720}><JourneyTimeline /></DeferredSection>
        <DeferredSection minHeight={420}><StatsSection /></DeferredSection>
        <DeferredSection minHeight={900}>
          <ServicesSection activeTab={activeServiceTab} onTabChange={setActiveServiceTab} />
        </DeferredSection>
        <DeferredSection minHeight={720}><ProcessSection /></DeferredSection>
        <DeferredSection minHeight={800}><IndustriesSection /></DeferredSection>
        <DeferredSection minHeight={680}><CaseStudiesSection /></DeferredSection>
        <DeferredSection minHeight={760}><WhyChooseUs /></DeferredSection>
        <DeferredSection minHeight={360}><CTASection /></DeferredSection>
        <DeferredSection minHeight={520}><OurBrandsSection /></DeferredSection>
        <DeferredSection minHeight={420}><ClientsSection /></DeferredSection>
        <DeferredSection minHeight={700}><TestimonialsSection /></DeferredSection>
        <DeferredSection minHeight={700}><BlogSection /></DeferredSection>
        <DeferredSection minHeight={320}><NewsletterSection /></DeferredSection>
        <DeferredSection minHeight={720}><Footer /></DeferredSection>
      <DeferredSection minHeight={1}><LeadFormPopup /></DeferredSection>
    </div>
  );
};

export default Index;
