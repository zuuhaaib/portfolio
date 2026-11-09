"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const pill =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition hover:-translate-y-0.5 active:translate-y-0";

// One section of the about page: its heading holds on the left while the
// writing (and any pictures) scroll past on the right.
function Chapter({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 px-4 md:grid-cols-12 md:gap-10 md:px-8">
      <div className="md:col-span-4">
        <h2 className="reveal text-lead font-medium md:sticky md:top-28">
          {title}
        </h2>
      </div>
      <div className="reveal max-w-[62ch] space-y-4 md:col-span-7">
        {children}
      </div>
    </section>
  );
}

// A photo taped into the zine slightly crooked; it straightens up when you
// look at it
function TapedPrint({
  src,
  alt,
  width,
  height,
  sizes,
  aspect,
  caption,
  tilt,
  priority,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  aspect: string;
  caption: string;
  tilt: string;
  priority?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <figure
      className={`reveal ${className}`}
      style={{ "--i": delay } as React.CSSProperties}
    >
      <div
        className={`group relative bg-paper-2 p-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none md:p-3 ${tilt}`}
      >
        {/* Tape */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 bg-paper/70"
        />
        <div className="overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className={`${aspect} w-full object-cover`}
          />
        </div>
      </div>
      <figcaption className="mt-4 text-fine text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

// Quick facts, all lifted from further down this page
const facts = [
  { label: "based in", value: "toronto, canada" },
  { label: "studying", value: "computer science at york, graduating in 2026" },
  { label: "clubs", value: "robotics club, cshub" },
  { label: "vs code themes installed", value: "approximately 47" },
  { label: "currently cooking", value: "a social music app" },
];

// A sticker slapped on the page: the facts, plus one that's been redacted
function FactSheet() {
  const [revealed, setRevealed] = useState(false);

  return (
    <aside className="reveal px-4 md:px-8">
      <div className="mx-auto max-w-xl -rotate-1 bg-sun p-6 text-ink md:ml-auto md:mr-[6%] md:-rotate-2 md:p-10">
        <h2 className="text-head">the fact sheet</h2>
        <dl className="mt-6 space-y-4">
          {facts.map((fact) => (
            <div key={fact.label} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="font-medium">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="font-medium">toronto streets walked</dt>
            <dd>
              <button
                type="button"
                aria-pressed={revealed}
                onClick={() => setRevealed((value) => !value)}
                className={`cursor-pointer px-1 text-left transition-colors duration-300 ${
                  revealed
                    ? "bg-transparent text-ink"
                    : "bg-ink text-transparent hover:bg-transparent hover:text-ink" // taste-skill-ignore: a redaction bar, not clipped text
                }`}
              >
                we don&#39;t talk about that
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

const AboutClient: React.FC = () => {
  return (
    <main className="pb-24 md:pb-32">
      {/* Heading */}
      <header className="px-4 pt-28 md:px-8 md:pt-36">
        <h1 className="reveal text-[2.6rem] leading-[0.9] md:text-poster">
          hi! i&#39;m zuhaib [he/him]
        </h1>
        <p
          className="reveal mt-6 text-lead text-ink-soft"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          reading time: 4 min, or 12 if you look at the pictures
        </p>

        {/* Intro, next to the city it's written from */}
        <div className="mt-12 grid items-end gap-8 md:mt-16 md:grid-cols-12 md:gap-10">
          <p
            className="reveal text-lead md:col-span-5"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Currently stationed in Toronto, Canada, and on a lifelong quest to
            make cool things, break (and sometimes fix) software, and
            overanalyze the world around me. This page is a loosely
            structured, slightly unhinged collection of things I do and care
            about. Read at your own risk.
          </p>

          <TapedPrint
            className="md:col-span-7"
            delay={2}
            src="/100th CN tower pic.jpeg"
            alt="The CN Tower lit pink and blue over the Toronto skyline at night, seen across the water past rows of sailboats"
            width={1600}
            height={1556}
            sizes="(min-width: 768px) 760px, 100vw"
            aspect="aspect-[1600/1556]"
            tilt="rotate-1"
            priority
            caption="my 100th picture of the cn tower. home base."
          />
        </div>
      </header>

      <div className="mt-24 md:mt-32">
        <FactSheet />
      </div>

      <div className="mt-28 space-y-24 md:mt-40 md:space-y-32">
        <Chapter title="making software & other shenanigans">
          <p>
            My coding origin story involves stumbling upon a tutorial,
            pressing random keys, and realizing I could make a computer do my
            bidding. Years later, I still haven’t stopped.
          </p>
          <p>
            Currently cooking: a <strong className="font-medium">social music app</strong>{" "}
            that lets people see what others nearby are jamming to (like a
            concert, but without the ticket price). It&#39;s not on the projects
            page yet because it&#39;s still in the oven. What is there:{" "}
            <Link
              href="/projects"
              className="font-medium underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
            >
              Talk Tracker
            </Link>
            , which analyzes chat data for deep, possibly concerning insights
            into your digital conversations. If you’ve ever wanted an AI
            therapist for your group chats, good news! I’ve got you covered.
          </p>
        </Chapter>

        <Chapter title="my academic journey (and the quest for caffeine)">
          <p>
            I’m currently navigating the academic jungle at{" "}
            <strong className="font-medium">York University</strong> in Toronto,
            where I’m pursuing a{" "}
            <strong className="font-medium">
              Bachelor of Science in Computer Science
            </strong>
            , graduating in 2026. They say university is all about finding
            yourself, but so far, all I’ve found is an overwhelming pile of
            programming assignments, an ever-growing list of debugging
            nightmares, and a deep appreciation for well-placed semicolons.
          </p>
          <TapedPrint
            className="max-w-md py-4"
            src="/uni morning walk.jpeg"
            alt="A misty pond on an early morning walk, trees and autumn leaves reflected in the still water"
            width={1200}
            height={1600}
            sizes="(min-width: 768px) 448px, 100vw"
            aspect="aspect-[3/4]"
            tilt="-rotate-2"
            caption="a morning walk at uni, before the semicolons."
          />
          <p>
            Somewhere along the way, I’ve pulled all-nighters that turned into
            sunrises, had debates that spiraled into existential crises, and
            made friendships that feel like home. It’s a strange, chaotic blur
            of learning, unlearning, and figuring things out as I go. But maybe
            that’s the point, because in the mess of it all, between the
            lectures and the laughter, the stress and the spontaneity, I think
            I’m starting to find something after all.
          </p>
        </Chapter>

        <Chapter title="extracurriculars (aka my attempt to have a social life)">
          <p>
            I&#39;m also a proud member of the{" "}
            <strong className="font-medium">Robotics Club</strong> and{" "}
            <strong className="font-medium">CSHub</strong>, where I attempt to
            build things that don&#39;t immediately catch on fire. It&#39;s been
            an exciting ride of learning, collaborating, and pretending to
            understand everything that&#39;s going on. It&#39;s a solid balance of
            academic and personal growth... mostly personal growth, though.
          </p>
        </Chapter>

        <Chapter title="tech’s impact on humans">
          <p>
            Software doesn’t exist in a vacuum, it changes how we live, work,
            and doomscroll at 2 AM. That’s why I spend a lot of time thinking
            about the ethical and societal implications of tech.
          </p>
          <p>
            In winter 2024, I took an ethics course that really resonated with
            me. I&#39;ve always been intrigued by ethics, especially metaethics,
            and how AI and technology are reshaping those concepts. The course
            pushed me to dive deeper into questions about morality in the
            digital age, questioning how emerging technologies like AI challenge
            our understanding of right and wrong.
          </p>
        </Chapter>

        <Chapter title="miscellaneous things I care about">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium">Music & movies.</strong> My brain
              runs on an endless loop of carefully curated playlists and
              Letterboxd deep dives.
            </li>
            <li>
              <strong className="font-medium">Pretty VS Code themes.</strong> I
              have approximately 47 installed. No, I will not delete any of
              them.
            </li>
            <li>
              <strong className="font-medium">
                Books, blogs, & YouTube deep dives.
              </strong>{" "}
              My reading list is 90% ‘existential crises and bleak reflections
              on life’ and 10% ‘random niche topics I’ll passionately explain to
              you unprompted.’ It also takes me forever to finish a book, so the
              list keeps growing while I pretend I’m making progress.
            </li>
            <li>
              <strong className="font-medium">
                Sunrises, sunsets, and running through city streets.
              </strong>{" "}
              Ultimate goal: walk every street in Toronto. Progress: …we don’t
              talk about that.
            </li>
          </ul>
          <TapedPrint
            className="max-w-md pt-6"
            src="/interesting looking cone.jpeg"
            alt="An orange traffic cone with a doodle on it, standing on a sidewalk beside a red construction fence"
            width={1200}
            height={1600}
            sizes="(min-width: 768px) 448px, 100vw"
            aspect="aspect-[3/4]"
            tilt="rotate-2"
            caption="an interesting looking cone. one of the perks of walking every street."
          />
        </Chapter>
      </div>

      {/* Contact Section, on a sunflower field */}
      <section className="mt-28 bg-sun px-4 py-20 md:mt-40 md:px-8 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <h2 className="text-head">say hi</h2>
            <p className="mt-6 max-w-[48ch] text-lead">
              If you made it this far, congrats! you now know more about me
              than most of my extended family. If you want to{" "}
              <strong className="font-medium">
                chat, collaborate, or hire me (please)
              </strong>
              , shoot me an email.
            </p>
          </div>
          <div
            className="reveal flex flex-wrap gap-3 md:col-span-5 md:justify-end"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <a
              href="mailto:zuuhaaib@gmail.com"
              className={`${pill} bg-ink text-paper hover:bg-paper hover:text-ink`}
            >
              email me directly
            </a>
            {/* Take Me Back Button */}
            <Link
              href="/"
              className={`${pill} bg-paper text-ink hover:bg-ink hover:text-paper`}
            >
              take me back
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutClient;
