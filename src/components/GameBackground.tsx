import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // bullet lifetime
}

interface Obstacle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  size: number;
  angle: number;
  spin: number;
  hp: number;
  maxHp: number;
  hitFlash: number; // visual feedback timer
}

const GameBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  
  // Game State refs
  const shipState = useRef({
    alive: true,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    angle: 0,
    targetAngle: 0,
    respawnTimer: 0,
    invulnerable: 0,
    shooting: false,
    lastShot: 0
  });

  // Listen for game toggle event
  useEffect(() => {
    const handleToggle = (e: CustomEvent<boolean>) => {
      setIsActive(e.detail);
    };

    window.addEventListener('toggleGame', handleToggle as EventListener);
    return () => {
      window.removeEventListener('toggleGame', handleToggle as EventListener);
    };
  }, []);

  // Prevent text selection AND hide cursor globally when game is active
  useEffect(() => {
    if (isActive) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none'; // Safari/Chrome
      document.body.style.cursor = 'none'; // Hide cursor globally
    } else {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.cursor = ''; // Restore cursor
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.cursor = '';
    };
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let bullets: Bullet[] = [];
    let obstacles: Obstacle[] = [];
    let stars: { x: number; y: number; size: number; alpha: number }[] = [];

    // Emojis for obstacles
    const emojis = ['👾', '☄️', '🌑', '🔥', '⚡️', '🪐', '🛸', '🧱'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          alpha: Math.random()
        });
      }
    };

    const createExplosion = (x: number, y: number, colorOverride?: string) => {
      const colors = colorOverride ? [colorOverride] : ['#f97316', '#ef4444', '#fbbf24', '#ffffff'];
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1
        });
      }
    };

    const spawnObstacle = () => {
      if (!isActive) return;

      if (obstacles.length < 15) {
        const size = 30 + Math.random() * 40; // 30-70px
        
        // Calculate HP based on size: 30px -> 1hp, 70px -> 5hp
        const hp = Math.floor((size - 20) / 10);

        // Spawn from edges
        let x, y;
        if (Math.random() > 0.5) {
          x = Math.random() > 0.5 ? -size : canvas.width + size;
          y = Math.random() * canvas.height;
        } else {
          x = Math.random() * canvas.width;
          y = Math.random() > 0.5 ? -size : canvas.height + size;
        }

        obstacles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size,
          angle: 0,
          spin: (Math.random() - 0.5) * 0.1,
          hp: Math.max(1, hp),
          maxHp: Math.max(1, hp),
          hitFlash: 0
        });
      }
    };

    const drawShip = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      // Adjust rotation: Rocket emoji 🚀 usually points top-right (-45deg).
      // To point right (0deg), we need to rotate it +45deg (PI/4).
      // So to point to 'angle', we rotate 'angle + PI/4'.
      // However, previous PI/2 was for Up-pointing icons. Let's try PI/4.
      ctx.rotate(angle + Math.PI / 4); 
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀', 0, 0);
      
      // Engine trail
      if (Math.random() > 0.5) {
        // Trail is opposite to the visual tip.
        // Visual tip is at (angle). So trail is at (angle + PI).
        // We need to calculate trail position based on the SHIP'S rotation context if using translate/rotate,
        // OR calculate absolute position.
        // Let's use local coordinates since we are rotated.
        // Rocket tail is roughly at bottom-left if head is top-right.
        // In our rotated context (where X axis is aligned with visual rocket axis roughly),
        // let's just spawn it behind.
        
        // Actually, easier to use absolute coordinates for particles to avoid rotation confusion.
        ctx.restore(); // Restore first to get back to absolute coords
        
        const trailAngle = angle + Math.PI; // Opposite to movement
        const trailX = x + Math.cos(trailAngle) * 15;
        const trailY = y + Math.sin(trailAngle) * 15;
        
        particles.push({
          x: trailX,
          y: trailY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0.5,
          color: '#fbbf24',
          size: Math.random() * 2 + 1
        });
        return; // Exit since we restored
      }

      ctx.restore();
    };

    const shoot = () => {
      const now = Date.now();
      // Fire rate: 150ms (approx 6-7 shots per second)
      if (now - shipState.current.lastShot > 150) {
        const angle = shipState.current.angle;
        // Spawn bullet at ship nose
        const bulletX = shipState.current.x + Math.cos(angle) * 20;
        const bulletY = shipState.current.y + Math.sin(angle) * 20;
        
        bullets.push({
          x: bulletX,
          y: bulletY,
          vx: Math.cos(angle) * 12, // High speed
          vy: Math.sin(angle) * 12,
          life: 60 // 1 sec lifetime
        });
        
        shipState.current.lastShot = now;
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive) {
        // Sync ship position directly to mouse for responsiveness
        if (shipState.current.alive) {
          // Calculate angle based on movement vector (Mouse Delta)
          const dx = mouseRef.current.x - shipState.current.x;
          const dy = mouseRef.current.y - shipState.current.y;
          
          // Only update target angle if moving significantly to prevent jitter
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
             shipState.current.targetAngle = Math.atan2(dy, dx);
          }

          // Smooth rotation (Lerp)
          const angleDiff = shipState.current.targetAngle - shipState.current.angle;
          // Normalize angle difference to [-PI, PI] to handle wrapping
          const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
          
          // Apply smoothing factor (0.1 = buttery smooth)
           shipState.current.angle += normalizedDiff * 0.1;
 
           // Smooth follow (Lerp) - adds inertia
           shipState.current.x += (mouseRef.current.x - shipState.current.x) * 0.12;
           shipState.current.y += (mouseRef.current.y - shipState.current.y) * 0.12;
        }

        // Handle Shooting
        if (shipState.current.alive && shipState.current.shooting) {
          shoot();
        }

        // Update & Draw Bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
          const b = bullets[i];
          b.x += b.vx;
          b.y += b.vy;
          b.life--;

          if (b.life <= 0 || b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(i, 1);
            continue;
          }

          // Draw bullet (glowing laser effect)
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#22d3ee'; // Cyan
          ctx.fill();
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#22d3ee';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }

        // Update & Draw Obstacles
        spawnObstacle();
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x += obs.vx;
          obs.y += obs.vy;
          obs.angle += obs.spin;
          if (obs.hitFlash > 0) obs.hitFlash--;

          // Wrap around screen
          if (obs.x < -100) obs.x = canvas.width + 100;
          if (obs.x > canvas.width + 100) obs.x = -100;
          if (obs.y < -100) obs.y = canvas.height + 100;
          if (obs.y > canvas.height + 100) obs.y = -100;

          // Check Bullet Collisions
          for (let j = bullets.length - 1; j >= 0; j--) {
            const b = bullets[j];
            const dx = b.x - obs.x;
            const dy = b.y - obs.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < obs.size / 2) {
              // Hit!
              bullets.splice(j, 1); // Remove bullet
              obs.hp--;
              obs.hitFlash = 5; // Flash for 5 frames
              
              // Small hit effect
              for (let k = 0; k < 3; k++) {
                particles.push({
                  x: b.x,
                  y: b.y,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  life: 0.3,
                  color: '#22d3ee',
                  size: 2
                });
              }

              if (obs.hp <= 0) {
                createExplosion(obs.x, obs.y);
                obstacles.splice(i, 1); // Remove obstacle
                // Break bullet loop as obstacle is gone
                break; 
              }
            }
          }
          
          if (obstacles[i] !== obs) continue; // If obstacle was removed, skip drawing

          ctx.save();
          ctx.translate(obs.x, obs.y);
          ctx.rotate(obs.angle);
          
          // Flash effect on hit
          if (obs.hitFlash > 0) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, obs.size/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }

          ctx.font = `${obs.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(obs.emoji, 0, 0);
          
          // Draw HP Bar if damaged
          if (obs.hp < obs.maxHp) {
             ctx.fillStyle = 'red';
             ctx.fillRect(-20, -obs.size/2 - 10, 40, 4);
             ctx.fillStyle = '#22c55e';
             ctx.fillRect(-20, -obs.size/2 - 10, 40 * (obs.hp / obs.maxHp), 4);
          }
          
          ctx.restore();

          // Ship Collision Detection
          if (shipState.current.alive && shipState.current.invulnerable <= 0) {
            const dx = obs.x - shipState.current.x;
            const dy = obs.y - shipState.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < obs.size / 2 + 10) {
              createExplosion(shipState.current.x, shipState.current.y, '#f97316');
              shipState.current.alive = false;
              shipState.current.respawnTimer = 180;
            }
          }
        }

        // Update & Draw Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Update Ship
        if (!shipState.current.alive) {
          shipState.current.respawnTimer--;
          if (shipState.current.respawnTimer <= 0) {
            shipState.current.alive = true;
            shipState.current.invulnerable = 120;
            shipState.current.x = mouseRef.current.x;
            shipState.current.y = mouseRef.current.y;
          }
        } else {
          // Draw Ship
          if (shipState.current.invulnerable > 0) {
              shipState.current.invulnerable--;
              if (Math.floor(Date.now() / 100) % 2 === 0) {
                  drawShip(shipState.current.x, shipState.current.y, shipState.current.angle);
              }
          } else {
              drawShip(shipState.current.x, shipState.current.y, shipState.current.angle);
          }
        }
      } else {
        obstacles = [];
        particles = [];
        bullets = [];
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      shipState.current.shooting = true;
    };

    const handleMouseUp = () => {
      shipState.current.shooting = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-opacity duration-500 ${isActive ? 'opacity-100 cursor-none' : 'opacity-0'}`}
      style={{ cursor: isActive ? 'none' : 'default' }} // Hide cursor when active
    />
  );
};

export default GameBackground;
