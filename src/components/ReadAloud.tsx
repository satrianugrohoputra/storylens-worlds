
import React, { useState } from "react";
import { Volume } from "lucide-react";

// Read-aloud with Web Speech API
export const ReadAloud: React.FC<{ text: string }> = ({ text }) => {
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (!window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    utter.lang = "en-US"; // Optional: locale support
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }

  return (
    <button
      onClick={speak}
      className={`ml-1 hover-scale px-1 py-1 rounded-full focus:ring focus:ring-indigo-300 focus:outline-none ${speaking ? "bg-indigo-200" : ""}`}
      aria-label={speaking ? "Stop reading" : "Read aloud"}
      title="Read aloud"
      type="button"
    >
      <Volume className="w-6 h-6 text-indigo-100" />
    </button>
  );
};
