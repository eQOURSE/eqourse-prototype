import { useParams } from "react-router-dom";
import AIDataServicesLayout from "@/components/ai-data-services/shared/AIDataServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import SampleHero from "./SampleHero";
import SampleShowcaseGrid from "./SampleShowcaseGrid";
import QualityMetrics from "./QualityMetrics";
import RelatedSamples from "./RelatedSamples";
import NotFound from "@/pages/NotFound";
import { getSampleBySlug } from "./aiDataSamplesData";

const AiDataSamplePage = () => {
  const { slug } = useParams();
  const sample = getSampleBySlug(slug || "");

  if (!sample) return <NotFound />;

  return (
    <AIDataServicesLayout
      breadcrumbs={[
        { label: "Samples", href: "/samples" },
        { label: "AI Data Samples", href: "/samples#ai-data" },
        { label: sample.navLabel },
      ]}
    >
      <SEOHead
        title={sample.seoTitle}
        description={sample.seoDescription}
        canonical={`https://www.eqourse.com${sample.path}`}
        keywords={sample.keywords}
      />

      <SampleHero sample={sample} />

      <SampleShowcaseGrid showcases={sample.showcases} />

      <QualityMetrics metrics={sample.metrics} />

      <RelatedSamples currentSlug={sample.slug} />

      <ServiceCTA
        headline="Ready to See Our Quality on Your Data?"
        subtext="Request a free pilot dataset tailored to your use case, modality, and language requirements. No commitment required."
        ctaText="Request Free Pilot Dataset"
      />
    </AIDataServicesLayout>
  );
};

export default AiDataSamplePage;
