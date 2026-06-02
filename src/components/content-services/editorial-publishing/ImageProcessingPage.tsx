import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Sparkles, Scissors, ZoomIn, FileImage, FolderOpen, Tag } from "lucide-react";

const PARENT_LABEL = "Editorial, Publishing & Designing Services";
const PARENT_HREF = "/editorial-publishing-designing-services";

const ImageProcessingPage = () => (
  <SubServicePageTemplate
    seoTitle="Image Processing Services for Publishing | eQOURSE"
    seoDescription="Image processing support for publishers and education teams, covering restoration, cleanup, enhancement and web-ready visual optimisation."
    seoCanonical="https://www.eqourse.com/image-processing"
    seoKeywords="image processing services, educational image editing, digital asset preparation, image restoration, image cleanup, image optimisation, alt text services"
    parentLabel={PARENT_LABEL}
    parentHref={PARENT_HREF}
    currentLabel="Image Processing"
    preHeadline="✦ Image Processing - Visual Assets Ready for Production"
    headline="Image Processing"
    headlineAccent="for Learning Content"
    subtext="Image processing support prepares educational visuals, diagrams, screenshots, scanned pages and production assets for consistent use across print and digital formats - covering cleanup, cropping, resizing, naming, format preparation, resolution checks and asset organisation."
    ctaText="Request Image Support"
    ctaLink="/contact"
    bannerImage="/assets/banners/editorial-publishing/Image Processing for Learning Content.png"
    bannerImageAlt="Image processing services for learning content including color correction, masking, and optimization by eQOURSE."
    introLabel="Visual Quality"
    introTitle="Production-Ready Images for"
    introGradient="Every Format"
    introDescription="Educational visuals must meet different technical requirements for print, digital, LMS and web delivery - image processing ensures every asset is ready for its intended output."
    introParagraphs={[
      "eQOURSE supports image clean-up, cropping, resizing, naming, format preparation, resolution checks, alt-text coordination and asset-folder organisation within publishing workflows.",
      "Client-owned or licensed materials should be supplied with the required usage permissions before production begins. eQOURSE does not use, reproduce or distribute third-party copyrighted images without client authorisation.",
    ]}
    stats={[
      { value: "Print", label: "& Digital Ready" },
      { value: "Alt-Text", label: "Coordination" },
      { value: "Asset", label: "Organisation" },
      { value: "Multi-format", label: "Output" },
    ]}
    servicesLabel="Processing Capabilities"
    servicesTitle="Image Processing"
    servicesGradient="Support"
    services={[
      {
        icon: Sparkles,
        title: "Image Restoration & Enhancement",
        description:
          "Restoration of degraded, scanned or low-resolution images for print and digital publishing - including dust removal, contrast correction, tone balancing and resolution upscaling.",
      },
      {
        icon: Scissors,
        title: "Image Cleanup & Optimisation",
        description:
          "Removal of artefacts, background noise, watermarks and production marks - combined with file compression and format conversion for web-ready delivery.",
      },
      {
        icon: ZoomIn,
        title: "Cropping & Resizing",
        description:
          "Precise cropping and resizing of educational visuals to meet print bleed requirements, LMS thumbnail specifications and responsive web-image standards.",
      },
      {
        icon: FileImage,
        title: "Format Preparation & Conversion",
        description:
          "Conversion of images to TIFF, EPS, PNG, JPEG, WebP and SVG as required for print, digital and platform-specific delivery - with colour profile and DPI management.",
      },
      {
        icon: Tag,
        title: "Alt Text Coordination",
        description:
          "Coordination of descriptive alt text for educational images, diagrams, charts and illustrations - ensuring accessibility compliance for digital and EPUB learning content.",
      },
      {
        icon: FolderOpen,
        title: "Asset Folder Organisation",
        description:
          "Structured naming conventions, folder hierarchy and metadata tagging for image libraries - enabling efficient retrieval, version tracking and cross-team asset management.",
      },
    ]}
    faqs={[
      {
        question: "What types of images does eQOURSE process?",
        answer:
          "eQOURSE processes educational visuals, diagrams, screenshots, scanned pages, charts, illustrations and production assets for use in textbooks, workbooks, digital learning materials and LMS courses.",
      },
      {
        question: "Can eQOURSE handle high-resolution print images?",
        answer:
          "Yes. eQOURSE supports high-resolution TIFF and EPS files for print production - including colour profile management, DPI validation and bleed-ready formatting.",
      },
      {
        question: "Does alt text coordination improve accessibility?",
        answer:
          "Yes. Alt text ensures educational images are accessible to screen reader users and meets WCAG and EPUB accessibility requirements for digital learning content.",
      },
    ]}
    ctaHeadline="Get Your Images Production-Ready"
    ctaSubtext="eQOURSE scopes image processing based on volume, format requirements and output specifications for publishers and EdTech teams."
    ctaButtonText="Request Image Processing Support"
    relatedPages={[
      { title: "Editorial Services", href: `${PARENT_HREF}/editorial-services` },
      { title: "Design Services", href: `${PARENT_HREF}/design-services` },
      { title: "Prepress Services", href: `${PARENT_HREF}/prepress-services` },
      { title: "Accessibility Services", href: "/accessibility" },
    ]}
  />
);

export default ImageProcessingPage;
