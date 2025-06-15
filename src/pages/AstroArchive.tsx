
import React, { useState } from "react";
import { AstroGalleryCard } from "../components/AstroGalleryCard";
import { AstroGalleryModal } from "../components/AstroGalleryModal";
import { AstroAddInspirationModal } from "../components/AstroAddInspirationModal";
import { Plus } from "lucide-react";

const GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    title: "Celestial Memories",
    quote: "We are a way for the cosmos to know itself.",
    description: "NASA/ESA Hubble image • Credit: NASA",
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    title: "Silent Summit",
    quote: "Somewhere, something incredible is waiting to be known.",
    description: "User art, inspired by a night on Mauna Kea.",
  },
];

export type Inspiration = {
  image: string;
  title: string;
  quote: string;
  description?: string;
};

export default function AstroArchive() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // State for user-uploaded inspirations
  const [userInspirations, setUserInspirations] = useState<Inspiration[]>([]);

  // Show modal for built-in or user items
  const allInspirations = [...GALLERY, ...userInspirations];

  // Modal selected index includes both built-in and user items
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden flex flex-col items-center justify-start">
      {/* Animated Starfield and Nebula BG */}
      <div className="fixed inset-0 -z-10 pointer-events-none animate-fade-in bg-gradient-to-b from-black via-indigo-950/95 to-black">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 60% 15%, #a5b4fc55 0%, transparent 60%),
                         radial-gradient(circle at 20% 80%, #f0abfc30 0%, transparent 70%),
                         radial-gradient(circle at 88% 70%, #818cf86c 0%, transparent 56%)`,
            zIndex: 1,
            transition: "opacity 2s",
            animation: "pulse 8s ease-in-out infinite alternate",
          }}
        ></div>
        <div className="particle-bg-canvas"></div>
      </div>

      <header className="flex flex-col items-center mt-24 mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-200 drop-shadow-md tracking-wide glow-lg" style={{ textShadow: "0 0 42px #a5b4fc, 0 0 24px #6366f1" }}>
          Astro Archive
        </h1>
        <div className="text-lg sm:text-xl text-indigo-300 opacity-80 mt-2 text-center font-medium max-w-2xl mx-auto px-3">
          A collection of stars, stories, and silent wisdom.
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="flex-1 w-full max-w-5xl px-4 pb-28">
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8"
          style={{ minHeight: "360px" }}
        >
          {allInspirations.map((item, idx) => (
            <AstroGalleryCard
              key={idx}
              image={item.image}
              title={item.title}
              quote={item.quote}
              onClick={() => setModalIdx(idx)}
            />
          ))}
        </div>
      </main>

      {/* Modal for viewing image */}
      {modalIdx !== null && (
        <AstroGalleryModal
          open={modalIdx !== null}
          onOpenChange={open => setModalIdx(open ? modalIdx : null)}
          image={allInspirations[modalIdx].image}
          title={allInspirations[modalIdx].title}
          quote={allInspirations[modalIdx].quote}
          description={allInspirations[modalIdx].description}
        />
      )}

      {/* Add Inspiration modal */}
      <AstroAddInspirationModal
        open={showAdd}
        onOpenChange={setShowAdd}
        onInspiration={(inspiration: Omit<Inspiration, "title">) => {
          // We'll use the quote as title for "caption" purposes
          setUserInspirations((prev) => [
            ...prev,
            {
              ...inspiration,
              title: inspiration.quote,
            },
          ]);
        }}
      />

      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-6 z-30 bg-gradient-to-tr from-indigo-600 via-pink-600 to-blue-500 p-0.5 rounded-full shadow-2xl animate-pulse hover:scale-110 focus:scale-110 transition-transform group ring-4 ring-indigo-400/20 active:ring-8"
        onClick={() => setShowAdd(true)}
        type="button"
        aria-label="Add New Inspiration"
        tabIndex={0}
        style={{
          boxShadow: "0 0 48px 10px #6c63ff77,0 0 0 7px #83184355",
        }}
      >
        <div className="flex items-center gap-2 px-5 py-4 font-bold text-lg text-indigo-50 tracking-wider rounded-full bg-black/80 hover:bg-black/60 transition-all relative">
          <span className="glow-md">
            <Plus className="inline-block -ml-2 mr-1" size={28} />
          </span>
          <span className="drop-shadow-sm">Add My Inspiration</span>
        </div>
      </button>
    </div>
  );
}

