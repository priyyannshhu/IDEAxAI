import { Navbar } from "@/react-app/components/Navbar";
import { Footer } from "@/react-app/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Heart, Rocket, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-white/70">About Us</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About
              <span className="gradient-text"> IDEAxAI</span>
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Empowering entrepreneurs to turn their ideas into actionable startup blueprints using the power of AI.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/60 leading-relaxed">
                  We believe that every great startup begins with an idea. Our mission is to democratize startup planning by providing AI-powered tools that help entrepreneurs—regardless of their background—transform their ideas into comprehensive, actionable blueprints. We're making startup planning accessible, fast, and intelligent.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-3xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-white/60 leading-relaxed">
                  We envision a world where anyone with a startup idea can quickly validate and plan their concept with AI assistance. IDEAxAI aims to be the go-to platform for entrepreneurs, helping them move from ideation to execution faster than ever before.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Powered by AI</h2>
                <p className="text-white/60 leading-relaxed">
                  IDEAxAI leverages Google's Gemini AI to analyze startup ideas and generate comprehensive blueprints. Our AI understands market trends, technical requirements, and business models to provide you with actionable insights tailored to your specific concept.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-white/40 mb-4">Created with love by</p>
<div className="flex items-center justify-center gap-4 text-lg font-medium">
  <a
    href="https://www.linkedin.com/in/ankitaa-singh/"
    target="_blank"
    rel="noopener noreferrer"
    className="gradient-text hover:opacity-80 transition"
  >
    Ankita Singh
  </a>

  <span className="text-white/30">&</span>

  <a
    href="https://www.linkedin.com/in/priyanshu-vishwakarmaa/"
    target="_blank"
    rel="noopener noreferrer"
    className="gradient-text hover:opacity-80 transition"
  >
    Priyanshu Vishwakarma
  </a>
</div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
