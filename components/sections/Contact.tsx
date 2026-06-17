"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import SectionWrapper from "@/components/ui/SectionWrapper";

const EMAIL = "alsdnr0850@gmail.com";
const GITHUB_URL = "https://github.com/mainug";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-36 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto text-center">
        <SectionWrapper>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            함께{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              만들어요
            </span>
          </h2>
          <p className="text-[var(--muted)] text-lg leading-relaxed mb-14">
            새로운 기회나 협업에 항상 열려 있습니다.
            <br />
            편하게 연락해 주세요.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Email copy */}
            <button
              onClick={handleCopy}
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-violet-500/35 hover:bg-violet-500/[0.04] transition-all duration-300 w-full sm:w-auto text-left"
            >
              <Mail className="w-5 h-5 text-violet-400 shrink-0" />
              <span className="text-sm flex-1">{EMAIL}</span>
              <span className="text-[var(--muted)] group-hover:text-white transition-colors shrink-0">
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </span>
            </button>

            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-violet-500/35 hover:bg-violet-500/[0.04] transition-all duration-300 w-full sm:w-auto"
            >
              <GithubIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">github.com/mainug</span>
            </a>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.3}>
          <p className="mt-24 text-xs text-[var(--muted)]/50">
            © 2026 Park Minwook · Built with Next.js & Framer Motion
          </p>
        </SectionWrapper>
      </div>
    </section>
  );
}
