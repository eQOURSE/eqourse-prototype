import { useEffect, useState, useRef } from "react";

// Hook for animated numbers
function useAnimatedCounter(end: number, duration: number = 2000, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // ease-out-expo logic
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(end * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [end, duration, isVisible]);

  return count;
}

const StatItem = ({ end, suffix, label, isVisible }: { end: number, suffix: string, label: string, isVisible: boolean }) => {
  const count = useAnimatedCounter(end, 2000, isVisible);
  
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="text-4xl md:text-[36px] font-bold text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
        {count}{suffix}
      </div>
      <div className="text-sm text-[#80D9D0]" style={{ fontFamily: 'Arial, sans-serif' }}>
        {label}
      </div>
    </div>
  );
};

const ContactStatsBar = () => {
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

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats = [
    { end: 10, suffix: 'M+', label: 'Students Reached' },
    { end: 200, suffix: '+', label: 'Clients Served' },
    { end: 500, suffix: '+', label: 'Specialists' },
    { end: 30, suffix: '+', label: 'Languages Covered' },
    { end: 15, suffix: '+', label: 'Countries' },
    { end: 5, suffix: '+', label: 'Years of Excellence' },
    { end: 98, suffix: '%+', label: 'Annotation Accuracy' },
    { end: 50, suffix: 'K+', label: 'Content Pieces Delivered' },
  ];

  return (
    <section className="bg-[#004D47] py-12 border-y border-white/10" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Mobile scrollable, Desktop grid */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-8 snap-x snap-mandatory hide-scrollbar">
          {stats.map((stat, i) => (
            <div key={i} className="min-w-[140px] snap-center shrink-0">
              <StatItem {...stat} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactStatsBar;
