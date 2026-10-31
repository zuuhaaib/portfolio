"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const AWAY_TITLE = "come back the record's still spinning";
const JAKE_MS = 5000;
const BRIAN_MS = 4500;

// Site-wide nonsense: secret words typed anywhere, and a needy tab title
export default function Shenanigans() {
  const [brian, setBrian] = useState(false);
  const typed = useRef("");
  const reduceMotion = useReducedMotion();

  // Typing "brian" drops brian in; typing "jake" turns every picture into
  // the smile for a few seconds
  useEffect(() => {
    let jakeTimer: ReturnType<typeof setTimeout> | undefined;
    let brianTimer: ReturnType<typeof setTimeout> | undefined;

    const jake = () => {
      if (jakeTimer) return;
      const swapped: { img: HTMLImageElement; src: string; srcset: string }[] =
        [];
      document.querySelectorAll("img").forEach((img) => {
        swapped.push({ img, src: img.src, srcset: img.srcset });
        img.srcset = "";
        img.src = "/jake.jpg";
      });
      jakeTimer = setTimeout(() => {
        swapped.forEach(({ img, src, srcset }) => {
          img.srcset = srcset;
          img.src = src;
        });
        jakeTimer = undefined;
      }, JAKE_MS);
    };

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        event.key.length !== 1
      ) {
        return;
      }
      typed.current = (typed.current + event.key.toLowerCase()).slice(-8);

      if (typed.current.endsWith("brian")) {
        typed.current = "";
        setBrian(true);
        clearTimeout(brianTimer);
        brianTimer = setTimeout(() => setBrian(false), BRIAN_MS);
      } else if (typed.current.endsWith("jake")) {
        typed.current = "";
        jake();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(brianTimer);
    };
  }, []);

  // Switch tabs and the title gets clingy; come back and it calms down
  useEffect(() => {
    let realTitle = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        realTitle = document.title;
        document.title = AWAY_TITLE;
      } else if (document.title === AWAY_TITLE) {
        document.title = realTitle;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <AnimatePresence>
      {brian && (
        <motion.figure
          role="status"
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] mx-auto w-56 bg-paper p-2.5 pb-3 text-ink md:w-64"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 1, y: "-120vh", rotate: -20 }
          }
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 140, damping: 12 }
          }
        >
          <Image
            src="/brian.jpg"
            alt="Brian from Family Guy, circled in red under the word 'brain'"
            width={256}
            height={256}
            className="aspect-square w-full object-cover"
          />
          <figcaption className="mt-2 text-center font-medium">
            brian has entered the chat
          </figcaption>
        </motion.figure>
      )}
    </AnimatePresence>
  );
}
