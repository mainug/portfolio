import Link from "next/link";
import ForceGraphClient from "@/components/lab/ForceGraphClient";

export const metadata = {
  title: "기술 스택 그래프 | Lab",
};

export default function ForceGraphPage() {
  return (
    <main className="h-screen bg-[var(--background)] flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06] shrink-0">
        <Link
          href="/lab"
          className="text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          ← Lab
        </Link>

        <div className="text-center">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-0.5">
            Interactive
          </p>
          <h1 className="text-sm font-semibold">기술 스택 그래프</h1>
        </div>

        <p className="text-[11px] text-[var(--muted)]/50 hidden sm:block">
          드래그 · 스크롤로 줌
        </p>
      </header>

      <div className="flex-1 relative">
        <ForceGraphClient />
      </div>
    </main>
  );
}
