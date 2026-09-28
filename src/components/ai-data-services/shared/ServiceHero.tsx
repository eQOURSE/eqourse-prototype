import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Database, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import heroVideoPoster from "@/assets/hero-video-poster.webp";

interface ServiceHeroProps {
  preHeadline: string;
  headline: string;
  headlineAccent?: string;
  subtext: string;
  ctaText: string;
  ctaLink?: string;
  illustration?: React.ReactNode;
  /**
   * Optional YouTube embed URL (use /embed/VIDEO_ID?... format).
   * When provided, renders a responsive 16:9 iframe instead of an image.
   * SEO: iframe title is auto-derived from imageAlt if set.
   */
  videoSrc?: string;
  /**
   * Optional custom hero/banner image. When provided, replaces the default
   * hero illustration. The image fills the hero box completely (object-cover)
   * so there are no empty side bars regardless of the source aspect ratio.
   */
  imageSrc?: string;
  /** Optional AVIF source rendered before imageSrc in a responsive picture. */
  imageAvifSrc?: string;
  /**
   * SEO-optimized alt text for the banner. Strongly recommended when imageSrc/videoSrc is set.
   */
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  trustStats?: { value: string; label: string }[];
  tone?: "dark" | "light";
  /**
   * Optional custom badges to rotate in the top right. 
   * Array must contain exactly 3 items for best effect, but will rotate any number.
   */
  rotatingBadges?: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    color: string;
  }[];
  /**
   * Optional custom static badge to display in the bottom left.
   */
  bottomBadge?: {
    iconText: string;
    title: string;
    subtitle: string;
  };
  /** Use a more compact scale for unusually long service headlines. */
  compactHeadline?: boolean;
}

const chips = [
  {
    icon: Database,
    title: "AI Data Pipeline",
    subtitle: "Collect -> Annotate -> Clean -> Test",
    color: "hsl(170 82% 55%)",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    subtitle: "98%+ validated datasets",
    color: "hsl(165 75% 71%)",
  },
  {
    icon: Users,
    title: "Global Coverage",
    subtitle: "500+ experts, 30+ languages",
    color: "hsl(190 85% 68%)",
  },
];

