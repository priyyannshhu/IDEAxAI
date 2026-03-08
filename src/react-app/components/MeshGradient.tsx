import { motion } from "framer-motion";

const blobs = [
  {
    color: "from-indigo-600/40 to-violet-600/30",
    size: "w-[800px] h-[800px]",
    position: "top-[-20%] left-[-10%]",
    duration: 20,
  },
  {
    color: "from-purple-600/30 to-fuchsia-600/20",
    size: "w-[600px] h-[600px]",
    position: "top-[10%] right-[-5%]",
    duration: 25,
  },
  {
    color: "from-pink-600/30 to-rose-600/20",
    size: "w-[700px] h-[700px]",
    position: "bottom-[-10%] left-[20%]",
    duration: 22,
  },
  {
    color: "from-cyan-600/25 to-blue-600/15",
    size: "w-[500px] h-[500px]",
    position: "bottom-[20%] right-[10%]",
    duration: 18,
  },
];

export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0d1225] to-[#0B0F1A]" />
      
      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.position} rounded-full bg-gradient-radial ${blob.color} blur-[100px]`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Accent glow spots */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(11,15,26,0.8) 100%)",
        }}
      />
    </div>
  );
}
