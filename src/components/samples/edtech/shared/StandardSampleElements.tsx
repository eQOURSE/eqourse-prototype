import { useEffect, useRef, useState } from "react";
import {
  Users, Award, Globe, Clock, ShieldCheck, Sparkles, Target,
  Zap, Heart, Mail, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: 1000, suffix: "+", label: "Samples Delivered", Icon: Award },
  { value: 200, suffix: "+", label: "Clients Worldwide", Icon: Users },
  { value: 15, suffix: "+", label: "Languages", Icon: Globe },
  { value: 24, suffix: "/7", label: "Support", Icon: Clock },
];

const whyPoints = [
  { title: "Expert Content Writers", desc: "Subject-matter experts craft every sample for accuracy and pedagogy.", Icon: Target },
  { title: "Customized Solutions", desc: "Samples tailored to your curriculum, grade level, and localization needs.", Icon: Sparkles },
  { title: "Quality Assurance", desc: "Multi-tier editorial review ensures every deliverable meets the bar.", Icon: ShieldCheck },
  { title: "Scalable Production", desc: "Capacity for single modules or full curriculum rollouts.", Icon: Zap },
  { title: "On-Time Delivery", desc: "Milestone-based schedules with transparent progress tracking.", Icon: Clock },
  { title: "Multilingual Reach", desc: "Content available in 15+ languages with localized cultural context.", Icon: Globe },
  { title: "Client-First Support", desc: "Dedicated project managers from kickoff to delivery.", Icon: Heart },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setCount(Math.floor(p * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StandardSampleElements = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* Trusted / Stats combo */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-muted/40 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(170 82% 40%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <Award className="w-3.5 h-3.5" />
              Trusted by 200+ EdTech Clients
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              We Believe in Counting Numbers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Years of delivery, thousands of samples, and a network of subject-matter experts —
              numbers that back every promise we make.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map(({ value, suffix, label, Icon }, i) => (
              <div
                key={label}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-elevated"
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">
                    <Counter value={value} suffix={suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Why eQOURSE
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Choose <span className="text-gradient">eQOURSE?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Seven reasons why EdTech leaders trust us with their most important content.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {whyPoints.map(({ title, desc, Icon }, i) => (
              <div
                key={title}
                className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-elevated transition-all hover:-translate-y-0.5"
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.05}s both` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 md:py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white/90 mb-4">
              <Mail className="w-3.5 h-3.5" />
              Stay Updated
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              Subscribe for Sample Updates & Insights
            </h2>
            <p className="text-white/70 mb-6">
              Monthly EdTech insights, new sample drops, and behind-the-scenes content production tips.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary focus:bg-white/15 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="lg"
                disabled={subscribed}
                className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 px-6"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-1" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section id="consultation" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-14 shadow-elevated border border-white/10">
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Free Consultation
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Build Content That{" "}
                <span className="text-gradient">Converts Learners?</span>
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-7 max-w-2xl mx-auto">
                Share your goals with us. Our content strategists will walk you through samples,
                timelines, and a custom plan — completely free.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contactus">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-soft px-8"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/samples">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                  >
                    Browse All Samples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StandardSampleElements;
