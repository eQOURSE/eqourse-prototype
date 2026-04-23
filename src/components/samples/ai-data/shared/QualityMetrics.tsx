import { ShieldCheck, Award, Users, Layers } from "lucide-react";

interface Props {
  metrics: string[];
}

const icons = [ShieldCheck, Award, Users, Layers];

const QualityMetrics = ({ metrics }: Props) => (
  <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-hero">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
    />
    <div className="absolute top-10 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/85">Quality Framework</span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Quality Metrics You Can <span className="text-gradient">Verify</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg">
          Every sample on this page is backed by measurable quality controls. Here's what we deliver on every batch.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        {metrics.map((m, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6 transition-all hover:border-primary/40 hover:bg-white/8 hover:-translate-y-1"
              style={{ animation: `slideUp 0.7s ease-out ${i * 0.1}s both` }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-medium">{m}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default QualityMetrics;
