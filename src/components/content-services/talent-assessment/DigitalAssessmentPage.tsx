import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Laptop, Shield } from "lucide-react";

const DigitalAssessmentPage = () => (
  <SubServicePageTemplate
    seoTitle="Digital Assessment Infrastructure | eQOURSE"
    seoDescription="eQOURSE develops scalable digital assessment content, item-bank workflows and remote proctoring process support for online talent evaluation programmes."
    seoCanonical="https://www.eqourse.com/digital-assessment-infrastructure"
    seoKeywords="digital assessment infrastructure, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Digital Assessment Infrastructure"
    preHeadline="DIGITAL ASSESSMENT INFRASTRUCTURE"
    headline="Digital Assessment Infrastructure"
    headlineAccent="Support"
    subtext="eQOURSE develops scalable digital assessment content, online item-bank formats, remote proctoring process guidelines, and digital test-delivery workflows for B2B testing platforms."
    ctaText="Request Infrastructure Support"
    introLabel="DIGITAL INFRASTRUCTURE"
    introTitle="Content Workflows Built for"
    introGradient="Digital Platforms"
    introDescription="Online assessment platforms require content designed for digital consumption, including precise metadata mapping, compatible formats and structured scoring keys. eQOURSE designs digital assessment files that integrate with LMS and custom testing technology."
    introParagraphs={["We support client item-bank workflows, convert questions to digital metadata layouts, draft remote proctoring guidelines and prepare candidate onboarding support materials. This ensures assessments run smoothly, candidates understand testing rules, and data is gathered reliably."]}
    servicesLabel="Capabilities"
    servicesTitle="Digital Assessment Infrastructure"
    servicesGradient="Support"
    services={[
  {
    "icon": Laptop,
    "title": "Platform Content Support",
    "description": "eQOURSE prepares assessment content for online delivery, including item text, options, rationales, scoring keys, instructions and metadata fields. The service supports structured upload, review and content handover workflows for LMS, assessment platforms and HR technology environments."
  },
  {
    "icon": Shield,
    "title": "Remote Proctoring Support",
    "description": "eQOURSE develops supporting content and process documentation for remote proctored assessments, including candidate instructions, exam-day guidance, policy-aligned communication templates and escalation support materials. The service enables organisations communicate assessment rules clearly across online testing journeys."
  }
]}
    ctaHeadline="Scale Your Digital Assessment Delivery"
    ctaSubtext="eQOURSE builds digital assessment content, item-bank metadata templates and exam administration guidelines for online talent testing."
    ctaButtonText="Discuss Digital Integration"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"}]}
  />
);

export default DigitalAssessmentPage;
