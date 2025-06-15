
import React from "react";
import { Star } from "lucide-react";

// Glowing STAR toggle; persists via parent prop
export function BookmarkToggle({ active, onToggle }: { active: boolean, onToggle: (v:boolean)=>void }) {
  return (
    <button
      aria-label={active ? "Bookmarked" : "Bookmark"}
      onClick={e => { e.preventDefault(); onToggle(!active); }}
      className={`relative hover-scale focus:outline-none group`}
      tabIndex={0}
    >
      <Star
        className={`w-9 h-9 transition-all duration-200
          ${active
            ? "text-yellow-400 fill-yellow-300 drop-shadow-xl glow-star"
            : "text-indigo-200 group-hover:fill-yellow-200/70 group-hover:text-yellow-300"}
         `}
        strokeWidth={2.2}
      />
      <span className="sr-only">{active ? "Unbookmark" : "Bookmark"}</span>
    </button>
  );
}
