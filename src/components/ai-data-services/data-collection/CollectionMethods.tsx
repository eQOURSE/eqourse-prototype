import { Users, Globe, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const methods = [
  {
    icon: Users,
    title: "Crowdsourced Collection",
    description: "Tap into our managed crowd of 500+ vetted contributors across 30+ countries. Ideal for diverse, large-scale datasets with natural variation.",
    features: ["Scalable to millions of data points", "Demographic diversity controls", "Quality screening at intake"],
  },
  {
    icon: Globe,
    title: "Web & API Sourcing",
    description: "Ethical web scraping and API-based data acquisition with full legal compliance. We handle licensing, deduplication, and format normalization.",
    features: ["Domain-specific crawling", "Rights-managed content", "Real-time data feeds"],
  },
  {
    icon: MapPin,
    title: "Field Collection",
    description: "On-ground data collection for scenarios requiring controlled environments, specific demographics, or specialized recording equipment.",
    features: ["Studio-quality audio/video", "Controlled lighting & acoustics", "Demographic targeting"],
  },
];

const CollectionMethods = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Collection Methods"
          title="How We"
          gradientText="Collect"
          subtitle="Three proven approaches tailored to your data requirements, timeline, and budget."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {methods.map((method, i) => {
            const Icon = method.icon;
            return (
              <div
                key={method.title}
                className={`group rounded-2xl border border-border/50 bg-card p-8 hover:border-primary/30 hover:shadow-card transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{method.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionMethods;
