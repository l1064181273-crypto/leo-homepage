import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Music2, Headphones, Radio, Disc3, Heart, Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState, useEffect, useRef } from "react";

import jayChouImg    from "@/assets/artists/jay-chou.jpg";
import wangLeehomImg from "@/assets/artists/wang-leehom.jpg";
import linkinParkImg from "@/assets/artists/linkin-park.jpg";
import charliePuthImg from "@/assets/artists/charlie-puth.jpg";
import easonChanImg  from "@/assets/artists/eason-chan.jpg";
import taylorSwiftImg from "@/assets/artists/taylor-swift.png";

// 喜欢的歌手/乐队
const artists = [
  {
    name: "周杰伦",
    genre: "华语流行 / R&B",
    color: "from-blue-500/60 to-indigo-700/60",
    border: "hover:border-blue-400/60",
    desc: "无可取代的华语天王，每首歌都是时代的印记。",
    album: "范特西",
    img: jayChouImg,
  },
  {
    name: "陈奕迅",
    genre: "粤语 / 华语流行",
    color: "from-amber-500/60 to-orange-700/60",
    border: "hover:border-amber-400/60",
    desc: "情感细腻，声线独特，歌词触动灵魂深处。",
    album: "rice & shine",
    img: easonChanImg,
  },
  {
    name: "Taylor Swift",
    genre: "Pop / Country",
    color: "from-purple-500/60 to-pink-700/60",
    border: "hover:border-purple-400/60",
    desc: "叙事性强，每张专辑都是一次蜕变与成长。",
    album: "1989",
    img: taylorSwiftImg,
  },
  {
    name: "Linkin Park",
    genre: "Nu-Metal / Rock",
    color: "from-red-600/60 to-gray-800/60",
    border: "hover:border-red-400/60",
    desc: "愤怒与柔情并存，陪伴了整整一代人的青春。",
    album: "Hybrid Theory",
    img: linkinParkImg,
  },
  {
    name: "王力宏",
    genre: "华语流行 / R&B",
    color: "from-teal-500/60 to-cyan-800/60",
    border: "hover:border-teal-400/60",
    desc: "融合中西音乐元素，才华横溢的创作型歌手。",
    album: "Unbelievable",
    img: wangLeehomImg,
  },
  {
    name: "Charlie Puth",
    genre: "Pop / R&B",
    color: "from-yellow-500/60 to-green-700/60",
    border: "hover:border-yellow-400/60",
    desc: "天才编曲人，每首歌都藏着精妙的和声细节。",
    album: "Nine Track Mind",
    img: charliePuthImg,
  },
];

// 喜欢的歌单/专辑
const playlists = [
  {
    title: "深夜码字专用",
    desc: "Lo-fi beats 与轻音乐的混搭，让思维在旋律中流动。",
    tags: ["Lo-fi", "轻音乐", "专注"],
    emoji: "🌙",
    count: "32 首",
    color: "border-indigo-500/30 bg-indigo-500/5",
  },
  {
    title: "骑行 & 运动",
    desc: "节奏感强的电子音乐与摇滚，让肾上腺素飙升。",
    tags: ["EDM", "Rock", "运动"],
    emoji: "🚴",
    count: "28 首",
    color: "border-orange-500/30 bg-orange-500/5",
  },
  {
    title: "治愈系清单",
    desc: "钢琴曲、吉他弹唱与民谣，适合发呆和放空。",
    tags: ["钢琴", "民谣", "治愈"],
    emoji: "🌿",
    count: "45 首",
    color: "border-green-500/30 bg-green-500/5",
  },
  {
    title: "华语经典回忆",
    desc: "90s-00s 华语金曲，每一首都是青春的时光机。",
    tags: ["华语", "经典", "怀旧"],
    emoji: "📼",
    count: "60 首",
    color: "border-amber-500/30 bg-amber-500/5",
  },
];

// 近期在听 — neteaseId 为网易云歌曲 ID
const recentTracks = [
  { title: "半岛铁盒",      artist: "周杰伦",       album: "八度空间",              duration: "5:17", liked: true,  neteaseId: "186016" },
  { title: "告白气球",      artist: "周杰伦",       album: "周杰伦的床边故事",       duration: "3:35", liked: true,  neteaseId: "418603077" },
  { title: "富士山下",      artist: "陈奕迅",       album: "What's Going On...?",   duration: "4:06", liked: false, neteaseId: "65766" },
  { title: "Lover",         artist: "Taylor Swift", album: "Lover",                 duration: "3:41", liked: true,  neteaseId: "1382778514" },
  { title: "In the End",    artist: "Linkin Park",  album: "Hybrid Theory",         duration: "3:36", liked: true,  neteaseId: "1313303916" },
  { title: "See You Again", artist: "Charlie Puth", album: "Nine Track Mind",       duration: "3:50", liked: false, neteaseId: "401722227" },
  { title: "你不知道的事",  artist: "王力宏",       album: "心中的日月",             duration: "4:48", liked: true,  neteaseId: "4875306" },
];

