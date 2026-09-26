import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Play, Database, Brain, Sparkles, Star, BookOpen, MessageCircle, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroVideoPoster from "@/assets/hero-video-poster.webp";

const slides = [
  {
    badge: "AI Data Services",
    headline: "AI Data Services & Content Solutions ",
    highlightedText: "for Global Teams",
    cta: "Explore AI Data Services",
    ctaLink: "/ai-data-services",
    ctaIsHash: false,
    icon: Database,
  },
  {
    badge: "AI Data Services",
    headline: "High-Quality Training Data for",
    highlightedText: "AI That Works in Production",
    cta: "Explore AI Data Services",
    ctaLink: "/ai-data-services",
    ctaIsHash: false,
    icon: Database,
  },
  {
    badge: "AI Data Services",
    headline: "Closed-Loop Model Testing with",
    highlightedText: "Real-User Feedback & 98%+ Data Accuracy",
    cta: "Explore AI Data Services",
    ctaLink: "/ai-data-services",
    ctaIsHash: false,
    icon: Brain,
  },
  {
    badge: "✦ Content & Learning Solutions",
    headline: "Scalable Content Solutions ",
    highlightedText: "For Businesses That Depend on Accuracy and Quality",
    cta: "Explore Content Services",
    ctaLink: "/content-services",
    ctaIsHash: false,
    icon: Sparkles,
  },
  {
    badge: "⚙ Corporate Learning & Performance",
    headline: "Enterprise Learning Content ",
    highlightedText: "Engineered for Scale",
    cta: "Explore Content Services",
    ctaLink: "/content-services",
    ctaIsHash: false,
    icon: BookOpen,
  },
  {
    badge: "End-to-End Services",
    headline: "500+ Specialists Delivering",
    highlightedText: "AI Data & Content Services Worldwide",
    cta: "See All Services",
    ctaLink: "#services",
    ctaIsHash: true,
    icon: Sparkles,
  },
];

