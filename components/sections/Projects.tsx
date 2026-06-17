import { ExternalLink } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { projects } from "@/data/projects";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Projects() {
  return (
    <section id="projects" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            주요{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              프로젝트
            </span>
          </h2>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <SectionWrapper key={project.id} delay={i * 0.07}>
              <div className="group h-full flex flex-col p-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-violet-500/35 hover:bg-violet-500/[0.04] hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white/90 mb-2 group-hover:text-violet-300 transition-colors duration-200">
                    {project.nameKo}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      라이브
                    </a>
                  )}
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
