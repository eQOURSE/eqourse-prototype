import { useEffect, useRef } from "react";
import * as THREE from "three";

const glyphs = ["A", "अ", "文", "ع", "Ω", "가", "Ñ", "Б", "あ", "ไทย", "ש", "ß", "維", "क", "Å", "Ç"];

function makeGlyphSprite(glyph: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "rgba(247, 148, 29, 0.15)";
  context.beginPath();
  context.arc(64, 64, 52, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(247, 148, 29, 0.6)";
  context.lineWidth = 3;
  context.stroke();
  context.fillStyle = "#fff";
  context.font = "bold 48px Inter, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(glyph, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.95 }));
}

/** The orbit, glyph sprites, particles and animation are ported from motion_graphic_players.html. */
export default function MultilingualOrbitGraphic() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 14;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const orangeLight = new THREE.PointLight(0xf7941d, 2.5, 25);
    orangeLight.position.set(2, 3, 6);
    scene.add(orangeLight);
    const blueLight = new THREE.PointLight(0x38bdf8, 1.5, 20);
    blueLight.position.set(-4, -2, 4);
    scene.add(blueLight);

    const root = new THREE.Group();
    scene.add(root);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 3),
      new THREE.MeshPhongMaterial({ color: 0xf7941d, transparent: true, opacity: 0.25, shininess: 100 }),
    );
    root.add(core);
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 2),
      new THREE.MeshBasicMaterial({ color: 0xf7941d, wireframe: true, transparent: true, opacity: 0.55 }),
    );
    root.add(wire);

    const orbit = new THREE.Group();
    root.add(orbit);
    const sprites = glyphs.map((glyph, index) => {
      const sprite = makeGlyphSprite(glyph);
      const angle = (index / glyphs.length) * Math.PI * 2;
      const radius = 3.8 + (index % 3) * 0.6;
      const baseY = Math.sin(angle * 2.5 + index) * 1.5;
      sprite.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius);
      const scale = 0.85 + (index % 2) * 0.25;
      sprite.scale.set(scale, scale, 1);
      orbit.add(sprite);
      return { sprite, baseY };
    });

    const positions = new Float32Array(75 * 3);
    for (let index = 0; index < 75; index++) {
      const radius = 3.2 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xf7941d, size: 0.12, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }),
    );
    root.add(particles);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 3) * 0.05 + Math.sin(time * 7) * 0.03;
      core.scale.setScalar(pulse);
      wire.scale.setScalar(pulse * 1.02);
      wire.rotation.y = time * 0.25;
      wire.rotation.x = Math.sin(time * 0.5) * 0.2;
      orbit.rotation.y = -time * 0.28;
      orbit.rotation.z = Math.sin(time * 0.2) * 0.1;
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;
      sprites.forEach(({ sprite, baseY }, index) => { sprite.position.y = baseY + Math.sin(time * 2.5 + index) * 0.15; });
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Sprite) {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material instanceof THREE.SpriteMaterial) material.map?.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0 bg-[#0e1638]" aria-label="Animated multilingual characters orbiting a pulsing audio sphere" role="img" />;
}
