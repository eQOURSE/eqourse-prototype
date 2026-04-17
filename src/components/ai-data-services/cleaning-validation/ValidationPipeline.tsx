import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const tiers = [
  {
    level: "Tier 1",
    title: "Automated Rules",
    description: "Schema validation, format checks, range constraints, regex patterns, and duplicate detection run on every record.",
    percentage: "100%",
    color: "hsl(170 82% 45%)",
    opacity: 0.15,
  },
  {
    level: "Tier 2",
    title: "Gold Standard Comparison",
    description: "Random samples compared against pre-labeled gold-standard data. Statistical analysis ensures accuracy meets thresholds.",
    percentage: "20%",
    color: "hsl(170 82% 50%)",
    opacity: 0.25,
  },
  {
    level: "Tier 3",
    title: "Expert Human Review",
    description: "Domain experts audit edge cases, ambiguous labels, and high-complexity records. Final sign-off before delivery.",
    percentage: "98%+",
    color: "hsl(165 75% 71%)",
    opacity: 0.35,
  },
];

const ValidationPipeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Validation Pipeline"
          title="3-Tier Quality"
          gradientText="Guarantee"
          subtitle="Every dataset passes through automated, statistical, and human validation before delivery."
          light
        />

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Funnel visualization */}
          <div className="flex flex-col items-center gap-6">
            {tiers.map((tier, i) => {
              const widthPercent = 100 - i * 15;
              return (
                <div
                  key={tier.level}
                  className={`w-full reveal-up ${isVisible ? "visible" : ""}`}
                  style={{ maxWidth: `${widthPercent}%`, transitionDelay: `${i * 0.2}s` }}
                >
                  <div
                    className="rounded-2xl p-6 md:p-8 glass-dark hover:border-primary/30 transition-all duration-300 relative"
                  >
                    {/* Level badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                        >
                          {tier.level}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-white">{tier.title}</h3>
                      </div>
                      <span className="text-2xl font-heading font-extrabold text-primary">{tier.percentage}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{tier.description}</p>

                    {/* Connecting arrow */}
                    {i < tiers.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                        <svg viewBox="0 0 24 16" className="w-6 h-4 text-primary/40">
                          <path d="M4 2 L12 14 L20 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Result badge */}
            <div className={`mt-4 px-8 py-4 rounded-full glass-dark border border-primary/30 reveal-scale ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.6s" }}>
              <span className="text-primary font-heading font-bold text-lg">98%+ Accuracy Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValidationPipeline;
