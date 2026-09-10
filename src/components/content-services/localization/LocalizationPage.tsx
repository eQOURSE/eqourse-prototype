import ContentServicesLayout from "../shared/ContentServicesLayout";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import LocalizationServicesGrid from "./LocalizationServicesGrid";
import { Languages, Mic, Subtitles } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What types of content can you localize?",
    answer: "We seamlessly localize e-learning modules, video lessons, instructional materials, assessments, workbooks, and e-books natively in Hindi, English, and major regional languages of India."
  },
  {
    question: "Do you provide voice-over services in regional languages?",
    answer: "Yes, we offer highly professional voice-over in Hindi, English, and a vast array of regional languages including Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and more."
  },
  {
    question: "How do you ensure cultural relevance?",
    answer: "Our translators and audio professionals are native experts intricately embedded in Indian languages and culture, ensuring content is not merely translated, but authentically and culturally adapted for the target demographic."
  }
];

const LocalizationPage = () => (
  <ContentServicesLayout breadcrumbs={[{ label: "Content Services", href: "/content-services" }, { label: "Localization Services" }]}>
    <SEOHead
      title="Content Services Localization Services | eQOURSE"
      description="Localized learning solutions in Hindi, English & regional languages. Accurate content translation, professional voice-over, and subtitling services."
      canonical="https://www.eqourse.com/localization-services"
      keywords="content services localization, content translation, educational voice over, subtitling services, regional language education, multilingual learning content"
    />

    <ServiceHero
      preHeadline="Localized Learning Solutions in Hindi, English & Regional Languages"
      headline="Educational Content"
      headlineAccent="Localization Services"
      subtext="Ensure your educational materials resonate perfectly with native speakers through expert translation, culturally adapted voice-overs, and precise subtitling."
      ctaText="Get Free Consultation"
      ctaLink="/contact-us"
      imageSrc="/assets/banners/content-services/main/localization-services.webp"
      imageAlt="Localization services by eQOURSE - professional translation, voice-over recording and subtitling for educational content in Hindi, English, Tamil, Bengali and 30+ languages"
      rotatingBadges={[
        { icon: Languages, title: "Translation", subtitle: "Culturally adapted", color: "hsl(170 82% 55%)" },
        { icon: Mic, title: "Voice-Over", subtitle: "Native talent", color: "hsl(190 85% 68%)" },
        { icon: Subtitles, title: "Subtitling", subtitle: "Precise timing", color: "hsl(165 75% 71%)" }
      ]}
      bottomBadge={{ iconText: "LOC", title: "Localization", subtitle: "30+ regional languages" }}
    />

    <ServiceNarrativeSection
      label="Cultural Intelligence"
      title="Speak Their "
      gradientText="Language"
      description="True educational equity requires content that feels native, not simply translated by software."
      paragraphs={[
        "At eQOURSE, we provide specialized pedagogical localization services dedicated to K-12 and higher education frameworks, ensuring that complex academic content is fully accessible and engaging.",
        "Our robust localization workflows encompass idiomatic content translation, studio-grade voice-over production, and precise temporal subtitling to make diverse learning materials deeply engaging and culturally relevant across varied demographics."
      ]}
      bullets={[
        "Native speaker networks fluent in pedogogical terminology",
        "Rigorous quality assurance preventing contextual misinterpretation",
        "Studio-quality audio engineering supporting 30+ regional languages"
      ]}
      stats={[
        { value: "30+", label: "Regional Dialects" },
        { value: "0", label: "Semantic Errors" },
        { value: "100%", label: "Native Talent" },
        { value: "ISO", label: "Certified Ops" }
      ]}
      panelTitle="Localization Accuracy Protocol"
      panelSubtitle="Our stringent quality markers for translated educational assets."
      bars={[
        { label: "Semantic Integrity", value: 99 },
        { label: "Cultural Appropriateness", value: 98 },
        { label: "Audio Sync Accuracy", value: 96 },
        { label: "Formatting Adaptation", value: 95 }
      ]}
    />

    <LocalizationServicesGrid />
    <section className="border-y border-border/60 bg-muted/30 py-10"><div className="container mx-auto px-4"><div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center"><div><span className="text-xs font-bold uppercase tracking-wider text-primary">AI language data</span><h2 className="mt-2 font-heading text-xl font-bold">Need machine translation post-editing at dataset scale?</h2><p className="mt-2 text-sm text-muted-foreground">Connect localisation expertise with taxonomy-tested text and NLP annotation services.</p></div><Link to="/ai-data-services/annotation-labeling/text-nlp-annotation" className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Explore Text &amp; NLP Annotation</Link></div></div></section>
    <RelatedBlogs />
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Expand Your Audience Reach"
      subtext="Don't let language barriers restrict your educational impact. Partner with eQOURSE to natively localize your prime content into 30+ languages."
      ctaText="Request Localization Quote"
    />
  </ContentServicesLayout>
);

export default LocalizationPage;
