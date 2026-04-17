import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const loopNodes = [
  { label: "Deploy Model", angle: 0 },
  { label: "Real-User Testing", angle: 51.4 },
  { label: "Collect Feedback", angle: 102.8 },
  { label: "Analyze Gaps", angle: 154.3 },
  { label: "Curate New Data", angle: 205.7 },
  { label: "Retrain Model", angle: 257.1 },
  { label: "Validate & Ship", angle: 308.6 },
];

const ClosedLoopAdvantage = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % loopNodes.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isVisible]);

  const cx = 200;
  const cy = 200;
  const radius = 150;

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Our Advantage"
          title="The Closed-Loop"
          gradientText="Pipeline"
          subtitle="A continuous improvement cycle that feeds real-world insights back into your training data, delivering 20-40% faster model improvement."
          light
        />

        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
          {/* Circular animation */}
          <div className={`flex-shrink-0 reveal-scale ${isVisible ? "visible" : ""}`}>
            <div className="relative w-[400px] h-[400px] max-w-[90vw] max-h-[90vw]">
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                {/* Outer circle track */}
                <circle cx={cx} cy={cy} r={radius} stroke="hsl(170 82% 40% / 0.15)" strokeWidth="2" fill="none" />

                {/* Dashed rotating arc */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  stroke="hsl(170 82% 50% / 0.3)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="20 15"
                  className="animate-rotate-loop"
                  style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: "30s" }}
                />

                {/* Nodes */}
                {loopNodes.map((node, i) => {
                  const angleRad = (node.angle - 90) * (Math.PI / 180);
                  const x = cx + radius * Math.cos(angleRad);
                  const y = cy + radius * Math.sin(angleRad);
                  const isActive = activeNode === i;

                  // Label positioning
                  const labelRadius = radius + 35;
                  const lx = cx + labelRadius * Math.cos(angleRad);
                  const ly = cy + labelRadius * Math.sin(angleRad);

                  return (
                    <g key={i}>
                      {/* Active pulse */}
                      {isActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r="18"
                          stroke="hsl(170 82% 50%)"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.4"
                          style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
                        />
                      )}
                      {/* Node dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? "10" : "7"}
                        fill={isActive ? "hsl(170 82% 50%)" : "hsl(170 82% 32% / 0.4)"}
                        stroke={isActive ? "hsl(165 75% 71%)" : "hsl(170 82% 45% / 0.3)"}
                        strokeWidth={isActive ? "2" : "1"}
                        className="transition-all duration-500"
                      />
                      {/* Label */}
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "hsl(165 75% 71%)" : "hsl(0 0% 100% / 0.4)"}
                        fontSize="10"
                        fontWeight={isActive ? "700" : "500"}
                        fontFamily="Plus Jakarta Sans, sans-serif"
                        className="transition-all duration-500"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center stat */}
                <text x={cx} y={cy - 10} textAnchor="middle" fill="hsl(165 75% 71%)" fontSize="28" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
                  20-40%
                </text>
                <text x={cx} y={cy + 15} textAnchor="middle" fill="hsl(0 0% 100% / 0.5)" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                  Faster Improvement
                </text>
              </svg>
            </div>
          </div>

          {/* Description */}
          <div className={`flex-1 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              From Lab to Production, <span className="text-gradient">Continuously</span>
            </h3>
            <div className="space-y-4">
              {[
                "Deploy your model and route real user interactions through our testing crowd",
                "Collect structured feedback on failures, edge cases, and performance gaps",
                "Our team analyzes patterns and curates targeted new training data",
                "Retrain with enriched data and validate improvements before shipping",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosedLoopAdvantage;
