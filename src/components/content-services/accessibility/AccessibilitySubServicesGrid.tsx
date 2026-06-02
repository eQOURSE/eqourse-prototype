import { ShieldCheck, FileText, Video, ClipboardCheck, MonitorPlay, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const subServices = [
  {
    icon: ShieldCheck,
    title: "Standards Compliance",
    description: "Ensure your digital learning content meets WCAG 2.2, Section 508, EN 301 549, and EPUB 3 accessibility standards.",
    link: "/standards-compliance",
    colorClass: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    iconColor: "text-blue-500",
    bgClass: "bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white"
  },
  {
    icon: FileText,
    title: "Document & eContent Remediation",
    description: "Transform PDFs, EPUBs, Word docs, and LMS courses into fully accessible, screen-reader optimized formats.",
    link: "/document-content-remediation",
    colorClass: "group-hover:border-teal-500/50 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]",
    iconColor: "text-teal-500",
    bgClass: "bg-teal-500/10 group-hover:bg-teal-500 group-hover:text-white"
  },
  {
    icon: Video,
    title: "Accessible Media & Enhancements",
    description: "Make multimedia content inclusive with expert alt text, closed captioning, audio descriptions, and accessible STEM notation.",
    link: "/accessible-media-enhancements",
    colorClass: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    iconColor: "text-purple-500",
    bgClass: "bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white"
  },
  {
    icon: ClipboardCheck,
    title: "Assessment Accessibility",
    description: "Design inclusive tests with accessible item types, keyboard navigation, and cognitive-friendly visual presentations.",
    link: "/assessment-accessibility",
    colorClass: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    iconColor: "text-emerald-500",
    bgClass: "bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white"
  },
  {
    icon: MonitorPlay,
    title: "Assistive Technology Compatibility",
    description: "Verify content functionality across major screen readers (JAWS, NVDA, VoiceOver) and alternative input devices.",
    link: "/assistive-technology-compatibility",
    colorClass: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    iconColor: "text-amber-500",
    bgClass: "bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-white"
  },
  {
    icon: FileSearch,
    title: "Audit & Compliance Support",
    description: "Comprehensive accessibility audits, actionable remediation roadmaps, and VPAT / ACR documentation support.",
    link: "/audit-compliance-support",
    colorClass: "group-hover:border-rose-500/50 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    iconColor: "text-rose-500",
    bgClass: "bg-rose-500/10 group-hover:bg-rose-500 group-hover:text-white"
  }
];

const AccessibilitySubServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
      
      {/* Decorative Accessibility Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Our Accessibility Framework"
          title="Digital Accessibility"
          gradientText="Capabilities"
          subtitle="End-to-end accessibility services ensuring your digital learning ecosystem is inclusive, compliant, and optimized for all learners."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto mt-16">
          {subServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group flex flex-col rounded-2xl bg-card border border-border/60 p-8 transition-all duration-500 reveal-up hover:-translate-y-1 ${service.colorClass} ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 3) * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${service.bgClass}`}>
                  <Icon className={`w-7 h-7 transition-colors duration-500 ${service.iconColor} group-hover:text-white`} />
                </div>
                
                <h3 className="font-heading font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <span className="inline-flex items-center text-xs font-bold text-foreground gap-2 group-hover:gap-3 transition-all uppercase tracking-wider">
                    Explore Service <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </span>
                  
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/40 transition-colors delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/70 transition-colors delay-200" />
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors delay-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccessibilitySubServicesGrid;
