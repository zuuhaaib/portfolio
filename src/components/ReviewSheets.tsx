"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import FilmPoster from "@/components/FilmPoster";
import {
  filmDetails,
  ratingLabel,
  watchedLabel,
  type Film,
  type FilmId,
} from "@/data/films";

// What a review opens into. Each favourite gets its own object (a flyer, a
// letter, a ticket, a notebook page, the dark of space); anything else gets a
// plain sheet. The dialog around them handles focus, Escape and scrolling.

type SheetProps = { film: Film; onClose: () => void };

type SheetStyle = {
  // Background and text colour of the whole dialog
  surface: string;
  Sheet: (props: SheetProps) => React.ReactElement;
};

export const reviewTitleId = (film: Film) => `review-title-${film.id}`;

/* ---------- Shared pieces ---------- */

// Close stays reachable however far down the review you've read
function CloseBar({
  onClose,
  className,
  light = false,
}: {
  onClose: () => void;
  // The bar's background, matching the sheet it sits on
  className: string;
  // A paper button, for dark sheets
  light?: boolean;
}) {
  return (
    <div
      className={`sticky top-0 z-20 flex justify-end p-3 md:p-4 ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 transition active:translate-y-px ${
          light
            ? "bg-paper text-ink hover:bg-sun"
            : "bg-ink text-paper hover:bg-blue"
        }`}
      >
        <FaXmark size={16} aria-hidden="true" />
        close
      </button>
    </div>
  );
}

