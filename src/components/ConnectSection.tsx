import { motion } from "framer-motion";
import { MessageSquarePlus, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Custom icons since Lucide doesn't have exact Douyin/Xiaohongshu/WeChat icons
const WechatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.69 16.6c-.3.09-.6.16-.9.23-1.1.25-2.25.1-3.3-.4-.5-.25-.95-.6-1.3-1.05-.35-.45-.6-.95-.7-1.5-.1-.55-.05-1.1.15-1.6.2-.5.55-.9 1-1.25.45-.35 1-.6 1.6-.7.6-.1 1.2-.05 1.75.15.55.2 1.05.55 1.45 1 .4.45.65.95.8 1.5.15.55.15 1.15 0 1.7-.15.55-.45 1.05-.85 1.45-.4.4-.9.7-1.45.85-.55.15-1.15.15-1.7 0zm10.2 2.9c-.4.1-.8.15-1.2.15-1.15.0-2.25-.3-3.25-.9-.5-.3-1-.7-1.35-1.2-.35-.5-.6-1.05-.7-1.65-.1-.6.0-1.2.25-1.75.25-.55.65-1 1.15-1.35.5-.35 1.1-.55 1.7-.6.6-.05 1.2.05 1.75.3.55.25 1.0.6 1.35 1.05.35.45.6 1 .7 1.55.1.55.05 1.15-.15 1.7-.2.55-.55 1.0-1.0 1.35-.45.35-1 .55-1.6.6-.6.05-1.2-.05-1.75-.25zM21.5 12c0-2.5-2-4.5-4.5-4.5S12.5 9.5 12.5 12s2 4.5 4.5 4.5c.5 0 1-.1 1.4-.2l2.6 1.3-.7-2.3c.7-.9 1.2-2 1.2-3.3zM10.5 8.5c0-2.5-2-4.5-4.5-4.5S1.5 6 1.5 8.5c0 1.5.7 2.8 1.8 3.7l-.5 2.1 2.5-1.1c.2.1.5.1.7.1 2.5 0 4.5-2 4.5-4.5z"/>
  </svg>
);

const DouyinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.5 6.5v9.5c0 2.5-2 4.5-4.5 4.5S7.5 18.5 7.5 16s2-4.5 4.5-4.5c.5 0 1 .1 1.5 .3V8.5c-.5-.2-1-.2-1.5-.2-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V2.5h3v4h-3z"/>
  </svg>
);

const XiaohongshuIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" className={className}>
    <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm0 1024C229.2 1024 0 794.8 0 512S229.2 0 512 0s512 229.2 512 512-229.2 512-512 512z" fillOpacity="0" />
    <path d="M848 512c0-185.6-150.4-336-336-336s-336 150.4-336 336c0 185.6 150.4 336 336 336s336-150.4 336-336z" fillOpacity="0" />
    <path d="M729.6 371.2c-19.2 0-35.2 16-35.2 35.2v35.2c0 19.2-16 35.2-35.2 35.2s-35.2-16-35.2-35.2V320c0-19.2-16-35.2-35.2-35.2s-35.2 16-35.2 35.2v25.6c0 19.2-16 35.2-35.2 35.2s-35.2-16-35.2-35.2V320c0-19.2-16-35.2-35.2-35.2s-35.2 16-35.2 35.2v57.6c0 19.2-16 35.2-35.2 35.2s-35.2-16-35.2-35.2V320c0-19.2-16-35.2-35.2-35.2S352 300.8 352 320v140.8c0 112 92.8 204.8 204.8 204.8s204.8-92.8 204.8-204.8V406.4c0-19.2-16-35.2-35.2-35.2h-12.8zM556.8 620.8c-60.8 0-112-48-112-108.8v-32c0-19.2 16-35.2 35.2-35.2s35.2 16 35.2 35.2v32c0 22.4 19.2 41.6 41.6 41.6s41.6-19.2 41.6-41.6v-64c0-19.2 16-35.2 35.2-35.2s35.2 16 35.2 35.2v64c0 60.8-51.2 108.8-112 108.8z" />
  </svg>
);

const socialLinks = [
  {
    id: "douyin",
    label: "抖音",
    href: "https://v.douyin.com/cNppiMMkCmo/",
    Icon: DouyinIcon,
    hoverBg: "hover:bg-black",
    hoverBorder: "hover:border-white/30",
    shadow: "shadow-[0_0_15px_rgba(0,0,0,0.5)]",
    hoverShadow: "0 0 20px rgba(255,255,255,0.2)",
    rotate: 5,
  },
  {
    id: "xiaohongshu",
    label: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/",
    Icon: XiaohongshuIcon,
    hoverBg: "hover:bg-red-500",
    hoverBorder: "hover:border-red-400",
    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    hoverShadow: "0 0 20px rgba(239,68,68,0.5)",
    rotate: -5,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const ConnectSection = () => {
  return (
    <motion.section
      id="connect"
      className="relative py-12 px-8 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container mx-auto max-w-3xl pt-12">
        <motion.div className="flex flex-col items-center gap-8" variants={item}>

          {/* Section label */}
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/50"
            variants={item}
          >
            Find me on
          </motion.p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ id, label, href, Icon, hoverBg, hoverBorder, shadow, hoverShadow, rotate }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <motion.a 
                  href={href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white ${hoverBg} hover:text-white ${hoverBorder} transition-all ${shadow}`}
                  whileHover={{ scale: 1.1, rotate, boxShadow: hoverShadow }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
                <span className="text-[10px] font-mono text-muted-foreground/40">{label}</span>
              </div>
            ))}

            {/* WeChat - links to friend page */}
            <div className="flex flex-col items-center gap-2">
              <Link to="/friend">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:text-white hover:border-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 20px rgba(34,197,94,0.5)" }}
                >
                  <WechatIcon className="w-6 h-6" />
                </motion.div>
              </Link>
              <span className="text-[10px] font-mono text-muted-foreground/40">微信</span>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={item}
          />

          <p className="font-serif text-lg md:text-xl font-bold tracking-widest bg-gradient-to-r from-purple-500 via-fuchsia-400 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(192,132,252,0.5)] animate-pulse max-w-md">
            "总有人为你而来"
          </p>
          
          <Link to="/friend">
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-orange-400 hover:text-orange-300 transition-all font-mono text-lg shadow-[0_0_20px_rgba(255,255,255,0.02)] cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquarePlus className="w-6 h-6" />
              交个朋友
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ConnectSection;
