import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Link } from "react-router-dom";
import {
  FileText, BookOpen, RefreshCw, Image, Tag, Palette, Printer, Settings, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Editorial Services",
    href: "/editorial-services",
    description:
      "Copy editing, proofreading, substantive, developmental and technical editing for education, publishing and digital learning content.",
    badge: "Content Accuracy",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "group-hover:border-emerald-400/40",
  },
  {
    icon: BookOpen,
    title: "Publishing Production",
    href: "/publishing-production",
    description:
      "Typesetting, page composition, templates, indexing, proof review and structured production handover for print and digital assets.",
    badge: "Production Ready",
    color: "from-blue-500/10 to-sky-500/5",
    border: "group-hover:border-blue-400/40",
  },
  {
    icon: RefreshCw,
    title: "Digital Conversion",
    href: "/digital-conversion",
    description:
      "Digitisation, OCR, XML, HTML, EPUB, PDF-to-EPUB, LaTeX, XML-first and MathML conversion workflows for modern platforms.",
    badge: "Multi-Format",
    color: "from-violet-500/10 to-purple-500/5",
    border: "group-hover:border-violet-400/40",
  },
  {
    icon: Image,
    title: "Image Processing",
    href: "/image-processing",
    description:
      "Image restoration, cleanup, optimisation, cropping, resizing, alt-text coordination and asset organisation for learning content.",
    badge: "Visual Quality",
    color: "from-pink-500/10 to-rose-500/5",
    border: "group-hover:border-pink-400/40",
  },
  {
    icon: Tag,
    title: "Metadata Services",
    href: "/metadata-services",
    description:
      "Metadata tagging, content structuring, DOI preparation, ONIX, MARC, Crossref and accessibility metadata for discoverability.",
    badge: "Discoverability",
    color: "from-amber-500/10 to-orange-500/5",
    border: "group-hover:border-amber-400/40",
  },
  {
    icon: Palette,
    title: "Design Services",
    href: "/design-services",
    description:
      "Cover design, page layouts, workbooks, journals, brochures, infographics and brand-aligned learning publication design.",
    badge: "Visual Design",
    color: "from-cyan-500/10 to-teal-500/5",
    border: "group-hover:border-cyan-400/40",
  },
  {
    icon: Printer,
    title: "Prepress Services",
    href: "/prepress-services",
    description:
      "Preflight checks, colour correction, bleed and margin review, print-ready file preparation and pagination validation.",
    badge: "Print Ready",
    color: "from-indigo-500/10 to-blue-500/5",
    border: "group-hover:border-indigo-400/40",
  },
  {
    icon: Settings,
    title: "Production Support",
    href: "/production-support",
    description:
      "Print vendor coordination, large-volume workflow support, print specification sheets, change management and asset packaging.",
    badge: "Operations",
    color: "from-green-500/10 to-emerald-500/5",
    border: "group-hover:border-green-400/40",
  },
];

const EditorialPublishingServicesGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(170 82% 32%) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            ✦ Service Modules
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Editorial &amp; Publishing{" "}
            <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            eQOURSE delivers end-to-end editorial and publishing capabilities across
            editing, design, metadata, prepress and digital conversion for global
            learning-content organisations.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.href}
                to={svc.href}
                className={`group relative rounded-2xl overflow-hidden bg-card border border-border/50 p-7 hover:shadow-elevated transition-all duration-500 reveal-up ${svc.border} ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Floating badge */}
                <span className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  {svc.badge}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-gradient-primary group-hover:shadow-soft transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {svc.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
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

export default EditorialPublishingServicesGrid;
