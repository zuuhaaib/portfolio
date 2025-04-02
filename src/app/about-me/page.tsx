"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

const AboutPage: React.FC = () => {
  const router = useRouter();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 py-16">
      {/* Mute Button */}
      <button
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      <motion.button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-all shadow-lg hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
      >
        <FaHome size={20} />
      </motion.button>

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
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            my academic journey (and the quest for caffeine) 🎓
          </h2>
          <p className="mb-4">
            I’m currently navigating the academic jungle at{" "}
            <strong>York University</strong> in Toronto, where I’m pursuing a{" "}
            <strong>Bachelor of Science in Computer Science</strong> with an
            expected graduation in 2026. They say university is all about
            finding yourself, but so far, all I’ve found is an overwhelming pile
            of programming assignments, an ever-growing list of debugging
            nightmares, and a deep appreciation for well-placed semicolons.
            Somewhere along the way, I picked up a caffeine addiction and a
            habit of questioning my life choices at 3 AM.
          </p>
          <p className="mb-4">
            Somewhere along the way, I’ve pulled all-nighters that turned into
            sunrises, had debates that spiraled into existential crises, and
            made friendships that feel like home. It’s a strange, chaotic blur
            of learning, unlearning, and figuring things out as I go. But maybe
            that’s the point, because in the mess of it all, between the
            lectures and the laughter, the stress and the spontaneity, I think
            I’m starting to find something after all.
          </p>
        </motion.section>

        <motion.section
          className="pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            extracurriculars (aka my attempt to have a social life) 🤖
          </h2>
          <p>
            I&#39;m also a proud member of the <strong>Robotics Club</strong>{" "}
            and <strong>CSHub</strong>, where I attempt to build things that
            don&#39;t immediately catch on fire. It&#39;s been an exciting ride
            of learning, collaborating, and pretending to understand everything
            that&#39;s going on. It&#39;s a solid balance of academic and
            personal growth... mostly personal growth, though.
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
            In winter 2024, I took an ethics course that really resonated with
            me. I&#39;ve always been intrigued by ethics, especially metaethics,
            and how AI and technology are reshaping those concepts. The course
            pushed me to dive deeper into questions about morality in the
            digital age, questioning how emerging technologies like AI challenge
            our understanding of right and wrong.
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
              list is 90% ‘existential crises and bleak reflections on life’ and
              10% ‘random niche topics I’ll passionately explain to you
              unprompted.’ It also takes me forever to finish a book, so the
              list keeps growing while I pretend I’m making progress.
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
        If you made it this far, congrats! you now know more about me than most
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
