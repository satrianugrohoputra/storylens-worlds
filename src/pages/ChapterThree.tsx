
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import Footer from "../components/Footer";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    title: "Reflect & Refine",
    desc: (
      <>
        Take a moment to look back on your journey. What insights emerged? Which challenges sharpened your resolve?
        <div className="mt-2 bg-indigo-900/30 rounded px-3 py-2 text-sm text-indigo-200 italic">
          Journal prompt: <span className="font-semibold text-indigo-100">“What was my single greatest learning from this journey?”</span>
        </div>
      </>
    ),
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/30">
        <Star size={26} className="text-indigo-200" />
      </span>
    ),
  },
  {
    title: "Collaborate & Co‑Create",
    desc: (
      <>
        No great vision is realized alone. Invite others to join your adventure—share ideas, gather feedback, build together.<br />
        <a
          href="https://community.storylens.dev/"
          className="story-link text-indigo-100 font-semibold underline hover:text-indigo-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the StoryLens Community Forum
        </a>
      </>
    ),
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-700/20">
        <Star size={26} className="text-yellow-200" />
      </span>
    ),
  },
  {
    title: "Launch & Evolve",
    desc: (
      <>
        Now is the time to act. Prototype your vision, test with real users, then iterate toward perfection.
      </>
    ),
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-700/20">
        <Star size={26} className="text-green-200" />
      </span>
    ),
  }
];

const contributeList = [
  {
    icon: <Star size={22} className="text-indigo-200" />,
    label: "Share Your Story",
    desc: "Submit your own narrative for our “Community Spotlight”—we feature the most inspiring journeys each month.",
    href: "#share" // Placeholder
  },
  {
    icon: <Star size={22} className="text-yellow-400" />,
    label: "Offer Feedback",
    desc: "Rate and comment on other stories. Your perspective could spark the next big idea.",
    href: "#feedback" // Placeholder
  },
  {
    icon: <Star size={22} className="text-green-300" />,
    label: "Contribute Assets",
    desc: "Upload illustrations, Lottie animations, or 3D models to enrich the StoryLens library.",
    href: "#assets" // Placeholder
  }
];

const chapterTooltips = [
  "Chapter 1 Complete: The Journey Begins",
  "Chapter 2 Complete: Through the Portal",
  "Chapter 3 Complete: Vision of Tomorrow"
];

const StarRow = () => (
  <div className="flex justify-center mb-4 gap-3">
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
    className="mt-10 mb-6 w-full max-w-2xl mx-auto"
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
          className="flex-1 flex flex-col items-center rounded-2xl bg-indigo-800/80 px-6 py-7 m-1 shadow-xl border border-indigo-500/30 transition-all relative hover:shadow-indigo-600/40 hover:brightness-110 hover:scale-105 focus-within:ring-2 focus-within:ring-indigo-300 cursor-pointer"
          tabIndex={0}
        >
          <div className="mb-2">{step.icon}</div>
          <div className="font-bold text-indigo-100 text-lg mb-2">{step.title}</div>
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
    <h2 className="font-semibold text-indigo-200 text-xl mb-3 text-center">How You Can Contribute</h2>
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

const InspirationalQuote = () => (
  <motion.section
    className="max-w-2xl mx-auto mb-6 px-6"
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.11 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <blockquote className="border-l-4 border-yellow-400 bg-yellow-700/15 rounded-lg px-7 py-6 text-yellow-200 text-lg md:text-xl shadow-lg font-semibold italic mb-0 relative">
      “The future belongs to those who believe in the beauty of their dreams.”
      <span className="block text-sm text-yellow-300 font-normal not-italic mt-2 ml-2">— Eleanor Roosevelt</span>
    </blockquote>
  </motion.section>
);

const ReflectionTextarea = ({
  label,
  placeholder,
  storageKey,
}: {
  label: string;
  placeholder: string;
  storageKey: string;
}) => {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue) setValue(savedValue);
  }, [storageKey]);

  const onSave = () => {
    localStorage.setItem(storageKey, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="my-7 flex flex-col gap-2 max-w-xl mx-auto animate-fade-in">
      <label className="text-indigo-200 font-bold mb-1" htmlFor={storageKey}>{label}</label>
      <Textarea
        className="bg-black/50 border-indigo-700/60 focus:ring-2 focus:ring-indigo-300 text-indigo-100 placeholder:text-indigo-400/60 min-h-[90px]"
        value={value}
        onChange={e => setValue(e.target.value)}
        id={storageKey}
        placeholder={placeholder}
        spellCheck
      />
      <div className="flex items-center gap-3 mt-2">
        <Button
          className="bg-indigo-600/80 hover:bg-indigo-700/90 text-indigo-100 font-semibold px-6 py-2 rounded-md transition"
          onClick={onSave}
        >
          Save
        </Button>
        {saved && <span className="text-green-300 text-sm animate-fade-in">Saved!</span>}
      </div>
    </div>
  );
};

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
            <div className="flex flex-col gap-1 items-center text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-100 drop-shadow-xl tracking-tight animate-typewriter">
                Chapter 3: Vision of Tomorrow
              </h1>
              <div className="mt-2 text-indigo-300 text-lg md:text-xl max-w-xl font-medium animate-fade-in">
                “You stand at the threshold of possibility. The path behind you glows with lessons learned, and the road ahead shimmers with promise. In this final chapter, we cast our gaze forward—envisioning the future you will help to create.”
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-yellow-300 text-lg font-semibold">⭐️ All three chapters complete! ⭐️</span>
              </div>
              <div className="text-indigo-400 text-sm mt-1">Let these stars remind you: every ending is a new beginning.</div>
            </div>
          </motion.div>
        </section>
        {/* Inspirational Quote */}
        <InspirationalQuote />
        {/* Roadmap section and Journal Reflection */}
        <Roadmap />
        <ReflectionTextarea
          label="Reflection: What was my single greatest learning from this journey?"
          placeholder="Write your insights from the journey..."
          storageKey="journalReflectionCh3"
        />
        {/* How Users Can Contribute */}
        <HowToContribute />
        {/* Final Reflection */}
        <motion.section
          className="max-w-2xl mx-auto my-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="rounded-lg bg-indigo-900/70 p-7 shadow-lg">
            <h3 className="text-indigo-100 font-bold text-xl mb-2">Your Turn:</h3>
            <div className="text-indigo-300 font-medium mb-3">
              What vision will drive your next chapter?<br />
              How will you turn today’s ideas into tomorrow’s reality?
            </div>
            <ReflectionTextarea
              label="Closing Thoughts"
              placeholder="Write your closing thoughts here..."
              storageKey="finalReflectionCh3"
            />
          </div>
        </motion.section>
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

// File is getting quite long. Please consider asking to refactor this page into smaller, more manageable components!
