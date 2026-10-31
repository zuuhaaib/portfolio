"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Section = {
  label: string;
  href: string;
  description: string;
  image: { src: string; alt: string; size: number };
};

// Display Order
const SECTIONS: Section[] = [
  {
    label: "home",
    href: "/",
    description:
      "Well, I feel like it's pretty self-explanatory. But clicking on this will take you back to the homepage (no way!!). I'm just yapping so that there's no dead space here. Maybe I should add a funny image at the bottom.",
    image: {
      src: "/bart-simpson.jpg",
      alt: "Bart Simpson standing there, unsure why he clicked this",
      size: 200,
    },
  },
  {
    label: "about me",
    href: "/about-me",
    description:
      "Find out more about me! My background, my journey (emotional) and why I am the way I am (not really). Here's a fun fact - I recently found out that cows have accents depending on where they're born, and they also have best friends and get depressed when separated (I believe everything I see on the internet).",
    image: {
      src: "/jake.jpg",
      alt: "Jake Gyllenhaal doing an unsettlingly wide smile",
      size: 300,
    },
  },
  {
    label: "projects",
    href: "/projects",
    description:
      "Projects I've worked on or am currently working on. Most of the projects have been the result of not sleeping on time, procrastinating, or maybe someone at a party said 'I have an idea for an app' (pls no more of this).",
    image: {
      src: "/sadge.jpg",
      alt: "Exhausted cartoon dad in headphones slumped at his computer",
      size: 280,
    },
  },
  {
    label: "brian_rot",
    href: "/brian_rot",
    description:
      "this is where i drop my highly curated, absolutely flawless (objective) music and movie recommendations. expect hidden gems, questionable obsessions, and maybe a few guilty pleasures i'll pretend are ironic.",
    image: {
      src: "/brian.jpg",
      alt: "\"Brain: organ that controls the nervous system\" with an arrow pointing at Brian from Family Guy",
      size: 300,
    },
  },
];

// Vinyl Layout Order (for button positions)
const VINYL_LAYOUT_ORDER = ["about me", "home", "brian_rot", "projects"];
const WHEEL_ITEMS = VINYL_LAYOUT_ORDER.map(
  (label) => SECTIONS.find((s) => s.label === label)!
);

const ACTIVE_SCALE = 1.4;
const IDLE_SCALE = 1.15;
const EDGE_MARGIN = 24;

// Labels start spread evenly, with Home just above the "active" spot
const START_OFFSET = -135;
// Labels fade out over this many degrees before wrapping around the back
const WRAP_FADE = 20;

type Geometry = { radius: number; discSize: number; maxArc: number };

