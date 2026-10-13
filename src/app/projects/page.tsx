"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaHome, FaVolumeMute, FaVolumeUp, FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useAudio } from "@/context/AudioContext";

const projects = [
  {
    name: "RealTalkTracker",
    subtitle: "chat analysis thingymahjig",
    description:
      "feed it an exported WhatsApp chat(jopefully more supported platforms coming soon) and it’ll tell you who talks the most, who takes forever to reply, who keeps double texting, and what an AI thinks your friendship actually looks like.",
    tech: ["Next.js", "FastAPI", "Python", "OpenAI", "Recharts"],
    live: "https://real-talk-tracker.vercel.app",
    github: "https://github.com/zuuhaaib/RealTalkTracker",
    note: "therapy was apparently too expensive",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const { isMuted, toggleMute } = useAudio();

  return (
    <main className="min-h-screen bg-[#131b33] text-white px-6 py-20">
      {/* Home button */}
      <motion.button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-20 p-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHome size={20} />
      </motion.button>

      {/* Mute button */}
      <motion.button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-20 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </motion.button>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-400 text-sm font-bold tracking-[0.25em] uppercase mb-4">
            things i made instead of sleeping
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
            projects
          </h1>

          <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            a collection of software experiments, questionable ideas, and things
            that somehow survived long enough to make it onto the internet.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#1b2745] p-7 shadow-xl"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                rotate: index % 2 === 0 ? -1 : 1,
              }}
            >
              {/* Accent blob */}
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

              <div className="relative z-10">
                <p className="text-sm text-yellow-400 font-semibold mb-2">
                  {project.subtitle}
                </p>

                <h2 className="text-3xl font-bold mb-4">{project.name}</h2>

                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* little dumb note */}
                <p className="mt-7 text-sm italic text-gray-500">
                  {project.note}
                </p>

                {/* buttons */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-bold text-black hover:bg-yellow-500 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    open project
                    <FaArrowUpRightFromSquare size={14} />
                  </motion.a>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaGithub size={17} />
                    github
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Placeholder for the next project */}
          <motion.div
            className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="text-center">
              <p className="text-4xl mb-4">🛠️</p>

              <h2 className="text-2xl font-bold text-gray-300">
                more questionable ideas soon
              </h2>

              <p className="mt-3 text-gray-500">
                unfortunately i have not stopped making things
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-500 text-sm">
            more projects will appear here as soon as they become presentable
            enough to admit i made them
          </p>
        </motion.div>
      </div>
    </main>
  );
}
