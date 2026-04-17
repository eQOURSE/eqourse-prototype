import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const comparisons = [
  { benchmark: "Scripted test cases", realWorld: "Unpredictable user behavior" },
  { benchmark: "Clean lab audio", realWorld: "Noisy, accented, multi-speaker audio" },
  { benchmark: "Standard English", realWorld: "Code-switching, slang, dialects" },
  { benchmark: "Single-turn prompts", realWorld: "Multi-turn context with memory" },
  { benchmark: "Balanced test sets", realWorld: "Long-tail, skewed distributions" },
  { benchmark: "Known edge cases", realWorld: "Unknown unknowns" },
];

const WhyBenchmarksFail = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="The Problem"
          title="Why Benchmarks"
          gradientText="Aren't Enough"
          subtitle="Lab benchmarks look great on paper. But real-world performance is a different story."
        />

        <div ref={ref} className="max-w-3xl mx-auto">
          {/* Header row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Benchmark Testing</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Real-World Testing</span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-3">
            {comparisons.map((comp, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 gap-4 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">{comp.benchmark}</p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="text-sm text-foreground font-medium">{comp.realWorld}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom callout */}
          <div className={`mt-8 text-center reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
            <p className="text-muted-foreground text-sm">
              Your model needs testing against <span className="text-primary font-semibold">real users, real accents, real edge cases</span> — not just sanitized benchmarks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBenchmarksFail;
