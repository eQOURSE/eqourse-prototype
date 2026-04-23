import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aiDataSamples } from "./aiDataSamplesData";

const RelatedSamples = ({ currentSlug }: { currentSlug: string }) => {
  const others = aiDataSamples.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-primary mb-2">
              <span className="w-6 h-px bg-primary" /> Explore More
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
              Related <span className="text-gradient">AI Data Samples</span>
            </h2>
          </div>
          <Link
            to="/samples"
            className="text-sm font-bold text-primary hover:underline flex items-center gap-1.5"
          >
            View all samples <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to={s.path}
                className="group neon-card relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 flex flex-col"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary" />
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all">
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-tight">
                  {s.navLabel}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {s.shortDescription}
                </p>
                <span className="text-sm font-bold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  View samples <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedSamples;
