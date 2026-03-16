import { motion } from "framer-motion";
import { Coffee, BookOpen, Camera, Gamepad2, Music, Film, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import PlanetIcon from "./PlanetIcon";
import TitlePlanet from "./TitlePlanet";

const interests = [
  {
    icon: Coffee,
    title: "日常",
    desc: "热爱生活，享受每一杯咖啡的香气，记录生活中的点滴美好。",
    link: "/daily",
    type: "daily"
  },
  {
    icon: Music,
    title: "音乐",
    desc: "在旋律中寻找共鸣，用音符治愈心灵，探索不同风格的乐章。",
    link: "/music",
    type: "music"
  },
  {
    icon: BookOpen,
    title: "学习",
    desc: "保持好奇心，持续探索 AI 与前沿技术，终身学习者。",
    link: "/study",
    type: "study"
  },
  {
    icon: Film,
    title: "电影",
    desc: "体验百态人生，感受光影魅力，在银幕故事中思考与感悟。",
    link: "/film",
    type: "film"
  },
  {
    icon: Camera,
    title: "摄影",
    desc: "用镜头捕捉光影，定格瞬间的感动，发现平凡中的不凡。",
    link: "/photography",
    type: "photo"
  },
  {
    icon: Utensils,
    title: "美食",
    desc: "寻觅街头巷尾的味道，用味蕾记录城市，享受烹饪与分享的快乐。",
    link: "/food",
    type: "food"
  },
  {
    icon: Gamepad2,
    title: "游戏",
    desc: "在虚拟世界中冒险，体验第九艺术的魅力，寻找灵感与快乐。",
    link: "/gaming",
    type: "game"
  }
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="relative py-24 px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={item} className="mb-24 text-center">
          <TitlePlanet />
        </motion.div>

        <div className="relative mb-16">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border" />
          {interests.map((interest, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              variants={item}
            >
              <div className={`hidden lg:block lg:w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                {interest.link ? (
                  <Link to={interest.link}>
                    <div className={`inline-flex items-center justify-center mb-6 ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                      <PlanetIcon icon={interest.icon} type={interest.type} size={48} />
                    </div>
                  </Link>
                ) : (
                  <div className={`inline-flex items-center justify-center mb-6 ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                    <PlanetIcon icon={interest.icon} type={interest.type} size={48} />
                  </div>
                )}
                <h3 className="font-serif text-3xl font-bold bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 bg-clip-text text-transparent mb-2 tracking-wide">{interest.title}</h3>
                <p className="text-gray-200 leading-relaxed">{interest.desc}</p>
              </div>

              {/* Center Dot */}
              <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)] mt-1.5 border-4 border-background z-10" />

              {/* Mobile Content */}
              <div className="lg:hidden pl-12 w-full">
                {interest.link ? (
                  <Link to={interest.link}>
                    <div className="inline-flex items-center justify-center mb-4">
                      <PlanetIcon icon={interest.icon} type={interest.type} size={36} />
                    </div>
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center mb-4">
                    <PlanetIcon icon={interest.icon} type={interest.type} size={36} />
                  </div>
                )}
                <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 bg-clip-text text-transparent mb-2 tracking-wide">{interest.title}</h3>
                <p className="text-gray-200 text-sm leading-relaxed">{interest.desc}</p>
              </div>

              {/* Empty Space for layout balance */}
              <div className={`hidden lg:block lg:w-1/2 ${i % 2 === 0 ? "pl-12" : "pr-12"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
