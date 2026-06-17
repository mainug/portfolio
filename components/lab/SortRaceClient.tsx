"use client";

import dynamic from "next/dynamic";

const SortRace = dynamic(() => import("@/components/lab/SortRace"), { ssr: false });

export default function SortRaceClient() {
  return <SortRace />;
}
