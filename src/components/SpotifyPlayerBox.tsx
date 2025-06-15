
import React from "react";

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/track/2gmWJA9oF4GD2Vw5QoRqu1?utm_source=generator";

export const SpotifyPlayerBox: React.FC = () => (
  <section
    className="flex flex-col items-center justify-center w-full min-h-[200px] py-7 px-3"
    aria-label="Spotify Music Box"
  >
    <h1 className="text-2xl font-bold mb-5 text-white text-center">🎶 My Music Box</h1>
    <div className="w-full max-w-md spotify-box bg-transparent rounded-2xl overflow-hidden shadow-[0_0_25px_0_rgba(0,255,255,0.2)]">
      <iframe
        style={{ borderRadius: "12px" }}
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify player"
      ></iframe>
    </div>
  </section>
);

