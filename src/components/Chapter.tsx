
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ModelViewer } from "./ModelViewer";

type ChapterProps = {
  id: string;
  title: string;
  content: string[];
  modelUrl: string;
  bgColor: string;
  reverse?: boolean;
};

const typewriterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export const Chapter: React.FC<ChapterProps> = ({ id, title, content, modelUrl, bgColor, reverse }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: true });
  const [typedLines, setTypedLines] = useState(0);
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isInView) {
      setTypedLines(0);
      t = setTimeout(() => setTypedLines(1), 200); // kick-off
      let line = 1;
      const tick = () => {
        if (line < content.length) {
          t = setTimeout(() => {
            setTypedLines(line + 1);
            line += 1;
            tick();
          }, 950);
        }
      };
      tick();
      // 3D fade after text enters
      setTimeout(() => setShow3D(true), 200 + 900 * content.length);
    }
    return () => clearTimeout(t);
  }, [isInView, content.length]);
  return (
    <section
      id={id}
      ref={ref}
      className={`w-full min-h-[90vh] flex items-center py-20 px-2 transition-colors duration-700
        ${bgColor} ${reverse ? "md:flex-row-reverse" : "md:flex-row"} flex-col gap-12 md:gap-16 relative`}
    >
      <div className="flex-1 max-w-xl z-10">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={typewriterVariants}
          transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-white"
        >
          {title}
        </motion.h2>
        <div className="space-y-5 text-lg md:text-xl font-normal text-white/90 relative">
          {content.slice(0, typedLines).map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * idx, duration: 0.45, type: "ease" }}
              className="border-l-4 border-indigo-400/30 pl-5"
              style={{
                overflow: "hidden",
                whiteSpace: "pre-line"
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
      <motion.div
        className="flex-1 flex items-center justify-center min-w-[300px] relative"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={show3D ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        {show3D && <ModelViewer modelUrl={modelUrl} hint />}
      </motion.div>
    </section>
  );
};
