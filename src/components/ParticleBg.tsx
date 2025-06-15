
import React, { useRef, useEffect } from "react";

// Responsive, interactive particles: react to mouse & scroll position.
export const ParticleBg = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let w = window.innerWidth, h = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr,0,0,dpr,0,0);

    // Particle system
    let particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      hue: 220 + Math.random() * 60
    }));
    let mouse = { x: w/2, y: h/2 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Responsive color based on scroll
      const scrollY = window.scrollY;
      let hueShift = (scrollY % 360) || 0;

      for (let i = 0; i < particles.length; ++i) {
        let p = particles[i];
        // Attraction to mouse
        let dx = mouse.x - p.x, dy = mouse.y - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          p.vx += dx / 1600;
          p.vy += dy / 1600;
        }
        // Motion update
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        // Bounce + wrap
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${p.hue + hueShift}, 87%, 76%)`;
        ctx.shadowColor = `hsl(${p.hue + hueShift}, 69%, 54%)`;
        ctx.shadowBlur = 7 + 2*Math.sin(Date.now()/200 + i);
        ctx.globalAlpha = 0.45 + 0.4*Math.sin(Date.now()/1000 + i);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    let running = true;
    draw();

    const setSize = () => {
      w = window.innerWidth; h = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("resize", setSize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      running = false;
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ background: "radial-gradient(ellipse at 50% 40%,#191947 55%,#11191e 100%)" }}
      aria-hidden
    />
  );
};
