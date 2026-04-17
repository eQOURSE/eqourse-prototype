import { Mic, MessageSquare, Eye, Rocket, Building2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const audiences = [
  {
    icon: Mic,
    title: "Voice AI Teams",
    description: "ASR, TTS, and voice assistant teams needing real-world accent, dialect, and noise testing.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description: "Chatbot and virtual assistant builders who need multi-turn, intent-diverse evaluation.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "CV teams testing object detection, segmentation, and classification in wild conditions.",
  },
  {
    icon: Rocket,
    title: "AI Startups",
    description: "Early-stage teams needing to validate model quality quickly without building internal QA infrastructure.",
  },
  {
    icon: Building2,
    title: "Enterprise AI",
    description: "Large organizations requiring compliance-ready testing, audit trails, and SLA-backed quality guarantees.",
  },
];

const WhoThisIsFor = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Who This Is For"
          title="Built for Teams"
          gradientText="Like Yours"
          subtitle="Whether you're a startup shipping your first model or an enterprise scaling production AI."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {audiences.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className={`group text-center p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2">{aud.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{aud.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsFor;
