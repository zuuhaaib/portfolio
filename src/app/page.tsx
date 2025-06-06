"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import {
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

export default function VinylPage() {
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { isMuted, toggleMute, playAudio, stopAudio } = useAudio();
  const router = useRouter();

  const handleClick = () => {
    if (isMuted) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-between px-16 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #5c6ea6, #404e78, #2b3656, #1a243a)",
      }}
    >
      {/* Mute Button */}
      <button
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Left Section: Text & Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-start text-white space-y-4"
      >
        <h1 className="text-lg font-semibold">Hi, I am</h1>
        <h2 className="text-6xl font-bold">Zuhaib Khan</h2>
        <p className="text-gray-300 text-lg">
          Computer Science Student | Full Stack Developer
        </p>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://drive.google.com/file/d/1B6igxFHeufDJhX3aoolAaruAaG8cjqcJ/view?usp=sharing"
            target="_blank"
            className="flex items-center px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            <FaFileAlt className="mr-2" /> Resume
          </a>
          <a
            href="https://github.com/zuuhaaib"
            target="_blank"
            className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/zuhaib-khan-3a92a4279/"
            target="_blank"
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </motion.div>

      {/* Right Section: 3D Vinyl */}
      <Canvas
        className="h-full w-1/2"
        camera={{ position: [0, 2, 4], fov: 40 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <VinylPlayer
          setShowButton={setShowButton}
          setShowMessage={setShowMessage}
          handleClick={handleClick}
        />
      </Canvas>

      {/* Show message before clicking */}
      {showMessage && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <p className="text-lg text-center animate-bounce">
            Click on the vinyl to explore
          </p>
        </motion.div>
      )}

      {/* Explore Button (Appears after clicking vinyl) */}
      {showButton && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <button
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:ring-4 focus:ring-blue-400"
            onClick={() => router.push("/vinyl")}
          >
            Explore
          </button>
        </motion.div>
      )}
    </div>
  );
}

function VinylPlayer({
  setShowButton,
  setShowMessage,
  handleClick,
}: {
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
}) {
  const { scene, animations } = useGLTF("/vinyl_player.glb");
  const { actions } = useAnimations(animations, scene);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetCameraPosition = useRef(new THREE.Vector3(0, 2, 4));

  useFrame(({ camera }) => {
    camera.position.lerp(targetCameraPosition.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  const handleVinylClick = () => {
    handleClick();
    if (actions && Object.values(actions).length > 0) {
      Object.values(actions).forEach((action) =>
        isPlaying ? action?.stop() : action?.play()
      );
      setIsPlaying(!isPlaying);
      targetCameraPosition.current.set(
        0,
        isPlaying ? 2 : 3.5,
        isPlaying ? 4 : 2
      );
      setTimeout(() => {
        setShowButton(!isPlaying);
        setShowMessage(false);
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

  return <primitive object={scene} scale={0.02} onClick={handleVinylClick} />;
}
