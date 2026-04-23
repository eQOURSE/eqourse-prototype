import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutNewsletter = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-1 md:p-2 shadow-2xl">
          <div className="bg-card rounded-[1.3rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8 border border-border/10">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                More on EdTech & AI?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mb-0 mx-auto md:mx-0">
                <span className="font-semibold text-primary">eQOURSE Connect</span> is a weekly newsletter for education and AI professionals that covers the latest developments in EdTech, AI data services, instructional design, data annotation best practices, and industry trends. Subscribe to stay ahead.
              </p>
            </div>
            
            <div className="w-full md:w-[320px]">
              <form className="flex flex-col gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  required
                />
                <Button type="submit" size="lg" className="w-full bg-gradient-primary border-0 text-white shadow-soft hover:opacity-90 transition-opacity rounded-xl">
                  Subscribe Now
                </Button>
                <div className="text-xs text-muted-foreground text-center mt-2">
                  No spam. Unsubscribe anytime.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNewsletter;
