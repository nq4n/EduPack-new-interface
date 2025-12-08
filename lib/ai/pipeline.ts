// lib/ai/pipeline.ts

import { mentorStage } from "./agents/mentor";
import { architectStage } from "./agents/architect";
import { deepResearchStage } from "./agents/deepresearch";
import { normalizeLesson } from "./utils/normalize";
import { sanitizeText } from "./utils/sanitize";
import { safeParseProject } from "./ai-schema";

// Use Next.js built-in UUID generator
const uuid = () => crypto.randomUUID();

/**
 * Full SCORM AI Pipeline:
 * Mentor → Architect → Deep Research → Normalize → SCORM JSON
 */

export async function runAIPipeline(messages: any[]) {
  const cleanedMessages = messages.map((m: any) => ({
    role: m.role,
    content: sanitizeText(m.content),
  }));

  const mentorOut = await mentorStage(cleanedMessages);
  const architectOut = await architectStage(mentorOut);
  const enrichedOut = await deepResearchStage(architectOut);

  const normalized = normalizeLesson(enrichedOut);

  const projectJson = {
    id: `proj-${uuid()}`,
    title: normalized.title,
    version: "1.2",
    theme: {
      direction: "ltr",
      styles: {},
    },
    tracking: {
      level: "standard",
      pageViews: true,
      quizInteractions: true,
      media: true,
      hints: false,
      externalLinks: false,
      timePerPage: true,
      attempts: true,
    },
    xapi: {
      lrsEndpoint: "",
      authToken: "",
      activityIdFormat: "iri",
      statementExtensions: "{}",
    },
    pages: normalized.pages.map((p) => ({
      id: `page-${uuid()}`,
      title: p.title,
      blocks: p.blocks.map((b) => ({
        id: `block-${uuid()}`,
        type: b.type,
        html: b.type === "text" ? sanitizeText(b.content || "") : undefined,
        src: b.type === "image" ? "" : undefined,
        question: b.type === "quiz" ? (b.content || "") : undefined,
        options: b.type === "quiz" ? [] : undefined,
      })),
    })),
  };

  const finalProject = safeParseProject(projectJson);

  return {
    agent: "pipeline",
    content: "Lesson generated successfully.",
    project: finalProject,
    warnings: [],
    metadata: {
      predictedDifficulty: "medium",
      recommendedTags: [],
      routerSummary: "",
      routing: {},
    },
  };
}
