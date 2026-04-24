import { BookOpen, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceVerticalsCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
      {/* EdTech Solutions Card */}
      <div className="group relative rounded-2xl bg-card p-8 border border-border shadow-card hover:shadow-elevated transition-all duration-500 reveal-up transform-style-3d hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
        
        <div className="relative z-10 flex flex-col h-full translate-z-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
            <BookOpen className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
          </div>
          
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">EdTech Solutions</h3>
          
          <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
            Custom K-12 content, curriculum development, exam preparation, video learning, localization in 30+ languages, LMS builds, and subject matter expert services. Trusted by 200+ education companies worldwide.
          </p>
          
          <Link to="/edtech-solutions" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link">
            Explore EdTech Services
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* AI Data Services Card */}
      <div className="group relative rounded-2xl bg-card p-8 border border-border shadow-card hover:shadow-elevated transition-all duration-500 reveal-up transform-style-3d hover:-translate-y-2" style={{ transitionDelay: '150ms' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-1 h-full bg-navy rounded-l-2xl origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
        
        <div className="relative z-10 flex flex-col h-full translate-z-6">
          <div className="w-16 h-16 rounded-2xl bg-navy/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-navy transition-all duration-500">
            <Database className="w-8 h-8 text-navy group-hover:text-navy-foreground transition-colors duration-500" />
          </div>
          
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">AI Data Services</h3>
          
          <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
            Production-grade AI training data collection, NLP annotation, Computer Vision labeling, Audio/Speech datasets, RLHF for LLMs, and real-world model testing services.
          </p>
          
          <Link to="/ai-data-services" className="inline-flex items-center text-navy font-semibold hover:text-navy/80 transition-colors group/link">
            Explore AI Data Services
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceVerticalsCards;
