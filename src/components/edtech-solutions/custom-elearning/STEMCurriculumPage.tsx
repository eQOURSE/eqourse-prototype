import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Layers, Wrench, FlaskConical, Code, ClipboardCheck } from "lucide-react";

const STEMCurriculumPage = () => (
  <SubServicePageTemplate
    seoTitle="STEM Curriculum Development for K12 & Higher Education | eQOURSE"
    seoDescription="Customized STEM curriculum development services promoting critical thinking, innovation, and hands-on learning. Aligned with national and state standards for K-12 and higher education."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/stem-curriculum-services"
    seoKeywords="STEM curriculum, STEM education, science curriculum, coding curriculum, robotics, K12 STEM"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="STEM Curriculum Services"
    preHeadline="Innovative STEM Curriculum Development for K-12 & Higher Education"
    headline="STEM Curriculum"
    headlineAccent="Development Services"
    subtext="At eQOURSE, we provide customized STEM curriculum development services designed to promote critical thinking, innovation, and hands-on learning. Our STEM education solutions align with national and state standards and integrate science, technology, engineering, and mathematics to prepare students for real-world challenges."
    introLabel="Future-Ready Education"
    introTitle="STEM Content That"
    introGradient="Builds Innovators"
    introDescription="Our interdisciplinary approach ensures students develop 21st-century skills through project-based, hands-on learning experiences."
    introParagraphs={["From integrated STEM programs to coding and robotics curricula, we create content that makes science, technology, engineering, and mathematics accessible and exciting for all learners."]}
    servicesLabel="STEM Offerings"
    servicesTitle="STEM Curriculum"
    servicesGradient="Services"
    services={[
      { icon: Layers, title: "Integrated STEM Programs", description: "Curricula that combine science, technology, engineering, and mathematics into cohesive, cross-disciplinary learning experiences." },
      { icon: Wrench, title: "Project-Based STEM Learning", description: "Hands-on projects that challenge students to apply STEM concepts to solve real-world problems." },
      { icon: FlaskConical, title: "STEM Lab Activities", description: "Laboratory-based activities with detailed procedures, safety guidelines, and assessment rubrics." },
      { icon: Code, title: "Coding & Robotics Curriculum", description: "Age-appropriate coding and robotics curriculum for K-12 students using popular platforms and languages." },
      { icon: ClipboardCheck, title: "STEM Assessment Tools", description: "Evaluation instruments specifically designed to measure STEM competencies and 21st-century skills." },
    ]}
    ctaHeadline="Build Future-Ready STEM Programs"
    ctaSubtext="Partner with eQOURSE to design STEM curricula that inspires innovation and prepares students for the challenges ahead."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 Curriculum", href: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development" },
      { title: "2D & 3D Videos", href: "/edtech-solutions/custom-e-learning-content/2d-3d-videos" },
      { title: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development" },
    ]}
  />
);

export default STEMCurriculumPage;
