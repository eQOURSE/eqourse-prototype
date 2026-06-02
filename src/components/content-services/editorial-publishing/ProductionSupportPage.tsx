import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Truck, Layers, FileText, GitBranch, PackageCheck, MessageSquare } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const ProductionSupportPage = () => (
  <SubServicePageTemplate
    seoTitle="Production Support Services | eQOURSE"
    seoDescription="Print production support for publishers and education teams: vendor coordination, large-volume workflows, print specification sheets and asset packaging."
    seoCanonical="https://www.eqourse.com/production-support"
    seoKeywords="production support services, publishing operations support, content update support, print vendor coordination, large-volume print, print specification sheets"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Production Support"
    preHeadline="✦ Production Support - Dependable Operational Follow-Through"
    headline="Production Support"
    headlineAccent="for Learning Programmes"
    subtext="Production support helps clients manage ongoing content updates, corrections, file tracking, release preparation and cross-team coordination - with structured communication, documented change management, version control assistance and final asset packaging."
    ctaText="Request Production Support"
    ctaLink="/contact"
    introLabel="Operational Support"
    introTitle="Production Support That"
    introGradient="Keeps Programmes Moving"
    introDescription="Learning content programmes require dependable operational follow-through - structured support that coordinates teams, tracks changes and delivers assets on schedule."
    introParagraphs={[
      "eQOURSE supports structured communication, documented change management, version control assistance and final asset packaging for learning-content programmes that require dependable operational follow-through.",
      "Production support is presented as operational coordination, not a replacement for the client's final approval process. All sign-offs, authorisations and release decisions remain with the client.",
    ]}
    stats={[
      { value: "Vendor", label: "Coordination" },
      { value: "Large-volume", label: "Workflow Support" },
      { value: "Documented", label: "Change Management" },
      { value: "Asset", label: "Packaging" },
    ]}
    servicesLabel="Support Capabilities"
    servicesTitle="Production"
    servicesGradient="Support Services"
    services={[
      {
        icon: Truck,
        title: "Print Vendor Coordination",
        description:
          "Liaison between editorial, design and print vendor teams - managing file transfers, specification queries, proofing rounds and delivery logistics for print publication projects.",
      },
      {
        icon: Layers,
        title: "Large-Volume Print Workflow Support",
        description:
          "Structured support for large-volume print programmes - including batch processing, quality sampling coordination, schedule tracking and multi-title production management.",
      },
      {
        icon: FileText,
        title: "Print Specification Sheet Preparation",
        description:
          "Preparation of detailed print specification sheets covering paper stock, binding style, colour specification, bleed dimensions, page extent and finishing requirements.",
      },
      {
        icon: GitBranch,
        title: "Change Management & Version Control",
        description:
          "Documented change management for content corrections, design revisions and production updates - with version tracking, audit trails and consolidated correction logs.",
      },
      {
        icon: PackageCheck,
        title: "Final Asset Packaging",
        description:
          "Structured packaging of final content deliverables - including print PDFs, digital assets, metadata files, rights documentation and delivery checklists - for handover to client or printer.",
      },
      {
        icon: MessageSquare,
        title: "Cross-Team Communication Coordination",
        description:
          "Structured communication coordination between editorial, design, prepress, vendor and client teams - using documented workflows, status trackers and escalation protocols.",
      },
    ]}
    faqs={[
      {
        question: "What does production support include?",
        answer:
          "Production support includes print vendor coordination, large-volume workflow management, print specification preparation, change management, version control, asset packaging and cross-team communication coordination for learning content programmes.",
      },
      {
        question: "Can eQOURSE manage large-volume print programmes?",
        answer:
          "Yes. eQOURSE supports large-volume print programmes with structured batch processing, quality sampling coordination, schedule tracking and multi-title production management adapted to client workflows.",
      },
      {
        question: "Does production support include content sign-off?",
        answer:
          "No. Production support is operational coordination - all content sign-offs, authorisations and release decisions remain with the client. eQOURSE coordinates the workflow and tracks progress but does not act as the authorising party.",
      },
    ]}
    ctaHeadline="Keep Your Production Programme on Track"
    ctaSubtext="eQOURSE scopes production support based on programme volume, vendor requirements and delivery schedule."
    ctaButtonText="Request Production Support"
    relatedPages={[
      { title: "Publishing Production", href: `${PARENT_HREF}/publishing-production` },
      { title: "Prepress Services", href: `${PARENT_HREF}/prepress-services` },
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Metadata Services", href: `${PARENT_HREF}/metadata-services` },
    ]}
  />
);

export default ProductionSupportPage;
