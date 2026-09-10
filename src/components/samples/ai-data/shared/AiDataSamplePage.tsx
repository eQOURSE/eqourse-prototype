import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Box, Check, CircleDot, Download, Eye, FileJson, Globe2, Radio, Rotate3d } from "lucide-react";
import AIDataServicesLayout from "@/components/ai-data-services/shared/AIDataServicesLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";
import ServiceCTA from "@/components/ai-data-services/shared/ServiceCTA";
import SampleShowcaseGrid from "./SampleShowcaseGrid";
import QualityMetrics from "./QualityMetrics";
import RelatedSamples from "./RelatedSamples";
import NotFound from "@/pages/NotFound";
import { getSampleBySlug } from "./aiDataSamplesData";
import type { SampleShowcase } from "./aiDataSamplesData";
import { PreviewFilesModal, type PreviewFile } from "../../shared/PreviewFilesModal";
import { fetchSampleFiles } from "@/lib/publicApi";

const roboticsAccent = "#0ab68b";
const perceptionObjects = [[-2, 0.8, -1, 1.8, 1.4, 4.2, "#0ab68b", "Vehicle 99%", 0.08, 0, 1], [-3, 0.9, 2, 0.6, 1.7, 0.6, "#ef4444", "Pedestrian 92%", 0.02, 1, 0], [5, 0.9, 5, 0.8, 1.6, 2, "#3b82f6", "Cyclist 85%", 0.05, -0.7, -0.7]] as const;

