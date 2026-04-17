import { Mic, Eye, Landmark, HeartPulse, MessageSquare } from "lucide-react";

const industries = [
  {
    icon: Mic,
    title: "Voice & NLP AI",
    desc: "Multilingual speech datasets for ASR/TTS across 30+ languages.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Labeled images and video for retail, autonomous vehicles, and inspection.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Landmark,
    title: "FinTech AI",
    desc: "Financial document OCR, transaction classification, and handwritten text.",
    gradient: "from-primary to-accent",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    desc: "Medical image annotation, clinical NLP, and biomedical NER.",
    gradient: "from-accent to-primary",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    desc: "Intent classification, chatbot data, and RLHF for LLMs.",
    gradient: "from-primary to-accent",
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'hsl(170, 82%, 55%)' }}>Verticals</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2" style={{ color: 'hsl(0, 0%, 100%)' }}>
            Industries We <span className="text-gradient">Serve</span>
          </h2>
        </div>

        {/* Horizontal scrolling strip with large interactive panels */}
        <div className="flex flex-col gap-0">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              className="group relative border-b border-primary/10 last:border-b-0"
            >
              <div className="flex items-center gap-6 md:gap-10 py-6 md:py-8 px-4 md:px-8 hover:bg-primary/5 transition-all duration-500 cursor-default">
                {/* Number */}
                <span className="text-3xl md:text-5xl font-heading font-extrabold text-primary/10 group-hover:text-primary/30 transition-colors duration-500 min-w-[60px] md:min-w-[80px]">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${ind.gradient} flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(168_80%_36%/0.25)] transition-all duration-500`}>
                  <ind.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-lg md:text-xl mb-1 transition-colors duration-300" style={{ color: 'hsl(0, 0%, 95%)' }}>
                    {ind.title}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: 'hsl(242, 20%, 65%)' }}>
                    {ind.desc}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                  <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </div>

              {/* Glow line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
