"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface AudioContextProps {
  isMuted: boolean;
  toggleMute: () => void;
  playAudio: () => void;
  stopAudio: () => void;
  volume: number; // To manage volume level
  setVolume: (value: number) => void; // Method to update volume
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35); // Set initial volume to 30%
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted; // Toggle mute
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Set volume before playing
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio
    }
  };

  if (audioRef.current) {
    audioRef.current.volume = volume;
  }

  return (
    <AudioContext.Provider
      value={{ isMuted, toggleMute, playAudio, stopAudio, volume, setVolume }}
    >
      <audio ref={audioRef} src="/Reelin.mp3" loop />
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
