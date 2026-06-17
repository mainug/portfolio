"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Terminal", href: "#terminal" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
          PM
        </span>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/lab"
              className="text-sm px-3 py-1 rounded-full border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 transition-colors duration-200"
            >
              Lab ✦
            </Link>
          </li>
        </ul>
        {/* Mobile menu icon placeholder */}
        <button className="md:hidden flex flex-col gap-1.5 p-1">
          <span className="w-5 h-px bg-[var(--muted)]" />
          <span className="w-5 h-px bg-[var(--muted)]" />
        </button>
      </div>
    </motion.nav>
  );
}
