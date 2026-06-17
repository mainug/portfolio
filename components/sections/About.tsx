import SectionWrapper from "@/components/ui/SectionWrapper";

const highlights = [
  { label: "사용자 중심 설계", icon: "👤" },
  { label: "상태 관리 최적화", icon: "⚡" },
  { label: "컴포넌트 재사용성", icon: "🔧" },
  { label: "팀 협업", icon: "🤝" },
];

export default function About() {
  return (
    <section id="about" className="py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-14">
            안녕하세요,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              박민욱
            </span>
            입니다.
          </h2>
        </SectionWrapper>

        <SectionWrapper delay={0.12}>
          <p className="text-lg text-[var(--muted)] leading-[1.9] max-w-2xl">
            탄탄한 기본기를 바탕으로 사용자 중심의 웹 서비스를 만드는 개발자입니다.
            여러 프로젝트를 통해 맡은 바에 대한 책임과 사용자의 입장에서 생각하는
            힘을 기르며 사용자 편의성을 극대화하는 재미를 배웠습니다.
          </p>
          <p className="text-lg text-[var(--muted)] leading-[1.9] max-w-2xl mt-5">
            현재는 효율적인 상태 관리와 컴포넌트 재사용성에 관심을 두고, 동료들과
            함께 성장하는 개발자가 되기 위해 노력하고 있습니다.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.25}>
          <div className="mt-12 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-[var(--muted)]"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
