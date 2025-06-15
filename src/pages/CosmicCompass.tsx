
import React from "react";
import { MainNavbar } from "../components/MainNavbar";

export default function CosmicCompass() {
  return (
    <div className="min-h-screen bg-black relative pb-10">
      <MainNavbar />
      <div className="flex flex-col items-center justify-center min-h-[78vh] pt-32">
        <h1 className="text-4xl font-bold text-indigo-200 tracking-wide text-center mb-4 drop-shadow-md">
          Cosmic Compass
        </h1>
        <div className="text-lg text-indigo-300/80 text-center max-w-xl mx-auto mb-4">
          Chart your cosmic course. (Content coming soon!)
        </div>
      </div>
    </div>
  );
}
