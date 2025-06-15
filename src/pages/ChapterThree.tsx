
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const stepData = [
  {
    icon: <ArrowRight size={26} className="text-indigo-200" />,
    title: "Reflect & Share",
    desc: "Review your journey and share insights."
  },
  {
    icon: <Star size={26} className="text-yellow-200" />,
    title: "Collaborate & Build",
    desc: "Contribute your ideas or join the community."
  },
  {
    icon: <ArrowRight size={26} className="text-green-200 rotate-45" />,
    title: "Launch & Evolve",
    desc: "Turn inspiration into action; build your own story world."
  }
];

const contributeList = [
  {
    icon: <ArrowRight size={22} className="text-pink-300" />,
    label: "Feedback Forum",
    desc: "Join our discussion board and leave your thoughts.",
    href: "#feedback" // Placeholder
  },
  {
    icon: <Star size={22} className="text-yellow-400" />,
    label: "Share Your Story",
    desc: "Submit your crafted narrative for community spotlight.",
    href: "#share" // Placeholder
  },
  {
    icon: <ArrowRight size={22} className="text-blue-300" />,
    label: "Open Source Repository",
    desc: "Contribute code, assets, or translations on GitHub.",
    href: "https://github.com/" // Replace with real repo if available
  }
];

const chapterTooltips = [
  "Chapter 1 complete",
  "Chapter 2 complete",
  "Chapter 3 complete"
];

const StarRow = () => (
  <div className="flex justify-center mb-6 gap-3">
    <TooltipProvider>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Tooltip key={idx}>
          <TooltipTrigger asChild>
            <span>
              <Star
                size={36}
                className="text-yellow-400 drop-shadow-[0_0_10px_#facc15bb] hover:scale-110 transition-transform cursor-pointer glow-star"
                aria-label={chapterTooltips[idx]}
                tabIndex={0}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black/80 text-yellow-200 border-yellow-200/30">
            {chapterTooltips[idx]}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  </div>
);

const Roadmap = () => (
  <motion.section
    className="mt-10 mb-10 w-full max-w-2xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    <div className="flex flex-col md:flex-row items-center justify-between gap-7 select-none">
      {stepData.map((step, i) => (
        <motion.div
          key={step.title}
          custom={i}
          variants={fadeInUp}
          className="flex-1 flex flex-col items-center rounded-2xl bg-indigo-800/80 px-6 py-6 m-1 shadow-xl border border-indigo-500/30 transition-all relative hover:shadow-indigo-600/40 hover:brightness-110 hover:scale-105 focus-within:ring-2 focus-within:ring-indigo-300 cursor-pointer"
          tabIndex={0}
        >
          <div className="mb-2">{step.icon}</div>
          <div className="font-bold text-indigo-100 text-lg">{step.title}</div>
          <div className="text-indigo-200/90 text-center text-sm mt-1">{step.desc}</div>
          {i < 2 && (
            <div className="hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2">
              <span className="w-16 h-0.5 bg-indigo-400/60 inline-block" style={{width:48, background:'linear-gradient(90deg,#7dd3fc77,#818cf8)'}}></span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const HowToContribute = () => (
  <motion.section
    className="w-full max-w-2xl mx-auto mt-10 mb-12 px-2"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    <ul className="flex flex-col gap-4">
      {contributeList.map((item, i) => (
        <motion.li
          key={item.label}
          custom={i}
          variants={fadeIn}
          className="flex items-start gap-4 bg-indigo-900/65 rounded-lg px-5 py-4 shadow-lg transition-all group hover:scale-[1.03] hover:ring-2 hover:ring-indigo-300/80 hover:bg-indigo-800/95 cursor-pointer"
          whileHover={{ x: 7, boxShadow: "0 6px 20px -4px #818cf899" }}
        >
          <a href={item.href} target={item.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" className="flex items-center gap-4 flex-1">
            <span className="p-2 rounded-full bg-indigo-700/70 group-hover:bg-indigo-800/80 transition shadow">
              {item.icon}
            </span>
            <span>
              <span className="block font-semibold text-indigo-200 mb-1">{item.label}</span>
              <span className="text-indigo-300 text-sm">{item.desc}</span>
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  </motion.section>
);

export default function ChapterThree() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-900 via-black/95 to-black py-0 font-sans transition-colors duration-500 overflow-x-hidden selection:bg-indigo-300/80 selection:text-indigo-950">
      {/* Starfield or animated gradient bg: */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-indigo-900/80 via-black to-[#1e293b] animate-fade-in" />
      <div className="relative z-10 flex flex-col">
        <section className="w-full pt-10 pb-2 px-4">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.96, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 15, duration: 0.8 }}
          >
            <StarRow />
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-100 drop-shadow-xl text-center tracking-tight animate-typewriter">
              Chapter 3: Vision of Tomorrow
            </h1>
            <div className="mt-2 text-indigo-300 text-lg md:text-xl text-center max-w-xl font-medium animate-fade-in">
              Gaze ahead to what could be. Our journey shapes the future we will live in—imagine the possibilities.
            </div>
          </motion.div>
        </section>
        {/* Intro Paragraph */}
        <motion.section
          className="max-w-2xl mx-auto mt-10 mb-3 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <blockquote className="border-l-4 border-indigo-400 bg-indigo-800/60 rounded-lg px-6 py-5 text-indigo-200 text-lg md:text-xl shadow-lg font-medium italic mb-0">
            “You stand at the threshold of possibility. As the final chapter unfolds, the path behind you glows with lessons learned, and the road ahead shimmers with opportunity.”
          </blockquote>
        </motion.section>
        {/* Roadmap */}
        <Roadmap />
        {/* How Users Can Contribute */}
        <HowToContribute />
        {/* CTA Button */}
        <motion.div
          className="flex justify-center my-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <Button
            className="bg-indigo-600/90 hover:bg-indigo-700/90 focus:ring-2 focus:ring-indigo-300 text-xl font-bold px-9 py-4 rounded-xl shadow-xl border-2 border-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-400/30 focus-visible:ring-4 focus-visible:ring-indigo-400/80 focus:outline-none glow-star"
            onClick={() => navigate("/")}
            tabIndex={0}
          >
            Start Your Own Story
          </Button>
        </motion.div>
        {/* Footer Navigation */}
        <nav className="w-full flex justify-center gap-6 px-2 pb-4 mb-9 mt-3">
          <Button
            className="flex items-center gap-2 bg-indigo-900/80 hover:bg-indigo-700/80 hover:text-indigo-100 shadow-indigo-900/30 shadow-sm px-6 py-2 rounded-full font-bold text-indigo-300 hover:shadow-lg hover:drop-shadow-lg hover:brightness-125 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 text-lg"
            onClick={() => navigate("/chapter/2")}
          >
            <ArrowLeft className="mr-1" size={18} />
            Back to Chapter 2
          </Button>
          <Button
            className="flex items-center gap-2 bg-indigo-700/80 hover:bg-indigo-600/90 hover:text-yellow-200 shadow-indigo-900/40 shadow px-6 py-2 rounded-full font-bold text-indigo-200 hover:shadow-lg hover:drop-shadow-lg hover:brightness-105 transition-all focus-visible:ring-2 focus-visible:ring-yellow-400 text-lg"
            onClick={() => navigate("/")}
          >
            <Star className="mr-1" size={18} />
            Restart Story
          </Button>
        </nav>
        <Footer />
      </div>
    </div>
  );
}
