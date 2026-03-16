import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Film as FilmIcon, Star, Clock, Award, ChevronDown, ChevronUp } from "lucide-react";
import interstellarImg from "@/assets/films/interstellar.jpg";
import shawshankImg from "@/assets/films/shawshank.jpg";
import spiritedAwayImg from "@/assets/films/spirited-away.jpg";
import inceptionImg from "@/assets/films/inception.jpg";
import forrestGumpImg from "@/assets/films/forrest-gump.jpg";
import theMatrixImg from "@/assets/films/the-matrix.jpg";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState } from "react";

const movies = [
  {
    title: "星际穿越",
    titleEn: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    rating: 9.3,
    genre: ["科幻", "剧情"],
    duration: "169 min",
    desc: "当地球濒临毁灭，一群宇航员穿越虫洞寻找人类新家园。诺兰用硬科学与父女情感编织出震撼人心的史诗。",
    quote: "\"We used to look up at the sky and wonder at our place in the stars.\"",
    color: "from-blue-900/40 to-indigo-900/40",
    accent: "text-blue-400",
    border: "border-blue-500/30",
    emoji: "🌌",
    poster: interstellarImg,
  },
  {
    title: "肖申克的救赎",
    titleEn: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    rating: 9.7,
    genre: ["剧情", "犯罪"],
    duration: "142 min",
    desc: "关于希望、自由与救赎的不朽之作。安迪在绝望中坚守内心的光，用二十年诠释了什么叫永不放弃。",
    quote: "\"Hope is a good thing, maybe the best of things.\"",
    color: "from-amber-900/40 to-orange-900/40",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    emoji: "🔒",
    poster: shawshankImg,
  },
  {
    title: "千与千寻",
    titleEn: "Spirited Away",
    year: 2001,
    director: "宫崎骏",
    rating: 9.4,
    genre: ["动画", "奇幻"],
    duration: "125 min",
    desc: "一个少女在神灵世界中的成长之旅。宫崎骏用细腻的笔触描绘了人性的善与恶，以及勇气与爱的力量。",
    quote: "\"我不知道去哪里，但我已在路上。\"",
    color: "from-emerald-900/40 to-teal-900/40",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    emoji: "🐉",
    poster: spiritedAwayImg,
  },
  {
    title: "盗梦空间",
    titleEn: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    rating: 9.3,
    genre: ["科幻", "动作"],
    duration: "148 min",
    desc: "在梦境中植入思想的惊天大盗，层层嵌套的梦境让人迷失其中。诺兰对意识与现实边界的极致探索。",
    quote: "\"You mustn't be afraid to dream a little bigger, darling.\"",
    color: "from-violet-900/40 to-purple-900/40",
    accent: "text-violet-400",
    border: "border-violet-500/30",
    emoji: "🌀",
    poster: inceptionImg,
  },
  {
    title: "阿甘正传",
    titleEn: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    rating: 9.5,
    genre: ["剧情", "爱情"],
    duration: "142 min",
    desc: "一个智力有限的男孩用一生诠释了什么叫做真诚与坚持。每一次奔跑都是对命运的回应。",
    quote: "\"Life is like a box of chocolates.\"",
    color: "from-rose-900/40 to-pink-900/40",
    accent: "text-rose-400",
    border: "border-rose-500/30",
    emoji: "🏃",
    poster: forrestGumpImg,
  },
  {
    title: "黑客帝国",
    titleEn: "The Matrix",
    year: 1999,
    director: "Wachowski Sisters",
    rating: 9.0,
    genre: ["科幻", "动作"],
    duration: "136 min",
    desc: "你所感知的一切都是虚假的。红色药丸还是蓝色药丸？一部重新定义科幻电影的里程碑之作。",
    quote: "\"There is no spoon.\"",
    color: "from-green-900/40 to-emerald-900/40",
    accent: "text-green-400",
    border: "border-green-500/30",
    emoji: "💊",
    poster: theMatrixImg,
  },
];

const categories = ["全部", "科幻", "剧情", "动画", "动作", "爱情", "犯罪", "奇幻"];

const Film = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeCategory === "全部"
    ? movies
    : movies.filter(m => m.genre.includes(activeCategory));

  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleBackground />
      {/* Yellow/amber tinted ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      <Navbar />

      <main className="relative z-10 container mx-auto px-8 pt-32 pb-24 max-w-5xl">
        <a
          href="/#about"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 py-2 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </a>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end gap-4 mb-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent">
              光影世界
            </h1>
            <FilmIcon className="w-10 h-10 text-yellow-400/60 mb-2" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            在银幕的光与影之间，体验百态人生，感受那些震撼灵魂的故事与思考。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <FilmIcon className="w-4 h-4 text-yellow-400" />
              <span>观影 200+ 部</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Award className="w-4 h-4 text-amber-400" />
              <span>偏爱科幻 / 剧情</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Star className="w-4 h-4 text-orange-400" />
              <span>平均评分 9.2</span>
            </div>
          </div>
        </motion.header>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-muted-foreground/50 self-center">
            {filtered.length} 部
          </span>
        </motion.div>

        {/* Movie Cards */}
        <div className="flex flex-col gap-4">
          {filtered.map((movie, i) => (
            <motion.div
              key={movie.title}
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative rounded-2xl border ${movie.border} bg-white/5 overflow-hidden transition-all duration-300 hover:bg-white/8`}
            >
              {/* 电影海报背景图（半透明）*/}
              <img
                src={movie.poster}
                alt={movie.titleEn}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40 pointer-events-none select-none"
              />
              {/* 渐变遮罩，确保内容可读 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${movie.color} opacity-60 pointer-events-none`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  {/* Emoji poster */}
                  <div className="w-16 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl flex-shrink-0">
                    {movie.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                        <p className={`text-xs font-mono ${movie.accent} mt-0.5`}>{movie.titleEn} · {movie.year}</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="font-mono text-sm text-yellow-300 font-bold">{movie.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      {movie.genre.map(g => (
                        <span key={g} className={`text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 ${movie.accent}`}>
                          {g}
                        </span>
                      ))}
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {movie.duration}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                        导演：{movie.director}
                      </span>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {expandedId === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {movie.desc}
                          </p>
                          <blockquote className={`text-sm italic ${movie.accent} border-l-2 border-current pl-4 py-1`}>
                            {movie.quote}
                          </blockquote>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setExpandedId(expandedId === i ? null : i)}
                      className={`mt-3 flex items-center gap-1 text-xs font-mono ${movie.accent} hover:opacity-80 transition-opacity`}
                    >
                      {expandedId === i ? (
                        <><ChevronUp className="w-3.5 h-3.5" /> 收起</>
                      ) : (
                        <><ChevronDown className="w-3.5 h-3.5" /> 查看简评</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-muted-foreground/40 italic">
            "Cinema is a mirror by which we often see ourselves."
          </p>
          <p className="font-mono text-xs text-muted-foreground/20 mt-1">— Martin Scorsese</p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Film;
