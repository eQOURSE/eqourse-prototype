import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";
import { Clapperboard, MonitorPlay, MousePointerClick, Video, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Clapperboard,
    title: "2D & 3D Videos",
    description: "Educational animated videos bringing complex academic concepts to life through professional 2D and 3D narrative animation.",
    link: "/edtech-solutions/elearning-video-solutions/2d-3d-videos",
    color: "hsl(170 82% 55%)"
  },
  {
    icon: MonitorPlay,
    title: "PPT Video Lessons",
    description: "PowerPoint-based video lessons expertly synchronized with professional voice-over and visual enhancements for efficient delivery.",
    link: "/edtech-solutions/elearning-video-solutions/ppt-videos",
    color: "hsl(210 100% 65%)"
  },
  {
    icon: MousePointerClick,
    title: "Articulate Storyline",
    description: "Highly interactive e-learning courses built with Articulate Storyline for rich, non-linear, engaging learning experiences.",
    link: "/edtech-solutions/elearning-video-solutions/articulate-storyline",
    color: "hsl(280 80% 65%)"
  },
  {
    icon: Video,
    title: "Animated Explainers",
    description: "Custom animated explainer short videos for micro-educational concepts, product tutorials, and corporate training modules.",
    link: "/edtech-solutions/elearning-video-solutions/animated-videos",
    color: "hsl(35 100% 60%)"
  }
];

const VideoServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Visual Production"
          title="Video Solutions"
          gradientText="We Offer"
          subtitle="Explore our specialized visual production capabilities designed specifically for educational outcomes."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-card border border-border/60 hover:shadow-elevated transition-all duration-300 reveal-up relative overflow-hidden ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 2) * 100}ms` }}
              >
                {/* Accent glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                  style={{ background: `radial-gradient(circle at 100% 0%, ${service.color}, transparent 60%)` }} 
                />

                <div className="shrink-0">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:-rotate-6 transition-all duration-300 shadow-sm"
                    style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: service.color }} />
                  </div>
                </div>

                <div className="flex flex-col h-full relative z-10">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{service.description}</p>
                  <span 
                    className="inline-flex items-center text-sm font-semibold gap-2 mt-auto group-hover:gap-3 transition-all uppercase tracking-wider"
                    style={{ color: service.color }}
                  >
                    Watch Samples <ArrowRight className="w-4 h-4" />
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

export default VideoServicesGrid;
