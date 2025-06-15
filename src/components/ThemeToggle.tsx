
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Floating theme toggle; toggles :root class .dark
export const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  // Animate transition on color scheme swap
  useEffect(() => {
    document.documentElement.style.transition = "background 0.6s cubic-bezier(.8,0,.2,1), color 0.4s";
  }, []);
  return (
    <button
      className={`fixed z-40 right-8 bottom-24 w-14 h-14 flex items-center justify-center rounded-full
        bg-gradient-to-br from-indigo-900 via-indigo-900/80 to-blue-600/50 shadow-lg
        ring-2 ring-white/20 hover:scale-110 transition`}
      onClick={() => setDark(d => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {dark ? <Sun className="w-7 h-7 text-yellow-400" /> : <Moon className="w-7 h-7 text-indigo-300" />}
    </button>
  );
};
