import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import AboutWhoWeAre from "@/components/about/AboutWhoWeAre";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFounder from "@/components/about/AboutFounder";
import AboutStats from "@/components/about/AboutStats";
import AboutNewsletter from "@/components/about/AboutNewsletter";

const AboutUs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us" }]}>
      <Helmet>
        <title>About eQOURSE │ EdTech Solutions & AI Data Services Company │ India & Singapore</title>
        <meta
          name="description"
          content="eQOURSE is an ISO 9001 & 27001 certified company delivering EdTech solutions and AI data services. 500+ specialists, 30+ languages, offices in India & Singapore. Custom e-learning content, curriculum development, data annotation, and real-world AI model testing. Trusted by 200+ global clients."
        />
        <meta
          name="keywords"
          content="about eQOURSE, EdTech company India, AI data services company, e-learning solutions provider, data annotation company, education technology Singapore, ISO certified EdTech, curriculum development company, AI training data provider"
        />
        <meta property="og:title" content="About eQOURSE │ EdTech Solutions & AI Data Services │ India & Singapore" />
        <meta
          property="og:description"
          content="ISO 9001 & 27001 certified. 500+ specialists. EdTech content + AI training data. Offices in India & Singapore. Trusted by 200+ clients across 15+ countries."
        />
        <link rel="canonical" href="https://www.eqourse.com/aboutus" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "eQOURSE",
              "url": "https://www.eqourse.com",
              "logo": "https://www.eqourse.com/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/eqourse",
                "https://www.facebook.com/eQOURSE-102057078229490",
                "https://www.instagram.com/eqourse/",
                "https://www.youtube.com/@eqourse",
                "https://twitter.com/EQourse"
              ],
              "knowsAbout": [
                "EdTech Solutions",
                "AI Data Services",
                "Data Annotation",
                "E-Learning Content Development",
                "Curriculum Development"
              ],
              "areaServed": [
                "India",
                "Singapore",
                "USA",
                "UK",
                "UAE",
                "China",
                "Africa"
              ],
              "location": [
                {
                  "@type": "Place",
                  "name": "eQOURSE India (Kota)",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kota",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "Place",
                  "name": "eQOURSE Singapore",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "SG"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" }
        ]}
      />

      <ServiceHero
        preHeadline="eQOURSE — Delivering Operational Excellence"
        headline="Who Are"
        headlineAccent="We?"
        subtext="EdTech Solutions and AI Data Services."
        ctaText="Explore Services"
        ctaLink="#who-we-are"
      />
      
      <div id="who-we-are">
        <AboutWhoWeAre />
      </div>
      <AboutTimeline />
      <AboutFounder />
      <AboutStats />
      <AboutNewsletter />

    </PageLayout>
  );
};

export default AboutUs;
