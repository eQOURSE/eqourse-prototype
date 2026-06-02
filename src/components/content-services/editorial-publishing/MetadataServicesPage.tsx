import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Tag, Layers, Hash, BookOpen, Library, Link2, ShieldCheck } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const MetadataServicesPage = () => (
  <SubServicePageTemplate
    seoTitle="Metadata Services for Publishers | eQOURSE"
    seoDescription="eQOURSE delivers metadata tagging, content structuring, DOI preparation, ONIX, MARC records, Crossref and accessibility metadata for education publishing."
    seoCanonical="https://www.eqourse.com/metadata-services"
    seoKeywords="metadata services, publishing metadata, content taxonomy services, DOI metadata, ONIX metadata, MARC records, Crossref metadata, accessibility metadata"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Metadata Services"
    preHeadline="✦ Metadata Services - Structure, Discoverability & Compliance"
    headline="Metadata Services for"
    headlineAccent="Education Publishing"
    subtext="Metadata services improve the structure, discoverability and management of learning-content assets across catalogues, publishing systems and digital platforms - preparing descriptive metadata, file naming conventions, asset tags, taxonomy inputs and structured records."
    ctaText="Request Metadata Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Metadata Services for Education Publishing.png"
    bannerImageAlt="Metadata services for education publishing including taxonomy, ONIX, and MARC records by eQOURSE."
    introLabel="Content Discovery"
    introTitle="Metadata That Makes"
    introGradient="Content Findable"
    introDescription="Well-structured metadata helps publishers, platforms and institutions catalogue, search and manage learning content assets efficiently at scale."
    introParagraphs={[
      "eQOURSE prepares descriptive metadata, file naming conventions, asset tags, content taxonomy inputs, keyword fields and structured records based on client templates, platform rules and distribution needs.",
      "Metadata services are scoped to the client's cataloguing system, platform requirements and distribution channels - from academic library systems to commercial eBook stores and LMS platforms.",
    ]}
    stats={[
      { value: "7+", label: "Metadata Standards" },
      { value: "ONIX", label: "& MARC Ready" },
      { value: "DOI", label: "Preparation" },
      { value: "Accessible", label: "Metadata" },
    ]}
    servicesLabel="Metadata Capabilities"
    servicesTitle="Metadata Services"
    servicesGradient="& Standards"
    services={[
      {
        icon: Tag,
        title: "Metadata Tagging",
        description:
          "Descriptive tagging of content assets with subject, level, format, audience, keyword and classification fields - aligned to client cataloguing templates and platform schemas.",
      },
      {
        icon: Layers,
        title: "Content Structuring",
        description:
          "Hierarchical content structure organisation for chapters, topics, modules and assets - supporting efficient retrieval, sequencing and LMS course assembly.",
      },
      {
        icon: Hash,
        title: "DOI Metadata Preparation",
        description:
          "Preparation of Digital Object Identifier metadata for academic and publishing content - including title, contributor, publisher, date and rights information in required formats.",
      },
      {
        icon: BookOpen,
        title: "ONIX Metadata Support",
        description:
          "ONIX for Books metadata preparation for trade and educational publishers - supporting book supply chain data requirements for distributors and retail platforms.",
      },
      {
        icon: Library,
        title: "MARC Records Preparation",
        description:
          "Machine-Readable Cataloguing (MARC 21) record preparation for academic and public library systems - enabling proper cataloguing of educational publications and digital resources.",
      },
      {
        icon: Link2,
        title: "Crossref Metadata Support",
        description:
          "Preparation of Crossref-compatible metadata for journal articles, book chapters and conference papers - supporting DOI registration and citation linking.",
      },
      {
        icon: ShieldCheck,
        title: "Accessibility Metadata",
        description:
          "Schema.org accessibility metadata preparation for EPUB and digital publications - including access modes, accessibility features, hazards and accessibility summaries.",
      },
    ]}
    faqs={[
      {
        question: "What is ONIX metadata and why does it matter?",
        answer:
          "ONIX (Online Information Exchange) is the publishing industry standard for sharing product information between publishers, distributors and retailers. Accurate ONIX metadata ensures books and educational content are correctly listed on distribution platforms.",
      },
      {
        question: "Can eQOURSE prepare MARC records for library cataloguing?",
        answer:
          "Yes. eQOURSE prepares MARC 21 records for educational publications, supporting cataloguing in academic and public library systems using client-supplied or standard field templates.",
      },
      {
        question: "Does accessibility metadata improve discoverability?",
        answer:
          "Yes. Schema.org accessibility metadata helps readers, assistive technology users and platform providers identify which content is accessible and how - improving discoverability for users with disabilities and supporting compliance with accessibility distribution requirements.",
      },
    ]}
    ctaHeadline="Make Your Content Structured and Discoverable"
    ctaSubtext="eQOURSE scopes metadata services based on platform requirements, distribution channels and cataloguing standards."
    ctaButtonText="Request Metadata Support"
    relatedPages={[
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Digital Conversion", href: `${PARENT_HREF}/digital-conversion` },
      { title: "Production Support", href: `${PARENT_HREF}/production-support` },
      { title: "Accessibility Services", href: "/accessibility" },
    ]}
  />
);

export default MetadataServicesPage;
