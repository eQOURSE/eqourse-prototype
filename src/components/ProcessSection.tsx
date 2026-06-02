import { useState } from "react";
import {
  Handshake, ClipboardList, FileText, MessageCircle, CheckSquare, Truck, Star,
  Database, Eraser, Tag, ShieldCheck, PackageCheck, FlaskConical,
  GraduationCap, Bot, ArrowRight
} from "lucide-react";
import StrategyDiagram from "./StrategyDiagram";

/* ─── Step data for both workflows ─── */
const educationSteps = [
  { icon: Handshake, title: "Understand", desc: "We understand your requirement", number: "01" },
  { icon: ClipboardList, title: "Plan", desc: "We plan to create best quality in optimised time", number: "02" },
  { icon: FileText, title: "Develop", desc: "We develop content for you", number: "03" },
  { icon: MessageCircle, title: "Communicate", desc: "We maintain strong communication", number: "04" },
  { icon: CheckSquare, title: "Quality Check", desc: "We run multiple quality checks & modify accordingly", number: "05" },
  { icon: Truck, title: "Deliver", desc: "We deliver project on time", number: "06" },
  { icon: Star, title: "Feedback", desc: "We respect your feedback", number: "07" },
];

const aiSteps = [
  { icon: Database, title: "Collect", desc: "Custom data sourcing across 30+ languages and all major modalities.", number: "01" },
  { icon: Eraser, title: "Clean", desc: "Deduplication, noise removal, and PII detection.", number: "02" },
  { icon: Tag, title: "Annotate", desc: "Expert labeling by domain specialists across NLP, CV, Audio, and RLHF.", number: "03" },
  { icon: ShieldCheck, title: "Validate", desc: "Gold-standard QA with 98%+ accuracy guarantee.", number: "04" },
  { icon: PackageCheck, title: "Deliver", desc: "Version-controlled datasets in COCO, CoNLL, JSONL, Parquet, or custom.", number: "05" },
  { icon: FlaskConical, title: "Test", desc: "Real-world model testing via TuTrain. Failures feed back to Step 1.", number: "06" },
];

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<"education" | "ai">("education");

  const steps = activeTab === "education" ? educationSteps : aiSteps;

  return (
    <section className="py-16 sm:py-24 bg-muted/30 overflow-hidden" id="our-process">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Process</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            How We <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A structured, transparent workflow that ensures quality at every step - from initial requirement to final delivery.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card border border-border/50 shadow-sm">
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Content Service
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "ai"
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className="w-4 h-4" />
              AI Data Service
            </button>
          </div>
        </div>

        {/* Process content - both rendered for SEO, visibility toggled */}
        <div className="process-section-toggle">
          {/* Education Process */}
          <div
            className={`process-section-panel ${activeTab === "education" ? "process-section-panel--active" : ""}`}
            aria-hidden={activeTab !== "education"}
          >
            <StrategyDiagram />
          </div>

          {/* AI Process */}
          <div
            className={`process-section-panel ${activeTab === "ai" ? "process-section-panel--active" : ""}`}
            aria-hidden={activeTab !== "ai"}
          >
            <ProcessTimeline steps={aiSteps} loopLabel="Closed-Loop: Active learning delivers 20–40% faster model improvement" />
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/free-pilot"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-90 hover:scale-105 transition-all"
          >
            Start Free Pilot <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={activeTab === "ai" ? "/ai-data-services" : "/content-services"}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 transition-all"
          >
            {activeTab === "ai" ? "View AI Data Services" : "View Content Services"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─── Reusable Timeline Component ─── */
interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  number: string;
}

const ProcessTimeline = ({ steps, loopLabel }: { steps: Step[]; loopLabel: string }) => {
  return (
    <div>
      {/* Desktop: Horizontal timeline */}
      <div className="hidden lg:block relative">
        {/* Connecting line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className={`grid gap-0`} style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                <div className="flex flex-col items-center">
                  {/* Node */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(168_80%_36%/0.3)] transition-all duration-500">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/20 group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  </div>

                  <div className="text-center px-2">
                    <span className="text-xs font-bold text-primary/60 font-mono">Step {step.number}</span>
                    <h4 className="font-heading font-bold text-foreground mt-1 mb-2 text-base">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Vertical timeline */}
      <div className="lg:hidden">
        <div className="relative pl-[60px]">
          {/* Vertical line — centered under the icons */}
          <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative mb-8 last:mb-0">
                {/* Node on the line */}
                <div className="absolute -left-[50px] top-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-0.5">
                  <span className="text-xs font-bold text-primary/60 font-mono">Step {step.number}</span>
                  <h4 className="font-heading font-bold text-foreground text-base sm:text-lg mt-0.5">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loop footer */}
      <div className="mt-10 sm:mt-14 text-center">
        <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-foreground">
            <strong className="text-primary">
              {loopLabel.split(":")[0]}:
            </strong>
            {loopLabel.split(":").slice(1).join(":")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
