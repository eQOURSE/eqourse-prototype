import { useState } from "react";
import { FileText, Mic, Image, Video } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const modalities = [
  {
    id: "text",
    icon: FileText,
    title: "Text Data",
    items: [
      "Monolingual & multilingual corpora",
      "Domain-specific terminology datasets",
      "Conversational dialogue pairs",
      "Social media & user-generated content",
      "Document & form digitization",
      "Prompt-response pairs for LLM training",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="40" y={30 + i * 32} width={180 - i * 20} height="8" rx="4" fill="hsl(170 82% 45%)" opacity={0.3 - i * 0.04} />
            <rect x="40" y={42 + i * 32} width={140 - i * 15} height="6" rx="3" fill="hsl(170 82% 45%)" opacity={0.15 - i * 0.02} />
          </g>
        ))}
        <rect x="230" y="30" width="40" height="50" rx="6" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.1)" />
        <text x="250" y="60" textAnchor="middle" fill="hsl(170 82% 50%)" fontSize="18" fontWeight="bold">A</text>
      </svg>
    ),
  },
  {
    id: "audio",
    icon: Mic,
    title: "Audio Data",
    items: [
      "Speech recordings in 30+ languages",
      "Wake-word & command utterances",
      "Multi-speaker conversational audio",
      "Accent & dialect variations",
      "Background noise-augmented recordings",
      "Emotional & tonal speech samples",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Waveform */}
        <path
          d="M30 100 Q50 60 70 100 Q90 140 110 100 Q130 50 150 100 Q170 150 190 100 Q210 40 230 100 Q250 160 270 100"
          stroke="hsl(170 82% 50%)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M30 100 Q50 75 70 100 Q90 125 110 100 Q130 70 150 100 Q170 130 190 100 Q210 65 230 100 Q250 135 270 100"
          stroke="hsl(165 75% 71%)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        {/* Mic icon */}
        <circle cx="150" cy="160" r="15" fill="hsl(170 82% 32% / 0.15)" stroke="hsl(170 82% 45%)" strokeWidth="1.5" />
        <rect x="146" y="150" width="8" height="12" rx="4" fill="hsl(170 82% 50%)" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "image",
    icon: Image,
    title: "Image Data",
    items: [
      "Object detection training images",
      "Scene classification datasets",
      "Medical imaging (X-ray, MRI, CT scans)",
      "Satellite & aerial imagery",
      "Document & receipt scanning",
      "Synthetic image generation seeds",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Image frame with bounding boxes */}
        <rect x="50" y="30" width="200" height="140" rx="8" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.05)" />
        <rect x="70" y="50" width="60" height="50" rx="4" stroke="hsl(165 75% 71%)" strokeWidth="1.5" strokeDasharray="4 3" fill="hsl(170 82% 50% / 0.05)" />
        <rect x="160" y="70" width="70" height="80" rx="4" stroke="hsl(170 82% 50%)" strokeWidth="1.5" strokeDasharray="4 3" fill="hsl(170 82% 50% / 0.05)" />
        {/* Labels */}
        <rect x="70" y="42" width="35" height="12" rx="3" fill="hsl(170 82% 45%)" opacity="0.3" />
        <rect x="160" y="62" width="30" height="12" rx="3" fill="hsl(170 82% 45%)" opacity="0.3" />
        {/* Corner handles */}
        {[[70, 50], [130, 50], [70, 100], [130, 100]].map(([x, y], i) => (
          <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="hsl(165 75% 71%)" opacity="0.5" rx="1" />
        ))}
      </svg>
    ),
  },
  {
    id: "video",
    icon: Video,
    title: "Video Data",
    items: [
      "Action recognition clips",
      "Surveillance & security footage",
      "Driving scene recordings",
      "Gesture & sign language videos",
      "Product interaction recordings",
      "Multi-angle activity capture",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Video filmstrip */}
        <rect x="40" y="50" width="220" height="100" rx="6" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.05)" />
        {/* Film perforations */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={55 + i * 27} y="55" width="10" height="6" rx="1" fill="hsl(170 82% 45%)" opacity="0.15" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={`b${i}`} x={55 + i * 27} y="139" width="10" height="6" rx="1" fill="hsl(170 82% 45%)" opacity="0.15" />
        ))}
        {/* Play button */}
        <circle cx="150" cy="100" r="20" fill="hsl(170 82% 32% / 0.2)" stroke="hsl(170 82% 50%)" strokeWidth="1.5" />
        <polygon points="143,88 143,112 163,100" fill="hsl(170 82% 50%)" opacity="0.5" />
        {/* Timeline */}
        <rect x="60" y="160" width="180" height="4" rx="2" fill="hsl(170 82% 45%)" opacity="0.15" />
        <rect x="60" y="160" width="100" height="4" rx="2" fill="hsl(170 82% 50%)" opacity="0.35" />
        <circle cx="160" cy="162" r="6" fill="hsl(170 82% 50%)" opacity="0.5" />
      </svg>
    ),
  },
];

const DataModalities = () => {
  const [activeTab, setActiveTab] = useState("text");
  const { ref, isVisible } = useScrollReveal();
  const active = modalities.find((m) => m.id === activeTab)!;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Data Types"
          title="Multi-Modal Data"
          gradientText="Collection"
          subtitle="We collect and curate datasets across all major data modalities to fuel your AI models."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-xl p-1.5 gap-1 flex-wrap justify-center">
            {modalities.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === m.id
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {m.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center reveal-up ${isVisible ? "visible" : ""}`}>
          {/* Visual */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-border/50 bg-card/50 p-6">
              {active.visual}
            </div>
          </div>

          {/* List */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">{active.title}</h3>
            <ul className="space-y-4">
              {active.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-primary">
                      <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataModalities;
