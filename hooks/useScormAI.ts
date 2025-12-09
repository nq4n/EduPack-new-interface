"use client";

import { useState, useCallback } from "react";
import { EditorProject } from "@/lib/scorm/types";
<<<<<<< HEAD
import { ChatMessage, ScormAIHookProps } from "@/lib/scorm/ai-types";
=======
import {
  ChatMessage,
  ScormAIHookProps,
} from "@/lib/scorm/ai-types";
import { mergeProject } from "@/lib/ai/merge";
>>>>>>> aea17997ec34750023d5e6007a2dad212edfe75d

// --------------------------------------------------------
// Extract SCORM project from pipeline result
// --------------------------------------------------------
function extractProject(result: any): EditorProject | null {
  if (!result) return null;

  if (result.project && Array.isArray(result.project.pages)) {
    return result.project as EditorProject;
  }

  console.warn("⚠️ extractProject(): no valid project found in:", result);
  return null;
}

// --------------------------------------------------------
// MAIN HOOK
// --------------------------------------------------------
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
  const [progressMessage, setProgressMessage] = useState("");

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

<<<<<<< HEAD
  // --------------------------------------------------------
  // ACCEPT PENDING LESSON → Insert into SCORM editor
  // --------------------------------------------------------
 const acceptPendingLesson = () => {
  if (!pendingLesson) return;

  const newProject = extractProject(pendingLesson);
  if (!newProject) {
    console.error("❌ No valid project in pendingLesson:", pendingLesson);
    return;
  }

  // 🔥 FIX: Ensure required fields exist
  if (!newProject.theme) {
    newProject.theme = {
      direction: "ltr",
      styles: {}
    };
  }

  if (!newProject.tracking) {
    newProject.tracking = {
      level: "standard",
      pageViews: true,
      quizInteractions: true,
      media: true,
      hints: false,
      externalLinks: false,
      timePerPage: true,
      attempts: true
    };
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

  // --------------------------------------------------------
  // SEND PROMPT → API → AI AGENT
  // --------------------------------------------------------
=======
>>>>>>> aea17997ec34750023d5e6007a2dad212edfe75d
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
          agent: json.agent || "fast-agent",
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

        setProgressMessage("Lesson ready. Review and apply.");
      } catch (err: any) {
        console.error("❌ AI Error:", err);

        addMessage({
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "AI failed to generate a valid response.",
        });

        setProgressMessage(
          err.message || "AI failed to generate a valid response."
        );
      } finally {
        setIsGenerating(false);
      }
    },
<<<<<<< HEAD
    [messages, setAiChatMode, setEditorMode]
=======
    [messages, project, setAiChatMode, setEditorMode, setProject],
>>>>>>> aea17997ec34750023d5e6007a2dad212edfe75d
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
