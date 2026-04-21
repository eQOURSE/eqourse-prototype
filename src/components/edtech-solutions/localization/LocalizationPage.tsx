import EdTechLayout from "../shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ServiceNarrativeSection from "@/components/ai-data-services/shared/ServiceNarrativeSection";
import FAQSection from "@/components/ai-data-services/shared/FAQSection";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import LocalizationServicesGrid from "./LocalizationServicesGrid";

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
  <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: "Localization Services" }]}>
    <SEOHead
      title="EdTech Localization Services | eQOURSE"
      description="Localized learning solutions in Hindi, English & regional languages. Accurate content translation, professional voice-over, and subtitling services."
      canonical="https://eqourse.com/edtech-solutions/localization-services"
      keywords="edtech localization, content translation, educational voice over, subtitling services, regional language education, multilingual learning content"
    />

    <ServiceHero
      preHeadline="Localized Learning Solutions in Hindi, English & Regional Languages"
      headline="Educational Content"
      headlineAccent="Localization Services"
      subtext="Ensure your educational materials resonate perfectly with native speakers through expert translation, culturally adapted voice-overs, and precise subtitling."
      ctaText="Get Free Consultation"
      ctaLink="#contact"
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
    <FAQSection faqs={faqs} />
    
    <ServiceCTA 
      headline="Expand Your Audience Reach"
      subtext="Don't let language barriers restrict your educational impact. Partner with eQOURSE to natively localize your prime content into 30+ languages."
      ctaText="Request Localization Quote"
    />
  </EdTechLayout>
);

export default LocalizationPage;
