import { useEffect, useState } from "react";

const pipelineNodes = [
  { label: "Collect", icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M1 4h22M9 1h6" },
  { label: "Annotate", icon: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" },
  { label: "Clean", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" },
  { label: "Test", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
];

const PipelineHero = () => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % pipelineNodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />

      <svg viewBox="0 0 400 300" className="w-full h-auto relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        <path
          d="M80 150 L170 80 L300 80 L330 150 L300 220 L170 220 Z"
          stroke="hsl(170 82% 45%)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.3"
          className="animate-dash-flow"
        />

        {/* Flow arrows along the path */}
        {[0, 1, 2, 3].map((i) => {
          const positions = [
            { x: 125, y: 115 },
            { x: 235, y: 80 },
            { x: 315, y: 150 },
            { x: 235, y: 220 },
          ];
          return (
            <circle
              key={i}
              cx={positions[i].x}
              cy={positions[i].y}
              r="3"
              fill="hsl(170 82% 50%)"
              opacity={activeNode === i ? 1 : 0.2}
              className="transition-opacity duration-500"
            />
          );
        })}

        {/* Pipeline nodes */}
        {pipelineNodes.map((node, i) => {
          const positions = [
            { x: 80, y: 150 },
            { x: 170, y: 70 },
            { x: 300, y: 70 },
            { x: 330, y: 150 },
          ];
          const isActive = activeNode === i;
          return (
            <g key={i}>
              {/* Pulse ring */}
              {isActive && (
                <circle
                  cx={positions[i].x}
                  cy={positions[i].y}
                  r="32"
                  stroke="hsl(170 82% 50%)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                  style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
                />
              )}
              {/* Node circle */}
              <circle
                cx={positions[i].x}
                cy={positions[i].y}
                r="28"
                fill={isActive ? "hsl(170 82% 32% / 0.3)" : "hsl(242 33% 20% / 0.5)"}
                stroke={isActive ? "hsl(170 82% 50%)" : "hsl(170 82% 40% / 0.3)"}
                strokeWidth={isActive ? "2" : "1"}
                className="transition-all duration-500"
              />
              {/* Icon */}
              <g transform={`translate(${positions[i].x - 10}, ${positions[i].y - 10}) scale(0.83)`}>
                <path
                  d={node.icon}
                  stroke={isActive ? "hsl(165 75% 71%)" : "hsl(170 82% 50% / 0.5)"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="transition-colors duration-500"
                />
              </g>
              {/* Label */}
              <text
                x={positions[i].x}
                y={positions[i].y + 48}
                textAnchor="middle"
                fill={isActive ? "hsl(165 75% 71%)" : "hsl(0 0% 100% / 0.5)"}
                fontSize="13"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
                className="transition-colors duration-500"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Closed-loop arrow (bottom) */}
        <path
          d="M300 230 Q235 260 170 230"
          stroke="hsl(170 82% 45%)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.25"
          strokeDasharray="4 4"
          className="animate-dash-flow"
        />
        <text x="235" y="258" textAnchor="middle" fill="hsl(165 75% 71%)" fontSize="10" fontWeight="500" opacity="0.5">
          Closed-Loop Feedback
        </text>
      </svg>
    </div>
  );
};

export default PipelineHero;
