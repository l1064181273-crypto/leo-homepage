import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Utensils, MapPin, Star, ChefHat, Flame, Lock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState } from "react";

// 图片导入
import sichuanHotpotImg from "@/assets/food/sichuan-hotpot.jpg";
import cantoneseDimsumImg from "@/assets/food/cantonese-dimsum.jpg";
import japaneseSushiImg from "@/assets/food/japanese-sushi.jpg";
import bbqGrilledMeatImg from "@/assets/food/bbq-grilled-meat.jpg";
import italianPastaImg from "@/assets/food/italian-pasta.jpg";
import yunnanMushroomImg from "@/assets/food/yunnan-mushroom.webp";
import beijingDuckImg from "@/assets/food/beijing-duck.jpg";
import chengduSkewersImg from "@/assets/food/chengdu-skewers.jpg";
import sanyaSeafoodImg from "@/assets/food/sanya-seafood.jpg";
import tokyoSushiImg from "@/assets/food/tokyo-sushi-omakase.jpg";

// 喜欢的菜系
const cuisines = [
  {
    name: "川菜",
    emoji: "🌶️",
    desc: "麻辣鲜香，百菜百味。一碗红油抄手就能治愈所有疲惫。",
    level: 5,
    color: "text-red-300",
    border: "border-red-500/40",
    glow: "shadow-red-500/20",
    img: sichuanHotpotImg,
  },
  {
    name: "粤菜",
    emoji: "🦐",
    desc: "清淡鲜美，原汁原味。早茶文化是生活最美好的仪式感。",
    level: 4,
    color: "text-amber-300",
    border: "border-amber-500/40",
    glow: "shadow-amber-500/20",
    img: cantoneseDimsumImg,
  },
  {
    name: "日料",
    emoji: "🍣",
    desc: "极致的食材与刀工，每一口都是对食材的尊重。",
    level: 5,
    color: "text-pink-300",
    border: "border-pink-500/40",
    glow: "shadow-pink-500/20",
    img: japaneseSushiImg,
  },
  {
    name: "烧烤",
    emoji: "🔥",
    desc: "炭火烤肉的香气是夏夜最美好的记忆，配上冰啤酒绝了。",
    level: 5,
    color: "text-orange-300",
    border: "border-orange-500/40",
    glow: "shadow-orange-500/20",
    img: bbqGrilledMeatImg,
  },
  {
    name: "意大利菜",
    emoji: "🍝",
    desc: "奶油意面与披萨，简单的食材碰撞出无限可能。",
    level: 3,
    color: "text-green-300",
    border: "border-green-500/40",
    glow: "shadow-green-500/20",
    img: italianPastaImg,
  },
  {
    name: "云南菜",
    emoji: "🍄",
    desc: "菌子的鲜香无可替代，过桥米线是家乡的味道。",
    level: 5,
    color: "text-purple-300",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    img: yunnanMushroomImg,
  },
];

// 打卡记录
const mustEats = [
  {
    name: "重庆老火锅",
    location: "重庆 · 解放碑",
    desc: "九宫格牛油锅底，毛肚脑花缺一不可，辣到飞起才叫正宗。",
    tags: ["火锅", "麻辣", "必打卡"],
    rating: 5,
    emoji: "🫕",
    year: "2023",
    img: sichuanHotpotImg,
  },
  {
    name: "广州早茶",
    location: "广州 · 陶陶居",
    desc: "虾饺皇、叉烧包、肠粉，一盅两件，悠然自得的广州生活节奏。",
    tags: ["粤菜", "早茶", "传统"],
    rating: 5,
    emoji: "🫖",
    year: "2022",
    img: cantoneseDimsumImg,
  },
  {
    name: "北京烤鸭",
    location: "北京 · 全聚德",
    desc: "片皮鸭配甜面酱与葱丝，薄薄的鸭皮入口即化，酥脆无比。",
    tags: ["京菜", "烤鸭", "经典"],
    rating: 4,
    emoji: "🦆",
    year: "2022",
    img: beijingDuckImg,
  },
  {
    name: "云南野生菌火锅",
    location: "昆明 · 菌子一条街",
    desc: "见手青、鸡枞菌、松茸，每一种菌子都是大自然的馈赠。",
    tags: ["云南", "菌子", "鲜美"],
    rating: 5,
    emoji: "🍄",
    year: "2021",
    img: yunnanMushroomImg,
  },
  {
    name: "成都串串香",
    location: "成都 · 宽窄巷子",
    desc: "自选食材，麻辣红汤，边涮边聊，成都慢生活的精髓。",
    tags: ["串串", "麻辣", "成都"],
    rating: 5,
    emoji: "🍢",
    year: "2021",
    img: chengduSkewersImg,
  },
  {
    name: "三亚海鲜",
    location: "三亚 · 第一市场",
    desc: "现买现做的海鲜，清蒸、白灼，鲜甜无比，配着海风格外美味。",
    tags: ["海鲜", "三亚", "新鲜"],
    rating: 4,
    emoji: "🦞",
    year: "2020",
    img: sanyaSeafoodImg,
  },
];

// 心愿清单
const wishList = [
  {
    name: "东京寿司之神",
    location: "日本 · 东京",
    emoji: "🍱",
    desc: "数寄屋桥次郎，等待多年的米其林三星梦想。",
    img: tokyoSushiImg,
    difficulty: "极难预约",
  },
  {
    name: "西班牙 Tapas",
    location: "西班牙 · 巴塞罗那",
    emoji: "🥘",
    desc: "伊比利亚火腿、海鲜饭，地中海风情的美食盛宴。",
    img: italianPastaImg,
    difficulty: "待出发",
  },
  {
    name: "泰国街头美食",
    location: "泰国 · 曼谷",
    emoji: "🍜",
    desc: "冬阴功汤、芒果糯米饭，热带风情的味觉冒险。",
    img: chengduSkewersImg,
    difficulty: "计划中",
  },
  {
    name: "法式米其林",
    location: "法国 · 巴黎",
    emoji: "🥐",
    desc: "精致的法式料理，每一道菜都是艺术品。",
    img: cantoneseDimsumImg,
    difficulty: "梦想清单",
  },
];

