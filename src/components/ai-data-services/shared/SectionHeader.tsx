interface SectionHeaderProps {
  label: string;
  title: string;
  gradientText?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader = ({ label, title, gradientText, subtitle, centered = true, light = false }: SectionHeaderProps) => (
  <div className={`${centered ? "text-center" : ""} max-w-3xl ${centered ? "mx-auto" : ""} mb-14`}>
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${light ? "border-primary/35 bg-primary/10" : "border-primary/20 bg-primary/5"}`}>
      <span className={`w-2 h-2 rounded-full ${light ? "bg-accent" : "bg-primary"} animate-pulse`} />
      <span className={`text-xs font-semibold tracking-wider uppercase ${light ? "text-accent" : "text-primary"}`}>{label}</span>
    </div>

    <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-white" : "text-foreground"} mt-1 mb-4 leading-tight`}>
      {title}{" "}
      {gradientText && <span className="text-gradient">{gradientText}</span>}
    </h2>

    {subtitle && (
      <p className={`text-base md:text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>
    )}
  </div>
);

export default SectionHeader;
