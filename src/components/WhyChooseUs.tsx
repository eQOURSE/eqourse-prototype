import { Handshake, Users, Globe, RefreshCw, Shield, Target, TrendingUp } from "lucide-react";
import strategyImage from "@/assets/strategy-image.jpg";

const reasons = [
  { icon: Handshake, title: "Dual-Capability Partner", desc: "Education content + AI training data from one team." },
  { icon: Users, title: "500+ Domain Specialists", desc: "STEM-educated across science, medicine, engineering, law." },
  { icon: Globe, title: "30+ Languages", desc: "South Asian, Southeast Asian, European, African language families." },
  { icon: RefreshCw, title: "Only Closed-Loop AI Pipeline", desc: "Annotate + test on real users + feedback loop. 20–40% faster." },
  { icon: Shield, title: "ISO 9001 & 27001 Certified", desc: "GDPR-ready. Full data lineage. SOC 2 in progress." },
  { icon: Target, title: "98%+ Accuracy Guarantee", desc: "Gold-standard honeypots, IAA ≥ 0.80, multi-tier QA." },
  { icon: TrendingUp, title: "Scalable", desc: "Free pilot to enterprise-scale. Project or subscription pricing." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Why eQOURSE</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Why Choose <span className="text-gradient">eQOURSE?</span>
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={strategyImage} alt="Our Strategy" width={800} height={600} loading="lazy" className="w-full object-cover" />
            </div>
          </div>

          <div className="space-y-4 lg:pt-16">
            {reasons.map((reason) => (
              <div key={reason.title} className="group flex gap-4 p-4 rounded-xl hover:bg-card cursor-default neon-card">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                  <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">{reason.title}</h4>
                  <p className="text-sm text-muted-foreground">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
