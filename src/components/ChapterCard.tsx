
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { BookmarkToggle } from "./BookmarkToggle";
import { ReadAloud } from "./ReadAloud";
import PortalLottie from "./PortalLottie";
import { ProgressChart } from "./ProgressChart";
import { Button } from "./ui/button";

// Props for new rich chapters, including feature flags and audio text
export type ChapterCardProps = {
  id: string;
  title: string;
  content: string[];
  bullets: string[];
  audioText: string;
  hasAudio: boolean;
  hasBookmark: boolean;
  hasPortalLottie: boolean;
  hasProgressChart: boolean;
  hasCta: boolean;
  bookmarked: boolean;
  setBookmarked: (on: boolean) => void;
  locale: "en" | "id";
  chartProgress?: number;
  totalChapters?: number;
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  id,
  title,
  content,
  bullets,
  audioText,
  hasAudio,
  hasBookmark,
  hasPortalLottie,
  hasProgressChart,
  hasCta,
  bookmarked,
  setBookmarked,
  locale,
  chartProgress,
  totalChapters,
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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  // Two-column wrap on desktop, single on mobile
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
      className="relative flex flex-col md:flex-row items-center rounded-xl shadow-lg bg-indigo-800/70 overflow-hidden gap-7 md:gap-10 px-6 py-10 mt-9 md:my-16 border border-indigo-300/10 hover:scale-102 transition-transform"
    >
      {/* Left: Text block / Heading / Bullets / Interactivity */}
      <div className="flex-1 min-w-0 w-full">
        <motion.div
          initial={{ y: -36, opacity: 0 }}
          animate="visible"
          variants={{
            visible: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.65, type: "spring" }}
          className="flex items-center gap-3 mb-3"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-0">
            {title}
          </h2>
          {/* Chapter 1: Play Audio */}
          {hasAudio && audioText && <ReadAloud text={audioText} />}
        </motion.div>
        {content.map((p, i) => (
          <motion.p
            key={i}
            className="mb-4 text-indigo-100/90 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 22 }}
            animate="visible"
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.11 + i * 0.1, duration: 0.38, type: "ease" }}
          >
            {p}
          </motion.p>
        ))}
        {/* Bullets with staggered fade-in */}
        <ul className="list-disc ml-6 mt-3 space-y-2">
          {bullets.map((item, idx) => (
            <motion.li
              key={idx}
              className="text-indigo-100/90 text-base md:text-lg font-medium fade-in-bullet"
              initial={{ opacity: 0, x: -14 }}
              animate="visible"
              variants={{
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ delay: 0.25 + idx * 0.15, duration: 0.38, type: "ease" }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
        {/* CTA - only on Chapter 3 */}
        {hasCta && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate="visible"
            variants={{
              visible: { scale: 1, opacity: 1 }
            }}
            transition={{ delay: 0.55, duration: 0.45, type: "spring" }}
            className="mt-7"
          >
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-xl shadow-lg ring-2 ring-indigo-400/40 transition-all animate-scale-in"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Start Your Own Story
            </Button>
          </motion.div>
        )}
      </div>
      {/* Right: Interactive column */}
      <div className="flex flex-col items-center min-w-[48px] flex-1 justify-center gap-4">
        {/* BookmarkToggle only on chapter 2 */}
        {hasBookmark && (
          <BookmarkToggle
            active={bookmarked}
            onToggle={setBookmarked}
          />
        )}
        {/* Portal Lottie Animation only on chapter 2 */}
        {hasPortalLottie && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate="visible"
            variants={{ visible: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ delay: 0.13, duration: 0.72, type: "spring" }}
            className="w-[215px] h-[215px] bg-indigo-900/80 rounded-xl shadow-xl overflow-hidden mt-2 mb-2 flex items-center justify-center"
          >
            <PortalLottie />
          </motion.div>
        )}
        {/* Animated ProgressChart only on chapter 3 */}
        {hasProgressChart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate="visible"
            variants={{ visible: { opacity: 1, scale: 1 } }}
            transition={{ delay: 0.1, duration: 0.55, type: "spring" }}
            className="w-full max-w-xs mx-auto mt-2"
          >
            <ProgressChart completed={chartProgress || 3} total={totalChapters || 3} bookmarks={[]} />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
