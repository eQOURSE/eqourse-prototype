import { useLocation } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import InteractiveSampleTabs from "./InteractiveSampleTabs";
import StandardSampleElements from "./StandardSampleElements";
import ContentServicesLandingBody from "./ContentServicesLandingBody";
import NotFound from "@/pages/NotFound";
import { getContentServicesSampleByPath } from "../contentServicesSamplesData";
import { ArrowRight } from "lucide-react";

const ContentServicesSamplePage = () => {
  const { pathname } = useLocation();
  const sample = getContentServicesSampleByPath(pathname);

  if (!sample) return <NotFound />;

  const isLanding =
    sample.kind === "text-landing" || sample.kind === "video-landing";

  const parentCrumb = sample.kind === "video" || sample.kind === "video-landing"
    ? { label: "Video & Audio Samples", href: "/video-samples" }
    : { label: "Text Samples", href: "/text-samples" };

  const breadcrumbs = isLanding
    ? [{ label: "Samples", href: "/samples" }, { label: sample.navLabel }]
    : [
        { label: "Samples", href: "/samples" },
        parentCrumb,
        { label: sample.navLabel },
      ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEOHead
        title={sample.seoTitle}
        description={sample.seoDescription}
        canonical={`https://www.eqourse.com${sample.path}`}
        keywords={sample.keywords}
      />

      {isLanding ? (
        <ContentServicesLandingBody sample={sample} />
      ) : (
        <>
          <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-primary/[0.04] to-accent/[0.08] py-12 md:py-16">
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="container relative z-10 mx-auto px-4 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                eQOURSE work samples
              </p>
              <h1 className="mx-auto max-w-4xl font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {sample.title}
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {sample.subtext || sample.seoDescription}
              </p>
              <a
                href="#samples"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Explore available samples
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </header>
          <InteractiveSampleTabs sample={sample} />
          {sample.faqs && sample.faqs.length > 0 && (
            <section className="py-16 md:py-20 bg-muted/30">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Frequently Asked <span className="text-gradient">Questions</span>
                  </h2>
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
      )}

      <StandardSampleElements />
    </PageLayout>
  );
};

export default ContentServicesSamplePage;
