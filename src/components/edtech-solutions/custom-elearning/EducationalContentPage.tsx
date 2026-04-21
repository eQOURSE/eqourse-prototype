import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookText, FileQuestion, ClipboardList, BookOpen, GraduationCap, FileText } from "lucide-react";

const EducationalContentPage = () => (
  <SubServicePageTemplate
    seoTitle="Educational Content Development for K12 | eQOURSE"
    seoDescription="Comprehensive educational content development services creating engaging instructional materials. Text, video, and interactive solutions by expert SMEs and instructional designers."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/educational-content-development"
    seoKeywords="educational content development, instructional materials, textbook content, study guides, curriculum development"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="Educational Content Development"
    preHeadline="Innovative Educational Content Development for K-12 & Higher Education"
    headline="Educational Content"
    headlineAccent="Development"
    subtext="At eQOURSE, we offer comprehensive educational content development services, creating engaging and interactive instructional materials for learners worldwide. Our team of expert educational content developers, including SMEs and instructional designers, utilizes the latest tools and techniques to deliver high-quality content across a range of subjects and formats."
    introLabel="Content Excellence"
    introTitle="Instructional Materials That"
    introGradient="Inspire"
    introDescription="We create content that goes beyond traditional textbooks to deliver engaging, multi-format learning experiences."
    introParagraphs={["Our content development process combines subject matter expertise with cutting-edge instructional design to produce materials that resonate with modern learners across K-12 and higher education."]}
    servicesLabel="Content Types"
    servicesTitle="What We"
    servicesGradient="Create"
    services={[
      { icon: BookText, title: "Textbook Content Development", description: "High-quality textbooks that align with educational objectives, supporting educators in achieving their teaching goals." },
      { icon: FileQuestion, title: "Solution Manuals", description: "Clear, step-by-step solutions to complex textbook problems, enabling students to grasp concepts and solve similar questions." },
      { icon: ClipboardList, title: "Question Banks", description: "Customized question banks, mock tests, and practice materials designed with precision for exam preparation." },
      { icon: BookOpen, title: "Curriculum Development", description: "Designing curriculum for K-12 and higher education, aligned with core standards." },
      { icon: GraduationCap, title: "Lesson Plan Creation", description: "Lesson plans that incorporate innovative teaching strategies for effective classroom delivery." },
      { icon: FileText, title: "Study Guides & Notes", description: "Comprehensive study guides and revision notes covering key topics across all subjects." },
    ]}
    ctaHeadline="Need Educational Content?"
    ctaSubtext="Get high-quality, curriculum-aligned educational materials from our team of 200+ subject matter experts."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development" },
      { title: "Teacher Lesson Plan", href: "/edtech-solutions/custom-e-learning-content/teacher-lesson-plan" },
    ]}
  />
);

export default EducationalContentPage;