const tabs = ["菜系偏好", "打卡记录", "心愿清单"] as const;

const LevelLabel = ({ level, color }: { level: number; color: string }) => {
  const label = level === 5 ? "真爱" : level === 4 ? "喜欢" : "还行";
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <div
            key={j}
            className={`w-1.5 h-1.5 rounded-full transition-all ${j < level ? color.replace("text-", "bg-") : "bg-white/10"}`}
          />
        ))}
      </div>
      <span className={`text-xs font-mono ${color}`}>{label}</span>
    </div>
  );
};

const Food = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("菜系偏好");

  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleBackground />
      {/* Warm ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-amber-950/10 pointer-events-none" />
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-200 via-amber-100 to-orange-200 bg-clip-text text-transparent">
              舌尖记忆
            </h1>
            <span className="text-4xl mb-2">🍜</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            用味蕾丈量世界，每一口美食都是一段旅程，每一种味道都是一段记忆。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>打卡城市 15+</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>偏爱川菜 / 日料</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Flame className="w-4 h-4 text-red-400" />
              <span>无辣不欢</span>
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-2 mb-10 border-b border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-mono transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-orange-400 text-orange-300"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── 菜系偏好：横向大卡片，图片背景 ── */}
          {activeTab === "菜系偏好" && (
            <motion.div
              key="cuisines"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {cuisines.map((c, i) => (
                <motion.div
                  key={i}
                  className={`relative rounded-2xl border ${c.border} overflow-hidden cursor-default group shadow-lg ${c.glow} hover:shadow-xl transition-all duration-400`}
                  style={{ height: "220px" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 食物图片 */}
                  <img
                    src={c.img}
                    alt={c.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* 渐变遮罩：底部深色，确保文字可读 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  {/* 内容 */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    {/* 顶部：Emoji */}
                    <span className="text-3xl drop-shadow-lg">{c.emoji}</span>

                    {/* 底部：名称 + 描述 + 评级 */}
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${c.color} drop-shadow`}>{c.name}</h3>
                      <p className="text-xs text-white/70 leading-relaxed mb-3 line-clamp-2">{c.desc}</p>
                      <LevelLabel level={c.level} color={c.color} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── 打卡记录：时间线风格 ── */}
          {activeTab === "打卡记录" && (
            <motion.div
              key="checkins"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* 时间线竖线 */}
              <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-amber-500/30 to-transparent" />

              <div className="flex flex-col gap-0">
                {mustEats.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative flex gap-6 pb-8 group"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* 时间线节点 */}
                    <div className="relative z-10 flex-shrink-0 w-14 flex flex-col items-center gap-1 pt-1">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/60 flex items-center justify-center text-base shadow-lg shadow-orange-500/20 group-hover:border-orange-400 group-hover:bg-orange-500/30 transition-all">
                        <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/50">{item.year}</span>
                    </div>

                    {/* 卡片 */}
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/10">
                      <div className="relative flex gap-0">
                        {/* 左侧食物图片 */}
                        <div className="w-28 flex-shrink-0 relative overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            style={{ minHeight: "120px" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                        </div>

                        {/* 右侧内容 */}
                        <div className="flex-1 p-4 bg-white/5 group-hover:bg-white/8 transition-colors">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{item.emoji}</span>
                              <h3 className="text-base font-bold text-white">{item.name}</h3>
                            </div>
                            <div className="flex gap-0.5 flex-shrink-0">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                  key={j}
                                  className={`w-3 h-3 ${j < item.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-mono text-orange-400/70 mb-2">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{item.desc}</p>

                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300/70">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── 心愿清单：待解锁卡片 ── */}
          {activeTab === "心愿清单" && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-mono text-muted-foreground/50 mb-6">
                🗺️ 还没去过，但一定要去的美食目的地
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {wishList.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative rounded-2xl overflow-hidden border border-dashed border-white/15 hover:border-orange-500/40 transition-all duration-300 group cursor-default"
                    style={{ height: "200px" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* 背景图片（更模糊、更暗） */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-25 blur-[2px] transition-all duration-500 group-hover:opacity-35 group-hover:blur-[1px]"
                    />
                    {/* 遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

                    {/* 锁图标 */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all">
                      <Lock className="w-4 h-4 text-white/40 group-hover:text-orange-400/70 transition-colors" />
                    </div>

                    {/* 难度标签 */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 border border-dashed border-white/20 text-white/50 group-hover:border-orange-500/30 group-hover:text-orange-300/60 transition-all">
                        {item.difficulty}
                      </span>
                    </div>

                    {/* 内容 */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.emoji}</span>
                        <h3 className="text-lg font-bold text-white/80 group-hover:text-orange-100 transition-colors">{item.name}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-orange-400/50 mb-2 group-hover:text-orange-400/70 transition-colors">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors line-clamp-2">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-orange-300/70 font-mono text-sm">
                  🌍 目标：用 10 年时间，吃遍世界各地的美食
                </p>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-muted-foreground/40 italic">
            "One cannot think well, love well, sleep well, if one has not dined well."
          </p>
          <p className="font-mono text-xs text-muted-foreground/20 mt-1">— Virginia Woolf</p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Food;
