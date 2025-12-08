"use client";
console.log("🔑 OpenRouter API Key exists:", !!process.env.OPENROUTER_API_KEY);
import { useState, useCallback } from "react";
import { EditorProject } from "@/lib/scorm/types";
import {
  ChatMessage,
  ScormAIHookProps,
} 

from "@/lib/scorm/ai-types";

// -------------------------------------------
// Extractor for NEW PIPELINE response format
// -------------------------------------------
function extractProject(result: any): EditorProject | null {
  if (!result) return null;

  // New pipeline returns:
  // { agent: "...", content: "...", project: { ... }, metadata: {...} }
  if (result.project && Array.isArray(result.project.pages)) {
    return result.project as EditorProject;
  }

  console.warn("⚠️ extractProject(): no valid project found in:", result);
  return null;
}

export function useScormAI({
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

  // Holds the whole pipeline result
  const [pendingLesson, setPendingLesson] = useState<any | null>(null);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  // -------------------------------------------
  // ACCEPT AI LESSON
  // -------------------------------------------
  const acceptPendingLesson = () => {
    if (!pendingLesson) return;

    const newProject = extractProject(pendingLesson);
    if (!newProject) {
      console.error("❌ No valid project in pendingLesson:", pendingLesson);
      return;
    }

    setProject(newProject);

    // Autofocus first page
    if (newProject.pages.length > 0) {
      setActivePageId(newProject.pages[0].id);
      setSelectedBlockId(null);

      const ids = newProject.pages.flatMap((p) =>
        (p.blocks ?? []).map((b) => b.id)
      );

      onLessonApplied(ids);
    }

    setPendingLesson(null);

    // Switch UI back to editor mode
    setEditorMode("ai");
    setAiChatMode("hidden");
  };

  const rejectPendingLesson = () => setPendingLesson(null);

  // -------------------------------------------
  // SEND PROMPT → AI PIPELINE
  // -------------------------------------------
  const submitPrompt = useCallback(
    async (prompt: string, isInitialGeneration: boolean) => {
      if (!prompt.trim()) return;

      setIsGenerating(true);

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
        credentials: "include", // 🔥 IMPORTANT FIX
        body: JSON.stringify({ messages: payloadMessages }),
      });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "AI generation failed");
        }

        console.debug("🔵 Pipeline result:", json);

        // Add AI assistant message (text only)
        addMessage({
          id: Date.now() + 1,
          role: "assistant",
          content: json.content ?? "Lesson generated.",
        });

        // The pipeline result is at json (not json.result anymore)
        const project = extractProject(json);

        if (project) {
          setPendingLesson(json);

          if (isInitialGeneration) {
            setAiChatMode("animating");

            setTimeout(() => {
              setAiChatMode("hidden");
              setEditorMode("ai");
            }, 600);
          }
        }
      } catch (err: any) {
        console.error("❌ AI Error:", err);

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "AI failed to generate a valid response.",
        });
      } finally {
        setIsGenerating(false);
      }
    },
    [messages, setAiChatMode, setEditorMode]
  );

  return {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    submitPrompt,
    pendingLesson,
    acceptPendingLesson,
    rejectPendingLesson,
  };
}
