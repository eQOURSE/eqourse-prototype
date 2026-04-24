import { ShieldCheck, Target, Award, Clock } from "lucide-react";

const WhyFreePilot = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Zero Risk, Zero Cost",
      description: "No payment, no contract, no obligation. Evaluate our quality on your own terms before committing to a full project.",
      delay: "0s"
    },
    {
      icon: Target,
      title: "Tailored to Your Use Case",
      description: "We don't send generic samples. Your pilot is produced to your exact specifications — your curriculum, your annotation guidelines.",
      delay: "150ms"
    },
    {
      icon: Award,
      title: "Production-Grade Quality",
      description: "The pilot uses the same team, tools, and quality processes as our production projects. What you see is what you get at scale.",
      delay: "300ms"
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "EdTech pilots delivered in 5-7 business days. AI Data pilots delivered in 5-10 business days. Faster timelines available for urgent requests.",
      delay: "450ms"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <div 
            key={index} 
            className="bg-card rounded-2xl p-6 border border-border border-t-4 border-t-primary shadow-sm hover:shadow-card transition-all duration-300 neon-card reveal-up text-center flex flex-col items-center group"
            style={{ transitionDelay: benefit.delay }}
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-3">{benefit.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WhyFreePilot;
