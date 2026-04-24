import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(0, 0%, 100%)' }}>
          Ready to Power Your AI with Better Data?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'hsl(0, 0%, 85%)' }}>
          Start with a free pilot dataset, or explore our education solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/free-pilot">
            <Button size="lg" className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all hover:scale-105 px-10">
              Start Free Pilot Dataset <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all px-8" style={{ color: 'hsl(0, 0%, 95%)' }}>
            <Phone className="mr-2 w-5 h-5" /> Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
