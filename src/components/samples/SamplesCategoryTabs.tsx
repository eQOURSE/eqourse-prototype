import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, PlayCircle, Database } from "lucide-react";
import { aiDataSamples } from "./ai-data/shared/aiDataSamplesData";

interface CardItem {
  label: string;
  href: string;
  description: string;
}

const textSamples: CardItem[] = [
  { label: "K12 Grade (KG-5)", href: "/kindergarden-to-k5-samples", description: "Age-appropriate content for early learners with interactive activities." },
  { label: "K12 Grade (6-12)", href: "/k6-to-k12-samples", description: "Rich curriculum content aligned to national standards and frameworks." },
  { label: "IIT JEE / NEET", href: "/iit-jee-neet-samples", description: "Competitive exam prep content with solved problems and conceptual depth." },
  { label: "UPSC & State PSC", href: "/upsc-state-psc-samples", description: "Civil-services exam material across polity, economy, and current affairs." },
  { label: "STEM Content", href: "/stem-content-samples", description: "Concept-first STEM modules with simulations and worked examples." },
  { label: "CBSE Content", href: "/curriculum-samples", description: "NCERT-aligned CBSE curriculum samples with assessments." },
  { label: "Localization", href: "/translation-and-localization-text-samples", description: "Text translated and culturally adapted across 30+ languages." },
  { label: "Test Prep & Assessments", href: "/test-prep-and-assessments", description: "Item-banked assessments and diagnostic test samples." },
];

const videoSamples: CardItem[] = [
  { label: "Articulate Storyline", href: "/articulate-storyline-video-samples", description: "Interactive Storyline courses with branching and variables." },
  { label: "Pen Tab and PPT", href: "/pen-tab-and-ppt-samples", description: "Classroom-style whiteboard and narrated PPT walkthroughs." },
  { label: "AI Videos", href: "/ai-avatar-video-samples", description: "AI-presenter videos with realistic avatars and localized voices." },
  { label: "Flash to HTML", href: "/flash-to-html-samples", description: "Legacy Flash modules reborn as responsive HTML5 courses." },
  { label: "2D 3D Animation", href: "/2d-3d-video-samples", description: "Animated explainers across science, math, and skills." },
  { label: "Promotional Video", href: "/promotional-video", description: "Brand and product promo videos for EdTech and enterprise." },
  { label: "Immersive Simulation AR/VR", href: "/immersive-simulation-ar-vr-video", description: "AR/VR simulations for immersive learning and training." },
];

const tabs = [
  { id: "text", label: "Text Content Samples", sub: "8 categories", Icon: FileText, accent: "from-primary to-accent", count: 8 },
  { id: "video", label: "Video Content Samples", sub: "7 formats", Icon: PlayCircle, accent: "from-accent to-primary", count: 7 },
  { id: "ai-data", label: "AI Data Samples", sub: "6 datasets", Icon: Database, accent: "from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)]", count: 6, isNew: true },
] as const;

const SamplesCategoryTabs = () => {
  const [active, setActive] = useState<"text" | "video" | "ai-data">("text");

  const renderCards = () => {
    if (active === "ai-data") {
      return aiDataSamples.map((s, i) => {
        const Icon = s.icon;
        return (
          <Link
            key={s.slug}
            to={s.path}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-[hsl(220_85%_55%/0.5)] transition-all hover:-translate-y-1.5 hover:shadow-elevated"
            style={{ animation: `slideUp 0.6s ease-out ${i * 0.07}s both` }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)]" />
            <div className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white">
              AI Data
            </div>
            <div className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(220_85%_55%/0.15)] to-[hsl(190_85%_55%/0.2)] border border-[hsl(220_85%_55%/0.3)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[hsl(200_85%_50%)]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-tight">{s.navLabel}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.shortDescription}</p>
              <span className="text-sm font-bold text-[hsl(200_85%_45%)] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                View samples <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        );
      });
    }

    const items = active === "text" ? textSamples : videoSamples;
    const IconC = active === "text" ? FileText : PlayCircle;

    return items.map((item, i) => (
      <Link
        key={item.label}
        to={item.href}
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-all hover:-translate-y-1.5 hover:shadow-elevated"
        style={{ animation: `slideUp 0.6s ease-out ${i * 0.06}s both` }}
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary" />
        <div className="p-6 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all">
            <IconC className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-tight">{item.label}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.description}</p>
          <span className="text-sm font-bold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            View samples <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    ));
  };

  const headings = {
    text: { h: "Text Content Samples", sub: "K-12, competitive exams, STEM, and localization samples showcasing our writing, editorial and pedagogical craft." },
    video: { h: "Video Content Samples", sub: "From Articulate Storyline to AI avatar videos and AR/VR simulations — browse what our video production pipeline can deliver." },
    "ai-data": { h: "AI Data Annotation & Collection Samples", sub: "Browse sample outputs from our AI data services pipeline across NLP, Computer Vision, Audio, and RLHF. Request a free pilot to evaluate on your data." },
  };

  return (
    <section id="samples" className="py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Pill tabs */}
        <div id="tabs" className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {tabs.map((t) => {
            const isActive = active === t.id;
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActive(t.id as typeof active);
                  if (t.id === "ai-data") {
                    document.getElementById("ai-data")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`group relative overflow-hidden rounded-full border px-4 py-2.5 md:px-5 md:py-3 transition-all flex items-center gap-2 md:gap-2.5 ${
                  isActive
                    ? t.id === "ai-data"
                      ? "bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] border-transparent text-white shadow-soft"
                      : "bg-gradient-primary border-transparent text-primary-foreground shadow-soft"
                    : "bg-card border-border/60 text-foreground/80 hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-xs md:text-sm font-bold">{t.label}</div>
                  <div className={`text-[10px] ${isActive ? "opacity-80" : "opacity-60"}`}>{t.sub}</div>
                </div>
                {t.isNew && (
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/25" : "bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white"}`}>
                    New
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section heading */}
        <div id={active === "ai-data" ? "ai-data" : undefined} className="max-w-3xl mx-auto text-center mb-10 md:mb-12 animate-slide-up" key={active}>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 leading-tight">
            {headings[active].h}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{headings[active].sub}</p>
        </div>

        <div key={`grid-${active}`} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {renderCards()}
        </div>
      </div>
    </section>
  );
};

export default SamplesCategoryTabs;
