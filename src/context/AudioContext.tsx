"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface AudioContextProps {
  isMuted: boolean;
  toggleMute: () => void;
  playAudio: () => void;
  stopAudio: () => void;
  volume: number; // To manage volume level
  setVolume: (value: number) => void; // Method to update volume
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

const songs = [
  "/music/Reelin.mp3",
  "/music/Lonely.mp3",
  "/music/gas.mp3",
  "/music/feather.mp3",
];

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35); // Set initial volume to 35%
  const isMutedRef = useRef(false);
  // Created on first play, so no song downloads until someone asks for one
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = () => {
    if (!audioRef.current) {
      const song = songs[Math.floor(Math.random() * songs.length)];
      const audio = new Audio(song);
      audio.loop = true;
      audio.muted = isMutedRef.current;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const toggleMute = useCallback(() => {
    const next = !isMutedRef.current;
    isMutedRef.current = next;
    setIsMuted(next);
    if (audioRef.current) {
      audioRef.current.muted = next;
    }
  }, []);

  const playAudio = () => {
    const audio = getAudio();
    audio.volume = volume;
    audio.play().catch(() => {
      // Autoplay blocked or file missing; nothing useful to do here
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <AudioContext.Provider
      value={{ isMuted, toggleMute, playAudio, stopAudio, volume, setVolume }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextProps => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
