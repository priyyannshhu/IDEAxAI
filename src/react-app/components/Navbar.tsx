import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/generator", label: "Generator" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="IDEAxAI Logo"
              className="w-10 h-10 rounded-xl object-cover"
            />

            <span className="font-display text-xl font-bold gradient-text">
              IDEAxAI
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/generator"
            className="relative group overflow-hidden rounded-xl px-5 py-2.5 font-medium text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <span className="relative text-white">Get Started</span>
          </Link>

        </div>
      </div>
    </motion.nav>
  );
}