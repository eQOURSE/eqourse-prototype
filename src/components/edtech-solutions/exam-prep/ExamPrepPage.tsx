import EdTechLayout from "../shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import ExamServicesGrid from "./ExamServicesGrid";
import EmSATSection from "./EmSATSection";
import ComprehensiveSolutions from "./ComprehensiveSolutions";

const faqs = [
  {
    question: "What exams do you create content for?",
    answer: "We create content for TOEIC, APTIS, SAT, ACT, AP Exams, IELTS, CEFR, PTE, TOEFL, EmSAT, GRE, GMAT, IIT-JEE, NEET, UPSC, and more."
  },
  {
    question: "Do you follow the latest exam patterns?",
    answer: "Yes. We thoroughly analyse past papers, follow standardised patterns like NTA and international guidelines, and rigorously ensure our content strictly aligns with the latest exam syllabus and testing requirements."
  },
  {
    question: "What formats do you deliver content in?",
    answer: "We deliver study guides, full-length practice tests, video lessons, interactive quizzes, flashcards, diagnostic assessments, and LMS-ready modules (SCORM/xAPI)."
  }
];

const ExamPrepPage = () => (
  <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: "Exam Preparation Content" }]}>
    <SEOHead
      title="Exam Preparation Content & Test Prep | eQOURSE"
      description="Expert-designed test prep content for SAT, GMAT, TOEFL, IIT-JEE, NEET, UPSC, and more. Customized study guides, video lessons, and interactive quiz materials."
      canonical="https://eqourse.com/edtech-solutions/exam-preparation-content"
      keywords="exam preparation content, SAT test prep, TOEFL preparation, IIT-JEE content, NEET study materials, test prep content development"
    />

    <ServiceHero
      preHeadline="Equip Your Institution with Competitive Exam Preparation Content"
      headline="Test Prep Content for"
      headlineAccent="SAT, GMAT, NEET & More"
      subtext="Expert-designed exam preparation materials tailored to global standards like TOEIC, APTIS, IELTS, TOEFL, GRE, and major competitive exams. Diverse levels, subjects, and study guides."
      ctaText="Request Free Pilot Content"
      ctaLink="/free-pilot"
    />

    <ExamServicesGrid />
    <EmSATSection />
    <ComprehensiveSolutions />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Upgrade Your Test Prep Library"
      subtext="Deliver better outcomes for your students with our rigorous, exam-aligned content modules. Speak with our exam prep specialists today."
      ctaText="Talk to Our Exam Prep Team"
    />
  </EdTechLayout>
);

export default ExamPrepPage;
