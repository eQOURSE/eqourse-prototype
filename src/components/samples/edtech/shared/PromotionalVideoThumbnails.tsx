import React from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  LayoutTemplate,
  MousePointer2,
} from "lucide-react";

// --- Premium Cinematic Video Player Wrapper ---
const PremiumPlayerMockup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="absolute inset-0 flex flex-col bg-slate-950 overflow-hidden ring-1 ring-white/10 group">
    {/* Screen Content */}
    <div className="flex-1 relative overflow-hidden bg-black">
      {/* Vignette effect for cinematic feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-40 pointer-events-none"></div>
      {children}
    </div>

    {/* Cinematic Glassmorphism Controls */}
    <div className="absolute bottom-0 left-0 right-0 pt-16 pb-4 px-4 sm:px-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 transform translate-y-2 group-hover:translate-y-0">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 relative cursor-pointer group/bar hover:h-2 transition-all duration-300">
        <div className="absolute top-0 left-0 h-full bg-red-500 rounded-full animate-[progress_15s_linear_infinite] shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        <div className="absolute top-1/2 -mt-2 w-4 h-4 bg-white rounded-full shadow-lg animate-[progress-knob_15s_linear_infinite] scale-0 group-hover/bar:scale-100 transition-transform duration-300"></div>
      </div>

      {/* Controls Container */}
      <div className="flex justify-between items-center text-white/90">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button className="hover:text-red-400 hover:scale-110 transition-all duration-300">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current drop-shadow-md" />
          </button>
          <div className="items-center space-x-4 hidden sm:flex opacity-70">
            <SkipBack className="w-5 h-5 hover:text-white hover:opacity-100 cursor-pointer transition-colors" />
            <SkipForward className="w-5 h-5 hover:text-white hover:opacity-100 cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center space-x-2 pl-0 sm:pl-2 sm:border-l border-white/20">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 hover:text-white cursor-pointer transition-colors" />
            <span className="text-[10px] sm:text-xs font-medium tracking-wide opacity-80">
              00:14 / 02:45
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-5">
          <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 hidden md:block border border-white/20 px-2 py-1 rounded">
            {title}
          </span>
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 hover:opacity-100 hover:rotate-90 transition-all duration-500 cursor-pointer" />
          <Maximize className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer" />
        </div>
      </div>
    </div>

    <style
      dangerouslySetInnerHTML={{
        __html: `
      @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
      @keyframes progress-knob { 0% { left: 0%; } 100% { left: 100%; } }
    `,
      }}
    />
  </div>
);

