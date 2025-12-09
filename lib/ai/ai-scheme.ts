// lib/ai/ai-schema.ts
import { z } from "zod";

// ---------------------------------------------
// BLOCK SCHEMA
// ---------------------------------------------

export const BlockSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "image", "video", "quiz"]),
  
  // TEXT BLOCK
  html: z.string().optional(),

  // IMAGE BLOCK
  src: z.string().optional(),

  // QUIZ BLOCK
  question: z.string().optional(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
});

export type Block = z.infer<typeof BlockSchema>;

// ---------------------------------------------
// PAGE SCHEMA
// ---------------------------------------------

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  blocks: z.array(BlockSchema),
});

export type Page = z.infer<typeof PageSchema>;

// ---------------------------------------------
// PROJECT SCHEMA
// ---------------------------------------------

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  version: z.string().default("1.2"),

  pages: z.array(PageSchema),

  theme: z
    .object({
      direction: z.enum(["ltr", "rtl"]).default("ltr"),
      styles: z.record(z.any()).default({}),
    })
    .default({
      direction: "ltr",
      styles: {},
    }),

  tracking: z
    .object({
      level: z.string().default("standard"),
      pageViews: z.boolean().default(true),
      quizInteractions: z.boolean().default(true),
      media: z.boolean().default(true),
      hints: z.boolean().default(false),
      externalLinks: z.boolean().default(false),
      timePerPage: z.boolean().default(true),
      attempts: z.boolean().default(true),
    })
    .default({}),

  xapi: z
    .object({
      lrsEndpoint: z.string().default(""),
      authToken: z.string().default(""),
      activityIdFormat: z.string().default("iri"),
      statementExtensions: z.string().default("{}"),
    })
    .default({}),
});

export type Project = z.infer<typeof ProjectSchema>;

// ---------------------------------------------
// FINAL AI → EDITOR RESPONSE SCHEMA
// ---------------------------------------------

export const BuildLessonResultSchema = z.object({
  agent: z.string().optional(),
  content: z.string().optional(), // status message

  outline: z.string().optional(), // raw outline from AI (optional)

  project: ProjectSchema, // final processed SCORM project

  warnings: z.array(z.string()).optional(),

  metadata: z
    .object({
      predictedDifficulty: z.string().optional(),
      recommendedTags: z.array(z.string()).optional(),
      routerSummary: z.string().optional(),
      routing: z.record(z.any()).optional(),
    })
    .optional(),
});

export type BuildLessonResult = z.infer<typeof BuildLessonResultSchema>;

// ---------------------------------------------
// SAFE PARSER
// ---------------------------------------------

export function safeParseProject(data: any) {
  const parsed = ProjectSchema.safeParse(data);

  if (!parsed.success) {
    console.error("❌ Invalid SCORM project:", parsed.error);
    throw new Error("Generated project failed validation.");
  }

  return parsed.data;
}
