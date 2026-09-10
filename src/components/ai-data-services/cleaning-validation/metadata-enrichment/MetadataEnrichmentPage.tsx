import { Helmet } from "react-helmet-async";
import { GitBranch, Network, Tags } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import ServiceCTA from "../../shared/ServiceCTA";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { metadataFaqs, metadataOffers } from "./MetadataEnrichmentContent";
import {
  CommercialRelatedWhyFAQ,
  EntityResolution,
  LanguageFormatsSecurity,
  MetadataDefinitionAndLayers,
  MetadataMotionStyles,
  MetadataTrustStrip,
  ProcessAndDeliverables,
  SurvivalAndSelectiveTraining,
  TaxonomyAndProvenance,
} from "./MetadataEnrichmentCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/cleaning-validation/metadata-enrichment";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Metadata Enrichment & Data Standardization Services",
      serviceType: "AI Dataset Metadata Enrichment, Entity Resolution and Data Standardization",
      url: canonical,
      description: "Language, domain, quality and provenance tagging, entity resolution, taxonomy mapping and data lineage for searchable, governable AI datasets.",
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
        name: "Metadata Enrichment and Data Standardization Capabilities",
        itemListElement: metadataOffers.map((name) => ({
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
        { "@type": "ListItem", position: 4, name: "Metadata Enrichment & Data Standardization", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: metadataFaqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const MetadataEnrichmentPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" },
      { label: "Metadata Enrichment & Data Standardization" },
    ]}
  >
    <SEOHead
      title="Metadata Enrichment & Data Standardization | eQOURSE"
      description="Language, domain, quality and provenance tagging, entity resolution and taxonomy mapping—so AI datasets stay filterable, reusable and auditable."
      canonical={canonical}
      keywords="metadata enrichment services, data standardization services, AI dataset metadata, entity resolution services, data lineage services, taxonomy mapping, provenance metadata, training data governance"
      ogImage="https://www.eqourse.com/assets/ai-data/cleaning-validation/metadata-enrichment/metadata-enrichment-og.webp"
    />
    <Helmet>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="preload" as="image" href="/assets/ai-data/cleaning-validation/metadata-enrichment/metadata-enrichment-services-hero.webp" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <MetadataMotionStyles />
    <ServiceHero
      tone="light"
      preHeadline="Structured Context for Governable AI Data"
      headline="Metadata Enrichment &"
      headlineAccent="Data Standardization Services"
      subtext="Add language, domain, quality, source, licence, lineage and entity context to every item—then standardize the schema so teams can find, filter, govern and reproduce the data they use."
      ctaText="Get a Free Metadata Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/cleaning-validation/metadata-enrichment/metadata-enrichment-services-hero.webp" imageAvifSrc="/assets/ai-data/cleaning-validation/metadata-enrichment/metadata-enrichment-services-hero.avif"
      imageAlt="Data specialist reviewing abstract metadata fields and dataset coverage on two monitors"
      imageWidth={1200}
      imageHeight={800}
      trustStats={[
        { value: "Filterable", label: "Tag once, train selectively" },
        { value: "Traceable", label: "Source + lineage documented" },
        { value: "30+", label: "Global languages + Indian depth" },
      ]}
      rotatingBadges={[
        { icon: Tags, title: "Context attached", subtitle: "Language · domain · quality", color: "hsl(170 82% 38%)" },
        { icon: Network, title: "Entities linked", subtitle: "Records retained · confidence stated", color: "hsl(31 88% 49%)" },
        { icon: GitBranch, title: "Lineage retained", subtitle: "Source · version · transformation", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "QA", title: "Field confidence visible", subtitle: "Inferred · deterministic · verified" }}
    />
    <MetadataTrustStrip />
    <MetadataDefinitionAndLayers />
    <SurvivalAndSelectiveTraining />
    <EntityResolution />
    <TaxonomyAndProvenance />
    <ProcessAndDeliverables />
    <LanguageFormatsSecurity />
    <RelatedBlogs />
    <CommercialRelatedWhyFAQ />
    <ServiceCTA
      headline="Turn a Dataset into a System Your Team Can Reuse"
      subtext="Share a representative sample and the decisions you need to make later. We'll assess what metadata exists, what can be recovered and which schema will make the dataset genuinely searchable and governable."
      ctaText="Get a Free Metadata Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      note="Confidential assessment · field-level confidence · reusable rules"
    />
  </AIDataServicesLayout>
);

export default MetadataEnrichmentPage;
