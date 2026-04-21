import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { CalendarDays, CalendarRange, BookOpen, Users, Monitor } from "lucide-react";

const TeacherLessonPlanPage = () => (
  <SubServicePageTemplate
    seoTitle="Teacher Lesson Plan Solutions for K12 & Higher Education"
    seoDescription="Customized teacher lesson plan solutions for K-12 and higher education. Interactive, curriculum-aligned lesson plans that promote student engagement and improve instructional delivery."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/teacher-lesson-plan"
    seoKeywords="teacher lesson plans, lesson plan development, K12 lesson plans, curriculum-aligned lessons, instructional delivery"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="Teacher Lesson Plan"
    preHeadline="Engaging & Curriculum-Aligned Teacher Lesson Plan Solutions for K-12 & Higher Education"
    headline="Teacher Lesson Plan"
    headlineAccent="Solutions"
    subtext="At eQOURSE, we specialize in providing customized teacher lesson plan solutions for K-12 and higher education institutions. Our team designs interactive, curriculum-aligned lesson plans that promote student engagement and improve instructional delivery."
    introLabel="Educator Support"
    introTitle="Lesson Plans That"
    introGradient="Empower Teachers"
    introDescription="Whether it's for traditional classroom teaching or e-learning environments, these lesson plans help ensure that educators are well-equipped to achieve their educational goals."
    introParagraphs={["Our lesson plans integrate innovative teaching strategies, multimedia resources, and assessment criteria to support both novice and experienced educators."]}
    servicesLabel="Plan Types"
    servicesTitle="Lesson Plan"
    servicesGradient="Formats"
    services={[
      { icon: CalendarDays, title: "Daily Lesson Plans", description: "Day-by-day lesson plans with clear learning objectives, activities, and assessment criteria." },
      { icon: CalendarRange, title: "Weekly/Monthly Lesson Plans", description: "Long-term planning resources that map out curriculum delivery over extended periods." },
      { icon: BookOpen, title: "Subject-Specific Lesson Plans", description: "Tailored lesson plans for specific subjects including STEM, languages, humanities, and arts." },
      { icon: Users, title: "Differentiated Lesson Plans", description: "Plans designed to accommodate diverse learning needs and abilities in the same classroom." },
      { icon: Monitor, title: "Technology-Enhanced Lesson Plans", description: "Lesson plans integrating digital tools, multimedia, and interactive elements for modern classrooms." },
    ]}
    ctaHeadline="Empower Your Teaching Staff"
    ctaSubtext="Give your educators the structured, engaging lesson plans they need. Talk to our instructional design team."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
      { title: "K12 Curriculum", href: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development" },
    ]}
  />
);

export default TeacherLessonPlanPage;
