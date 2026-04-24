import { useEffect, useRef, useState } from "react";
import { ClipboardList, Package, ThumbsUp } from "lucide-react";

const FreePilotHowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Sequentially reveal steps
  useEffect(() => {
    if (!isVisible) return;
    const timers = [
      setTimeout(() => setActiveStep(0), 300),
      setTimeout(() => setActiveStep(1), 800),
      setTimeout(() => setActiveStep(2), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const steps = [
    {
      icon: ClipboardList,
      number: 1,
      title: "Tell Us What You Need",
      description:
        "Fill out the pilot request form below with your project type (EdTech or AI Data), subject area, language requirements, and a brief description of your use case. Upload a reference file if you have one.",
    },
    {
      icon: Package,
      number: 2,
      title: "We Deliver a Sample",
      description:
        "Our team produces a complimentary sample tailored to your exact specifications. For EdTech: a sample content piece (lesson, assessment, video script, etc.). For AI Data: a sample annotated dataset (50–500 data units depending on modality). Delivered within 5–10 business days.",
    },
    {
      icon: ThumbsUp,
      number: 3,
      title: "You Evaluate, We Iterate",
      description:
        "Review the pilot output. Provide feedback. If you're happy with the quality, we'll scope your full project with a detailed proposal, timeline, and pricing. No obligation at any stage.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref} id="how-it-works">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1B9AAA]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Simple Process</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Three simple steps to experience our quality firsthand
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block relative">
            <div className="absolute top-[72px] left-[16%] right-[16%] h-[3px] bg-border/60 z-0 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-[#1B9AAA] rounded-full transition-all ease-out z-10 ${
                  isVisible ? "w-full duration-[2s]" : "w-0"
                }`}
              />
              {/* Animated glow pulse on line */}
              {isVisible && (
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2.5s_ease-in-out_infinite] z-20" />
              )}
            </div>
          </div>

          {/* Connecting Line (Mobile) */}
          <div className="block md:hidden absolute left-[44px] top-[240px] bottom-[240px] w-[3px] bg-border/60 z-0 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-[#1B9AAA] rounded-full transition-all ease-out z-10 ${
                isVisible ? "h-full duration-[2s]" : "h-0"
              }`}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep >= index;
              return (
                <div
                  key={index}
                  className={`flex-1 flex flex-row md:flex-col items-start md:items-center text-left md:text-center transition-all duration-700 ease-out ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {/* Animated Step Circle */}
                  <div className="relative mr-6 md:mr-0 md:mb-8 shrink-0">
                    {/* Outer ring pulse */}
                    {isActive && (
                      <div className="absolute inset-0 w-[88px] h-[88px] rounded-full border-2 border-primary/30 animate-[pulse-ring_2s_ease-out_infinite]" />
                    )}
                    <div
                      className={`w-[88px] h-[88px] rounded-full flex items-center justify-center transition-all duration-700 relative ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-[#1B9AAA] shadow-[0_0_30px_rgba(0,180,166,0.35)]"
                          : "bg-muted border-2 border-border"
                      }`}
                    >
                      <Icon className={`w-9 h-9 transition-colors duration-500 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md transition-all duration-500 ${
                        isActive ? "bg-primary scale-100" : "bg-muted scale-0"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-[320px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreePilotHowItWorks;
