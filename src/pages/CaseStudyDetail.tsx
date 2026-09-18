import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContentServicesLayout from "@/components/content-services/shared/ContentServicesLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import ArticleSEOHead from "@/components/shared/ArticleSEOHead";
import { caseStudiesData, CaseStudy } from "@/components/case-studies/caseStudyData";
import { fetchCaseStudyBySlug } from "@/lib/publicApi";
import ArticleContent, { SmartArticleLink } from "@/components/shared/ArticleContent";
import NotFound from "@/pages/NotFound";
import {
  Loader2,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [study, setStudy] = useState<CaseStudy | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    if (!slug) return;

    // Try to find in static data first (id-based match as fallback)
    const staticMatch = caseStudiesData.find(
      (cs) => cs.id === slug || cs.slug === slug
    );
    if (staticMatch) {
      setStudy(staticMatch);
    }

    // Then try API (will override static if successful)
    fetchCaseStudyBySlug(slug).then((apiCs) => {
      if (!apiCs) {
        if (!staticMatch) setStudy(null);
        return;
      }

      const clientParts = (apiCs.client || "").split("|").map((s) => s.trim());
      const region = clientParts.length >= 2 ? clientParts[0] : (apiCs.client || "Global");

      const mapTagsToRelatedLinks = (tags: string[]) => {
        const links: { label: string; href: string }[] = [];
        const lowercaseTags = tags.map((t) => t.toLowerCase());

        if (lowercaseTags.some((t) => t.includes("worksheets") || t.includes("workbook") || t.includes("k12") || t.includes("content service"))) {
          links.push({ label: "Workbook Development", href: "/custom-e-learning-content" });
        }
        if (lowercaseTags.some((t) => t.includes("video") || t.includes("pen-tab"))) {
          links.push({ label: "E-Learning Video Solutions", href: "/elearning-video-solutions" });
        }
        if (lowercaseTags.some((t) => t.includes("localization") || t.includes("language") || t.includes("multilingual"))) {
          links.push({ label: "Localization Services", href: "/localization-services" });
        }
        if (lowercaseTags.some((t) => t.includes("sme") || t.includes("expert") || t.includes("smes"))) {
          links.push({ label: "Subject Matter Experts", href: "/smes" });
        }
        if (lowercaseTags.some((t) => t.includes("data collection") || t.includes("speech data"))) {
          links.push({ label: "AI Data Collection", href: "/ai-data-services/data-collection" });
        }
        if (lowercaseTags.some((t) => t.includes("annotation") || t.includes("labeling") || t.includes("bounding box"))) {
          links.push({ label: "Data Annotation & Labeling", href: "/ai-data-services/annotation-labeling" });
        }
        if (lowercaseTags.some((t) => t.includes("cleaning") || t.includes("validation"))) {
          links.push({ label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" });
        }
        if (lowercaseTags.some((t) => t.includes("testing") || t.includes("model testing") || t.includes("asr testing"))) {
          links.push({ label: "AI Model Testing", href: "/ai-data-services/model-testing" });
        }
        if (links.length === 0 && tags.length > 0) {
          if (lowercaseTags.some((t) => t.includes("ai") || t.includes("data"))) {
            links.push({ label: "AI Data Services", href: "/ai-data-services" });
          } else {
            links.push({ label: "Content Services Overview", href: "/content-services" });
          }
        }
        return links;
      };

      setStudy({
        id: apiCs.id,
        slug: apiCs.slug,
        title: apiCs.title,
        category: (apiCs.industry?.toLowerCase().includes("ai") || apiCs.tags?.includes("AI Data Services") ? "AI Data Services" : "Content Service"),
        industry: apiCs.industry,
        region,
        serviceTags: apiCs.tags || [],
        problem: apiCs.challenge || "",
        solution: apiCs.solution || "",
        impact: apiCs.results || "",
        metrics: apiCs.metrics || [],
        cardSummary: apiCs.summary || "",
        visualDirection: { theme: apiCs.tags?.includes("AI Data Services") ? "navy-cyan" : "teal" },
        relatedLinks: apiCs.relatedLinks && apiCs.relatedLinks.length > 0
          ? apiCs.relatedLinks
          : mapTagsToRelatedLinks(apiCs.tags || []),
        image: apiCs.heroImageUrl
          ? apiCs.heroImageUrl.startsWith("/")
            ? `${import.meta.env.VITE_API_BASE_URL || ""}${apiCs.heroImageUrl}`
            : apiCs.heroImageUrl
          : undefined,
        heroImageAlt: apiCs.seo?.heroImageAlt || `${apiCs.title} — ${apiCs.industry} case study by eQOURSE`,
        heroImageTitle: apiCs.seo?.heroImageTitle || apiCs.title,
        seoTitle: apiCs.seo?.title?.trim() || apiCs.title,
        seoDescription: apiCs.seo?.description?.trim() || apiCs.summary || apiCs.challenge?.slice(0, 160),
        publishedAt: apiCs.publishedAt,
        updatedAt: apiCs.updatedAt,
      });
    });
  }, [slug]);

  // Loading
  if (study === undefined) {
    return (
      <ContentServicesLayout breadcrumbs={[{ label: "Case Studies", href: "/casestudy" }, { label: "Loading..." }]}>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </ContentServicesLayout>
    );
  }

  // Not found
  if (!study) {
    return <NotFound />;
  }

  // Theme
  const isTeal = study.visualDirection.theme === "teal";
  const themeAccent = isTeal ? "text-primary" : "text-[#0ea5e9]";
  const themeBg = isTeal ? "bg-primary" : "bg-[#0ea5e9]";
  const themeGradient = isTeal ? "bg-gradient-primary" : "bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]";
  const themeBorder = isTeal ? "border-primary/20" : "border-[#0ea5e9]/20";
  const themeSoftBg = isTeal ? "bg-primary/5" : "bg-[#0ea5e9]/5";

  const canonicalUrl = `https://www.eqourse.com/casestudy/${study.slug || slug}`;
  const heroAlt = study.heroImageAlt || `${study.title} — ${study.industry} case study by eQOURSE`;
  const heroTitle = study.heroImageTitle || study.title;
  const seoTitle = study.seoTitle?.trim() || study.title;
  const seoDescription = study.seoDescription?.trim() || study.cardSummary || study.problem.slice(0, 160);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: seoTitle,
    description: seoDescription,
    image: study.image || "",
    author: { "@type": "Organization", name: "eQOURSE" },
    publisher: {
      "@type": "Organization",
      name: "eQOURSE",
      logo: { "@type": "ImageObject", url: "https://www.eqourse.com/logo.png" },
    },
    datePublished: study.publishedAt || undefined,
    dateModified: study.updatedAt || study.publishedAt || undefined,
    url: canonicalUrl,
    inLanguage: "en",
  };

  return (
    <ContentServicesLayout breadcrumbs={[{ label: "Case Studies", href: "/casestudy" }, { label: study.title }]}>
      <ArticleSEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        keywords={study.serviceTags}
        image={study.image}
        imageAlt={heroAlt}
        author="eQOURSE"
        publishedAt={study.publishedAt}
        modifiedAt={study.updatedAt || study.publishedAt}
        schema={articleSchema}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Case Studies", item: "https://www.eqourse.com/casestudy" },
          { name: study.title, item: canonicalUrl },
        ]}
      />

      {/* Back Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          to="/casestudy"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-12 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header with Background Image */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            {study.image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={study.image}
                  alt={heroAlt}
                  title={heroTitle}
                  className="w-full h-full object-cover opacity-[0.55] dark:opacity-70"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
              </div>
            )}

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${themeSoftBg} ${themeAccent} ${themeBorder} backdrop-blur-md bg-background/50`}>
                  {study.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-background/50 backdrop-blur-md">
                  {study.industry}
                </span>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-4xl drop-shadow-sm">
                {study.title}
              </h1>

              {/* Core Metrics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mt-8">
                {study.metrics.slice(0, 4).map((metric, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm animate-slide-up"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className={`text-xl md:text-2xl font-bold mb-1 ${themeAccent}`}>{metric.value}</div>
                    <div className="text-xs md:text-sm text-foreground/70 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Left Column: Story Timeline (2/3 width) */}
            <div className="lg:col-span-2 space-y-12">
              <div className="relative border-l border-border/60 ml-3 md:ml-4 space-y-12 pb-4">
                {/* Problem */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-background border-2 ${themeBorder} flex items-center justify-center shadow-sm`}>
                    <Target className={`w-4 h-4 ${themeAccent}`} />
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-4">Problem Statement</h2>
                  <ArticleContent content={study.problem} />
                </div>

                {/* Solution */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-background border-2 ${themeBorder} flex items-center justify-center shadow-sm`}>
                    <Lightbulb className={`w-4 h-4 ${themeAccent}`} />
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-4">Solution</h2>
                  <ArticleContent content={study.solution} />
                </div>

                {/* Impact */}
                <div className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full ${themeBg} border-2 border-background flex items-center justify-center shadow-md`}>
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-4">Impact</h2>
                  <div className={`p-6 rounded-2xl border ${themeBorder} ${themeSoftBg}`}>
                    <ArticleContent content={study.impact} className="font-medium [&_p]:text-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar (1/3 width) */}
            <div className="space-y-8">
              {/* All Metrics Box */}
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <h3 className="font-heading font-semibold mb-5 flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${themeAccent}`} />
                  Key Results
                </h3>
                <ul className="space-y-4">
                  {study.metrics.map((metric, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className={`font-bold text-lg ${themeAccent}`}>{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Services Links (Internal SEO Linking) */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-muted-foreground uppercase tracking-wider text-xs">
                  Services Used
                </h3>
                <div className="flex flex-col gap-2">
                  {study.relatedLinks.map((link, i) => (
                    <SmartArticleLink
                      key={i}
                      href={link.href}
                      className="group flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-border hover:bg-card hover:shadow-sm transition-all"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${themeAccent}`} />
                    </SmartArticleLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentServicesLayout>
  );
};

export default CaseStudyDetail;
