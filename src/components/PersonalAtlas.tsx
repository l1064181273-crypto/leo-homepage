import { AnimatePresence, motion } from "framer-motion";
import {
  Aperture,
  BookImage,
  Film,
  Gamepad2,
  Headphones,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { type ElementType, useRef, useState } from "react";

import daily2 from "@/assets/daily-2.jpg";
import daily3 from "@/assets/daily-3.jpg";
import daily4 from "@/assets/daily-4.jpg";
import daily5 from "@/assets/daily-5.jpg";
import daily6 from "@/assets/daily-6.jpg";
import daily7 from "@/assets/daily-7.jpg";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";
import photo6 from "@/assets/photo-6.jpg";
import photo7 from "@/assets/photo-7.jpg";
import photo8 from "@/assets/photo-8.jpg";
import photo9 from "@/assets/photo-9.jpg";
import photo10 from "@/assets/photo-10.jpg";
import photo11 from "@/assets/photo-11.jpg";
import photo13 from "@/assets/photo-13.jpg";
import jayChou from "@/assets/artists/jay-chou.jpg";
import easonChan from "@/assets/artists/eason-chan.jpg";
import taylorSwift from "@/assets/artists/taylor-swift.png";
import linkinPark from "@/assets/artists/linkin-park.jpg";
import wangLeehom from "@/assets/artists/wang-leehom.jpg";
import charliePuth from "@/assets/artists/charlie-puth.jpg";
import interstellar from "@/assets/films/interstellar.jpg";
import shawshank from "@/assets/films/shawshank.jpg";
import spiritedAway from "@/assets/films/spirited-away.jpg";
import inception from "@/assets/films/inception.jpg";
import forrestGump from "@/assets/films/forrest-gump.jpg";
import theMatrix from "@/assets/films/the-matrix.jpg";
import gameWukong from "@/assets/game-wukong.jpg";
import gameEldenring from "@/assets/game-eldenring.jpg";
import gameCyberpunk from "@/assets/game-cyberpunk.jpg";
import gameCrossfire from "@/assets/game-crossfire.jpg";
import sichuanHotpot from "@/assets/food/sichuan-hotpot.jpg";
import cantoneseDimsum from "@/assets/food/cantonese-dimsum.jpg";
import japaneseSushi from "@/assets/food/japanese-sushi.jpg";
import bbqGrilledMeat from "@/assets/food/bbq-grilled-meat.jpg";
import italianPasta from "@/assets/food/italian-pasta.jpg";
import yunnanMushroom from "@/assets/food/yunnan-mushroom.webp";

type AtlasItem = {
  title: string;
  subtitle: string;
  image: string;
  badge: string;
};

type AtlasCollection = {
  id: "notes" | "visual" | "sound" | "cinema" | "worlds" | "table";
  name: string;
  kicker: string;
  description: string;
  icon: ElementType;
  visual: "landscape" | "square" | "portrait";
  items: AtlasItem[];
};

const collections: AtlasCollection[] = [
  {
    id: "notes",
    name: "Daybook",
    kicker: "EVERYDAY OBSERVATIONS",
    description: "把旅行朋友实验室和普通日子保存成可以重新打开的生活记录",
    icon: BookImage,
    visual: "landscape",
    items: [
      { image: daily2, title: "山顶泡面", subtitle: "老君山的简单快乐", badge: "MOUNTAIN" },
      { image: daily3, title: "弦上片刻", subtitle: "妹妹弹古筝给我听", badge: "MUSIC" },
      { image: daily4, title: "深夜实验室", subtitle: "研究生生活切片", badge: "LAB" },
      { image: daily5, title: "西岛两日", subtitle: "海边和自由", badge: "TRAVEL" },
      { image: daily6, title: "朋友赠书", subtitle: "被文字记住的友谊", badge: "READING" },
      { image: daily7, title: "偶遇小狗", subtitle: "普通日子的惊喜", badge: "PET" },
    ],
  },
  {
    id: "visual",
    name: "Visual Studies",
    kicker: "PHOTOGRAPHIC OBSERVATIONS",
    description: "关于光线空间人物和旅行的视觉练习也是我理解世界的一种方式",
    icon: Aperture,
    visual: "landscape",
    items: [
      { image: photo1, title: "暮色苍山", subtitle: "Landscape", badge: "F8 ISO100" },
      { image: photo2, title: "欧式校园", subtitle: "Architecture", badge: "F56 ISO50" },
      { image: photo3, title: "湖畔黑天鹅", subtitle: "Nature", badge: "F4 ISO100" },
      { image: photo4, title: "大礼堂广场", subtitle: "City", badge: "F56 ISO100" },
      { image: photo5, title: "永子棋院", subtitle: "Culture", badge: "F22 ISO50" },
      { image: photo6, title: "热带椰林", subtitle: "Travel", badge: "F18 ISO50" },
      { image: photo7, title: "麦田守望", subtitle: "Portrait", badge: "F2 ISO100" },
      { image: photo8, title: "通天之门", subtitle: "Minimalism", badge: "F28 ISO50" },
      { image: photo9, title: "雪做的玫瑰", subtitle: "Macro", badge: "F18 ISO400" },
      { image: photo10, title: "海边路灯", subtitle: "Minimalism", badge: "F4 ISO50" },
      { image: photo11, title: "湖滨远眺", subtitle: "City", badge: "F8 ISO100" },
      { image: photo13, title: "雪山飞驰", subtitle: "Sports", badge: "GOPRO" },
    ],
  },
  {
    id: "sound",
    name: "Sound Archive",
    kicker: "ARTISTS AND MEMORY",
    description: "有些音乐负责陪伴有些音乐负责保存一段具体的时间",
    icon: Headphones,
    visual: "square",
    items: [
      { image: jayChou, title: "周杰伦", subtitle: "华语流行和 R&B", badge: "FANTASY" },
      { image: easonChan, title: "陈奕迅", subtitle: "粤语和华语流行", badge: "VOCAL" },
      { image: taylorSwift, title: "Taylor Swift", subtitle: "Pop and Country", badge: "1989" },
      { image: linkinPark, title: "Linkin Park", subtitle: "Nu Metal and Rock", badge: "HYBRID" },
      { image: wangLeehom, title: "王力宏", subtitle: "华语流行和 R&B", badge: "CHINKED OUT" },
      { image: charliePuth, title: "Charlie Puth", subtitle: "Pop and R&B", badge: "HARMONY" },
    ],
  },
  {
    id: "cinema",
    name: "Cinema Index",
    kicker: "STORIES ON SCREEN",
    description: "收藏那些让我重新思考时间希望成长和现实边界的电影",
    icon: Film,
    visual: "portrait",
    items: [
      { image: interstellar, title: "Interstellar", subtitle: "星际穿越", badge: "2014  93" },
      { image: shawshank, title: "The Shawshank Redemption", subtitle: "肖申克的救赎", badge: "1994  97" },
      { image: spiritedAway, title: "Spirited Away", subtitle: "千与千寻", badge: "2001  94" },
      { image: inception, title: "Inception", subtitle: "盗梦空间", badge: "2010  93" },
      { image: forrestGump, title: "Forrest Gump", subtitle: "阿甘正传", badge: "1994  95" },
      { image: theMatrix, title: "The Matrix", subtitle: "黑客帝国", badge: "1999  90" },
    ],
  },
  {
    id: "worlds",
    name: "Interactive Worlds",
    kicker: "PLAYABLE EXPERIENCES",
    description: "游戏是可以进入的世界也是叙事系统交互和视觉体验的结合",
    icon: Gamepad2,
    visual: "landscape",
    items: [
      { image: gameWukong, title: "Black Myth Wukong", subtitle: "黑神话悟空", badge: "PLAYING 45H" },
      { image: gameEldenring, title: "Elden Ring", subtitle: "艾尔登法环", badge: "120H" },
      { image: gameCyberpunk, title: "Cyberpunk 2077", subtitle: "夜之城", badge: "80H" },
      { image: gameCrossfire, title: "Cross Fire", subtitle: "经典竞技记忆", badge: "1000H" },
    ],
  },
  {
    id: "table",
    name: "Table Stories",
    kicker: "TASTE AND PLACES",
    description: "用味道记住城市和同行的人让每一次出发都有具体的气味",
    icon: UtensilsCrossed,
    visual: "landscape",
    items: [
      { image: sichuanHotpot, title: "Sichuan Heat", subtitle: "川味火锅", badge: "SPICY" },
      { image: cantoneseDimsum, title: "Morning Ritual", subtitle: "广式早茶", badge: "DIM SUM" },
      { image: japaneseSushi, title: "Quiet Precision", subtitle: "日料和寿司", badge: "SUSHI" },
      { image: bbqGrilledMeat, title: "Summer Fire", subtitle: "炭火烧烤", badge: "GRILL" },
      { image: italianPasta, title: "Simple Comfort", subtitle: "意大利料理", badge: "PASTA" },
      { image: yunnanMushroom, title: "Taste of Home", subtitle: "云南野生菌", badge: "YUNNAN" },
    ],
  },
];

const PersonalAtlas = ({ initialCollectionId = "notes" }: { initialCollectionId?: AtlasCollection["id"] }) => {
  const [activeId, setActiveId] = useState<AtlasCollection["id"]>(initialCollectionId);
  const [selectedItem, setSelectedItem] = useState<AtlasItem | null>(null);
  const contentRef = useRef<HTMLElement>(null);
  const activeCollection = collections.find((collection) => collection.id === activeId) ?? collections[0];
  const totalEntries = collections.reduce((total, collection) => total + collection.items.length, 0);

  const selectCollection = (id: AtlasCollection["id"]) => {
    setActiveId(id);
    setSelectedItem(null);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="atlas-shell">
      <aside className="atlas-sidebar">
        <div className="atlas-sidebar-heading">
          <span>PERSONAL ATLAS</span>
          <strong>Collections</strong>
        </div>

        <nav aria-label="个人收藏模块">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <button
                type="button"
                className={activeId === collection.id ? "is-active" : ""}
                key={collection.id}
                onClick={() => selectCollection(collection.id)}
              >
                <Icon size={16} strokeWidth={1.55} />
                <span>{collection.name}</span>
                <small>{String(collection.items.length).padStart(2, "0")}</small>
              </button>
            );
          })}
        </nav>

        <div className="atlas-sidebar-meta">
          <span>{collections.length} COLLECTIONS</span>
          <span>{totalEntries} ENTRIES</span>
        </div>
      </aside>

      <section className="atlas-content" ref={contentRef}>
        <div className="atlas-breadcrumb">
          <span>Haonan</span><i /> <span>Personal Atlas</span><i /> <strong>{activeCollection.name}</strong>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className={`atlas-collection is-${activeCollection.visual} collection-${activeCollection.id}`}
            key={activeCollection.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <header className="atlas-collection-header">
              <div>
                <p>{activeCollection.kicker}</p>
                <h2>{activeCollection.name}</h2>
                <span>{activeCollection.description}</span>
              </div>
              <strong>{String(activeCollection.items.length).padStart(2, "0")}</strong>
            </header>

            <div className="atlas-grid">
              {activeCollection.items.map((item, index) => (
                <motion.button
                  type="button"
                  className={index === 0 ? "is-featured" : ""}
                  key={`${activeCollection.id}-${item.title}`}
                  onClick={() => setSelectedItem(item)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.2) }}
                >
                  <span className="atlas-image-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <small>{item.badge}</small>
                  </span>
                  <span className="atlas-card-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="atlas-viewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button type="button" onClick={() => setSelectedItem(null)} aria-label="关闭大图"><X size={17} /></button>
                <img src={selectedItem.image} alt={selectedItem.title} />
                <footer>
                  <div><p>{activeCollection.name}</p><h3>{selectedItem.title}</h3><span>{selectedItem.subtitle}</span></div>
                  <strong>{selectedItem.badge}</strong>
                </footer>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default PersonalAtlas;
