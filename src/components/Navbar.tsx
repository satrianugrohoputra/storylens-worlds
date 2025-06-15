
import { motion } from "framer-motion";

const Navbar = () => (
  <nav className="fixed w-full z-30 top-0 left-0 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm shadow-none flex items-center justify-between px-10 py-4">
    <div className="flex items-center gap-2">
      <span className="font-bold text-2xl tracking-tight text-white">StoryLens <span className="text-indigo-400">3D</span></span>
    </div>
    <div className="hidden md:flex gap-5">
      <a className="story-link text-white/70 hover:text-indigo-400 font-medium text-sm transition" href="#chapter-1">Chapters</a>
      <a className="story-link text-white/70 hover:text-indigo-400 font-medium text-sm transition" href="#about">About</a>
      {/* Add more nav links as needed */}
    </div>
  </nav>
);

export default Navbar;
