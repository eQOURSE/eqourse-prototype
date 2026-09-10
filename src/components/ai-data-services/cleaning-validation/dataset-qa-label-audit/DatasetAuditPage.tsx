import { Helmet } from "react-helmet-async";
import { BarChart3, FileSearch2, Split } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import ServiceCTA from "../../shared/ServiceCTA";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { auditFaqs } from "./DatasetAuditContent";
import {
  AuditDefinition,
  AuditTrustStrip,
  CommercialAndRelated,
  DatasetAuditMotionStyles,
  LeakageSection,
  MethodsAndProcess,
  ModalityCoverage,
  ReportAndDecision,
  RootCauseDiagnostic,
  SamplingSection,
  VendorNeutralAudit,
  WhatAuditChecks,
  WhyAndFAQ,
} from "./DatasetAuditCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/cleaning-validation/dataset-qa-label-audit";
const offers = ["Label Error Rate Measurement", "Per-Class Error Analysis", "Class Confusion Analysis", "Train/Test Split Leakage Detection", "Annotation Guideline Gap Analysis", "Label Correction", "Third-Party Vendor Dataset Audit", "Pre-Acceptance Delivery QA"];
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${canonical}#service`, name: "Dataset QA & Label Audit Services", serviceType: "Dataset Quality Assurance and Label Auditing", url: canonical, description: "Independent audit of labeled training datasets using statistically designed stratified sampling, producing error rates by class with confidence intervals, class confusion analysis, train/test split leakage detection, guideline gap identification and label correction, including datasets produced by other annotation vendors.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/", address: [{ "@type": "PostalAddress", addressCountry: "IN" }, { "@type": "PostalAddress", addressCountry: "SG" }] }, areaServed: "Worldwide", availableLanguage: "en", isPartOf: { "@type": "Service", "@id": "https://www.eqourse.com/ai-data-services/cleaning-validation#service", name: "Data Cleaning & Validation Services", url: "https://www.eqourse.com/ai-data-services/cleaning-validation" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Dataset QA and Label Audit Services", itemListElement: offers.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" }, { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: "https://www.eqourse.com/ai-data-services/cleaning-validation" }, { "@type": "ListItem", position: 4, name: "Dataset QA & Label Audit", item: canonical }] },
    { "@type": "FAQPage", mainEntity: auditFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const DatasetAuditPage = () => <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" }, { label: "Dataset QA & Label Audit" }]}>
  <SEOHead title="Dataset QA & Label Audit Services | eQOURSE" description="Independent labeled-dataset audits with per-class error rates, label correction and train/test leakage detection—including other vendors' work." canonical={canonical} keywords="dataset QA services, label audit services, annotation quality audit, data labeling quality assurance, label error detection, training data audit, train test leakage detection" ogImage="https://www.eqourse.com/assets/ai-data/cleaning-validation/dataset-qa-label-audit/dataset-qa-label-audit-og.webp"/>
  <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/cleaning-validation/dataset-qa-label-audit/dataset-qa-label-audit-services-hero.webp" type="image/webp" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
  <DatasetAuditMotionStyles/>
  <ServiceHero tone="light" preHeadline="Independent Label Quality" headline="Dataset QA &" headlineAccent="Label Audit Services" subtext="eQOURSE independently audits labeled datasets—measuring error rate by class, finding incorrect labels, detecting leakage between training and evaluation splits, and identifying whether the cause is annotator inconsistency or an ambiguous guideline. Including datasets another vendor delivered." ctaText="Get a Free Dataset Audit" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" imageSrc="/assets/ai-data/cleaning-validation/dataset-qa-label-audit/dataset-qa-label-audit-services-hero.webp" imageAvifSrc="/assets/ai-data/cleaning-validation/dataset-qa-label-audit/dataset-qa-label-audit-services-hero.avif" imageAlt="Reviewer auditing labeled dataset samples against an annotation guideline with error rates by class displayed" imageWidth={1200} imageHeight={800} trustStats={[{value:"By class",label:"Not one blended error rate"},{value:"Root cause",label:"Annotator vs guideline gap"},{value:"Split integrity",label:"Train/test leakage checked"}]} rotatingBadges={[{icon:BarChart3,title:"Error rate by class",subtitle:"Range · confusion · coverage",color:"hsl(170 82% 38%)"},{icon:FileSearch2,title:"Root cause found",subtitle:"Reviewer · guideline · ambiguity",color:"hsl(28 90% 48%)"},{icon:Split,title:"Leakage checked",subtitle:"Exact · near · source-level",color:"hsl(190 76% 40%)"}]} bottomBadge={{iconText:"QA",title:"Independent evidence",subtitle:"Measured · adjudicated · actionable"}}/>
  <AuditTrustStrip/><AuditDefinition/><VendorNeutralAudit/><WhatAuditChecks/><SamplingSection/><RootCauseDiagnostic/><LeakageSection/><MethodsAndProcess/><ReportAndDecision/><ModalityCoverage/><CommercialAndRelated/><RelatedBlogs/><WhyAndFAQ/>
  <ServiceCTA headline="Find Out What Your Error Rate Actually Is" subtext="Share a sample of your labeled data and your annotation guideline. We'll return a directional error rate, the errors we found and an honest view of whether a full audit is worth doing." ctaText="Get a Free Dataset Audit" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Start with a representative sample"/>
</AIDataServicesLayout>;

export default DatasetAuditPage;
