import { useLocation } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import EdtechSampleHero from "./EdtechSampleHero";
import InteractiveSampleTabs from "./InteractiveSampleTabs";
import StandardSampleElements from "./StandardSampleElements";
import EdtechLandingBody from "./EdtechLandingBody";
import NotFound from "@/pages/NotFound";
import { getEdtechSampleByPath } from "../edtechSamplesData";
import { ArrowRight } from "lucide-react";

const EdtechSamplePage = () => {
  const { pathname } = useLocation();
  const sample = getEdtechSampleByPath(pathname);

  if (!sample) return <NotFound />;

  const isLanding =
    sample.kind === "text-landing" || sample.kind === "video-landing";

  const parentCrumb = sample.kind === "video" || sample.kind === "video-landing"
    ? { label: "Video Samples", href: "/video-samples" }
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

      <EdtechSampleHero sample={sample} />

      {isLanding ? (
        <EdtechLandingBody sample={sample} />
      ) : (
        <>
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

export default EdtechSamplePage;
