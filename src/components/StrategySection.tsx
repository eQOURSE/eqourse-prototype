import { useEffect, useRef, useState } from "react";
import { Handshake, ClipboardList, FileText, MessageCircle, CheckSquare, Truck, Star, ArrowRight } from "lucide-react";

const steps = [
  { icon: Handshake, title: "Understand", desc: "We understand your requirement", color: "from-primary to-accent" },
  { icon: ClipboardList, title: "Plan", desc: "We plan to create best quality in optimised time", color: "from-accent to-primary" },
  { icon: FileText, title: "Develop", desc: "We develop content for you", color: "from-primary to-accent" },
  { icon: MessageCircle, title: "Communicate", desc: "We maintain strong communication", color: "from-accent to-primary" },
  { icon: CheckSquare, title: "Quality Check", desc: "We run multiple quality checks & modify accordingly", color: "from-primary to-accent" },
  { icon: Truck, title: "Deliver", desc: "We deliver project on time", color: "from-accent to-primary" },
  { icon: Star, title: "Feedback", desc: "We respect your feedback", color: "from-primary to-accent" },
];

const StrategySection = () => {
  const orbitRef = useRef<number>(0);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const animFrameRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const speed = 8; // degrees per second

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      orbitRef.current = (orbitRef.current + speed * dt) % 360;
      setOrbitAngle(orbitRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="py-24 bg-background overflow-hidden" id="strategy-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Approach</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Our <span className="text-gradient">Strategy</span>
          </h2>
        </div>

        {/* Circular flow layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: circular arrangement */}
          <div className="hidden lg:block relative" style={{ height: '560px' }}>
            
            {/* 3D Rotating Sphere - Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="strategy-sphere-wrapper">
                {/* Rotating 3D sphere shell */}
                <div className="strategy-sphere">
                  <div className="sphere-ring sphere-ring-1"></div>
                  <div className="sphere-ring sphere-ring-2"></div>
                  <div className="sphere-ring sphere-ring-3"></div>
                  <div className="sphere-ring sphere-ring-4"></div>
                  <div className="sphere-highlight"></div>
                </div>
                {/* Stable text overlay (does NOT rotate) */}
                <div className="strategy-sphere-text">
                  <span className="text-white font-heading font-extrabold text-lg block leading-tight">eQOURSE</span>
                  <span className="text-white/70 text-[10px] uppercase tracking-[0.2em]">Strategy</span>
                </div>
              </div>
            </div>

            {/* Dashed orbital ring - also rotates slowly */}
            <div
              className="absolute top-1/2 left-1/2 w-[460px] h-[460px] rounded-full border-2 border-dashed border-primary/15"
              style={{
                transform: `translate(-50%, -50%) rotate(${orbitAngle}deg)`,
              }}
            />

            {/* Orbiting step nodes */}
            {steps.map((step, i) => {
              const baseAngle = (i * 360) / steps.length - 90;
              const currentAngle = baseAngle + orbitAngle;
              const radius = 230;
              const rad = (currentAngle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={step.title}
                  className="absolute group"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'top, left',
                  }}
                >
                  {/* Node */}
                  <div className="flex flex-col items-center w-36">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(170_82%_32%/0.3)] transition-all duration-500 mb-3`}>
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-bold text-primary/50 font-mono mb-1">0{i + 1}</span>
                    <h4 className="font-heading font-bold text-sm text-foreground text-center">{step.title}</h4>
                    <p className="text-[11px] text-muted-foreground text-center mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5 group relative">
                {/* Vertical line */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-soft flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary/30 to-primary/10 my-2" />
                  )}
                  {i === steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary/30 to-accent/20 my-2 relative">
                      <ArrowRight className="w-4 h-4 text-primary absolute -bottom-1 -left-1.5 rotate-[-135deg]" />
                    </div>
                  )}
                </div>
                <div className="pt-3 pb-6">
                  <span className="text-xs font-bold text-primary/50 font-mono">Step 0{i + 1}</span>
                  <h4 className="font-heading font-bold text-foreground mt-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Continuous loop badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span className="text-sm font-medium text-foreground">
                <strong className="text-primary">Continuous Loop:</strong> Step 7 feeds back to Step 1 for ongoing improvement
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy section CSS */}
      <style>{`
        /* ===== 3D SPHERE ===== */
        .strategy-sphere-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .strategy-sphere {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at 35% 35%,
            hsl(165, 80%, 52%) 0%,
            hsl(170, 82%, 38%) 30%,
            hsl(170, 82%, 28%) 60%,
            hsl(172, 80%, 18%) 100%
          );
          box-shadow:
            inset -8px -8px 20px rgba(0, 0, 0, 0.35),
            inset 4px 4px 15px rgba(255, 255, 255, 0.12),
            0 0 50px hsl(170, 82%, 32%, 0.35),
            0 0 100px hsl(170, 82%, 32%, 0.15);
          overflow: hidden;
          animation: spherePulse 4s ease-in-out infinite;
        }

        /* Rotating rings on the sphere surface */
        .sphere-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
        }

        .sphere-ring-1 {
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          animation: sphereRotate1 6s linear infinite;
          transform-origin: center center;
        }

        .sphere-ring-2 {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-style: dashed;
          border-color: rgba(255, 255, 255, 0.08);
          animation: sphereRotate2 8s linear infinite;
        }

        .sphere-ring-3 {
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          animation: sphereRotate3 10s linear infinite;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .sphere-ring-4 {
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          animation: sphereRotate1 5s linear infinite reverse;
          border-color: rgba(255, 255, 255, 0.06);
          border-style: dotted;
        }

        .sphere-highlight {
          position: absolute;
          width: 40%;
          height: 40%;
          top: 12%;
          left: 18%;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 70%
          );
          filter: blur(3px);
        }

        /* Stable text on top of sphere */
        .strategy-sphere-text {
          position: relative;
          z-index: 5;
          text-align: center;
          pointer-events: none;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* ===== KEYFRAMES ===== */
        @keyframes sphereRotate1 {
          from { transform: rotateX(60deg) rotateZ(0deg); }
          to   { transform: rotateX(60deg) rotateZ(360deg); }
        }

        @keyframes sphereRotate2 {
          from { transform: rotateX(-30deg) rotateY(45deg) rotateZ(0deg); }
          to   { transform: rotateX(-30deg) rotateY(45deg) rotateZ(360deg); }
        }

        @keyframes sphereRotate3 {
          from { transform: rotateY(60deg) rotateZ(0deg); }
          to   { transform: rotateY(60deg) rotateZ(360deg); }
        }

        @keyframes spherePulse {
          0%, 100% {
            box-shadow:
              inset -8px -8px 20px rgba(0, 0, 0, 0.35),
              inset 4px 4px 15px rgba(255, 255, 255, 0.12),
              0 0 50px hsl(170, 82%, 32%, 0.35),
              0 0 100px hsl(170, 82%, 32%, 0.15);
          }
          50% {
            box-shadow:
              inset -8px -8px 20px rgba(0, 0, 0, 0.35),
              inset 4px 4px 15px rgba(255, 255, 255, 0.12),
              0 0 70px hsl(170, 82%, 32%, 0.45),
              0 0 120px hsl(170, 82%, 32%, 0.25);
          }
        }
      `}</style>
    </section>
  );
};

export default StrategySection;
