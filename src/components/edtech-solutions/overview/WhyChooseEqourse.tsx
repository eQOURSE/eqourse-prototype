import { CheckCircle2, Award, Users, Globe2, BookOpen, Layers, ShieldCheck, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const reasons = [
  { icon: Users, title: "200+ SMEs", description: "Subject matter experts spanning STEM, humanities, languages, and professional domains." },
  { icon: Globe2, title: "30+ Languages", description: "Native-speaker voice-over and culturally adapted content for global audiences." },
  { icon: Layers, title: "Full-Stack EdTech", description: "Content, video, assessment, localization, LMS, and SMEs all under one roof." },
  { icon: Award, title: "ISO 9001:2015", description: "Certified quality management system ensuring consistent, high-quality deliverables." },
  { icon: BookOpen, title: "Global Delivery", description: "Offices in India (Kota) and Singapore serving clients effectively across time zones." },
  { icon: ShieldCheck, title: "200+ Clients", description: "Trusted by education companies and institutions across 15+ countries globally." },
  { icon: Scale, title: "Scalable Delivery", description: "Flexible capacity from 50 hours/month to 5,000+ content pieces per month." },
  { icon: CheckCircle2, title: "Free Pilot", description: "Risk-free pilot programme available for qualifying education and EdTech clients." },
];

const WhyChooseEqourse = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="The eQOURSE Advantage"
          title="Why Global Education Companies"
          gradientText="Choose Us"
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`group p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-card hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseEqourse;
