
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

type ProgressBarProps = {
  chapters: { id: string; label: string }[];
  onDotClick?: (chapterId: string) => void;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ chapters, onDotClick }) => {
  const [progress, setProgress] = useState(0);
  // Store section offsets to mark dots
  const sectionRefs = chapters.map((c) =>
    (typeof window !== "undefined" ? document.getElementById(c.id) : null)
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Find current chapter for dot "active" state
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const chaps = chapters.map((c) => document.getElementById(c.id));
      const scroll = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      chaps.forEach((node, i) => {
        if (node && node.offsetTop <= scroll) idx = i;
      });
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);

  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <div className="relative h-3 bg-gradient-to-r from-indigo-950 via-indigo-700/80 to-indigo-500/40">
        <motion.div
          className="absolute left-0 top-0 h-3 bg-indigo-400 rounded-r-lg shadow-lg"
          style={{ width: `${progress * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 75, damping: 22 }}
        />
        {/* Chapter dot markers */}
        <div className="absolute left-0 top-0 w-full h-3 flex items-center pointer-events-none">
          {chapters.map((c, i) => {
            const left = `calc(${(i / (chapters.length - 1)) * 100}% - 9px)`;
            return (
              <button
                key={c.id}
                className={`absolute h-5 w-5 rounded-full border-2 border-white/60 bg-white/50 shadow-lg transition
                ${i === activeIdx ? "scale-110 border-indigo-400 bg-indigo-500" : "hover:scale-105"}
                `}
                style={{ left, top: "-6px", pointerEvents: "auto" }}
                aria-label={`Jump to ${c.label}`}
                onClick={() => {
                  document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" });
                  onDotClick?.(c.id);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
