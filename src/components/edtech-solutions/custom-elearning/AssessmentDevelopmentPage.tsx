import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { CheckSquare, Gamepad2, Brain, HelpCircle, Trophy, Layers } from "lucide-react";

const AssessmentDevelopmentPage = () => (
  <SubServicePageTemplate
    seoTitle="Assessment Development Services for K12 Education | eQOURSE"
    seoDescription="Customized K-12 Assessment Development Services for edtech institutions and e-learning platforms. Interactive quizzes, tests, assignments aligned with educational goals."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/assessment-development"
    seoKeywords="assessment development, K12 assessments, interactive quizzes, adaptive testing, game-based assessments"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="Assessment Development"
    preHeadline="Accurate & Customized Assessment Development Services for K-12 & Higher Education"
    headline="Assessment Development"
    headlineAccent="Services"
    subtext="At eQOURSE, we provide customized K-12 Assessment Development Services for edtech institutions and e-learning platforms. Our services include creating interactive quizzes, tests, and assignments that align with your educational goals. We leverage advanced technology to develop assessments that work seamlessly across desktops, smartphones, and tablets."
    introLabel="Precision Evaluation"
    introTitle="Assessments That"
    introGradient="Measure Impact"
    introDescription="Our assessment solutions help track learning progress and ensure effective evaluation."
    introParagraphs={[
      "From formative assessments that provide real-time feedback to adaptive testing that adjusts to student performance, we deliver comprehensive evaluation tools.",
      "Our assessments are designed to work seamlessly across all devices, ensuring accessibility for all learners."
    ]}
    servicesLabel="Assessment Types"
    servicesTitle="Our Assessment"
    servicesGradient="Solutions"
    services={[
      { icon: CheckSquare, title: "Formative Assessments", description: "Quizzes, mid-term tests, and assessments that offer immediate feedback to guide student learning in real time." },
      { icon: Gamepad2, title: "Game-Based Assessments", description: "Interactive, game-based assessments designed to make learning fun while evaluating critical thinking and problem-solving skills." },
      { icon: Brain, title: "Adaptive Testing", description: "Intelligent assessments that adapt to a student's performance level ensure personalized e-learning experiences." },
      { icon: HelpCircle, title: "Quiz & Question Bank Development", description: "Custom quizzes and question banks tailored to your curriculum provide tools for regular evaluation." },
      { icon: Trophy, title: "Assessment for Competitive Exams", description: "Specially designed assessments for competitive exam preparation like IIT-JEE, NEET, and SAT." },
      { icon: Layers, title: "Subject-Integrated Assessments", description: "Assessments combining multiple subjects to encourage interdisciplinary thinking and real-world problem-solving." },
    ]}
    ctaHeadline="Need Custom Assessments?"
    ctaSubtext="Build reliable, engaging assessment tools that truly measure learner progress. Talk to our assessment experts."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Quiz & Question Bank", href: "/edtech-solutions/custom-e-learning-content/quiz-question-bank" },
      { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
    ]}
  />
);

export default AssessmentDevelopmentPage;
