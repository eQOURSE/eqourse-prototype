import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const stats = [
  { value: 500, suffix: "+", label: "STEM Specialists" },
  { value: 30, suffix: "+", label: "Languages Covered" },
  { value: 98, suffix: "%+", label: "Data Accuracy" },
  { value: 50, suffix: "+", label: "Active Projects" },
];

const CountUpNumber = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="text-4xl md:text-5xl font-heading font-extrabold text-gradient">
      {count}{suffix}
    </span>
  );
};

const TalentAdvantage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Talent"
          title="The eQOURSE"
          gradientText="Advantage"
          subtitle="Our workforce blends STEM domain expertise with linguistic precision, ensuring your data meets both technical and contextual standards."
        />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center reveal-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <CountUpNumber target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-muted-foreground text-sm mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className={`mt-16 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="font-heading font-bold text-foreground mb-2">STEM Backgrounds</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Linguistics, Computer Science, Medical, Legal, and Financial domain specialists ensure annotators understand context, not just instructions.
            </p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="font-heading font-bold text-foreground mb-2">Continuous Training</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Regular calibration sessions, updated guidelines, and performance-based ranking keep quality consistently high across all project types.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentAdvantage;
