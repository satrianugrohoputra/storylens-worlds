
import React from "react";
import { motion } from "framer-motion";

// Stylized SVG world map with animated "Starting Point" pins
const pins = [
  // Each pin: [x, y] in percentage (SVG viewBox coordinates)
  { x: 35, y: 67, label: "Asia - Origin" },
  { x: 10, y: 55, label: "Africa - Early Spark" },
  { x: 50, y: 30, label: "Europe - First Step" }
];

export default function Map() {
  return (
    <div className="relative flex justify-center items-center rounded-xl shadow-lg overflow-hidden bg-indigo-900/70 border border-indigo-800/40 w-full max-w-md mx-auto h-64 mb-2">
      {/* Basic World Map SVG (simple/abstract for style) */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full z-0 select-none" fill="none">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#655af6" stopOpacity={0.21} />
            <stop offset="85%" stopColor="#182e54" stopOpacity={0.58} />
          </radialGradient>
        </defs>
        <rect width="100" height="60" rx="10" fill="url(#g1)" />
        {/* Abstract continents (just for effect) */}
        <ellipse cx="45" cy="35" rx="32" ry="15" fill="#606ff3" opacity="0.3" />
        <ellipse cx="60" cy="42" rx="16" ry="7.5" fill="#6fe5ff" opacity="0.19" />
        <ellipse cx="30" cy="25" rx="13" ry="7" fill="#f2ffe5" opacity="0.11" />
      </svg>
      {/* Pins */}
      {pins.map((pin, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.85, opacity: 0.7 }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.71, 1, 0.8],
            transition: { repeat: Infinity, duration: 1.8, delay: i * 0.33 }
          }}
          className="absolute z-10"
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="flex flex-col items-center">
            <span className="block w-4 h-4 bg-amber-400 rounded-full shadow-lg border-2 border-white glow-star" />
            <span className="bg-black/70 text-xs text-indigo-100 px-2 py-1 rounded mt-1 shadow backdrop-blur-sm">{pin.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
