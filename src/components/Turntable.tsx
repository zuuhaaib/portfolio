"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL = "/vinyl_player.glb";

type TurntableProps = {
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  onToggle: (playing: boolean) => void;
};

export default function Turntable(props: TurntableProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // only fetch the model once the canvas is actually on screen
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
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 4], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <Suspense fallback={<VinylPlaceholder />}>
          {inView ? <VinylPlayer {...props} /> : <VinylPlaceholder />}
        </Suspense>
      </Canvas>
    </div>
  );
}

// cheap spinning record shown while the real model downloads
function VinylPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useFrame((_, delta) => {
    if (ref.current && !reduceMotion) ref.current.rotation.y += delta * 1.5;
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.9, 0.9, 0.04, 48]} />
      <meshStandardMaterial color="#111827" roughness={0.4} />
    </mesh>
  );
}

function VinylPlayer({
  setShowButton,
  setShowMessage,
  onToggle,
}: TurntableProps) {
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, scene);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetCameraPosition = useRef(new THREE.Vector3(0, 2, 4));

  useFrame(({ camera }) => {
    camera.position.lerp(targetCameraPosition.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  const handleVinylClick = () => {
    if (actions && Object.values(actions).length > 0) {
      const nextPlaying = !isPlaying;
      onToggle(nextPlaying);
      Object.values(actions).forEach((action) =>
        nextPlaying ? action?.play() : action?.stop()
      );
      setIsPlaying(nextPlaying);
      targetCameraPosition.current.set(
        0,
        nextPlaying ? 3.5 : 2,
        nextPlaying ? 2 : 4
      );
      setTimeout(() => {
        // Playing shows the button; stopping brings the hint back
        setShowButton(nextPlaying);
        setShowMessage(!nextPlaying);
      }, 500);
    } else {
      setShowButton(false);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (actions && Object.values(actions).length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
    }
  }, [actions]);

  return (
    <Center>
      <primitive object={scene} scale={0.028} onClick={handleVinylClick} />
    </Center>
  );
}

export function preloadTurntableModel() {
  useGLTF.preload(MODEL_URL);
}
