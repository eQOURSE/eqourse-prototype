import { BookOpen, MonitorPlay, FileText, Network, Database, Cpu, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const FreePilotHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById("pilot-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden min-h-[70vh] flex items-center justify-center py-20 lg:py-32"
      aria-label="Free Pilot Program Hero"
    >
      {/* Background with Split-tone gradient — identical layout to ContactHero */}
      <div className="absolute inset-0 flex">
        {/* Left Half (EdTech - Teal) */}
        <div className="w-1/2 h-full bg-gradient-to-br from-[#00B4A6]/80 to-[#004D47]/90 relative overflow-hidden">
          <BookOpen className="absolute top-[20%] left-[15%] w-24 h-24 text-white/[0.03] -rotate-12 animate-float" />
          <MonitorPlay className="absolute bottom-[25%] left-[35%] w-32 h-32 text-white/[0.04] rotate-6 animate-float-delayed" />
          <FileText className="absolute top-[60%] left-[10%] w-20 h-20 text-white/[0.03] -rotate-6 animate-float-delayed-2" />
        </div>

        {/* Right Half (AI Data - Navy) */}
        <div className="w-1/2 h-full bg-gradient-to-bl from-[#0D1B2A]/90 to-[#1B9AAA]/80 relative overflow-hidden">
          <Network className="absolute top-[30%] right-[15%] w-28 h-28 text-white/[0.04] rotate-12 animate-float" />
          <Database className="absolute bottom-[20%] right-[30%] w-24 h-24 text-white/[0.03] -rotate-12 animate-float-delayed" />
          <Cpu className="absolute top-[15%] right-[40%] w-20 h-20 text-white/[0.04] rotate-6 animate-float-delayed-2" />
        </div>

        {/* Center Blend Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#004D47]/40 to-transparent pointer-events-none" />
      </div>

      {/* Floating Preview Cards — give 3D depth feel */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* EdTech Sample Card (left) */}
        <div
          className={`absolute left-[6%] top-1/2 -translate-y-1/2 w-52 transition-all duration-[1.4s] ease-out ${
            mounted ? "opacity-100 translate-x-0 rotate-[-6deg]" : "opacity-0 -translate-x-16 rotate-[-20deg]"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl transform perspective-800">
            <div className="h-3 w-20 bg-white/30 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/20 rounded" />
              <div className="h-2 w-3/4 bg-white/15 rounded" />
              <div className="h-2 w-5/6 bg-white/20 rounded" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#00B4A6]/40" />
              <div className="h-2 w-16 bg-white/20 rounded" />
            </div>
            <div className="mt-3 text-[10px] font-semibold text-white/60 tracking-wider uppercase">
              EdTech Sample
            </div>
          </div>
        </div>

        {/* AI Data Sample Card (right) */}
        <div
          className={`absolute right-[6%] top-1/2 -translate-y-1/2 w-52 transition-all duration-[1.4s] ease-out delay-200 ${
            mounted ? "opacity-100 translate-x-0 rotate-[6deg]" : "opacity-0 translate-x-16 rotate-[20deg]"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl transform perspective-800">
            {/* Annotated Image Preview */}
            <div className="h-20 w-full bg-white/10 rounded mb-3 relative overflow-hidden">
              <div className="absolute top-2 left-2 w-12 h-10 border-2 border-[#1B9AAA]/70 rounded" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-2 border-[#00B4A6]/70 rounded-full" />
              <div className="absolute top-4 right-6 w-10 h-6 border-2 border-yellow-400/50 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/20 rounded" />
              <div className="h-2 w-2/3 bg-white/15 rounded" />
            </div>
            <div className="mt-3 text-[10px] font-semibold text-white/60 tracking-wider uppercase">
              AI Data Sample
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div
          className={`transition-all duration-1000 transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">
              FREE PILOT PROGRAM
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-md">
            Experience the Quality of eQOURSE — Start Your Free Pilot
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-sm font-medium mb-10">
            See our work before you commit. Whether you need EdTech content or AI training data, we offer a complimentary pilot tailored to your exact requirements. No obligation, no payment, no risk.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B4A6] font-bold text-lg rounded-lg shadow-xl hover:bg-[#00B4A6] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            Start Your Free Pilot
            <ArrowDown className="w-5 h-5 animate-bounce group-hover:animate-none" />
          </button>
        </div>
      </div>

      {/* Animated Particle Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${8 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FreePilotHero;
