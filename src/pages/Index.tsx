import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/CyberBackground";
import GameBackground from "@/components/GameBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ConnectSection from "@/components/ConnectSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <CyberBackground />
      <GameBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ConnectSection />

        {/* Footer */}
        <footer className="border-t border-border py-10 px-8">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground/50">
              © 2026 Leo · All rights reserved
            </p>
            <div className="flex items-center gap-6">
              <Link to="/photos" className="font-mono text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                照片墙
              </Link>
              <Link to="/daily" className="font-mono text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                日常
              </Link>
              <Link to="/gaming" className="font-mono text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                游戏
              </Link>
              <Link to="/friend" className="font-mono text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                联系
              </Link>
            </div>
            <p className="font-mono text-xs text-muted-foreground/30">
              Built with ❤️ &amp; AI
            </p>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default Index;
