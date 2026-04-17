import { Database, Tag, ShieldCheck, FlaskConical, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const services = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Custom text, audio, image, and video datasets across 30+ languages with domain-specific sourcing and quality controls.",
    link: "/ai-data-services/data-collection",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: Tag,
    title: "Annotation & Labeling",
    description: "NLP, Computer Vision, Audio, and RLHF labeling with inter-annotator agreement >= 0.80 and multi-tier QA.",
    link: "/ai-data-services/annotation-labeling",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Data Cleaning & Validation",
    description: "Deduplication, PII redaction, noise removal, and validation pipelines delivering 98%+ accuracy, GDPR-ready.",
    link: "/ai-data-services/cleaning-validation",
    gradient: "from-primary/15 to-accent/15",
  },
  {
    icon: FlaskConical,
    title: "Model Testing & Evaluation",
    description: "Real-world testing via TuTrain platform with closed-loop feedback, A/B testing, and dialect audits for 20-40% faster improvement.",
    link: "/ai-data-services/model-testing",
    gradient: "from-accent/15 to-primary/20",
  },
];

const ServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Services"
          title="End-to-End AI Data"
          gradientText="Solutions"
          subtitle="Four specialized service verticals that cover your entire AI data pipeline from collection to model validation."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group relative rounded-3xl overflow-hidden neon-card border border-border/50 p-8 block reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40`} />
                {/* Dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
