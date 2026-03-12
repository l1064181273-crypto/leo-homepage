import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface EmojiFloat {
  x: number;
  y: number;
  vy: number;
  vx: number;
  emoji: string;
  size: number;
  opacity: number;
}

const EMOJIS = ["✨", "🤖", "💡", "🌟", "🚀", "💻", "🎨", "⭐"];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const emojisRef = useRef<EmojiFloat[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const count = Math.min(40, Math.floor(window.innerWidth / 40));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
    }));

    // Init floating emojis
    const emojiCount = Math.min(12, Math.floor(window.innerWidth / 150));
    emojisRef.current = Array.from({ length: emojiCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: Math.random() * 10 + 12,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    let visible = true;
    const handleVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const draw = () => {
      if (!visible) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(88, 55%, 50%, 0.9)";
        ctx.fill();
      }

      // Draw lines near cursor
      const radius = 150;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const dMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dMouse > radius * 2) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < radius) {
            const opacity = (1 - d / radius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(88, 55%, 45%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw floating emojis
      for (const e of emojisRef.current) {
        e.x += e.vx;
        e.y += e.vy;
        if (e.y < -30) {
          e.y = canvas.height + 30;
          e.x = Math.random() * canvas.width;
        }
        if (e.x < -30) e.x = canvas.width + 30;
        if (e.x > canvas.width + 30) e.x = -30;

        ctx.globalAlpha = e.opacity;
        ctx.font = `${e.size}px serif`;
        ctx.fillText(e.emoji, e.x, e.y);
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default ParticleBackground;
