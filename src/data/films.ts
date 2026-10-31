// Films on the brian_rot page and the reviews written for them. Review text is
// kept exactly as written (lowercase, slang and all); each string in `review`
// is one paragraph.

export type FilmId =
  | "go"
  | "past-lives"
  | "trainspotting"
  | "sorry-baby"
  | "paris-texas"
  | "swing-girls"
  | "solaris"
  | "it-follows"
  | "stand-by-me";

export type Poster = {
  src: string;
  width: number;
  height: number;
  // Landscape posters (like a UK quad) sit whole inside the portrait frame
  // instead of being cropped
  fit?: "cover" | "contain";
};

export type Film = {
  id: FilmId;
  title: string;
  year: number;
  director: string;
  // Out of 5, when given
  rating?: number;
  // ISO date (yyyy-mm-dd) of the watch the review belongs to, when given
  watched?: string;
  rewatch?: boolean;
  poster?: Poster;
  // The full review, one string per paragraph
  review: readonly string[];
  // A line lifted from the review to show on its own
  excerpt?: string;
  // Paragraphs from `from` onward discuss plot details and stay hidden until
  // the reader asks for them
  spoilers?: { from: number; note: string };
  // A general film page, not a personal review link
  letterboxd: string;
};

const solarisOpening =
  "the further we travel into the unknown the more we seem to run into ourselves";

