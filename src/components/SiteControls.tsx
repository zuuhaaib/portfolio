"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

// Home + mute buttons shared by every page
export default function SiteControls() {
  const pathname = usePathname();
  const { isMuted, toggleMute } = useAudio();

  return (
    <>
      {pathname !== "/" && (
        <Link
          href="/"
          aria-label="Go home"
          className="fixed top-4 left-4 z-50 rounded-full bg-ink px-4 py-3 text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0"
        >
          <FaHome size={20} aria-hidden="true" />
        </Link>
      )}

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        aria-pressed={isMuted}
        className="fixed top-4 right-4 z-50 cursor-pointer rounded-full bg-ink px-4 py-3 text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0"
      >
        {isMuted ? (
          <FaVolumeMute size={20} aria-hidden="true" />
        ) : (
          <FaVolumeUp size={20} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
