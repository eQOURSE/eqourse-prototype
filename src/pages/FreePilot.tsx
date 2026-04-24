import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import FreePilotHero from "@/components/free-pilot/FreePilotHero";
import FreePilotHowItWorks from "@/components/free-pilot/FreePilotHowItWorks";
import FreePilotChooseTracks from "@/components/free-pilot/FreePilotChooseTracks";
import FreePilotFormSection from "@/components/free-pilot/FreePilotFormSection";
import FreePilotWhySection from "@/components/free-pilot/FreePilotWhySection";
import FreePilotClientsStrip from "@/components/free-pilot/FreePilotClientsStrip";
import FreePilotFAQs from "@/components/free-pilot/FreePilotFAQs";
import ContactStatsBar from "@/components/contact/ContactStatsBar";

const FreePilot = () => {
  // Build FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the free pilot really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% free. No payment, no credit card, no hidden charges. We produce a complimentary sample tailored to your specifications so you can evaluate our quality before making any commitment.",
        },
      },
      {
        "@type": "Question",
        name: "What do I receive in the EdTech content pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You receive a sample content piece tailored to your curriculum, subject, and grade level. This can be a lesson plan, workbook section, assessment paper, video script, curriculum outline, or exam prep module. It is produced by qualified SMEs, reviewed by our editorial QA team, and aligned to your board standards (CBSE, ICSE, IB, etc.).",
        },
      },
      {
        "@type": "Question",
        name: "What do I receive in the AI Data Services pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You receive a sample annotated dataset tailored to your AI use case. This can be NLP annotation (NER, sentiment, intent), Computer Vision annotation (bounding boxes, segmentation), Audio annotation (transcription, diarisation), or RLHF annotation (preference ranking, safety labeling). The sample includes 50–500 data units, delivered in your preferred format (COCO JSON, CoNLL, JSONL, etc.) with a quality report showing IAA scores and honeypot validation results.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to receive my pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "EdTech content pilots are delivered within 5–7 business days. AI Data pilots are delivered within 5–10 business days, depending on modality and complexity. If you have urgent requirements, let us know and we can discuss expedited timelines.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after I receive the pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You review the pilot output and provide feedback. If you're happy with the quality, our team will scope your full project with a detailed proposal, timeline, and pricing. If you're not satisfied, there is no obligation to proceed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I request a pilot for both EdTech and AI Data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'Yes. Select "Both" in the pilot request form and describe your requirements for each vertical in the project description field. We\'ll produce samples for both.',
        },
      },
      {
        "@type": "Question",
        name: "Is my data kept confidential?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. eQOURSE is ISO 27001:2022 certified for information security. All pilot data is handled under strict NDAs, access controls, and encryption. Your data is never shared with other clients or used for any purpose beyond your pilot.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fill out the pilot request form above with your project details. Our team will contact you within 24–48 hours to confirm scope, timeline, and any additional requirements. It's that simple.",
        },
      },
    ],
  };

  return (
    <PageLayout breadcrumbs={[{ label: "Free Pilot" }]}>
      <Helmet>
        <title>Free Pilot Program │ Try EdTech Content & AI Data Services Free │ eQOURSE</title>
        <meta
          name="description"
          content="Start your free pilot with eQOURSE. Get a complimentary sample of custom e-learning content or AI training data — tailored to your specifications. No payment, no obligation. EdTech content pilots delivered in 5–7 days, AI data pilots in 5–10 days. ISO 9001 & 27001 certified."
        />
        <meta
          name="keywords"
          content="free pilot program, free e-learning sample, free AI data annotation sample, EdTech content pilot, AI training data pilot, eQOURSE free trial, curriculum development sample, data annotation sample, NLP annotation, computer vision annotation, RLHF annotation, free content sample"
        />
        <meta property="og:title" content="Free Pilot Program │ Try EdTech & AI Data Services │ eQOURSE" />
        <meta
          property="og:description"
          content="Experience eQOURSE quality risk-free. Request a complimentary pilot for EdTech content or AI data services. No payment, no obligation. 200+ clients worldwide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.eqourse.com/free-pilot" />
        <link rel="canonical" href="https://www.eqourse.com/free-pilot" />

        {/* FAQPage JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Pilot Program - eQOURSE",
            "description": "Start your free pilot with eQOURSE. Get a complimentary sample of custom e-learning content or AI training data.",
            "url": "https://www.eqourse.com/free-pilot",
            "publisher": {
              "@type": "Organization",
              "name": "eQOURSE",
              "url": "https://www.eqourse.com"
            }
          }`}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Free Pilot", item: "https://www.eqourse.com/free-pilot" },
        ]}
      />

      {/* Section 1: Hero Banner (same format as Contact) */}
      <FreePilotHero />

      {/* Section 2: How It Works (3 Steps) */}
      <FreePilotHowItWorks />

      {/* Section 3: Choose Your Pilot Track */}
      <FreePilotChooseTracks />

      {/* Section 4: Pilot Request Form */}
      <FreePilotFormSection />

      {/* Section 5: Why Start with a Free Pilot */}
      <FreePilotWhySection />

      {/* Section 6: Trusted Clients Logo Strip */}
      <FreePilotClientsStrip />

      {/* Section 7: Stats Counter Bar */}
      <ContactStatsBar />

      {/* Section 8: Pilot FAQs */}
      <FreePilotFAQs />
    </PageLayout>
  );
};

export default FreePilot;
