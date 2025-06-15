import React, { useState, useEffect } from "react";
import { ParticleBg } from "../components/ParticleBg";
import { Hero } from "../components/Hero";
import { SVGLogoMorph } from "../components/SVGLogoMorph";
import { ChapterCard } from "../components/ChapterCard";
import { ProgressChart } from "../components/ProgressChart";
import { AudioControl } from "../components/AudioControl";
import { ThemeToggle } from "../components/ThemeToggle";
import { LocaleSwitcher } from "../components/LocaleSwitcher";
import Footer from "../components/Footer";

const chapterData = [
  {
    id: "chapter-1",
    title: "The Journey Begins",
    content: [
      "Embark on an inspirational adventure.",
      "Every moment sparkles with possibility.",
    ],
  },
  {
    id: "chapter-2",
    title: "Through the Portal",
    content: [
      "Step into the unknown—but also within.",
      "New worlds await: see, listen, feel.",
    ]
  },
  {
    id: "chapter-3",
    title: "Unveiling Light",
    content: [
      "Let luminous stories illuminate your path.",
      "Legends and dreams swirl in cosmic dance.",
    ]
  },
];

export default function Index() {
  // For tracking scroll progress and bookmarks
  const [completed, setCompleted] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("bookmarks") || "[]");
    }
    return [];
  });
  const [locale, setLocale] = useState<"en" | "id">("en");
  // Detect chapter completion on scroll
  useEffect(() => {
    const onScroll = () => {
      let done = 0;
      chapterData.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && window.scrollY + window.innerHeight / 2 > el.offsetTop) {
          done = i + 1;
        }
      });
      setCompleted(done);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Keep bookmarks in localStorage
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <div className="bg-black min-h-screen font-sans transition-colors duration-500 relative overflow-x-hidden selection:bg-indigo-400/70 selection:text-white">
      <ParticleBg />
      <SVGLogoMorph />
      <ThemeToggle />
      <LocaleSwitcher locale={locale} setLocale={setLocale} />
      <AudioControl />
      <main>
        <Hero />
        <div className="relative z-10 max-w-2xl mx-auto py-10 flex flex-col gap-12">
          <ProgressChart completed={completed} total={chapterData.length} bookmarks={bookmarks} />
          {chapterData.map((chapter, idx) => (
            <ChapterCard
              key={chapter.id}
              {...chapter}
              bookmarked={bookmarks.includes(chapter.id)}
              setBookmarked={on => {
                setBookmarks(bm => {
                  const next = new Set(bm);
                  if (on) next.add(chapter.id);
                  else next.delete(chapter.id);
                  return Array.from(next);
                });
              }}
              locale={locale}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
