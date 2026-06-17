import Link from "next/link";

const demos = [
  {
    slug: "force-graph",
    title: "기술 스택 그래프",
    description:
      "기술 스택을 물리 시뮬레이션으로 연결한 인터랙티브 네트워크. 노드를 드래그하거나 스크롤로 줌 인/아웃 할 수 있어요.",
    tag: "d3-force · SVG",
  },
  {
    slug: "shader",
    title: "유체 시뮬레이션",
    description:
      "GLSL 도메인 워핑으로 구현한 실시간 유체 셰이더. 마우스를 움직이면 흐름이 반응해요.",
    tag: "WebGL · GLSL",
  },
  {
    slug: "sort-race",
    title: "정렬 알고리즘 레이스",
    description:
      "Bubble · Insertion · Merge · Quick Sort가 동시에 경주. 속도를 조절하며 O(n²) vs O(n log n) 차이를 눈으로 확인해요.",
    tag: "Algorithm · Animation",
  },
];

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          ← 돌아가기
        </Link>

        <div className="mt-12 mb-16">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted)] mb-4">
            Interactive
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Lab{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              실험실
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/lab/${demo.slug}`}
              className="group block p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-500/[0.04] transition-all duration-300"
            >
              <h2 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                {demo.title}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                {demo.description}
              </p>
              <span className="text-[10px] tracking-widest text-[var(--muted)]/50 uppercase">
                {demo.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
