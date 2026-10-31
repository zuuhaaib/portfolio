"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// A loose record floating over the page: it spins at roughly 33⅓ rpm, leans
// toward the cursor, and picks up speed while you scroll.
export default function SpinningRecord() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only start the scene once it's actually on screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full" aria-hidden="true">
      {inView && (
        <Canvas camera={{ position: [0, 0.6, 3.2], fov: 35 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 4, 3]} intensity={1.6} />
          <Suspense fallback={null}>
            <Record />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

function Record() {
  const group = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Group>(null);
  const lastScroll = useRef(0);
  const boost = useRef(0);
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const label = useLoader(THREE.TextureLoader, "/vinyl_texture.png");
  label.colorSpace = THREE.SRGBColorSpace;

  useFrame(({ pointer }, delta) => {
    if (!group.current || !disc.current) return;

    // Scrolling gives the platter a shove that slowly wears off
    const scroll = window.scrollY;
    boost.current = Math.min(
      boost.current + Math.abs(scroll - lastScroll.current) * 0.02,
      12
    );
    lastScroll.current = scroll;
    boost.current *= 0.94;

    if (!reduceMotion) {
      disc.current.rotation.y -= delta * (3.5 + boost.current);
    }

    // Lean toward the cursor
    const targetX = -0.9 + pointer.y * 0.25;
    const targetZ = -pointer.x * 0.3;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.06;
  });

  return (
    <group ref={group} rotation={[-0.9, 0, 0]}>
      <group ref={disc}>
        {/* The vinyl itself */}
        <mesh>
          <cylinderGeometry args={[1, 1, 0.03, 96]} />
          <meshStandardMaterial
            color="#0b0b0d"
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
        {/* Both faces carry the record photo, grooves and label */}
        <mesh position={[0, 0.0155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1, 96]} />
          <meshStandardMaterial
            map={label}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
        <mesh position={[0, -0.0155, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1, 96]} />
          <meshStandardMaterial
            map={label}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}
