
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Chapter } from "../components/Chapter";
import { ProgressBar } from "../components/ProgressBar";
import { ParticleBackground } from "../components/ParticleBackground";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const chapters = [
  {
    id: "chapter-1",
    title: "Beyond the Frame",
    content: [
      "Welcome to StoryLens 3D, where every chapter comes alive.",
      "Scroll to advance through narrative and interactive 3D scenes combined.",
    ],
    variant: "cube" as const,
    bgColor: "bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700",
  },
  {
    id: "chapter-2",
    title: "From Still to Motion",
    content: [
      "3D objects break out of the flat page. Rotate and zoom to explore.",
      "Each model is here for you—no two stories look the same.",
    ],
    variant: "sphere" as const,
    bgColor: "bg-gradient-to-r from-fuchsia-900 via-indigo-900 to-indigo-700",
    reverse: true,
  },
  {
    id: "chapter-3",
    title: "Immersion Unlocked",
    content: [
      "Scroll triggers scene changes: backgrounds, animations, and text morph as you navigate.",
      "Try clicking chapter dots for instant jumps.",
    ],
    variant: "torus" as const,
    bgColor: "bg-gradient-to-r from-indigo-900 via-cyan-900 to-indigo-900",
  },
  {
    id: "chapter-4",
    title: "Ready? Begin Your Story.",
    content: [
      "StoryLens 3D is now open-source. Replace models and chapters to make your own.",
      "Scroll once more, and let your story unfold.",
    ],
    variant: "cube" as const,
    bgColor: "bg-gradient-to-r from-gray-900 via-indigo-800 to-blue-900",
    reverse: true,
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black relative overflow-x-hidden selection:bg-indigo-400/60 selection:text-white">
      <ParticleBackground />
      <Navbar />
      <ProgressBar chapters={chapters.map(c => ({ id: c.id, label: c.title }))} />
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center gap-5 relative z-10
        bg-gradient-to-br from-black via-indigo-900 to-blue-900 pt-32 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", delay: 0.15 }}
          className="font-extrabold text-5xl md:text-7xl tracking-tight text-white drop-shadow-xl"
        >
          StoryLens <span className="text-indigo-400">3D</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
          className="text-xl md:text-2xl max-w-xl text-white/70 font-medium"
        >
          A scroll-driven narrative with interactive 3D moments. Scroll to begin your journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 18 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.2,
            delay: 1.2,
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/80 text-sm mb-2 animate-pulse">Scroll to begin</span>
          <ArrowDown className="w-8 h-8 text-indigo-300 animate-bounce" strokeWidth={2.5} />
        </motion.div>
      </section>
      {/* CHAPTER SECTIONS */}
      <main className="w-full">
        {chapters.map((chapter, idx) => (
          <Chapter key={chapter.id} {...chapter} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
