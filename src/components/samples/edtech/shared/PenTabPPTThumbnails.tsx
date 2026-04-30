// ──────────────────────────────────────────────────────────────
// PenTabPPTThumbnails.tsx
// Animated SVG "motion thumbnails" for each Pen Tab & PPT tab.
// Ported from the standalone prototype.
// Warm amber accent to match page brand.
// ──────────────────────────────────────────────────────────────

import React from "react";

const PEN_AMBER = "#f59e0b";
const PEN_AMBER_LIGHT = "#fbbf24";
const PEN_INK = "#0f172a";

/* ══════════════════════════════════════════════════════════════
   Shared chrome wrapper — warm amber variant
   ══════════════════════════════════════════════════════════════ */
interface PTChromeProps {
  title: string;
  subtitle?: string;
  progress?: number;
  children: React.ReactNode;
}

const PTChrome = ({
  title,
  subtitle,
  progress = 0.42,
  children,
}: PTChromeProps) => (
  <div className="pt-frame">
    {/* top bar */}
    <div className="pt-frame-top">
      <div className="pt-frame-dots">
        <span className="pt-dot" style={{ background: "#fb7185" }} />
        <span className="pt-dot" style={{ background: "#fbbf24" }} />
        <span className="pt-dot" style={{ background: "#34d399" }} />
      </div>
      <div className="pt-frame-title">{title}</div>
      {subtitle && <div className="pt-frame-sub">· {subtitle}</div>}
      <div className="pt-frame-time">0:42 / 3:18</div>
    </div>

    {/* stage */}
    <div className="pt-frame-stage">{children}</div>

    {/* bottom bar */}
    <div className="pt-frame-bottom">
      <div className="pt-progress-track">
        <div
          className="pt-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="pt-progress-knob"
          style={{ left: `calc(${progress * 100}% - 6px)` }}
        />
      </div>
      <div className="pt-frame-play-btn">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   1. MATHEMATICS — Step-by-step equation, stroke-by-stroke
   ══════════════════════════════════════════════════════════════ */
export const MathThumb = () => {
  const T = 7;
  return (
    <PTChrome
      title="Linear Equations"
      subtitle="Mathematics · Pen Tab"
      progress={0.38}
    >
      <svg
        viewBox="0 0 480 240"
        className="pt-thumb-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pt-mt-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <pattern
            id="pt-mt-grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#fde68a"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="480" height="240" fill="url(#pt-mt-bg)" />
        <rect
          width="480"
          height="240"
          fill="url(#pt-mt-grid)"
          opacity="0.6"
        />

        {/* Slide title eyebrow */}
        <text
          x="60"
          y="58"
          fill="#92400e"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
        >
          STEP-BY-STEP · Solve for x
        </text>

        {/* Handwritten steps */}
        <g fontFamily="'Caveat', 'Bradley Hand', cursive" fill="#1f2937">
          {/* Step 1: 3x + 7 = 22 */}
          <text x="100" y="100" fontSize="32" fontWeight="600" opacity="0">
            3x + 7 = 22
            <animate
              attributeName="opacity"
              values="0;0;1;1;1;1"
              keyTimes="0;0.05;0.18;0.5;0.95;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>

          {/* Step 2: subtract 7 note */}
          <text x="270" y="100" fontSize="16" fill={PEN_AMBER} opacity="0">
            | −7
            <animate
              attributeName="opacity"
              values="0;0;1;1;1;1;0"
              keyTimes="0;0.25;0.32;0.55;0.95;0.99;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>

          {/* Step 3: 3x = 15 */}
          <text x="100" y="140" fontSize="28" fontWeight="600" opacity="0">
            3x = 15
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;1"
              keyTimes="0;0.32;0.42;0.5;0.95;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>

          {/* Step 4: divide note */}
          <text x="220" y="140" fontSize="16" fill={PEN_AMBER} opacity="0">
            | ÷ 3
            <animate
              attributeName="opacity"
              values="0;0;0;0;1;1;0"
              keyTimes="0;0.45;0.55;0.6;0.7;0.99;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>

          {/* Step 5: x = 5 (answer) */}
          <text
            x="100"
            y="180"
            fontSize="32"
            fontWeight="700"
            fill={PEN_AMBER}
            opacity="0"
          >
            x = 5
            <animate
              attributeName="opacity"
              values="0;0;0;0;0;1;1"
              keyTimes="0;0.55;0.65;0.7;0.75;0.85;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>
        </g>

        {/* Hand-drawn underline under step 1 */}
        <path
          d="M 100 108 Q 180 113 250 108"
          fill="none"
          stroke={PEN_AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="180"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="180;180;180;0;0;0;0"
            keyTimes="0;0.18;0.22;0.32;0.95;0.99;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Circle around final answer */}
        <ellipse
          cx="148"
          cy="172"
          rx="58"
          ry="20"
          fill="none"
          stroke={PEN_AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="260"
          strokeDashoffset="260"
          transform="rotate(-2 148 172)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="260;260;260;260;260;260;0"
            keyTimes="0;0.7;0.78;0.82;0.85;0.9;0.95"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Stylus / pen */}
        <g>
          <g transform="translate(0,0)">
            <rect
              x="-2"
              y="-50"
              width="4"
              height="50"
              rx="2"
              fill="#1f2937"
              transform="rotate(35)"
            />
            <rect
              x="-2"
              y="-58"
              width="4"
              height="10"
              rx="1"
              fill={PEN_AMBER}
              transform="rotate(35)"
            />
            <circle cx="0" cy="0" r="2.5" fill={PEN_AMBER} />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="100,100; 250,100; 250,100; 100,140; 200,140; 200,140; 100,180; 200,180; 100,172; 200,172; 200,172"
            keyTimes="0;0.18;0.32;0.4;0.5;0.6;0.7;0.8;0.85;0.92;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </g>

        {/* Step indicator pips */}
        <g transform="translate(360, 200)">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={i * 14} cy="0" r="3.5" fill={PEN_AMBER}>
              <animate
                attributeName="opacity"
                values={
                  i === 0
                    ? "0.3;1;1;1;1;1;1"
                    : i === 1
                    ? "0.3;0.3;0.3;1;1;1;1"
                    : i === 2
                    ? "0.3;0.3;0.3;0.3;1;1;1"
                    : "0.3;0.3;0.3;0.3;0.3;1;1"
                }
                keyTimes="0;0.15;0.3;0.45;0.6;0.85;1"
                dur={`${T}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </PTChrome>
  );
};

/* ══════════════════════════════════════════════════════════════
   2. SCIENCE — Water cycle diagram with animated arrows
   ══════════════════════════════════════════════════════════════ */
export const ScienceThumb = () => {
  const T = 7;
  return (
    <PTChrome
      title="The Water Cycle"
      subtitle="Science · Pen Tab + PPT"
      progress={0.55}
    >
      <svg
        viewBox="0 0 480 240"
        className="pt-thumb-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pt-sci-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <marker
            id="pt-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={PEN_AMBER} />
          </marker>
        </defs>
        <rect width="480" height="240" fill="url(#pt-sci-bg)" />

        {/* Slide eyebrow */}
        <text
          x="60"
          y="56"
          fill="#92400e"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
        >
          DIAGRAM · Water cycle stages
        </text>

        {/* Ground */}
        <path
          d="M 60 200 L 420 200 L 420 210 L 60 210 Z"
          fill="#92400e"
          opacity="0.18"
        />
        {/* Sea */}
        <path
          d="M 60 195 Q 130 192 200 195 L 200 210 L 60 210 Z"
          fill="#0891b2"
          opacity="0.55"
        />
        <path
          d="M 60 195 Q 130 192 200 195"
          fill="none"
          stroke="#0891b2"
          strokeWidth="1.5"
        />
        {/* Mountain */}
        <path
          d="M 240 200 L 320 130 L 400 200 Z"
          fill="#a16207"
          opacity="0.35"
        />
        <path
          d="M 290 165 L 320 130 L 350 165 L 340 175 L 320 158 L 300 175 Z"
          fill="#fef3c7"
        />

        {/* Sun */}
        <g transform="translate(110, 90)">
          <circle
            r="14"
            fill={PEN_AMBER_LIGHT}
            stroke={PEN_AMBER}
            strokeWidth="2"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1="0"
              y1="-22"
              x2="0"
              y2="-18"
              stroke={PEN_AMBER}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${a})`}
            />
          ))}
        </g>

        {/* Cloud */}
        <g
          transform="translate(280, 80)"
          fill="white"
          stroke="#fbbf24"
          strokeWidth="1.5"
        >
          <ellipse cx="0" cy="0" rx="22" ry="12" />
          <ellipse cx="-14" cy="4" rx="14" ry="10" />
          <ellipse cx="14" cy="4" rx="14" ry="10" />
        </g>

        {/* Evaporation arrow */}
        <path
          d="M 130 190 Q 200 130 260 90"
          fill="none"
          stroke={PEN_AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="180"
          markerEnd="url(#pt-arrow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="180;180;0;0;0;0"
            keyTimes="0;0.1;0.28;0.95;0.99;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Precipitation arrow */}
        <path
          d="M 295 95 Q 310 130 330 175"
          fill="none"
          stroke={PEN_AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="100"
          markerEnd="url(#pt-arrow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="100;100;100;100;0;0;0"
            keyTimes="0;0.4;0.5;0.55;0.7;0.95;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Runoff arrow */}
        <path
          d="M 320 200 Q 250 215 180 205"
          fill="none"
          stroke={PEN_AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="160"
          strokeDashoffset="160"
          markerEnd="url(#pt-arrow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="160;160;160;160;160;0;0"
            keyTimes="0;0.55;0.7;0.75;0.8;0.95;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Handwritten labels */}
        <g
          fontFamily="'Caveat', 'Bradley Hand', cursive"
          fill="#7c2d12"
          fontSize="14"
          fontWeight="600"
        >
          <text x="180" y="148" opacity="0">
            Evaporation
            <animate
              attributeName="opacity"
              values="0;0;1;1;1;1;1"
              keyTimes="0;0.25;0.32;0.5;0.95;0.99;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>
          <text x="332" y="125" opacity="0">
            Condensation
            <animate
              attributeName="opacity"
              values="0;0;0;0;1;1;1"
              keyTimes="0;0.45;0.55;0.6;0.7;0.95;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>
          <text x="220" y="228" opacity="0">
            Runoff
            <animate
              attributeName="opacity"
              values="0;0;0;0;0;1;1"
              keyTimes="0;0.7;0.78;0.82;0.85;0.9;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </text>
        </g>

        {/* Stylus dot following active stroke */}
        <g>
          <circle r="4" fill={PEN_AMBER} stroke="white" strokeWidth="1.5">
            <animate
              attributeName="opacity"
              values="1;1;1;0;1;1;0;1;1;0"
              keyTimes="0;0.27;0.28;0.32;0.56;0.69;0.72;0.92;0.95;1"
              dur={`${T}s`}
              repeatCount="indefinite"
            />
          </circle>
          <animateMotion
            dur={`${T}s`}
            repeatCount="indefinite"
            keyTimes="0;0.1;0.28;0.55;0.7;0.95;1"
            keyPoints="0;0;1;0;1;1;1"
            calcMode="linear"
            path="M 130 190 Q 200 130 260 90 L 295 95 Q 310 130 330 175 L 320 200 Q 250 215 180 205"
          />
        </g>
      </svg>
    </PTChrome>
  );
};

/* ══════════════════════════════════════════════════════════════
   3. LANGUAGE — Sentence breakdown with underlines & labels
   ══════════════════════════════════════════════════════════════ */
export const LanguageThumb = () => {
  const T = 7;
  const words = [
    {
      x1: 60,
      x2: 95,
      delay: 0.1,
      label: "article",
      lx: 60,
      color: "#9ca3af",
    },
    {
      x1: 105,
      x2: 165,
      delay: 0.25,
      label: "adjective",
      lx: 105,
      color: "#0d9488",
    },
    {
      x1: 175,
      x2: 215,
      delay: 0.4,
      label: "noun",
      lx: 175,
      color: "#dc2626",
    },
    {
      x1: 225,
      x2: 295,
      delay: 0.55,
      label: "verb",
      lx: 225,
      color: PEN_AMBER,
    },
    {
      x1: 305,
      x2: 365,
      delay: 0.7,
      label: "adverb",
      lx: 305,
      color: "#7c3aed",
    },
  ];

  return (
    <PTChrome
      title="Sentence Structure"
      subtitle="Language · Pen Tab"
      progress={0.62}
    >
      <svg
        viewBox="0 0 480 240"
        className="pt-thumb-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pt-lng-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        <rect width="480" height="240" fill="url(#pt-lng-bg)" />

        <text
          x="60"
          y="56"
          fill="#92400e"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
        >
          {"GRAMMAR · Identify each word's role"}
        </text>

        {/* Sentence */}
        <g fontFamily="Georgia, serif" fill="#1f2937" fontSize="22" fontWeight="500">
          <text x="60" y="115">The</text>
          <text x="105" y="115">quick</text>
          <text x="175" y="115">fox</text>
          <text x="225" y="115">jumps</text>
          <text x="305" y="115">high.</text>
        </g>

        {/* Underlines and labels */}
        {words.map((w, i) => {
          const len = w.x2 - w.x1;
          return (
            <g key={i}>
              <path
                d={`M ${w.x1} 122 Q ${(w.x1 + w.x2) / 2} 126 ${w.x2} 122`}
                fill="none"
                stroke={w.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={len + 4}
                strokeDashoffset={len + 4}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${len + 4};${len + 4};0;0;0`}
                  keyTimes={`0;${w.delay};${w.delay + 0.06};0.95;1`}
                  dur={`${T}s`}
                  repeatCount="indefinite"
                />
              </path>
              <text
                x={w.lx}
                y={138}
                fontFamily="'Caveat', 'Bradley Hand', cursive"
                fontSize="13"
                fill={w.color}
                fontWeight="600"
                opacity="0"
              >
                {w.label}
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;1"
                  keyTimes={`0;${w.delay + 0.04};${w.delay + 0.1};0.95;1`}
                  dur={`${T}s`}
                  repeatCount="indefinite"
                />
              </text>
            </g>
          );
        })}

        {/* Translation reveal box */}
        <g opacity="0">
          <rect
            x="60"
            y="166"
            width="360"
            height="34"
            rx="6"
            fill="white"
            stroke={PEN_AMBER}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x="76"
            y="180"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#92400e"
            letterSpacing="1.2"
          >
            TRANSLATION · ES
          </text>
          <text
            x="76"
            y="195"
            fontFamily="Georgia, serif"
            fontSize="13"
            fill="#1f2937"
          >
            El zorro veloz salta alto.
          </text>
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;1;1"
            keyTimes="0;0.7;0.78;0.82;0.85;0.9;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,8;0,8;0,8;0,8;0,8;0,0;0,0"
            keyTimes="0;0.7;0.78;0.82;0.85;0.9;1"
            dur={`${T}s`}
            repeatCount="indefinite"
          />
        </g>

        {/* Stylus following underlines */}
        <g>
          <rect
            x="-2"
            y="-44"
            width="4"
            height="44"
            rx="2"
            fill="#1f2937"
            transform="rotate(35)"
          />
          <rect
            x="-2"
            y="-52"
            width="4"
            height="10"
            rx="1"
            fill={PEN_AMBER}
            transform="rotate(35)"
          />
          <circle r="2.5" fill={PEN_AMBER} />
          <animateMotion
            dur={`${T}s`}
            repeatCount="indefinite"
            path="M 60 122 L 165 122 L 175 122 L 295 122 L 305 122 L 365 122"
          />
        </g>
      </svg>
    </PTChrome>
  );
};

/* ══════════════════════════════════════════════════════════════
   Tab selector — maps tab index to the correct scene
   ══════════════════════════════════════════════════════════════ */
export const PenTabPPTThumbForTab = ({
  tabIndex,
}: {
  tabIndex: number;
  accent: string;
}) => {
  switch (tabIndex) {
    case 0:
      return <MathThumb />;
    case 1:
      return <ScienceThumb />;
    case 2:
      return <LanguageThumb />;
    default:
      return <MathThumb />;
  }
};
