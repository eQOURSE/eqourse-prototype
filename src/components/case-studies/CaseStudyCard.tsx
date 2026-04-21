import { useRef, useState } from "react";
import { CaseStudy } from "./caseStudyData";
import { ArrowRight, BookOpen, Layers, BarChart, GraduationCap, Map, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
  index: number;
}

const getIcon = (category: string) => {
  if (category === "EdTech Solutions") return <GraduationCap className="w-4 h-4" />;
  return <Layers className="w-4 h-4" />;
};

const CaseStudyCard = ({ study, onClick, index }: CaseStudyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });
  const isTeal = study.visualDirection.theme === "teal";
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation from -5 to +5 degrees
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  const borderClass = isTeal ? "border-l-primary" : "border-l-[#0ea5e9]";
  const bgHoverClass = isTeal ? "hover:bg-primary/[0.02]" : "hover:bg-[#0ea5e9]/[0.02]";
  const shadowGlowClass = isTeal ? "hover:shadow-[0_0_30px_hsl(170_82%_32%_/_0.15)]" : "hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]";
  const badgeClass = isTeal 
    ? "bg-primary/10 text-primary border-primary/20 backdrop-blur-md" 
    : "bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20 backdrop-blur-md";

  return (
    <div 
      className={`reveal-up visible animate-slide-up h-full flex flex-col`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`group cursor-pointer relative flex flex-col h-full bg-card rounded-2xl border-y border-r border-border border-l-4 ${borderClass} shadow-sm transition-all duration-300 ease-out ${bgHoverClass} ${shadowGlowClass} overflow-hidden`}
        style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl pointer-events-none z-0">
          <div className={`absolute -inset-1 blur-2xl ${isTeal ? 'bg-primary/10' : 'bg-[#0ea5e9]/10'}`} />
        </div>

        {/* Card Image Header */}
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <motion.div layoutId={`case-study-image-${study.id}`} className="absolute inset-0 bg-secondary/20 z-0">
            {study.image && (
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            )}
          </motion.div>
          {/* subtle gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
          
          <div className="absolute top-4 left-4 z-20">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-background/80 ${badgeClass}`}>
              {getIcon(study.category)}
              <span>{study.category}</span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 relative z-10 flex flex-col h-full bg-card">
          {/* Title & Summary */}
          <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
            {study.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
            {study.cardSummary}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
              <Map className="w-3 h-3" />
              {study.region.split('(')[0].trim()}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
              <Users className="w-3 h-3" />
              {study.industry.split('/')[0].trim()}
            </span>
          </div>

          {/* Key Metric Snapshot */}
          <div className={`mt-auto mb-6 p-4 rounded-xl border ${isTeal ? 'bg-primary/5 border-primary/10' : 'bg-[#0ea5e9]/5 border-[#0ea5e9]/10'} transform-style-3d group-hover:translate-z-6 transition-transform duration-300`}>
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isTeal ? 'bg-gradient-primary shadow-soft text-white' : 'bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] shadow-[0_4px_15px_rgba(14,165,233,0.3)] text-white'}`}>
                  <BarChart className="w-5 h-5" />
               </div>
               <div>
                  <div className={`text-xl font-bold leading-none ${isTeal ? 'text-primary' : 'text-[#0ea5e9]'}`}>
                    {study.metrics[0]?.value}
                  </div>
                  <div className="text-xs text-foreground/70 font-medium mt-1 line-clamp-1">
                    {study.metrics[0]?.label}
                  </div>
               </div>
             </div>
          </div>
          
          {/* Footer CTA */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
            <span className="text-xs text-muted-foreground truncate mr-4">
              {study.serviceTags[0]} {study.serviceTags.length > 1 && `+${study.serviceTags.length - 1}`}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1 shrink-0 ${isTeal ? 'text-primary' : 'text-[#0ea5e9]'}`}>
              Read Story <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;

