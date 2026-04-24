import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, Send } from "lucide-react";

const ContactNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 reveal-up">
        <div className="max-w-5xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border shadow-elevated overflow-hidden relative">
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                <Mail className="w-4 h-4" /> Newsletter
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading" style={{ fontFamily: 'Arial, sans-serif', color: '#1A1A1A' }}>
                Stay Updated on EdTech & AI
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', color: '#666666' }}>
                eQOURSE Connect is a weekly newsletter for education and AI professionals covering EdTech trends, AI data best practices, instructional design insights, and industry news. Subscribe to stay ahead.
              </p>

              <form onSubmit={handleSubmit} className="pt-4 relative">
                {status === "success" ? (
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl animate-fade-in-up">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium">Thanks for subscribing! Check your inbox to confirm.</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address" 
                        className="w-full px-5 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-foreground h-[56px]"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-[56px] px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl whitespace-nowrap sm:w-[30%] shadow-md hover:shadow-lg transition-all"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Subscribe
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </div>

            {/* Right Image (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-2 relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-navy/20 rounded-2xl flex items-center justify-center border border-border/50 shadow-inner overflow-hidden">
                {/* Fallback image/icon if actual asset isn't available */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/50" />
                  <Mail className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary/30" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-navy/20 rounded-full blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-card rounded-xl shadow-lg border border-border flex flex-col p-4 rotate-12 hover:rotate-0 transition-transform duration-500">
                    <div className="w-8 h-2 bg-primary/20 rounded-full mb-3" />
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-muted rounded-full" />
                      <div className="w-5/6 h-1.5 bg-muted rounded-full" />
                      <div className="w-4/6 h-1.5 bg-muted rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactNewsletter;
