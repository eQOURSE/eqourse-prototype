import { useState, useRef, useEffect } from "react";
import timeline2020 from "@/assets/timeline-2020.png";
import timeline2021 from "@/assets/timeline-2021.png";
import timeline2022 from "@/assets/timeline-2022.png";
import timeline2023 from "@/assets/timeline-2023.png";
import timeline2024 from "@/assets/timeline-2024.png";
import timeline2025 from "@/assets/timeline-2025.png";
import timeline2026 from "@/assets/timeline-2026.png";

/* ── Milestone data ── */
interface Milestone {
  year: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  icon: string;
}

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Foundation Phase",
    shortDesc: "Built the foundation for structured learning systems.",
    fullDesc: "eQOURSE began with a focused vision to strengthen learning and digital content ecosystems through curriculum development, assessments, and structured academic workflows. Early projects in CMS/LMS systems and international curriculum support laid the groundwork for scalable, process-driven execution across learning platforms.",
    image: timeline2020,
    icon: "🏗️",
  },
  {
    year: "2021",
    title: "The Beginning",
    shortDesc: "Expanded into multilingual and distributed learning workflows.",
    fullDesc: "As demand grew, our capabilities expanded into multilingual content delivery, assessment frameworks, transcription workflows, and SME-driven execution systems. This phase strengthened our expertise in structured content operations and scalable learning delivery across platforms and regions.",
    image: timeline2021,
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Scaling Up",
    shortDesc: "Evolved into large-scale learning ecosystems.",
    fullDesc: "By 2022, our work expanded into integrated learning ecosystems combining instructional modules, multimedia learning, worksheets, multilingual adaptation, and instructor-led delivery systems. During this phase, we also executed a major international engagement delivering over 10,000 STEM video solutions across K–12 and college-level subjects spanning multiple disciplines.",
    image: timeline2022,
    icon: "📈",
  },
  {
    year: "2023",
    title: "AI Data Division",
    shortDesc: "Expanded into AI-aligned systems and future learning programs.",
    fullDesc: "As AI adoption accelerated globally, eQOURSE expanded into AI-aligned ecosystems through multilingual datasets, validation systems, AI quality workflows, and annotation pipelines. Alongside this, we launched large-scale digital literacy, coding, and AI learning programs supported by AI-generated videos, 2D learning content, and simulation-based learning systems.",
    image: timeline2023,
    icon: "🤖",
  },
  {
    year: "2024",
    title: "Going Global",
    shortDesc: "Strengthened global capability and validation systems.",
    fullDesc: "This phase marked significant global expansion through multilingual delivery systems, compliance-driven workflows, government and institutional collaborations, and real-world validation frameworks. With ISO-certified operations, RLHF workflows, and multilingual execution across large-scale programs, eQOURSE strengthened its position as a global learning and AI solutions partner.",
    image: timeline2024,
    icon: "🌏",
  },
  {
    year: "2025",
    title: "Integration at Scale",
    shortDesc: "Unified content, AI, localization, and validation ecosystems.",
    fullDesc: "By 2025, our systems evolved into fully integrated pipelines connecting content creation, localization, video production, assessments, and AI-supported workflows. This phase also marked the establishment of our Singapore headquarters and the launch of TUTRAIN, enabling real learner feedback and continuous refinement across learning and AI systems.",
    image: timeline2025,
    icon: "⚡",
  },
  {
    year: "2026",
    title: "Unified Ecosystem",
    shortDesc: "Learning and AI systems operating as one evolving ecosystem.",
    fullDesc: "Today, eQOURSE operates as a mature dual-capability ecosystem where learning content systems, AI data pipelines, multilingual delivery frameworks, and real-world validation mechanisms function together continuously. With global delivery capabilities, scalable infrastructure, and integrated execution models, we continue building meaningful impact across learning and intelligent systems worldwide.",
    image: timeline2026,
    icon: "🔮",
  },
];

/* ── Pulse animation ring component ── */
const PulseRing = ({ isActive }: { isActive: boolean }) => (
  <div className="absolute inset-0 rounded-full">
    {/* Outer pulse ring */}
    <div
      className={`absolute inset-[-6px] rounded-full border-2 transition-all duration-500 ${isActive
        ? "border-primary/50 animate-[pulse-ring_2s_ease-out_infinite]"
        : "border-primary/20 animate-[pulse-ring_3s_ease-out_infinite]"
        }`}
    />
    {/* Inner glow */}
    <div
      className={`absolute inset-[-3px] rounded-full transition-all duration-500 ${isActive
        ? "bg-primary/20 shadow-[0_0_20px_hsl(170_82%_32%/0.4)]"
        : "bg-primary/5"
        }`}
    />
  </div>
);

