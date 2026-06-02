import ContentServicesLayout from "../shared/ContentServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import EditorialPublishingServicesGrid from "./EditorialPublishingServicesGrid";
import { PenTool, LayoutTemplate, Settings } from "lucide-react";

const faqs = [
  {
    question: "What types of clients can use eQOURSE editorial and publishing services?",
    answer:
      "eQOURSE supports education publishers, EdTech companies, schools, universities, training providers, corporate learning teams and organisations managing large learning-content portfolios - for curriculum content, assessments, instructor resources, digital assets, training material and publication workflows.",
  },
  {
    question: "Does eQOURSE provide both editorial and production support?",
    answer:
      "Yes. eQOURSE can support editing, copyediting, proofing coordination, design handover, metadata preparation, prepress checks and production tracking. The exact workflow depends on the client's content type, internal review process, style guide, delivery format and production schedule.",
  },
  {
    question: "Can eQOURSE support digital publishing and eBook conversion?",
    answer:
      "eQOURSE can prepare content for digital delivery, including LMS-ready assets, web-ready structures and eBook-oriented workflows where required. When EPUB output is requested, the scope should define target specifications, accessibility requirements, validation responsibilities and final platform requirements.",
  },
  {
    question: "Can metadata services support content discovery?",
    answer:
      "Metadata services can support content organisation, searchability and catalogue readiness when applied consistently across assets. eQOURSE prepares metadata fields, tags, naming conventions and taxonomy inputs based on client templates, platform rules and distribution needs.",
  },
  {
    question: "Can eQOURSE adapt to a client's style guide?",
    answer:
      "Yes. eQOURSE can apply client style guides, terminology lists, formatting rules, brand guidelines and project-specific editorial instructions. The workflow should include sample reviews and approval checkpoints before full-scale production starts.",
  },
];

const EditorialPublishingPage = () => (
  <ContentServicesLayout
    breadcrumbs={[
      { label: "Content Services", href: "/content-services" },
      { label: "Editorial, Publishing & Designing Services" },
    ]}
  >
    <SEOHead
      title="Editorial, Publishing & Designing Services | eQOURSE"
      description="Editorial services for publishers, EdTech firms and institutions: editing, production, conversion, metadata, design, prepress and support."
      canonical="https://eqourse.com/content-services/editorial-publishing-designing-services"
      keywords="editorial services, publishing production services, educational content editing, digital publishing services, prepress services, metadata services, image processing, design services"
    />

    <ServiceHero
      preHeadline="✦ Editorial, Publishing & Designing Services"
      headline="Editorial Services for"
      headlineAccent="Global Learning Content"
      subtext="eQOURSE delivers editorial services for education publishers, EdTech companies, institutions and learning-content teams - covering content refinement, publishing production, digital conversion, metadata preparation, design coordination, prepress checks and production support for print and digital learning materials."
      ctaText="Request Editorial Support"
      ctaLink="/contact"
      imageSrc="/assets/banners/editorial-publishing/Editorial, Publishing & Designing Services(main ).png"
      imageAlt="Editorial, Publishing and Designing Services by eQOURSE including copy editing, production, and digital conversion"
      rotatingBadges={[
        { icon: PenTool, title: "Editorial", subtitle: "Content refinement", color: "hsl(170 82% 55%)" },
        { icon: LayoutTemplate, title: "Design", subtitle: "Digital & print", color: "hsl(190 85% 68%)" },
        { icon: Settings, title: "Production", subtitle: "End-to-end support", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "PUB", title: "Publishing", subtitle: "Production workflows" }}
    />

    <ServiceNarrativeSection
      label="Publishing Workflow"
      title="Editorial Workflows Built for"
      gradientText="Learning Content"
      description="Designed for publishers, EdTech teams and institutions managing print, digital and platform-ready learning assets."
      paragraphs={[
        "Education content requires more than surface-level proofreading. Publishers and learning teams need editorial workflows that preserve subject accuracy, align terminology, prepare assets for production and keep content usable across print, digital, LMS and platform environments.",
        "eQOURSE structures editorial support around intake review, content editing, design coordination, metadata preparation, prepress checks and production handover. The workflow adapts to client style guides, programme requirements, output formats and review cycles.",
      ]}
      bullets={[
        "Editorial review aligned to client style guides",
        "Production support for print and digital outputs",
        "Metadata and asset preparation for discovery",
      ]}
      stats={[
        { value: "Editorial", label: "Content Review" },
        { value: "Multi-format", label: "Print & Digital" },
        { value: "Metadata", label: "Discovery Support" },
        { value: "QA-Led", label: "Production Support" },
      ]}
      panelTitle="Editorial Production Flow"
      panelSubtitle="Recommended workflow emphasis for structured publishing delivery."
      bars={[
        { label: "Intake & Scoping", value: 20 },
        { label: "Editorial Review", value: 35 },
        { label: "Production Preparation", value: 25 },
        { label: "Delivery QA", value: 20 },
      ]}
    />

    <EditorialPublishingServicesGrid />

    <FAQSection faqs={faqs} />

    <ServiceCTA
      headline="Build a Cleaner Editorial Production Workflow"
      subtext="eQOURSE scopes editorial and publishing support based on content type, format, review stage and delivery requirements for publishers, EdTech teams and institutions."
      ctaText="Request Editorial Support"
    />
  </ContentServicesLayout>
);

export default EditorialPublishingPage;
