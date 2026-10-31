"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Section = {
  label: string;
  href: string;
  description: string;
  image: { src: string; alt: string; size: number };
};

// Display Order
const SECTIONS: Section[] = [
  {
    label: "Home",
    href: "/",
    description:
      "Well, I feel like it's pretty self-explanatory. But clicking on this will take you back to the homepage (no way!!). I'm just yapping so that there's no dead space here. Maybe I should add a funny image at the bottom.",
    image: { src: "/bart-simpson.jpg", alt: "Bart Simpson", size: 200 },
  },
  {
    label: "About Me",
    href: "/about-me",
    description:
      "Find out more about me! My background, my journey (emotional) and why I am the way I am (not really). Here's a fun fact - I recently found out that cows have accents depending on where they're born, and they also have best friends and get depressed when separated (I believe everything I see on the internet).",
    image: { src: "/jake.jpg", alt: "bakin", size: 300 },
  },
  {
    label: "Projects",
    href: "/projects",
    description:
      "Projects I've worked on or am currently working on. Most of the projects have been the result of not sleeping on time, procrastinating, or maybe someone at a party said 'I have an idea for an app' (pls no more of this).",
    image: { src: "/sadge.jpg", alt: "sadge", size: 280 },
  },
  {
    label: "brian_rot",
    href: "/brian_rot",
    description:
      "this is where i drop my highly curated, absolutely flawless (objective) music and movie recommendations. expect hidden gems, questionable obsessions, and maybe a few guilty pleasures i'll pretend are ironic.",
    image: { src: "/brian.jpg", alt: "brian", size: 300 },
  },
];

// Vinyl Layout Order (for button positions)
const VINYL_LAYOUT_ORDER = ["About Me", "Home", "brian_rot", "Projects"];
const WHEEL_ITEMS = VINYL_LAYOUT_ORDER.map(
  (label) => SECTIONS.find((s) => s.label === label)!
);

const ACTIVE_SCALE = 1.4;
const IDLE_SCALE = 1.15;
const EDGE_MARGIN = 24;

type Geometry = { radius: number; centerX: number };

// Lays the wheel out so the whole label orbit fits in the left half of the
// screen: the disc can be big, but no label ever rotates off-screen.
function computeGeometry(labels: (HTMLElement | null)[]): Geometry {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const widest = Math.max(80, ...labels.map((el) => el?.offsetWidth ?? 0));
  const labelHalf = (widest * ACTIVE_SCALE) / 2;
  const region = width * 0.5;
  const radius = Math.max(
    120,
    Math.min((region - 2 * (labelHalf + EDGE_MARGIN)) / 2, height * 0.38)
  );
  return { radius, centerX: EDGE_MARGIN + labelHalf + radius };
}

