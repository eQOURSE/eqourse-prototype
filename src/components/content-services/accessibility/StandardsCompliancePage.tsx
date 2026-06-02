import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { ShieldCheck, Globe, BookOpen, Scale } from "lucide-react";

const relatedPages = [
  { title: "Document Remediation", href: "/document-content-remediation" },
  { title: "Accessible Media", href: "/accessible-media-enhancements" },
  { title: "Audit & Compliance Support", href: "/audit-compliance-support" },
  { title: "Assessment Accessibility", href: "/assessment-accessibility" },
  { title: "Assistive Tech Compatibility", href: "/assistive-technology-compatibility" },
];

const StandardsCompliancePage = () => (
  <SubServicePageTemplate
    seoTitle="Accessibility Standards Compliance | eQOURSE"
    seoDescription="eQOURSE provides technical guidance and structural alignment services to help your digital learning content meet WCAG, Section 508, EN 301 549, and EPUB 3 standards."
    seoCanonical="https://www.eqourse.com/standards-compliance"
    seoKeywords="accessibility standards compliance, WCAG compliance services, Section 508 alignment, EN 301 549 support, EPUB 3 accessibility, digital learning compliance"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Standards Compliance"
    bannerImage="/assets/banners/content-services/accessibility/standards-compliance.png"
    bannerImageAlt="Accessibility standards compliance services banner illustrating WCAG 2.1 and 2.2, Section 508, EN 301 549 and EPUB 3 alignment for digital learning content by eQOURSE"
    preHeadline="Accessibility Standards Compliance"
    headline="Standards Compliance for"
    headlineAccent="Digital Learning Content"
    subtext="Providing the technical expertise and structural alignment needed to help your educational materials meet global accessibility benchmarks, ensuring equitable access for all learners."
    ctaText="Discuss Compliance Needs"
    introLabel="Our Approach"
    introTitle="Meeting Global Accessibility"
    introGradient="Standards"
    introDescription="We provide expert technical evaluation and remediation to help align your digital content with globally recognized accessibility guidelines and regulatory standards."
    introParagraphs={[
      "Our approach goes beyond automated scans. We combine deep knowledge of standards like WCAG 2.1 & 2.2, Section 508, EN 301 549, and EPUB 3 Accessibility Guidelines with rigorous manual testing to ensure your content is not only technically conformant but genuinely usable.",
      "Whether you are a publisher, an Content Services platform, or a government agency, our standards alignment services provide the confidence that your digital learning assets meet the required benchmarks for inclusive education."
    ]}
    stats={[
      { value: "WCAG", label: "2.1 & 2.2 Aligned" },
      { value: "508", label: "Section Compliance" },
      { value: "EN", label: "301 549 Support" },
      { value: "EPUB", label: "3 Accessibility" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Standards Compliance"
    servicesGradient="Services"
    services={[
      { icon: Globe, title: "WCAG 2.1 & 2.2 Alignment", description: "We provide technical evaluation and remediation to help align your digital content with the Web Content Accessibility Guidelines (WCAG) Levels A and AA. Our services cover structural integrity, color contrast, keyboard navigation, and the provision of non-text alternatives." },
      { icon: ShieldCheck, title: "Section 508 Compliance Support", description: "For organizations supplying educational materials to US federal agencies, we offer technical services designed to support alignment with Section 508 of the Rehabilitation Act. We review and remediate documents, software, and web applications against the specific technical criteria." },
      { icon: Scale, title: "EN 301 549 Alignment", description: "We assist organizations targeting the European market by evaluating and optimizing digital content to align with the EN 301 549 standard. This includes addressing specific European requirements for digital products and services." },
      { icon: BookOpen, title: "EPUB 3 Accessibility Implementation", description: "We specialize in applying the EPUB Accessibility Guidelines to digital textbooks and eBooks. Our services include semantic structuring, navigation enhancements, and metadata integration to ensure EPUB files are fully functional for users with print disabilities." },
    ]}
    faqs={[
      { question: "Which version of WCAG should we aim for?", answer: "We generally recommend aligning with WCAG 2.2 Level AA, as it is the most current and comprehensive standard. However, if your specific contracts or internal policies require WCAG 2.1, we can tailor our evaluation and remediation to that specific version." },
      { question: "Does achieving WCAG compliance mean we are Section 508 compliant?", answer: "While there is significant overlap-as Section 508 largely incorporates WCAG 2.0 Level AA by reference-Section 508 also includes additional criteria specific to software, hardware, and support documentation. Our services address both the overlapping WCAG criteria and the specific additional requirements of Section 508." },
      { question: "Are your standards compliance services a guarantee against legal action?", answer: "No. eQOURSE provides technical consulting, auditing, and remediation services designed to improve the technical accessibility of your content based on recognized standards. We do not provide legal counsel, and our services cannot guarantee immunity from accessibility-related lawsuits or formal complaints." },
    ]}
    ctaHeadline="Ready to Align Your Content with Accessibility Standards?"
    ctaSubtext="Contact our accessibility specialists to plan a comprehensive standards review of your digital learning assets."
    ctaButtonText="Discuss Compliance Needs"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default StandardsCompliancePage;
