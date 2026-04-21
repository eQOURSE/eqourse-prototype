import { GraduationCap, School, Layers, BookOpen, Briefcase, Landmark } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const industries = [
  {
    icon: School,
    title: "K-12 Education",
    description: "Schools, school networks, state education departments, and K-12 e-learning platforms worldwide.",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    description: "Universities, colleges, and online degree programs requiring supplementary academic content.",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: Layers,
    title: "EdTech Platforms",
    description: "E-learning startups and established platforms needing scalable, white-label content production.",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: BookOpen,
    title: "Publishers",
    description: "Educational publishers seeking digital transformation and modernization of their print curricula.",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    icon: Briefcase,
    title: "Corporate Training",
    description: "Enterprises needing modern onboarding, compliance, soft skills, and technical training content.",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Landmark,
    title: "Government & NGOs",
    description: "Public sector education programmes and international development projects requiring accessible content.",
    gradient: "from-rose-500/20 to-red-500/10",
  },
];

const EdTechIndustries = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Audiences We Serve"
          title="Industries &"
          gradientText="Educational Sectors"
          subtitle="Delivering customized solutions to diverse segments of the education and training ecosystem."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.title}
                className={`group relative rounded-2xl overflow-hidden glass border border-border/60 p-8 hover:shadow-elevated transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ind.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{ind.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{ind.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EdTechIndustries;
