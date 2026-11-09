"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type Project = {
  name: string;
  subtitle: string;
  description: string;
  underTheHood: string[];
  tech: string[];
  live?: string;
  // What the live link says, when "open project" doesn't fit
  liveLabel?: string;
  github?: string;
  note: string;
  // Said in place of the live link when there isn't one yet
  noLive?: string;
  screens?: { src: string; alt: string }[];
  // Takes the screenshots' place until there are some
  pullQuote?: { text: string; caption: string };
};

const projects: Project[] = [
  {
    name: "Talk Tracker",
    subtitle: "chat analysis thingymahjig",
    description:
      "upload a WhatsApp or copied Instagram chat and it’ll tell you who yaps more, who replies slower, who starts everything, and who keeps double texting, then hand out awards unlikely to impress an employer. a language model decides who’s funnier, because apparently we needed outside arbitration.",
    underTheHood: [
      "the whatsapp parser figures out the date format (dd/mm vs mm/dd) once per file instead of guessing line by line",
      "long chats go to the ai as about ten stretches of 20 messages in a row, spread from the very start to the very end, so replies stay next to what they're replying to. same file, same sample",
      "the ai's answer has to pass a strict schema, then the backend checks that every person in the chat is in it exactly once",
      "if the ai refuses, times out or runs out of daily attempts, your stats still show up. the numbers have no business hours",
      "accounts run on supabase (email or google), and the token gets checked before the file is even read, so a signed-out request can't use up anything",
      "daily ai attempts are reserved atomically in redis, so two people at once can't claim the same one",
      "in group chats nobody can tell who was answering whom, so “fastest responder” becomes “quickest to jump in”",
      "ci runs the backend tests and the frontend lint + build on every push to main and every pr",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "FastAPI",
      "Python",
      "OpenAI",
      "Upstash Redis",
      "Supabase",
    ],
    live: "https://real-talk-tracker.vercel.app",
    github: "https://github.com/zuuhaaib/RealTalkTracker",
    note: "therapy was apparently too expensive",
    screens: [
      {
        src: "/projects/talktracker-hero.webp",
        alt: "Talk Tracker landing page asking who's carrying the chat, with an upload button",
      },
      {
        src: "/projects/talktracker-chat.webp",
        alt: "Exhibit a: a sample chat between milo and sam about a pet horse, annotated line by line",
      },
      {
        src: "/projects/talktracker-stats.webp",
        alt: "Sample results: 60% of the chat is milo, 4 hours for sam to reply, 3 horse mentions, above a badly drawn horse on a balcony",
      },
    ],
  },
  {
    name: "Somewhere, Somehow",
    subtitle: "an atlas of everywhere you've been",
    description:
      "give it your location history (a csv, a google timeline export, or visits you log by hand) and it turns it into a personal atlas: the places you keep going back to, the routines they belong to, the ones that quietly dropped out of your life, and a guess at where you'd go next. if it says something you don't believe, “why are you saying this?” opens the counts and dates behind it.",
    underTheHood: [
      "visits are worked out from where you actually stayed, then grouped into places with dbscan using haversine distance",
      "routines and places you stopped going have to pass binomial and poisson tests, so a gap in your data doesn't get mistaken for a life change",
      "where to next? pits baselines and markov chains against gradient-boosted trees, tested in date order and never shuffled. the fancy model only gets picked if it actually earns it",
      "it only shows percentages when they're calibrated. otherwise it uses words, like someone who knows they're guessing",
      "no accounts, no database, no live location. uploads are read in memory and thrown away after the response",
      "the demo is a simulated person: a year of noisy fake gps that goes through the same parser and pipeline as a real upload",
      "79 tests, all on synthetic fixtures with known answers",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "MapLibre GL",
      "FastAPI",
      "pandas",
      "SciPy",
      "scikit-learn",
    ],
    github: "https://github.com/zuuhaaib/somewhere-somehow",
    note: "it's not a tracker. it would like that on the record.",
    noLive: "not deployed yet. the code's on github in the meantime.",
    screens: [
      {
        src: "/projects/somewhere-landing.webp",
        alt: "Somewhere, Somehow landing page: the title beside a hand-drawn atlas plate of visited places",
      },
      {
        src: "/projects/somewhere-atlas.webp",
        alt: "The atlas view for a synthetic demo person: a dark map of places sized by visits, with a list of the usual places",
      },
      {
        src: "/projects/somewhere-patterns.webp",
        alt: "The patterns view: a weekly rhythm heatmap, arrival times and written observations",
      },
    ],
  },
  {
    name: "this website",
    subtitle: "the one you're on right now",
    description:
      "a portfolio that is mostly an excuse to talk about music. a 3d turntable you click to drop the needle, a half-hidden record you scroll to spin, film reviews pinned to a wall, and a crate of albums to dig through. the projects are in here somewhere too. you're looking at them.",
    underTheHood: [
      "the turntable is a real 3d model, squeezed from 16 mb down to under 500 kb, and it only loads once it's actually on screen",
      "the music doesn't download until you click the turntable. nobody asked for autoplay",
      "the vinyl wheel works out its own geometry from your screen size, so the labels never fall off the edge",
      "film reviews open in a native dialog: focus stays inside, escape closes it, and spoilers stay hidden until you ask",
      "there are easter eggs. i'm not saying where. (try typing brian)",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Three Fiber",
      "Framer Motion",
    ],
    live: "https://portfolio-zuuhaaibs-projects.vercel.app",
    liveLabel: "you're already here",
    github: "https://github.com/zuuhaaib/portfolio",
    note: "yes, it's in its own projects section. no, i won't be taking questions.",
    screens: [
      {
        src: "/projects/portfolio-home.webp",
        alt: "This site's homepage: the name split either side of a 3D record player on a yellow disc",
      },
      {
        src: "/projects/portfolio-vinyl.webp",
        alt: "The explore page: a half-hidden vinyl record with section labels around its edge",
      },
      {
        src: "/projects/portfolio-films.webp",
        alt: "The brian_rot page: four film posters pinned crooked to a blue wall",
      },
    ],
  },
  {
    name: "Do It Eventually",
    subtitle:
      "a productivity app that remembers every time you said “i'll do it tomorrow”",
    description:
      "a task manager that keeps track of what you need to do and also of how you behave around it: which deadlines you move, what you finish at 11:58 pm, what you quietly give up on. it uses that history to tell you what to do next, and gives you a procrastination score that is, by its own admission, scientifically questionable. moving a deadline asks you to commit to the lie. abandoned tasks get buried in a graveyard. there's a little 3d houseplant that droops as your score climbs.",
    underTheHood: [
      "the browser never talks to the database. it signs in with google through supabase and sends the token to a fastapi server, which takes your user id from the token, so nothing in a request can pick whose tasks it reads",
      "every change is written to an append-only event log in the same transaction, so a moved deadline is remembered forever. the receipts are the point",
      "the recommendation is a plain sum of named factors (priority, overdue, due soon, reschedules, age, quick wins), so the explanation is just the two biggest ones read out loud",
      "the procrastination score caps each bad habit, gives credit for finishing things and streaks, and maps the total to a diagnosis. no language model is consulted",
      "row-level security on every table as a backstop, so the database can't be read or written around the api",
      "81 backend tests, including token verification and user isolation on every endpoint",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Three Fiber",
      "Framer Motion",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Supabase",
    ],
    note: "built with a concerning amount of self-awareness.",
    noLive:
      "no link yet. it's finished, it just hasn't been deployed. which is, honestly, on brand.",
    pullQuote: {
      text: "future-you has formally requested legal representation",
      caption:
        "an actual diagnosis it can give you. screenshots are coming. eventually.",
    },
  },
];

