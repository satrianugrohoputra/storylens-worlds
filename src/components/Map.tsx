
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { landmarks } from "../data/landmarks";
import { LandmarkModal } from "./LandmarkModal";

// TopoJSON world countries
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const Map: React.FC = () => {
  // Demo some visited; production would have persistence
  const [visitedIds, setVisitedIds] = useState<number[]>([1, 2]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMarkerClick = (id: number) => {
    setSelectedId(id);
    setVisitedIds((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const selectedLandmark = landmarks.find(l => l.id === selectedId);

  return (
    <div className="relative w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-800 p-3 sm:p-6">
      {/* Header progress counter */}
      <div className="mb-4 flex items-center gap-4">
        <span className="px-3 py-1 rounded-lg bg-indigo-900 text-indigo-100 font-semibold text-base shadow border border-indigo-400/30">
          Landmarks visited: {visitedIds.length} / {landmarks.length}
        </span>
        {/* Dots: filled for visited, empty for not */}
        <div className="flex items-center gap-1">
          {landmarks.map((l) => (
            <span
              key={l.id}
              className={`inline-block w-3 h-3 rounded-full transition-all ${
                visitedIds.includes(l.id)
                  ? "bg-green-400 animate-pulse shadow-green-200"
                  : "bg-indigo-800 opacity-40"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Map Panel */}
      <div className="w-full">
        <ComposableMap
          projection="geoEqualEarth"
          width={900}
          height={420}
          style={{
            width: "100%",
            height: "auto",
            minHeight: 300,
            backgroundColor: "#1f2937",
          }}
          aria-label="World Map"
        >
          {/* Background: world countries */}
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
                    hover: { fill: "#6366f1" },
                    pressed: { fill: "#6366f1" },
                  }}
                />
              ))
            }
          </Geographies>
          {/* Landmarks */}
          {landmarks.map((lm) => (
            <Marker key={lm.id} coordinates={lm.coords}>
              <g
                className={`transition filter ${
                  visitedIds.includes(lm.id)
                    ? "brightness-125 animate-pulse cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                tabIndex={0}
                aria-label={lm.name}
                onClick={() =>
                  visitedIds.includes(lm.id)
                    ? setSelectedId(lm.id)
                    : handleMarkerClick(lm.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    visitedIds.includes(lm.id)
                      ? setSelectedId(lm.id)
                      : handleMarkerClick(lm.id);
                  }
                }}
                role="button"
              >
                {/* SVG Pin */}
                <svg width={24} height={24} viewBox="0 0 32 32" className="drop-shadow-lg">
                  <ellipse
                    cx="16"
                    cy="11"
                    rx="7"
                    ry="8"
                    fill="#fde047"
                    stroke="#facc15"
                    strokeWidth={2}
                  />
                  <circle
                    cx="16"
                    cy="11"
                    r="4"
                    fill="#33bb81"
                    stroke="#047857"
                    strokeWidth={1.5}
                  />
                </svg>
                {/* Optional: <image> preview, but here using SVG for control/styling */}
              </g>
              <title>{lm.name}</title>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      {/* Modal for selected landmark */}
      <LandmarkModal
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        landmark={selectedLandmark || null}
      />
    </div>
  );
};
