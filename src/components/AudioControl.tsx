
import React, { useEffect, useRef, useState } from "react";
import { Headphones, VolumeX } from "lucide-react";

// Demo BG music: use an online mp3 or your own. This is a CC0 'breeze.wav' public sound.
const AUDIO_URL = "https://cdn.pixabay.com/audio/2023/05/24/audio_145b9009d2.mp3";

export const AudioControl = () => {
  const [muted, setMuted] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("muted") === "true" : false
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.18;
      audioRef.current.muted = muted;
      try { if (!muted) audioRef.current.play(); } catch {}
    }
    localStorage.setItem("muted", String(muted));
  }, [muted]);

  // Autoplay context: try play on first user click
  useEffect(() => {
    function tryPlay() {
      if (audioRef.current && !muted) {
        audioRef.current.play().catch(()=>{});
      }
      window.removeEventListener("pointerdown", tryPlay);
    }
    window.addEventListener("pointerdown", tryPlay, { once: true });
    return () => window.removeEventListener("pointerdown", tryPlay);
  }, [muted]);

  return (
    <>
      <audio ref={audioRef} src={AUDIO_URL} loop autoPlay style={{ display: "none" }} />
      <button
        className={`fixed z-40 right-8 bottom-36 shadow-lg rounded-full p-3
         bg-indigo-800/80 text-white transition hover:scale-110 focus:ring
         border-2 border-indigo-400/60
        `}
        onClick={() => setMuted(m => !m)}
        aria-label={muted ? "Unmute ambience" : "Mute ambience"}
        title={muted ? "Unmute ambience" : "Mute ambience"}
      >
        {muted ? <VolumeX className="w-6 h-6" /> : <Headphones className="w-6 h-6" />}
      </button>
    </>
  );
};
