import { BookOpen, Database, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FreePilotTracks = () => {
  const scrollToForm = () => {
    document.getElementById('pilot-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
      {/* EdTech Track Card */}
      <div className="bg-card rounded-2xl p-8 border border-border border-l-4 border-l-primary shadow-card relative overflow-hidden reveal-up">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">EdTech Content Pilot</h3>
          
          <div className="space-y-4 mb-8">
            <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">What You Get:</p>
            <ul className="space-y-3">
              {[
                "A sample content piece tailored to your curriculum, subject, and grade level",
                "Options: lesson plan, workbook section, assessment paper, video script, or exam prep module",
                "Aligned to your board (CBSE, ICSE, IB, State Board, Common Core, or custom)",
                "Available in any of 30+ supported languages",
                "Delivered within 5–7 business days"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button onClick={scrollToForm} className="w-full bg-primary hover:bg-primary/90 group transition-all">
            Request EdTech Pilot
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* AI Data Track Card */}
      <div className="bg-card rounded-2xl p-8 border border-border border-l-4 border-l-navy shadow-card relative overflow-hidden reveal-up" style={{ transitionDelay: '150ms' }}>
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Database className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mb-6">
            <Database className="w-6 h-6 text-navy" />
          </div>
          
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">AI Data Services Pilot</h3>
          
          <div className="space-y-4 mb-8">
            <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">What You Get:</p>
            <ul className="space-y-3">
              {[
                "A sample annotated dataset tailored to your AI use case, modality, and language",
                "Options: NLP annotation, Computer Vision, Audio, RLHF, or a collection sample",
                "50–500 data units depending on modality and complexity",
                "Delivered in your preferred format (COCO JSON, CoNLL, JSONL, Parquet, or custom)",
                "Quality report included: IAA score, honeypot results, annotator metrics",
                "Delivered within 5–10 business days"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-navy shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button onClick={scrollToForm} className="w-full bg-navy hover:bg-navy/90 text-navy-foreground group transition-all">
            Request AI Data Pilot
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreePilotTracks;
