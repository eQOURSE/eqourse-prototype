import { Database, Eraser, Tag, ShieldCheck, PackageCheck, FlaskConical } from "lucide-react";

const steps = [
  { icon: Database, number: "01", title: "Collect", desc: "Custom data sourcing across 30+ languages and all major modalities." },
  { icon: Eraser, number: "02", title: "Clean", desc: "Deduplication, noise removal, and PII detection." },
  { icon: Tag, number: "03", title: "Annotate", desc: "Expert labeling by domain specialists across NLP, CV, Audio, and RLHF." },
  { icon: ShieldCheck, number: "04", title: "Validate", desc: "Gold-standard QA with 98%+ accuracy guarantee." },
  { icon: PackageCheck, number: "05", title: "Deliver", desc: "Version-controlled datasets in COCO, CoNLL, JSONL, Parquet, or custom." },
  { icon: FlaskConical, number: "06", title: "Test", desc: "Real-world model testing via TuTrain. Failures feed back to Step 1." },
];

const HowItWorksSection = () => {
  return (
    <section id="pipeline" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Process</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our <span className="text-gradient">6-Step AI Data Pipeline</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From raw data to a deployment-ready model — all in one integrated workflow.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                {/* Timeline node */}
                <div className="flex flex-col items-center">
                  {/* Glowing dot on the line */}
                  <div className="relative z-10 mb-8">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(168_80%_36%/0.3)] transition-all duration-500">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/20 group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Content below */}
                  <div className="text-center px-3">
                    <span className="text-xs font-bold text-primary/60 font-mono">{step.number}</span>
                    <h4 className="font-heading font-bold text-foreground mt-1 mb-2 text-lg">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Arrow between steps (mobile: vertical, desktop hidden since we have the line) */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/30 to-primary/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Closed Loop Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              <strong className="text-primary">Closed-Loop:</strong> Active learning delivers 20–40% faster model improvement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
