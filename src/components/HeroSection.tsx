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
      setTimeout(() => setIsAnimating(false), 800);
    },
    [isAnimating],
  );

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
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
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8" key={current}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-up">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium" style={{ color: "hsl(170, 82%, 55%)" }}>
                {slide.badge}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate-slide-up" style={{ color: "hsl(0, 0%, 100%)" }}>
              {slide.headline} <span className="text-gradient">{slide.highlightedText}</span>
            </h1>

            <p className="text-lg md:text-xl animate-slide-up-delayed" style={{ color: "hsl(242, 20%, 75%)" }}>
              {slide.subtext}
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delayed-2">
              <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-8" asChild>
                <a href={slide.ctaLink}>
                  {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 group" style={{ color: "hsl(0, 0%, 90%)" }}>
                <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 animate-slide-up-delayed-2">
              {[
                { value: "500+", label: "Specialists" },
                { value: "30+", label: "Languages" },
                { value: "98%+", label: "Accuracy" },
                { value: "200+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs" style={{ color: "hsl(242, 20%, 60%)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up-delayed">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img src={heroImage} alt="eQOURSE E-Learning and AI Data Services" width={1280} height={720} className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            <div
              className="absolute -top-4 -right-4 rounded-xl p-3 shadow-elevated hidden md:block"
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.35)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                minWidth: "240px",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: aiHighlightVisible ? 1 : 0,
                transform: aiHighlightVisible ? "translateY(0)" : "translateY(-6px)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.35)" }}>
                  <Bot className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-sky-300">AI Highlights</div>
                  <div className="text-[10px]" style={{ color: "hsl(242,20%,65%)" }}>
                    {currentAiLine}
                  </div>
                </div>
              </div>
              <div className="hero-chip-bar" key={aiHighlightIndex} style={{ background: "#38bdf8" }} />
            </div>

            <div
              className="absolute -bottom-6 -left-6 rounded-xl p-4 shadow-elevated animate-float hidden md:block"
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.35)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                minWidth: "240px",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: edtechHighlightVisible ? 1 : 0,
                transform: edtechHighlightVisible ? "translateY(0)" : "translateY(-6px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.35)" }}>
                  <BookOpen className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-sky-300">EdTech Highlights</div>
                  <div className="text-[10px]" style={{ color: "hsl(242,20%,65%)" }}>
                    {currentEdtechLine}
                  </div>
                </div>
              </div>
              <div className="hero-chip-bar" key={edtechHighlightIndex} style={{ background: "#38bdf8" }} />
            </div>

            <div
              className="absolute -bottom-6 -right-4 rounded-2xl p-4 shadow-elevated animate-float-delayed hidden md:block"
              style={{
                background: "rgba(15,18,35,0.75)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                minWidth: "180px",
              }}
            >
              <div className="text-[10px] font-semibold mb-2" style={{ color: "hsl(170,82%,55%)", letterSpacing: "0.08em" }}>
                OUR REACH &amp; IMPACT
              </div>

              <div className="flex items-center gap-2 mb-2">
                <GoogleIcon />
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-3 h-3 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)", fill: "#facc15" }} />
                  </div>
                  <div className="text-[10px]" style={{ color: "hsl(242,20%,65%)" }}>
                    <span className="font-bold text-white">4.5</span> / 5 on Google
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "6px 0" }} />

              <div className="flex items-center gap-2">
                <LinkedInIcon />
                <div>
                  <div className="text-xs font-bold text-white">23K+ Followers</div>
                  <div className="text-[10px]" style={{ color: "hsl(242,20%,65%)" }}>
                    on LinkedIn
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