const RobotArmScene = () => {
  const arm = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);
  const gripper = useRef<THREE.Group>(null);
  const cursor = useRef<THREE.Mesh>(null);
  const waypointRefs = useRef<Array<THREE.Mesh | null>>([]);
  const trajectoryPoints = useMemo(() => {
    const root = new THREE.Group();
    const base = new THREE.Group();
    const swivel = new THREE.Group();
    const shoulderNode = new THREE.Group();
    const elbowNode = new THREE.Group();
    const wristNode = new THREE.Group();
    const gripperNode = new THREE.Group();
    root.add(base); base.add(swivel); swivel.add(shoulderNode); shoulderNode.add(elbowNode); elbowNode.add(wristNode); wristNode.add(gripperNode);
    swivel.position.y = 0.4; shoulderNode.position.y = 0.8; elbowNode.position.y = 3; wristNode.position.y = 2.5; gripperNode.position.y = 0.2;
    const points: THREE.Vector3[] = [];
    for (let index = 0; index <= 120; index += 1) {
      const t = (index / 120) * Math.PI * 2;
      swivel.rotation.y = Math.sin(t) * 1.5;
      shoulderNode.rotation.z = Math.cos(t) * 0.7 + 0.4;
      elbowNode.rotation.z = Math.sin(t + Math.PI / 4) * 0.9 - 0.5;
      wristNode.rotation.x = Math.sin(t * 2) * 0.5;
      root.updateMatrixWorld(true);
      const point = new THREE.Vector3(0, 0.4, 0);
      gripperNode.localToWorld(point);
      points.push(point.clone());
    }
    return points;
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (arm.current) arm.current.rotation.y = THREE.MathUtils.damp(arm.current.rotation.y, Math.sin(t * 0.7) * 0.5, 4, 0.016);
    if (shoulder.current) shoulder.current.rotation.z = THREE.MathUtils.damp(shoulder.current.rotation.z, Math.cos(t * 0.8) * 0.48 + 0.28, 5, 0.016);
    if (elbow.current) elbow.current.rotation.z = THREE.MathUtils.damp(elbow.current.rotation.z, Math.sin(t * 0.8 + 0.9) * 0.72 - 0.42, 5, 0.016);
    if (wrist.current) {
      wrist.current.rotation.x = THREE.MathUtils.damp(wrist.current.rotation.x, Math.sin(t * 1.6) * 0.42, 6, 0.016);
      wrist.current.rotation.z = THREE.MathUtils.damp(wrist.current.rotation.z, Math.cos(t * 0.8) * 0.2, 6, 0.016);
    }
    if (gripper.current) {
      const grip = 0.18 + (Math.sin(t * 1.6) + 1) * 0.035;
      gripper.current.children[1]?.position.set(-grip, 0.3, 0);
      gripper.current.children[2]?.position.set(grip, 0.3, 0);
    }
    const phase = (t * 0.09) % 1;
    if (cursor.current) {
      const point = trajectoryPoints[Math.floor(phase * (trajectoryPoints.length - 1))];
      cursor.current.position.copy(point);
      const pulse = 1 + Math.sin(t * 5) * 0.18;
      cursor.current.scale.setScalar(pulse);
    }
    waypointRefs.current.forEach((point, index) => {
      if (!point) return;
      const pulse = 1 + Math.sin(t * 3 + index * 1.4) * 0.22;
      point.scale.setScalar(pulse);
      const material = point.material as THREE.MeshBasicMaterial;
      material.opacity = 0.45 + (Math.sin(t * 3 + index * 1.4) + 1) * 0.16;
    });
  });
  return (
    <group ref={arm}>
      <mesh position={[0, 0.25, 0]} castShadow><cylinderGeometry args={[0.9, 1.1, 0.5, 32]} /><meshStandardMaterial color="#1f2937" metalness={0.35} roughness={0.6} /></mesh>
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow><cylinderGeometry args={[0.62, 0.62, 0.9, 32]} /><meshStandardMaterial color={roboticsAccent} metalness={0.45} roughness={0.35} /></mesh>
        <group ref={shoulder} position={[0, 0.9, 0]}>
          <mesh castShadow><sphereGeometry args={[0.48, 24, 16]} /><meshStandardMaterial color="#374151" /></mesh>
          <mesh position={[0, 1.45, 0]} castShadow><cylinderGeometry args={[0.28, 0.28, 2.8, 16]} /><meshStandardMaterial color="#e5e7eb" metalness={0.1} roughness={0.3} /></mesh>
          <group ref={elbow} position={[0, 2.9, 0]}>
            <mesh><sphereGeometry args={[0.38, 24, 16]} /><meshStandardMaterial color="#374151" /></mesh>
            <mesh position={[0, 1.1, 0]} castShadow><cylinderGeometry args={[0.22, 0.18, 2.2, 16]} /><meshStandardMaterial color="#d1d5db" /></mesh>
            <group ref={wrist} position={[0, 2.2, 0]}><mesh><sphereGeometry args={[0.28, 20, 12]} /><meshStandardMaterial color={roboticsAccent} emissive="#064d3d" /></mesh>
              <group ref={gripper} position={[0, 0.35, 0]}><mesh><boxGeometry args={[0.5, 0.2, 0.3]} /><meshStandardMaterial color="#1f2937" /></mesh><mesh position={[-0.18, 0.25, 0]}><boxGeometry args={[0.07, 0.45, 0.2]} /><meshStandardMaterial color={roboticsAccent} emissive="#064d3d" /></mesh><mesh position={[0.18, 0.25, 0]}><boxGeometry args={[0.07, 0.45, 0.2]} /><meshStandardMaterial color={roboticsAccent} emissive="#064d3d" /></mesh></group>
            </group>
          </group>
        </group>
      </group>
      <TrajectoryLine color="#0ab68b" points={trajectoryPoints} /><TrajectoryLine color="#ef4444" points={trajectoryPoints} noisy />
      {[0, 1, 2, 3].map((index) => {
        const point = trajectoryPoints[[10, 40, 70, 100][index]];
        return <group key={index} position={point.toArray()}><mesh ref={(node) => { waypointRefs.current[index] = node; }}><sphereGeometry args={[0.08, 16, 12]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.7} /></mesh><mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[0.12, 0.18, 20]} /><meshBasicMaterial color={roboticsAccent} side={THREE.DoubleSide} transparent opacity={0.75} /></mesh></group>;
      })}
      <mesh ref={cursor} position={trajectoryPoints[0].toArray()}><sphereGeometry args={[0.14, 20, 16]} /><meshBasicMaterial color="#f59e0b" /></mesh>
      <mesh position={[trajectoryPoints[40].x, 0.2, trajectoryPoints[40].z]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#f59e0b" emissive="#5b3500" roughness={0.25} /></mesh>
    </group>
  );
};

const TrajectoryLine = ({ color, points, noisy }: { color: string; points: THREE.Vector3[]; noisy?: boolean }) => {
  const displayPoints = useMemo(() => points.map((point, index) => noisy
    ? point.clone().add(new THREE.Vector3(Math.sin(index * 8) * 0.08, Math.cos(index * 6) * 0.08, Math.sin(index * 5) * 0.08))
    : point.clone()), [noisy, points]);
  return <line><bufferGeometry attach="geometry" onUpdate={(g) => g.setFromPoints(displayPoints)} /><lineBasicMaterial color={color} transparent opacity={noisy ? 0.35 : 0.9} /></line>;
};

