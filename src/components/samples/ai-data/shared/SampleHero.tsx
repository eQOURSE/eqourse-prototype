import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SampleHeroVisual from "./SampleHeroVisual";
import type { AiDataSample } from "./aiDataSamplesData";

const SampleHero = ({ sample }: { sample: AiDataSample }) => {
  const Icon = sample.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[88vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/12 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-14 right-12 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 40%) 1px, transparent 1px)", backgroundSize: "34px 34px" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-primary">
                {sample.preHeadline}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white animate-slide-up-delayed">
              {sample.headline}{" "}
              <span className="text-gradient">{sample.headlineAccent}</span>
            </h1>

            <p className="text-base md:text-lg text-white/75 animate-slide-up-delayed-2 max-w-2xl leading-relaxed">
              {sample.subtext}
            </p>

            <div className="flex flex-wrap gap-3 animate-slide-up-delayed-2">
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-6 md:px-8"
                >
                  {sample.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link to={sample.serviceLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Service Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 animate-slide-up-delayed-2">
              {[
                { value: `${sample.showcases.length}`, label: "Sample Tasks" },
                { value: "98%+", label: "Accuracy" },
                { value: "48h", label: "Pilot Setup" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-[11px] md:text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up-delayed">
            <SampleHeroVisual kind={sample.heroVisual} />

            <div className="absolute -top-4 -right-3 sm:-right-4 rounded-xl p-3 shadow-elevated hidden md:block bg-black/50 border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary">{sample.navLabel}</div>
                  <div className="text-[10px] text-white/60">Production-grade AI data</div>
                </div>
              </div>
              <div className="hero-chip-bar bg-primary" />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-6 rounded-xl p-4 shadow-elevated hidden md:block bg-white/10 border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">QA</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Multi-tier Review</div>
                  <div className="text-xs text-white/60">IAA ≥ 0.80 · Honeypot 20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleHero;