/* ── Glassmorphism popup card ── */
const GlassPopup = ({
  milestone,
  position,
  onMouseEnter,
  onMouseLeave,
  index
}: {
  milestone: Milestone;
  position: "above" | "below";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute z-70 w-[280px] md:w-[320px] left-1/2 -translate-x-1/2 transition-all duration-500 ease-out
        ${position === "above" ? "bottom-full mb-4" : "top-full mt-4"} ${index === 0 ? "md:!left-0 md:!translate-x-0" : ""} ${index === 6 ? " md:!left-auto md:!right-0 md:!translate-x-0" : ""}
        animate-[popupFadeIn_0.4s_ease-out_forwards]
      `}
    >
      {/* Glass card */}
      <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-[0_8px_40px_-12px_hsl(170_82%_32%/0.25),0_0_20px_hsl(170_82%_32%/0.08)]"
        style={{
          backdropFilter: "blur(20px) saturate(1.8)",
          background: "linear-gradient(135deg, hsla(0,0%,100%,0.85) 0%, hsla(160,30%,98%,0.75) 100%)",
        }}
      >
        {/* Decorative gradient stripe at top */}
        <div className="h-1 w-full bg-gradient-primary" />

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={milestone.image}
            alt={milestone.title}
            className="w-full h-28 object-cover"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
          {/* Year badge on image */}
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-gradient-primary text-white text-[10px] font-bold tracking-wider shadow-soft">
            {milestone.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{milestone.icon}</span>
            <h4 className="font-heading text-sm md:text-base font-bold text-foreground leading-tight">
              {milestone.title}
            </h4>
          </div>
          <p className="text-muted-foreground text-[11px] md:text-[12px] leading-relaxed">
            {milestone.fullDesc}
          </p>
        </div>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          <div className="w-1 h-1 rounded-full bg-primary/30" />
          <div className="w-1 h-1 rounded-full bg-primary/20" />
          <div className="w-1 h-1 rounded-full bg-primary/10" />
        </div>
      </div>

      {/* Arrow/pointer */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-white/20 
          ${index === 0 ? "md:left-5 md:-translate-x-0" : ""} ${index === 6 ? " md:!left-auto md:!right-5 md:-translate-x-0" : ""}
          ${position === "above"
            ? "bottom-[-6px] border-t-0 border-l-0"
            : "top-[-6px] border-b-0 border-r-0"
          }`}
        style={{
          backdropFilter: "blur(20px)",
          background: position === "above"
            ? "hsla(160,30%,98%,0.75)"
            : "hsla(0,0%,100%,0.85)",
        }}
      />
    </div>
  );
};

