import { motion } from "framer-motion";

const TitlePlanet = () => {
  return (
    <div className="relative flex items-center justify-center w-[160px] h-[160px] md:w-[200px] md:h-[200px] mx-auto">
      {/* Outer Orbit Rings */}
      <motion.div
        className="absolute inset-[-20%] rounded-full border border-blue-300/20"
        style={{ transform: "rotateX(70deg) rotateY(10deg)" }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-40%] rounded-full border border-purple-200/30 border-dashed"
        style={{ transform: "rotateX(60deg) rotateY(-20deg)" }}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Planet Body */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 shadow-[0_0_60px_rgba(79,70,229,0.3)] flex items-center justify-center overflow-hidden border border-white/10"
        animate={{ 
          y: [0, -10, 0],
          boxShadow: [
            "0 0 60px rgba(79,70,229,0.3)",
            "0 0 80px rgba(79,70,229,0.5)",
            "0 0 60px rgba(79,70,229,0.3)"
          ]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Surface Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay" />
        
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent rounded-full" />
        
        {/* Shine Highlight */}
        <div className="absolute top-8 left-8 w-1/3 h-1/3 rounded-full bg-white/10 blur-xl" />

        {/* Title Text */}
        <motion.h2 
          className="relative z-10 font-mono text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          style={{ textShadow: "0 0 20px rgba(165,180,252,0.8)" }}
        >
          我的星球
        </motion.h2>

        {/* Floating Particles inside */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Satellite 1 (Horizontal-ish) */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
        animate={{
          x: [120, -120],
          y: [20, -20],
          scale: [0.8, 1.2, 0.8],
          zIndex: [0, 20, 0], // Creates depth effect
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }}
      />

      {/* Satellite 2 (North-South / Vertical) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
        animate={{
          y: [120, -120],
          x: [30, -30],
          scale: [0.8, 1.2, 0.8],
          zIndex: [20, 0, 20], // Creates depth effect
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
          delay: 1 // Offset timing
        }}
      />
    </div>
  );
};

export default TitlePlanet;
