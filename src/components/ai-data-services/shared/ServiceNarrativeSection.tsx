import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "./SectionHeader";

interface NarrativeStat {
  label: string;
  value: string;
}

interface NarrativeBar {
  label: string;
  value: number;
}

interface ServiceNarrativeSectionProps {
  label: string;
  title: string;
  gradientText?: string;
  description: string;
  paragraphs?: string[];
  bullets?: string[];
  stats?: NarrativeStat[];
  bars?: NarrativeBar[];
  panelTitle?: string;
  panelSubtitle?: string;
  reverse?: boolean;
  dark?: boolean;
}

const ServiceNarrativeSection = ({
  label,
  title,
  gradientText,
  description,
  paragraphs = [],
  bullets = [],
  stats = [],
  bars = [],
  panelTitle,
  panelSubtitle,
  reverse = false,
  dark = false,
}: ServiceNarrativeSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={cn("py-24 relative overflow-hidden", dark ? "bg-gradient-hero" : "bg-background")}>
      {dark && (
        <>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(170 82% 45%) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent/8 rounded-full blur-[140px]" />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label={label}
          title={title}
          gradientText={gradientText}
          subtitle={description}
          light={dark}
        />

        <div
          ref={ref}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center max-w-6xl mx-auto",
            reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
          )}
        >
          <div className={cn("reveal-up", isVisible && "visible")}>
            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={cn("leading-relaxed", dark ? "text-white/75" : "text-foreground/80")}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {bullets.length > 0 && (
              <div className="mt-8 space-y-3">
                {bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className={cn("text-sm leading-relaxed", dark ? "text-white/75" : "text-foreground/75")}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className={cn("rounded-xl border p-4", dark ? "glass-dark" : "bg-card border-border/60")}>
                    <div className="text-2xl font-heading font-extrabold text-gradient">{stat.value}</div>
                    <div className={cn("text-xs mt-1", dark ? "text-white/65" : "text-muted-foreground")}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={cn("reveal-scale", isVisible && "visible")} style={{ transitionDelay: "0.15s" }}>
            <div className={cn("rounded-3xl border p-6 md:p-8 relative overflow-hidden", dark ? "glass-dark border-primary/30" : "bg-card border-border/60 shadow-card")}>
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6">
                  {panelTitle && (
                    <h3 className={cn("font-heading text-xl font-bold", dark ? "text-white" : "text-foreground")}>
                      {panelTitle}
                    </h3>
                  )}
                  {panelSubtitle && (
                    <p className={cn("mt-2 text-sm", dark ? "text-white/65" : "text-muted-foreground")}>
                      {panelSubtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {bars.map((bar, index) => (
                    <div key={bar.label}>
                      <div className={cn("flex items-center justify-between text-xs mb-2", dark ? "text-white/70" : "text-muted-foreground")}>
                        <span>{bar.label}</span>
                        <span className="font-semibold">{bar.value}%</span>
                      </div>
                      <div className={cn("h-2.5 rounded-full overflow-hidden", dark ? "bg-white/10" : "bg-muted")}>
                        <div
                          className="h-full rounded-full bg-gradient-primary transition-all duration-1000 ease-out"
                          style={{ width: `${isVisible ? bar.value : 0}%`, transitionDelay: `${index * 120}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceNarrativeSection;
