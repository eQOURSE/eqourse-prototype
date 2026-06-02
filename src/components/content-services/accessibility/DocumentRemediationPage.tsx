import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { FileText, FileCheck, BookOpen, MonitorPlay, Presentation } from "lucide-react";

const relatedPages = [
  { title: "Standards Compliance", href: "/standards-compliance" },
  { title: "Accessible Media", href: "/accessible-media-enhancements" },
  { title: "Assessment Accessibility", href: "/assessment-accessibility" },
  { title: "Assistive Tech Compatibility", href: "/assistive-technology-compatibility" },
  { title: "Audit & Compliance Support", href: "/audit-compliance-support" },
];

const DocumentRemediationPage = () => (
  <SubServicePageTemplate
    seoTitle="Document & eContent Accessibility Remediation | eQOURSE"
    seoDescription="Expert document remediation services for PDFs, EPUBs, LMS courses, and HTML content, ensuring full compatibility with screen readers and assistive technologies."
    seoCanonical="https://www.eqourse.com/document-content-remediation"
    seoKeywords="document accessibility remediation, PDF remediation services, accessible EPUB creation, LMS course accessibility, accessible HTML content, Section 508 document compliance"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Document & eContent Remediation"
    bannerImage="/assets/banners/content-services/accessibility/document-content-remediation.png"
    bannerImageAlt="Document and eContent accessibility remediation services banner showing PDF tagging, EPUB 3 enhancement, LMS course remediation and HTML accessibility work by eQOURSE"
    preHeadline="Document & eContent Accessibility Remediation"
    headline="Document & eContent"
    headlineAccent="Accessibility Remediation"
    subtext="Transforming your static documents and digital courses into fully accessible, structurally rich formats optimized for screen readers and inclusive learning."
    ctaText="Remediate Your Content"
    introLabel="Our Process"
    introTitle="Transforming Documents for"
    introGradient="Universal Access"
    introDescription="We structurally tag, reformat, and optimize your existing digital learning materials-from PDFs and EPUBs to full LMS courses-so they meet accessibility standards and work seamlessly with assistive technologies."
    introParagraphs={[
      "Many educational documents are visually formatted but structurally flat-missing tagged headings, alt text, and reading order metadata that assistive technology users depend on. Our remediation process adds these critical layers of accessibility.",
      "Whether it's a legacy PDF textbook, an EPUB eBook, or an entire course hosted in your LMS, our team ensures every element is perceivable, operable, and understandable by all learners, including those using screen readers, keyboard navigation, and magnification tools."
    ]}
    stats={[
      { value: "PDF/UA", label: "Standard Aligned" },
      { value: "EPUB 3", label: "Accessible eBooks" },
      { value: "LMS", label: "Course Remediation" },
      { value: "100%", label: "Screen Reader Tested" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Document Remediation"
    servicesGradient="Services"
    services={[
      { icon: FileText, title: "PDF Accessibility Remediation", description: "We structurally tag PDF documents (including textbooks, worksheets, and reports) to align with PDF/UA and WCAG standards. Our process ensures logical reading order, correct heading hierarchies, properly formatted data tables, and appropriate alternative text." },
      { icon: BookOpen, title: "EPUB (eBook) Accessibility", description: "We enhance EPUB files by building robust navigational structures, defining semantic roles for structural elements, adding required accessibility metadata, and ensuring all interactive elements and media are fully accessible to screen reader users." },
      { icon: MonitorPlay, title: "LMS Course Remediation", description: "We audit and remediate content residing directly within Learning Management Systems (such as Canvas, Moodle, or Blackboard). This includes reviewing WYSIWYG editor content, repairing broken heading structures, ensuring adequate color contrast, and fixing inaccessible tables and lists." },
      { icon: FileCheck, title: "HTML & Web Content Remediation", description: "For web-based learning modules, we review and remediate HTML and CSS to ensure semantic integrity. We utilize ARIA attributes where native HTML falls short, ensuring complex interactions and dynamic content are accessible." },
      { icon: Presentation, title: "Source Document Formatting (Word & PPT)", description: "We apply accessible formatting practices directly to source files in Microsoft Word and PowerPoint. This proactive approach includes utilizing built-in styles, ensuring sufficient contrast, and verifying slide reading order." },
    ]}
    faqs={[
      { question: "What is PDF tagging and why is it necessary?", answer: "PDF tagging adds an invisible layer of structural information to a document. Tags define what an element is (e.g., a heading, a paragraph, a table header) and establish the logical reading order. Without correct tags, assistive technologies cannot interpret the document logically." },
      { question: "Can you remediate legacy scanned documents?", answer: "Yes. However, documents that are simply scanned images of text must first undergo Optical Character Recognition (OCR) to convert the images into machine-readable text. Once OCR is complete and verified for accuracy, we proceed with structural tagging and full remediation." },
      { question: "Do you remediate content inside authoring tools like Articulate Storyline?", answer: "Yes, our team can work within common eLearning authoring tools. We utilize the accessibility features specific to those platforms-such as managing focus order, adding alt text to objects, and ensuring keyboard accessibility-before publishing the final SCORM or xAPI package." },
    ]}
    ctaHeadline="Ready to Make Your Documents Accessible?"
    ctaSubtext="Contact our remediation specialists to get a scoping estimate for your document and eContent accessibility needs."
    ctaButtonText="Remediate Your Content"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default DocumentRemediationPage;