export default function VinylClient() {
  const vinylRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const smoothScrollRef = useRef(0);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    // The wheel only exists at lg+; smaller screens get the plain list
    const handleResize = () =>
      setGeometry(
        window.innerWidth >= 1024 ? computeGeometry(navRefs.current) : null
      );

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!geometry) return;
    let frameId: number;

    const updateRotation = () => {
      smoothScrollRef.current +=
        (window.scrollY - smoothScrollRef.current) * 0.1;

      const maxScroll = document.body.scrollHeight - window.innerHeight;

      const scrollFraction =
        maxScroll > 0 ? Math.min(smoothScrollRef.current / maxScroll, 1) : 0;

      const totalRotation = scrollFraction * 720;

      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${totalRotation}deg)`;
      }

      const textMultiplier = 0.4;
      const slowedRotation = totalRotation * textMultiplier;
      const { radius } = geometry;

      let closestIndex = 0;
      let closestDistance = Infinity;
      const positions: { x: number; y: number }[] = [];

      WHEEL_ITEMS.forEach((_, index) => {
        const baseAngle =
          (index / WHEEL_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const dynamicAngle = baseAngle + (slowedRotation * Math.PI) / 180;
        const x = radius * Math.cos(dynamicAngle);
        const y = radius * Math.sin(dynamicAngle);
        positions.push({ x, y });

        const distanceToRight = Math.abs(x - radius);
        if (distanceToRight < closestDistance) {
          closestDistance = distanceToRight;
          closestIndex = index;
        }
      });

      navRefs.current.forEach((navItem, index) => {
        if (!navItem) return;
        const isActive = index === closestIndex;
        const { x, y } = positions[index];
        const scale = isActive ? ACTIVE_SCALE : IDLE_SCALE;

        navItem.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        navItem.style.color = isActive ? "#FFD700" : "#6B7A99";
        navItem.style.fontWeight = isActive ? "bold" : "normal";
      });

      const nextActive = SECTIONS.indexOf(WHEEL_ITEMS[closestIndex]);
      if (nextActive !== activeIndexRef.current) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }

      frameId = requestAnimationFrame(updateRotation);
    };

    frameId = requestAnimationFrame(updateRotation);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [geometry]);

  const discSize = geometry ? geometry.radius * 1.8 : 0;

  return (
    <div
      className="min-h-screen lg:min-h-[300vh] w-full relative overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 25%, #2b3a55, #1e2a44, #131b33, #0b132b)",
      }}
    >
      <h1 className="sr-only">explore</h1>

      {/* Interaction Hint */}
      <motion.p
        className="
          hidden lg:block
          fixed bottom-5 left-5 z-40
          rounded-full
          border border-white/10
          bg-black/20
          px-4 py-2
          text-sm
          text-gray-400
          backdrop-blur-sm
          pointer-events-none
        "
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        scroll around • click something eventually
      </motion.p>

      {/* Vinyl (desktop) */}
      <nav
        aria-label="Sections"
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          left: geometry ? geometry.centerX - discSize / 2 : 0,
          width: discSize,
          height: discSize,
          visibility: geometry ? "visible" : "hidden",
        }}
      >
        <div
          ref={vinylRef}
          className="
            w-full h-full
            rounded-full
            bg-cover bg-center
            shadow-2xl
            transition-transform
            duration-300
            ease-out
          "
          style={{
            backgroundImage: "url('/vinyl_texture.png')",
          }}
        />

        {WHEEL_ITEMS.map((section, index) => (
          <Link
            key={section.label}
            href={section.href}
            data-wheel-label
            ref={(el) => {
              navRefs.current[index] = el;
            }}
            className="
              group
              absolute
              z-10
              cursor-pointer
              rounded-full
              px-3 py-2
              text-lg
              font-semibold
              shadow-lg
              transition-[transform,color,background-color,box-shadow]
              duration-200
              ease-out
              hover:bg-yellow-400/10
              hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]
            "
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "#6B7A99",
            }}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              {section.label}

              <span
                aria-hidden="true"
                className="
                  text-xs
                  opacity-0
                  -translate-x-1
                  transition-all
                  duration-200
                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
              >
                ↗
              </span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Descriptions (desktop) */}
      <div className="hidden lg:flex absolute top-0 right-[4vw] w-[44vw] h-[300vh] flex-col justify-start items-start pt-[10vh]">
        {SECTIONS.map((section, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={section.label}
              className={`
                w-full
                p-6
                mb-6
                transition-[opacity,transform]
                duration-300
                ease-in-out
                ${isActive ? "opacity-100 scale-105" : "opacity-40 scale-100"}
              `}
            >
              <h2 className="text-3xl font-bold text-white">
                {section.label}
              </h2>

              <p className="text-lg text-gray-300">{section.description}</p>

              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.size}
                height={section.image.size}
                className="mt-4 rounded-lg shadow-lg mx-auto"
              />
            </div>
          );
        })}
      </div>

      {/* Plain list (mobile / tablet) */}
      <ul className="lg:hidden flex flex-col gap-6 px-4 pt-24 pb-12">
        {SECTIONS.map((section) => (
          <li key={section.label}>
            <Link
              href={section.href}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]"
            >
              <h2 className="flex items-center gap-2 text-2xl font-bold text-yellow-400">
                {section.label}
                <span aria-hidden="true" className="text-base">
                  ↗
                </span>
              </h2>

              <p className="mt-2 text-base text-gray-300">
                {section.description}
              </p>

              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.size}
                height={section.image.size}
                className="mt-4 rounded-lg shadow-lg mx-auto h-auto w-auto max-h-56"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