const SensorScene = () => {
  const sensorPod = useRef<THREE.Mesh>(null);
  const scanPlane = useRef<THREE.Mesh>(null);
  const frustum = useRef<THREE.Mesh>(null);
  const pointCloud = useRef<THREE.Points>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const points = useMemo(() => Array.from({ length: 1700 }, () => {
    const side = Math.random();
    if (side < 0.6) return [(Math.random() - 0.5) * 30, 0, (Math.random() - 0.5) * 30];
    return [side < 0.8 ? 4 + Math.random() * 2 : -4 - Math.random() * 2, Math.random() * (side < 0.8 ? 4 : 3), (Math.random() - 0.5) * 30];
  }).flat(), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sensorPod.current) sensorPod.current.rotation.y = -t * 4;
    if (scanPlane.current) scanPlane.current.rotation.z = t * 4;
    if (frustum.current) (frustum.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + (Math.sin(t * 4) + 1) * 0.06;
    if (pointCloud.current) { pointCloud.current.position.z = (t * 0.8) % 30 - 15; }
    rings.current.forEach((ring, index) => {
      if (!ring) return;
      const scale = ((t * 2.5 + index * 2) % 8) + 1;
      ring.scale.setScalar(scale);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - (scale - 1) / 8) * 0.55;
    });
  });
  return <group><points ref={pointCloud}><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array(points), 3]} /></bufferGeometry><pointsMaterial vertexColors={false} color="#22c7b0" size={0.055} transparent opacity={0.72} /></points><mesh ref={scanPlane} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]}><planeGeometry args={[12, 0.05]} /><meshBasicMaterial color={roboticsAccent} transparent opacity={0.4} side={THREE.DoubleSide} /></mesh><group><mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1.2, 0.6, 2.4]} /><meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.6} /></mesh><mesh ref={sensorPod} position={[0, 1, 0.5]}><cylinderGeometry args={[0.25, 0.25, 0.4, 32]} /><meshStandardMaterial color={roboticsAccent} emissive="#055b45" /></mesh><mesh ref={frustum} rotation={[-Math.PI / 2, Math.PI / 4, 0]} position={[0, 0.8, -2.5]}><coneGeometry args={[3, 5, 4]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} /></mesh></group>{[0, 1, 2].map((index) => <mesh key={index} ref={(node) => { rings.current[index] = node; }} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}><ringGeometry args={[0.9, 1, 64]} /><meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.5} /></mesh>)}</group>;
};

const PerceptionScene = () => {
  const refs = useRef<Array<THREE.Group | null>>([]);
  const clouds = useMemo(() => perceptionObjects.map(([, , , w, h, d]) => Array.from({ length: 280 }, () => [(Math.random() - 0.5) * w, (Math.random() - 0.5) * h, (Math.random() - 0.5) * d]).flat()), []);
  useFrame(() => perceptionObjects.forEach(([, , , , , , , , speed, dirX, dirZ], index) => { const object = refs.current[index]; if (!object) return; object.position.x += dirX * speed; object.position.z += dirZ * speed; if (object.position.x > 12 || object.position.x < -12) object.position.x = -object.position.x; if (object.position.z > 12 || object.position.z < -12) object.position.z = -object.position.z; }));
  return <group>{perceptionObjects.map(([x, y, z, w, h, d, color, label], index) => <group key={label} ref={(node) => { refs.current[index] = node; }} position={[x, y, z]}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array(clouds[index]), 3]} /></bufferGeometry><pointsMaterial color={color} size={0.065} /></points><lineSegments><edgesGeometry args={[new THREE.BoxGeometry(w + 0.1, h + 0.1, d + 0.1)]} /><lineBasicMaterial color={color} /></lineSegments><Text position={[0, h / 2 + 0.42, 0]} fontSize={0.18} color={color} anchorX="center" anchorY="middle" outlineWidth={0.015} outlineColor="#0a0f1c">{label}</Text></group>)}</group>;
};

