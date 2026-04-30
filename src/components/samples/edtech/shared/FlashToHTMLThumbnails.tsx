// ──────────────────────────────────────────────────────────────
// FlashToHTMLThumbnails.tsx
// Animated CSS/SVG "motion thumbnails" for each Flash to HTML tab.
// Ported from the standalone prototype.
// ──────────────────────────────────────────────────────────────

import React from "react";
import { Layout, Code2, Puzzle, Monitor, Laptop, Smartphone } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   Shared browser window mockup wrapper
   ══════════════════════════════════════════════════════════════ */
const BrowserWindowMockup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="absolute inset-0 flex flex-col bg-slate-900 overflow-hidden border border-slate-700/30 group">
    {/* Browser Top Bar */}
    <div className="h-10 bg-slate-800 flex items-center px-4 border-b border-slate-700 relative flex-shrink-0">
      <div className="flex space-x-2 absolute left-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="mx-auto bg-slate-900 text-slate-400 text-[10px] font-mono px-6 py-1 rounded border border-slate-700 flex items-center">
        <Layout className="w-3 h-3 mr-2" />
        {title}
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-1 relative bg-slate-100 overflow-hidden">
      {children}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   1. Before/After Animation (Split Screen Slider)
   ══════════════════════════════════════════════════════════════ */
