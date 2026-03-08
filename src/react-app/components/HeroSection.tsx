import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Play, Sparkles, Target, Cpu, DollarSign, Rocket, Zap, TrendingUp, Users } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { MeshGradient } from "./MeshGradient";

const floatingCards = [
  { icon: Sparkles, label: "Startup Overview", color: "from-indigo-500 to-violet-600", x: "8%", y: "18%", rotate: -8 },
  { icon: Target, label: "MVP Features", color: "from-violet-500 to-purple-600", x: "85%", y: "22%", rotate: 6 },
  { icon: Cpu, label: "Tech Stack", color: "from-fuchsia-500 to-pink-600", x: "5%", y: "65%", rotate: 5 },
  { icon: DollarSign, label: "Revenue Model", color: "from-cyan-500 to-blue-600", x: "88%", y: "60%", rotate: -6 },
  { icon: TrendingUp, label: "Growth Strategy", color: "from-emerald-500 to-teal-600", x: "12%", y: "42%", rotate: -4 },
  { icon: Users, label: "Target Audience", color: "from-orange-500 to-amber-600", x: "82%", y: "42%", rotate: 4 },
];

function FloatingCard({ card, index }: { card: typeof floatingCards[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5 + index * 0.1, duration: 0.8, type: "spring" }}
      style={{ left: card.x, top: card.y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="absolute hidden lg:block"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [card.rotate, card.rotate + 2, card.rotate] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative group cursor-pointer"
      >
        {/* Glow */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${card.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity`} />
        
        {/* Card */}
        <div className="relative glass rounded-2xl p-4 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white/90 text-sm">{card.label}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-char", {
        y: 120, opacity: 0, rotateX: -90, duration: 1, stagger: 0.03, ease: "back.out(1.7)", delay: 0.5,
      });
      gsap.from(".hero-subtitle", { y: 50, opacity: 0, duration: 1, ease: "power4.out", delay: 1.2 });
      gsap.from(".hero-buttons", { y: 50, opacity: 0, duration: 1, ease: "power4.out", delay: 1.4 });
      gsap.from(".hero-stats", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 1.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderAnimatedText = (text: string, isGradient: boolean) => {
    const baseClass = isGradient 
      ? "hero-char inline-block bg-gradient-to-r from-indigo-400 via-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent" 
      : "hero-char inline-block text-white";
    
    return text.split("").map((char, i) => (
      <span key={i} className={baseClass} style={{ display: char === " " ? "inline" : "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <MeshGradient />
      <ParticleField particleCount={100} />

      {/* Floating orbs that follow mouse */}
      <motion.div
        animate={{ x: mousePosition.x * 40, y: mousePosition.y * 40 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-sm"
      />
      <motion.div
        animate={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
        transition={{ type: "spring", stiffness: 40, damping: 25 }}
        className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-sm"
      />

      {/* Floating Cards */}
      {floatingCards.map((card, index) => (
        <FloatingCard key={card.label} card={card} index={index} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-10 border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="w-4 h-4 text-indigo-400" />
          </motion.div>
          <span className="text-sm font-medium text-white/80">AI-Powered Startup Blueprint Generator</span>
          <Zap className="w-3 h-3 text-amber-400" />
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-tight mb-8 leading-[1.1]" style={{ perspective: "1000px" }}>
          <div className="overflow-hidden py-2">{renderAnimatedText("Turn ", false)}{renderAnimatedText("Ideas", true)}</div>
          <div className="overflow-hidden py-2">{renderAnimatedText("Into ", false)}{renderAnimatedText("Startups", true)}</div>
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
          Transform your startup ideas into comprehensive blueprints with AI. Get MVP features, tech stack recommendations, revenue models, and more in seconds.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/generator" className="group relative overflow-hidden rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity animate-gradient bg-[length:200%_200%]" />
            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl font-semibold text-lg flex items-center gap-2 text-white">
              Generate Blueprint
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link to="/how-it-works" className="group glass rounded-2xl px-8 py-4 font-semibold text-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-white/30">
            <Play className="w-5 h-5" />
            See How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 flex items-center justify-center gap-12 flex-wrap">
          {[
            { value: "10K+", label: "Blueprints Generated" },
            { value: "11", label: "Detailed Sections" },
            { value: "<30s", label: "Generation Time" },
          ].map((stat) => (
            <div key={stat.label} className="hero-stats text-center">
              <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
