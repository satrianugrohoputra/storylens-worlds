
import React, { useRef, useState } from "react";
import { Play, Stop, Music } from "lucide-react";

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/track/2gmWJA9oF4GD2Vw5QoRqu1?utm_source=generator&theme=0";

export const SpotifyPlayerBox: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Workaround: programmatically start/stop music box via visibility
  // (Direct control of Spotify embed playback is not available for public embeds)
  // So we'll hide (stop) or show (play) the iframe
  // When stopped, we reset src to truly stop audio

  const [iframeKey, setIframeKey] = useState(0); // Changes to force reload

  const handlePlay = () => {
    setIsPlaying(true);
    setIframeKey(k => k + 1); // reloads iframe if needed
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIframeKey(k => k + 1);
  };

  return (
    <section
      className="w-full max-w-xl mx-auto flex flex-col items-center gap-3 mt-10 mb-6 p-5 rounded-xl bg-gradient-to-br from-indigo-900/80 via-black/70 to-indigo-800/90 shadow-2xl border border-indigo-400/20"
      aria-label="Spotify Music Box"
    >
      <div className="flex items-center gap-2 mb-2">
        <Music className="text-green-400" size={26} />
        <span className="text-lg font-bold text-indigo-50 tracking-wide">Music Box</span>
      </div>
      <iframe
        key={iframeKey}
        ref={iframeRef}
        src={isPlaying ? SPOTIFY_EMBED_URL : "about:blank"}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
        className={`rounded-lg shadow-lg transition-all w-full ${isPlaying ? "opacity-100" : "opacity-30 grayscale"}`}
        style={{ minHeight: 80, background: "#111" }}
        title="Spotify player"
      ></iframe>
      <div className="flex gap-4 mt-2">
        <button
          className={`bg-green-500/90 hover:bg-green-700 text-white rounded-full px-5 py-2 flex items-center gap-2 font-semibold shadow-lg transition-all ${isPlaying ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
          onClick={handlePlay}
          disabled={isPlaying}
          title="Play Music"
        >
          <Play size={20} className="mr-1" />
          Play
        </button>
        <button
          className={`bg-red-500/90 hover:bg-red-700 text-white rounded-full px-5 py-2 flex items-center gap-2 font-semibold shadow-lg transition-all ${!isPlaying ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
          onClick={handleStop}
          disabled={!isPlaying}
          title="Stop Music"
        >
          <Stop size={20} className="mr-1" />
          Stop
        </button>
      </div>
      <span className="text-xs text-indigo-200/70 mt-1">via Spotify &mdash; Music for your journey 🎶</span>
    </section>
  );
};
