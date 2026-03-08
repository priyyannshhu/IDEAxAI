import { Navbar } from "@/react-app/components/Navbar";
import { Footer } from "@/react-app/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenLine, Cpu, FileCheck, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Describe Your Idea",
    description: "Enter a brief description of your startup idea. It can be as simple as 'AI fitness coaching app' or a more detailed concept. The more context you provide, the better the results.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analyzes & Plans",
    description: "Our advanced AI powered by Google Gemini analyzes your idea, researches market trends, identifies potential competitors, and creates a comprehensive startup blueprint tailored to your concept.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Your Blueprint",
    description: "Receive a complete startup blueprint including startup overview, problem statement, target audience, MVP features, tech stack, revenue model, marketing strategy, and development roadmap.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/70">Simple & Powerful</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              How
              <span className="gradient-text"> IDEAxAI </span>
              Works
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Transform your startup idea into a comprehensive blueprint in three simple steps
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                  {/* Step number background */}
                  <div className="absolute top-0 right-0 font-display text-[12rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none">
                    {step.number}
                  </div>

                  <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-sm font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                          STEP {step.number}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-12 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Link
              to="/generator"
              className="group inline-flex items-center gap-3 relative overflow-hidden rounded-2xl px-10 py-5 font-semibold text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative text-white">Try It Now</span>
              <ArrowRight className="relative w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
