import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Rocket, ArrowLeft } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">
      <CyberBackground />

      {/* Floating 404 text background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-black text-white/[0.02] leading-none tracking-tighter">
          404
        </span>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Animated planet / emoji */}
        <motion.div
          className="text-[80px] mb-6 leading-none"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🚀
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-mono text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Signal Lost · Deep Space
        </motion.p>

        <motion.p
          className="text-muted-foreground text-base leading-relaxed mb-10 max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          你访问的页面已漂入星际深处，找不到了。别担心，让我们把你送回地球。
        </motion.p>

        {/* Glowing divider */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-sm font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home className="w-4 h-4" />
              返回地球
            </motion.div>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-mono text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className="w-4 h-4" />
            上一页
          </motion.button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          className="mt-12 font-mono text-xs text-muted-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Error Code: {location.pathname} · 404 Not Found
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
