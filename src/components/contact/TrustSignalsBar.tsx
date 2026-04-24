import { useEffect, useState, useRef } from "react";
import { ShieldCheck, CheckCircle2, Users, Globe, Languages, MapPin } from "lucide-react";

// Hook for animated numbers
function useAnimatedCounter(end: number, duration: number = 2000, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * ease));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isVisible) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return count;
}

const StatItem = ({ end, suffix, label, icon: Icon, isVisible, delay }: { end: number, suffix: string, label: string, icon: any, isVisible: boolean, delay: string }) => {
  const count = useAnimatedCounter(end, 2500, isVisible);
  
  return (
    <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-primary/10 shadow-sm reveal-scale" style={{ transitionDelay: delay }}>
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="font-heading font-bold text-xl md:text-2xl text-foreground">
          {count}{suffix}
        </div>
        <div className="text-xs md:text-sm text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};

const ISOItem = ({ label, isVisible, delay }: { label: string, isVisible: boolean, delay: string }) => (
  <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-primary/10 shadow-sm reveal-scale" style={{ transitionDelay: delay }}>
     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="font-heading font-bold text-sm md:text-base text-foreground">ISO Certified</div>
        <div className="text-xs md:text-sm text-primary font-medium">{label}</div>
      </div>
  </div>
)

const TrustSignalsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-[#F0FAFA] border-y border-primary/10" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ISOItem label="9001:2015" isVisible={isVisible} delay="0ms" />
          <ISOItem label="27001:2022" isVisible={isVisible} delay="100ms" />
          <StatItem end={200} suffix="+" label="Clients Worldwide" icon={Globe} isVisible={isVisible} delay="200ms" />
          <StatItem end={500} suffix="+" label="Specialists" icon={Users} isVisible={isVisible} delay="300ms" />
          <StatItem end={30} suffix="+" label="Languages" icon={Languages} isVisible={isVisible} delay="400ms" />
          <StatItem end={15} suffix="+" label="Countries" icon={MapPin} isVisible={isVisible} delay="500ms" />
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsBar;
