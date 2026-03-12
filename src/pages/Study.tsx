import { motion } from "framer-motion";
import { ArrowLeft, Brain, Leaf, Palette, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";

const studies = [
  {
    id: 1,
    title: "AI 提示词工程进阶",
    desc: "深入探索与大模型对话的艺术，掌握结构化提示词编写技巧，释放 AI 的无限潜能。",
    date: "2026-03-10",
    category: "Prompt",
    icon: MessageSquare
  },
  {
    id: 2,
    title: "AIGC 图像创作",
    desc: "利用 Midjourney 和 Stable Diffusion 进行艺术创作，探索 AI 在视觉设计中的应用边界。",
    date: "2026-04-10",
    category: "Design",
    icon: Palette
  },
  {
    id: 3,
    title: "智慧农业数据分析",
    desc: "结合专业背景，利用 AI 分析农业环境数据，探索精准农业与智能化种植的新模式。",
    date: "2025-12-26",
    category: "Agriculture",
    icon: Leaf
  },
  {
    id: 4,
    title: "个人知识库构建",
    desc: "运用 AI 工具搭建第二大脑，优化信息获取与处理流程，打造高效的终身学习体系。",
    date: "2026-02-19",
    category: "Productivity",
    icon: Brain
  }
];

const Study = () => {
  return (
    <motion.div
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
      
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
              学习之路
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              作为非计算机专业的 AI 探索者，专注于利用 AI 工具赋能智慧农业与日常生活。
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-heading font-medium text-white mb-3 group-hover:text-orange-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground/60 font-mono">
                  <Clock className="w-4 h-4 mr-2" />
                  {item.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Study;
