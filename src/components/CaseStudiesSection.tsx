import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudiesData } from "@/components/case-studies/caseStudyData";

/* Pick 2 EdTech + 2 AI Data Services case studies for the home page */
const edtechStudies = caseStudiesData.filter(s => s.category === "EdTech Solutions").slice(0, 2);
const aiStudies = caseStudiesData.filter(s => s.category === "AI Data Services").slice(0, 2);
const featuredStudies = [...edtechStudies, ...aiStudies];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore how we've helped leading EdTech platforms and AI teams overcome challenges and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredStudies.map((study) => {
            const isTeal = study.visualDirection.theme === "teal";
            const accentColor = isTeal ? "primary" : "[#0ea5e9]";
            const categoryLabel = study.category;

            return (
              <Link
                to="/casestudy"
                key={study.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-soft">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isTeal ? "text-primary" : "text-[#0ea5e9]"}`}>
                      {categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {study.cardSummary}
                  </p>

                  {/* Key Metric */}
                  {study.metrics[0] && (
                    <div className={`mb-4 p-3 rounded-xl border ${isTeal ? "bg-primary/5 border-primary/10" : "bg-[#0ea5e9]/5 border-[#0ea5e9]/10"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${isTeal ? "bg-gradient-primary shadow-soft" : "bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] shadow-[0_4px_15px_rgba(14,165,233,0.3)]"}`}>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-lg font-bold leading-none ${isTeal ? "text-primary" : "text-[#0ea5e9]"}`}>
                            {study.metrics[0].value}
                          </div>
                          <div className="text-xs text-foreground/70 font-medium mt-0.5">
                            {study.metrics[0].label}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <span
                    className={`inline-flex items-center text-sm font-semibold gap-1.5 transition-all mt-auto group/link ${isTeal ? "text-primary" : "text-[#0ea5e9]"}`}
                  >
                    Read Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/casestudy" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 shadow-soft">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
