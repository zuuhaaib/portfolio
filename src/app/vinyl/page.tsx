"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

const NAV_OPTIONS = ["About Me", "Home", "brian_rot", "Projects"];
const SECTION_PLACEHOLDERS = {
  "About Me":
    "Find out more about me! My background, my journey (emotional) and why I am the way I am (not really). Here's a fun fact - I recently found out that cows have accents depending on where they're born, and they also have best friends and get depressed when separated (I believe everything I see on the internet).",
  Home: "Well, I feel like it's pretty self-explanatory. But clicking on this will take you back to the homepage (no way!!). I'm just yapping so that there's no dead space here. Maybe I should add a funny image at the bottom.",
  Projects:
    "Projects I've worked on or am currently working on. Most of the projects have been the result of not sleeping on time, procrastinating, or maybe someone at a party said 'I have an idea for an app' (pls no more of this).",
  brian_rot:
    "this is where i drop my highly curated, absolutely flawless (objective) music and movie recommendations. expect hidden gems, questionable obsessions, and maybe a few guilty pleasures i'll pretend are ironic.",
};

export default function VinylNavigation() {
  const vinylRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const smoothScrollRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMuted, toggleMute } = useAudio();
  const router = useRouter();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let frameId: number;

    const updateRotation = () => {
      smoothScrollRef.current +=
        (window.scrollY - smoothScrollRef.current) * 0.1;

      const maxScroll = document.body.scrollHeight - viewportHeight;
      const scrollFraction = Math.min(smoothScrollRef.current / maxScroll, 1);
      const totalRotation = scrollFraction * 720;

      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${totalRotation}deg)`;
      }

      const textMultiplier = 0.4;
      const slowedRotation = totalRotation * textMultiplier;

      let closestIndex = 0;
      let closestDistance = Infinity;

      navRefs.current.forEach((navItem, index) => {
        if (navItem) {
          const baseAngle =
            (index / NAV_OPTIONS.length) * Math.PI * 2 - Math.PI / 2;
          const dynamicAngle = baseAngle + (slowedRotation * Math.PI) / 180;

          const radius =
            windowWidth < 768
              ? Math.min(windowWidth, 600) * 0.35
              : Math.min(windowWidth, 1200) * 0.25;

          const x = radius * Math.cos(dynamicAngle);
          const y = radius * Math.sin(dynamicAngle);

          const distanceToRight = Math.abs(x - radius);
          if (distanceToRight < closestDistance) {
            closestDistance = distanceToRight;
            closestIndex = index;
          }

          navItem.style.transition =
            "transform 0.2s ease-out, color 0.2s ease-out, font-weight 0.2s ease-out";
          navItem.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });

      setActiveIndex(closestIndex);

      navRefs.current.forEach((navItem, index) => {
        if (navItem) {
          const isActive = index === closestIndex;
          const scale =
            windowWidth < 768 ? (isActive ? 1.5 : 1.2) : isActive ? 1.8 : 1.5;
          navItem.style.transform += ` scale(${scale})`;
          navItem.style.color = isActive ? "#FFD700" : "#6B7A99";
          navItem.style.fontWeight = isActive ? "bold" : "normal";
        }
      });

      frameId = requestAnimationFrame(updateRotation);
    };

    frameId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(frameId);
  }, [viewportHeight, windowWidth]);

  const getRoutePath = (option: string): string => {
    switch (option) {
      case "Home":
        return "/";
      case "brian_rot":
        return "/brian_rot";
      case "About Me":
        return "/about-me";
      case "Projects":
        return "/coming-soon";
      default:
        return `/${option.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  return (
    <div
      className="min-h-[300vh] w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 25%, #2b3a55, #1e2a44, #131b33, #0b132b)",
      }}
    >
      {/* Mute Button */}
      <button
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition z-50"
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Vinyl */}
      <div className="fixed top-1/2 left-[5vw] md:left-[-30vmin] -translate-y-1/2 w-[80vmin] h-[80vmin] md:w-[60vmin] md:h-[60vmin] flex items-center justify-center">
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
            onClick={() => router.push(getRoutePath(option))}
            className="absolute text-base md:text-lg font-semibold shadow-lg transition-all ease-out duration-200 z-10"
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

      {/* Descriptions */}
      <div className="absolute top-0 right-[5vw] w-[80vw] md:w-[60vw] lg:w-[50vw] h-[300vh] flex flex-col justify-start items-start pt-[20vh] md:pt-[10vh] px-4 md:px-0">
        {NAV_OPTIONS.map((option, index) => {
          const isActive = activeIndex === index;
          let offset = (index + 1) * 60;

          if (option === "Home") offset = windowWidth < 768 ? -50 : -70;
          else if (option === "Projects" && activeIndex >= 0)
            offset = windowWidth < 768 ? -50 : -70;
          else if (option === "brian_rot" && activeIndex >= 1)
            offset = windowWidth < 768 ? 40 : 60;

          return (
            <div
              key={option}
              className={`w-full p-4 md:p-6 mb-6 transition-opacity duration-300 ease-in-out transform transition-transform ${
                isActive ? "opacity-100 scale-105" : "opacity-40 scale-100"
              }`}
              style={{
                transform: `translateY(${offset}vh)`,
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {option}
              </h2>
              <p className="text-base md:text-lg text-gray-300">
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
