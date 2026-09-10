import { Helmet } from "react-helmet-async";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { BookOpenCheck, Scale, ShieldCheck } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import FAQSection from "../../shared/FAQSection";
import ServiceCTA from "../../shared/ServiceCTA";
import {
  AlignmentDefinition,
  CommercialAndAudience,
  ExpertDifference,
  ExpertDomains,
  LanguagesDeliverySecurity,
  LLMProcess,
  LLMServices,
  RelatedProofWhy,
  SubjectiveQuality,
} from "./LLMRLHFCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/annotation-labeling/llm-rlhf-annotation";

const faqs = [
  ["What is RLHF?", "Reinforcement Learning from Human Feedback is the process of training a language model on human preferences. Reviewers compare or score model outputs, a reward model learns those preferences, and the base model is optimised to produce responses people rate more highly."],
  ["What is the difference between SFT, RLHF and DPO?", "SFT teaches the model how to respond using curated instruction-response pairs. RLHF teaches it which response is better, using human rankings and a reward model. DPO uses the same human preference pairs but optimises the model directly without a separate reward model. RLHF and DPO need the same underlying data."],
  ["What LLM data services does eQOURSE provide?", "Preference ranking and RLHF data, SFT and instruction data creation, rubric-based evaluation, factuality and hallucination review, RAG grounding and citation verification, safety and policy classification, red teaming, agent trajectory evaluation, multi-turn conversation evaluation, model benchmarking and multilingual evaluation."],
  ["Do you provide subject-matter experts?", "Yes. eQOURSE staffs qualified reviewers across STEM, education, medical and life sciences, legal, finance, software and linguistics. For tasks where domain knowledge determines whether an answer is correct, we assign reviewers qualified in that subject."],
  ["How do you measure quality when there is no single right answer?", "Through inter-rater reliability scored with Krippendorff's alpha or Cohen's kappa, blind duplicate sampling, expert-adjudicated gold sets, rubric anchoring with written examples at each score level, and a senior adjudication layer. Agreement metrics are delivered with the data."],
  ["What is agent trajectory evaluation?", "Reviewing a multi-step AI agent run rather than a single response: whether the right tool was selected, whether the call was correctly formed, whether the reasoning chain held across steps, how the agent recovered from errors, and whether the overall task succeeded."],
  ["Can you help design our evaluation rubric?", "Yes. Most programmes start with rubric design. We define the dimensions, scale, anchor examples and tie-break rules with your team, then stress-test them in a calibration round before production begins."],
  ["What formats do you deliver in?", "JSONL preference pairs with chosen and rejected responses, chat-format SFT data, per-dimension evaluation scores with rationale, multi-turn conversation annotations, step-level agent traces, red team result sets, or a custom schema mapped to your training harness."],
  ["Do you support red teaming?", "Yes. Human-written adversarial prompts include jailbreak attempts, prompt injection, refusal boundary probing and domain-specific attacks, with results labeled by harm category and severity."],
  ["Which languages do you support?", "30+ languages with native-speaker reviewers, with deepest coverage in Indic languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Urdu, including romanised, transliterated and code-mixed input."],
  ["How much does RLHF data cost?", "Cost depends on reviewer qualification, task complexity, response length, rubric maturity, required agreement level, language and turnaround. Share a sample set and rubric for a scoped estimate."],
  ["How do you keep our model outputs and prompts confidential?", "Work runs under ISO 27001 certified processes with NDAs, named and vetted reviewer pools, role-based access, full audit trails, contractually defined retention and deletion, and client-controlled environments for restricted programmes. IP in the data we create is assigned to you."],
  ["Can you evaluate our model against a competitor's?", "Yes. Blind side-by-side comparison with randomised response order, scored against your rubric, reported with win rates and dimension-level breakdowns."],
  ["How do we start?", "Start with a free pilot. Share a sample set and your evaluation goal—or ask us to draft the rubric—and we will return scored output plus an inter-rater agreement report."],
].map(([question, answer]) => ({ question, answer }));