const RecoveryScene = () => {
  const platform = useRef<THREE.Group>(null);
  const payload = useRef<THREE.Mesh>(null);
  const joint = useRef<THREE.Mesh>(null);
  const [status, setStatus] = useState("STATE: NOMINAL");
  const state = useRef<0 | 1 | 2>(0);
  const stateTime = useRef(0);
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    stateTime.current += delta;
    if (state.current === 0) {
      if (platform.current) platform.current.rotation.z = Math.sin(elapsed * 1.5) * 0.03;
      if (payload.current) payload.current.position.x = THREE.MathUtils.damp(payload.current.position.x, 0, 4, delta);
      if (stateTime.current > 3) { state.current = 1; stateTime.current = 0; setStatus("EVENT: FAILURE DETECTED"); }
    } else if (state.current === 1) {
      if (platform.current) platform.current.rotation.z -= delta * 0.9;
      if (payload.current) payload.current.position.x -= delta * 1.8;
      if (stateTime.current > 1.2) { state.current = 2; stateTime.current = 0; setStatus("ACTION: RECOVERY POLICY"); }
    } else {
      if (platform.current) platform.current.rotation.z = THREE.MathUtils.lerp(platform.current.rotation.z, 0.35, delta * 5);
      if (payload.current) payload.current.position.x = THREE.MathUtils.damp(payload.current.position.x, 0, 2, delta);
      if (stateTime.current > 2.5) { state.current = 0; stateTime.current = 0; setStatus("STATE: NOMINAL"); }
    }
    const color = state.current === 0 ? roboticsAccent : state.current === 1 ? "#ef4444" : "#f59e0b";
    if (joint.current) (joint.current.material as THREE.MeshStandardMaterial).color.set(color);
    if (payload.current) (payload.current.material as THREE.MeshStandardMaterial).color.set(color);
  });
  return <group><mesh position={[0, 1, 0]} castShadow><cylinderGeometry args={[0.5, 0.8, 2, 32]} /><meshStandardMaterial color="#1f2937" roughness={0.8} /></mesh><mesh ref={joint} position={[0, 2, 0]}><sphereGeometry args={[0.6, 32, 16]} /><meshStandardMaterial color={roboticsAccent} /></mesh><group ref={platform} position={[0, 2, 0]}><mesh castShadow><boxGeometry args={[6, 0.15, 2]} /><meshStandardMaterial color="#374151" metalness={0.4} /></mesh><mesh ref={payload} position={[0, 0.575, 0]} castShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={roboticsAccent} roughness={0.2} /></mesh></group><Html position={[0, 4.3, 0]} center><div className="whitespace-nowrap rounded-full border-2 border-primary/70 bg-[#0a0f1c]/90 px-5 py-2 font-mono text-[10px] font-bold tracking-widest text-primary shadow-lg">{status}</div></Html></group>;
};

const RoboticsCanvas = ({ active }: { active: number }) => <div className="absolute inset-0"><Canvas camera={{ position: [4, 3.7, 7], fov: 45 }} shadows dpr={[1, 1.5]}><color attach="background" args={["#0d1117"]} /><fog attach="fog" args={["#0d1117", 7, 18]} /><ambientLight intensity={0.55} /><directionalLight position={[5, 8, 5]} intensity={1} castShadow /><spotLight position={[0, 7, 0]} color={roboticsAccent} intensity={3} angle={0.5} /><gridHelper args={[20, 20, 0x0ab68b, 0x222222]} position={[0, -0.02, 0]} /><group position={[0, -1.35, 0]}>{active === 0 ? <RobotArmScene /> : active === 1 ? <SensorScene /> : active === 2 ? <PerceptionScene /> : <RecoveryScene />}</group><OrbitControls enableDamping dampingFactor={0.06} autoRotate autoRotateSpeed={0.65} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} /></Canvas><div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center"><span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur-sm"><Rotate3d className="h-3.5 w-3.5" /> Click & drag to interact</span></div></div>;

