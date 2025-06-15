
import { useRef, useEffect } from "react";

export const ParticleBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let frameId: number;
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    let stars = Array.from({ length: 75 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.4,
      dx: (Math.random() - 0.5) * 0.14,
      dy: (Math.random() - 0.5) * 0.14,
      blink: Math.random() * 0.7 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        ctx.globalAlpha = s.blink + Math.sin(Date.now() * 0.0008 + s.x + s.y) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#a5b4fc";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#818cf8";
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0 || s.x > w) s.dx *= -1;
        if (s.y < 0 || s.y > h) s.dy *= -1;
      });
      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="particle-bg-canvas pointer-events-none w-full h-full fixed top-0 left-0 z-0"
      aria-hidden
    />
  );
};

