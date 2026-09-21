import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, PlayCircle, Database } from "lucide-react";
import { aiDataSamples } from "./ai-data/shared/aiDataSamplesData";
import { textSubSamples, videoSubSamples } from "./content-services/contentServicesSamplesData";

const tabs = [
  { id: "text", label: "Text Content Samples", sub: "7 categories", Icon: FileText, accent: "from-primary to-accent", count: 7 },
  { id: "video", label: "Video & Audio Samples", sub: "7 formats", Icon: PlayCircle, accent: "from-accent to-primary", count: 7 },
  { id: "ai-data", label: "AI Data Samples", sub: "7 datasets", Icon: Database, accent: "from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)]", count: 7, isNew: true },
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

    const items = active === "text" ? textSubSamples : videoSubSamples;
    const IconC = active === "text" ? FileText : PlayCircle;

    return items.map((item, i) => (
      <Link
        key={item.slug}
        to={item.path}
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-all hover:-translate-y-1.5 hover:shadow-elevated"
        style={{ animation: `slideUp 0.6s ease-out ${i * 0.06}s both` }}
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary z-10" />
        {item.visualImage && (
          <img src={item.visualImage} alt={item.visualImageAlt ?? `${item.navLabel} sample illustration`} title={item.visualImageTitle ?? item.title} width="1200" height="675" loading="lazy" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
        <div className="p-6 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all">
            <IconC className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-tight">{item.navLabel}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.preHeadline}</p>
          <span className="text-sm font-bold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            View samples <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    ));
  };

  const headings = {
    text: { h: "Text Content Samples", sub: "Explore educational publishing, assessment, test prep, academic quality assurance, ESL and localization samples." },
    video: { h: "Video & Audio Samples", sub: "Explore educational video, animations, immersive learning and audio production." },
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
