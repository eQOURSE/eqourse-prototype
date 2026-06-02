import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { CheckSquare, Palette, Printer, FileCheck, Type, AlignLeft } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const PrepressServicesPage = () => (
  <SubServicePageTemplate
    seoTitle="Prepress Services for Publishing Production | eQOURSE"
    seoDescription="Prepress services for publishers and education teams: print-ready files, preflight checks, colour correction, bleed setup and proof preparation."
    seoCanonical="https://www.eqourse.com/prepress-services"
    seoKeywords="prepress services, print production support, publication prepress checks, preflight checks, colour correction, bleed margin, print-ready files"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Prepress Services"
    preHeadline="✦ Prepress Services - Print-Ready File Preparation"
    headline="Prepress Services for"
    headlineAccent="Publication Production"
    subtext="Prepress services prepare publication files for print and production review - through layout checks, pagination validation, image readiness, font consistency, bleed and margin review, proofing support and final file preparation for printer or production handover."
    ctaText="Request Prepress Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Prepress Services for Publication Production.png"
    bannerImageAlt="Prepress services for publication production including color management, preflight checks, and print-ready files by eQOURSE."
    introLabel="Print Readiness"
    introTitle="Files Prepared for"
    introGradient="Production Sign-Off"
    introDescription="Prepress errors discovered after print production begins are costly and time-consuming - structured prepress checks prevent problems before files reach the printer."
    introParagraphs={[
      "eQOURSE supports print-focused delivery workflows while coordinating corrections with editorial and design teams before production handover. Prepress support is structured around client specifications, printer requirements and format standards.",
      "Each prepress project is scoped to the publication type, print specification sheet and handover checklist - ensuring files are production-ready before final sign-off.",
    ]}
    stats={[
      { value: "Preflight", label: "Validated Files" },
      { value: "CMYK", label: "Colour Managed" },
      { value: "Bleed", label: "& Margin Ready" },
      { value: "Printer", label: "Handover Ready" },
    ]}
    servicesLabel="Prepress Capabilities"
    servicesTitle="Prepress"
    servicesGradient="Support Services"
    services={[
      {
        icon: CheckSquare,
        title: "Preflight Checks",
        description:
          "Automated and manual preflight validation of print-ready PDFs - checking resolution, fonts, colour profiles, bleed, trim marks, overprints and transparency flattening.",
      },
      {
        icon: Palette,
        title: "Colour Correction & Management",
        description:
          "CMYK colour conversion, ICC profile embedding, spot colour validation and colour consistency checks across pages, chapters and publication series.",
      },
      {
        icon: AlignLeft,
        title: "Bleed & Margin Review",
        description:
          "Verification of bleed extension, safe zone placement, trim alignment and margin consistency - preventing content loss at the bindery and trim stage.",
      },
      {
        icon: FileCheck,
        title: "Print-Ready File Preparation",
        description:
          "Final PDF/X-compliant file preparation with embedded fonts, flattened transparency, correct resolution and printer-specific settings for offset and digital print.",
      },
      {
        icon: Type,
        title: "Font Consistency Checks",
        description:
          "Validation that all fonts are embedded, no missing or substituted typefaces are present, and typographic consistency is maintained across all pages and components.",
      },
      {
        icon: Printer,
        title: "Proofing Support",
        description:
          "Coordination of soft proofs, contract colour proofs and physical blueline proofs - with annotated correction lists and sign-off tracking before final production.",
      },
    ]}
    faqs={[
      {
        question: "What is a preflight check?",
        answer:
          "A preflight check validates a print-ready PDF or design file against printer specifications - checking resolution, colour profiles, fonts, bleed, overprints and transparency before the file is sent to press. It prevents costly print errors.",
      },
      {
        question: "What colour format is used for print?",
        answer:
          "Print files use CMYK colour mode rather than RGB. eQOURSE manages colour conversion, ICC profile embedding and spot colour validation to ensure accurate colour reproduction in the final printed publication.",
      },
      {
        question: "Does eQOURSE provide printer-specific prepress support?",
        answer:
          "Yes. eQOURSE prepares files to meet individual printer specifications - including bleed requirements, PDF/X standards, resolution settings and binding requirements - based on the print specification sheet provided by the client or printer.",
      },
    ]}
    ctaHeadline="Ensure Your Publication Files Are Print-Ready"
    ctaSubtext="eQOURSE scopes prepress services based on publication type, printer specifications and production schedule."
    ctaButtonText="Request Prepress Support"
    relatedPages={[
      { title: "Publishing Production", href: `${PARENT_HREF}/publishing-production` },
      { title: "Design Services", href: `${PARENT_HREF}/design-services` },
      { title: "Image Processing", href: `${PARENT_HREF}/image-processing` },
      { title: "Production Support", href: `${PARENT_HREF}/production-support` },
    ]}
  />
);

export default PrepressServicesPage;
