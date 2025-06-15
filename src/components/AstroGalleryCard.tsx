
import React from "react";

interface AstroGalleryCardProps {
  image: string;
  title: string;
  quote: string;
  onClick: () => void;
}

export const AstroGalleryCard: React.FC<AstroGalleryCardProps> = ({
  image,
  title,
  quote,
  onClick,
}) => (
  <button
    className="aspect-square bg-black/60 rounded-xl overflow-hidden relative shadow-lg shadow-indigo-900/50 hover:scale-105 transition-transform duration-200 group focus:outline-none"
    style={{ boxShadow: "0 0 30px 0 #818cf8, 0 0 8px 2px #312e81" }}
    onClick={onClick}
    aria-label={`Open image: ${title}`}
    tabIndex={0}
    type="button"
  >
    <img
      src={image}
      alt={title}
      className="object-cover w-full h-full group-hover:opacity-90 group-hover:shadow-glow transition"
      draggable={false}
      style={{ pointerEvents: "none" }}
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-2">
      <div className="font-semibold text-indigo-100 text-base leading-tight truncate">{title}</div>
      <div className="text-indigo-200 text-xs opacity-80 truncate">{quote}</div>
    </div>
  </button>
);