function LetterboxdLink({
  film,
  className = "",
}: {
  film: Film;
  className?: string;
}) {
  return (
    <a
      href={film.letterboxd}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block text-fine underline decoration-current/30 decoration-2 underline-offset-4 hover:decoration-current ${className}`}
    >
      film page on letterboxd ↗
    </a>
  );
}

// A strip of masking tape holding something to the page
function Tape() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 bg-paper/70"
    />
  );
}

// The review itself: its paragraphs, with anything marked as a spoiler held
// back until the reader asks for it
function Review({
  film,
  className = "",
  spacing = "space-y-5",
  paragraphClassName = "",
  gateClassName = "bg-sun text-ink",
  gateButtonClassName = "bg-ink text-paper hover:bg-blue",
  surfacing = false,
}: {
  film: Film;
  className?: string;
  // Gap between paragraphs, kept the same either side of the spoiler gate
  spacing?: string;
  paragraphClassName?: string;
  gateClassName?: string;
  gateButtonClassName?: string;
  // Paragraphs fade up one after another
  surfacing?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const spoilerId = useId();
  const spoilerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The reveal button disappears once pressed, so move focus to what it showed
  useEffect(() => {
    if (revealed) spoilerRef.current?.focus();
  }, [revealed]);

  const spoilerFrom = film.spoilers?.from ?? film.review.length;
  const openParagraphs = film.review.slice(0, spoilerFrom);
  const spoilerParagraphs = film.review.slice(spoilerFrom);
  const animate = surfacing && !reduceMotion;

  const paragraph = (text: string, index: number) =>
    animate ? (
      <motion.p
        key={text}
        className={paragraphClassName}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25 + index * 0.45 }}
      >
        {text}
      </motion.p>
    ) : (
      <p key={text} className={paragraphClassName}>
        {text}
      </p>
    );

  return (
    <div className={`${spacing} ${className}`}>
      {openParagraphs.map(paragraph)}

      {spoilerParagraphs.length > 0 && film.spoilers && (
        <>
          {!revealed && (
            <div className={`p-5 text-body ${gateClassName}`}>
              <p className="font-medium">{film.spoilers.note}</p>
              <button
                type="button"
                aria-expanded={revealed}
                aria-controls={spoilerId}
                onClick={() => setRevealed(true)}
                className={`mt-4 cursor-pointer rounded-full px-5 py-2.5 transition active:translate-y-px ${gateButtonClassName}`}
              >
                show the rest (spoilers)
              </button>
            </div>
          )}
          <div
            id={spoilerId}
            ref={spoilerRef}
            tabIndex={-1}
            hidden={!revealed}
            className={`${spacing} focus:outline-none`}
          >
            {revealed && spoilerParagraphs.map(paragraph)}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Go: a party flyer ---------- */

function GoSheet({ film, onClose }: SheetProps) {
  return (
    <div>
      <CloseBar onClose={onClose} className="bg-sun/95" />
      <div className="grid gap-10 px-6 pb-12 md:grid-cols-12 md:px-12 md:pb-16">
        <div className="md:col-span-7">
          <h2
            id={reviewTitleId(film)}
            className="origin-bottom-left -rotate-3 text-poster leading-[0.8]"
          >
            {film.title}
          </h2>
          <Review
            film={film}
            className="mt-12"
            spacing="space-y-4"
            paragraphClassName="max-w-[16ch] text-[1.75rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-[2.25rem]"
          />
          <p className="mt-12 text-fine">{filmDetails(film)}</p>
          <LetterboxdLink film={film} className="mt-3" />
        </div>
        <div className="md:col-span-5 md:pt-6">
          <div className="relative mx-auto w-48 rotate-3 bg-paper p-2.5 md:w-full md:max-w-[18rem]">
            <Tape />
            <FilmPoster
              film={film}
              sizes="(min-width: 768px) 288px, 192px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Past Lives: an airmail letter ---------- */

function AirmailEdge({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="block h-3 w-full">
      <defs>
        <pattern id={id} width="48" height="12" patternUnits="userSpaceOnUse">
          <polygon points="0,12 12,0 24,0 12,12" fill="#2d4fa0" />
          <polygon points="24,12 36,0 48,0 36,12" fill="#ffb511" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
}

function PastLivesSheet({ film, onClose }: SheetProps) {
  const postmark = watchedLabel(film);
  return (
    <div>
      <AirmailEdge id="airmail-top" />
      <CloseBar onClose={onClose} className="bg-paper/95" />
      <div className="px-6 pb-14 md:px-14">
        <div className="flex items-start justify-between gap-6">
          <div className="pt-2">
            <h2 id={reviewTitleId(film)} className="text-head">
              {film.title}
            </h2>
            <p className="mt-3 text-fine text-ink-soft">{filmDetails(film)}</p>
          </div>

          {/* The poster as the stamp, franked with the watch date */}
          <div className="relative shrink-0">
            <div className="w-24 rotate-2 border-4 border-dotted border-paper bg-paper-2 p-1.5 md:w-36">
              <FilmPoster film={film} sizes="(min-width: 768px) 144px, 96px" />
            </div>
            {postmark && (
              <span
                aria-hidden="true"
                className="absolute -bottom-8 -left-14 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full border-2 border-blue/70 p-3 text-center text-fine leading-tight text-blue md:-left-16 md:h-28 md:w-28"
              >
                {postmark}
              </span>
            )}
          </div>
        </div>

        <Review
          film={film}
          className="mt-14 max-w-[56ch]"
          spacing="space-y-6"
          paragraphClassName="text-lead"
        />
        <LetterboxdLink film={film} className="mt-10" />
      </div>
      <AirmailEdge id="airmail-bottom" />
    </div>
  );
}

/* ---------- Trainspotting: a ticket on a blue table ---------- */

function TrainspottingSheet({ film, onClose }: SheetProps) {
  const fields = [
    { label: "year", value: String(film.year) },
    { label: "director", value: film.director },
    { label: "rating", value: ratingLabel(film) },
    { label: "date", value: watchedLabel(film)?.replace(/^(re)?watched /, "") },
  ].filter((field) => field.value);

  return (
    <div>
      <CloseBar onClose={onClose} className="bg-blue/95" light />
      <div className="px-4 pb-12 md:px-12 md:pb-16">
        <article className="relative mx-auto max-w-3xl bg-paper text-ink">
          <header className="flex items-end justify-between gap-4 bg-ink px-6 py-5 text-paper md:px-8 md:py-6">
            <h2 id={reviewTitleId(film)} className="text-head">
              {film.title}
            </h2>
            <p className="shrink-0 pb-1 text-fine opacity-80">admit one</p>
          </header>

          <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_8rem] md:px-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {fields.map((field) => (
                <div key={field.label}>
                  <dt className="text-fine text-ink-soft">{field.label}</dt>
                  <dd className="font-bold leading-tight">{field.value}</dd>
                </div>
              ))}
            </dl>
            <FilmPoster
              film={film}
              sizes="128px"
              className="hidden md:block"
            />
          </div>

          {/* Tear here */}
          <div aria-hidden="true" className="relative h-0">
            <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-blue" />
            <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-blue" />
            <span className="absolute inset-x-6 -top-0.5 border-t-4 border-dotted border-ink/30" />
          </div>

          <div className="px-6 pb-8 pt-8 md:px-8">
            <Review
              film={film}
              className="max-w-[56ch]"
              spacing="space-y-5"
              paragraphClassName="text-lead"
            />
            <LetterboxdLink film={film} className="mt-8" />
          </div>
        </article>
      </div>
    </div>
  );
}

/* ---------- Sorry, Baby: a notebook page ---------- */

function SorryBabySheet({ film, onClose }: SheetProps) {
  return (
    <div>
      <CloseBar onClose={onClose} className="bg-paper/95" />
      <div className="grid gap-10 px-6 pb-14 md:grid-cols-12 md:px-12">
        <div className="relative pl-6 md:col-span-8 md:pl-10">
          {/* The margin */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 bg-sun"
          />
          <h2 id={reviewTitleId(film)} className="text-head">
            {film.title}
          </h2>
          <p className="mt-3 text-fine text-ink-soft">{filmDetails(film)}</p>
          <Review
            film={film}
            className="ruled-page mt-8 pt-1"
            spacing="space-y-8"
            paragraphClassName="text-[1.25rem] leading-8"
          />
          <LetterboxdLink film={film} className="mt-8" />
        </div>
        <div className="md:col-span-4 md:pt-4">
          <div className="relative mx-auto w-44 -rotate-2 bg-paper-2 p-2.5 pb-8 md:w-full md:max-w-[15rem]">
            <Tape />
            <FilmPoster
              film={film}
              sizes="(min-width: 768px) 240px, 176px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Solaris: the dark, where things come back slowly ---------- */

function SolarisSheet({ film, onClose }: SheetProps) {
  return (
    <div>
      <CloseBar onClose={onClose} className="bg-ink/95" light />
      <div className="grid gap-10 px-6 pb-14 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-14 md:px-12 md:pb-16">
        <aside className="flex gap-5 md:block">
          <FilmPoster
            film={film}
            sizes="(min-width: 768px) 224px, 112px"
            className="w-28 shrink-0 md:w-full"
          />
          <div className="md:mt-6">
            <h2 id={reviewTitleId(film)} className="text-head">
              {film.title}
            </h2>
            <p className="mt-3 text-fine text-paper/70">{filmDetails(film)}</p>
            <LetterboxdLink film={film} className="mt-4 text-paper/90" />
          </div>
        </aside>
        <Review
          film={film}
          surfacing
          className="max-w-[56ch]"
          spacing="space-y-6"
          paragraphClassName="text-lead"
          gateClassName="bg-blue text-paper"
          gateButtonClassName="bg-paper text-ink hover:bg-sun"
        />
      </div>
    </div>
  );
}

/* ---------- Anything else: a plain sheet of paper ---------- */

function PlainSheet({ film, onClose }: SheetProps) {
  return (
    <div>
      <CloseBar onClose={onClose} className="bg-paper/95" />
      <div className="grid gap-8 px-5 pb-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12 md:px-10 md:pb-12">
        <aside className="flex gap-5 md:block">
          <FilmPoster
            film={film}
            sizes="(min-width: 768px) 240px, 112px"
            className="w-28 shrink-0 bg-paper-2 md:w-full"
          />
          <div className="md:mt-5">
            <h2 id={reviewTitleId(film)} className="text-head">
              {film.title}
            </h2>
            <p className="mt-3 text-fine text-ink-soft">{filmDetails(film)}</p>
            <LetterboxdLink film={film} className="mt-4" />
          </div>
        </aside>
        <Review
          film={film}
          className="max-w-[60ch]"
          spacing="space-y-5"
          paragraphClassName="text-lead"
        />
      </div>
    </div>
  );
}

const sheets: Partial<Record<FilmId, SheetStyle>> = {
  go: { surface: "bg-sun text-ink", Sheet: GoSheet },
  "past-lives": { surface: "bg-paper text-ink", Sheet: PastLivesSheet },
  trainspotting: { surface: "bg-blue text-paper", Sheet: TrainspottingSheet },
  "sorry-baby": { surface: "bg-paper text-ink", Sheet: SorryBabySheet },
  solaris: { surface: "bg-ink text-paper", Sheet: SolarisSheet },
};

export function sheetFor(film: Film): SheetStyle {
  return sheets[film.id] ?? { surface: "bg-paper text-ink", Sheet: PlainSheet };
}
