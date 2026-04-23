import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import {
  edtechSamples,
  type EdtechSample,
} from "../edtechSamplesData";

interface Props {
  sample: EdtechSample;
}

const EdtechLandingBody = ({ sample }: Props) => {
  const accent = `hsl(${sample.accentHsl})`;
  const isTextLanding = sample.kind === "text-landing";
  const subSamples = edtechSamples.filter((s) =>
    isTextLanding ? s.kind === "text" : s.kind === "video"
  );

  return (
    <>
      {/* Body Sections */}
      {sample.bodySections && sample.bodySections.length > 0 && (
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                What's Inside{" "}
                <span className="text-gradient">
                  {isTextLanding ? "Our Text Library" : "Our Video Library"}
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Five content pillars that cover every curriculum need from early learning to
                competitive exams.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sample.bodySections.map((section, i) => (
                <div
                  key={section.title}
                  className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-elevated transition-all hover:-translate-y-1"
                  style={{ animation: `slide-up 0.5s ease-out ${i * 0.08}s both` }}
                >
                  <div
                    className="absolute top-0 left-6 w-10 h-1 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-3 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold" style={{ color: accent }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Production Ready
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-Sample Grid */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Explore Individual Sample Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click any category to preview dedicated samples.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {subSamples.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.slug}
                  to={sub.path}
                  className="group relative bg-card border border-border rounded-2xl p-5 hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden"
                  style={{ animation: `slide-up 0.5s ease-out ${i * 0.05}s both` }}
                >
                  <div
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: `hsl(${sub.accentHsl})` }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, hsl(${sub.accentHsl}), hsl(${sub.accentHsl} / 0.7))`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {sub.navLabel}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {sub.preHeadline}
                  </p>
                  <div
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: `hsl(${sub.accentHsl})` }}
                  >
                    View Samples
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {sample.faqs && sample.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our {isTextLanding ? "text" : "video"} samples.
              </p>
            </div>

            <div className="space-y-3">
              {sample.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <h3 className="font-heading font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EdtechLandingBody;
