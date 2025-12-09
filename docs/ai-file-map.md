# AI-related file map

This document lists the files that participate in the SCORM AI experience and how they fit together.

## User-facing entry points
- `app/(editor)/scorm-ai/page.tsx`: Main lesson-building surface that wires up the `useScormAI` hook for chat-driven generation and renders the editor UI.
- `app/page.tsx`: Landing page CTA linking to the SCORM AI experience.

## Client-side AI coordination
- `hooks/useScormAI.ts`: Maintains chat state, posts prompts to `/api/scorm/chat`, and applies AI responses to the active SCORM project.
- `lib/scorm/ai-types.ts`: Shared message and hook prop types for AI chat interactions.

## API surface
- `app/api/scorm/chat/route.ts`: Next.js route that validates the chat payload and invokes the AI pipeline.

## Pipeline and orchestration
- `lib/ai/pipeline.ts`: Single-call pipeline that sanitizes input, invokes the unified agent, normalizes lessons, and returns a SCORM-ready project.
- `lib/ai/ai-schema.ts`: Zod schemas and `safeParseProject` helper that validate and shape AI-generated project JSON.
- `lib/ai/utils/sanitize.ts`: Sanitizes prompt and block content before it enters the pipeline.
- `lib/ai/utils/normalize.ts`: Converts agent output into normalized lesson structures (referenced by the pipeline).

## Agent implementations
- `lib/ai/agents/unified.ts`: Single-step OpenRouter agent that analyzes chat history, drafts lesson structure, and enriches content in one response.

## SCORM block typing
- `lib/scorm/types.ts`: Editor block definitions that include AI-generated text blocks (noting HTML sanitized from the editor or AI).
