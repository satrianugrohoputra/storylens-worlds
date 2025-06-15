
import React from "react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-8 md:px-16 py-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md shadow-lg">
    <div className="flex items-center gap-2">
      <span className="font-extrabold text-2xl tracking-tight text-white">StoryLens <span className="text-indigo-300">Worlds</span></span>
    </div>
    <div className="flex gap-8 text-base">
      <a href="#hero" className="story-link text-white/80 hover:text-indigo-400 transition">Home</a>
      <a href="#features" className="story-link text-white/80 hover:text-indigo-400 transition">Features</a>
      <a href="#contact" className="story-link text-white/80 hover:text-indigo-400 transition">Contact</a>
    </div>
  </nav>
);

export default Navbar;
