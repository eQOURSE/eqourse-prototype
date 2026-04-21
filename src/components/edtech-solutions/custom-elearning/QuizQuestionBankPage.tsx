import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { ListChecks, FileEdit, LayoutList, Brain, BookOpen } from "lucide-react";

const QuizQuestionBankPage = () => (
  <SubServicePageTemplate
    seoTitle="Custom Quiz & Question Bank Development | eQOURSE"
    seoDescription="Expert quiz and question bank development for K-12 and higher education assessments. MCQs, short answer, long answer, case-based, and adaptive question banks."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/quiz-question-bank"
    seoKeywords="quiz development, question bank, MCQ question bank, adaptive testing, exam-pattern questions"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="Quiz & Question Bank"
    preHeadline="Expert Quiz and Question Bank Development for Assessments"
    headline="Quiz & Question Bank"
    headlineAccent="Development"
    subtext="eQOURSE develops comprehensive quiz and question banks tailored to your curriculum requirements. Our subject matter experts create high-quality questions across Bloom's Taxonomy levels, ensuring rigorous assessment of knowledge, comprehension, application, analysis, synthesis, and evaluation skills."
    introLabel="Assessment Precision"
    introTitle="Questions That"
    introGradient="Measure Mastery"
    introDescription="Our question banks are meticulously crafted with difficulty tagging, topic mapping, and detailed answer explanations."
    introParagraphs={["From MCQs to case-based questions, we create comprehensive assessment tools that support both formative and summative evaluation across all grade levels and subjects."]}
    servicesLabel="Question Types"
    servicesTitle="Our Question Bank"
    servicesGradient="Services"
    services={[
      { icon: ListChecks, title: "MCQ Question Banks", description: "Multiple-choice questions with detailed answer explanations, difficulty tagging, and topic mapping." },
      { icon: FileEdit, title: "Short & Long Answer Questions", description: "Subjective questions with model answers and marking rubrics for comprehensive evaluation." },
      { icon: LayoutList, title: "Case-Based Questions", description: "Scenario-based questions testing application of knowledge in real-world contexts." },
      { icon: Brain, title: "Adaptive Question Pools", description: "Question banks designed for adaptive testing systems that adjust difficulty based on student performance." },
      { icon: BookOpen, title: "Exam-Pattern Question Banks", description: "Questions aligned to specific exam patterns (CBSE, ICSE, IB, competitive exams)." },
    ]}
    ctaHeadline="Build Your Question Bank"
    ctaSubtext="Get expertly crafted quizzes and question banks tailored to your curriculum and assessment needs."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development" },
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
    ]}
  />
);

export default QuizQuestionBankPage;
