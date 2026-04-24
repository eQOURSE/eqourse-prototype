import { BookOpen, Database, ArrowRight, CheckCircle2, GraduationCap, BrainCircuit } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FreePilotChooseTracks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToFormWithSelection = (pilotType: string) => {
    const formEl = document.getElementById("pilot-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
      // Try to pre-select the pilot type radio
      setTimeout(() => {
        const radios = document.querySelectorAll<HTMLInputElement>('input[name="pilotType"]');
        radios.forEach((radio) => {
          if (radio.value === pilotType) {
            radio.click();
          }
        });
      }, 800);
    }
  };

  const edtechFeatures = [
    "A sample lesson plan, workbook section, assessment paper, video script, curriculum outline, or exam prep module",
    "Aligned to your board: CBSE, ICSE, IB, State Board, Common Core, Cambridge, or custom",
    "Available in any of 30+ supported languages",
    "Produced by qualified subject matter experts with curriculum domain expertise",
    "Includes editorial QC and instructional design review",
  ];

  const aiDataFeatures = [
    "A sample annotated dataset: NLP (NER, sentiment, intent), Computer Vision (bounding box, segmentation), Audio (transcription, diarisation), or RLHF",
    "50–500 data units depending on modality and complexity",
    "Delivered in your preferred format: COCO JSON, CoNLL, JSONL, Parquet, CSV, or custom schema",
    "Quality report included: Inter-Annotator Agreement score, honeypot validation results",
    "Produced by trained domain-specialist annotators (not crowdworkers)",
  ];

  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden" ref={ref}>
      {/* Floating decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-[#1B9AAA]/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Two Verticals, One Platform</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Choose Your <span className="text-gradient">Pilot Track</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Select the track that matches your needs. You can also request both.
          </p>
        </div>

        {/* Track Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Track A: EdTech */}
          <div
            className={`group relative bg-white rounded-3xl overflow-hidden border-l-[5px] border-l-primary shadow-lg transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            } hover:shadow-[0_20px_60px_-15px_rgba(0,180,166,0.25)] hover:-translate-y-2`}
            onMouseEnter={() => setHoveredTrack("edtech")}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            {/* Card Top Accent */}
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />

            {/* Background Icon */}
            <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none">
              <GraduationCap className="w-48 h-48" />
            </div>

            <div className="p-8 md:p-10 relative z-10">
              {/* Icon + Heading */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-500 ${
                    hoveredTrack === "edtech" ? "bg-primary shadow-[0_0_20px_rgba(0,180,166,0.3)] scale-110" : ""
                  }`}
                >
                  <BookOpen
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredTrack === "edtech" ? "text-white" : "text-primary"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">EdTech Content Pilot</h3>
                  <p className="text-muted-foreground text-sm mt-0.5">Custom educational content sample</p>
                </div>
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                Request a complimentary content sample tailored to your curriculum, subject, and audience:
              </p>

              {/* What You Get */}
              <div className="mb-8">
                <p className="font-semibold text-xs uppercase tracking-wider text-primary mb-4">What You Get:</p>
                <ul className="space-y-3">
                  {edtechFeatures.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${400 + i * 100}ms` }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline + Cost */}
              <div className="flex items-center gap-6 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Delivery</p>
                  <p className="font-bold text-foreground">5–7 business days</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Cost</p>
                  <p className="font-bold text-primary">100% Free</p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToFormWithSelection("EdTech Content Pilot")}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl shadow-soft hover:shadow-card transition-all duration-300 group/btn flex items-center justify-center gap-2"
              >
                Request EdTech Pilot
                <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Track B: AI Data */}
          <div
            className={`group relative bg-white rounded-3xl overflow-hidden border-l-[5px] border-l-[#1B9AAA] shadow-lg transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            } hover:shadow-[0_20px_60px_-15px_rgba(27,154,170,0.25)] hover:-translate-y-2`}
            onMouseEnter={() => setHoveredTrack("ai")}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            {/* Card Top Accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#1B9AAA] to-[#1B9AAA]/40" />

            {/* Background Icon */}
            <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none">
              <BrainCircuit className="w-48 h-48" />
            </div>

            <div className="p-8 md:p-10 relative z-10">
              {/* Icon + Heading */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-[#1B9AAA]/10 flex items-center justify-center transition-all duration-500 ${
                    hoveredTrack === "ai" ? "bg-[#1B9AAA] shadow-[0_0_20px_rgba(27,154,170,0.3)] scale-110" : ""
                  }`}
                >
                  <Database
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredTrack === "ai" ? "text-white" : "text-[#1B9AAA]"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">AI Data Services Pilot</h3>
                  <p className="text-muted-foreground text-sm mt-0.5">Custom annotated dataset sample</p>
                </div>
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                Request a complimentary annotated dataset or data collection sample tailored to your AI use case:
              </p>

              {/* What You Get */}
              <div className="mb-8">
                <p className="font-semibold text-xs uppercase tracking-wider text-[#1B9AAA] mb-4">What You Get:</p>
                <ul className="space-y-3">
                  {aiDataFeatures.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${550 + i * 100}ms` }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#1B9AAA] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline + Cost */}
              <div className="flex items-center gap-6 mb-8 p-4 bg-[#1B9AAA]/5 rounded-xl border border-[#1B9AAA]/10">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Delivery</p>
                  <p className="font-bold text-foreground">5–10 business days</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Cost</p>
                  <p className="font-bold text-[#1B9AAA]">100% Free</p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToFormWithSelection("AI Data Services Pilot")}
                className="w-full py-4 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white font-bold text-base rounded-xl shadow-soft hover:shadow-card transition-all duration-300 group/btn flex items-center justify-center gap-2"
              >
                Request AI Data Pilot
                <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreePilotChooseTracks;
