"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// three.js and the model only load on the client, after the text is up
const Turntable = dynamic(() => import("@/components/Turntable"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-40 w-40 rounded-full bg-ink motion-safe:animate-spin"
        style={{ animationDuration: "3s" }}
        aria-hidden="true"
      />
    </div>
  ),
});

// What's on the turntable lately (same picks as brian_rot)
const inRotation = [
  {
    title: "The Glow Pt. 2",
    artist: "The Microphones",
    image: "/the-glow.jpg",
  },
  { title: "Spiderland", artist: "Slint", image: "/spiderland.jpg" },
  {
    title: "The Black Saint and the Sinner Lady",
    artist: "Charles Mingus",
    image: "/mingus.jpg",
  },
  { title: "98.12.28", artist: "Fishmans", image: "/fishmans.jpg" },
];

const pill =
  "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0";

export default function HomeClient() {
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { playAudio, stopAudio } = useAudio();
  const reduceMotion = useReducedMotion();

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
    <main className="pb-24 md:pb-32">
      {/* The poster: headliner split either side of the turntable */}
      <section className="relative flex min-h-[100svh] flex-col px-4 pb-10 pt-20 md:block md:px-8 md:py-0">
        <motion.h1
          className="text-poster md:pointer-events-none md:absolute md:inset-x-8 md:top-1/2 md:z-10 md:flex md:-translate-y-1/2 md:items-baseline md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* The h1 spans the turntable but only its words take the pointer */}
          <span className="pointer-events-auto block">zuhaib</span>{" "}
          <span className="pointer-events-auto block text-right">khan</span>
        </motion.h1>

        <div className="relative -mx-4 my-2 h-[42svh] md:absolute md:left-1/2 md:top-1/2 md:mx-0 md:h-[78svh] md:w-[32vw] md:-translate-x-1/2 lg:w-[36vw] md:-translate-y-1/2">
          {/* A sunflower riso disc for the turntable to sit on */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="aspect-square w-[min(100%,33svh)] rounded-full bg-sun md:w-[min(100%,61svh)]"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            />
          </div>
          <div className="relative h-full w-full">
            <Turntable
              setShowButton={setShowButton}
              setShowMessage={setShowMessage}
              onToggle={handleToggle}
            />
          </div>
        </div>

        <p className="mt-6 max-w-[26ch] text-lead md:absolute md:bottom-8 md:left-8 md:mt-0">
          cs student and full stack developer, based in toronto.
        </p>

        {/* Press kit and socials, top right on desktop */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 md:absolute md:right-40 md:top-5 md:mt-0">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://drive.google.com/file/d/1EZwZKSlIvqwtlP_20T_S3gIgIIKqbGmf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} whitespace-nowrap`}
            >
              resume
            </a>
            <a
              href="https://github.com/zuuhaaib"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`${pill} px-3`}
            >
              <FaGithub size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/zuhaib-khan-3a92a4279/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`${pill} px-3`}
            >
              <FaLinkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* What to do with the turntable */}
        <div className="mt-8 flex min-h-12 items-center md:absolute md:bottom-8 md:right-8 md:mt-0 md:justify-end">
          {showMessage && (
            <motion.p
              className="text-lead"
              initial={{ opacity: 0 }}
              animate={{
                opacity: reduceMotion ? 1 : [0, 1, 0.55, 1, 0.55, 1],
              }}
              transition={{
                duration: reduceMotion ? 0.3 : 6,
                ease: "easeInOut",
              }}
            >
              click the turntable to drop the needle
            </motion.p>
          )}

          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/vinyl" className={`${pill} px-7 py-4 text-lead`}>
                explore the record
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Latest release, on a sunflower field */}
      <section className="mt-24 bg-sun px-4 py-24 md:mt-32 md:px-8 md:py-32">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="reveal md:col-span-5">
            <h2 className="text-head">latest release</h2>
            <p className="mt-5 text-lead">
              RealTalkTracker: feed it a WhatsApp or Instagram chat and find out
              who&#39;s actually carrying the conversation.
            </p>
            <Link href="/projects" className={`${pill} mt-7`}>
              see the project
            </Link>
          </div>
          <Link
            href="/projects"
            className="reveal group block overflow-hidden rounded-frame md:col-span-7"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Image
              src="/projects/rtt-hero.webp"
              alt="RealTalkTracker landing page asking who's actually carrying the chat"
              width={1280}
              height={800}
              sizes="(min-width: 768px) 720px, 100vw"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        </div>
      </section>

      {/* What's been playing */}
      <section className="mt-24 px-4 md:mt-32 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="reveal text-head">in rotation</h2>
          <Link
            href="/brian_rot"
            className="reveal text-lead underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
          >
            more takes on brian_rot
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {inRotation.map((album, index) => (
            <li
              key={album.title}
              className="reveal"
              style={{ "--i": index } as React.CSSProperties}
            >
              <Image
                src={album.image}
                alt={`Cover of ${album.title} by ${album.artist}`}
                width={320}
                height={320}
                className="aspect-square w-full rounded-frame object-cover"
              />
              <p className="mt-4 text-lead leading-tight">{album.title}</p>
              <p className="text-ink-soft">{album.artist}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
