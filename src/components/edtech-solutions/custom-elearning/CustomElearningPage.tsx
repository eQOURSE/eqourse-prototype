import EdTechLayout from "../shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import SubServicesGrid from "./SubServicesGrid";

const faqs = [
  {
    question: "What types of custom e-learning content do you create?",
    answer: "We create K-12 study materials, curriculum-aligned lessons, assessments, workbooks, teacher lesson plans, STEM content, e-books, quiz and question banks, and 2D/3D educational videos."
  },
  {
    question: "What curriculum boards do you support?",
    answer: "We support CBSE, ICSE, IB, State Board, Common Core, Cambridge, and custom curriculum frameworks. Our instructional designers seamlessly adapt to your specific regional requirements."
  },
  {
    question: "How many SMEs are available for content creation?",
    answer: "We have 200+ active subject matter experts across STEM, humanities, languages, and professional domains, allowing us to quickly scale production for critical deadlines."
  }
];

const CustomElearningPage = () => (
  <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: "Custom E-Learning Content" }]}>
    <SEOHead
      title="Custom E-Learning Content | eQOURSE"
      description="Custom E-learning content development solutions covering K12 academic content, assessments, workbooks, lesson plans, STEM curriculum, and interactive media."
      canonical="https://eqourse.com/edtech-solutions/custom-e-learning-content"
      keywords="custom e-learning content, k12 academic content, STEM curriculum, digital learning content, e-learning platforms, instructional design"
    />

    <ServiceHero
      preHeadline="Custom E-Learning Content Development Services"
      headline="Custom E-learning Content for"
      headlineAccent="K12 & Higher Ed"
      subtext="Expertly crafted educational materials aligned with curriculum standards, integrating multimedia and interactive tools to build robust learner engagement."
      ctaText="Start Your Free Pilot"
      ctaLink="/free-pilot"
    />

    <ServiceNarrativeSection
      label="Data-Driven Pedagogy"
      title="Engaging Content that"
      gradientText="Drives Outcomes"
      description="Modern learners require more than just digitized textbooks. They need interactive, deeply structured learning experiences."
      paragraphs={[
        "At eQOURSE, we specialize in creating custom e-learning content that meets the specific needs of educational institutions, e-learning platforms, and corporate organizations.",
        "Our solutions are designed to strictly align with curriculum standards (CBSE, ICSE, IB, Common Core) while integrating progressive multimedia tools to capture and retain learner attention. Whether it's K12 education, higher education, or specialized STEM topics, our instructional designers deliver content that actually achieves your educational goals."
      ]}
      bullets={[
        "Multi-modal assets: text, assessments, 2D/3D video, and interactive HTML5",
        "Rigorous adherence to varied global curriculum boards and standards",
        "Constructivist learning principles baked into every lesson plan and module"
      ]}
      stats={[
        { value: "10+", label: "Content Types" },
        { value: "200+", label: "SMEs" },
        { value: "15+", label: "Curriculums" },
        { value: "100%", label: "Alignment" }
      ]}
      panelTitle="Content Excellence Standards"
      panelSubtitle="Our four-pillar approach to premium educational material."
      bars={[
        { label: "Curriculum Accuracy", value: 99 },
        { label: "Pedagogical Effectiveness", value: 94 },
        { label: "Engagement Mechanics", value: 91 },
        { label: "Accessibility Compliance", value: 95 }
      ]}
      dark
    />

    <SubServicesGrid />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Need Custom Courseware?"
      subtext="Partner with eQOURSE for scalable, ISO-certified content development spanning K-12 to Higher Ed. Start with a free pilot to evaluate our pedagogical quality."
      ctaText="Get Free Consultation"
    />
  </EdTechLayout>
);

export default CustomElearningPage;
