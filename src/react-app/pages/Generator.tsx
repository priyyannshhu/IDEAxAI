import { useState } from "react";
import { Navbar } from "@/react-app/components/Navbar";
import { Footer } from "@/react-app/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Lightbulb,
  AlertTriangle,
  Users,
  Layers,
  Cpu,
  DollarSign,
  Megaphone,
  Trophy,
  Star,
  CheckCircle,
  Map,
  Copy,
  Check,
} from "lucide-react";
import { StartupBlueprint } from "@/shared/types";

const blueprintSections = [
  {
    key: "startupOverview",
    title: "Startup Overview",
    icon: Lightbulb,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    key: "problemStatement",
    title: "Problem Statement",
    icon: AlertTriangle,
    gradient: "from-red-400 to-rose-500",
  },
  {
    key: "targetAudience",
    title: "Target Audience",
    icon: Users,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    key: "mvpFeatures",
    title: "MVP Features",
    icon: Layers,
    gradient: "from-indigo-400 to-violet-500",
  },
  {
    key: "techStack",
    title: "Tech Stack",
    icon: Cpu,
    gradient: "from-cyan-400 to-teal-500",
  },
  {
    key: "revenueModel",
    title: "Revenue Model",
    icon: DollarSign,
    gradient: "from-emerald-400 to-green-500",
  },
  {
    key: "marketingStrategy",
    title: "Marketing Strategy",
    icon: Megaphone,
    gradient: "from-pink-400 to-rose-500",
  },
  {
    key: "competitorAnalysis",
    title: "Competitor Analysis",
    icon: Trophy,
    gradient: "from-purple-400 to-fuchsia-500",
  },
  {
    key: "uniqueValueProposition",
    title: "Unique Value Proposition",
    icon: Star,
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    key: "validationStrategy",
    title: "Validation Strategy",
    icon: CheckCircle,
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    key: "developmentRoadmap",
    title: "Development Roadmap",
    icon: Map,
    gradient: "from-violet-400 to-purple-500",
  },
] as const;

export default function Generator() {
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<StartupBlueprint | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim() || idea.trim().length < 10) {
      setError(
        "Please describe your startup idea in more detail (at least 10 characters)",
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    setBlueprint(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? ""}/api/generate-blueprint`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: idea.trim() }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "AI generation failed. Please try again.");
        return;
      }

      setBlueprint(data.blueprint);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (key: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

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
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/70">
                AI-Powered Generator
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Generate Your
              <br />
              <span className="gradient-text">Startup Blueprint</span>
            </h1>

            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Describe your startup idea and let AI create a comprehensive
              blueprint including MVP features, tech stack, revenue models, and
              more.
            </p>
          </motion.div>

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  placeholder="Describe your startup idea..."
                  disabled={isGenerating}
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none disabled:opacity-50 overflow-y-auto scrollbar-none"
                />
                <div className="absolute bottom-4 right-4 text-xs text-white/30">
                  {idea.length} characters
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || idea.trim().length < 10}
                className="w-full group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:scale-105 group-disabled:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity group-disabled:opacity-30" />
                <span className="relative flex items-center justify-center gap-2 text-white">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating startup blueprint...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Startup Blueprint
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {blueprint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                    Your Startup Blueprint
                  </h2>
                  <p className="text-white/50">
                    Generated AI analysis for your startup idea
                  </p>
                </div>

                <div className="grid gap-6">
                  {blueprintSections.map((section, index) => {
                    const content =
                      blueprint[section.key as keyof StartupBlueprint];
                    const Icon = section.icon;
                    const isCopied = copiedSection === section.key;

                    return (
                      <motion.div
                        key={section.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative"
                      >
                        <div className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-display text-xl font-semibold text-white">
                                  {section.title}
                                </h3>
                                <button
                                  onClick={() =>
                                    copyToClipboard(section.key, content)
                                  }
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all text-sm"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-4 h-4 text-green-400" />
                                      <span className="text-green-400">
                                        Copied!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="text-white/60 leading-relaxed whitespace-pre-wrap">
                                {content
                                  .split(/\*\*(.*?)\*\*/g)
                                  .map((part, i) =>
                                    i % 2 === 1 ? (
                                      <strong
                                        key={i}
                                        className="text-white/90 font-semibold"
                                      >
                                        {part}
                                      </strong>
                                    ) : (
                                      part
                                    ),
                                  )}
                              </div>
                            </div>
                          </div>

                          {/* Hover glow */}
                          <div
                            className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Generate another */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center pt-8"
                >
                  <button
                    onClick={() => {
                      setBlueprint(null);
                      setIdea("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Another Blueprint
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!blueprint && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-white/30 py-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white/20" />
              </div>
              <p>Enter your startup idea above to generate a blueprint</p>
            </motion.div>
          )}

          {/* Loading state animation */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center glow">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xl text-white font-medium mb-2">
                    Generating your blueprint...
                  </p>
                  <p className="text-white/50">
                    AI is analyzing your idea and creating comprehensive
                    insights
                  </p>
                </div>
                {/* Animated progress indicators */}
                <div className="flex items-center gap-2 mt-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.5, opacity: 0.3 }}
                      animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
