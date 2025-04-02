"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

const topMovies = [
  {
    title: "Go",
    director: "Doug Liman",
    image: "/go.jpg",
    link: "https://letterboxd.com/film/go/",
  },
  {
    title: "The Holdovers",
    director: "Alexander Payne",
    image: "/holdovers.jpg",
    link: "https://letterboxd.com/film/the-holdovers/",
  },
  {
    title: "Memories of Murder",
    director: "Bong Joon Ho",
    image: "/bong.jpg",
    link: "https://letterboxd.com/film/memories-of-murder/",
  },
  {
    title: "La La Land",
    director: "Damien Chazelle",
    image: "/gosling.jpg",
    link: "https://letterboxd.com/film/la-la-land/",
  },
];

const topAlbums = [
  {
    title: "The Glow Pt. 2",
    artist: "The Microphones",
    image: "/the-glow.jpg",
    link: "https://open.spotify.com/album/6QYoRO2sXThCORAifrP4Bl?si=kicKqtHbQWCXr9q-hCvJcg",
  },
  {
    title: "Spiderland",
    artist: "Slint",
    image: "/spiderland.jpg",
    link: "https://open.spotify.com/album/2NnkLRaeX33d1Mn8ZLgTo8?si=LGSQMwlgQ8aCdzr1yX5r2Q",
  },
  {
    title: "TBSATSL",
    artist: "Charles Mingus",
    image: "/mingus.jpg",
    link: "https://open.spotify.com/album/6Sts4Yh7KsDFwq2yTWrGGV?si=uYn9Fj_jRZeDB8jG4rw_jA",
  },
  {
    title: "98.12.28",
    artist: "Fishmans",
    image: "/fishmans.jpg",
    link: "https://open.spotify.com/album/5K4YFkTizFoMOyN5Khfp7G?si=-4x_M0kJSPa0z2N0jujcVQ",
  },
];

export default function BrianRot() {
  const router = useRouter();
  const [showSecret, setShowSecret] = useState(false);
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#131b33] text-white p-10">
      {/* Mute Button */}
      <button
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      <motion.button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-all shadow-lg hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
      >
        <FaHome size={20} />
      </motion.button>

      <motion.h1
        className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        brian_rot
      </motion.h1>

      <p className="text-lg text-gray-300 max-w-2xl text-center">
        i love music (if you couldn&apos;t tell by the music-themed website) and
        movies. welcome to my collection of highly curated (and questionably
        justified) music and movie takes.
      </p>
      <p className="text-lg text-gray-300 mt-4 max-w-2xl text-center">
        if you disagree, that’s fine. i’ll just assume you think spotify&apos;s
        &ldquo;chill vibes&rdquo; playlist is peak curation.
      </p>

      {/* Top 4 Movies */}
      <h2 className="text-3xl font-bold mt-10 text-yellow-400">top 4 movies</h2>
      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        {topMovies.map((movie) => (
          <motion.a
            key={movie.title}
            href={movie.link}
            target="_blank"
            className="text-center cursor-pointer transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={movie.image}
              alt={movie.title}
              width={160}
              height={240}
              className="rounded-lg shadow-lg hover:shadow-2xl transition-all"
            />
            <p className="mt-2 font-semibold text-xl">{movie.title}</p>
            <p className="text-gray-400 text-sm">{movie.director}</p>
          </motion.a>
        ))}
      </div>

      {/* Top Albums */}
      <h2 className="text-3xl font-bold mt-12 text-yellow-400">top 4 albums</h2>
      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        {topAlbums.map((album) => (
          <motion.a
            key={album.title}
            href={album.link}
            target="_blank"
            className="text-center cursor-pointer transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={album.image}
              alt={album.title}
              width={160}
              height={160}
              className="rounded-lg shadow-lg hover:shadow-2xl transition-all"
            />
            <p className="mt-2 font-semibold text-xl">{album.title}</p>
            <p className="text-gray-400 text-sm">{album.artist}</p>
          </motion.a>
        ))}
      </div>

      {/* Secret Game */}
      <motion.button
        onClick={() => setShowSecret(true)}
        className="mt-12 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-all shadow-lg hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
      >
        [do not click]
      </motion.button>
      {showSecret && (
        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          congrats, you found the secret. your reward? validation.
        </motion.p>
      )}
    </div>
  );
}
