import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { 
  Brain, 
  ClipboardCheck, 
  UserCheck, 
  Layout, 
  GraduationCap, 
  Map, 
  Laptop, 
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psychometric Assessments",
    description: "Develop structured psychometric assessment content, scoring logic, reporting structures, validity evidence, reliability analysis and test-construction support.",
    link: "/psychometric-assessments",
    color: "hsl(170 82% 45%)"
  },
  {
    icon: ClipboardCheck,
    title: "Skill Assessments",
    description: "Create competency-mapped test items, practical task scenarios, scoring rubrics and review-ready assessment documentation for digital or blended evaluation.",
    link: "/skill-assessments",
    color: "hsl(280 80% 65%)"
  },
  {
    icon: UserCheck,
    title: "Candidate Evaluation",
    description: "Build B2B candidate evaluation content and assessment support for screening, pre-hiring workflows and behavioural review models.",
    link: "/candidate-evaluation",
    color: "hsl(210 100% 60%)"
  },
  {
    icon: Layout,
    title: "Competency Frameworks",
    description: "Build role-based competency frameworks, dictionaries and role architecture maps for structured workforce assessment and L&D planning.",
    link: "/competency-frameworks",
    color: "hsl(350 80% 60%)"
  },
  {
    icon: GraduationCap,
    title: "Learning Readiness",
    description: "Develop learning readiness assessments, pathway readiness evaluations and skill gap analysis resources for global workforce and education programmes.",
    link: "/learning-readiness",
    color: "hsl(45 90% 50%)"
  },
  {
    icon: Map,
    title: "Organizational Diagnostics",
    description: "Workforce capability mapping, capability assessment, skill benchmarking, job role benchmarking and training needs analysis support.",
    link: "/organizational-diagnostics",
    color: "hsl(140 70% 45%)"
  },
  {
    icon: Laptop,
    title: "Digital Assessment Infrastructure",
    description: "Scalable digital assessment content, item-bank workflows and remote proctoring process support for online talent evaluation programmes.",
    link: "/digital-assessment-infrastructure",
    color: "hsl(190 90% 50%)"
  }
];

const TalentAssessmentServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Assessment Architecture"
          title="Talent Assessment & Workforce Evaluation"
          gradientText="Capabilities"
          subtitle="Explore our modular services for psychometrics, skill assessments, candidate screening, competency mapping, learning readiness and capability diagnostics."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col p-8 rounded-3xl bg-card border border-border/60 hover:shadow-elevated transition-all duration-300 reveal-up relative overflow-hidden text-center items-center ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Accent glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                  style={{ background: `radial-gradient(circle at 50% 100%, ${service.color}, transparent 70%)` }} 
                />

                <div 
                  className="w-16 h-16 rounded-[2rem] rounded-tr-md flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-all duration-300 shadow-sm relative z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:-z-10 bg-card"
                  style={{ borderColor: `${service.color}40`, color: service.color }}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <div className="flex flex-col h-full relative z-10">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{service.description}</p>
                  <span 
                    className="inline-flex items-center text-sm font-semibold gap-2 mt-auto group-hover:gap-3 transition-all uppercase tracking-wider mx-auto"
                    style={{ color: service.color }}
                  >
                    Explore Service <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TalentAssessmentServicesGrid;
