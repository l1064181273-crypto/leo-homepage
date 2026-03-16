import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Trophy, Zap, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState } from "react";

import gameWukong from "@/assets/game-wukong.jpg";
import gameEldenring from "@/assets/game-eldenring.jpg";
import gameCyberpunk from "@/assets/game-cyberpunk.jpg";
import gameCrossfire from "@/assets/game-crossfire.jpg";

const games = [
  {
    id: 1,
    title: "黑神话：悟空",
    subtitle: "Black Myth: WuKong",
    desc: "踏上西游之路，挑战满天神佛，体验国产 3A 大作的震撼。",
    status: "Playing",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    hours: "45h",
    rating: "9.8",
    image: gameWukong,
    accentColor: "from-amber-500/20 to-orange-500/20",
    borderHover: "hover:border-amber-500/40",
    shadowHover: "hover:shadow-amber-500/10",
  },
  {
    id: 2,
    title: "Elden Ring",
    subtitle: "艾尔登法环",
    desc: "在交界地探索未知的秘密，挑战半神，成为艾尔登之王。",
    status: "Completed",
    statusColor: "bg-white/10 text-white/60 border-white/10",
    hours: "120h",
    rating: "9.6",
    image: gameEldenring,
    accentColor: "from-yellow-500/20 to-amber-500/20",
    borderHover: "hover:border-yellow-500/40",
    shadowHover: "hover:shadow-yellow-500/10",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    subtitle: "赛博朋克 2077",
    desc: "夜之城的传奇故事，义体改造与赛博精神病的边缘徘徊。",
    status: "Completed",
    statusColor: "bg-white/10 text-white/60 border-white/10",
    hours: "80h",
    rating: "9.0",
    image: gameCyberpunk,
    accentColor: "from-cyan-500/20 to-blue-500/20",
    borderHover: "hover:border-cyan-500/40",
    shadowHover: "hover:shadow-cyan-500/10",
  },
  {
    id: 4,
    title: "Cross Fire",
    subtitle: "穿越火线",
    desc: "三亿鼠标的枪战梦想，经典地图与战术配合的永恒记忆。",
    status: "Online",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    hours: "1000h+",
    rating: "Legendary",
    image: gameCrossfire,
    accentColor: "from-blue-500/20 to-indigo-500/20",
    borderHover: "hover:border-blue-500/40",
    shadowHover: "hover:shadow-blue-500/10",
  },
];

const Gaming = () => {
  const [activeGameId, setActiveGameId] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const activeGame = games.find(g => g.id === activeGameId);

  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
        
        {/* Dynamic Background Image */}
        <AnimatePresence mode="wait">
          {activeGame && (
            <motion.div
              key={activeGame.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${activeGame.image})` }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-8 pt-32 pb-24">
        <a 
          href="/#about"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 py-2 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </a>

        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 bg-clip-text text-transparent">
              游戏人生
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              在虚拟世界中体验第九艺术的魅力，寻找竞技与冒险的快乐。
            </p>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Gamepad2 className="w-4 h-4 text-orange-400" />
                <span>{games.length} 款游戏</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>累计 1245h+</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>2 款已通关</span>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveGameId(game.id)}
              onMouseLeave={() => setActiveGameId(null)}
              onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
              className={`relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 ${game.borderHover} transition-all duration-300 backdrop-blur-sm hover:bg-white/8 cursor-pointer hover:shadow-xl ${game.shadowHover}`}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Status Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono border ${game.statusColor}`}>
                  {game.status}
                </span>

                {/* Title overlay on image */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-orange-200 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs font-mono text-white/50 mt-0.5">{game.subtitle}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                  {game.desc}
                </p>
                
                <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground/80">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>{game.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        {/* Footer quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-muted-foreground/40 italic">
            "游戏是艺术，而艺术是生活的一部分。"
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Gaming;
