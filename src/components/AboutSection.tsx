import { ArrowRight, Shield, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={aboutImage} alt="About eQOURSE" width={800} height={600} loading="lazy" className="w-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-2xl opacity-20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
            {/* Certification badges */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-elevated hidden md:flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <div className="text-xs font-bold text-foreground">ISO Certified</div>
                <div className="text-[10px] text-muted-foreground">9001 & 27001</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Who Are We?</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Powering Education & AI — <span className="text-gradient">From Quality Content to Quality Data</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              eQOURSE is a unique dual-capability company serving two of the world's fastest-growing sectors: education and artificial intelligence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For <strong className="text-foreground">EdTech platforms, schools, and publishers</strong>, we create high-quality K-12 and higher education curriculum, test preparation materials, instructional content, and fully localised learning experiences, available across all 22 Scheduled Languages of India and many international languages.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For <strong className="text-foreground">AI and ML teams</strong>, we deliver production-grade AI training data services, including custom dataset collection, expert annotation & labeling, data cleaning & validation, and real-world model testing, supporting 30+ languages and every major data modality (text, audio, image, and video).
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" /> Singapore & India
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" /> 500+ Specialists
              </div>
            </div>
            <Button className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all group">
              Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
