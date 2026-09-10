import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import AccessibilitySubServicesGrid from "./AccessibilitySubServicesGrid";
import { Eye, ShieldCheck, Accessibility } from "lucide-react";

const faqs = [
  {
    question: "What specific accessibility standards do your services align with?",
    answer: "Our accessibility services align with WCAG 2.1 and 2.2 (Levels A and AA), Section 508, EN 301 549, and EPUB 3 Accessibility Guidelines. We provide technical remediation and structural enhancements to help your digital learning content meet these benchmarks."
  },
  {
    question: "Are your accessibility audits considered legal certifications?",
    answer: "No. eQOURSE provides technical accessibility evaluation, remediation, and reporting services. Our audits and VPAT support document the technical accessibility of your content against established standards. We do not provide legal advice, nor do our services constitute legal certification."
  },
  {
    question: "What types of educational content can you remediate?",
    answer: "We remediate PDFs, Microsoft Word and PowerPoint documents, EPUBs (eBooks), HTML-based web content, multimedia (adding captions and audio descriptions), and courses hosted within Learning Management Systems (LMS)."
  },
  {
    question: "How do you ensure compatibility with Assistive Technologies (AT)?",
    answer: "Our evaluation process includes both automated scanning and manual functional testing using industry-standard assistive technologies. We test with JAWS, NVDA, VoiceOver, verify keyboard-only navigation, and assess screen magnification compatibility."
  },
  {
    question: "Can you provide a VPAT (Voluntary Product Accessibility Template)?",
    answer: "Yes, we offer VPAT / ACR support services. We conduct the necessary technical audits to document how your product aligns with specific accessibility criteria, providing a detailed technical report in the standard VPAT format."
  },
  {
    question: "Do you offer accessibility services for STEM content?",
    answer: "Yes. We author precise, context-appropriate alt text for charts, graphs, and diagrams, and use MathML to ensure mathematical equations and scientific notations are fully accessible to screen reader users."
  },
  {
    question: "What is the difference between automated testing and manual accessibility review?",
    answer: "Automated testing quickly scans for programmatic errors (like missing alt attributes). Manual review involves human experts testing with assistive technologies to evaluate the actual user experience, context, and logical flow-elements that automated tools cannot assess."
  }
];

const AccessibilityPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Accessibility Solutions" }]}>
    <SEOHead
      title="Accessibility Solutions for Digital Learning | eQOURSE"
      description="eQOURSE offers comprehensive digital accessibility services for educational content, including document remediation, WCAG compliance support, and inclusive media enhancements."
      canonical="https://www.eqourse.com/accessibility"
      keywords="digital accessibility services, accessible educational content, WCAG compliance for elearning, document remediation, accessible media, VPAT support, Section 508 compliance"
    />

    <ServiceHero
      preHeadline="Accessibility Services"
      headline="Accessibility Solutions for"
      headlineAccent="Digital Learning Content"
      subtext="Ensuring your educational materials are inclusive, usable, and technically aligned with global accessibility standards for all learners."
      ctaText="Request Accessibility Review"
      ctaLink="/contact-us"
      imageSrc="/assets/banners/content-services/main/accessibility.webp"
      imageAlt="Digital accessibility services by eQOURSE - WCAG compliance, Section 508 alignment, document remediation, accessible media, assessment accessibility and assistive technology testing"
      rotatingBadges={[
        { icon: Accessibility, title: "Inclusive", subtitle: "Accessibility for all", color: "hsl(170 82% 55%)" },
        { icon: ShieldCheck, title: "Compliance", subtitle: "WCAG & PDF/UA", color: "hsl(190 85% 68%)" },
        { icon: Eye, title: "Remediation", subtitle: "Document & Media", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "ACC", title: "Accessibility", subtitle: "Global standards" }}
    />

    <ServiceNarrativeSection
      label="Strategic Approach"
      title="Building Inclusive"
      gradientText="Learning Experiences"
      description="We combine deep technical expertise in global standards with a profound understanding of instructional design to create genuinely inclusive learning environments."
      paragraphs={[
        "eQOURSE is dedicated to breaking down digital barriers in education. Our Accessibility Services ensure that digital learning content-from documents and courses to assessments and multimedia-is accessible and usable by all individuals, including those with visual, auditory, motor, or cognitive disabilities.",
        "Our approach goes beyond simple automated compliance checks; we focus on functional accessibility, employing manual testing, assistive technology verification, and thoughtful remediation to create genuinely inclusive learning environments."
      ]}
      bullets={[
        "WCAG 2.2 Technical Review and Structural Alignment",
        "PDF, EPUB & Document Remediation to PDF/UA Standards",
        "Accessible Media: Alt Text, Captioning, Audio Description, MathML"
      ]}
      stats={[
        { value: "WCAG", label: "Guidelines Aligned" },
        { value: "PDF/UA", label: "Remediation Std" },
        { value: "EPUB 3", label: "Accessible eBooks" },
        { value: "AT", label: "Functional Review" },
      ]}
      panelTitle="Accessibility Delivery Framework"
      panelSubtitle="Our four-stage approach to comprehensive digital accessibility."
      bars={[
        { label: "Standards Review & Analysis", value: 20 },
        { label: "Remediation & Enhancement", value: 35 },
        { label: "AT Testing & Validation", value: 20 },
        { label: "QA & Compliance Documentation", value: 25 },
      ]}
      dark
    />

    <AccessibilitySubServicesGrid />
    <RelatedBlogs />
    <FAQSection faqs={faqs} />

    <ServiceCTA
      headline="Ready to Create Inclusive Learning Content?"
      subtext="Contact our accessibility specialists to plan a review of your digital learning assets and discover how we can help you align with global accessibility standards."
      ctaText="Plan an Accessibility Review"
      ctaLink="/contact-us"
    />
  </ContentServicesLayout>
);

export default AccessibilityPage;