export const films: Record<FilmId, Film> = {
  go: {
    id: "go",
    title: "Go",
    year: 1999,
    director: "Doug Liman",
    rating: 5,
    watched: "2024-10-29",
    poster: { src: "/go.jpg", width: 667, height: 1000 },
    review: ["this happened to me once"],
    letterboxd: "https://letterboxd.com/film/go/",
  },
  "past-lives": {
    id: "past-lives",
    title: "Past Lives",
    year: 2023,
    director: "Celine Song",
    rating: 5,
    watched: "2026-04-14",
    rewatch: true,
    poster: { src: "/films/past-lives.webp", width: 255, height: 378 },
    review: [
      "when you try to do away with it entirely but instead just live an inversion of it, thus continuing to refer to it directly smh my head",
      "this was even worse on rewatch! im gonna be siiick",
    ],
    letterboxd: "https://letterboxd.com/film/past-lives/",
  },
  trainspotting: {
    id: "trainspotting",
    title: "Trainspotting",
    year: 1996,
    director: "Danny Boyle",
    rating: 5,
    watched: "2026-03-14",
    poster: {
      src: "/films/trainspotting.webp",
      width: 360,
      height: 270,
      fit: "contain",
    },
    review: [
      "life might not have any inherent meaning, but choosing it anyway might be the most terrifying and liberating thing you can do",
      "also the anti drug campaigns in school could've just shown this and called it a day",
    ],
    letterboxd: "https://letterboxd.com/film/trainspotting/",
  },
  "sorry-baby": {
    id: "sorry-baby",
    title: "Sorry, Baby",
    year: 2025,
    director: "Eva Victor",
    rating: 5,
    watched: "2026-04-06",
    poster: { src: "/films/sorry-baby.webp", width: 253, height: 394 },
    review: [
      "really funny, really devastating and so beautifully made, both in the writing and in the way it's shot. i loved how honest it felt about the strange loneliness of trying to keep living after something painful and all the awkwardness, distance and ordinary moments that come after",
      "perhaps one day she and the baby can share a nice sandwich together",
    ],
    letterboxd: "https://letterboxd.com/film/sorry-baby-2025/",
  },
  "paris-texas": {
    id: "paris-texas",
    title: "Paris, Texas",
    year: 1984,
    director: "Wim Wenders",
    rating: 5,
    watched: "2026-06-22",
    review: [
      "you spend so much time wishing you could go back and fix the past that you forget the ppl in your memories have been living without you this whole time. and by the time you finally look back and understand what you've done, they're no longer the people you remember and neither is the life you left behind",
    ],
    letterboxd: "https://letterboxd.com/film/paris-texas/",
  },
  "swing-girls": {
    id: "swing-girls",
    title: "Swing Girls",
    year: 2004,
    director: "Shinobu Yaguchi",
    rating: 5,
    watched: "2026-08-31",
    review: [
      "so full of heart, wholesome, ridiculous and fun! a movie about finding something you love by accident with your friends (along with poisoning the brass band, a boar incident, a man falling off with his bicycle and cycling off as if nothing happened) and being stupid and happy together. i hope i get to do this for a long time",
    ],
    letterboxd: "https://letterboxd.com/film/swing-girls/",
  },
  solaris: {
    id: "solaris",
    title: "Solaris",
    year: 1972,
    director: "Andrei Tarkovsky",
    rating: 5,
    watched: "2026-07-01",
    poster: { src: "/films/solaris.webp", width: 200, height: 322 },
    review: [
      solarisOpening,
      "you can leave a person, a place or an entire life behind but your memory keeps finding ways to follow you. solaris is a very slow, meditative journey through love, memory and guilt. the visuals are hauntingly beautiful and even at their simplest they hit insanely hard. like tarkovsky really made me sit through a man just driving back for 5 goddamn mins smh my head",
      "hari seems to be a projection of kris's unresolved guilt. at first she exists only because of him but the more human she becomes, the more tragic her existence feels. she slowly realizes she's trapped inside of someone else's grief, condemned to be loved for what she represents and not what she is. who do we actually love? the person standing in front of us or the perfect version of them we've constructed through our memory?",
      "solaris is basically 3 hours of being forced to look directly at the things you thought time had already buried. mayhaps only when a man has dealt with his past can a man truly live in the present or wtv, but even then you never really escape your past bc you are partly made up of things you cannot leave behind",
    ],
    excerpt: solarisOpening,
    spoilers: { from: 1, note: "the full review contains plot details." },
    letterboxd: "https://letterboxd.com/film/solaris/",
  },
  "it-follows": {
    id: "it-follows",
    title: "It Follows",
    year: 2014,
    director: "David Robert Mitchell",
    rating: 2.5,
    watched: "2026-08-29",
    review: ["they turned the snail hypothetical into a movie"],
    letterboxd: "https://letterboxd.com/film/it-follows/",
  },
  "stand-by-me": {
    id: "stand-by-me",
    title: "Stand by Me",
    year: 1986,
    director: "Rob Reiner",
    review: [
      "there's a specific kind of friendship that only exists when you're young and dumb and have nothing but time",
      "something about people just drifting apart gets to me. somewhere out there is the last time you'll hang out with your friend and neither of you know it's the last time. years pass and eventually they're just someone you think of when a certain song plays. absolutely sick and twisted behavior frmo the passage of time",
    ],
    letterboxd: "https://letterboxd.com/film/stand-by-me/",
  },
};

// The current top four, in order
export const favoriteFilmIds: readonly FilmId[] = [
  "go",
  "past-lives",
  "trainspotting",
  "sorry-baby",
];

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

// "watched mar 14, 2026" / "rewatched apr 14, 2026". Formatted by hand so the
// server and the browser always print the same thing.
export function watchedLabel(film: Film) {
  if (!film.watched) return null;
  const [year, month, day] = film.watched.split("-").map(Number);
  const verb = film.rewatch ? "rewatched" : "watched";
  return `${verb} ${MONTHS[month - 1]} ${day}, ${year}`;
}

export function ratingLabel(film: Film) {
  return film.rating === undefined ? null : `${film.rating}/5`;
}

// Year, director, rating and watch date, leaving out whatever isn't known
export function filmDetails(film: Film) {
  return [film.year, film.director, ratingLabel(film), watchedLabel(film)]
    .filter(Boolean)
    .join(" · ");
}