// --- 1. Brand Video Animation (Cinematic Eclipse & Light Sweep) ---
const BrandAnimation = () => (
  <PremiumPlayerMockup title="Brand Identity">
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Deep Space / Slow particle background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-[slow-drift_40s_linear_infinite]"></div>

      {/* Cinematic Eclipse Reveal */}
      <div className="relative flex items-center justify-center w-full h-full z-10">
        {/* Expanding Light Ring */}
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full border border-red-500/20 animate-[ring-expand_6s_ease-out_infinite]"></div>
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full border border-red-400/10 animate-[ring-expand_6s_ease-out_infinite_1s]"></div>

        {/* Core Glow */}
        <div className="absolute w-20 h-20 sm:w-32 sm:h-32 bg-red-600 rounded-full blur-[40px] sm:blur-[60px] opacity-0 animate-[core-pulse_6s_ease-in-out_infinite]"></div>

        {/* Brand Typography Lockup */}
        <div className="flex flex-col items-center justify-center z-20">
          <div className="relative overflow-hidden py-2">
            {/* The text with a sweeping light effect */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.2em] opacity-0 animate-[text-reveal-scale_6s_ease-out_infinite] bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-white">
              eQOURSE
            </h2>
            {/* Light Sweep highlight */}
            <div className="absolute top-0 bottom-0 w-4 sm:w-8 bg-white/40 blur-[4px] sm:blur-[8px] transform -skew-x-12 animate-[light-sweep_6s_ease-in-out_infinite]"></div>
          </div>

          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[line-expand_6s_ease-out_infinite] mt-1 sm:mt-2 mb-2 sm:mb-4"></div>

          <p className="text-red-400 tracking-[0.2em] sm:tracking-[0.4em] text-[8px] sm:text-xs font-semibold opacity-0 animate-[fade-slide-up_6s_ease-out_infinite_1.5s]">
            EMPOWER YOUR LEARNING
          </p>
        </div>
      </div>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      @keyframes slow-drift { 0% { background-position: 0 0; } 100% { background-position: 1000px 1000px; } }
      @keyframes core-pulse { 0%, 15% { opacity: 0; transform: scale(0.5); } 40%, 60% { opacity: 0.6; transform: scale(1.5); } 85%, 100% { opacity: 0; transform: scale(2); } }
      @keyframes text-reveal-scale { 0%, 20% { opacity: 0; letter-spacing: 0em; filter: blur(10px); transform: scale(1.1); } 40%, 70% { opacity: 1; letter-spacing: 0.2em; filter: blur(0px); transform: scale(1); } 85%, 100% { opacity: 0; filter: blur(10px); transform: scale(0.9); } }
      @keyframes light-sweep { 0%, 40% { left: -100%; opacity: 0; } 45% { opacity: 1; } 60%, 100% { left: 200%; opacity: 0; } }
      @keyframes line-expand { 0%, 35% { width: 0; opacity: 0; } 45%, 70% { width: 60%; opacity: 1; } 85%, 100% { width: 100%; opacity: 0; } }
      @keyframes fade-slide-up { 0%, 10% { opacity: 0; transform: translateY(20px); } 20%, 70% { opacity: 1; transform: translateY(0); } 85%, 100% { opacity: 0; transform: translateY(-20px); } }
      @keyframes ring-expand { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
    `,
      }}
    />
  </PremiumPlayerMockup>
);

// --- 2. Course Trailer Animation (Kinetic Typography & Slices) ---
const TrailerAnimation = () => (
  <PremiumPlayerMockup title="Course Teaser">
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden font-sans">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] animate-[pan-grid_10s_linear_infinite]"></div>

      {/* Instant Red Flash to break the initial black screen */}
      <div className="absolute inset-0 bg-red-600 z-0 animate-[flash-intro_5s_ease-out_infinite]"></div>

      {/* Diagonal Slice 1 */}
      <div className="absolute -inset-10 bg-red-600 transform origin-left -skew-x-[20deg] animate-[slice-in_5s_ease-in-out_infinite]"></div>

      {/* Kinetic Typography Lockup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="overflow-hidden">
          <div className="text-white font-black text-4xl sm:text-6xl md:text-8xl italic tracking-tighter leading-none animate-[kinetic-slide-up-1_5s_cubic-bezier(0.16,1,0.3,1)_infinite] drop-shadow-2xl">
            MASTER
          </div>
        </div>
        <div className="overflow-hidden mt-[-5px] sm:mt-[-10px]">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-white to-red-100 font-black text-2xl sm:text-4xl md:text-6xl italic tracking-tighter leading-none animate-[kinetic-slide-up-2_5s_cubic-bezier(0.16,1,0.3,1)_infinite] drop-shadow-[0_10px_20px_rgba(220,38,38,0.4)]">
            DATA SCIENCE
          </div>
        </div>
      </div>

      {/* Fast Cut Action Scene (UI overlay simulation) */}
      <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between p-4 sm:p-12 opacity-0 animate-[fast-cut-scene_5s_step-end_infinite] bg-slate-950/90 backdrop-blur-sm z-20 gap-4 sm:gap-0">
        <div className="relative w-24 h-24 sm:w-48 sm:h-48 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ef4444"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="283"
              className="animate-[draw-circle_5s_ease-out_infinite]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-lg sm:text-3xl font-black italic">100%</span>
            <span className="text-[6px] sm:text-[10px] tracking-widest text-red-400 font-bold">
              PRACTICAL
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col gap-2 sm:gap-5 items-center sm:items-start text-center sm:text-left">
          <div className="h-1 sm:h-2 bg-red-500 w-1/2 sm:w-1/4 rounded-full"></div>
          <div className="text-lg sm:text-3xl font-bold text-white leading-tight">
            Build Real-World Models Today.
          </div>
        </div>
      </div>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      @keyframes flash-intro { 0% { opacity: 1; } 5%, 100% { opacity: 0; } }
      @keyframes pan-grid { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
      @keyframes slice-in { 0%, 5% { transform: translateX(-150%) skewX(-20deg); } 15%, 45% { transform: translateX(-20%) skewX(-20deg); } 55%, 100% { transform: translateX(150%) skewX(-20deg); } }
      @keyframes kinetic-slide-up-1 { 0% { transform: translateY(100%); opacity: 0; } 5%, 45% { transform: translateY(0); opacity: 1; } 50%, 100% { transform: translateY(-150%); opacity: 0; } }
      @keyframes kinetic-slide-up-2 { 0%, 5% { transform: translateY(100%); opacity: 0; } 10%, 45% { transform: translateY(0); opacity: 1; } 50%, 100% { transform: translateY(-150%); opacity: 0; } }
      @keyframes fast-cut-scene { 0%, 49% { opacity: 0; transform: scale(1.05); } 50%, 95% { opacity: 1; transform: scale(1); } 96%, 100% { opacity: 0; transform: scale(1.05); } }
      @keyframes draw-circle { 0%, 50% { stroke-dashoffset: 283; } 65%, 95% { stroke-dashoffset: 0; } 96%, 100% { stroke-dashoffset: 283; } }
    `,
      }}
    />
  </PremiumPlayerMockup>
);

