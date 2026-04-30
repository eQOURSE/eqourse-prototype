import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const hexAlpha = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/* ══════════════════════════════════════════════════════════════
   1. 2D CHARACTER ANIMATION — Lottie animation
   ══════════════════════════════════════════════════════════════ */
export const CharacterAnimationThumb = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1421, #1a2332)" }}>
    {/* Subtle radial glow behind the animation */}
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center 60%, ${hexAlpha(accent, 0.15)}, transparent 70%)`,
      }}
    />
    {/* Lottie animation — fills container */}
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <DotLottieReact
        src="/assets/lottie/2d-character.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
    {/* LIVE badge */}
    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      Live Preview
    </div>
    {/* Bottom label */}
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
      <div className="flex items-center justify-between text-[10px] text-white/50 font-mono uppercase tracking-wider">
        <span>▶ 2D Character Animation</span>
        <span>24fps · vector</span>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   2. 3D CONCEPT VIDEOS — rotating wireframe cube + orbiting nodes
   ══════════════════════════════════════════════════════════════ */
export const ThreeDConceptThumb = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0">
    {/* dark bg */}
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1421, #1a2332)" }} />
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }}>
      <div className="cube-scene" style={{ "--rot-speed": "10s" } as React.CSSProperties}>
        <div className="cube">
          {(["front","back","right","left","top","bottom"] as const).map(face => (
            <div key={face} className={`face ${face}`}
              style={{ borderColor: accent, background: `linear-gradient(135deg, ${accent}22, ${accent}05)` }}>
              <div className="face-grid">
                {[...Array(4)].map((_,i) => <div key={`h${i}`} className="grid-line h" style={{ background: `${accent}55`, top: `${(i+1)*20}%` }} />)}
                {[...Array(4)].map((_,i) => <div key={`v${i}`} className="grid-line v" style={{ background: `${accent}55`, left: `${(i+1)*20}%` }} />)}
              </div>
              <div className="face-dot" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <svg viewBox="0 0 480 270" className="absolute inset-0 w-full h-full pointer-events-none">
      {[0,1,2].map(i => (
        <g key={i} style={{ animation: `orbit ${6+i*2}s linear infinite`, transformOrigin: "240px 135px", animationDirection: i%2===0?"normal":"reverse" }}>
          <ellipse cx="240" cy="135" rx={130-i*15} ry={38-i*6} fill="none" stroke={accent} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx={240+(130-i*15)} cy="135" r="4" fill={accent} style={{ filter: `drop-shadow(0 0 6px ${accent})` }} />
        </g>
      ))}
      <text x="20" y="40" fontSize="10" fill={accent} opacity="0.6" fontFamily="monospace">[3D MODEL]</text>
      <text x="20" y="55" fontSize="9" fill="white" opacity="0.4" fontFamily="monospace">render: realtime</text>
      <text x="400" y="40" fontSize="10" fill={accent} opacity="0.6" fontFamily="monospace" textAnchor="end">▲ 60fps</text>
    </svg>
    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      Live 3D
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   3. MOTION GRAPHICS — Interactive Three.js cube grid
   ══════════════════════════════════════════════════════════════ */
export const MotionGraphicsThumb = ({ accent }: { accent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // cleanup previous
    if (cleanupRef.current) cleanupRef.current();

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const pinkLight = new THREE.PointLight(0xd94295, 2, 20);
    pinkLight.position.set(-5, -2, 4);
    scene.add(pinkLight);
    const tealLight = new THREE.PointLight(0x1abc9c, 2, 20);
    tealLight.position.set(5, 5, -4);
    scene.add(tealLight);

    // cube grid
    const gridGroup = new THREE.Group();
    gridGroup.rotation.x = Math.PI / 4;
    gridGroup.rotation.y = -Math.PI / 4;

    const cubes: { mesh: THREE.Mesh; x: number; z: number; mat: THREE.MeshStandardMaterial }[] = [];
    const gridSize = 7;
    const spacing = 0.8;
    const offset = (gridSize * spacing) / 2 - spacing / 2;
    const cubeGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const mat = new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 });
        const cube = new THREE.Mesh(cubeGeo, mat);
        const posX = x * spacing - offset;
        const posZ = z * spacing - offset;
        cube.position.set(posX, 0, posZ);
        gridGroup.add(cube);
        cubes.push({ mesh: cube, x: posX, z: posZ, mat });
      }
    }

    const mainGroup = new THREE.Group();
    mainGroup.add(gridGroup);
    scene.add(mainGroup);

    let mouseX = 0, mouseY = 0, time = 0;
    let animId = 0;
    let alive = true;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => { mouseX = 0; mouseY = 0; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const pinkColor = new THREE.Color(0xd94295);

    const animate = () => {
      if (!alive) return;
      animId = requestAnimationFrame(animate);
      time += 0.01;
      gridGroup.position.y = -1;
      mainGroup.position.y = Math.sin(time) * 0.2;

      const mappedX = mouseX * 5;
      const mappedY = -mouseY * 5;

      cubes.forEach(item => {
        const distC = Math.sqrt(item.x * item.x + item.z * item.z);
        let height = Math.sin(time * 3 - distC) * 0.5;
        const distM = Math.sqrt((item.x - mappedX) ** 2 + (item.z - mappedY) ** 2);
        height += Math.max(0, 2 - distM) * 1.5;
        item.mesh.position.y = height;
        const mix = Math.min(1, Math.max(0, (height + 0.5) / 2));
        item.mat.color.set(0x1abc9c).lerp(pinkColor, mix);
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container.clientWidth) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    cleanupRef.current = () => {
      alive = false;
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    initScene();
    return () => { if (cleanupRef.current) cleanupRef.current(); };
  }, [initScene]);

  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2d2b38, #1a1922)" }}>
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Live Interactive 3D
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/40 text-[10px] uppercase tracking-widest pointer-events-none z-10">
        Hover to interact • Auto-animating
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   4. WHITEBOARD ANIMATION — hand drawing a lightbulb
   ══════════════════════════════════════════════════════════════ */
export const WhiteboardAnimationThumb = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0">
    <svg viewBox="0 0 480 270" className="w-full h-full whiteboard-svg" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="480" height="270" fill="#fafaf7" />
      <g opacity="0.4">
        {[...Array(12)].map((_,i) => <line key={`gh${i}`} x1="0" y1={i*24} x2="480" y2={i*24} stroke="#d4d4d8" strokeWidth="0.5" />)}
        {[...Array(20)].map((_,i) => <line key={`gv${i}`} x1={i*24} y1="0" x2={i*24} y2="270" stroke="#d4d4d8" strokeWidth="0.5" />)}
      </g>
      <g fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ "--draw-speed": "4.5s" } as React.CSSProperties}>
        <path className="wb-stroke" style={{ "--len": 220, "--delay": "0s" } as React.CSSProperties} d="M215 95 Q195 95 185 115 Q178 135 195 155 Q200 162 200 175 L230 175 Q230 162 235 155 Q252 135 245 115 Q235 95 215 95Z" />
        <path className="wb-stroke" style={{ "--len": 70, "--delay": "1.0s" } as React.CSSProperties} d="M200 178 L230 178 M203 184 L227 184 M207 190 L223 190" />
        <path className="wb-stroke" style={{ "--len": 60, "--delay": "1.6s" } as React.CSSProperties} d="M208 130 L213 122 218 130 223 122 228 130" />
        <line className="wb-stroke" style={{ "--len": 16, "--delay": "2.0s" } as React.CSSProperties} x1="160" y1="120" x2="174" y2="125" />
        <line className="wb-stroke" style={{ "--len": 16, "--delay": "2.1s" } as React.CSSProperties} x1="155" y1="80" x2="170" y2="92" />
        <line className="wb-stroke" style={{ "--len": 16, "--delay": "2.2s" } as React.CSSProperties} x1="215" y1="60" x2="215" y2="80" />
        <line className="wb-stroke" style={{ "--len": 16, "--delay": "2.3s" } as React.CSSProperties} x1="275" y1="80" x2="260" y2="92" />
        <line className="wb-stroke" style={{ "--len": 16, "--delay": "2.4s" } as React.CSSProperties} x1="270" y1="120" x2="256" y2="125" />
        <path className="wb-stroke" style={{ "--len": 80, "--delay": "2.7s" } as React.CSSProperties} d="M290 140 Q320 130 350 145" />
        <path className="wb-stroke" style={{ "--len": 18, "--delay": "3.1s" } as React.CSSProperties} d="M348 140 L354 146 346 150" />
        <rect className="wb-stroke" style={{ "--len": 240, "--delay": "3.3s" } as React.CSSProperties} x="355" y="125" width="90" height="40" rx="4" />
      </g>
      <text x="400" y="151" textAnchor="middle" fontFamily="Caveat, 'Comic Sans MS', cursive" fontSize="20" fontWeight="700" fill={accent} style={{ opacity: 0, animation: "wbTextFade 4.5s ease-in-out infinite" }}>IDEA!</text>
      <g style={{ animation: "handMove 4.5s ease-in-out infinite" }}>
        <g transform="translate(240, 170)">
          <path d="M0 0 L-8 30-4 50 28 55 36 35 30 5Z" fill="#fcd9b9" stroke="#1f2937" strokeWidth="1.5" />
          <rect x="-2" y="-8" width="6" height="14" rx="1" fill={accent} />
          <line x1="-5" y1="-2" x2="-12" y2="-12" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-13" cy="-13" r="2" fill={accent} />
          <rect x="-5" y="50" width="36" height="6" fill="#1f2937" />
        </g>
      </g>
      <rect x="6" y="6" width="22" height="10" fill={accent} opacity="0.4" transform="rotate(-12 17 11)" />
      <rect x="452" y="254" width="22" height="10" fill={accent} opacity="0.4" transform="rotate(8 463 259)" />
    </svg>
  </div>
);
