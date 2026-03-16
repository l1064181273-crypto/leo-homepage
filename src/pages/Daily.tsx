import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Heart, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { useState, useEffect, useCallback } from "react";

import daily1 from "@/assets/daily-1.jpg";
import daily2 from "@/assets/daily-2.jpg";
import daily3 from "@/assets/daily-3.jpg";
import daily4 from "@/assets/daily-4.jpg";
import daily5 from "@/assets/daily-5.jpg";
import daily6 from "@/assets/daily-6.jpg";
import daily7 from "@/assets/daily-7.jpg";

const photos = [
  { id: 1, url: daily1, caption: "和朋友们的出行 🚴‍♂️", location: "Cycling", size: "large" },
  { id: 2, url: daily2, caption: "老君山上吃泡面 🍝", location: "Mountain", size: "medium" },
  { id: 3, url: daily3, caption: "妹妹弹古筝给我听 🎶", location: "Music", size: "small" },
  { id: 4, url: daily4, caption: "深夜的实验室 🧪", location: "Lab", size: "medium" },
  { id: 5, url: daily5, caption: "西岛两日游 🥽", location: "Travel", size: "small" },
  { id: 6, url: daily6, caption: "朋友赠书 📚", location: "Reading", size: "large" },
  { id: 7, url: daily7, caption: "可爱的小狗 🐕", location: "Pet", size: "medium" },
];

const Daily = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }, [lightboxIndex]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }, [lightboxIndex]);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

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
            <p className="mt-3 font-mono text-xs text-muted-foreground/40">
              {photos.length} 张记忆 · 点击图片查看大图
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
              className="relative group break-inside-avoid cursor-pointer"
              onClick={() => openLightbox(index)}
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
                      <button
                        className={`hover:text-red-400 transition-colors flex items-center gap-1 ${likedIds.has(photo.id) ? "text-red-400" : ""}`}
                        onClick={(e) => toggleLike(photo.id, e)}
                      >
                        <Heart className={`w-4 h-4 transition-all ${likedIds.has(photo.id) ? "fill-red-400 scale-110" : ""}`} />
                        <span className="text-xs">{likedIds.has(photo.id) ? 25 : 24}</span>
                      </button>
                      <button className="hover:text-primary transition-colors flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs">查看</span>
                      </button>
                    </div>
                    <span className="text-xs font-mono text-white/30">{index + 1}/{photos.length}</span>
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10 font-mono text-sm text-white/50">
              {lightboxIndex + 1} / {photos.length}
            </div>

            {/* Prev button */}
            <button
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={currentPhoto.id}
              className="relative max-w-4xl max-h-[85vh] mx-16 flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              {/* Caption */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono uppercase tracking-widest">{currentPhoto.location}</span>
                </div>
                <h3 className="text-white text-lg font-medium">{currentPhoto.caption}</h3>
              </div>
            </motion.div>

            {/* Next button */}
            <button
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Keyboard hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/20 flex gap-4">
              <span>← → 切换</span>
              <span>ESC 关闭</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Daily;
