import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookOpen, FileText, PenTool, Headphones, Mic } from "lucide-react";

const AptisPage = () => (
  <SubServicePageTemplate
    seoTitle="APTIS Exam Preparation Content | eQOURSE" seoDescription="Expert APTIS exam preparation content by eQOURSE. Study guides, practice tests, and interactive materials for British Council APTIS assessment preparation." seoCanonical="https://www.eqourse.com/edtech-solutions/exam-preparation-content/aptis" seoKeywords="APTIS exam prep, British Council APTIS, APTIS grammar, APTIS reading, APTIS speaking"
    parentLabel="Exam Preparation Content" parentHref="/edtech-solutions/exam-preparation-content" currentLabel="APTIS Prep Content"
    preHeadline="APTIS Exam Preparation Content — British Council Assessment" headline="APTIS Exam" headlineAccent="Preparation Content"
    subtext="Comprehensive APTIS preparation content designed to help candidates demonstrate their English language proficiency. Our materials cover all APTIS components: Grammar & Vocabulary, Reading, Writing, Listening, and Speaking, with practice tests aligned to British Council standards."
    ctaText="Request Sample Content"
    introLabel="British Council Standard" introTitle="APTIS Content That" introGradient="Delivers Results"
    introDescription="Our APTIS materials are meticulously designed to align with British Council's assessment framework."
    introParagraphs={["Each component—Grammar & Vocabulary, Reading, Writing, Listening, and Speaking—is covered with targeted practice materials, model answers, and scoring rubrics."]}
    servicesLabel="APTIS Components" servicesTitle="APTIS Preparation" servicesGradient="Modules"
    services={[
      { icon: BookOpen, title: "APTIS Grammar & Vocabulary", description: "Targeted practice materials for APTIS grammar and vocabulary components." },
      { icon: FileText, title: "APTIS Reading Practice", description: "Reading comprehension exercises aligned to APTIS format and difficulty levels." },
      { icon: PenTool, title: "APTIS Writing Tasks", description: "Writing practice with model answers and evaluation criteria." },
      { icon: Headphones, title: "APTIS Listening Practice", description: "Audio-based listening exercises with transcripts and answer keys." },
      { icon: Mic, title: "APTIS Speaking Preparation", description: "Speaking task preparation with sample responses and scoring rubrics." },
    ]}
    ctaHeadline="Prepare for APTIS with eQOURSE" ctaSubtext="Get comprehensive, exam-aligned APTIS preparation content. Contact our test prep team." ctaButtonText="Request Sample Content"
    relatedPages={[{ title: "TOEIC", href: "/edtech-solutions/exam-preparation-content/toeic" }, { title: "IELTS", href: "/edtech-solutions/exam-preparation-content/ielts" }, { title: "PTE", href: "/edtech-solutions/exam-preparation-content/pte" }]}
  />
);
export default AptisPage;
