import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { ScanLine, Code2, Globe, BookOpen, RefreshCw, FileCode, Sigma, Layers } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const DigitalConversionPage = () => (
  <SubServicePageTemplate
    seoTitle="Digital Conversion Services for EdTech & Publishing | eQOURSE"
    seoDescription="Digital conversion services for publishers and EdTech platforms: Digitisation, OCR, XML, HTML, EPUB, PDF to EPUB, LaTeX, MathML and XML-first workflows."
    seoCanonical="https://www.eqourse.com/digital-conversion"
    seoKeywords="digital conversion services, eBook conversion, LMS content conversion, XML conversion, EPUB conversion, PDF to EPUB, OCR services, LaTeX conversion"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Digital Conversion"
    preHeadline="✦ Digital Conversion - From Source to Platform-Ready Format"
    headline="Digital Conversion"
    headlineAccent="for Modern Publishing"
    subtext="eQOURSE prepares learning content for web, LMS, eBook and platform-based delivery through structured conversion from source files into clean digital formats - including HTML-ready content, EPUB 3-aligned eBook preparation, accessible-friendly structure and asset organisation."
    ctaText="Request Conversion Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Digital Conversion for Modern Publishing.png"
    bannerImageAlt="Digital conversion services for modern publishing including XML, EPUB3, and HTML5 formats by eQOURSE."
    introLabel="Format Transformation"
    introTitle="Convert Content for"
    introGradient="Every Platform"
    introDescription="Education content must reach learners across LMS platforms, eBooks, web browsers and mobile apps - digital conversion makes that possible without losing structure or accessibility."
    introParagraphs={[
      "Digital conversion services prepare learning content for web, LMS, eBook and platform-based delivery. eQOURSE supports structured conversion from source files into clean digital formats, including HTML-ready content, EPUB 3-aligned eBook preparation when specified, accessible-friendly structure and asset organisation.",
      "Each conversion project is scoped to the target platform's specifications, accessibility requirements and downstream technical handover process.",
    ]}
    stats={[
      { value: "9+", label: "Conversion Formats" },
      { value: "EPUB3", label: "Aligned Output" },
      { value: "LMS", label: "Ready Assets" },
      { value: "Accessible", label: "Structured Output" },
    ]}
    servicesLabel="Conversion Capabilities"
    servicesTitle="Digital Conversion"
    servicesGradient="Workflows"
    services={[
      {
        icon: ScanLine,
        title: "Digitisation & OCR",
        description:
          "High-accuracy digitisation of print materials and scanned documents using OCR processing - preparing clean, editable text files for downstream editorial and conversion workflows.",
      },
      {
        icon: Code2,
        title: "XML Conversion",
        description:
          "Structured XML conversion from Word, PDF and InDesign source files - using client-specific DTDs or schemas to create reusable, platform-independent content structures.",
      },
      {
        icon: Globe,
        title: "HTML Conversion",
        description:
          "Clean, semantic HTML conversion for web, LMS and platform delivery - including heading hierarchy, accessible tables, figure markup, MathML and metadata integration.",
      },
      {
        icon: BookOpen,
        title: "EPUB Conversion",
        description:
          "EPUB 3-aligned eBook preparation including reflowable layout, accessible structure, navigation documents, metadata and validation-ready packaging for distribution platforms.",
      },
      {
        icon: RefreshCw,
        title: "PDF to EPUB",
        description:
          "Accurate conversion of print-optimised PDFs into EPUB format - with text re-flow, image handling, heading extraction and structural cleanup for digital reading environments.",
      },
      {
        icon: FileCode,
        title: "LaTeX Conversion",
        description:
          "Conversion of LaTeX source files to XML, HTML or EPUB - preserving mathematical notation, formula rendering, table structures and scientific content integrity.",
      },
      {
        icon: Layers,
        title: "XML-First Publishing",
        description:
          "Single-source XML workflows that enable simultaneous output to print PDF, EPUB, HTML and LMS formats from one structured content repository.",
      },
      {
        icon: Sigma,
        title: "MathML Conversion",
        description:
          "Conversion of mathematical equations and scientific notation into MathML for accessible web and EPUB delivery - ensuring compatibility with screen readers and assistive technology.",
      },
    ]}
    faqs={[
      {
        question: "Can eQOURSE convert our PDF textbooks to EPUB?",
        answer:
          "Yes. eQOURSE supports PDF to EPUB conversion including text re-flow, image handling, heading extraction and structural cleanup. The scope should define target specifications, accessibility requirements and final platform requirements before conversion begins.",
      },
      {
        question: "What is XML-first publishing?",
        answer:
          "XML-first publishing uses a single structured XML source to produce multiple output formats - print PDF, EPUB, HTML and LMS - simultaneously, reducing rework and maintaining content consistency across all channels.",
      },
      {
        question: "Is MathML conversion accessible?",
        answer:
          "MathML is the web standard for accessible mathematical notation. eQOURSE converts equations to MathML to ensure compatibility with screen readers, magnifiers and assistive technology used by learners with disabilities.",
      },
    ]}
    ctaHeadline="Prepare Your Content for Every Digital Platform"
    ctaSubtext="eQOURSE scopes digital conversion projects based on source format, target platform and accessibility requirements."
    ctaButtonText="Request Conversion Support"
    relatedPages={[
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Publishing Production", href: `${PARENT_HREF}/publishing-production` },
      { title: "Metadata Services", href: `${PARENT_HREF}/metadata-services` },
      { title: "Accessibility Services", href: "/accessibility" },
      { title: "Technology Solutions", href: "/content-services/technology-solutions" },
    ]}
  />
);

export default DigitalConversionPage;
