import { useEffect, useRef, useState } from "react";

const clients = [
  "eduKemy", "Booxpand", "EMBIBE", "LEAD", "Numerade",
  "Classera", "QbD Learning", "Square Panda", "Bartleby",
  "TuTrain", "Google", "Microsoft", "Amazon", "Meta",
];

const FreePilotClientsStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-border/30" ref={ref}>
      <div
        className={`container mx-auto px-4 text-center mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Partners</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
          Trusted by <span className="text-gradient">200+ Clients</span>
        </h2>
      </div>

      {/* Auto-scrolling Logo Strip */}
      <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-white after:to-transparent">
        <div className="flex w-[200%] animate-scroll-left hover:[animation-play-state:paused] items-center">
          {[...clients, ...clients].map((client, index) => (
            <div key={`${client}-${index}`} className="flex-shrink-0 w-40 md:w-56 mx-4 group">
              <div className="h-20 md:h-24 rounded-xl bg-card border border-border/50 shadow-sm flex items-center justify-center transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-primary/30 group-hover:shadow-card hover:-translate-y-1 cursor-pointer">
                <span className="font-heading font-bold text-lg md:text-xl text-foreground/80 group-hover:text-primary transition-colors">
                  {client}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreePilotClientsStrip;
