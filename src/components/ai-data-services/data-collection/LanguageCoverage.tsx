import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const languageGroups = [
  {
    group: "Indo-Aryan",
    languages: ["Hindi", "Bengali", "Marathi", "Gujarati", "Punjabi", "Urdu", "Odia", "Assamese", "Rajasthani", "Bhojpuri"],
  },
  {
    group: "Dravidian",
    languages: ["Tamil", "Telugu", "Kannada", "Malayalam"],
  },
  {
    group: "Southeast Asian",
    languages: ["Thai", "Vietnamese", "Bahasa Indonesia", "Bahasa Malay", "Tagalog", "Khmer"],
  },
  {
    group: "European",
    languages: ["English", "French", "German", "Spanish", "Portuguese", "Italian", "Dutch", "Polish"],
  },
  {
    group: "East Asian",
    languages: ["Mandarin", "Japanese", "Korean"],
  },
  {
    group: "Middle Eastern",
    languages: ["Arabic", "Persian", "Turkish", "Hebrew"],
  },
];

const LanguageCoverage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/8 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          label="Language Coverage"
          title="30+ Languages &"
          gradientText="Growing"
          subtitle="Native-speaker annotators across major language families. Dialect and accent coverage for speech AI."
          light
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {languageGroups.map((group, gi) => (
            <div
              key={group.group}
              className={`rounded-2xl p-6 glass-dark hover:border-primary/30 transition-all duration-300 reveal-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              <h3 className="font-heading text-base font-bold text-primary mb-4">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-white/80 border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageCoverage;
