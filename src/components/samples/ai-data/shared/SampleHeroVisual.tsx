import { useEffect, useState } from "react";

type VisualKind = "ner" | "cv" | "audio" | "rlhf" | "collection" | "cleaning";

const NerVisual = () => {
  const tags = [
    { word: "Priya", label: "PERSON", color: "hsl(170 82% 55%)" },
    { word: "Infosys", label: "ORG", color: "hsl(190 85% 68%)" },
    { word: "Bengaluru", label: "LOC", color: "hsl(165 75% 71%)" },
    { word: "2026", label: "DATE", color: "hsl(42 95% 65%)" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 p-2">
      <div className="flex flex-wrap gap-1.5 text-[11px] md:text-sm font-mono leading-relaxed text-white/80">
        <span>At</span>
        {tags.map((t, i) => (
          <span
            key={t.word}
            className="relative px-2 py-0.5 rounded-md border animate-slide-up"
            style={{
              color: t.color,
              borderColor: `${t.color}66`,
              background: `${t.color}14`,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            {t.word}
            <span
              className="absolute -top-4 left-0 text-[8px] font-bold tracking-widest uppercase"
              style={{ color: t.color }}
            >
              {t.label}
            </span>
          </span>
        ))}
        <span>joined our team.</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { k: "Sentiment", v: 94, c: "hsl(170 82% 55%)" },
          { k: "Confidence", v: 88, c: "hsl(190 85% 68%)" },
        ].map((b) => (
          <div key={b.k}>
            <div className="flex justify-between text-[10px] text-white/60 mb-1">
              <span>{b.k}</span>
              <span>{b.v}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full animate-slide-up"
                style={{ width: `${b.v}%`, background: b.c }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CvVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    <defs>
      <linearGradient id="cvsky" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="hsl(242 33% 28%)" />
        <stop offset="1" stopColor="hsl(242 33% 16%)" />
      </linearGradient>
    </defs>
    <rect width="300" height="200" fill="url(#cvsky)" />
    <rect x="0" y="140" width="300" height="60" fill="hsl(242 20% 22%)" />
    <path d="M0 160 L300 160" stroke="hsl(165 75% 71%)" strokeDasharray="6 8" strokeWidth="1.5" opacity="0.5" />
    {[
      { x: 40, y: 110, w: 60, h: 40, label: "car", c: "hsl(170 82% 55%)", d: 0 },
      { x: 130, y: 95, w: 50, h: 55, label: "person", c: "hsl(190 85% 68%)", d: 0.3 },
      { x: 210, y: 120, w: 70, h: 35, label: "rickshaw", c: "hsl(42 95% 65%)", d: 0.6 },
    ].map((b) => (
      <g key={b.label} style={{ animation: `slideUp 0.8s ease-out ${b.d}s forwards`, opacity: 0 }}>
        <rect
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill="none"
          stroke={b.c}
          strokeWidth="2"
          strokeDasharray="4 3"
          className="animate-dash-flow"
        />
        <rect x={b.x} y={b.y - 14} width={b.label.length * 6 + 8} height="13" fill={b.c} rx="2" />
        <text x={b.x + 4} y={b.y - 4} fontSize="9" fontWeight="700" fill="hsl(242 33% 12%)">
          {b.label}
        </text>
      </g>
    ))}
    {[30, 60, 90].map((y) => (
      <circle key={y} cx={y * 3} cy="30" r="1.5" fill="hsl(165 75% 71%)" opacity="0.6" />
    ))}
  </svg>
);

const AudioVisual = () => {
  const bars = Array.from({ length: 40 });
  return (
    <div className="w-full h-full flex flex-col justify-center p-2 gap-3">
      <div className="flex items-end justify-between h-16 gap-[2px]">
        {bars.map((_, i) => {
          const h = 20 + Math.abs(Math.sin(i * 0.6)) * 80;
          const speaker = i < 14 ? 0 : i < 28 ? 1 : 2;
          const colors = ["hsl(170 82% 55%)", "hsl(190 85% 68%)", "hsl(42 95% 65%)"];
          return (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: colors[speaker],
                opacity: 0.85,
                animation: `slideUp 0.6s ease-out ${i * 0.02}s both`,
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-2 text-[10px]">
        {[
          { n: "S1", c: "hsl(170 82% 55%)", t: "00:00–00:08" },
          { n: "S2", c: "hsl(190 85% 68%)", t: "00:08–00:16" },
          { n: "S3", c: "hsl(42 95% 65%)", t: "00:16–00:24" },
        ].map((s) => (
          <div
            key={s.n}
            className="flex-1 rounded-md border px-2 py-1"
            style={{ borderColor: `${s.c}55`, background: `${s.c}14` }}
          >
            <div className="font-bold" style={{ color: s.c }}>{s.n}</div>
            <div className="text-white/50 font-mono">{s.t}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] font-mono text-white/65 leading-relaxed">
        <span className="text-white/40">[00:03]</span> "Can you share the report by tomorrow?"
      </div>
    </div>
  );
};

const RlhfVisual = () => (
  <div className="w-full h-full flex flex-col justify-center gap-2 p-2">
    {[
      { rank: "A", score: 4.8, txt: "Helpful, factual, safe", c: "hsl(170 82% 55%)", w: 95 },
      { rank: "B", score: 3.4, txt: "Helpful but partial", c: "hsl(42 95% 65%)", w: 70 },
      { rank: "C", score: 1.9, txt: "Off-topic / risky", c: "hsl(0 75% 65%)", w: 38 },
    ].map((r, i) => (
      <div
        key={r.rank}
        className="rounded-lg border p-2 flex items-center gap-3 animate-slide-up"
        style={{
          borderColor: `${r.c}55`,
          background: `${r.c}10`,
          animationDelay: `${i * 0.2}s`,
        }}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs"
          style={{ background: r.c, color: "hsl(242 33% 12%)" }}
        >
          {r.rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-white/80 font-medium truncate">{r.txt}</div>
          <div className="h-1 mt-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${r.w}%`, background: r.c }} />
          </div>
        </div>
        <div className="text-xs font-bold" style={{ color: r.c }}>{r.score}</div>
      </div>
    ))}
  </div>
);

const CollectionVisual = () => {
  const items = [
    { label: "Text", count: "30+ langs", icon: "M4 6h16M4 12h16M4 18h10", c: "hsl(170 82% 55%)" },
    { label: "Audio", count: "12+ langs", icon: "M9 18V6l12-2v12M9 13a3 3 0 1 1-3 3V6a3 3 0 1 1 3 3", c: "hsl(190 85% 68%)" },
    { label: "Image", count: "500K+", icon: "M3 3h18v18H3z M3 15l4-4 5 5 3-3 6 6", c: "hsl(165 75% 71%)" },
    { label: "Video", count: "10K+ hrs", icon: "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z", c: "hsl(42 95% 65%)" },
  ];
  return (
    <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
      {items.map((it, i) => (
        <div
          key={it.label}
          className="rounded-xl border flex flex-col items-center justify-center gap-1 p-2 relative overflow-hidden animate-slide-up"
          style={{
            borderColor: `${it.c}55`,
            background: `${it.c}0f`,
            animationDelay: `${i * 0.15}s`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at center, ${it.c}, transparent 60%)` }}
          />
          <svg viewBox="0 0 24 24" className="w-6 h-6 relative z-10" fill="none" stroke={it.c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={it.icon} />
          </svg>
          <div className="text-[11px] font-bold relative z-10" style={{ color: it.c }}>
            {it.label}
          </div>
          <div className="text-[9px] text-white/50 relative z-10">{it.count}</div>
        </div>
      ))}
    </div>
  );
};

const CleaningVisual = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 2), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 p-2">
      <div className="flex-1 h-full rounded-xl border border-red-500/40 bg-red-500/5 p-2 relative overflow-hidden">
        <div className="text-[10px] font-bold tracking-widest uppercase text-red-400">Before</div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          {Array.from({ length: 16 }).map((_, i) => {
            const dup = [2, 5, 7, 10, 11, 13].includes(i);
            return (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  background: dup ? "hsl(0 75% 60% / 0.6)" : "hsl(0 0% 100% / 0.15)",
                  transform: `rotate(${(i % 3) * 4 - 4}deg)`,
                }}
              />
            );
          })}
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] text-red-400 font-mono">18% dup</div>
      </div>
      <svg viewBox="0 0 40 24" className="w-8 h-6 flex-shrink-0">
        <path
          d="M4 12 H32 M28 6 L34 12 L28 18"
          stroke="hsl(170 82% 55%)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={phase === 1 ? "animate-dash-flow" : ""}
        />
      </svg>
      <div className="flex-1 h-full rounded-xl border border-primary/40 bg-primary/5 p-2 relative overflow-hidden">
        <div className="text-[10px] font-bold tracking-widest uppercase text-primary">After</div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{ background: "hsl(170 82% 55% / 0.5)" }}
            />
          ))}
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] text-primary font-mono">clean</div>
      </div>
    </div>
  );
};

const SampleHeroVisual = ({ kind }: { kind: VisualKind }) => {
  const Visual =
    kind === "ner"
      ? NerVisual
      : kind === "cv"
      ? CvVisual
      : kind === "audio"
      ? AudioVisual
      : kind === "rlhf"
      ? RlhfVisual
      : kind === "collection"
      ? CollectionVisual
      : CleaningVisual;

  return (
    <div className="relative w-full h-[280px] md:h-[340px] rounded-3xl overflow-hidden border border-primary/25 bg-gradient-to-br from-[hsl(242_33%_14%)] to-[hsl(242_33%_22%)] shadow-elevated">
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="relative z-10 w-full h-full">
        <Visual />
      </div>
    </div>
  );
};

export default SampleHeroVisual;
