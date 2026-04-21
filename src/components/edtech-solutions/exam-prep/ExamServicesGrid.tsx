import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { PenTool, Target, TestTube, ArrowRight, PenSquare, Headphones, FileText, LayoutList, Building, Globe } from "lucide-react";

const services = [
  {
    icon: Building,
    title: "APTIS Prep Content",
    description: "British Council APTIS exam preparation spanning grammar, vocabulary, reading, and speaking.",
    link: "/edtech-solutions/exam-preparation-content/aptis"
  },
  {
    icon: Headphones,
    title: "TOEIC Prep Content",
    description: "TOEIC Listening & Reading and Speaking & Writing preparation materials designed for global professionals.",
    link: "/edtech-solutions/exam-preparation-content/toeic"
  },
  {
    icon: FileText,
    title: "SAT Prep Content",
    description: "SAT Math and Evidence-Based Reading & Writing preparation mirroring the latest digital SAT format.",
    link: "/edtech-solutions/exam-preparation-content/sat"
  },
  {
    icon: TestTube,
    title: "ACT Prep Content",
    description: "Comprehensive ACT English, Math, Reading, and Science preparation for high school students.",
    link: "/edtech-solutions/exam-preparation-content/act"
  },
  {
    icon: LayoutList,
    title: "AP Exam Prep Content",
    description: "Advanced Placement exam preparation across multiple subject domains to earn college credit.",
    link: "/edtech-solutions/exam-preparation-content/ap-exam"
  },
  {
    icon: Globe,
    title: "IELTS Prep Content",
    description: "IELTS Academic and General Training preparation targeting Band 7+ outcomes globally.",
    link: "/edtech-solutions/exam-preparation-content/ielts"
  },
  {
    icon: Target,
    title: "CEFR Placement Testing",
    description: "CEFR-aligned placement testing and assessment frameworks for structured language evaluation.",
    link: "/edtech-solutions/exam-preparation-content/cefr"
  },
  {
    icon: PenSquare,
    title: "PTE Prep Content",
    description: "PTE Academic exam preparation materials focused on integrated speaking and writing skills.",
    link: "/edtech-solutions/exam-preparation-content/pte"
  },
  {
    icon: PenTool,
    title: "TOEFL Prep Content",
    description: "TOEFL iBT exam preparation across reading, listening, speaking, and writing sections.",
    link: "/edtech-solutions/exam-preparation-content/toefl"
  }
];

const ExamServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Test Prep Offerings"
          title="Exam Preparation"
          gradientText="Services"
          subtitle="Curated, highly accurate preparation materials for globally recognized standardized tests."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
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
                  View Service <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExamServicesGrid;
