"use client";

import { useState, useCallback } from "react";
import { EditorProject } from "@/lib/scorm/types";
import {
  ChatMessage,
  ScormAIHookProps,
} from "@/lib/scorm/ai-types";

// -------------------------------------------
// Extractor for NEW PIPELINE response format
// -------------------------------------------
function extractProject(result: any): EditorProject | null {
  if (!result) return null;

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

  // Public → AI allowed once only
  const [aiUsedOnce, setAiUsedOnce] = useState(false);

  // NEW: UI progress step
  const [progress, setProgress] = useState<string>("idle");

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

    if (newProject.pages.length > 0) {
      setActivePageId(newProject.pages[0].id);
      setSelectedBlockId(null);

      const ids = newProject.pages.flatMap((p) =>
        (p.blocks ?? []).map((b) => b.id)
      );

      onLessonApplied(ids);
    }

    setPendingLesson(null);
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

      // 🔥 AFTER the first use → require login
      if (aiUsedOnce) {
        alert("Please log in to continue using AI features.");
        window.location.href = "/login";
        return;
      }

      setIsGenerating(true);
      setProgress("Starting…");

      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      };

      addMessage(userMessage);
      setChatInput("");

      try {
        // -------------------------
        // UI Progress simulation
        // -------------------------
        setProgress("Mentor agent is analyzing your request…");
        await new Promise((r) => setTimeout(r, 350));

        setProgress("Architect agent is building lesson structure…");
        await new Promise((r) => setTimeout(r, 350));

        setProgress("Deep Research agent is expanding content…");
        await new Promise((r) => setTimeout(r, 350));

        setProgress("Finalizing SCORM-ready lesson…");

        // -------------------------
        // Real API request
        // -------------------------
        const payloadMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/scorm/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ messages: payloadMessages }),
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "AI generation failed");
        }

        setProgress("Almost done…");

        addMessage({
          id: Date.now() + 1,
          role: "assistant",
          content: json.content ?? "Lesson generated.",
        });

        const project = extractProject(json);

        if (project) {
          setPendingLesson(json);

          // Mark one-time free use consumed
          setAiUsedOnce(true);

          if (isInitialGeneration) {
            setAiChatMode("animating");
            setTimeout(() => {
              setAiChatMode("hidden");
              setEditorMode("ai");
            }, 600);
          }
        }

        setProgress("done");

      } catch (err: any) {
        console.error("❌ AI Error:", err);

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "AI failed to generate a valid response.",
        });

        setProgress("error");
      } finally {
        setIsGenerating(false);
      }
    },
    [messages, aiUsedOnce, setAiChatMode, setEditorMode]
  );

  return {
    messages,
    chatInput,
    setChatInput,
    isGenerating,
    progress,          // ← EXPOSE IT TO UI
    submitPrompt,
    pendingLesson,
    acceptPendingLesson,
    rejectPendingLesson,
  };
}
