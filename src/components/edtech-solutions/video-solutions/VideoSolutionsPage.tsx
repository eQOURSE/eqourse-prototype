import EdTechLayout from "../shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import VideoServicesGrid from "./VideoServicesGrid";

const faqs = [
  {
    question: "What types of e-learning videos do you produce?",
    answer: "We produce 2D and 3D animated educational videos, PPT-based video lessons with professional voice-over, Articulate Storyline interactive courses, and custom animated explainer videos designed for both K12 and corporate instruction."
  },
  {
    question: "Can you produce videos in multiple languages?",
    answer: "Yes. We offer fully integrated voice-over, dubbing, and subtitling in 30+ international and regional languages to make your video content naturally accessible globally."
  }
];

const VideoSolutionsPage = () => (
  <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: "E-Learning Video Solutions" }]}>
    <SEOHead
      title="E-Learning Video Solutions & Interactive Animation | eQOURSE"
      description="Transform complex concepts into engaging visual learning experiences. 2D/3D animation, Articulate Storyline courses, and interactive video production."
      canonical="https://eqourse.com/edtech-solutions/elearning-video-solutions"
      keywords="elearning video solutions, educational animation, 2d 3d videos, articulate storyline, explainer videos, educational video production"
    />

    <ServiceHero
      preHeadline="Enhance Learning with Interactive eLearning Videos"
      headline="E-Learning Video"
      headlineAccent="Solutions"
      subtext="Transform complex concepts into engaging visual learning experiences with our professional video production services. Scale visual knowledge transfer effectively."
      ctaText="Request Video Samples"
      ctaLink="#contact"
    />

    <ServiceNarrativeSection
      label="Visual Learning"
      title="Capture Attention."
      gradientText="Boost Retention."
      description="Dynamic visual media increases recall rates by up to 65% compared to text-only alternatives."
      paragraphs={[
        "Modern educational efficacy relies heavily on engaging modalities. From rich 2D and 3D animations that visualize atomic structures seamlessly, to interactive Articulate Storyline courses requiring constant learner inputs.",
        "Our dedicated multimedia production studio creates video solutions that make complex learning accessible, memorable, and scalable across web, mobile, and LMS platforms. We handle the entire pipeline: scriptwriting, storyboarding, animation, voice-over, and SCORM packaging."
      ]}
      bullets={[
        "In-house studio spanning 2D, 3D, and interactive HTML5 development",
        "Rigorous storyboarding process ensuring strict pedagogical alignment",
        "Multilingual audio integration natively synchronized (30+ languages)"
      ]}
      stats={[
        { value: "4X", label: "Better Recall" },
        { value: "3D", label: "Modeling" },
        { value: "30+", label: "VO Languages" },
        { value: "SCORM", label: "Compliant" }
      ]}
      panelTitle="Production Flow Timeline"
      panelSubtitle="Typical distribution of our video creation pipeline."
      bars={[
        { label: "Instructional Scripting", value: 20 },
        { label: "Visual Storyboarding", value: 25 },
        { label: "Animation & Production", value: 40 },
        { label: "QA & Integration QA", value: 15 }
      ]}
      dark
    />

    <VideoServicesGrid />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Ready to Visualize Your Content?"
      subtext="Whether you need a single explainer video or a complete animated series for a K-12 curriculum, our studio is ready."
      ctaText="Get Free Consultation"
    />
  </EdTechLayout>
);

export default VideoSolutionsPage;
