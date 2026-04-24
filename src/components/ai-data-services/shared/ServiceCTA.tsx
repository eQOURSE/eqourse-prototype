import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCTAProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
}

const ServiceCTA = ({
  headline = "Ready to Get Started?",
  subtext = "Join global AI teams who trust eQOURSE for production-grade training data. Start with a free pilot - no commitment required.",
  ctaText = "Start Free Pilot",
  ctaLink = "/free-pilot",
}: ServiceCTAProps) => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-hero" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="absolute -top-24 -left-10 w-[420px] h-[420px] bg-primary/12 rounded-full blur-[160px] animate-float" />
    <div className="absolute -bottom-24 -right-10 w-[460px] h-[460px] bg-accent/10 rounded-full blur-[180px] animate-float-delayed" />

    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-16 left-1/4 w-28 h-28 rounded-full border border-primary/20 animate-pulse" />
      <div className="absolute bottom-16 right-1/4 w-20 h-20 rounded-full border border-accent/30 animate-pulse" />
    </div>

    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{headline}</h2>
      <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">{subtext}</p>
      <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-black/25 border border-white/10 px-4 py-4 backdrop-blur-md">
        <Link to={ctaLink}>
          <Button
            size="lg"
            className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-opacity text-base px-8 gap-2"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <span className="text-xs uppercase tracking-wide text-white/60">Pilot setup in 48 hours</span>
      </div>
    </div>
  </section>
);

export default ServiceCTA;
