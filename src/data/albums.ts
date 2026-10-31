// The albums in the brian_rot crate. `note` and `track` are optional and only
// show up on the page once they've been written.

export type Album = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  spotify: string;
  // One string per paragraph
  note?: readonly string[];
  // A track to start with
  track?: { title: string; spotify?: string };
};

export const albums: readonly Album[] = [
  {
    id: "the-glow-pt-2",
    title: "The Glow Pt. 2",
    artist: "The Microphones",
    cover: "/the-glow.jpg",
    spotify:
      "https://open.spotify.com/album/6QYoRO2sXThCORAifrP4Bl?si=kicKqtHbQWCXr9q-hCvJcg",
  },
  {
    id: "spiderland",
    title: "Spiderland",
    artist: "Slint",
    cover: "/spiderland.jpg",
    spotify:
      "https://open.spotify.com/album/2NnkLRaeX33d1Mn8ZLgTo8?si=LGSQMwlgQ8aCdzr1yX5r2Q",
  },
  {
    id: "black-saint",
    title: "The Black Saint and the Sinner Lady",
    artist: "Charles Mingus",
    cover: "/mingus.jpg",
    spotify:
      "https://open.spotify.com/album/6Sts4Yh7KsDFwq2yTWrGGV?si=uYn9Fj_jRZeDB8jG4rw_jA",
  },
  {
    id: "98-12-28",
    title: "98.12.28",
    artist: "Fishmans",
    cover: "/fishmans.jpg",
    spotify:
      "https://open.spotify.com/album/5K4YFkTizFoMOyN5Khfp7G?si=-4x_M0kJSPa0z2N0jujcVQ",
  },
];
