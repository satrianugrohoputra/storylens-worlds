
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// Note: Using circle as marker for simplicity & visibility

// A valid open/world countries topojson
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 11 representative landmarks with coordinates and images
const LANDMARKS = [
  {
    name: "Great Wall of China",
    coords: [116.5704, 40.4319],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Petra",
    coords: [35.4444, 30.3285],
    img: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Christ the Redeemer",
    coords: [-43.2105, -22.9519],
    img: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Machu Picchu",
    coords: [-72.544963, -13.163141],
    img: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chichen Itza",
    coords: [-88.5678, 20.6843],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Chichen+Itza",
  },
  {
    name: "Roman Colosseum",
    coords: [12.4922, 41.8902],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Colosseum",
  },
  {
    name: "Taj Mahal",
    coords: [78.0421, 27.1751],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Taj+Mahal",
  },
  {
    name: "Eiffel Tower",
    coords: [2.2945, 48.8584],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Eiffel+Tower",
  },
  {
    name: "Sydney Opera House",
    coords: [151.2153, -33.8572],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Sydney+Opera+House",
  },
  {
    name: "Mount Fuji",
    coords: [138.7274, 35.3606],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Mount+Fuji",
  },
  {
    name: "Statue of Liberty",
    coords: [-74.0445, 40.6892],
    img: "https://placehold.co/600x400/1e293b/a5b4fc/png?text=Statue+of+Liberty",
  },
];

export const CosmicMap: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [geoReady, setGeoReady] = useState(false);
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    setGeoError(false);
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch geojson");
        return res.json();
      })
      .then(() => setGeoReady(true))
      .catch(() => setGeoError(true));
  }, []);

  if (geoError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900 rounded-2xl shadow-inner text-pink-200 p-10">
        <span className="text-2xl font-semibold mb-2">🌍 Map Load Error</span>
        <span className="text-lg">Unable to load world map data.<br />Please check your internet connection or try refreshing.</span>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-800 p-3 sm:p-6">
      {/* Landmarks counter */}
      <div className="absolute left-4 top-4 z-10 flex flex-col items-start">
        <span className="px-2 py-1 rounded-lg bg-indigo-900 text-indigo-100 font-semibold text-sm shadow border border-indigo-400/30">
          Landmarks visited: {selected !== null ? 1 : 0}/{LANDMARKS.length}
        </span>
      </div>
      {/* Map Panel */}
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
        {geoReady && (
          <>
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
            {/* Render each marker */}
            {LANDMARKS.map((lm, idx) => (
              <Marker key={lm.name} coordinates={lm.coords}>
                <circle
                  r={13}
                  className="stroke-yellow-400 fill-yellow-300/90 cursor-pointer hover:fill-green-300 hover:stroke-green-500 transition"
                  style={{
                    filter: "drop-shadow(0 2px 6px #eab30899)",
                  }}
                  strokeWidth={3}
                  onClick={() => setSelected(idx)}
                  tabIndex={0}
                />
                {/* SCREENREADER title for accessibility */}
                <title>{lm.name}</title>
              </Marker>
            ))}
          </>
        )}
      </ComposableMap>
      {/* Modal to show selected landmark info */}
      <Dialog open={selected !== null} onOpenChange={(open) => setSelected(open ? selected : null)}>
        <DialogContent
          className="max-w-sm p-0 rounded-2xl border-2 border-indigo-700 bg-gradient-to-b from-indigo-900/90 to-black/90 shadow-2xl animate-scale-in flex flex-col items-center"
          style={{
            boxShadow: "0 0 40px 6px #6366f177, 0 3px 30px 2px #312e8144",
          }}
        >
          {selected !== null && (
            <div className="w-full flex flex-col items-center">
              <div className="w-full aspect-[5/4] rounded-t-2xl overflow-hidden bg-black/70 flex items-center justify-center border-b-2 border-indigo-800">
                <img
                  src={LANDMARKS[selected].img}
                  alt={LANDMARKS[selected].name}
                  className="w-full h-full object-cover object-center transition-all duration-200 rounded-t-2xl select-none"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectPosition: "center",
                  }}
                  draggable={false}
                />
              </div>
              <div className="py-3 px-6 w-full flex flex-col items-center">
                <DialogTitle asChild>
                  <h2 className="font-bold text-xl text-indigo-100 text-center mt-1 mb-2 drop-shadow flex items-center justify-center gap-2">
                    {LANDMARKS[selected].name}
                  </h2>
                </DialogTitle>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
