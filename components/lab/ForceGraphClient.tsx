"use client";

import dynamic from "next/dynamic";

const ForceGraph = dynamic(() => import("@/components/lab/ForceGraph"), {
  ssr: false,
});

export default function ForceGraphClient() {
  return <ForceGraph />;
}
