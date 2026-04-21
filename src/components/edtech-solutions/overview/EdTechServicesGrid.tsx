import { BookOpen, MonitorPlay, Pencil, Globe, Laptop, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const services = [
  {
    icon: Pencil,
    title: "Custom E-Learning Content",
    description: "K-12 and higher ed content including study materials, workbooks, STEM, quizzes, and e-books aligned to global standards.",
    link: "/edtech-solutions/custom-e-learning-content",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: BookOpen,
    title: "Exam Preparation Content",
    description: "Expert-designed test prep for SAT, ACT, AP, IELTS, TOEFL, IIT-JEE, NEET, UPSC, and more.",
    link: "/edtech-solutions/exam-preparation-content",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: MonitorPlay,
    title: "Learning Solutions",
    description: "ILT content, corporate e-learning, gamified learning, AR/VR simulations, and AI-powered learning optimization.",
    link: "/edtech-solutions/learning-solutions",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: Globe,
    title: "Localization Services",
    description: "Content translation, professional voice-over, and subtitling in Hindi, English, and 30+ regional languages.",
    link: "/edtech-solutions/localization-services",
    gradient: "from-rose-500/20 to-red-500/10",
  },
  {
    icon: Laptop,
    title: "Technology Solutions",
    description: "LMS course builds (SCORM, xAPI, cmi5) and white-label LMS setup for seamless content delivery.",
    link: "/edtech-solutions/technology-solutions",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Users,
    title: "Subject Matter Experts",
    description: "Tutor and SME recruitment, training, certification, and live online tutoring services across STEM.",
    link: "/edtech-solutions/subject-matter-experts",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
];

const EdTechServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Services"
          title="End-to-End EdTech"
          gradientText="Solutions"
          subtitle="Seven integrated capabilities. One trusted partner for your entire EdTech journey."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group relative rounded-3xl overflow-hidden neon-card border border-border/50 p-8 block reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40`} />
                {/* Dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full h-[220px]">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-soft">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-sm font-semibold text-primary gap-2 group-hover:gap-3 transition-all">
                      Explore More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EdTechServicesGrid;
