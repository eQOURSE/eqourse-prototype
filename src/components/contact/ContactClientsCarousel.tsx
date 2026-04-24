const clients = [
  "eduKemy", "Booxpand", "EMBIBE",
  "LEAD", "Numerade", "Classera",
  "QbD Learning", "Square Panda", "Bartleby",
  "TuTrain", "Google", "Microsoft", "Amazon", "Meta"
];

const ContactClientsCarousel = () => {
  return (
    <section className="py-20 bg-background overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4 text-center mb-12 reveal-up">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Trusted by <span className="text-gradient">200+ Clients</span>
        </h2>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-background after:to-transparent reveal-up">
        {/* Double array to create seamless loop */}
        <div className="flex w-[200%] animate-scroll-left hover:[animation-play-state:paused] items-center">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="flex-shrink-0 w-40 md:w-56 mx-4 group"
            >
              <div className="h-20 md:h-24 rounded-xl bg-card border border-border/50 shadow-sm flex items-center justify-center transition-all duration-300 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-primary/30 group-hover:shadow-card hover:-translate-y-1 cursor-pointer">
                <span className="font-heading font-bold text-lg md:text-xl text-foreground/80 group-hover:text-primary transition-colors">{client}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactClientsCarousel;
