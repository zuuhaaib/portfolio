"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const projects = [
  {
    name: "RealTalkTracker",
    subtitle: "chat analysis thingymahjig",
    description:
      "feed it an exported WhatsApp chat or a copied Instagram conversation and it’ll tell you who talks the most, who takes forever to reply, who keeps double texting, and what an AI thinks your friendship actually looks like.",
    underTheHood: [
      "the whatsapp parser figures out the date format (dd/mm vs mm/dd) once per file instead of guessing line by line",
      "the ai gets contiguous excerpts from across the whole chat, and its response has to pass strict structured-output validation before you see it",
      "one shared daily ai quota enforced by an atomic redis lua script, plus rate and concurrency limits so nobody melts the server",
      "ci runs the backend tests and the frontend lint + build on every push to main and every pr",
    ],
    tech: ["Next.js", "FastAPI", "Python", "OpenAI", "Redis", "Recharts"],
    live: "https://real-talk-tracker.vercel.app",
    github: "https://github.com/zuuhaaib/RealTalkTracker",
    note: "therapy was apparently too expensive",
    screens: [
      {
        src: "/projects/rtt-hero.webp",
        alt: "RealTalkTracker landing page asking who's actually carrying the chat",
      },
      {
        src: "/projects/rtt-chat.webp",
        alt: "A sample chat between alex and sam about a sandwich, shown on RealTalkTracker",
      },
      {
        src: "/projects/rtt-stats.webp",
        alt: "RealTalkTracker sample findings: message share, median reply gap and the AI's pick for the funny one",
      },
    ],
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
          things i made instead of sleeping. software experiments,
          questionable ideas, and things that somehow survived long enough to
          make it onto the internet.
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
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pill} bg-ink text-paper hover:bg-blue hover:text-paper`}
                  >
                    open project
                    <FaArrowUpRightFromSquare size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pill} bg-sun text-ink hover:bg-ink hover:text-paper`}
                  >
                    <FaGithub size={17} aria-hidden="true" />
                    github
                  </a>
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-16 md:col-span-7 md:gap-24">
              {project.screens.map((screen, index) => (
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
                <ul aria-label="Built with" className="mt-10 flex flex-wrap gap-2">
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
