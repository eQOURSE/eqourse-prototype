import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CheckCircle2 } from "lucide-react";

const EmSATSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, hsl(170 82% 50%) 1px, transparent 1px), linear-gradient(to bottom, hsl(170 82% 50%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto reveal-up ${isVisible ? "visible" : ""}`}>
          
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-3xl glass-dark border border-primary/20 p-8 shadow-elevated relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
              <h3 className="font-heading text-2xl font-bold text-white mb-6">EmSAT Delivery Modules</h3>
              
              <div className="space-y-4">
                {[
                  "Computer-Based Assessment Structures",
                  "Modular Study Guides & Checkpoints",
                  "Natives-Level Arabic / English Alignment",
                  "Scoring Rubric Replication",
                  "Adaptive Item Difficulty Models"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-accent">Specialized Offering</span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              High-Quality <span className="text-gradient hover:text-cyan-300">EmSAT Exam</span> Content
            </h2>
            
            <p className="text-white/75 text-lg leading-relaxed mb-6">
              We provide premier content development services for the EmSAT (Emirates Standardized Test), delivering engaging and impactful standard-aligned materials for UAE educational institutions.
            </p>
            
            <p className="text-white/75 text-lg leading-relaxed">
              Strictly aligned with EmSAT requirements, our modular, computer-based resources include localized study guides, structured preparation frameworks, and authentic assessment modules that mirror the actual testing environment.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmSATSection;
