const clients = [
  "eduKemy", "Booxpand", "EMBIBE",
  "LEAD", "Numerade", "Classera",
  "QbD Learning", "Square Panda", "Bartleby",
];

const ClientsSection = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-10">
        <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Partners</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
          Trusted by <span className="text-gradient">200+ Clients</span>
        </h2>
      </div>

      {/* Logo grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {clients.map((client) => (
            <div
              key={client}
              className="group h-20 rounded-xl bg-card border border-border/50 shadow-card flex items-center justify-center hover:shadow-soft hover:border-primary/30 transition-all duration-300 neon-card"
            >
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
