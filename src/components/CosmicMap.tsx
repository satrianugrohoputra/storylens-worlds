import React, { useState } from "react";
import { LandmarkModal } from "./LandmarkModal";
import { Check } from "lucide-react";

// World map background PNG
const MAP_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.png";

// Map dimensions in px (equirectangular projection)
// This is 1920x958 for this Wikipedia image
const MAP_W = 1920, MAP_H = 958;

// Hardcoded landmark dataset: name/country, img, description, coords (pixel approx)
const LANDMARKS = [
  {
    title: "Great Pyramid of Giza",
    country: "Egypt",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    description: "The oldest and last surviving Wonder of the Ancient World.",
    coords: [1057, 522], // Egypt in map image
    key: "pyramid",
  },
  {
    title: "Eiffel Tower",
    country: "France",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
    description: "Paris' iconic iron tower of world expositions and romance.",
    coords: [901, 363], // Paris
    key: "eiffel",
  },
  {
    title: "Christ the Redeemer",
    country: "Brazil",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "The immense Art Deco statue watching over Rio de Janeiro.",
    coords: [680, 733], // Rio
    key: "christ",
  },
  {
    title: "Mount Fuji",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=600&q=80",
    description: "Snow-capped sacred mountain; Japan’s symbol of natural beauty.",
    coords: [1668, 471], // Fuji
    key: "fuji",
  },
  {
    title: "Times Square Clock Tower",
    country: "USA",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "New York’s famous crossroads: neon, crowds, and energy.",
    coords: [388, 386], // NYC
    key: "times",
  },
  {
    title: "Machu Picchu",
    country: "Peru",
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    description: "Lost Inca city atop the Andes—mystical and awe-inspiring.",
    coords: [323, 683], // Peru
    key: "machu",
  },
  {
    title: "Colosseum",
    country: "Italy",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
    description: "Rome’s ancient amphitheater, a monument to spectacle.",
    coords: [1042, 430], // Rome
    key: "colosseum",
  },
];

// User's unlocked progress (for "Visited" badge only)
const userProgress = [0, 1, 2, 4];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export const CosmicMap: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  // Progress: number unlocked
  const exploredCount = userProgress.length;

  return (
    <div className="relative w-full max-w-5xl aspect-[2/1] mx-auto rounded-2xl shadow-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg,#000,#334155 60%,#4f46e5)" }}>
      {/* World map image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={MAP_IMAGE}
          alt="World Map"
          className="w-full h-full object-cover object-center"
          draggable={false}
          style={{
            filter: "brightness(1.1) saturate(1.14) contrast(1.1)",
            pointerEvents: "none"
          }}
        />
      </div>
      {/* Landmarks */}
      <div className="absolute inset-0 pointer-events-none">
        {LANDMARKS.map((lm, i) => {
          const unlocked = userProgress.includes(i);

          return (
            <button
              key={lm.key}
              type="button"
              className={`
                absolute group flex flex-col items-center 
                z-10 select-none pointer-events-auto
                transition-transform
                hover:scale-110 active:scale-95
                ${unlocked 
                  ? ""
                  : "opacity-50"
                }
              `}
              style={{
                left: `calc(${lm.coords[0] / MAP_W * 100}% - 24px)`,
                top: `calc(${lm.coords[1] / MAP_H * 100}% - 32px)`,
                transition: "transform 0.2s"
              }}
              tabIndex={0}
              onClick={() => setSelected(i)}
              aria-label={lm.title}
            >
              {/* Glow / pulse ring */}
              <span className={`block w-14 h-14 rounded-full absolute left-[-12px] top-[-8px] -z-10
                ${unlocked ? "ring-2 ring-yellow-300/80 animate-pulse bg-yellow-100/15" : ""}`}>
              </span>
              {/* Image-based marker */}
              <span className="shadow-lg border-2 border-white/80 rounded-full flex items-center justify-center overflow-hidden w-12 h-12 bg-white/10 transition-all duration-200">
                <img
                  src={lm.img}
                  alt={lm.title}
                  className={`
                    w-10 h-10 object-cover rounded-full
                    ${unlocked
                      ? "grayscale-0"
                      : "grayscale brightness-90 opacity-80"
                    }
                  `}
                  draggable={false}
                />
                {/* Visited check */}
                {unlocked && (
                  <span className="absolute bottom-1 right-1 bg-yellow-200 rounded-full p-1 shadow">
                    <Check className="w-3 h-3 text-yellow-900 drop-shadow" />
                  </span>
                )}
              </span>
              {/* Animated pulse (only unlocked) */}
              {unlocked && <span className="absolute inset-0 rounded-full animate-pulse bg-yellow-200/10 pointer-events-none"></span>}
              {/* Tooltip */}
              <span className={`
                pointer-events-none text-xs
                absolute left-1/2 -translate-x-1/2 top-14
                px-2 py-1 rounded bg-black/70 text-white whitespace-nowrap shadow-lg
                transition-all opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 duration-200
                z-20
              `}>
                {lm.title}
              </span>
            </button>
          );
        })}
      </div>
      {/* Progress bar top-right */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
        <div className="bg-black/50 backdrop-blur-md rounded-full px-5 py-2 flex items-center gap-2 shadow-lg">
          {LANDMARKS.map((_, i) => (
            <span key={i}
              className={
                "mr-1 w-4 h-4 rounded-full inline-block transition shadow " +
                (userProgress.includes(i)
                  ? "bg-yellow-400 drop-shadow-[0_0_6px_#fde047d6]"
                  : "bg-gray-400 bg-opacity-30")
              }
            />
          ))}
          <span className="ml-2 font-bold text-indigo-100 text-base">
            Landmarks Explored: {exploredCount} / {LANDMARKS.length}
          </span>
        </div>
      </div>
      {/* Landmark Modal */}
      <LandmarkModal
        open={selected !== null}
        onOpenChange={open => setSelected(open ? selected : null)}
        landmark={selected !== null ? {
          ...LANDMARKS[selected],
          unlocked: userProgress.includes(selected)
        } : null}
        isMobile={typeof window !== "undefined" && window.innerWidth < 768}
      />
    </div>
  );
};
