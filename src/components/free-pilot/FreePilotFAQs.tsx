import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is the free pilot really free?",
    answer:
      "Yes, 100% free. No payment, no credit card, no hidden charges. We produce a complimentary sample tailored to your specifications so you can evaluate our quality before making any commitment.",
  },
  {
    question: "What do I receive in the EdTech content pilot?",
    answer:
      "You receive a sample content piece tailored to your curriculum, subject, and grade level. This can be a lesson plan, workbook section, assessment paper, video script, curriculum outline, or exam prep module. It is produced by qualified SMEs, reviewed by our editorial QA team, and aligned to your board standards (CBSE, ICSE, IB, etc.).",
  },
  {
    question: "What do I receive in the AI Data Services pilot?",
    answer:
      "You receive a sample annotated dataset tailored to your AI use case. This can be NLP annotation (NER, sentiment, intent), Computer Vision annotation (bounding boxes, segmentation), Audio annotation (transcription, diarisation), or RLHF annotation (preference ranking, safety labeling). The sample includes 50–500 data units, delivered in your preferred format (COCO JSON, CoNLL, JSONL, etc.) with a quality report showing IAA scores and honeypot validation results.",
  },
  {
    question: "How long does it take to receive my pilot?",
    answer:
      "EdTech content pilots are delivered within 5–7 business days. AI Data pilots are delivered within 5–10 business days, depending on modality and complexity. If you have urgent requirements, let us know and we can discuss expedited timelines.",
  },
  {
    question: "What happens after I receive the pilot?",
    answer:
      "You review the pilot output and provide feedback. If you're happy with the quality, our team will scope your full project with a detailed proposal, timeline, and pricing. If you're not satisfied, there is no obligation to proceed. We welcome constructive feedback either way.",
  },
  {
    question: "Can I request a pilot for both EdTech and AI Data?",
    answer:
      'Yes. Select "Both" in the pilot request form and describe your requirements for each vertical in the project description field. We\'ll produce samples for both.',
  },
  {
    question: "Is my data kept confidential?",
    answer:
      "Absolutely. eQOURSE is ISO 27001:2022 certified for information security. All pilot data is handled under strict NDAs, access controls, and encryption. Your data is never shared with other clients or used for any purpose beyond your pilot.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the pilot request form above with your project details. Our team will contact you within 24–48 hours to confirm scope, timeline, and any additional requirements. It's that simple.",
  },
];

const AccordionItem = ({ faq, isOpen, onClick, index }: { faq: FAQItem; isOpen: boolean; onClick: () => void; index: number }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-400 overflow-hidden ${
        isOpen ? "border-primary/30 shadow-soft border-l-[3px] border-l-primary" : "border-border/50 shadow-sm hover:border-primary/20 hover:shadow-card"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
        id={`faq-heading-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className={`font-heading text-base md:text-lg font-bold pr-4 transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
          {faq.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-primary text-white rotate-180" : "bg-primary/10 text-primary"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}px` }}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        role="region"
        id={`faq-panel-${index}`}
        aria-labelledby={`faq-heading-${index}`}
      >
        <div className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FreePilotFAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden" ref={ref} id="pilot-faqs">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/3 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">FAQs</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Everything you need to know about our free pilot programme
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <AccordionItem
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreePilotFAQs;
