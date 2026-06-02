import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { ClipboardCheck } from "lucide-react";

const SkillAssessmentsPage = () => (
  <SubServicePageTemplate
    seoTitle="Skill Assessments for Workforce Evaluation | eQOURSE"
    seoDescription="eQOURSE develops skill-based assessment content, rubrics and competency-mapped test items for corporates, EdTech platforms and institutions."
    seoCanonical="https://www.eqourse.com/skill-assessments"
    seoKeywords="skill assessments, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Skill Assessments"
    preHeadline="SKILL ASSESSMENT"
    headline="Skill-Based Assessments for"
    headlineAccent="Workforce Capability Evaluation"
    subtext="eQOURSE develops skill-based assessment assets for corporates, EdTech platforms, universities, workforce bodies and learning organisations. The service covers competency-mapped test items, practical task scenarios, scoring rubrics, item metadata and review-ready assessment documentation for digital or blended evaluation models."
    ctaText="Request Assessment Content"
    introLabel="ASSESSMENT DESIGN"
    introTitle="Competency-Mapped Evaluation Content"
    introGradient="for Workforce Decisions"
    introDescription="Workforce assessment programmes require evidence that connects role expectations, task performance and measurable skill indicators. eQOURSE creates structured assessment content for organisations that need role-relevant evaluation assets across recruitment, workforce development, certification preparation, internal mobility and learning measurement workflows."
    introParagraphs={["eQOURSE defines assessment objectives, maps skill statements to observable behaviours, develops item banks and task prompts, applies scoring guidance and prepares delivery metadata for client platforms. Where clients use SFIA, ESCO, internal competency dictionaries, QTI-compatible item structures or personnel certification requirements, eQOURSE aligns assets to the agreed reference model."]}
    servicesLabel="Capabilities"
    servicesTitle="Skill Assessments"
    servicesGradient="Support"
    services={[
  {
    "icon": ClipboardCheck,
    "title": "Skill-Based Assessments",
    "description": "eQOURSE creates skill-based assessment content that measures applied capability through role-relevant tasks, scenario prompts, multiple-response items, practical exercises, scoring rubrics and evidence descriptors. Assets are mapped to client-defined competency frameworks, workplace skill profiles, digital skills taxonomies or interoperable assessment formats required by learning platforms and workforce evaluation systems."
  }
]}
    ctaHeadline="Build Skill Assessment Content for Workforce Evaluation"
    ctaSubtext="eQOURSE develops competency-mapped assessment items, task scenarios, rubrics and documentation for organisations designing structured workforce evaluation programmes."
    ctaButtonText="Discuss Assessment Scope"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"},{"title":"Competency Frameworks","href":"/competency-frameworks"}]}
  />
);

export default SkillAssessmentsPage;
