import { ArrowRight } from "lucide-react";
import casestudyEdtech from "@/assets/casestudy-edtech.png";
import casestudyAi from "@/assets/casestudy-ai.png";
import casestudyTestprep from "@/assets/casestudy-testprep.png";

const caseStudies = [
  {
    id: 1,
    title: "Global Curriculum Localization",
    description: "How we localized K-12 STEM curriculum for 5+ international markets with 99% pedagogical accuracy.",
    image: casestudyEdtech,
    category: "EdTech",
    link: "#", // Placeholder for actual link
  },
  {
    id: 2,
    title: "Medical NLP Annotation at Scale",
    description: "Accelerating a healthcare AI startup's model training by 40% with high-accuracy clinical data labeling.",
    image: casestudyAi,
    category: "AI Data Services",
    link: "#",
  },
  {
    id: 3,
    title: "Next-Gen Test Prep Platform",
    description: "Developing comprehensive, multi-modal assessment content for a leading national competitive exams portal.",
    image: casestudyTestprep,
    category: "EdTech",
    link: "#",
  }
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore how we've helped leading EdTech platforms and AI teams overcome challenges and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-soft">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{study.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {study.description}
                </p>
                <a
                  href={study.link}
                  className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 gap-1.5 transition-all mt-auto group/link"
                >
                  Read Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 shadow-soft">
            View All Case Studies
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
