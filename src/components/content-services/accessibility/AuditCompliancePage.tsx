import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { FileSearch, ShieldCheck, FileCheck, ClipboardCheck, Eye } from "lucide-react";

const relatedPages = [
  { title: "Standards Compliance", href: "/standards-compliance" },
  { title: "Assistive Tech Compatibility", href: "/assistive-technology-compatibility" },
  { title: "Document Remediation", href: "/document-content-remediation" },
  { title: "Accessible Media", href: "/accessible-media-enhancements" },
  { title: "Assessment Accessibility", href: "/assessment-accessibility" },
];

const AuditCompliancePage = () => (
  <SubServicePageTemplate
    seoTitle="Audit & Compliance Support for Digital Accessibility | eQOURSE"
    seoDescription="Comprehensive accessibility audits, gap analysis, and VPAT/ACR documentation support for educational content and platforms."
    seoCanonical="https://www.eqourse.com/audit-compliance-support"
    seoKeywords="accessibility audit services, WCAG gap analysis, VPAT creation, ACR documentation, digital accessibility compliance, Content Services accessibility auditing"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Audit & Compliance Support"
    bannerImage="/assets/banners/content-services/accessibility/audit-compliance-support.png"
    bannerImageAlt="Accessibility audit and compliance support services banner showing comprehensive WCAG audits, gap analysis, VPAT and ACR documentation by eQOURSE for educational platforms"
    preHeadline="Audit & Compliance Support"
    headline="Audit & Compliance Support"
    headlineAccent="for Digital Accessibility"
    subtext="Transparent evaluations and authoritative documentation demonstrating your commitment to digital inclusion and regulatory compliance."
    ctaText="Schedule an Audit"
    introLabel="Our Process"
    introTitle="Rigorous Evaluation &"
    introGradient="Clear Documentation"
    introDescription="Our audits combine automated scanning for breadth with rigorous manual testing by accessibility experts to uncover complex functional barriers."
    introParagraphs={[
      "We translate audit findings into prioritized, actionable remediation roadmaps-identifying critical barriers, outlining specific technical fixes, and helping you allocate resources efficiently.",
      "For organizations requiring formal documentation, we provide VPAT/ACR support services, conducting evaluations and authoring detailed technical reports in standard formats."
    ]}
    stats={[
      { value: "WCAG", label: "Audit Aligned" },
      { value: "VPAT", label: "Documentation" },
      { value: "DHS", label: "Trusted Tester" },
      { value: "508", label: "Section Compliant" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Audit & Compliance"
    servicesGradient="Services"
    services={[
      { icon: FileSearch, title: "Comprehensive Accessibility Audits", description: "In-depth, multi-layered audits combining automated scanning with rigorous manual testing by accessibility experts to uncover complex functional barriers in your platforms and content." },
      { icon: ShieldCheck, title: "Gap Analysis & Roadmapping", description: "We translate audit findings into prioritized, actionable remediation roadmaps-identifying critical barriers and helping you allocate resources efficiently to achieve compliance." },
      { icon: FileCheck, title: "VPAT & ACR Documentation", description: "We evaluate your product against WCAG, Section 508, and EN 301 549, then author accurate Voluntary Product Accessibility Templates (VPATs) for your Accessibility Conformance Report." },
      { icon: ClipboardCheck, title: "Trusted Tester Methodology", description: "For organizations adhering to DHS standards, our processes incorporate the Trusted Tester methodology, ensuring robust and repeatable accessibility testing protocols." },
      { icon: Eye, title: "Ongoing Accessibility Monitoring", description: "We provide ongoing monitoring services and periodic re-audits to ensure that as your content and platforms evolve, your accessibility compliance remains intact." },
    ]}
    faqs={[
      { question: "What is the deliverable of an accessibility audit?", answer: "A comprehensive report detailing every identified issue, its location, the relevant standard, user impact, and concrete remediation recommendations." },
      { question: "Do you write the VPAT for us?", answer: "We conduct the technical evaluation and draft the detailed remarks for the VPAT. The final document is a statement of conformance issued by your organization, built on our technical foundation." },
      { question: "How long does a comprehensive audit take?", answer: "Timeline depends on scope and complexity. Following an initial scoping discussion, we provide a detailed timeline and testing plan tailored to your specific assets." },
    ]}
    ctaHeadline="Ready to Audit Your Accessibility?"
    ctaSubtext="Schedule a comprehensive accessibility audit and get a clear roadmap to compliance."
    ctaButtonText="Schedule an Audit"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default AuditCompliancePage;