const RoboticsShowcase = ({ showcases }: { showcases: SampleShowcase[] }) => {
  const [active, setActive] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [apiFiles, setApiFiles] = useState<PreviewFile[] | null>(null);
  const current = showcases[active];
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % showcases.length), 5200); return () => window.clearInterval(timer); }, [showcases.length]);
  useEffect(() => {
    let mounted = true;
    setApiFiles(null);
    void fetchSampleFiles("robotics-samples", current.title).then((files) => { if (mounted) setApiFiles(files); });
    return () => { mounted = false; };
  }, [current.title]);
  const previewFiles = apiFiles && apiFiles.length > 0 ? apiFiles : Array.from({ length: 4 }, (_, index) => ({
    title: `${current.title} - File ${index + 1}`,
    description: "A representative robotics sample with associated metadata and QA provenance.",
    fileType: index === 0 ? "JSONL" : "PDF",
    fileUrl: "#",
    isExternal: false,
  }));
  const icons = [<CircleDot className="h-4 w-4" />, <Radio className="h-4 w-4" />, <Box className="h-4 w-4" />, <Check className="h-4 w-4" />];
  return <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20 md:py-24"><div className="container relative z-10 mx-auto px-4"><div className="mx-auto mb-12 max-w-3xl text-center"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /><span className="text-xs font-bold uppercase tracking-widest text-primary">Live 3D Sample Preview</span></div><h2 className="mb-4 font-heading text-3xl font-extrabold text-foreground md:text-5xl">Robotics Sample Showcase</h2><p className="text-base leading-relaxed text-muted-foreground md:text-lg">Representative outputs across demonstrations, synchronized sensor streams, 3D perception labels, and failure-recovery episodes.</p></div><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[380px_1fr] lg:gap-8"><div className="flex flex-col gap-2">{showcases.map((item, index) => <button key={item.title} onClick={() => setActive(index)} className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all md:p-5 ${active === index ? "bg-gradient-primary text-primary-foreground shadow-soft" : "border-border/60 bg-card hover:border-primary/40"}`}><div className="flex items-center gap-3"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active === index ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>{icons[index]}</span><span><span className={`block text-sm font-bold leading-tight md:text-base ${active === index ? "text-white" : "text-foreground"}`}>{item.title}</span><span className={`mt-1 block text-xs ${active === index ? "text-white/75" : "text-muted-foreground"}`}>{item.format}</span></span></div>{active === index && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/60" />}</button>)}</div><div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-card md:p-8"><div className="relative z-10 flex flex-1 flex-col"><div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="min-w-0 flex-1"><div className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary"><span className="h-px w-6 bg-primary" /> Sample {active + 1} of {showcases.length}</div><h3 className="mb-2 font-heading text-2xl font-extrabold leading-tight text-foreground md:text-3xl">{current.title}</h3><p className="text-sm leading-relaxed text-muted-foreground md:text-base">{current.teaser}</p></div><div className="flex shrink-0 flex-col items-start gap-2 sm:items-end"><span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-foreground"><FileJson className="h-3.5 w-3.5 text-primary" />{current.format}</span><span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1.5 text-[11px] font-medium text-foreground"><Globe2 className="h-3.5 w-3.5 text-accent-foreground" />{current.languages}</span></div></div><div className="relative mb-6 h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl md:h-[360px]"><div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#161b22]/90 px-3.5 py-2.5"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" /></div><span className="font-mono text-[10px] tracking-wide text-slate-400">interactive · {current.id}.live</span><span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest text-emerald-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE 3D</span></div><RoboticsCanvas active={active} /></div><div className="mt-auto flex flex-col gap-3 sm:flex-row"><button onClick={() => setShowPreview(true)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02]"><Eye className="h-4 w-4" />Preview Files</button><Link to="/contact-us" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-muted"><Download className="h-4 w-4" />Request Full Set</Link></div><div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 border-t border-dashed border-border/60 pt-5">{current.qa?.map((q) => <span key={q.label} className="inline-flex items-center gap-2 text-xs text-muted-foreground"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">✓</span><span className="font-semibold text-foreground">{q.label}</span><span>- {q.detail}</span></span>)}</div><details className="group/details mt-5 cursor-pointer"><summary className="flex list-none items-center gap-1.5 text-sm font-bold text-primary">More about this sample</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.description}</p></details></div></div></div></div><PreviewFilesModal isOpen={showPreview} onClose={() => setShowPreview(false)} files={previewFiles} tabName={current.title} accentHsl="165 86% 38%" /></section>;
};

const AiDataSamplePage = () => {
  const { slug } = useParams();
  const sample = getSampleBySlug(slug || "");

  if (!sample) return <NotFound />;

  return (
    <AIDataServicesLayout
      breadcrumbs={[
        { label: "Samples", href: "/samples" },
        { label: "AI Data Samples", href: "/samples#ai-data" },
        { label: sample.navLabel },
      ]}
    >
      <SEOHead
        title={sample.seoTitle}
        description={sample.seoDescription}
        canonical={`https://www.eqourse.com${sample.path}`}
        keywords={sample.keywords}
      />


      {sample.slug === "robotics-samples" ? (
        <RoboticsShowcase showcases={sample.showcases} />
      ) : (
        <SampleShowcaseGrid showcases={sample.showcases} categorySlug={sample.slug} />
      )}

      <QualityMetrics metrics={sample.metrics} />

      <RelatedSamples currentSlug={sample.slug} />

      <ServiceCTA
        headline="Ready to See Our Quality on Your Data?"
        subtext="Request a free pilot dataset tailored to your use case, modality, and language requirements. No commitment required."
        ctaText="Request Free Pilot Dataset"
      />
    </AIDataServicesLayout>
  );
};

export default AiDataSamplePage;