// --- 3. Product Demo Animation (High-End UI Dashboard) ---
const DemoAnimation = () => (
  <PremiumPlayerMockup title="Platform Walkthrough">
    <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 flex items-center justify-center p-4 sm:p-8 perspective-1000 overflow-hidden">
      {/* 3D Tilted UI Screen */}
      <div className="w-full h-[80%] sm:h-full max-w-2xl bg-[#fafafa] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden relative border border-slate-300 transform transition-transform animate-[ui-float_6s_ease-in-out_infinite]">
        {/* macOS Style Window Header */}
        <div className="h-6 sm:h-10 bg-gradient-to-b from-white to-slate-100 border-b border-slate-300 flex items-center px-2 sm:px-4 shadow-sm z-10 shrink-0">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400 border border-red-500/50"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-400 border border-amber-500/50"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 border border-green-500/50"></div>
          </div>
          <div className="mx-auto bg-slate-200/50 px-8 sm:px-24 py-0.5 sm:py-1 rounded-md border border-slate-200 flex items-center shadow-inner">
            <LayoutTemplate className="w-2 h-2 sm:w-3 sm:h-3 text-slate-400 mr-1 sm:mr-2" />
            <div className="h-1 sm:h-1.5 w-8 sm:w-16 bg-slate-300 rounded"></div>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 flex bg-slate-50 overflow-hidden">
          {/* Sidebar */}
          <div className="w-16 sm:w-48 bg-white border-r border-slate-200 p-2 sm:p-4 flex flex-col gap-2 shrink-0">
            <div className="h-4 sm:h-8 w-full bg-slate-100 rounded-md mb-2 sm:mb-4 flex items-center px-1 sm:px-3">
              <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-slate-300"></div>
            </div>
            <div className="h-4 sm:h-8 w-full bg-slate-100 rounded-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-50 opacity-0 animate-[ui-btn-hover_6s_infinite_1s]"></div>
              <div className="absolute left-0 top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 w-0.5 sm:w-1 bg-red-500 rounded-r opacity-0 animate-[ui-btn-hover_6s_infinite_1s]"></div>
              <div className="h-full flex items-center px-1 sm:px-3">
                <div className="w-full h-1 sm:h-2 bg-slate-200 rounded animate-[ui-text-color_6s_infinite_1s]"></div>
              </div>
            </div>
            <div className="h-4 sm:h-8 w-full bg-slate-100 rounded-md"></div>
            <div className="h-4 sm:h-8 w-full bg-slate-100 rounded-md"></div>
          </div>

          {/* Main Analytics Content Area */}
          <div className="flex-1 p-2 sm:p-6 flex flex-col gap-2 sm:gap-6 min-w-0">
            <div className="flex justify-between items-end">
              <div>
                <div className="h-2 sm:h-4 w-12 sm:w-24 bg-slate-200 rounded mb-1 sm:mb-2"></div>
                <div className="h-4 sm:h-8 w-20 sm:w-40 bg-slate-800 rounded"></div>
              </div>
              <div className="h-4 sm:h-8 w-12 sm:w-24 bg-white border border-slate-200 shadow-sm rounded-md"></div>
            </div>

            {/* The Animated SVG Chart */}
            <div className="flex-1 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm p-2 sm:p-4 relative overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-y-2 sm:inset-y-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col justify-between">
                <div className="border-b border-slate-100 w-full h-0"></div>
                <div className="border-b border-slate-100 w-full h-0"></div>
                <div className="border-b border-slate-100 w-full h-0"></div>
                <div className="border-b border-slate-100 w-full h-0"></div>
              </div>

              {/* Animated Line Chart SVG */}
              <svg
                viewBox="0 0 400 150"
                className="w-full h-full relative z-10 preserve-aspect-ratio-none"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                    <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                  </linearGradient>
                </defs>

                {/* The filled area under the line */}
                <path
                  d="M 0 150 L 0 100 C 50 100 80 40 150 60 C 220 80 250 20 300 40 C 350 60 380 10 400 20 L 400 150 Z"
                  fill="url(#lineGrad)"
                  className="opacity-0 animate-[chart-fill_6s_ease-out_infinite_2.5s]"
                />

                {/* The glowing line */}
                <path
                  d="M 0 100 C 50 100 80 40 150 60 C 220 80 250 20 300 40 C 350 60 380 10 400 20"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  className="animate-[draw-chart_6s_ease-out_infinite_2.5s] drop-shadow-[0_4px_6px_rgba(239,68,68,0.4)]"
                />

                {/* Data Points appearing */}
                <circle
                  cx="150"
                  cy="60"
                  r="5"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="opacity-0 animate-[pop-dot_6s_infinite_3.2s]"
                />
                <circle
                  cx="300"
                  cy="40"
                  r="5"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="opacity-0 animate-[pop-dot_6s_infinite_3.6s]"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Animated Mouse Cursor with trail */}
        <div className="absolute top-[85%] right-[10%] w-4 h-4 sm:w-6 sm:h-6 z-50 animate-[move-complex-cursor_6s_ease-in-out_infinite]">
          <MousePointer2 className="w-full h-full text-slate-800 drop-shadow-xl fill-white" />
          {/* Click Ripple Effect */}
          <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 border-2 border-red-500 rounded-full opacity-0 animate-[click-burst_6s_infinite_1.8s]"></div>
        </div>
      </div>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      @keyframes ui-float { 0%, 100% { transform: translateY(0) rotateX(2deg); } 50% { transform: translateY(-5px) rotateX(4deg); } }
      @keyframes move-complex-cursor { 
        0%, 10% { transform: translate(0, 0); } 
        20%, 40% { transform: translate(-80px, -60px); } /* Scaled down translation */
        60%, 80% { transform: translate(-30px, -80px); } 
        90%, 100% { transform: translate(-10px, 20px); opacity: 0; }
      }
      @media (min-width: 640px) {
        @keyframes move-complex-cursor { 
          0%, 10% { transform: translate(0, 0); } 
          20%, 40% { transform: translate(-380px, -150px); } 
          60%, 80% { transform: translate(-120px, -200px); } 
          90%, 100% { transform: translate(-20px, 50px); opacity: 0; }
        }
      }
      @keyframes click-burst { 0% { transform: scale(0.2); opacity: 1; border-width: 4px; } 20%, 100% { transform: scale(1.5); opacity: 0; border-width: 0px; } }
      @keyframes ui-btn-hover { 0%, 20% { opacity: 0; } 25%, 100% { opacity: 1; } }
      @keyframes ui-text-color { 0%, 20% { background-color: #e2e8f0; } 25%, 100% { background-color: #f87171; } }
      @keyframes draw-chart { 0%, 15% { stroke-dashoffset: 600; } 45%, 100% { stroke-dashoffset: 0; } }
      @keyframes chart-fill { 0%, 30% { opacity: 0; transform: translateY(20px); } 45%, 100% { opacity: 1; transform: translateY(0); } }
      @keyframes pop-dot { 0%, 10% { opacity: 0; transform: scale(0); } 20%, 100% { opacity: 1; transform: scale(1); } }
    `,
      }}
    />
  </PremiumPlayerMockup>
);

/* ══════════════════════════════════════════════════════════════
   Tab selector
   ══════════════════════════════════════════════════════════════ */
export const PromotionalVideoThumbForTab = ({
  tabIndex,
}: {
  tabIndex: number;
  accent: string;
}) => {
  switch (tabIndex) {
    case 0:
      return <BrandAnimation />;
    case 1:
      return <TrailerAnimation />;
    case 2:
      return <DemoAnimation />;
    default:
      return <BrandAnimation />;
  }
};
