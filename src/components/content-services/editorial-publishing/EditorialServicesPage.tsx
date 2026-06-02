import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Pencil, BookOpenCheck, Search, PenTool, FileSearch, BookMarked } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const EditorialServicesPage = () => (
  <SubServicePageTemplate
    seoTitle="Editorial Services for Learning and Publishing Content | eQOURSE"
    seoDescription="eQOURSE delivers copy editing, proofreading, substantive, developmental and technical editing for education, publishing and digital learning content."
    seoCanonical="https://www.eqourse.com/editorial-services"
    seoKeywords="editorial services, copyediting services, proofreading services, educational content editing, substantive editing, developmental editing, technical editing"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Editorial Services"
    preHeadline="✦ Editorial Services - Copy Editing, Proofreading & More"
    headline="Editorial Services for"
    headlineAccent="Global Learning Content"
    subtext="eQOURSE delivers editorial services for education publishers, EdTech teams and institutions working with curriculum content, assessments, learning resources and digital products - including copyediting, language refinement, consistency checks and style-guide application."
    ctaText="Request Editorial Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Editorial Services for Global Learning Content.png"
    bannerImageAlt="Editorial services for global learning content including copy editing, proofreading, and developmental editing by eQOURSE."
    introLabel="Content Quality"
    introTitle="Editorial Support That"
    introGradient="Preserves Intent"
    introDescription="Education content requires more than surface-level proofreading - it demands editorial workflows that preserve subject accuracy and keep content usable across formats."
    introParagraphs={[
      "eQOURSE structures editorial support around intake review, content editing, terminology alignment, editorial QA and style-guide application across print, digital and platform-ready assets.",
      "Whether working with curriculum materials, assessments, instructor guides or training resources, the editorial workflow adapts to client requirements, review cycles and output specifications.",
    ]}
    stats={[
      { value: "B2B", label: "Publisher Ready" },
      { value: "QA-Led", label: "Editorial Review" },
      { value: "Multi-format", label: "Print & Digital" },
      { value: "Style-guide", label: "Aligned Output" },
    ]}
    servicesLabel="Editorial Modules"
    servicesTitle="Specialist"
    servicesGradient="Editorial Capabilities"
    services={[
      {
        icon: Pencil,
        title: "Copy Editing",
        description:
          "Sentence-level editing for clarity, grammar, punctuation and consistency. Applied across curriculum content, assessments, workbooks and digital learning materials.",
      },
      {
        icon: Search,
        title: "Proofreading",
        description:
          "Final-stage review of layout proofs and print-ready files for typographic errors, spacing inconsistencies and formatting issues before production sign-off.",
      },
      {
        icon: BookOpenCheck,
        title: "Substantive Editing",
        description:
          "Structural review of content flow, argument clarity, chapter organisation and audience alignment for learning materials requiring deeper editorial revision.",
      },
      {
        icon: PenTool,
        title: "Developmental Editing",
        description:
          "High-level content shaping: scope definition, learning outcome mapping, pedagogical alignment and content architecture for new curriculum or learning product development.",
      },
      {
        icon: FileSearch,
        title: "Technical Editing",
        description:
          "Accuracy review for STEM, scientific, legal or technical content - checking terminology, notation, formula rendering and subject-specific conventions.",
      },
      {
        icon: BookMarked,
        title: "Style Guide Application",
        description:
          "Consistent application of client style guides, house rules, terminology lists, brand language and formatting standards across all content deliverables.",
      },
    ]}
    faqs={[
      {
        question: "What types of content does eQOURSE editorial service cover?",
        answer:
          "eQOURSE supports curriculum content, assessments, instructor resources, training materials, workbooks, digital learning assets and publication workflows for publishers, EdTech teams and institutions.",
      },
      {
        question: "Can eQOURSE apply our internal style guide?",
        answer:
          "Yes. eQOURSE can apply client style guides, terminology lists and brand language. The workflow includes sample reviews and approval checkpoints before full-scale production starts.",
      },
      {
        question: "Is technical editing available for STEM content?",
        answer:
          "Yes. Technical editing covers STEM subjects, scientific notation, formula rendering, mathematical terminology and subject-specific conventions to ensure accuracy across learning materials.",
      },
    ]}
    ctaHeadline="Refine Your Learning Content with Expert Editorial Support"
    ctaSubtext="eQOURSE scopes editorial workflows based on content type, format, review stage and delivery requirements."
    ctaButtonText="Request Editorial Support"
    relatedPages={[
      { title: "Publishing Production", href: `${PARENT_HREF}/publishing-production` },
      { title: "Digital Conversion", href: `${PARENT_HREF}/digital-conversion` },
      { title: "Metadata Services", href: `${PARENT_HREF}/metadata-services` },
      { title: "Accessibility Services", href: "/accessibility" },
      { title: "Custom E-Learning Content", href: "/custom-e-learning-content" },
    ]}
  />
);

export default EditorialServicesPage;
