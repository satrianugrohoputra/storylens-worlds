
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
// Use any public Lottie (galaxy): Using a simple JSON for placeholder effect.
// You can swap LOTTIE_URL for any animated swirl/galaxy from lottiefiles.com
const LOTTIE_URL = "https://assets9.lottiefiles.com/packages/lf20_4kx2q32n.json";
// Import the JSON animation statically for Vite compatibility
import galaxyLottie from "../assets/galaxy-lottie.json";

function useTypewriter(text: string, delay = 26) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    let timer: NodeJS.Timeout;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      if (i < text.length - 1) {
        i++;
        timer = setTimeout(type, delay);
      }
    }
    type();
    return () => clearTimeout(timer);
  }, [text, delay]);
  return displayed;
}

// HERO COMPONENT
export const Hero: React.FC = () => {
  const t = useTypewriter("Welcome to StoryLens Worlds 🌌", 34);
  return (
    <section id="hero" className="relative flex flex-col w-full min-h-[98vh] items-center justify-center pt-24 pb-32 z-10">
      <div className="absolute inset-0 w-full h-full -z-1 pointer-events-none">
        <Lottie
          animationData={galaxyLottie}
          loop
          autoplay
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.93 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>
      <h1 className="relative z-10 font-extrabold text-4xl md:text-6xl tracking-tight text-white drop-shadow-2xl animate-typewriter">
        {t}
        <span className="blinking-cursor text-indigo-400" aria-hidden>|</span>
      </h1>
      <p className="text-xl md:text-2xl mt-6 font-medium text-indigo-200/90 z-10 backdrop-blur-md bg-black/10 px-6 py-3 rounded-lg border-l-4 border-indigo-400 animate-fade-in">
        Scroll to reveal an interactive narrative experience.
      </p>
    </section>
  );
};
