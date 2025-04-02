"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

const NAV_OPTIONS = ["About Me", "Home", "brian_rot", "Projects"];
const SECTION_PLACEHOLDERS = {
  "About Me":
    "Find out more about me! My background, my journey (emotional) and why I am the way I am (not really). Here's a fun fact - I recently found out that cows have accents depending on where they’re born, and they also have best friends and get depressed when separated (I believe everything I see on the internet).",
  Home: "Well, I feel like it's pretty self-explanatory. But clicking on this will take you back to the homepage (no way!!). I'm just yapping so that there’s no dead space here. Maybe I should add a funny image at the bottom.",
  Projects:
    "Projects I've worked on or am currently working on. Most of the projects have been the result of not sleeping on time, procrastinating, or maybe someone at a party said 'I have an idea for an app' (pls no more of this).",
  brian_rot:
    "this is where i drop my highly curated, absolutely flawless (objective) music and movie recommendations. expect hidden gems, questionable obsessions, and maybe a few guilty pleasures i’ll pretend are ironic.",
};

export default function VinylNavigation() {
  const vinylRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const smoothScrollRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMuted, toggleMute } = useAudio();
  const router = useRouter();

  useEffect(() => {
    let frameId: number;

    const updateRotation = () => {
      smoothScrollRef.current +=
        (window.scrollY - smoothScrollRef.current) * 0.1;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = smoothScrollRef.current / maxScroll;
      const totalRotation = Math.min(scrollFraction * 720, 720);

      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${totalRotation}deg)`;
      }

      const textMultiplier = 0.4;
      const slowedRotation = totalRotation * textMultiplier;

      navRefs.current.forEach((navItem, index) => {
        if (navItem) {
          const baseAngle =
            (index / NAV_OPTIONS.length) * Math.PI * 2 - Math.PI / 2;
          const dynamicAngle = baseAngle + (slowedRotation * Math.PI) / 180;
          const radius = 280;

          const x = radius * Math.cos(dynamicAngle);
          const y = radius * Math.sin(dynamicAngle);

          navItem.style.transition =
            "transform 0.2s ease-out, color 0.2s ease-out, font-weight 0.2s ease-out";
          const isActive = Math.abs(x - radius) < 20;

          navItem.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${
            isActive ? 1.8 : 1.5
          })`;
          navItem.style.color = isActive ? "#FFD700" : "#6B7A99";
          navItem.style.fontWeight = isActive ? "bold" : "normal";

          if (isActive) setActiveIndex(index);
        }
      });

      frameId = requestAnimationFrame(updateRotation);
    };

    frameId = requestAnimationFrame(updateRotation);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className="h-[300vh] w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 25%, #2b3a55, #1e2a44, #131b33, #0b132b)",
      }}
    >
      {/* Mute Button */}
      <button
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      <div className="fixed top-1/2 left-[-20%] translate-y-[-50%] w-[70vh] h-[70vh] flex items-center justify-center">
        <div
          ref={vinylRef}
          className="w-full h-full rounded-full bg-cover bg-center shadow-2xl transition-transform duration-300 ease-out"
          style={{ backgroundImage: "url('/vinyl_texture.png')" }}
        ></div>
        {NAV_OPTIONS.map((option, index) => (
          <button
            key={option}
            ref={(el) => {
              navRefs.current[index] = el;
            }}
            onClick={() =>
              router.push(
                option === "Home"
                  ? "/"
                  : option === "brian_rot"
                  ? "/brian_rot"
                  : option == "About Me"
                  ? "/about-me"
                  : ["Projects"].includes(option)
                  ? "/coming-soon"
                  : `/${option.toLowerCase().replace(/ /g, "-")}`
              )
            }
            className="absolute text-lg font-semibold shadow-lg transition-all ease-out duration-200"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="absolute top-0 right-[5vw] w-[50vw] h-[300vh] flex flex-col justify-start items-start pt-20">
        {NAV_OPTIONS.map((option, index) => {
          const isActive = activeIndex === index;
          let offset = (index + 1) * 60;

          if (option === "Home") {
            offset = -70;
          } else if (option === "Projects" && activeIndex >= 0) {
            offset = -70;
          }

          if (option === "brian_rot" && activeIndex >= 1) {
            offset = 60;
          }

          return (
            <div
              key={option}
              className={`w-full p-6 mb-6 transition-opacity duration-300 ease-in-out transform transition-transform ${
                isActive ? "opacity-100 scale-105" : "opacity-40 scale-100"
              }`}
              style={{
                transform: `translateY(${offset}vh)`,
              }}
            >
              <h2 className="text-3xl font-bold text-white">{option}</h2>
              <p className="text-lg text-gray-300">
                {
                  SECTION_PLACEHOLDERS[
                    option as keyof typeof SECTION_PLACEHOLDERS
                  ]
                }
              </p>

              {option === "Home" && (
                <Image
                  src="/bart-simpson.jpg"
                  alt="Bart Simpson"
                  width={200}
                  height={200}
                  className="mt-4 rounded-lg shadow-lg mx-auto"
                />
              )}
              {option === "About Me" && (
                <Image
                  src="/jake.jpg"
                  alt="bakin"
                  width={300}
                  height={300}
                  className="mt-4 rounded-lg shadow-lg mx-auto"
                />
              )}
              {option === "Projects" && (
                <Image
                  src="/sadge.jpg"
                  alt="sadge"
                  width={280}
                  height={280}
                  className="mt-4 rounded-lg shadow-lg mx-auto"
                />
              )}
              {option === "brian_rot" && (
                <Image
                  src="/brian.jpg"
                  alt="brian"
                  width={300}
                  height={300}
                  className="mt-4 rounded-lg shadow-lg mx-auto"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
