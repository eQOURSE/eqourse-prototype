import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { MonitorPlay, Keyboard, Search, Maximize, Brain } from "lucide-react";

const relatedPages = [
  { title: "Assessment Accessibility", href: "/assessment-accessibility" },
  { title: "Audit & Compliance Support", href: "/audit-compliance-support" },
  { title: "Standards Compliance", href: "/standards-compliance" },
  { title: "Document Remediation", href: "/document-content-remediation" },
  { title: "Accessible Media", href: "/accessible-media-enhancements" },
];

const AssistiveTechPage = () => (
  <SubServicePageTemplate
    seoTitle="Assistive Technology Compatibility Services | eQOURSE"
    seoDescription="Manual accessibility testing using JAWS, NVDA, and VoiceOver to ensure educational content is functionally usable with assistive technology."
    seoCanonical="https://www.eqourse.com/assistive-technology-compatibility"
    seoKeywords="assistive technology compatibility, screen reader testing, JAWS testing, NVDA testing, VoiceOver testing, keyboard accessibility"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Assistive Technology Compatibility"
    bannerImage="/assets/banners/content-services/accessibility/assistive-technology-compatibility.png"
    bannerImageAlt="Assistive technology compatibility services banner showing manual screen reader testing with JAWS, NVDA and VoiceOver plus keyboard and screen magnification verification by eQOURSE"
    preHeadline="Assistive Technology Compatibility Services"
    headline="Assistive Technology"
    headlineAccent="Compatibility Services"
    subtext="Rigorous manual functional testing with industry-standard screen readers and input devices, ensuring genuine usability."
    ctaText="Request AT Testing"
    introLabel="Our Testing Process"
    introTitle="Beyond Automated Scans -"
    introGradient="Functional Verification"
    introDescription="We go beyond automated scanning to manually test your content with the assistive technologies your learners actually use."
    introParagraphs={[
      "Automated tools catch only a fraction of accessibility issues. Our experts test with JAWS, NVDA, VoiceOver, and alternative input devices to verify the actual user experience.",
      "We evaluate reading order, keyboard focus management, screen magnification, and cognitive flow-ensuring content works in real-world scenarios."
    ]}
    stats={[
      { value: "JAWS", label: "Screen Reader" },
      { value: "NVDA", label: "Open Source SR" },
      { value: "VO", label: "VoiceOver (Apple)" },
      { value: "KB", label: "Keyboard-Only" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="AT Compatibility"
    servicesGradient="Services"
    services={[
      { icon: MonitorPlay, title: "JAWS & NVDA Testing", description: "Manual testing using JAWS and NVDA screen readers on Windows, verifying content is read accurately and interactive elements are announced correctly." },
      { icon: Search, title: "VoiceOver Testing", description: "Comprehensive testing using Apple's VoiceOver on macOS and iOS, ensuring seamless experience across desktop, tablet, and mobile platforms." },
      { icon: Keyboard, title: "Keyboard Operability & Focus", description: "Verifying every aspect of the learning experience can be navigated without a mouse-visible focus indicators, logical tab order, and no keyboard traps." },
      { icon: Maximize, title: "Screen Magnification Compatibility", description: "Testing with magnification tools to ensure magnifying the interface doesn't cause loss of content or functionality, supporting up to 400% browser zoom." },
      { icon: Brain, title: "Cognitive & Usability Evaluation", description: "Evaluating logical flow, consistency of navigation, and clarity of instructions-factors critical for learners with cognitive or learning disabilities." },
    ]}
    faqs={[
      { question: "Why is manual screen reader testing necessary?", answer: "Automated scanners can't determine if alt text makes sense in context. Only manual testing verifies the actual user experience, logical reading order, and whether dynamic content is properly announced." },
      { question: "Do you test on mobile devices?", answer: "Yes, we test on actual iOS and Android devices using native screen readers (VoiceOver and TalkBack) and touch interaction paradigms." },
      { question: "What happens when you find issues?", answer: "We provide detailed, actionable reports with context, how the screen reader interpreted it, and specific technical remediation recommendations." },
    ]}
    ctaHeadline="Ready to Verify AT Compatibility?"
    ctaSubtext="Contact our team to schedule assistive technology testing for your digital learning content."
    ctaButtonText="Request AT Testing"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default AssistiveTechPage;
