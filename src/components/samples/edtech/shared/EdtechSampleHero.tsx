import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { EdtechSample } from "../edtechSamplesData";

interface Props {
  sample: EdtechSample;
}

const EdtechSampleHero = ({ sample }: Props) => {
  const Icon = sample.icon;
  const accent = `hsl(${sample.accentHsl})`;

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[82vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/12 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-14 right-12 w-96 h-96 rounded-full blur-3xl animate-float-delayed"
          style={{ backgroundColor: `${accent}`, opacity: 0.12 }}
        />
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-7">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border animate-slide-up"
              style={{
                backgroundColor: `hsl(${sample.accentHsl} / 0.15)`,
                borderColor: `hsl(${sample.accentHsl} / 0.35)`,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              <span
                className="text-xs md:text-sm font-semibold tracking-wider uppercase"
                style={{ color: accent }}
              >
                {sample.preHeadline}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white animate-slide-up-delayed">
              {sample.headline}{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accent}, hsl(170 82% 55%))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {sample.headlineAccent}
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/75 animate-slide-up-delayed-2 max-w-2xl leading-relaxed">
              {sample.subtext}
            </p>

            <div className="flex flex-wrap gap-3 animate-slide-up-delayed-2">
              <a href="#consultation">
                <Button
                  size="lg"
                  className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-[1.02] px-6 md:px-8"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="#samples">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Explore Samples
                </Button>
              </a>
            </div>
          </div>

          <div className="relative animate-slide-up-delayed">
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-elevated"
              style={{
                background: `linear-gradient(135deg, hsl(${sample.accentHsl} / 0.2), hsl(222 47% 11% / 0.9))`,
                aspectRatio: "4 / 3",
              }}
            >
              {/* Animated grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(0 0% 100% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.2) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  animation: "dash-flow 12s linear infinite",
                }}
              />

              {/* Orb glow */}
              <div
                className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
                style={{ backgroundColor: accent, opacity: 0.4 }}
              />

              {/* Central icon with pulsing rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: `hsl(${sample.accentHsl} / 0.3)`,
                      width: "160px",
                      height: "160px",
                      left: "-40px",
                      top: "-40px",
                    }}
                  />
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, hsl(${sample.accentHsl} / 0.7))`,
                    }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: accent,
                    transform: `rotate(${deg}deg) translate(110px) rotate(-${deg}deg)`,
                    animation: `float 3s ease-in-out ${i * 0.3}s infinite`,
                  }}
                />
              ))}

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                  Live Sample Preview
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {sample.navLabel}
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-3 sm:-right-4 rounded-xl p-3 shadow-elevated hidden md:block bg-black/50 border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `hsl(${sample.accentHsl} / 0.2)`,
                    border: `1px solid hsl(${sample.accentHsl} / 0.4)`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: accent }}>
                    {sample.navLabel}
                  </div>
                  <div className="text-[10px] text-white/60">Sample Content</div>
                </div>
              </div>
              <div className="hero-chip-bar bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EdtechSampleHero;