const ServiceHero = ({
  preHeadline,
  headline,
  headlineAccent,
  subtext,
  ctaText,
  ctaLink = "/contact-us",
  illustration,
  videoSrc,
  imageSrc,
  imageAvifSrc,
  imageAlt,
  imageWidth = 1280,
  imageHeight = 960,
  secondaryCtaText,
  secondaryCtaLink,
  onCtaClick,
  onSecondaryCtaClick,
  trustStats,
  tone = "dark",
  rotatingBadges,
  bottomBadge,
  compactHeadline = false,
}: ServiceHeroProps) => {
  const { pathname } = useLocation();
  const activeChips = rotatingBadges && rotatingBadges.length > 0 ? rotatingBadges : chips;
  const useCompactHeadline = compactHeadline || `${headline} ${headlineAccent || ""}`.length > 50;
  const [chipIndex, setChipIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setChipIndex((prev) => (prev + 1) % activeChips.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [activeChips.length]);

  const chip = activeChips[chipIndex];
  const ChipIcon = chip.icon;
  const ctaIsRoute = ctaLink.startsWith("/");
  const secondaryCtaIsRoute = secondaryCtaLink?.startsWith("/");
  const isAiDataSubservice =
    /^\/ai-data-services\/(data-collection|annotation-labeling|cleaning-validation|model-testing)\/[^/]+\/?$/.test(pathname) ||
    /^\/robotics-training-data-services\/[^/]+\/?$/.test(pathname);
  // All AI Data Services sub-pages intentionally share one technical purple hero.
  // Main category pages use CinematicHero and keep the brighter editorial treatment.
  const isLight = !isAiDataSubservice && tone === "light";
  
  const bottomBadgeData = bottomBadge || {
    iconText: "AI",
    title: "Production Ready",
    subtitle: "End-to-end data services"
  };

  return (
    <section className={`relative min-h-[90vh] overflow-hidden flex items-center ${isLight ? "bg-[linear-gradient(135deg,hsl(160_30%_99%),hsl(165_35%_94%))]" : "bg-gradient-hero"}`}>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/12 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-14 right-12 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(170 82% 40%) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid min-w-0 lg:grid-cols-2 gap-12 items-center">
          <div className="min-w-0 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary">{preHeadline}</span>
            </div>

            <h1 className={`max-w-full break-words font-heading ${useCompactHeadline ? "text-3xl md:text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl"} font-extrabold leading-tight animate-slide-up-delayed ${isLight ? "text-foreground" : "text-white"}`}>
              {headline}{" "}
              {headlineAccent && <span className="text-gradient">{headlineAccent}</span>}
            </h1>

            <p className={`max-w-2xl break-words text-lg md:text-xl animate-slide-up-delayed-2 ${isLight ? "text-muted-foreground" : "text-white/75"}`}>{subtext}</p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delayed-2">
              {ctaIsRoute ? (
                <Link to={ctaLink} onClick={onCtaClick}>
                  <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-8">
                    {ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <a href={ctaLink} onClick={onCtaClick}>
                  <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-8">
                    {ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                secondaryCtaIsRoute ? (
                  <Link to={secondaryCtaLink} onClick={onSecondaryCtaClick}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={`backdrop-blur-xl px-8 ${isLight ? "border-foreground/15 bg-white/60 text-foreground hover:bg-white hover:text-foreground" : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"}`}
                    >
                      {secondaryCtaText}
                    </Button>
                  </Link>
                ) : (
                  <a href={secondaryCtaLink} onClick={onSecondaryCtaClick}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={`backdrop-blur-xl px-8 ${isLight ? "border-foreground/15 bg-white/60 text-foreground hover:bg-white hover:text-foreground" : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"}`}
                    >
                      {secondaryCtaText}
                    </Button>
                  </a>
                )
              )}
            </div>

            <div className={`grid min-w-0 gap-4 sm:gap-8 pt-2 animate-slide-up-delayed-2 ${(trustStats?.length || 3) >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
              {(trustStats || [
                { value: "500+", label: "Specialists" },
                { value: "30+", label: "Languages" },
                { value: "98%+", label: "Accuracy" },
              ]).map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <div className="break-words text-xl font-bold text-gradient sm:text-2xl md:text-3xl">{stat.value}</div>
                  <div className={`text-xs mt-1 ${isLight ? "text-muted-foreground" : "text-white/60"}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 animate-slide-up-delayed">
            <div className={`relative rounded-3xl overflow-hidden shadow-elevated border ${isLight ? "border-white/80 bg-white/55" : "border-white/10 bg-gradient-to-br from-primary/20 via-foreground/30 to-accent/20"}`}>
              {videoSrc ? (
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  {videoSrc.includes('.mp4') ? (
                    <video
                      className="absolute inset-0 w-full h-full border-0 object-cover"
                      src={videoSrc}
                      title={imageAlt || "eQOURSE — Content Service and AI Data Services"}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={videoSrc}
                      title={imageAlt || "eQOURSE — Content Service and AI Data Services"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
              ) : imageSrc ? (
                /* Fill the hero box completely - no side gaps regardless of source ratio */
                <picture>
                  {imageAvifSrc && <source srcSet={imageAvifSrc} type="image/avif" />}
                  <img
                    src={imageSrc}
                    alt={imageAlt || "eQOURSE service banner"}
                    width={imageWidth}
                    height={imageHeight}
                    loading="eager"
                    decoding="async"
                    className="w-full h-[360px] md:h-[430px] object-cover block"
                  />
                </picture>
              ) : (
                <>
                  <img
                    src={heroVideoPoster}
                    alt="eQOURSE AI data services"
                    width={1280}
                    height={720}
                    className="w-full h-[360px] md:h-[430px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/10 to-transparent" />
                </>
              )}
            </div>

            <div className={`absolute -top-4 -right-3 sm:-right-4 rounded-xl p-3 shadow-elevated hidden md:block border backdrop-blur-xl ${isLight ? "bg-white/75 border-white/80" : "bg-black/45 border-white/20"}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <ChipIcon className="w-4 h-4" style={{ color: chip.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: chip.color }}>{chip.title}</div>
                  <div className={`text-[10px] ${isLight ? "text-muted-foreground" : "text-white/60"}`}>{chip.subtitle}</div>
                </div>
              </div>
              <div className="hero-chip-bar" key={chipIndex} style={{ background: chip.color }} />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-6 glass rounded-xl p-4 shadow-elevated hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{bottomBadgeData.iconText}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{bottomBadgeData.title}</div>
                  <div className="text-xs text-muted-foreground">{bottomBadgeData.subtitle}</div>
                </div>
              </div>
            </div>

            {illustration && (
              <div className="absolute -bottom-14 right-2 hidden xl:block w-56 h-48 rounded-2xl border border-primary/25 bg-black/40 backdrop-blur-xl p-3 shadow-elevated">
                {illustration}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
