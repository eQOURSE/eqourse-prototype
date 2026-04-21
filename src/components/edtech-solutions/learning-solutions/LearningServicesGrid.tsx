import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { Presentation, Building2, Layout, Gamepad2, Brain, Network, Glasses, CircuitBoard, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Presentation,
    title: "ILT (Instructor-Led Training)",
    description: "Comprehensive ILT content to support live, instructor-led sessions with interactive visual materials and facilitator guides.",
    link: "/edtech-solutions/learning-solutions/ilt"
  },
  {
    icon: Building2,
    title: "Corporate E-learning Solutions",
    description: "Scalable e-learning modules for businesses covering onboarding, upskilling, and crucial compliance training.",
    link: "/edtech-solutions/learning-solutions/corporate-elearning"
  },
  {
    icon: Layout,
    title: "Training Modules",
    description: "Interactive and engaging training modules strictly aligned with specific, measurable learning objectives.",
    link: "/edtech-solutions/learning-solutions/training-modules"
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Gamification elements including rewards, points, badges, and leaderboards for fun and effective engagement.",
    link: "/edtech-solutions/learning-solutions/gamified-learning"
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "AI-driven content paths that automatically adapt to individual learner pace, mastery, and performance.",
    link: "/edtech-solutions/learning-solutions/adaptive-learning"
  },
  {
    icon: Network,
    title: "Blended Learning",
    description: "Combining online asynchronous and offline synchronous learning models for flexible, comprehensive education.",
    link: "/edtech-solutions/learning-solutions/blended-learning"
  },
  {
    icon: Glasses,
    title: "Immersive Simulation AR/VR",
    description: "Augmented and virtual reality experiences for risk-free, hands-on immersive practical learning.",
    link: "/edtech-solutions/learning-solutions/ar-vr"
  },
  {
    icon: CircuitBoard,
    title: "Instructional Design",
    description: "Expert instructional design services utilizing ADDIE and SAM methodologies for effective content structuring.",
    link: "/edtech-solutions/learning-solutions/instructional-design"
  },
  {
    icon: Lightbulb,
    title: "Optimizing AI-Powered Learning",
    description: "Enhancing traditional content with AI for hyper-personalised learning paths and maximum learner impact.",
    link: "/edtech-solutions/learning-solutions/ai-powered-learning"
  }
];

const LearningServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Our Service Verticals"
          title="Innovative Learning"
          gradientText="Solutions"
          subtitle="Explore our comprehensive suite of advanced learning methodologies tailored for modern learners."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col rounded-2xl bg-card border border-border/60 p-8 hover:shadow-card hover:border-primary/40 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gradient-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground leading-tight">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                <span className="inline-flex items-center text-xs font-semibold text-primary gap-2 mt-auto group-hover:gap-3 transition-all uppercase tracking-wider">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningServicesGrid;
