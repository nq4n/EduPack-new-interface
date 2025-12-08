module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/ai/utils/openrouter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/utils/openrouter.ts
__turbopack_context__.s([
    "getOpenRouterClient",
    ()=>getOpenRouterClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
function getOpenRouterClient() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        defaultHeaders: {
            "HTTP-Referer": process.env.APP_DOMAIN || "http://localhost:3000",
            "X-Title": "EduPack SCORM AI"
        }
    });
}
}),
"[project]/lib/ai/agents/mentor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/agents/mentor.ts
__turbopack_context__.s([
    "mentorStage",
    ()=>mentorStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/utils/openrouter.ts [app-route] (ecmascript)");
;
// Use the shared OpenRouter client with correct API key + headers
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenRouterClient"])();
async function mentorStage(messages) {
    const systemPrompt = `
You are an expert instructional designer and teacher mentor.

Your task:
1. Read the ENTIRE conversation history.
2. Understand the teacher’s goal:
   - Subject
   - Grade level
   - Learning objectives
   - Activity style
3. Produce a clean, simple, structured lesson outline.

OUTPUT FORMAT (strict):

Lesson Topic: <topic>

Grade Level: <grade or "not specified">

Learning Objectives:
- Objective 1
- Objective 2
- Objective 3

Lesson Outline:
1. Introduction
2. Concept Explanation
3. Guided Practice
4. Independent Practice
5. Assessment
6. Conclusion

RULES:
- DO NOT output JSON.
- DO NOT create SCORM blocks.
- DO NOT generate IDs.
- Keep the outline readable and teacher-friendly.
- The architect agent will turn this into a SCORM blueprint.
`;
    const response = await client.chat.completions.create({
        model: "allenai/olmo-3-32b:think",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages.map((m)=>({
                    role: m.role,
                    content: m.content
                }))
        ],
        temperature: 0.4
    });
    return response.choices[0].message.content;
}
}),
"[project]/lib/ai/agents/architect.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/agents/architect.ts
__turbopack_context__.s([
    "architectStage",
    ()=>architectStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/utils/openrouter.ts [app-route] (ecmascript)");
;
// Use shared OpenRouter client
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenRouterClient"])();
async function architectStage(outline) {
    const systemPrompt = `
You are a SCORM lesson architect.

Your job:
Convert the mentor’s lesson outline into a structured SCORM lesson blueprint.

OUTPUT FORMAT (very important):

Lesson Title: <title>

Pages:
- Page 1: <title>
  Blocks:
    - Text: <intro or explanation>
    - Image: <placeholder description>

- Page 2: <concept section>
  Blocks:
    - Text: <details>
    - Quiz:
        type: mcq
        question: <question>
        options: [A, B, C, D]
        answer: <letter>

- Page 3: Guided Practice
  Blocks:
    - Text: <task instructions>

- Page 4: Independent Practice
  Blocks:
    - Text: <exercise>

- Page 5: Conclusion
  Blocks:
    - Text: <summary>

RULES:
- DO NOT generate JSON.
- DO NOT generate IDs.
- DO NOT embed code or HTML.
- Normalizer will convert this into structured SCORM blocks.
- Keep blueprint clean, simple, and consistent.
`;
    const response = await client.chat.completions.create({
        model: "Kwai-KAT-6B:free",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: outline
            }
        ],
        temperature: 0.3
    });
    return response.choices[0].message.content;
}
}),
"[project]/lib/ai/agents/deepresearch.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/agents/deepresearch.ts
__turbopack_context__.s([
    "deepResearchStage",
    ()=>deepResearchStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/utils/openrouter.ts [app-route] (ecmascript)");
;
// Use shared OpenRouter client with required headers
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$openrouter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenRouterClient"])();
async function deepResearchStage(blueprint) {
    const systemPrompt = `
You are an advanced education specialist.

Your task:
Take the architect's lesson blueprint and enrich it with:

- Clear, simple explanations
- Real classroom examples
- Guided practice steps
- Independent practice tasks
- Optional hints
- Teacher notes for differentiation
- Small embedded assessments

Rules:
- DO NOT output JSON.
- DO NOT modify the page/block structure.
- Only enrich content inside each block.
- Keep paragraphs short and teacher-friendly.
- The normalizer will convert this into SCORM JSON later.
`;
    const response = await client.chat.completions.create({
        model: "Kwai-KAT-6B:free",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: blueprint
            }
        ],
        temperature: 0.4
    });
    return response.choices[0].message.content;
}
}),
"[project]/lib/ai/utils/normalize.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/utils/normalize.ts
/**
 * Normalizes the Architect / DeepResearch output into
 * a clean intermediate lesson structure.
 *
 * This is NOT yet the final SCORM EditorProject.
 */ __turbopack_context__.s([
    "normalizeLesson",
    ()=>normalizeLesson
]);
function normalizeLesson(raw) {
    const lines = raw.split("\n").map((l)=>l.trim());
    let title = "Untitled Lesson";
    const pages = [];
    let currentPage = null;
    for (const line of lines){
        // Capture lesson title
        if (line.startsWith("Lesson Title:")) {
            title = line.replace("Lesson Title:", "").trim();
            continue;
        }
        // Detect new page
        if (line.startsWith("- Page")) {
            if (currentPage) pages.push(currentPage);
            const pageTitle = line.replace(/- Page \d+:\s*/i, "").trim();
            currentPage = {
                title: pageTitle || "Untitled Page",
                blocks: []
            };
            continue;
        }
        // Detect text block
        if (line.startsWith("- Text:")) {
            const content = line.replace("- Text:", "").trim();
            currentPage?.blocks.push({
                type: "text",
                content: content || ""
            });
            continue;
        }
        // Detect image block
        if (line.startsWith("- Image:")) {
            const desc = line.replace("- Image:", "").trim();
            currentPage?.blocks.push({
                type: "image",
                src: "",
                content: desc
            });
            continue;
        }
        // Detect quiz block
        if (line.startsWith("- Quiz:")) {
            // placeholder quiz – refined later
            currentPage?.blocks.push({
                type: "quiz",
                content: "quiz-placeholder"
            });
            continue;
        }
    }
    // Push last page
    if (currentPage) pages.push(currentPage);
    return {
        title,
        pages
    };
}
}),
"[project]/lib/ai/utils/sanitize.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/utils/sanitize.ts
__turbopack_context__.s([
    "sanitizeBlockContent",
    ()=>sanitizeBlockContent,
    "sanitizeText",
    ()=>sanitizeText
]);
function sanitizeText(input) {
    if (!input) return "";
    return input.replace(/\r/g, "").replace(/\t/g, " ").replace(/[<>]/g, "") // remove HTML tags if AI adds them
    .replace(/\s+/g, " ").trim();
}
function sanitizeBlockContent(content) {
    if (typeof content === "string") return sanitizeText(content);
    return content;
}
}),
"[project]/lib/ai/ai-schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/ai-schema.ts
__turbopack_context__.s([
    "BlockSchema",
    ()=>BlockSchema,
    "BuildLessonResultSchema",
    ()=>BuildLessonResultSchema,
    "PageSchema",
    ()=>PageSchema,
    "ProjectSchema",
    ()=>ProjectSchema,
    "safeParseProject",
    ()=>safeParseProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
/**
 * --------------------------
 * Block Schemas
 * --------------------------
 */ const TextBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("text"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    html: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
    style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
});
const ImageBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("image"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    src: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const VideoBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("video"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    src: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("")
});
const QuizOptionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    correct: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const QuizBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("quiz"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    question: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
    questionHtml: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    questionStyle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
    options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(QuizOptionSchema).default([]),
    style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
    optionStyle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
});
const InteractiveBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("interactive"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    variant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "button",
        "callout",
        "reveal",
        "custom"
    ]).default("button"),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("Interactive element"),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    bodyHtml: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    initiallyOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    tone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "info",
        "success",
        "warning",
        "danger"
    ]).optional(),
    style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional()
});
const BlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
    TextBlockSchema,
    ImageBlockSchema,
    VideoBlockSchema,
    QuizBlockSchema,
    InteractiveBlockSchema
]);
const PageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("Untitled Page"),
    blocks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(BlockSchema).default([])
});
const ProjectSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(()=>`proj-${Date.now()}`),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("Untitled Lesson"),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "1.2",
        "2004"
    ]).optional().default("1.2"),
    theme: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        direction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "ltr",
            "rtl"
        ]).default("ltr"),
        styles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().default({})
    }),
    tracking: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        level: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "minimal",
            "standard",
            "advanced"
        ]).default("standard"),
        pageViews: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
        quizInteractions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
        media: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
        hints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
        externalLinks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
        timePerPage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
        attempts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
    }),
    xapi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        lrsEndpoint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
        authToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
        activityIdFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("iri"),
        statementExtensions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("{}")
    }),
    pages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(PageSchema).default([])
});
const BuildLessonResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    project: ProjectSchema,
    warnings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        predictedDifficulty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "easy",
            "medium",
            "hard"
        ]).default("easy"),
        recommendedTags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
        routerSummary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
        routing: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()
    })
});
function safeParseProject(json) {
    const res = ProjectSchema.safeParse(json);
    if (res.success) return res.data;
    console.warn("⚠️ AI returned invalid JSON, applying fallback normalization.");
    console.warn(res.error.format());
    // fallback to an empty-but-valid project
    return ProjectSchema.parse({});
}
}),
"[project]/lib/ai/pipeline.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/ai/pipeline.ts
__turbopack_context__.s([
    "runAIPipeline",
    ()=>runAIPipeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$mentor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/agents/mentor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$architect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/agents/architect.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$deepresearch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/agents/deepresearch.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/utils/normalize.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$sanitize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/utils/sanitize.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$ai$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/ai-schema.ts [app-route] (ecmascript)");
;
;
;
;
;
;
// Use Next.js built-in UUID generator
const uuid = ()=>crypto.randomUUID();
async function runAIPipeline(messages) {
    const cleanedMessages = messages.map((m)=>({
            role: m.role,
            content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$sanitize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeText"])(m.content)
        }));
    const mentorOut = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$mentor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mentorStage"])(cleanedMessages);
    const architectOut = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$architect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["architectStage"])(mentorOut);
    const enrichedOut = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$agents$2f$deepresearch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deepResearchStage"])(architectOut);
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeLesson"])(enrichedOut);
    const projectJson = {
        id: `proj-${uuid()}`,
        title: normalized.title,
        version: "1.2",
        theme: {
            direction: "ltr",
            styles: {}
        },
        tracking: {
            level: "standard",
            pageViews: true,
            quizInteractions: true,
            media: true,
            hints: false,
            externalLinks: false,
            timePerPage: true,
            attempts: true
        },
        xapi: {
            lrsEndpoint: "",
            authToken: "",
            activityIdFormat: "iri",
            statementExtensions: "{}"
        },
        pages: normalized.pages.map((p)=>({
                id: `page-${uuid()}`,
                title: p.title,
                blocks: p.blocks.map((b)=>({
                        id: `block-${uuid()}`,
                        type: b.type,
                        html: b.type === "text" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$utils$2f$sanitize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeText"])(b.content || "") : undefined,
                        src: b.type === "image" ? "" : undefined,
                        question: b.type === "quiz" ? b.content || "" : undefined,
                        options: b.type === "quiz" ? [] : undefined
                    }))
            }))
    };
    const finalProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$ai$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeParseProject"])(projectJson);
    return {
        agent: "pipeline",
        content: "Lesson generated successfully.",
        project: finalProject,
        warnings: [],
        metadata: {
            predictedDifficulty: "medium",
            recommendedTags: [],
            routerSummary: "",
            routing: {}
        }
    };
}
}),
"[project]/app/api/scorm/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/scorm/chat/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "fetchCache",
    ()=>fetchCache,
    "revalidate",
    ()=>revalidate,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/pipeline.ts [app-route] (ecmascript)");
const dynamic = "force-dynamic";
const revalidate = 0;
const fetchCache = "force-no-store";
const runtime = "nodejs";
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { messages } = body;
        if (!messages || !Array.isArray(messages)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid payload: messages[] is required."
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runAIPipeline"])(messages);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result, {
            status: 200
        });
    } catch (error) {
        console.error("❌ SCORM AI Chat Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message || "AI processing failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e2f3d323._.js.map