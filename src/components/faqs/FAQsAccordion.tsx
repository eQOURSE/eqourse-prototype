import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap, Brain, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface FAQ {
  question: string;
  answer: string;
}

const edtechFaqs: FAQ[] = [
  {
    question: "What types of educational content does eQOURSE create?",
    answer: "eQOURSE creates K-12 study materials, curriculum-aligned lessons, assessments, workbooks, teacher lesson plans, STEM content, e-books, quiz and question banks, exam preparation content (SAT, IELTS, TOEFL, IIT-JEE, NEET, and more), corporate training modules, and interactive video lessons across 30+ languages."
  },
  {
    question: "How is eQOURSE different from other EdTech content providers?",
    answer: "eQOURSE is a full-stack EdTech solutions partner. We don't just create content — we handle curriculum design, assessment development, video production, localization, LMS integration, and SME recruitment under one roof. This integrated approach eliminates vendor fragmentation, reduces turnaround time, and ensures consistent quality across your entire content library."
  },
  {
    question: "What curriculum standards do you support?",
    answer: "We support CBSE, ICSE, IB (International Baccalaureate), State Board curricula across Indian states, Common Core (US), Cambridge (IGCSE/A-Level), and custom curriculum frameworks. Our team adapts to any national or institutional curriculum standard."
  },
  {
    question: "Can you scale content production quickly?",
    answer: "Yes. With 200+ active SMEs and a structured production workflow, we can scale from 50 content units per month to 5,000+ depending on complexity and format. We onboard additional specialists within 5–7 business days for large-volume projects."
  },
  {
    question: "Do you offer translation and localization for educational content?",
    answer: "Absolutely. We offer comprehensive translation and localization services in over 30 languages. Our localization experts ensure that educational materials remain culturally relevant and retain their academic rigor across different regions."
  },
  {
    question: "What about digital learning and LMS integration?",
    answer: "Our tech solutions team ensures that all content is built with modern standards (SCORM, xAPI, LTI) to seamlessly integrate into your existing Learning Management System (LMS). We can also help in setting up and customizing white-labeled LMS platforms."
  },
  {
    question: "How do I get started?",
    answer: "We offer a free pilot for qualifying education and EdTech clients. Fill out the pilot form with your content requirements, target audience, and curriculum framework, and our team will deliver a sample content package within the agreed timeframe — no commitment required."
  }
];

