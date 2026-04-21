import { FileText, Target, Award, BrainCircuit, LineChart, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/ai-data-services/shared/SectionHeader";

const features = [
  { icon: FileText, title: "Curriculum Design", desc: "Detailed syllabus mapping matching exam blueprints." },
  { icon: Target, title: "Targeted Content", desc: "Custom difficulty scaling and tiered learning paths." },
  { icon: BrainCircuit, title: "Interactive Sessions", desc: "Digital modules that engage and measure retention." },
  { icon: LineChart, title: "Analytics Support", desc: "Assessment tagging allowing progress tracking." },
  { icon: Award, title: "Global Standards", desc: "Aligned rigorously with ETS, College Board, Cambridge, NTA." },
  { icon: ShieldCheck, title: "Expert Review", desc: "Triple-checked accuracy by top-percentile test takers." },
];

const ComprehensiveSolutions = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Our Approach"
          title="Comprehensive Exam Preparation"
          gradientText="Solutions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mt-12">
          <div ref={ref} className={`reveal-scale ${isVisible ? "visible" : ""}`}>
            <div className="relative rounded-3xl overflow-hidden glass p-8 border border-primary/20 shadow-elevated group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              
              <h3 className="font-heading text-2xl font-bold mb-6">Exams Covered globally</h3>
              <ul className="space-y-4">
                {[
                  "SAT (Undergraduate admissions, globally accepted)",
                  "GRE (Graduate school admissions)",
                  "GMAT (MBA / business school)",
                  "TOEFL (English proficiency for non-native speakers)",
                  "IELTS (English language testing)",
                  "IIT-JEE (Indian engineering entrance)",
                  "NEET (Indian medical entrance)",
                  "UPSC / PCS (Indian civil services)"
                ].map((exam, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    <span className="text-foreground/80 leading-relaxed font-medium">{exam}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`space-y-8 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our comprehensive exam preparation services cover the entire pedagogical stack: curriculum design, content creation, rigorous reviews, adaptive quizzes, and interactive learning sessions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{feat.title}</h4>
                      <p className="text-sm text-muted-foreground">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSolutions;
