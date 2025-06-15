
import { useEffect, useRef } from "react";

// Adapted starfield. Could switch to a fancier particles lib if desired
const NUM_STARS = 75;

export const ParticleBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let animationFrame: number;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w; canvas.height = h;

    let stars = Array.from({ length: NUM_STARS }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.8,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      blink: Math.random() * 0.6 + 0.7,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        ctx.globalAlpha = s.blink + Math.sin(Date.now() * 0.0009 + s.x) * 0.23;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#a5b4fc";
        ctx.shadowBlur = 9;
        ctx.shadowColor = "#818cf8";
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        // bounce
        if (s.x < 0 || s.x > w) s.dx *= -1;
        if (s.y < 0 || s.y > h) s.dy *= -1;
      });
      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas ref={ref} className="particle-bg-canvas pointer-events-none w-full h-full" />
  );
};
