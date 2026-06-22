"use client";

import dynamic from "next/dynamic";

const AiAssistant = dynamic(() => import("@/app/components/ai-assistant/ai-assistant"), {
  ssr: false,
  loading: () => null,
});

export default function AiAssistantLazy() {
  return <AiAssistant />;
}
