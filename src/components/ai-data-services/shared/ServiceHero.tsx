import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Database, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

interface ServiceHeroProps {
  preHeadline: string;
  headline: string;
  headlineAccent?: string;
  subtext: string;
  ctaText: string;
  ctaLink?: string;
  illustration?: React.ReactNode;
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
  ctaLink = "#contact",
  illustration,
}: ServiceHeroProps) => {
  const [chipIndex, setChipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setChipIndex((prev) => (prev + 1) % chips.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const chip = chips[chipIndex];
  const ChipIcon = chip.icon;
  const ctaIsRoute = ctaLink.startsWith("/");

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary">{preHeadline}</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white animate-slide-up-delayed">
              {headline}{" "}
              {headlineAccent && <span className="text-gradient">{headlineAccent}</span>}
            </h1>

            <p className="text-lg md:text-xl text-white/75 animate-slide-up-delayed-2 max-w-2xl">{subtext}</p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delayed-2">
              {ctaIsRoute ? (
                <Link to={ctaLink}>
                  <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-8">
                    {ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <a href={ctaLink}>
                  <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-8">
                    {ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-2 animate-slide-up-delayed-2">
              {[
                { value: "500+", label: "Specialists" },
                { value: "30+", label: "Languages" },
                { value: "98%+", label: "Accuracy" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up-delayed">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-white/10">
              <img
                src={heroImage}
                alt="eQOURSE AI data services"
                width={1280}
                height={720}
                className="w-full h-[360px] md:h-[430px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/10 to-transparent" />
            </div>

            <div className="absolute -top-4 -right-3 sm:-right-4 rounded-xl p-3 shadow-elevated hidden md:block bg-black/45 border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <ChipIcon className="w-4 h-4" style={{ color: chip.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: chip.color }}>{chip.title}</div>
                  <div className="text-[10px] text-white/60">{chip.subtitle}</div>
                </div>
              </div>
              <div className="hero-chip-bar" key={chipIndex} style={{ background: chip.color }} />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-6 glass rounded-xl p-4 shadow-elevated hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AI</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Production Ready</div>
                  <div className="text-xs text-muted-foreground">End-to-end data services</div>
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
