import AIDataServicesLayout from "@/components/ai-data-services/shared/AIDataServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import SamplesCategoryTabs from "./SamplesCategoryTabs";
import SamplesStatsStrip from "./SamplesStatsStrip";

const SamplesOverviewPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "Samples" }]}>
    <SEOHead
      title="Samples │ EdTech Content, Video & AI Data Annotation Samples │ eQOURSE"
      description="Explore eQOURSE samples: K-12 text content, curriculum materials, exam prep, educational videos, Articulate Storyline, 2D/3D animations, and AI data annotation samples including NLP, computer vision, audio, and RLHF. See our work before you commit."
      canonical="https://www.eqourse.com/samples"
      keywords="eQOURSE samples, educational content samples, K12 content samples, video learning samples, AI data annotation samples, NLP annotation examples, computer vision annotation samples, RLHF samples, e-learning samples"
    />

    <ServiceHero
      preHeadline="See Our Work Before You Commit"
      headline="Explore Our EdTech Content, Video &"
      headlineAccent="AI Data Samples"
      subtext="We partner with educational institutions, EdTech platforms, and AI teams to deliver expertly crafted content and production-grade training data. Browse samples across three categories — Text Content, Video Content, and AI Data — each demonstrating the quality and scale that 200+ clients trust."
      ctaText="Request Custom Samples"
      ctaLink="#contact"
    />

    <SamplesStatsStrip />
    <SamplesCategoryTabs />

    <ServiceCTA
      headline="Didn't Find the Right Sample?"
      subtext="Tell us your use case, format, and language. We'll build a custom sample or free pilot dataset for you — no commitment required."
      ctaText="Request Custom Samples"
    />
  </AIDataServicesLayout>
);

export default SamplesOverviewPage;
