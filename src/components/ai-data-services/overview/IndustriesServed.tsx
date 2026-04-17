import { Mic, Car, MessageSquare, Stethoscope, Banknote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const industries = [
  {
    icon: Mic,
    title: "Voice & Speech AI",
    description: "ASR, TTS, and voice assistants across 30+ languages and regional dialects.",
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    description: "LiDAR point cloud, traffic sign, pedestrian, and road scene annotation at scale.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description: "Intent classification, entity extraction, dialogue flow, and multi-turn training data.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Med AI",
    description: "Medical imaging annotation, clinical NLP, and patient data processing with HIPAA compliance.",
  },
  {
    icon: Banknote,
    title: "FinTech & Banking",
    description: "Document extraction, fraud detection datasets, sentiment analysis for financial texts.",
  },
];

const IndustriesServed = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Industries"
          title="Industries We"
          gradientText="Serve"
          subtitle="Powering AI innovation across sectors with domain-specific data expertise."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className={`group text-center p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2">{industry.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
