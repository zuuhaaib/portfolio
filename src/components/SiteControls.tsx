"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaForward,
  FaHome,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

const pill =
  "cursor-pointer rounded-full bg-ink px-4 py-3 text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0";

// Skips this close together count as "skipping everything"
const SKIP_WINDOW_MS = 4000;
const SKIPS_TO_TAKE_IT_PERSONALLY = 3;

// Back, home, skip and mute buttons shared by every page
export default function SiteControls() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMuted, toggleMute, nextTrack } = useAudio();
  // The pages visited on this site so far, so "back" knows whether there's
  // somewhere on the site to go back to
  const visited = useRef<string[]>([]);
  const skipTimes = useRef<number[]>([]);
  const [noted, setNoted] = useState(false);

  useEffect(() => {
    const stack = visited.current;
    if (stack[stack.length - 1] === pathname) return;
    if (stack[stack.length - 2] === pathname) {
      stack.pop(); // went back
    } else {
      stack.push(pathname);
    }
  }, [pathname]);

  const handleBack = () => {
    if (visited.current.length > 1) {
      router.back();
    } else {
      // Landed here from outside the site: go to the explore page instead
      // of leaving it (or home, if this already is the explore page)
      router.push(pathname === "/vinyl" ? "/" : "/vinyl");
    }
  };

  useEffect(() => {
    if (!noted) return;
    const timer = setTimeout(() => setNoted(false), 3500);
    return () => clearTimeout(timer);
  }, [noted]);

  const handleSkip = () => {
    nextTrack();
    const now = Date.now();
    skipTimes.current = [
      ...skipTimes.current.filter((time) => now - time < SKIP_WINDOW_MS),
      now,
    ];
    if (skipTimes.current.length >= SKIPS_TO_TAKE_IT_PERSONALLY) {
      skipTimes.current = [];
      setNoted(true);
    }
  };

  return (
    <>
      {pathname !== "/" && (
        <div className="fixed top-4 left-4 z-50 flex gap-2">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className={pill}
          >
            <FaArrowLeft size={18} aria-hidden="true" />
          </button>
          <Link href="/" aria-label="Go home" className={pill}>
            <FaHome size={20} aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Next track"
          className={pill}
        >
          <FaForward size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          aria-pressed={isMuted}
          className={pill}
        >
          {isMuted ? (
            <FaVolumeMute size={20} aria-hidden="true" />
          ) : (
            <FaVolumeUp size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      <div role="status" className="pointer-events-none fixed top-20 right-4 z-50">
        <AnimatePresence>
          {noted && (
            <motion.p
              className="max-w-[18rem] rounded-2xl bg-sun px-4 py-3 text-ink"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              ok you clearly hate my music taste. noted.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
