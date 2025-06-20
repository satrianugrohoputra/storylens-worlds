
import React from "react";
import { MainNavbar } from "../components/MainNavbar";
import { Map } from "../components/Map";

export default function CosmicCompass() {
  return (
    <div className="min-h-screen bg-black relative pb-10">
      <MainNavbar />
      <div className="flex flex-col items-center w-full pt-28 pb-10">
        <div className="mb-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-200 tracking-wide text-center mb-3 drop-shadow-md">
            Cosmic Compass
          </h1>
          <div className="text-xl sm:text-2xl text-indigo-300/80 text-center max-w-2xl mx-auto mb-6 font-medium">
            Explore the world’s wonders and unlock your journey
          </div>
        </div>
        {/* Responsive Map Panel with Progress bar inside */}
        <div className="w-full max-w-5xl flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}
