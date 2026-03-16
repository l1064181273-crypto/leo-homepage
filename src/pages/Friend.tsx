import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Send, ArrowLeft, Sparkles, 
  Code, Palette, Music, Plane, Book, Camera, Gamepad2, Coffee, Dog, Film,
  Briefcase, MessageCircle, Share2, Heart, Check, Scan
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import wechatQr from "@/assets/wechat-qr.jpg";

const interestsList = [
  { id: "tech", label: "科技 & 编程", icon: Code, colorClass: "text-cyan-400", bgClass: "bg-cyan-500/20", borderClass: "border-cyan-500" },
  { id: "design", label: "设计 & 艺术", icon: Palette, colorClass: "text-pink-400", bgClass: "bg-pink-500/20", borderClass: "border-pink-500" },
  { id: "music", label: "音乐", icon: Music, colorClass: "text-violet-400", bgClass: "bg-violet-500/20", borderClass: "border-violet-500" },
  { id: "travel", label: "旅行探索", icon: Plane, colorClass: "text-emerald-400", bgClass: "bg-emerald-500/20", borderClass: "border-emerald-500" },
  { id: "reading", label: "阅读 & 写作", icon: Book, colorClass: "text-amber-400", bgClass: "bg-amber-500/20", borderClass: "border-amber-500" },
  { id: "photo", label: "摄影", icon: Camera, colorClass: "text-rose-400", bgClass: "bg-rose-500/20", borderClass: "border-rose-500" },
  { id: "game", label: "游戏", icon: Gamepad2, colorClass: "text-purple-400", bgClass: "bg-purple-500/20", borderClass: "border-purple-500" },
  { id: "coffee", label: "咖啡 & 美食", icon: Coffee, colorClass: "text-orange-400", bgClass: "bg-orange-500/20", borderClass: "border-orange-500" },
  { id: "pet", label: "小猫 & 小狗", icon: Dog, colorClass: "text-yellow-400", bgClass: "bg-yellow-500/20", borderClass: "border-yellow-500" },
  { id: "movie", label: "追剧", icon: Film, colorClass: "text-red-400", bgClass: "bg-red-500/20", borderClass: "border-red-500" },
];

const purposesList = [
  { 
    id: "collab", label: "项目合作", desc: "一起做点有趣的事", icon: Briefcase,
    activeClass: "bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    iconActiveClass: "bg-blue-500 text-white", textActiveClass: "text-blue-100",
    subTextActiveClass: "text-blue-200/70", checkColorClass: "text-blue-500"
  },
  { 
    id: "chat", label: "日常交流", desc: "聊聊生活与想法", icon: MessageCircle,
    activeClass: "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    iconActiveClass: "bg-green-500 text-white", textActiveClass: "text-green-100",
    subTextActiveClass: "text-green-200/70", checkColorClass: "text-green-500"
  },
  { 
    id: "share", label: "经验分享", desc: "互相学习成长", icon: Share2,
    activeClass: "bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
    iconActiveClass: "bg-indigo-500 text-white", textActiveClass: "text-indigo-100",
    subTextActiveClass: "text-indigo-200/70", checkColorClass: "text-indigo-500"
  },
  { 
    id: "friend", label: "纯粹交友", desc: "认识新朋友", icon: Heart,
    activeClass: "bg-rose-500/10 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
    iconActiveClass: "bg-rose-500 text-white", textActiveClass: "text-rose-100",
    subTextActiveClass: "text-rose-200/70", checkColorClass: "text-rose-500"
  },
];

