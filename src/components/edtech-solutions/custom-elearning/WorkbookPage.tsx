import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookMarked, BookOpen, Target, MousePointerClick, ClipboardCheck } from "lucide-react";

const WorkbookPage = () => (
  <SubServicePageTemplate
    seoTitle="Academic Workbook Development Services for K12 | eQOURSE"
    seoDescription="Expert workbook development for K-12 and higher education. Chapter-wise, full-syllabus, topic-based, interactive, and assessment-integrated workbooks aligned with curriculum standards."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/workbook-development"
    seoKeywords="workbook development, academic workbooks, interactive workbooks, K12 workbooks, assessment workbooks"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="Workbook Development"
    preHeadline="Custom Workbook Development for Engaging K-12 & Higher Education Learning"
    headline="Workbook Development"
    headlineAccent="Services"
    subtext="The quality of workbook development plays a critical role in improving student learning outcomes. At eQOURSE, our team of expert professionals carefully design and develop academic workbooks that align with educational standards while incorporating interactive elements for enhanced engagement."
    introLabel="Hands-On Learning"
    introTitle="Workbooks That"
    introGradient="Engage"
    introDescription="Each workbook features instructional content, exercises, quizzes, and assessments for comprehensive learning."
    introParagraphs={["Our workbooks are designed to reinforce classroom learning through structured practice, progressive difficulty, and active student participation."]}
    servicesLabel="Workbook Types"
    servicesTitle="Our Workbook"
    servicesGradient="Solutions"
    services={[
      { icon: BookMarked, title: "Chapter-Wise Workbooks", description: "Workbooks structured by chapters, helping students master each section effectively and in alignment with institutional goals." },
      { icon: BookOpen, title: "Full-Syllabus Workbooks", description: "Comprehensive workbooks covering the entire syllabus, providing a complete resource for review and practice." },
      { icon: Target, title: "Topic-Based Workbooks", description: "Focused on specific topics, offering targeted learning to deepen understanding of key concepts." },
      { icon: MousePointerClick, title: "Interactive Workbooks", description: "Engaging workbooks with hands-on activities designed to foster active learning and student participation." },
      { icon: ClipboardCheck, title: "Assessment-Integrated Workbooks", description: "Workbooks incorporating quizzes and assessments to track progress and ensure mastery." },
    ]}
    ctaHeadline="Need Custom Workbooks?"
    ctaSubtext="Create engaging, curriculum-aligned workbooks that drive student participation and measurable outcomes."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
      { title: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development" },
    ]}
  />
);

export default WorkbookPage;
