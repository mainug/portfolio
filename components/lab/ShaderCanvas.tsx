"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v   = 0.0;
    float amp = 0.5;
    mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v  += amp * noise(p);
      p   = rot * p * 2.1;
      amp *= 0.45;
    }
    return v;
  }

  void main() {
    vec2  uv = vUv;
    float t  = uTime * 0.07;
    vec2  m  = uMouse * 0.45;

    vec2 p = uv * 3.2;

    vec2 q = vec2(
      fbm(p + t),
      fbm(p + t + vec2(5.2, 1.3))
    );
    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7, 9.2) + t * 0.13 + m),
      fbm(p + 2.0 * q + vec2(8.3, 2.8) + t * 0.10 - m * 0.6)
    );
    float f = fbm(p + 2.2 * r);
    f = f * 0.5 + 0.5;

    vec3 c0 = vec3(0.03, 0.00, 0.10);
    vec3 c1 = vec3(0.48, 0.10, 0.90);
    vec3 c2 = vec3(0.00, 0.68, 0.90);
    vec3 c3 = vec3(0.85, 0.93, 1.00);

    vec3 col = mix(c0, c1, smoothstep(0.00, 0.48, f));
    col      = mix(col, c2, smoothstep(0.42, 0.76, f));
    col      = mix(col, c3, smoothstep(0.72, 0.96, f));

    vec2  mUV  = uMouse * 0.48;
    float mdst = length(uv - 0.5 - mUV);
    col += vec3(0.12, 0.55, 1.00) * exp(-mdst * 6.5) * 0.45;

    float vig = smoothstep(0.90, 0.28, length(uv - 0.5));
    col *= mix(0.35, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const uniforms = useRef({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  });
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      targetMouse.current.set(
        (t.clientX / window.innerWidth)  * 2 - 1,
        -((t.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.elapsedTime;
    uniforms.current.uMouse.value.lerp(targetMouse.current, 0.04);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms.current}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ShaderCanvas() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: false }}
    >
      <Plane />
    </Canvas>
  );
}
