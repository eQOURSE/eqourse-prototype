import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Film, Clapperboard, PenTool, BarChart3 } from "lucide-react";

const Videos2D3DPage = () => (
  <SubServicePageTemplate
    seoTitle="2D & 3D Educational Video Solutions | eQOURSE"
    seoDescription="Professional 2D and 3D animated educational video production for K-12 and higher education. Complex concepts made visual and engaging through animation."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/2d-3d-videos"
    seoKeywords="2D animation, 3D animation, educational videos, animated explainers, whiteboard animation, motion graphics"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="2D & 3D Videos"
    preHeadline="Professional 2D & 3D Educational Video Production"
    headline="2D & 3D Educational"
    headlineAccent="Video Solutions"
    subtext="Transform complex educational concepts into visually engaging 2D and 3D animated videos. Our professional animation team creates curriculum-aligned educational videos that make learning accessible, memorable, and enjoyable for students across K-12 and higher education."
    introLabel="Visual Storytelling"
    introTitle="Concepts Made"
    introGradient="Visual"
    introDescription="Animation brings abstract concepts to life, making learning more intuitive and memorable for learners of all ages."
    introParagraphs={["From character-driven 2D stories to complex 3D molecular structures, our production team handles the entire pipeline: scripting, storyboarding, animation, voice-over, and final delivery."]}
    servicesLabel="Animation Types"
    servicesTitle="Video Production"
    servicesGradient="Services"
    services={[
      { icon: Film, title: "2D Animated Explainer Videos", description: "Character-driven 2D animations explaining concepts in science, math, language, and social studies." },
      { icon: Clapperboard, title: "3D Animated Educational Videos", description: "Three-dimensional animations for complex topics like molecular structures, anatomy, physics simulations, and engineering concepts." },
      { icon: PenTool, title: "Whiteboard Animation Videos", description: "Engaging whiteboard-style animations for step-by-step explanations and tutorials." },
      { icon: BarChart3, title: "Motion Graphics", description: "Data-driven motion graphics for statistics, processes, and abstract concept visualization." },
    ]}
    ctaHeadline="Bring Your Content to Life"
    ctaSubtext="Transform complex concepts into visually stunning animated videos. Request samples from our animation studio."
    ctaButtonText="Request Video Samples"
    relatedPages={[
      { title: "E-Book Creation", href: "/edtech-solutions/custom-e-learning-content/ebook-creation" },
      { title: "STEM Curriculum", href: "/edtech-solutions/custom-e-learning-content/stem-curriculum-services" },
      { title: "E-Learning Video Solutions", href: "/edtech-solutions/elearning-video-solutions" },
    ]}
  />
);

export default Videos2D3DPage;
