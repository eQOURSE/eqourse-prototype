import EdTechLayout from "@/components/edtech-solutions/shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Types ─── */
export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SubServicePageProps {
  /* SEO */
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  seoKeywords?: string;

  /* Breadcrumbs */
  parentLabel: string;
  parentHref: string;
  currentLabel: string;

  /* Hero */
  preHeadline: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  ctaText?: string;
  ctaLink?: string;

  /* Intro narrative */
  introLabel: string;
  introTitle: string;
  introGradient: string;
  introDescription: string;
  introParagraphs: string[];

  /* Services */
  servicesLabel: string;
  servicesTitle: string;
  servicesGradient: string;
  services: ServiceCard[];

  /* Optional: stats row */
  stats?: { value: string; label: string }[];

  /* FAQ */
  faqs?: FAQItem[];

  /* CTA */
  ctaHeadline: string;
  ctaSubtext: string;
  ctaButtonText: string;

  /* Related pages */
  relatedPages?: { title: string; href: string }[];
  relatedLabel?: string;
}

/* ─── Animated Stats Row ─── */
const StatsRow = ({ stats }: { stats: { value: string; label: string }[] }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-card transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─── Services Grid with Motion ─── */
const ServicesGrid = ({ services, label, title, gradient }: { services: ServiceCard[]; label: string; title: string; gradient: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const cols = services.length <= 3 ? "md:grid-cols-3" : services.length <= 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">{label}</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {title} <span className="text-gradient">{gradient}</span>
          </h2>
        </div>
        <div ref={ref} className={`grid grid-cols-1 ${cols} gap-6 max-w-6xl mx-auto`}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl overflow-hidden bg-card border border-border/60 p-8 hover:shadow-elevated hover:border-primary/30 transition-all duration-500 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i % 4) * 120}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gradient-primary group-hover:shadow-soft transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── Narrative Intro Section ─── */
const IntroNarrative = ({ label, title, gradient, description, paragraphs }: { label: string; title: string; gradient: string; description: string; paragraphs: string[] }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`max-w-4xl mx-auto reveal-up ${isVisible ? "visible" : ""}`}>
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">{label}</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
            {title} <span className="text-gradient">{gradient}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-medium">{description}</p>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Related Pages Navigation ─── */
const RelatedPages = ({ pages, label }: { pages: { title: string; href: string }[]; label: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-16 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-8">{label}</h3>
        <div ref={ref} className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {pages.map((page, i) => (
            <Link
              key={page.href}
              to={page.href}
              className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i % 6) * 80}ms` }}
            >
              {page.title}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Main Template Component ─── */
const SubServicePageTemplate = (props: SubServicePageProps) => {
  return (
    <EdTechLayout breadcrumbs={[{ label: props.parentLabel, href: props.parentHref }, { label: props.currentLabel }]}>
      <SEOHead
        title={props.seoTitle}
        description={props.seoDescription}
        canonical={props.seoCanonical}
        keywords={props.seoKeywords}
      />

      <ServiceHero
        preHeadline={props.preHeadline}
        headline={props.headline}
        headlineAccent={props.headlineAccent}
        subtext={props.subtext}
        ctaText={props.ctaText || "Get Free Consultation"}
        ctaLink={props.ctaLink || "#contact"}
      />

      <IntroNarrative
        label={props.introLabel}
        title={props.introTitle}
        gradient={props.introGradient}
        description={props.introDescription}
        paragraphs={props.introParagraphs}
      />

      {props.stats && props.stats.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <StatsRow stats={props.stats} />
          </div>
        </section>
      )}

      <ServicesGrid
        services={props.services}
        label={props.servicesLabel}
        title={props.servicesTitle}
        gradient={props.servicesGradient}
      />

      {props.faqs && props.faqs.length > 0 && (
        <FAQSection faqs={props.faqs} />
      )}

      {props.relatedPages && props.relatedPages.length > 0 && (
        <RelatedPages pages={props.relatedPages} label={props.relatedLabel || "Explore Related Services"} />
      )}

      <ServiceCTA
        headline={props.ctaHeadline}
        subtext={props.ctaSubtext}
        ctaText={props.ctaButtonText}
      />
    </EdTechLayout>
  );
};

export default SubServicePageTemplate;
