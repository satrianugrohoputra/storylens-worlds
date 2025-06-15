
import React from "react";
import { ParticleBg } from "../components/ParticleBg";
import { motion } from "framer-motion";
import Timeline from "../components/ChapterOne/Timeline";
import Map from "../components/ChapterOne/Map";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ChapterOne() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-sky-900/90 to-black min-h-screen flex flex-col font-sans overflow-x-hidden">
      <ParticleBg />
      {/* Hero Banner */}
      <header className="relative flex flex-col items-center justify-center min-h-[62vh] pt-24 pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.86, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2"
        >
          Chapter 1: The Journey Begins
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: "easeOut" }}
          className="text-xl md:text-2xl font-medium text-indigo-200/95 mb-5"
        >
          Every great adventure starts with a single step.
        </motion.h2>
      </header>
      {/* Main content */}
      <main className="relative z-20 flex flex-col gap-16 w-full max-w-3xl mx-auto px-4 pb-20">
        {/* Timeline */}
        <section>
          <h3 className="text-lg uppercase tracking-wider font-bold text-indigo-200/60 mb-3 pl-1">Origins Timeline</h3>
          <Timeline />
        </section>
        {/* Interactive Map */}
        <section>
          <h3 className="text-lg uppercase tracking-wider font-bold text-indigo-200/60 mb-3 pl-1">Journey Map</h3>
          <Map />
        </section>
        {/* Quote Block */}
        <section className="text-center">
          <blockquote className="relative mx-auto max-w-xl px-7 py-7 rounded-xl bg-indigo-950/80 border-l-4 border-indigo-500/80 text-xl md:text-2xl text-indigo-100 italic shadow-lg">
            <span className="block mb-2 text-indigo-400 text-3xl leading-none">“</span>
            The first step is always the hardest—but also the most rewarding.
            <span className="block mt-2 text-indigo-400 text-3xl leading-none rotate-180">”</span>
          </blockquote>
        </section>
        {/* CTA */}
        <section className="flex items-center justify-center mt-6">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold px-8 py-3 rounded-xl shadow-xl ring-2 ring-indigo-500/60 transition-all hover:scale-105 focus:scale-105 glow-star focus:outline-none animate-scale-in"
            size="lg"
            onClick={() => navigate("/chapter/2")}
          >
            Continue to Chapter 2
          </Button>
        </section>
      </main>
    </div>
  );
}
