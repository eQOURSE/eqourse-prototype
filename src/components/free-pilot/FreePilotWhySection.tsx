import { ShieldCheck, Target, Award, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FreePilotWhySection = () => {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Zero Risk, Zero Cost",
      description:
        "No payment, no contract, no obligation. Evaluate our quality on your own terms. If you're not satisfied, walk away with zero cost. We earn your business on merit.",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary",
      delay: 0,
    },
    {
      icon: Target,
      title: "Tailored to Your Use Case",
      description:
        "We don't send generic samples. Your pilot is produced to your exact specifications — your curriculum standard, your annotation guidelines, your data format, your language.",
      gradient: "from-[#1B9AAA]/10 to-[#1B9AAA]/5",
      iconBg: "bg-[#1B9AAA]",
      delay: 150,
    },
    {
      icon: Award,
      title: "Production-Grade Quality",
      description:
        "The pilot uses the same team, tools, and QA processes as our full production projects. What you see in the pilot is exactly what you'll get at scale. ISO 9001 & 27001 certified.",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary",
      delay: 300,
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description:
        "EdTech content pilots delivered in 5–7 business days. AI Data pilots delivered in 5–10 business days. Faster timelines available for urgent requests.",
      gradient: "from-[#1B9AAA]/10 to-[#1B9AAA]/5",
      iconBg: "bg-[#1B9AAA]",
      delay: 450,
    },
  ];

  return (
    <section className="py-24 bg-[#F0FAFA] relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#1B9AAA]/5 rounded-full blur-3xl" />
        {/* Animated dotted pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-why" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-why)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Why Choose Us</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Why Start with a <span className="text-gradient">Free Pilot?</span>
          </h2>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-elevated transition-all duration-500 text-center flex flex-col items-center relative overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${benefit.delay}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Animated top border on hover */}
                <div className={`absolute top-0 left-0 w-full h-1 ${benefit.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${benefit.iconBg} flex items-center justify-center mb-6 transform group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-500`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="font-heading text-lg font-bold text-foreground mb-3">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreePilotWhySection;