// The disc sits half off the left edge (centered on x = 0). Labels orbit it
// on a virtual full circle that gets squeezed onto the visible right-hand
// arc, so every label stays on-screen while the disc stays half hidden.
function computeGeometry(labels: (HTMLElement | null)[]): Geometry {
  const vmin = Math.min(window.innerWidth, window.innerHeight);
  const discSize = vmin * 0.6;
  const radius = (discSize / 2) / 0.9;

  const widest = Math.max(80, ...labels.map((el) => el?.offsetWidth ?? 0));
  const tallest = Math.max(40, ...labels.map((el) => el?.offsetHeight ?? 0));
  const labelHalf = (widest * IDLE_SCALE) / 2;
  const labelHalfHeight = (tallest * ACTIVE_SCALE) / 2;

  // Furthest a label can swing up/down before it would clip the left edge
  // or the top/bottom of the screen
  const fromEdge = Math.acos(Math.min(1, (labelHalf + EDGE_MARGIN) / radius));
  const fromHeight = Math.asin(
    Math.min(
      1,
      Math.max(0, window.innerHeight / 2 - labelHalfHeight - EDGE_MARGIN) /
        radius
    )
  );
  const maxArc = Math.min(fromEdge, fromHeight, (80 * Math.PI) / 180);

  return { radius, discSize, maxArc };
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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateRotation = () => {
      if (reduceMotion) {
        smoothScrollRef.current = window.scrollY;
      } else {
        smoothScrollRef.current +=
          (window.scrollY - smoothScrollRef.current) * 0.1;
      }

      const maxScroll = document.body.scrollHeight - window.innerHeight;

      const scrollFraction =
        maxScroll > 0 ? Math.min(smoothScrollRef.current / maxScroll, 1) : 0;

      const totalRotation = scrollFraction * 720;

      if (vinylRef.current && !reduceMotion) {
        vinylRef.current.style.transform = `rotate(${totalRotation}deg)`;
      }

      const textMultiplier = 0.4;
      const slowedRotation = totalRotation * textMultiplier;
      const { radius, maxArc } = geometry;

      let closestIndex = 0;
      let closestDistance = Infinity;
      const positions: { x: number; y: number; opacity: number }[] = [];

      WHEEL_ITEMS.forEach((_, index) => {
        // Angle on the virtual circle, in degrees, 0 = pointing right
        const virtual =
          (index / WHEEL_ITEMS.length) * 360 + START_OFFSET + slowedRotation;
        const wrapped = ((((virtual + 180) % 360) + 360) % 360) - 180;
        const dynamicAngle = (wrapped / 180) * maxArc;
        const x = radius * Math.cos(dynamicAngle);
        const y = radius * Math.sin(dynamicAngle);
        const opacity = Math.min(1, (180 - Math.abs(wrapped)) / WRAP_FADE);
        positions.push({ x, y, opacity });

        const distanceToRight = Math.abs(x - radius);
        if (distanceToRight < closestDistance) {
          closestDistance = distanceToRight;
          closestIndex = index;
        }
      });

      navRefs.current.forEach((navItem, index) => {
        if (!navItem) return;
        const isActive = index === closestIndex;
        const { x, y, opacity } = positions[index];
        const scale = isActive ? ACTIVE_SCALE : IDLE_SCALE;

        navItem.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        navItem.style.opacity = String(opacity);
        navItem.style.pointerEvents = opacity < 0.3 ? "none" : "";
        // Labels sit on paper pills so they read over the black disc; the
        // one under the needle gets the sunflower drum
        navItem.style.backgroundColor = isActive ? "#ffb511" : "#ebecea";
      });

      const nextActive = SECTIONS.indexOf(WHEEL_ITEMS[closestIndex]);
      if (nextActive !== activeIndexRef.current) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }

      if (!reduceMotion) {
        frameId = requestAnimationFrame(updateRotation);
      }
    };

    if (reduceMotion) {
      // Only update when the user actually scrolls
      updateRotation();
      window.addEventListener("scroll", updateRotation, { passive: true });
      return () => window.removeEventListener("scroll", updateRotation);
    }

    frameId = requestAnimationFrame(updateRotation);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [geometry]);

  const discSize = geometry?.discSize ?? 0;

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-paper lg:min-h-[300vh]">
      {/* Vinyl (desktop) */}
      <nav
        aria-label="Sections"
        className="fixed top-1/2 hidden -translate-y-1/2 items-center justify-center lg:flex"
        style={{
          left: -discSize / 2,
          width: discSize,
          height: discSize,
          visibility: geometry ? "visible" : "hidden",
        }}
      >
        <div
          ref={vinylRef}
          className="h-full w-full rounded-full bg-cover bg-center"
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
            className="group absolute z-10 cursor-pointer rounded-full px-4 py-1 text-lead font-medium tracking-[-0.03em] hover:underline motion-safe:transition-[transform,color,background-color] motion-safe:duration-200 motion-safe:ease-out"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "#161616",
              backgroundColor: "#ebecea",
            }}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              {section.label}
              <span
                aria-hidden="true"
                className="-translate-x-1 text-fine opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              >
                ↗
              </span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Title, for both layouts */}
      <header className="px-4 pt-24 md:px-8 lg:absolute lg:right-8 lg:top-0 lg:z-10 lg:w-[52vw] lg:px-0 lg:pt-28">
        <h1 className="text-poster">pick a side</h1>
        <p className="mt-4 max-w-md text-lead lg:mt-6">
          <span className="lg:hidden">
            four places to go. tap whichever one sounds least concerning.
          </span>
          <span className="hidden lg:inline">
            scroll to spin the record. click a label when one looks good.
          </span>
        </p>
      </header>

      {/* Liner notes (desktop) */}
      <div className="absolute right-8 top-0 hidden h-[300vh] w-[52vw] flex-col items-stretch pt-[25rem] lg:flex">
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section, index) => {
            const isActive = activeIndex === index;

            return (
              <Link
                key={section.label}
                href={section.href}
                className={`group grid grid-cols-[1fr_auto] items-start gap-8 py-4 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-70"
                }`}
              >
                <div>
                  <h2 className="flex items-center gap-4 text-head group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
                    <span
                      aria-hidden="true"
                      className={`h-[0.4em] w-[0.4em] shrink-0 rounded-full bg-sun transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
                        isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                    {section.label}
                  </h2>
                  <p className="mt-4 max-w-[52ch]">{section.description}</p>
                </div>

                <div className="w-40 overflow-hidden rounded-frame xl:w-48">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.size}
                    height={section.image.size}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Plain list (mobile / tablet) */}
      <div className="px-4 pb-12 md:px-8 lg:hidden">
        <ul className="mt-14 flex flex-col gap-16">
          {SECTIONS.map((section) => (
            <li key={section.label}>
              <Link
                href={section.href}
                className="group block transition active:translate-y-px"
              >
                <h2 className="flex items-center gap-2 text-head group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
                  {section.label}
                  <span aria-hidden="true" className="text-lead">
                    ↗
                  </span>
                </h2>

                <p className="mt-3">{section.description}</p>

                <div className="mt-5 overflow-hidden rounded-frame">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.size}
                    height={section.image.size}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
