"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), {
  ssr: false,
});

const nameChars = "박민욱".split("");

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js particle field — z-0, fills entire hero */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-600/20 blur-[80px] animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px] animate-float-reverse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-violet-400/10 blur-[60px] animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-[var(--muted)] tracking-[0.4em] uppercase mb-8"
        >
          Portfolio
        </motion.p>

        {/* Name — char by char stagger */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.12, ease: "easeOut" }}
              className="text-7xl md:text-8xl lg:text-[10rem] font-black bg-gradient-to-br from-white via-violet-100 to-cyan-300 bg-clip-text text-transparent leading-none"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* English name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="text-base md:text-lg text-[var(--muted)] tracking-[0.35em] mb-14"
        >
          PARK MINWOOK
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            연락하기
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[var(--muted)]/60 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-violet-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
