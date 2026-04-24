import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import AnnotationTypes from "./AnnotationTypes";
import QualityFramework from "./QualityFramework";
import OutputFormats from "./OutputFormats";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";

const faqs = [
  {
    question: "What annotation types do you support?",
    answer:
      "We cover NLP (NER, sentiment, classification, relation extraction, MT post-editing, summarization), Computer Vision (bounding boxes, segmentation, polygons, keypoints, 3D point cloud, image classification), Audio (transcription, diarization, emotion detection, phonetic annotation), and RLHF/LLM (response ranking, instruction following, safety labeling, factual verification).",
  },
  {
    question: "How do you maintain annotation consistency?",
    answer:
      "Through our multi-tier QA framework: inter-annotator agreement (IAA >= 0.80), honeypot validation (15-20% gold-standard tasks), peer review, expert audit, and continuous annotator calibration sessions. This layered approach consistently delivers 98%+ accuracy.",
  },
  {
    question: "What output formats do you deliver in?",
    answer:
      "We deliver in all major formats including COCO JSON, Pascal VOC, CoNLL, JSONL, Parquet, CSV/TSV, spaCy format, and custom schemas. We match the format to your ML pipeline requirements.",
  },
  {
    question: "Can you handle specialized domain annotation?",
    answer:
      "Yes. Our annotators include STEM specialists in medical, legal, financial, and technical domains. We develop custom guidelines, conduct domain-specific training, and use subject matter experts for quality review.",
  },
  {
    question: "How do you handle RLHF annotation?",
    answer:
      "We provide trained human raters for RLHF tasks including response ranking, instruction-following quality assessment, safety and toxicity labeling, and factual accuracy verification.",
  },
];

const AnnotationPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Annotation & Labeling" },
    ]}
  >
    <SEOHead
      title="AI Data Annotation & Labeling Services | eQOURSE"
      description="Expert NLP, Computer Vision, Audio, and RLHF annotation. IAA >= 0.80, multi-tier QA, 98%+ accuracy. COCO, CoNLL, JSONL output formats."
      canonical="https://eqourse.com/ai-data-services/annotation-labeling"
      keywords="data annotation, data labeling, NER annotation, bounding box, semantic segmentation, RLHF labeling, NLP annotation, computer vision annotation"
    />

    <ServiceHero
      preHeadline="Annotation & Labeling"
      headline="Expert Annotations for"
      headlineAccent="Production AI"
      subtext="NLP, Computer Vision, Audio, and RLHF labeling with inter-annotator agreement >= 0.80. Multi-tier QA ensures 98%+ accuracy on every project."
      ctaText="Get Annotation Quote"
      ctaLink="/free-pilot"
    />

    <ServiceNarrativeSection
      label="Annotation Intelligence"
      title="What Is AI Data"
      gradientText="Annotation?"
      description="Annotation converts raw, unstructured data into model-understandable signals that directly shape training outcomes."
      paragraphs={[
        "Without precise labels, even large datasets fail to produce reliable model behavior. Annotation defines how your model interprets language, visuals, audio events, and user intent.",
        "eQOURSE combines specialist annotators, calibrated guideline systems, and strict QA layers to produce labels that hold up in production and downstream evaluation.",
      ]}
      bullets={[
        "Task design aligned to model objective, not generic labeling templates",
        "Domain-trained annotators with policy calibration and continuous audits",
        "Traceable QA workflows that protect consistency across scale",
      ]}
      stats={[
        { value: "0.80+", label: "IAA target" },
        { value: "98%+", label: "Accuracy" },
        { value: "4", label: "Modalities" },
        { value: "100%", label: "Audit trail" },
      ]}
      panelTitle="Annotation Reliability Profile"
      panelSubtitle="Key quality dimensions for production labels."
      bars={[
        { label: "Guideline clarity", value: 93 },
        { label: "Annotator agreement", value: 90 },
        { label: "Review depth", value: 96 },
        { label: "Schema compliance", value: 97 },
      ]}
    />

    <AnnotationTypes />
    <QualityFramework />
    <OutputFormats />
    <FAQSection faqs={faqs} />
    <ServiceCTA
      headline="Need Expert Annotations?"
      subtext="Share your annotation guidelines or let us help you design them. Start with a free pilot to evaluate quality."
      ctaText="Start Free Pilot"
    />
  </AIDataServicesLayout>
);

export default AnnotationPage;
