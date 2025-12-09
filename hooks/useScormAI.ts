"use client";

import { useState, useCallback, useEffect } from "react";
import { EditorProject } from "@/lib/scorm/types";
import {
  ChatMessage,
  ScormAIHookProps,
} from "@/lib/scorm/ai-types";
import { mergeProject } from "@/lib/ai/merge";

function extractProject(result: any): EditorProject | null {
  if (!result) return null;

  if (result.project && Array.isArray(result.project.pages)) {
    return result.project as EditorProject;
  }

  console.warn("⚠️ extractProject(): no valid project found in:", result);
  return null;
}

export function useScormAI({
  project,
  setProject,
  setActivePageId,
  setSelectedBlockId,
  setEditorMode,
  setAiChatMode,
  initialMessages,
  onLessonApplied,
}: ScormAIHookProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMessage, setProgressMessage] = useState<string>("");

  useEffect(() => {
    if (initialMessages.length > 0 && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, messages.length]);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const submitPrompt = useCallback(
    async (prompt: string, _isInitialGeneration: boolean) => {
      if (!prompt.trim()) return;
      setIsGenerating(true);
      setProgressMessage("Generating lesson…");

      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      };

      addMessage(userMessage);
      setChatInput("");

      try {
        const payloadMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/scorm/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ messages: payloadMessages, project }),
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "AI generation failed");
        }

        addMessage({
          id: Date.now() + 1,
          role: "assistant",
          content: json.content ?? "Lesson generated.",
          agent: json.agent || "unified",
        });

        const isModifyMode = json.mode === "modify";
        const deltaProject = extractProject({ project: json.delta });
        const aiProject = extractProject(json);

        if (aiProject) {
          const updatedProject = isModifyMode && deltaProject
            ? mergeProject(project, deltaProject)
            : aiProject;

          setProject(updatedProject);

          const updatedPages = updatedProject.pages ?? [];
          const fallbackPageId = updatedPages[0]?.id ?? null;

          setActivePageId((prev) => prev && updatedPages.some((p) => p.id === prev) ? prev : fallbackPageId);
          setSelectedBlockId(null);

          const changedBlockIds = (deltaProject?.pages ?? updatedPages).flatMap((p) =>
            (p.blocks ?? []).map((b) => b.id),
          );

          onLessonApplied(changedBlockIds);

          setEditorMode("ai");
          setAiChatMode("hidden");
        }

        setProgressMessage("Lesson ready. Review and apply the changes.");
      } catch (err: any) {
        console.error("❌ AI Error:", err);

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "AI failed to generate a valid response.",
        });

        setProgressMessage(err.message || "AI failed to generate a valid response.");
      } finally {
        setIsGenerating(false);
      }
    },
    [messages, project, setAiChatMode, setEditorMode, setProject],
  );

  return {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    progressMessage,
    submitPrompt,
  };
}
