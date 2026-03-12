import { motion } from "framer-motion";
import { ArrowLeft, Camera, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";

const photos = [
  {
    id: 1,
    url: "/src/assets/daily-1.jpg",
    caption: "和朋友们的出行 🚴‍♂️",
    location: "Cycling",
    size: "large"
  },
  {
    id: 2,
    url: "/src/assets/daily-2.jpg",
    caption: "老君山上吃泡面 🍝",
    location: "Mountain",
    size: "medium"
  },
  {
    id: 3,
    url: "/src/assets/daily-3.jpg",
    caption: "妹妹弹古筝给我听 🎶",
    location: "Music",
    size: "small"
  },
  {
    id: 4,
    url: "/src/assets/daily-4.jpg",
    caption: "深夜的实验室 🧪",
    location: "Lab",
    size: "medium"
  },
  {
    id: 5,
    url: "/src/assets/daily-5.jpg",
    caption: "西岛两日游 🥽",
    location: "Travel",
    size: "small"
  },
  {
    id: 6,
    url: "/src/assets/daily-6.jpg",
    caption: "朋友赠书 📚",
    location: "Reading",
    size: "large"
  },
  {
    id: 7,
    url: "/src/assets/daily-7.jpg",
    caption: "可爱的小狗 🐕",
    location: "Pet",
    size: "medium"
  }
];

const Daily = () => {
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
              日常点滴
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              在这里记录生活中的琐碎与美好，每一张照片都是一段独特的回忆。
            </p>
          </motion.div>
        </header>

        {/* Masonry Layout Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-orange-500/30 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-widest">{photo.location}</span>
                  </div>
                  <h3 className="text-white text-xl font-medium mb-2">{photo.caption}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/60">
                      <button className="hover:text-red-400 transition-colors flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">24</span>
                      </button>
                      <button className="hover:text-primary transition-colors flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs">Exif</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center">
        <p className="text-muted-foreground text-sm font-mono">
          - 保持热爱，奔赴山海 -
        </p>
      </footer>
    </motion.div>
  );
};

export default Daily;
