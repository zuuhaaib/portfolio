"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
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

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35); // Set initial volume to 35%
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Memoize the list of songs to avoid unnecessary re-renders
  const songs = useMemo(
    () => [
      "/music/Reelin.mp3",
      "/music/Lonely.mp3",
      "/music/gas.mp3",
      "/music/feather.mp3",
    ],
    []
  );

  // Set a random song when the vinyl mounts
  useEffect(() => {
    const getRandomSong = () => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      return songs[randomIndex];
    };

    const randomSong = getRandomSong();
    setCurrentSong(randomSong);
  }, [songs]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted; // Toggle mute
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (audioRef.current) {
    audioRef.current.volume = volume;
  }

  return (
    <AudioContext.Provider
      value={{ isMuted, toggleMute, playAudio, stopAudio, volume, setVolume }}
    >
      {/* Only render the audio element once a valid song is selected */}
      {currentSong && <audio ref={audioRef} src={currentSong} loop />}
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
