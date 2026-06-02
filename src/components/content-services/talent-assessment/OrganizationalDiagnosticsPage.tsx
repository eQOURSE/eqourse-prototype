import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Map, Gauge, BarChart3, UserCheck, ClipboardList } from "lucide-react";

const OrganizationalDiagnosticsPage = () => (
  <SubServicePageTemplate
    seoTitle="Organisational Diagnostics Services | eQOURSE"
    seoDescription="eQOURSE delivers organisational diagnostics support for workforce capability mapping, job role benchmarking, skill gap analysis and training needs analysis for global B2B teams."
    seoCanonical="https://www.eqourse.com/organizational-diagnostics"
    seoKeywords="organizational diagnostics, talent assessment, B2B workforce evaluation, eQOURSE"
    parentLabel="Talent Assessment & Workforce Evaluation"
    parentHref="/talent-assessment-workforce-evaluation"
    currentLabel="Organizational Diagnostics"
    preHeadline="ORGANISATIONAL DIAGNOSTICS"
    headline="Organisational Diagnostics for"
    headlineAccent="Workforce Capability"
    subtext="eQOURSE develops organisational diagnostics content, assessment tools and reporting structures for HR, L&D, workforce planning and education organisations. The service supports capability mapping, skill gap analysis, job role benchmarking and training needs analysis for global B2B teams."
    ctaText="Request Diagnostic Support"
    introLabel="WORKFORCE INSIGHT"
    introTitle="Diagnose Capability Gaps Before Designing"
    introGradient="Workforce Learning"
    introDescription="Organisations need a clear view of role expectations, capability maturity and workforce skill gaps before investing in learning programmes. eQOURSE builds diagnostic assets that help teams capture structured evidence, compare roles consistently and translate findings into learning and assessment requirements."
    introParagraphs={["eQOURSE's organisational diagnostics support can include capability maps, benchmark descriptors, role-based assessment criteria, training needs analysis instruments and reporting-ready content frameworks. Each output is designed for B2B deployment across HR, L&D, corporate learning, education platforms and workforce development programmes."]}
    servicesLabel="Capabilities"
    servicesTitle="Organizational Diagnostics"
    servicesGradient="Support"
    services={[
  {
    "icon": Map,
    "title": "Workforce Capability Mapping",
    "description": "eQOURSE designs workforce capability mapping documentation that links organizational goals to job roles, skills, and learning outcomes. We provide structured capability matrices to help teams evaluate skills alignment, identify gaps, and plan reskilling pathways."
  },
  {
    "icon": Gauge,
    "title": "Organisational Capability Assessment",
    "description": "eQOURSE develops capability assessment instruments, surveys, and evaluation standards to measure performance levels across business units. We compile evidence benchmarks and scoring frameworks to help leaders identify capability priorities."
  },
  {
    "icon": BarChart3,
    "title": "Workforce Skill Benchmarking",
    "description": "eQOURSE supports skill benchmarking by developing role-aligned skill indicators, proficiency descriptors and comparison-ready assessment structures."
  },
  {
    "icon": UserCheck,
    "title": "Job Role Benchmarking",
    "description": "eQOURSE builds job role benchmarking support materials that define role responsibilities, task expectations, competency indicators and assessment criteria. These assets help HR, L&D and content teams align learning pathways with practical job-role requirements."
  },
  {
    "icon": ClipboardList,
    "title": "Training Needs Analysis",
    "description": "eQOURSE creates training needs analysis instruments, survey content, skill gap templates and reporting structures for workforce learning programmes. These resources help organisations identify audience segments, priority learning needs and content development requirements."
  }
]}
    ctaHeadline="Build a Clearer View of Workforce Capability"
    ctaSubtext="eQOURSE develops structured diagnostics, benchmarks and training needs analysis assets for HR, L&D and workforce planning teams managing capability assessment at organisational scale."
    ctaButtonText="Request Diagnostic Support"
    relatedPages={[{"title":"Psychometric Assessments","href":"/psychometric-assessments"},{"title":"Skill Assessments","href":"/skill-assessments"},{"title":"Candidate Evaluation","href":"/candidate-evaluation"}]}
  />
);

export default OrganizationalDiagnosticsPage;
