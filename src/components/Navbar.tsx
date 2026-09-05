import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight, FileText, PlayCircle, Database, Sparkles, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { contentServicesCategories } from "@/components/content-services/shared/contentServicesNavData";
import { aiDataServicesCategories } from "@/components/ai-data-services/shared/aiDataServicesNavData";
import { aiDataSamples } from "@/components/samples/ai-data/shared/aiDataSamplesData";
import eqourseLogoDark from "@/assets/eqourse-logo.webp";
import eqourseLogoLight from "@/assets/eqourse-logo-light.webp";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    <path d="M9.1 8.6c.3 2.6 2.3 4.6 4.9 4.9" />
  </svg>
);

interface SubLink {
  label: string;
  to: string;
  image?: string;
  imageAlt?: string;
  description?: string;
}

interface MainLink {
  label: string;
  to: string;
  dropdown?: SubLink[];
  megaMenu?: boolean;          // flag: use mega-menu instead of simple dropdown
  aiMegaMenu?: boolean;        // flag: use the AI Data Services hierarchy mega-menu
  samplesMenu?: boolean;       // flag: 3-column Samples mega menu
  subtext?: string;            // flag: simple tooltip text
  external?: boolean;          // flag: external link
}

const aiDataSubLinks: SubLink[] = [
  { label: "Data Collection", to: "/ai-data-services/data-collection", image: "/assets/ai-data/Data Collection V2.webp", imageAlt: "Global scale AI data collection and aggregation services", description: "Global scale secure data collection for accurate models." },
  { label: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling", image: "/assets/ai-data/annotation-labeling/data-annotation-labeling-services-hero.webp", imageAlt: "Annotation specialist reviewing labeled image and text data", description: "Expert-reviewed labels across image, video, language, speech and RLHF." },
  { label: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation", image: "/assets/ai-data/cleaning-validation/data-cleaning-validation-services-hero.webp", imageAlt: "Readable synthetic AI training records in a dataset audit workspace", description: "Independent dataset audits, human-reviewed repairs and traceable quality reports." },
  { label: "Model Testing", to: "/ai-data-services/model-testing", image: "/assets/ai-data/model-testing/ai-model-testing-services-hero.webp", imageAlt: "AI specialist reviewing model testing and evaluation evidence", description: "Human evaluation, safety, bias and real-world performance testing." },
  { label: "Robotics Training Data", to: "/robotics-training-data-services", image: "/assets/ai-data/robotics/robotics-training-data-hero.webp", imageAlt: "Engineer reviewing robotics training data beside a collaborative robot", description: "Human demonstrations, multimodal annotation and Physical AI evaluation." },
];

const aboutUsSubLinks: SubLink[] = [
  { label: "Who We Are", to: "/aboutus", image: "/assets/about/Who we are (A).webp", imageAlt: "eQOURSE team working collaboratively on AI data and content services", description: "Learn about our mission, vision and dynamic content services team." },
  { label: "Gallery", to: "/gallery", image: "/assets/about/gallery/10.webp", imageAlt: "eQOURSE Office Tours & Events Gallery", description: "Explore our office tours, business meetings, and industry events." },
  { label: "Testimonials", to: "/clients-testimonials", image: "/assets/about/Testiominal.webp", imageAlt: "Satisfied eQOURSE global clients and partners", description: "Hear what our global clients say about our services." },
  { label: "Careers", to: "/career", image: "/assets/about/Carrer.webp", imageAlt: "Careers at eQOURSE - Professionals collaborating on education and AI solutions", description: "Join our growing team and shape the future of AI & Content Services." },
  { label: "FAQs", to: "/faq", image: "/assets/about/FAQ.webp", imageAlt: "eQOURSE customer support and frequently asked questions", description: "Got questions? We've got answers for all your queries." },
];

const contentServicesSubLinks: SubLink[] = contentServicesCategories.map(c => ({
  label: c.label,
  to: c.href,
}));

const navLinks: MainLink[] = [
  { label: "Home", to: "/" },
  { label: "AI Data Services", to: "/ai-data-services", dropdown: aiDataSubLinks, aiMegaMenu: true },
  { label: "Content Services", to: "/content-services", dropdown: contentServicesSubLinks, megaMenu: true },
  { label: "About Us", to: "/aboutus", dropdown: aboutUsSubLinks },
  { label: "Samples", to: "/samples", samplesMenu: true },
  { label: "TUTRAIN", to: "/tutrain", subtext: "Our Online Tutoring Brand" },
  { label: "eQOURSE+", to: "https://plus.eqourse.com", subtext: "Our Talent Platform", external: true },
];

/* ─── Content Services Mega‑Menu (Desktop) ─── */
const ContentServicesMegaMenu = ({ onClose }: { onClose: () => void }) => {
  const [hoveredCatIndex, setHoveredCatIndex] = useState(0);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const cat = contentServicesCategories[hoveredCatIndex];
  const hoveredSub = hoveredSubIndex !== null ? cat.subServices[hoveredSubIndex] : null;
  const location = useLocation();

  return (
    <nav
      className="absolute top-full -left-[33vw]  w-[97vw] max-w-[1350px] bg-card/95 rounded-3xl border border-border/50 shadow-elevated animate-slide-up z-50  max-h-[80vh]"
      style={{ backdropFilter: "blur(20px)" }}
      aria-label="Content Services navigation"
    >
      <div className="flex min-h-[450px]">
        {/* Left: Categories (380px) */}
        <div className="w-[380px] border-r border-border/40 py-6 bg-secondary/30 flex flex-col overflow-auto max-h-[80vh]" role="list" aria-label="Service categories">
          <span className="px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">Our Expertise</span>
          {contentServicesCategories.map((c, i) => {
            const Icon = c.icon;
            const isActive = location.pathname.startsWith(c.href);
            return (
              <Link
                key={c.label}
                to={c.href}
                role="listitem"
                className={`flex items-start gap-3 px-6 py-3.5 text-left text-sm transition-all w-full group
                  ${hoveredCatIndex === i ? "bg-primary/5 text-primary font-bold border-l-4 border-primary" : isActive ? "text-primary/80 border-l-4 border-transparent" : "text-foreground/80 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"}`}
                onMouseEnter={() => { setHoveredCatIndex(i); setHoveredSubIndex(null); }}
                onClick={onClose}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="flex-1">{c.label}</span>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform mt-0.5 ${hoveredCatIndex === i ? "translate-x-1 text-primary" : "text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
              </Link>
            );
          })}
        </div>

        {/* Middle: Sub‑services */}
        <div className="flex-1 py-6 px-6 border-r border-border/40 ">
          <Link
            to={cat.href}
            className="flex items-center gap-2 px-3 py-2 mb-4 text-xl font-bold text-foreground hover:text-primary transition-colors group"
            onClick={onClose}
          >
            <cat.icon className="w-6 h-6 text-primary" />
            {cat.label}
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
          </Link>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2" role="list" aria-label={`${cat.label} sub-services`}>
            {cat.subServices.map((sub, subIdx) => {
              const SubIcon = sub.icon;
              const isActive = location.pathname === sub.href;
              const isSubHovered = hoveredSubIndex === subIdx;
              return (
                <Link
                  key={sub.href}
                  to={sub.href}
                  role="listitem"
                  className={`flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group
                    ${isSubHovered ? "bg-primary/15 text-primary font-semibold shadow-sm ring-1 ring-primary/20" : isActive ? "bg-primary/10 text-primary font-semibold shadow-sm" : "text-foreground/80 hover:bg-primary/10 hover:text-primary hover:shadow-sm"}`}
                  onMouseEnter={() => setHoveredSubIndex(subIdx)}
                  onClick={onClose}
                >
                  {SubIcon && <SubIcon className={`w-4 h-4 flex-shrink-0 transition-colors mt-0.5 ${isSubHovered ? "text-primary" : "text-primary/60 group-hover:text-primary"}`} />}
                  <span className="leading-tight">{sub.label}</span>
                  {sub.serviceHighlights && sub.serviceHighlights.length > 0 && (
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ml-auto transition-all mt-0.5 ${isSubHovered ? "translate-x-0.5 text-primary opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Preview Panel (320px) — shows sub-service highlights OR category overview */}
        <div className="w-[320px] p-6 flex flex-col overflow-auto max-h-[80vh]">
          {hoveredSub && hoveredSub.serviceHighlights && hoveredSub.serviceHighlights.length > 0 ? (
            /* ── Sub-service Highlights View ── */
            <div className="flex flex-col h-full animate-fade-in" key={`sub-${hoveredCatIndex}-${hoveredSubIndex}`}>
              {/* Sub-service header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
                {hoveredSub.icon && (() => {
                  const SubIcon = hoveredSub.icon!;
                  return (
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft flex-shrink-0">
                      <SubIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  );
                })()}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground leading-tight truncate">{hoveredSub.label}</h3>
                  <span className="text-[11px] font-medium text-primary/70 uppercase tracking-wider">What We Deliver</span>
                </div>
              </div>

              {/* Service bullet highlights */}
              <ul className="flex flex-col gap-1.5 mb-auto" aria-label={`Services under ${hoveredSub.label}`}>
                {hoveredSub.serviceHighlights.map((highlight, hIdx) => (
                  <li key={hIdx}>
                    <Link
                      to={hoveredSub.href}
                      onClick={onClose}
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all group/bullet cursor-pointer"
                      aria-label={`${highlight} - part of ${hoveredSub.label}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/bullet:bg-primary mt-1.5 flex-shrink-0 transition-colors" />
                      <span className="leading-snug">{highlight}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Explore button */}
              <Link
                to={hoveredSub.href}
                onClick={onClose}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-primary-foreground bg-primary py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-all w-full group/btn shadow-md hover:shadow-lg"
              >
                Explore {hoveredSub.label} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            /* ── Category Overview (default) ── */
            <div className="flex flex-col h-full animate-fade-in group" key={`cat-${cat.label}`}>
              <div className="relative w-full h-[220px]  rounded-2xl overflow-hidden mb-5 shadow-md border border-border/30 bg-secondary/30">
                {cat.image ? (
                  <img src={cat.image} alt={cat.imageAlt || cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-sm font-medium text-muted-foreground">Image Pending</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 pointer-events-none" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">{cat.label}</h3>
              <p className="text-sm text-muted-foreground mb-auto leading-relaxed">{cat.description}</p>

              <Link
                to={cat.href}
                onClick={onClose}
                className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-primary-foreground bg-primary py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-all w-full group/btn shadow-md hover:shadow-lg"
              >
                Explore Services <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

/* ─── Mobile Accordion ─── */
const MobileContentServicesAccordion = ({ onClose }: { onClose: () => void }) => {
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className="flex flex-col gap-3 px-2 pb-4 mt-2">
      {contentServicesCategories.map((cat, i) => {
        const Icon = cat.icon;
        const isExpanded = expandedCat === i;
        const isCatActive = location.pathname.startsWith(cat.href);
        return (
          <div key={cat.label} className={`rounded-xl border transition-all duration-300 ${isExpanded ? "bg-primary/5 border-primary/30" : "bg-card border-border/50 shadow-sm"}`}>
            <button
              className="flex items-center gap-3 w-full p-4 text-left"
              onClick={() => { setExpandedCat(isExpanded ? null : i); setExpandedSub(null); }}
            >
              <div className={`p-2 rounded-lg transition-colors ${isExpanded || isCatActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`flex-1 font-semibold ${isExpanded || isCatActive ? "text-foreground" : "text-foreground/80"}`}>{cat.label}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 pt-1 animate-slide-up">
                <Link
                  to={cat.href}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 hover:bg-primary/20 transition-colors"
                  onClick={onClose}
                >
                  Overview <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="grid grid-cols-1 gap-2">
                  {cat.subServices.map((sub) => {
                    const isActive = location.pathname === sub.href;
                    const isSubExpanded = expandedSub === sub.href;
                    const hasHighlights = sub.serviceHighlights && sub.serviceHighlights.length > 0;
                    return (
                      <div key={sub.href} className={`rounded-lg border transition-all ${isActive ? "bg-primary/10 border-primary/20" : "bg-background border-border/40 hover:border-primary/30 hover:shadow-sm"}`}>
                        <div className="flex items-center">
                          <Link
                            to={sub.href}
                            className={`flex items-center gap-3 p-3 flex-1 transition-colors ${isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"}`}
                            onClick={onClose}
                          >
                            {sub.icon && <sub.icon className="w-4 h-4 text-primary/70" />}
                            <span className="text-sm flex-1">{sub.label}</span>
                          </Link>
                          {hasHighlights && (
                            <button
                              className="p-3 text-muted-foreground/60 hover:text-primary transition-colors flex-shrink-0"
                              onClick={() => setExpandedSub(isSubExpanded ? null : sub.href)}
                              aria-label={`${isSubExpanded ? "Hide" : "Show"} services under ${sub.label}`}
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${isSubExpanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                        {isSubExpanded && hasHighlights && (
                          <div className="px-3 pb-3 animate-slide-up">
                            <div className="pt-2 border-t border-border/40">
                              <ul className="space-y-2 mt-2" aria-label={`Services under ${sub.label}`}>
                                {sub.serviceHighlights!.map((highlight, hIdx) => (
                                  <li key={hIdx}>
                                    <Link
                                      to={sub.href}
                                      className="flex items-start gap-2 text-xs text-muted-foreground/80 hover:text-primary transition-colors"
                                      onClick={onClose}
                                    >
                                      <span className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                                      <span className="leading-relaxed">{highlight}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Samples 3-Column Mega Menu (Desktop) ─── */
/* --- AI Data Services Mega-Menu (Desktop) --- */
const AIDataServicesMegaMenu = ({ onClose }: { onClose: () => void }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
  const location = useLocation();
  const category = aiDataServicesCategories[activeCategoryIndex];
  const subService = activeSubIndex !== null ? category.subServices[activeSubIndex] : null;

  const selectCategory = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveSubIndex(null);
  };

  return (
    <nav
      className="fixed inset-x-4 top-16 mx-auto w-auto max-w-[1350px] bg-card/95 rounded-3xl border border-border/50 shadow-elevated animate-slide-up z-50 overflow-hidden max-h-[calc(100dvh-116px)]"
      style={{ backdropFilter: "blur(20px)" }}
      aria-label="AI Data Services navigation"
    >
      <div className="flex min-h-[450px]">
        <div className="w-[280px] xl:w-[330px] border-r border-border/40 py-6 bg-secondary/30 flex flex-col overflow-auto max-h-[calc(100dvh-116px)]" role="list" aria-label="AI Data service categories">
          <Link to="/ai-data-services" onClick={onClose} className="px-6 py-2 mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 hover:text-primary">
            AI Data Expertise
          </Link>
          {aiDataServicesCategories.map((item, index) => {
            const Icon = item.icon;
            const isCurrent = location.pathname.startsWith(item.href);
            const isSelected = activeCategoryIndex === index;
            return (
              <Link
                key={item.href}
                to={item.href}
                role="listitem"
                onMouseEnter={() => selectCategory(index)}
                onFocus={() => selectCategory(index)}
                onClick={onClose}
                className={`group flex items-start gap-3 px-6 py-4 text-sm transition-all border-l-4 ${isSelected ? "bg-primary/5 text-primary font-bold border-primary" : isCurrent ? "text-primary/80 border-transparent" : "text-foreground/80 border-transparent hover:text-primary hover:bg-primary/5"}`}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="flex-1 leading-tight">{item.label}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 transition-all ${isSelected ? "translate-x-1 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <div className="flex-1 min-w-0 py-6 px-6 border-r border-border/40 overflow-auto max-h-[calc(100dvh-116px)]">
          <Link to={category.href} onClick={onClose} className="group flex items-center gap-2 px-3 py-2 mb-2 text-xl font-bold text-foreground hover:text-primary transition-colors">
            <category.icon className="w-6 h-6 text-primary" aria-hidden="true" />
            <span>{category.label}</span>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
          </Link>
          <p className="px-3 mb-5 max-w-2xl text-xs leading-relaxed text-muted-foreground">{category.description}</p>

          <div className="grid grid-cols-2 gap-2" role="list" aria-label={`${category.label} sub-services`}>
            {category.subServices.map((sub, index) => {
              const Icon = sub.icon;
              const isSelected = activeSubIndex === index;
              const isCurrent = location.pathname === sub.href;
              return (
                <Link
                  key={`${category.href}-${sub.label}`}
                  to={sub.href}
                  role="listitem"
                  onMouseEnter={() => setActiveSubIndex(index)}
                  onFocus={() => setActiveSubIndex(index)}
                  onClick={onClose}
                  className={`group flex items-start gap-3 rounded-xl px-3 py-3 text-sm transition-all ${isSelected ? "bg-primary/15 text-primary font-semibold shadow-sm ring-1 ring-primary/20" : isCurrent ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-primary/10 hover:text-primary"}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? "text-primary" : "text-primary/60"}`} aria-hidden="true" />
                  <span className="leading-tight">{sub.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ml-auto shrink-0 mt-0.5 transition-all ${isSelected ? "opacity-100 translate-x-0.5" : "opacity-0 group-hover:opacity-60"}`} aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <Link to={category.href} onClick={onClose} className="inline-flex items-center gap-2 mx-3 mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            View {category.label} overview <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <aside className="w-[280px] xl:w-[330px] p-6 flex flex-col overflow-auto max-h-[calc(100dvh-116px)]" aria-live="polite">
          {subService ? (
            <div className="flex flex-col h-full animate-fade-in" key={`${activeCategoryIndex}-${activeSubIndex}`}>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border/40">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft shrink-0">
                  <subService.icon className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground leading-tight">{subService.label}</h3>
                  <span className="text-[10px] font-bold text-primary/70 uppercase tracking-wider">What We Deliver</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{subService.description}</p>
              <ul className="flex flex-col gap-1 mb-auto" aria-label={`Capabilities under ${subService.label}`}>
                {subService.serviceHighlights.map((highlight) => (
                  <li key={highlight}>
                    <Link to={subService.href} onClick={onClose} className="group/item flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary/45 group-hover/item:bg-primary shrink-0" aria-hidden="true" />
                      <span className="leading-snug">{highlight}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to={subService.href} onClick={onClose} className="group/button mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all">
                Explore {subService.label} <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-fade-in group" key={`category-${category.href}`}>
              <div className="relative w-full h-[210px] rounded-2xl overflow-hidden mb-5 shadow-md border border-border/30 bg-secondary/30">
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  width={520}
                  height={420}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">{category.label}</h3>
              <p className="text-sm text-muted-foreground mb-auto leading-relaxed">{category.description}</p>
              <Link to={category.href} onClick={onClose} className="group/button mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all">
                Explore Services <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </nav>
  );
};

/* --- AI Data Services Mobile Accordion --- */
const MobileAIDataServicesAccordion = ({ onClose }: { onClose: () => void }) => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className="flex flex-col gap-3 px-2 pb-4 mt-2">
      <Link to="/ai-data-services" onClick={onClose} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary">
        AI Data Services overview <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </Link>
      {aiDataServicesCategories.map((category, index) => {
        const Icon = category.icon;
        const isExpanded = expandedCategory === index;
        const isCurrent = location.pathname.startsWith(category.href);
        return (
          <div key={category.href} className={`rounded-xl border transition-colors ${isExpanded ? "bg-primary/5 border-primary/30" : "bg-card border-border/50"}`}>
            <button type="button" className="flex items-center gap-3 w-full p-4 text-left" onClick={() => { setExpandedCategory(isExpanded ? null : index); setExpandedSub(null); }} aria-expanded={isExpanded}>
              <span className={`p-2 rounded-lg ${isExpanded || isCurrent ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
              <span className="flex-1 font-semibold text-sm">{category.label}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 animate-slide-up">
                <Link to={category.href} onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Overview <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
                <div className="space-y-2">
                  {category.subServices.map((sub) => {
                    const SubIcon = sub.icon;
                    const subKey = `${category.label}-${sub.label}`;
                    const isSubExpanded = expandedSub === subKey;
                    return (
                      <div key={sub.label} className="rounded-lg border border-border/40 bg-background overflow-hidden">
                        <div className="flex items-center">
                          <Link to={sub.href} onClick={onClose} className="flex flex-1 items-center gap-3 p-3 text-sm text-foreground/80 hover:text-primary">
                            <SubIcon className="w-4 h-4 text-primary/70 shrink-0" aria-hidden="true" />
                            <span>{sub.label}</span>
                          </Link>
                          <button type="button" className="p-3 text-muted-foreground hover:text-primary" onClick={() => setExpandedSub(isSubExpanded ? null : subKey)} aria-expanded={isSubExpanded} aria-label={`${isSubExpanded ? "Hide" : "Show"} capabilities under ${sub.label}`}>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSubExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
                          </button>
                        </div>
                        {isSubExpanded && (
                          <div className="px-3 pb-3 animate-slide-up">
                            <ul className="pt-2 border-t border-border/40 space-y-2">
                              {sub.serviceHighlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-xs text-muted-foreground"><span className="w-1 h-1 mt-1.5 rounded-full bg-primary/50 shrink-0" />{highlight}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const textSampleLinks = [
  { label: "K12 Grade (KG-5)", href: "/kindergarten-to-k5-samples" },
  { label: "K12 Grade (6-12)", href: "/k6-to-k12-samples" },
  { label: "IIT JEE / NEET", href: "/iit-jee-neet-samples" },
  { label: "UPSC & State PSC", href: "/upsc-state-psc-samples" },
  { label: "STEM Content", href: "/stem-content-samples" },
  { label: "Curriculum Content", href: "/curriculum-samples" },
  { label: "Localization", href: "/translation-and-localization-text-samples" },
  { label: "Test Prep & Assessments", href: "/test-prep-and-assessments" },
];

const videoSampleLinks = [
  { label: "Articulate Storyline", href: "/articulate-storyline-video-samples" },
  { label: "Pen Tab and PPT", href: "/pen-tab-and-ppt-samples" },
  { label: "AI Videos", href: "/ai-avatar-video-samples" },
  { label: "Flash to HTML", href: "/flash-to-htm-samples" },
  { label: "2D 3D Animation", href: "/2d-3d-video-samples" },
  { label: "Promotional Video", href: "/promotional-video" },
  { label: "Immersive Simulation AR/VR", href: "/immersive-simulation-ar-vr-video" },
];

const SamplesMegaMenu = ({ onClose }: { onClose: () => void }) => (
  <div
    className="absolute top-full -left-[45vw] w-[1040px] bg-card/95 rounded-3xl border border-border/50 shadow-elevated animate-slide-up z-50 overflow-hidden"
    style={{ backdropFilter: "blur(20px)" }}
  >
    <div className="grid grid-cols-3 min-h-[440px]">
      {/* Column 1 - Text (teal) */}
      <div className="py-6 px-5 border-r border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <Link
          to="/text-samples"
          onClick={onClose}
          className="flex items-center gap-2.5 mb-4 pb-3 border-b border-primary/20 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold tracking-widest uppercase text-primary/70">Content Services</div>
            <div className="text-sm font-extrabold text-primary leading-tight">Text Content Samples</div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>
        <div className="flex flex-col gap-0.5">
          {textSampleLinks.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
              <span className="truncate">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Column 2 - Video (teal) */}
      <div className="py-6 px-5 border-r border-border/40">
        <Link
          to="/video-samples"
          onClick={onClose}
          className="flex items-center gap-2.5 mb-4 pb-3 border-b border-primary/20 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
            <PlayCircle className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold tracking-widest uppercase text-primary/70">Content Services</div>
            <div className="text-sm font-extrabold text-primary leading-tight">Video Content Samples</div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>
        <div className="flex flex-col gap-0.5">
          {videoSampleLinks.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
              <span className="truncate">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Column 3 - AI Data (navy/cyan) */}
      <div className="py-6 px-5 bg-gradient-to-b from-[hsl(220_85%_55%/0.08)] to-transparent relative">
        <div className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> New
        </div>
        <Link
          to="/samples#ai-data"
          onClick={onClose}
          className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[hsl(220_85%_55%/0.25)] group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] flex items-center justify-center shadow-soft">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[hsl(200_85%_50%)]/80">AI Data</div>
            <div className="text-sm font-extrabold text-[hsl(200_85%_45%)] leading-tight">AI Data Samples</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[hsl(200_85%_50%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>
        <div className="flex flex-col gap-0.5">
          {aiDataSamples.map((s) => {
            const SubIcon = s.icon;
            return (
              <Link
                key={s.slug}
                to={s.path}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/80 hover:text-[hsl(200_85%_45%)] hover:bg-[hsl(200_85%_55%/0.08)] rounded-lg transition-colors group"
              >
                <SubIcon className="w-3.5 h-3.5 text-[hsl(200_85%_55%)] flex-shrink-0" />
                <span className="truncate">{s.navLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Samples Mobile Accordion ─── */
const MobileSamplesAccordion = ({ onClose }: { onClose: () => void }) => {
  const [expanded, setExpanded] = useState<"text" | "video" | "ai-data" | null>("ai-data");
  const sections = [
    { id: "text" as const, label: "Text Content Samples", Icon: FileText, accent: "text-primary", items: textSampleLinks },
    { id: "video" as const, label: "Video Content Samples", Icon: PlayCircle, accent: "text-primary", items: videoSampleLinks },
    {
      id: "ai-data" as const,
      label: "AI Data Samples",
      Icon: Database,
      accent: "text-[hsl(200_85%_45%)]",
      isNew: true,
      items: aiDataSamples.map((s) => ({ label: s.navLabel, href: s.path })),
    },
  ];

  return (
    <div className="pl-2 pb-2">
      {sections.map((sec) => {
        const Icon = sec.Icon;
        const isOpen = expanded === sec.id;
        return (
          <div key={sec.id}>
            <button
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left transition-colors rounded-lg ${sec.accent} font-medium`}
              onClick={() => setExpanded(isOpen ? null : sec.id)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{sec.label}</span>
              {sec.isNew && (
                <span className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white">
                  New
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="pl-8 pb-1 animate-slide-up">
                <Link
                  to={sec.id === "ai-data" ? "/samples#ai-data" : sec.id === "text" ? "/text-samples" : "/video-samples"}
                  onClick={onClose}
                  className={`block px-3 py-1.5 text-xs font-semibold ${sec.accent} hover:underline mb-1`}
                >
                  View All →
                </Link>
                {sec.items.map((sub) => (
                  <Link
                    key={sub.href}
                    to={sub.href}
                    onClick={onClose}
                    className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-primary rounded-md"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Image Hover Mega Menu (About Us, AI Data Services) ─── */
const ImageHoverMegaMenu = ({ link, onClose }: { link: MainLink; onClose: () => void }) => {
  const [hoveredSub, setHoveredSub] = useState(0);
  const subs = link.dropdown!;
  const currentSub = subs[hoveredSub];

  return (
    <div
      className="absolute top-full -left-[200px] w-[800px] bg-card/95 rounded-3xl border border-border/50 shadow-elevated animate-slide-up z-50 overflow-hidden"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="flex min-h-[380px]">
        {/* Left: Links */}
        <div className="w-[300px] border-r border-border/40 py-6 bg-secondary/30 flex flex-col">
          <span className="px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">{link.label}</span>
          {subs.map((sub, i) => (
            <Link
              key={sub.label}
              to={sub.to}
              className={`flex items-center justify-between px-6 py-4 text-sm transition-all w-full group
                ${hoveredSub === i ? "bg-primary/5 text-primary font-bold border-l-4 border-primary" : "text-foreground/80 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"}`}
              onMouseEnter={() => setHoveredSub(i)}
              onClick={onClose}
            >
              <span>{sub.label}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${hoveredSub === i ? "translate-x-1 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary"}`} />
            </Link>
          ))}
        </div>

        {/* Right: Image Preview */}
        <div className="flex-1 p-8 flex flex-col bg-card">
          {currentSub && (
            <div className="flex flex-col h-full animate-fade-in group" key={currentSub.label}>
              <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-6 shadow-md border border-border/30">
                {currentSub.image ? (
                  <img src={currentSub.image} alt={currentSub.imageAlt || currentSub.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-sm">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 pointer-events-none" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">{currentSub.label}</h3>
              <p className="text-sm text-muted-foreground mb-auto leading-relaxed">{currentSub.description}</p>
              <Link
                to={currentSub.to}
                onClick={onClose}
                className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 py-2.5 px-4 rounded-xl transition-all w-fit group/btn shadow-md hover:shadow-lg"
              >
                Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Navbar ─── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileContentServicesOpen, setMobileContentServicesOpen] = useState(false);
  const [mobileAIDataServicesOpen, setMobileAIDataServicesOpen] = useState(false);
  const [mobileSamplesOpen, setMobileSamplesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const openDropdown = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(label);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {!isHome && <div aria-hidden="true" style={{ height: "100px" }} />}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className={`bg-gradient-primary py-1.5 sm:py-2 px-4 transition-all duration-300 ${scrolled ? "hidden sm:block" : ""}`}>
          <div className="container mx-auto flex flex-wrap items-center justify-between text-primary-foreground text-xs sm:text-sm">
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+919214445870" className="flex min-h-6 items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="whitespace-nowrap tracking-wide">+91 92144 45870</span>
              </a>
              <a href="mailto:info@eqourse.com" className="hidden min-h-6 sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-3.5 h-3.5" />
                <span>info@eqourse.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-0">
              {[
                { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/eqourse" },
                { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/eqourse/" },
                { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/eQOURSE-102057078229490" },
                { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@eqourse" },
                { name: "WhatsApp", icon: WhatsAppIcon, href: "https://wa.me/919214445870" }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-6 hover:opacity-80 transition-opacity flex items-center gap-1 text-[10px] sm:text-xs font-medium group"
                    aria-label={social.name}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-3 sm:h-3 group-hover:scale-110 transition-transform" />
                    <span className="hidden md:inline">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <nav
          className={`border-b transition-all duration-300 ${transparent
            ? "border-white/10"
            : "border-border/50 glass"
            }`}
          style={
            transparent
              ? {
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
              }
              : undefined
          }
        >
          <div className="container mx-auto flex items-center justify-between h-16 px-4">
            <Link
              to="/"
              className="flex items-center flex-shrink-0 relative h-8 sm:h-10"
            >
              {/* Dark logo — visible on light/scrolled backgrounds */}
              <img
                src={eqourseLogoDark}
                alt="eQOURSE Logo - Professional AI Data and Content Services"
                width={268}
                height={80}
                className={`h-8 sm:h-10 w-auto object-contain absolute left-0 top-0 transition-opacity duration-300 ${transparent ? 'opacity-0' : 'opacity-100'}`}
              />
              {/* Light logo — visible on transparent/dark hero background */}
              <img
                src={eqourseLogoLight}
                alt="eQOURSE Logo - Professional AI Data and Content Services"
                width={268}
                height={80}
                className={`h-8 sm:h-10 w-auto object-contain transition-opacity duration-300 ${transparent ? 'opacity-100' : 'opacity-0'}`}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => (link.dropdown || link.megaMenu || link.samplesMenu || link.subtext) && openDropdown(link.label)}
                  onMouseLeave={() => (link.dropdown || link.megaMenu || link.samplesMenu || link.subtext) && closeDropdownWithDelay()}
                >
                  {link.external ? (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener"
                      className={`px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        }`}
                    >
                      {link.label}
                      {(link.dropdown || link.samplesMenu) && <ChevronDown className="w-3.5 h-3.5" />}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className={`px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        }`}
                    >
                      {link.label}
                      {(link.dropdown || link.samplesMenu) && <ChevronDown className="w-3.5 h-3.5" />}
                    </Link>
                  )}

                  {/* Subtext tooltip */}
                  {link.subtext && activeDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card border border-border/50 shadow-elevated rounded-lg px-4 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap animate-fade-in-up z-50 pointer-events-none">
                      {link.subtext}
                    </div>
                  )}

                  {/* Mega‑menu for Content Services */}
                  {link.megaMenu && activeDropdown === link.label && (
                    <ContentServicesMegaMenu onClose={() => setActiveDropdown(null)} />
                  )}

                  {/* AI Data Services hierarchy mega-menu */}
                  {link.aiMegaMenu && activeDropdown === link.label && (
                    <AIDataServicesMegaMenu onClose={() => setActiveDropdown(null)} />
                  )}

                  {/* 3-column Samples Mega Menu */}
                  {link.samplesMenu && activeDropdown === link.label && (
                    <SamplesMegaMenu onClose={() => setActiveDropdown(null)} />
                  )}

                  {/* Image Hover Mega Menu for About Us / AI Data Services */}
                  {link.dropdown && !link.megaMenu && !link.aiMegaMenu && !link.samplesMenu && activeDropdown === link.label && (
                    <ImageHoverMegaMenu link={link} onClose={() => setActiveDropdown(null)} />
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className={
                  transparent
                    ? "border-white/40 text-white bg-white/5 hover:bg-white/15"
                    : "border-primary/30 text-primary hover:bg-primary/5"
                }
              >
                <Link to="/free-pilot">Free Pilot</Link>
              </Button>
              {isHome && (
                <Link
                  to="/career?pathway=vendor#future-opportunities"
                  className={`hidden xl:inline-flex min-h-9 items-center rounded-md px-2 text-xs font-semibold transition-colors ${
                    transparent
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-primary hover:bg-primary/5"
                  }`}
                >
                  Register as Vendor
                </Link>
              )}
              <Button asChild size="sm" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-opacity">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 ${transparent ? "text-white" : "text-foreground"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden glass border-t border-border/50 animate-slide-up max-h-[80dvh] overflow-y-auto shadow-md">
              <div className="container mx-auto py-6 px-4 flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isLinkActive = location.pathname.startsWith(link.to);
                  return (
                    <div key={link.label} className="w-full">
                      {link.megaMenu ? (
                        /* Content Services accordion for mobile */
                        <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden transition-colors">
                          <button
                            className={`w-full px-4 py-3.5 text-sm font-semibold flex items-center justify-between transition-colors ${mobileContentServicesOpen ? "bg-primary/5 text-primary" : "text-foreground/90 hover:bg-primary/5 hover:text-primary"}`}
                            onClick={() => setMobileContentServicesOpen(!mobileContentServicesOpen)}
                          >
                            <span>{link.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileContentServicesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                          </button>
                          {mobileContentServicesOpen && (
                            <div className="bg-secondary/10 border-t border-border/30 p-2">
                              <MobileContentServicesAccordion onClose={() => setIsOpen(false)} />
                            </div>
                          )}
                        </div>
                      ) : link.aiMegaMenu ? (
                        /* AI Data Services accordion for mobile */
                        <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden transition-colors">
                          <button
                            className={`w-full px-4 py-3.5 text-sm font-semibold flex items-center justify-between transition-colors ${mobileAIDataServicesOpen ? "bg-primary/5 text-primary" : "text-foreground/90 hover:bg-primary/5 hover:text-primary"}`}
                            onClick={() => setMobileAIDataServicesOpen(!mobileAIDataServicesOpen)}
                            aria-expanded={mobileAIDataServicesOpen}
                          >
                            <span>{link.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileAIDataServicesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                          </button>
                          {mobileAIDataServicesOpen && (
                            <div className="bg-secondary/10 border-t border-border/30 p-2">
                              <MobileAIDataServicesAccordion onClose={() => setIsOpen(false)} />
                            </div>
                          )}
                        </div>
                      ) : link.samplesMenu ? (
                        /* Samples accordion for mobile */
                        <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden transition-colors">
                          <button
                            className={`w-full px-4 py-3.5 text-sm font-semibold flex items-center justify-between transition-colors ${mobileSamplesOpen ? "bg-primary/5 text-primary" : "text-foreground/90 hover:bg-primary/5 hover:text-primary"}`}
                            onClick={() => setMobileSamplesOpen(!mobileSamplesOpen)}
                          >
                            <span className="flex items-center gap-2">
                              {link.label}
                              <span className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white shadow-sm">
                                New
                              </span>
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSamplesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                          </button>
                          {mobileSamplesOpen && (
                            <div className="bg-secondary/10 border-t border-border/30 p-2">
                              <MobileSamplesAccordion onClose={() => setIsOpen(false)} />
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Regular links & simple dropdowns */
                        <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden group hover:border-primary/30 transition-colors">
                          {link.external ? (
                            <a
                              href={link.to}
                              target="_blank"
                              rel="noopener"
                              className={`flex flex-col justify-center px-4 py-3.5 transition-colors ${isLinkActive ? "bg-primary/5 text-primary" : "bg-card text-foreground/90 hover:bg-primary/5 hover:text-primary"}`}
                              onClick={() => !link.dropdown && setIsOpen(false)}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="font-semibold text-sm">{link.label}</span>
                                {link.dropdown && <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                              </div>
                              {link.subtext && (
                                <span className="text-xs text-muted-foreground mt-1">{link.subtext}</span>
                              )}
                            </a>
                          ) : (
                            <Link
                              to={link.to}
                              className={`flex flex-col justify-center px-4 py-3.5 transition-colors ${isLinkActive ? "bg-primary/5 text-primary" : "bg-card text-foreground/90 hover:bg-primary/5 hover:text-primary"}`}
                              onClick={() => !link.dropdown && setIsOpen(false)}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="font-semibold text-sm">{link.label}</span>
                                {link.dropdown && <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                              </div>
                              {link.subtext && (
                                <span className="text-xs text-muted-foreground mt-1">{link.subtext}</span>
                              )}
                            </Link>
                          )}

                          {link.dropdown && (
                            <div className="bg-secondary/20 p-3 flex flex-col gap-2 border-t border-border/30">
                              {link.dropdown.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.to}
                                  className="group/sub flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent hover:border-border hover:bg-background hover:shadow-sm text-sm text-foreground/70 hover:text-primary transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 group-hover/sub:scale-125 transition-transform" />
                                  <span className="flex-1 font-medium">{sub.label}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                {isHome && (
                  <Link
                    to="/career?pathway=vendor#future-opportunities"
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-4 text-base font-bold text-primary transition-colors hover:bg-primary/10"
                  >
                    Register as a Vendor
                  </Link>
                )}
                <Button asChild className="mt-4 bg-gradient-primary border-0 text-primary-foreground shadow-md h-12 rounded-xl text-base font-bold">
                  <Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
