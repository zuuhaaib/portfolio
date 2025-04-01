"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AboutPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 py-16">
      {/* Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        hi! i&#39;m zuhaib [he/him]
      </motion.h1>

      {/* Intro */}
      <motion.p
        className="max-w-2xl text-center text-lg text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        22 years old, currently stationed in Toronto, Canada, and on a lifelong
        quest to make cool things, break (and sometimes fix) software, and
        overanalyze the world around me. This page is a loosely structured,
        slightly unhinged collection of things I do and care about. Read at your
        own risk.
      </motion.p>

      {/* Sections */}
      <div className="max-w-3xl mt-10 space-y-12">
        <motion.section
          className="border-b border-gray-700 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            making software & other shenanigans 💾
          </h2>
          <p>
            My coding origin story involves stumbling upon a tutorial, pressing
            random keys, and realizing I could make a computer do my bidding.
            Years later, I still haven’t stopped.
          </p>
          <p className="mt-2">
            My latest and greatest? A <strong>social music app</strong> that
            lets people see what others nearby are jamming to (like a concert,
            but without the ticket price). Also working on{" "}
            <strong>TalkTracker</strong>, which analyzes chat data for deep,
            possibly concerning insights into your digital conversations. If
            you’ve ever wanted an AI therapist for your group chats, good news!
            I’ve got you covered.
          </p>
        </motion.section>

        <motion.section
          className="border-b border-gray-700 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            tech’s impact on humans ✨
          </h2>
          <p>
            Software doesn’t exist in a vacuum, it changes how we live, work,
            and doomscroll at 2 AM. That’s why I spend a lot of time thinking
            about the ethical and societal implications of tech.
          </p>
          <p className="mt-2">
            In spring 2024, I took a splendid course on the human impact of
            technology throughout history. One memorable takeaway was how
            today&#39;s challenges - AI art, social media, and digital
            ethics—have echoes in past technological revolutions.
          </p>
        </motion.section>

        <motion.section
          className="pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            miscellaneous things I care about 🔡
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>
              <strong>Music & movies.</strong> My brain runs on an endless loop
              of carefully curated playlists and Letterboxd deep dives.
            </li>
            <li>
              <strong>Pretty VS Code themes.</strong> I have approximately 47
              installed. No, I will not delete any of them.
            </li>
            <li>
              <strong>Books, blogs, & YouTube deep dives.</strong> My reading
              list is 90% “how technology is ruining everything” and 10% “random
              niche topics that I will passionately explain to you unprompted.”
            </li>
            <li>
              <strong>
                Sunrises, sunsets, and running through city streets.
              </strong>{" "}
              Ultimate goal: walk every street in Toronto. Progress: …we don’t
              talk about that.
            </li>
          </ul>
        </motion.section>
      </div>

      {/* Contact Section */}
      <motion.p
        className="text-center max-w-2xl text-lg mt-10 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        If you made it this far, congrats—you now know more about me than most
        of my extended family. If you want to{" "}
        <strong>chat, collaborate, or hire me (please)</strong>, shoot me an
        email.{" "}
        <a
          href="mailto:your-email@example.com"
          className="text-yellow-400 hover:underline"
        >
          Click here
        </a>{" "}
        to email me directly.
      </motion.p>

      {/* Take Me Back Button */}
      <motion.button
        onClick={() => router.push("/")}
        className="mt-12 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
        whileHover={{ scale: 1.1 }}
      >
        take me back
      </motion.button>
    </div>
  );
};

export default AboutPage;
