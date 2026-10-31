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

// The about page's photos, all via Wikimedia Commons
const credits = [
  {
    title: "Toronto sunrise skyline, 2014",
    href: "https://commons.wikimedia.org/w/index.php?curid=57024776",
    by: "OldYorkGuy, CC BY-SA 3.0",
  },
  {
    title: "Peter Witt streetcar on Queen Street in Toronto",
    href: "https://commons.wikimedia.org/wiki/File:Peter_Witt_streetcar_on_Queen_Street_in_Toronto.jpg",
    by: "Robert Taylor, CC BY 2.0",
  },
  {
    title: "KeeleCampus2",
    href: "https://commons.wikimedia.org/w/index.php?curid=19352958",
    by: "Raysonho, CC0",
  },
  {
    title: "Toronto Davisville Subway Station Postcard",
    href: "https://commons.wikimedia.org/wiki/File:Toronto_Davisville_Subway_Station_Postcard_(P300544).jpg",
    by: "Royal Specialty, public domain",
  },
];

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
    <main>
      {/* Heading */}
      <header className="px-4 pt-28 md:px-8 md:pt-36">
        <h1 className="reveal text-[2.6rem] leading-[0.9] md:text-poster">
          hi! i&#39;m zuhaib [he/him]
        </h1>

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
            src="/about/toronto-sunrise.webp"
            alt="Toronto's skyline lit gold by the low winter sun, just after sunrise"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 760px, 100vw"
            aspect="aspect-[4/3]"
            tilt="rotate-1"
            priority
            caption="toronto, just after sunrise. home base."
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
              RealTalkTracker
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
            className="py-4"
            src="/about/york-keele-campus.webp"
            alt="The York University Keele Campus sign on York Boulevard, with trees and blue sky behind it"
            width={1920}
            height={1280}
            sizes="(min-width: 768px) 700px, 100vw"
            aspect="aspect-[3/2]"
            tilt="-rotate-2"
            caption={`york's keele campus, where the semicolons live.`}
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

        {/* The city, in a full band */}
        <TapedPrint
          className="px-4 md:px-8"
          src="/about/queen-street-1975.webp"
          alt="A wooden Peter Witt streetcar rolling down Queen Street in Toronto in 1975"
          width={1798}
          height={1128}
          sizes="100vw"
          aspect="aspect-[16/9]"
          tilt="-rotate-1"
          caption="queen street, toronto, 1975. ultimate goal: walk every street in this city."
        />

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
            className="pt-6"
            src="/about/davisville-postcard.webp"
            alt="A late-1960s postcard of Davisville subway station, with a red train beside a silver one"
            width={1477}
            height={933}
            sizes="(min-width: 768px) 700px, 100vw"
            aspect="aspect-[1477/933]"
            tilt="rotate-2"
            caption={`davisville station on a late-'60s postcard. the city before i started walking it.`}
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

      <p className="px-4 py-10 text-fine text-ink-soft md:px-8">
        Pictures, via Wikimedia Commons:{" "}
        {credits.map((credit, index) => (
          <span key={credit.href}>
            {index > 0 && "; "}
            <a className="underline" href={credit.href}>
              “{credit.title}”
            </a>{" "}
            by {credit.by}
          </span>
        ))}
        .
      </p>
    </main>
  );
};

export default AboutClient;
