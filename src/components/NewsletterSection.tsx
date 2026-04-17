import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: 'hsl(0, 0%, 100%)' }}>
          Stay Ahead in EdTech & AI
        </h2>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(170, 82%, 55%)' }}>
          Subscribe to The eQOURSE Connect
        </h3>
        <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: 'hsl(242, 20%, 70%)' }}>
          Weekly insights on education technology and AI training data trends.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-card/10 border-primary/30 text-primary-foreground placeholder:text-muted-foreground/50 flex-1"
          />
          <Button className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all">
            Subscribe <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
