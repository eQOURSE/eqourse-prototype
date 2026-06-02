import ContentServicesLayout from "../shared/ContentServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import TalentAssessmentServicesGrid from "./TalentAssessmentServicesGrid";
import { ClipboardCheck, LineChart, BrainCircuit } from "lucide-react";

const faqs = [
  {
    question: "What does eQOURSE provide under talent assessment and workforce evaluation?",
    answer: "eQOURSE develops assessment content, competency frameworks, scoring rubrics, reporting templates and digital-ready assets for B2B clients. The service can support hiring, learning readiness, workforce diagnostics, internal mobility and capability mapping programmes."
  },
  {
    question: "Can eQOURSE create psychometric assessments?",
    answer: "eQOURSE develops psychometric assessment content, scoring documentation and reporting structures according to the agreed use case. Where formal psychological testing, licensing, clinical interpretation or legal validation is required, clients should involve qualified professionals and jurisdiction-specific reviewers."
  },
  {
    question: "How are skill assessments structured?",
    answer: "Skill assessments usually start with role analysis, competency mapping and test blueprinting. eQOURSE then develops task formats, item banks, rubrics, model answers, difficulty tags and reporting logic that match the client’s workforce or learning context."
  },
  {
    question: "Does eQOURSE support hiring assessments?",
    answer: "Yes. eQOURSE can create structured candidate evaluation materials such as screening tasks, work samples, interview guides, case exercises, evaluator rubrics and scorecards. The employer remains responsible for final hiring decisions and local legal compliance."
  },
  {
    question: "Can assessments be delivered digitally?",
    answer: "eQOURSE prepares assessment content for digital delivery by organising item metadata, test forms, scoring keys, workflow documentation and reporting requirements. Technical implementation can be aligned with LMS, assessment platform or custom technology teams."
  },
  {
    question: "How does eQOURSE approach fairness and quality?",
    answer: "Assessment work can be structured around defined use cases, job relevance, clear scoring criteria, review workflows, accessibility considerations and documentation. For regulated or high-stakes selection, clients should conduct appropriate validation, adverse impact review and legal checks in their jurisdiction."
  },
  {
    question: "Can this service support training needs analysis?",
    answer: "Yes. Learning readiness and skill assessment outputs can help organisations identify baseline capability, prerequisite gaps and training priorities. These assets can inform curriculum planning, onboarding, reskilling and workforce development programmes."
  }
];

const TalentAssessmentPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Talent Assessment & Workforce Evaluation" }]}>
    <SEOHead
      title="Talent Assessment & Workforce Evaluation Solutions | eQOURSE"
      description="Build reliable talent, skills and workforce evaluation programmes with psychometric, competency and digital assessment support from eQOURSE."
      canonical="https://www.eqourse.com/talent-assessment-workforce-evaluation/"
      keywords="talent assessment services, workforce evaluation solutions, psychometric assessment services, skill assessment services, competency framework development, candidate evaluation tools, learning readiness assessment, organisational diagnostics, digital assessment infrastructure, assessment content development"
    />

    <ServiceHero
      preHeadline="Talent Intelligence"
      headline="Talent Assessment & "
      headlineAccent="Workforce Evaluation"
      subtext="eQOURSE designs and develops structured assessment content, competency frameworks and workforce evaluation assets for organisations that need reliable evidence for hiring, development and learning decisions. We support psychometric, skill, readiness and organisational diagnostic workflows with structured documentation, scoring logic and digital delivery assets."
      ctaText="Discuss Assessment Needs"
      ctaLink="#contact"
      imageSrc="/assets/banners/content-services/main/talent-assessment-workforce-evaluation.png"
      imageAlt="Talent assessment and workforce evaluation services by eQOURSE - psychometric assessments, skill testing, candidate evaluation, competency frameworks and organizational diagnostics"
      rotatingBadges={[
        { icon: ClipboardCheck, title: "Assessment", subtitle: "Skill testing", color: "hsl(170 82% 55%)" },
        { icon: BrainCircuit, title: "Psychometric", subtitle: "Behavioral analysis", color: "hsl(190 85% 68%)" },
        { icon: LineChart, title: "Workforce", subtitle: "Diagnostics", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "HR", title: "Evaluation", subtitle: "Data-driven decisions" }}
    />

    <ServiceNarrativeSection
      label="Assessment Strategy"
      title="Turn Workforce Data into"
      gradientText="Structured Evidence"
      description="Designed around current assessment practice, including validity, reliability, fairness, documentation and role relevance principles used in professional testing and personnel selection contexts."
      paragraphs={[
        "Organisations typically gather workforce evidence across interviews, tests, training records and manager feedback - but this data is rarely structured for consistent comparison across roles or business units. eQOURSE helps convert these signals into structured assessment assets that support hiring, development, mobility and learning decisions.",
        "Our delivery process defines the assessment purpose, maps competencies, builds item specifications, develops content, creates scoring rubrics, prepares reporting logic and supports digital implementation. Each asset is documented so internal teams and assessment vendors can review intent, scoring and use conditions."
      ]}
      bullets={[
        "Role-linked assessment blueprints mapped to occupational criteria",
        "Clear scoring and interpretation notes for evaluation reliability",
        "Digital-ready content assets with comprehensive metadata mapping"
      ]}
      stats={[
        { value: "7", label: "Assessment Modules" },
        { value: "B2B Only", label: "Service Scope" },
        { value: "LMS & QTI", label: "Interoperability" },
        { value: "100%", label: "Digital Ready" }
      ]}
      panelTitle="Assessment Blueprint Matrix"
      panelSubtitle="Structured criteria for content construction and validation."
      bars={[
        { label: "Competency Mapping Accuracy", value: 100 },
        { label: "Psychometric Alignment", value: 96 },
        { label: "Platform Interoperability", value: 95 },
        { label: "Scoring Key Verification", value: 100 }
      ]}
    />

    <TalentAssessmentServicesGrid />

    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Build a Workforce Assessment System Decision-Makers Rely On"
      subtext="Partner with eQOURSE to develop structured assessment content, competency frameworks, scoring rubrics and digital-ready workforce evaluation assets for your organisation."
      ctaText="Discuss Assessment Needs"
    />
  </ContentServicesLayout>
);

export default TalentAssessmentPage;
