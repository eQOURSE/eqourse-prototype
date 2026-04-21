import { useState } from "react";
import EdTechLayout from "@/components/edtech-solutions/shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import StatsRibbon from "./StatsRibbon";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";
import { caseStudiesData, CaseStudyCategory, CaseStudy } from "./caseStudyData";
import { Filter } from "lucide-react";

const CaseStudyPage = () => {
  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory | "All">("All");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = activeFilter === "All" 
    ? caseStudiesData 
    : caseStudiesData.filter(cs => cs.category === activeFilter);

  const filterOptions = ["All", "EdTech Solutions", "AI Data Services"] as const;

  const handleStudyClick = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  return (
    <EdTechLayout breadcrumbs={[{ label: "Case Studies" }]}>
      <SEOHead
        title="Case Studies & Success Stories | EdTech Solutions & AI Data Services | eQOURSE"
        description="Explore eQOURSE case studies: how we deliver custom e-learning content, curriculum development, multilingual localization, AI training data collection, annotation & labeling, data cleaning, and real-world model testing for global education and AI companies. 200+ clients. 30+ languages. ISO certified."
        canonical="https://www.eqourse.com/casestudy"
        keywords="eQOURSE case studies, EdTech case studies, AI data services case studies, e-learning success stories, data annotation case study, curriculum development case study, K12 content case study, AI training data case study, multilingual content case study, model testing case study"
      />

      <ServiceHero
        preHeadline="Real Results. Real Clients. Real Impact."
        headline="Case Studies &"
        headlineAccent="Success Stories"
        subtext="See how eQOURSE partners with global education companies, EdTech platforms, publishers, and AI teams to deliver production-ready content, high-quality training data, and measurable learning outcomes. From K-12 curriculum development across 6 languages to AI model testing across 30+ dialects — explore the results that set us apart."
        ctaText="Start Your Free Pilot"
        ctaLink="/#contact"
      />

      <StatsRibbon />

      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Filter Bar */}
          <div className="flex justify-center mb-16 relative z-20">
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-card/80 backdrop-blur-xl border border-border/50 shadow-soft rounded-2xl sm:rounded-full">
              <div className="hidden sm:flex items-center gap-2 px-3 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Filter:</span>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeFilter === option
                        ? "text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {/* Active state background pill */}
                    {activeFilter === option && (
                      <div className="absolute inset-0 bg-gradient-primary rounded-full -z-10 animate-slide-up" style={{ animationDuration: '0.2s' }} />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {option}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activeFilter === option 
                          ? "bg-white/20 text-white" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {option === "All" 
                          ? caseStudiesData.length 
                          : caseStudiesData.filter(cs => cs.category === option).length}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredStudies.map((study, i) => (
              <CaseStudyCard 
                key={study.id} 
                study={study} 
                index={i} 
                onClick={() => handleStudyClick(study)}
              />
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">No case studies found for this category.</p>
            </div>
          )}

        </div>
      </section>

      <ServiceCTA 
        headline="Ready to Become Our Next Success Story?"
        subtext="Join global education and AI leaders who trust eQOURSE for premium data services and EdTech solutions. Start with a free pilot — no commitment required."
        ctaText="Talk to Our Team"
      />

      <CaseStudyModal 
        study={selectedStudy} 
        isOpen={!!selectedStudy} 
        onClose={() => setSelectedStudy(null)} 
      />

    </EdTechLayout>
  );
};

export default CaseStudyPage;
