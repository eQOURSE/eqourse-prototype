import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

type ServiceType = "EdTech Solutions" | "AI Data Services";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  type: ServiceType;
  results?: string;
  industryTag?: string;
}

const testimonials: Testimonial[] = [
  // EdTech Testimonials (From previous state)
  {
    quote: "I worked with the eQOURSE team for a content project related to the CUET exam. They delivered very high-quality content with a great focus on students learning.",
    name: "Viraj Panwar",
    role: "Content Manager",
    company: "ExamFactor (ABP Learning)",
    type: "EdTech Solutions"
  },
  {
    quote: "eQOURSE has been a game-changer for our content creation needs. Their team brings creativity, precision, and deep expertise to the table, consistently delivering high-quality content.",
    name: "Mira Sood",
    role: "Managing Director",
    company: "ContentWize",
    type: "EdTech Solutions"
  },
  {
    quote: "It has always been a pleasure to collaborate with eQOURSE. The company consistently delivers services that excel in comfort, clarity, and reliability.",
    name: "Khyati Srinivas",
    role: "Head Program Designer",
    company: "eVidyaloka Trust",
    type: "EdTech Solutions"
  },
  {
    quote: "eQOURSE is a one-stop shop for all your solution needs. The breadth and variety of solutions provided are unique and extensive. The benefit is to have everything done under one roof.",
    name: "Shakti Jhala",
    role: "Curriculum Head",
    company: "SPI",
    type: "EdTech Solutions"
  },
  {
    quote: "eQOURSE offers guaranteed quality and quantity. Our content quality has improved post working with eQOURSE. Will definitely recommend it to others because the output is trustworthy.",
    name: "Kola Xu",
    role: "Product Manager",
    company: "Data-Driven Interactive Technology",
    type: "EdTech Solutions"
  },
  {
    quote: "The ability of eQOURSE to scale operations while retaining high accuracy in K-12 math solutions is unmatched. Their subject matter experts are truly top-tier.",
    name: "Product Head",
    role: "Leadership",
    company: "Online Learning Platform",
    type: "EdTech Solutions"
  },
  {
    quote: "Their localization services transformed our video content reach. Over 30 languages seamlessly translated without losing the academic rigor of the materials.",
    name: "Operations Director",
    role: "Leadership",
    company: "Global EdTech Company",
    type: "EdTech Solutions"
  },

  // AI Data Services Testimonials
  {
    quote: "eQOURSE delivered 50,000+ hours of multilingual speech data across 12 Indian languages for our ASR engine. The annotation quality was exceptional — their inter-annotator agreement consistently exceeded 0.82. What really set them apart was the TuTrain platform: they tested our retrained model on real users across 8 dialect groups and identified failure modes our internal QA had completely missed. We achieved a 34% WER reduction in two cycles. No other data vendor offers this kind of closed-loop pipeline.",
    name: "VP of Data",
    role: "Leadership",
    company: "Series B Voice AI Startup",
    results: "50,000+ hours of speech data. 12 languages. IAA ≥ 0.82. 34% WER reduction via active learning loop.",
    industryTag: "Voice AI / ASR",
    type: "AI Data Services"
  },
  {
    quote: "We needed pixel-level annotation on 25,000 chest X-rays with radiology-trained annotators. eQOURSE assembled a team of 15 medical annotators supervised by 3 consulting radiologists. The annotation accuracy exceeded our FDA submission thresholds — 94.7% sensitivity and 96.1% specificity. Their HIPAA-aware PII redaction and audit trails gave us the compliance documentation we needed. The South Asian pathology variants in their dataset were a critical competitive advantage for our India market expansion.",
    name: "CTO",
    role: "Leadership",
    company: "Healthcare AI Startup",
    results: "25,000 X-rays annotated. 94.7% sensitivity / 96.1% specificity. FDA threshold exceeded.",
    industryTag: "Healthcare AI / Medical Imaging",
    type: "AI Data Services"
  },
  {
    quote: "eQOURSE provided RLHF annotation for our multilingual LLM across 6 languages. Their 200+ annotators were rigorously trained on our content policy, and the quality of preference ranking and safety labeling was far superior to what we’d received from crowdsourcing platforms. After fine-tuning with their data, our model’s human preference scores improved 28% on Indic language responses, and safety violations dropped from 4.2% to 0.6%. They enabled our successful product launch in India.",
    name: "Head of Data",
    role: "Leadership",
    company: "Global AI Research Lab",
    results: "6 languages. 28% preference score improvement. Safety violations: 4.2% → 0.6%.",
    industryTag: "Large Language Models / Generative AI",
    type: "AI Data Services"
  },
  {
    quote: "We chose eQOURSE for our FinTech chatbot training data because they understood both the language complexity (Hindi, Hinglish, Tamil, Telugu, English) and the domain complexity (banking queries, loan processing, fraud reporting). They collected 150,000 realistic utterances, annotated 85 intent categories and financial entities, then tested our retrained NLU on real users through TuTrain. Our intent misclassification dropped from 22% to 4.8%, and agent escalation fell 40%. That’s real ROI.",
    name: "Director of AI",
    role: "Leadership",
    company: "FinTech Company",
    results: "150,000 utterances. 85 intents. Intent error: 22% → 4.8%. 40% less agent escalation.",
    industryTag: "FinTech / Conversational AI",
    type: "AI Data Services"
  }
];

const FilterButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      active 
        ? "bg-primary text-primary-foreground shadow-soft" 
        : "bg-secondary text-foreground/70 hover:bg-primary/10 hover:text-primary"
    }`}
  >
    {label}
  </button>
);

const TestimonialCard = ({ data, index }: { data: Testimonial; index: number }) => {
  const isEdTech = data.type === "EdTech Solutions";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-8 border-l-[6px] shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group ${
        isEdTech ? "border-l-teal-500 border-border/50" : "border-l-indigo-600 border-border/50"
      }`}
    >
      {/* Decorative quotes */}
      <Quote className={`absolute top-6 right-6 w-16 h-16 opacity-10 transition-transform duration-500 group-hover:scale-110 ${
        isEdTech ? "text-teal-500" : "text-indigo-600"
      }`} />

      <div className="mb-6 relative z-10">
        <p className="text-foreground/90 leading-relaxed text-[15px] italic">
          "{data.quote}"
        </p>
      </div>

      {data.results && (
        <div className="mb-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Results Impact</div>
          <p className="text-sm font-medium text-foreground/80">{data.results}</p>
        </div>
      )}

      <div className="flex items-center gap-4 mt-auto border-t border-border/50 pt-4 relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
          ${isEdTech ? "bg-gradient-to-br from-teal-400 to-teal-600" : "bg-gradient-to-br from-indigo-500 to-purple-600"}
        `}>
          {data.name[0]}
        </div>
        <div>
          <div className="font-heading font-bold text-foreground leading-tight">{data.name}</div>
          <div className="text-sm text-muted-foreground">{data.role}, {data.company}</div>
          {data.industryTag && (
            <div className="mt-1 text-xs font-semibold text-indigo-500 bg-indigo-500/10 inline-block px-2 py-0.5 rounded-full">
              {data.industryTag}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsGrid = () => {
  const [filter, setFilter] = useState<"All" | ServiceType>("All");

  const filteredTestimonials = testimonials.filter(t => filter === "All" || t.type === filter);

  return (
    <section className="py-20 bg-background relative z-10 -mt-16">
      <div className="container mx-auto px-4">
        
        {/* Filter System */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-20">
          <FilterButton active={filter === "All"} label="All Reviews" onClick={() => setFilter("All")} />
          <FilterButton active={filter === "EdTech Solutions"} label="EdTech Solutions" onClick={() => setFilter("EdTech Solutions")} />
          <FilterButton active={filter === "AI Data Services"} label="AI Data Services" onClick={() => setFilter("AI Data Services")} />
        </div>

        {/* Masonry-style Grid using columns for CSS, or standard grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.name}-${idx}`} data={testimonial} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsGrid;
