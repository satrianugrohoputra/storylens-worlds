
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { LandmarkModal } from "./LandmarkModal";
import { Star } from "lucide-react";

// World topojson (public domain, tiny topojson version for performance)
const GEO_URL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

// 11 landmarks: 7 ancient wonders + 4 modern icons
const LANDMARKS = [
  {
    title: "Great Pyramid of Giza",
    country: "Egypt",
    img: "https://example.com/pyramids.jpg",
    description:
      "The oldest and last surviving Wonder of the Ancient World.",
    coordinates: [31.1342, 29.9792], // [lon, lat]
    key: "pyramid",
  },
  {
    title: "Hanging Gardens of Babylon",
    country: "Iraq (Ancient Babylon)",
    img: "https://example.com/babylon.jpg",
    description:
      "A legendary garden near the Euphrates, famed for its ascending terraces.",
    coordinates: [44.4200, 32.5364],
    key: "babylon",
  },
  {
    title: "Mausoleum at Halicarnassus",
    country: "Turkey",
    img: "https://example.com/halicarnassus.jpg",
    description:
      "An ornate tomb near Bodrum, one of the greatest achievements of Greek architecture.",
    coordinates: [27.4241, 37.0386],
    key: "halicarnassus",
  },
  {
    title: "Statue of Zeus at Olympia",
    country: "Greece",
    img: "https://example.com/zeus.jpg",
    description:
      "A giant seated statue honoring the Greek god, crafted by Phidias.",
    coordinates: [22.5361, 37.6386],
    key: "zeus",
  },
  {
    title: "Temple of Artemis at Ephesus",
    country: "Turkey",
    img: "https://example.com/artemis.jpg",
    description:
      "A magnificent marble temple dedicated to the goddess Artemis in Ephesus.",
    coordinates: [27.3415, 37.9391],
    key: "artemis",
  },
  {
    title: "Colossus of Rhodes",
    country: "Greece",
    img: "https://example.com/rhodes.jpg",
    description:
      "A towering statue of the sun god Helios at the Rhodes harbor entrance.",
    coordinates: [28.2278, 36.4510],
    key: "rhodes",
  },
  {
    title: "Lighthouse of Alexandria",
    country: "Egypt",
    img: "https://example.com/alexandria.jpg",
    description:
      "The ancient world's most famous lighthouse on the island of Pharos.",
    coordinates: [29.8853, 31.2135],
    key: "alexandria",
  },
  {
    title: "Eiffel Tower",
    country: "France",
    img: "https://example.com/eiffel.jpg",
    description:
      "Paris' iconic iron tower of world expositions and romance.",
    coordinates: [2.2945, 48.8584],
    key: "eiffel",
  },
  {
    title: "Louvre Museum",
    country: "France",
    img: "https://example.com/louvre.jpg",
    description:
      "The world's largest art museum and a historic monument in Paris.",
    coordinates: [2.3376, 48.8606],
    key: "louvre",
  },
  {
    title: "Times Square Clock Tower (NYC)",
    country: "USA",
    img: "https://example.com/nyc.jpg",
    description:
      "New York's famous crossroads: neon lights, crowds, and energy.",
    coordinates: [-73.9855, 40.758],
    key: "nyc",
  },
  {
    title: "Mount Fuji",
    country: "Japan",
    img: "https://example.com/fuji.jpg",
    description:
      "Snow-capped sacred mountain; Japan’s symbol of natural beauty.",
    coordinates: [138.7274, 35.3606],
    key: "fuji",
  },
];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export const CosmicMap: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-800 p-3 sm:p-6">
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={420}
        style={{
          width: "100%",
          height: "auto",
        }}
        aria-label="World Map"
      >
        {/* World countries: dark styled */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#374151",
                    stroke: "#1e293b",
                    strokeWidth: 0.6,
                  },
                  hover: {
                    fill: "#6366f1",
                  },
                  pressed: {
                    fill: "#6366f1",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {/* Ocean underlay */}
        <rect
          x={0}
          y={0}
          width={900}
          height={420}
          fill="#1f2937"
          pointerEvents="none"
          style={{ zIndex: -2 }}
        />
        {/* Landmark markers */}
        {LANDMARKS.map((lm, idx) => (
          <Marker key={lm.key} coordinates={lm.coordinates}>
            <button
              type="button"
              className="flex items-center justify-center focus:ring-2 focus:ring-yellow-300 rounded-full outline-none group"
              aria-label={lm.title}
              style={{
                transform: "translate(-12px, -12px)", // center marker at coordinates
              }}
              onClick={() => setSelectedIdx(idx)}
              tabIndex={0}
            >
              <Star
                className="w-6 h-6 text-yellow-300 drop-shadow filter 
                  group-hover:scale-110
                  group-active:scale-95 
                  transition-transform duration-150 
                  cursor-pointer"
                fill="#facc15"
                stroke="#eab308"
                strokeWidth={2}
              />
              <span className="sr-only">{lm.title}</span>
            </button>
          </Marker>
        ))}
      </ComposableMap>
      {/* Landmark Modal */}
      <LandmarkModal
        open={selectedIdx !== null}
        onOpenChange={(open) => setSelectedIdx(open ? selectedIdx : null)}
        landmark={selectedIdx !== null ? LANDMARKS[selectedIdx] : null}
        isMobile={isMobile()}
      />
    </div>
  );
};
