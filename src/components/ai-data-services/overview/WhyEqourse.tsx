import { Globe, Award, Users, Zap, Lock, Clock, Headphones } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const differentiators = [
  {
    icon: Globe,
    title: "30+ Languages",
    description: "Indo-Aryan, Dravidian, Southeast Asian, and European language coverage with native-speaker annotators.",
  },
  {
    icon: Award,
    title: "98%+ Accuracy",
    description: "Multi-tier QA with inter-annotator agreement >= 0.80 and gold-standard honeypot validation.",
  },
  {
    icon: Users,
    title: "500+ STEM Specialists",
    description: "Domain experts in linguistics, computer science, medical, legal, and financial fields.",
  },
  {
    icon: Zap,
    title: "Scalable Operations",
    description: "From pilot batches to millions of data points — elastic workforce that scales with your needs.",
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    description: "ISO 27001, GDPR-ready processes, NDA-bound teams, end-to-end data lineage tracking.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Agile project management with milestone delivery and real-time progress dashboards.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Named project manager, Slack/Teams integration, and weekly sync calls for enterprise clients.",
  },
];

const WhyEqourse = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Why eQOURSE"
          title="What Sets Us"
          gradientText="Apart"
          subtitle="Seven key differentiators that make eQOURSE the preferred AI data partner for global teams."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300 reveal-up ${isVisible ? "visible" : ""} ${i === 6 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyEqourse;
