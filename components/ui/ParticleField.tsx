"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 320;

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { size } = useThree();

  const { positions, colors, originalY } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalY = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalY[i] = y;

      // violet / cyan / white 믹스
      const r = Math.random();
      if (r < 0.45) {
        // violet
        colors[i * 3] = 0.48;
        colors[i * 3 + 1] = 0.23;
        colors[i * 3 + 2] = 0.93;
      } else if (r < 0.75) {
        // cyan
        colors[i * 3] = 0.02;
        colors[i * 3 + 1] = 0.71;
        colors[i * 3 + 2] = 0.83;
      } else {
        // white (dim)
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.65;
      }
    }
    return { positions, colors, originalY };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / size.width - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;

    // 마우스 lerp
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

    // 파티클별 y축 부유 애니메이션
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] =
        originalY[i] + Math.sin(t * 0.4 + i * 0.23) * 0.18;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // 마우스 패럴랙스 회전
    mesh.current.rotation.y = mouse.current.x * 0.25;
    mesh.current.rotation.x = mouse.current.y * 0.12;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
