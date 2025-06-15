
import React, { useRef } from "react";
import Lottie from "lottie-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Public portal Lottie animation
const PORTAL_LOTTIE = "https://assets2.lottiefiles.com/packages/lf20_h2tpbvn5.json";

export default function PortalParallax() {
  const [animationData, setAnimationData] = React.useState<object | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Parallax motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animation for smoothness
  const springX = useSpring(x, { stiffness: 45, damping: 8 });
  const springY = useSpring(y, { stiffness: 55, damping: 11 });

  React.useEffect(() => {
    let cancelled = false;
    fetch(PORTAL_LOTTIE)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => setAnimationData(null));
    return () => { cancelled = true; };
  }, []);

  // Mouse parallax
  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      x.set(dx * 32); // max 32px parallax
      y.set(dy * 21);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl z-0 pointer-events-none"
      style={{
        width: "250px",
        height: "250px",
        filter: "blur(0.5px)",
        opacity: 0.97,
        background: "radial-gradient(circle, #5858ff66 60%, #2c1b5d00 100%)",
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.91 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-indigo-200 bg-black/20 animate-pulse rounded-full" />
      )}
    </motion.div>
  );
}
