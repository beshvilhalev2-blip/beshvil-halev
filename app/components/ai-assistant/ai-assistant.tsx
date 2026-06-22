"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useState } from "react";
import AiAssistantFloatingButton from "@/app/components/ai-assistant/ai-assistant-floating-button";
import { createWelcomeMessage } from "@/lib/ai-assistant/constants";
import { OPEN_AI_ASSISTANT_EVENT } from "@/lib/ai-assistant/events";
import type { AiAssistantMessage } from "@/lib/ai-assistant/types";

const AiAssistantChatPanel = dynamic(
  () => import("@/app/components/ai-assistant/ai-assistant-chat-panel"),
  { ssr: false },
);

const REPLY_DELAY_MS = 500;

function createMessageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AiAssistant() {
  const instanceId = useId();
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AiAssistantMessage[]>(() => [
    createWelcomeMessage(),
  ]);

  const closePanel = useCallback(() => {
    setOpen(false);
  }, []);

  const openPanel = useCallback(() => {
    setPanelMounted(true);
    setOpen(true);
  }, []);

  const sendMessage = useCallback(
    async (rawText: string, suggestionId?: string) => {
      const trimmed = rawText.trim();
      if (!trimmed || isTyping) {
        return;
      }

      const userMessage: AiAssistantMessage = {
        id: createMessageId("user"),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, userMessage]);
      setInputValue("");
      setIsTyping(true);

      await new Promise((resolve) => {
        window.setTimeout(resolve, REPLY_DELAY_MS);
      });

      const { searchAssistantTrips } = await import("@/lib/ai-assistant/search-trips");
      const result = searchAssistantTrips(trimmed, suggestionId);

      const assistantMessage: AiAssistantMessage = {
        id: createMessageId("assistant"),
        role: "assistant",
        content: result.intro,
        recommendations: result.recommendations,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    },
    [isTyping],
  );

  const handleSend = useCallback(() => {
    void sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleSuggestionClick = useCallback(
    (prompt: string, suggestionId: string) => {
      setInputValue(prompt);
      void sendMessage(prompt, suggestionId);
    },
    [sendMessage],
  );

  useEffect(() => {
    const onOpenRequest = () => {
      openPanel();
    };

    window.addEventListener(OPEN_AI_ASSISTANT_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_AI_ASSISTANT_EVENT, onOpenRequest);
  }, [openPanel]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePanel, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div data-ai-assistant-root={instanceId}>
      <AiAssistantFloatingButton onOpen={openPanel} hidden={open} />
      {panelMounted ? (
        <AiAssistantChatPanel
          open={open}
          messages={messages}
          inputValue={inputValue}
          isTyping={isTyping}
          onClose={closePanel}
          onInputChange={setInputValue}
          onSend={handleSend}
          onSuggestionClick={handleSuggestionClick}
        />
      ) : null}
    </div>
  );
}
