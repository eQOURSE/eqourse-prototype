import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const QualityFramework = () => {
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
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Quality Assurance"
          title="Multi-Tier QA"
          gradientText="Framework"
          subtitle="Rigorous quality controls at every stage ensure production-grade accuracy."
          light
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* IAA Card */}
          <div className={`rounded-2xl p-8 glass-dark text-center hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}>
            {/* Circular gauge */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="52" stroke="hsl(170 82% 32% / 0.2)" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="hsl(170 82% 50%)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52 * 0.80} ${2 * Math.PI * 52 * 0.20}`}
                  transform="rotate(-90 60 60)"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDuration: "1.5s" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-heading font-extrabold text-primary">≥ 0.80</span>
              </div>
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">Inter-Annotator Agreement</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Multiple annotators label the same data. IAA scores of 0.80+ ensure consistency and reliability across all projects.
            </p>
          </div>

          {/* Honeypot Card */}
          <div className={`rounded-2xl p-8 glass-dark text-center hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Honeycomb pattern */}
                {[
                  [60, 35], [40, 50], [80, 50],
                  [60, 65], [40, 80], [80, 80],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <polygon
                      points={`${cx},${cy - 12} ${cx + 10},${cy - 6} ${cx + 10},${cy + 6} ${cx},${cy + 12} ${cx - 10},${cy + 6} ${cx - 10},${cy - 6}`}
                      fill={i < 1 ? "hsl(170 82% 50% / 0.3)" : "hsl(170 82% 32% / 0.15)"}
                      stroke="hsl(170 82% 45% / 0.3)"
                      strokeWidth="1"
                    />
                  </g>
                ))}
                {/* Highlight one cell */}
                <text x="60" y="40" textAnchor="middle" fill="hsl(165 75% 71%)" fontSize="10" fontWeight="bold">?</text>
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">Honeypot Validation</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              15-20% of tasks are pre-labeled gold-standard items. Annotators who fail honeypot checks are flagged for retraining or removal.
            </p>
          </div>

          {/* Multi-tier QA Card */}
          <div className={`rounded-2xl p-8 glass-dark text-center hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* 4-tier ladder */}
                {[
                  { y: 90, w: 80, label: "Auto QA", opacity: 0.15 },
                  { y: 68, w: 65, label: "Peer Review", opacity: 0.2 },
                  { y: 46, w: 50, label: "Expert Audit", opacity: 0.25 },
                  { y: 24, w: 35, label: "Gold Standard", opacity: 0.35 },
                ].map((tier, i) => (
                  <g key={i}>
                    <rect
                      x={60 - tier.w / 2}
                      y={tier.y}
                      width={tier.w}
                      height="18"
                      rx="4"
                      fill={`hsl(170 82% 50% / ${tier.opacity})`}
                      stroke="hsl(170 82% 45% / 0.3)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y={tier.y + 12}
                      textAnchor="middle"
                      fill="hsl(0 0% 100% / 0.7)"
                      fontSize="7"
                      fontWeight="600"
                    >
                      {tier.label}
                    </text>
                  </g>
                ))}
                {/* Arrow */}
                <path d="M60 108 L60 15" stroke="hsl(170 82% 45% / 0.2)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">4-Tier QA Pipeline</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Automated checks, peer review, expert audit, and gold-standard comparison create layered quality assurance delivering 98%+ accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityFramework;
