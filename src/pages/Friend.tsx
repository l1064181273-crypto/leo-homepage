import { motion } from "framer-motion";
import { useState } from "react";
import { Send, ArrowLeft, Sparkles, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import wechatQr from "@/assets/wechat-qr.jpg";

const Friend = () => {
  const [name, setName] = useState("");
  const [wechat, setWechat] = useState("");
  const [intro, setIntro] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log({ name, wechat, intro });
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
      
      <main className="relative z-10 container mx-auto px-8 pt-32 pb-16 max-w-5xl flex flex-col items-center justify-center min-h-screen">
        <a 
          href="/#connect"
          className="absolute top-24 left-8 md:left-auto md:right-full md:mr-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">返回首页</span>
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Column: Form */}
          <motion.div 
            className="glass-card p-8 md:p-12 w-full relative overflow-hidden h-full flex flex-col justify-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative background elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-500/10 text-orange-500 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-clip-text text-transparent bg-300% animate-gradient">
                交个朋友
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                很高兴遇见你！留下你的联系方式，让我们开启一段有趣的对话。
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-white">信息已发送！</h3>
                <p className="text-muted-foreground mb-6">
                  谢谢你的信任，我会尽快通过微信联系你。
                </p>
                <Link 
                  to="/"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-mono ml-1">
                    怎么称呼你
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all hover:bg-black/30"
                    placeholder="你的名字"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-mono ml-1">
                    微信号 / 手机号
                  </label>
                  <input
                    type="text"
                    required
                    value={wechat}
                    onChange={(e) => setWechat(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all hover:bg-black/30"
                    placeholder="方便我添加你"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-mono ml-1">
                    简单介绍一下（选填）
                  </label>
                  <textarea
                    rows={4}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all resize-none hover:bg-black/30"
                    placeholder="比如你的兴趣、职业，或者想聊的话题..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Send className="w-5 h-5" />
                  <span className="relative">发送给 Leo</span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right Column: QR Code */}
          <motion.div 
            className="glass-card p-8 md:p-12 w-full relative overflow-hidden flex flex-col items-center justify-center text-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-500/10 text-green-500 mb-6">
              <QrCode className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2 text-white">
              扫码加微信
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              也可以直接扫描下方二维码添加我的微信
            </p>

            <motion.div 
              className="relative p-2 bg-white rounded-2xl shadow-xl max-w-[280px]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={wechatQr} 
                alt="WeChat QR Code" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 border-4 border-white/50 rounded-2xl pointer-events-none" />
            </motion.div>
            
            <p className="mt-6 font-mono text-sm text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              WeChat ID: Leo_AI_Trainer
            </p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Friend;
