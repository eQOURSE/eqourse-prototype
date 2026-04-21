import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { HardDrive, Server, ArrowRight } from "lucide-react";

const services = [
  {
    icon: HardDrive,
    title: "LMS Course Builds",
    description: "Developing robust content specifically tailored for leading Learning Management Systems (LMS), utilizing industry standards such as SCORM, xAPI, and cmi5 to ensure flawless integration and tracking.",
    link: "/edtech-solutions/technology-solutions/lms-course-builds",
    gradient: "from-blue-500/20 to-cyan-500/10"
  },
  {
    icon: Server,
    title: "White Label LMS",
    description: "Configuring incredibly scalable, cost-effective white-label Learning Management Systems built primarily on the robust Open edX platform and seamlessly hosted on AWS for supreme reliability.",
    link: "/edtech-solutions/technology-solutions/white-label-lms",
    gradient: "from-emerald-500/20 to-teal-500/10"
  }
];

const TechServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Our Tech Stack"
          title="Technology Deployment"
          gradientText="Solutions"
          subtitle="Enterprise-grade architecture for modern educational platforms."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group relative rounded-3xl overflow-hidden glass border border-border/60 hover:shadow-elevated transition-all duration-300 p-10 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary gap-2 mt-auto group-hover:gap-3 transition-all uppercase tracking-wider">
                    Learn More About This <ArrowRight className="w-4 h-4" />
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

export default TechServicesGrid;
