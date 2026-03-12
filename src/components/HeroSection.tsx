import { motion } from "framer-motion";
import { Gamepad2, Smartphone, Music, Sparkles, GraduationCap, Leaf, Camera, Coffee, Play, Pause } from "lucide-react";
import avatarImg from "@/assets/avatar-3d.png";
import { Tilt } from 'react-tilt';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,   // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const HeroSection = () => {
  const [isGameActive, setIsGameActive] = useState(false);

  // Dispatch custom event when game state changes
  useEffect(() => {
    const event = new CustomEvent('toggleGame', { detail: isGameActive });
    window.dispatchEvent(event);
  }, [isGameActive]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-medium tracking-[-0.04em] text-balance leading-tight mb-2">
            <span className="text-primary glow-text-primary">Haonan-Li</span>
          </h1>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { text: "Ai Trainer", icon: Sparkles },
              { text: "A Student of QieMan", icon: GraduationCap },
              { text: "Smart Agriculture Graduate Student", icon: Leaf },
              { text: "Game lovers", icon: Gamepad2 },
            ].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg bg-muted text-muted-foreground border border-border transition-all duration-150 hover:border-primary hover:text-foreground cursor-default group"
              >
                <tag.icon className="w-4 h-4 text-accent glow-text-accent group-hover:drop-shadow-[0_0_12px_hsl(var(--accent-glow))] transition-all duration-150" />
                {tag.text}
              </motion.span>
            ))}
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[50ch] text-pretty mb-8">
            探索 AI 与创意的边界
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              href="#about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium transition-all duration-150 hover:border-primary hover:text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              关于我
            </motion.a>
            <Link
              to="/friend"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium transition-all duration-150 hover:border-primary hover:text-primary"
            >
              联系我
            </Link>
            
            {/* Game Toggle Button */}
            <motion.button
              onClick={() => setIsGameActive(!isGameActive)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium transition-all duration-150 hover:border-primary hover:text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              点我试试
            </motion.button>
          </div>
        </motion.div>

        {/* Right - Avatar */}
        <motion.div
          className="flex flex-col items-center lg:items-center gap-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Tilt options={defaultOptions} className="relative group cursor-pointer">
            {/* Purple Glow Ring - Outer */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            
            <img
              src={avatarImg}
              alt="AI 生成头像"
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            />
          </Tilt>
          {/* Hobby Icons */}
          <div className="flex gap-4">
            {[
              { Icon: Gamepad2, link: "/gaming" },
              { Icon: Camera, link: "/photography" },
              { Icon: Coffee, link: "/daily" }
            ].map(({ Icon, link }, i) => (
              <Link to={link} key={i}>
                <div
                  className="glass-card flex items-center justify-center w-12 h-12 rounded-full group cursor-pointer hover:bg-white/10 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent-glow))] transition-all duration-150" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