const Friend = () => {
  const [formData, setFormData] = useState({ name: "", contact: "", intro: "" });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [qrHovered, setQrHovered] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const togglePurpose = (id: string) => {
    setSelectedPurposes(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, selectedInterests, selectedPurposes });
    setSubmitted(true);
  };

  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-4 md:px-8 pt-32 pb-16 max-w-4xl min-h-screen">
        <a 
          href="/#connect"
          className="absolute top-24 left-4 md:left-0 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">返回首页</span>
        </a>

        {/* ── Page Header ── */}
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-500/10 text-orange-500 mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-clip-text text-transparent bg-300% animate-gradient">
            交个朋友
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            填写下方信号发射器，或直接扫码添加微信
          </p>
        </div>

        {submitted ? (
          /* ── Success State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/20">
              <Send className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-heading font-bold mb-4 text-white">信号已发射！</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              感谢你的来信，我会尽快通过微信与你取得联系。
            </p>
            
            {/* QR in success state */}
            <div className="flex flex-col items-center gap-4 p-6 bg-black/20 rounded-2xl border border-white/5 mb-8">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Scan className="w-4 h-4" /> 也可以直接扫码添加
              </p>
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-green-400/30 via-emerald-500/20 to-green-400/30 blur-md" />
                <img src={wechatQr} alt="WeChat QR" className="relative w-36 h-36 rounded-xl border-2 border-white/20 shadow-xl" />
              </div>
              <p className="text-xs text-muted-foreground/60">微信号：Lntano.</p>
            </div>

            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回地球
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ── WeChat QR Card (always visible) ── */}
            <motion.div
              className="glass-card p-6 md:p-8 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left: QR code */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  {/* Scan line animation wrapper */}
                  <div
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setQrHovered(true)}
                    onMouseLeave={() => setQrHovered(false)}
                  >
                    {/* Glow halo */}
                    <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-green-400/20 blur-lg transition-opacity duration-500 ${qrHovered ? 'opacity-100' : 'opacity-50'}`} />

                    {/* QR image */}
                    <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${qrHovered ? 'border-green-400/60 shadow-[0_0_24px_rgba(74,222,128,0.35)]' : 'border-white/15'}`}>
                      <img
                        src={wechatQr}
                        alt="微信二维码"
                        className={`w-44 h-44 md:w-52 md:h-52 object-cover transition-transform duration-300 ${qrHovered ? 'scale-105' : 'scale-100'}`}
                      />
                      {/* Scan line overlay on hover */}
                      {qrHovered && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-[scanline_1.5s_linear_infinite]" />
                          <div className="absolute inset-0 bg-green-400/5" />
                        </div>
                      )}
                    </div>

                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400/70 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400/70 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400/70 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400/70 rounded-br-lg" />
                  </div>

                  {/* WeChat badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-300 text-xs font-medium">微信扫码添加</span>
                  </div>
                  <p className="text-white/30 text-xs">@Lntano.</p>
                </div>

                {/* Right: Description */}
                <div className="flex-1 flex flex-col gap-5 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">Hi，我是 Leo 👋</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      扫描左侧二维码即可直接添加我的微信，期待与你相识！也可以填写下方表单，让我更了解你。
                    </p>
                  </div>

                  {/* Quick info */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: '🎓', label: '智慧农业研究生' },
                      { emoji: '🤖', label: 'AI Trainer' },
                      { emoji: '📷', label: '摄影爱好者' },
                      { emoji: '🎮', label: '游戏玩家' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-base">{item.emoji}</span>
                        <span className="text-sm text-white/60">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/20 text-xs italic">
                    "探索 AI 与创意的边界，用技术记录生活的美好。"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs uppercase tracking-widest font-mono">或填写信号发射器</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Module 01: Identity */}
              <motion.div 
                className="glass-card p-6 md:p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-mono font-bold text-lg">01</div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-orange-100">身份识别</h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Identity Verification</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">怎么称呼你</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all"
                      placeholder="你的名字 / ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">联系方式</label>
                    <input
                      required
                      type="text"
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all"
                      placeholder="微信号 / 手机号 / 邮箱"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Module 02: Interests */}
              <motion.div 
                className="glass-card p-6 md:p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-mono font-bold text-lg">02</div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-purple-100">共同兴趣</h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Common Interests (Multi-select)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {interestsList.map((item) => {
                    const isSelected = selectedInterests.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleInterest(item.id)}
                        className={`cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                          isSelected 
                            ? `${item.bgClass} ${item.borderClass} ${item.colorClass}` 
                            : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`p-1.5 rounded-md ${isSelected ? item.bgClass : "bg-black/20"}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Module 03: Purpose */}
              <motion.div 
                className="glass-card p-6 md:p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-mono font-bold text-lg">03</div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-blue-100">连接目的</h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Connection Purpose (Multi-select)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purposesList.map((item) => {
                    const isSelected = selectedPurposes.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => togglePurpose(item.id)}
                        className={`cursor-pointer relative p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${
                          isSelected ? item.activeClass : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`p-3 rounded-lg transition-colors ${isSelected ? item.iconActiveClass : "bg-white/10 text-muted-foreground group-hover:text-white"}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold mb-1 ${isSelected ? item.textActiveClass : "text-foreground"}`}>{item.label}</h4>
                          <p className={`text-sm ${isSelected ? item.subTextActiveClass : "text-muted-foreground"}`}>{item.desc}</p>
                        </div>
                        {isSelected && (
                          <div className={`absolute top-4 right-4 ${item.checkColorClass}`}>
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Module 04: Message */}
              <motion.div 
                className="glass-card p-6 md:p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">补充信息（选填）</label>
                  <textarea
                    rows={3}
                    value={formData.intro}
                    onChange={e => setFormData({...formData, intro: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all resize-none"
                    placeholder="想聊的具体话题..."
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                  发送信号 <Send className="w-5 h-5" />
                </span>
              </motion.button>
            </form>
          </>
        )}
      </main>
    </motion.div>
  );
};

export default Friend;
