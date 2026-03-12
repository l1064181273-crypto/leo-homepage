import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/CyberBackground";
import GameBackground from "@/components/GameBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ConnectSection from "@/components/ConnectSection";

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
        <footer className="border-t border-border py-8 px-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Leo 版权所有
          </p>
        </footer>
      </main>
    </motion.div>
  );
};

export default Index;
