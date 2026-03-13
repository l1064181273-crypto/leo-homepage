import { motion } from "framer-motion";
import { ArrowLeft, Brain, Leaf, Palette, MessageSquare, ChevronDown, Zap, Code, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState } from "react";

const studies = [
  {
    id: 1,
    title: "提示词工程",
    subtitle: "Prompt Engineering",
    desc: "深度研究 LLM 提示词优化技巧，构建高效的 AI 下游应用。",
    level: "ADVANCED",
    progress: 50,
    icon: MessageSquare,
    color: "text-blue-400",
    barColor: "bg-blue-400",
    details: "目标：建立一套标准化的 Prompt 库，涵盖写作、编程、绘图等常用场景，并尝试开发一个简单的 Prompt 优化工具。"
  },
  {
    id: 2,
    title: "AIGC 图像创作",
    subtitle: "Visual Creation",
    desc: "利用 Midjourney 和 Stable Diffusion 进行艺术创作，探索视觉设计边界。",
    level: "ADVANCED",
    progress: 42,
    icon: Palette,
    color: "text-purple-400",
    barColor: "bg-purple-400",
    details: "目标：熟练掌握 ControlNet 精准控图，完成一套风格统一的个人主题插画集，并探索 LoRA 模型微调。"
  },
  {
    id: 3,
    title: "智慧农业数据分析",
    subtitle: "Agri-Tech Analysis",
    desc: "结合专业背景，利用 AI 分析农业环境数据，探索精准农业新模式。",
    level: "INTERMEDIATE",
    progress: 25,
    icon: Leaf,
    color: "text-green-400",
    barColor: "bg-green-400",
    details: "目标：能够独立处理和可视化农业传感器数据，训练一个简单的病虫害识别模型，辅助农业决策。"
  },
  {
    id: 4,
    title: "个人知识库构建",
    subtitle: "Knowledge Base",
    desc: "运用 AI 工具搭建第二大脑，优化信息获取与处理流程。",
    level: "ENTHUSIAST",
    progress: 35,
    icon: Brain,
    color: "text-amber-400",
    barColor: "bg-amber-400",
    details: "目标：搭建基于 Obsidian/Notion 的自动化知识库，实现“输入-整理-输出”的闭环，利用 RAG 技术实现个人文档问答。"
  },
  {
    id: 5,
    title: "Python 初识",
    subtitle: "Python Basics",
    desc: "初步接触 Python 编程语言，掌握基础语法与数据处理逻辑，为自动化办公打下基础。",
    level: "INTERMEDIATE",
    progress: 15,
    icon: Code,
    color: "text-cyan-400",
    barColor: "bg-cyan-400",
    details: "目标：熟练掌握 Python 基础语法，能够编写脚本自动化处理 Excel 表格和文件管理，尝试编写一个简单的网络爬虫。"
  },
  {
    id: 6,
    title: "技术哲学思考",
    subtitle: "Tech Philosophy",
    desc: "思考 AI 伦理、人机融合与技术奇点的哲学命题。",
    level: "ENTHUSIAST",
    progress: 40,
    icon: BookOpen,
    color: "text-pink-400",
    barColor: "bg-pink-400",
    details: "目标：阅读 5 本关于技术哲学的经典著作，撰写一系列读书笔记，形成自己对 AI 时代人类未来的独立思考体系。"
  }
];

const Study = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
      
      <main className="relative z-10 container mx-auto px-6 md:px-8 pt-32 pb-24">
        <a 
          href="/#about"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 py-2 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </a>

        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              学无止境
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              点击卡片展开详细信息
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm cursor-pointer hover:shadow-lg hover:shadow-white/5"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-300 ${expandedId === item.id ? "rotate-180" : ""}`} />
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 ${item.color} uppercase`}>
                      {item.level}
                    </span>
                    <span className={`text-sm font-mono font-bold ${item.color}`}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.barColor}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.desc}
                </p>
                
                {/* Expand Text */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
                  <span>点击展开</span>
                  <ArrowLeft className="w-3 h-3 rotate-[270deg]" />
                </div>

                {/* Expanded Content */}
                <motion.div 
                  initial={false}
                  animate={{ height: expandedId === item.id ? "auto" : 0, opacity: expandedId === item.id ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-white/5 text-sm text-muted-foreground/80 leading-relaxed">
                    <p>{item.details}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Study;
