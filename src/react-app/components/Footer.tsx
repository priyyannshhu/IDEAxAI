import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold gradient-text">
              IDEAxAI
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link to="/generator" className="hover:text-white/60 transition-colors">Generator</Link>
            <Link to="/how-it-works" className="hover:text-white/60 transition-colors">How It Works</Link>
            <Link to="/about" className="hover:text-white/60 transition-colors">About</Link>
          </div>

<div className="flex items-center gap-1.5 text-sm text-white/40">
  <span>Made with</span>
  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
  <span>by</span>

  <a
    href="https://www.linkedin.com/in/ankitaa-singh/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-white transition"
  >
    Ankita Singh
  </a>

  <span>&</span>

  <a
    href="https://www.linkedin.com/in/priyanshu-vishwakarmaa/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-white transition"
  >
    Priyanshu Vishwakarma
  </a>
</div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-white/30">
          © {new Date().getFullYear()} IDEAxAI. Transform ideas into reality.
        </div>
      </div>
    </footer>
  );
}
