import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Play, Database, Brain, Sparkles, Star, BookOpen, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const slides = [
  {
    badge: "EdTech Solutions",
    headline: "Partnering with EdTech Leaders to",
    highlightedText: "Design and Create Top Quality E-Learning Content",
    subtext:
      "Quality and cost-effective academic services for e-learning platforms. Specializing in content development, localization, and accessibility across 30+ languages.",
    cta: "Explore EdTech Solutions",
    ctaLink: "#services",
    icon: Sparkles,
  },
  {
    badge: "AI Data Services",
    headline: "High-Quality Training Data for",
    highlightedText: "AI That Works in Production",
    subtext:
      "Custom dataset collection, expert annotation, and real-world model testing across 30+ languages. Backed by 500+ specialists and a 98%+ accuracy guarantee.",
    cta: "Explore AI Data Services",
    ctaLink: "#ai-services",
    icon: Database,
  },
  {
    badge: "Model Testing",
    headline: "Don't Just Train Your AI.",
    highlightedText: "Test It on Reality.",
    subtext:
      "The only data partner that tests your model with real users before you deploy. Dialect audits, A/B testing, active learning loops.",
    cta: "Learn About Model Testing",
    ctaLink: "#pipeline",
    icon: Brain,
  },
  {
    badge: "Dual Capability",
    headline: "From Education Content to AI Training Data,",
    highlightedText: "One Partner",
    subtext:
      "Expert EdTech content development for learning platforms and high-quality AI training data services for ML teams. Custom datasets in 30+ languages, 500+ domain specialists, and ISO 9001 and ISO 27001 certified.",
    cta: "See All Services",
    ctaLink: "#services",
    icon: Sparkles,
  },
];

const aiHighlightLines = [
  "98%+ validated training data quality",
  "Closed-loop testing before deployment",
  "30+ language and dialect AI coverage",
  "Faster iteration through real-user feedback",
];

