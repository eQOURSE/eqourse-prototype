import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const formats = [
  { name: "COCO JSON", desc: "Object detection, segmentation, keypoints", category: "CV" },
  { name: "Pascal VOC", desc: "XML-based bounding box annotations", category: "CV" },
  { name: "CoNLL", desc: "Token-level NER and POS tagging", category: "NLP" },
  { name: "JSONL", desc: "Line-delimited JSON for streaming", category: "Universal" },
  { name: "Parquet", desc: "Columnar format for big data pipelines", category: "Universal" },
  { name: "CSV / TSV", desc: "Simple tabular format for any use case", category: "Universal" },
  { name: "spaCy", desc: "Training data for spaCy NLP models", category: "NLP" },
  { name: "Custom Schema", desc: "Tailored to your model's exact needs", category: "Custom" },
];

const categoryColors: Record<string, string> = {
  CV: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  NLP: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Universal: "bg-primary/10 text-primary border-primary/20",
  Custom: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const OutputFormats = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Output Formats"
          title="Delivered in"
          gradientText="Your Format"
          subtitle="Production-ready datasets in industry-standard formats, or custom schemas tailored to your pipeline."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {formats.map((fmt, i) => (
            <div
              key={fmt.name}
              className={`group p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {fmt.name}
                </h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[fmt.category]}`}>
                  {fmt.category}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{fmt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutputFormats;
