import { Code, Layout, Database, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import SectionWrapper from "@/components/ui/SectionWrapper";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Layout,
  Database,
  Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="py-36 px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            기술{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              스택
            </span>
          </h2>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <SectionWrapper key={cat.category} delay={i * 0.1}>
                <div className="group p-7 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-violet-500/35 hover:bg-violet-500/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/25 to-cyan-600/15 flex items-center justify-center group-hover:from-violet-600/40 transition-all duration-300">
                      <Icon className="w-5 h-5 text-violet-300" />
                    </div>
                    <h3 className="font-semibold text-white/90">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-white/[0.06] border border-white/[0.08] text-[var(--muted)] hover:border-cyan-400/35 hover:text-cyan-300 transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
