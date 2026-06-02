import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Gauge, Map, BarChart3 } from "lucide-react";

const LearningReadinessPage = () => (
  <SubServicePageTemplate
    seoTitle="Learning Readiness Assessments | eQOURSE"
    seoDescription="eQOURSE develops learning readiness assessments, pathway readiness evaluations and skill gap analysis resources for global workforce and education programmes."
    seoCanonical="https://www.eqourse.com/learning-readiness"
    seoKeywords="learning readiness, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Learning Readiness"
    preHeadline="LEARNING READINESS"
    headline="Learning Readiness Assessment"
    headlineAccent="Solutions"
    subtext="eQOURSE develops learning readiness assessments, pre-requisite tests, learner diagnostic tools and onboarding assessments for B2B training, higher education and corporate reskilling programmes."
    ctaText="Request Assessment Support"
    introLabel="LEARNING READINESS"
    introTitle="Determine Learner Readiness and Prerequisite"
    introGradient="Alignment"
    introDescription="Training programs are most effective when learners have the necessary prerequisite knowledge and readiness for the material. eQOURSE builds learning readiness diagnostic assets to evaluate base skills, identify learning style indicators and pinpoint knowledge gaps."
    introParagraphs={["We develop diagnostic questions, self-assessments, pathway matching materials, feedback guides and course onboarding diagnostics. These assets support training teams to place learners in the right program track and structure reskilling pathways."]}
    servicesLabel="Capabilities"
    servicesTitle="Learning Readiness"
    servicesGradient="Support"
    services={[
  {
    "icon": Gauge,
    "title": "Learning Readiness Assessments",
    "description": "Diagnostic assessments that review baseline knowledge, learner confidence, study habits and programme entry preparedness. eQOURSE develops question sets, scoring rubrics and reporting descriptors that support placement, onboarding and learning-plan design."
  },
  {
    "icon": Map,
    "title": "Learning Pathway Readiness Evaluation",
    "description": "Pathway readiness evaluation content enables organisations decide whether a learner is prepared for a specific course level, training stream or progression stage. eQOURSE creates pre-course checks, prerequisite mapping, readiness indicators and learner-facing recommendations for structured pathway planning."
  },
  {
    "icon": BarChart3,
    "title": "Skill Gap Analysis",
    "description": "Skill gap analysis resources compare current capability against role, course or competency expectations. eQOURSE builds diagnostic items, competency matrices and reporting language that help B2B teams identify priority learning needs and content-development requirements."
  }
]}
    ctaHeadline="Build Readiness Diagnostics Before Learning Begins"
    ctaSubtext="eQOURSE develops assessment content, readiness checks and reporting assets that support informed placement and learning pathway design."
    ctaButtonText="Discuss Learner Readiness"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"}]}
  />
);

export default LearningReadinessPage;
