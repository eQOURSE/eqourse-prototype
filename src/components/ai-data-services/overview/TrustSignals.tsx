import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const badges = [
  {
    title: "ISO 9001",
    subtitle: "Quality Management",
    value: "Certified",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="22" stroke="hsl(170 82% 45%)" strokeWidth="2" fill="hsl(170 82% 32% / 0.1)" />
        <path d="M16 24l5 5 11-11" stroke="hsl(170 82% 50%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "ISO 27001",
    subtitle: "Information Security",
    value: "Certified",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M24 4L8 12v10c0 10.5 6.8 20.3 16 24 9.2-3.7 16-13.5 16-24V12L24 4z" stroke="hsl(170 82% 45%)" strokeWidth="2" fill="hsl(170 82% 32% / 0.1)" />
        <path d="M18 24l4 4 8-8" stroke="hsl(170 82% 50%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "GDPR",
    subtitle: "Data Protection",
    value: "Compliant",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="hsl(170 82% 45%)" strokeWidth="2" fill="hsl(170 82% 32% / 0.1)" />
        <circle cx="24" cy="22" r="5" stroke="hsl(170 82% 50%)" strokeWidth="2" />
        <path d="M24 27v4" stroke="hsl(170 82% 50%)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "98%+",
    subtitle: "Data Accuracy",
    value: "Guaranteed",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="20" stroke="hsl(170 82% 45%)" strokeWidth="2" fill="hsl(170 82% 32% / 0.1)" />
        <path d="M24 8v16l8 8" stroke="hsl(170 82% 50%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const TrustSignals = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Trust & Compliance"
          title="Certifications &"
          gradientText="Guarantees"
          subtitle="Enterprise-grade security and quality assurance you can count on."
        />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className={`group text-center p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-scale ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1">{badge.title}</h3>
              <p className="text-muted-foreground text-xs mb-2">{badge.subtitle}</p>
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {badge.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
