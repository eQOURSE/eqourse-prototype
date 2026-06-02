import { useState, useEffect } from "react";
import ContentServicesLayout from "@/components/content-services/shared/ContentServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import StatsRibbon from "./StatsRibbon";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";
import { caseStudiesData as staticCaseStudies, CaseStudyCategory, CaseStudy } from "./caseStudyData";
import { fetchPublishedCaseStudies } from "@/lib/publicApi";
import { Filter, Briefcase, Award, TrendingUp } from "lucide-react";

const CaseStudyPage = () => {
  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory | "All">("All");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [allStudies, setAllStudies] = useState<CaseStudy[]>(staticCaseStudies);

  // Try to fetch from API, fall back to static data
  useEffect(() => {
    let cancelled = false;
    fetchPublishedCaseStudies().then((apiStudies) => {
      if (cancelled || !apiStudies || apiStudies.length === 0) return;
      // Helper to map tags to service page links for internal SEO
      const mapTagsToRelatedLinks = (tags: string[]) => {
        const links: { label: string; href: string }[] = [];
        const lowercaseTags = tags.map(t => t.toLowerCase());

        if (lowercaseTags.some(t => t.includes("worksheets") || t.includes("workbook") || t.includes("k12") || t.includes("content service"))) {
          links.push({ label: "Workbook Development", href: "/custom-e-learning-content" });
        }
        if (lowercaseTags.some(t => t.includes("video") || t.includes("pen-tab"))) {
          links.push({ label: "E-Learning Video Solutions", href: "/elearning-video-solutions" });
        }
        if (lowercaseTags.some(t => t.includes("localization") || t.includes("language") || t.includes("multilingual"))) {
          links.push({ label: "Localization Services", href: "/localization-services" });
        }
        if (lowercaseTags.some(t => t.includes("sme") || t.includes("expert") || t.includes("smes"))) {
          links.push({ label: "Subject Matter Experts", href: "/smes" });
        }
        if (lowercaseTags.some(t => t.includes("data collection") || t.includes("speech data"))) {
          links.push({ label: "AI Data Collection", href: "/ai-data-services/data-collection" });
        }
        if (lowercaseTags.some(t => t.includes("annotation") || t.includes("labeling") || t.includes("bounding box"))) {
          links.push({ label: "Data Annotation & Labeling", href: "/ai-data-services/annotation-labeling" });
        }
        if (lowercaseTags.some(t => t.includes("cleaning") || t.includes("validation"))) {
          links.push({ label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" });
        }
        if (lowercaseTags.some(t => t.includes("testing") || t.includes("model testing") || t.includes("asr testing"))) {
          links.push({ label: "AI Model Testing", href: "/ai-data-services/model-testing" });
        }

        if (links.length === 0 && tags.length > 0) {
          if (lowercaseTags.some(t => t.includes("ai") || t.includes("data"))) {
            links.push({ label: "AI Data Services", href: "/ai-data-services" });
          } else {
            links.push({ label: "Content Services Overview", href: "/content-services" });
          }
        }
        return links;
      };

      // Map API case studies to the static CaseStudy shape
      const mapped: CaseStudy[] = apiStudies.map((cs) => ({
        id: cs.id,
        title: cs.title,
        category: (cs.industry?.toLowerCase().includes("ai") || cs.tags?.includes("AI Data Services") ? "AI Data Services" : "Content Service") as CaseStudyCategory,
        industry: cs.industry,
        region: "",
        serviceTags: cs.tags || [],
        problem: cs.challenge || "",
        solution: cs.solution || "",
        impact: cs.results || "",
        metrics: cs.metrics || [],
        cardSummary: cs.summary || "",
        visualDirection: { theme: cs.tags?.includes("AI Data Services") ? "navy-cyan" as const : "teal" as const },
        relatedLinks: cs.relatedLinks && cs.relatedLinks.length > 0
          ? cs.relatedLinks
          : mapTagsToRelatedLinks(cs.tags || []),
        image: cs.heroImageUrl ? (cs.heroImageUrl.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${cs.heroImageUrl}` : cs.heroImageUrl) : undefined,
      }));
      setAllStudies(mapped);
    });
    return () => { cancelled = true; };
  }, []);

  const filteredStudies = activeFilter === "All" 
    ? allStudies 
    : allStudies.filter(cs => cs.category === activeFilter);

  const filterOptions = ["All", "Content Service", "AI Data Services"] as const;

  const handleStudyClick = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  return (
    <ContentServicesLayout breadcrumbs={[{ label: "Case Studies" }]}>
      <SEOHead
        title="Case Studies & Success Stories | Content Service & AI Data Services | eQOURSE"
        description="Explore eQOURSE case studies: how we deliver custom e-learning content, curriculum development, multilingual localization, AI training data collection, annotation & labeling, data cleaning, and real-world model testing for global education and AI companies. 200+ clients. 30+ languages. ISO certified."
        canonical="https://www.eqourse.com/casestudy"
        keywords="eQOURSE case studies, Content Services case studies, AI data services case studies, e-learning success stories, data annotation case study, curriculum development case study, K12 content case study, AI training data case study, multilingual content case study, model testing case study"
      />

      <ServiceHero
        preHeadline="Real Results. Real Clients. Real Impact."
        headline="Case Studies &"
        headlineAccent="Success Stories"
        subtext="See how eQOURSE partners with global education companies, Content Services platforms, publishers, and AI teams to deliver production-ready content, high-quality training data, and measurable learning outcomes. From K-12 curriculum development across 6 languages to AI model testing across 30+ dialects - explore the results that set us apart."
        ctaText="Start Your Free Pilot"
        ctaLink="/#contact"
        rotatingBadges={[
          { icon: Briefcase, title: "Use Cases", subtitle: "Real-world projects", color: "hsl(170 82% 55%)" },
          { icon: Award, title: "Success", subtitle: "Proven results", color: "hsl(190 85% 68%)" },
          { icon: TrendingUp, title: "Impact", subtitle: "Measurable outcomes", color: "hsl(165 75% 71%)" }
        ]}
        bottomBadge={{ iconText: "WIN", title: "Success Stories", subtitle: "Data & content wins" }}
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
                          ? allStudies.length 
                          : allStudies.filter(cs => cs.category === option).length}
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
        subtext="Join global education and AI leaders who trust eQOURSE for premium data services and Content Services. Start with a free pilot - no commitment required."
        ctaText="Talk to Our Team"
      />

      <CaseStudyModal 
        study={selectedStudy} 
        isOpen={!!selectedStudy} 
        onClose={() => setSelectedStudy(null)} 
      />

    </ContentServicesLayout>
  );
};

export default CaseStudyPage;
