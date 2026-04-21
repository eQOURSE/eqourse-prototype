import { MessageSquare, LayoutTemplate, PenTool, Globe, PackageCheck, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const steps = [
  {
    icon: MessageSquare,
    title: "Step 1 — Consult",
    desc: "We assess your educational goals, audience, curriculum framework, and platform requirements.",
    delay: "0ms"
  },
  {
    icon: LayoutTemplate,
    title: "Step 2 — Design",
    desc: "Our instructional designers create curriculum maps, content outlines, and assessment blueprints.",
    delay: "150ms"
  },
  {
    icon: PenTool,
    title: "Step 3 — Develop",
    desc: "Our 200+ SMEs produce K-12 content, video lessons, assessments, and interactive materials.",
    delay: "300ms"
  },
  {
    icon: Globe,
    title: "Step 4 — Localize",
    desc: "Content is translated, voice-overed, and subtitled for your target languages and regions.",
    delay: "450ms"
  },
  {
    icon: PackageCheck,
    title: "Step 5 — Deliver",
    desc: "Final content is packaged for your LMS, tested for quality, and delivered with ongoing support.",
    delay: "600ms"
  }
];

const DeliveryProcess = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="How It Works"
          title="Our 5-Step EdTech"
          gradientText="Delivery Process"
          subtitle="A structured, ISO-certified approach that ensures your educational content is delivered on time, securely, and seamlessly."
        />

        <div ref={ref} className="relative mt-20 max-w-5xl mx-auto">
          {/* Animated Connecting Timeline */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-muted overflow-hidden rounded-full">
            <div 
              className="h-full bg-gradient-primary w-full origin-left"
              style={{
                transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s"
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.title}
                  className={`relative flex flex-col items-center text-center group reveal-up ${isVisible ? "visible" : ""}`}
                  style={{ transitionDelay: step.delay }}
                >
                  <div className="w-24 h-24 rounded-[2rem] rounded-tr-md bg-card border-[3px] border-background shadow-elevated flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-soft transition-all duration-300 relative z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-primary/20 before:-z-10">
                    <Icon className="w-10 h-10 text-primary" />
                    
                    {/* Play icon overlay on hover for a dynamic feel */}
                    <div className="absolute inset-0 bg-primary/95 text-white rounded-[inherit] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                  </div>
                  
                  <h3 className="font-heading font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
