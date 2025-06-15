
import { useState, useEffect } from "react";
import { ModelViewer } from "./ModelViewer";

const heroText = "Welcome to StoryLens Worlds";

export const Hero = () => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const type = () => {
      setDisplayed(heroText.slice(0, i + 1));
      if (i < heroText.length - 1) {
        i++;
        setTimeout(type, 60);
      }
    };
    type();
  }, []);
  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] py-32 text-center"
    >
      <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight text-white mb-5 animate-typewriter whitespace-nowrap">
        {displayed}
        <span className="blinking-cursor text-indigo-300">|</span>
      </h1>
      <p className="text-lg md:text-2xl mb-10 text-indigo-100/80 font-medium">
        Scroll down to explore 3D scenes &amp; narrative journeys.
      </p>
      <div className="w-full max-w-lg flex justify-center items-center mx-auto">
        {/* Hero: rotating sphere as centerpiece */}
        <ModelViewer variant="sphere" />
      </div>
    </section>
  );
};