const Music = () => {
  const [likedTracks, setLikedTracks] = useState<Set<number>>(
    new Set(recentTracks.map((t, i) => t.liked ? i : -1).filter(i => i >= 0))
  );
  const [activeTab, setActiveTab] = useState<"artists" | "playlists" | "tracks">("artists");
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 进入页面自动播放，离开页面停止
  useEffect(() => {
    const audio = new Audio("/audio/lofi-ambient.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // 尝试自动播放（部分浏览器需要用户交互才能播放）
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // 自动播放被阻止，等待用户点击页面后播放
          const handleFirstInteraction = () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
            document.removeEventListener("click", handleFirstInteraction);
          };
          document.addEventListener("click", handleFirstInteraction);
        });
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLike = (i: number) => {
    setLikedTracks(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };



  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      <Navbar />

      <main className="relative z-10 container mx-auto px-8 pt-32 pb-24 max-w-5xl">
        {/* 音乐控制浮动按钮 */}
        <motion.button
          onClick={toggleMute}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-lg ${
            isMuted
              ? "bg-white/5 border-white/20 text-white/40"
              : "bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-cyan-500/20"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isMuted ? "取消静音" : "静音"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          {isPlaying && !isMuted && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          )}
        </motion.button>

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
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              音乐宇宙
            </h1>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Disc3 className="w-10 h-10 text-cyan-400/60 mb-2" />
            </motion.div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            音乐是灵魂的语言，在旋律中寻找共鸣，用音符治愈每一个疲惫的瞬间。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span>日均收听 3h+</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Radio className="w-4 h-4 text-blue-400" />
              <span>6 位常听歌手</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Music2 className="w-4 h-4 text-indigo-400" />
              <span>165+ 收藏歌曲</span>
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-2 mb-10 border-b border-white/10 pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { key: "artists", label: "喜欢的歌手", icon: Music2 },
            { key: "playlists", label: "我的歌单", icon: Headphones },
            { key: "tracks", label: "近期在听", icon: Radio },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-mono transition-all duration-200 border-b-2 -mb-px ${
                activeTab === key
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Artists Tab */}
        {activeTab === "artists" && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {artists.map((artist, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl overflow-hidden border border-white/10 ${artist.border} transition-all duration-300 group cursor-default`}
                style={{ aspectRatio: "3/4" }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className={`absolute inset-0 bg-gradient-to-br ${artist.color} opacity-0 group-hover:opacity-40 transition-opacity duration-400`} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 mb-3">
                    {artist.album}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{artist.name}</h3>
                  <span className="text-xs font-mono text-cyan-300/80 mb-2 block">{artist.genre}</span>
                  <p className="text-sm text-white/70 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300 ease-out">
                    {artist.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Playlists Tab */}
        {activeTab === "playlists" && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {playlists.map((pl, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl border ${pl.color} transition-all duration-300 hover:scale-[1.02] group`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{pl.emoji}</span>
                  <span className="font-mono text-xs text-muted-foreground/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {pl.count}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pl.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pl.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {pl.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tracks Tab */}
        {activeTab === "tracks" && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {recentTracks.map((track, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                {/* 曲目行 */}
                <div
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/8 transition-all duration-200 group cursor-default"
                >
                  <span className="w-6 text-center font-mono text-sm text-muted-foreground/40 group-hover:text-cyan-400 transition-colors">
                    {i + 1}
                  </span>

                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-cyan-500/10 border border-cyan-500/20">
                    <Music2 className="w-4 h-4 text-cyan-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist} · {track.album}</p>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground/50 hidden sm:block">{track.duration}</span>

                  {/* 展开指示箭头 */}
                  {/* 点赞按钮 */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(i); }}
                    className={`p-1.5 rounded-full transition-all duration-200 ${likedTracks.has(i) ? "text-red-400" : "text-muted-foreground/30 hover:text-red-400"}`}
                  >
                    <Heart className={`w-4 h-4 ${likedTracks.has(i) ? "fill-red-400" : ""}`} />
                  </button>
                </div>


              </motion.div>
            ))}

            <p className="text-center font-mono text-xs text-muted-foreground/30 mt-6">
              数据来源：网易云音乐 · 更新于 2026.03
            </p>
          </motion.div>
        )}

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-muted-foreground/40 italic">
            "Music gives a soul to the universe, wings to the mind, flight to the imagination."
          </p>
          <p className="font-mono text-xs text-muted-foreground/20 mt-1">— Plato</p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Music;
