import { BookOpen, MonitorPlay, FileText, Network, Database, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const ContactHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center py-20 lg:py-32">
      {/* Background with Split-tone gradient */}
      <div className="absolute inset-0 flex">
        {/* Left Half (EdTech - Teal) */}
        <div className="w-1/2 h-full bg-gradient-to-br from-[#00B4A6]/80 to-[#004D47]/90 relative overflow-hidden">
          {/* Subtle Education Icons */}
          <BookOpen className="absolute top-[20%] left-[15%] w-24 h-24 text-white/[0.03] -rotate-12 animate-float" />
          <MonitorPlay className="absolute bottom-[25%] left-[35%] w-32 h-32 text-white/[0.04] rotate-6 animate-float-delayed" />
          <FileText className="absolute top-[60%] left-[10%] w-20 h-20 text-white/[0.03] -rotate-6 animate-float-delayed-2" />
        </div>
        
        {/* Right Half (AI Data - Navy) */}
        <div className="w-1/2 h-full bg-gradient-to-bl from-[#0D1B2A]/90 to-[#1B9AAA]/80 relative overflow-hidden">
          {/* Subtle AI/Data Icons */}
          <Network className="absolute top-[30%] right-[15%] w-28 h-28 text-white/[0.04] rotate-12 animate-float" />
          <Database className="absolute bottom-[20%] right-[30%] w-24 h-24 text-white/[0.03] -rotate-12 animate-float-delayed" />
          <Cpu className="absolute top-[15%] right-[40%] w-20 h-20 text-white/[0.04] rotate-6 animate-float-delayed-2" />
        </div>

        {/* Center Blend Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#004D47]/40 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">CONTACT US</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-md">
            Get in Touch — Let's Build Something Great Together
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-sm font-medium">
            Whether you need custom e-learning content for your EdTech platform or production-grade AI training data for your ML models, our team is ready to help. Tell us about your project and we'll respond within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
