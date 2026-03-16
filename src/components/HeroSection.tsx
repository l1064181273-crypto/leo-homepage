import { motion } from "framer-motion";
import { Gamepad2, Sparkles, GraduationCap, Leaf, Camera, Coffee, BookOpen } from "lucide-react";
import avatarImg from "@/assets/avatar-3d.png";
import { Tilt } from 'react-tilt';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const defaultOptions = {
  reverse: false,
  max: 25,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const tags = [
  { text: "AI Trainer", icon: Sparkles, color: "text-purple-400" },
  { text: "A Student of QieMan", icon: GraduationCap, color: "text-blue-400" },
  { text: "Smart Agriculture Graduate Student", icon: Leaf, color: "text-green-400" },
  { text: "Game Lover", icon: Gamepad2, color: "text-orange-400" },
];

const hobbies = [
  { Icon: Coffee, link: "/daily", label: "日常", color: "hover:text-amber-400" },
  { Icon: BookOpen, link: "/study", label: "学习", color: "hover:text-blue-400" },
  { Icon: Camera, link: "/photography", label: "摄影", color: "hover:text-rose-400" },
  { Icon: Gamepad2, link: "/gaming", label: "游戏", color: "hover:text-purple-400" },
];

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
          {/* Greeting */}
          <motion.p
            className="font-mono text-sm text-muted-foreground/60 mb-3 tracking-widest uppercase"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Hello, World 👋
          </motion.p>

          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-medium tracking-[-0.04em] text-balance leading-tight mb-2">
            <span className="text-primary glow-text-primary">Haonan-Li</span>
          </h1>

          <div className="flex flex-col gap-2.5 mb-6">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.03, x: 4 }}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg bg-muted text-muted-foreground border border-border transition-all duration-150 hover:border-primary hover:text-foreground cursor-default group w-fit"
              >
                <tag.icon className={`w-4 h-4 ${tag.color} transition-all duration-150`} />
                {tag.text}
              </motion.span>
            ))}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-[50ch] text-pretty mb-8">
            探索 AI 与创意的边界，用技术记录生活的美好。
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <motion.a
              href="#about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium transition-all duration-150 hover:border-primary hover:text-primary hover:bg-primary/5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              关于我
            </motion.a>
            <Link
              to="/friend"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium transition-all duration-150 hover:border-primary hover:text-primary hover:bg-primary/5"
            >
              联系我
            </Link>
            
            {/* Game Toggle Button */}
            <motion.button
              onClick={() => setIsGameActive(!isGameActive)}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg border font-medium transition-all duration-150 ${
                isGameActive
                  ? "border-orange-500 text-orange-400 bg-orange-500/10"
                  : "border-border text-foreground hover:border-orange-500/50 hover:text-orange-400"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGameActive ? "🚀 游戏中..." : "点我试试"}
            </motion.button>
          </div>
        </motion.div>

        {/* Right - Avatar */}
        <motion.div
          className="flex flex-col items-center lg:items-center gap-8"
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
            {hobbies.map(({ Icon, link, label, color }, i) => (
              <Link to={link} key={i}>
                <motion.div
                  className={`flex flex-col items-center gap-1.5 group cursor-pointer`}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="glass-card flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors duration-300">
                    <Icon className={`w-5 h-5 text-muted-foreground ${color} transition-all duration-150`} />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
                    {label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground/30"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted-foreground/30" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