const offers = ["Preference Ranking and RLHF Data", "SFT and Instruction Data Creation", "Rubric-Based Response Evaluation", "Factuality and Hallucination Review", "RAG Grounding and Citation Verification", "Safety, Toxicity and Policy Classification", "Red Teaming and Adversarial Prompt Creation", "Agent Trajectory and Tool-Use Evaluation", "Multi-Turn Conversation Evaluation", "Model Comparison and Benchmarking", "Domain-Expert Review", "Multilingual LLM Evaluation"];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "RLHF & LLM Data Annotation Services",
      serviceType: "RLHF and LLM Data Annotation",
      url: canonical,
      description: "RLHF preference data, SFT dataset creation, rubric-based LLM evaluation, factuality and hallucination review, RAG grounding verification, safety classification, red teaming and agent trajectory evaluation, delivered by subject-matter experts across 30+ languages.",
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/", address: [{ "@type": "PostalAddress", addressCountry: "IN" }, { "@type": "PostalAddress", addressCountry: "SG" }] },
      areaServed: "Worldwide",
      availableLanguage: "en",
      isPartOf: { "@type": "Service", "@id": "https://www.eqourse.com/ai-data-services/annotation-labeling#service", name: "Data Annotation & Labeling Services", url: "https://www.eqourse.com/ai-data-services/annotation-labeling" },
      hasOfferCatalog: { "@type": "OfferCatalog", name: "LLM and RLHF Data Services", itemListElement: offers.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: "https://www.eqourse.com/ai-data-services/annotation-labeling" },
        { "@type": "ListItem", position: 4, name: "LLM & RLHF Data", item: canonical },
      ],
    },
    { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const LLMRLHFPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Annotation & Labeling", href: "/ai-data-services/annotation-labeling" }, { label: "LLM & RLHF Data" }]}>
    <SEOHead
      title="RLHF & LLM Data Annotation Services | eQOURSE"
      description="Expert RLHF preference data, SFT datasets, LLM evaluation, red teaming and factuality review across 30+ languages. Start a free pilot."
      canonical={canonical}
      keywords="RLHF data services, RLHF annotation services, LLM data annotation, LLM training data services, human preference data, LLM evaluation services, SFT data creation, AI model alignment data"
      ogImage="https://www.eqourse.com/assets/ai-data/annotation-labeling/llm-rlhf/llm-rlhf-annotation-og.webp"
    />
    <Helmet>
      <link rel="preload" as="image" href="/assets/ai-data/annotation-labeling/llm-rlhf/rlhf-llm-data-annotation-services-hero.avif" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>

    <ServiceHero
      tone="dark"
      preHeadline="Expert Human Feedback for Model Alignment"
      headline="RLHF & LLM Data Annotation Services for"
      headlineAccent="Model Alignment"
      subtext="Build preference rankings, SFT datasets, rubric evaluations, factuality checks, safety labels and red-team prompts with subject-matter experts across 30+ languages."
      ctaText="Start Free Pilot"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/annotation-labeling/llm-rlhf/rlhf-llm-data-annotation-services-hero.webp"
      imageAvifSrc="/assets/ai-data/annotation-labeling/llm-rlhf/rlhf-llm-data-annotation-services-hero.avif"
      imageAlt="Expert reviewer comparing two AI model responses side by side during RLHF preference evaluation"
      imageWidth={1200}
      imageHeight={800}
      trustStats={[{ value: "SMEs", label: "STEM, medical, legal, linguistics & education" }, { value: "30+", label: "Languages with deep Indic coverage" }, { value: "ISO", label: "9001 & 27001 certified processes" }]}
      rotatingBadges={[
        { icon: Scale, title: "Preference signal", subtitle: "Chosen · Rejected · Rationale", color: "hsl(170 82% 55%)" },
        { icon: BookOpenCheck, title: "Rubric anchored", subtitle: "Dimensions · Examples · Ties", color: "hsl(190 80% 58%)" },
        { icon: ShieldCheck, title: "Agreement measured", subtitle: "Alpha · Kappa · Adjudication", color: "hsl(35 92% 58%)" },
      ]}
      bottomBadge={{ iconText: "HITL", title: "Expert human judgement", subtitle: "Qualified · Calibrated · Traceable" }}
    />

    <AlignmentDefinition />
    <LLMServices />
    <ExpertDifference />
    <ExpertDomains />
    <LLMProcess />
    <SubjectiveQuality />
    <LanguagesDeliverySecurity />
    <CommercialAndAudience />
    <RelatedProofWhy />
    <RelatedBlogs />
    <FAQSection faqs={faqs} label="LLM & RLHF FAQs" title="Frequently Asked Questions About RLHF & LLM Data" />
    <ServiceCTA headline="Align Your Model With Expert Human Feedback" subtext="Tell us the model, the behaviour you want to change and the domain—we'll draft a rubric and run a pilot on your own data." ctaText="Start Free Pilot" ctaLink="/free-pilot" secondaryCtaText="Talk to a Data Specialist" secondaryCtaLink="/contact-us" note="Rubric-led pilot on your data" />
  </AIDataServicesLayout>
);

export default LLMRLHFPage;
