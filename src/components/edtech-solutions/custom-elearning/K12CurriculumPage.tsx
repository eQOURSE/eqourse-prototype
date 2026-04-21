import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Layout, Users, Lightbulb } from "lucide-react";

const K12CurriculumPage = () => (
  <SubServicePageTemplate
    seoTitle="K12 Curriculum Development & Design Services | eQOURSE"
    seoDescription="Leading provider of K-12 curriculum development services. Subject-centered, learner-centered, and problem-oriented curriculum design for CBSE, ICSE, IB, and State Board."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/k12-curriculum-development"
    seoKeywords="K12 curriculum development, curriculum design, CBSE curriculum, ICSE curriculum, IB curriculum"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="K12 Curriculum Development"
    preHeadline="K-12 Curriculum Development & Design Services — Designing High-Quality Curriculums"
    headline="K-12 Curriculum"
    headlineAccent="Development"
    subtext="We are a leading provider of K-12 curriculum development services, offering seamless design and development that delivers in-depth knowledge through analytical reasoning, detailed explanations, and engaging illustrative examples. We cover all subjects for various boards, including CBSE, ICSE, IB, and State Board curriculum."
    introLabel="Design Approach"
    introTitle="Curriculum That"
    introGradient="Inspires Learning"
    introDescription="Our curriculum development process includes content development, assessment development, and providing manuals for teachers and students."
    introParagraphs={[
      "We provide study materials, live-video solutions, podcasts, and animated-video solutions as part of our comprehensive content development approach.",
      "Assessment development includes test-paper preparation carefully aligned with curriculum objectives and educational outcomes."
    ]}
    stats={[{ value: "4+", label: "Board Standards" }, { value: "All", label: "K12 Grades" }, { value: "100%", label: "Alignment" }, { value: "200+", label: "Experts" }]}
    servicesLabel="Our Methodologies"
    servicesTitle="Curriculum Design"
    servicesGradient="Approaches"
    services={[
      { icon: Layout, title: "Subject-Centered Curriculum Design", description: "Our subject-centered curriculum design services focus on specific subjects, using expert knowledge to decide what and how to teach. We provide structured topics for educators, ensuring clear and consistent teaching." },
      { icon: Users, title: "Learner-Centered Curriculum Design", description: "Our learner-centered curriculum design prioritizes students' needs and interests. We create flexible content that adapts to individual learning styles, encouraging critical thinking and active learning." },
      { icon: Lightbulb, title: "Problem-Oriented Curriculum Design", description: "Our problem-oriented curriculum design teaches K-12 students to tackle real-world issues, building transferable skills and practical knowledge. This approach enhances creativity and innovation." },
    ]}
    faqs={[
      { question: "What are the important components in curriculum development?", answer: "We include clearly defined objectives, comprehensive analysis, engaging classroom activities, study skills enhancement, language skills development, vocabulary building, and grammar assessment." },
      { question: "What boards do you cover?", answer: "We create curricula for CBSE, ICSE, IB (International Baccalaureate), and State Board curricula across Indian states." },
      { question: "How do you design the curriculum?", answer: "Through a collaborative process involving subject matter experts, instructional designers, and educational specialists. Our approach includes assessing educational needs, setting clear objectives, organizing content effectively, and evaluating outcomes." },
    ]}
    ctaHeadline="Need Custom Curriculum Design?"
    ctaSubtext="Partner with our instructional design experts to create curriculum that meets the highest educational standards."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education" },
      { title: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development" },
      { title: "STEM Curriculum", href: "/edtech-solutions/custom-e-learning-content/stem-curriculum-services" },
    ]}
  />
);

export default K12CurriculumPage;
