import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { Languages, Mic, Captions, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Languages,
    title: "Content Translation",
    description: "Expert translation services ensuring supreme pedagogical accuracy and cultural relevance across India's diverse linguistic groups.",
    link: "/edtech-solutions/localization-services/translation",
    color: "hsl(170 82% 45%)"
  },
  {
    icon: Mic,
    title: "Voice Over",
    description: "Professional native voice-over services bringing e-learning modules to life with engaging, authentic narration for regional audiences.",
    link: "/edtech-solutions/localization-services/voice-over",
    color: "hsl(280 80% 65%)"
  },
  {
    icon: Captions,
    title: "Subtitling",
    description: "Accurate, well-timed, and localized subtitles for video content, drastically enhancing accessibility across different geographical regions.",
    link: "/edtech-solutions/localization-services/subtitling",
    color: "hsl(210 100% 60%)"
  }
];

const LocalizationServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Our Capabilities"
          title="Localization"
          gradientText="Services"
          subtitle="Specialized linguistic adaptation ensuring your content resonates flawlessly with native speakers."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col p-8 rounded-3xl bg-card border border-border/60 hover:shadow-elevated transition-all duration-300 reveal-up relative overflow-hidden text-center items-center ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
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
                    View Details <ArrowRight className="w-4 h-4" />
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

export default LocalizationServicesGrid;
