
import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";

const milestones = [
  {
    date: "Jan 2023",
    icon: <Star className="text-yellow-400" size={34} />,
    caption: "Inspiration sparks the journey",
  },
  {
    date: "Feb 2023",
    icon: <ArrowRight className="text-blue-400" size={34} />,
    caption: "First challenge encountered—with courage",
  },
  {
    date: "Mar 2023",
    icon: <ArrowLeft className="text-pink-400" size={34} />,
    caption: "Breakthrough moment, path revealed",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  // Detect parent inView for staggered animation
  const isInView = useInView(ref, { amount: 0.18, once: true });

  return (
    <div
      ref={ref}
      className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-400/60 scrollbar-track-indigo-900/40 pb-2"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex gap-7 min-w-[700px] md:min-w-[540px] px-2">
        {milestones.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.5,
              delay: i * 0.18 + 0.1,
              type: "spring",
              bounce: 0.28,
            }}
            className="flex flex-col items-center w-56 min-w-[200px] bg-gradient-to-br from-indigo-800/70 to-indigo-900/90 border border-indigo-500/25 rounded-xl px-4 py-6 shadow-xl mx-1 hover:scale-105 hover:border-indigo-400/70 transition-all"
          >
            <div className="mb-2">{item.icon}</div>
            <div className="mb-1 text-indigo-200/80 text-lg font-semibold">{item.date}</div>
            <div className="text-indigo-100/85 text-base text-center">{item.caption}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