export const BeforeAfterThumb = () => (
  <BrowserWindowMockup title="course-module.html">
    <div className="absolute inset-0 w-full h-full select-none">
      {/* AFTER STATE: Modern HTML5 (Underneath) */}
      <div className="absolute inset-0 w-full h-full bg-white flex flex-col p-4 sm:p-6 font-sans">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">Biology Lab</h2>
          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] sm:text-xs font-bold flex items-center">
            <Code2 className="w-3 h-3 mr-1" /> HTML5
          </span>
        </div>

        <div className="flex-1 flex gap-4 sm:gap-6">
          <div className="w-1/3 flex flex-col gap-3 sm:gap-4">
            <div className="h-10 sm:h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center px-3 sm:px-4 shadow-sm">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                1
              </div>
              <div className="h-2 sm:h-3 w-12 sm:w-16 bg-orange-200 rounded"></div>
            </div>
            <div className="h-10 sm:h-12 rounded-lg bg-white border border-slate-200 flex items-center px-3 sm:px-4 shadow-sm hover:border-orange-300 transition-colors">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                2
              </div>
              <div className="h-2 sm:h-3 w-16 sm:w-20 bg-slate-200 rounded"></div>
            </div>
            <div className="h-10 sm:h-12 rounded-lg bg-white border border-slate-200 flex items-center px-3 sm:px-4 shadow-sm">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                3
              </div>
              <div className="h-2 sm:h-3 w-8 sm:w-12 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 sm:p-6 flex items-center justify-center relative overflow-hidden shadow-inner">
            {/* Smooth SVG Animation */}
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 sm:w-32 sm:h-32 animate-[spin_10s_linear_infinite]"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f97316"
                strokeWidth="8"
                strokeDasharray="100 50"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#fdba74"
                strokeWidth="6"
                strokeDasharray="50 30"
                strokeLinecap="round"
                className="animate-[spin_4s_linear_infinite_reverse]"
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* BEFORE STATE: Legacy Flash (On Top, Clipped) */}
      <div
        className="absolute inset-0 w-full h-full bg-[#d4d0c8] flex flex-col p-4 sm:p-6 font-serif border-r-2 border-slate-900 animate-[slide-clip_8s_ease-in-out_infinite]"
        style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
      >
        {/* Old school bevels */}
        <div className="absolute inset-0 border-t-4 border-l-4 border-white pointer-events-none"></div>
        <div className="absolute inset-0 border-b-4 border-r-4 border-[#808080] pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 sm:mb-6 border-b-2 border-[#808080] pb-2">
          <h2 className="text-lg sm:text-xl font-bold text-black drop-shadow-[1px_1px_0px_white]">
            Biology Lab.swf
          </h2>
          <span className="px-1.5 py-0.5 bg-[#808080] text-white text-[10px] sm:text-xs border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-white flex items-center">
            <Puzzle className="w-3 h-3 mr-1" /> Adobe Flash
          </span>
        </div>

        <div className="flex-1 flex gap-4 sm:gap-6">
          <div className="w-1/3 flex flex-col gap-3 sm:gap-4">
            <div className="h-10 sm:h-12 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center px-3 sm:px-4 text-xs sm:text-sm">
              <span className="font-bold">Step 1</span>
            </div>
            <div className="h-10 sm:h-12 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center px-3 sm:px-4 text-xs sm:text-sm">
              <span>Step 2</span>
            </div>
            <div className="h-10 sm:h-12 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center px-3 sm:px-4 text-xs sm:text-sm">
              <span>Step 3</span>
            </div>
          </div>

          <div className="flex-1 bg-white border-t-4 border-l-4 border-[#808080] border-b-4 border-r-4 border-white p-4 sm:p-6 flex flex-col items-center justify-center relative">
            {/* Clunky Flash Simulation */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-400 border-[3px] border-gray-600 flex items-center justify-center relative overflow-hidden">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black absolute animate-[clunky-bounce_2s_steps(4)_infinite]"></div>
            </div>
            <div className="mt-3 px-2 py-0.5 sm:mt-4 sm:px-3 sm:py-1 bg-yellow-200 border border-black text-[8px] sm:text-[10px] text-black">
              Plugin restricted. Click to enable.
            </div>
          </div>
        </div>

        {/* The Drag Handle (Slider) attached to the clip-path edge via animation */}
        <div className="absolute top-0 bottom-0 w-1 bg-slate-900 right-0 transform translate-x-1/2 flex items-center justify-center z-50">
          <div className="w-5 h-8 sm:w-6 sm:h-10 bg-white border-2 border-slate-900 rounded-sm shadow-lg flex items-center justify-center gap-0.5">
            <div className="w-0.5 h-3 sm:h-4 bg-slate-400"></div>
            <div className="w-0.5 h-3 sm:h-4 bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>

    <style dangerouslySetInnerHTML={{
      __html: `
      @keyframes slide-clip { 
        0%, 15% { clip-path: polygon(0 0, 95% 0, 95% 100%, 0 100%); } 
        45%, 65% { clip-path: polygon(0 0, 5% 0, 5% 100%, 0 100%); } 
        85%, 100% { clip-path: polygon(0 0, 95% 0, 95% 100%, 0 100%); } 
      }
      @keyframes clunky-bounce {
        0%, 100% { top: 5px; left: 5px; }
        25% { top: 5px; left: 40px; }
        50% { top: 40px; left: 40px; }
        75% { top: 40px; left: 5px; }
      }
    `}} />
  </BrowserWindowMockup>
);

/* ══════════════════════════════════════════════════════════════
   2. Interactive HTML5 Animation (Responsive Reflow)
   ══════════════════════════════════════════════════════════════ */

