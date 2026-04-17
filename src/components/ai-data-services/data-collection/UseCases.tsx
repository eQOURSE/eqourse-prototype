import { Mic, Volume2, ScanLine, Car, Brain, Eye, MessageSquare } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const useCases = [
  { icon: Mic, title: "Speech AI / ASR", description: "Transcription training data with accent and dialect coverage." },
  { icon: Volume2, title: "Text-to-Speech", description: "High-fidelity voice recordings for natural-sounding TTS models." },
  { icon: ScanLine, title: "OCR & Document AI", description: "Scanned documents, forms, and handwriting for text extraction." },
  { icon: Car, title: "Autonomous Driving", description: "Multi-sensor data: camera, LiDAR, radar for self-driving systems." },
  { icon: Brain, title: "LLM Fine-Tuning", description: "Instruction-response pairs, RLHF data, and domain corpora." },
  { icon: Eye, title: "Computer Vision", description: "Object detection, segmentation, and classification image sets." },
  { icon: MessageSquare, title: "Conversational AI", description: "Multi-turn dialogue, intent data, and entity-rich conversations." },
];

const UseCases = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Use Cases"
          title="Data for Every"
          gradientText="AI Application"
          subtitle="Purpose-built datasets for the most demanding AI use cases across industries."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className={`group text-center p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""} ${i === useCases.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2">{uc.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{uc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
