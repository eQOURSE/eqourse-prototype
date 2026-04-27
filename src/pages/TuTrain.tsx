import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Target, Globe, FileText, Database, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import brandHierarchyImg from "@/assets/tutrain-brand-hierarchy.png";
import "./TuTrain.css";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, className = "", delay = "" }: { children: React.ReactNode, className?: string, delay?: string }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
};

const TuTrain = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "eQOURSE",
    "url": "https://www.eqourse.com",
    "subOrganization": {
      "@type": "Organization",
      "name": "TUTRAIN",
      "url": "https://tutrain.com",
      "description": "Online 1-on-1 and small-batch tutoring for Grades 4–12 worldwide.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "eQOURSE"
      }
    }
  };

  const bridgeRef = useReveal();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Helmet>
        <title>TUTRAIN by eQOURSE │ Online 1-on-1 Tutoring for Grades 4–12 Worldwide</title>
        <meta name="description" content="TUTRAIN is eQOURSE's consumer online tutoring brand — personalized 1-on-1 and small-batch live classes for Grades 4–12 across CBSE, IB, IGCSE, A-Levels & US Common Core. Book a free demo." />
        <meta name="keywords" content="tutrain, online tutoring, 1-on-1 tutoring, personalized tutoring, eqourse tutoring brand, online tuition, live tutoring platform, tutrain by eqourse" />
        <meta property="og:title" content="TUTRAIN by eQOURSE — Personalized Online Tutoring Worldwide" />
        <meta property="og:description" content="The consumer online tutoring brand from eQOURSE. Live 1-on-1 and small-batch classes for students in Grades 4–12, across all major curricula." />
        <meta property="og:image" content="https://www.eqourse.com/images/tutrain-eqourse-og.jpg" />
        <link rel="canonical" href="https://www.eqourse.com/tutrain" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="tutrain-hero pt-24 min-h-[500px] flex flex-col md:flex-row relative">
        <div className="md:w-1/2 split-left flex items-center justify-center p-8 md:p-16 relative z-10">
          <div className="max-w-lg mx-auto md:ml-auto md:mr-12 text-center md:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                PART OF THE eQOURSE FAMILY
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 font-heading">
                TUTRAIN — Personalized Online Tutoring, <span className="text-gradient">Powered by eQOURSE</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                TUTRAIN is our direct-to-learner online tutoring brand, delivering live 1-on-1 and small-batch classes for students in Grades 4–12 across CBSE, IB, IGCSE, A-Levels, and US Common Core. Backed by eQOURSE's two decades of education expertise, TUTRAIN is where world-class teaching meets every individual learner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold group shadow-soft hover:shadow-lg transition-all rounded-xl">
                  <a href="https://tutrain.com" target="_blank" rel="noopener noreferrer">
                    Visit TUTRAIN.com <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 font-bold rounded-xl">
                  <a href="https://tutrain.com" target="_blank" rel="noopener noreferrer">
                    Book a Free Demo Class <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Center Connector */}
        <div className="brand-connector hidden md:flex">
          eQOURSE → TUTRAIN
        </div>

        <div className="md:w-1/2 split-right flex items-center justify-center p-8 relative overflow-hidden">
          {/* Abstract Teal Nodes */}
          <div className="absolute inset-0">
            <div className="hero-node"></div>
            <div className="hero-node"></div>
            <div className="hero-node"></div>
            <div className="hero-node"></div>
          </div>
          <div className="relative z-10 w-full max-w-md backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
             <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center border border-primary/20 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <GraduationCap className="w-8 h-8 text-primary" />
                   </div>
                   <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-primary" />
                   </div>
                </div>
             </div>
             <p className="text-center text-white/80 font-medium">Live 1-on-1 tutoring sessions powered by enterprise-grade curriculum design.</p>
          </div>
        </div>
      </section>

      {/* What is TUTRAIN? */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[60%]">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-foreground">
                  What is <span className="text-gradient">TUTRAIN</span>?
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    TUTRAIN is eQOURSE's flagship consumer online tutoring brand — a global platform connecting students in Grades 4 to 12 with verified expert tutors for live, personalized 1-on-1 and small-batch classes.
                  </p>
                  <p>
                    While eQOURSE delivers EdTech content and AI training data to companies and institutions, TUTRAIN takes that same depth of expertise directly to families. Every TUTRAIN tutor is curriculum-trained, background-verified, and supported by eQOURSE's instructional design team.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:w-[40%] flex justify-center">
              <Reveal delay="0.2s">
                <div className="bg-white rounded-3xl shadow-card border border-border/50 p-4 max-w-sm w-full transition-transform hover:-translate-y-2 duration-500">
                  <img 
                    src={brandHierarchyImg} 
                    alt="Brand hierarchy graphic showing eQOURSE as parent company and TUTRAIN as its consumer online tutoring brand." 
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Who TUTRAIN Serves */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16 text-foreground">
              Who <span className="text-gradient">TUTRAIN</span> Serves
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay="0.1s" className="h-full">
              <div className="tutrain-card h-full flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 tutrain-card-icon">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">Students, Grades 4–12</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Personalized live tutoring across Maths, Science, English, and skill subjects — paced to each learner.</p>
              </div>
            </Reveal>

            <Reveal delay="0.2s" className="h-full">
              <div className="tutrain-card h-full flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 tutrain-card-icon">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">All Major Curricula</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">CBSE, ICSE, IB, IGCSE, Cambridge A-Levels, US Common Core, and State Boards — fully covered.</p>
              </div>
            </Reveal>

            <Reveal delay="0.3s" className="h-full">
              <div className="tutrain-card h-full flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 tutrain-card-icon">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">Test Prep & Competitive</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">JEE Foundation, NEET, CUET, SAT, ACT, Digital SAT, and all board exam revision.</p>
              </div>
            </Reveal>

            <Reveal delay="0.4s" className="h-full">
              <div className="tutrain-card h-full flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 tutrain-card-icon">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">Learners in 10+ Countries</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">India, USA, UK, UAE, Singapore, Canada, Australia, New Zealand, South Africa, and beyond.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* A Two-Way Bridge */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-foreground">
                A Two-Way Bridge: <span className="text-gradient">Enterprise Expertise Meets Real-World Learners</span>
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                TUTRAIN is more than a sister brand. It's the live classroom that completes the eQOURSE ecosystem:
              </p>
            </div>
          </Reveal>

          <div className="relative max-w-5xl mx-auto bridge-container py-12" ref={bridgeRef}>
            {/* SVG Connecting Triangle for desktop */}
            <svg className="bridge-svg hidden md:block" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <path 
                d="M 166 200 L 500 350 L 833 200 Z" 
                fill="none" 
                stroke="hsl(170, 82%, 32%, 0.15)" 
                strokeWidth="2" 
                strokeDasharray="10"
              />
              <path 
                className="bridge-line"
                d="M 166 200 L 500 350 L 833 200 Z" 
                fill="none" 
                stroke="hsl(170, 82%, 32%)" 
                strokeWidth="2" 
              />
              <circle cx="500" cy="350" r="8" fill="hsl(170, 82%, 32%)" />
              <text x="500" y="380" textAnchor="middle" fill="#1B3D36" fontSize="14" fontWeight="bold" letterSpacing="1">TUTRAIN</text>
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <Reveal delay="0.1s">
                <div className="bg-white/80 backdrop-blur-md border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-elevated transition-shadow text-center md:min-h-[280px] flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4 text-foreground">For Our EdTech Partners</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    TUTRAIN gives us continuous, ground-level insight into how real students learn, what works in live sessions, and which content formats drive measurable outcomes. This insight feeds directly into the curriculum and content we build for global <Link to="/edtech-solutions" className="text-primary hover:underline font-medium">EdTech platforms</Link>.
                  </p>
                </div>
              </Reveal>

              <Reveal delay="0.2s" className="md:mt-32">
                <div className="bg-white/80 backdrop-blur-md border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-elevated transition-shadow text-center md:min-h-[280px] flex flex-col items-center border-t-4 border-t-primary relative">
                   <div className="absolute -top-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">The Core</div>
                  <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4 text-foreground">For Families</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    TUTRAIN delivers the same calibre of expertise that powers eQOURSE's enterprise work, directly into your child's study room. We bring institutional quality to personal learning.
                  </p>
                </div>
              </Reveal>

              <Reveal delay="0.3s">
                <div className="bg-white/80 backdrop-blur-md border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-elevated transition-shadow text-center md:min-h-[280px] flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-6">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4 text-foreground">For Our AI Clients</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    TUTRAIN is the proprietary platform that powers our <Link to="/ai-data-services/model-testing" className="text-primary hover:underline font-medium">real-world AI model testing</Link>. Through a network of demographically diverse learners across 30+ languages, we test AI models with genuine users before deployment — the closed-loop advantage.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-[#1B3D36] py-20 relative overflow-hidden text-center">
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="cta-dot"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
              Looking for a Tutor for Your Child?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              TUTRAIN's live online tutors are ready. Book a free demo class — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl h-14 px-8 shadow-[0_0_20px_rgba(0,180,166,0.3)] hover:shadow-[0_0_30px_rgba(0,180,166,0.5)] transition-all">
                <a href="https://tutrain.com" target="_blank" rel="noopener noreferrer">
                  Visit TUTRAIN.com <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-bold rounded-xl h-14 px-8 bg-transparent">
                <a href="https://tutrain.com" target="_blank" rel="noopener noreferrer">
                  Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TuTrain;
