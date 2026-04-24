import { useEffect, useRef, useState } from "react";
import { FileText, Package, CheckCircle2 } from "lucide-react";

const FreePilotProcess = () => {
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: FileText,
      title: "Tell Us What You Need",
      description: "Fill out the pilot request form with your project type (EdTech or AI Data), subject area, language requirements, and a brief description. Upload a reference file if you have one.",
      delay: "0s"
    },
    {
      icon: Package,
      title: "We Deliver a Sample",
      description: "Our team produces a complimentary sample tailored to your specifications. For EdTech: a sample lesson or script. For AI Data: an annotated dataset of 50-500 units.",
      delay: "0.2s"
    },
    {
      icon: CheckCircle2,
      title: "You Evaluate, We Iterate",
      description: "Review the pilot output. Provide feedback. If you're happy with the quality, we'll scope your full project with a detailed proposal, timeline, and pricing. No obligation.",
      delay: "0.4s"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16" ref={ref}>
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-border z-0">
           <div 
             className={`absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out z-10 ${isVisible ? 'w-full' : 'w-0'}`} 
           />
           {/* Moving dot */}
           {isVisible && (
             <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)] z-20 animate-[chipBarFill_2s_linear_infinite]" />
           )}
        </div>

        {/* Connecting Line (Mobile) */}
        <div className="block md:hidden absolute top-[44px] bottom-[100px] left-[44px] w-0.5 bg-border z-0">
           <div 
             className={`absolute top-0 left-0 w-full bg-primary transition-all duration-1000 ease-out z-10 ${isVisible ? 'h-full' : 'h-0'}`} 
           />
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-6 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`flex-1 flex flex-row md:flex-col items-start md:items-center text-left md:text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: step.delay }}
              >
                <div className="relative mr-6 md:mr-0 md:mb-6 shrink-0">
                  <div className={`w-24 h-24 rounded-full bg-background border-4 flex items-center justify-center transition-colors duration-500 ${isVisible ? 'border-primary shadow-soft' : 'border-border'}`}>
                    <Icon className={`w-10 h-10 transition-colors duration-500 ${isVisible ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white transition-transform duration-500 ${isVisible ? 'bg-primary scale-100' : 'bg-muted scale-0'}`}>
                    {index + 1}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FreePilotProcess;
