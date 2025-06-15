
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { BookmarkToggle } from "./BookmarkToggle";
import { ReadAloud } from "./ReadAloud";

// Main chapter card/sliding animation + bookmark/star
export type ChapterCardProps = {
  id: string;
  title: string;
  content: string[];
  bookmarked: boolean;
  setBookmarked: (on: boolean) => void;
  locale: "en" | "id";
};
export const ChapterCard: React.FC<ChapterCardProps> = ({
  id, title, content, bookmarked, setBookmarked, locale
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (
        rect.top < window.innerHeight * 0.84 &&
        rect.bottom > window.innerHeight * 0.06
      ) {
        controls.start("visible");
      }
    };
    onScroll(); // in case already in view
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 68 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.18 }}
      id={id}
      className="relative flex flex-col md:flex-row items-center rounded-xl shadow-lg bg-gradient-to-br from-indigo-900/80 to-indigo-700/80 overflow-hidden gap-7 md:gap-10 px-6 py-9 mt-9 md:my-16 border border-indigo-300/10 hover:scale-102 transition-transform"
    >
      {/* Text block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-0">
            {title}
          </h2>
          <ReadAloud text={[title, ...content].join(" ")} />
        </div>
        {content.map((p, i) => (
          <motion.p
            key={i}
            className="mb-4 text-indigo-100/90 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13*i, duration: 0.45, type: "spring" }}
          >
            {p}
          </motion.p>
        ))}
      </div>
      {/* Bookmark + Glow Button */}
      <div className="flex flex-col items-end h-full min-w-[48px]">
        <BookmarkToggle
          active={bookmarked}
          onToggle={setBookmarked}
        />
      </div>
    </motion.section>
  );
};
