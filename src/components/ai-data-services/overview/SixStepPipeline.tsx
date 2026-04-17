import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Scope & Define",
    description: "We define data requirements, annotation guidelines, and quality benchmarks tailored to your model.",
  },
  {
    number: "02",
    title: "Collect & Source",
    description: "Multi-channel data acquisition across text, audio, image, and video in 30+ languages.",
  },
  {
    number: "03",
    title: "Annotate & Label",
    description: "Expert annotators apply NLP, CV, audio, and RLHF labels with IAA >= 0.80 quality standards.",
  },
  {
    number: "04",
    title: "Clean & Validate",
    description: "Automated + human QA pipeline: deduplication, PII redaction, consistency checks, 98%+ accuracy.",
  },
  {
    number: "05",
    title: "Deliver & Integrate",
    description: "Production-ready datasets in COCO, CoNLL, JSONL, Parquet, or custom formats via API or cloud delivery.",
  },
  {
    number: "06",
    title: "Test & Iterate",
    description: "Closed-loop model testing with real users, feedback integration, and continuous dataset refinement.",
  },
];

const SixStepPipeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/6 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="How It Works"
          title="Our 6-Step"
          gradientText="Data Pipeline"
          subtitle="A proven methodology that transforms raw data into production-grade AI training assets."
          light
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`group relative rounded-2xl p-6 glass-dark hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-heading font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>

              {/* Connecting indicator */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6">
                  {(i + 1) % 3 !== 0 && (
                    <svg viewBox="0 0 24 24" fill="none" className="text-primary/30">
                      <path d="M5 12h14M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Closed loop indicator */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full glass-dark">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary animate-rotate-loop" style={{ animationDuration: "8s" }}>
              <path d="M21 12a9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 3v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-white/70 font-medium">Continuous improvement through closed-loop feedback</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixStepPipeline;
