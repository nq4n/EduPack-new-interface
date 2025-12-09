// lib/ai/ai-scheme.ts
// Compatibility wrapper that re-exports the SCORM AI Zod schemas.
// Some consumers refer to this module as the "AI scheme" file.
export { BlockSchema, PageSchema, ProjectSchema, BuildLessonResultSchema, safeParseProject } from "./ai-schema";
