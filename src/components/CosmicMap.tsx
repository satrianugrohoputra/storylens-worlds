
import React, { useState } from "react";
import { LandmarkModal } from "./LandmarkModal";
import { Star } from "lucide-react";

// Using https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg as a base reference for landmark px coordinates
const LANDMARKS = [
  {
    title: "Great Pyramid of Giza",
    location: "Giza, Egypt",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=600&q=80",
    description: "The only surviving Wonder of the Ancient World, built over 4,500 years ago as a monumental tomb.",
    unlockedAfter: 0,
    coords: [447, 233], // (longitude 31.13, latitude 29.98)
  },
  {
    title: "Hanging Gardens of Babylon",
    location: "Near Hillah, Iraq",
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    description: "A legendary terraced garden; its actual existence is debated, but its splendor lives on in myth.",
    unlockedAfter: 1,
    coords: [513, 229], // (lon 44.4, lat 32.5)
  },
  {
    title: "Mausoleum at Halicarnassus",
    location: "Bodrum, Turkey",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
    description: "A grand tomb built for Mausolus, blending Greek, Egyptian, and Lycian architectural styles.",
    unlockedAfter: 2,
    coords: [498, 233], // (lon 27.4, lat 37.0)
  },
  {
    title: "Statue of Zeus at Olympia",
    location: "Olympia, Greece",
    img: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80",
    description: "A giant gold and ivory statue honoring the king of the Greek gods, now vanished.",
    unlockedAfter: 3,
    coords: [470, 232], // (lon 21.6, lat 37.6)
  },
  {
    title: "Temple of Artemis at Ephesus",
    location: "Selçuk, Turkey",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "A massive temple dedicated to the goddess Artemis, famed for its grandeur and artistry.",
    unlockedAfter: 4,
    coords: [487, 232], // (lon 27.36, lat 37.94)
  },
  {
    title: "Colossus of Rhodes",
    location: "Rhodes, Greece",
    img: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    description: "A towering statue greeting travelers at the harbor; one of history's most awe-inspiring monuments.",
    unlockedAfter: 5,
    coords: [481, 235], // (lon 28.2, lat 36.45)
  },
  {
    title: "Lighthouse of Alexandria",
    location: "Alexandria, Egypt",
    img: "https://images.unsplash.com/photo-1526102840910-931d6d7f6af7?auto=format&fit=crop&w=600&q=80",
    description: "A marvel of engineering guiding ancient ships for centuries, lost to the sea.",
    unlockedAfter: 6,
    coords: [453, 235], // (lon 29.89, lat 31.20)
  },
  {
    title: "Eiffel Tower",
    location: "Paris, France",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
    description: "The iconic Parisian symbol of engineering and romance, reaching up to the sky since 1889.",
    unlockedAfter: 7,
    coords: [419, 203], // (lon 2.29, lat 48.86)
  },
  {
    title: "Louvre Museum",
    location: "Paris, France",
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    description: "Home to the Mona Lisa and world-class art from every era in a spectacular palace setting.",
    unlockedAfter: 8,
    coords: [420, 205], // (lon 2.336, lat 48.860)
  },
  {
    title: "Times Square Clock Tower",
    location: "New York, USA",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "One of the world’s most energetic crossroads, legendary for lights, celebrations, and the New Year's ball drop.",
    unlockedAfter: 9,
    coords: [161, 182], // (lon -73.985, lat 40.758)
  },
  {
    title: "Mount Fuji",
    location: "Honshu, Japan",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Japan’s sacred and most photographed mountain, renowned for its beauty and cultural significance.",
    unlockedAfter: 10,
    coords: [857, 235], // (lon 138.726, lat 35.362)
  },
];

// Map dimensions in px (SVG coordinates, 1024x512)
const MAP_W = 1024, MAP_H = 512;

// For demo: how many landmarks to “unlock” (simulate user progress)
const USER_UNLOCKED = 3; // Only the first 4 will be “active”

export const CosmicMap: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-5xl aspect-[2/1] mx-auto overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-800 via-indigo-900 to-black">
      {/* SVG stylized world map, equirectangular projection */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="block w-full h-full"
        style={{ objectFit: "cover" }}
        aria-label="Stylized World Map"
        tabIndex={-1}
      >
        {/* Background terrain gradient */}
        <defs>
          <radialGradient id="earthGlow" cx="55%" cy="50%" r="92%" fx="55%" fy="40%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="1" />
            <stop offset="40%" stopColor="#312e81" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </radialGradient>
        </defs>
        {/* Ocean/terrain fill */}
        <rect width={MAP_W} height={MAP_H} fill="url(#earthGlow)" />
        {/* Simple stylized landmass (vectorized, very minimal outline for demo) */}
        <path
          d="M980,380 Q900,320 860,220 Q800,110 700,80 Q645,78 600,130 Q590,250 470,190 Q420,170 400,230 Q350,350 190,260 Q80,210 57,293 Q10,340 38,395 Q95,480 394,480 Q514,410 700,490 Q880,500 980,380 Z"
          fill="#64b5f6"
          opacity="0.33"
          filter="url(#softShadow)"
        />
        {/* Landmarks */}
        {LANDMARKS.map((lm, i) => {
          const isUnlocked = USER_UNLOCKED >= lm.unlockedAfter;
          return (
            <g
              key={lm.title}
              tabIndex={isUnlocked ? 0 : -1}
              className="transition-transform duration-200"
              style={{
                cursor: isUnlocked ? "pointer" : "not-allowed",
                pointerEvents: "auto",
              }}
              onClick={() => isUnlocked && setSelected(i)}
              onKeyDown={e => {
                if (e.key === "Enter" && isUnlocked) setSelected(i);
              }}
            >
              <circle
                cx={lm.coords[0]}
                cy={lm.coords[1]}
                r="18"
                className={`transition filter ${
                  isUnlocked
                    ? "opacity-100"
                    : "opacity-50 grayscale"
                }`}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(121,99,14,0.08)"
              />
              <foreignObject
                x={lm.coords[0] - 16}
                y={lm.coords[1] - 16}
                width={32}
                height={32}
                className="overflow-visible"
                aria-label={lm.title}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-yellow-400 text-yellow-300 
                    shadow-lg transition-transform duration-200 hover:scale-105
                    ${isUnlocked
                    ? "cursor-pointer animate-pulse opacity-100"
                    : "cursor-not-allowed opacity-50 grayscale"
                  }`}
                  title={isUnlocked ? lm.title : "Unlock by progressing"}
                >
                  <Star
                    className="w-6 h-6"
                    strokeWidth={2.3}
                    fill={isUnlocked ? "#fde68a" : "#cbd5e1"}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
      {/* Landmark Modal */}
      <LandmarkModal
        open={selected !== null}
        onOpenChange={open => setSelected(open ? selected : null)}
        landmark={selected !== null ? LANDMARKS[selected] : null}
      />
      {/* (Optional) Progress bar, can add below if desired */}
      <div className="absolute left-5 bottom-5 bg-black bg-opacity-40 rounded-full px-4 py-2 flex items-center gap-2 text-indigo-100 shadow backdrop-blur-sm select-none text-xs md:text-sm">
        {Array.from({ length: LANDMARKS.length }).map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2.5 h-2.5 mx-0.5 rounded-full transition 
            ${i <= USER_UNLOCKED
                ? "bg-yellow-300 shadow-[0_0_7px_1px_#fde047a2]"
                : "bg-gray-400 bg-opacity-30"
              }`}
          />
        ))}
        <span className="ml-2">Progress: {USER_UNLOCKED + 1} / {LANDMARKS.length}</span>
      </div>
    </div>
  );
};
