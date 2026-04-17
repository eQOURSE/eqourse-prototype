import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import ServicesGrid from "./ServicesGrid";
import SixStepPipeline from "./SixStepPipeline";
import IndustriesServed from "./IndustriesServed";
import WhyEqourse from "./WhyEqourse";
import TrustSignals from "./TrustSignals";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";

const faqs = [
  {
    question: "What types of AI data services does eQOURSE provide?",
    answer:
      "eQOURSE provides end-to-end AI data services including data collection (text, audio, image, video in 30+ languages), annotation and labeling (NLP, CV, Audio, RLHF), data cleaning and validation (deduplication, PII redaction, 98%+ accuracy), and model testing and evaluation (real-world testing via our TuTrain platform with closed-loop feedback).",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We serve Voice and Speech AI, Autonomous Vehicles, Conversational AI, Healthcare and Medical AI, FinTech and Banking, and more. Our domain-specific expertise ensures annotation guidelines and quality benchmarks are tailored to each industry's requirements.",
  },
  {
    question: "How do you ensure data quality?",
    answer:
      "We employ a multi-tier QA framework: automated validation rules, inter-annotator agreement (IAA >= 0.80), honeypot checks (15-20% of tasks), gold-standard comparison, and human expert review. This delivers 98%+ accuracy on production datasets.",
  },
  {
    question: "What languages do you support?",
    answer:
      "We support 30+ languages across Indo-Aryan, Dravidian, Southeast Asian, and European language groups. All annotations are done by native speakers.",
  },
  {
    question: "Can I start with a small pilot before committing?",
    answer:
      "Absolutely. We offer a free pilot program where you can test our capabilities with a representative sample of your data. No commitment required - the pilot helps you evaluate quality, turnaround time, and domain fit before scaling up.",
  },
];

const OverviewPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services" }]}>
    <SEOHead
      title="AI Data Services | eQOURSE - End-to-End AI Training Data Solutions"
      description="Production-grade AI training data: collection, annotation, cleaning, and model testing across 30+ languages. ISO-certified, 98%+ accuracy, GDPR-compliant."
      canonical="https://eqourse.com/ai-data-services"
      keywords="AI data services, data annotation, data labeling, data collection, model testing, training data, RLHF, NLP annotation"
    />

    <ServiceHero
      preHeadline="AI Data Services"
      headline="Collect. Annotate. Clean. Test."
      headlineAccent="One Partner."
      subtext="Custom AI training data across 30+ languages - from raw collection to real-world model testing on actual users. The only closed-loop pipeline in the industry."
      ctaText="Start Free Pilot"
      ctaLink="#contact"
    />

    <ServiceNarrativeSection
      label="AI Data Foundations"
      title="What Are AI Data"
      gradientText="Services?"
      description="Every high-performing AI model starts with dependable data operations, not random data volume."
      paragraphs={[
        "AI data services cover the full lifecycle: collection, annotation, cleaning, validation, and testing so your model performs reliably in production conditions.",
        "At eQOURSE, we combine linguistic depth, domain specialists, and strict quality controls to build datasets that reflect real human behavior, context, and regional variation.",
      ]}
      bullets={[
        "Integrated pipeline from raw data sourcing to deployment-readiness testing",
        "Native-language operations across 30+ languages and regional dialects",
        "Audit-ready quality processes aligned with enterprise security standards",
      ]}
      stats={[
        { value: "500+", label: "AI Specialists" },
        { value: "30+", label: "Languages" },
        { value: "98%+", label: "Accuracy" },
        { value: "ISO", label: "9001 & 27001" },
      ]}
      panelTitle="Pipeline Readiness Scorecard"
      panelSubtitle="How enterprise teams evaluate data operations before production rollout."
      bars={[
        { label: "Collection coverage", value: 92 },
        { label: "Annotation consistency", value: 95 },
        { label: "Validation traceability", value: 98 },
        { label: "Production test readiness", value: 90 },
      ]}
    />

    <ServicesGrid />
    <SixStepPipeline />
    <IndustriesServed />
    <WhyEqourse />
    <TrustSignals />
    <FAQSection faqs={faqs} />
    <ServiceCTA />
  </AIDataServicesLayout>
);

export default OverviewPage;
