import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let planets: Planet[] = [];
    let shootingStars: ShootingStar[] = [];
    let particles: Particle[] = []; // Re-added particles

    // Planet emojis: less Earths, more others
    const planetEmojis = [
      '🌑', '🌕', '☀️', '🪐', '☄️', '🌌', 
      '🌑', '🌕', '🪐', '☀️', '☄️', 
      '🌑', '🌕', '🪐', '🌑', '🌕', 
      '🪐', '☀️', '☄️', '🌍'
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        // Cyan, Magenta, and Green
        const colors = ['#00f3ff', '#bd00ff', '#00ff9d'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.speed = this.size * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.x -= this.speed;
        if (this.x < 0) {
          this.x = canvas!.width;
          this.y = Math.random() * canvas!.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Planet {
      x: number;
      y: number;
      emoji: string;
      size: number;
      speed: number;
      opacity: number;

      constructor(initialX?: number) {
        this.size = Math.random() * 125 + 75; // Bigger: 75-200px
        this.x = initialX ?? (canvas!.width + this.size + Math.random() * 2000);
        this.y = Math.random() * canvas!.height;
        this.emoji = planetEmojis[Math.floor(Math.random() * planetEmojis.length)];
        this.speed = Math.random() * 0.2 + 0.05;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x -= this.speed;
        if (this.x < -this.size * 2) {
          this.x = canvas!.width + this.size + Math.random() * 1000;
          this.y = Math.random() * canvas!.height;
          this.emoji = planetEmojis[Math.floor(Math.random() * planetEmojis.length)];
          this.size = Math.random() * 125 + 75; // Reset size
          this.speed = Math.random() * 0.2 + 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 30; // Stronger glow
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText(this.emoji, this.x, this.y);
        ctx.restore();
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      active: boolean;

      constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speed = 0;
        this.opacity = 0;
      }

      reset() {
        this.x = Math.random() * canvas!.width + 200;
        this.y = Math.random() * canvas!.height * 0.5;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.opacity = 1;
        this.active = true;
      }

      update() {
        if (!this.active) {
          if (Math.random() < 0.005) this.reset();
          return;
        }

        this.x -= this.speed;
        this.y += this.speed * 0.2;
        this.opacity -= 0.02;

        if (this.opacity <= 0 || this.x < 0) {
          this.active = false;
        }
      }

      draw() {
        if (!ctx || !this.active) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y - this.length * 0.2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - this.length * 0.2);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      stars = [];
      planets = [];
      shootingStars = [];
      particles = [];

      for (let i = 0; i < 200; i++) stars.push(new Star());
      for (let i = 0; i < 50; i++) particles.push(new Particle()); // 50 glow particles
      
      // Initial planets
      for (let i = 0; i < 3; i++) {
        planets.push(new Planet(Math.random() * canvas.width));
      }
      for (let i = 0; i < 2; i++) planets.push(new Planet());

      shootingStars.push(new ShootingStar());
      shootingStars.push(new ShootingStar());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(s => { s.update(); s.draw(); });
      particles.forEach(p => { p.update(); p.draw(); }); // Draw particles
      planets.forEach(p => { p.update(); p.draw(); });
      shootingStars.forEach(s => { s.update(); s.draw(); });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2] bg-[#050505]" 
    />
  );
};

export default CyberBackground;
