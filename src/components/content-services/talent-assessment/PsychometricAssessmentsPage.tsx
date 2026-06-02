import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Sliders, BarChart3, Layout, Scale, Shield, Users, GitCompare } from "lucide-react";

const PsychometricAssessmentsPage = () => (
  <SubServicePageTemplate
    seoTitle="Psychometric Assessments for Workforce Evaluation | eQOURSE"
    seoDescription="Develop psychometric assessments, reports, scales, validity studies, norming, equating and test construction support for workforce evaluation."
    seoCanonical="https://www.eqourse.com/psychometric-assessments"
    seoKeywords="psychometric assessments, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Psychometric Assessments"
    preHeadline="PSYCHOMETRICS"
    headline="Psychometric Assessments for"
    headlineAccent="Workforce Evaluation"
    subtext="eQOURSE develops psychometric assessment content, scoring models, and reporting structures for B2B clients. We provide test construction support, scale development, reliability analysis, validity evidence, norming, and test-equating support for workforce, educational, and certification needs."
    ctaText="Request Psychometric Support"
    introLabel="PSYCHOMETRICS"
    introTitle="Scientifically Structured Psychometric"
    introGradient="Assessments"
    introDescription="Organizations need reliable, valid evidence when measuring psychological traits, cognitive abilities or behavioral tendencies. eQOURSE develops structured assessment assets that help teams capture clean data, map competencies to psychological constructs, and prepare clear scoring rubrics."
    introParagraphs={["Our test construction support defines the target constructs, develops item blueprints, drafts and reviews content, maps item difficulty, writes scoring rationales, and organizes test forms. We prepare files with the necessary metadata so that technical teams can deploy assessments in LMS or digital testing platforms."]}
    servicesLabel="Capabilities"
    servicesTitle="Psychometric Assessments"
    servicesGradient="Support"
    services={[
  {
    "icon": Sliders,
    "title": "Psychometric Assessments",
    "description": "eQOURSE develops psychometric assessment content, items, scenarios and workflows. We structure items to measure cognitive, behavioral or situational judgment constructs based on client briefs, construct definitions and assessment blueprints."
  },
  {
    "icon": BarChart3,
    "title": "Psychometric Analysis & Reporting",
    "description": "eQOURSE designs reporting structures, score feedback copy and diagnostic reporting templates. We help turn raw assessment scores into clear, role-relevant feedback messages for candidates, managers and training coordinators."
  },
  {
    "icon": Layout,
    "title": "Test Construction Support",
    "description": "eQOURSE supports test-construction design by developing test specifications, item blueprints, content guidelines, review criteria and assembly instructions. We help ensure that assessment forms cover target domains systematically."
  },
  {
    "icon": Scale,
    "title": "Scale Development Support",
    "description": "eQOURSE helps draft and refine Likert scales, rating criteria, behavioral indicators and descriptive rubrics. We build scaling structures that support clear score interpretation across different roles and target behaviors."
  },
  {
    "icon": Shield,
    "title": "Reliability & Validity Analysis Support",
    "description": "eQOURSE creates documentation frameworks, review protocols and content-validity check sheets. We help clients compile the qualitative and quantitative evidence needed to document the reliability and validity of their assessments."
  },
  {
    "icon": Users,
    "title": "Norming Study Support",
    "description": "eQOURSE designs norming-study protocols, data-collection templates, demographic mapping files and communication materials. We support organizations gathering representative sample data to build stable, comparative norm tables."
  },
  {
    "icon": GitCompare,
    "title": "Test Equating Support",
    "description": "eQOURSE supports test-equating workflows where clients need comparable score interpretation across multiple forms or administrations. Deliverables include equating-plan documentation, anchor-item coordination support, data-preparation guidance and reporting templates for technical review by the client's psychometric team."
  }
]}
    ctaHeadline="Build Psychometric Assessments with eQOURSE"
    ctaSubtext="eQOURSE develops psychometric assessments, test construction frameworks and reporting structures for organisations requiring validated, structured and professionally developed assessment solutions across workforce, education and certification contexts."
    ctaButtonText="Discuss Your Assessment Needs"
    relatedPages={[{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"},{"title":"Competency Frameworks","href":"/competency-frameworks"}]}
  />
);

export default PsychometricAssessmentsPage;
