import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import WhyBenchmarksFail from "./WhyBenchmarksFail";
import TestingCapabilities from "./TestingCapabilities";
import ClosedLoopAdvantage from "./ClosedLoopAdvantage";
import TuTrainPlatform from "./TuTrainPlatform";
import WhoThisIsFor from "./WhoThisIsFor";
import FAQSection from "../shared/FAQSection";
import ServiceCTA from "../shared/ServiceCTA";
import ServiceNarrativeSection from "../shared/ServiceNarrativeSection";

const faqs = [
  {
    question: "How is your model testing different from standard benchmarks?",
    answer:
      "Standard benchmarks use scripted, clean test cases. We test with real users in real-world conditions - noisy audio, accented speech, code-switching, adversarial inputs, and multi-turn conversations. This reveals failure modes that benchmarks miss.",
  },
  {
    question: "What is the closed-loop pipeline?",
    answer:
      "Our closed-loop pipeline is a continuous improvement cycle: deploy, test with real users, collect feedback, analyze gaps, curate new training data, retrain, and validate again. This feedback loop delivers 20-40% faster model improvement compared to traditional batch testing.",
  },
  {
    question: "What is the TuTrain platform?",
    answer:
      "TuTrain is our proprietary testing infrastructure that connects your model to 500+ vetted real users across 30+ languages. It supports multi-device testing, provides real-time analytics dashboards, and delivers structured feedback on model performance with full audit trails.",
  },
  {
    question: "How long does a testing cycle take?",
    answer:
      "Typical testing cycles run 5-10 business days depending on scope. We operate in agile sprints: initial results in 2-3 days, full analysis by end of sprint. For continuous testing, we offer always-on crowd access with weekly reporting.",
  },
  {
    question: "Can you test models across multiple languages?",
    answer:
      "Yes. We test across 30+ languages with native speakers who understand regional dialects, accent variations, and cultural context. This is critical for Voice AI, Conversational AI, and multilingual NLP models.",
  },
];

const ModelTestingPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Model Testing" },
    ]}
  >
    <SEOHead
      title="AI Model Testing & Evaluation | eQOURSE - Real-World Testing via TuTrain"
      description="Go beyond benchmarks. Test your AI models with real users across 30+ languages. Closed-loop feedback pipeline for 20-40% faster model improvement."
      canonical="https://eqourse.com/ai-data-services/model-testing"
      keywords="AI model testing, model evaluation, A/B testing AI, dialect testing, WER measurement, closed-loop ML, TuTrain platform"
    />

    <ServiceHero
      preHeadline="Model Testing & Evaluation"
      headline="Test with Real Users, Not"
      headlineAccent="Just Benchmarks"
      subtext="Closed-loop testing pipeline with real users via TuTrain. A/B testing, dialect audits, and edge case discovery for 20-40% faster model improvement."
      ctaText="Start Testing"
      ctaLink="/free-pilot"
    />

    <ServiceNarrativeSection
      label="Production Validation"
      title="What Is Real-World"
      gradientText="Model Testing?"
      description="Model quality is not proven in synthetic labs. It is proven under real users, real contexts, and real failure pressure."
      paragraphs={[
        "Benchmark scores are useful, but they hide behavioral risk. Production systems face noisy input, uneven demographics, dialect drift, and long-tail edge cases.",
        "Our testing stack puts your model in realistic usage loops, measures breakdown patterns, and feeds targeted data improvements back into training.",
      ]}
      bullets={[
        "User-centered test design across languages, devices, and operating conditions",
        "Failure analytics tied directly to retraining priorities",
        "Closed-loop improvement model for faster, safer deployment cycles",
      ]}
      stats={[
        { value: "20-40%", label: "Faster improvement" },
        { value: "500+", label: "Real users" },
        { value: "30+", label: "Languages" },
        { value: "5-10", label: "Day sprint" },
      ]}
      panelTitle="Deployment Readiness Index"
      panelSubtitle="Real-world confidence checks before full launch."
      bars={[
        { label: "Robustness under noise", value: 88 },
        { label: "Dialect reliability", value: 86 },
        { label: "Edge-case resilience", value: 84 },
        { label: "Iteration velocity", value: 93 },
      ]}
    />

    <WhyBenchmarksFail />
    <TestingCapabilities />
    <ClosedLoopAdvantage />
    <TuTrainPlatform />
    <WhoThisIsFor />
    <FAQSection faqs={faqs} />
    <ServiceCTA
      headline="Ready to Test Your Model?"
      subtext="Share your model endpoint and testing criteria. We'll design a testing plan and start with a free evaluation sprint."
      ctaText="Start Free Evaluation"
    />
  </AIDataServicesLayout>
);

export default ModelTestingPage;
