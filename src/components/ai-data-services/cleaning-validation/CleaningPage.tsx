import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import CleaningServices from "./CleaningServices";
import ValidationPipeline from "./ValidationPipeline";
import ComplianceSecurity from "./ComplianceSecurity";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";

const faqs = [
  {
    question: "What data cleaning services do you offer?",
    answer:
      "We offer five core services: deduplication (exact and near-duplicate removal), noise removal (encoding fixes, HTML stripping, OCR cleanup), PII redaction (configurable replacement strategies), consistency normalization (dates, units, casing, terminology), and metadata enrichment (language codes, domain tags, source provenance).",
  },
  {
    question: "How do you handle PII in datasets?",
    answer:
      "We use a combination of regex patterns, NER models, and human review to detect PII (names, emails, phone numbers, addresses, SSNs). You can choose replacement strategies: token replacement, synthetic substitution, or complete removal. All redaction is logged for audit trails.",
  },
  {
    question: "What accuracy guarantee do you provide?",
    answer:
      "We guarantee 98%+ accuracy through our 3-tier validation pipeline: automated rules (100% coverage), gold-standard comparison (20% sample), and expert human review. If accuracy falls below threshold, we rework at no additional cost.",
  },
  {
    question: "Are your processes GDPR compliant?",
    answer:
      "Yes. We are GDPR compliant with ISO 27001 and ISO 9001 certifications. All teams sign NDAs, work in isolated environments with role-based access control, and all data transformations are logged with full audit trails and data lineage tracking.",
  },
  {
    question: "Can you clean data that's already been annotated?",
    answer:
      "Absolutely. We can clean pre-annotated data while preserving label integrity. Our pipeline handles label-aware deduplication, annotation consistency checks, and format validation.",
  },
];

const CleaningPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Cleaning & Validation" },
    ]}
  >
    <SEOHead
      title="AI Data Cleaning & Validation Services | eQOURSE"
      description="Deduplication, PII redaction, noise removal, and 3-tier validation delivering 98%+ accuracy. GDPR compliant, ISO certified."
      canonical="https://eqourse.com/ai-data-services/cleaning-validation"
      keywords="data cleaning, data validation, PII redaction, deduplication, data quality, GDPR compliance, data normalization"
    />

    <ServiceHero
      preHeadline="Cleaning & Validation"
      headline="Clean Data,"
      headlineAccent="Better Models"
      subtext="Deduplication, PII redaction, noise removal, and multi-tier validation pipelines. 98%+ accuracy guaranteed with full GDPR compliance."
      ctaText="Get Cleaning Quote"
      ctaLink="/free-pilot"
    />

    <ServiceNarrativeSection
      label="Data Quality Core"
      title="Why Data Cleaning"
      gradientText="Matters"
      description="Raw datasets carry duplicates, noise, and compliance risks that directly hurt model quality and trust."
      paragraphs={[
        "Training on unclean data amplifies errors: models learn wrong patterns, underperform on edge cases, and expose teams to governance risk.",
        "Our cleaning and validation stack standardizes, redacts, and verifies your dataset before training so model behavior is stable, auditable, and production-safe.",
      ]}
      bullets={[
        "PII-safe processing with configurable redaction strategies",
        "Consistency normalization for formats, units, and terminology",
        "Layered validation checkpoints before every delivery batch",
      ]}
      stats={[
        { value: "98%+", label: "Accuracy" },
        { value: "3", label: "Validation tiers" },
        { value: "100%", label: "Audit logs" },
        { value: "GDPR", label: "Compliant" },
      ]}
      panelTitle="Cleaning Pipeline Control"
      panelSubtitle="Signals we monitor to maintain dataset integrity."
      bars={[
        { label: "Deduplication precision", value: 95 },
        { label: "PII detection coverage", value: 97 },
        { label: "Normalization consistency", value: 94 },
        { label: "Final QA pass rate", value: 98 },
      ]}
      dark
      reverse
    />

    <CleaningServices />
    <ValidationPipeline />
    <ComplianceSecurity />
    <FAQSection faqs={faqs} />
    <ServiceCTA
      headline="Need Cleaner Data?"
      subtext="Share a sample of your dataset and we'll provide a free quality assessment with recommendations."
      ctaText="Get Free Assessment"
    />
  </AIDataServicesLayout>
);

export default CleaningPage;
