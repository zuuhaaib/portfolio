"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

// three.js and the model only load on the client, after the text is up
const Turntable = dynamic(() => import("@/components/Turntable"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-40 w-40 rounded-full bg-gray-900/80 shadow-2xl ring-8 ring-gray-800/60 motion-safe:animate-spin"
        style={{ animationDuration: "3s" }}
        aria-hidden="true"
      />
    </div>
  ),
});

export default function HomeClient() {
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { playAudio, stopAudio } = useAudio();

  // Desktop warms the model up early; phones wait until the canvas is on screen
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      import("@/components/Turntable").then((m) => m.preloadTurntableModel());
    }
  }, []);

  const handleToggle = (playing: boolean) => {
    if (playing) {
      playAudio();
    } else {
      stopAudio();
    }
  };

  return (
    <div
      className="min-h-[100dvh] md:h-screen w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-6 pt-20 pb-28 md:px-16 md:py-0 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #5c6ea6, #404e78, #2b3656, #1a243a)",
      }}
    >
      {/* Left Section: Text & Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-start text-white space-y-4"
      >
        <h1 className="text-lg font-semibold">Hi, I am</h1>
        <h2 className="text-5xl md:text-6xl font-bold">Zuhaib Khan</h2>
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

        {/* Plain text nav so nothing depends on the 3D model */}
        <nav aria-label="Site" className="pt-2 text-sm text-gray-300">
          <Link href="/projects" className="hover:text-yellow-400 hover:underline">
            projects
          </Link>
          <span aria-hidden="true" className="mx-2 text-gray-500">
            ·
          </span>
          <Link href="/about-me" className="hover:text-yellow-400 hover:underline">
            about
          </Link>
          <span aria-hidden="true" className="mx-2 text-gray-500">
            ·
          </span>
          <Link href="/brian_rot" className="hover:text-yellow-400 hover:underline">
            brian_rot
          </Link>
        </nav>
      </motion.div>

      {/* Right Section: 3D Vinyl */}
      <div className="h-[45vh] w-full md:h-full md:w-1/2">
        <Turntable
          setShowButton={setShowButton}
          setShowMessage={setShowMessage}
          onToggle={handleToggle}
        />
      </div>

      {/* Show message before clicking */}
      {showMessage && (
        <motion.div
          className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 w-max text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.55, 1, 0.55, 1] }}
          transition={{ duration: 6, ease: "easeInOut" }}
        >
          <p className="text-lg text-center">
            Click on the vinyl to explore
          </p>
        </motion.div>
      )}

      {/* Explore Button (Appears after clicking vinyl) */}
      {showButton && (
        <motion.div
          className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/vinyl"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Explore
          </Link>
        </motion.div>
      )}
    </div>
  );
}
