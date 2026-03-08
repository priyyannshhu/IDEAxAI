import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Layers, Cpu, TrendingUp, Users, Zap, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Lightbulb, title: "AI Startup Blueprint", description: "Generate comprehensive startup blueprints from a simple idea. Our AI analyzes your concept and creates actionable plans.", gradient: "from-amber-400 via-orange-500 to-red-500", size: "lg", accent: "#f59e0b" },
  { icon: Layers, title: "MVP Feature Planning", description: "Get detailed MVP feature recommendations tailored to your startup.", gradient: "from-indigo-400 via-violet-500 to-purple-500", size: "md", accent: "#8b5cf6" },
  { icon: Cpu, title: "Tech Stack", description: "Intelligent tech stack suggestions based on your product needs.", gradient: "from-cyan-400 via-blue-500 to-indigo-500", size: "md", accent: "#06b6d4" },
  { icon: TrendingUp, title: "Revenue Models", description: "Explore monetization strategies with AI-generated revenue models.", gradient: "from-emerald-400 via-teal-500 to-cyan-500", size: "sm", accent: "#10b981" },
  { icon: Users, title: "Competitor Analysis", description: "Understand your competitive landscape with AI-powered insights.", gradient: "from-pink-400 via-rose-500 to-red-500", size: "sm", accent: "#ec4899" },
  { icon: Zap, title: "Instant Generation", description: "Complete blueprint in seconds—no waiting.", gradient: "from-purple-400 via-fuchsia-500 to-pink-500", size: "sm", accent: "#a855f7" },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const sizeClasses = {
    lg: "md:col-span-2 md:row-span-2",
    md: "md:col-span-1 md:row-span-2",
    sm: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`feature-card group relative ${sizeClasses[feature.size as keyof typeof sizeClasses]}`}
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
        style={{ background: `linear-gradient(135deg, ${feature.accent}40, transparent)` }}
      />

      {/* Card content */}
      <div className="relative h-full glass rounded-3xl p-6 md:p-8 overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="16" cy="16" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        </div>

        {/* Gradient orb */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

        {/* Icon */}
        <div className="relative z-10 mb-6" style={{ transform: "translateZ(40px)" }}>
          <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10" />
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-2">
            {feature.title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-60 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
          <p className="text-white/50 leading-relaxed text-sm md:text-base">
            {feature.description}
          </p>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        y: 100, opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.1, ease: "power3.out",
      });
      gsap.from(".features-title span", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        y: 80, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-white/60">Powerful Features</span>
          </motion.div>
          
          <h2 className="features-title font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 overflow-hidden">
            <span className="inline-block text-white">Everything to </span>
            <span className="inline-block gradient-text">launch fast</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            AI-powered tools that transform raw ideas into investor-ready blueprints
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: "1000px" }}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
