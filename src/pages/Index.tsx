
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
import { Link } from "react-router-dom";

const chapterData = [
  {
    id: "chapter-1",
    title: "The Journey Begins",
    content: [
      "Welcome, traveler. Every great adventure starts with a single step into the unknown. Here, you'll discover the spark that ignites innovation.",
    ],
    bullets: [
      "Origins of the story – how it all started",
      "First challenge faced",
      'The "aha!" moment',
    ],
    audioText:
      "Welcome, traveler. Every great adventure starts with a single step into the unknown. Here, you'll discover the spark that ignites innovation. Origins of the story, first challenge faced, and that unforgettable 'aha!' moment.",
    hasAudio: true,
    hasBookmark: true,
    hasPortalLottie: false,
    hasProgressChart: false,
    hasCta: false,
    route: "/chapter/1",
  },
  {
    id: "chapter-2",
    title: "Through the Portal",
    content: [
      "Cross the threshold and behold new perspectives. As you step through, reality bends and imagination takes flight.",
    ],
    bullets: [
      "Interactive portal Lottie animation (fade-in)",
      "Three key features: Speed, Scale, Creativity",
    ],
    audioText: "",
    hasAudio: false,
    hasBookmark: true,
    hasPortalLottie: true,
    hasProgressChart: false,
    hasCta: false,
    route: "/chapter/2",
  },
  {
    id: "chapter-3",
    title: "Vision of Tomorrow",
    content: [
      "Gaze ahead to what could be. Our journey shapes the future we will live in—imagine the possibilities.",
    ],
    bullets: [
      "Roadmap for next steps",
      "How users can contribute (feedback, share link)",
      "Call to action button: 'Start Your Own Story'",
    ],
    audioText: "",
    hasAudio: false,
    hasBookmark: false,
    hasPortalLottie: false,
    hasProgressChart: false,
    hasCta: true,
    route: "/chapter/3", // <--- CHANGED: now links to chapter 3!
  },
];

export default function Index() {
  const [completed, setCompleted] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("bookmarks") || "[]");
    }
    return [];
  });
  const [locale, setLocale] = useState<"en" | "id">("en");

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
          {chapterData.map((chapter, idx) => {
            // Only wrap chapters 1 and 2
            const chapterCard = (
              <ChapterCard
                key={chapter.id}
                id={chapter.id}
                title={chapter.title}
                content={chapter.content}
                bullets={chapter.bullets}
                audioText={chapter.audioText}
                hasAudio={chapter.hasAudio}
                hasBookmark={chapter.hasBookmark}
                hasPortalLottie={chapter.hasPortalLottie}
                hasProgressChart={chapter.hasProgressChart}
                hasCta={chapter.hasCta}
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
                chartProgress={completed}
                totalChapters={chapterData.length}
              />
            );
            if (chapter.route) {
              return (
                <Link
                  to={chapter.route}
                  key={chapter.id}
                  className="rounded-xl shadow-xl ring-2 ring-indigo-400/0 hover:ring-indigo-300/70 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all group"
                  tabIndex={0}
                  aria-label={`View details of ${chapter.title}`}
                  style={{ textDecoration: "none" }}
                >
                  {chapterCard}
                </Link>
              );
            } else {
              return chapterCard;
            }
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
