
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// SVG single-path morph: morphs from a circle to an "open book" on scroll > hero
const circle =
  "M60,100a40,40 0 1,1 80,0a40,40 0 1,1 -80,0z"; // circle (centered at 100,100, radius 40)
const book =
  "M61,120Q80,70 100,100T139,120Q120,80 100,100Q80,80 61,120Z"; // loose book-like morph

export const SVGLogoMorph = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.45);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-8 top-8 z-40 w-16 h-16 pointer-events-none select-none">
      <motion.svg
        viewBox="50 70 100 80"
        fill="none"
        stroke="#a5b4fc"
        strokeWidth={7}
        className="w-full h-full drop-shadow-2xl bg-gradient-to-br from-indigo-950/50 to-indigo-700/10 rounded-full"
      >
        <motion.path
          d={scrolled ? book : circle}
          fill="#818cf8"
          stroke="#a5b4fc"
          animate={{ d: scrolled ? book : circle }}
          transition={{ duration: 0.9, type: "spring", stiffness: 70, damping: 22 }}
        />
      </motion.svg>
    </div>
  );
};
