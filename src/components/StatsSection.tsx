import { useEffect, useRef, useState } from "react";

const allStats = [
  { value: 7, suffix: "M+", label: "Students Reach", category: "edu" },
  { value: 20, suffix: "K+", label: "Content Solutions/Month", category: "edu" },
  { value: 15, suffix: "K+", label: "Q&A Videos/Month", category: "edu" },
  { value: 1, suffix: "M+", label: "Data Points Processed", category: "ai" },
  { value: 30, suffix: "+", label: "Languages Covered", category: "ai" },
  { value: 98, suffix: "%+", label: "Annotation Accuracy", category: "ai" },
  { value: 500, suffix: "+", label: "Specialists", category: "ai" },
];

const CountUpValue = ({ end, isVisible }: { end: number; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, isVisible]);
  return <>{count}</>;
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const isSwapping = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Seamless crossfade loop for the background video
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    vA.play().catch(() => {});

    const startCrossfade = (from: HTMLVideoElement, to: HTMLVideoElement) => {
      if (isSwapping.current) return;
      isSwapping.current = true;
      to.currentTime = 0;
      to.play().catch(() => {});
      to.style.zIndex = "2";
      to.style.opacity = "1";
      from.style.zIndex = "1";
      setTimeout(() => {
        from.pause();
        from.style.opacity = "0";
        isSwapping.current = false;
      }, 1600);
    };

    const onTimeUpdateA = () => {
      if (vA.duration && vA.currentTime >= vA.duration - 2) {
        startCrossfade(vA, vB);
      }
    };
    const onTimeUpdateB = () => {
      if (vB.duration && vB.currentTime >= vB.duration - 2) {
        startCrossfade(vB, vA);
      }
    };

    vA.addEventListener("timeupdate", onTimeUpdateA);
    vB.addEventListener("timeupdate", onTimeUpdateB);
    return () => {
      vA.removeEventListener("timeupdate", onTimeUpdateA);
      vB.removeEventListener("timeupdate", onTimeUpdateB);
    };
  }, []);

  const videoStyle = (initial: boolean): React.CSSProperties => ({
    objectFit: "cover",
    transition: "opacity 1.5s ease-in-out",
    opacity: initial ? 1 : 0,
    zIndex: initial ? 2 : 1,
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  });

  return (
    <section ref={ref} id="stats-section" className="py-20 relative overflow-hidden">
      {/* Background Video A */}
      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        style={videoStyle(true)}
        aria-hidden="true"
      >
        <source src="/assets/stats-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Background Video B — crossfade partner */}
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        style={videoStyle(false)}
        aria-hidden="true"
      >
        <source src="/assets/stats-bg-video.mp4" type="video/mp4" />
      </video>

      {/* On mobile, stretch the video instead of cropping */}
      <style>{`
        @media (max-width: 768px) {
          #stats-section video {
            object-fit: fill !important;
          }
        }
      `}</style>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-foreground/40 z-[3]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'hsl(170, 82%, 55%)' }}>Our Impact</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2" style={{ color: 'hsl(0, 0%, 100%)' }}>
            Our Impact in <span className="text-gradient">Numbers</span>
          </h2>
        </div>

        {/* Single flowing row of stats with dividers */}
        <div className="flex flex-wrap justify-center items-stretch">
          {allStats.map((stat, i) => (
            <div key={stat.label} className="relative group px-6 md:px-10 py-6 text-center">
              {/* Vertical divider */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary/15 hidden md:block" />
              )}

              {/* Animated ring behind number */}
              <div className="relative inline-block mb-3">
                <div className="text-4xl md:text-5xl font-extrabold font-heading" style={{ color: 'hsl(0, 0%, 100%)' }}>
                  <CountUpValue end={stat.value} isVisible={isVisible} />{stat.suffix}
                </div>
                {/* Glow on hover */}
                <div className="absolute -inset-4 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              </div>

              <div className="text-sm" style={{ color: 'hsl(242, 20%, 65%)' }}>{stat.label}</div>

              {/* Category tag */}
              <div className="mt-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  stat.category === "edu"
                    ? "text-primary bg-primary/10"
                    : "text-accent bg-accent/10"
                }`}>
                  {stat.category === "edu" ? "Education" : "AI Data"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
