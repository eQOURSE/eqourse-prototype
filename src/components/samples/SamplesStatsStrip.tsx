import { FileText, PlayCircle, Database, Users } from "lucide-react";

const stats = [
  { Icon: FileText, value: "8", label: "Text Sample Categories", accent: "hsl(170 82% 50%)" },
  { Icon: PlayCircle, value: "7", label: "Video Formats", accent: "hsl(165 75% 55%)" },
  { Icon: Database, value: "6", label: "AI Data Datasets", accent: "hsl(200 85% 55%)", isNew: true },
  { Icon: Users, value: "200+", label: "Clients Trust eQOURSE", accent: "hsl(42 95% 60%)" },
];

const SamplesStatsStrip = () => (
  <section className="relative -mt-12 md:-mt-14 z-20">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl md:rounded-3xl bg-card border border-border/60 shadow-elevated overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/50">
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div
                key={s.label}
                className="p-5 md:p-6 flex items-center gap-4 relative overflow-hidden group"
                style={{ animation: `slideUp 0.6s ease-out ${i * 0.1}s both` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ background: s.accent }}
                />
                <div
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                  style={{ background: `${s.accent}1a`, border: `1px solid ${s.accent}40` }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: s.accent }} />
                </div>
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl md:text-3xl font-extrabold text-foreground leading-none">
                      {s.value}
                    </div>
                    {s.isNew && (
                      <span className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(220_85%_55%)] to-[hsl(190_85%_55%)] text-white">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] md:text-xs text-muted-foreground mt-1 leading-tight">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default SamplesStatsStrip;
