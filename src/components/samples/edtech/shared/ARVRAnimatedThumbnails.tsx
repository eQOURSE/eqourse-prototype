import { useEffect, useRef, useState } from "react";
import { SCENES, init3DEngine } from "./ar_vr_engine";

/* ══════════════════════════════════════════════════════════════
   1. AR OVERLAY DEMOS — Canvas 2D
   ══════════════════════════════════════════════════════════════ */
export const AROverlayThumb = ({ accent }: { accent: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const scene = SCENES.ar;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        scene.resize({ w: rect.width, h: rect.height, dpr: window.devicePixelRatio || 1 });
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Interaction
    let pActive = false;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      scene.onPointer(x, y, true);
      pActive = true;
    };
    const onLeave = () => {
      scene.onPointer(0, 0, false);
      pActive = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const start = performance.now();
    const animate = () => {
      const t = performance.now() - start;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        ctx.clearRect(0, 0, rect.width, rect.height);
        scene.draw(t, ctx);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" style={{ borderRadius: '1rem' }} />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   2. VR ENVIRONMENT TOURS — Canvas 2D
   ══════════════════════════════════════════════════════════════ */
export const VREnvironmentThumb = ({ accent }: { accent: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const scene = SCENES.vr;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        scene.resize({ w: rect.width, h: rect.height, dpr: window.devicePixelRatio || 1 });
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Interaction
    let pActive = false;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      scene.onPointer(x, y, true);
      pActive = true;
    };
    const onLeave = () => {
      scene.onPointer(0, 0, false);
      pActive = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const start = performance.now();
    const animate = () => {
      const t = performance.now() - start;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        ctx.clearRect(0, 0, rect.width, rect.height);
        scene.draw(t, ctx);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-move" style={{ borderRadius: '1rem' }} />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   3. 360° EXPERIENCES — ThreeJS
   ══════════════════════════════════════════════════════════════ */
export const PanoramaThumb = ({ accent }: { accent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const engine = init3DEngine(containerRef.current);
    engine.switch3DScene('360');

    return () => {
      engine.cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2d2b38 0%, #1a1922 100%)", borderRadius: '1rem', overflow: 'hidden' }}>
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   4. INTERACTIVE 3D MODELS — ThreeJS
   ══════════════════════════════════════════════════════════════ */
export const Interactive3DModelThumb = ({ accent }: { accent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const engine = init3DEngine(containerRef.current);
    engine.switch3DScene('3d');

    return () => {
      engine.cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2d2b38 0%, #1a1922 100%)", borderRadius: '1rem', overflow: 'hidden' }}>
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SELECTOR COMPONENT
   ══════════════════════════════════════════════════════════════ */
export const ARVRAnimatedThumbForTab = ({ tabIndex, accent }: { tabIndex: number; accent: string }) => {
  switch (tabIndex) {
    case 0: return <AROverlayThumb accent={accent} />;
    case 1: return <VREnvironmentThumb accent={accent} />;
    case 2: return <PanoramaThumb accent={accent} />;
    case 3: return <Interactive3DModelThumb accent={accent} />;
    default: return <AROverlayThumb accent={accent} />;
  }
};
