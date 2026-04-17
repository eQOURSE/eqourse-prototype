import { useState, useRef, useEffect } from "react";
import timeline2021 from "@/assets/timeline-2021.png";
import timeline2022 from "@/assets/timeline-2022.png";
import timeline2023 from "@/assets/timeline-2023.png";
import timeline2024 from "@/assets/timeline-2024.png";
import timeline2025 from "@/assets/timeline-2025.png";

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
    year: "2021",
    title: "The Beginning",
    shortDesc: "Founded with a mission to transform education.",
    fullDesc:
      "eQOURSE was established with a clear vision: to bridge the gap between quality educational content and accessible learning. Our founding team of passionate educators and technologists set out to create K-12 learning materials that truly make a difference. We started with a small but dedicated team of 15 content specialists working across 3 languages, laying the groundwork for what would become a leading EdTech content powerhouse.",
    image: timeline2021,
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Scaling Up",
    shortDesc: "Expanded to 10+ languages & EdTech partnerships.",
    fullDesc:
      "In our second year, eQOURSE achieved significant growth — expanding content delivery to over 10 Indian languages and forming strategic partnerships with major EdTech platforms. Our team grew to 100+ specialists as we introduced test-preparation content, curriculum alignment services, and instructional design capabilities. We onboarded marquee clients including eduKemy, Booxpand, and EMBIBE, establishing ourselves as a trusted content partner in the education ecosystem.",
    image: timeline2022,
    icon: "📈",
  },
  {
    year: "2023",
    title: "AI Data Division",
    shortDesc: "Launched AI training data services for ML teams.",
    fullDesc:
      "Recognising the exploding demand for high-quality AI training data, we launched our dedicated AI Data Services division. This marked our transformation into a dual-capability company. We began offering custom dataset collection, expert annotation & labeling, and data cleaning & validation services. Our linguists and domain experts started supporting NLP, Computer Vision, and Audio AI projects, handling text, image, video, and audio data modalities across 20+ languages with inter-annotator agreement consistently above 0.80.",
    image: timeline2023,
    icon: "🤖",
  },
  {
    year: "2024",
    title: "Going Global",
    shortDesc: "Singapore HQ, ISO certified, 200+ clients worldwide.",
    fullDesc:
      "2024 was our year of global acceleration. We established our Singapore headquarters, achieved ISO 9001 & 27001 certifications, and onboarded over 200 clients across education and AI sectors worldwide. Our RLHF (Reinforcement Learning from Human Feedback) capabilities attracted partnerships with leading AI labs. We expanded our workforce to 350+ specialists and introduced real-world model testing through our TuTrain platform, creating a closed-loop pipeline that enabled 20–40% faster model improvement for our clients.",
    image: timeline2024,
    icon: "🌏",
  },
  {
    year: "2025",
    title: "The Future Is Now",
    shortDesc: "500+ specialists, 30+ languages, industry leaders.",
    fullDesc:
      "Today, eQOURSE stands as an industry leader with 500+ specialists, supporting 30+ languages and serving clients across EdTech, AI, Healthcare, Legal, and Finance verticals. Our dual approach — combining deep educational expertise with production-grade AI data services — positions us uniquely in the market. With GDPR-ready processes, 98%+ accuracy benchmarks, and partnerships with startups and enterprises alike, we continue to push the boundaries of what's possible in education technology and artificial intelligence data quality.",
    image: timeline2025,
    icon: "⚡",
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
}: {
  milestone: Milestone;
  position: "above" | "below";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute z-50 w-[280px] md:w-[320px] left-1/2 -translate-x-1/2 transition-all duration-500 ease-out
        ${position === "above" ? "bottom-full mb-4" : "top-full mt-4"}
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
        className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-white/20 ${position === "above"
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
            From a passionate startup to a global dual-capability company —
            here's how we've grown.
          </p>
        </div>

        {/* ── DESKTOP TIMELINE (horizontal) ── */}
        <div className="hidden md:block" ref={timelineRef}>
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
                      className={`absolute whitespace-nowrap text-center ${index % 2 === 0
                          ? "top-full mt-4"
                          : "bottom-full mb-4"
                        }`}
                    >
                      <div className="text-2xl font-heading font-bold text-foreground tracking-tight">
                        {milestone.year}
                      </div>
                      <div className="text-xs font-semibold text-primary mt-0.5 tracking-wide">
                        {milestone.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 max-w-[140px] leading-snug">
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
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE TIMELINE (vertical) ── */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-[2px]">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div
                className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-primary via-accent to-primary transition-all duration-100"
                style={{ height: `${lineProgress}%` }}
              />
            </div>

            {milestones.map((milestone, index) => {
              const nodeThreshold = (index / (milestones.length - 1)) * 100;
              const isVisible = lineProgress >= nodeThreshold;
              const isActive = activeIndex === index;

              return (
                <div
                  key={milestone.year}
                  className="relative mb-12 last:mb-0"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.6s ease-out ${index * 0.15}s`,
                  }}
                >
                  {/* Pulse dot */}
                  <div
                    className="absolute left-[-22px] top-2 cursor-pointer"
                    onClick={() =>
                      setActiveIndex(isActive ? null : index)
                    }
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
                          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/40 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-70"
                            }`}
                        >
                          <span className="text-sm">{milestone.icon}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="ml-6">
                    <div className="text-xl font-heading font-bold text-foreground">
                      {milestone.year}
                    </div>
                    <div className="text-sm font-semibold text-primary mt-0.5">
                      {milestone.title}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {milestone.shortDesc}
                    </p>

                    {/* Expanded glass card on mobile */}
                    {isActive && (
                      <div
                        className="mt-4 rounded-2xl overflow-hidden border border-white/15 animate-[popupFadeIn_0.4s_ease-out_forwards]"
                        style={{
                          backdropFilter: "blur(20px) saturate(1.8)",
                          background:
                            "linear-gradient(135deg, hsla(0,0%,100%,0.85) 0%, hsla(160,30%,98%,0.75) 100%)",
                        }}
                      >
                        <div className="h-0.5 w-full bg-gradient-primary" />
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{milestone.icon}</span>
                            <h4 className="font-heading text-base font-bold text-foreground">
                              {milestone.title}
                            </h4>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {milestone.fullDesc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
