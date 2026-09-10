import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import ExamServicesGrid from "./ExamServicesGrid";
import EmSATSection from "./EmSATSection";
import ComprehensiveSolutions from "./ComprehensiveSolutions";
import { BookMarked, Target, FileText } from "lucide-react";

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
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Exam Preparation Content" }]}>
    <SEOHead
      title="Exam Preparation Content & Test Prep | eQOURSE"
      description="Expert-designed test prep content for SAT, GMAT, TOEFL, IIT-JEE, NEET, UPSC, and more. Customized study guides, video lessons, and interactive quiz materials."
      canonical="https://www.eqourse.com/test-prep-content"
      keywords="exam preparation content, SAT test prep, TOEFL preparation, IIT-JEE content, NEET study materials, test prep content development"
    />

    <ServiceHero
      preHeadline="Equip Your Institution with Competitive Exam Preparation Content"
      headline="Test Prep Content for"
      headlineAccent="SAT, GMAT, NEET & More"
      subtext="Expert-designed exam preparation materials tailored to global standards like TOEIC, APTIS, IELTS, TOEFL, GRE, and major competitive exams. Diverse levels, subjects, and study guides."
      ctaText="Request Free Pilot Content"
      ctaLink="/free-pilot"
      imageSrc="/assets/banners/content-services/main/exam-preparation-content.webp"
      imageAlt="Exam preparation content services by eQOURSE - SAT, TOEFL, IELTS, ACT, AP, PTE, TOEIC and CEFR test prep with practice tests, study guides and interactive quizzes"
      rotatingBadges={[
        { icon: BookMarked, title: "Curriculum", subtitle: "Exam aligned", color: "hsl(170 82% 55%)" },
        { icon: Target, title: "Preparation", subtitle: "SAT, NEET, GMAT", color: "hsl(190 85% 68%)" },
        { icon: FileText, title: "Materials", subtitle: "Quizzes & guides", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "EXM", title: "Test Prep", subtitle: "Competitive advantage" }}
    />

    <ExamServicesGrid />
    <EmSATSection />
    <ComprehensiveSolutions />
    <RelatedBlogs />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Upgrade Your Test Prep Library"
      subtext="Deliver better outcomes for your students with our rigorous, exam-aligned content modules. Speak with our exam prep specialists today."
      ctaText="Talk to Our Exam Prep Team"
    />
  </ContentServicesLayout>
);

export default ExamPrepPage;
