
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, BookOpen, Home, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Main Page", to: "/", icon: Home },
  { name: "Chapter Progress", to: "#chapter-progress", icon: BookOpen },
  { name: "Music Box", to: "#music-box", icon: Music },
  { name: "Astro Archive", to: "/astro-archive", icon: Archive }
];

export const MainNavbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-2">
        <span className="font-extrabold text-xl tracking-tight text-white">StoryLens <span className="text-indigo-300">Worlds</span></span>
        <ul className="flex gap-2 sm:gap-4">
          {navLinks.map(link => {
            const isActive = link.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(link.to);
            // For anchor links, highlight if on main page
            const isSection = link.to.startsWith("#") && location.pathname === "/";
            const Icon = link.icon;
            return (
              <li key={link.name}>
                {link.to.startsWith("#") ? (
                  <a
                    href={link.to}
                    className={cn(
                      "story-link flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 text-white/85 hover:bg-indigo-700/60 hover:text-white focus:ring-2 focus:ring-indigo-400",
                      isSection && link.name === "Chapter Progress" && "font-semibold bg-indigo-700/30"
                    )}
                  >
                    <Icon size={18} className="inline-block" />
                    <span className="hidden sm:inline">{link.name}</span>
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={cn(
                      "story-link flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 text-white/85 hover:bg-indigo-700/60 hover:text-white focus:ring-2 focus:ring-indigo-400",
                      isActive && "font-semibold bg-indigo-700/30"
                    )}
                  >
                    <Icon size={18} className="inline-block" />
                    <span className="hidden sm:inline">{link.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
