import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, Database, Banana, PenTool } from "lucide-react";
import React, { useRef } from "react";

// Cartoon Lobster icon for 007 AI助手
const LobsterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="14" rx="4" ry="5" />
    <path d="M10 19c-1 1-2 2-2 3" />
    <path d="M14 19c1 1 2 2 2 3" />
    <path d="M12 19v3" />
    <path d="M8 10c-2-2-4-1-5 1-1 2 0 4 2 4" />
    <path d="M16 10c2-2 4-1 5 1 1 2 0 4-2 4" />
    <circle cx="10.5" cy="8" r="1" fill="currentColor" />
    <circle cx="13.5" cy="8" r="1" fill="currentColor" />
    <path d="M10 6c-1-2-2-3-3-3" />
    <path d="M14 6c1-2 2-3 3-3" />
    <path d="M8 14c-2 0-3 1-3 2" />
    <path d="M16 14c2 0 3 1 3 2" />
    <path d="M8 16c-2 0-3 1-3 2" />
    <path d="M16 16c2 0 3 1 3 2" />
  </svg>
);

const skills = [
  { name: "Lovable", icon: Code, desc: "AI 驱动的全栈开发平台", emoji: "💜", url: "https://lovable.dev" },
  { name: "Trae", icon: Palette, desc: "AI 辅助设计与开发", emoji: "🎨", url: "https://www.trae.ai" },
  { name: "Supabase", icon: Database, desc: "开源后端即服务", emoji: "⚡", url: "https://supabase.com" },
  { name: "Nano Banana", icon: Banana, desc: "AI 图像生成工具", emoji: "🍌", url: "https://nanobananaimg.com/zh-hant" },
  { name: "Pencil", icon: PenTool, desc: "创意设计工具", emoji: "✏️", url: "https://www.pencil.dev/" },
  { name: "007 AI助手", icon: LobsterIcon, desc: "我的专属AI搭档", emoji: "🦞", isCustom: true, url: "https://openclaw.ai/" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// 3D Card Component
const TiltCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl shadow-lg"
      >
      </div>
      {children}
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <motion.section
      id="skills"
      className="relative py-24 px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="section-title mb-16 flex items-center justify-center gap-4 h-[60px]" 
          variants={item}
        >
          <span className="font-serif text-3xl md:text-4xl font-bold tracking-wide bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] leading-none flex items-center pt-2">
            我的AI工具箱
          </span>
          <span className="text-4xl md:text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] leading-none flex items-center -translate-y-1">🧰</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (
            <motion.div variants={item} key={s.name} className="perspective-1000">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <TiltCard className="relative h-full w-full rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] p-6 border border-white/10 shadow-xl transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/20 group cursor-pointer overflow-hidden">
                  {/* Flowing Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine pointer-events-none transform -skew-x-12" />

                  <div className="relative z-10 flex items-start gap-4 transform transition-transform duration-200 group-hover:translate-z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-purple-500/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      <s.icon className="w-6 h-6 text-indigo-300 group-hover:text-purple-300 transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-purple-200 transition-colors">{s.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed group-hover:text-gray-300 transition-colors">{s.desc}</p>
                    </div>
                  </div>
                  
                  {/* Floating Emoji */}
                  <motion.span 
                    className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none filter drop-shadow-lg"
                    initial={{ y: 10, rotate: -10 }}
                    whileHover={{ y: 0, rotate: 10 }}
                  >
                    {s.emoji}
                  </motion.span>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground text-sm mt-12 font-mono"
          variants={item}
        >
          这些工具帮我打造了本站 ✨
        </motion.p>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
