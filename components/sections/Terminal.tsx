"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

type HistoryLine = {
  type: "input" | "output" | "error";
  text: string;
};

const PROMPT = "guest@minwook:~$";

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "사용 가능한 명령어 목록:",
    "",
    "  help          명령어 목록 보기",
    "  whoami        개발자 소개",
    "  skills        기술 스택",
    "  projects      프로젝트 목록",
    "  contact       연락처",
    "  ls            파일 목록",
    "  clear         터미널 초기화",
  ],
  whoami: () => [
    "박민욱 (Park Minwook)",
    "풀스택 개발자",
    "",
    "탄탄한 기본기를 바탕으로 사용자 중심의 웹 서비스를 만드는 개발자입니다.",
    "여러 프로젝트를 통해 맡은 바에 대한 책임과 사용자의 입장에서 생각하는",
    "힘을 기르며 사용자 편의성을 극대화하는 재미를 배웠습니다.",
    "",
    "현재는 효율적인 상태 관리와 컴포넌트 재사용성에 관심을 두고 있습니다.",
  ],
  about: () => COMMANDS.whoami(),
  skills: () => [
    "Languages  : JavaScript  TypeScript  HTML5  CSS3  Java",
    "Frontend   : React  Next.js  Tailwind CSS  Vue.js  Svelte  Bootstrap",
    "Data       : Redux  MySQL  MongoDB",
    "Tools      : Git  GitHub  Node.js  Vite  Webpack  Vercel  Docker  Postman",
  ],
  projects: () => [
    "1. 엔드필드 캘린더",
    "   명일방주: 엔드필드 버전별 이벤트 일정 대시보드",
    "   stack: React · TypeScript · Tailwind CSS · Framer Motion",
    "   → https://github.com/mainug/endfield-calendar",
    "",
    "2. 블루 아카이브 총력전 통계",
    "   총력전 점수 기록 & 분석 대시보드 (Global/JP 지원)",
    "   stack: React · TypeScript · Tailwind CSS",
    "   → https://github.com/mainug/bluearchive-stats",
    "",
    "3. AIC 어시스턴트",
    "   AI 기반 챗봇 웹 애플리케이션",
    "   stack: TypeScript · React · Next.js",
    "   → https://github.com/mainug/AIC-Assistant",
    "",
    "4. 데이터 미니 프로젝트",
    "   → https://github.com/mainug/data-miniproject",
    "",
    "5. Java 미니 프로젝트",
    "   Java 웹 개발자 과정 팀 프로젝트",
    "   → https://github.com/mainug/java-miniproject-2026",
  ],
  contact: () => [
    "Email  : alsdnr0850@gmail.com",
    "GitHub : https://github.com/mainug",
  ],
  ls: () => ["about.txt    skills.txt    projects/    contact.txt"],
  "ls -la": () => [
    "drwxr-xr-x  about.txt",
    "drwxr-xr-x  skills.txt",
    "drwxr-xr-x  projects/",
    "drwxr-xr-x  contact.txt",
  ],
  "cat about.txt": () => COMMANDS.whoami(),
  "cat skills.txt": () => COMMANDS.skills(),
  "cat contact.txt": () => COMMANDS.contact(),
};

const INITIAL_LINES: HistoryLine[] = [
  { type: "output", text: "포트폴리오 터미널에 오신 것을 환영합니다." },
  { type: "output", text: "명령어 목록을 보려면 'help'를 입력하세요." },
  { type: "output", text: "" },
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      if (cmd === "clear") {
        setHistory(INITIAL_LINES);
        setInput("");
        setCmdHistory((prev) => [cmd, ...prev]);
        setCmdIndex(-1);
        return;
      }

      const newLines: HistoryLine[] = [{ type: "input", text: cmd }];
      const handler = COMMANDS[cmd];

      if (handler) {
        handler().forEach((line) =>
          newLines.push({ type: "output", text: line })
        );
      } else {
        newLines.push({
          type: "error",
          text: `명령어를 찾을 수 없습니다: '${cmd}'  →  'help'를 입력해 보세요.`,
        });
      }

      newLines.push({ type: "output", text: "" });
      setHistory((prev) => [...prev, ...newLines]);
      setCmdHistory((prev) => [cmd, ...prev]);
      setCmdIndex(-1);
      setInput("");
    },
    [input]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  };

  return (
    <section id="terminal" className="py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            Interactive
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            터미널{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              체험
            </span>
          </h2>
          <p className="text-[var(--muted)] mb-12">
            명령어를 직접 입력해 저를 탐색해 보세요.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* macOS-style title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1e] border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="flex-1 text-center text-xs text-[var(--muted)] font-mono pr-16">
                bash — portfolio — 80×24
              </span>
            </div>

            {/* Terminal body */}
            <div ref={bodyRef} className="bg-[#0c0c10] p-5 h-96 overflow-y-auto font-mono text-sm leading-7">
              {history.map((line, i) => (
                <div key={i}>
                  {line.type === "input" && (
                    <div className="flex gap-2">
                      <span className="text-cyan-400 shrink-0 select-none">
                        {PROMPT}
                      </span>
                      <span className="text-white">{line.text}</span>
                    </div>
                  )}
                  {line.type === "output" && (
                    <p className="text-[#94a3b8] pl-0 whitespace-pre">
                      {line.text || " "}
                    </p>
                  )}
                  {line.type === "error" && (
                    <p className="text-red-400">{line.text}</p>
                  )}
                </div>
              ))}

              {/* Active input row */}
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <span className="text-cyan-400 shrink-0 select-none">
                  {PROMPT}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-cyan-400"
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                />
              </form>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
