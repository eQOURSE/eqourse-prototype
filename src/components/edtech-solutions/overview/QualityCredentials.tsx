import { Shield, BookCheck, ClipboardCheck, GraduationCap, CheckCircle, Lock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const credentials = [
  { icon: Shield, title: "ISO 9001:2015", desc: "Quality Management System certified operations." },
  { icon: BookCheck, title: "Curriculum Alignment", desc: "Expertise in CBSE, ICSE, IB, State Board, Common Core & international frameworks." },
  { icon: ClipboardCheck, title: "Multi-Tier QA", desc: "Rigorous SME review + editorial QC + instructional design audits." },
  { icon: GraduationCap, title: "200+ Trained Experts", desc: "Professionals with deep subject-specific domain expertise." },
  { icon: CheckCircle, title: "Tested Processes", desc: "Scalable workflows proven across 200+ successful client engagements." },
  { icon: Lock, title: "Data Security", desc: "Strict data privacy frameworks and NDA-protected content workflows." },
];

const QualityCredentials = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Our Quality & Compliance <span className="text-gradient">Credentials</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">We adhere to the highest international standards for quality and security.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <div 
                key={cred.title}
                className={`glass-dark rounded-xl p-6 flex items-start gap-4 reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{cred.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{cred.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualityCredentials;
