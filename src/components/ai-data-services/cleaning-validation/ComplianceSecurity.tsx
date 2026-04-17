import { Shield, Lock, FileCheck, GitBranch, ClipboardCheck, FileKey } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const compliance = [
  {
    icon: Shield,
    title: "GDPR Compliant",
    description: "Full compliance with EU General Data Protection Regulation for data handling, storage, and processing.",
  },
  {
    icon: Lock,
    title: "ISO 27001",
    description: "Information security management system certification ensuring data confidentiality and integrity.",
  },
  {
    icon: FileCheck,
    title: "ISO 9001",
    description: "Quality management system certification guaranteeing consistent, high-quality deliverables.",
  },
  {
    icon: GitBranch,
    title: "Data Lineage",
    description: "Full traceability from source to delivery — know exactly where every data point came from.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit Trails",
    description: "Complete logs of all data transformations, annotations, and quality checks for compliance review.",
  },
  {
    icon: FileKey,
    title: "NDA-Bound Teams",
    description: "All annotators and engineers sign NDAs. Isolated project environments with role-based access control.",
  },
];

const ComplianceSecurity = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Security & Compliance"
          title="Enterprise-Grade"
          gradientText="Data Protection"
          subtitle="Your data is handled with the highest security standards. Every process is auditable, traceable, and compliant."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {compliance.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComplianceSecurity;
