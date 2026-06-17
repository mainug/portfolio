import Image from "next/image";
import { skillCategories } from "@/data/skills";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Skills() {
  return (
    <section id="skills" className="py-36 px-6 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">
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

        <div className="flex flex-col divide-y divide-white/[0.06]">
          {skillCategories.map((cat, i) => (
            <SectionWrapper key={cat.category} delay={i * 0.08}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 py-8">
                {/* Category label */}
                <div className="w-28 shrink-0 pt-1">
                  <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
                    {cat.category}
                  </span>
                </div>

                {/* Icon grid */}
                <div className="flex flex-wrap gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center gap-2 cursor-default"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-violet-500/40 group-hover:bg-violet-500/[0.07] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/10 transition-all duration-200">
                        {skill.icon ? (
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-sm font-bold text-[var(--muted)]">
                            {skill.name[0]}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[var(--muted)] text-center leading-tight group-hover:text-white transition-colors duration-200 max-w-[52px]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
