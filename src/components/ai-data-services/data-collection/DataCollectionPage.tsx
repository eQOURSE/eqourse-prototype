import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import CinematicHero from "../shared/CinematicHero";
import DataModalities from "./DataModalities";
import LanguageCoverage from "./LanguageCoverage";
import CollectionMethods from "./CollectionMethods";
import UseCases from "./UseCases";
import TalentAdvantage from "./TalentAdvantage";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";
import RoboticsServiceBridge from "../shared/RoboticsServiceBridge";
import {
  CollectionAssurance,
  CollectionDefinition,
  CollectionLifecycleAndPricing,
  CollectionProcess,
} from "./DataCollectionEssentials";
import { FolderKanban, Users, Languages } from "lucide-react";

const faqs = [
  {
    question: "What is AI data collection?",
    answer: "AI data collection is the process of sourcing or capturing raw text, image, audio, video or multimodal data for training, fine-tuning and evaluating AI systems. Annotation adds labels or structure to data that already exists.",
  },
  {
    question: "What types of data can eQOURSE collect?",
    answer: "eQOURSE supports image, audio and speech, text, video and multimodal data collection. The approach depends on the AI use case, target users, languages, devices, environments, volume and quality requirements.",
  },
  {
    question: "What is the difference between data collection and data annotation?",
    answer: "Data collection creates or sources the raw dataset. Data annotation adds labels such as categories, transcriptions, entities or bounding boxes. eQOURSE can connect collection with downstream annotation and validation workflows.",
  },
  {
    question: "Can you support multilingual data collection?",
    answer: "Yes. eQOURSE supports data programmes across 30+ languages. Language, region, dialect, accent and contributor requirements are defined during scoping so the collection plan matches the model's target users.",
  },
  {
    question: "How do you manage data quality?",
    answer: "Quality controls can include contributor screening, capture guidelines, pilot validation, automated file checks, human QA, format validation, duplication checks and final acceptance review.",
  },
  {
    question: "Can you collect data using specific devices or environments?",
    answer: "Yes. Collection can be designed around defined cameras, microphones, sensors, locations, lighting conditions, acoustic environments and other project-specific capture constraints.",
  },
  {
    question: "How is consent handled?",
    answer: "For contributor-led programmes, consent and permitted use are defined as part of the collection workflow. Exact consent, retention and handling requirements depend on the project, data type and applicable legal requirements.",
  },
  {
    question: "How much does AI data collection cost?",
    answer: "Cost depends on modality, volume, language and regional requirements, contributor profile, device and environment constraints, timeline and QA requirements. eQOURSE provides a project-specific scope and quote.",
  },
  {
    question: "Can eQOURSE annotate the data after collection?",
    answer: "Yes. Collected data can move into eQOURSE's annotation and labeling, cleaning and validation, and model-testing workflows where required.",
  },
  {
    question: "Can you support AI data collection for robotics?",
    answer: "eQOURSE can support real-world visual, video and multimodal data collection relevant to physical and embodied AI through its Robotics Training Data Services.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: "https://www.eqourse.com/ai-data-services/data-collection" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.eqourse.com/ai-data-services/data-collection#service",
  name: "AI Data Collection Services",
  serviceType: "AI Training Data Collection",
  description: "Custom image, audio, text, video and multimodal data collection for AI and machine learning.",
  provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" },
  areaServed: "Worldwide",
  url: "https://www.eqourse.com/ai-data-services/data-collection",
};

const DataCollectionPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Collection" }]}>
    <SEOHead
      title="AI Data Collection Services | Custom Training Datasets | eQOURSE"
      description="Build custom image, audio, text and video training datasets with multilingual collection, quality controls, consent handling and secure delivery."
      canonical="https://www.eqourse.com/ai-data-services/data-collection"
      keywords="AI data collection services, AI training data collection, custom training datasets, multimodal data collection"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
    </Helmet>

    <CinematicHero
      kicker="Data Collection"
      headline="Custom Datasets for"
      headlineAccent="Every AI Model"
      subtext="Purpose-built text, audio, image and video data across 30+ languages, with consent, provenance and quality controls shaped around real deployment conditions."
      ctaText="Start Free Pilot"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/Data Collection V2.webp"
      imageAvifSrc="/assets/ai-data/Data Collection V2.avif"
      imageAlt="AI data collection across text, audio, image and video for machine learning"
      imageWidth={1672}
      imageHeight={941}
      stats={[
        { value: "4", label: "Core modalities" },
        { value: "30+", label: "Languages" },
        { value: "500+", label: "Specialists" },
      ]}
      scrollTarget="#collection-definition"
      scrollLabel="Explore data collection"
    />

    <div id="collection-definition">
      <CollectionDefinition />
    </div>

    <ServiceNarrativeSection
      label="Collection Strategy"
      title="Why Data Collection"
      gradientText="Matters"
      description="Model reliability begins with representative data and a collection specification grounded in real deployment conditions."
      paragraphs={[
        "A useful dataset is not simply large. It should represent the people, language variants, devices, environments and behaviours the model will encounter in production.",
        "eQOURSE collection programmes define coverage and acceptance criteria before scale, then connect contributor screening, capture guidance, pilot validation and final delivery.",
      ]}
      bullets={[
        "Coverage designed around target users, regions, languages and deployment environments",
        "Device-specific, contributor-led, field, studio and approved-source collection models",
        "Consent, provenance, format and quality requirements defined during project scoping",
      ]}
      stats={[
        { value: "4", label: "Core modalities" },
        { value: "30+", label: "Languages" },
        { value: "500+", label: "Specialists" },
        { value: "ISO", label: "9001 & 27001" },
      ]}
      panelTitle="Collection Specification"
      panelSubtitle="The practical dimensions aligned before a pilot begins."
      panelItems={[
        "Target population, languages and regional coverage",
        "Devices, environments and capture conditions",
        "Consent, permitted use and provenance requirements",
        "File formats, metadata and acceptance criteria",
      ]}
      dark
    />

    <DataModalities />
    <LanguageCoverage />
    <CollectionMethods />
    <CollectionProcess />
    <UseCases />
    <CollectionAssurance />
    <TalentAdvantage />
    <CollectionLifecycleAndPricing />
    <RoboticsServiceBridge context="collection" />
    <RelatedBlogs />
    <FAQSection faqs={faqs} label="AI Data Collection FAQs" title="Frequently Asked Questions About AI Data Collection" />
    <ServiceCTA
      headline="Ready to Build Your AI Training Dataset?"
      subtext="Tell us the data type, target volume, languages, deployment environment and timeline. We'll translate the requirement into a practical collection plan."
      ctaText="Start Free Pilot"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      note="Pilot setup in 48 hours"
    />
  </AIDataServicesLayout>
);

export default DataCollectionPage;
