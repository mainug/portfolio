"use client";

import dynamic from "next/dynamic";

const ShaderCanvas = dynamic(() => import("@/components/lab/ShaderCanvas"), {
  ssr: false,
});

export default function ShaderClient() {
  return <ShaderCanvas />;
}
