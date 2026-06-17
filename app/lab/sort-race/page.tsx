import Link from "next/link";
import SortRaceClient from "@/components/lab/SortRaceClient";

export const metadata = { title: "정렬 알고리즘 레이스 | Lab" };

export default function SortRacePage() {
  return (
    <>
      <div className="fixed top-5 left-6 z-50">
        <Link href="/lab" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
          ← Lab
        </Link>
      </div>
      <SortRaceClient />
    </>
  );
}