const edtechHighlightLines = [
  "Content, localization and accessibility in 30+ languages",
  "Curriculum-aligned digital learning content at scale",
  "Instructional design with pedagogy-first workflows",
  "Faster content turnaround for EdTech platforms",
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
  const [aiHighlightIndex, setAiHighlightIndex] = useState(0);
  const [aiHighlightVisible, setAiHighlightVisible] = useState(true);
  const [edtechHighlightIndex, setEdtechHighlightIndex] = useState(0);
  const [edtechHighlightVisible, setEdtechHighlightVisible] = useState(true);

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

  useEffect(() => {
    const aiTimer = setInterval(() => {
      setAiHighlightVisible(false);
      setTimeout(() => {
        setAiHighlightIndex((prev) => (prev + 1) % aiHighlightLines.length);
        setAiHighlightVisible(true);
      }, 350);
    }, 2600);
    return () => clearInterval(aiTimer);
  }, []);

  useEffect(() => {
    const edtechTimer = setInterval(() => {
      setEdtechHighlightVisible(false);
      setTimeout(() => {
        setEdtechHighlightIndex((prev) => (prev + 1) % edtechHighlightLines.length);
        setEdtechHighlightVisible(true);
      }, 350);
    }, 2700);
    return () => clearInterval(edtechTimer);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;
  const currentAiLine = aiHighlightLines[aiHighlightIndex];
  const currentEdtechLine = edtechHighlightLines[edtechHighlightIndex];

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      aria-label="eQOURSE — EdTech content and AI training data services"
    >
      {/* SEO: static, crawlable headline that does not rotate */}
      <h1 className="sr-only">
        eQOURSE — From Education Content to AI Training Data, One Partner. EdTech content development and AI training
        data services across 30+ languages, with 500+ domain specialists, ISO 9001 and ISO 27001 certified.
      </h1>

      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/hero-bg-3d.mp4" type="video/mp4" />
        </video>
        {/* Layered overlays for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(242 33% 10% / 0.85) 0%, hsl(242 33% 14% / 0.7) 45%, hsl(170 60% 14% / 0.65) 100%)",
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

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: rotating content */}
          <div className="lg:col-span-7 space-y-7" key={current}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 backdrop-blur-md animate-slide-up">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold" style={{ color: "hsl(170, 82%, 65%)" }}>
                {slide.badge}
              </span>
            </div>

            <h2
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] animate-slide-up text-white"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
            >
              {slide.headline} <span className="text-gradient">{slide.highlightedText}</span>
            </h2>

            <p
              className="text-base md:text-lg max-w-2xl animate-slide-up-delayed"
              style={{ color: "hsl(242, 20%, 85%)", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
            >
              {slide.subtext}
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delayed-2">
              <Button
                size="lg"
                className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-8"
                asChild
              >
                <a href={slide.ctaLink}>
                  {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/15 group text-white"
              >
                <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4 animate-slide-up-delayed-2">
              {[
                { value: "500+", label: "Specialists" },
                { value: "30+", label: "Languages" },
                { value: "98%+", label: "Accuracy" },
                { value: "200+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "hsl(242, 20%, 70%)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-3 pt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: single unified info panel */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              className="rounded-3xl overflow-hidden border border-white/15"
              style={{
                background: "linear-gradient(160deg, rgba(15,18,35,0.55) 0%, rgba(15,40,40,0.45) 100%)",
                backdropFilter: "blur(20px) saturate(140%)",
                WebkitBackdropFilter: "blur(20px) saturate(140%)",
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-5 flex items-center gap-3 border-b border-white/10"
                style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.12), transparent)" }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                    Trusted Globally
                  </div>
                  <div className="text-base font-bold text-white leading-tight">
                    Built for EdTech &amp; AI teams that ship
                  </div>
                </div>
              </div>

              {/* Rotating highlight rows */}
              <div className="px-6 py-5 space-y-3">
                <div
                  className="flex items-start gap-3 rounded-xl p-3 border border-sky-400/25"
                  style={{ background: "rgba(56,189,248,0.08)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(56,189,248,0.18)", border: "1px solid rgba(56,189,248,0.35)" }}
                  >
                    <Bot className="w-4 h-4 text-sky-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-sky-300 mb-0.5">AI Highlights</div>
                    <div
                      className="text-[12px] leading-snug"
                      style={{
                        color: "hsl(242,20%,85%)",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                        opacity: aiHighlightVisible ? 1 : 0,
                        transform: aiHighlightVisible ? "translateY(0)" : "translateY(-4px)",
                      }}
                    >
                      {currentAiLine}
                    </div>
                    <div className="hero-chip-bar" key={`ai-${aiHighlightIndex}`} style={{ background: "#38bdf8" }} />
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 rounded-xl p-3 border border-teal-400/25"
                  style={{ background: "rgba(45,212,191,0.08)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(45,212,191,0.18)", border: "1px solid rgba(45,212,191,0.35)" }}
                  >
                    <BookOpen className="w-4 h-4 text-teal-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-teal-300 mb-0.5">EdTech Highlights</div>
                    <div
                      className="text-[12px] leading-snug"
                      style={{
                        color: "hsl(242,20%,85%)",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                        opacity: edtechHighlightVisible ? 1 : 0,
                        transform: edtechHighlightVisible ? "translateY(0)" : "translateY(-4px)",
                      }}
                    >
                      {currentEdtechLine}
                    </div>
                    <div
                      className="hero-chip-bar"
                      key={`edtech-${edtechHighlightIndex}`}
                      style={{ background: "#2dd4bf" }}
                    />
                  </div>
                </div>
              </div>

              {/* Reach & Impact footer */}
              <div
                className="px-6 py-4 border-t border-white/10 flex items-center justify-between gap-4"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-center gap-2.5">
                  <GoogleIcon />
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star
                        className="w-3 h-3 text-yellow-400"
                        style={{ clipPath: "inset(0 50% 0 0)", fill: "#facc15" }}
                      />
                    </div>
                    <div className="text-[10px]" style={{ color: "hsl(242,20%,75%)" }}>
                      <span className="font-bold text-white">4.5</span> / 5 Google
                    </div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)" }} />

                <div className="flex items-center gap-2.5">
                  <LinkedInIcon />
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">23K+ Followers</div>
                    <div className="text-[10px]" style={{ color: "hsl(242,20%,75%)" }}>
                      on LinkedIn
                    </div>
                  </div>
                </div>

                <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)" }} />

                <div className="text-right">
                  <div className="text-xs font-bold text-white leading-tight">ISO Certified</div>
                  <div className="text-[10px]" style={{ color: "hsl(242,20%,75%)" }}>
                    9001 · 27001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
