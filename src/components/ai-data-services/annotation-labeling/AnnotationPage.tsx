import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { BadgeCheck, BookOpenCheck, Braces, ScanLine } from "lucide-react";
import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import CinematicHero from "../shared/CinematicHero";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import AnnotationTypes from "./AnnotationTypes";
import QualityFramework from "./QualityFramework";
import {
  AnnotationDefinition,
  AnnotationProcess,
  AnnotationTaskTypes,
  EngagementComparisonPricing,
  GuidelinesAndExperts,
  IndustriesPipelineProof,
  LanguagesToolsSecurity,
  WhyEqourse,
} from "./AnnotationCoreSections";

const faqs = [
  ["What is data annotation?", "Data annotation is the process of adding labels, tags, boundaries or structure to raw image, video, text, audio or document data so that a machine learning model can learn from it."],
  ["What is the difference between data annotation and data labeling?", "The terms are used interchangeably. Where a distinction is drawn, labeling means assigning a class to a whole item, while annotation covers richer structured output such as regions, relationships and attributes. eQOURSE delivers both."],
  ["What is the difference between data collection and data annotation?", "Data collection sources or captures the raw dataset. Data annotation adds labels and structure to data that already exists. Many programmes need both, run in sequence."],
  ["What types of data can eQOURSE annotate?", "Images, video, text, audio and speech, documents and scanned records, 3D point cloud and LiDAR, and human-feedback and evaluation data for large language models."],
  ["How do you ensure annotation quality?", "Controls include written guidelines, qualification tests, gold-standard sets, inter-annotator agreement, consensus labeling, senior adjudication, multi-pass review and automated schema validation. The acceptance threshold is agreed during the pilot."],
  ["Do you provide subject-matter experts for specialised annotation?", "Yes. eQOURSE staffs qualified reviewers in STEM, medical and life sciences, legal, linguistics and education for tasks where domain judgement determines label quality, including RLHF evaluation and factual verification."],
  ["Can you work in our annotation tool?", "Yes. Projects can run inside your platform with your licences and access controls, or on tooling provided by eQOURSE."],
  ["What output formats do you deliver?", "COCO, YOLO, Pascal VOC, CVAT XML, segmentation masks, JSON and JSONL, CSV, CoNLL, BIO/IOB, SRT, VTT, RTTM, Parquet or a custom client schema."],
  ["Do you support multilingual annotation?", "Yes. eQOURSE annotates across 30+ languages with native-speaker reviewers, with deepest coverage in Indic languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Urdu, including code-mixed and transliterated text."],
  ["How much do data annotation services cost?", "Cost depends on task complexity, objects per item, volume, quality tier, language and domain expertise, turnaround and security requirements. Share a sample and target schema for a scoped estimate."],
  ["How long does an annotation project take?", "A pilot typically runs within the first week. Production timelines depend on volume, task complexity and quality tier, and are agreed with a throughput assumption you can verify against the pilot."],
  ["How is our data kept secure?", "Work runs under ISO 27001 certified processes with NDAs, role-based access, audit trails, secure delivery environments and contractually defined retention and deletion. Restricted datasets can be handled in a client-controlled environment."],
  ["Can you review or fix a dataset we already labeled?", "Yes. We audit existing labeled data, quantify the error rate against a corrected guideline, and either repair or re-label the affected items."],
  ["Can eQOURSE handle collection and annotation together?", "Yes. Data can be collected, annotated, cleaned, validated and used in model testing within a single eQOURSE workflow."],
  ["Do you support RLHF and LLM evaluation work?", "Yes, including preference ranking, instruction-following evaluation, safety and policy classification, factual and citation verification, red teaming, and agent trajectory review, with subject-matter reviewers where domain judgement is required."],
].map(([question, answer]) => ({ question, answer }));

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.eqourse.com/ai-data-services/annotation-labeling#service",
      name: "Data Annotation & Labeling Services",
      serviceType: "Data Annotation and Labeling",
      url: "https://www.eqourse.com/ai-data-services/annotation-labeling",
      description: "Data annotation and labeling across image, video, text, audio, documents, 3D point cloud and RLHF with subject-matter review and multi-tier QA.",
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/", address: [{ "@type": "PostalAddress", addressCountry: "IN" }, { "@type": "PostalAddress", addressCountry: "SG" }] },
      areaServed: "Worldwide",
      availableLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: "https://www.eqourse.com/ai-data-services/annotation-labeling" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ],
};

const AnnotationPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Annotation & Labeling" }]}>
    <SEOHead
      title="Data Annotation & Labeling Services | eQOURSE"
      description="Expert data annotation for image, video, text, audio, documents and RLHF with SME reviewers, multi-tier QA, 30+ languages and ISO processes."
      canonical="https://www.eqourse.com/ai-data-services/annotation-labeling"
      keywords="data annotation services, data labeling services, image annotation, video annotation, NLP annotation, audio annotation, RLHF data services, document annotation"
      ogImage="https://www.eqourse.com/assets/ai-data/annotation-labeling/annotation-labeling-og.webp"
    />
    <Helmet>
      <link rel="preload" as="image" href="/assets/ai-data/annotation-labeling/data-annotation-labeling-services-hero.avif" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>

    <CinematicHero
      kicker="Data Annotation & Labeling"
      headline="Data Annotation & Labeling Services for"
      headlineAccent="AI and Machine Learning"
      subtext="Turn raw images, video, text, audio, documents and LLM feedback into model-ready training data with written guidelines, trained annotators and multi-tier quality review."
      ctaText="Start Free Pilot"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/annotation-labeling/data-annotation-labeling-services-hero.webp"
      imageAvifSrc="/assets/ai-data/annotation-labeling/data-annotation-labeling-services-hero.avif"
      imageAlt="Annotation specialist reviewing labeled image and text data on a dual-monitor workstation"
      imageWidth={1200}
      imageHeight={800}
      stats={[
        { value: "500+", label: "Annotation & QA specialists" },
        { value: "30+", label: "Languages supported" },
        { value: "ISO", label: "9001 & 27001 processes" }
      ]}
      scrollTarget="#annotation-definition"
      scrollLabel="Explore annotation services"
    />

    <div id="annotation-definition" className="border-y border-border/60 bg-background"><div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-5 text-center md:flex-row md:gap-8"><BadgeCheck className="h-5 w-5 text-primary"/><p className="text-sm font-medium text-foreground/75">Trusted by AI teams building computer vision, speech, NLP and large language models.</p><div className="flex gap-5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><span>ISO 9001</span><span>ISO 27001</span></div></div></div>

    <AnnotationDefinition />
    <AnnotationTypes />
    <AnnotationTaskTypes />
    <AnnotationProcess />
    <QualityFramework />
    <GuidelinesAndExperts />
    <LanguagesToolsSecurity />
    <EngagementComparisonPricing />
    <IndustriesPipelineProof />
    <WhyEqourse />
    <RelatedBlogs />
    <FAQSection faqs={faqs} label="Data Annotation FAQs" title="Frequently Asked Questions About Data Annotation" />
    <ServiceCTA headline="Turn Your Raw Data Into Model-Ready Training Data" subtext="Tell us the data type, volume, label schema, quality target and timeline—we'll scope a pilot on your own data." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Pilot setup in the first week" />
  </AIDataServicesLayout>
);

export default AnnotationPage;
