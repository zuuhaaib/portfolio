"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// The floating record is its own small three.js scene, loaded on demand
const SpinningRecord = dynamic(() => import("@/components/SpinningRecord"), {
  ssr: false,
});

const topMovies = [
  {
    title: "Go",
    year: 1999,
    director: "Doug Liman",
    image: "/go.jpg",
    link: "https://letterboxd.com/film/go/",
  },
  {
    title: "The Holdovers",
    year: 2023,
    director: "Alexander Payne",
    image: "/holdovers.jpg",
    link: "https://letterboxd.com/film/the-holdovers/",
  },
  {
    title: "Memories of Murder",
    year: 2003,
    director: "Bong Joon Ho",
    image: "/bong.jpg",
    link: "https://letterboxd.com/film/memories-of-murder/",
  },
  {
    title: "La La Land",
    year: 2016,
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
    fullTitle: "The Black Saint and the Sinner Lady",
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

// Posters pinned up slightly crooked, like a bedroom wall
const TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

function albumTitle(album: (typeof topAlbums)[number]) {
  return ("fullTitle" in album && album.fullTitle) || album.title;
}

export default function BrianRotClient() {
  const [showSecret, setShowSecret] = useState(false);
  // The record currently pulled up out of the crate
  const [pulled, setPulled] = useState(0);

  return (
    <main className="pb-24 md:pb-32">
      <header className="grid items-center gap-8 px-4 pt-28 md:grid-cols-12 md:px-8 md:pt-32">
        <div className="md:col-span-7">
          <h1 className="reveal text-poster">brian_rot</h1>
          <p
            className="reveal mt-8 max-w-[40ch] text-lead"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            i love music (if you couldn&apos;t tell by the music-themed
            website) and movies. welcome to my collection of highly curated
            (and questionably justified) music and movie takes.
          </p>
          <p
            className="reveal mt-4 max-w-[48ch]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            if you disagree, that’s fine. i’ll just assume you think
            spotify&apos;s &ldquo;chill vibes&rdquo; playlist is peak curation.
          </p>
        </div>
        <div className="relative h-[42svh] md:col-span-5 md:h-[64svh]">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="aspect-square w-[min(100%,40svh)] rounded-full bg-blue md:w-[min(100%,60svh)]" />
          </div>
          <div className="relative h-full w-full">
            <SpinningRecord />
          </div>
        </div>
      </header>

      {/* Top 4 Movies, pinned to the wall */}
      <section className="mt-24 bg-blue px-4 py-20 text-paper md:mt-32 md:px-8 md:py-28">
        <h2 className="reveal text-head">top 4 movies</h2>
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {topMovies.map((movie, index) => (
            <li
              key={movie.title}
              className="reveal"
              style={{ "--i": index } as React.CSSProperties}
            >
              <a
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block bg-paper p-2.5 pb-4 text-ink transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none md:p-3 md:pb-5 ${TILTS[index]}`}
              >
                <div className="overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={`Poster for ${movie.title} (${movie.year})`}
                    width={320}
                    height={480}
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-lead font-bold leading-tight tracking-[-0.03em]">
                  {movie.title}
                </p>
                <p className="mt-1 text-fine text-ink-soft">
                  {movie.director}, {movie.year} · letterboxd ↗
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Top Albums, flipped through like a crate */}
      <section className="mt-24 px-4 md:mt-32 md:px-8">
        <h2 className="reveal text-head">top 4 albums</h2>
        <p className="reveal mt-4 max-w-md">
          dig through the crate. hover one to pull it out, click to listen.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-24 md:flex md:justify-center md:gap-0 md:pt-24 md:[perspective:1600px]">
          {topAlbums.map((album, index) => {
            const isPulled = pulled === index;
            return (
              <li
                key={album.title}
                className={`relative md:-ml-[3.5vw] md:first:ml-0 ${
                  isPulled ? "md:z-20" : "md:z-10"
                }`}
              >
                <a
                  href={album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${albumTitle(album)} by ${album.artist}, on spotify`}
                  onMouseEnter={() => setPulled(index)}
                  onFocus={() => setPulled(index)}
                  className={`block transition-transform duration-500 ease-out motion-reduce:transition-none md:w-[clamp(200px,22vw,340px)] ${
                    isPulled
                      ? "md:[transform:translateY(-14px)_scale(1.06)]"
                      : "md:[transform:rotateY(40deg)]"
                  }`}
                >
                  <div className="relative">
                    {/* The record, sliding up out of its sleeve */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-[4%] top-0 aspect-square rounded-full bg-cover bg-center transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        isPulled
                          ? "-translate-y-[16%] md:-translate-y-[42%] md:rotate-45"
                          : "-translate-y-[16%] md:translate-y-0"
                      }`}
                      style={{ backgroundImage: "url('/vinyl_texture.png')" }}
                    />
                    <Image
                      src={album.image}
                      alt={`Cover of ${albumTitle(album)} by ${album.artist}`}
                      width={320}
                      height={320}
                      className="relative aspect-square w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-lead font-bold leading-tight tracking-[-0.03em] md:hidden">
                    {album.title}
                  </p>
                  <p className="text-ink-soft md:hidden">{album.artist}</p>
                </a>
              </li>
            );
          })}
        </ul>

        {/* What's in your hands right now (desktop) */}
        <p
          aria-live="polite"
          className="mt-14 hidden text-center text-lead md:block"
        >
          now pulling:{" "}
          <span className="font-bold">{albumTitle(topAlbums[pulled])}</span> by{" "}
          {topAlbums[pulled].artist}
        </p>
      </section>

      {/* Secret Game */}
      <section className="mt-24 flex flex-col items-start gap-4 px-4 md:mt-32 md:px-8">
        <h2 className="sr-only">a secret</h2>
        <button
          type="button"
          onClick={() => setShowSecret(true)}
          className="cursor-pointer rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0"
        >
          [do not click]
        </button>
        {showSecret && (
          <motion.p
            className="text-lead"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            congrats, you found the secret. your reward? validation.
          </motion.p>
        )}
      </section>
    </main>
  );
}