const aiDataFaqs: FAQ[] = [
  {
    question: "What AI data services does eQOURSE provide?",
    answer: "eQOURSE provides end-to-end AI training data services: custom dataset collection (text, audio, image, video) across 30+ languages, expert data annotation and labeling (NLP, Computer Vision, Audio, RLHF), data cleaning and validation with 98%+ accuracy guarantee, and real-world model testing via our TuTrain platform. We are ISO 9001 & ISO 27001 certified."
  },
  {
    question: "What types of data annotation does eQOURSE offer?",
    answer: "We offer <a href='/ai-data-services/annotation-labeling' class='text-primary hover:underline font-medium'>NLP annotation</a> (NER, sentiment, intent classification, relation extraction, coreference resolution), Computer Vision annotation (bounding boxes, semantic segmentation, instance segmentation, polygon annotation, 3D cuboids, keypoint detection, video annotation), Audio annotation (transcription, speaker diarisation, phoneme labeling, emotion detection), and RLHF annotation (preference ranking, safety labeling, instruction-following evaluation, red-teaming)."
  },
  {
    question: "What languages do you support for AI data collection and annotation?",
    answer: "We support 30+ languages spanning Indo-Aryan (Hindi, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, Bhojpuri), Dravidian (Tamil, Telugu, Kannada, Malayalam), Southeast Asian (Bahasa, Sinhala, Nepali), and European/Global (English with regional accent variants, French, German, Spanish, Portuguese, Arabic). All language tasks are handled by verified native speakers."
  },
  {
    question: "What is your annotation accuracy guarantee?",
    answer: "eQOURSE guarantees 98%+ annotation accuracy on all delivered datasets. We maintain inter-annotator agreement (IAA) ≥ 0.80 (Krippendorff’s Alpha) across all annotation tasks. Our quality framework includes multi-tier review (annotator → peer review → senior QA audit), gold-standard honeypot validation (15–20% of all tasks), and expert arbitration for disagreements."
  },
  {
    question: "What is real-world model testing and how does TuTrain work?",
    answer: "Real-world model testing is eQOURSE’s unique service where we test your trained AI model on actual users through our TuTrain platform. TuTrain connects your model to a demographically diverse, geographically distributed user base across 30+ languages. We measure WER, intent accuracy, task completion, and other performance metrics in genuine usage conditions — revealing failure modes that benchmark tests never catch. Results feed back into targeted data collection for 20–40% faster model improvement."
  },
  {
    question: "How is my data kept secure?",
    answer: "We are ISO 27001:2022 certified for information security management. All data is handled under strict access controls, encryption at rest and in transit, GDPR-ready processes with PII detection and redaction, full data lineage and audit trails, and project-specific NDAs for all team members. Data is never shared across client projects. SOC 2 preparation is in progress for US enterprise clients."
  },
  {
    question: "What output formats do you deliver annotated data in?",
    answer: "We deliver in all standard ML formats: COCO JSON (computer vision), CoNLL (NLP sequence labeling), JSONL (LLM fine-tuning), Parquet (structured data at scale), NIfTI (medical imaging), CSV/TSV (classification), and custom formats on request. All datasets are version-controlled with full documentation."
  },
  {
    question: "How do I get started with AI data services?",
    answer: "We offer a free pilot dataset to qualifying AI and ML teams. Simply fill out the pilot form with your use case, data modality, language requirements, and annotation type. Our team will deliver a sample dataset within the agreed timeframe — no commitment required. Contact us at info@eqourse.com or call +91-92144-45870."
  },
  {
    question: "How is eQOURSE different from other data annotation companies?",
    answer: "eQOURSE is the only provider offering a closed-loop pipeline from data collection to real-world model testing. We don’t just annotate your data — we test your trained model on real users via TuTrain and feed results back into targeted data collection (active learning loop). This delivers 20–40% faster model improvement compared to static annotation cycles. Additionally, our deep education-sector expertise means our annotators understand context, cultural nuance, and domain-specific content at a level that generic crowdsourcing platforms cannot match."
  }
];

const allFaqs = [...edtechFaqs, ...aiDataFaqs];

const FAQItem = ({ faq, isOpen, toggle, type }: { faq: FAQ, isOpen: boolean, toggle: () => void, type: 'edtech' | 'ai' }) => {
  const isEdTech = type === 'edtech';
  
  return (
    <div className={`mb-4 border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? (isEdTech ? 'border-teal-500/50 shadow-md bg-secondary/30' : 'border-indigo-500/50 shadow-md bg-secondary/30') : 'hover:border-primary/30 glass'}`}>
      <button 
        onClick={toggle} 
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? (isEdTech ? 'bg-teal-500 text-white' : 'bg-indigo-600 text-white') : 'bg-primary/10 text-primary'}`}>
            {isEdTech ? <GraduationCap className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
          </div>
          <span className="font-semibold text-foreground md:text-lg">{faq.question}</span>
        </div>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0 sm:pl-[72px] text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQsAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, ''), // Strip HTML for schema
      }
    }))
  };

  return (
    <section className="py-16 bg-background relative z-10 -mt-16">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* EdTech Solutions FAQs */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              EdTech Solutions
            </h2>
            <div className="h-[1px] flex-1 bg-border/80"></div>
          </div>
          
          <div className="space-y-4">
            {edtechFaqs.map((faq, index) => {
              const id = `edtech-${index}`;
              return (
                <FAQItem 
                  key={id}
                  faq={faq}
                  isOpen={openId === id}
                  toggle={() => toggleFAQ(id)}
                  type="edtech"
                />
              );
            })}
          </div>
        </div>

        {/* AI Data Services FAQs */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              AI Data Services
            </h2>
            <div className="h-[1px] flex-1 bg-border/80"></div>
          </div>
          
          <div className="space-y-4">
            {aiDataFaqs.map((faq, index) => {
              const id = `ai-${index}`;
              return (
                <FAQItem 
                  key={id}
                  faq={faq}
                  isOpen={openId === id}
                  toggle={() => toggleFAQ(id)}
                  type="ai"
                />
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-center glass border border-border/50 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
          <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Our team is ready to provide tailored answers for your specific requirements.</p>
          <Link to="/contactus" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl shadow-soft hover:opacity-90 transition-opacity">
            Contact Support <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FAQsAccordion;
