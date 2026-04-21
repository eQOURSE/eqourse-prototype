import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { BookOpen, ClipboardCheck, FileText, Trophy, BookMarked, GraduationCap, Video } from "lucide-react";

const relatedPages = [
  { title: "K12 Curriculum Development", href: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development" },
  { title: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development" },
  { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
  { title: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development" },
  { title: "STEM Curriculum", href: "/edtech-solutions/custom-e-learning-content/stem-curriculum-services" },
];

const K12HigherEducationPage = () => (
  <SubServicePageTemplate
    seoTitle="K12 & Higher Education Solutions | eQOURSE"
    seoDescription="eQOURSE provides specialized K-12 Education Services and Higher Education Solutions to institutions and e-learning platforms. 100+ SMEs, curriculum development, assessment creation, e-learning content."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/k12-and-higher-education"
    seoKeywords="K12 education services, higher education solutions, curriculum development, e-learning content, academic content"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="K12 & Higher Education"
    preHeadline="Transform Learning with Our K-12 Education Services & Higher Education Solutions"
    headline="K-12 & Higher Education"
    headlineAccent="Content Development"
    subtext="At eQOURSE, we provide specialized K-12 Education Services and Higher Education Solutions to institutions and e-learning platforms. Our team of over 100+ subject matter experts (SMEs) excels in offering tailored curriculum development, assessment creation, and e-learning content designed to meet the unique needs of your institution."
    ctaText="Get Free Consultation"
    introLabel="Our Expertise"
    introTitle="Academic Content That"
    introGradient="Drives Success"
    introDescription="We provide full academic support, including competitive exam preparation, interactive workbooks, teacher lesson plans, and 2D & 3D educational videos."
    introParagraphs={[
      "Our curriculum-aligned content ensures scalable and reliable solutions that drive academic success across K-12 and higher education institutions worldwide.",
      "Whether you need CBSE, ICSE, IB, or State Board-aligned materials, our team delivers content that meets the highest educational standards while engaging modern learners."
    ]}
    stats={[
      { value: "100+", label: "Subject Experts" },
      { value: "15+", label: "Curriculum Boards" },
      { value: "All", label: "K12 Subjects" },
      { value: "ISO", label: "Certified" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Academic Content"
    servicesGradient="Services"
    services={[
      { icon: BookOpen, title: "Curriculum Development", description: "Our experts design K-12 and higher education curricula aligned with national and international standards, promoting academic excellence and student engagement." },
      { icon: ClipboardCheck, title: "Assessment Development", description: "Creating comprehensive assessments including quizzes, tests, and evaluations that accurately measure learner progress and support educational outcomes." },
      { icon: FileText, title: "Study Material Development", description: "Developing detailed study materials across subjects, including textbook solutions, reference guides, and practice resources." },
      { icon: Trophy, title: "Competitive Exam Preparation", description: "Expert-designed content for IIT-JEE, NEET, SAT, UPSC and other competitive exams with practice papers and strategy guides." },
      { icon: BookMarked, title: "Interactive Workbooks", description: "Curriculum-aligned workbooks with hands-on activities, exercises, and assessments for active learning." },
      { icon: GraduationCap, title: "Teacher Lesson Plans", description: "Structured, engaging lesson plans that guide educators through effective classroom delivery." },
      { icon: Video, title: "2D & 3D Educational Videos", description: "Animated educational videos bringing complex concepts to life through visual storytelling." },
    ]}
    faqs={[
      { question: "What subjects do you cover for K-12 content?", answer: "We cover all subjects across CBSE, ICSE, IB, and State Board curricula including Mathematics, Science, English, Social Studies, Hindi, and regional languages." },
      { question: "Do you provide content for competitive exams?", answer: "Yes, we create preparation content for IIT-JEE, NEET, SAT, UPSC, and other national and international competitive examinations." },
      { question: "How many SMEs are on your team?", answer: "We have 100+ subject matter experts spanning STEM, humanities, languages, and professional domains." },
    ]}
    ctaHeadline="Ready to Transform Your Academic Content?"
    ctaSubtext="Partner with eQOURSE for ISO-certified K-12 and higher education content development. Start with a free pilot."
    ctaButtonText="Get Free Consultation"
    relatedPages={relatedPages}
    relatedLabel="Explore More Custom E-Learning Services"
  />
);

export default K12HigherEducationPage;