/* ── Main Timeline Component ── */
const JourneyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [popupHovered, setPopupHovered] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Animate the line "drawing" on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate line filling up
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
              }
              setLineProgress(progress);
            }, 20);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNodeEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleNodeLeave = () => {
    // Delay to allow popup hover
    setTimeout(() => {
      if (!popupHovered) setActiveIndex(null);
    }, 200);
  };

  const handlePopupEnter = () => {
    setPopupHovered(true);
  };

  const handlePopupLeave = () => {
    setPopupHovered(false);
    setActiveIndex(null);
  };

  // Close popup when popupHovered changes to false
  useEffect(() => {
    if (!popupHovered && activeIndex !== null) {
      const timer = setTimeout(() => setActiveIndex(null), 300);
      return () => clearTimeout(timer);
    }
  }, [popupHovered]);

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      className="py-24 relative z-20"
      style={{
        background:
          "linear-gradient(180deg, hsl(160 30% 98%) 0%, hsl(160 20% 95%) 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Background decorative elements */}
      <svg className="absolute top-20 left-10 w-48 h-48 text-primary/5 pointer-events-none" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute bottom-20 right-10 w-64 h-64 text-accent/5 pointer-events-none" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">
            Our Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Five Years of{" "}
            <span className="text-gradient">Impact & Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From a passionate startup to a global dual-capability company -
            here's how we've grown.
          </p>
        </div>

        {/* ── DESKTOP TIMELINE (horizontal) ── */}
        <div className="hidden md:block overflow-x-clip overflow-y-visible" ref={timelineRef}>
          <div className="relative">
            {/* The main connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2">
              {/* Track */}
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              {/* Animated fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 ease-linear"
                style={{ width: `${lineProgress}%` }}
              />
              {/* Glow effect on the fill */}
              <div
                className="absolute inset-y-[-2px] left-0 rounded-full bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 blur-sm transition-all duration-100 ease-linear"
                style={{ width: `${lineProgress}%` }}
              />
            </div>

            {/* Milestone nodes */}
            <div className="relative flex justify-between items-center py-32">
              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;
                const popupPosition = index % 2 === 0 ? "above" : "below";
                // Stagger appearance based on line progress
                const nodeThreshold = (index / (milestones.length - 1)) * 100;
                const isVisible = lineProgress >= nodeThreshold;

                return (
                  <div
                    key={milestone.year}
                    className="relative flex flex-col items-center"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "scale(1) translateY(0)"
                        : "scale(0.5) translateY(20px)",
                      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                    }}
                  >
                    {/* Year label - alternating position */}
                    <div
                      className={`absolute text-center ${index % 2 === 0
                        ? "top-full mt-4"
                        : "bottom-full mb-4"
                        } ${index === 0 ? " md:left-0 md:text-left" : ""} ${index === milestones.length - 1 ? " md:right-0 md:text-right" : ""}`}
                    >
                      <div className="text-2xl font-heading font-bold text-foreground tracking-tight">
                        {milestone.year}
                      </div>
                      <div className="text-xs font-semibold text-primary mt-0.5 tracking-wide">
                        {milestone.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 min-w-[200px] w-full leading-snug">
                        {milestone.shortDesc}
                      </div>
                    </div>

                    {/* Pulse node */}
                    <div
                      className="relative cursor-pointer group"
                      onMouseEnter={() => handleNodeEnter(index)}
                      onMouseLeave={handleNodeLeave}
                    >
                      {/* Pulse rings */}
                      <PulseRing isActive={isActive} />

                      {/* Main dot with thumbnail */}
                      <div
                        className={`relative w-14 h-14 rounded-full overflow-hidden border-[3px] transition-all duration-400 ${isActive
                          ? "border-primary scale-125 shadow-[0_0_25px_hsl(170_82%_32%/0.5)]"
                          : "border-primary/50 group-hover:border-primary group-hover:scale-110 shadow-[0_0_10px_hsl(170_82%_32%/0.2)]"
                          }`}
                      >
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay with icon */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/40 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-70 group-hover:opacity-30"
                            }`}
                        >
                          <span className="text-lg drop-shadow-sm">
                            {milestone.icon}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Popup */}
                    {isActive && (
                      <GlassPopup
                        milestone={milestone}
                        position={popupPosition}
                        onMouseEnter={handlePopupEnter}
                        onMouseLeave={handlePopupLeave}
                        index={index}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE TIMELINE (vertical) ── */}
        <div className="md:hidden flex flex-col w-full">
          {milestones.map((milestone, index) => {
            const nodeThreshold = (index / (milestones.length - 1)) * 100;
            const isVisible = lineProgress >= nodeThreshold;
            const isActive = activeIndex === index;

            return (
              <div
                key={milestone.year}
                className="w-full mb-6 last:mb-0"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "none" : "translateX(-20px)",
                  transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                {/* Timeline row: dot + text */}
                <div className="flex items-start gap-3">
                  {/* Pulse dot */}
                  <div
                    className="flex-shrink-0 cursor-pointer mt-1"
                    onClick={() => setActiveIndex(isActive ? null : index)}
                  >
                    <div className="relative">
                      <PulseRing isActive={isActive} />
                      <div
                        className={`relative w-10 h-10 rounded-full overflow-hidden border-[2px] transition-all duration-300 ${isActive
                          ? "border-primary scale-110 shadow-[0_0_20px_hsl(170_82%_32%/0.5)]"
                          : "border-primary/50"
                          }`}
                      >
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/40 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-70"}`}
                        >
                          <span className="text-sm">{milestone.icon}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-heading font-bold text-foreground">
                      {milestone.year}
                    </div>
                    <div className="text-sm font-semibold text-primary mt-0.5">
                      {milestone.title}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {milestone.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Expanded card - takes full width of the container */}
                {isActive && (
                  <div
                    className="mt-3 w-full rounded-2xl overflow-hidden border border-white/15 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-elevated"
                    style={{
                      backdropFilter: "blur(20px) saturate(1.8)",
                      background:
                        "linear-gradient(135deg, hsla(0,0%,100%,0.92) 0%, hsla(160,30%,98%,0.85) 100%)",
                    }}
                  >
                    <div className="h-1 w-full bg-gradient-primary" />
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{milestone.icon}</span>
                        <h4 className="font-heading text-base font-bold text-foreground">
                          {milestone.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {milestone.fullDesc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom hint text */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm italic">
            Hover over any milestone to explore our journey in detail
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
