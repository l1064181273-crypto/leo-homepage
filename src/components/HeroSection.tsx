import { motion } from "framer-motion";
import { Gamepad2, Sparkles, GraduationCap, Leaf, Music2, BookOpen } from "lucide-react";
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

const nowStatus = [
  {
    emoji: "🎵",
    label: "正在听",
    value: "周杰伦 - 半岛铁盒",
    color: "text-cyan-300",
    bar: "bg-cyan-500",
    glow: "shadow-[0_0_8px_rgba(34,211,238,0.3)]",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    // 音乐进度条动画
    animated: true,
  },
  {
    emoji: "🎮",
    label: "正在玩",
    value: "黑神话：悟空",
    color: "text-orange-300",
    bar: "bg-orange-500",
    glow: "shadow-[0_0_8px_rgba(249,115,22,0.3)]",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    animated: false,
  },
  {
    emoji: "📖",
    label: "正在读",
    value: "浪潮之巅",
    color: "text-emerald-300",
    bar: "bg-emerald-500",
    glow: "shadow-[0_0_8px_rgba(52,211,153,0.3)]",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    animated: false,
  },
];

// 音乐波形动画的 bar 高度序列
const waveHeights = [3, 6, 10, 7, 4, 8, 12, 5, 9, 6, 3, 7];

const HeroSection = () => {
  const [isGameActive, setIsGameActive] = useState(false);

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

        {/* Right - Avatar + Status */}
        <motion.div
          className="flex flex-col items-center lg:items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Tilt options={defaultOptions} className="relative group cursor-pointer">
            {/* === 方案A：旋转光环 + 粒子轨道 === */}

            {/* 最外层：缓慢旋转的虚线光环 */}
            <div
              className="absolute rounded-full pointer-events-none animate-spin-cw"
              style={{
                inset: "-28px",
                border: "1.5px dashed rgba(168,85,247,0.35)",
              }}
            >
              {/* 轨道上的粒子亮点 */}
              {[0, 90, 180, 270].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0
                      ? "rgba(168,85,247,0.9)"
                      : "rgba(34,211,238,0.9)",
                    boxShadow: i % 2 === 0
                      ? "0 0 8px 3px rgba(168,85,247,0.6)"
                      : "0 0 8px 3px rgba(34,211,238,0.6)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(calc(50% + 26px)) translateY(-50%)`,
                  }}
                />
              ))}
            </div>

            {/* 第二层：反向旋转的细线光环（更快） */}
            <div
              className="absolute rounded-full pointer-events-none animate-spin-ccw"
              style={{
                inset: "-14px",
                border: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(#0a0a0f, #0a0a0f), linear-gradient(135deg, rgba(168,85,247,0.8), rgba(34,211,238,0.8), rgba(168,85,247,0.8))",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />

            {/* 渐变动态描边（紫→青→紫循环） */}
            <div
              className="absolute -inset-1 rounded-full pointer-events-none animate-spin-cw [animation-duration:4s]"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(168,85,247,0.9), rgba(34,211,238,0.9), rgba(99,102,241,0.9), rgba(168,85,247,0.9))",
                filter: "blur(6px)",
                opacity: 0.75,
              }}
            />

            {/* 头像本体 */}
            <img
              src={avatarImg}
              alt="AI 生成头像"
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-2 border-white/10"
              style={{
                boxShadow: "0 0 0 3px rgba(10,10,15,1), 0 0 40px rgba(168,85,247,0.5)",
              }}
            />
          </Tilt>

          {/* Now Status Card */}
          <motion.div
            className="w-full max-w-xs flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Header label */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Now</span>
            </div>

            {nowStatus.map((item, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${item.border} ${item.bg} ${item.glow} backdrop-blur-sm transition-all duration-300 hover:brightness-110`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.35 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Emoji */}
                <span className="text-xl flex-shrink-0">{item.emoji}</span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className={`text-sm font-medium ${item.color} truncate`}>
                    {item.value}
                  </p>
                </div>

                {/* Music wave animation for the first item */}
                {item.animated && (
                  <div className="flex items-end gap-[2px] h-4 flex-shrink-0">
                    {waveHeights.map((h, j) => (
                      <motion.div
                        key={j}
                        className={`w-[2px] rounded-full ${item.bar}`}
                        animate={{ height: [h, h * 0.4, h, h * 0.7, h] }}
                        transition={{
                          duration: 0.8 + j * 0.05,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: j * 0.06,
                        }}
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                )}

                {/* Static dot indicator for non-music items */}
                {!item.animated && (
                  <div className={`w-1.5 h-1.5 rounded-full ${item.bar} flex-shrink-0 opacity-60`} />
                )}
              </motion.div>
            ))}
          </motion.div>

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
