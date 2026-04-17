import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import DataModalities from "./DataModalities";
import LanguageCoverage from "./LanguageCoverage";
import CollectionMethods from "./CollectionMethods";
import UseCases from "./UseCases";
import TalentAdvantage from "./TalentAdvantage";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";

const faqs = [
  {
    question: "What types of data can you collect?",
    answer:
      "We collect text (corpora, dialogue, documents), audio (speech recordings, wake-words, multi-speaker conversations), image (object detection sets, medical imaging, satellite imagery), and video (action recognition, driving scenes, gesture recordings) across 30+ languages.",
  },
  {
    question: "How do you ensure data diversity?",
    answer:
      "We use demographic controls, geographic distribution, accent and dialect targeting, and balanced sampling strategies. Our managed crowd of 500+ contributors spans 30+ countries, ensuring natural variation in age, gender, region, and speaking style.",
  },
  {
    question: "What languages do you support for data collection?",
    answer:
      "We support 30+ languages including Indo-Aryan, Dravidian, Southeast Asian, European, East Asian, and Middle Eastern language families.",
  },
  {
    question: "Can you collect domain-specific data?",
    answer:
      "Yes. Our STEM-background specialists understand domain terminology and context. We've collected specialized datasets for healthcare, finance, legal, and technology domains.",
  },
  {
    question: "What's the typical turnaround time for a data collection project?",
    answer:
      "Turnaround varies by scope: pilot datasets typically take 1-2 weeks, mid-scale projects take 3-6 weeks, and large-scale collections are milestone-based with weekly deliveries and progress dashboards.",
  },
];

const DataCollectionPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Data Collection" },
    ]}
  >
    <SEOHead
      title="AI Data Collection Services | eQOURSE - Multi-Modal, 30+ Languages"
      description="Custom text, audio, image, and video dataset collection across 30+ languages. Crowdsourced, web-sourced, and field collection methods with quality controls."
      canonical="https://eqourse.com/ai-data-services/data-collection"
      keywords="AI data collection, training data, speech data, image dataset, multilingual data, crowdsourced data collection"
    />

    <ServiceHero
      preHeadline="Data Collection"
      headline="Custom Datasets for"
      headlineAccent="Every AI Model"
      subtext="Multi-modal data collection across text, audio, image, and video. 30+ languages, domain-specific sourcing, and rigorous quality controls from day one."
      ctaText="Start Data Collection"
      ctaLink="#contact"
    />

    <ServiceNarrativeSection
      label="Collection Strategy"
      title="Why Data Collection"
      gradientText="Matters"
      description="Model performance is capped by data diversity, representativeness, and sourcing discipline."
      paragraphs={[
        "High-quality collection is where model reliability begins. Weak sourcing leads to brittle behavior, bias amplification, and poor generalization in production environments.",
        "Our collection programs are designed for coverage across demographics, regions, language variants, and realistic usage conditions so your training data reflects real users.",
      ]}
      bullets={[
        "Built for domain-specific projects including healthcare, finance, legal, and speech AI",
        "Controlled quality gates from contributor onboarding to final dataset acceptance",
        "Flexible sourcing mix: crowdsourced, web/API, and controlled field collection",
      ]}
      stats={[
        { value: "30+", label: "Languages" },
        { value: "500+", label: "Contributors" },
        { value: "50+", label: "Active projects" },
        { value: "24/7", label: "Ops support" },
      ]}
      panelTitle="Collection Quality Benchmarks"
      panelSubtitle="Coverage indicators we track before dataset handoff."
      bars={[
        { label: "Demographic diversity", value: 91 },
        { label: "Accent and dialect spread", value: 89 },
        { label: "Domain relevance", value: 94 },
        { label: "Collection consistency", value: 96 },
      ]}
      dark
    />

    <DataModalities />
    <LanguageCoverage />
    <CollectionMethods />
    <UseCases />
    <TalentAdvantage />
    <FAQSection faqs={faqs} />
    <ServiceCTA
      headline="Ready to Build Your Dataset?"
      subtext="Tell us what you need - modality, language, volume, and timeline. We'll design a collection plan and start with a free pilot."
      ctaText="Start Free Pilot"
    />
  </AIDataServicesLayout>
);

export default DataCollectionPage;
