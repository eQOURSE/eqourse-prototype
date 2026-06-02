import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookOpen, Layers, List, ClipboardList, GitBranch, PackageCheck } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const PublishingProductionPage = () => (
  <SubServicePageTemplate
    seoTitle="Publishing Production Services | eQOURSE"
    seoDescription="Publishing production services for educational content, including typesetting, page composition, templates, indexing and accessibility layout support."
    seoCanonical="https://www.eqourse.com/publishing-production"
    seoKeywords="publishing production, education publishing production, typesetting, page composition, indexing services, proof review, production handover"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Publishing Production"
    preHeadline="✦ Publishing Production - Structured Delivery for Learning Content"
    headline="Publishing Production"
    headlineAccent="for Learning Content"
    subtext="Publishing production support covers the structured handover between editorial, design, layout, conversion and final delivery teams - coordinating production-ready content, version control, asset tracking, proof review support and client-specific production requirements."
    ctaText="Request Production Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Publishing Production for Learning Content.png"
    bannerImageAlt="Publishing production services for learning content including XML workflows, typesetting and layout design by eQOURSE."
    introLabel="Production Workflow"
    introTitle="Production Support That"
    introGradient="Moves Content Forward"
    introDescription="Learning materials move through publishing stages with clear ownership and documented checkpoints when production is properly coordinated."
    introParagraphs={[
      "eQOURSE coordinates production-ready content, version control, asset tracking, proof review support and client-specific production requirements so learning materials move through publishing stages with clear ownership.",
      "From typesetting to final file delivery, the production workflow is structured around intake, editorial handover, design coordination, prepress check and output packaging for each project.",
    ]}
    stats={[
      { value: "QA-Led", label: "Production Flow" },
      { value: "Multi-stage", label: "Coordination" },
      { value: "Documented", label: "Checkpoints" },
      { value: "B2B", label: "Publisher Ready" },
    ]}
    servicesLabel="Production Capabilities"
    servicesTitle="Publishing Production"
    servicesGradient="Support"
    services={[
      {
        icon: BookOpen,
        title: "Typesetting & Page Composition",
        description:
          "Professional typesetting and page composition for print and digital publications - including text flow, heading hierarchy, column layout and font consistency across chapters.",
      },
      {
        icon: Layers,
        title: "Template Design & Application",
        description:
          "Master page templates for textbooks, workbooks, assessment packs and instructor guides - ensuring visual consistency across all publication components.",
      },
      {
        icon: List,
        title: "Indexing Services",
        description:
          "Professional back-of-book indexing and controlled vocabulary indexing for educational texts, ensuring learners and instructors can locate content efficiently.",
      },
      {
        icon: ClipboardList,
        title: "Proof Review Support",
        description:
          "Coordination and tracking of proof review cycles - from first proof to final sign-off - with change consolidation and annotated correction rounds.",
      },
      {
        icon: GitBranch,
        title: "Version Control & Asset Tracking",
        description:
          "Systematic version management of content files, design assets, source documents and output files to maintain integrity across collaborative production teams.",
      },
      {
        icon: PackageCheck,
        title: "Production Handover",
        description:
          "Structured final asset packaging - including print files, digital formats, metadata sheets, rights documentation and delivery checklists - for printer or platform handover.",
      },
    ]}
    faqs={[
      {
        question: "What does publishing production support cover?",
        answer:
          "Publishing production support includes typesetting, page composition, indexing, template design, proof review coordination, version control, asset tracking and final production handover for print and digital learning content.",
      },
      {
        question: "Can eQOURSE manage proof cycles?",
        answer:
          "Yes. eQOURSE coordinates proof review rounds, consolidates corrections, tracks changes across versions and supports sign-off workflows aligned to client production schedules.",
      },
    ]}
    ctaHeadline="Streamline Your Publishing Production Workflow"
    ctaSubtext="eQOURSE scopes publishing production support based on content type, format and delivery requirements for education publishers and EdTech teams."
    ctaButtonText="Request Production Support"
    relatedPages={[
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Prepress Services", href: `${PARENT_HREF}/prepress-services` },
      { title: "Digital Conversion", href: `${PARENT_HREF}/digital-conversion` },
      { title: "Design Services", href: `${PARENT_HREF}/design-services` },
    ]}
  />
);

export default PublishingProductionPage;
