import { useEffect, useRef, useState } from "react";
import { FileJson, Globe2, Check } from "lucide-react";
import type { SampleShowcase } from "./aiDataSamplesData";

interface Props {
  showcases: SampleShowcase[];
  heading?: string;
  subtext?: string;
}

const SampleShowcaseGrid = ({
  showcases,
  heading = "Sample Showcase",
  subtext = "Representative outputs across every task we support — each delivered with full metadata, QA logs, and the output format your pipeline needs.",
}: Props) => {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % showcases.length);
    }, 4200);
    return () => clearInterval(t);
  }, [showcases.length]);

  const current = showcases[active];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute top-10 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Live Sample Preview
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {subtext}
          </p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left: Task list */}
          <div ref={listRef} className="flex flex-col gap-2">
            {showcases.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`group text-left p-4 md:p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                      : "bg-card border-border/60 hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm md:text-base leading-tight ${isActive ? "text-white" : "text-foreground"}`}>
                        {s.title}
                      </div>
                      <div className={`text-xs mt-0.5 truncate ${isActive ? "text-white/75" : "text-muted-foreground"}`}>
                        {s.format}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40">
                      <div className="h-full bg-white animate-[chipBarFill_4.2s_linear_forwards]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div
            key={active}
            className="relative rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-card animate-slide-up min-h-[360px] overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary mb-3">
                <span className="w-6 h-px bg-primary" /> Sample {active + 1} of {showcases.length}
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-3 leading-tight">
                {current.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <FileJson className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-primary font-bold">Output</div>
                    <div className="text-xs md:text-sm font-medium text-foreground truncate">{current.format}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/10 border border-accent/25">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-accent-foreground font-bold">Languages</div>
                    <div className="text-xs md:text-sm font-medium text-foreground truncate">{current.languages}</div>
                  </div>
                </div>
              </div>

              {/* Animated code-strip preview */}
              <div className="rounded-xl border border-border/60 bg-[hsl(242_33%_14%)] p-4 font-mono text-[11px] md:text-xs text-white/80 overflow-hidden">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-[10px] text-white/40 uppercase tracking-widest">sample.json</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-primary">Validated</span>
                    <span className="text-white/50">— schema compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-primary">Gold-standard</span>
                    <span className="text-white/50">— IAA ≥ 0.80</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-primary">Audit trail</span>
                    <span className="text-white/50">— full provenance</span>
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

export default SampleShowcaseGrid;
