import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface StatItemProps {
  value: string;
  label: string;
  delayMs: number;
  suffix?: string;
}

const StatItem = ({ value, label, delayMs, suffix = "" }: StatItemProps) => {
  const { ref, isVisible } = useScrollReveal();
  const [displayValue, setDisplayValue] = useState(0);

  // Extract number from string like "200+"
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!isVisible) return;
    
    // Slight delay before counting starts
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1500; // ms
      const increment = targetNumber / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setDisplayValue(targetNumber);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, delayMs);
    
    return () => clearTimeout(timeout);
  }, [isVisible, targetNumber, delayMs]);

  return (
    <div ref={ref} className="flex-none w-[180px] md:w-auto md:flex-1 flex flex-col items-center justify-center text-center p-4">
      <div className="text-3xl md:text-4xl font-black font-heading tracking-tight text-white mb-1 flex items-center justify-center">
        {displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary">
        {label}
      </div>
    </div>
  );
};

const StatsRibbon = () => {
  const stats = [
    { value: "200+", suffix: "+", label: "Clients Served" },
    { value: "30+", suffix: "+", label: "Languages Covered" },
    { value: "15+", suffix: "+", label: "Countries" },
    { value: "10M+", suffix: "M+", label: "Students Reached" },
    { value: "10000+", suffix: "K+", label: "Content Pieces/Mo" },
    { value: "98%+", suffix: "%+", label: "Annotation Accuracy" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-hero border-y border-white/10">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Subtle glow elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-32 bg-primary/20 rounded-full blur-[80px]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-32 bg-accent/15 rounded-full blur-[80px]" />

      <div className="container mx-auto px-0 md:px-4 relative z-10">
        <div className="flex overflow-x-auto md:overflow-x-visible hide-scrollbar py-6 snap-x snap-mandatory">
          {stats.map((stat, i) => (
            <div key={stat.label} className="snap-center first:pl-4 last:pr-4 md:px-0">
              <StatItem 
                value={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
                delayMs={i * 100} 
              />
            </div>
          ))}
          
          {/* ISO Certification Badge */}
          <div className="snap-center flex-none w-[200px] md:w-auto md:flex-1 flex flex-col items-center justify-center text-center p-4 last:pr-4 md:px-0">
            <div className="flex gap-2 items-center justify-center mb-1">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-xs">ISO</span>
              </div>
            </div>
            <div className="text-[10px] md:text-xs font-semibold tracking-wider uppercase text-primary leading-tight mt-1">
              9001 & 27001<br/>Certified
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll hints for mobile */}
      <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[#1f1e2f] to-transparent md:hidden pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#1f1e2f] to-transparent md:hidden pointer-events-none" />
    </section>
  );
};

export default StatsRibbon;
