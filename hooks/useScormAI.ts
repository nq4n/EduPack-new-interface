"use client";

import { useState, useCallback } from "react";
import { EditorProject } from "@/lib/scorm/types";
import {
  ChatMessage,
  ScormAIHookProps,
} from "@/lib/scorm/ai-types";

type ProgressStatus = "idle" | "active" | "done" | "error";
type ProgressKey = "builder" | "finalize";

export type ProgressStep = {
  key: ProgressKey;
  label: string;
  description: string;
  status: ProgressStatus;
};

const BASE_PROGRESS_STEPS: ProgressStep[] = [
  {
    key: "builder",
    label: "AI lesson builder",
    description: "Analyzing your request and drafting the course",
    status: "idle",
  },
  {
    key: "finalize",
    label: "Finalize",
    description: "Preparing SCORM-ready output",
    status: "idle",
  },
];

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
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(
    BASE_PROGRESS_STEPS,
  );

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
      setIsGenerating(true);
      setProgressMessage("Starting build with AI…");
      setProgressSteps(
        BASE_PROGRESS_STEPS.map((step, index) => ({
          ...step,
          status: index === 0 ? "active" : "idle",
        })),
      );

      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      };

      addMessage(userMessage);
      setChatInput("");

      try {
        setProgressMessage("AI builder is creating your lesson…");
        setProgressSteps((prev) =>
          prev.map((step) =>
            step.key === "builder" ? { ...step, status: "active" } : step,
          ),
        );

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

        setProgressMessage("Finalizing SCORM-ready lesson…");
        setProgressSteps((prev) =>
          prev.map((step) =>
            step.key === "builder"
              ? { ...step, status: "done" }
              : step.key === "finalize"
              ? { ...step, status: "active" }
              : step,
          ),
        );

        addMessage({
          id: Date.now() + 1,
          role: "assistant",
          content: json.content ?? "Lesson generated.",
          agent: json.agent || "unified",
        });

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

        setProgressSteps((prev) =>
          prev.map((step) => ({ ...step, status: "done" })),
        );
        setProgressMessage("Lesson ready. Review and apply the changes.");

      } catch (err: any) {
        console.error("❌ AI Error:", err);

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "AI failed to generate a valid response.",
        });

        setProgressSteps((prev) =>
          prev.map((step) =>
            step.status === "active"
              ? { ...step, status: "error" }
              : step,
          ),
        );
        setProgressMessage(
          err.message || "AI failed to generate a valid response.",
        );
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
    progressMessage,
    progressSteps,
    submitPrompt,
    pendingLesson,
    acceptPendingLesson,
    rejectPendingLesson,
  };
}
