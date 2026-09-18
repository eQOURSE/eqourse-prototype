import { useEffect, useState } from "react";

const lessonSteps = [
  { label: "Evaporation", transcript: "Sunlight warms lakes and oceans, turning water into vapor." },
  { label: "Condensation", transcript: "The vapor rises, cools, and gathers into clouds." },
  { label: "Precipitation", transcript: "Water returns to Earth as rain, completing the cycle." },
] as const;

const waveformHeights = [10, 17, 12, 25, 35, 20, 41, 28, 16, 32, 46, 25, 18, 37, 24, 13, 29, 42, 22, 14, 31, 39, 21, 12, 27, 35, 17, 10, 23, 30, 14, 8];

export default function EducationalAudioGraphic() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setStep((current) => (current + 1) % lessonSteps.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="educational-audio-graphic absolute inset-0 overflow-hidden bg-[#0e1638] text-white">
      <style>{`
        @keyframes ea-float { 50% { transform: translateY(-7px); } }
        @keyframes ea-vapor { 0% { transform: translateY(10px); opacity: 0; } 35% { opacity: .8; } 100% { transform: translateY(-55px); opacity: 0; } }
        @keyframes ea-rain { 0% { transform: translateY(-9px); opacity: 0; } 25% { opacity: .9; } 100% { transform: translateY(30px); opacity: 0; } }
        @keyframes ea-wave { 50% { transform: scaleY(.45); } }
        @keyframes ea-progress { from { width: 0; } to { width: 100%; } }
        @keyframes ea-glow { 50% { opacity: .42; transform: scale(1.1); } }
        .educational-audio-graphic .ea-cloud { animation: ea-float 4s ease-in-out infinite; transform-origin: center; }
        .educational-audio-graphic .ea-vapor { animation: ea-vapor 3.5s ease-in infinite; }
        .educational-audio-graphic .ea-rain { animation: ea-rain 1.8s linear infinite; }
        .educational-audio-graphic .ea-wave-bar { animation: ea-wave .6s ease-in-out infinite alternate; transform-origin: center; }
        .educational-audio-graphic .ea-progress-fill { animation: ea-progress 13.5s linear infinite; }
        .educational-audio-graphic .ea-sun-glow { animation: ea-glow 3s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .educational-audio-graphic .ea-cloud, .educational-audio-graphic .ea-vapor,
          .educational-audio-graphic .ea-rain, .educational-audio-graphic .ea-wave-bar,
          .educational-audio-graphic .ea-progress-fill, .educational-audio-graphic .ea-sun-glow { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 28% 54%, #29446b 0, #142044 42%, #0e1638 78%)" }} />
      <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-5">
        <div className="flex items-center gap-2 rounded-full border border-orange-300/30 bg-black/25 px-2.5 py-1 text-[10px] font-bold tracking-wider text-orange-200 sm:px-3 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> NARRATED LESSON
        </div>
        <span className="text-[10px] font-medium tracking-wide text-white/60 sm:text-xs">GRADE 5 · SCIENCE</span>
      </div>

      <div
        className="absolute inset-x-4 z-10 items-center sm:inset-x-7"
        style={{ top: "18%", bottom: "22%", display: "grid", gridTemplateColumns: "45% 55%" }}
      >
        <div className="relative h-full min-h-0">
          <svg viewBox="0 0 320 220" className="h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="ea-water" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#52c9d2" /><stop offset="1" stopColor="#177895" /></linearGradient>
              <radialGradient id="ea-sun"><stop stopColor="#ffe7a2" /><stop offset="1" stopColor="#f7941d" /></radialGradient>
            </defs>
            <circle className="ea-sun-glow" cx="70" cy="57" r="43" fill="#f7941d" opacity=".22" />
            <circle cx="70" cy="57" r="25" fill="url(#ea-sun)" />
            <path className="ea-cloud" d="M162 76c0-14 12-25 27-25 8 0 15 3 20 9 5-12 17-20 31-20 19 0 34 14 35 32 12 2 21 11 21 23 0 13-11 24-25 24h-88c-15 0-26-10-26-23 0-9 5-16 13-20Z" fill="#dcefff" opacity=".92" />
            {[99, 119, 138].map((x, index) => <circle key={x} className="ea-vapor" cx={x} cy="141" r="3.3" fill="#80dfdf" style={{ animationDelay: `${index * .85}s` }} />)}
            {[201, 224, 247, 270].map((x, index) => <path key={x} className="ea-rain" d={`M${x} 128l-5 15`} stroke="#75d9e8" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: `${index * .37}s` }} />)}
            <path d="M0 174Q40 161 82 174T164 174T246 174T328 174V220H0Z" fill="url(#ea-water)" opacity=".85" />
            <path d="M0 186Q40 173 82 186T164 186T246 186T328 186" fill="none" stroke="#a5f1f0" strokeWidth="2" opacity=".65" />
          </svg>
        </div>

        <div className="min-w-0 pl-2 sm:pl-5">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-orange-300 sm:text-xs">Illustrative lesson preview</p>
          <h3 className="mt-1.5 font-heading font-bold leading-tight text-white" style={{ fontSize: "clamp(18px, 2.8vw, 30px)" }}>The Water Cycle</h3>
          <div className="mt-2 flex flex-wrap gap-1 sm:mt-3">
            {lessonSteps.map((item, index) => (
              <span key={item.label} className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold transition-colors duration-500 sm:px-2 sm:text-[10px] ${index === step ? "bg-orange-400 text-[#0e1638]" : "bg-white/10 text-white/60"}`}>{item.label}</span>
            ))}
          </div>
          <div className="mt-2 border-l-2 border-orange-400 pl-2.5 sm:mt-4 sm:pl-3">
            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-200/80 sm:text-[10px]">Narration transcript · {step + 1}/3</span>
            <p key={step} className="mt-1 font-medium leading-snug text-white/95" style={{ fontSize: "clamp(11px, 1.6vw, 16px)" }}>“{lessonSteps[step].transcript}”</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-7 sm:bottom-5">
        <div className="mb-2 flex h-7 items-center gap-[3px] sm:h-9 sm:gap-1" aria-hidden="true">
          {waveformHeights.map((height, index) => (
            <span
              key={index}
              className="ea-wave-bar rounded-full"
              style={{ width: 5, flex: "1 1 5px", maxWidth: 7, height: `${Math.round(height * .65)}px`, background: "linear-gradient(to top, rgba(249, 115, 22, .55), #fdba74)", animationDelay: `${(index % 8) * -.09}s` }}
            />
          ))}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/20"><div className="ea-progress-fill h-full rounded-full bg-orange-400" /></div>
        <div className="mt-1 flex justify-between text-[9px] font-semibold tracking-wide text-white/55 sm:text-[10px]"><span>CONCEPT EXPLANATION</span><span>AUDIO SAMPLE FORMAT</span></div>
      </div>
    </div>
  );
}
