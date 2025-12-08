// lib/ai/ai-schema.ts
import { z } from "zod";

/**
 * --------------------------
 * Block Schemas
 * --------------------------
 */

const TextBlockSchema = z.object({
  type: z.literal("text"),
  id: z.string(),
  html: z.string().default(""),
  style: z.any().optional(),
});

const ImageBlockSchema = z.object({
  type: z.literal("image"),
  id: z.string(),
  src: z.string().default(""),
  alt: z.string().optional(),
});

const VideoBlockSchema = z.object({
  type: z.literal("video"),
  id: z.string(),
  src: z.string().default(""),
});

const QuizOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  correct: z.boolean().optional(),
});

const QuizBlockSchema = z.object({
  type: z.literal("quiz"),
  id: z.string(),
  question: z.string().default(""),
  questionHtml: z.string().optional(),
  questionStyle: z.any().optional(),
  options: z.array(QuizOptionSchema).default([]),
  style: z.any().optional(),
  optionStyle: z.any().optional(),
});

const InteractiveBlockSchema = z.object({
  type: z.literal("interactive"),
  id: z.string(),
  variant: z.enum(["button", "callout", "reveal", "custom"]).default("button"),
  label: z.string().default("Interactive element"),
  url: z.string().optional(),
  bodyHtml: z.string().optional(),
  initiallyOpen: z.boolean().optional(),
  tone: z.enum(["info", "success", "warning", "danger"]).optional(),
  style: z.any().optional(),
});

// --------------------------

export const BlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  ImageBlockSchema,
  VideoBlockSchema,
  QuizBlockSchema,
  InteractiveBlockSchema,
]);

/**
 * --------------------------
 * Page Schema
 * --------------------------
 */
export const PageSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled Page"),
  blocks: z.array(BlockSchema).default([]),
});

/**
 * --------------------------
 * Project Schema
 * --------------------------
 */
export const ProjectSchema = z.object({
  id: z.string().default(() => `proj-${Date.now()}`),
  title: z.string().default("Untitled Lesson"),
  version: z.enum(["1.2", "2004"]).optional().default("1.2"),

  theme: z.object({
    direction: z.enum(["ltr", "rtl"]).default("ltr"),
    styles: z.any().default({}),
  }),

  tracking: z.object({
    level: z.enum(["minimal", "standard", "advanced"]).default("standard"),
    pageViews: z.boolean().default(true),
    quizInteractions: z.boolean().default(true),
    media: z.boolean().default(true),
    hints: z.boolean().default(false),
    externalLinks: z.boolean().default(false),
    timePerPage: z.boolean().default(true),
    attempts: z.boolean().default(true),
  }),

  xapi: z.object({
    lrsEndpoint: z.string().default(""),
    authToken: z.string().default(""),
    activityIdFormat: z.string().default("iri"),
    statementExtensions: z.string().default("{}"),
  }),

  pages: z.array(PageSchema).default([]),
});

/**
 * --------------------------
 * Lesson Result Schema
 * --------------------------
 */
export const BuildLessonResultSchema = z.object({
  project: ProjectSchema,
  warnings: z.array(z.string()).default([]),
  metadata: z.object({
    predictedDifficulty: z.enum(["easy", "medium", "hard"]).default("easy"),
    recommendedTags: z.array(z.string()).default([]),
    routerSummary: z.string().default(""),
    routing: z.any(),
  }),
});

/**
 * Auto-parse with fallback
 */
export function safeParseProject(json: any) {
  const res = ProjectSchema.safeParse(json);
  if (res.success) return res.data;

  console.warn("⚠️ AI returned invalid JSON, applying fallback normalization.");
  console.warn(res.error.format());

  // fallback to an empty-but-valid project
  return ProjectSchema.parse({});
}
