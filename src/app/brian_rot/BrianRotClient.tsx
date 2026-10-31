"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import FilmPoster from "@/components/FilmPoster";
import ReviewDialog from "@/components/ReviewDialog";
import {
  favoriteFilmIds,
  filmDetails,
  films,
  type Film,
  type FilmId,
} from "@/data/films";
import { albums } from "@/data/albums";

// The floating record is its own small three.js scene, loaded on demand
const SpinningRecord = dynamic(() => import("@/components/SpinningRecord"), {
  ssr: false,
});

// What the [do not click] button says back, by how many times you ignored it
function secretMessage(clicks: number) {
  if (clicks >= 25) return "ok at this point you live here.";
  if (clicks >= 10) return "this is now a you problem.";
  if (clicks >= 5) return "you've been warned.";
  return "congrats, you found the secret. your reward? validation.";
}

const ACHIEVEMENT_AT = 25;
const ACHIEVEMENT_MS = 5000;

// Posters pinned up slightly crooked, like a bedroom wall
const TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

// The reviews shown on the page itself, in reading order
const STAYED_WITH_ME: readonly FilmId[] = [
  "paris-texas",
  "swing-girls",
  "it-follows",
  "solaris",
  "stand-by-me",
];

// The perforated edge of a strip of film, running the strip's full height
function SprocketRail({ side }: { side: "left" | "right" }) {
  const id = `sprockets-${side}`;
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-y-0 h-full w-8 ${
        side === "left" ? "left-1 md:left-2" : "right-1 md:right-2"
      }`}
    >
      <defs>
        <pattern id={id} width="32" height="28" patternUnits="userSpaceOnUse">
          <rect x="9" y="8" width="14" height="12" rx="3" fill="#ebecea" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// The small print under a film: year, director, rating, when
function FilmMeta({ film, className = "" }: { film: Film; className?: string }) {
  return (
    <p className={`text-fine ${className}`}>{filmDetails(film)}</p>
  );
}

export default function BrianRotClient() {
  const [clicks, setClicks] = useState(0);
  const [achievement, setAchievement] = useState(false);
  // Which review is open, and the button to hand focus back to afterwards
  const [openFilmId, setOpenFilmId] = useState<FilmId | null>(null);
  const [reviewTrigger, setReviewTrigger] = useState<HTMLElement | null>(null);
  // The crate: every record starts in its sleeve. Hover/focus slides one out
  // for a look; clicking picks it, and only the pick drives the details below
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [previewAlbum, setPreviewAlbum] = useState<number | null>(null);

  useEffect(() => {
    if (clicks === ACHIEVEMENT_AT) setAchievement(true);
  }, [clicks]);

  // The popup's own timer, so clicking on past 25 can't keep it up forever
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => setAchievement(false), ACHIEVEMENT_MS);
    return () => clearTimeout(timer);
  }, [achievement]);

  const openReview = (id: FilmId, trigger: HTMLElement) => {
    setReviewTrigger(trigger);
    setOpenFilmId(id);
  };

  const album = selectedAlbum === null ? null : albums[selectedAlbum];

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

      {/* Top 4 Movies, pinned to the wall; each one opens its review */}
      <section className="mt-24 bg-blue px-4 py-20 text-paper md:mt-32 md:px-8 md:py-28">
        <h2 className="reveal text-head">top 4 movies</h2>
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {favoriteFilmIds.map((id, index) => {
            const film = films[id];
            return (
              <li
                key={id}
                className="reveal"
                style={{ "--i": index } as React.CSSProperties}
              >
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(event) => openReview(id, event.currentTarget)}
                  className={`group block w-full cursor-pointer bg-paper p-2.5 pb-4 text-left text-ink transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 focus-visible:rotate-0 motion-reduce:transition-none md:p-3 md:pb-5 ${TILTS[index]}`}
                >
                  <FilmPoster
                    film={film}
                    sizes="(min-width: 768px) 320px, 45vw"
                    decorative
                  />
                  <span className="mt-3 block text-lead font-bold leading-tight tracking-[-0.03em]">
                    {film.title}
                  </span>
                  <span className="mt-1 block text-fine text-ink-soft">
                    {film.director}, {film.year}
                  </span>
                  <span className="mt-3 inline-block text-fine font-medium underline decoration-ink/30 decoration-2 underline-offset-4 group-hover:decoration-ink">
                    read note ↗
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* A few reviews, each one a frame on a strip of film */}
      <section
        aria-labelledby="stayed-with-me"
        className="mt-24 px-4 md:mt-32 md:px-8"
      >
        <h2 id="stayed-with-me" className="reveal max-w-[16ch] text-head">
          a few things that stayed with me
        </h2>

        <div className="relative mt-12 bg-ink px-11 py-10 md:mt-16 md:px-14 md:py-12">
          <SprocketRail side="left" />
          <SprocketRail side="right" />
          <div className="space-y-6 md:space-y-8">
            {STAYED_WITH_ME.map((id) => {
              const film = films[id];
              // Reviews with spoilers show only what comes before them here
              const shown = film.spoilers
                ? film.review.slice(0, film.spoilers.from)
                : film.review;
              return (
                <article
                  key={id}
                  className="reveal grid gap-4 bg-paper p-6 text-ink md:grid-cols-12 md:gap-x-10 md:p-10"
                >
                  <div className="md:col-span-4">
                    <h3 className="text-lead font-bold leading-tight tracking-[-0.03em] md:text-[2rem]">
                      {film.title}
                    </h3>
                    <FilmMeta film={film} className="mt-2" />
                  </div>
                  <div className="max-w-[52ch] space-y-4 text-lead md:col-span-8">
                    {shown.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {film.spoilers && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2 text-body">
                        <p>{film.spoilers.note}</p>
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(event) => openReview(id, event.currentTarget)}
                          className="cursor-pointer rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition hover:-translate-y-0.5 hover:bg-blue active:translate-y-0"
                        >
                          read the rest
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Albums, flipped through like a crate */}
      <section className="mt-24 px-4 md:mt-32 md:px-8">
        <h2 className="reveal text-head">top 4 albums</h2>
        <p className="reveal mt-4 max-w-md">
          dig through the crate. hover a sleeve to peek, click or tap one to
          pull it out.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-24 md:flex md:justify-center md:gap-0 md:pt-24 md:[perspective:1600px]">
          {albums.map((item, index) => {
            const isLifted = previewAlbum === index;
            const isSelected = selectedAlbum === index;
            return (
              <li
                key={item.id}
                className={`relative md:-ml-[3.5vw] md:first:ml-0 ${
                  isLifted ? "md:z-30" : isSelected ? "md:z-20" : "md:z-10"
                }`}
              >
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedAlbum(index)}
                  onMouseEnter={() => setPreviewAlbum(index)}
                  onMouseLeave={() => setPreviewAlbum(null)}
                  onFocus={() => setPreviewAlbum(index)}
                  onBlur={() => setPreviewAlbum(null)}
                  className={`block w-full cursor-pointer text-left transition-transform duration-500 ease-out motion-reduce:transition-none md:w-[clamp(200px,22vw,340px)] ${
                    isLifted
                      ? "md:[transform:translateY(-14px)_scale(1.06)]"
                      : isSelected
                        ? "md:[transform:rotateY(0deg)]"
                        : "md:[transform:rotateY(40deg)]"
                  }`}
                >
                  <span className="relative block">
                    {/* The record, sliding up out of its sleeve */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-[4%] top-0 aspect-square rounded-full bg-cover bg-center transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        isLifted
                          ? "-translate-y-[16%] md:-translate-y-[42%] md:rotate-45"
                          : "translate-y-0"
                      }`}
                      style={{ backgroundImage: "url('/vinyl_texture.png')" }}
                    />
                    <Image
                      src={item.cover}
                      alt={`Cover of ${item.title} by ${item.artist}`}
                      width={320}
                      height={320}
                      className="relative aspect-square w-full object-cover"
                    />
                  </span>
                  <span className="mt-4 block text-lead font-bold leading-tight tracking-[-0.03em] md:hidden">
                    {item.title}
                  </span>
                  <span className="block text-ink-soft md:hidden">
                    {item.artist}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* What's in your hands: only changes when you pick another record */}
        <div
          aria-live="polite"
          className="mx-auto mt-14 max-w-xl md:mt-16 md:text-center"
        >
          {album && (
            <>
              <h3 className="text-lead font-bold tracking-[-0.03em]">
                {album.title}
              </h3>
              <p>{album.artist}</p>
              {album.note && (
                <div className="mt-4 space-y-3">
                  {album.note.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
              {album.track && (
                <p className="mt-3">
                  start with:{" "}
                  {album.track.spotify ? (
                    <a
                      href={album.track.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
                    >
                      {album.track.title}
                    </a>
                  ) : (
                    <span className="font-medium">{album.track.title}</span>
                  )}
                </p>
              )}
              <a
                href={album.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition hover:-translate-y-0.5 hover:bg-blue active:translate-y-0"
              >
                listen on spotify ↗
              </a>
            </>
          )}
        </div>
      </section>

      {/* Secret Game */}
      <section className="mt-24 flex flex-col items-start gap-4 px-4 md:mt-32 md:px-8">
        <h2 className="sr-only">a secret</h2>
        <button
          type="button"
          onClick={() => setClicks((count) => count + 1)}
          className="cursor-pointer rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0"
        >
          [do not click]
        </button>
        <div aria-live="polite">
          {clicks > 0 && (
            <motion.p
              key={secretMessage(clicks)}
              className="text-lead"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {secretMessage(clicks)}
            </motion.p>
          )}
        </div>
      </section>

      {/* A fake achievement, game-console style */}
      <div
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        <AnimatePresence>
          {achievement && (
            <motion.div
              className="flex items-center gap-4 rounded-full bg-ink py-3 pl-3 pr-6 text-paper"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun text-ink">
                <FaTrophy size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-fine opacity-80">
                  achievement unlocked
                </span>
                <span className="block font-bold">no impulse control</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ReviewDialog
        film={openFilmId ? films[openFilmId] : null}
        returnFocusTo={reviewTrigger}
        onClose={() => setOpenFilmId(null)}
      />
    </main>
  );
}
