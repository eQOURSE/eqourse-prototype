import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookOpen, Layout, PenTool, FileImage, BarChart3, Layers } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const DesignServicesPage = () => (
  <SubServicePageTemplate
    seoTitle="Design Services for Educational Publishing | eQOURSE"
    seoDescription="Design services for publishers, EdTech platforms and institutions, including covers, layouts, workbooks, journals, brochures and learning illustrations."
    seoCanonical="https://www.eqourse.com/design-services"
    seoKeywords="educational design services, learning content design, publication design, cover design, page layout design, workbook design, journal design, infographic design"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Design Services"
    preHeadline="✦ Design Services - Visual Precision for Learning Publications"
    headline="Design Services for"
    headlineAccent="Educational Publishing"
    subtext="Design services support the visual presentation of learning content across worksheets, workbooks, instructor resources, digital learning assets, decks, infographics and publication layouts - aligned with brand guidelines, readability requirements and output format."
    ctaText="Request Design Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Design Services for Educational Publishing.png"
    bannerImageAlt="Design services for educational publishing including layout design, graphics, and visual structuring by eQOURSE."
    introLabel="Visual Presentation"
    introTitle="Design That Supports"
    introGradient="Learning Outcomes"
    introDescription="Publication design for educational content must balance visual clarity, brand consistency and pedagogical readability - ensuring learners engage with materials effectively."
    introParagraphs={[
      "eQOURSE aligns design execution with brand guidelines, readability requirements, learner age group, content hierarchy and output format - keeping editorial intent intact throughout the design process.",
      "From cover artwork and page layout to infographics and instructional decks, design services are scoped to the publication type, audience and delivery channel specified in the project brief.",
    ]}
    stats={[
      { value: "Brand", label: "Aligned Output" },
      { value: "Print", label: "& Digital Ready" },
      { value: "Age-group", label: "Appropriate" },
      { value: "Editorially", label: "Consistent" },
    ]}
    servicesLabel="Design Capabilities"
    servicesTitle="Publication Design"
    servicesGradient="Services"
    services={[
      {
        icon: BookOpen,
        title: "Cover Design",
        description:
          "Front and back cover design for textbooks, workbooks, assessment packs and course materials - aligned to client brand guidelines, series identity and genre conventions.",
      },
      {
        icon: Layout,
        title: "Page Layout Design",
        description:
          "Interior page layout design for print and digital publications - including grid systems, heading styles, callout boxes, margin notes and visual content placement.",
      },
      {
        icon: PenTool,
        title: "Workbook & Worksheet Design",
        description:
          "Functional, learner-friendly workbook and worksheet design for schools, training providers and EdTech platforms - with activity zones, answer spaces and visual hierarchy.",
      },
      {
        icon: Layers,
        title: "Journal & Report Layout",
        description:
          "Academic journal layout, research report design and institutional publication formatting - compliant with author submission guidelines and typesetting conventions.",
      },
      {
        icon: FileImage,
        title: "Brochure & Marketing Collateral",
        description:
          "Design of course brochures, programme guides, institutional prospectuses and learning product marketing materials - for print and digital distribution.",
      },
      {
        icon: BarChart3,
        title: "Infographic & Illustration Design",
        description:
          "Custom infographics, process diagrams, instructional illustrations and data visualisations for learning content - simplifying complex information for diverse learner audiences.",
      },
    ]}
    faqs={[
      {
        question: "Can eQOURSE design content for specific age groups?",
        answer:
          "Yes. eQOURSE tailors design choices - typography, colour, visual density, illustration style and layout complexity - to the intended learner age group and educational level specified in the project brief.",
      },
      {
        question: "Do you work with existing brand guidelines?",
        answer:
          "Yes. eQOURSE applies client brand guidelines, series design standards, approved colour palettes, typography specifications and template frameworks throughout the design process.",
      },
      {
        question: "Can design services produce both print and digital outputs?",
        answer:
          "Yes. eQOURSE prepares design deliverables for print production (TIFF, PDF with bleeds) and digital distribution (screen-optimised PDF, EPUB-ready assets, web-ready images) depending on the publication's output requirements.",
      },
    ]}
    ctaHeadline="Design Learning Content That Engages and Informs"
    ctaSubtext="eQOURSE scopes design services based on publication type, audience, brand requirements and output format."
    ctaButtonText="Request Design Support"
    relatedPages={[
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Publishing Production", href: `${PARENT_HREF}/publishing-production` },
      { title: "Prepress Services", href: `${PARENT_HREF}/prepress-services` },
      { title: "Image Processing", href: `${PARENT_HREF}/image-processing` },
      { title: "Custom E-Learning Content", href: "/custom-e-learning-content" },
    ]}
  />
);

export default DesignServicesPage;
