import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const works = [
  { img: gallery1, prompt: "hyper-realistic, floating crystals, aurora borealis, cinematic lighting, 8k" },
  { img: gallery2, prompt: "cyberpunk cityscape, neon reflections, wet streets, purple teal grading" },
  { img: gallery3, prompt: "mechanical humanoid, chrome glass, soft purple backlighting, studio shot" },
  { img: gallery4, prompt: "abstract neural network, data streams, purple emerald gradients, particles" },
  { img: gallery5, prompt: "bioluminescent forest, magical mushrooms, purple moonlight, ethereal mist" },
  { img: gallery6, prompt: "deep space nebula, floating astronaut, cosmic dust, vibrant purple green" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const GallerySection = () => {
  return (
    <motion.section
      id="gallery"
      className="relative py-24 px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2 className="section-title text-primary mb-16" variants={item}>
          AI Gallery
        </motion.h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {works.map((w, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-xl group break-inside-avoid"
              variants={item}
            >
              <img
                src={w.img}
                alt={`AI 作品 ${i + 1}`}
                className="w-full block outline outline-1 outline-white/10 -outline-offset-1 rounded-xl"
                loading="lazy"
              />
              {/* Prompt overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <p className="font-mono text-xs text-accent leading-relaxed">
                  <span className="text-muted-foreground">Prompt: </span>
                  {w.prompt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GallerySection;