// Simple Menu Icon for the mockup
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const ResponsiveHtmlThumb = () => (
  <div className="absolute inset-0 bg-slate-900 overflow-hidden border border-slate-700/30 flex items-center justify-center">
    {/* Abstract background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900"></div>

    {/* The Resizing "Device" Container */}
    <div className="bg-white border-4 border-slate-800 rounded-lg shadow-2xl relative overflow-hidden flex flex-col animate-[responsive-resize_10s_ease-in-out_infinite] h-[80%] sm:h-[220px]">
      {/* Fake Header */}
      <div className="h-6 sm:h-8 bg-orange-500 w-full flex items-center px-2 sm:px-3 justify-between shrink-0">
        <div className="h-1.5 sm:h-2 w-12 sm:w-16 bg-white/30 rounded"></div>
        <MenuIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </div>

      {/* Responsive Content Grid */}
      <div className="flex-1 p-2 sm:p-3 overflow-hidden bg-slate-50 flex flex-wrap gap-2 sm:gap-3 content-start">
        {/* Grid Item 1 */}
        <div className="flex-auto min-w-[80px] sm:min-w-[100px] h-[50px] sm:h-[60px] bg-white rounded shadow-sm border border-slate-200 p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 relative overflow-hidden group">
          <div className="h-1.5 sm:h-2 w-1/2 bg-slate-200 rounded"></div>
          <div className="h-6 sm:h-8 w-full bg-orange-100 rounded flex items-end">
            <div className="w-full bg-orange-400 rounded-b animate-[bar-grow_3s_ease-out_infinite]"></div>
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="flex-auto min-w-[80px] sm:min-w-[100px] h-[50px] sm:h-[60px] bg-white rounded shadow-sm border border-slate-200 p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 relative overflow-hidden">
          <div className="h-1.5 sm:h-2 w-2/3 bg-slate-200 rounded"></div>
          <div className="flex-1 flex gap-1 items-end">
            <div className="flex-1 bg-cyan-400 rounded-t h-[40%]"></div>
            <div className="flex-1 bg-cyan-400 rounded-t h-[70%]"></div>
            <div className="flex-1 bg-cyan-400 rounded-t h-[100%]"></div>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="flex-auto min-w-[80px] sm:min-w-[100px] h-[50px] sm:h-[60px] bg-white rounded shadow-sm border border-slate-200 p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2">
          <div className="h-1.5 sm:h-2 w-1/3 bg-slate-200 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-orange-400 border-t-transparent animate-spin"></div>
            <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Device Type Indicators (Fading based on width) */}
    <div className="absolute bottom-2 sm:bottom-4 flex gap-4 sm:gap-6 text-slate-500">
      <div className="flex flex-col items-center animate-[fade-desktop_10s_infinite]">
        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mb-1" />
        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-orange-400">
          DESKTOP
        </span>
      </div>
      <div className="flex flex-col items-center animate-[fade-tablet_10s_infinite]">
        <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mb-1" />
        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-cyan-400">
          TABLET
        </span>
      </div>
      <div className="flex flex-col items-center animate-[fade-mobile_10s_infinite]">
        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mb-1" />
        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-green-400">
          MOBILE
        </span>
      </div>
    </div>

    <style dangerouslySetInnerHTML={{
      __html: `
      @keyframes responsive-resize {
        0%, 15% { width: 85%; max-width: 380px; } /* Desktop width */
        30%, 60% { width: 55%; max-width: 240px; } /* Tablet width */
        75%, 90% { width: 35%; max-width: 140px; } /* Mobile width */
        100% { width: 85%; max-width: 380px; }
      }
      @keyframes fade-desktop { 0%, 15% { opacity: 1; transform: scale(1.1); } 20%, 100% { opacity: 0.3; transform: scale(1); } }
      @keyframes fade-tablet { 0%, 25% { opacity: 0.3; transform: scale(1); } 30%, 60% { opacity: 1; transform: scale(1.1); } 65%, 100% { opacity: 0.3; transform: scale(1); } }
      @keyframes fade-mobile { 0%, 70% { opacity: 0.3; transform: scale(1); } 75%, 90% { opacity: 1; transform: scale(1.1); } 95%, 100% { opacity: 0.3; transform: scale(1); } }
      @keyframes bar-grow { 0%, 20% { height: 10%; } 80%, 100% { height: 80%; } }
    `}} />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   Tab selector — maps tab index to the correct scene
   ══════════════════════════════════════════════════════════════ */
export const FlashToHTMLThumbForTab = ({
  tabIndex,
}: {
  tabIndex: number;
  accent: string;
}) => {
  switch (tabIndex) {
    case 0:
      return <BeforeAfterThumb />;
    case 1:
      return <ResponsiveHtmlThumb />;
    default:
      return <BeforeAfterThumb />;
  }
};
