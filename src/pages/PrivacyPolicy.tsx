import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";

const PrivacyPolicy = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Privacy Policy" }]}>
      <Helmet>
        <title>Privacy Policy │ eQOURSE — EdTech Solutions &amp; AI Data Services</title>
        <meta
          name="description"
          content="Read eQOURSE's privacy policy. Learn how we collect, use, store, and protect your personal data across our EdTech solutions and AI data services. ISO 27001 certified. GDPR-ready. Offices in India & Singapore."
        />
        <meta
          name="keywords"
          content="eQOURSE privacy policy, data protection, GDPR, ISO 27001, EdTech privacy, AI data privacy, personal data, data security, cookie policy, data retention"
        />
        <meta property="og:title" content="Privacy Policy │ eQOURSE — EdTech Solutions & AI Data Services" />
        <meta
          property="og:description"
          content="Read eQOURSE's privacy policy. Learn how we collect, use, store, and protect your personal data. ISO 27001 certified. GDPR-ready."
        />
        <link rel="canonical" href="https://www.eqourse.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "url": "https://www.eqourse.com/privacy-policy",
              "description": "eQOURSE Privacy Policy — how we handle your data across EdTech solutions and AI data services.",
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "url": "https://www.eqourse.com"
              }
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Privacy Policy", item: "https://www.eqourse.com/privacy-policy" },
        ]}
      />

      <ServiceHero
        preHeadline="Your Privacy Matters"
        headline="Privacy"
        headlineAccent="Policy"
        subtext="Learn how eQOURSE collects, uses, stores, and protects your personal data across our EdTech Solutions and AI Data Services. ISO 27001:2022 certified. GDPR-ready."
        ctaText="Read Policy"
        ctaLink="#introduction"
      />

      <PrivacyPolicyContent />
    </PageLayout>
  );
};

export default PrivacyPolicy;
