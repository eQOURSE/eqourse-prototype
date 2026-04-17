import { GitCompare, Languages, BarChart3, Heart, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const capabilities = [
  {
    icon: GitCompare,
    title: "A/B Testing",
    description: "Side-by-side model comparison with real users. Measure preference, accuracy, latency, and user satisfaction across variants.",
  },
  {
    icon: Languages,
    title: "Dialect & Accent Audits",
    description: "Test your model against 30+ language variants, regional dialects, and accent groups to find performance gaps before they reach production.",
  },
  {
    icon: BarChart3,
    title: "WER / CER Measurement",
    description: "Word Error Rate and Character Error Rate benchmarking for ASR models across controlled and noisy environments.",
  },
  {
    icon: Heart,
    title: "Sentiment & Intent Analysis",
    description: "Evaluate how well your model detects sentiment, intent, and emotional tone across diverse user demographics and contexts.",
  },
  {
    icon: Search,
    title: "Edge Case Discovery",
    description: "Systematic probing to uncover failure modes: adversarial inputs, boundary conditions, multi-turn confusion, and contextual breakdowns.",
  },
];

const TestingCapabilities = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Testing Capabilities"
          title="How We Test"
          gradientText="Your Models"
          subtitle="Five specialized testing methodologies that go beyond benchmarks to measure real-world readiness."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`group p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300 reveal-up ${isVisible ? "visible" : ""} ${i === capabilities.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cap.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestingCapabilities;
