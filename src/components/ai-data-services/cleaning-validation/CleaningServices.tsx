import { Copy, Volume1, ShieldAlert, RefreshCw, FileSpreadsheet } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const services = [
  {
    icon: Copy,
    title: "Deduplication",
    description: "Exact and near-duplicate removal using fuzzy matching, MinHash, and semantic similarity. Ensures your model trains on unique, diverse data.",
    before: "10,000 records with 23% duplicates",
    after: "7,700 unique, deduplicated records",
  },
  {
    icon: Volume1,
    title: "Noise Removal",
    description: "Strip irrelevant content, fix encoding errors, normalize Unicode, remove boilerplate HTML/XML, and clean OCR artifacts.",
    before: "Raw text with HTML tags & encoding errors",
    after: "Clean, normalized, UTF-8 text corpus",
  },
  {
    icon: ShieldAlert,
    title: "PII Redaction",
    description: "Detect and redact personally identifiable information — names, emails, phone numbers, SSNs, addresses — with configurable replacement strategies.",
    before: "Text containing real names & emails",
    after: "PII replaced with [PERSON], [EMAIL] tokens",
  },
  {
    icon: RefreshCw,
    title: "Consistency Normalization",
    description: "Standardize date formats, units, casing, abbreviations, and terminology across your entire dataset for uniform model training.",
    before: "Mixed formats: 01/15/24, Jan 15, 2024-01-15",
    after: "Standardized: 2024-01-15 ISO format",
  },
  {
    icon: FileSpreadsheet,
    title: "Metadata Enrichment",
    description: "Add structured metadata — language codes, domain tags, confidence scores, source provenance, and data lineage tracking.",
    before: "Raw data without context or provenance",
    after: "Enriched with lang, domain, source, quality tags",
  },
];

const CleaningServices = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Services"
          title="Data Cleaning"
          gradientText="Capabilities"
          subtitle="Five specialized cleaning services that transform messy, raw data into production-ready training assets."
        />

        <div ref={ref} className="space-y-6 max-w-4xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group rounded-2xl border border-border/50 bg-card p-6 md:p-8 hover:border-primary/30 hover:shadow-card transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>

                    {/* Before / After */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-destructive/60 block mb-1">Before</span>
                        <p className="text-xs text-foreground/60 font-mono">{service.before}</p>
                      </div>
                      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block mb-1">After</span>
                        <p className="text-xs text-foreground/80 font-mono">{service.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CleaningServices;
