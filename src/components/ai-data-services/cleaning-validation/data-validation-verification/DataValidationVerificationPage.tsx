import { Helmet } from "react-helmet-async";
import { AlertTriangle, CheckCheck, FileSearch } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import ServiceHero from "../../shared/ServiceHero";
import { verificationFaqs, verificationOffers } from "./DataValidationVerificationContent";
import {
  CommercialRelatedProofFAQ,
  ConflictConsequenceDecay,
  ExpertiseLanguageSecurity,
  ProcessAndDelivery,
  QuestionsAndSourceTruth,
  VerificationCapabilities,
  VerificationMotionStyles,
  VerificationTrustStrip,
} from "./DataValidationVerificationCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/cleaning-validation/data-validation-verification";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Data Validation & Verification Services",
      serviceType: "Human-in-the-Loop Data Verification",
      url: canonical,
      description: "Human verification of records, attributes and claims against authoritative sources, including source-of-truth definition, source-conflict adjudication and six-state field-level reporting.",
      provider: {
        "@type": "Organization",
        name: "eQOURSE",
        url: "https://www.eqourse.com/",
        address: [
          { "@type": "PostalAddress", addressCountry: "IN" },
          { "@type": "PostalAddress", addressCountry: "SG" },
        ],
      },
      areaServed: "Worldwide",
      availableLanguage: ["en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as", "ur"],
      isPartOf: {
        "@type": "Service",
        "@id": "https://www.eqourse.com/ai-data-services/cleaning-validation#service",
        name: "Data Cleaning & Validation Services",
        url: "https://www.eqourse.com/ai-data-services/cleaning-validation",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Data Verification Services",
        itemListElement: verificationOffers.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: "https://www.eqourse.com/ai-data-services/cleaning-validation" },
        { "@type": "ListItem", position: 4, name: "Data Validation & Verification", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: verificationFaqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const DataValidationVerificationPage = () => (
  <AIDataServicesLayout breadcrumbs={[
    { label: "AI Data Services", href: "/ai-data-services" },
    { label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" },
    { label: "Data Validation & Verification" },
  ]}>
    <SEOHead
      title="Data Verification Services | Human-in-the-Loop | eQOURSE"
      description="Verify records, attributes and claims against authoritative sources—with conflict adjudication, field-level status and honest coverage limits."
      canonical={canonical}
      keywords="data verification services, record verification services, human-in-the-loop data validation, data accuracy verification, business data verification, contact data verification, source of truth data quality"
      ogImage="https://www.eqourse.com/assets/ai-data/cleaning-validation/data-validation-verification/data-validation-verification-og.webp"
    />
    <Helmet>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="preload" as="image" href="/assets/ai-data/cleaning-validation/data-validation-verification/data-validation-verification-services-hero.webp" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <VerificationMotionStyles />
    <ServiceHero
      tone="light"
      preHeadline="Source-Backed Human Verification"
      headline="Data Validation &"
      headlineAccent="Verification Services"
      subtext="Verify records, attributes and claims against authoritative sources—with the source of truth agreed first, conflicts adjudicated, status reported per field and unverifiable evidence stated honestly."
      ctaText="Get a Free Verification Sample"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/cleaning-validation/data-validation-verification/data-validation-verification-services-hero.webp" imageAvifSrc="/assets/ai-data/cleaning-validation/data-validation-verification/data-validation-verification-services-hero.avif"
      imageAlt="Reviewer checking record values against an authoritative source with verification status indicators"
      imageWidth={1200}
      imageHeight={800}
      trustStats={[
        { value: "Source", label: "Agreed before checking" },
        { value: "Conflict", label: "Adjudicated, not hidden" },
        { value: "6 states", label: "Confidence per field" },
      ]}
      rotatingBadges={[
        { icon: FileSearch, title: "Source matched", subtitle: "Authority · date · coverage", color: "hsl(170 82% 38%)" },
        { icon: AlertTriangle, title: "Conflict retained", subtitle: "Values · sources · hierarchy", color: "hsl(31 88% 49%)" },
        { icon: CheckCheck, title: "Status explicit", subtitle: "Verified ≠ plausible", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "EV", title: "Evidence travels with the value", subtitle: "Source · date · reviewer decision" }}
    />
    <VerificationTrustStrip />
    <QuestionsAndSourceTruth />
    <VerificationCapabilities />
    <ConflictConsequenceDecay />
    <ProcessAndDelivery />
    <ExpertiseLanguageSecurity />
    <RelatedBlogs />
    <CommercialRelatedProofFAQ />
    <ServiceCTA
      headline="Find Out How Much of Your Data Is Actually True"
      subtext="Share a representative sample and its downstream use. We'll agree the source of truth, verify a batch and return the real verification, conflict and unverifiable rates."
      ctaText="Get a Free Verification Sample"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      note="Source hierarchy · field-level evidence · honest coverage limits"
    />
  </AIDataServicesLayout>
);

export default DataValidationVerificationPage;
