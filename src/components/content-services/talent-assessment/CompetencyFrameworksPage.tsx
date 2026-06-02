import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Map, ClipboardList, Layout } from "lucide-react";

const CompetencyFrameworksPage = () => (
  <SubServicePageTemplate
    seoTitle="Competency Frameworks for Workforce Assessment | eQOURSE"
    seoDescription="Build role-based competency frameworks, dictionaries and role architecture maps for structured workforce assessment and L&D planning."
    seoCanonical="https://www.eqourse.com/competency-frameworks"
    seoKeywords="competency frameworks, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Competency Frameworks"
    preHeadline="COMPETENCY ARCHITECTURE"
    headline="Competency Frameworks for"
    headlineAccent="Workforce Assessment"
    subtext="eQOURSE designs role-based competency frameworks, competency dictionaries, skills inventories, and role architecture maps. We help organizations structure the competency definitions required for job alignment, skill assessments, performance reviews, and training paths."
    ctaText="Discuss Framework Requirements"
    introLabel="COMPETENCY FRAMEWORKS"
    introTitle="Structure Your Workforce Competency"
    introGradient="Dictionary"
    introDescription="A clear framework of defined competencies is essential for consistent skill assessment and professional development. eQOURSE works with B2B organizations to develop role competency mappings, behavior indicators and level descriptors that fit their operational structure."
    introParagraphs={["We research role requirements, compile skill dictionaries, structure performance criteria, map framework levels and compile documentation. These framework assets support workforce capability benchmarking, training needs analysis and digital platform integration."]}
    servicesLabel="Capabilities"
    servicesTitle="Competency Frameworks"
    servicesGradient="Support"
    services={[
  {
    "icon": Map,
    "title": "Role-Based Competency Evaluation",
    "description": "eQOURSE develops role-based competency frameworks that map specific, observable behaviors to job descriptions and levels. We design competency architecture to support structured recruitment, training, evaluation and talent planning across multiple departments."
  },
  {
    "icon": ClipboardList,
    "title": "Competency Dictionary Development",
    "description": "eQOURSE writes clear competency dictionaries, defining core, functional, leadership and technical skill areas. We provide detailed descriptions, rating matrices and behavioral indicators to ensure consistency across internal assessment processes."
  },
  {
    "icon": Layout,
    "title": "Role Architecture Mapping Support",
    "description": "eQOURSE supports role architecture mapping by documenting career paths, skill requirements and capability profiles. We align job matrices and skill tags to help organizations organize job roles, standardise training programs and plan strategic reskilling."
  }
]}
    ctaHeadline="Build a Structured Competency Framework"
    ctaSubtext="eQOURSE develops role-based competency frameworks, skills dictionaries and role architecture maps for B2B talent assessment and capability mapping."
    ctaButtonText="Request Framework Support"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"}]}
  />
);

export default CompetencyFrameworksPage;
