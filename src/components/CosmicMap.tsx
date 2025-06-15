
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { LandmarkModal } from "./LandmarkModal";
import { Star } from "lucide-react";
import { Progress } from "./ui/progress";

// World topojson source
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 11 hardcoded landmarks
const LANDMARKS = [
  {
    title: "Great Pyramid of Giza",
    country: "Egypt",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Great+Pyramid",
    description:
      "The oldest and last surviving Wonder of the Ancient World.",
    coordinates: [31.1342, 29.9792], // [lon, lat]
    key: "pyramid",
  },
  {
    title: "Hanging Gardens of Babylon",
    country: "Iraq (Ancient Babylon)",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Hanging+Gardens",
    description:
      "A legendary garden near the Euphrates, famed for its ascending terraces.",
    coordinates: [44.4200, 32.5364],
    key: "babylon",
  },
  {
    title: "Mausoleum at Halicarnassus",
    country: "Turkey",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Mausoleum",
    description:
      "An ornate tomb near Bodrum, one of the greatest achievements of Greek architecture.",
    coordinates: [27.4241, 37.0386],
    key: "halicarnassus",
  },
  {
    title: "Statue of Zeus at Olympia",
    country: "Greece",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Statue+of+Zeus",
    description:
      "A giant seated statue honoring the Greek god, crafted by Phidias.",
    coordinates: [22.5361, 37.6386],
    key: "zeus",
  },
  {
    title: "Temple of Artemis at Ephesus",
    country: "Turkey",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Temple+of+Artemis",
    description:
      "A magnificent marble temple dedicated to the goddess Artemis in Ephesus.",
    coordinates: [27.3415, 37.9391],
    key: "artemis",
  },
  {
    title: "Colossus of Rhodes",
    country: "Greece",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Colossus+of+Rhodes",
    description:
      "A towering statue of the sun god Helios at the Rhodes harbor entrance.",
    coordinates: [28.2278, 36.4510],
    key: "rhodes",
  },
  {
    title: "Lighthouse of Alexandria",
    country: "Egypt",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Lighthouse",
    description:
      "The ancient world's most famous lighthouse on the island of Pharos.",
    coordinates: [29.8853, 31.2135],
    key: "alexandria",
  },
  {
    title: "Eiffel Tower",
    country: "France",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Eiffel+Tower",
    description:
      "Paris' iconic iron tower of world expositions and romance.",
    coordinates: [2.2945, 48.8584],
    key: "eiffel",
  },
  {
    title: "Louvre Museum",
    country: "France",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Louvre+Museum",
    description:
      "The world's largest art museum and a historic monument in Paris.",
    coordinates: [2.3376, 48.8606],
    key: "louvre",
  },
  {
    title: "Times Square Clock Tower (NYC)",
    country: "USA",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Times+Square",
    description:
      "New York's famous crossroads: neon lights, crowds, and energy.",
    coordinates: [-73.9855, 40.758],
    key: "nyc",
  },
  {
    title: "Mount Fuji",
    country: "Japan",
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Mount+Fuji",
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
  const [explored, setExplored] = useState<number[]>([]);
  const [geoFetchError, setGeoFetchError] = useState(false);
  const [geoReady, setGeoReady] = useState(false);

  // Used to track when map loads successfully (workaround for react-simple-maps buggy error surfaces)
  useEffect(() => {
    setGeoFetchError(false);
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch geojson");
        return res.json();
      })
      .then(() => setGeoReady(true))
      .catch(() => setGeoFetchError(true));
  }, []);

  // Mark as explored when modal first opened for that landmark
  useEffect(() => {
    if (selectedIdx !== null && !explored.includes(selectedIdx)) {
      setExplored((prev) => [...prev, selectedIdx]);
    }
  }, [selectedIdx, explored]);

  if (geoFetchError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl shadow-inner text-pink-200 p-10">
        <span className="text-2xl font-semibold mb-2">🌍 Map Load Error</span>
        <span className="text-lg">Unable to load world map data.<br />Please check your internet connection or try refreshing.</span>
        <a
          href={GEO_URL}
          className="mt-3 text-blue-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View map data source
        </a>
      </div>
    );
  }

  // Responsive wrapper
  return (
    <div className="relative w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-800 p-3 sm:p-6">
      {/* Progress bar top right */}
      <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-indigo-200 font-semibold tracking-wide drop-shadow">
            Landmarks Explored
          </span>
          <span className="px-2 py-0.5 rounded-full bg-yellow-200/30 text-yellow-300 font-bold text-sm shadow border border-yellow-400/20">
            {explored.length}/{LANDMARKS.length}
          </span>
        </div>
        <Progress
          className="w-40 h-2 bg-indigo-300/20"
          value={Math.round((explored.length / LANDMARKS.length) * 100)}
        />
      </div>
      {/* Map panel */}
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={420}
        style={{
          width: "100%",
          height: "auto",
          minHeight: 300,
        }}
        aria-label="World Map"
      >
        {geoReady && (
          <>
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
                    className={`w-6 h-6 drop-shadow filter 
                      group-hover:scale-110
                      group-active:scale-95 
                      transition-transform duration-150 
                      cursor-pointer
                      ${explored.includes(idx)
                        ? "text-green-300"
                        : "text-yellow-300"
                      }
                    `}
                    fill={explored.includes(idx) ? "#86efac" : "#facc15"}
                    stroke={explored.includes(idx) ? "#22c55e" : "#eab308"}
                    strokeWidth={2}
                  />
                  <span className="sr-only">{lm.title}</span>
                </button>
              </Marker>
            ))}
          </>
        )}
      </ComposableMap>
      {/* Landmark Modal */}
      <LandmarkModal
        open={selectedIdx !== null}
        onOpenChange={(open) => setSelectedIdx(open ? selectedIdx : null)}
        landmark={
          selectedIdx !== null
            ? { ...LANDMARKS[selectedIdx], unlocked: explored.includes(selectedIdx) }
            : null
        }
        isMobile={isMobile()}
      />
    </div>
  );
};
