import EdTechLayout from "../shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import LearningServicesGrid from "./LearningServicesGrid";

const faqs = [
  {
    question: "What learning solutions do you offer?",
    answer: "We offer Instructor-Led Training (ILT) content, corporate e-learning, training modules, gamified learning, adaptive learning, blended learning, AR/VR immersive simulations, instructional design logic, and AI-powered learning optimisation."
  },
  {
    question: "Do your solutions integrate with LMS platforms?",
    answer: "Yes. All our learning content is developed and delivered in LMS-compatible formats including SCORM (1.2 and 2004), xAPI (Tin Can), and cmi5, allowing seamless deployment on almost any standard platform."
  }
];

const LearningSolutionsPage = () => (
  <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: "Learning Solutions" }]}>
    <SEOHead
      title="Innovative Learning Solutions & Corporate Training | eQOURSE"
      description="Custom learning solutions for educational institutions and corporate training. ILT, gamified learning, AR/VR simulations, and adaptive e-learning modules."
      canonical="https://eqourse.com/edtech-solutions/learning-solutions"
      keywords="learning solutions, corporate training, ILT content, gamified learning, adaptive e-learning, AR/VR learning, instructional design"
    />

    <ServiceHero
      preHeadline="Innovative Learning Solutions for Education & Training"
      headline="Learning Solutions for"
      headlineAccent="Institutions & Enterprise"
      subtext="Implement modern Instructor-Led Training (ILT), interactive e-learning, or cutting-edge AR/VR technologies customized to improve learner engagement, retention, and performance."
      ctaText="Start Your Free Pilot"
      ctaLink="/free-pilot"
    />

    <ServiceNarrativeSection
      label="Modern Engagement"
      title="Rethink How "
      gradientText="Knowledge Transfers"
      description="Modern learning necessitates moving beyond passive reading toward active, experiential problem solving."
      paragraphs={[
        "At eQOURSE, a wide range of custom experiential learning solutions is offered to meet the unique needs of diverse educational institutions and corporate training entities.",
        "Whether it involves modernizing traditional Instructor-Led Training (ILT) with rich interactive assets, building scalable asynchronous e-learning, or deploying cutting-edge technologies like AR/VR simulations, our solutions are meticulously customized to improve both cognitive retention and practical performance."
      ]}
      bullets={[
        "Cognitive-load optimized instructional design across all modules",
        "Seamless integration natively with your Learning Management Systems (LMS)",
        "Scalable architectures perfect for wide-scale corporate deployments"
      ]}
      stats={[
        { value: "40%", label: "Better Retention" },
        { value: "LMS", label: "Ready Formats" },
        { value: "AR/VR", label: "Simulations" },
        { value: "100%", label: "Customizable" }
      ]}
      panelTitle="Framework Integration"
      panelSubtitle="Pedagogical models we embed within our systems."
      bars={[
        { label: "ADDIE Model Implementation", value: 98 },
        { label: "Bloom's Taxonomy Alignment", value: 95 },
        { label: "Gagne's 9 Events Support", value: 92 },
        { label: "Microlearning Capabilities", value: 96 }
      ]}
    />

    <LearningServicesGrid />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Transform Your Training Ecosystem"
      subtext="Engage your learners with gamified, adaptive, or AR-enhanced learning pathways designed by eQOURSE instructional experts."
      ctaText="Get Free Consultation"
    />
  </EdTechLayout>
);

export default LearningSolutionsPage;
