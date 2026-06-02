import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { ClipboardCheck, Keyboard, Timer, MonitorPlay, ImageOff } from "lucide-react";

const relatedPages = [
  { title: "Accessible Media", href: "/accessible-media-enhancements" },
  { title: "Standards Compliance", href: "/standards-compliance" },
  { title: "Assistive Tech Compatibility", href: "/assistive-technology-compatibility" },
  { title: "Document Remediation", href: "/document-content-remediation" },
  { title: "Audit & Compliance Support", href: "/audit-compliance-support" },
];

const AssessmentAccessibilityPage = () => (
  <SubServicePageTemplate
    seoTitle="Assessment Accessibility Services | eQOURSE"
    seoDescription="Design inclusive tests with accessible item types, keyboard navigation, and AT-aware review services."
    seoCanonical="https://www.eqourse.com/assessment-accessibility"
    seoKeywords="accessible assessments, inclusive test design, keyboard accessible quizzes, screen reader accessible tests"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Assessment Accessibility"
    bannerImage="/assets/banners/content-services/accessibility/assessment-accessibility.png"
    bannerImageAlt="Assessment accessibility services banner showing inclusive item design, keyboard-only operability, screen reader testing and equitable WCAG-aligned testing experiences by eQOURSE"
    preHeadline="Assessment Accessibility Services"
    headline="Assessment"
    headlineAccent="Accessibility Services"
    subtext="Ensuring quizzes, tests, and assessments provide equitable measurement for every learner."
    ctaText="Review Assessment Accessibility"
    introLabel="Our Approach"
    introTitle="Equitable Assessments for"
    introGradient="Every Learner"
    introDescription="We ensure assessments are genuinely usable by all learners, including those relying on assistive technologies."
    introParagraphs={[
      "Our team reviews and remediates assessment items to ensure they are perceivable, operable, and understandable.",
      "From keyboard-only operability to screen reader compatibility, we deliver a fair testing experience."
    ]}
    stats={[
      { value: "100%", label: "Keyboard Operable" },
      { value: "AT", label: "Tested & Verified" },
      { value: "WCAG", label: "Standards Aligned" },
      { value: "UDL", label: "Principles Applied" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Assessment Accessibility"
    servicesGradient="Services"
    services={[
      { icon: ClipboardCheck, title: "Accessible Item Design", description: "We reformat assessment items (MCQ, drag-and-drop, matching) ensuring they are perceivable and operable with clear language and logical structure." },
      { icon: Keyboard, title: "Keyboard-Only Operability", description: "We test all interactive elements can be navigated, selected, and submitted using only a keyboard, without requiring mouse interaction." },
      { icon: Timer, title: "Time & Response Controls", description: "We implement mechanisms allowing users to request extended time for timed assessments, complying with WCAG adjustable timing guidelines." },
      { icon: MonitorPlay, title: "Screen Reader Review", description: "We test assessments using major screen readers ensuring form labels, question context, and dynamic feedback are properly announced." },
      { icon: ImageOff, title: "Non-Text Alternatives", description: "We develop accessible alternatives for visual assessment items, maintaining pedagogical goals while providing equivalent testing experiences." },
    ]}
    faqs={[
      { question: "Are drag-and-drop items inherently inaccessible?", answer: "Often yes, if they rely solely on mouse interaction. They can be made accessible with keyboard controls or equivalent alternative question types." },
      { question: "How do you handle timed tests?", answer: "WCAG requires users be warned before timeout and given a way to extend time. Platforms should allow pre-configured extended time limits." },
      { question: "Can you review our existing question bank?", answer: "Yes. We audit item banks to identify inaccessibility patterns and provide scalable remediation strategies." },
    ]}
    ctaHeadline="Ready to Make Your Assessments Accessible?"
    ctaSubtext="Partner with our team to ensure equitable testing experiences for every learner."
    ctaButtonText="Review Assessment Accessibility"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default AssessmentAccessibilityPage;
