import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { UserCheck, ClipboardList, Users } from "lucide-react";

const CandidateEvaluationPage = () => (
  <SubServicePageTemplate
    seoTitle="Candidate Evaluation Solutions | eQOURSE"
    seoDescription="Develop B2B candidate evaluation content and assessment support for screening, pre-hiring workflows and behavioural review models."
    seoCanonical="https://www.eqourse.com/candidate-evaluation"
    seoKeywords="candidate evaluation, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Candidate Evaluation"
    preHeadline="CANDIDATE EVALUATION"
    headline="Candidate Evaluation Content"
    headlineAccent="and Assessment Support"
    subtext="eQOURSE develops candidate evaluation content, pre-hiring tests, structured work samples, interview rubrics, and evaluation scorecards for B2B clients. We help organizations design consistent, role-linked candidate screening tools for structured recruitment workflows."
    ctaText="Request Evaluation Support"
    introLabel="CANDIDATE SCREENING"
    introTitle="Develop Reliable Evidence-Based"
    introGradient="Screening Content"
    introDescription="Hiring decisions require structured assessment methods that connect role requirements directly to candidate evidence. eQOURSE builds screening assets and candidate evaluation content that allow employers to evaluate skills, behaviors and job alignment consistently."
    introParagraphs={["Our content development services support the creation of pre-hire screening tasks, technical questions, situational judgement scenarios, case studies, structured interview guides and scoring rubrics. This documentation helps recruitment, HR and hiring managers align on evaluation standards."]}
    servicesLabel="Capabilities"
    servicesTitle="Candidate Evaluation"
    servicesGradient="Support"
    services={[
  {
    "icon": UserCheck,
    "title": "Candidate Screening & Evaluation",
    "description": "eQOURSE builds screening question sets, work sample tasks and review rubrics for pre-interview filters. The service focuses on role-essential capabilities, clear candidate instructions and evidence guidelines that allow recruiters to screen profiles objectively."
  },
  {
    "icon": ClipboardList,
    "title": "Pre-Hiring Assessment Solutions",
    "description": "eQOURSE develops assessment item banks, technical scenario tasks, and scoring keys mapped to target job roles. We prepare blueprints, test forms and proctored or unproctored assessment content that client teams can load directly into their testing systems."
  },
  {
    "icon": Users,
    "title": "Behavioural Assessment Support",
    "description": "eQOURSE develops behavioural assessment support content including situational prompts, competency indicators, interviewer guides and structured response rubrics. The module is designed for organisations that require documented behavioural evidence, evaluator consistency and clear alignment between assessment prompts and workplace competency models."
  }
]}
    ctaHeadline="Build Structured Candidate Evaluation Assets"
    ctaSubtext="eQOURSE develops screening content, pre-hiring assessment resources and behavioural evaluation materials for organisations building consistent candidate review workflows."
    ctaButtonText="Request Assessment Scope"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Competency Frameworks","href":"/competency-frameworks"}]}
  />
);

export default CandidateEvaluationPage;
