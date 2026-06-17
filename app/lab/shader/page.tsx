import Link from "next/link";
import ShaderClient from "@/components/lab/ShaderClient";

export const metadata = {
  title: "유체 시뮬레이션 | Lab",
};

export default function ShaderPage() {
  return (
    <main className="h-screen bg-black overflow-hidden relative">
      {/* Full-screen shader */}
      <div className="absolute inset-0">
        <ShaderClient />
      </div>

      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 bg-gradient-to-b from-black/70 via-black/20 to-transparent">
        <Link
          href="/lab"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Lab
        </Link>

        <div className="text-center">
          <p className="text-[9px] tracking-[0.35em] uppercase text-white/40 mb-0.5">
            Shader
          </p>
          <h1 className="text-sm font-semibold text-white/90">
            유체 시뮬레이션
          </h1>
        </div>

        <p className="text-[11px] text-white/35 hidden sm:block">
          마우스를 움직여보세요
        </p>
      </header>
    </main>
  );
}