const pill =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition hover:-translate-y-0.5 active:translate-y-0";

export default function ProjectsClient() {
  return (
    <main className="pb-24 md:pb-32">
      {/* Title and what this page is */}
      <header className="grid items-end gap-6 px-4 pt-28 md:grid-cols-12 md:px-8 md:pt-36">
        <h1 className="reveal text-poster md:col-span-7">projects</h1>
        <p
          className="reveal max-w-[34ch] text-lead md:col-span-5"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          things i made instead of sleeping. software experiments, questionable
          ideas, and things that somehow survived long enough to make it onto
          the internet.
        </p>
      </header>

      {projects.map((project) => (
        <article key={project.name} className="mt-28 md:mt-40">
          {/* The name holds still while the screens pass by */}
          <div className="grid gap-10 px-4 md:grid-cols-12 md:px-8">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <p className="text-lead text-ink-soft">{project.subtitle}</p>
                <h2 className="mt-2 text-head">{project.name}</h2>
                <p className="mt-6 max-w-[42ch]">{project.description}</p>
                <p className="mt-4">{project.note}</p>
                {project.noLive && (
                  <p className="mt-7 max-w-[42ch] font-medium">
                    {project.noLive}
                  </p>
                )}
                <div className="mt-7 flex flex-wrap gap-3 empty:hidden">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${pill} bg-ink text-paper hover:bg-blue hover:text-paper`}
                    >
                      {project.liveLabel ?? "open project"}
                      <FaArrowUpRightFromSquare size={14} aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${pill} bg-sun text-ink hover:bg-ink hover:text-paper`}
                    >
                      <FaGithub size={17} aria-hidden="true" />
                      github
                    </a>
                  )}
                </div>
              </div>
            </div>

            {project.pullQuote && (
              <figure className="reveal flex aspect-[16/10] flex-col justify-end rounded-frame bg-blue p-6 text-paper md:col-span-7 md:p-10">
                <blockquote className="text-lead font-bold tracking-[-0.03em] md:text-head">
                  “{project.pullQuote.text}”
                </blockquote>
                <figcaption className="mt-4">
                  {project.pullQuote.caption}
                </figcaption>
              </figure>
            )}

            <ul className="flex flex-col gap-16 empty:hidden md:col-span-7 md:gap-24">
              {project.screens?.map((screen, index) => (
                <li
                  key={screen.src}
                  className="reveal"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <div className="overflow-hidden rounded-frame">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={1280}
                      height={800}
                      sizes="(min-width: 768px) 760px, 100vw"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* The details, on a sunflower field */}
          <section className="mt-24 bg-sun px-4 py-20 md:mt-32 md:px-8 md:py-28">
            <div className="grid gap-10 md:grid-cols-12">
              <h3 className="reveal text-head md:col-span-4">under the hood</h3>
              <div className="md:col-span-8">
                <ul className="space-y-5 text-lead">
                  {project.underTheHood.map((item, index) => (
                    <li
                      key={item}
                      className="reveal"
                      style={{ "--i": index } as React.CSSProperties}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <ul
                  aria-label="Built with"
                  className="mt-10 flex flex-wrap gap-2"
                >
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-paper px-4 py-1.5 text-fine font-medium"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </article>
      ))}

      {/* What's still in the oven */}
      <section className="relative mt-24 overflow-hidden px-4 md:mt-32 md:px-8">
        <div className="grid min-h-[60svh] items-center gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-6">
            <h2 className="text-head">more questionable ideas soon</h2>
            <p className="mt-6 max-w-md">
              currently cooking: a social music app that lets people see what
              others nearby are jamming to. it&#39;s still in the oven, so it
              doesn&#39;t get its own spot yet.
            </p>
            <p className="mt-4 max-w-md">
              unfortunately i have not stopped making things. more projects will
              appear here as soon as they become presentable enough to admit i
              made them.
            </p>
          </div>

          {/* A record waiting to be pressed, half out of frame */}
          <div className="relative h-[50svh] lg:col-span-6 lg:h-[70svh]">
            <Image
              src="/vinyl_texture.png"
              alt="A black vinyl record with a white centre label, spinning"
              width={720}
              height={720}
              className="absolute left-[20%] top-1/2 aspect-square h-full w-auto max-w-none -translate-y-1/2 rounded-full motion-safe:animate-[spin_40s_linear_infinite] lg:left-[30%]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
