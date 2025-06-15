
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { ModelViewer } from "./ModelViewer";

type ChapterCardProps = {
  title: string;
  paragraphs: string[];
  modelVariant: "cube" | "sphere" | "torus";
  reverse?: boolean; // alternates layout
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  title,
  paragraphs,
  modelVariant,
  reverse
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Trigger anim when card is ~1/3 in viewport
      if (
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.1
      ) {
        controls.start("visible");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 54 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.85, type: "spring", bounce: 0.22 }}
      className={`relative z-10 flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center md:justify-between gap-8 md:gap-16 my-14 px-4`}
    >
      {/* Text */}
      <div className="flex-1 max-w-xl md:pr-3">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-indigo-100/90 text-base md:text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      {/* 3D Model */}
      <div className="w-full max-w-md flex-1 h-64 md:h-80 flex justify-center items-center">
        <ModelViewer variant={modelVariant} />
      </div>
    </motion.section>
  );
};
