import { Smartphone, BarChart, Users, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const features = [
  { icon: Users, title: "Real User Crowd", desc: "500+ vetted testers across demographics, accents, and skill levels" },
  { icon: Smartphone, title: "Multi-Device Testing", desc: "Mobile, desktop, smart speaker, and embedded device coverage" },
  { icon: BarChart, title: "Analytics Dashboard", desc: "Real-time metrics, error heatmaps, and performance trend tracking" },
  { icon: Zap, title: "Fast Turnaround", desc: "Results in days, not weeks. Agile sprint-based testing cycles" },
  { icon: Globe, title: "30+ Languages", desc: "Native speakers testing in regional languages and dialects" },
  { icon: Shield, title: "Secure & Private", desc: "SOC 2 ready infrastructure with data isolation per project" },
];

const TuTrainPlatform = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="TuTrain Platform"
          title="Real-World Testing"
          gradientText="Infrastructure"
          subtitle={<>Our proprietary <Link to="/tutrain" className="text-primary hover:underline">TUTRAIN</Link> platform connects your model to real users for authentic, in-the-wild testing at scale.</>}
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`group flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-1">{feat.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TuTrainPlatform;
