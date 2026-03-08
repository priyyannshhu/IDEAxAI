import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        y: 80, opacity: 0, scale: 0.9, duration: 1, ease: "power3.out",
      });
      gsap.from(".cta-ring", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        scale: 0, opacity: 0, duration: 1.5, stagger: 0.2, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 px-6 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/50 to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-conic from-indigo-500/20 via-purple-500/20 via-pink-500/20 via-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Pulsing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="cta-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: 200 + i * 150, height: 200 + i * 150 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto">
        <div className="cta-content relative">
          {/* Glowing border card */}
          <div className="relative group">
            {/* Animated border */}
            <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-cyan-500 opacity-60 blur-sm animate-gradient bg-[length:400%_400%]" />
            <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-cyan-500 opacity-80 animate-gradient bg-[length:400%_400%]" />
            
            {/* Card content */}
            <div className="relative rounded-[2.5rem] bg-[#0d1225]/95 backdrop-blur-xl p-12 md:p-16 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/70">Free to use • No signup required</span>
              </motion.div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to build your
                <br />
                <span className="gradient-text">startup blueprint?</span>
              </h2>
              
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
                Transform your idea into a comprehensive plan in under 30 seconds. Get started now—it's completely free.
              </p>

              {/* CTA Button */}
              <Link to="/generator" className="group/btn relative inline-flex">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-80 transition-opacity animate-pulse" />
                <div className="relative px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-lg flex items-center gap-3 text-white shadow-2xl shadow-purple-500/25 group-hover/btn:shadow-purple-500/40 transition-shadow">
                  <span>Start Generating</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </Link>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 mt-12 text-white/30 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  10K+ blueprints generated
                </span>
                <span className="hidden sm:block">•</span>
                <span className="hidden sm:block">Trusted by founders worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
