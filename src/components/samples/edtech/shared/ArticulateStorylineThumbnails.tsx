// ──────────────────────────────────────────────────────────────
// ArticulateStorylineThumbnails.tsx
// Animated SVG "motion thumbnails" for each Articulate Storyline tab.
// Ported from the standalone prototype in webisite-element.
// ──────────────────────────────────────────────────────────────

import React from "react";

const TEAL = "#14b8a6";
const TEAL_DARK = "#0d9488";
const TEAL_LIGHT = "#5eead4";
const INK = "#0f172a";
const INK_2 = "#1e293b";

/* ══════════════════════════════════════════════════════════════
   Shared chrome wrapper — browser-style frame with dots + progress
   ══════════════════════════════════════════════════════════════ */
interface ModuleChromeProps {
  title: string;
  subtitle?: string;
  progress?: number;
  children: React.ReactNode;
}

const ModuleChrome = ({
  title,
  subtitle,
  progress = 0.42,
  children,
}: ModuleChromeProps) => (
  <div className="as-frame">
    {/* top bar */}
    <div className="as-frame-top">
      <div className="as-frame-dots">
        <span className="as-dot" style={{ background: "#fb7185" }} />
        <span className="as-dot" style={{ background: "#fbbf24" }} />
        <span className="as-dot" style={{ background: "#34d399" }} />
      </div>
      <div className="as-frame-title">{title}</div>
      {subtitle && <div className="as-frame-sub">· {subtitle}</div>}
      <div className="as-frame-time">0:14 / 2:45</div>
    </div>

    {/* stage */}
    <div className="as-frame-stage">{children}</div>

    {/* bottom bar */}
    <div className="as-frame-bottom">
      <div className="as-progress-track">
        <div
          className="as-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="as-progress-knob"
          style={{ left: `calc(${progress * 100}% - 6px)` }}
        />
      </div>
      <div className="as-frame-play-btn">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   1. Interactive Modules — Drag & Drop cell biology
   ══════════════════════════════════════════════════════════════ */
export const InteractiveModulesThumb = () => (
  <ModuleChrome
    title="Cell Biology"
    subtitle="Interactive Module"
    progress={0.42}
  >
    <svg
      viewBox="0 0 480 240"
      className="as-thumb-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="as-im-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b1e2c" />
          <stop offset="100%" stopColor="#0f3a3a" />
        </linearGradient>
        <linearGradient id="as-im-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="480" height="240" fill="url(#as-im-bg)" />

      {/* faint grid */}
      <g opacity="0.06" stroke="#7dd3fc" strokeWidth="0.5">
        {[...Array(12)].map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="36" x2={i * 40} y2="210" />
        ))}
        {[...Array(5)].map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={50 + i * 40}
            x2="480"
            y2={50 + i * 40}
          />
        ))}
      </g>

      {/* Prompt */}
      <text
        x="60"
        y="56"
        fill="#bae6fd"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.3"
      >
        DRAG &amp; DROP · Match each organelle to its function
      </text>

      {/* Drop slots */}
      {[
        { y: 78, label: "Energy production" },
        { y: 124, label: "Protein synthesis" },
        { y: 170, label: "Waste filtering" },
      ].map((s, i) => (
        <g key={i}>
          <rect
            x="260"
            y={s.y}
            width="160"
            height="34"
            rx="6"
            fill="rgba(125,211,252,0.06)"
            stroke="#7dd3fc"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="272"
            y={s.y + 21}
            fill="#bae6fd"
            fontFamily="Inter, sans-serif"
            fontSize="10"
          >
            {s.label}
          </text>
          <circle cx="406" cy={s.y + 17} r="4" fill={TEAL_LIGHT}>
            <animate
              attributeName="r"
              values="4;7;4"
              dur="1.6s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.6s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Source tiles with drag animation */}
      <g transform="translate(60, 78)">
        <g>
          <rect width="110" height="34" rx="6" fill="url(#as-im-tile)" />
          <text
            x="55"
            y="21"
            textAnchor="middle"
            fill="white"
            fontFamily="Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
          >
            Mitochondria
          </text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,0; 200,0; 200,0; 0,0"
            keyTimes="0;0.15;0.35;0.85;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      <g transform="translate(60, 124)">
        <g>
          <rect width="110" height="34" rx="6" fill="url(#as-im-tile)" />
          <text
            x="55"
            y="21"
            textAnchor="middle"
            fill="white"
            fontFamily="Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
          >
            Ribosome
          </text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,0; 0,0; 200,0; 200,0; 0,0"
            keyTimes="0;0.35;0.45;0.65;0.9;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      <g transform="translate(60, 170)">
        <g>
          <rect width="110" height="34" rx="6" fill="url(#as-im-tile)" />
          <text
            x="55"
            y="21"
            textAnchor="middle"
            fill="white"
            fontFamily="Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
          >
            Lysosome
          </text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,0; 0,0; 0,0; 200,0; 200,0; 0,0"
            keyTimes="0;0.55;0.7;0.75;0.85;0.95;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </g>

      {/* Animated cursor */}
      <g>
        <path
          d="M0,0 L0,14 L4,11 L7,17 L9,16 L6,11 L11,11 Z"
          fill="white"
          stroke={INK}
          strokeWidth="0.8"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="115,90; 115,90; 315,90; 315,136; 115,136; 115,136; 315,136; 315,182; 115,182; 115,182; 315,182; 115,90"
          keyTimes="0;0.05;0.18;0.3;0.38;0.42;0.55;0.68;0.78;0.82;0.95;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </ModuleChrome>
);

/* ══════════════════════════════════════════════════════════════
   2. Branching Scenarios — Decision tree
   ══════════════════════════════════════════════════════════════ */
export const BranchingScenariosThumb = () => (
  <ModuleChrome
    title="Customer Service"
    subtitle="Branching Scenario"
    progress={0.58}
  >
    <svg
      viewBox="0 0 480 240"
      className="as-thumb-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="as-bs-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1f2a" />
          <stop offset="100%" stopColor="#0c2d3a" />
        </linearGradient>
        <radialGradient id="as-bs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={TEAL_LIGHT} stopOpacity="1" />
          <stop offset="100%" stopColor={TEAL_LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="240" fill="url(#as-bs-bg)" />

      <text
        x="60"
        y="56"
        fill="#bae6fd"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.3"
      >
        DECISION PATH · Choices shape the outcome
      </text>

      {/* Tree paths */}
      <g fill="none" stroke="#1e4a5a" strokeWidth="1.5">
        <path d="M 60,140 L 160,140" />
        <path d="M 160,140 L 240,100" />
        <path d="M 160,140 L 240,180" />
        <path d="M 240,100 L 350,80" />
        <path d="M 240,100 L 350,120" />
        <path d="M 240,180 L 350,160" />
        <path d="M 240,180 L 350,200" />
        <path d="M 350,80 L 430,80" />
        <path d="M 350,120 L 430,120" />
        <path d="M 350,160 L 430,160" />
        <path d="M 350,200 L 430,200" />
      </g>

      {/* Animated active path */}
      <path
        d="M 60,140 L 160,140 L 240,100 L 350,80 L 430,80"
        fill="none"
        stroke={TEAL_LIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="400"
        strokeDashoffset="400"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="400;0;0;400"
          keyTimes="0;0.5;0.85;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Nodes */}
      {[
        { x: 60, y: 140, label: "Start", kind: "start" },
        { x: 160, y: 140, label: "Greet", kind: "choice" },
        { x: 240, y: 100, label: "Empathize", kind: "pos" },
        { x: 240, y: 180, label: "Deflect", kind: "neg" },
        { x: 350, y: 80, label: "Solve", kind: "pos" },
        { x: 350, y: 120, label: "Escalate", kind: "mid" },
        { x: 350, y: 160, label: "Wait", kind: "mid" },
        { x: 350, y: 200, label: "End call", kind: "neg" },
        { x: 430, y: 80, label: "Win", kind: "win" },
        { x: 430, y: 120, label: "", kind: "mid" },
        { x: 430, y: 160, label: "", kind: "mid" },
        { x: 430, y: 200, label: "", kind: "neg" },
      ].map((n, i) => {
        const color =
          n.kind === "win"
            ? "#34d399"
            : n.kind === "pos"
            ? TEAL_LIGHT
            : n.kind === "neg"
            ? "#fb7185"
            : n.kind === "start"
            ? "#fbbf24"
            : "#94a3b8";
        const labelAbove =
          n.y < 140 || n.kind === "start" || n.kind === "choice";
        return (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="5.5"
              fill={INK_2}
              stroke={color}
              strokeWidth="1.5"
            />
            {n.label && (
              <text
                x={n.x}
                y={labelAbove ? n.y - 10 : n.y + 18}
                textAnchor="middle"
                fill="#cbd5e1"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                fontWeight="500"
              >
                {n.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Animated glowing dot along the path */}
      <g>
        <circle r="14" fill="url(#as-bs-glow)" />
        <circle r="4" fill={TEAL_LIGHT} stroke="white" strokeWidth="1" />
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          keyTimes="0;0.2;0.45;0.55;0.78;0.85;1"
          keyPoints="0;0.25;0.5;0.5;0.95;1;0"
          calcMode="linear"
          path="M 60,140 L 160,140 L 240,100 L 350,80 L 430,80"
        />
      </g>
    </svg>
  </ModuleChrome>
);

/* ══════════════════════════════════════════════════════════════
   3. Quizzes & Assessments — Live MCQ
   ══════════════════════════════════════════════════════════════ */
export const QuizzesAssessmentsThumb = () => (
  <ModuleChrome
    title="Algebra Fundamentals"
    subtitle="Quiz"
    progress={0.66}
  >
    <svg
      viewBox="0 0 480 240"
      className="as-thumb-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="as-qz-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c1d2a" />
          <stop offset="100%" stopColor="#0a3030" />
        </linearGradient>
      </defs>
      <rect width="480" height="240" fill="url(#as-qz-bg)" />

      {/* Question counter */}
      <text
        x="60"
        y="58"
        fill="#bae6fd"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="600"
        letterSpacing="1.2"
      >
        QUESTION 4 OF 6
      </text>
      <text
        x="420"
        y="58"
        textAnchor="end"
        fill="#7dd3fc"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="600"
        letterSpacing="1.2"
      >
        SCORE
      </text>

      {/* Score bar */}
      <rect
        x="60"
        y="64"
        width="360"
        height="4"
        rx="2"
        fill="rgba(125,211,252,0.15)"
      />
      <rect x="60" y="64" height="4" rx="2" fill={TEAL_LIGHT}>
        <animate
          attributeName="width"
          values="180;180;240;240;300;300;180"
          keyTimes="0;0.45;0.55;0.85;0.92;0.97;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Question card */}
      <g transform="translate(60, 80)">
        <rect
          width="360"
          height="124"
          rx="8"
          fill="rgba(15,23,42,0.7)"
          stroke="rgba(125,211,252,0.15)"
        />
        <text
          x="20"
          y="24"
          fill="#f1f5f9"
          fontFamily="Inter, sans-serif"
          fontSize="12"
          fontWeight="600"
        >
          If 3x + 7 = 22, what is the value of x?
        </text>

        {[
          { y: 38, label: "A.  x = 3", correct: false },
          { y: 64, label: "B.  x = 5", correct: true },
          { y: 90, label: "C.  x = 7", correct: false },
        ].map((o, i) => (
          <g key={i}>
            {/* Base option */}
            <rect
              x="20"
              y={o.y}
              width="320"
              height="22"
              rx="5"
              fill="rgba(30,41,59,0.6)"
              stroke="#334155"
              strokeWidth="1"
            />
            {/* Highlight overlay */}
            <rect
              x="20"
              y={o.y}
              width="320"
              height="22"
              rx="5"
              fill={
                o.correct
                  ? "rgba(52,211,153,0.18)"
                  : "rgba(125,211,252,0.12)"
              }
              stroke={o.correct ? "#34d399" : TEAL_LIGHT}
              strokeWidth="1.5"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values={
                  o.correct ? "0;0;0;0;1;1;0" : "0;0;0;0;0;0;0"
                }
                keyTimes="0;0.2;0.4;0.55;0.6;0.95;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Hover effect */}
            <rect
              x="20"
              y={o.y}
              width="320"
              height="22"
              rx="5"
              fill="none"
              stroke={TEAL_LIGHT}
              strokeWidth="1.5"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values={
                  i === 0
                    ? "0;1;1;0;0;0;0"
                    : i === 1
                    ? "0;0;0;1;0;0;0"
                    : "0;0;0;0;0;0;0"
                }
                keyTimes="0;0.1;0.2;0.4;0.55;0.95;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </rect>

            <text
              x="34"
              y={o.y + 15}
              fill="#e2e8f0"
              fontFamily="Inter, sans-serif"
              fontSize="10.5"
              fontWeight="500"
            >
              {o.label}
            </text>

            {/* Correct checkmark */}
            {o.correct && (
              <g opacity="0">
                <circle cx="324" cy={o.y + 11} r="8" fill="#34d399" />
                <path
                  d={`M 320,${o.y + 11} l 3,3 l 6,-6`}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;1;1;0"
                  keyTimes="0;0.2;0.4;0.58;0.62;0.95;1"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Animated cursor */}
      <g>
        <path
          d="M0,0 L0,14 L4,11 L7,17 L9,16 L6,11 L11,11 Z"
          fill="white"
          stroke={INK}
          strokeWidth="0.8"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="200,180; 110,128; 110,154; 110,154; 200,154; 200,154; 200,180"
          keyTimes="0;0.15;0.35;0.5;0.55;0.95;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </ModuleChrome>
);

/* ══════════════════════════════════════════════════════════════
   Tab selector — maps tab index to the correct scene
   ══════════════════════════════════════════════════════════════ */
export const ArticulateStorylineThumbForTab = ({
  tabIndex,
}: {
  tabIndex: number;
  accent: string;
}) => {
  switch (tabIndex) {
    case 0:
      return <InteractiveModulesThumb />;
    case 1:
      return <BranchingScenariosThumb />;
    case 2:
      return <QuizzesAssessmentsThumb />;
    default:
      return <InteractiveModulesThumb />;
  }
};
