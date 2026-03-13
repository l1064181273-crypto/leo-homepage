import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Trophy, Zap } from "lucide-react";
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
    desc: "踏上西游之路，挑战满天神佛，体验国产 3A 大作的震撼。",
    status: "Playing",
    hours: "45h",
    rating: "9.8",
    image: gameWukong
  },
  {
    id: 2,
    title: "Elden Ring",
    desc: "在交界地探索未知的秘密，挑战半神，成为艾尔登之王。",
    status: "Completed",
    hours: "120h",
    rating: "9.6",
    image: gameEldenring
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    desc: "夜之城的传奇故事，义体改造与赛博精神病的边缘徘徊。",
    status: "Completed",
    hours: "80h",
    rating: "9.0",
    image: gameCyberpunk
  },
  {
    id: 4,
    title: "Cross Fire",
    desc: "三亿鼠标的枪战梦想，经典地图与战术配合的永恒记忆。",
    status: "Online",
    hours: "1000h+",
    rating: "Legendary",
    image: gameCrossfire
  }
];

const Gaming = () => {
  const [activeGameId, setActiveGameId] = useState<number | null>(null);

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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${activeGame.image})` }}
            >
               <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 bg-clip-text text-transparent">
              游戏人生
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              在虚拟世界中体验第九艺术的魅力，寻找竞技与冒险的快乐。
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveGameId(game.id)}
              onMouseLeave={() => setActiveGameId(null)}
              className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-orange-200 transition-colors">
                      {game.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      game.status === 'Playing' ? 'bg-green-500/20 text-green-400' : 
                      game.status === 'Online' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {game.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {game.desc}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground/80">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      {game.hours}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      Score: {game.rating}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Gaming;
