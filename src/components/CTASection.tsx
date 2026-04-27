import { useRef, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const isSwapping = useRef(false);

  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    // Start video A
    vA.play().catch(() => {});

    const startCrossfade = (from: HTMLVideoElement, to: HTMLVideoElement) => {
      if (isSwapping.current) return;
      isSwapping.current = true;

      // Prepare the next video at beginning
      to.currentTime = 0;
      to.play().catch(() => {});

      // Bring the next video on top and fade it in
      // Keep the old video fully visible underneath — no white flash
      to.style.zIndex = "2";
      to.style.opacity = "1";
      from.style.zIndex = "1";
      // DO NOT set from.style.opacity = "0" yet

      // After the fade-in completes, pause the old one and hide it
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
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Video A — starts first */}
      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        style={videoStyle(true)}
        aria-hidden="true"
      >
        <source src="/assets/video-project.mp4" type="video/mp4" />
      </video>

      {/* Video B — fades in when A is near the end */}
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        style={videoStyle(false)}
        aria-hidden="true"
      >
        <source src="/assets/video-project.mp4" type="video/mp4" />
      </video>

      {/* Responsive stretch for mobile */}
      <style>{`
        @media (max-width: 768px) {
          #contact video {
            object-fit: fill !important;
          }
        }
      `}</style>

      {/* Very subtle overlay for text readability */}
      <div className="absolute inset-0 bg-foreground/15 z-[3]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(0, 0%, 100%)' }}>
          Ready to Power Your AI with Better Data?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'hsl(0, 0%, 85%)' }}>
          Start with a free pilot dataset, or explore our education solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/free-pilot">
            <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-10">
              Start Free Pilot Dataset <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:animate-pulse transition-all duration-300 px-8">
              <Phone className="mr-2 w-5 h-5" /> Schedule a Call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

