import { useEffect, useState } from "react";
import { CaseStudy } from "./caseStudyData";
import { X, ArrowRight, Target, Lightbulb, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ study, isOpen, onClose }: CaseStudyModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!study) return null;

  const isTeal = study.visualDirection.theme === "teal";
  const themeAccent = isTeal ? "text-primary" : "text-[#0ea5e9]";
  const themeBg = isTeal ? "bg-primary" : "bg-[#0ea5e9]";
  const themeGradient = isTeal ? "bg-gradient-primary" : "bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]";
  const themeBorder = isTeal ? "border-primary/20" : "border-[#0ea5e9]/20";
  const themeSoftBg = isTeal ? "bg-primary/5" : "bg-[#0ea5e9]/5";

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`} 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-5xl max-h-[95vh] h-full md:h-auto md:max-h-[85vh] bg-card rounded-t-2xl md:rounded-2xl border border-border/50 shadow-elevated overflow-hidden flex flex-col transition-all duration-500 ease-out transform ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-24 scale-95"
        }`}
      >
        {/* Header Ribbon */}
        <div className={`h-2 w-full ${themeGradient}`} />
        
        {/* Top Action Bar */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 overlay-scrollbar">
          {/* Header Section */}
          <div className="relative pt-12 md:pt-16 pb-10 px-6 md:px-12 bg-secondary/30 overflow-hidden">
            {/* Background Image with Morphing Layout Transition */}
            {study.image && (
              <motion.div 
                layoutId={`case-study-image-${study.id}`}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                <img 
                  src={study.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-[0.55] dark:opacity-70 transition-opacity duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background flex-1" />
              </motion.div>
            )}
            
            {/* Background design elements */}
            <div className={`absolute top-0 right-0 w-96 h-96 ${themeBg} opacity-[0.05] rounded-full blur-[100px] pointer-events-none z-0`} />
            
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-6">
                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${themeSoftBg} ${themeAccent} ${themeBorder} backdrop-blur-md bg-background/50`}>
                   {study.category}
                 </span>
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-background/50 backdrop-blur-md">
                   {study.industry}
                 </span>
              </div>
              
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-4xl drop-shadow-sm">
                {study.title}
              </h2>
              
              {/* Core Metrics Summary row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mt-8">
                {study.metrics.slice(0, 4).map((metric, i) => (
                  <div key={i} className={`p-4 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                    <div className={`text-xl md:text-2xl font-bold mb-1 ${themeAccent}`}>{metric.value}</div>
                    <div className="text-xs md:text-sm text-foreground/70 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Story Timeline (2/3 width) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* The Timeline */}
              <div className="relative border-l border-border/60 ml-3 md:ml-4 space-y-12 pb-4">
                
                {/* Problem */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-background border-2 ${themeBorder} flex items-center justify-center shadow-sm`}>
                    <Target className={`w-4 h-4 ${themeAccent}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Problem Statement</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {study.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-background border-2 ${themeBorder} flex items-center justify-center shadow-sm`}>
                    <Lightbulb className={`w-4 h-4 ${themeAccent}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Solution</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {study.solution}
                  </p>
                </div>

                {/* Impact */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full ${themeBg} border-2 border-background flex items-center justify-center shadow-md shadow-${themeBg}/20`}>
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Impact</h3>
                  <div className={`p-6 rounded-2xl border ${themeBorder} ${themeSoftBg}`}>
                    <p className="text-foreground leading-relaxed text-base font-medium">
                      {study.impact}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Sidebar (1/3 width) */}
            <div className="space-y-8">
              
              {/* All Metrics Box */}
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <h4 className="font-heading font-semibold mb-5 flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${themeAccent}`} />
                  Key Results
                </h4>
                <ul className="space-y-4">
                  {study.metrics.map((metric, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className={`font-bold text-lg ${themeAccent}`}>{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Services Links (Internal SEO Linking) */}
              <div>
                <h4 className="font-heading font-semibold mb-4 text-muted-foreground uppercase tracking-wider text-xs">
                  Services Used
                </h4>
                <div className="flex flex-col gap-2">
                  {study.relatedLinks.map((link, i) => (
                    <Link 
                      key={i}
                      to={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-border hover:bg-card hover:shadow-sm transition-all"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${themeAccent}`} />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