// Static hero stats (no count-up animation)
const heroStats = [
  { value: "500+", label: "Specialists" },
  { value: "30+", label: "Languages" },
  { value: "98%+", label: "Accuracy" },
  { value: "200+", label: "Clients" },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM5.5 10h2.88v8.5H5.5V10zm4.72 0h2.76v1.16h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.44 1.91 3.44 4.4V18.5H16.2v-3.94c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21V18.5H10.22V10z" fill="white" />
  </svg>
);

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(idx);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating],
  );

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      aria-label="eQOURSE AI data services and content solutions"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideoPoster}
          aria-hidden="true"
        >
          <source src="https://cdn.eqourse.com/assets/hero-bg-3d-optimized.mp4" type="video/mp4" />
        </video>
        {/* Layered overlays for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(242 33% 10% / 0.8) 0%, hsl(242 33% 14% / 0.65) 45%, hsl(170 60% 14% / 0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(170 82% 60%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-10 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-56 lg:pb-48 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: rotating content */}
          <div className="lg:col-span-7 space-y-6" key={current}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 backdrop-blur-md animate-slide-up">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold" style={{ color: "hsl(170, 82%, 65%)" }}>
                {slide.badge}
              </span>
            </div>

            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] animate-slide-up text-white"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
            >
              {slide.headline} <span className="text-gradient">{slide.highlightedText}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 pt-2 animate-slide-up-delayed-2">
              {slide.ctaIsHash ? (
                <Button
                  size="lg"
                  className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-8"
                  asChild
                >
                  <a
                    href={slide.ctaLink}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById("services");
                      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-8"
                  asChild
                >
                  <Link to={slide.ctaLink}>
                    {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              )}

              {/* Slide indicators inline next to CTA for better balance */}
              <div className="flex items-center pl-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="group flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-5 bg-primary" : "w-1.5 bg-white/40 group-hover:bg-white/60"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 lg:hidden">
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                <Link to="/contact-us">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" className="border-0 bg-[#20c997] text-[#071b19] hover:bg-[#35d8aa]">
                <a href="https://wa.me/919214445870?text=Hello%20eQOURSE%2C%20I%20would%20like%20to%20discuss%20your%20AI%20Data%20and%20Content%20Services." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* RIGHT: immediate service orientation, intentionally cardless */}
          <aside className="relative hidden lg:col-span-5 lg:block" aria-label="eQOURSE service practices">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">One partner · two specialist practices</p>
            <p className="mt-3 max-w-md font-heading text-2xl font-bold leading-tight text-white">
              AI training data first. Expert learning content alongside it.
            </p>

            <div className="mt-8 border-y border-white/15">
              <Link to="/ai-data-services" className="group grid grid-cols-[2.5rem_1fr_auto] gap-4 border-b border-white/15 py-6">
                <span className="font-mono text-xs text-primary">01</span>
                <span>
                  <span className="block font-heading text-xl font-bold text-white">AI Data Services</span>
                  <span className="mt-2 block text-sm leading-6 text-white/65">Collect, annotate, clean and test production AI data across language, vision, speech and robotics.</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/content-services" className="group grid grid-cols-[2.5rem_1fr_auto] gap-4 py-6">
                <span className="font-mono text-xs text-primary">02</span>
                <span>
                  <span className="block font-heading text-xl font-bold text-white">Content Services</span>
                  <span className="mt-2 block text-sm leading-6 text-white/65">Build accurate learning content, localization and digital education programmes at scale.</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("about");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "center" });
                  window.dispatchEvent(new Event("eqourse:play-about-video"));
                }
              }}
              className="group mt-7 inline-flex items-center gap-3 text-sm font-bold text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-primary/15 transition-colors group-hover:bg-primary">
                <Play className="h-4 w-4 fill-white text-white" />
              </span>
              Watch how eQOURSE works
            </a>
          </aside>
        </div>
      </div>

      {/* ── Bottom proof bar: stats (left) + Watch Video & primary CTA (centered) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 lg:pb-8 pointer-events-none">
        {/* Soft gradient fade behind the bar for separation from hero content */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,12,28,0.55) 0%, rgba(10,12,28,0.25) 55%, transparent 100%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          {/* Desktop layout (xl+): stats absolute-left, CTA absolute-center, never overlap */}
          <div className="hidden xl:block relative h-[120px]">
            {/* LEFT: compact stats card */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-auto flex items-center justify-between gap-5 px-5 py-3 rounded-2xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(15,18,35,0.6) 0%, rgba(15,40,40,0.4) 100%)",
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                boxShadow: "0 12px 40px -12px rgba(0,0,0,0.45)",
              }}
              aria-label="Key metrics"
            >
              {heroStats.map((stat, idx) => (
                <div key={stat.label} className="flex items-center gap-5">
                  <div>
                    <div className="text-xl font-extrabold text-gradient leading-none whitespace-nowrap">
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.14em] mt-1.5 font-semibold whitespace-nowrap"
                      style={{ color: "hsl(242, 20%, 78%)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {idx < heroStats.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="h-7 w-px"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)",
                      }}
                    />
                  )}
                </div>
              ))}
              <div className="h-8 w-px bg-white/15" aria-hidden="true" />
              <div className="flex items-center gap-2.5">
                <GoogleIcon />
                <div><div className="flex gap-0.5">{[1,2,3,4].map(s=><Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400"/>)}<Star className="h-3 w-3 fill-yellow-400 text-yellow-400"/></div><div className="mt-1 text-[10px] text-white/70"><strong className="text-white">4.5/5</strong> Google</div></div>
              </div>
              <div className="h-8 w-px bg-white/15" aria-hidden="true" />
              <div className="flex items-center gap-2.5"><LinkedInIcon/><div><div className="text-xs font-bold text-white">23K+ Followers</div><div className="text-[10px] text-white/60">LinkedIn community</div></div></div>
              <div className="h-8 w-px bg-white/15" aria-hidden="true" />
              <div className="flex items-center gap-2.5"><ShieldCheck className="h-5 w-5 text-primary"/><div><div className="text-xs font-bold text-white">ISO Certified</div><div className="text-[10px] text-white/60">9001 · 27001</div></div></div>
            </div>

            {/* CENTER: CTA stack, absolute centered */}
            <nav
              className="hidden"
              aria-label="Jump to services section"
            >
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("about");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "center" });
                    window.dispatchEvent(new Event("eqourse:play-about-video"));
                    setTimeout(() => {
                      const iframe = document.getElementById("about-video-player") as HTMLIFrameElement;
                      if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      }
                    }, 800);
                  }
                }}
                aria-label="Watch eQOURSE Video"
                className="group flex items-center gap-2.5 px-5 py-2 rounded-full text-white text-sm font-semibold
                           border border-white/20 hover:border-white/40 transition-all hover:scale-[1.03]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                style={{
                  background: "rgba(15,18,35,0.55)",
                  backdropFilter: "blur(14px) saturate(140%)",
                  WebkitBackdropFilter: "blur(14px) saturate(140%)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.30)",
                }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-primary"
                  style={{ boxShadow: "0 0 10px rgba(20,184,166,0.45)" }}
                >
                  <Play className="w-3 h-3 text-white fill-white" />
                </span>
                <span className="tracking-wide">Watch Video</span>
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="hero-services-cta group relative flex items-center gap-2.5 px-7 py-3.5 md:px-9 md:py-4 rounded-full cursor-pointer select-none
                         transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.22) 0%, rgba(15,18,35,0.7) 100%)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  border: "1px solid rgba(20,184,166,0.4)",
                  boxShadow:
                    "0 0 24px rgba(20,184,166,0.28), 0 0 60px rgba(20,184,166,0.12), 0 10px 32px rgba(0,0,0,0.32)",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: "1.5px solid rgba(20,184,166,0.4)",
                    animation: "heroCTAPulse 2.4s ease-in-out infinite",
                  }}
                />
                <span
                  className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(170,82%,32%), hsl(165,75%,50%))",
                    boxShadow: "0 0 12px rgba(20,184,166,0.4)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </span>
                <span
                  className="text-sm md:text-base font-bold tracking-wide text-white whitespace-nowrap"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
                >
                  AI Data & Content Services
                </span>
                <ChevronDown
                  className="w-4 h-4 md:w-5 md:h-5 text-primary/80 group-hover:text-primary transition-colors"
                  style={{ animation: "heroCTABounce 1.6s ease-in-out infinite" }}
                />
              </a>
            </nav>
          </div>

          {/* Tablet & smaller-desktop layout (lg only): CTA centered, stats stack BELOW so no overlap */}
          <div className="hidden">
            <nav
              className="flex flex-col items-center gap-3"
              aria-label="Jump to services section"
            >
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("about");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "center" });
                    window.dispatchEvent(new Event("eqourse:play-about-video"));
                    setTimeout(() => {
                      const iframe = document.getElementById("about-video-player") as HTMLIFrameElement;
                      if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      }
                    }, 800);
                  }
                }}
                aria-label="Watch eQOURSE Video"
                className="group flex items-center gap-2.5 px-5 py-2 rounded-full text-white text-sm font-semibold
                           border border-white/20 hover:border-white/40 transition-all hover:scale-[1.03]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                style={{
                  background: "rgba(15,18,35,0.55)",
                  backdropFilter: "blur(14px) saturate(140%)",
                  WebkitBackdropFilter: "blur(14px) saturate(140%)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.30)",
                }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-primary"
                  style={{ boxShadow: "0 0 10px rgba(20,184,166,0.45)" }}
                >
                  <Play className="w-3 h-3 text-white fill-white" />
                </span>
                <span className="tracking-wide">Watch Video</span>
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="hero-services-cta group relative flex items-center gap-2.5 px-7 py-3.5 rounded-full cursor-pointer select-none
                         transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.22) 0%, rgba(15,18,35,0.7) 100%)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  border: "1px solid rgba(20,184,166,0.4)",
                  boxShadow:
                    "0 0 24px rgba(20,184,166,0.28), 0 0 60px rgba(20,184,166,0.12), 0 10px 32px rgba(0,0,0,0.32)",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: "1.5px solid rgba(20,184,166,0.4)",
                    animation: "heroCTAPulse 2.4s ease-in-out infinite",
                  }}
                />
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(170,82%,32%), hsl(165,75%,50%))",
                    boxShadow: "0 0 12px rgba(20,184,166,0.4)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </span>
                <span
                  className="text-sm font-bold tracking-wide text-white whitespace-nowrap"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
                >
                  AI Data & Content Services
                </span>
                <ChevronDown
                  className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors"
                  style={{ animation: "heroCTABounce 1.6s ease-in-out infinite" }}
                />
              </a>
            </nav>
          </div>

          {/* MOBILE & TABLET stats strip (below CTA on lg, stacked on mobile) */}
          <div className="xl:hidden mt-6 pointer-events-auto">
            <div
              className="grid grid-cols-4 gap-2 px-4 py-3 rounded-2xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(15,18,35,0.55) 0%, rgba(15,40,40,0.35) 100%)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
              }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-base font-extrabold text-gradient leading-none">{stat.value}</div>
                  <div
                    className="text-[9px] uppercase tracking-wider mt-1 font-semibold"
                    style={{ color: "hsl(242, 20%, 78%)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#0f1223]/65 px-2 py-3 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 px-1"><GoogleIcon/><div className="text-[9px] leading-tight text-white/65"><strong className="block text-[11px] text-white">4.5/5</strong>Google</div></div>
              <div className="flex items-center justify-center gap-2 px-1"><LinkedInIcon/><div className="text-[9px] leading-tight text-white/65"><strong className="block text-[11px] text-white">23K+</strong>Followers</div></div>
              <div className="flex items-center justify-center gap-2 px-1"><ShieldCheck className="h-5 w-5 text-primary"/><div className="text-[9px] leading-tight text-white/65"><strong className="block text-[11px] text-white">ISO</strong>9001 · 27001</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
