import Image from "next/image";
import type { Film } from "@/data/films";

// A film's poster in a portrait frame (spans, so it can sit inside a button). Landscape posters sit whole on an ink
// mat; films without a poster get their title set in the frame instead.
export default function FilmPoster({
  film,
  sizes,
  className = "",
  decorative = false,
}: {
  film: Film;
  sizes: string;
  className?: string;
  // Inside a control that already names the film, the poster is decoration
  decorative?: boolean;
}) {
  const { poster } = film;

  if (!poster) {
    return (
      <span
        aria-hidden={decorative || undefined}
        className={`flex aspect-[2/3] flex-col justify-end bg-ink p-4 text-paper ${className}`}
      >
        <span className="text-lead font-bold leading-tight tracking-[-0.03em]">
          {film.title}
        </span>
        <span className="mt-1 text-fine opacity-80">{film.year}</span>
      </span>
    );
  }

  const contain = poster.fit === "contain";
  return (
    <span
      className={`block overflow-hidden ${contain ? "bg-ink" : ""} ${className}`}
    >
      <Image
        src={poster.src}
        alt={decorative ? "" : `Poster for ${film.title} (${film.year})`}
        width={poster.width}
        height={poster.height}
        sizes={sizes}
        className={`aspect-[2/3] w-full ${
          contain ? "object-contain" : "object-cover"
        }`}
      />
    </span>
  );
}
